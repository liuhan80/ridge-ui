import { o as H, E as v } from "./exception-VDL0KR5O.mjs";
import { b as h, T as I, t as W, s as j, d as A, e as x } from "./http-bypass-mOgIKNf-.mjs";
import { nanoid as G } from "nanoid";
function Y(t, e, n = 1) {
  return new Promise((i, r) => {
    const o = indexedDB.open(t, n);
    o.onerror = (a) => {
      console.error("数据库打开失败:", a.target.error), r(a.target.error);
    }, o.onsuccess = (a) => {
      console.log("数据库打开成功"), i(a.target.result);
    }, o.onupgradeneeded = (a) => {
      console.log("正在升级数据库版本");
      const f = a.target.result;
      f.objectStoreNames.contains(e) || f.createObjectStore(e, { keyPath: "key" });
    };
  });
}
async function V(t, e, n, i) {
  return new Promise((r, o) => {
    const u = t.transaction([e], "readwrite").objectStore(e).put({ key: n, value: i });
    u.onsuccess = (c) => {
      console.log("数据写入成功"), r();
    }, u.onerror = (c) => {
      console.error("数据写入失败:", c.target.error), o(c.target.error);
    };
  });
}
const m = {}, b = {};
function C(t) {
  return U(
    "map",
    t,
    (e, n, i) => {
      if (typeof n.data !== null && typeof n.data == "object") {
        let r = n.data;
        if (t.format)
          try {
            r = t.format(n.data);
          } catch (o) {
            throw new Error("数据格式化出错，请检查传入的数据是否符合预期", { cause: o });
          }
        B(m[e].data, r, 1, i);
      }
    }
  );
}
function d(t) {
  return U(
    "list",
    t,
    (e, n, i) => {
      let r = m[e].data;
      m[e].data.push(n.data), r.length > i && i > 0 && r.shift();
    }
  );
}
function U(t, e, n) {
  const { tCodeList: i, interval: r, output: o, save: a = !1, outputNumber: f = 1, limit: u = 2 } = e, c = [];
  if (e.merge) {
    const s = G(), E = o, l = n, p = t === "map" ? {} : [];
    m[s] = { code: s, data: p, total: 0, start: h(), uflag: !1 }, c.push(m[s]), I.subscribe(s, "debug", (T) => {
      const S = s;
      i.includes(T.code) && (m[S].utime = h(), m[S].uflag = !0, m[S].total++, l(S, T, u, e.format));
    }), Q(t, s, r, E, a, f);
  } else
    i.forEach((s) => {
      const E = `${s}_${t}`, l = o, p = n, T = t === "map" ? {} : [];
      m[E] = { code: s, data: T, total: 0, start: h(), uflag: !1 }, c.push(m[E]), I.subscribe(E, "debug", (S) => {
        const $ = E;
        s === S.code && (m[$].utime = h(), m[$].uflag = !0, m[$].total++, p($, S, u, e.format));
      }), Q(t, E, r, l, a, f);
    });
  return c;
}
function Q(t, e, n = 10, i, r = !1, o = 1) {
  b[e] = {
    counter: 0,
    timer: setInterval(() => {
      if (m[e].uflag || o === 1) {
        try {
          i({ ...m[e] });
        } catch (a) {
          throw new Error("执行内存数据的处理函数失败", { cause: a });
        } finally {
          t === "list" && (m[e].data = []);
        }
        r && z(e, m[e]), m[e].uflag = !1;
      }
      o > 0 && (b[e].counter++, b[e].counter >= o && (m[e].end = h(), I.unsubscribe(e, "debug"), clearInterval(b[e].timer), delete m[e], delete b[e]));
    }, n * 1e3)
  };
}
function B(t, e, n = 1, i = 2) {
  for (const r in e)
    e[r] === void 0 || e[r] === null ? t[r] = e[r] : typeof e[r] == "object" && e[r] !== null && n <= i ? ((!t[r] || typeof t[r] != "object") && (t[r] = {}), n++, B(t[r], e[r], n, i)) : t[r] = e[r];
  return t;
}
async function z(t, e) {
  let n = "{}", i = 0;
  try {
    n = JSON.stringify(e, null, 4);
  } catch (r) {
    console.error(`fre>[${t}]>序列化自定义的Map内存数据失败`, r), i++;
  }
  if (i > 0) return !1;
  try {
    localStorage.setItem(t, n);
  } catch (r) {
    console.error(`fre>[${t}]>写入localstorag失败`, r), i++;
  }
  return i === 0;
}
function X(t) {
  return m[`${t}_map`];
}
function L(t) {
  return m[`${t}_list`];
}
function _(t) {
  const e = String(t.getHours()).padStart(2, "0"), n = String(t.getMinutes()).padStart(2, "0"), i = String(t.getSeconds()).padStart(2, "0"), r = String(t.getMilliseconds()).padStart(3, "0");
  return `${e}:${n}:${i}.${r}`;
}
function g(...t) {
  console.warn("test>fre>", ...t);
}
function Z() {
  const t = C({
    tCodeList: [
      "FRE_CLIENT_MQTT_CONNECTED",
      "FRE_CLIENT_MQTT_RECONNECTING",
      "FRE_CLIENT_MQTT_ERROR",
      "FRE_CLIENT_MQTT_OFFLINE",
      "FRE_CLIENT_MQTT_END",
      "FRE_CLIENT_MQTT_DISCONNECT",
      "FRE_CLIENT_MQTT_CLOSE"
    ],
    outputNumber: 0,
    limit: 2,
    interval: 1,
    merge: !0,
    output: (o) => {
    }
  }), e = C({
    tCodeList: [
      "FRE_CLIENT_MQTT_SUBSCRIBE_RETRY_ERROR",
      "FRE_CLIENT_MQTT_SUBSCRIBE_RETRY_OK",
      "FRE_CLIENT_MQTT_SUBSCRIBE_ERROR",
      "FRE_CLIENT_MQTT_SUBSCRIBE_OK",
      "FRE_CLIENT_MQTT_UNSUBSCRIBE_ERROR",
      "FRE_CLIENT_MQTT_UNSUBSCRIBE_OK"
    ],
    outputNumber: 0,
    limit: 2,
    interval: 1,
    merge: !0,
    output: (o) => {
      let a = o.data;
      for (let f in a)
        for (let u = 0; u < t.length; u++) {
          let c = t[u].data;
          if (c[f]) {
            let s = c[f];
            s.topics || (s.topics = a[f]);
          }
        }
    }
  });
  d({
    tCodeList: [
      "FRE_CLIENT_MQTT_MESSAGE"
    ],
    outputNumber: 0,
    limit: 0,
    interval: 1,
    output: (o) => {
      const a = e[0].data;
      o.data.forEach((u) => {
        const { url: c, topic: s } = u;
        if (a[c]) {
          let E = a[c];
          if (E && E[s]) {
            let l = E[s];
            l.counter || (l.counter = { dc: 0, suber: { ok: 0, ex: 0, discard: 0 } }), l.counter.dc++;
          }
        }
      });
    }
  }), d({
    tCodeList: [
      "FRE_CLIENT_MQTT_CALLBACK_OK",
      "FRE_CLIENT_MQTT_CALLBACK_ERROR"
    ],
    outputNumber: 0,
    limit: 0,
    interval: 1,
    output: function(o) {
      const a = e[0].data;
      o.data.forEach((u) => {
        const { url: c, topic: s, status: E, error: l } = u;
        if (a[c]) {
          let p = a[c];
          if (p && p[s]) {
            let T = p[s];
            T.counter && (E === "ok" ? T.counter.suber.ok++ : T.counter.suber.ex++, l && (T.counter.suber.error = l));
          }
        }
      });
    }
  });
  const n = d({
    tCodeList: ["FC_TEST"],
    outputNumber: 0,
    limit: 0,
    interval: 10,
    output: function(o) {
    }
  }), i = d({
    tCodeList: ["FC_ACCEPT"],
    outputNumber: 0,
    limit: 0,
    interval: 10,
    output: function(o) {
    }
  }), r = d({
    tCodeList: ["TEST_view_updateProps"],
    outputNumber: 0,
    limit: 0,
    interval: 10,
    output: function(o) {
    }
  });
  return {
    status: t[0],
    bypass: {
      close: () => (x(!1), "mqtt旁路已关闭"),
      open: (o) => (x(!0, o), `mqtt旁路已开启,不受影响的主题列表：[${o ? o.join(",") : "无"}]`),
      test: () => (d({
        tCodeList: ["FRE_CLIENT_MQTT_MESSAGE_BYPASS_ON"],
        outputNumber: 1,
        limit: 0,
        interval: 60,
        output: async function(o) {
          g(`${_(/* @__PURE__ */ new Date())}[mqtt]>录制的数据样本:`, o), g(`${_(/* @__PURE__ */ new Date())}[mqtt]>关闭排除的主题.`), w.bypass.open();
          let a = n[0].total;
          g(`${_(/* @__PURE__ */ new Date())}[mqtt]>渲染底数：${n[0].total}`), g(`${_(/* @__PURE__ */ new Date())}[mqtt]>发送测试数据...`);
          let f = o.data, u = f.map((p) => ({ url: p.url, topic: p.topic, msg: JSON.parse(p.msg.toString()) }));
          fetch("https://localhost:6001/api/mqtt/bypass", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(u)
          }).catch(async (p) => ({ msg: "发送测试数据失败", error: p }));
          let c = f.length, s = 200, E = 50, l = await A(f, s, E).catch((p) => ({ msg: "发送测试数据失败", error: p }));
          l.error ? g(`${_(/* @__PURE__ */ new Date())}[mqtt]>${l.msg}`, l.error) : (a = n[0].total - a, g(`${_(/* @__PURE__ */ new Date())}[mqtt]>${l.msg},样本长度:${c},发送条数:${c > 0 ? s : 0},间隔:${c > 0 ? E : 0}ms,渲染次数:${a},桥接:${i[0].total},updateProps:${r[0].total}`), g(w.bypass.open(y)), g(`${_(/* @__PURE__ */ new Date())}[MQTT状态]>map>`, t[0]));
        }
      }), `${_(/* @__PURE__ */ new Date())}[mqtt]>录制数据样本...`),
      get: () => {
        g(`${_(/* @__PURE__ */ new Date())}[mqtt]>关闭排除的主题.`), w.bypass.open(), j(!0);
        const o = d({
          tCodeList: ["TEST_UNKNOWN"],
          outputNumber: 0,
          limit: 20,
          interval: 60 * 60,
          output: function(p) {
          }
        });
        let a = n[0].total, f = o[0].total;
        g(`${_(/* @__PURE__ */ new Date())}[mqtt]>渲染底数,fc:${a},testUnknown:${f}`);
        let u = {}, c = e[0].data;
        for (let p in c)
          for (let T in c[p])
            y.forEach((S) => {
              T.startsWith(S) && (u[S] || (u[S] = []), u[S].push({ fn: c[p][T].message, topic: T }));
            });
        const s = new WebSocket("wss://localhost:6001/dsl.pubsub");
        let E = 10, l = 0;
        return s.onopen = () => {
          g(`${_(/* @__PURE__ */ new Date())}[ws]连接成功`), s.send(JSON.stringify({ limit: E, interval: l, topicList: y }));
        }, s.onmessage = (p) => {
          let { topic: T, msg: S, status: $ } = JSON.parse(p.data);
          if ($)
            return g(`${_(/* @__PURE__ */ new Date())}[mqtt]>设置特征值`, L("TEST_FEATURE_RESOLVER_SET")), g(`${_(/* @__PURE__ */ new Date())}[mqtt]>探测`, L("TEST_UNKNOWN")), g(
              `${_(/* @__PURE__ */ new Date())}[ws]服务端响应：`,
              $,
              `
                              发送条数:${E},
                                  间隔:${l}ms,
                              渲染次数:${n[0].total - a},
                                  桥接:${i[0].total},
                                 testUnknown:${o[0].total - f},                         
                            `
            );
          for (let K in u)
            K === T && (u[T].forEach((q) => q.fn(q.topic, Buffer.from(JSON.stringify(S), "utf-8"), "bypass")), W({ code: "FC_SEND", data: "发送", traceId: "" }));
        }, s.onclose = (p) => {
          g(`${_(/* @__PURE__ */ new Date())}[ws]关闭连接，服务端响应：`, p);
        }, `${_(/* @__PURE__ */ new Date())}[ws]>获取测试数据...`;
      }
    }
  };
}
const y = [
  "/monobj/viewtemplate2/group/fanFarmMainGroupId"
  //'/monobj/viewtemplate2/group/fanFarmOrtherGroupId',
  //'/monobj/viewtemplate2/group/MultiFarmWindTurbineMatrix'
], w = Z();
function tt() {
  return {
    bypass: {
      record: (t) => (d({
        tCodeList: [
          "FRE_CLIENT_RESPONSE_0",
          "FRE_CLIENT_RESPONSE_1",
          "FRE_CLIENT_RESPONSE_2"
        ],
        outputNumber: 0,
        limit: 0,
        interval: 2,
        output: (e) => {
          fetch("https://localhost:6001/api/http/bypass/curator", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
          }).then((n) => ({ msg: "发送测试数据成功", data: n })).catch(async (n) => ({ msg: "发送测试数据失败", error: n }));
        }
      }), `${_(/* @__PURE__ */ new Date())}[http]>录制数据样本...`),
      get: (t) => (j(!0, et), `${_(/* @__PURE__ */ new Date())}[http]>获取数据样本...`)
    }
  };
}
const et = [], rt = tt(), N = {};
let O, k, D = !1, R, P;
function M(...t) {
  console.warn("fre>", ...t);
}
function lt(t, e = 100) {
  const n = "fre", i = {
    exception: {
      start: () => (H(), e > 0 && (R = `${n}/exception.json`, P = e, O = t, ot(), nt()), "异常输出已开启。")
    },
    memory: {
      /**
                   * 调试快照功能，用于调试内存数据
      
                   * @param type 快照类型，'map'|'list'
                   * @param tCode 埋点编号
                   * @param interval 快照间隔时间
                   * @param outputNumber 输出次数，默认为1次，0持续输出
                   * @param limit 限制数量，类型为map时，限制合并深度，类型为list时，限制列表长度
                   * @returns 
                   */
      debug: (r, o, a = 10, f = 1, u = 10) => {
        let c, s = {
          list: (...E) => d({
            tCodeList: o,
            interval: a,
            output: (l) => {
              M(`[${l.code}]>${r}>`, l);
            },
            outputNumber: f,
            limit: u
          }),
          map: (...E) => C({
            tCodeList: o,
            interval: a,
            output: (l) => {
              M(`[${l.code}]>${r}>`, l);
            },
            outputNumber: f,
            limit: u
          })
        };
        if (s[r])
          c = s[r](o, a, f, u);
        else
          return `[${o.join(",")}]>${r}> not support !`;
        return c ? `[${o.join(",")}]>${r}> start at ${_(/* @__PURE__ */ new Date())} ...` : `[${o.join(",")}]>${r}> already existing !`;
      },
      mqtt: w,
      http: rt,
      /**
       * 
       * @param tCode 埋点编码
       * @returns map格式的数据，两级合并，多于两级覆盖
       */
      getMap: (r) => X(r),
      getList: (r) => L(r)
    }
  };
  return M("监控器已开启"), i;
}
let F = 0;
function ot() {
  let t = JSON.parse(localStorage.getItem(R) || "{}");
  for (let e in t)
    N[e] = t[e];
  localStorage.setItem(R, JSON.stringify({ ...N }, null, 4)), v.subscribe(
    "memory",
    "error",
    (e) => {
      F >= P || (N[e.code] && F++, N[e.code] = e, D = !0);
    }
  );
}
function nt() {
  k = setInterval(async () => {
    J();
  }, 1e4);
}
async function J() {
  if (D) {
    try {
      localStorage.setItem(R, JSON.stringify({ ...N }, null, 4)), F = 0, D = !1;
    } catch (t) {
      console.error(`[${O}]写入localstorag失败:${R}`, t);
    }
    try {
      const t = await Y("FRE", "Exception");
      let e = V(t, "Exception", "shop", JSON.stringify({ ...N }));
      await e, e.catch((n) => {
        console.error("妈呀", n);
      });
    } catch (t) {
      console.error(`[${O}]写入IndexDB失败:${R}`, t);
    }
  }
}
function ft() {
  at(), st(), J(), M("客户端监视已关闭");
}
function at() {
  Object.keys(N).forEach((t) => {
    delete N[t];
  }), v.unsubscribe("memory", "error");
}
function st() {
  clearInterval(k);
}
export {
  lt as startClientMonitor,
  ft as stopClientMonitor
};
