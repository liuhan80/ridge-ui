var g = Object.defineProperty;
var w = (t, e, s) => e in t ? g(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var o = (t, e, s) => w(t, typeof e != "symbol" ? e + "" : e, s);
import { C as b } from "./exception-VDL0KR5O.mjs";
class T {
  constructor() {
    o(this, "startTime");
    this.startTime = performance.now();
  }
  getTimestamp() {
    return (performance.now() - this.startTime) * 1e3;
  }
}
class y {
  constructor() {
    o(this, "startTime");
    this.startTime = process.hrtime.bigint();
  }
  getTimestamp() {
    const s = process.hrtime.bigint() - this.startTime;
    return Number(s / BigInt(1e3));
  }
}
let i;
if (typeof performance < "u" && typeof performance.now == "function")
  i = new T();
else if (typeof process < "u" && typeof process.hrtime == "function")
  i = new y();
else
  throw new Error("Unsupported environment");
function M() {
  return i.getTimestamp();
}
class R {
  constructor(e, s, a) {
    o(this, "contractManager");
    this.contractManager = new b("TRACE", e, s, a), this.contractManager.registerPublisher({ pcode: "FRE", name: "前端运行环境" });
  }
  /**
   * 记录调试信息
   *
   * @param er 调试信息
   */
  record(e) {
    let s = {
      pcode: "FRE",
      topic: "debug",
      data: { ...e, time: M() },
      traceId: e.traceId
    };
    this.contractManager.publish(s);
  }
  /**
   * 订阅消息
   *
   * @param subscriberCode 订阅者代码
   * @param topic 消息主题，可选值为 'debug'
   * @param handler 消息处理函数，接收消息数据作为参数
   */
  subscribe(e, s, a) {
    this.contractManager.subscribe({ pcode: "FRE", scode: e, allow: !1, smp: { code: s }, handler: a });
  }
  /**
   * 取消订阅消息
   *
   * @param subscriberCode 订阅者编码
   * @param topic 主题，可选值为 'debug''
   */
  unsubscribe(e, s) {
    this.contractManager.unsubscribe({ pcode: "FRE", scode: e, allow: !1, smp: { code: s }, handler: () => {
    } });
  }
}
const B = new R(10, 10, 30);
function I(t) {
  return B.record(t);
}
let u = !1, c;
function C(t, e) {
  u = t, e ? c = e : c = void 0;
}
function F(t) {
  return t && c ? !c.some((e) => t.startsWith(e)) : u;
}
function G(t, e = 100, s = 100) {
  return new Promise((p, h) => {
    t.length === 0 && p({ msg: "数据为空" });
    let l = 0, r = 0, m = setInterval(() => {
      if (l < e) {
        try {
          t[r].handler(t[r].topic, t[r].msg, "bypass"), I({ code: "FC_SEND", data: "发送", traceId: "" });
        } catch (f) {
          clearInterval(m), h(f);
        }
        l++, r < t.length - 1 ? r++ : r = 0;
      } else
        clearInterval(m), p({ msg: "数据发送完成" });
    }, s);
  });
}
let d = !1, n;
function H(t, e) {
  d = t, e ? n = e : n = void 0;
}
function E(t) {
  return t && n && n.length > 0 ? !n.some((e) => t.startsWith(e)) : d;
}
function N(t, e) {
  E(e.url) && (e.cmd = "bypass", e.baseURL = "https://localhost:6001", e.url = `/api/http/bypass/provider?url=${encodeURIComponent(e.url)}&code=${t}`);
}
export {
  B as T,
  E as a,
  M as b,
  N as c,
  G as d,
  C as e,
  F as g,
  H as s,
  I as t
};
