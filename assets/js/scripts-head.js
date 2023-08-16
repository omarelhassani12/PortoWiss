(function() {
    var webVitals = function(e) {
        "use strict";
        var n, t, r, i, o, a = -1, c = function(e) {
            addEventListener("pageshow", (function(n) {
                n.persisted && (a = n.timeStamp,
                e(n))
            }
            ), !0)
        }, u = function() {
            return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
        }, s = function() {
            var e = u();
            return e && e.activationStart || 0
        }, f = function(e, n) {
            var t = u()
              , r = "navigate";
            a >= 0 ? r = "back-forward-cache" : t && (document.prerendering || s() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : t.type && (r = t.type.replace(/_/g, "-")));
            return {
                name: e,
                value: void 0 === n ? -1 : n,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
                navigationType: r
            }
        }, d = function(e, n, t) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                    var r = new PerformanceObserver((function(e) {
                        Promise.resolve().then((function() {
                            n(e.getEntries())
                        }
                        ))
                    }
                    ));
                    return r.observe(Object.assign({
                        type: e,
                        buffered: !0
                    }, t || {})),
                    r
                }
            } catch (e) {}
        }, l = function(e, n, t, r) {
            var i, o;
            return function(a) {
                n.value >= 0 && (a || r) && ((o = n.value - (i || 0)) || void 0 === i) && (i = n.value,
                n.delta = o,
                n.rating = function(e, n) {
                    return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good"
                }(n.value, t),
                e(n))
            }
        }, p = function(e) {
            requestAnimationFrame((function() {
                return requestAnimationFrame((function() {
                    return e()
                }
                ))
            }
            ))
        }, v = function(e) {
            var n = function(n) {
                "pagehide" !== n.type && "hidden" !== document.visibilityState || e(n)
            };
            addEventListener("visibilitychange", n, !0),
            addEventListener("pagehide", n, !0)
        }, m = function(e) {
            var n = !1;
            return function(t) {
                n || (e(t),
                n = !0)
            }
        }, h = -1, g = function() {
            return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
        }, T = function(e) {
            "hidden" === document.visibilityState && h > -1 && (h = "visibilitychange" === e.type ? e.timeStamp : 0,
            C())
        }, y = function() {
            addEventListener("visibilitychange", T, !0),
            addEventListener("prerenderingchange", T, !0)
        }, C = function() {
            removeEventListener("visibilitychange", T, !0),
            removeEventListener("prerenderingchange", T, !0)
        }, E = function() {
            return h < 0 && (h = g(),
            y(),
            c((function() {
                setTimeout((function() {
                    h = g(),
                    y()
                }
                ), 0)
            }
            ))),
            {
                get firstHiddenTime() {
                    return h
                }
            }
        }, L = function(e) {
            document.prerendering ? addEventListener("prerenderingchange", (function() {
                return e()
            }
            ), !0) : e()
        }, b = [1800, 3e3], S = function(e, n) {
            n = n || {},
            L((function() {
                var t, r = E(), i = f("FCP"), o = d("paint", (function(e) {
                    e.forEach((function(e) {
                        "first-contentful-paint" === e.name && (o.disconnect(),
                        e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - s(), 0),
                        i.entries.push(e),
                        t(!0)))
                    }
                    ))
                }
                ));
                o && (t = l(e, i, b, n.reportAllChanges),
                c((function(r) {
                    i = f("FCP"),
                    t = l(e, i, b, n.reportAllChanges),
                    p((function() {
                        i.value = performance.now() - r.timeStamp,
                        t(!0)
                    }
                    ))
                }
                )))
            }
            ))
        }, w = [.1, .25], P = function(e, n) {
            n = n || {},
            S(m((function() {
                var t, r = f("CLS", 0), i = 0, o = [], a = function(e) {
                    e.forEach((function(e) {
                        if (!e.hadRecentInput) {
                            var n = o[0]
                              , t = o[o.length - 1];
                            i && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (i += e.value,
                            o.push(e)) : (i = e.value,
                            o = [e])
                        }
                    }
                    )),
                    i > r.value && (r.value = i,
                    r.entries = o,
                    t())
                }, u = d("layout-shift", a);
                u && (t = l(e, r, w, n.reportAllChanges),
                v((function() {
                    a(u.takeRecords()),
                    t(!0)
                }
                )),
                c((function() {
                    i = 0,
                    r = f("CLS", 0),
                    t = l(e, r, w, n.reportAllChanges),
                    p((function() {
                        return t()
                    }
                    ))
                }
                )),
                setTimeout(t, 0))
            }
            )))
        }, F = {
            passive: !0,
            capture: !0
        }, I = new Date, A = function(e, i) {
            n || (n = i,
            t = e,
            r = new Date,
            k(removeEventListener),
            M())
        }, M = function() {
            if (t >= 0 && t < r - I) {
                var e = {
                    entryType: "first-input",
                    name: n.type,
                    target: n.target,
                    cancelable: n.cancelable,
                    startTime: n.timeStamp,
                    processingStart: n.timeStamp + t
                };
                i.forEach((function(n) {
                    n(e)
                }
                )),
                i = []
            }
        }, D = function(e) {
            if (e.cancelable) {
                var n = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
                "pointerdown" == e.type ? function(e, n) {
                    var t = function() {
                        A(e, n),
                        i()
                    }
                      , r = function() {
                        i()
                    }
                      , i = function() {
                        removeEventListener("pointerup", t, F),
                        removeEventListener("pointercancel", r, F)
                    };
                    addEventListener("pointerup", t, F),
                    addEventListener("pointercancel", r, F)
                }(n, e) : A(n, e)
            }
        }, k = function(e) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(n) {
                return e(n, D, F)
            }
            ))
        }, B = [100, 300], x = function(e, r) {
            r = r || {},
            L((function() {
                var o, a = E(), u = f("FID"), s = function(e) {
                    e.startTime < a.firstHiddenTime && (u.value = e.processingStart - e.startTime,
                    u.entries.push(e),
                    o(!0))
                }, p = function(e) {
                    e.forEach(s)
                }, h = d("first-input", p);
                o = l(e, u, B, r.reportAllChanges),
                h && v(m((function() {
                    p(h.takeRecords()),
                    h.disconnect()
                }
                ))),
                h && c((function() {
                    var a;
                    u = f("FID"),
                    o = l(e, u, B, r.reportAllChanges),
                    i = [],
                    t = -1,
                    n = null,
                    k(addEventListener),
                    a = s,
                    i.push(a),
                    M()
                }
                ))
            }
            ))
        }, N = 0, R = 1 / 0, H = 0, O = function(e) {
            e.forEach((function(e) {
                e.interactionId && (R = Math.min(R, e.interactionId),
                H = Math.max(H, e.interactionId),
                N = H ? (H - R) / 7 + 1 : 0)
            }
            ))
        }, _ = function() {
            return o ? N : performance.interactionCount || 0
        }, j = function() {
            "interactionCount"in performance || o || (o = d("event", O, {
                type: "event",
                buffered: !0,
                durationThreshold: 0
            }))
        }, q = [200, 500], V = 0, z = function() {
            return _() - V
        }, G = [], J = {}, K = function(e) {
            var n = G[G.length - 1]
              , t = J[e.interactionId];
            if (t || G.length < 10 || e.duration > n.latency) {
                if (t)
                    t.entries.push(e),
                    t.latency = Math.max(t.latency, e.duration);
                else {
                    var r = {
                        id: e.interactionId,
                        latency: e.duration,
                        entries: [e]
                    };
                    J[r.id] = r,
                    G.push(r)
                }
                G.sort((function(e, n) {
                    return n.latency - e.latency
                }
                )),
                G.splice(10).forEach((function(e) {
                    delete J[e.id]
                }
                ))
            }
        }, Q = function(e, n) {
            n = n || {},
            L((function() {
                j();
                var t, r = f("INP"), i = function(e) {
                    e.forEach((function(e) {
                        (e.interactionId && K(e),
                        "first-input" === e.entryType) && (!G.some((function(n) {
                            return n.entries.some((function(n) {
                                return e.duration === n.duration && e.startTime === n.startTime
                            }
                            ))
                        }
                        )) && K(e))
                    }
                    ));
                    var n, i = (n = Math.min(G.length - 1, Math.floor(z() / 50)),
                    G[n]);
                    i && i.latency !== r.value && (r.value = i.latency,
                    r.entries = i.entries,
                    t())
                }, o = d("event", i, {
                    durationThreshold: n.durationThreshold || 40
                });
                t = l(e, r, q, n.reportAllChanges),
                o && (o.observe({
                    type: "first-input",
                    buffered: !0
                }),
                v((function() {
                    i(o.takeRecords()),
                    r.value < 0 && z() > 0 && (r.value = 0,
                    r.entries = []),
                    t(!0)
                }
                )),
                c((function() {
                    G = [],
                    V = _(),
                    r = f("INP"),
                    t = l(e, r, q, n.reportAllChanges)
                }
                )))
            }
            ))
        }, U = [2500, 4e3], W = {}, X = function(e, n) {
            n = n || {},
            L((function() {
                var t, r = E(), i = f("LCP"), o = function(e) {
                    var n = e[e.length - 1];
                    n && n.startTime < r.firstHiddenTime && (i.value = Math.max(n.startTime - s(), 0),
                    i.entries = [n],
                    t())
                }, a = d("largest-contentful-paint", o);
                if (a) {
                    t = l(e, i, U, n.reportAllChanges);
                    var u = m((function() {
                        W[i.id] || (o(a.takeRecords()),
                        a.disconnect(),
                        W[i.id] = !0,
                        t(!0))
                    }
                    ));
                    ["keydown", "click"].forEach((function(e) {
                        addEventListener(e, u, !0)
                    }
                    )),
                    v(u),
                    c((function(r) {
                        i = f("LCP"),
                        t = l(e, i, U, n.reportAllChanges),
                        p((function() {
                            i.value = performance.now() - r.timeStamp,
                            W[i.id] = !0,
                            t(!0)
                        }
                        ))
                    }
                    ))
                }
            }
            ))
        }, Y = [800, 1800], Z = function e(n) {
            document.prerendering ? L((function() {
                return e(n)
            }
            )) : "complete" !== document.readyState ? addEventListener("load", (function() {
                return e(n)
            }
            ), !0) : setTimeout(n, 0)
        }, $ = function(e, n) {
            n = n || {};
            var t = f("TTFB")
              , r = l(e, t, Y, n.reportAllChanges);
            Z((function() {
                var i = u();
                if (i) {
                    var o = i.responseStart;
                    if (o <= 0 || o > performance.now())
                        return;
                    t.value = Math.max(o - s(), 0),
                    t.entries = [i],
                    r(!0),
                    c((function() {
                        t = f("TTFB", 0),
                        (r = l(e, t, Y, n.reportAllChanges))(!0)
                    }
                    ))
                }
            }
            ))
        };
        return e.CLSThresholds = w,
        e.FCPThresholds = b,
        e.FIDThresholds = B,
        e.INPThresholds = q,
        e.LCPThresholds = U,
        e.TTFBThresholds = Y,
        e.getCLS = P,
        e.getFCP = S,
        e.getFID = x,
        e.getINP = Q,
        e.getLCP = X,
        e.getTTFB = $,
        e.onCLS = P,
        e.onFCP = S,
        e.onFID = x,
        e.onINP = Q,
        e.onLCP = X,
        e.onTTFB = $,
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e
    }({});
    var nitroTelemetry = function() {
        let e = !!window.IS_NITROPACK;
        let t = performance.getEntriesByType("navigation")[0];
        let a = document.prerendering || t?.activationStart > 0;
        let o = !a && t.responseStart - t.requestStart <= 5;
        let n = true;
        let l = false;
        let r = null;
        let i = null;
        let u = null;
        let f = y();
        let s = "https://to.getnitropack.com/";
        let c = "ehMzCVZaecFOhhOIQoIPGyGlZepxZdHW";
        let d = typeof NPRL != "undefined";
        let w = d ? "loadNitro" : "load";
        let p;
        let S;
        let g;
        let h;
        let v = ["missReason", "pageType"];
        function y() {
            return "NPTelemetry:" + btoa(Date.now()) + "_" + q() + (e ? "_o" : "_u") + (a ? "_prr" : o ? "_pre" : "_dow")
        }
        function m() {
            return document.visibilityState === "visible"
        }
        function N() {
            n = true;
            f = y();
            p = null;
            S = {
                crux: null
            };
            L();
            h = null
        }
        function L() {
            g = {
                sessionEntry: null,
                unknown: 0,
                afterStyles: 0,
                afterPageLoad: 0,
                afterScroll: 0,
                total: 0
            }
        }
        function M() {
            let n = performance.getEntriesByType("navigation");
            let r = {};
            let a = {
                navigate: 0,
                reload: 1,
                back_forward: 2,
                prerender: 3
            };
            for (let t in n) {
                let e = n[t];
                if (!e.activationStart) {
                    e.activationStart = 0
                }
                r = {
                    ttfb: Math.round(e.responseStart - e.connectEnd),
                    "ttfb:crux": Math.round(Math.max(e.responseStart - e.activationStart, 0)),
                    netDns: Math.round(e.domainLookupEnd - e.domainLookupStart),
                    netInitialCon: Math.round(e.connectEnd - e.connectStart),
                    netSsl: Math.round(e.requestStart - e.secureConnectionStart),
                    netContentDown: Math.round(e.responseEnd - e.responseStart),
                    netWorkerDuration: Math.round(e.fetchStart - e.workerStart),
                    netStalled: Math.round(e.domainLookupStart - e.fetchStart),
                    netNavType: a.hasOwnProperty(e.type) ? a[e.type] : -1
                }
            }
            return r
        }
        function q() {
            if (navigator.connection) {
                return navigator.connection.effectiveType
            } else {
                return "u"
            }
        }
        function E() {
            let e = f + ":pageview";
            P(e, {
                pv: 1
            })
        }
        function B() {
            if (typeof NPTelemetryMetadata === "object") {
                for (let e in NPTelemetryMetadata) {
                    if (v.indexOf(e) === -1) {
                        delete NPTelemetryMetadata[e]
                    }
                }
                let e = f + ":metadata";
                P(e, {
                    metaData: NPTelemetryMetadata
                })
            }
        }
        function F() {
            if (window.localStorage) {
                let e = "NPTelemetryMeta:lastpv";
                let t = parseInt(localStorage.getItem(e));
                let n = Date.now();
                localStorage.setItem(e, n);
                return isNaN(t) || t === 0 ? -1 : (n - t) / 1e3
            }
            return null
        }
        function P(e, t) {
            t.url = window.location.href.replace(window.location.hash, "");
            if (window.localStorage) {
                localStorage.setItem(e, JSON.stringify(t))
            } else {
                D([t])
            }
        }
        function b(e) {
            if (!window.localStorage)
                return;
            let n = null;
            let r = {};
            let t = 0;
            let a;
            let o;
            let i;
            do {
                n = localStorage.key(t);
                if (n && n.indexOf("NPTelemetry:") === 0) {
                    i = n.split(":")[1];
                    a = JSON.parse(localStorage.getItem(n));
                    if (!r[i])
                        r[i] = {};
                    let t = r[i];
                    for (let e in a) {
                        o = a[e];
                        if (o !== null) {
                            if (e == "url" || e === "metaData" || e === "prefetchInitiator") {
                                t[e] = o
                            } else if (J(o)) {
                                if (!t[e])
                                    t[e] = 0;
                                t[e] += o
                            } else if (K(o)) {
                                if (!t[e])
                                    t[e] = {};
                                if (!t[e][o])
                                    t[e][o] = 0;
                                t[e][o]++
                            }
                        }
                    }
                    localStorage.removeItem(n)
                } else {
                    t++
                }
            } while (n !== null);
            if (Object.keys(r).length) {
                D(r)
            }
            l = false
        }
        function J(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }
        function K(e) {
            return typeof e === "string" || e instanceof String
        }
        function D(e) {
            let t = new FormData;
            t.append("key", c);
            if (Object.keys(e).length) {
                t.append("props", JSON.stringify(e));
                navigator.sendBeacon && navigator.sendBeacon(s, t) || fetch(s, {
                    body: t,
                    method: "POST",
                    keepalive: true
                })
            }
        }
        function O(e) {
            if (e === b) {
                if (l) {
                    return
                } else {
                    l = true
                }
            }
            if (window.requestIdleCallback) {
                requestIdleCallback(e, {
                    timeout: 1e3
                })
            } else {
                setTimeout(e, 1e3)
            }
        }
        function R() {
            let e = f + ":cwv";
            let t = {};
            if (S.crux) {
                t["lcp:crux"] = Math.round(S.crux)
            }
            if (g.total !== null) {
                let e = 1e3;
                t["cls:total"] = Math.round(g.total * e);
                if (g.afterStyles) {
                    t["cls:afterStylesDelta"] = Math.round(g.afterStyles * e)
                }
                if (g.afterPageLoad) {
                    t["cls:afterPageLoadDelta"] = Math.round(g.afterPageLoad * e)
                }
                if (g.afterScroll) {
                    t["cls:afterScrollDelta"] = Math.round(g.afterScroll * e)
                }
                if (g.unknown) {
                    t["cls:unknownDelta"] = Math.round(g.unknown * e)
                }
            } else {
                t["cls:total"] = 0
            }
            if (p) {
                t["fid"] = Math.round(p)
            }
            if (h) {
                t["inp"] = Math.round(h)
            }
            if (Object.keys(t).length) {
                P(e, t)
            }
        }
        function T() {
            r = Date.now();
            window.removeEventListener("NitroStylesLoaded", T, true)
        }
        function k() {
            i = Date.now();
            window.removeEventListener(w, k, true)
        }
        function V() {
            u = Date.now()
        }
        function I(e) {
            return r && Date.now() - r < e
        }
        function _(e) {
            return i && Date.now() - i < e
        }
        function C(e) {
            return u && Date.now() - u < e
        }
        function A() {
            let t = {};
            let n = "NONE";
            if (a || o) {
                n = "UNKNOWN"
            }
            let r = JSON.parse(window.sessionStorage.getItem("nitro_prefetched_urls"));
            if (r !== null) {
                window.sessionStorage.removeItem("nitro_prefetched_urls");
                let e = window.location.href;
                if (r[e]) {
                    n = r[e].initiator
                }
                t.prefetchCount = Object.entries(r).length
            }
            t.prefetchInitiator = n;
            P(f + ":pagePrefetches", t)
        }
        N();
        window.addEventListener(w, k, true);
        document.addEventListener("scroll", V, {
            capture: true,
            passive: true
        });
        if (d) {
            window.addEventListener("NitroStylesLoaded", T, true)
        }
        function x() {
            let e = M();
            let t = F();
            B();
            A();
            Object.assign(e, {
                lastNavDiff: t
            });
            P(f + ":net", e)
        }
        function j() {
            E();
            O(b);
            n = false
        }
        window.addEventListener("load", function(e) {
            if (a) {
                return
            }
            x()
        }, true);
        window.addEventListener("pageshow", function(e) {
            if (a) {
                return
            }
            if (m() && (n || e.persisted)) {
                j()
            }
        }, true);
        window.addEventListener("pagehide", function(e) {
            R();
            N();
            b()
        }, true);
        document.addEventListener("prerenderingchange", function(e) {
            x();
            j()
        }, true);
        document.addEventListener("visibilitychange", function(e) {
            if (m()) {
                if (n) {
                    E();
                    O(b);
                    n = false
                }
            } else {}
        }, true);
        webVitals.getLCP(function(e) {
            S.crux = e.value
        }, true);
        webVitals.getCLS(function(e) {
            if (e.entries[0] !== g.sessionEntry) {
                L();
                g.sessionEntry = e.entries[0]
            }
            g.total = e.value;
            let t = 250;
            let n = C(t) + _(t) + I(t);
            if (n == 1) {
                if (C(t)) {
                    g.afterScroll += e.delta
                }
                if (_(t)) {
                    g.afterPageLoad += e.delta
                }
                if (I(t)) {
                    g.afterStyles += e.delta
                }
            } else {
                g.unknown += e.delta
            }
        }, true);
        webVitals.getFID(function(e) {
            p = e.value
        });
        webVitals.getINP(function(e) {
            h = e.value
        });
        return {}
    }();
    ;
}
)();



