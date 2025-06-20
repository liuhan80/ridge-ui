export default class Audio {
  constructor (props) {
    this.props = props
  }

  mount (el) {
    this.el = el
    this.styleEl = document.createElement('style');
    this.styleEl.type = 'text/css';  
    document.head.appendChild(this.styleEl);  
    this.render()
  }

  render () {
    this.height = this.el.getBoundingClientRect().height
    const { color, percent = 15 } = this.props
    this.styleEl.innerHTML = `
        .awe-wave {
            border-radius: 1000% 1000% 0 0;
            position: absolute;
            width: 200%;
            animation: wave 10s -3s linear infinite;
            transform: translate3d(0, 0, 0);
            opacity: 0.8;
            bottom: 0;
            left: 0;
            z-index: -1;
        }
                
        .awe-wave:nth-of-type(2) {
            bottom: -1.25em;
            animation: wave 18s linear reverse infinite;
            opacity: 0.8;
        }

        .awe-wave:nth-of-type(3) {
            bottom: -2.5em;
            animation: wave 20s -1s reverse infinite;
            opacity: 0.9;
        }
        @keyframes wave {
            2% {
                transform: translateX(1);
            }
        
            25% {
                transform: translateX(-25%);
            }
        
            50% {
                transform: translateX(-50%);
            }
        
            75% {
                transform: translateX(-25%);
            }
        
            100% {
                transform: translateX(1);
            }
        }

    `
    this.el.innerHTML = `<div style="height: 100%; width: 100%; overflow: hidden; position: relative;">
        <div class="awe-wave" style="background: ${color}; height: ${percent}%;"></div>
        <div class="awe-wave" style="background: ${color}; height: ${percent}%;"></div>
        <div class="awe-wave" style="background: ${color}; height: ${percent}%;"></div>
    </div>`
  }

  update (props) {
    this.props = props
    this.render()
  }
}
