const se = Object.defineProperty;
const U = Object.getOwnPropertySymbols;
const ne = Object.prototype.hasOwnProperty; const re = Object.prototype.propertyIsEnumerable;
const J = (r) => {
	throw TypeError(r);
};
const W = (r, t, e) => t in r ? se(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e; const T = (r, t) => {
	for (var e in t || (t = {})) {
		ne.call(t, e) && W(r, e, t[e]);
	}
	if (U) {
		for (var e of U(t)) {
			re.call(t, e) && W(r, e, t[e]);
		}
	}
	return r;
};
const D = (r, t, e) => t.has(r) || J("Cannot " + e);
const a = (r, t, e) => (D(r, t, "read from private field"), e ? e.call(r) : t.get(r)); const S = (r, t, e) => t.has(r) ? J("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e); const I = (r, t, e, i) => (D(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e); const L = (r, t, e) => (D(r, t, "access private method"), e);
const p = (r, t, e) => new Promise((i, d) => {
	const s = (f) => {
		try {
			o(e.next(f));
		} catch (c) {
			d(c);
		}
	}; const l = (f) => {
		try {
			o(e.throw(f));
		} catch (c) {
			d(c);
		}
	}; var o = f => f.done ? i(f.value) : Promise.resolve(f.value).then(s, l);
	o((e = e.apply(r, t)).next());
});
let m; let w; let b; let M; let g; let h; let y; let N; let V; let Y; let q; let H;
class G {
	constructor(t, e) {
		S(this, y);
		S(this, m);
		S(this, w);
		S(this, b, {});
		S(this, M);
		S(this, g, []);
		S(this, h, !1);
		I(this, m, t), I(this, w, e), L(this, y, Y).call(this);
	}

	getDocument() {
		if (!a(this, h)) {
			return a(this, m).document;
		}
	}

	addListener(t, e, { once: i = !1 } = {}) {
		a(this, h) || a(this, m) && (a(this, b)[t] = { callback: e, once: i });
	}

	removeListener(t) {
		a(this, b)[t] = null, delete a(this, b)[t];
	}

	sendMessage(t, e) {
		if (a(this, h) || !a(this, w) && a(this, h)) return;
		const i = L(this, y, H).call(this);
		return a(this, w).postMessage(JSON.stringify({ type: t, payload: e, msgId: i, waitForResponse: !1 }), "*"), L(this, y, N).call(this, i);
	}

	sendRequest(t, e) {
		if (a(this, h) || !a(this, w) && a(this, h)) return;
		const i = L(this, y, H).call(this);
		return a(this, w).postMessage(JSON.stringify({ type: t, payload: e, msgId: i, waitForResponse: !0 }), "*"), L(this, y, N).call(this, i);
	}

	terminate() {
		if (a(this, m)) {
			for (; a(this, g).length;) {
				const t = a(this, g).pop();
				a(this, m).removeEventListener("message", t.handler, t.useCapture);
			}
			I(this, h, !0);
		}
	}
}
m = new WeakMap(), w = new WeakMap(), b = new WeakMap(), M = new WeakMap(), g = new WeakMap(), h = new WeakMap(), y = new WeakSet(), N = function (t) {
	if (!a(this, h)) {
		return new Promise((e, i) => {
			const s = ((l) => {
				if (l.source !== a(this, w)) return;
				const o = a(this, g).findIndex(c => c._id === t);
				if (o === -1) return;
				const f = a(this, g)[o];
				try {
					const c = L(this, y, q).call(this, l);
					if (c.msgId !== t) return;
					l.stopPropagation(), a(this, m).removeEventListener("message", f.handler, f.useCapture), a(this, g).splice(o, 1), c.error ? i(new Error(c.error)) : e(c.payload);
				} catch (c) {
					return;
				}
			}).bind(this);
			a(this, m).addEventListener("message", s, !0), a(this, g).push({ _id: t, handler: s, useCapture: !0 });
		});
	}
}, V = function (t) {
	return p(this, null, function* () {
		if (a(this, h) || t.source && t.source !== a(this, w)) return;
		let e;
		try {
			e = L(this, y, q).call(this, t);
		} catch (s) {
			return;
		}
		if (!e) return;
		const i = a(this, b)[e.type];
		if (!i) return;
		const d = ({ error: s, payload: l }) => {
			const o = { msgId: e.msgId };
			s ? o.error = typeof s === "string" ? s : (s == null ? void 0 : s.message) || "Unexpected error" : o.payload = l, a(this, w).postMessage(JSON.stringify(o), "*");
		};
		try {
			e.waitForResponse ? d({ payload: yield i.callback(e.payload) }) : (yield i.callback(e.payload), d({ payload: "success" }));
		} catch (s) {
			d({ error: s });
		}
		i.once && this.removeListener(e.type);
	});
}, Y = function () {
	function* t() {
		let i = 0;
		for (; a(this, m) && !a(this, h);) {
			yield `${i++}-${(/* @__PURE__ */ new Date()).getTime()}`;
		}
	}
	I(this, M, t.call(this));
	const e = L(this, y, V).bind(this);
	a(this, m).addEventListener("message", e, !1), a(this, g).push({ _id: `START-${(/* @__PURE__ */ new Date()).getTime()}`, handler: e, useCapture: !1 });
}, q = function (t) {
	try {
		return JSON.parse(t.data);
	} catch (e) {
		throw new Error(e);
	}
}, H = function () {
	return a(this, M).next().value;
};
function ie(r, t, e) {
	const i = r; const d = e; const s = t;
	return i.includes("error") || i.push("error"), function (l) {
		return p(this, null, function* () {
			l.includes("error") || l.push("error"), typeof d === "function" && (yield d({ hooks: l }));
			const o = {};
			return l.forEach((f) => {
				if (!i.includes(f)) {
					return s.sendMessage("error", `The following hook is not valid: ${f}`);
				}
				o[f] = c => p(this, null, function* () {
					return yield s.sendRequest(f, c);
				});
			}), o;
		});
	};
}
function oe(r) {
	const t = r;
	let e = {};
	return t.addListener("error", i => console.warn(i)), function ({ hooks: i, resetHooks: d }) {
		return d
			? (Object.keys(e).forEach((s) => {
				t.removeListener(s);
			}), e = i)
			: e = T(T({}, e), i), Object.keys(e).forEach((s) => {
			if (typeof e[s] !== "function" && e[s] === null) {
				t.removeListener(s);
				return;
			}
			t.addListener(s, l => e[s](l));
		}), Object.keys(e).filter(s => typeof e[s] === "function" && e[s] !== null);
	};
}
function Z({ data: r, settings: t, hooks: e }, { container: i, src: d, beforeInit: s, timeout: l }) {
	const o = document.createElement("iframe");
	return o.src = d, o.allowFullscreen = "allowfullscreen", o.style.width = "100%", o.style.height = "100%", o.style.border = "0", o.style.margin = "0", o.style.padding = "0", typeof s === "function" && s({ container: i, iframe: o }), i.appendChild(o), ae({ data: r, settings: t, hooks: e }, { currentWindow: window, targetWindow: o.contentWindow, timeout: l, container: i });
}
function ae({ data: r, settings: t, hooks: e }, { currentWindow: i, targetWindow: d, timeout: s = null, container: l }) {
	const o = new G(i, d); const f = oe(o);
	return f({ hooks: e }), new Promise((c, n) => {
		o.addListener("domReady", k, { once: !0 });
		let E = null;
		s && (E = setTimeout(() => {
			o.terminate(), l != null && l.remove && typeof l.remove === "function" && l.remove(), n(new Error(`Plugin initialization failed with timeout! You can try to increase the timeout value in the plugin settings. Current value is ${s}ms.`));
		}, s));
		function k() {
			return p(this, null, function* () {
				o.sendMessage("ackDomReady", {});
				const v = yield o.sendRequest("init", { data: r, settings: t, hooks: Object.keys(e) }); const P = {};
				v.forEach((u) => {
					P[u] = $ => p(this, null, function* () {
						return u === "updateHooks" ? yield o.sendRequest(u, f($)) : yield o.sendRequest(u, $);
					});
				}), clearTimeout(E), c({
					methods: P,
					terminate: o.terminate,
				});
			});
		}
	});
}
let z = 0;
function ue(f, c) {
	return p(this, arguments, function* ({ data: r, settings: t, hooks: e }, { id: i, src: d, parentElem: s, beforeInit: l = null, timeout: o }) {
		let n = document.createElement("div");
		n.id = i, n.style.position = "fixed", n.style.display = "flex", n.style.top = "0", n.style.left = "0", n.style.zIndex = 0;
		let E = 500; let k = "translate3d(-100vw, 0px, 0px) scale(1)"; let v = 0;
		n.style.transform = k, n.style.opacity = v, n.style.width = "100%", n.style.height = "100%", n.style.border = "0", n.style.margin = "0", n.style.padding = "0", n.style.transition = "transform 0s", (s || document.body).appendChild(n);
		let u;
		function $() {
			if (t.splashScreenUrl) {
				return new Promise((x) => {
					u = document.createElement("iframe"), u.src = t.splashScreenUrl, u.style.position = "absolute", u.style.top = "0", u.style.left = "0", u.style.width = "100%", u.style.height = "100%", u.style.opacity = "1", u.style.border = "0", u.style.margin = "0", u.style.padding = "0", u.style.transition = "opacity 0.5s", n.appendChild(u), u.addEventListener("load", x, { once: !0 });
				});
			}
		}
		function B() {
			u && (u.style.opacity = "0", setTimeout(() => {
				u.remove();
			}, 500));
		}
		let F = !1;
		function K({ x = "-100vw", y: O = "0px", opacity: R = 0.5, scale: _ = 1, time: C = E } = {}) {
			if (!F) {
				if (isNaN(C)) {
					throw new Error("Animation time must be a number!");
				}
				E = C, k = `translate3d(${x}, ${O}, 0px) scale(${_})`, v = R, z++, n.style.zIndex = z, n.style.overflow = "hidden", window.requestAnimationFrame(() => (n.style.transition = "transform 0s", n.style.transform = `translate3d(${x}, ${O}, 0px) scale(${_})`, n.style.opacity = R, n.style.display = "block", new Promise((ee) => {
					window.requestAnimationFrame(() => {
						n.style.transition = `all ${C}ms`, n.style.transform = "translate3d(0px, 0px, 0px) scale(1)", n.style.opacity = "1", F = !0;
						const te = (A) => {
							A.propertyName !== "opacity" && A.propertyName !== "transform" || ee();
						};
						n.addEventListener("transitionend", te, { once: !0 });
					});
				})));
			}
		}
		function j() {
			if (F) {
				return new Promise((x) => {
					n.style.overflow = "hidden", n.style.transition = `transform ${E / 1e3}s`, n.style.opacity = v, n.style.transform = k, F = !1, v === 0 && (n.style.display = "none");
					const O = (R) => {
						R.propertyName !== "opacity" && R.propertyName !== "transform" || x();
					};
					n.addEventListener("transitionend", O, { once: !0 });
				});
			}
		}
		function Q() {
			return p(this, null, function* () {
				yield j(), n.remove(), n = null;
			});
		}
		const { methods: X } = yield Z({ data: r, settings: t, hooks: e }, { container: n, src: d, beforeInit: l, timeout: o });
		return {
			_container: n,
			_src: d,
			methods: X,
			showSplashScreen: $,
			hideSplashScreen: B,
			show: K,
			hide: j,
			destroy: Q,
		};
	});
}
function de(o, f) {
	return p(this, arguments, function* ({ data: r, settings: t, hooks: e }, { src: i, container: d, beforeInit: s = null, timeout: l }) {
		const { methods: c } = yield Z({
			data: r,
			settings: t,
			hooks: e,
		}, {
			container: d,
			src: i,
			timeout: l,
			beforeInit: s,
		});
		function n() {
			for (; d.firstChild;) {
				d.firstChild.remove();
			}
		}
		return {
			_container: d,
			methods: c,
			destroy: n,
		};
	});
}
function ce({ hooks: r = [], methods: t = {}, validator: e = null } = {}, i = window, d = window.parent) {
	const s = new G(i, d); const l = ie(r, s, e);
	Object.keys(t).forEach((c) => {
		c === "updateHooks"
			? s.addListener("updateHooks", n => p(this, null, function* () {
				return yield t.updateHooks(yield l(n));
			}))
			: s.addListener(c, n => t[c](n));
	});
	let o = !1;
	function f() {
		return p(this, null, function* () {
			for (s.addListener("ackDomReady", () => {
				o = !0;
			}, { once: !0 }); !o;) {
				yield new Promise((c) => {
					s.sendMessage("domReady", {}), setTimeout(() => {
						c();
					}, 200);
				});
			}
		});
	}
	return s.getDocument().readyState === "loading" ? s.getDocument().addEventListener("DOMContentLoaded", f, { once: !0 }) : f(), new Promise((c, n) => {
		s.addListener("init", E, { once: !0 });
		function E() {
			return p(this, arguments, function* ({ data: k = null, settings: v = null, hooks: P = [] } = {}) {
				o = !0;
				try {
					typeof e === "function" && (yield e({ data: k, settings: v }));
					const u = () => {
						s.terminate();
					};
					c({
						data: k,
						settings: v,
						hooks: yield l(P),
						terminate: u,
					});
				} catch (u) {
					throw n(u), new Error(u.message);
				}
				return Object.keys(t);
			});
		}
	});
}
export {
	ue as initFullscreenPlugin,
	de as initInlinePlugin,
	ce as providePlugin,
};

window.pluginInterface = {
	initFullscreenPlugin: ue,
  	initInlinePlugin: de,
  	providePlugin: ce,
};
// # sourceMappingURL=pluginInterface.js.map