(function() {
    const e = document.createElement("link");
    if (!(e.relList && e.relList.supports && e.relList.supports("prefetch"))) {
        return
    }
    let o = document.cookie.includes("9d63262f59cd9b3378f01392c");
    let l = {
        initNP_PPL: function() {
            if (window.NP_PPL !== undefined)
                return;
            window.NP_PPL = {
                prefetches: [],
                lcpEvents: [],
                other: []
            }
        },
        logPrefetch: function(e, t, n) {
            let r = JSON.parse(window.sessionStorage.getItem("nitro_prefetched_urls"));
            if (r === null)
                r = {};
            if (r[e] === undefined) {
                r[e] = {
                    type: t,
                    initiator: n
                };
                window.sessionStorage.setItem("nitro_prefetched_urls", JSON.stringify(r))
            }
            if (!o)
                return;
            window.NP_PPL.prefetches.push({
                url: e,
                type: t,
                initiator: n,
                timestamp: performance.now()
            })
        },
        logLcpEvent: function(e, t=null) {
            if (!o)
                return;
            window.NP_PPL.lcpEvents.push({
                message: e,
                data: t,
                timestamp: performance.now()
            })
        },
        logOther: function(e, t=null) {
            if (!o)
                return;
            window.NP_PPL.other.push({
                message: e,
                data: t,
                timestamp: performance.now()
            })
        }
    };
    if (o) {
        l.initNP_PPL()
    }
    let c = 0;
    const t = 300;
    let n = ".yassinetazi.com";
    let a = new RegExp(n + "$");
    function u() {
        return performance.now() - c > t
    }
    function r() {
        let n;
        let r = performance.now();
        const e = {
            capture: true,
            passive: true
        };
        document.addEventListener("touchstart", t, e);
        document.addEventListener("mouseover", o, e);
        function t(e) {
            r = performance.now();
            const t = e.target.closest("a");
            if (!t || !s(t)) {
                return
            }
            m(t.href, "TOUCH")
        }
        function o(e) {
            l.logOther("mouseoverListener() called", e);
            if (performance.now() - r < 1111) {
                return
            }
            const t = e.target.closest("a");
            if (!t || !s(t)) {
                return
            }
            t.addEventListener("mouseout", i, {
                passive: true
            });
            n = setTimeout(function() {
                l.logOther("mouseoverTimer CALLBACK called", e);
                m(t.href, "HOVER");
                n = undefined
            }, 85)
        }
        function i(e) {
            if (e.relatedTarget && e.target.closest("a") == e.relatedTarget.closest("a")) {
                return
            }
            if (n) {
                clearTimeout(n);
                n = undefined
            }
        }
    }
    function f() {
        if (!PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")) {
            l.logLcpEvent("PerformanceObserver does not support LCP events in this browser.");
            return
        }
        let e = new PerformanceObserver(e=>{
            l.logLcpEvent("LCP_DETECTED", e.getEntries().at(-1).element);
            b = e.getEntries().at(-1).element
        }
        );
        let t = function(e) {
            k = window.requestIdleCallback(P);
            window.removeEventListener("load", t)
        };
        A.forEach(e=>{
            window.addEventListener(e, v, {
                once: true
            })
        }
        );
        e.observe({
            type: "largest-contentful-paint",
            buffered: true
        });
        window.addEventListener("load", t)
    }
    function s(t) {
        if (!t) {
            l.logOther("Link Not Prefetchable: empty link element.", t);
            return false
        }
        if (!t.href) {
            l.logOther("Link Not Prefetchable: empty href attribute.", t);
            return false
        }
        let e = t.href;
        let n = null;
        try {
            n = new URL(e)
        } catch (e) {
            l.logOther("Link Not Prefetchable: " + e, t);
            return false
        }
        let r = "." + n.hostname.replace("www.", "");
        if (!["http:", "https:"].includes(t.protocol)) {
            l.logOther("Link Not Prefetchable: missing protocol in the URL.", t);
            return false
        }
        if (t.protocol == "http:" && location.protocol == "https:") {
            l.logOther("Link Not Prefetchable: URL is HTTP but the current page is HTTPS.", t);
            return false
        }
        if (t.getAttribute("href").charAt(0) == "#" || t.hash && t.pathname + t.search == location.pathname + location.search) {
            l.logOther("Link Not Prefetchable: URL is the current location but with a hash.", t);
            return false
        }
        if (a.exec(r) === null) {
            l.logOther("Link Not Prefetchable: Different domain.", t);
            return false
        }
        for (i = 0; i < M.length; i++) {
            if (e.match(M[i]) !== null) {
                l.logOther("Link Not Prefetchable: Excluded URL " + e + ".", {
                    link: t,
                    regex: M[i]
                });
                return false
            }
        }
        return true
    }
    function p() {
        let e = navigator.connection;
        if (!e) {
            return false
        }
        if (e.saveData) {
            l.logOther("Data Saving Mode detected.");
            return true
        }
        return false
    }
    function d() {
        if (U !== null) {
            return U
        }
        U = p();
        return U
    }
    if (!window.requestIdleCallback) {
        window.requestIdleCallback = function(e, t) {
            var t = t || {};
            var n = 1;
            var r = t.timeout || n;
            var o = performance.now();
            return setTimeout(function() {
                e({
                    get didTimeout() {
                        return t.timeout ? false : performance.now() - o - n > r
                    },
                    timeRemaining: function() {
                        return Math.max(0, n + (performance.now() - o))
                    }
                })
            }, n)
        }
    }
    if (!window.cancelIdleCallback) {
        window.cancelIdleCallback = function(e) {
            clearTimeout(e)
        }
    }
    let h = function(e, t) {
        l.logLcpEvent("MUTATION_DETECTED", e);
        clearTimeout(D);
        D = setTimeout(_, 500, e)
    };
    let m = function(e, t="", n=false) {
        if (T.indexOf(e) > -1) {
            l.logOther("Prefetch skipped: URL is already prefetched.", e);
            return
        }
        if (T.length > 15) {
            l.logOther("Prefetch skipped: Maximum prefetches threshold reached.");
            return
        }
        if (!n && !u()) {
            l.logOther("Prefetch skipped: on cooldown", e);
            return
        }
        if (d()) {
            l.logOther("Prefetch skipped: limited connection", e);
            return
        }
        let r = "prefetch";
        if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
            r = Math.floor(Math.random() * 2) === 1 ? "prefetch" : "prerender";
            if (r === "prefetch") {
                g(e)
            }
            if (r === "prerender") {
                L(e)
            }
        } else {
            g(e)
        }
        T.push(e);
        c = performance.now();
        l.logPrefetch(e, r, t);
        return true
    };
    function g(e) {
        const t = document.createElement("link");
        t.rel = "prefetch";
        t.setAttribute("nitro-exclude", true);
        t.type = "text/html";
        t.href = e;
        document.head.appendChild(t)
    }
    function L(e) {
        let t = {
            prerender: [{
                source: "list",
                urls: [e]
            }]
        };
        let n = document.createElement("script");
        n.type = "speculationrules";
        n.textContent = JSON.stringify(t);
        document.body.appendChild(n)
    }
    function E(t) {
        let e = document.querySelector("body");
        while (t != e) {
            if (w(t)) {
                t = t.parentElement;
                l.logOther("Skipping LCP container level: Inside a <nav> element.", t);
                continue
            }
            let e = Array.from(t.querySelectorAll("a"));
            l.logOther("filtering links...", e);
            e = e.filter(e=>{
                if (w(e)) {
                    l.logOther("Skipping link: Inside a <nav> element.", t);
                    return false
                }
                return s(e)
            }
            );
            if (e.length > 0)
                return [e, t];
            t = t.parentElement
        }
        return [[], null]
    }
    function w(e) {
        return e.closest("nav") !== null || e.nodeName == "NAV"
    }
    function v(e) {
        I = true;
        if (S && !R) {
            O()
        }
    }
    function P(e) {
        S = true;
        if (I && !R) {
            if (O()) {
                window.cancelIdleCallback(k)
            } else {
                N++;
                if (N > 2) {
                    window.cancelIdleCallback(k);
                    l.logLcpEvent("IDLE_CALLBACK_CANCELLED")
                }
            }
        }
    }
    function O() {
        if (b == null) {
            l.logLcpEvent("doLcpPrefetching_CALLBACK_CALLED_WITHOUT_LCP_ELEMENT");
            return false
        }
        let e = [];
        [e,C] = E(b);
        if (e.length == 0) {
            l.logLcpEvent("NO_LINKS_FOUND");
            return false
        }
        if (e.length > 0) {
            m(e[0].href, "LCP", !R);
            R = true
        }
        y.observe(C, {
            subtree: true,
            childList: true,
            attributes: true
        });
        l.logLcpEvent("MUTATION_OBSERVER_REGISTERED");
        window.cancelIdleCallback(k);
        l.logLcpEvent("IDLE_CALLBACK_CANCELLED")
    }
    function _(e) {
        l.logLcpEvent("MUTATION_RESCAN_TRIGGERED", e);
        let t = E(C)[0];
        if (t.length > 0) {
            m(t[0].href, "LCP_MUTATION")
        }
    }
    let T = [];
    let b = null;
    let C = null;
    let k = 0;
    let N = 0;
    let A = ["mousemove", "click", "keydown", "touchmove", "touchstart"];
    let I = false;
    let S = false;
    const y = new MutationObserver(h);
    let D = 0;
    let R = false;
    let U = null;
    let M = JSON.parse(atob("WyIuKj9cXD9hZGRcXC10b1xcLWNhcnRcXD0uKj8iLCIuKj8mYWRkXFwtdG9cXC1jYXJ0XFw9Lio/IiwiLio/XFw/cmVtb3ZlX2l0ZW1cXD0uKj8iLCIuKj8mcmVtb3ZlX2l0ZW1cXD0uKj8iLCIuKj9kb3dubG9hZC4qPyIsIi4qP1xcLmV4ZSIsIi4qP1xcLnppcCIsIi4qP1xcLnJhciIsIi4qP1xcLmRlYiIsIi4qP1xcLnJwbSIsIi4qP1xcLnBrZyIsIi4qP1xcLmRtZyIsIi4qP1xcLnBkZiIsIi4qP1xcLm1zaSIsIi4qP1xcLm1wMyIsIi4qP1xcLmRvYyIsIi4qP1xcLmRvY3giLCIuKj9cXC5wcHQiLCIuKj9cXC54bHMiLCIuKj9cXC54bHN4IiwiLio/XFwub2R0IiwiLio/XFwudHh0Il0="));
    if (Object.prototype.toString.call(M) === "[object Object]") {
        l.logOther("EXCLUDES_AS_OBJECT", M);
        let e = [];
        for (const i in M) {
            e.push(M[i])
        }
        M = e
    }
    M = M.map(e=>new RegExp(e));
    if (navigator.connection) {
        navigator.connection.onchange = function(e, t) {
            U = null;
            l.logOther("Connection changed", {
                effectiveType: navigator.connection.effectiveType,
                rtt: navigator.connection.rtt,
                downlink: navigator.connection.downlink,
                saveData: navigator.connection.saveData
            })
        }
    }
    f();
    r()
}
)();

