import { E as c } from "./exception-VDL0KR5O.mjs";
import o from "chalk";
import y from "readline";
import * as a from "fs";
import * as d from "path";
const h = (e) => ({
  info: (r) => {
    s(o.rgb(79, 193, 255)(`[${e}]`), r);
  },
  error: (r) => {
    s(o.red(`[${e}]:exception>`), r);
  },
  warn: (r) => {
    s(o.yellow(`[${e}]`), r);
  },
  ITracking: (r) => {
    s(o.rgb(255, 193, 255)(`[${e}]`), r);
  }
});
function s(e, r) {
  console.log(e, o.grey((/* @__PURE__ */ new Date()).toISOString())), console.error(r);
}
let p;
function w() {
  c.subscribe(
    "console",
    "error",
    (e) => {
      p.error(e);
    }
  );
}
function g() {
  c.unsubscribe("console", "error");
}
const t = {};
let f, l = !1, u;
function k() {
  c.subscribe(
    "memory",
    "error",
    (e) => {
      t[e.code] = e, l = !0;
    }
  );
}
function $() {
  c.unsubscribe("memory", "error");
}
function x() {
  f = setInterval(async () => {
    m();
  }, 1e4);
}
function v() {
  clearInterval(f);
}
async function m() {
  if (!l) return;
  const e = `${u}/exception.json`, r = d.dirname(e);
  try {
    await a.promises.mkdir(r, { recursive: !0 });
    const n = { ...t };
    await a.promises.writeFile(e, JSON.stringify(n, null, 4), "utf8"), l = !1;
  } catch (n) {
    console.error("文件操作失败:", n);
  }
}
function S(e, r) {
  if (u = r, k(), x(), !process.stdin.isTTY) return;
  const n = y.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "fre>"
  });
  n.prompt(), n.on("line", (b) => {
    const i = b.trim();
    switch (i) {
      case "startException":
        w(), console.log(o.green("异常信息屏幕输出已开启"));
        break;
      case "stopException":
        g(), console.log(o.green("异常信息屏幕输出已关闭"));
        break;
      case "shopException":
        console.log(o.grey("snapshot start:----------------------------------------------------------------------------------")), console.log(t), console.log(o.gray("snapshot end----------------------------------------------------------------------------------"));
        break;
      case "":
        break;
      default:
        console.log(o.yellow(`未知命令: ${i}`));
        break;
    }
    n.prompt();
  }), p = h(e), console.log(o.green(`[${e}]异常监视已启动`)), console.log(o.green("[")), console.log(o.green("  可通过以下命令控制：")), console.log(o.rgb(79, 193, 255)("    start: 开启异常信息的屏幕输出")), console.log(o.rgb(79, 193, 255)("    stop: 关闭异常信息的屏幕输出")), console.log(o.rgb(79, 193, 255)("    shop: 屏幕输出：所有异常最近一次产生的实例信息")), console.log(o.green(`  快照文件: ${r}/exception.json`)), console.log(o.grey("      注：如果有变化，快照文件每10秒更新一次，服务退出前会主动写入快照文件")), console.log(o.green("]"));
}
function j() {
  g(), $(), v(), m(), Object.keys(t).forEach((e) => {
    delete t[e];
  }), console.log(o.green("服务监视已关闭"));
}
export {
  S as startServiceMonitor,
  j as stopServiceMonitor
};
