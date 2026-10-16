// ---------- engine: the Synare v18 gen~ code (synare_v15.genexpr), transpiled sample for sample ----------
const EP = {"tune_hz": 135, "sweep_hz": 1150, "res_amt": 1, "fdec_s": 0.17, "adec_s": 0.21, "o2mod_hz": 0, "o1_hz": 200, "o1_mode": 0, "o2_hz": 100, "o2_mode": 0, "vol_amp": 0.5, "sens_amt": 0.5, "snap_n": 0, "key_on": 0, "key_hz": 130.8128, "nl_k": 14.7, "nl_b": 0.2, "lp_hz": 6000, "cft": 0.22, "nrm": 2.85, "test_vca": 0, "pscale": 0, "sh_d": 0.7, "sh_b": 0.3, "trk_drive": 0, "trk_char": 83, "trk_odd": 0.3, "trk_shelf": 3, "trk_kp": 8, "trk_kn": 8, "trk_lim": 6, "trk_rel": 0.03, "jit_f": 0.02, "jit_s": 0.3, "lock_on": 1, "lock_th": 0.3, "lock_fd": 0.0005}, EH = {"t_h": 10, "vel_h": 0, "cf_h": 0, "ca_h": 0, "cx_h": 0, "s1_h": 0, "s2_h": 0, "s3_h": 0, "s4_h": 0, "c1_h": 0.5, "q1_h": 1, "c2_h": 0.5, "q2_h": 1, "hpx_h": 0, "hpy_h": 0, "sm_tune": 135, "sm_sweep": 1150, "sm_mod": 0, "sm_res": 1, "g1_h": 0, "gn_h": 0, "g2_h": 0, "snap_h": 0, "dcx_h": 0, "dcy_h": 0, "lp_h": 0, "jf_h": 0, "js_h": 0, "sh_h": 0, "ao_h": 0, "fx_h": 0, "fy_h": 0, "le_h": 0, "b1_h": 0, "b2_h": 0, "b3_h": 0, "b4_h": 0, "c1b_h": 0.5, "q1b_h": 1, "c2b_h": 0.5, "q2b_h": 1, "r1_h": 0, "r2_h": 0, "r3_h": 0, "r4_h": 0, "ry_h": 0, "z1_h": 0, "z2_h": 0, "z3_h": 0, "z4_h": 0, "act_h": 0, "fd_h": 1};
const BASE = { res_amt: 1.0, sweep_hz: 2000.0, tune_hz: 150.0, fdec_s: 0.4, adec_s: 0.745, o1_mode: 0.0, o2_mode: 2.0, o2_hz: 100.0,
  o2mod_hz: 0.0, sens_amt: 0.5, vol_amp: 1.0, key_on: 0.0, trk_lim: 6.0, trk_char: 83.0, lock_on: 1.0 };