(function(n) {
    "use strict";
    if (!n.loadCSS) {
        n.loadCSS = function() {}
    }
    var o = loadCSS.relpreload = {};
    o.support = function() {
        var t;
        try {
            t = n.document.createElement("link").relList.supports("preload")
        } catch (e) {
            t = false
        }
        return function() {
            return t
        }
    }();
    o.bindMediaToggle = function(e) {
        var t = e.media || "all";
        function a() {
            e.media = t
        }
        if (e.addEventListener) {
            e.addEventListener("load", a)
        } else if (e.attachEvent) {
            e.attachEvent("onload", a)
        }
        setTimeout(function() {
            e.rel = "stylesheet";
            e.media = "only x"
        });
        setTimeout(a, 3e3)
    }
    ;
    o.poly = function() {
        if (o.support()) {
            return
        }
        var e = n.document.getElementsByTagName("link");
        for (var t = 0; t < e.length; t++) {
            var a = e[t];
            if (a.rel === "preload" && a.getAttribute("as") === "style" && !a.getAttribute("data-loadcss")) {
                a.setAttribute("data-loadcss", true);
                o.bindMediaToggle(a)
            }
        }
    }
    ;
    if (!o.support()) {
        o.poly();
        var e = n.setInterval(o.poly, 500);
        if (n.addEventListener) {
            n.addEventListener("load", function() {
                o.poly();
                n.clearInterval(e)
            })
        } else if (n.attachEvent) {
            n.attachEvent("onload", function() {
                o.poly();
                n.clearInterval(e)
            })
        }
    }
    if (typeof exports !== "undefined") {
        exports.loadCSS = loadCSS
    } else {
        n.loadCSS = loadCSS
    }
}
)(typeof global !== "undefined" ? global : this);
