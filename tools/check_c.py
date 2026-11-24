# Usage : python3 tools/check_c.py c/*.html  (gcc requis).
# Relit les pages de Prog · C : compile chaque programme avec les options des TP et compare sa sortie à celle affichée.
#  <pre class="cc" data-prog="X">  programme complet ; <pre class="term" data-run="X"> sa sortie (lignes « $ ./… » ignorées ;
#     les lignes « $ gcc … » aussi).
#  <pre class="cc" data-frag="X">  morceau placé dans main() (avec stdio.h et string.h) ; sortie éventuelle data-run="X".
#  <pre class="cc" data-top="X">   morceau placé avant un main vide (doit compiler).
#  <pre class="cc" data-bad="X">   programme qui NE doit PAS compiler ; <pre class="term" data-run="X"> : chaque ligne
#     « error: … » affichée doit se retrouver dans la sortie de gcc.
#  <pre class="cc" data-sol="X"> corrigé d'exercice + <pre class="cc" data-ex="X"> exemple (instructions de main) +
#     <pre class="term" data-out="X"> sortie attendue.
#  data-files="a.h,b.c" sur un data-prog : les blocs <pre class="cc" data-file="a.h"> de la page sont écrits à côté.
import re, html, sys, subprocess, os, tempfile
FLAGS = ['-Wall', '-Wextra', '-Werror', '-std=c99']
def text(b): return html.unescape(re.sub(r'<[^>]+>', '', b)).strip('\n')
def blocks(s, attr):
    out = {}
    for m in re.finditer(r'<pre class="(cc|term)"([^>]*)>(.*?)</pre>', s, re.S):
        a = re.search(attr + r'="([^"]+)"', m.group(2))
        if a: out[a.group(1)] = text(m.group(3))
    return out
def run(src, files=None, stdin=''):
    d = tempfile.mkdtemp()
    open(os.path.join(d, 'p.c'), 'w').write(src + '\n')
    srcs = [os.path.join(d, 'p.c')]
    for name, body in (files or {}).items():
        open(os.path.join(d, name), 'w').write(body + '\n')
        if name.endswith('.c'): srcs.append(os.path.join(d, name))
    c = subprocess.run(['gcc'] + FLAGS + srcs + ['-o', os.path.join(d, 'p')], capture_output=True, text=True, cwd=d, env=dict(os.environ, LC_ALL='C'))
    if c.returncode: return None, c.stderr
    r = subprocess.run([os.path.join(d, 'p')], capture_output=True, text=True, input=stdin, timeout=5)
    return r.stdout, r.returncode
def outlines(t):
    ls = t.split('\n')
    runs = [i for i, l in enumerate(ls) if l.startswith('$ ./')]
    if runs: ls = ls[runs[-1] + 1:]
    return [l for l in ls if not l.startswith('$ ')]
bad = total = 0
for f in sys.argv[1:]:
    s = open(f, encoding='utf-8').read()
    runs, files = blocks(s, 'data-run'), blocks(s, 'data-file')
    n = 0
    for k, src in blocks(s, 'data-prog').items():
        m = re.search(r'data-prog="%s"[^>]*data-files="([^"]+)"' % re.escape(k), s)
        fs = {x: files[x] for x in m.group(1).split(',')} if m else None
        stdin = ''
        mi = re.search(r'data-run="%s"[^>]*data-stdin="([^"]*)"' % re.escape(k), s)
        if mi: stdin = html.unescape(mi.group(1)).replace('\\n', '\n')
        out, info = run(src, fs, stdin); n += 1
        if out is None: bad += 1; print('  ✗', f, k, 'ne compile pas :', info.strip().split('\n')[0]); continue
        if k in runs:
            exp = outlines(runs[k])
            got = out.rstrip('\n').split('\n') if out else []
            if stdin: exp = [l for l in exp]
            if [l.rstrip() for l in got] != [l.rstrip() for l in exp]:
                bad += 1; print('  ✗', f, k, 'sortie', got, 'affiché', exp)
    for k, src in blocks(s, 'data-frag').items():
        out, info = run('#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n' + src + '\n    return 0;\n}'); n += 1
        if out is None: bad += 1; print('  ✗', f, k, 'fragment ne compile pas :', info.strip().split('\n')[0]); continue
        if k in runs:
            exp = outlines(runs[k]); got = out.rstrip('\n').split('\n') if out else []
            if [l.rstrip() for l in got] != [l.rstrip() for l in exp]: bad += 1; print('  ✗', f, k, 'sortie', got, 'affiché', exp)
    for k, src in blocks(s, 'data-top').items():
        out, info = run('#include <stdio.h>\n#include <string.h>\n\n' + src + '\n\nint main(void)\n{\n    return 0;\n}'); n += 1
        if out is None: bad += 1; print('  ✗', f, k, 'déclaration ne compile pas :', info.strip().split('\n')[0])
    for k, src in blocks(s, 'data-build').items():
        d = tempfile.mkdtemp(); open(os.path.join(d, 'p.c'), 'w').write(src + '\n'); n += 1
        c = subprocess.run(['gcc'] + FLAGS + [os.path.join(d, 'p.c'), '-o', os.path.join(d, 'p')], capture_output=True, text=True, env=dict(os.environ, LC_ALL='C'))
        if c.returncode: bad += 1; print('  ✗', f, k, 'ne compile pas :', c.stderr.strip()[:300])
    for k, src in blocks(s, 'data-bad').items():
        out, info = run(src); n += 1
        if out is not None: bad += 1; print('  ✗', f, k, 'compile alors qu’il ne devrait pas'); continue
        for l in outlines(runs.get(k, '')):
            m = re.search(r'(error: .*)', l)
            if m and m.group(1).strip() not in info: bad += 1; print('  ✗', f, k, 'message absent :', m.group(1), '\n    gcc :', info.strip()[:300])
    outs, exs = blocks(s, 'data-out'), blocks(s, 'data-ex')
    for k, sol in blocks(s, 'data-sol').items():
        n += 1
        if k not in exs or k not in outs: bad += 1; print('  ✗', f, k, 'exemple ou sortie manquant'); continue
        body = '\n'.join('    ' + l for l in exs[k].split('\n'))
        src = '#include <stdio.h>\n\n' + sol + '\n\nint main(void)\n{\n' + body + '\n    return 0;\n}'
        out, info = run(src)
        if out is None: bad += 1; print('  ✗', f, k, 'exercice ne compile pas :', info.strip()[:400]); continue
        got = out.rstrip('\n').split('\n'); exp = outs[k].split('\n')
        if [l.rstrip() for l in got] != [l.rstrip() for l in exp]: bad += 1; print('  ✗', f, k, 'sortie', got, 'attendu', exp)
    total += n
    print(f, n, 'blocs vérifiés')
print('écarts :', bad)
sys.exit(1 if bad else 0)
