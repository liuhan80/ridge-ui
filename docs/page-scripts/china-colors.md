# RidgeUI页面脚本开发系列:获取照片中的中国诗词


## 初始想法

色彩，是经由眼、脑以及我们的生活经验，对光产生的一种视觉效应。在不同领域，对色彩有着不同的具体描述方式。比如在显示设备或软件中，采用的是 RGB 色彩空间。它基于红、绿、蓝三种原色光，通过不同强度的组合，变幻出各式各样的颜色。而对于人眼而言，HSV 色彩空间更为友好，它通过色相、饱和度、亮度来描绘色彩。​
在 html 页面里，css 定义颜色，除了采用 rgb 方式，还通过标准声明了 100 多个英文形式的颜色关键词，像 deepskyblue（深天蓝）、purple（紫色）、whitesmoke（白烟）等。只要把这些英文命名应用到颜色设置中，就能正常显示。​
中国文化历史悠久，孕育出诸多独特的颜色，例如香叶红、蔚蓝、荷叶绿等。然而，这些颜色并没有直接与 rgb 标准颜色相对应。幸运的是，经过多个出版文献的总结，如今我们能获取到 500 多种中国色名及其对应的色彩空间色值。许多中国色背后，都关联着优美的诗词。要是从图片中提取出主要颜色，再依据中国颜色名称找到相应的古诗词，就能达成 “照片中的中国诗词效果” 。


## 需求分析

若要实现 “照片中的中国诗词效果”，首先得获取图片中的颜色。有一些第三方库可提供支持，其算法原理大致是：获取图片中所有颜色（依据图片分辨率，最终获取每个像素的颜色），接着在色彩空间中按照色彩相近性进行分组，随后取分组中平均或出现次数最多的颜色，最终返回该图片的一个颜色列表。​
获取到颜色列表后，按照颜色距离优先原则，将其转换为中国色，再依据中国色，查找出与之对应的中国古诗词

## 基础实现

在进行图像处理时，为了从图片中提取颜色并匹配对应的中国色及相关古诗词，我们将采用以下方案。

### 颜色提取模块选择
我们选用 extract-colors 模块来完成颜色提取任务。该模块使用便捷，以下是其基本用法示例：

```javascript
import { extractColors } from "extract-colors";

const src = "my-image.jpg";

extractColors(src).then(console.log).catch(console.error);
```

### 中国色与古诗词数据准备

我们准备了一系列中国色及其对应的古诗词数据，示例如下：

```javascript

 const CHINA_POEMS = [ {
    color: '#faff72',
    name: '鸭黄',
    poem: '短鬓惭鸥白，圆沙聚鸭黄',
    author: '清・晓青',
    title: '过尹山访王咸中'
  },
  {
    color: '#ffa631',
    name: '杏黄',
    poem: '杏子黄时麦已收，槐阴重叠柳条柔',
    author: '宋・曹勋',
    title: '山中'
  },
  {
    color: '#ff8c31',
    name: '杏红',
    poem: '绿杨烟外晓寒轻，红杏枝头春意闹',
    author: '宋・宋祁',
    title: '玉楼春・春景'
  },
  {
    color: '#ff8936',
    name: '橘黄',
    poem: '一年好景君须记，最是橙黄橘绿时',
    author: '宋・苏轼',
    title: '赠刘景文'
  },
  ......
  ]
```