function synTick(P, H, IN, SR, CL, NZ) { let OUT;
let tt,vv,cf,ca,cx,s1,s2,s3,s4,c1,q1,c2,q2,hpx,hpy,isr,ksm,ksw,tn,sw,md,rs,w1,wn,w2,g1,gn,g2,kon,tnorm,koct,kbase,fdec_e,o1_e,o2_e,kn1,st1,iv1,kn2,st2,iv2,s1b,s2b,s3b,s4b,c1b,q1b,c2b,q2b,act,fd,vq,tp,pls,oa,ofl,katt,tgf,tga,ef,ea,ex,lnr,rc1,f2,rc2,k1,c1p,rr1,k2,c2p,rr2,c1bp,rb1,c2bp,rb2,sq1b,sq2b,trib,sq1,sq2,tri,jf,js,fpre,kvib,kvibb,fjit,fc,fcb,frest,fcr,nz1,nz2,kk,gg,gq,bq,xin,sumS,uu,v1,y1,v2,y2,v3,y3,v4,y4a,ggb,gqb,bqb,xinb,sumB,ub,w1b,y1b,w2b,y2b,w3b,y3b,w4b,y4b,ggr,gqr,bqr,sr1,sr2,sr3,sr4,sumR,ur,w1r,y1r,w2r,y2r,w3r,y3r,w4r,y4r,y4,vca,yn0,yq,yn,kdc,dcy,sig,ao,dof,sb,cl,klp,lpv,khp,hp,dwet,ksh,shl,shg,tu,cwet,lin,le,lg,todd,dout,cn,tcl,trkv,kfin,fy,outv;
tt = H.t_h;
vv = H.vel_h;
cf = H.cf_h;
ca = H.ca_h;
cx = H.cx_h;
s1 = H.s1_h;
s2 = H.s2_h;
s3 = H.s3_h;
s4 = H.s4_h;
c1 = H.c1_h;
q1 = H.q1_h;
c2 = H.c2_h;
q2 = H.q2_h;
hpx = H.hpx_h;
hpy = H.hpy_h;
isr = 1.0 / SR;
ksm = 1.0 - Math.exp(-isr / 0.02);
ksw = 1.0 - Math.exp(-isr / 0.005);
if (P.snap_n != H.snap_h) { ksm = 1.0; }
tn = H.sm_tune + (P.tune_hz - H.sm_tune) * ksm;
sw = H.sm_sweep + (P.sweep_hz - H.sm_sweep) * ksm;
md = H.sm_mod + (P.o2mod_hz - H.sm_mod) * ksm;
rs = H.sm_res + (P.res_amt - H.sm_res) * ksm;
w1 = 0.0;
wn = 0.0;
w2 = 0.0;
if (P.o1_mode > 0.5 && P.o1_mode < 1.5) { w1 = 1.0; }
if (P.o1_mode > 1.5) { wn = 1.0; }
if (P.o2_mode > 0.5 && P.o2_mode < 1.5) { w2 = 1.0; }
g1 = H.g1_h + (w1 - H.g1_h) * ksw;
gn = H.gn_h + (wn - H.gn_h) * ksw;
g2 = H.g2_h + (w2 - H.g2_h) * ksw;
kon = 0.0;
if (P.key_on > 0.5) { kon = 1.0; }
tnorm = Math.pow(CL((P.tune_hz - 15.0) / 3985.0, 0.0, 1.0), 1.0 / 3.0);
koct = 0.0;
if (tnorm < 0.3109) { koct = Math.floor((tnorm - 0.3109) / 0.3109 * 2.0 + 0.5); }
else { koct = Math.floor((tnorm - 0.3109) / 0.6891 * 2.0 + 0.5); }
kbase = CL(P.key_hz * Math.pow(2.0, CL(koct, -2.0, 2.0)), 15.0, 4000.0);
fdec_e = P.fdec_s;
if (kon > 0.5) { fdec_e = 0.005 + (P.fdec_s - 0.005) * 0.145; }
o1_e = P.o1_hz;
o2_e = P.o2_hz;
if (kon > 0.5) {
	kn1 = 1.0 - Math.sqrt(Math.max((33000.0 / Math.max(P.o1_hz, 1.0) - 22.0) / 1000.0, 0.0));
	st1 = Math.floor(CL(kn1, 0.0, 1.0) * 6.0 + 0.5);
	iv1 = -24.0;
	if (st1 > 0.5) { iv1 = -12.0; }
	if (st1 > 1.5) { iv1 = -5.0; }
	if (st1 > 2.5) { iv1 = 0.0; }
	if (st1 > 3.5) { iv1 = 7.0; }
	if (st1 > 4.5) { iv1 = 12.0; }
	if (st1 > 5.5) { iv1 = 24.0; }
	o1_e = P.key_hz * Math.pow(2.0, iv1 / 12.0);
	if (P.o2_mode < 1.5) {
		kn2 = 1.0 - Math.sqrt(Math.max((33000.0 / Math.max(P.o2_hz, 1.0) - 22.0) / 1000.0, 0.0));
		st2 = Math.floor(CL(kn2, 0.0, 1.0) * 6.0 + 0.5);
		iv2 = -24.0;
		if (st2 > 0.5) { iv2 = -12.0; }
		if (st2 > 1.5) { iv2 = -5.0; }
		if (st2 > 2.5) { iv2 = 0.0; }
		if (st2 > 3.5) { iv2 = 7.0; }
		if (st2 > 4.5) { iv2 = 12.0; }
		if (st2 > 5.5) { iv2 = 24.0; }
		o2_e = P.key_hz * Math.pow(2.0, iv2 / 12.0);
	}
}
s1b = H.b1_h;
s2b = H.b2_h;
s3b = H.b3_h;
s4b = H.b4_h;
c1b = H.c1b_h;
q1b = H.q1b_h;
c2b = H.c2b_h;
q2b = H.q2b_h;
act = H.act_h;
fd = Math.min(H.fd_h + isr / Math.max(P.lock_fd, 0.0002), 1.0);
if (IN > 0.0) {
	tt = 0.0;
	vv = Math.min(IN * (0.3 + 1.7 * P.sens_amt), 1.0);
	vq = 0.9 * (Math.max(ca - 0.045, 0.0) + 1.431 * Math.max(cx - 0.045, 0.0));
	if (P.lock_on > 0.5 && vq < P.lock_th) {
		act = 1.0 - act;
		fd = 0.0;
		if (vq < 0.002) { fd = 1.0; }
		if (act > 0.5) {
			q1b = 1.0;
			c1b = 0.4;
			q2b = 1.0;
			c2b = 0.5;
			s1b = H.z1_h;
			s2b = H.z2_h;
			s3b = H.z3_h;
			s4b = H.z4_h;
		}
		else {
			q1 = 1.0;
			c1 = 0.4;
			q2 = 1.0;
			c2 = 0.5;
			s1 = H.z1_h;
			s2 = H.z2_h;
			s3 = H.z3_h;
			s4 = H.z4_h;
		}
	}
}
if (P.lock_on < 0.5) {
	act = 0.0;
	fd = 1.0;
}
tt = tt + isr;
tp = 0.0338;
pls = 0.0;
if (tt < tp) { pls = vv * Math.sin(3.14159265 * tt / tp); }
oa = 0.045;
ofl = 0.0604;
katt = 1.0 - Math.exp(-isr / 0.001);
tgf = pls * (1.0 + ofl);
tga = pls * (1.0 + oa);
if (tgf > cf) { cf = cf + (tgf - cf) * katt; } else { cf = cf * Math.exp(-isr / Math.max(fdec_e, 0.005)); }
if (tga > ca) { ca = ca + (tga - ca) * katt; } else { ca = ca * Math.exp(-isr / Math.max(P.adec_s, 0.005)); }
if (tga > cx) { cx = cx + (tga - cx) * katt; } else { cx = cx * Math.exp(-isr / 0.0234); }
ef = Math.max(cf - ofl, 0.0);
ea = Math.max(ca - oa, 0.0);
ex = Math.max(cx - oa, 0.0);
lnr = 0.405465;
rc1 = 1.0 / (2.0 * lnr * Math.max(o1_e, 1.0));
f2 = Math.max(o2_e, 1.0);
if (P.o2_mode > 1.5) { f2 = f2 / 20.0; }
rc2 = 1.0 / (2.0 * lnr * f2);
k1 = 1.0 - Math.exp(-isr / rc1);
c1p = c1;
c1 = c1 + (q1 - c1) * k1;
if (q1 > 0.5 && c1 > 0.6) { rr1 = isr - rc1 * Math.log((1.0 - c1p) / 0.4); q1 = 0.0; c1 = 0.6 * Math.exp(-Math.max(rr1, 0.0) / rc1); }
else if (q1 < 0.5 && c1 < 0.4) { rr1 = isr - rc1 * Math.log(c1p / 0.4); q1 = 1.0; c1 = 1.0 - 0.6 * Math.exp(-Math.max(rr1, 0.0) / rc1); }
k2 = 1.0 - Math.exp(-isr / rc2);
c2p = c2;
c2 = c2 + (q2 - c2) * k2;
if (q2 > 0.5 && c2 > 0.6) { rr2 = isr - rc2 * Math.log((1.0 - c2p) / 0.4); q2 = 0.0; c2 = 0.6 * Math.exp(-Math.max(rr2, 0.0) / rc2); }
else if (q2 < 0.5 && c2 < 0.4) { rr2 = isr - rc2 * Math.log(c2p / 0.4); q2 = 1.0; c2 = 1.0 - 0.6 * Math.exp(-Math.max(rr2, 0.0) / rc2); }
c1bp = c1b;
c1b = c1b + (q1b - c1b) * k1;
if (q1b > 0.5 && c1b > 0.6) { rb1 = isr - rc1 * Math.log((1.0 - c1bp) / 0.4); q1b = 0.0; c1b = 0.6 * Math.exp(-Math.max(rb1, 0.0) / rc1); }
else if (q1b < 0.5 && c1b < 0.4) { rb1 = isr - rc1 * Math.log(c1bp / 0.4); q1b = 1.0; c1b = 1.0 - 0.6 * Math.exp(-Math.max(rb1, 0.0) / rc1); }
c2bp = c2b;
c2b = c2b + (q2b - c2b) * k2;
if (q2b > 0.5 && c2b > 0.6) { rb2 = isr - rc2 * Math.log((1.0 - c2bp) / 0.4); q2b = 0.0; c2b = 0.6 * Math.exp(-Math.max(rb2, 0.0) / rc2); }
else if (q2b < 0.5 && c2b < 0.4) { rb2 = isr - rc2 * Math.log(c2bp / 0.4); q2b = 1.0; c2b = 1.0 - 0.6 * Math.exp(-Math.max(rb2, 0.0) / rc2); }
sq1b = q1b * 2.0 - 1.0;
sq2b = q2b * 2.0 - 1.0;
trib = (c2b - 0.5) * 10.0;
sq1 = q1 * 2.0 - 1.0;
sq2 = q2 * 2.0 - 1.0;
tri = (c2 - 0.5) * 10.0;
jf = H.jf_h + (NZ() - H.jf_h) * (1.0 - Math.exp(-6.28318531 * 300.0 * isr));
js = H.js_h + (NZ() - H.js_h) * (1.0 - Math.exp(-6.28318531 * 4.0 * isr));
fpre = tn + sw * ef;
if (kon > 0.5) { fpre = kbase * (1.0 + (sw / 3000.0) * ef); }
kvib = 1.0;
kvibb = 1.0;
if (kon > 0.5) {
	kvib = Math.pow(2.0, tri * md * 0.02 / 1200.0);
	kvibb = Math.pow(2.0, trib * md * 0.02 / 1200.0);
}
fjit = (1.0 + P.jit_f * jf + P.jit_s * js) * (1.0034 + 0.007 * rs - 0.0042 * Math.pow(CL((1.0 - rs) / 0.65, 0.0, 1.0), 4.0));
fc = CL((fpre * kvib + md * tri * (1.0 - kon)) * fjit, 15.0, 0.4 * SR);
fcb = CL((fpre * kvibb + md * trib * (1.0 - kon)) * fjit, 15.0, 0.4 * SR);
frest = tn;
if (kon > 0.5) { frest = kbase; }
fcr = CL(frest * fjit, 15.0, 0.4 * SR);
nz1 = NZ();
nz2 = NZ();
kk = P.nl_k * CL(rs, 0.0, 1.0);
gg = Math.tan(3.14159265 * fc * isr);
gq = gg / (1.0 + gg);
bq = 1.0 / (1.0 + gg);
xin = 0.16 * (g1 * sq1 + gn * nz1 + g2 * sq2) + 0.00001 * nz2;
sumS = gq * gq * gq * bq * s1 + gq * gq * bq * s2 + gq * bq * s3 + bq * s4;
uu = Math.tanh((xin - kk * sumS) / (1.0 + kk * gq * gq * gq * gq) + P.nl_b) - Math.tanh(P.nl_b);
v1 = (uu - s1) * gq;
y1 = v1 + s1;
s1 = y1 + v1;
v2 = (y1 - s2) * gq;
y2 = v2 + s2;
s2 = y2 + v2;
v3 = (y2 - s3) * gq;
y3 = v3 + s3;
s3 = y3 + v3;
v4 = (y3 - s4) * gq;
y4a = v4 + s4;
s4 = y4a + v4;
ggb = Math.tan(3.14159265 * fcb * isr);
gqb = ggb / (1.0 + ggb);
bqb = 1.0 / (1.0 + ggb);
xinb = 0.16 * (g1 * sq1b + gn * nz1 + g2 * sq2b) + 0.00001 * nz2;
sumB = gqb * gqb * gqb * bqb * s1b + gqb * gqb * bqb * s2b + gqb * bqb * s3b + bqb * s4b;
ub = Math.tanh((xinb - kk * sumB) / (1.0 + kk * gqb * gqb * gqb * gqb) + P.nl_b) - Math.tanh(P.nl_b);
w1b = (ub - s1b) * gqb;
y1b = w1b + s1b;
s1b = y1b + w1b;
w2b = (y1b - s2b) * gqb;
y2b = w2b + s2b;
s2b = y2b + w2b;
w3b = (y2b - s3b) * gqb;
y3b = w3b + s3b;
s3b = y3b + w3b;
w4b = (y3b - s4b) * gqb;
y4b = w4b + s4b;
s4b = y4b + w4b;
ggr = Math.tan(3.14159265 * fcr * isr);
gqr = ggr / (1.0 + ggr);
bqr = 1.0 / (1.0 + ggr);
sr1 = H.r1_h;
sr2 = H.r2_h;
sr3 = H.r3_h;
sr4 = H.r4_h;
sumR = gqr * gqr * gqr * bqr * sr1 + gqr * gqr * bqr * sr2 + gqr * bqr * sr3 + bqr * sr4;
ur = Math.tanh((0.00001 - kk * sumR) / (1.0 + kk * gqr * gqr * gqr * gqr) + P.nl_b) - Math.tanh(P.nl_b);
w1r = (ur - sr1) * gqr;
y1r = w1r + sr1;
sr1 = y1r + w1r;
w2r = (y1r - sr2) * gqr;
y2r = w2r + sr2;
sr2 = y2r + w2r;
w3r = (y2r - sr3) * gqr;
y3r = w3r + sr3;
sr3 = y3r + w3r;
w4r = (y3r - sr4) * gqr;
y4r = w4r + sr4;
sr4 = y4r + w4r;
if (H.ry_h < 0.0 && y4r >= 0.0) {
	H.z1_h = sr1;
	H.z2_h = sr2;
	H.z3_h = sr3;
	H.z4_h = sr4;
}
H.r1_h = sr1;
H.r2_h = sr2;
H.r3_h = sr3;
H.r4_h = sr4;
H.ry_h = y4r;
y4 = y4a;
if (act > 0.5) { y4 = y4b * fd + y4a * (1.0 - fd); }
else { y4 = y4a * fd + y4b * (1.0 - fd); }
H.b1_h = s1b;
H.b2_h = s2b;
H.b3_h = s3b;
H.b4_h = s4b;
H.c1b_h = c1b;
H.q1b_h = q1b;
H.c2b_h = c2b;
H.q2b_h = q2b;
H.act_h = act;
H.fd_h = fd;
vca = 0.9 * (ea + 1.431 * ex) + P.test_vca;
yn0 = y4 * P.nrm;
yq = yn0 * yn0;
yn = yn0 + P.pscale * (0.09 * yq + 0.08 * yq * yn0 + 0.025 * yq * yq + 0.016 * yq * yq * yn0);
yn = (Math.tanh(P.sh_d * (yn + P.sh_b)) - Math.tanh(P.sh_d * P.sh_b)) / Math.tanh(P.sh_d);
kdc = Math.exp(-6.28318531 * 5.0 * isr);
dcy = kdc * (H.dcy_h + yn - H.dcx_h);
sig = dcy * vca;
ao = H.ao_h + (Math.abs(dcy) - H.ao_h) * (1.0 - Math.exp(-isr / 0.01));
dof = P.cft * vca * Math.min(ao / 0.6, 1.0);
sb = sig + dof;
cl = sb / Math.pow(1.0 + Math.pow(Math.abs(sb), 10.0), 0.1);
klp = 1.0 - Math.exp(-6.28318531 * P.lp_hz * isr);
lpv = H.lp_h + (cl - H.lp_h) * klp;
khp = Math.exp(-6.28318531 * 5.0 * isr);
hp = khp * (hpy + lpv - hpx);
dwet = CL(P.trk_lim / 2.0, 0.0, 1.0);
ksh = 1.0 - Math.exp(-6.28318531 * 1500.0 * isr);
shl = H.sh_h + (hp - H.sh_h) * ksh;
shg = Math.pow(10.0, P.trk_shelf / 20.0);
tu = (shl + (hp - shl) * shg) * Math.pow(10.0, (P.trk_drive + P.trk_lim) / 20.0);
cwet = CL(P.trk_char / 10.0, 0.0, 1.0);
lin = Math.max(tu, -tu * (1.0 - cwet));
le = H.le_h * Math.exp(-isr / Math.max(P.trk_rel, 0.005));
if (lin > le) { le = lin; }
lg = 1.0;
if (le > 1.0) { lg = 1.0 / le; }
tu = tu * lg;
todd = Math.tanh(P.trk_odd * tu) / Math.max(P.trk_odd, 0.001);
dout = hp + (todd - hp) * dwet;
cn = 1.0 / (1.0 + CL(P.trk_char, 0.0, 100.0) * 0.006);
tcl = dout / Math.pow(1.0 + Math.pow(Math.abs(dout), P.trk_kp), 1.0 / P.trk_kp);
if (dout < 0.0) { tcl = -cn * (Math.abs(dout) / cn) / Math.pow(1.0 + Math.pow(Math.abs(dout) / cn, P.trk_kn), 1.0 / P.trk_kn); }
trkv = dout + (tcl - dout) * cwet;
kfin = Math.exp(-6.28318531 * 0.5 * isr);
fy = kfin * (H.fy_h + trkv - H.fx_h);
outv = fy * P.vol_amp * 0.5;
OUT = outv;
OUT = outv;
H.t_h = tt;
H.vel_h = vv;
H.cf_h = cf;
H.ca_h = ca;
H.cx_h = cx;
H.s1_h = s1;
H.s2_h = s2;
H.s3_h = s3;
H.s4_h = s4;
H.c1_h = c1;
H.q1_h = q1;
H.c2_h = c2;
H.q2_h = q2;
H.hpx_h = lpv;
H.dcx_h = yn;
H.dcy_h = dcy;
H.lp_h = lpv;
H.jf_h = jf;
H.sh_h = shl;
H.ao_h = ao;
H.fx_h = trkv;
H.fy_h = fy;
H.le_h = le;
H.js_h = js;
H.hpy_h = hp;
H.sm_tune = tn;
H.snap_h = P.snap_n;
H.sm_sweep = sw;
H.sm_mod = md;
H.sm_res = rs;
H.g1_h = g1;
H.gn_h = gn;
H.g2_h = g2;
return OUT; }

