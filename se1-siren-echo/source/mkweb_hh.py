# HH mono GenExpr -> strict-mode JS factory makeHH(sr) -> {set, tick(in1) -> out1}
import re, sys
g = open(sys.argv[1]).read()
params = re.findall(r'^Param (\w+)\(([-\d.]+)', g, re.M)
hist = re.findall(r'^History (\w+)\(([-\d.]+)\)', g, re.M)
data = re.findall(r'^Data (\w+)\((\d+)\)', g, re.M)
body = re.sub(r'^(Param|History|Data) .*$', '', g, flags=re.M)
code = re.sub(r'//.*', '', body)
known = {n for n, _ in params} | {n for n, _ in hist} | {n for n, _ in data} | {'out1', 'in1', 'samplerate'}
assigned = re.findall(r'(?:^|[;({\s])([A-Za-z_][A-Za-z0-9_]*)\s*(?:=(?!=)|\+=|-=|\*=|/=)', code, re.M)
locs = sorted({a for a in assigned if a not in known})
for bad in ('if', 'else', 'for', 'while'): assert bad not in locs
js = ['function makeHH(sr){',
      'const samplerate=sr; const exp=Math.exp, log=Math.log, floor=Math.floor, min=Math.min, max=Math.max, abs=Math.abs, tanh=Math.tanh, sinh=Math.sinh, sin=Math.sin, sqrt=Math.sqrt, pow=Math.pow;',
      'function clamp(x,a,b){return Math.min(Math.max(x,a),b);} function noise(){return Math.random()*2-1;}',
      'function peek(d,i){return d[i];} function poke(d,v,i){d[i]=v;}']
js += ['const %s=new Float32Array(%s);' % (n, s) for n, s in data]
js += ['let %s=%s;' % (n, v) for n, v in params] + ['let %s=%s;' % (n, v) for n, v in hist]
js.append('let out1=0;')
js.append('function tick(in1){ let ' + ', '.join('%s=0' % n for n in locs) + ';')
js.append(code)
js.append('return out1; }')
js.append('function set(n,v){ switch(n){' + ''.join("case '%s': %s=v; break;" % (n, n) for n, _ in params) + '} }')
js.append('return {set, tick};')
js.append('}')
open(sys.argv[2], 'w').write('\n'.join(js) + '\n')
print('params', len(params), 'history', len(hist), 'locals', len(locs))
