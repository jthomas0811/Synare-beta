function makeSE1(sr){
const samplerate=sr; const exp=Math.exp, log=Math.log, floor=Math.floor, min=Math.min, max=Math.max, abs=Math.abs, tanh=Math.tanh, sqrt=Math.sqrt, pow=Math.pow;
function clamp(x,a,b){return Math.min(Math.max(x,a),b);} function noise(){return Math.random()*2-1;}
let lfo_pos=0.0;
let mode=0.0;
let osc_pos=1.0;
let s1=0.0;
let s2=0.0;
let trig=0.0;
let gatemode=0.0;
let power=1.0;
let vol=0.7;
let lfo_tol=1.0;
let osc_tol=1.0;
let hold_ms=800.0;
let vebo=10.0;
let grit=0.0;
let gain_tol=1.0;
let lag_tol=1.0;
let battery=100.0;
let rail=0.0;
let pe=0.0;
let q3=0.0;
let q4=0.0;
let on1=1.0;
let on2=0.0;
let st3=0.1;
let st4=0.1;
let hc1=0.0;
let hc2=0.0;
let vc5=0.0;
let v1=0.0;
let v2=0.0;
let v9=0.0;
let v8=0.0;
let t4on=0.0;
let env=0.0;
let ibat=0.0;
let palive=0.0;
let coldh=0.0;
let lage=0.0;
let out1=0,out2=0,out3=0;
function tick(){ let a0=0, a1=0, a1on=0, a2on=0, acc=0, alive=0, beta_e=0, bq1=0, bq2=0, c=0, c1=0, c1n=0, c2=0, c3=0, c4=0, c8=0, c9=0, cap=0, ch=0, cl=0, cn=0, cold=0, d3=0, da=0, dr=0, drv=0, dt=0, en=0, g2=0, g3=0, g4=0, g8=0, g9=0, ga=0, gb=0, gb2=0, gc2=0, gf=0, gm=0, gon=0, gr=0, h=0, hit=0, hold2=0, i1=0, i2=0, iacc=0, ib3=0, ib4=0, ic=0, icol=0, itot=0, k14=0, k3=0, k4=0, ka=0, kb=0, kb1=0, kb2=0, kbeta=0, kc=0, kh=0, kl1=0, kl2=0, klag=0, la=0, led=0, lf=0, lfo_e=0, lnode=0, lp=0, md=0, n=0, n4=0, o=0, on4=0, op=0, osc_e=0, pk=0, pw=0, q1c=0, rb1=0, rb2e=0, rg=0, rint=0, ro=0, rth=0, s3=0, s4=0, sh3=0, sh4=0, sr=0, tcold=0, tg=0, thr=0, ts_e=0, v3=0, v4=0, va=0, vb3=0, vb4=0, vbn=0, vc3=0, vc3x=0, vc4=0, vd=0, vemf=0, vf=0, vr=0, vsup=0, vth=0, vx=0, vz=0;
// NJD SE-1 dub siren: component-level model of the Zack Nelson redraw
// BEAT (SW1): component-level Q1/Q2 astable; OFF opens Q2 base resistor and puts R24 in circuit
// Shaper: D4, R22 1k, C5 100uF, R23 2.2k, R24 47k (switched in on OFF)
// Osc: T3/T4 NPN astable, C1/C2 10nF, R1/R2 4.7k, BASE (S5) = 470k/220k/100k
// Output: single high-pass, 100nF into ~100k (tau ~10 ms, measured on the original)
// Rail: C10 is 1uF, so power-on is an instant step; power-off is clean, and the circuit then drains through its own resistors
// Transistors: finite gain (beta) and turn-off lag, so starved bases give the squeal mode (power-on, BEAT OFF climb and top)
// Vebo: base-emitter breakdown clamp; avalanche noise on it = grit









































sr = samplerate;
dt = 1.0 / sr;
gm = 0.0;

// ---------- Supply rail: instant on (C10 = 1uF), clean off ----------
// power: TRIG held (momentary power switch)
pw = 0.0;
if (trig > 0.5) {
	pw = 1.0;
}
pk = pe;
if (pw > 0.5) {
	pk = 1.0;
}
else {
	pk = pk - pk * (1.0 - exp(0.0 - dt / 0.002));
}
pe = pk;
cold = 0.0;
if (pw < 0.5 && pk < 0.0005) {
	cold = 1.0;
}
// BATTERY (gimmick macro): 100% = the original, calibrated 9.0 V sound. As it drains, the rail drops
// and sags with the circuit's own current draw, and the calibration trims drift together:
// caps run slow (lower pitch, slower LFO), transistor gain falls, switch-off gets lazier.
lf = clamp(battery * 0.01, 0.0, 1.0);
dr = pow(1.0 - lf, 1.3);
vemf = (lf >= 0.2 ? 7.6 + 1.9 * (lf - 0.2) / 0.8 : 5.5 + 2.1 * sqrt(lf / 0.2)) * 9.0 / 9.5;
rint = 1.5 / (lf + 0.025) - 1.5 / 1.025;
vsup = max(vemf - ibat * rint, 0.0);
osc_e = osc_tol * (1.0 + 0.15 * dr);
lfo_e = lfo_tol * (1.0 + 0.35 * dr);
beta_e = 205.0 * gain_tol * (1.0 - 0.25 * dr);
ts_e = 60.0 * lag_tol * (1.0 + 0.5 * dr);
vr = 0.0;
if (pk > 0.0005) {
	vr = vsup;
}
rail = vr;
alive = 0.0;
if (vr > 1.2) {
	alive = 1.0;
}

// ---------- LFO (BEAT): Q1/Q2 BC557 astable, C3/C4 10uF, R14/R15 1k, D3 ----------
// SW1 pole B: Q1 base 47k/22k/10k/10k. Pole C: Q2 base 47k/22k/10k/open (OFF)
lp = floor(lfo_pos + 0.5);
rb1 = lp < 0.5 ? 47000.0 : (lp < 1.5 ? 22000.0 : 10000.0);
gb2 = lp < 0.5 ? 1.0 / 47000.0 : (lp < 1.5 ? 1.0 / 22000.0 : (lp < 2.5 ? 1.0 / 10000.0 : 0.0));
cl = 0.00001 * lfo_e;
k14 = dt / (1000.0 * cl);
kb1 = dt / (rb1 * cl);
kb2 = dt * gb2 / cl;
// LFO cold start: after power-on with the LFO caps drained, Q2's first turn-on comes later than the ideal
// astable predicts. Fitted to the cold power-on recordings (BEAT 1 and 3): 32 ms + 0.1 x Rb2 x C3.
ch = coldh;
la = lage;
if (alive > 0.5 && palive < 0.5) {
	ch = (abs(q3) < 0.5 && abs(q4) < 0.5) ? 1.0 : 0.0;
	la = 0.0;
}
if (alive > 0.5) {
	la = la + dt;
}
palive = alive;
lage = la;
tcold = 0.032;
if (gb2 > 0.0) {
	tcold = 0.032 + 0.1 * cl / gb2;
}
hold2 = 0.0;
if (ch > 0.5 && la < tcold) {
	hold2 = 1.0;
}
if (ch > 0.5 && la >= tcold) {
	ch = 0.0;
}
coldh = ch;
hit = 0.0;
if (s1 > 0.5 && alive > 0.5) {
	hit = 1.0;
}
a1on = on1;
a2on = on2;
c3 = q3;
c4 = q4;
rb2e = 0.0;
lnode = 0.0;
d3 = 0.0;
n4 = 0.0;
bq1 = 0.0;
bq2 = 0.0;
q1c = 0.0;
kl1 = 0.0;
kl2 = 0.0;
if (alive > 0.5) {
	if (hit > 0.5) {
		lnode = vr;
	}
	else if (a2on > 0.5) {
		lnode = vr - 0.1;
	}
	d3 = lnode > 0.7 ? 1.0 : 0.0;
	n4 = lnode - 0.6;
	// Q1
	bq1 = vr - 0.6;
	if (a1on > 0.5) {
		if (d3 > 0.5) {
			if (n4 - c4 > vr - 0.55) {
				a1on = 0.0;
			}
			else {
				c4 = n4 - bq1;
			}
		}
		else {
			c4 = (c4 - k14 * bq1) / (1.0 + k14);
		}
	}
	if (a1on < 0.5) {
		if (d3 > 0.5) {
			c4 = (c4 + kb1 * n4) / (1.0 + kb1);
			bq1 = n4 - c4;
			if (bq1 > vr + vebo) {
				bq1 = vr + vebo;
				c4 = n4 - bq1;
			}
		}
		else {
			kl1 = dt / ((1000.0 + rb1) * cl);
			c4 = c4 / (1.0 + kl1);
			bq1 = 0.0 - c4 * rb1 / (1000.0 + rb1);
		}
		if (vr - bq1 >= 0.6) {
			a1on = 1.0;
		}
	}
	// Q2
	q1c = vr - 0.1;
	bq2 = vr - 0.6;
	if (a2on > 0.5) {
		if (a1on > 0.5) {
			if (q1c - c3 > vr - 0.55) {
				a2on = 0.0;
			}
			else {
				c3 = q1c - bq2;
			}
		}
		else {
			c3 = (c3 - k14 * bq2) / (1.0 + k14);
		}
	}
	if (a2on < 0.5) {
		if (a1on > 0.5) {
			c3 = (c3 + kb2 * q1c) / (1.0 + kb2);
			bq2 = q1c - c3;
			if (bq2 > vr + vebo) {
				bq2 = vr + vebo;
				c3 = q1c - bq2;
			}
		}
		else if (gb2 > 0.0) {
			kl2 = dt / ((1000.0 + 1.0 / gb2) * cl);
			c3 = c3 / (1.0 + kl2);
			bq2 = 0.0 - c3 * (1.0 / gb2) / (1000.0 + 1.0 / gb2);
		}
		else {
			bq2 = 0.0 - c3;
		}
		if (vr - bq2 >= 0.6 && hold2 < 0.5) {
			a2on = 1.0;
		}
	}
	if (hit > 0.5) {
		lnode = vr;
	}
	else if (a2on > 0.5) {
		lnode = vr - 0.1;
	}
	else {
		lnode = 0.0;
	}
}
if (alive < 0.5) {
	// unpowered: LFO caps drain through their resistors; Q1 conducts first at the next power-on
	a1on = 1.0;
	a2on = 0.0;
	rb2e = gb2 > 0.0 ? 1.0 / gb2 : 1000000.0;
	c3 = c3 * exp(0.0 - dt / ((1000.0 + rb2e) * cl));
	c4 = c4 * exp(0.0 - dt / ((1000.0 + rb1) * cl));
}
on1 = a1on;
on2 = a2on;
q3 = c3;
q4 = c4;
drv = lnode > 0.7 ? 1.0 : 0.0;

// ---------- MODE routing into the oscillator base networks ----------
c = vc5;
md = floor(mode + 0.5);
op = floor(osc_pos + 0.5);
ro = op < 0.5 ? 470000.0 : (op < 1.5 ? 220000.0 : (op < 2.5 ? 100000.0 : 68000.0));
gr = 1.0 / ro;
gf = 1.0 / 220000.0;
vf = max(vr - 0.6, 0.0);
v4 = 0.0;
g4 = 0.0;
sh4 = 0.0;
v3 = 0.0;
g3 = 0.0;
sh3 = 0.0;
// SW2: pos1 Q4<-V+, Q3<-shaped | pos2 Q4<-V+, Q3<-LFO | pos3 both<-LFO + D1/D2 220k floor | pos4 both<-shaped
if (md < 0.5) {
	v4 = vr;
	g4 = gr;
	v3 = c;
	g3 = gr;
	sh3 = 1.0;
}
else if (md < 1.5) {
	v4 = vr;
	g4 = gr;
	if (drv > 0.5) {
		v3 = lnode;
		g3 = gr;
	}
}
else if (md < 2.5) {
	if (drv > 0.5) {
		g4 = gr + gf;
		v4 = (lnode * gr + vf * gf) / g4;
	}
	else {
		// LFO node floating: the two base networks couple through it (2R towards the on base)
		g4 = gf + 0.5 * gr;
		v4 = (vf * gf + 0.6 * 0.5 * gr) / g4;
	}
	v3 = v4;
	g3 = g4;
}
else {
	v4 = c;
	g4 = gr;
	sh4 = 1.0;
	v3 = c;
	g3 = gr;
	sh3 = 1.0;
}

// ---------- Oscillator + output network, 8x oversampled ----------
h = dt / 8.0;
cap = 0.00000001 * osc_e;
k4 = h * g4 / cap;
k3 = h * g3 / cap;
kc = h / (4700.0 * cap);
g9 = 0.0000001 / h;
g8 = g9;
ga = 1.0 / 100000.0;
gb = 1.0 / 13200.0;
kb = g8 / (g8 + gb);
da = g9 + ga;
a1 = g9 / da;
g2 = 1.0 / 4700.0;
gc2 = cap / h;

on4 = t4on;
c1 = v1;
c2 = v2;
c9 = v9;
c8 = v8;
vc4 = 0.1;
vb3 = 0.6;
vb4 = 0.6;
a0 = 0.0;
va = 0.0;
vbn = 0.0;
vz = vebo;
thr = 0.6;
acc = 0.0;
iacc = 0.0;
kbeta = beta_e * 4700.0;
klag = 1.0 - exp(0.0 - h / (ts_e * 0.000001));
ib3 = g3 * (v3 - 0.6);
ib4 = g4 * (v4 - 0.6);
s3 = st3;
s4 = st4;
i1 = hc1;
i2 = hc2;
vc3 = 0.1;
vc3x = 0.1;
icol = 0.0;
c1n = 0.0;
tg = 0.0;
if (alive > 0.5) {
	for (n = 0.0; n < 8.0; n += 1.0) {
		vz = vebo + grit * 0.4 * noise();
		thr = 0.6 + grit * 0.004 * noise();
		if (on4 > 0.5) {
			// Q4 on: its collector is held down only while base drive (steady + coupling from Q3's recovering collector) covers the collector current
			c1n = (c1 + kc * vf) / (1.0 + kc);
			i1 = (c1n - c1) * cap / h;
			c1 = c1n;
			tg = clamp(vr - kbeta * (ib4 + i1), 0.1, max(vr, 0.1));
			if (tg < s4) {
				s4 = tg;
			}
			else {
				s4 = s4 + (tg - s4) * klag;
			}
			vc4 = s4;
			c2 = (c2 - k3 * (v3 - vc4)) / (1.0 + k3);
			vb3 = vc4 - c2;
			if (vb3 < 0.0 - vz) {
				vb3 = 0.0 - vz;
				c2 = vc4 + vz;
			}
			vb4 = 0.6;
			vc3x = 0.6 + c1;
			if (vb3 >= thr) {
				on4 = 0.0;
				s3 = 0.1;
			}
		}
		else {
			// Q3 on: same limit on its collector, driven by coupling from Q4's recovering collector
			tg = clamp(vr - kbeta * (ib3 + i2), 0.1, max(vr, 0.1));
			if (tg < s3) {
				s3 = tg;
			}
			else {
				s3 = s3 + (tg - s3) * klag;
			}
			vc3 = s3;
			vc3x = vc3;
			c1 = (c1 - k4 * (v4 - vc3)) / (1.0 + k4);
			vb4 = vc3 - c1;
			if (vb4 < 0.0 - vz) {
				vb4 = 0.0 - vz;
				c1 = vc3 + vz;
			}
			vb3 = 0.6;
			a0 = (0.0 - g9 * c9) / da;
			vc4 = (vr * g2 + gc2 * (0.6 + c2) + g9 * c9 + g9 * a0) / (g2 + gc2 + g9 - g9 * a1);
			i2 = gc2 * (vc4 - 0.6 - c2);
			c2 = vc4 - 0.6;
			if (vb4 >= thr) {
				on4 = 1.0;
				s4 = 0.1;
			}
		}
		a0 = (0.0 - g9 * c9) / da;
		va = a1 * vc4 + a0;
		vbn = va;
		c9 = vc4 - va;
		acc = acc + vbn;
		icol = icol + (vr - vc4) / 4700.0 + (vr - vc3x) / 4700.0;
		iacc = iacc + sh4 * g4 * (v4 - vb4) + sh3 * g3 * (v3 - vb3);
	}
}
else {
	// unpowered: oscillator and output caps drain in milliseconds
	c1 = c1 * exp(0.0 - dt / 0.002);
	c2 = c2 * exp(0.0 - dt / 0.002);
	c9 = c9 * exp(0.0 - dt / 0.01);
}
st3 = s3;
st4 = s4;
hc1 = i1;
hc2 = i2;

// ---------- C5 shaper: D4, R22, C5, R23, R24 (SW1 pole A), S2 via R25 ----------
rg = lp > 2.5 ? 49200.0 : 2200.0;
vth = 0.0;
rth = rg;
if (s2 > 0.5 && alive > 0.5) {
	vth = vr * rg / (rg + 10000.0);
	rth = rg * 10000.0 / (rg + 10000.0);
}
ic = (vth - c) / (rth + 1000.0);
vx = c + ic * 1000.0;
vd = lnode - 0.6;
if (drv > 0.5 && vd > vx) {
	ic = (vd - c) / 1000.0;
	vx = vd;
}
cn = c + dt * (ic - iacc / 8.0) / 0.0001;
led = clamp((vx - 2.4) / 5.9, 0.0, 1.0) * alive;
// current drawn from the supply this sample (used next sample): LFO transistors through their 1k loads,
// LED driver T5, the two oscillator collectors, and SIREN's 10k
itot = 0.0;
if (alive > 0.5) {
	itot = (on1 + on2) * vr / 1000.0 + max(vx - 2.4, 0.0) / 1000.0 + icol / 8.0 + s2 * max(vr - vx, 0.0) / 10000.0;
}
ibat = itot;

vc5 = cn;
t4on = on4;
v1 = c1;
v2 = c2;
v9 = c9;
v8 = c8;

// ---------- Optional amp gate ----------
en = 1.0;
if (gm > 0.5 && gm < 1.5) {
	gon = max(max(s1, s2), trig);
	ka = 1.0 - exp(0.0 - 1.0 / (0.002 * sr));
	kh = 1.0 - exp(0.0 - 1.0 / (hold_ms * 0.001 * sr));
	en = env;
	if (gon > 0.5) {
		en = en + (1.0 - en) * ka;
	}
	else {
		en = en - en * kh;
	}
}
env = en;

o = acc / 8.0 * 0.1 * vol * vol * en * pk;
out1 = o;
out2 = o;
out3 = led * pk;

}
function set(n,v){ switch(n){case 'lfo_pos': lfo_pos=v; break;case 'mode': mode=v; break;case 'osc_pos': osc_pos=v; break;case 's1': s1=v; break;case 's2': s2=v; break;case 'trig': trig=v; break;case 'gatemode': gatemode=v; break;case 'power': power=v; break;case 'vol': vol=v; break;case 'lfo_tol': lfo_tol=v; break;case 'osc_tol': osc_tol=v; break;case 'hold_ms': hold_ms=v; break;case 'vebo': vebo=v; break;case 'grit': grit=v; break;case 'gain_tol': gain_tol=v; break;case 'lag_tol': lag_tol=v; break;case 'battery': battery=v; break;} }
return {set, tick, get out1(){return out1;}, get out3(){return out3;}};
}
