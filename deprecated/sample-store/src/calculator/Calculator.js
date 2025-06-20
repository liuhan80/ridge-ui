const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

export default {
  state: () => {
    return {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    }
  },

  computed: {
  },

  async setup () {
    // document.addEventListener('keydown', this.handleKeyDown)
  },

  exit () {
    // document.removeEventListener('keydown', this.handleKeyDown)
  },
  watch: {
  },

  actions: {
    clearAll () {
      this.setState({
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
      })
    },

    inputDigit (digit) {
      const { displayValue, waitingForOperand } = this.state

      if (waitingForOperand) {
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else {
        this.setState({
          displayValue: displayValue === '0' ? String(digit) : displayValue + digit
        })
      }
    },

    clearDisplay () {
      this.setState({
        displayValue: '0'
      })
    },

    clearLastChar () {
      const { displayValue } = this.state

      this.setState({
        displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
      })
    },

    handleKeyDown (event) {
      let { key } = event

      if (key === 'Enter') { key = '=' }

      if ((/\d/).test(key)) {
        event.preventDefault()
        this.inputDigit(parseInt(key, 10))
      } else if (key in CalculatorOperations) {
        event.preventDefault()
        this.performOperation(key)
      } else if (key === '.') {
        event.preventDefault()
        this.inputDot()
      } else if (key === '%') {
        event.preventDefault()
        this.inputPercent()
      } else if (key === 'Backspace') {
        event.preventDefault()
        this.clearLastChar()
      } else if (key === 'Clear') {
        event.preventDefault()

        if (this.state.displayValue !== '0') {
          this.clearDisplay()
        } else {
          this.clearAll()
        }
      }
    },

    toggleSign () {
      const { displayValue } = this.state
      const newValue = parseFloat(displayValue) * -1

      this.setState({
        displayValue: String(newValue)
      })
    },

    inputPercent () {
      const { displayValue } = this.state
      const currentValue = parseFloat(displayValue)

      if (currentValue === 0) { return }

      const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
      const newValue = parseFloat(displayValue) / 100

      this.setState({
        displayValue: String(newValue.toFixed(fixedDigits.length + 2))
      })
    },

    inputDot () {
      const { displayValue } = this.state

      if (!(/\./).test(displayValue)) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    },

    performOperation (nextOperator) {
      const { value, displayValue, operator } = this.state
      const inputValue = parseFloat(displayValue)

      if (value == null) {
        this.setState({
          value: inputValue
        })
      } else if (operator) {
        const currentValue = value || 0
        const newValue = CalculatorOperations[operator](currentValue, inputValue)

        this.setState({
          value: newValue,
          displayValue: String(newValue)
        })
      }

      this.setState({
        waitingForOperand: true,
        operator: nextOperator
      })
    }
  }
}
