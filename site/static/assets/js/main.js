var InstantClick = function (t, e) {
    var n, i, o, r, s, a, l, c = navigator.userAgent,
        u = "createTouch" in t,
        d = {},
        h = !1,
        f = !1,
        p = !1,
        m = !1,
        v = {},
        g = !1,
        y = !1,
        b = [],
        E = {
            fetch: [],
            receive: [],
            wait: [],
            change: []
        };

    function w(t) {
        var e = t.indexOf("#");
        return e < 0 ? t : t.substr(0, e)
    }

    function S(t) {
        for (;
            "A" != t.nodeName;) t = t.parentNode;
        return t
    }

    function L(t) {
        do {
            if (!t.hasAttribute) break;
            if (t.hasAttribute("data-instant")) return !1;
            if (t.hasAttribute("data-no-instant")) return !0
        } while (t = t.parentNode);
        return !1
    }

    function I(t) {
        do {
            if (!t.hasAttribute) break;
            if (t.hasAttribute("data-no-instant")) return !1;
            if (t.hasAttribute("data-instant")) return !0
        } while (t = t.parentNode);
        return !1
    }

    function x(t, e) {
        for (var n = 0; n < E[t].length; n++) E[t][n](e)
    }

    function _(e, i, o, r) {
        if (t.title = e, t.documentElement.replaceChild(i, t.body), o) {
            history.pushState(null, null, o);
            var s = o.indexOf("#"),
                a = s > -1 && t.getElementById(o.substr(s + 1)),
                l = 0;
            if (a)
                for (; a.offsetParent;) l += a.offsetTop, a = a.offsetParent;
            scrollTo(0, l), n = w(o)
        } else scrollTo(0, r);
        C(), N.done(), x("change", !1)
    }

    function A() {
        g = !1, y = !1
    }

    function P(t) {
        O(S(t.target).href)
    }

    function k(t) {
        var e = S(t.target);
        e.addEventListener("mouseout", q), l ? (i = e.href, o = setTimeout(O, l)) : O(e.href)
    }

    function T(t) {
        var e = S(t.target);
        a ? e.removeEventListener("mousedown", P) : e.removeEventListener("mouseover", k), O(e.href)
    }

    function H(t) {
        t.which > 1 || t.metaKey || t.ctrlKey || (t.preventDefault(), M(S(t.target).href))
    }

    function q() {
        if (o) return clearTimeout(o), void(o = !1);
        g && !y && (r.abort(), A())
    }

    function z() {
        if (!(r.readyState < 4) && 0 != r.status) {
            if (v.ready = +new Date - v.start, x("receive"), r.getResponseHeader("Content-Type").match(/\/(x|ht|xht)ml/)) {
                var e = t.implementation.createHTMLDocument("");
                e.documentElement.innerHTML = r.responseText, f = e.title, m = e.body;
                var n = w(h);
                d[n] = {
                    body: m,
                    title: f,
                    scrollY: n in d ? d[n].scrollY : 0
                };
                for (var i, o, s = e.head.children, a = 0, l = s.length - 1; l >= 0; l--)
                    if ((i = s[l]).hasAttribute("data-instant-track")) {
                        o = i.getAttribute("href") || i.getAttribute("src") || i.innerHTML;
                        for (var c = b.length - 1; c >= 0; c--) b[c] == o && a++
                    } a != b.length && (p = !0)
            } else p = !0;
            y && (y = !1, M(h))
        }
    }

    function C(i) {
        for (var o, r = t.getElementsByTagName("a"), l = e.protocol + "//" + e.host, c = r.length - 1; c >= 0; c--)(o = r[c]).target || o.hasAttribute("download") || 0 != o.href.indexOf(l + "/") || o.href.indexOf("#") > -1 && w(o.href) == n || (s ? !I(o) : L(o)) || (o.addEventListener("touchstart", T, {
            passive: !0
        }), a ? o.addEventListener("mousedown", P) : o.addEventListener("mouseover", k), o.addEventListener("click", H));
        if (!i) {
            var u, d, h, f, p = t.body.getElementsByTagName("script");
            for (c = 0, j = p.length; c < j; c++)(u = p[c]).hasAttribute("data-no-instant") || (d = t.createElement("script"), u.src && (d.src = u.src), u.innerHTML && (d.innerHTML = u.innerHTML), h = u.parentNode, f = u.nextSibling, h.removeChild(u), h.insertBefore(d, f))
        }
    }

    function O(t) {
        !a && "display" in v && +new Date - (v.start + v.display) < 100 || (o && (clearTimeout(o), o = !1), t || (t = i), g && (t == h || y) || (g = !0, y = !1, h = t, m = !1, p = !1, v = {
            start: +new Date
        }, x("fetch"), r.open("GET", t), r.send()))
    }

    function M(t) {
        if ("display" in v || (v.display = +new Date - v.start), o) return h && h != t ? void(e.href = t) : (O(t), N.start(0, !0), x("wait"), void(y = !0));
        if (g && !y)
            if (p) e.href = h;
            else {
                if (!m) return N.start(0, !0), x("wait"), void(y = !0);
                d[n].scrollY = pageYOffset, A(), _(f, m, h)
            }
        else e.href = t
    }
    var N = function () {
            var e, n, i, o, r;

            function s(n, i) {
                o = n, t.getElementById(e.id) && t.body.removeChild(e), e.style.opacity = "1", t.getElementById(e.id) && t.body.removeChild(e), c(), i && setTimeout(a, 0), clearTimeout(r), r = setTimeout(l, 500)
            }

            function a() {
                o = 10, c()
            }

            function l() {
                (o += 1 + 2 * Math.random()) >= 98 ? o = 98 : r = setTimeout(l, 500), c()
            }

            function c() {
                n.style[i] = "translate(-" + o + "%)", t.getElementById(e.id) || t.body.appendChild(e)
            }

            function d() {
                e.style.left = pageXOffset + "px", e.style.width = innerWidth + "px", e.style.top = pageYOffset + "px";
                var t = "orientation" in window && 90 == Math.abs(orientation),
                    n = innerWidth / screen[t ? "height" : "width"] * 2;
                e.style[i] = "scaleY(" + n + ")"
            }
            return {
                init: function () {
                    (e = t.createElement("div")).id = "instantclick", (n = t.createElement("div")).id = "instantclick-bar", n.className = "instantclick-bar", e.appendChild(n);
                    var o = ["Webkit", "Moz", "O"];
                    if (!((i = "transform") in n.style))
                        for (var r = 0; r < 3; r++) o[r] + "Transform" in n.style && (i = o[r] + "Transform");
                    var s = "transition";
                    if (!(s in n.style))
                        for (r = 0; r < 3; r++) o[r] + "Transition" in n.style && (s = "-" + o[r].toLowerCase() + "-" + s);
                    u && (d(), addEventListener("resize", d), addEventListener("scroll", d))
                },
                start: s,
                done: function n() {
                    if (t.getElementById(e.id)) return clearTimeout(r), o = 100, c(), void(e.style.opacity = "0");
                    s(100 == o ? 0 : o), setTimeout(n, 0)
                }
            }
        }(),
        B = "pushState" in history && (!c.match("Android") || c.match("Chrome/")) && "file:" != e.protocol;
    return {
        supported: B,
        init: function () {
            if (!n)
                if (B) {
                    for (var i = arguments.length - 1; i >= 0; i--) {
                        var o = arguments[i];
                        !0 === o ? s = !0 : "mousedown" == o ? a = !0 : "number" == typeof o && (l = o)
                    }
                    n = w(e.href), d[n] = {
                        body: t.body,
                        title: t.title,
                        scrollY: pageYOffset
                    };
                    var c, u, h = t.head.children;
                    for (i = h.length - 1; i >= 0; i--)(c = h[i]).hasAttribute("data-instant-track") && (u = c.getAttribute("href") || c.getAttribute("src") || c.innerHTML, b.push(u));
                    (r = new XMLHttpRequest).addEventListener("readystatechange", z), C(!0), N.init(), x("change", !0), addEventListener("popstate", function () {
                        var t = w(e.href);
                        t != n && (t in d ? (d[n].scrollY = pageYOffset, n = t, _(d[t].title, d[t].body, !1, d[t].scrollY)) : e.href = e.href)
                    })
                } else x("change", !0)
        },
        on: function (t, e) {
            E[t].push(e)
        }
    }
}(document, location);

