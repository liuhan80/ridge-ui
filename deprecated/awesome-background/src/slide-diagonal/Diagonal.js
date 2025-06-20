export default class Diagonal {
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
    const { color1, color2, deg = -60 } = this.props
    this.styleEl.innerHTML = `
      .slide-diagonal .bg {
        animation:slide 3s ease-in-out infinite alternate;
        background-image: linear-gradient(${deg}deg, ${color1} 50%, ${color2} 50%);
        bottom:0;
        left:-50%;
        opacity:.5;
        position:absolute;
        right:-50%;
        top:0;
        z-index:-1;
      }
      .slide-diagonal .bg2 {
        animation-direction:alternate-reverse;
        animation-duration:4s;
      }
      
      .slide-diagonal .bg3 {
        animation-duration:5s;
      }

      @keyframes slide {
        0% {
          transform:translateX(-25%);
        }
        100% {
          transform:translateX(25%);
        }
      }
    `
    this.el.innerHTML = `<div class="slide-diagonal" style="height: 100%; height: 100%; position:relative; overflow:hidden;">
          <div class="bg"></div>
          <div class="bg bg2"></div>
          <div class="bg bg3"></div>
    </div >`
  }

  update (props) {
    this.props = props
    this.render()
  }
}
