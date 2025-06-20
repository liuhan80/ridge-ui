export default class TextClip {
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
    const { color, classList } = this.props
    this.styleEl.innerHTML = `
        .blob-thumb {
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 62% 47% 82% 35% / 45% 45% 80% 66%;
            will-change: border-radius, transform, opacity;
            animation: sliderShape 5s linear infinite;
            display: block;
            z-index: -1;
            -webkit-animation: sliderShape 5s linear infinite;
        }
        @keyframes sliderShape {
            0%,100%{
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
              transform: translate3d(0,0,0) rotateZ(0.01deg);
            }
            34%{
                border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
              transform:  translate3d(0,5px,0) rotateZ(0.01deg);
            }
            50%{
              transform: translate3d(0,0,0) rotateZ(0.01deg);
            }
            67%{
              border-radius: 100% 60% 60% 100% / 100% 100% 60% 60% ;
              transform: translate3d(0,-3px,0) rotateZ(0.01deg);
            }
          }
    `
    this.el.innerHTML = `<div class="area" style="height: 100%; height: 100%">
        <div class="blob-thumb ${classList.join(' ')}" style="background: ${color || ''}"/>
  </div >`
  }

  update (props) {
    this.props = props
    this.render()
  }
}
