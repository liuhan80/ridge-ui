var h = Object.defineProperty;
var a = (i, s, e) => s in i ? h(i, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[s] = e;
var o = (i, s, e) => a(i, typeof s != "symbol" ? s + "" : s, e);
import { nanoid as b } from "nanoid";
const u = class u {
  /**
   * @param instanceCode 合约管理器实例Code
   * @param topicLimit 主题数量限制
   * @param publisherLimit 发布者数量限制
   * @param subscriberLimit 订阅者数量限制
   */
  constructor(s, e, t, n) {
    o(this, "instanceCode");
    o(this, "topicLimit", 0);
    o(this, "publisherLimit", 0);
    o(this, "subscriberLimit", 0);
    /**主题计数 */
    o(this, "topicCount", 0);
    /**订阅者计数 */
    o(this, "subscriberCount", 0);
    /**发布者计数 */
    o(this, "publisherCount", 0);
    /**连接索引*/
    o(this, "connections");
    /**发布者索引 */
    o(this, "publishers", {});
    this.instanceCode = s, this.topicLimit = e, this.publisherLimit = t, this.subscriberLimit = n, u.Instances[this.instanceCode] = { tc: 0, sc: 0, pc: 0 }, this.connections = { ins: s, c: 0, ps: {} };
  }
  /**
   * 统计
   * @param c 统计项
   */
  setCount(s, e) {
    u.Instances[this.instanceCode][s] += e || 1;
  }
  /**
   * 注册发布者
   * @param p 发布者
   * @returns 注册结果
   */
  registerPublisher(s) {
    return this.publishers[s.pcode] ? (console.error("fre> 注册发布者失败，发布者编码重复,管理器:", this.instanceCode, s), !1) : (this.publishers[s.pcode] = s.name, !0);
  }
  /**
   * 根据发布者Code获取主题
   * @param p 发布者编码
   * @returns 主题索引
   */
  getTopics(s) {
    return this.connections.ps[s].ts;
  }
  /**
   * 协商topic
   * @param p 邀约<交付物类型>
   * @returns 合约
   */
  consultTopic(s) {
    let e = "";
    return typeof s.smp == "string" ? e = s.smp : e = s.smp.code, e;
  }
  /**
   * 订阅 
   * @param p 邀约<交付物类型>
   * @returns 合约
   */
  subscribe(s) {
    let e = this.consultTopic(s), t = this.connections;
    if (!t.ps[s.pcode]) {
      if (this.publisherCount >= this.publisherLimit)
        return console.error(`fre> 发布者数量超出了${this.publisherLimit}的限额,如果这是合理的,请修改限制参数`, { insId: this.instanceCode, pcode: s.pcode }), null;
      t.ps[s.pcode] = { c: 0, ts: {} }, t.c++, this.publisherCount++, this.setCount("pc");
    }
    if (!t.ps[s.pcode].ts[e]) {
      if (this.topicCount >= this.topicLimit)
        return console.error(`fre> 主题数量超出了${this.topicLimit}的限额,如果这是合理的,请修改限制参数`, { insId: this.instanceCode, topic: e }), null;
      t.ps[s.pcode].ts[e] = { c: 0, ss: {} }, t.ps[s.pcode].c++, this.topicCount++, this.setCount("tc");
    }
    if (t.ps[s.pcode].ts[e].ss[s.scode])
      t.ps[s.pcode].ts[e].ss[s.scode].i = s, t.ps[s.pcode].ts[e].ss[s.scode].i.allow || console.warn(`fre> 重复的订阅动作,如果这是合理的,请修改邀约中的allow=true或注意观察,管理器ID:${this.instanceCode},订阅者：${s.scode},主题：${e}`);
    else {
      if (this.subscriberCount >= this.subscriberLimit)
        return console.error(`fre> 订阅者数量超出了${this.subscriberLimit}的限额,如果这是合理的,请修改限制参数`, { insId: this.instanceCode, scode: s.scode }), null;
      t.ps[s.pcode].ts[e].ss[s.scode] = { e: 0, i: s }, t.ps[s.pcode].ts[e].c++, this.subscriberCount++, this.setCount("sc");
    }
    return { topic: e };
  }
  /**
   * 取消订阅
   *
   * @param p 要取消订阅的邀请对象
   */
  unsubscribe(s) {
    let e = this.consultTopic(s), t = this.connections, n = s.scode;
    for (let c in t.ps) {
      if (!(t.ps[c].ts && t.ps[c].ts[e] && t.ps[c].ts[e].ss))
        continue;
      let r = t.ps[c].ts[e].ss;
      delete r[n], t.ps[c].ts[e].c--, this.subscriberCount--, this.setCount("sc", -1), t.ps[c].ts[e].c === 0 && (delete t.ps[c].ts[e], t.ps[c].c--, this.topicCount--, this.setCount("tc", -1), t.ps[c].c === 0 && (delete t.ps[c], t.c--, this.publisherCount--, this.setCount("pc", -1)));
    }
  }
  /**
   * 发布
   * @param p 发布物<交付物类型>
   */
  publish(s) {
    if (!this.publishers[s.pcode])
      return console.error("fre> 发布错误,发布者未注册", this.instanceCode, s), !1;
    let e = this.connections;
    if (e.ps[s.pcode] && e.ps[s.pcode].ts[s.topic]) {
      let t = e.ps[s.pcode].ts[s.topic].ss, n = Object.keys(t);
      for (let c of n) {
        let r = t[c];
        if (!r || !r.i || typeof r.i.handler != "function") {
          console.error("fre> 订阅者处理函数不存在或无效", this.instanceCode, c);
          continue;
        }
        try {
          r.i.handler(s.data, s.traceId);
        } catch (l) {
          r.e++, console.error(`fre> 执行合约异常,合约管理器:${this.instanceCode},订阅者编码:${c}`, this.instanceCode, l);
        }
        (r.i.allow || r.e > 1) && (delete t[c], e.ps[s.pcode].ts[s.topic].c--, this.subscriberCount--, this.setCount("sc", -1), e.ps[s.pcode].ts[s.topic].c === 0 && (delete e.ps[s.pcode].ts[s.topic], e.ps[s.pcode].c--, this.topicCount--, this.setCount("tc", -1), e.ps[s.pcode].c === 0 && (delete e.ps[s.pcode], e.c--, this.publisherCount--, this.setCount("pc", -1))));
      }
    }
  }
};
/**监视 */
o(u, "Instances", {});
let p = u;
class f {
  constructor(s, e, t) {
    o(this, "contractManager");
    this.contractManager = new p("Exception", s, e, t), this.contractManager.registerPublisher({ pcode: "System", name: "异常管理" });
  }
  /**
   * 记录异常信息
   *
   * @param er 异常信息
   */
  record(s) {
    let e = {
      pcode: "System",
      topic: "error",
      data: { ...s, id: b(), time: Date.now() },
      traceId: s.traceId
    };
    this.contractManager.publish(e);
  }
  /**
   * 订阅消息
   *
   * @param subscriberCode 订阅者代码
   * @param topic 消息主题，可选值为 'error'
   * @param handler 消息处理函数，接收消息数据作为参数
   */
  subscribe(s, e, t) {
    this.contractManager.subscribe({ pcode: "System", scode: s, allow: !1, smp: { code: e }, handler: t });
  }
  /**
   * 取消订阅消息
   *
   * @param subscriberCode 订阅者编码
   * @param topic 主题，可选值为 'error''
   */
  unsubscribe(s, e) {
    this.contractManager.unsubscribe({ pcode: "System", scode: s, allow: !1, smp: { code: e }, handler: () => {
    } });
  }
}
const d = new f(1, 1, 3);
function w() {
  window.onerror = function(i, s, e, t, n) {
    return d.record({
      brief: "未处理的异常",
      code: "FRE_BROWSER_ERROR",
      error: n,
      context: { message: typeof i == "string" ? i : "event", source: s, lineno: e, colno: t },
      traceId: ""
    }), !0;
  }, window.addEventListener("unhandledrejection", (i) => {
    d.record({
      brief: "未处理的Promise异常",
      code: "FRE_BROWSER_REJECTION",
      error: i.reason,
      context: { timeStamp: i.timeStamp, type: i.type },
      traceId: ""
    }), i.preventDefault();
  }), d.subscribe("console", "error", (i) => {
    console.error("fre>", i);
  });
}
export {
  p as C,
  d as E,
  w as o
};
