export default {
  name: 'NumberGuess',
  state: {
    secret: '', // 随机生成的四位数密码
    input: '', // 当前输入
    attempts: [], // 历史猜测记录
    remainingAttempts: 5, // 剩余尝试次数
    gameOver: false, // 游戏是否结束
    success: false, // 是否成功
    startTime: null, // 游戏开始时间
    endTime: null, // 游戏结束时间
    timer: null // 计时器
  },
  actions: {
    // 初始化游戏
    initGame () {
      this.state.secret = this.generateSecret()
      this.state.input = ''
      this.state.attempts = []
      this.state.remainingAttempts = 5
      this.state.gameOver = false
      this.state.success = false
      this.state.startTime = new Date()
      this.state.timer = setInterval(() => {
        this.state.currentTime = new Date()
      }, 1000)
    },

    // 生成随机四位数密码
    generateSecret () {
      const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let secret = ''
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length)
        secret += digits[randomIndex]
        digits.splice(randomIndex, 1)
      }
      return secret
    },

    // 按钮点击处理
    onBtnPress (value) {
      if (this.state.gameOver) return

      if (value === 'back') {
        // 回退按钮
        this.state.input = this.state.input.slice(0, -1)
      } else if (value === 'unlock') {
        // 解锁按钮
        if (this.state.input.length === 4) {
          this.checkGuess(this.state.input)
          this.state.input = ''
        }
      } else {
        // 数字按钮
        if (this.state.input.length < 4 && !this.state.input.includes(value)) {
          this.state.input += value
        }
      }
    },

    // 检查猜测结果
    checkGuess (guess) {
      const result = this.analyzeGuess(guess)
      this.state.attempts.push({ guess, result })
      this.state.remainingAttempts--

      if (result.every(item => item.type === 'correct')) {
        // 猜对了
        this.state.success = true
        this.endGame()
      } else if (this.state.remainingAttempts === 0) {
        // 尝试次数用完
        this.endGame()
      }
    },

    // 分析猜测结果
    analyzeGuess (guess) {
      const result = []
      const secretChars = this.state.secret.split('')

      for (let i = 0; i < guess.length; i++) {
        const char = guess[i]
        if (secretChars[i] === char) {
          result.push({ digit: char, type: 'correct' })
        } else if (secretChars.includes(char)) {
          result.push({ digit: char, type: 'exists' })
        } else {
          result.push({ digit: char, type: 'absent' })
        }
      }

      return result
    },

    // 结束游戏
    endGame () {
      this.state.gameOver = true
      this.state.endTime = new Date()
      clearInterval(this.state.timer)
    }
  }
}
