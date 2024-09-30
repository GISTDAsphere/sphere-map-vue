import { ref as v, provide as S, onMounted as b, openBlock as O, createElementBlock as R, createElementVNode as _, renderSlot as j, inject as y, onUnmounted as f } from "vue";
const k = "https://api.sphere.gistda.or.th/map/", M = {
  apiKey: null,
  src: null,
  debug: !1,
  loaded: null,
  scriptReady: null,
  prepare: function({ apiKey: n = null, src: r = null, debug: e = !1, loaded: t = null }) {
    if (!(typeof window > "u")) {
      if (window.sphere) {
        console.warn("sphere Map Vue: sphere Map API is already loaded");
        return;
      }
      this.apiKey = n, this.src = r || k, this.debug = e, this.loaded = t;
    }
  },
  loadScript: function() {
    if (this.scriptReady !== null)
      return;
    let n = this.src, r = {};
    this.apiKey && (r.key = this.apiKey), this.debug && (r.debug = !0);
    const e = new URLSearchParams(r);
    e && (n += `?${e}`), this.scriptReady = new Promise((t, a) => {
      let p = document.createElement("script");
      p.onload = () => {
        this.loaded && typeof this.loaded == "function" && this.loaded(window.sphere), t();
      }, p.onerror = () => {
        a();
      }, p.async = !0, p.src = n, document.body.appendChild(p);
    });
  }
}, P = {
  __name: "Map",
  props: {
    projection: {
      type: String,
      default: null
    },
    layer: {
      type: Array,
      default: null
    },
    zoom: {
      type: Number,
      default: null
    },
    zoomRange: {
      type: Object,
      default: null
    },
    location: {
      type: Object,
      default: null
    },
    ui: {
      type: String,
      default: null
    },
    input: {
      type: Boolean,
      default: null
    },
    autoResize: {
      type: Boolean,
      default: null
    },
    lastView: {
      type: Boolean,
      default: null
    },
    smoothZoom: {
      type: Boolean,
      default: null
    },
    language: {
      type: String,
      default: null
    }
  },
  emits: ["load"],
  setup(n, { emit: r }) {
    M.loadScript();
    const e = n;
    let t = null, a = !1;
    const p = v(null), l = new Promise((s, d) => {
      (function g(w = 0) {
        if (a) {
          s(t);
          return;
        } else if (w === 3e4) {
          d("sphere Map Vue: Cannot create sphere Map instance");
          return;
        }
        setTimeout(() => {
          g(w);
        }, 10), w += 10;
      })();
    }), u = r;
    S("mapReady", l);
    function o() {
      if (typeof window.sphere != "object") {
        console.error("sphere Map Vue: sphere Map API is not found");
        return;
      }
      let s = i();
      s.placeholder = p.value, t = new window.sphere.Map(s), s.zoomRange && t.zoomRange(s.zoomRange), t.Event.bind("ready", () => {
        a = !0, u("load", t);
      });
    }
    function i() {
      const s = {};
      for (const d in e)
        e[d] !== null && (d === "projection" ? s.projection = window.sphere.Projections[e.projection] : d === "layer" ? s.layer = c(e.layer) : d === "ui" ? s.ui = window.sphere.UiComponent[e.ui] : s[d] = e[d]);
      return s;
    }
    function c(s) {
      let d = [];
      for (let g of s)
        d.push(window.sphere.Layers[g]);
      return d;
    }
    return b(() => {
      M.scriptReady.then(() => {
        o();
      });
    }), (s, d) => (O(), R("div", null, [
      _("div", {
        style: { width: "100%", height: "100%" },
        ref_key: "placeholder",
        ref: p
      }, [
        j(s.$slots, "default")
      ], 512)
    ]));
  }
}, V = {
  __name: "Marker",
  props: {
    location: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    icon: {
      type: Object,
      default: null
    },
    detail: {
      type: String,
      default: null
    },
    popup: {
      type: Object,
      default: null
    },
    visibleRange: {
      type: Object,
      default: null
    },
    clickable: {
      type: Boolean,
      default: null
    },
    draggable: {
      type: Boolean,
      default: null
    },
    weight: {
      type: String,
      default: null
    },
    rotate: {
      type: Number,
      default: null
    },
    iconStyle: {
      type: String,
      default: null
    }
  },
  emits: ["add"],
  setup(n, { emit: r }) {
    let e = null, t = null;
    const a = y("mapReady", null), p = r, l = n;
    function u() {
      const i = {};
      for (const c in l)
        if (l[c] !== null)
          if (c === "weight") {
            let s = window.sphere.OverlayWeight[l.weight];
            s && (i.weight = s);
          } else c === "iconStyle" ? i.style = l.iconStyle : i[c] = l[c];
      return i;
    }
    function o(i, c) {
      t = new window.sphere.Marker(i, c), e == null || e.Overlays.add(t), p("add", t);
    }
    return a === null && (console.error("sphere Map Vue: sphere Map component is not ready"), returnw), a.then((i) => {
      if (e = i, !l.location || isNaN(l.location.lat) || isNaN(l.location.lon)) {
        console.error("sphere Map Vue: Invalid marker location");
        return;
      }
      o(l.location, u());
    }).catch((i) => {
      console.error(i);
    }), f(() => {
      e == null || e.Overlays.remove(t);
    }), () => {
    };
  }
};
function h() {
  return {
    location: {
      type: [Object, Array],
      default: null
    },
    radius: {
      type: Number,
      default: null
    },
    size: {
      type: [Number, Object],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    detail: {
      type: String,
      default: null
    },
    label: {
      type: [String, Boolean],
      default: null
    },
    labelOptions: {
      type: Object,
      default: null
    },
    popup: {
      type: Object,
      default: null
    },
    visibleRange: {
      type: Object,
      default: null
    },
    lineWidth: {
      type: Number,
      default: null
    },
    lineColor: {
      type: String,
      default: null
    },
    fillColor: {
      type: String,
      default: null
    },
    lineStyle: {
      type: String,
      default: null
    },
    pivot: {
      type: Object,
      default: null
    },
    clickable: {
      type: Boolean,
      default: null
    },
    editable: {
      type: Boolean,
      default: null
    },
    pointer: {
      type: Boolean,
      default: null
    },
    draggable: {
      type: Boolean,
      default: null
    },
    rotatable: {
      type: Boolean,
      default: null
    },
    weight: {
      type: String,
      default: null
    },
    texture: {
      type: String,
      default: null
    },
    textureAlpha: {
      type: Number,
      default: null
    },
    linePattern: {
      type: String,
      default: null
    }
  };
}
function m(n) {
  const r = {};
  for (let e in n)
    if (n[e] !== null)
      if (e === "weight") {
        let t = window.sphere.OverlayWeight[n.weight];
        t && (r.weight = t);
      } else e === "lineStyle" ? r.lineStyle = window.sphere.LineStyle[n.lineStyle] : r[e] = n[e];
  return r;
}
const B = {
  __name: "Polyline",
  props: h(),
  emits: ["add"],
  setup(n, { emit: r }) {
    let e = null, t = null;
    const a = y("mapReady", null), p = r, l = n;
    function u(o, i) {
      t = new window.sphere.Polyline(o, i), e == null || e.Overlays.add(t), p("add", t);
    }
    return (() => {
      if (a === null) {
        console.error("sphere Map Vue: Gistda sphere Map component is not ready");
        return;
      }
      a.then((o) => {
        if (e = o, !l.location) {
          console.error("sphere Map Vue: Invalid polyline location");
          return;
        }
        u(l.location, m(l));
      }).catch((o) => {
        console.error(o);
      });
    })(), f(() => {
      e == null || e.Overlays.remove(t);
    }), () => {
    };
  }
}, N = {
  __name: "Polygon",
  props: h(),
  emits: ["add"],
  setup(n, { emit: r }) {
    let e = null, t = null;
    const a = y("mapReady", null), p = r, l = n;
    function u(o, i) {
      t = new window.sphere.Polygon(o, i), e == null || e.Overlays.add(t), p("add", t);
    }
    return (() => {
      if (a === null) {
        console.error("sphere Map Vue: Gistda sphere Map component is not ready");
        return;
      }
      a.then((o) => {
        if (e = o, !l.location) {
          console.error("sphere Map Vue: Invalid polygon location");
          return;
        }
        u(l.location, m(l));
      }).catch((o) => {
        console.error(o);
      });
    })(), f(() => {
      e == null || e.Overlays.remove(t);
    }), () => {
    };
  }
}, z = {
  __name: "Circle",
  props: h(),
  emits: ["add"],
  setup(n, { emit: r }) {
    let e = null, t = null;
    const a = y("mapReady", null), p = r, l = n;
    function u(o, i, c) {
      t = new window.sphere.Circle(o, i, c), e == null || e.Overlays.add(t), p("add", t);
    }
    return (() => {
      if (a === null) {
        console.error("sphere Map Vue: Gistda sphere map component is not ready");
        return;
      }
      a.then((o) => {
        if (e = o, !l.location) {
          console.error("sphere Map Vue: Invalid circle location");
          return;
        }
        if (!l.radius || isNaN(l.radius)) {
          console.error("sphere Map Vue: Invalid circle radius");
          return;
        }
        u(l.location, l.radius, m(l));
      }).catch((o) => {
        console.error(o);
      });
    })(), f(() => {
      e.Overlays.remove(t);
    }), () => {
    };
  }
}, C = {
  __name: "Dot",
  props: h(),
  emits: ["add"],
  setup(n, { emit: r }) {
    let e = null, t = null;
    const a = y("mapReady", null), p = r, l = n;
    function u(o, i) {
      t = new window.sphere.Dot(o, i), e == null || e.Overlays.add(t), p("add", t);
    }
    return (() => {
      if (a === null) {
        console.error("sphere Map Vue: Gistda sphere map component is not ready");
        return;
      }
      a.then((o) => {
        if (e = o, !l.location) {
          console.error("sphere Map Vue: Invalid dot location");
          return;
        }
        u(l.location, m(l));
      }).catch((o) => {
        console.error(o);
      });
    })(), f(() => {
      e == null || e.Overlays.remove(t);
    }), () => {
    };
  }
}, I = {
  __name: "Rectangle",
  props: h(),
  emits: ["add"],
  setup(n, { emit: r }) {
    let e = null, t = null;
    const a = y("mapReady", null), p = r, l = n;
    function u(o, i) {
      t = new window.sphere.Rectangle(o, i), e == null || e.Overlays.add(t), p("add", t);
    }
    return (() => {
      if (a === null) {
        console.error("sphere Map Vue: Gistda sphere Map component is not ready");
        return;
      }
      a.then((o) => {
        if (e = o, !l.location) {
          console.error("sphere Map Vue: Invalid rectangle location");
          return;
        }
        if (!l.size) {
          console.error("sphere Map Vue: Invalid rectangle size");
          return;
        }
        u(l.location, l.size, m(l));
      }).catch((o) => {
        console.error(o);
      });
    })(), f(() => {
      e.Overlays.remove(t);
    }), () => {
    };
  }
}, $ = (n) => {
  M.prepare(n);
}, A = {
  install(n, r) {
    r.load && $(r.load), n.component("SphereMap", P), n.component("SphereMapMarker", V), n.component("SphereMapPolyline", B), n.component("SphereMapPolygon", N), n.component("SphereMapCircle", z), n.component("SphereMapDot", C), n.component("SphereMapRectangle", I);
  }
};
export {
  P as SphereMap,
  z as SphereMapCircle,
  C as SphereMapDot,
  $ as SphereMapLoad,
  V as SphereMapMarker,
  N as SphereMapPolygon,
  B as SphereMapPolyline,
  I as SphereMapRectangle,
  A as default
};