function _extends() {
    return (_extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
        }
        return t
    }).apply(this, arguments)
}

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}

function lazyloadInit() {
    var t = new LazyLoad({
        elements_selector: ".asyncImage"
    });
    t && t.update()
}

function initNav() {
    var t = document.getElementById("scroll-nav");

    function e(t, e, n, i, o) {
        scrollAmount = 0;
        var r = setInterval(function () {
            "left" == e ? t.scrollLeft -= o : t.scrollLeft += o, scrollAmount += o, scrollAmount >= i && window.clearInterval(r)
        }, n)
    }!0 !== t.scrollWidth > t.clientWidth && (arrow = document.getElementsByClassName("header-arrow"), arrow[0].classList.add("hide"), arrow[1].classList.add("hide")), window.addEventListener("resize", function (e) {
        var n = t.scrollWidth > t.clientWidth;
        !1 !== n && (arrow = document.getElementsByClassName("header-arrow"), arrow[0].classList.remove("hide"), arrow[1].classList.remove("hide")), !0 !== n && (arrow = document.getElementsByClassName("header-arrow"), arrow[0].classList.add("hide"), arrow[1].classList.add("hide"))
    }), document.getElementById("navNext").onclick = function () {
        e(document.getElementById("scroll-nav"), "right", 25, 100, 10)
    }, document.getElementById("navBack").onclick = function () {
        e(document.getElementById("scroll-nav"), "left", 25, 100, 10)
    }, window.onscroll = function () {
        window.pageYOffset > i ? n.classList.add("sticky") : n.classList.remove("sticky")
    };
    var n = document.getElementById("nav"),
        i = n.offsetTop
}