// worklet source built from the same function text, so main thread and worklet run identical code
function workletSource() {
  return `const EP=${JSON.stringify(EP)},EH=${JSON.stringify(EH)},BASE=${JSON.stringify(BASE)};
${synTick.toString()}
class Syn extends AudioWorkletProcessor{constructor(){super();this.P=Object.assign({},EP,BASE);this.H=Object.assign({},EH);this.hit=0;this.n=0;this.seed=24680;
this.port.onmessage=e=>{const d=e.data;if(d.p)Object.assign(this.P,d.p);if(d.hit)this.hit=Math.max(this.hit,d.hit);};}
process(i,o){const a=o[0][0],b=o[0][1],P=this.P,H=this.H,SR=sampleRate;let s=this.seed;
const NZ=()=>{s=(s*1664525+1013904223)>>>0;return s/2147483648-1;},CL=(x,lo,hi)=>x<lo?lo:x>hi?hi:x;
for(let k=0;k<a.length;k++){const IN=this.hit;this.hit=0;let y=synTick(P,H,IN,SR,CL,NZ);a[k]=y>1?1:y<-1?-1:y;}
if(b)b.set(a);this.seed=s;this.n+=a.length;
if(this.n>=256){this.n=0;this.port.postMessage({fc:H.sm_tune+H.sm_sweep*Math.max(H.cf_h-0.0604,0)+H.sm_mod*(H.c2_h-0.5)*10,amp:0.9*(Math.max(H.ca_h-0.045,0)+1.431*Math.max(H.cx_h-0.045,0))});}
return true;}}
registerProcessor('synare',Syn);`;
}

