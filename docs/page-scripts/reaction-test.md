## 简介
大家好，欢迎学习ridgeui页面脚本开发系列:反应速度测试页面脚本开发
反应速度测试是个很简单的应用，开始时显示红色屏幕内容，当变为绿色时，用户以最快速度点击页面，进而测算出反应时间。 
## 应用的分析
虽然应用简单，但是从界面角度看，应用有5个不同的页面。 分别是启动说明页、红色等待、绿色点击、反应结果页、提前点击结果页。  页面脚本除了要进行反应时间的计时，还需要调度安排何时显示哪个页面。 

为此我们首先创建这样的程序结构

```javascript
export default {
  name: 'Reaction',
  state: {
    currentScene: 'start', //当前页面 start/red/green/error/result
    currentMill: 0, // 当前响应时间
    averangeMill: 0, // 平均时间
    recentMills: [] // 最近测试
  }
}
```

程序定义了当前页面状态，取值为 start、red、green、error、result 分别表示5个页面
另外还有当前响应时间、平均时间、最近测试等状态。

## 动作
接下来是启动测试方法， 在start和error、result页面点击都会触发这个动作。
```javascript
startTest() {
      this.currentScene = 'red'

      setTimeout(() => {
        if (this.currentScene === 'error') {
          return
        }
        this.currentScene = 'green'
        requestAnimationFrame(() => {
          this._startMill = new Date().getTime()
        })
      }, 2000 + Math.random() * 2000)
 }
```
方法的基本逻辑是设置当前场景为红色页，并且延时一个随机的时间后，将当前场景改为绿色，同时开始计时。
值得注意的是，计时是使用requestAnimationFrame方式。
因为当设置场景时，页面实际还没有绘制和更新，这个方法可以在页面下次重绘时才调用。 这就最大限度地提高了数据准确性。

实际测试也验证了，这个前后相差时间有10毫秒左右。

下面时点击红色页面方法： 点击红色页说明还没开始计时，这时属于错误点击，处理改变场景为error之外，需要将之前地延时清除掉
```javascript
 clickOnRed() {
      this.currentScene = 'error'
      clearTimeout(this.timeout)
}
```

而绿色界面点击处理如下：
```javascript
clickOnGreen() {
   this.currentScene = 'result'
   this.currentMill = new Date().getTime() - this._startMill
      
   insertNumber(this.recentMills, this.currentMill)
   this.rank = getRankText(this.currentMill) + ''      
}
```

绿色界面就时结束计时，算出反应时间。 同时为了数据更形象，将数据放入最近20次列表，并给出当前响应等级。
需要额外说明的是，这个动作应该使用“鼠标按下“事件去触发，而不是”点击“事件。 因为后者是鼠标按下+鼠标抬起完成的整个过程。 在一个毫秒级的过程中，这个时间不可忽略

一般来说，人地简单反应（如对单一视觉或听觉刺激做出反应）的下限接近 100 - 200 毫秒。所以响应时间能低于200毫秒是非常快的反应。 我们用 200  300 400 600为界限，分别给出 1-5的评价

 1. 顶级大神：您的响应速度可以从事射击、RTS等动作类游戏，具有职业天分
 2. 高手：业余玩家中的高手，但是如果要从事职业玩家还需要更多的训练
 3. 普通：马马虎虎可以业余娱乐的水平
 4. 较差：老老实实去玩单机版游戏，例如植物大战僵尸等。
 5. 很差：你先别想着打游戏，如果是认真的，你或者电脑总有一个有问题
 
## 总结
我们完成了页面主体脚本，只有30行，可以说很简单，但我们还是要注意以下2点：
1、定义不同的场景，通过用户点击或者自动计时等方式，进行场景间切换
2、关注页面要求，对于计时要求很严格的情况，尽量减少所有其他环节的干扰

最后附上完整代码。同时大家也可以欢迎关注页面的制作过程
## 附完整代码

```javascript
function insertNumber(arr, num) {
  let index = arr.indexOf(0)
  if (index !== -1) {
      arr[index] = num
  } else {
      arr.shift()
      arr.push(num)
  }
  return arr
}

function getRankText(mill) {
  if (mill < 200) {
    return 5
  }
  if (mill < 300) {
    return 4
  }
  if (mill < 400) {
    return 3
  }
  if (mill < 500) {
    return 2
  }
  return 1
}


export default {
  name: 'Reaction',
  state: {
    currentScene: 'start', //当前页面 start/red/green/error/result
    currentMill: 0, // 当前响应时间
    averangeMill: 0, // 平均时间
    rank: 0, // 等级
    recentMills: new Array(20).fill(0) // 最近测试
  },
  actions: {
    startTest() {
      this.currentScene = 'red'

      this.timeout = setTimeout(() => {
        this.currentScene = 'green'
        requestAnimationFrame(() => {
          this._startMill = new Date().getTime()
        })
      }, 2000 + Math.random() * 2000)
    },

    clickOnRed() {
      this.currentScene = 'error'
      clearTimeout(this.timeout)
    },

    clickOnGreen() {
      this.currentScene = 'result'
      this.currentMill = new Date().getTime() - this._startMill
      insertNumber(this.recentMills, this.currentMill)
      this.rank = getRankText(this.currentMill) + ''
    }
  }
}


```