
export default {
 name: 'HighlightText',
  state: {
    originalText: '', // 需要处理的文本
    textMinLenth: 2, // 最小词长度
    lineCount: 0, // 行数
    symbolCount: 0, // 符号数
    charCount: 0, // 字符数
    duplicated: [] // 重复的单词
  },
  computed: {
    itemWordText: scope => scope.item.text, // 重复单项文本
    itemBackgroundColor: scope => scope.item.style.backgroundColor // 单项背景颜色
  },

  watch: {
    originalText () {
      this.extractText()
    },
    textMinLenth () {
      this.extractText()
    }
  },

  actions: {
    setWordExclude (payload) { // 排除词
      if (this.wordExcludes.indexOf(payload.item.text) > -1) {
        this.wordExcludes.push(payload.item.text)
      } else {
        this.wordExcludes = this.wordExcludes.filter(text => text !== payload.item.text)
      }
    },
   extractText() {
      // 重置状态
      this.state.duplicated = []
      
      // 统计换行符数量
      const lineCount = (this.state.originalText.match(/\n/g) || []).length
      
      // 统计符号数量（非字母、数字、中文、空格和换行符）
      const symbolCount = (this.state.originalText.match(/[^a-zA-Z0-9\u4e00-\u9fa5\s\n]/g) || []).length
      
      // 统计字符总数（包括空格和换行符）
      const charCount = this.state.originalText.length
      
      // 更新统计信息
      this.state.lineCount = lineCount
      this.state.symbolCount = symbolCount
      this.state.charCount = charCount
      
      // 预处理：将中文标点替换为空格
      const punctuationRegex = /[\u3000-\u303F\uFF00-\uFF60\uff0c\uff1a\uff1b\uff01\uff1f\uff0e]/g
      const processedText = this.state.originalText.replace(punctuationRegex, ' ')
      
      // 提取所有可能的子串并统计频率
      const substrCount = {}
      const minLength = Math.max(2, this.state.textMinLenth) // 确保最小长度至少为2
      
      // 按空格分割文本为单词数组
      const words = processedText.split(/\s+/)
      
      // 对每个单词使用滑动窗口提取所有可能的子串
      words.forEach(word => {
        if (!word) return // 跳过空单词
        
        // 提取所有长度 >= minLength 的子串
        for (let i = 0; i < word.length; i++) {
          for (let j = i + minLength; j <= word.length; j++) {
            const substr = word.substring(i, j)
            substrCount[substr] = (substrCount[substr] || 0) + 1
          }
        }
      })
      
      // 找出重复的子串（出现次数 > 1），按长度降序排列
      const duplicatedSubstrs = Object.entries(substrCount)
        .filter(([substr, count]) => count > 1)
        .sort((a, b) => b[0].length - a[0].length)
      
      // 筛选最终结果，避免重叠
      const filteredSubstrs = []
      duplicatedSubstrs.forEach(([substr, count]) => {
        // 检查是否已被更长的子串包含
        if (!filteredSubstrs.some(s => s.includes(substr) && s !== substr)) {
          filteredSubstrs.push(substr)
        }
      })
      
      // 为每个重复的子串分配不同的高亮颜色
     const colorVariations = [
        '#F53F3F', // semi-red-6
        '#EB2F96', // semi-pink-6
        '#722ED1', // semi-purple-6
        '#5B32C9', // semi-violet-6
        '#2F54EB', // semi-indigo-6
        '#1890FF', // semi-blue-6
        '#0FC6C2', // semi-light-blue-6
        '#00B42A', // semi-green-6
        '#7CB305', // semi-lime-6
        '#FACC14', // semi-yellow-6
        '#FF7D00' // semi-orange-6
      ]    
      
      // 为每个重复的子串创建对象，包含text和style属性
      this.state.duplicated = filteredSubstrs.map((substr, index) => ({
        text: substr,
        style: {
          backgroundColor: colorVariations[index % colorVariations.length],
          color: '#fff',
          padding: 4
        }
      }))
    }
    
  }
}