function mainInit() {
    ShareThis({
        sharers: [ShareThisViaTwitter, ShareThisViaEmail],
        selector: ".single"
    }).init(), window.addEventListener("scroll", function () {
        var t, e = document.querySelector("#content"),
            n = document.querySelector(".content-share"),
            i = document.querySelector(".main");
        void 0 !== i && null != i && (t = i.getBoundingClientRect().height - 500), void 0 !== e && null != e && (t < window.scrollY ? n.classList.add("none") : n.classList.remove("none"))
    }), setTimeout(function () {
        document.head.getElementsByTagName("meta")["theme-color"].name = "color"
    }, 1e4), top != self && (top.location.replace(document.location), alert("For security reasons, framing is not allowed! Click OK and the check URL.")), "serviceWorker" in navigator && window.addEventListener("load", () => {
        navigator.serviceWorker.register("/workbox.js")
    })
}! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ShareThis = e()
}(this, function () {
    "use strict";

    function t(t, e) {
        return c || (c = function (t) {
            for (var e = "atchesSelector", n = ["matches", "m" + e, "webkitM" + e, "mozM" + e, "msM" + e, "oM" + e], i = 0; i < n.length; i++) {
                var o = n[i];
                if (t[o]) return o
            }
        }(t)), t[c](e)
    }

    function e(e, n) {
        for (var i = e; i && (1 !== i.nodeType || !t(i, n));) i = i.parentNode;
        return i
    }

    function n(t, e) {
        if (e && "object" === (void 0 === e ? "undefined" : u(e)))
            for (var n in e) t[n] = e[n];
        return t
    }

    function i(t) {
        return "function" == typeof t
    }

    function o(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }

    function r(t, e) {
        var n = void 0,
            i = t.getClientRects(),
            r = [].slice.bind(i);
        if (e) {
            for (var s = 1 / 0, a = i.length; a--;) {
                var l = i[a];
                if (l.left > s) break;
                s = l.left
            }
            n = r(a + 1)
        } else {
            for (var c = -1 / 0, u = 0; u < i.length; u++) {
                var d = i[u];
                if (d.right < c) break;
                c = d.right
            }
            n = r(0, u)
        }
        return {
            top: Math.min.apply(Math, o(n.map(function (t) {
                return t.top
            }))),
            bottom: Math.max.apply(Math, o(n.map(function (t) {
                return t.bottom
            }))),
            left: n[0].left,
            right: n[n.length - 1].right
        }
    }

    function s(t, n) {
        var i = t.cloneRange();
        if (t.collapsed || !n) return i;
        var o = e(t.startContainer, n);
        return o ? function (t, e) {
            var n = t.compareDocumentPosition(e);
            return !n || (16 & n) > 0
        }(o, t.endContainer) || i.setEnd(o, o.childNodes.length) : (o = e(t.endContainer, n)) ? i.setStart(o, 0) : i.collapse(), i
    }

    function a(t, e, n) {
        var i = n.document,
            o = i.defaultView,
            s = function (t) {
                if (t.isCollapsed) return !0;
                var e = t.anchorNode.compareDocumentPosition(t.focusNode);
                return e ? (4 & e) > 0 : t.anchorOffset < t.focusOffset
            }(o.getSelection()),
            a = r(e, s),
            l = function (t) {
                var e = t.document.body;
                return ("static" === t.getComputedStyle(e).position ? e.parentNode : e).getBoundingClientRect()
            }(o),
            c = t.style;
        s ? c.right = i.documentElement.clientWidth - a.right + l.left + "px" : c.left = a.left - l.left + "px", c.width = a.right - a.left + "px", c.height = a.bottom - a.top + "px", c.top = a.top - l.top + "px", c.position = "absolute", t.className = n.popoverClass
    }

    function l(t) {
        return {
            createPopover: function () {
                var n = t.createElement("div");
                return n.addEventListener("click", function (t) {
                    ! function (t, n) {
                        var o = e(n.target, "[" + d + "]");
                        if (o) {
                            var r = function (t, e) {
                                for (var n = 0; n < t.length; n++) {
                                    var i = t[n];
                                    if (i.name === e) return i
                                }
                            }(t, o.getAttribute(d));
                            r && i(r.action) && r.action(n, o)
                        }
                    }(this.sharers, t)
                }), n
            },
            attachPopover: function (e) {
                t.body.appendChild(e)
            },
            removePopover: function (t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            }
        }
    }
    var c = void 0,
        u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        d = "data-share-via",
        h = function (t, e, n, i) {
            var o = t.shareUrl || t.document.defaultView.location;
            return "<ul>" + e.map(function (t) {
                return '<li data-share-via="' + t.name + '">' + t.render.call(t, n, i, o) + "</li>"
            }).join("") + "</ul>"
        },
        f = void 0,
        p = ["selectionchange", "mouseup", "touchend", "touchcancel"];
    return function (t) {
        function e(t) {
            y.addEventListener(t, c)
        }

        function o(t) {
            y.removeEventListener(t, c)
        }

        function r() {
            E && a(E, u(), m)
        }

        function c(t) {
            var e = t.type;
            !E != ("selectionchange" === e) && setTimeout(function () {
                var t = u();
                t ? function (t) {
                    var e = !E,
                        n = t.toString(),
                        o = m.transformer(n),
                        r = m.sharers.filter(function (t, e, n) {
                            var o = n.active;
                            return i(o) ? o(t, e) : o === f || o
                        }.bind(null, o, n));
                    r.length ? (e && (E = w.createPopover()), E.sharers = r, E.innerHTML = h(m, r, o, n), a(E, t, m), e && (w.attachPopover(E), i(m.onOpen) && m.onOpen(E, o, n))) : E && d()
                }(t) : d()
            }, 10)
        }

        function u() {
            var t = b.getSelection(),
                e = t.rangeCount && t.getRangeAt(0);
            if (e) {
                var n = s(e, m.selector);
                if (!n.collapsed && n.getClientRects().length) return n
            }
        }

        function d() {
            E && (w.removePopover(E), E = f, i(m.onClose) && m.onClose())
        }
        var m = (Object.assign || n)({
                document: document,
                selector: "body",
                sharers: [],
                popoverClass: "share-this-popover",
                transformer: function (t) {
                    return t.trim().replace(/\s+/g, " ")
                }
            }, t || {}),
            v = !1,
            g = !1,
            y = f,
            b = f,
            E = f,
            w = f;
        return {
            init: function () {
                return !v && (y = m.document, (b = y.defaultView).getSelection ? (p.forEach(e), b.addEventListener("resize", r), w = l(y), v = !0) : (console.warn("share-this: Selection API isn't supported"), !1))
            },
            destroy: function () {
                return !(!v || g) && (p.forEach(o), b.removeEventListener("resize", r), d(), y = f, b = f, g = !0)
            }
        }
    }
}),
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.ShareThisViaTwitter = t.ShareThisViaTwitter || {})
}(this, function (t) {
    "use strict";
    var e = 200;
    t.render = function (t, e, n) {
        var i = this.getText(t);
        return '<a href="' + this.getShareUrl(i, n) + '" target="_blank" rel="noopener nofollow noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 20 20"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z" fill="currentcolor"/></svg></a>'
    }, t.getText = function (t) {
        var n = t.trim();
        return n.length > e - 2 && (n = n.slice(0, e - 3).trim() + ""), n + " "
    }, t.getShareUrl = function (t, e) {
        return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(t) + "&url=" + encodeURIComponent(e)
    }, t.action = function (t, e) {
        t.preventDefault(), e.ownerDocument.defaultView.open(e.firstChild.href, "share_via_twitter", "height=440,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,width=640").opener = null
    }, t.name = "twitter", Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.ShareThisViaEmail = t.ShareThisViaEmail || {})
}(this, function (t) {
    "use strict";
    t.render = function (t, e, n) {
        return '<a href="' + this.getShareUrl(t, n) + '" rel="noopener nofollow noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="15px" height="20px" viewBox="0 0 550.795 550.795"><g><path fill="currentcolor" d="M501.613,491.782c12.381,0,23.109-4.088,32.229-12.16L377.793,323.567c-3.744,2.681-7.373,5.288-10.801,7.767 c-11.678,8.604-21.156,15.318-28.434,20.129c-7.277,4.822-16.959,9.737-29.045,14.755c-12.094,5.024-23.361,7.528-33.813,7.528 h-0.306h-0.306c-10.453,0-21.72-2.503-33.813-7.528c-12.093-5.018-21.775-9.933-29.045-14.755 c-7.277-4.811-16.75-11.524-28.434-20.129c-3.256-2.387-6.867-5.006-10.771-7.809L16.946,479.622 c9.119,8.072,19.854,12.16,32.234,12.16H501.613z"/><path fill="currentcolor" d="M31.047,225.299C19.37,217.514,9.015,208.598,0,198.555V435.98l137.541-137.541 C110.025,279.229,74.572,254.877,31.047,225.299z"/><path fill="currentcolor" d="M520.059,225.299c-41.865,28.336-77.447,52.73-106.75,73.195l137.486,137.492V198.555 C541.98,208.396,531.736,217.306,520.059,225.299z"/><path fill="currentcolor" d="M501.613,59.013H49.181c-15.784,0-27.919,5.33-36.42,15.979C4.253,85.646,0.006,98.97,0.006,114.949 c0,12.907,5.636,26.892,16.903,41.959c11.267,15.061,23.256,26.891,35.961,35.496c6.965,4.921,27.969,19.523,63.012,43.801 c18.917,13.109,35.368,24.535,49.505,34.395c12.05,8.396,22.442,15.667,31.022,21.701c0.985,0.691,2.534,1.799,4.59,3.269 c2.215,1.591,5.018,3.61,8.476,6.107c6.659,4.816,12.191,8.709,16.597,11.683c4.4,2.975,9.731,6.298,15.985,9.988 c6.249,3.685,12.143,6.456,17.675,8.299c5.533,1.842,10.655,2.766,15.367,2.766h0.306h0.306c4.711,0,9.834-0.924,15.368-2.766 c5.531-1.843,11.42-4.608,17.674-8.299c6.248-3.69,11.572-7.02,15.986-9.988c4.406-2.974,9.938-6.866,16.598-11.683 c3.451-2.497,6.254-4.517,8.469-6.102c2.057-1.476,3.605-2.577,4.596-3.274c6.684-4.651,17.1-11.892,31.104-21.616 c25.482-17.705,63.01-43.764,112.742-78.281c14.957-10.447,27.453-23.054,37.496-37.803c10.025-14.749,15.051-30.22,15.051-46.408 c0-13.525-4.873-25.098-14.598-34.737C526.461,63.829,514.932,59.013,501.613,59.013z"/></g></a>'
    }, t.getShareUrl = function (t, e) {
        return "mailto:?body=" + encodeURIComponent(t) + "%0a%0a" + encodeURIComponent(e)
    }, t.name = "email", Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (n) {
        return e(t, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function n(n, r, a) {
        (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[n] = function (t) {
            return "string" == typeof t ? function (t, e, i) {
                var o, r = "$()." + n + '("' + e + '")';
                return t.each(function (t, l) {
                    var c = a.data(l, n);
                    if (c) {
                        var u = c[e];
                        if (u && "_" != e.charAt(0)) {
                            var d = u.apply(c, i);
                            o = void 0 === o ? d : o
                        } else s(r + " is not a valid method")
                    } else s(n + " not initialized. Cannot call methods, i.e. " + r)
                }), void 0 !== o ? o : t
            }(this, t, o.call(arguments, 1)) : (function (t, e) {
                t.each(function (t, i) {
                    var o = a.data(i, n);
                    o ? (o.option(e), o._init()) : (o = new r(i, e), a.data(i, n, o))
                })
            }(this, t), this)
        }, i(a))
    }

    function i(t) {
        !t || t && t.bridget || (t.bridget = n)
    }
    var o = Array.prototype.slice,
        r = t.console,
        s = void 0 === r ? function () {} : function (t) {
            r.error(t)
        };
    return i(e || t.jQuery), n
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var n = this._events = this._events || {},
                i = n[t] = n[t] || [];
            return -1 == i.indexOf(e) && i.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var n = this._onceEvents = this._onceEvents || {};
            return (n[t] = n[t] || {})[e] = !0, this
        }
    }, e.off = function (t, e) {
        var n = this._events && this._events[t];
        if (n && n.length) {
            var i = n.indexOf(e);
            return -1 != i && n.splice(i, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var n = this._events && this._events[t];
        if (n && n.length) {
            n = n.slice(0), e = e || [];
            for (var i = this._onceEvents && this._onceEvents[t], o = 0; o < n.length; o++) {
                var r = n[o];
                i && i[r] && (this.off(t, r), delete i[r]), r.apply(this, e)
            }
            return this
        }
    }, e.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], n = 0; n < e.length; n++) {
            var i = e[n] + "MatchesSelector";
            if (t[i]) return i
        }
    }();
    return function (e, n) {
        return e[t](n)
    }
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (n) {
        return e(t, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var n = {
            extend: function (t, e) {
                for (var n in e) t[n] = e[n];
                return t
            },
            modulo: function (t, e) {
                return (t % e + e) % e
            }
        },
        i = Array.prototype.slice;
    n.makeArray = function (t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? i.call(t) : [t]
    }, n.removeFrom = function (t, e) {
        var n = t.indexOf(e); - 1 != n && t.splice(n, 1)
    }, n.getParent = function (t, n) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, n)) return t
    }, n.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, n.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, n.filterFindElements = function (t, i) {
        t = n.makeArray(t);
        var o = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!i) return void o.push(t);
                e(t, i) && o.push(t);
                for (var n = t.querySelectorAll(i), r = 0; r < n.length; r++) o.push(n[r])
            }
        }), o
    }, n.debounceMethod = function (t, e, n) {
        n = n || 100;
        var i = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[o];
            clearTimeout(t);
            var e = arguments,
                r = this;
            this[o] = setTimeout(function () {
                i.apply(r, e), delete r[o]
            }, n)
        }
    }, n.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, n.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, n) {
            return e + "-" + n
        }).toLowerCase()
    };
    var o = t.console;
    return n.htmlInit = function (e, i) {
        n.docReady(function () {
            var r = n.toDashed(i),
                s = "data-" + r,
                a = document.querySelectorAll("[" + s + "]"),
                l = document.querySelectorAll(".js-" + r),
                c = n.makeArray(a).concat(n.makeArray(l)),
                u = s + "-options",
                d = t.jQuery;
            c.forEach(function (t) {
                var n, r = t.getAttribute(s) || t.getAttribute(u);
                try {
                    n = r && JSON.parse(r)
                } catch (e) {
                    return void(o && o.error("Error parsing " + s + " on " + t.className + ": " + e))
                }
                var a = new e(t, n);
                d && d.data(t, i, a)
            })
        })
    }, n
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("infinite-scroll/js/core", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils"], function (n, i) {
        return e(t, n, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("fizzy-ui-utils")) : t.InfiniteScroll = e(t, t.EvEmitter, t.fizzyUIUtils)
}(window, function (t, e, n) {
    function i(t, e) {
        var s = n.getQueryElement(t);
        if (s) {
            if ((t = s).infiniteScrollGUID) {
                var a = r[t.infiniteScrollGUID];
                return a.option(e), a
            }
            this.element = t, this.options = n.extend({}, i.defaults), this.option(e), o && (this.$element = o(this.element)), this.create()
        } else console.error("Bad element for InfiniteScroll: " + (s || t))
    }
    var o = t.jQuery,
        r = {};
    i.defaults = {}, i.create = {}, i.destroy = {};
    var s = i.prototype;
    n.extend(s, e.prototype);
    var a = 0;
    s.create = function () {
        var t = this.guid = ++a;
        if (this.element.infiniteScrollGUID = t, r[t] = this, this.pageIndex = 1, this.loadCount = 0, this.updateGetPath(), this.getPath && this.getPath())
            for (var e in this.updateGetAbsolutePath(), this.log("initialized", [this.element.className]), this.callOnInit(), i.create) i.create[e].call(this);
        else console.log()
    }, s.option = function (t) {
        n.extend(this.options, t)
    }, s.callOnInit = function () {
        var t = this.options.onInit;
        t && t.call(this, this)
    }, s.dispatchEvent = function (t, e, n) {
        this.log(t, n);
        var i = e ? [e].concat(n) : n;
        if (this.emitEvent(t, i), o && this.$element) {
            var r = t += ".infiniteScroll";
            if (e) {
                var s = o.Event(e);
                s.type = t, r = s
            }
            this.$element.trigger(r, n)
        }
    };
    var l = {
        initialized: function (t) {
            return "on " + t
        },
        request: function (t) {
            return "URL: " + t
        },
        load: function (t, e) {
            return (t.title || "") + ". URL: " + e
        },
        error: function (t, e) {
            return t + ". URL: " + e
        },
        append: function (t, e, n) {
            return n.length + " items. URL: " + e
        },
        last: function (t, e) {
            return "URL: " + e
        },
        history: function (t, e) {
            return "URL: " + e
        },
        pageIndex: function (t, e) {
            return "current page determined to be: " + t + " from " + e
        }
    };
    s.log = function (t, e) {
        if (this.options.debug) {
            var n = "[InfiniteScroll] " + t,
                i = l[t];
            i && (n += ". " + i.apply(this, e)), console.log(n)
        }
    }, s.updateMeasurements = function () {
        this.windowHeight = t.innerHeight;
        var e = this.element.getBoundingClientRect();
        this.top = e.top + t.pageYOffset
    }, s.updateScroller = function () {
        var e = this.options.elementScroll;
        if (e) {
            if (this.scroller = !0 === e ? this.element : n.getQueryElement(e), !this.scroller) throw "Unable to find elementScroll: " + e
        } else this.scroller = t
    }, s.updateGetPath = function () {
        var t = this.options.path;
        if (t) {
            var e = typeof t;
            if ("function" != e) return "string" == e && t.match("{{#}}") ? void this.updateGetPathTemplate(t) : void this.updateGetPathSelector(t);
            this.getPath = t
        } else console.error("InfiniteScroll path option required. Set as: " + t)
    }, s.updateGetPathTemplate = function (t) {
        this.getPath = function () {
            var e = this.pageIndex + 1;
            return t.replace("{{#}}", e)
        }.bind(this);
        var e = t.replace(/(\\\?|\?)/, "\\?").replace("{{#}}", "(\\d\\d?\\d?)"),
            n = new RegExp(e),
            i = location.href.match(n);
        i && (this.pageIndex = parseInt(i[1], 10), this.log("pageIndex", [this.pageIndex, "template string"]))
    };
    var c = [/^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/, /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/, /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/];
    return s.updateGetPathSelector = function (t) {
        var e = document.querySelector(t);
        if (e) {
            for (var n, i, o = e.getAttribute("href"), r = 0; o && r < c.length; r++) {
                i = c[r];
                var s = o.match(i);
                if (s) {
                    n = s.slice(1);
                    break
                }
            }
            return n ? (this.isPathSelector = !0, this.getPath = function () {
                var t = this.pageIndex + 1;
                return n[0] + t + n[2]
            }.bind(this), this.pageIndex = parseInt(n[1], 10) - 1, void this.log("pageIndex", [this.pageIndex, "next link"])) : void console.error("InfiniteScroll unable to parse next link href: " + o)
        }
        console.error("Bad InfiniteScroll path option. Next link not found: " + t)
    }, s.updateGetAbsolutePath = function () {
        var t = this.getPath();
        if (t.match(/^http/) || t.match(/^\//)) this.getAbsolutePath = this.getPath;
        else {
            var e = location.pathname;
            if (t.match(/^\?/)) this.getAbsolutePath = function () {
                return e + this.getPath()
            };
            else {
                var n = e.substring(0, e.lastIndexOf("/"));
                this.getAbsolutePath = function () {
                    return n + "/" + this.getPath()
                }
            }
        }
    }, i.create.hideNav = function () {
        var t = n.getQueryElement(this.options.hideNav);
        t && (t.style.display = "none", this.nav = t)
    }, i.destroy.hideNav = function () {
        this.nav && (this.nav.style.display = "")
    }, s.destroy = function () {
        for (var t in this.allOff(), i.destroy) i.destroy[t].call(this);
        delete this.element.infiniteScrollGUID, delete r[this.guid], o && this.$element && o.removeData(this.element, "infiniteScroll")
    }, i.throttle = function (t, e) {
        var n, i;
        return e = e || 200,
            function () {
                var o = +new Date,
                    r = arguments,
                    s = function () {
                        n = o, t.apply(this, r)
                    }.bind(this);
                n && o < n + e ? (clearTimeout(i), i = setTimeout(s, e)) : s()
            }
    }, i.data = function (t) {
        var e = (t = n.getQueryElement(t)) && t.infiniteScrollGUID;
        return e && r[e]
    }, i.setJQuery = function (t) {
        o = t
    }, n.htmlInit(i, "infinite-scroll"), s._init = function () {}, o && o.bridget && o.bridget("infiniteScroll", i), i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("infinite-scroll/js/page-load", ["./core"], function (n) {
        return e(t, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core")) : e(t, t.InfiniteScroll)
}(window, function (t, e) {
    function n(t) {
        for (var e = document.createDocumentFragment(), n = 0; t && n < t.length; n++) e.appendChild(t[n]);
        return e
    }

    function i(t, e) {
        for (var n = t.attributes, i = 0; i < n.length; i++) {
            var o = n[i];
            e.setAttribute(o.name, o.value)
        }
    }
    var o = e.prototype;
    return e.defaults.loadOnScroll = !0, e.defaults.checkLastPage = !0, e.defaults.responseType = "document", e.create.pageLoad = function () {
        this.canLoad = !0, this.on("scrollThreshold", this.onScrollThresholdLoad), this.on("load", this.checkLastPage), this.options.outlayer && this.on("append", this.onAppendOutlayer)
    }, o.onScrollThresholdLoad = function () {
        this.options.loadOnScroll && this.loadNextPage()
    }, o.loadNextPage = function () {
        if (!this.isLoading && this.canLoad) {
            var t = this.getAbsolutePath();
            this.isLoading = !0;
            var e = function (e) {
                    this.onPageLoad(e, t)
                }.bind(this),
                n = function (e) {
                    this.onPageError(e, t)
                }.bind(this),
                i = function (e) {
                    this.lastPageReached(e, t)
                }.bind(this);
            (function (t, e, n, i, o) {
                var r = new XMLHttpRequest;
                r.open("GET", t, !0), r.responseType = e || "", r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.onload = function () {
                    if (200 == r.status) n(r.response);
                    else if (204 == r.status) o(r.response);
                    else {
                        var t = new Error(r.statusText);
                        i(t)
                    }
                }, r.onerror = function () {
                    var e = new Error("Network error requesting " + t);
                    i(e)
                }, r.send()
            })(t, this.options.responseType, e, n, i), this.dispatchEvent("request", null, [t])
        }
    }, o.onPageLoad = function (t, e) {
        return this.options.append || (this.isLoading = !1), this.pageIndex++, this.loadCount++, this.dispatchEvent("load", null, [t, e]), this.appendNextPage(t, e), t
    }, o.appendNextPage = function (t, e) {
        var i = this.options.append;
        if ("document" == this.options.responseType && i) {
            var o = t.querySelectorAll(i),
                r = n(o),
                s = function () {
                    this.appendItems(o, r), this.isLoading = !1, this.dispatchEvent("append", null, [t, e, o])
                }.bind(this);
            this.options.outlayer ? this.appendOutlayerItems(r, s) : s()
        }
    }, o.appendItems = function (t, e) {
        t && t.length && (function (t) {
            for (var e = t.querySelectorAll("script"), n = 0; n < e.length; n++) {
                var o = e[n],
                    r = document.createElement("script");
                i(o, r), r.innerHTML = o.innerHTML, o.parentNode.replaceChild(r, o)
            }
        }(e = e || n(t)), this.element.appendChild(e))
    }, o.appendOutlayerItems = function (n, i) {
        var o = e.imagesLoaded || t.imagesLoaded;
        return o ? void o(n, i) : (console.error("[InfiniteScroll] imagesLoaded required for outlayer option"), void(this.isLoading = !1))
    }, o.onAppendOutlayer = function (t, e, n) {
        this.options.outlayer.appended(n)
    }, o.checkLastPage = function (t, e) {
        var n = this.options.checkLastPage;
        if (n) {
            var i, o = this.options.path;
            if ("function" == typeof o)
                if (!this.getPath()) return void this.lastPageReached(t, e);
            if ("string" == typeof n ? i = n : this.isPathSelector && (i = o), i && t.querySelector) t.querySelector(i) || this.lastPageReached(t, e)
        }
    }, o.lastPageReached = function (t, e) {
        this.canLoad = !1, this.dispatchEvent("last", null, [t, e])
    }, o.onPageError = function (t, e) {
        return this.isLoading = !1, this.canLoad = !1, this.dispatchEvent("error", null, [t, e]), t
    }, e.create.prefill = function () {
        if (this.options.prefill) {
            var t = this.options.append;
            if (!t) return void console.error("append option required for prefill. Set as :" + t);
            this.updateMeasurements(), this.updateScroller(), this.isPrefilling = !0, this.on("append", this.prefill), this.once("error", this.stopPrefill), this.once("last", this.stopPrefill), this.prefill()
        }
    }, o.prefill = function () {
        var t = this.getPrefillDistance();
        this.isPrefilling = t >= 0, this.isPrefilling ? (this.log("prefill"), this.loadNextPage()) : this.stopPrefill()
    }, o.getPrefillDistance = function () {
        return this.options.elementScroll ? this.scroller.clientHeight - this.scroller.scrollHeight : this.windowHeight - this.element.clientHeight
    }, o.stopPrefill = function () {
        this.log("stopPrefill"), this.off("append", this.prefill)
    }, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("infinite-scroll/js/scroll-watch", ["./core", "fizzy-ui-utils/utils"], function (n, i) {
        return e(t, n, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils)
}(window, function (t, e, n) {
    var i = e.prototype;
    return e.defaults.scrollThreshold = 400, e.create.scrollWatch = function () {
        this.pageScrollHandler = this.onPageScroll.bind(this), this.resizeHandler = this.onResize.bind(this);
        var t = this.options.scrollThreshold;
        (t || 0 === t) && this.enableScrollWatch()
    }, e.destroy.scrollWatch = function () {
        this.disableScrollWatch()
    }, i.enableScrollWatch = function () {
        this.isScrollWatching || (this.isScrollWatching = !0, this.updateMeasurements(), this.updateScroller(), this.on("last", this.disableScrollWatch), this.bindScrollWatchEvents(!0))
    }, i.disableScrollWatch = function () {
        this.isScrollWatching && (this.bindScrollWatchEvents(!1), delete this.isScrollWatching)
    }, i.bindScrollWatchEvents = function (e) {
        var n = e ? "addEventListener" : "removeEventListener";
        this.scroller[n]("scroll", this.pageScrollHandler), t[n]("resize", this.resizeHandler)
    }, i.onPageScroll = e.throttle(function () {
        this.getBottomDistance() <= this.options.scrollThreshold && this.dispatchEvent("scrollThreshold")
    }), i.getBottomDistance = function () {
        return this.options.elementScroll ? this.getElementBottomDistance() : this.getWindowBottomDistance()
    }, i.getWindowBottomDistance = function () {
        return this.top + this.element.clientHeight - (t.pageYOffset + this.windowHeight)
    }, i.getElementBottomDistance = function () {
        return this.scroller.scrollHeight - (this.scroller.scrollTop + this.scroller.clientHeight)
    }, i.onResize = function () {
        this.updateMeasurements()
    }, n.debounceMethod(e, "onResize", 150), e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("infinite-scroll/js/history", ["./core", "fizzy-ui-utils/utils"], function (n, i) {
        return e(t, n, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils)
}(window, function (t, e, n) {
    var i = e.prototype;
    e.defaults.history = "replace";
    var o = document.createElement("a");
    return e.create.history = function () {
        if (this.options.history) return o.href = this.getAbsolutePath(), (o.origin || o.protocol + "//" + o.host) == location.origin ? void(this.options.append ? this.createHistoryAppend() : this.createHistoryPageLoad()) : void console.error("[InfiniteScroll] cannot set history with different origin: " + o.origin + " on " + location.origin + " . History behavior disabled.")
    }, i.createHistoryAppend = function () {
        this.updateMeasurements(), this.updateScroller(), this.scrollPages = [{
            top: 0,
            path: location.href,
            title: document.title
        }], this.scrollPageIndex = 0, this.scrollHistoryHandler = this.onScrollHistory.bind(this), this.unloadHandler = this.onUnload.bind(this), this.scroller.addEventListener("scroll", this.scrollHistoryHandler), this.on("append", this.onAppendHistory), this.bindHistoryAppendEvents(!0)
    }, i.bindHistoryAppendEvents = function (e) {
        var n = e ? "addEventListener" : "removeEventListener";
        this.scroller[n]("scroll", this.scrollHistoryHandler), t[n]("unload", this.unloadHandler)
    }, i.createHistoryPageLoad = function () {
        this.on("load", this.onPageLoadHistory)
    }, e.destroy.history = i.destroyHistory = function () {
        this.options.history && this.options.append && this.bindHistoryAppendEvents(!1)
    }, i.onAppendHistory = function (t, e, n) {
        if (n && n.length) {
            var i = n[0],
                r = this.getElementScrollY(i);
            o.href = e, this.scrollPages.push({
                top: r,
                path: o.href,
                title: t.title
            })
        }
    }, i.getElementScrollY = function (t) {
        return this.options.elementScroll ? this.getElementElementScrollY(t) : this.getElementWindowScrollY(t)
    }, i.getElementWindowScrollY = function (e) {
        return e.getBoundingClientRect().top + t.pageYOffset
    }, i.getElementElementScrollY = function (t) {
        return t.offsetTop - this.top
    }, i.onScrollHistory = function () {
        for (var t, e, n = this.getScrollViewY(), i = 0; i < this.scrollPages.length; i++) {
            var o = this.scrollPages[i];
            if (o.top >= n) break;
            t = i, e = o
        }
        t != this.scrollPageIndex && (this.scrollPageIndex = t, this.setHistory(e.title, e.path))
    }, n.debounceMethod(e, "onScrollHistory", 150), i.getScrollViewY = function () {
        return this.options.elementScroll ? this.scroller.scrollTop + this.scroller.clientHeight / 2 : t.pageYOffset + this.windowHeight / 2
    }, i.setHistory = function (t, e) {
        var n = this.options.history;
        n && history[n + "State"] && (history[n + "State"](null, t, e), this.options.historyTitle && (document.title = t), this.dispatchEvent("history", null, [t, e]))
    }, i.onUnload = function () {
        var e = this.scrollPageIndex;
        if (0 !== e) {
            var n = this.scrollPages[e],
                i = t.pageYOffset - n.top + this.top;
            this.destroyHistory(), scrollTo(0, i)
        }
    }, i.onPageLoadHistory = function (t, e) {
        this.setHistory(t.title, e)
    }, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("infinite-scroll/js/button", ["./core", "fizzy-ui-utils/utils"], function (n, i) {
        return e(t, n, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils)
}(window, function (t, e, n) {
    function i(t, e) {
        this.element = t, this.infScroll = e, this.clickHandler = this.onClick.bind(this), this.element.addEventListener("click", this.clickHandler), e.on("request", this.disable.bind(this)), e.on("load", this.enable.bind(this)), e.on("error", this.hide.bind(this)), e.on("last", this.hide.bind(this))
    }
    return e.create.button = function () {
        var t = n.getQueryElement(this.options.button);
        t && (this.button = new i(t, this))
    }, e.destroy.button = function () {
        this.button && this.button.destroy()
    }, i.prototype.onClick = function (t) {
        t.preventDefault(), this.infScroll.loadNextPage()
    }, i.prototype.enable = function () {
        this.element.removeAttribute("disabled")
    }, i.prototype.disable = function () {
        this.element.disabled = "disabled"
    }, i.prototype.hide = function () {
        this.element.style.display = "none"
    }, i.prototype.destroy = function () {
        this.element.removeEventListener("click", this.clickHandler)
    }, e.Button = i, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("infinite-scroll/js/status", ["./core", "fizzy-ui-utils/utils"], function (n, i) {
        return e(t, n, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./core"), require("fizzy-ui-utils")) : e(t, t.InfiniteScroll, t.fizzyUIUtils)
}(window, function (t, e, n) {
    function i(t) {
        r(t, "none")
    }

    function o(t) {
        r(t, "block")
    }

    function r(t, e) {
        t && (t.style.display = e)
    }
    var s = e.prototype;
    return e.create.status = function () {
        var t = n.getQueryElement(this.options.status);
        t && (this.statusElement = t, this.statusEventElements = {
            request: t.querySelector(".infinite-scroll-request"),
            error: t.querySelector(".infinite-scroll-error"),
            last: t.querySelector(".infinite-scroll-last")
        }, this.on("request", this.showRequestStatus), this.on("error", this.showErrorStatus), this.on("last", this.showLastStatus), this.bindHideStatus("on"))
    }, s.bindHideStatus = function (t) {
        var e = this.options.append ? "append" : "load";
        this[t](e, this.hideAllStatus)
    }, s.showRequestStatus = function () {
        this.showStatus("request")
    }, s.showErrorStatus = function () {
        this.showStatus("error")
    }, s.showLastStatus = function () {
        this.showStatus("last"), this.bindHideStatus("off")
    }, s.showStatus = function (t) {
        o(this.statusElement), this.hideStatusEventElements(), o(this.statusEventElements[t])
    }, s.hideAllStatus = function () {
        i(this.statusElement), this.hideStatusEventElements()
    }, s.hideStatusEventElements = function () {
        for (var t in this.statusEventElements) {
            i(this.statusEventElements[t])
        }
    }, e
}),
function (t, e) {
    "function" == typeof define && define.amd ? define(["infinite-scroll/js/core", "infinite-scroll/js/page-load", "infinite-scroll/js/scroll-watch", "infinite-scroll/js/history", "infinite-scroll/js/button", "infinite-scroll/js/status"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./core"), require("./page-load"), require("./scroll-watch"), require("./history"), require("./button"), require("./status")))
}(window, function (t) {
    return t
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (n) {
        return e(t, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function (t, e) {
    function n(t, e) {
        for (var n in e) t[n] = e[n];
        return t
    }

    function i(t, e, o) {
        if (!(this instanceof i)) return new i(t, e, o);
        var r = t;
        return "string" == typeof t && (r = document.querySelectorAll(t)), r ? (this.elements = function (t) {
            return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? l.call(t) : [t]
        }(r), this.options = n({}, this.options), "function" == typeof e ? o = e : n(this.options, e), o && this.on("always", o), this.getImages(), s && (this.jqDeferred = new s.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (r || t))
    }

    function o(t) {
        this.img = t
    }

    function r(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var s = t.jQuery,
        a = t.console,
        l = Array.prototype.slice;
    i.prototype = Object.create(e.prototype), i.prototype.options = {}, i.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, i.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
            for (var n = t.querySelectorAll("img"), i = 0; i < n.length; i++) {
                var o = n[i];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (i = 0; i < r.length; i++) {
                    var s = r[i];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var c = {
        1: !0,
        9: !0,
        11: !0
    };
    return i.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
            for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(e.backgroundImage); null !== i;) {
                var o = i && i[2];
                o && this.addBackground(o, t), i = n.exec(e.backgroundImage)
            }
    }, i.prototype.addImage = function (t) {
        var e = new o(t);
        this.images.push(e)
    }, i.prototype.addBackground = function (t, e) {
        var n = new r(t, e);
        this.images.push(n)
    }, i.prototype.check = function () {
        function t(t, n, i) {
            setTimeout(function () {
                e.progress(t, n, i)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, i.prototype.progress = function (t, e, n) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + n, t, e)
    }, i.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, o.prototype = Object.create(e.prototype), o.prototype.check = function () {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, o.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth
    }, o.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, o.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, o.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, o.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, o.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(o.prototype), r.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, i.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) && ((s = e).fn.imagesLoaded = function (t, e) {
            return new i(this, t, e).jqDeferred.promise(s(this))
        })
    }, i.makeJQueryPlugin(), i
}),
function (t, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoad = e()
}(this, function () {
    "use strict";
    var t = "undefined" != typeof window,
        e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        n = t && "IntersectionObserver" in window,
        i = t && "classList" in document.createElement("p"),
        o = {
            elements_selector: "img",
            container: e || t ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            load_delay: 0,
            auto_unobserve: !0,
            callback_enter: null,
            callback_exit: null,
            callback_reveal: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            use_native: !1
        },
        r = function (t, e) {
            var n, i = new t(e);
            try {
                n = new CustomEvent("LazyLoad::Initialized", {
                    detail: {
                        instance: i
                    }
                })
            } catch (t) {
                (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, {
                    instance: i
                })
            }
            window.dispatchEvent(n)
        },
        s = function (t, e) {
            return t.getAttribute("data-" + e)
        },
        a = function (t, e, n) {
            var i = "data-" + e;
            null !== n ? t.setAttribute(i, n) : t.removeAttribute(i)
        },
        l = function (t) {
            return "true" === s(t, "was-processed")
        },
        c = function (t, e) {
            return a(t, "ll-timeout", e)
        },
        u = function (t) {
            return s(t, "ll-timeout")
        },
        d = function (t, e) {
            t && t(e)
        },
        h = function (t, e) {
            t._loadingCount += e, 0 === t._elements.length && 0 === t._loadingCount && d(t._settings.callback_finish)
        },
        f = function (t) {
            for (var e, n = [], i = 0; e = t.children[i]; i += 1) "SOURCE" === e.tagName && n.push(e);
            return n
        },
        p = function (t, e, n) {
            n && t.setAttribute(e, n)
        },
        m = function (t, e) {
            p(t, "sizes", s(t, e.data_sizes)), p(t, "srcset", s(t, e.data_srcset)), p(t, "src", s(t, e.data_src))
        },
        v = {
            IMG: function (t, e) {
                var n = t.parentNode;
                n && "PICTURE" === n.tagName && f(n).forEach(function (t) {
                    m(t, e)
                }), m(t, e)
            },
            IFRAME: function (t, e) {
                p(t, "src", s(t, e.data_src))
            },
            VIDEO: function (t, e) {
                f(t).forEach(function (t) {
                    p(t, "src", s(t, e.data_src))
                }), p(t, "src", s(t, e.data_src)), t.load()
            }
        },
        g = function (t, e) {
            i ? t.classList.add(e) : t.className += (t.className ? " " : "") + e
        },
        y = function (t, e, n) {
            t.addEventListener(e, n)
        },
        b = function (t, e, n) {
            t.removeEventListener(e, n)
        },
        E = function (t, e, n) {
            b(t, "load", e), b(t, "loadeddata", e), b(t, "error", n)
        },
        w = function (t, e, n) {
            var o = n._settings,
                r = e ? o.class_loaded : o.class_error,
                s = e ? o.callback_loaded : o.callback_error,
                a = t.target;
            ! function (t, e) {
                i ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
            }(a, o.class_loading), g(a, r), d(s, a), h(n, -1)
        },
        S = ["IMG", "IFRAME", "VIDEO"],
        L = function (t, e) {
            var n = e._observer;
            x(t, e), n && e._settings.auto_unobserve && n.unobserve(t)
        },
        I = function (t) {
            var e = u(t);
            e && (clearTimeout(e), c(t, null))
        },
        x = function (t, e, n) {
            var i = e._settings;
            !n && l(t) || (S.indexOf(t.tagName) > -1 && (function (t, e) {
                var n = function n(o) {
                        w(o, !0, e), E(t, n, i)
                    },
                    i = function i(o) {
                        w(o, !1, e), E(t, n, i)
                    };
                ! function (t, e, n) {
                    y(t, "load", e), y(t, "loadeddata", e), y(t, "error", n)
                }(t, n, i)
            }(t, e), g(t, i.class_loading)), function (t, e) {
                var n, i, o = e._settings,
                    r = t.tagName,
                    a = v[r];
                if (a) return a(t, o), h(e, 1), void(e._elements = (n = e._elements, i = t, n.filter(function (t) {
                    return t !== i
                })));
                ! function (t, e) {
                    var n = s(t, e.data_src),
                        i = s(t, e.data_bg);
                    n && (t.style.backgroundImage = 'url("'.concat(n, '")')), i && (t.style.backgroundImage = i)
                }(t, o)
            }(t, e), function (t) {
                a(t, "was-processed", "true")
            }(t), d(i.callback_reveal, t), d(i.callback_set, t))
        },
        _ = function (t) {
            return !!n && (t._observer = new IntersectionObserver(function (e) {
                e.forEach(function (e) {
                    return function (t) {
                        return t.isIntersecting || t.intersectionRatio > 0
                    }(e) ? function (t, e) {
                        var n = e._settings;
                        d(n.callback_enter, t), n.load_delay ? function (t, e) {
                            var n = e._settings.load_delay,
                                i = u(t);
                            i || (i = setTimeout(function () {
                                L(t, e), I(t)
                            }, n), c(t, i))
                        }(t, e) : L(t, e)
                    }(e.target, t) : function (t, e) {
                        var n = e._settings;
                        d(n.callback_exit, t), n.load_delay && I(t)
                    }(e.target, t)
                })
            }, {
                root: (e = t._settings).container === document ? null : e.container,
                rootMargin: e.thresholds || e.threshold + "px"
            }), !0);
            var e
        },
        A = ["IMG", "IFRAME"],
        P = function (t, e) {
            return function (t) {
                return t.filter(function (t) {
                    return !l(t)
                })
            }((n = t || function (t) {
                return t.container.querySelectorAll(t.elements_selector)
            }(e), Array.prototype.slice.call(n)));
            var n
        },
        k = function (t, e) {
            this._settings = function (t) {
                return _extends({}, o, t)
            }(t), this._loadingCount = 0, _(this), this.update(e)
        };
    return k.prototype = {
        update: function (t) {
            var n, i = this,
                o = this._settings;
            this._elements = P(t, o), !e && this._observer ? (o.use_native && "loading" in HTMLImageElement.prototype && ((n = this)._elements.forEach(function (t) {
                -1 !== A.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), x(t, n))
            }), this._elements = P(t, o)), this._elements.forEach(function (t) {
                i._observer.observe(t)
            })) : this.loadAll()
        },
        destroy: function () {
            var t = this;
            this._observer && (this._elements.forEach(function (e) {
                t._observer.unobserve(e)
            }), this._observer = null), this._elements = null, this._settings = null
        },
        load: function (t, e) {
            x(t, this, e)
        },
        loadAll: function () {
            var t = this;
            this._elements.forEach(function (e) {
                L(e, t)
            })
        }
    }, t && function (t, e) {
        if (e)
            if (e.length)
                for (var n, i = 0; n = e[i]; i += 1) r(t, n);
            else r(t, e)
    }(k, window.lazyLoadOptions), k
});