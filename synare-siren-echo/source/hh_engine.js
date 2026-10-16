function makeHH(sr){
const samplerate=sr; const exp=Math.exp, log=Math.log, floor=Math.floor, min=Math.min, max=Math.max, abs=Math.abs, tanh=Math.tanh, sinh=Math.sinh, sin=Math.sin, sqrt=Math.sqrt, pow=Math.pow;
function clamp(x,a,b){return Math.min(Math.max(x,a),b);} function noise(){return Math.random()*2-1;}
function peek(d,i){return d[i];} function poke(d,v,i){d[i]=v;}
const tapeA=new Float32Array(960000);
let vol1=7.0;
let vol2=5.0;
let hiss=1.0;
let echo1=1.0;
let dtreb=0.0;
let evol=6.0;
let rep=4.0;
let ebass=0.0;
let etreb=0.0;
let delay_ms=375.0;
let mains=1.0;
let wow=0.1;
let drive=0.4;
let wear=0.3;
let sync=0.0;
let motor=1.0;
let bias=0.5;
let hyst=1.0;
let mspd=1.0;
let txp=0.0;
let hp=16000.0;
let hv=0.0;
let wph=0.0;
let fph=0.0;
let sph=0.0;
let drift=0.0;
let tp=0.0;
let mm=1.0;
let hymp=1.0;
let jmA=0.0;
let jhA=0.0;
let obA=0.0;
let u00A=0.0;
let u01A=0.0;
let u10A=0.0;
let u11A=0.0;
let u20A=0.0;
let u21A=0.0;
let d00A=0.0;
let d01A=0.0;
let d10A=0.0;
let d11A=0.0;
let d20A=0.0;
let d21A=0.0;
let wmix=5.0;
let hss=1.0;
let e1s=1.0;
let Aenv=0.0;
let Ah1x=0.0;
let Ah1y=0.0;
let Ah2x=0.0;
let Ah2y=0.0;
let Al1=0.0;
let Al2=0.0;
let Abpl=0.0;
let Abpb=0.0;
let Ade=0.0;
let Apre=0.0;
let Abs=0.0;
let Ats=0.0;
let Adts=0.0;
let Apos=0.0;
let Arlp=0.0;
let Admp=16000.0;
let out1=0;
function tick(in1){ let AD00=0, AD01=0, AD10=0, AD11=0, AD20=0, AD21=0, AU00=0, AU01=0, AU10=0, AU11=0, AU20=0, AU21=0, Aa0d=0, Aa0den=0, Aa0l=0, Aa0ld=0, Aa0q=0, Aa0sh=0, Aa0t=0, Aa1d=0, Aa1den=0, Aa1l=0, Aa1ld=0, Aa1q=0, Aa1sh=0, Aa1t=0, Aal=0, Aaspd=0, Ab0d=0, Ab0den=0, Ab0l=0, Ab0ld=0, Ab0q=0, Ab0sh=0, Ab0t=0, Ab1d=0, Ab1den=0, Ab1l=0, Ab1ld=0, Ab1q=0, Ab1sh=0, Ab1t=0, Abb=0, Abh=0, Abl=0, Ablo=0, Aclk=0, Ad1=0, Ad2=0, Ad3=0, Ad4=0, Ad5=0, Adh0=0, Adh1=0, Adl0=0, Adl1=0, Adlo=0, Adm=0, Admg=0, Adry=0, Aen=0, Aev=0, Afbp=0, Afbs=0, Afbw=0, Afc=0, Agdo=0, Agr=0, Ah0=0, Ah1=0, Ahm0=0, Ahm1=0, Ahp=0, Ahys=0, Ai2=0, Ak10=0, Ak11=0, Ak1g0=0, Ak1g1=0, Ak2g0=0, Ak2g1=0, Alvl=0, Am=0, Amm0=0, Amm1=0, Amo0=0, Amo1=0, Ap=0, Apb=0, Apl=0, Ard=0, Arec=0, Areco=0, Arf=0, Ari=0, Arin=0, Aro=0, Arp=0, Arq=0, Arx=0, As1=0, As2=0, Aspd=0, Atl=0, Awet=0, Axin0=0, Axin1=0, Ay1=0, Ay2=0, Ay3=0, Ayd0_0=0, Ayd0_1=0, Ayd0_2=0, Ayd1_0=0, Ayd1_1=0, Ayd1_2=0, Ayu0_0=0, Ayu0_1=0, Ayu0_2=0, Ayu1_0=0, Ayu1_1=0, Ayu1_2=0, Az1=0, Az2=0, ah=0, dk=0, dke=0, dr=0, dryA=0, dt=0, e1=0, fbg=0, fp=0, g1=0, gbs=0, gdry=0, gdt=0, ge=0, gob=0, gtr=0, gwet=0, hacc=0, hpos=0, hs=0, hst=0, hym=0, ia=0, ja=0, jc=0, jgn=0, jh0=0, jk=0, jm0=0, jq1=0, jq2=0, jwf=0, k10=0, ka=0, kb=0, ke=0, kob=0, kpe=0, kr=0, krl=0, kt=0, m=0, mrun=0, ms0=0, mt=0, mx=0, ob=0, sendA=0, sp=0, sr=0, sy=0, tgt=0, tl=0, tpos=0, twopi=0, tx=0, ub=0, v=0, w0=0, wm=0, wp=0;





































































sr = samplerate;
twopi = 6.283185307;
dt = 1.0 / sr;

g1 = pow(vol1 * 0.1, 2.0) * 2.0;
ia = in1 * g1;
dryA = ia;
k10 = 1.0 - exp(0.0 - 1.0 / (0.010 * sr));
wm = wmix + (vol2 - wmix) * k10;
wmix = wm;
gwet = min(1.0, wm * 0.2);
gdry = min(1.0, (10.0 - wm) * 0.2);
hs = hss + (hiss - hss) * k10;
hss = hs;
ke = 1.0 - exp(0.0 - 1.0 / (0.005 * sr));
e1 = e1s + (echo1 - e1s) * ke;
e1s = e1;
sendA = ia * e1;

tgt = clamp(delay_ms * 0.001 * sr, 8.0, 955000.0);
sy = sync > 0.5 ? 1.0 : 0.0;
w0 = twopi * (sy > 0.5 ? 1.6 : 8.0);
hacc = w0 * w0 * (tgt - hp) - 2.0 * w0 * hv;
v = sy > 0.5 ? clamp(hv + hacc * dt, -0.6 * sr, 2.6 * sr) : clamp(hv + hacc * dt, -3.0 * sr, 5.0 * sr);
hv = v;
hpos = clamp(hp + v * dt, 8.0, 955000.0);
hp = hpos;

mrun = motor > 0.5 ? (evol > 0.05 ? 1.0 : 0.0) : 0.0;
ms0 = mspd;
if (mrun > 0.5) {
	ms0 = ms0 + min(4.0, (1.0 - ms0) / 0.04) * dt;
	if (ms0 > 0.999999) {
		ms0 = 1.0;
	}
}
else {
	ms0 = max(0.0, ms0 - (1.2 + 1.5 * ms0) * dt);
}
mspd = ms0;
tl = 960000.0;
tx = txp + ms0;
tx = tx - tl * floor(tx / tl);
txp = tx;

wp = wph + 0.7 * ms0 * dt;
wp = wp - floor(wp);
wph = wp;
fp = fph + 8.3 * ms0 * dt;
fp = fp - floor(fp);
fph = fp;
sp = sph + 43.0 * ms0 * dt;
sp = sp - floor(sp);
sph = sp;
dr = drift + (noise() - drift) * (1.0 - exp(0.0 - dt / 0.8));
drift = dr;
m = 1.0 + wow * ms0 * (0.0025 * sin(twopi * wp) + 0.0009 * sin(twopi * fp) + 0.00025 * sin(twopi * sp) + 0.5 * dr);

tpos = tp + ms0 * dt;
tpos = tpos - 9.84 * floor(tpos / 9.84);
tp = tpos;

ka = 1.0 - exp(0.0 - 1.0 / (0.002 * sr));
kr = 1.0 - exp(0.0 - 1.0 / (0.15 * sr));
kt = 1.0 - exp(0.0 - twopi * 10000.0 / sr);
kb = 1.0 - exp(0.0 - twopi * 100.0 / sr);
kpe = 1.0 - exp(0.0 - twopi * 3000.0 / sr);
ah = exp(0.0 - twopi * 70.0 / sr);
krl = 1.0 - exp(0.0 - twopi * clamp(20000.0 * ms0, 30.0, 0.45 * sr) / sr);
if (ms0 > 0.999) {
	krl = 1.0;
}
mt = mains > 0.5 ? 1.0 : 0.0;
mx = mm + (mt - mm) * (1.0 - exp(0.0 - 1.0 / (0.004 * sr)));
mm = mx;
fbg = 1.3 * pow(rep * 0.1, 1.3) * mx;
dk = 0.6 + 3.0 * drive;
ub = max(0.0, 0.5 - bias) * 2.0;
ob = max(0.0, bias - 0.5) * 2.0;
dke = dk * (1.0 + 0.6 * ub);
kob = ob > 0.0 ? 1.0 - exp(0.0 - twopi * 20000.0 * (1.0 - 0.75 * ob) / sr) : 1.0;
gob = 1.0 - 0.2 * ob;
jwf = pow(2.0, (0.5 - bias) * 4.0);
jk = 0.3 * jwf;
jc = clamp(1.0 - 0.15 * jwf, 0.02, 0.995);
ja = 0.0255;
jh0 = 3.0 * dk * 0.06;
jq1 = 1.0 / tanh(jh0) - 1.0 / jh0;
jq2 = jh0 + ja * jq1;
jm0 = 1.0 / tanh(jq2) - 1.0 / jq2;
jgn = 1.1776 / dk;
hst = 1.0 / (0.01 * sr);
hym = hymp + clamp(hyst - hymp, 0.0 - hst, hst);
hymp = hym;
ge = 0.0;
if (evol > 0.05) {
	ge = pow(evol * 0.1, 2.0) * 2.0;
}
gdt = pow(10.0, dtreb * 3.2 / 20.0) - 1.0;
gbs = pow(10.0, ebass * 2.0 / 20.0) - 1.0;
gtr = pow(10.0, etreb * 2.8 / 20.0) - 1.0;

Adm = hpos * m;
Aspd = ms0 - (Adm - Admp);
Admp = Adm;
Aaspd = clamp(abs(Aspd), 0.0, 6.0);
Afc = clamp(11000.0 * max(Aaspd, 0.02) * (1.0 - 0.35 * wear), 20.0, 0.45 * sr);
Aal = 1.0 - exp(0.0 - twopi * Afc / sr);
Afbp = clamp(95.0 * max(Aaspd, 0.05), 5.0, 0.2 * sr);
Afbw = 2.0 * sin(3.14159265 * Afbp / sr);
Ap = tpos - Adm * dt + 0.0;
Ap = Ap - 9.84 * floor(Ap / 9.84);
Ad1 = Ap - 1.3;
Ad2 = Ap - 3.1;
Ad3 = Ap - 4.45;
Ad4 = Ap - 6.8;
Ad5 = Ap - 8.9;
Admg = 0.6 * exp(0.0 - Ad1 * Ad1 / 0.0009) + 0.3 * exp(0.0 - Ad2 * Ad2 / 0.004) + 0.85 * exp(0.0 - Ad3 * Ad3 / 0.0016) + 0.4 * exp(0.0 - Ad4 * Ad4 / 0.0025) + 0.5 * exp(0.0 - Ad5 * Ad5 / 0.0006);
Agdo = clamp(1.0 - wear * Admg, 0.08, 1.0);
Aclk = 0.0;
if (Ap < Apos - 4.0) {
	Aclk = 0.02 * wear;
}
Apos = Ap;

Arp = tx - Adm;
Arp = Arp - tl * floor(Arp / tl);
Ari = floor(Arp);
Arf = Arp - Ari;
Ai2 = Ari + 1.0;
Ai2 = Ai2 - tl * floor(Ai2 / tl);
As1 = peek(tapeA, Ari);
As2 = peek(tapeA, Ai2);
Ard = As1 + (As2 - As1) * Arf;
Apb = Ard * 2.5 * tanh(Aspd / 2.5) * Agdo + Aclk;
Ay1 = ah * (Ah1y + Apb - Ah1x);
Ah1x = Apb;
Ah1y = Ay1;
Ay2 = ah * (Ah2y + Ay1 - Ah2x);
Ah2x = Ay1;
Ah2y = Ay2;
Abl = Abpl + Afbw * Abpb;
Abh = Ay2 - Abl - 0.9 * Abpb;
Abb = Afbw * Abh + Abpb;
Abpl = Abl;
Abpb = Abb;
Ay3 = Ay2 + 0.28 * Abb;
Az1 = Al1 + (Ay3 - Al1) * Aal;
Al1 = Az1;
Az2 = Al2 + (Az1 - Al2) * Aal;
Al2 = Az2;
Aev = (Az2 + 1.5 * (1.0 - kpe) * Ade) / (2.5 - 1.5 * kpe);
Ade = Ade + (Aev - Ade) * kpe;
Aev = Aev + noise() * hs * 0.0005 * (0.25 + 0.75 * min(Aaspd, 1.0)) * (1.0 + 4.0 * abs(Aev));
Ablo = Abs + (Aev - Abs) * kb;
Abs = Ablo;
Aev = Aev + gbs * Ablo;
Atl = Ats + (Aev - Ats) * kt;
Ats = Atl;
Aev = Aev + gtr * (Aev - Atl);

Afbs = Aev;
Arin = sendA + Afbs * fbg;
Alvl = abs(Arin);
Aen = Aenv;
if (Alvl > Aen) {
	Aen = Aen + (Alvl - Aen) * ka;
}
else {
	Aen = Aen + (Alvl - Aen) * kr;
}
Aenv = Aen;
Agr = 1.0;
if (Aen > 0.2) {
	Agr = pow(Aen / 0.2, -0.9);
}
Arx = Arin * Agr;
Apl = Apre + (Arx - Apre) * kpe;
Apre = Apl;
Arx = Apl + 2.5 * (Arx - Apl);
Areco = (tanh(dke * (Arx + 0.06)) - tanh(dke * 0.06)) / dke;
Arec = Areco;
if (hym > 0.0) {
	Am = jmA;
	Ahp = jhA;
	AU00 = u00A;
	AD00 = d00A;
	AU01 = u01A;
	AD01 = d01A;
	AU10 = u10A;
	AD10 = d10A;
	AU11 = u11A;
	AD11 = d11A;
	AU20 = u20A;
	AD20 = d20A;
	AU21 = u21A;
	AD21 = d21A;
	Axin0 = 2.0 * Arx;
	Ayu0_0 = 0.0173370351210749 * Axin0 + AU00;
	AU00 = 0.03197914819475092 * Axin0 - (-0.8425278769412362) * Ayu0_0 + AU01;
	AU01 = 0.0173370351210749 * Axin0 - (0.2460933619447851) * Ayu0_0;
	Ayu0_1 = 1.0 * Ayu0_0 + AU10;
	AU10 = 1.1279436578648423 * Ayu0_0 - (-0.5694602638544104) * Ayu0_1 + AU11;
	AU11 = 1.0000000000000002 * Ayu0_0 - (0.5258832787488432) * Ayu0_1;
	Ayu0_2 = 1.0 * Ayu0_1 + AU20;
	AU20 = 0.6988353209236315 * Ayu0_1 - (-0.3674549829417691) * Ayu0_2 + AU21;
	AU21 = 0.9999999999999997 * Ayu0_1 - (0.8421166715248705) * Ayu0_2;
	Ah0 = 3.0 * dk * Ayu0_2 + jh0;
	Adh0 = Ah0 - Ahp;
	Adl0 = Adh0 >= 0.0 ? 1.0 : -1.0;
	Aa0q = Ahp + ja * Am;
	Aa0l = abs(Aa0q) < 0.01 ? Aa0q / 3.0 : 1.0 / tanh(Aa0q) - 1.0 / Aa0q;
	Aa0sh = sinh(Aa0q);
	Aa0ld = abs(Aa0q) < 0.01 ? 1.0 / 3.0 - Aa0q * Aa0q / 15.0 : 1.0 / (Aa0q * Aa0q) - 1.0 / (Aa0sh * Aa0sh);
	Aa0d = Aa0l - Am;
	Aa0den = (1.0 - jc) * Adl0 * jk - ja * Aa0d;
	Aa0t = (Adl0 * Aa0d > 0.0 && Adl0 * Aa0den > 0.000000001) ? (1.0 - jc) * Aa0d / Aa0den : 0.0;
	Ak1g0 = clamp((Aa0t + jc * Aa0ld) / (1.0 - jc * ja * Aa0ld), 0.0, 20.0);
	Ak10 = Ak1g0 * Adh0;
	Amm0 = Am + 0.5 * Ak10;
	Ahm0 = Ahp + 0.5 * Adh0;
	Ab0q = Ahm0 + ja * Amm0;
	Ab0l = abs(Ab0q) < 0.01 ? Ab0q / 3.0 : 1.0 / tanh(Ab0q) - 1.0 / Ab0q;
	Ab0sh = sinh(Ab0q);
	Ab0ld = abs(Ab0q) < 0.01 ? 1.0 / 3.0 - Ab0q * Ab0q / 15.0 : 1.0 / (Ab0q * Ab0q) - 1.0 / (Ab0sh * Ab0sh);
	Ab0d = Ab0l - Amm0;
	Ab0den = (1.0 - jc) * Adl0 * jk - ja * Ab0d;
	Ab0t = (Adl0 * Ab0d > 0.0 && Adl0 * Ab0den > 0.000000001) ? (1.0 - jc) * Ab0d / Ab0den : 0.0;
	Ak2g0 = clamp((Ab0t + jc * Ab0ld) / (1.0 - jc * ja * Ab0ld), 0.0, 20.0);
	Am = clamp(Am + Ak2g0 * Adh0, -1.0, 1.0);
	Ahp = Ah0;
	Amo0 = Am;
	Ayd0_0 = 0.0173370351210749 * Amo0 + AD00;
	AD00 = 0.03197914819475092 * Amo0 - (-0.8425278769412362) * Ayd0_0 + AD01;
	AD01 = 0.0173370351210749 * Amo0 - (0.2460933619447851) * Ayd0_0;
	Ayd0_1 = 1.0 * Ayd0_0 + AD10;
	AD10 = 1.1279436578648423 * Ayd0_0 - (-0.5694602638544104) * Ayd0_1 + AD11;
	AD11 = 1.0000000000000002 * Ayd0_0 - (0.5258832787488432) * Ayd0_1;
	Ayd0_2 = 1.0 * Ayd0_1 + AD20;
	AD20 = 0.6988353209236315 * Ayd0_1 - (-0.3674549829417691) * Ayd0_2 + AD21;
	AD21 = 0.9999999999999997 * Ayd0_1 - (0.8421166715248705) * Ayd0_2;
	Axin1 = 0.0;
	Ayu1_0 = 0.0173370351210749 * Axin1 + AU00;
	AU00 = 0.03197914819475092 * Axin1 - (-0.8425278769412362) * Ayu1_0 + AU01;
	AU01 = 0.0173370351210749 * Axin1 - (0.2460933619447851) * Ayu1_0;
	Ayu1_1 = 1.0 * Ayu1_0 + AU10;
	AU10 = 1.1279436578648423 * Ayu1_0 - (-0.5694602638544104) * Ayu1_1 + AU11;
	AU11 = 1.0000000000000002 * Ayu1_0 - (0.5258832787488432) * Ayu1_1;
	Ayu1_2 = 1.0 * Ayu1_1 + AU20;
	AU20 = 0.6988353209236315 * Ayu1_1 - (-0.3674549829417691) * Ayu1_2 + AU21;
	AU21 = 0.9999999999999997 * Ayu1_1 - (0.8421166715248705) * Ayu1_2;
	Ah1 = 3.0 * dk * Ayu1_2 + jh0;
	Adh1 = Ah1 - Ahp;
	Adl1 = Adh1 >= 0.0 ? 1.0 : -1.0;
	Aa1q = Ahp + ja * Am;
	Aa1l = abs(Aa1q) < 0.01 ? Aa1q / 3.0 : 1.0 / tanh(Aa1q) - 1.0 / Aa1q;
	Aa1sh = sinh(Aa1q);
	Aa1ld = abs(Aa1q) < 0.01 ? 1.0 / 3.0 - Aa1q * Aa1q / 15.0 : 1.0 / (Aa1q * Aa1q) - 1.0 / (Aa1sh * Aa1sh);
	Aa1d = Aa1l - Am;
	Aa1den = (1.0 - jc) * Adl1 * jk - ja * Aa1d;
	Aa1t = (Adl1 * Aa1d > 0.0 && Adl1 * Aa1den > 0.000000001) ? (1.0 - jc) * Aa1d / Aa1den : 0.0;
	Ak1g1 = clamp((Aa1t + jc * Aa1ld) / (1.0 - jc * ja * Aa1ld), 0.0, 20.0);
	Ak11 = Ak1g1 * Adh1;
	Amm1 = Am + 0.5 * Ak11;
	Ahm1 = Ahp + 0.5 * Adh1;
	Ab1q = Ahm1 + ja * Amm1;
	Ab1l = abs(Ab1q) < 0.01 ? Ab1q / 3.0 : 1.0 / tanh(Ab1q) - 1.0 / Ab1q;
	Ab1sh = sinh(Ab1q);
	Ab1ld = abs(Ab1q) < 0.01 ? 1.0 / 3.0 - Ab1q * Ab1q / 15.0 : 1.0 / (Ab1q * Ab1q) - 1.0 / (Ab1sh * Ab1sh);
	Ab1d = Ab1l - Amm1;
	Ab1den = (1.0 - jc) * Adl1 * jk - ja * Ab1d;
	Ab1t = (Adl1 * Ab1d > 0.0 && Adl1 * Ab1den > 0.000000001) ? (1.0 - jc) * Ab1d / Ab1den : 0.0;
	Ak2g1 = clamp((Ab1t + jc * Ab1ld) / (1.0 - jc * ja * Ab1ld), 0.0, 20.0);
	Am = clamp(Am + Ak2g1 * Adh1, -1.0, 1.0);
	Ahp = Ah1;
	Amo1 = Am;
	Ayd1_0 = 0.0173370351210749 * Amo1 + AD00;
	AD00 = 0.03197914819475092 * Amo1 - (-0.8425278769412362) * Ayd1_0 + AD01;
	AD01 = 0.0173370351210749 * Amo1 - (0.2460933619447851) * Ayd1_0;
	Ayd1_1 = 1.0 * Ayd1_0 + AD10;
	AD10 = 1.1279436578648423 * Ayd1_0 - (-0.5694602638544104) * Ayd1_1 + AD11;
	AD11 = 1.0000000000000002 * Ayd1_0 - (0.5258832787488432) * Ayd1_1;
	Ayd1_2 = 1.0 * Ayd1_1 + AD20;
	AD20 = 0.6988353209236315 * Ayd1_1 - (-0.3674549829417691) * Ayd1_2 + AD21;
	AD21 = 0.9999999999999997 * Ayd1_1 - (0.8421166715248705) * Ayd1_2;
	Ahys = (Ayd1_2 - jm0) * jgn;
	jmA = Am;
	jhA = Ahp;
	u00A = AU00;
	d00A = AD00;
	u01A = AU01;
	d01A = AD01;
	u10A = AU10;
	d10A = AD10;
	u11A = AU11;
	d11A = AD11;
	u20A = AU20;
	d20A = AD20;
	u21A = AU21;
	d21A = AD21;
	Arec = Areco + (Ahys - Areco) * hym;
}
else {
	jmA = 0.0;
	jhA = jh0;
	u00A = 0.0;
	d00A = 0.0;
	u01A = 0.0;
	d01A = 0.0;
	u10A = 0.0;
	d10A = 0.0;
	u11A = 0.0;
	d11A = 0.0;
	u20A = 0.0;
	d20A = 0.0;
	u21A = 0.0;
	d21A = 0.0;
}
Aro = ob > 0.0 ? obA + (Arec * gob - obA) * kob : Arec;
obA = Aro;
Arq = Arlp + (Aro - Arlp) * krl;
Arlp = Arq;
poke(tapeA, Arq, floor(tx));

Adlo = Adts + (dryA - Adts) * kt;
Adts = Adlo;
Adry = dryA + gdt * (dryA - Adlo);
Awet = Aev * ge;

out1 = Adry * gdry + Awet * gwet;

return out1; }
function set(n,v){ switch(n){case 'vol1': vol1=v; break;case 'vol2': vol2=v; break;case 'hiss': hiss=v; break;case 'echo1': echo1=v; break;case 'dtreb': dtreb=v; break;case 'evol': evol=v; break;case 'rep': rep=v; break;case 'ebass': ebass=v; break;case 'etreb': etreb=v; break;case 'delay_ms': delay_ms=v; break;case 'mains': mains=v; break;case 'wow': wow=v; break;case 'drive': drive=v; break;case 'wear': wear=v; break;case 'sync': sync=v; break;case 'motor': motor=v; break;case 'bias': bias=v; break;case 'hyst': hyst=v; break;} }
return {set, tick};
}