这个数组开源在 [china-color-names](https://www.npmjs.com/package/china-color-names)

### 颜色匹配策略

由于从图片中提取的颜色不一定能与预定义的中国色完全对应，我们将通过计算颜色相近度的方法来确定颜色距离，进而选取最接近的颜色。


要计算两个颜色之间的相近度，通常会将十六进制颜色码转换为 RGB 值，然后使用欧几里得距离来计算颜色之间的距离。以下是一个实现该功能的 JavaScript 方法：
```javascript
function colorDistanceRGB (color1, color2) {
  // 提取 RGB 值
  const r1 = parseInt(color1.slice(1, 3), 16)
  const g1 = parseInt(color1.slice(3, 5), 16)
  const b1 = parseInt(color1.slice(5, 7), 16)
  const r2 = parseInt(color2.slice(1, 3), 16)
  const g2 = parseInt(color2.slice(3, 5), 16)
  const b2 = parseInt(color2.slice(5, 7), 16)
  // 计算欧几里得距离
  const distance = Math.sqrt(
    Math.pow(r1 - r2, 2) +
      Math.pow(g1 - g2, 2) +
      Math.pow(b1 - b2, 2)
  )
  return distance
}
```

### 完整方法实现
以下是完整的 getColorPoems 方法，用于获取图片中颜色对应的中国诗词信息：

```javascript

// 获取照片的中国诗词
const getColorPoems = async (img) => {
  try {
    // 调用 extractColors 函数从图片中提取颜色数据
    const data = await extractColors(img);

    // 使用 map 方法遍历提取的颜色数据
    const colorList = data.map((col) => {
      // 初始化最小颜色距离为 Infinity
      let minVal = Infinity;
      // 初始化最接近的颜色信息为 null
      let nearCol = null;

      // 遍历预定义的中国诗词颜色数据
      for (const color of CHINA_POEMS) {
        // 计算当前提取颜色和预定义颜色之间的距离
        const val = colorDistanceRGB(col.hex, color.color);
        // 如果当前计算的距离小于最小距离
        if (val < minVal) {
          // 更新最小距离
          minVal = val;
          // 复制预定义颜色信息，并添加提取颜色的面积信息
          nearCol = { ...color, area: col.area };
        }
      }

      return nearCol;
    });

    // 返回包含最接近颜色信息的数组
    return colorList;
  } catch (error) {
    // 捕获并抛出错误
    throw new Error(`Error getting color poems: ${error.message}`);
  }
};

```


## Ridge页面脚本编写

基础算法准备好后, 我们先创建一个页面脚本
```javascript
export default {
  name: 'PhotoPoems',
  externals: [
    '/china-color-names/dist/extract-colors.js' // 封装上述获取照片的中国诗词方法
  ],
  state: {
    colorList: [], // 颜色列表
    fileUrl: '/npm/photo-china-poems/sample.jpg', // 选取的图片
    currentColor: {  // 当前颜色信息
        color: '',
        poem: '',
        author: '',
        title: ''
    }
  },

  async setup() {
    if (this.fileUrl) {
      this.fileChanged(this.fileUrl)
    }
  },

  actions: {
    async fileChanged(url) { // 文件选中
      this.colorList = await getColorPoems(url)
      this.currentColor = this.colorList[0]
    }
 }
}
 
```
上述脚本逻辑很简单, 声明了颜色列表\图片和当前的颜色信息,  当图片改变时,上述信息直接更新.因为图片中有多个色彩, 所以我们默认选择第一个. 

接下来, 我们要将所有颜色都展示出来,以便用户点击以更新. 

```javascript
export default {
  name: 'PhotoPoems',
    ...

  computed: {
    tagColorName: scope => scope.item.name, // 单项颜色名称,
    tagColorValue: scope => scope.item.color, // 单项颜色值
    tagTextColor: scope => getContrastTextColor(scope.item.color) // 单项颜色的对比色
  },

  actions: {
    toggleColor(scope) { // 点击单项切换颜色及对应信息
      this.currentColor = scope.item  
    }
  }
}
```

好了现在整个脚本准备完成, 后面,我们将根据这个脚本去实际设计页面


## 总结
本文聚焦于 RidgeUI 页面脚本开发中 “获取照片中的中国诗词” 功能的实现。从初始想法出发，阐述利用色彩空间知识，通过提取图片主要颜色并匹配中国色及古诗词以达 “照片中的中国诗词效果” 的构思。经需求分析，确定了先获取图片颜色、再转换为中国色并查找对应古诗词的流程。介绍了基础实现部分，包括颜色提取模块选择、数据准备、颜色匹配策略及完整方法实现。最后展示了 Ridge 页面脚本编写过程，为后续页面设计奠定基础。

最后 访问 [ https://ridgeui.com/](https://ridgeui.com/#/pages/repo) 可以查看到这个应用,

访问这个地址 https://ridgeui.com/npm/ridge-editor/?import=photo-china-poems 可以打开编辑应用,包含代码和页面配置
