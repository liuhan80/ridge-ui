/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./concat.js":
/*!*******************!*\
  !*** ./concat.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   audio: () => (/* reexport safe */ _src_audio_index_d_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   composite: () => (/* reexport safe */ _src_composite_index_d_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   html: () => (/* reexport safe */ _src_html_html_d_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   image: () => (/* reexport safe */ _src_image_image_d_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   text: () => (/* reexport safe */ _src_text_text_d_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   video: () => (/* reexport safe */ _src_video_index_d_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _src_audio_index_d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/audio/index.d.js */ \"./src/audio/index.d.js\");\n/* harmony import */ var _src_composite_index_d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/composite/index.d.js */ \"./src/composite/index.d.js\");\n/* harmony import */ var _src_html_html_d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/html/html.d.js */ \"./src/html/html.d.js\");\n/* harmony import */ var _src_image_image_d_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/image/image.d.js */ \"./src/image/image.d.js\");\n/* harmony import */ var _src_text_text_d_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/text/text.d.js */ \"./src/text/text.d.js\");\n/* harmony import */ var _src_video_index_d_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/video/index.d.js */ \"./src/video/index.d.js\");\n\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25jYXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ1E7QUFDWDtBQUNHO0FBQ0g7QUFDRyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vY29uY2F0LmpzPzExY2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF1ZGlvIGZyb20gJy4vc3JjL2F1ZGlvL2luZGV4LmQuanMnXG5pbXBvcnQgY29tcG9zaXRlIGZyb20gJy4vc3JjL2NvbXBvc2l0ZS9pbmRleC5kLmpzJ1xuaW1wb3J0IGh0bWwgZnJvbSAnLi9zcmMvaHRtbC9odG1sLmQuanMnXG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9zcmMvaW1hZ2UvaW1hZ2UuZC5qcydcbmltcG9ydCB0ZXh0IGZyb20gJy4vc3JjL3RleHQvdGV4dC5kLmpzJ1xuaW1wb3J0IHZpZGVvIGZyb20gJy4vc3JjL3ZpZGVvL2luZGV4LmQuanMnXG5leHBvcnQgeyBhdWRpbywgY29tcG9zaXRlLCBodG1sLCBpbWFnZSwgdGV4dCwgdmlkZW8gfSJdLCJuYW1lcyI6WyJhdWRpbyIsImNvbXBvc2l0ZSIsImh0bWwiLCJpbWFnZSIsInRleHQiLCJ2aWRlbyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./concat.js\n");

/***/ }),

/***/ "./src/audio/Audio.js":
/*!****************************!*\
  !*** ./src/audio/Audio.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Audio)\n/* harmony export */ });\nclass Audio {\n  constructor(props) {\n    this.props = props;\n  }\n  mount(el) {\n    this.el = el;\n    this.audio = document.createElement('audio');\n    this.audioDiv = document.createElement('div');\n    this.audioDiv.style.width = '100%';\n    this.audioDiv.style.height = '100%';\n    this.audioDiv.style.fontSize = '22px';\n    this.audioDiv.style.display = 'flex';\n    this.audioDiv.style.justifyContent = 'center';\n    this.audioDiv.style.alignItems = 'center';\n    this.audioDiv.style.color = '#999';\n    this.audioDiv.style.border = '1px solid #ccc';\n    this.audioDiv.className = 'bi bi-volume-up';\n    this.el.append(this.audio);\n    this.el.append(this.audioDiv);\n    this.render();\n  }\n  render() {\n    const {\n      autoPlay,\n      src,\n      playing,\n      onLoaded,\n      onTimeUpdated,\n      currentTime,\n      __mode\n    } = this.props;\n    this.audio.className = 'ridge-audio';\n    this.audio.preload = 'auto';\n    this.audio.autoPlay = autoPlay;\n    this.audio.src = src;\n    if (src) {\n      this.audio.addEventListener('loadeddata', () => {\n        onLoaded({\n          duration: this.audio.duration\n        });\n        // duration 变量现在存放音频的播放时长（单位秒）\n      });\n      this.audio.addEventListener('timeupdate', event => {\n        onTimeUpdated && onTimeUpdated({\n          currentTime: this.audio.currentTime\n        });\n      });\n    }\n    if (currentTime) {\n      this.audio.currentTime = currentTime;\n      console.log('currentTime', currentTime);\n      onTimeUpdated && onTimeUpdated({\n        currentTime\n      });\n    }\n    if (playing && src && __mode !== 'edit') {\n      this.audio.play();\n    } else {\n      this.audio.pause();\n    }\n  }\n  setCurrentTime(time) {\n    this.audio.currentTime = time;\n  }\n  update(props) {\n    this.props = props;\n    this.render();\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUlELEdBQUcsSUFBSUssTUFBTSxLQUFLLE1BQU0sRUFBRTtNQUN2QyxJQUFJLENBQUN0QixLQUFLLENBQUM2QixJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLE1BQU07TUFDTCxJQUFJLENBQUM3QixLQUFLLENBQUM4QixLQUFLLENBQUMsQ0FBQztJQUNwQjtFQUNGO0VBRUFDLGNBQWNBLENBQUVDLElBQUksRUFBRTtJQUNwQixJQUFJLENBQUNoQyxLQUFLLENBQUNxQixXQUFXLEdBQUdXLElBQUk7RUFDL0I7RUFFQUMsTUFBTUEsQ0FBRXBDLEtBQUssRUFBRTtJQUNiLElBQUksQ0FBQ0EsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCLElBQUksQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL2F1ZGlvL0F1ZGlvLmpzPzJkNDYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW8ge1xyXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgfVxyXG5cclxuICBtb3VudCAoZWwpIHtcclxuICAgIHRoaXMuZWwgPSBlbFxyXG4gICAgdGhpcy5hdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJylcclxuXHJcbiAgICB0aGlzLmF1ZGlvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHJcbiAgICB0aGlzLmF1ZGlvRGl2LnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICB0aGlzLmF1ZGlvRGl2LnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgdGhpcy5hdWRpb0Rpdi5zdHlsZS5mb250U2l6ZSA9ICcyMnB4J1xyXG4gICAgdGhpcy5hdWRpb0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICB0aGlzLmF1ZGlvRGl2LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcclxuICAgIHRoaXMuYXVkaW9EaXYuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInXHJcbiAgICB0aGlzLmF1ZGlvRGl2LnN0eWxlLmNvbG9yID0gJyM5OTknXHJcbiAgICB0aGlzLmF1ZGlvRGl2LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgI2NjYydcclxuXHJcbiAgICB0aGlzLmF1ZGlvRGl2LmNsYXNzTmFtZSA9ICdiaSBiaS12b2x1bWUtdXAnXHJcblxyXG4gICAgdGhpcy5lbC5hcHBlbmQodGhpcy5hdWRpbylcclxuICAgIHRoaXMuZWwuYXBwZW5kKHRoaXMuYXVkaW9EaXYpXHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG5cclxuICByZW5kZXIgKCkge1xyXG4gICAgY29uc3QgeyBhdXRvUGxheSwgc3JjLCBwbGF5aW5nLCBvbkxvYWRlZCwgb25UaW1lVXBkYXRlZCwgY3VycmVudFRpbWUsIF9fbW9kZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgdGhpcy5hdWRpby5jbGFzc05hbWUgPSAncmlkZ2UtYXVkaW8nXHJcbiAgICB0aGlzLmF1ZGlvLnByZWxvYWQgPSAnYXV0bydcclxuICAgIHRoaXMuYXVkaW8uYXV0b1BsYXkgPSBhdXRvUGxheVxyXG5cclxuICAgIHRoaXMuYXVkaW8uc3JjID0gc3JjXHJcblxyXG4gICAgaWYgKHNyYykge1xyXG4gICAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgb25Mb2FkZWQoe1xyXG4gICAgICAgICAgZHVyYXRpb246IHRoaXMuYXVkaW8uZHVyYXRpb25cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGR1cmF0aW9uIOWPmOmHj+eOsOWcqOWtmOaUvumfs+mikeeahOaSreaUvuaXtumVv++8iOWNleS9jeenku+8iVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgb25UaW1lVXBkYXRlZCAmJiBvblRpbWVVcGRhdGVkKHtcclxuICAgICAgICAgIGN1cnJlbnRUaW1lOiB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudFRpbWUpIHtcclxuICAgICAgdGhpcy5hdWRpby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lXHJcbiAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50VGltZScsIGN1cnJlbnRUaW1lKVxyXG4gICAgICBvblRpbWVVcGRhdGVkICYmIG9uVGltZVVwZGF0ZWQoe1xyXG4gICAgICAgIGN1cnJlbnRUaW1lXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAocGxheWluZyAmJiBzcmMgJiYgX19tb2RlICE9PSAnZWRpdCcpIHtcclxuICAgICAgdGhpcy5hdWRpby5wbGF5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0Q3VycmVudFRpbWUgKHRpbWUpIHtcclxuICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSB0aW1lXHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKHByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHNcclxuICAgIHRoaXMucmVuZGVyKClcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkF1ZGlvIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIm1vdW50IiwiZWwiLCJhdWRpbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImF1ZGlvRGl2Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImZvbnRTaXplIiwiZGlzcGxheSIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImNvbG9yIiwiYm9yZGVyIiwiY2xhc3NOYW1lIiwiYXBwZW5kIiwicmVuZGVyIiwiYXV0b1BsYXkiLCJzcmMiLCJwbGF5aW5nIiwib25Mb2FkZWQiLCJvblRpbWVVcGRhdGVkIiwiY3VycmVudFRpbWUiLCJfX21vZGUiLCJwcmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImR1cmF0aW9uIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwicGxheSIsInBhdXNlIiwic2V0Q3VycmVudFRpbWUiLCJ0aW1lIiwidXBkYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/audio/Audio.js\n");

/***/ }),

/***/ "./src/audio/index.d.js":
/*!******************************!*\
  !*** ./src/audio/index.d.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Audio */ \"./src/audio/Audio.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'audio',\n  component: _Audio__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'icons/audio.svg',\n  description: '使用HTML标准<audio>方式显示/播放一个音频',\n  type: 'vanilla',\n  title: '音频',\n  order: 4,\n  width: 120,\n  height: 28,\n  props: [{\n    name: 'src',\n    label: '地址',\n    type: 'audio'\n  }, {\n    name: 'playing',\n    label: '播放',\n    connect: true,\n    type: 'boolean'\n  }, {\n    name: 'currentTime',\n    label: '进度',\n    connect: true,\n    type: 'number'\n  }],\n  events: [{\n    label: '音频加载',\n    name: 'onLoaded'\n  }, {\n    label: '播放',\n    name: 'onTimeUpdated'\n  }],\n  methods: [{\n    label: '跳转进度',\n    name: 'setCurrentTime'\n  }]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXVkaW8vaW5kZXguZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQjtBQUMzQixpRUFBZTtFQUNiQyxJQUFJLEVBQUUsT0FBTztFQUNiQyxTQUFTLEVBQUVGLDhDQUFLO0VBQ2hCRyxJQUFJLEVBQUUsaUJBQWlCO0VBQ3ZCQyxXQUFXLEVBQUUsNEJBQTRCO0VBQ3pDQyxJQUFJLEVBQUUsU0FBUztFQUNmQyxLQUFLLEVBQUUsSUFBSTtFQUNYQyxLQUFLLEVBQUUsQ0FBQztFQUNSQyxLQUFLLEVBQUUsR0FBRztFQUNWQyxNQUFNLEVBQUUsRUFBRTtFQUNWQyxLQUFLLEVBQUUsQ0FBQztJQUNOVCxJQUFJLEVBQUUsS0FBSztJQUNYVSxLQUFLLEVBQUUsSUFBSTtJQUNYTixJQUFJLEVBQUU7RUFDUixDQUFDLEVBQUU7SUFDREosSUFBSSxFQUFFLFNBQVM7SUFDZlUsS0FBSyxFQUFFLElBQUk7SUFDWEMsT0FBTyxFQUFFLElBQUk7SUFDYlAsSUFBSSxFQUFFO0VBQ1IsQ0FBQyxFQUFFO0lBQ0RKLElBQUksRUFBRSxhQUFhO0lBQ25CVSxLQUFLLEVBQUUsSUFBSTtJQUNYQyxPQUFPLEVBQUUsSUFBSTtJQUNiUCxJQUFJLEVBQUU7RUFDUixDQUFDLENBQUM7RUFDRlEsTUFBTSxFQUFFLENBQUM7SUFDUEYsS0FBSyxFQUFFLE1BQU07SUFDYlYsSUFBSSxFQUFFO0VBQ1IsQ0FBQyxFQUFFO0lBQ0RVLEtBQUssRUFBRSxJQUFJO0lBQ1hWLElBQUksRUFBRTtFQUNSLENBQUMsQ0FBQztFQUNGYSxPQUFPLEVBQUUsQ0FBQztJQUNSSCxLQUFLLEVBQUUsTUFBTTtJQUNiVixJQUFJLEVBQUU7RUFDUixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL2F1ZGlvL2luZGV4LmQuanM/ODFlYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXVkaW8gZnJvbSAnLi9BdWRpbydcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdhdWRpbycsXHJcbiAgY29tcG9uZW50OiBBdWRpbyxcclxuICBpY29uOiAnaWNvbnMvYXVkaW8uc3ZnJyxcclxuICBkZXNjcmlwdGlvbjogJ+S9v+eUqEhUTUzmoIflh4Y8YXVkaW8+5pa55byP5pi+56S6L+aSreaUvuS4gOS4qumfs+mikScsXHJcbiAgdHlwZTogJ3ZhbmlsbGEnLFxyXG4gIHRpdGxlOiAn6Z+z6aKRJyxcclxuICBvcmRlcjogNCxcclxuICB3aWR0aDogMTIwLFxyXG4gIGhlaWdodDogMjgsXHJcbiAgcHJvcHM6IFt7XHJcbiAgICBuYW1lOiAnc3JjJyxcclxuICAgIGxhYmVsOiAn5Zyw5Z2AJyxcclxuICAgIHR5cGU6ICdhdWRpbydcclxuICB9LCB7XHJcbiAgICBuYW1lOiAncGxheWluZycsXHJcbiAgICBsYWJlbDogJ+aSreaUvicsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgdHlwZTogJ2Jvb2xlYW4nXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ2N1cnJlbnRUaW1lJyxcclxuICAgIGxhYmVsOiAn6L+b5bqmJyxcclxuICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gIH1dLFxyXG4gIGV2ZW50czogW3tcclxuICAgIGxhYmVsOiAn6Z+z6aKR5Yqg6L29JyxcclxuICAgIG5hbWU6ICdvbkxvYWRlZCdcclxuICB9LCB7XHJcbiAgICBsYWJlbDogJ+aSreaUvicsXHJcbiAgICBuYW1lOiAnb25UaW1lVXBkYXRlZCdcclxuICB9XSxcclxuICBtZXRob2RzOiBbe1xyXG4gICAgbGFiZWw6ICfot7Povazov5vluqYnLFxyXG4gICAgbmFtZTogJ3NldEN1cnJlbnRUaW1lJ1xyXG4gIH1dXHJcbn1cclxuIl0sIm5hbWVzIjpbIkF1ZGlvIiwibmFtZSIsImNvbXBvbmVudCIsImljb24iLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJ0aXRsZSIsIm9yZGVyIiwid2lkdGgiLCJoZWlnaHQiLCJwcm9wcyIsImxhYmVsIiwiY29ubmVjdCIsImV2ZW50cyIsIm1ldGhvZHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/audio/index.d.js\n");

/***/ }),

/***/ "./src/composite/CompositeWrapper.js":
/*!*******************************************!*\
  !*** ./src/composite/CompositeWrapper.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CompositeWrapper)\n/* harmony export */ });\n/**\r\n * Composite类型组件封装类\r\n */\nclass CompositeWrapper {\n  constructor(props) {\n    this.props = props;\n  }\n  getRidge() {\n    return window.ridge ?? this.props.ridge;\n  }\n  async mount(el) {\n    this.el = el;\n    this.containerEl = document.createElement('div');\n    el.appendChild(this.containerEl);\n    this.updateContainerStyle();\n    this.loadMountComposite();\n  }\n  async loadMountComposite() {\n    const ridge = this.getRidge();\n    const {\n      packageName,\n      pagePath,\n      __composite,\n      ...props\n    } = this.props;\n    // 页面改变了重新挂载\n    if (this.containerEl.composite) {\n      this.containerEl.composite.unmount();\n    }\n    if (pagePath) {\n      // 这里包名如果未明确定义，表示包就再初始包之中\n      const compositeCreated = await ridge.createComposite(packageName || __composite.packageName, pagePath, props);\n      if (compositeCreated) {\n        await compositeCreated.initialize();\n        await compositeCreated.mount(this.containerEl);\n        this.containerEl.composite = compositeCreated;\n        this.el.composite = compositeCreated;\n      }\n    }\n  }\n  updateContainerStyle() {\n    const {\n      classList\n    } = this.props;\n    this.containerEl.className = [...(classList || []), 'ridge-container'].join(' ');\n    // this.containerEl.style.overflow = 'hidden'\n  }\n  update(props) {\n    if (this.props.packageName !== props.packageName || this.props.pagePath !== props.pagePath) {\n      Object.assign(this.props, props);\n      this.loadMountComposite();\n    } else {\n      if (this.el.composite) {\n        Object.assign(this.props, props);\n        this.el.composite.setProperties(this.props);\n      }\n    }\n    this.updateContainerStyle();\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBb0IsQ0FBQyxDQUFDO0VBQzdCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaWRnZS1iYXNpYy8uL3NyYy9jb21wb3NpdGUvQ29tcG9zaXRlV3JhcHBlci5qcz84ZjliIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb21wb3NpdGXnsbvlnovnu4Tku7blsIHoo4XnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2l0ZVdyYXBwZXIge1xyXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgfVxyXG5cclxuICBnZXRSaWRnZSAoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LnJpZGdlID8/IHRoaXMucHJvcHMucmlkZ2VcclxuICB9XHJcblxyXG4gIGFzeW5jIG1vdW50IChlbCkge1xyXG4gICAgdGhpcy5lbCA9IGVsXHJcbiAgICB0aGlzLmNvbnRhaW5lckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICB0aGlzLnVwZGF0ZUNvbnRhaW5lclN0eWxlKClcclxuICAgIHRoaXMubG9hZE1vdW50Q29tcG9zaXRlKClcclxuICB9XHJcblxyXG4gIGFzeW5jIGxvYWRNb3VudENvbXBvc2l0ZSAoKSB7XHJcbiAgICBjb25zdCByaWRnZSA9IHRoaXMuZ2V0UmlkZ2UoKVxyXG4gICAgY29uc3QgeyBwYWNrYWdlTmFtZSwgcGFnZVBhdGgsIF9fY29tcG9zaXRlLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wc1xyXG4gICAgLy8g6aG16Z2i5pS55Y+Y5LqG6YeN5paw5oyC6L29XHJcbiAgICBpZiAodGhpcy5jb250YWluZXJFbC5jb21wb3NpdGUpIHtcclxuICAgICAgdGhpcy5jb250YWluZXJFbC5jb21wb3NpdGUudW5tb3VudCgpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhZ2VQYXRoKSB7XHJcbiAgICAgIC8vIOi/memHjOWMheWQjeWmguaenOacquaYjuehruWumuS5ie+8jOihqOekuuWMheWwseWGjeWIneWni+WMheS5i+S4rVxyXG4gICAgICBjb25zdCBjb21wb3NpdGVDcmVhdGVkID0gYXdhaXQgcmlkZ2UuY3JlYXRlQ29tcG9zaXRlKHBhY2thZ2VOYW1lIHx8IF9fY29tcG9zaXRlLnBhY2thZ2VOYW1lLCBwYWdlUGF0aCwgcHJvcHMpXHJcblxyXG4gICAgICBpZiAoY29tcG9zaXRlQ3JlYXRlZCkge1xyXG4gICAgICAgIGF3YWl0IGNvbXBvc2l0ZUNyZWF0ZWQuaW5pdGlhbGl6ZSgpXHJcbiAgICAgICAgYXdhaXQgY29tcG9zaXRlQ3JlYXRlZC5tb3VudCh0aGlzLmNvbnRhaW5lckVsKVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmNvbXBvc2l0ZSA9IGNvbXBvc2l0ZUNyZWF0ZWRcclxuICAgICAgICB0aGlzLmVsLmNvbXBvc2l0ZSA9IGNvbXBvc2l0ZUNyZWF0ZWRcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29udGFpbmVyU3R5bGUgKCkge1xyXG4gICAgY29uc3QgeyBjbGFzc0xpc3QgfSA9IHRoaXMucHJvcHNcclxuICAgIHRoaXMuY29udGFpbmVyRWwuY2xhc3NOYW1lID0gWy4uLihjbGFzc0xpc3QgfHwgW10pLCAncmlkZ2UtY29udGFpbmVyJ10uam9pbignICcpXHJcbiAgICAvLyB0aGlzLmNvbnRhaW5lckVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICB9XHJcblxyXG4gIHVwZGF0ZSAocHJvcHMpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLnBhY2thZ2VOYW1lICE9PSBwcm9wcy5wYWNrYWdlTmFtZSB8fCB0aGlzLnByb3BzLnBhZ2VQYXRoICE9PSBwcm9wcy5wYWdlUGF0aCkge1xyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMucHJvcHMsIHByb3BzKVxyXG4gICAgICB0aGlzLmxvYWRNb3VudENvbXBvc2l0ZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5lbC5jb21wb3NpdGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucHJvcHMsIHByb3BzKVxyXG4gICAgICAgIHRoaXMuZWwuY29tcG9zaXRlLnNldFByb3BlcnRpZXModGhpcy5wcm9wcylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVDb250YWluZXJTdHlsZSgpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJDb21wb3NpdGVXcmFwcGVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImdldFJpZGdlIiwid2luZG93IiwicmlkZ2UiLCJtb3VudCIsImVsIiwiY29udGFpbmVyRWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInVwZGF0ZUNvbnRhaW5lclN0eWxlIiwibG9hZE1vdW50Q29tcG9zaXRlIiwicGFja2FnZU5hbWUiLCJwYWdlUGF0aCIsIl9fY29tcG9zaXRlIiwiY29tcG9zaXRlIiwidW5tb3VudCIsImNvbXBvc2l0ZUNyZWF0ZWQiLCJjcmVhdGVDb21wb3NpdGUiLCJpbml0aWFsaXplIiwiY2xhc3NMaXN0IiwiY2xhc3NOYW1lIiwiam9pbiIsInVwZGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInNldFByb3BlcnRpZXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/composite/CompositeWrapper.js\n");

/***/ }),

/***/ "./src/composite/index.d.js":
/*!**********************************!*\
  !*** ./src/composite/index.d.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _CompositeWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompositeWrapper */ \"./src/composite/CompositeWrapper.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'composite',\n  component: _CompositeWrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  title: '子页面',\n  icon: 'icons/composite.svg',\n  type: 'vanilla',\n  width: 520,\n  height: 400,\n  props: [{\n    name: 'classList',\n    label: '样式',\n    type: 'style',\n    value: []\n  }],\n  events: []\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9zaXRlL2luZGV4LmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEM7QUFFMUMsaUVBQWU7RUFDYkMsSUFBSSxFQUFFLFdBQVc7RUFDakJDLFNBQVMsRUFBRUYseURBQVM7RUFDcEJHLEtBQUssRUFBRSxLQUFLO0VBQ1pDLElBQUksRUFBRSxxQkFBcUI7RUFDM0JDLElBQUksRUFBRSxTQUFTO0VBQ2ZDLEtBQUssRUFBRSxHQUFHO0VBQ1ZDLE1BQU0sRUFBRSxHQUFHO0VBQ1hDLEtBQUssRUFBRSxDQUFDO0lBQ05QLElBQUksRUFBRSxXQUFXO0lBQ2pCUSxLQUFLLEVBQUUsSUFBSTtJQUNYSixJQUFJLEVBQUUsT0FBTztJQUNiSyxLQUFLLEVBQUU7RUFDVCxDQUFDLENBQUM7RUFDRkMsTUFBTSxFQUFFO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL2NvbXBvc2l0ZS9pbmRleC5kLmpzPzRhZmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZVdyYXBwZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ2NvbXBvc2l0ZScsXHJcbiAgY29tcG9uZW50OiBDb21wb3NpdGUsXHJcbiAgdGl0bGU6ICflrZDpobXpnaInLFxyXG4gIGljb246ICdpY29ucy9jb21wb3NpdGUuc3ZnJyxcclxuICB0eXBlOiAndmFuaWxsYScsXHJcbiAgd2lkdGg6IDUyMCxcclxuICBoZWlnaHQ6IDQwMCxcclxuICBwcm9wczogW3tcclxuICAgIG5hbWU6ICdjbGFzc0xpc3QnLFxyXG4gICAgbGFiZWw6ICfmoLflvI8nLFxyXG4gICAgdHlwZTogJ3N0eWxlJyxcclxuICAgIHZhbHVlOiBbXVxyXG4gIH1dLFxyXG4gIGV2ZW50czogW11cclxufVxyXG4iXSwibmFtZXMiOlsiQ29tcG9zaXRlIiwibmFtZSIsImNvbXBvbmVudCIsInRpdGxlIiwiaWNvbiIsInR5cGUiLCJ3aWR0aCIsImhlaWdodCIsInByb3BzIiwibGFiZWwiLCJ2YWx1ZSIsImV2ZW50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/composite/index.d.js\n");

/***/ }),

/***/ "./src/html/Html.js":
/*!**************************!*\
  !*** ./src/html/Html.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HTML)\n/* harmony export */ });\nclass HTML {\n  constructor(props) {\n    this.props = props;\n  }\n  mount(el) {\n    this.el = el;\n    this.render();\n  }\n  update(props) {\n    this.props = props;\n    this.render();\n  }\n  render() {\n    const {\n      html,\n      classNames = []\n    } = this.props;\n    this.el.innerHTML = html ?? '';\n    this.el.className = classNames.join(' ');\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaHRtbC9IdG1sLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxNQUFNQSxJQUFJLENBQUM7RUFDeEJDLFdBQVdBLENBQUVDLEtBQUssRUFBRTtJQUNsQixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztFQUNwQjtFQUVBQyxLQUFLQSxDQUFFQyxFQUFFLEVBQUU7SUFDVCxJQUFJLENBQUNBLEVBQUUsR0FBR0EsRUFBRTtJQUNaLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUM7RUFDZjtFQUVBQyxNQUFNQSxDQUFFSixLQUFLLEVBQUU7SUFDYixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLENBQUNHLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7RUFFQUEsTUFBTUEsQ0FBQSxFQUFJO0lBQ1IsTUFBTTtNQUNKRSxJQUFJO01BQ0pDLFVBQVUsR0FBRztJQUNmLENBQUMsR0FBRyxJQUFJLENBQUNOLEtBQUs7SUFDZCxJQUFJLENBQUNFLEVBQUUsQ0FBQ0ssU0FBUyxHQUFHRixJQUFJLElBQUksRUFBRTtJQUM5QixJQUFJLENBQUNILEVBQUUsQ0FBQ00sU0FBUyxHQUFHRixVQUFVLENBQUNHLElBQUksQ0FBQyxHQUFHLENBQUM7RUFDMUM7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL2h0bWwvSHRtbC5qcz84MDZiIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUwge1xyXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgfVxyXG5cclxuICBtb3VudCAoZWwpIHtcclxuICAgIHRoaXMuZWwgPSBlbFxyXG4gICAgdGhpcy5yZW5kZXIoKVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG5cclxuICByZW5kZXIgKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBodG1sLFxyXG4gICAgICBjbGFzc05hbWVzID0gW11cclxuICAgIH0gPSB0aGlzLnByb3BzXHJcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGh0bWwgPz8gJydcclxuICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5qb2luKCcgJylcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkhUTUwiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwibW91bnQiLCJlbCIsInJlbmRlciIsInVwZGF0ZSIsImh0bWwiLCJjbGFzc05hbWVzIiwiaW5uZXJIVE1MIiwiY2xhc3NOYW1lIiwiam9pbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/html/Html.js\n");

/***/ }),

/***/ "./src/html/html.d.js":
/*!****************************!*\
  !*** ./src/html/html.d.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Html.js */ \"./src/html/Html.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'html',\n  component: _Html_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  private: true,\n  icon: 'icons/html.svg',\n  description: '提供原始HTML内容的渲染，通常用于特定场合：连接的数据可以直接输出为HTML，例如直接返回SVG图片内容、返回样例代码的情况。',\n  title: '网页代码',\n  type: 'vanilla',\n  order: 20,\n  width: 260,\n  height: 160,\n  props: [{\n    name: 'html',\n    type: 'string',\n    label: 'HTML',\n    connect: true,\n    value: '<div>HTML</div>'\n  }, {\n    name: 'isCenter',\n    type: 'boolean',\n    label: '正中',\n    value: true\n  }, {\n    name: 'classNames',\n    label: '样式',\n    type: 'style',\n    value: []\n  }]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaHRtbC9odG1sLmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEI7QUFFNUIsaUVBQWU7RUFDYkMsSUFBSSxFQUFFLE1BQU07RUFDWkMsU0FBUyxFQUFFRixnREFBSTtFQUNmRyxPQUFPLEVBQUUsSUFBSTtFQUNiQyxJQUFJLEVBQUUsZ0JBQWdCO0VBQ3RCQyxXQUFXLEVBQUUsa0VBQWtFO0VBQy9FQyxLQUFLLEVBQUUsTUFBTTtFQUNiQyxJQUFJLEVBQUUsU0FBUztFQUNmQyxLQUFLLEVBQUUsRUFBRTtFQUNUQyxLQUFLLEVBQUUsR0FBRztFQUNWQyxNQUFNLEVBQUUsR0FBRztFQUNYQyxLQUFLLEVBQUUsQ0FBQztJQUNOVixJQUFJLEVBQUUsTUFBTTtJQUNaTSxJQUFJLEVBQUUsUUFBUTtJQUNkSyxLQUFLLEVBQUUsTUFBTTtJQUNiQyxPQUFPLEVBQUUsSUFBSTtJQUNiQyxLQUFLLEVBQUU7RUFDVCxDQUFDLEVBQUU7SUFDRGIsSUFBSSxFQUFFLFVBQVU7SUFDaEJNLElBQUksRUFBRSxTQUFTO0lBQ2ZLLEtBQUssRUFBRSxJQUFJO0lBQ1hFLEtBQUssRUFBRTtFQUNULENBQUMsRUFBRTtJQUNEYixJQUFJLEVBQUUsWUFBWTtJQUNsQlcsS0FBSyxFQUFFLElBQUk7SUFDWEwsSUFBSSxFQUFFLE9BQU87SUFDYk8sS0FBSyxFQUFFO0VBQ1QsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaWRnZS1iYXNpYy8uL3NyYy9odG1sL2h0bWwuZC5qcz9hYTBlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIdG1sIGZyb20gJy4vSHRtbC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnaHRtbCcsXHJcbiAgY29tcG9uZW50OiBIdG1sLFxyXG4gIHByaXZhdGU6IHRydWUsXHJcbiAgaWNvbjogJ2ljb25zL2h0bWwuc3ZnJyxcclxuICBkZXNjcmlwdGlvbjogJ+aPkOS+m+WOn+Wni0hUTUzlhoXlrrnnmoTmuLLmn5PvvIzpgJrluLjnlKjkuo7nibnlrprlnLrlkIjvvJrov57mjqXnmoTmlbDmja7lj6/ku6Xnm7TmjqXovpPlh7rkuLpIVE1M77yM5L6L5aaC55u05o6l6L+U5ZueU1ZH5Zu+54mH5YaF5a6544CB6L+U5Zue5qC35L6L5Luj56CB55qE5oOF5Ya144CCJyxcclxuICB0aXRsZTogJ+e9kemhteS7o+eggScsXHJcbiAgdHlwZTogJ3ZhbmlsbGEnLFxyXG4gIG9yZGVyOiAyMCxcclxuICB3aWR0aDogMjYwLFxyXG4gIGhlaWdodDogMTYwLFxyXG4gIHByb3BzOiBbe1xyXG4gICAgbmFtZTogJ2h0bWwnLFxyXG4gICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICBsYWJlbDogJ0hUTUwnLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIHZhbHVlOiAnPGRpdj5IVE1MPC9kaXY+J1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdpc0NlbnRlcicsXHJcbiAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICBsYWJlbDogJ+ato+S4rScsXHJcbiAgICB2YWx1ZTogdHJ1ZVxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdjbGFzc05hbWVzJyxcclxuICAgIGxhYmVsOiAn5qC35byPJyxcclxuICAgIHR5cGU6ICdzdHlsZScsXHJcbiAgICB2YWx1ZTogW11cclxuICB9XVxyXG59XHJcbiJdLCJuYW1lcyI6WyJIdG1sIiwibmFtZSIsImNvbXBvbmVudCIsInByaXZhdGUiLCJpY29uIiwiZGVzY3JpcHRpb24iLCJ0aXRsZSIsInR5cGUiLCJvcmRlciIsIndpZHRoIiwiaGVpZ2h0IiwicHJvcHMiLCJsYWJlbCIsImNvbm5lY3QiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/html/html.d.js\n");

/***/ }),

/***/ "./src/image/Image.js":
/*!****************************!*\
  !*** ./src/image/Image.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Image)\n/* harmony export */ });\nclass Image {\n  constructor(props) {\n    this.props = props;\n  }\n  mount(el) {\n    this.el = el;\n    this.render();\n  }\n  render() {\n    const {\n      objectFit,\n      src,\n      classList = []\n    } = this.props;\n    this.el.innerHTML = '';\n    this.img = document.createElement('img');\n    this.el.append(this.img);\n    if (src) {\n      // if (src.then) {\n      //   src.then(r => {\n      //     this.img.src = r\n      //   })\n      // } else {\n      // }\n      this.img.src = src;\n      this.img.style.objectFit = objectFit;\n      this.img.className = 'ridge-image ' + classList.join(' ');\n      this.img.style.width = '100%';\n      this.img.style.height = '100%';\n    } else {\n      this.img.src = 'data:image/svg+xml,%3Csvg xmlns=\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"%3E%3Cpath fill=\"%23eee\" d=\"m14 6l-3.75 5l2.85 3.8l-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22z\"%2F%3E%3C%2Fsvg%3E';\n      this.img.className = 'ridge-image ' + classList.join(' ');\n      this.img.style.width = '100%';\n      this.img.style.height = '100%';\n      this.img.style.background = '#dedede';\n    }\n  }\n  update(props) {\n    this.props = props;\n    this.render();\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW1hZ2UvSW1hZ2UuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLE1BQU1BLEtBQUssQ0FBQztFQUN6QkMsV0FBV0EsQ0FBRUMsS0FBSyxFQUFFO0lBQ2xCLElBQUksQ0FBQ0EsS0FBSyxHQUFHQSxLQUFLO0VBQ3BCO0VBRUFDLEtBQUtBLENBQUVDLEVBQUUsRUFBRTtJQUNULElBQUksQ0FBQ0EsRUFBRSxHQUFHQSxFQUFFO0lBRVosSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQztFQUNmO0VBRUFBLE1BQU1BLENBQUEsRUFBSTtJQUNSLE1BQU07TUFDSkMsU0FBUztNQUNUQyxHQUFHO01BQ0hDLFNBQVMsR0FBRztJQUNkLENBQUMsR0FBRyxJQUFJLENBQUNOLEtBQUs7SUFDZCxJQUFJLENBQUNFLEVBQUUsQ0FBQ0ssU0FBUyxHQUFHLEVBQUU7SUFFdEIsSUFBSSxDQUFDQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUN4QyxJQUFJLENBQUNSLEVBQUUsQ0FBQ1MsTUFBTSxDQUFDLElBQUksQ0FBQ0gsR0FBRyxDQUFDO0lBRXhCLElBQUlILEdBQUcsRUFBRTtNQUNQO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBLElBQUksQ0FBQ0csR0FBRyxDQUFDSCxHQUFHLEdBQUdBLEdBQUc7TUFDbEIsSUFBSSxDQUFDRyxHQUFHLENBQUNJLEtBQUssQ0FBQ1IsU0FBUyxHQUFHQSxTQUFTO01BQ3BDLElBQUksQ0FBQ0ksR0FBRyxDQUFDSyxTQUFTLEdBQUcsY0FBYyxHQUFHUCxTQUFTLENBQUNRLElBQUksQ0FBQyxHQUFHLENBQUM7TUFDekQsSUFBSSxDQUFDTixHQUFHLENBQUNJLEtBQUssQ0FBQ0csS0FBSyxHQUFHLE1BQU07TUFDN0IsSUFBSSxDQUFDUCxHQUFHLENBQUNJLEtBQUssQ0FBQ0ksTUFBTSxHQUFHLE1BQU07SUFDaEMsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDUixHQUFHLENBQUNILEdBQUcsR0FBRywrTkFBK047TUFDOU8sSUFBSSxDQUFDRyxHQUFHLENBQUNLLFNBQVMsR0FBRyxjQUFjLEdBQUdQLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztNQUN6RCxJQUFJLENBQUNOLEdBQUcsQ0FBQ0ksS0FBSyxDQUFDRyxLQUFLLEdBQUcsTUFBTTtNQUM3QixJQUFJLENBQUNQLEdBQUcsQ0FBQ0ksS0FBSyxDQUFDSSxNQUFNLEdBQUcsTUFBTTtNQUM5QixJQUFJLENBQUNSLEdBQUcsQ0FBQ0ksS0FBSyxDQUFDSyxVQUFVLEdBQUcsU0FBUztJQUN2QztFQUNGO0VBRUFDLE1BQU1BLENBQUVsQixLQUFLLEVBQUU7SUFDYixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLENBQUNHLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL2ltYWdlL0ltYWdlLmpzPzBmOWMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2Uge1xyXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgfVxyXG5cclxuICBtb3VudCAoZWwpIHtcclxuICAgIHRoaXMuZWwgPSBlbFxyXG5cclxuICAgIHRoaXMucmVuZGVyKClcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIG9iamVjdEZpdCxcclxuICAgICAgc3JjLFxyXG4gICAgICBjbGFzc0xpc3QgPSBbXVxyXG4gICAgfSA9IHRoaXMucHJvcHNcclxuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJydcclxuXHJcbiAgICB0aGlzLmltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICB0aGlzLmVsLmFwcGVuZCh0aGlzLmltZylcclxuXHJcbiAgICBpZiAoc3JjKSB7XHJcbiAgICAgIC8vIGlmIChzcmMudGhlbikge1xyXG4gICAgICAvLyAgIHNyYy50aGVuKHIgPT4ge1xyXG4gICAgICAvLyAgICAgdGhpcy5pbWcuc3JjID0gclxyXG4gICAgICAvLyAgIH0pXHJcbiAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgIC8vIH1cclxuICAgICAgdGhpcy5pbWcuc3JjID0gc3JjXHJcbiAgICAgIHRoaXMuaW1nLnN0eWxlLm9iamVjdEZpdCA9IG9iamVjdEZpdFxyXG4gICAgICB0aGlzLmltZy5jbGFzc05hbWUgPSAncmlkZ2UtaW1hZ2UgJyArIGNsYXNzTGlzdC5qb2luKCcgJylcclxuICAgICAgdGhpcy5pbWcuc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgdGhpcy5pbWcuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmltZy5zcmMgPSAnZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz1cImh0dHAlM0ElMkYlMkZ3d3cudzMub3JnJTJGMjAwMCUyRnN2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiUzRSUzQ3BhdGggZmlsbD1cIiUyM2VlZVwiIGQ9XCJtMTQgNmwtMy43NSA1bDIuODUgMy44bC0xLjYgMS4yQzkuODEgMTMuNzUgNyAxMCA3IDEwbC02IDhoMjJ6XCIlMkYlM0UlM0MlMkZzdmclM0UnXHJcbiAgICAgIHRoaXMuaW1nLmNsYXNzTmFtZSA9ICdyaWRnZS1pbWFnZSAnICsgY2xhc3NMaXN0LmpvaW4oJyAnKVxyXG4gICAgICB0aGlzLmltZy5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICB0aGlzLmltZy5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICAgdGhpcy5pbWcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZGVkZWRlJ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJJbWFnZSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJtb3VudCIsImVsIiwicmVuZGVyIiwib2JqZWN0Rml0Iiwic3JjIiwiY2xhc3NMaXN0IiwiaW5uZXJIVE1MIiwiaW1nIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwic3R5bGUiLCJjbGFzc05hbWUiLCJqb2luIiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kIiwidXBkYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/image/Image.js\n");

/***/ }),

/***/ "./src/image/image.d.js":
/*!******************************!*\
  !*** ./src/image/image.d.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Image_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Image.js */ \"./src/image/Image.js\");\n/* harmony import */ var ridge_build_src_props_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ridge-build/src/props.js */ \"../../core/tools/src/props.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'image',\n  component: _Image_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'icons/image.svg',\n  title: '图片',\n  description: '按HTML5 <img> 规范显示一张图片',\n  type: 'vanilla',\n  order: 3,\n  width: 260,\n  height: 160,\n  props: [{\n    name: 'src',\n    type: 'image',\n    label: '地址',\n    connect: true,\n    value: ''\n  }, {\n    name: 'objectFit',\n    label: '自适应',\n    type: 'string',\n    control: 'select',\n    optionList: [{\n      label: '拉伸填充',\n      value: 'fill'\n    }, {\n      label: '裁剪填充',\n      value: 'cover'\n    }, {\n      label: '按比例缩放',\n      value: 'contain'\n    }, {\n      label: '原尺寸',\n      value: 'none'\n    }],\n    value: 'cover'\n  }, (0,ridge_build_src_props_js__WEBPACK_IMPORTED_MODULE_1__.classList)()]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW1hZ2UvaW1hZ2UuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEI7QUFDc0I7QUFDcEQsaUVBQWU7RUFDYkUsSUFBSSxFQUFFLE9BQU87RUFDYkMsU0FBUyxFQUFFSCxpREFBSztFQUNoQkksSUFBSSxFQUFFLGlCQUFpQjtFQUN2QkMsS0FBSyxFQUFFLElBQUk7RUFDWEMsV0FBVyxFQUFFLHVCQUF1QjtFQUNwQ0MsSUFBSSxFQUFFLFNBQVM7RUFDZkMsS0FBSyxFQUFFLENBQUM7RUFDUkMsS0FBSyxFQUFFLEdBQUc7RUFDVkMsTUFBTSxFQUFFLEdBQUc7RUFDWEMsS0FBSyxFQUFFLENBQUM7SUFDTlQsSUFBSSxFQUFFLEtBQUs7SUFDWEssSUFBSSxFQUFFLE9BQU87SUFDYkssS0FBSyxFQUFFLElBQUk7SUFDWEMsT0FBTyxFQUFFLElBQUk7SUFDYkMsS0FBSyxFQUFFO0VBQ1QsQ0FBQyxFQUFFO0lBQ0RaLElBQUksRUFBRSxXQUFXO0lBQ2pCVSxLQUFLLEVBQUUsS0FBSztJQUNaTCxJQUFJLEVBQUUsUUFBUTtJQUNkUSxPQUFPLEVBQUUsUUFBUTtJQUNqQkMsVUFBVSxFQUFFLENBQUM7TUFDWEosS0FBSyxFQUFFLE1BQU07TUFDYkUsS0FBSyxFQUFFO0lBQ1QsQ0FBQyxFQUFFO01BQ0RGLEtBQUssRUFBRSxNQUFNO01BQ2JFLEtBQUssRUFBRTtJQUNULENBQUMsRUFBRTtNQUNERixLQUFLLEVBQUUsT0FBTztNQUNkRSxLQUFLLEVBQUU7SUFDVCxDQUFDLEVBQUU7TUFDREYsS0FBSyxFQUFFLEtBQUs7TUFDWkUsS0FBSyxFQUFFO0lBQ1QsQ0FBQyxDQUFDO0lBQ0ZBLEtBQUssRUFBRTtFQUNULENBQUMsRUFDRGIsbUVBQVMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL2ltYWdlL2ltYWdlLmQuanM/NGI4MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1hZ2UgZnJvbSAnLi9JbWFnZS5qcydcclxuaW1wb3J0IHsgY2xhc3NMaXN0IH0gZnJvbSAncmlkZ2UtYnVpbGQvc3JjL3Byb3BzLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ2ltYWdlJyxcclxuICBjb21wb25lbnQ6IEltYWdlLFxyXG4gIGljb246ICdpY29ucy9pbWFnZS5zdmcnLFxyXG4gIHRpdGxlOiAn5Zu+54mHJyxcclxuICBkZXNjcmlwdGlvbjogJ+aMiUhUTUw1IDxpbWc+IOinhOiMg+aYvuekuuS4gOW8oOWbvueJhycsXHJcbiAgdHlwZTogJ3ZhbmlsbGEnLFxyXG4gIG9yZGVyOiAzLFxyXG4gIHdpZHRoOiAyNjAsXHJcbiAgaGVpZ2h0OiAxNjAsXHJcbiAgcHJvcHM6IFt7XHJcbiAgICBuYW1lOiAnc3JjJyxcclxuICAgIHR5cGU6ICdpbWFnZScsXHJcbiAgICBsYWJlbDogJ+WcsOWdgCcsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgdmFsdWU6ICcnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ29iamVjdEZpdCcsXHJcbiAgICBsYWJlbDogJ+iHqumAguW6lCcsXHJcbiAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgIGNvbnRyb2w6ICdzZWxlY3QnLFxyXG4gICAgb3B0aW9uTGlzdDogW3tcclxuICAgICAgbGFiZWw6ICfmi4nkvLjloavlhYUnLFxyXG4gICAgICB2YWx1ZTogJ2ZpbGwnXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiAn6KOB5Ymq5aGr5YWFJyxcclxuICAgICAgdmFsdWU6ICdjb3ZlcidcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6ICfmjInmr5TkvovnvKnmlL4nLFxyXG4gICAgICB2YWx1ZTogJ2NvbnRhaW4nXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiAn5Y6f5bC65a+4JyxcclxuICAgICAgdmFsdWU6ICdub25lJ1xyXG4gICAgfV0sXHJcbiAgICB2YWx1ZTogJ2NvdmVyJ1xyXG4gIH0sXHJcbiAgY2xhc3NMaXN0KCldXHJcbn1cclxuIl0sIm5hbWVzIjpbIkltYWdlIiwiY2xhc3NMaXN0IiwibmFtZSIsImNvbXBvbmVudCIsImljb24iLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidHlwZSIsIm9yZGVyIiwid2lkdGgiLCJoZWlnaHQiLCJwcm9wcyIsImxhYmVsIiwiY29ubmVjdCIsInZhbHVlIiwiY29udHJvbCIsIm9wdGlvbkxpc3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/image/image.d.js\n");

/***/ }),

/***/ "./src/text/Text.js":
/*!**************************!*\
  !*** ./src/text/Text.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Text)\n/* harmony export */ });\nclass Text {\n  constructor(props) {\n    this.props = props;\n  }\n  mount(el) {\n    this.el = el;\n    this.render();\n  }\n  update(props) {\n    this.props = props;\n    this.render();\n  }\n  render() {\n    const {\n      text,\n      classList\n    } = this.props;\n    this.el.innerHTML = `<div class=\"${classList.join(' ')}\">${text}</div>`;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dC9UZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxNQUFNQSxJQUFJLENBQUM7RUFDeEJDLFdBQVdBLENBQUVDLEtBQUssRUFBRTtJQUNsQixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztFQUNwQjtFQUVBQyxLQUFLQSxDQUFFQyxFQUFFLEVBQUU7SUFDVCxJQUFJLENBQUNBLEVBQUUsR0FBR0EsRUFBRTtJQUNaLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUM7RUFDZjtFQUVBQyxNQUFNQSxDQUFFSixLQUFLLEVBQUU7SUFDYixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLENBQUNHLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7RUFFQUEsTUFBTUEsQ0FBQSxFQUFJO0lBQ1IsTUFBTTtNQUNKRSxJQUFJO01BQ0pDO0lBQ0YsQ0FBQyxHQUFHLElBQUksQ0FBQ04sS0FBSztJQUNkLElBQUksQ0FBQ0UsRUFBRSxDQUFDSyxTQUFTLEdBQUcsZUFBZUQsU0FBUyxDQUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUtILElBQUksUUFBUTtFQUN6RTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2UtYmFzaWMvLi9zcmMvdGV4dC9UZXh0LmpzPzJhMGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCB7XHJcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHNcclxuICB9XHJcblxyXG4gIG1vdW50IChlbCkge1xyXG4gICAgdGhpcy5lbCA9IGVsXHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKHByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHNcclxuICAgIHRoaXMucmVuZGVyKClcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRleHQsXHJcbiAgICAgIGNsYXNzTGlzdFxyXG4gICAgfSA9IHRoaXMucHJvcHNcclxuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCIke2NsYXNzTGlzdC5qb2luKCcgJyl9XCI+JHt0ZXh0fTwvZGl2PmBcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlRleHQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwibW91bnQiLCJlbCIsInJlbmRlciIsInVwZGF0ZSIsInRleHQiLCJjbGFzc0xpc3QiLCJpbm5lckhUTUwiLCJqb2luIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/text/Text.js\n");

/***/ }),

/***/ "./src/text/text.d.js":
/*!****************************!*\
  !*** ./src/text/text.d.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text.js */ \"./src/text/Text.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'text',\n  component: _Text_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'icons/text.svg',\n  description: '提供基础文本内容展示功能',\n  title: 'Text',\n  type: 'vanilla',\n  order: 3,\n  width: 260,\n  height: 40,\n  props: [{\n    name: 'text',\n    type: 'string',\n    label: 'HTML',\n    connect: true,\n    value: '内容'\n  }, {\n    name: 'classList',\n    label: '样式',\n    type: 'style',\n    value: []\n  }]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dC90ZXh0LmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEI7QUFFNUIsaUVBQWU7RUFDYkMsSUFBSSxFQUFFLE1BQU07RUFDWkMsU0FBUyxFQUFFRixnREFBSTtFQUNmRyxJQUFJLEVBQUUsZ0JBQWdCO0VBQ3RCQyxXQUFXLEVBQUUsY0FBYztFQUMzQkMsS0FBSyxFQUFFLE1BQU07RUFDYkMsSUFBSSxFQUFFLFNBQVM7RUFDZkMsS0FBSyxFQUFFLENBQUM7RUFDUkMsS0FBSyxFQUFFLEdBQUc7RUFDVkMsTUFBTSxFQUFFLEVBQUU7RUFDVkMsS0FBSyxFQUFFLENBQUM7SUFDTlQsSUFBSSxFQUFFLE1BQU07SUFDWkssSUFBSSxFQUFFLFFBQVE7SUFDZEssS0FBSyxFQUFFLE1BQU07SUFDYkMsT0FBTyxFQUFFLElBQUk7SUFDYkMsS0FBSyxFQUFFO0VBQ1QsQ0FBQyxFQUFFO0lBQ0RaLElBQUksRUFBRSxXQUFXO0lBQ2pCVSxLQUFLLEVBQUUsSUFBSTtJQUNYTCxJQUFJLEVBQUUsT0FBTztJQUNiTyxLQUFLLEVBQUU7RUFDVCxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJhc2ljLy4vc3JjL3RleHQvdGV4dC5kLmpzP2M4ZmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHQgZnJvbSAnLi9UZXh0LmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICd0ZXh0JyxcclxuICBjb21wb25lbnQ6IFRleHQsXHJcbiAgaWNvbjogJ2ljb25zL3RleHQuc3ZnJyxcclxuICBkZXNjcmlwdGlvbjogJ+aPkOS+m+WfuuehgOaWh+acrOWGheWuueWxleekuuWKn+iDvScsXHJcbiAgdGl0bGU6ICdUZXh0JyxcclxuICB0eXBlOiAndmFuaWxsYScsXHJcbiAgb3JkZXI6IDMsXHJcbiAgd2lkdGg6IDI2MCxcclxuICBoZWlnaHQ6IDQwLFxyXG4gIHByb3BzOiBbe1xyXG4gICAgbmFtZTogJ3RleHQnLFxyXG4gICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICBsYWJlbDogJ0hUTUwnLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIHZhbHVlOiAn5YaF5a65J1xyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdjbGFzc0xpc3QnLFxyXG4gICAgbGFiZWw6ICfmoLflvI8nLFxyXG4gICAgdHlwZTogJ3N0eWxlJyxcclxuICAgIHZhbHVlOiBbXVxyXG4gIH1dXHJcbn1cclxuIl0sIm5hbWVzIjpbIlRleHQiLCJuYW1lIiwiY29tcG9uZW50IiwiaWNvbiIsImRlc2NyaXB0aW9uIiwidGl0bGUiLCJ0eXBlIiwib3JkZXIiLCJ3aWR0aCIsImhlaWdodCIsInByb3BzIiwibGFiZWwiLCJjb25uZWN0IiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/text/text.d.js\n");

/***/ }),

/***/ "./src/video/Video.js":
/*!****************************!*\
  !*** ./src/video/Video.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Audio)\n/* harmony export */ });\nclass Audio {\n  constructor(props) {\n    this.props = props;\n  }\n  mount(el) {\n    this.el = el;\n    this.audio = document.createElement('video');\n    this.el.append(this.audio);\n    this.render();\n  }\n  render() {\n    const bcr = this.el.getBoundingClientRect();\n    const {\n      src\n    } = this.props;\n    this.audio.src = src;\n    this.audio.setAttribute('width', bcr.width);\n    this.audio.setAttribute('height', bcr.height);\n    this.audio.setAttribute('autoplay', true);\n    this.audio.setAttribute('muted', true);\n  }\n  update(props) {\n    this.props = props;\n    this.render();\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlkZW8vVmlkZW8uanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLE1BQU1BLEtBQUssQ0FBQztFQUN6QkMsV0FBV0EsQ0FBRUMsS0FBSyxFQUFFO0lBQ2xCLElBQUksQ0FBQ0EsS0FBSyxHQUFHQSxLQUFLO0VBQ3BCO0VBRUFDLEtBQUtBLENBQUVDLEVBQUUsRUFBRTtJQUNULElBQUksQ0FBQ0EsRUFBRSxHQUFHQSxFQUFFO0lBQ1osSUFBSSxDQUFDQyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUM1QyxJQUFJLENBQUNILEVBQUUsQ0FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQ0gsS0FBSyxDQUFDO0lBRTFCLElBQUksQ0FBQ0ksTUFBTSxDQUFDLENBQUM7RUFDZjtFQUVBQSxNQUFNQSxDQUFBLEVBQUk7SUFDUixNQUFNQyxHQUFHLEdBQUcsSUFBSSxDQUFDTixFQUFFLENBQUNPLHFCQUFxQixDQUFDLENBQUM7SUFFM0MsTUFBTTtNQUFFQztJQUFJLENBQUMsR0FBRyxJQUFJLENBQUNWLEtBQUs7SUFDMUIsSUFBSSxDQUFDRyxLQUFLLENBQUNPLEdBQUcsR0FBR0EsR0FBRztJQUNwQixJQUFJLENBQUNQLEtBQUssQ0FBQ1EsWUFBWSxDQUFDLE9BQU8sRUFBRUgsR0FBRyxDQUFDSSxLQUFLLENBQUM7SUFDM0MsSUFBSSxDQUFDVCxLQUFLLENBQUNRLFlBQVksQ0FBQyxRQUFRLEVBQUVILEdBQUcsQ0FBQ0ssTUFBTSxDQUFDO0lBQzdDLElBQUksQ0FBQ1YsS0FBSyxDQUFDUSxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztJQUN6QyxJQUFJLENBQUNSLEtBQUssQ0FBQ1EsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7RUFDeEM7RUFFQUcsTUFBTUEsQ0FBRWQsS0FBSyxFQUFFO0lBQ2IsSUFBSSxDQUFDQSxLQUFLLEdBQUdBLEtBQUs7SUFDbEIsSUFBSSxDQUFDTyxNQUFNLENBQUMsQ0FBQztFQUNmO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaWRnZS1iYXNpYy8uL3NyYy92aWRlby9WaWRlby5qcz8xYmU5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvIHtcclxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wc1xyXG4gIH1cclxuXHJcbiAgbW91bnQgKGVsKSB7XHJcbiAgICB0aGlzLmVsID0gZWxcclxuICAgIHRoaXMuYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICB0aGlzLmVsLmFwcGVuZCh0aGlzLmF1ZGlvKVxyXG5cclxuICAgIHRoaXMucmVuZGVyKClcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBjb25zdCBiY3IgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcblxyXG4gICAgY29uc3QgeyBzcmMgfSA9IHRoaXMucHJvcHNcclxuICAgIHRoaXMuYXVkaW8uc3JjID0gc3JjXHJcbiAgICB0aGlzLmF1ZGlvLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBiY3Iud2lkdGgpXHJcbiAgICB0aGlzLmF1ZGlvLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgYmNyLmhlaWdodClcclxuICAgIHRoaXMuYXVkaW8uc2V0QXR0cmlidXRlKCdhdXRvcGxheScsIHRydWUpXHJcbiAgICB0aGlzLmF1ZGlvLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlIChwcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgICB0aGlzLnJlbmRlcigpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJBdWRpbyIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJtb3VudCIsImVsIiwiYXVkaW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmQiLCJyZW5kZXIiLCJiY3IiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJ3aWR0aCIsImhlaWdodCIsInVwZGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/video/Video.js\n");

/***/ }),

/***/ "./src/video/index.d.js":
/*!******************************!*\
  !*** ./src/video/index.d.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Video */ \"./src/video/Video.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'video',\n  component: _Video__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'icons/video.svg',\n  description: '按HTML <video> 标签方式显示一个视频',\n  type: 'vanilla',\n  title: '视频',\n  order: 3,\n  width: 120,\n  height: 80,\n  props: [{\n    name: 'src',\n    label: '地址',\n    type: 'string'\n  }, {\n    name: 'autoplay',\n    label: '播放',\n    connect: true,\n    type: 'boolean'\n  }],\n  events: [],\n  methods: []\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlkZW8vaW5kZXguZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQjtBQUMzQixpRUFBZTtFQUNiQyxJQUFJLEVBQUUsT0FBTztFQUNiQyxTQUFTLEVBQUVGLDhDQUFLO0VBQ2hCRyxJQUFJLEVBQUUsaUJBQWlCO0VBQ3ZCQyxXQUFXLEVBQUUsMEJBQTBCO0VBQ3ZDQyxJQUFJLEVBQUUsU0FBUztFQUNmQyxLQUFLLEVBQUUsSUFBSTtFQUNYQyxLQUFLLEVBQUUsQ0FBQztFQUNSQyxLQUFLLEVBQUUsR0FBRztFQUNWQyxNQUFNLEVBQUUsRUFBRTtFQUNWQyxLQUFLLEVBQUUsQ0FBQztJQUNOVCxJQUFJLEVBQUUsS0FBSztJQUNYVSxLQUFLLEVBQUUsSUFBSTtJQUNYTixJQUFJLEVBQUU7RUFDUixDQUFDLEVBQUU7SUFDREosSUFBSSxFQUFFLFVBQVU7SUFDaEJVLEtBQUssRUFBRSxJQUFJO0lBQ1hDLE9BQU8sRUFBRSxJQUFJO0lBQ2JQLElBQUksRUFBRTtFQUNSLENBQUMsQ0FBQztFQUNGUSxNQUFNLEVBQUUsRUFBRTtFQUNWQyxPQUFPLEVBQUU7QUFDWCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2UtYmFzaWMvLi9zcmMvdmlkZW8vaW5kZXguZC5qcz9hNTAzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWRlbyBmcm9tICcuL1ZpZGVvJ1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ3ZpZGVvJyxcclxuICBjb21wb25lbnQ6IFZpZGVvLFxyXG4gIGljb246ICdpY29ucy92aWRlby5zdmcnLFxyXG4gIGRlc2NyaXB0aW9uOiAn5oyJSFRNTCA8dmlkZW8+IOagh+etvuaWueW8j+aYvuekuuS4gOS4quinhumikScsXHJcbiAgdHlwZTogJ3ZhbmlsbGEnLFxyXG4gIHRpdGxlOiAn6KeG6aKRJyxcclxuICBvcmRlcjogMyxcclxuICB3aWR0aDogMTIwLFxyXG4gIGhlaWdodDogODAsXHJcbiAgcHJvcHM6IFt7XHJcbiAgICBuYW1lOiAnc3JjJyxcclxuICAgIGxhYmVsOiAn5Zyw5Z2AJyxcclxuICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ2F1dG9wbGF5JyxcclxuICAgIGxhYmVsOiAn5pKt5pS+JyxcclxuICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICB0eXBlOiAnYm9vbGVhbidcclxuICB9XSxcclxuICBldmVudHM6IFtdLFxyXG4gIG1ldGhvZHM6IFtdXHJcbn1cclxuIl0sIm5hbWVzIjpbIlZpZGVvIiwibmFtZSIsImNvbXBvbmVudCIsImljb24iLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJ0aXRsZSIsIm9yZGVyIiwid2lkdGgiLCJoZWlnaHQiLCJwcm9wcyIsImxhYmVsIiwiY29ubmVjdCIsImV2ZW50cyIsIm1ldGhvZHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/video/index.d.js\n");

/***/ }),

/***/ "../../core/tools/src/props.js":
/*!*************************************!*\
  !*** ../../core/tools/src/props.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   array: () => (/* binding */ array),\n/* harmony export */   boolean: () => (/* binding */ boolean),\n/* harmony export */   children: () => (/* binding */ children),\n/* harmony export */   classList: () => (/* binding */ classList),\n/* harmony export */   color: () => (/* binding */ color),\n/* harmony export */   event: () => (/* binding */ event),\n/* harmony export */   icon: () => (/* binding */ icon),\n/* harmony export */   image: () => (/* binding */ image),\n/* harmony export */   json: () => (/* binding */ json),\n/* harmony export */   number: () => (/* binding */ number),\n/* harmony export */   onChange: () => (/* binding */ onChange),\n/* harmony export */   onClick: () => (/* binding */ onClick),\n/* harmony export */   optionConfig: () => (/* binding */ optionConfig),\n/* harmony export */   radiogroup: () => (/* binding */ radiogroup),\n/* harmony export */   select: () => (/* binding */ select),\n/* harmony export */   slot: () => (/* binding */ slot),\n/* harmony export */   string: () => (/* binding */ string),\n/* harmony export */   value: () => (/* binding */ value)\n/* harmony export */ });\nconst boolean = (name = 'boolean', label = '布尔', defaultValue = true, connect = true) => {\n  return {\n    name,\n    label,\n    type: 'boolean',\n    width: '50%',\n    connect,\n    value: defaultValue\n  };\n};\nconst number = (name = 'number', label = '数字', defaultValue = 0, connect = true) => {\n  return {\n    name,\n    label,\n    type: 'number',\n    width: '50%',\n    connect,\n    value: defaultValue\n  };\n};\nconst icon = (name = 'icon', label = '图标') => {\n  return {\n    name,\n    label,\n    type: 'string',\n    control: 'icon'\n  };\n};\nconst string = (name = 'text', label = '文本', defaultValue = '文本', connect = true) => {\n  return {\n    name,\n    label,\n    type: 'string',\n    value: defaultValue,\n    connect\n  };\n};\nconst value = (type = 'string', label = '取值', value = '') => {\n  return {\n    name: 'value',\n    type,\n    label,\n    connect: true,\n    value\n  };\n};\nconst classList = (name = 'classList', label = '样式') => {\n  return {\n    name,\n    label,\n    type: 'style',\n    connect: true,\n    value: []\n  };\n};\nconst image = (name = 'src', label = '图片') => ({\n  name,\n  type: 'image',\n  label,\n  connect: true,\n  value: ''\n});\nconst mapOptionList = optionList => {\n  if (Array.isArray(optionList)) {\n    return optionList.map(item => {\n      if (typeof item === 'string') {\n        return {\n          label: item,\n          value: item\n        };\n      } else {\n        return item;\n      }\n    });\n  } else if (typeof optionList === 'string') {\n    const list = optionList.split(/[, ;]/);\n    return mapOptionList(list);\n  }\n};\nconst radiogroup = (name = 'radiogroup', label = '切换', optionList = [{\n  label: '大',\n  value: 'btn-lg'\n}, {\n  label: '正常',\n  value: 'btn-normal'\n}, {\n  label: '小',\n  value: 'btn-sm'\n}], value, connect = true) => {\n  var _optionList$;\n  return {\n    name,\n    label,\n    type: 'string',\n    control: 'radiogroup',\n    optionList: mapOptionList(optionList),\n    connect,\n    value: value == null ? (_optionList$ = optionList[0]) === null || _optionList$ === void 0 ? void 0 : _optionList$.value : value\n  };\n};\nconst select = (name = 'select', label = '选择', optionList = [{\n  label: '大',\n  value: 'btn-lg'\n}, {\n  label: '正常',\n  value: 'btn-normal'\n}], value, connect = true, required = true) => {\n  let list = [];\n  if (Array.isArray(optionList)) {\n    list = optionList.map(item => {\n      if (typeof item === 'string') {\n        return {\n          label: item,\n          value: item\n        };\n      } else {\n        return item;\n      }\n    });\n  }\n  return {\n    name,\n    label,\n    type: 'string',\n    control: 'select',\n    optionList: list,\n    required,\n    connect,\n    value\n  };\n};\nconst slot = (name = 'slot', label = '插槽') => {\n  return {\n    name,\n    label,\n    type: 'slot'\n  };\n};\nconst color = (name = 'color', label = '颜色', value = '') => {\n  return {\n    name,\n    label,\n    type: 'color',\n    value\n  };\n};\nconst onClick = {\n  label: '单击',\n  name: 'onClick'\n};\nconst onChange = {\n  label: '改变',\n  name: 'onChange'\n};\nconst event = (name, label) => {\n  return {\n    label,\n    name\n  };\n};\nconst children = {\n  name: 'children',\n  hidden: true,\n  type: 'children'\n};\nconst optionConfig = (name = 'options', label = '选项列表', value = [{\n  label: '选项1',\n  value: 'value1'\n}, {\n  label: '选项2',\n  value: 'value2'\n}]) => {\n  return {\n    name,\n    label,\n    value,\n    type: 'string',\n    connect: true,\n    control: () => __webpack_require__.e(/*! import() */ \"core_editor_control_OptionConfig_jsx\").then(__webpack_require__.bind(__webpack_require__, /*! ridgejs-editor/control/OptionConfig.jsx */ \"../../core/editor/control/OptionConfig.jsx\"))\n  };\n};\nconst json = (name = 'json', label = '对象', value = {}, connect = false) => {\n  return {\n    name,\n    label,\n    value,\n    connect,\n    type: 'object'\n  };\n};\nconst array = (name = 'array', label = '数组', value = []) => {\n  return {\n    name,\n    label,\n    value,\n    type: 'object'\n  };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cGFjazovL3JpZGdlLWJhc2ljLy4uLy4uL2NvcmUvdG9vbHMvc3JjL3Byb3BzLmpzPzExMzIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9vbGVhbiA9IChuYW1lID0gJ2Jvb2xlYW4nLCBsYWJlbCA9ICfluIPlsJQnLCBkZWZhdWx0VmFsdWUgPSB0cnVlLCBjb25uZWN0ID0gdHJ1ZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lLFxyXG4gICAgbGFiZWwsXHJcbiAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICB3aWR0aDogJzUwJScsXHJcbiAgICBjb25uZWN0LFxyXG4gICAgdmFsdWU6IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbnVtYmVyID0gKG5hbWUgPSAnbnVtYmVyJywgbGFiZWwgPSAn5pWw5a2XJywgZGVmYXVsdFZhbHVlID0gMCwgY29ubmVjdCA9IHRydWUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZSxcclxuICAgIGxhYmVsLFxyXG4gICAgdHlwZTogJ251bWJlcicsXHJcbiAgICB3aWR0aDogJzUwJScsXHJcbiAgICBjb25uZWN0LFxyXG4gICAgdmFsdWU6IGRlZmF1bHRWYWx1ZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaWNvbiA9IChuYW1lID0gJ2ljb24nLCBsYWJlbCA9ICflm77moIcnKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsYWJlbCxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgY29udHJvbDogJ2ljb24nXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzdHJpbmcgPSAobmFtZSA9ICd0ZXh0JywgbGFiZWwgPSAn5paH5pysJywgZGVmYXVsdFZhbHVlID0gJ+aWh+acrCcsIGNvbm5lY3QgPSB0cnVlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsYWJlbCxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgdmFsdWU6IGRlZmF1bHRWYWx1ZSxcclxuICAgIGNvbm5lY3RcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHZhbHVlID0gKHR5cGUgPSAnc3RyaW5nJywgbGFiZWwgPSAn5Y+W5YC8JywgdmFsdWUgPSAnJykgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAndmFsdWUnLFxyXG4gICAgdHlwZSxcclxuICAgIGxhYmVsLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIHZhbHVlXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBjbGFzc0xpc3QgPSAobmFtZSA9ICdjbGFzc0xpc3QnLCBsYWJlbCA9ICfmoLflvI8nKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsYWJlbCxcclxuICAgIHR5cGU6ICdzdHlsZScsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgdmFsdWU6IFtdXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbWFnZSA9IChuYW1lID0gJ3NyYycsIGxhYmVsID0gJ+WbvueJhycpID0+ICh7XHJcbiAgbmFtZSxcclxuICB0eXBlOiAnaW1hZ2UnLFxyXG4gIGxhYmVsLFxyXG4gIGNvbm5lY3Q6IHRydWUsXHJcbiAgdmFsdWU6ICcnXHJcbn0pXHJcblxyXG5jb25zdCBtYXBPcHRpb25MaXN0ID0gb3B0aW9uTGlzdCA9PiB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uTGlzdCkpIHtcclxuICAgIHJldHVybiBvcHRpb25MaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBsYWJlbDogaXRlbSxcclxuICAgICAgICAgIHZhbHVlOiBpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uTGlzdCA9PT0gJ3N0cmluZycpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBvcHRpb25MaXN0LnNwbGl0KC9bLCA7XS8pXHJcbiAgICByZXR1cm4gbWFwT3B0aW9uTGlzdChsaXN0KVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcmFkaW9ncm91cCA9IChuYW1lID0gJ3JhZGlvZ3JvdXAnLCBsYWJlbCA9ICfliIfmjaInLCBvcHRpb25MaXN0ID0gW3tcclxuICBsYWJlbDogJ+WkpycsXHJcbiAgdmFsdWU6ICdidG4tbGcnXHJcbn0sIHtcclxuICBsYWJlbDogJ+ato+W4uCcsXHJcbiAgdmFsdWU6ICdidG4tbm9ybWFsJ1xyXG59LCB7XHJcbiAgbGFiZWw6ICflsI8nLFxyXG4gIHZhbHVlOiAnYnRuLXNtJ1xyXG59XSwgdmFsdWUsIGNvbm5lY3QgPSB0cnVlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsYWJlbCxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgY29udHJvbDogJ3JhZGlvZ3JvdXAnLFxyXG4gICAgb3B0aW9uTGlzdDogbWFwT3B0aW9uTGlzdChvcHRpb25MaXN0KSxcclxuICAgIGNvbm5lY3QsXHJcbiAgICB2YWx1ZTogdmFsdWUgPT0gbnVsbCA/IG9wdGlvbkxpc3RbMF0/LnZhbHVlIDogdmFsdWVcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHNlbGVjdCA9IChuYW1lID0gJ3NlbGVjdCcsIGxhYmVsID0gJ+mAieaLqScsIG9wdGlvbkxpc3QgPSBbXHJcbiAge1xyXG4gICAgbGFiZWw6ICflpKcnLFxyXG4gICAgdmFsdWU6ICdidG4tbGcnXHJcbiAgfSwge1xyXG4gICAgbGFiZWw6ICfmraPluLgnLFxyXG4gICAgdmFsdWU6ICdidG4tbm9ybWFsJ1xyXG4gIH1cclxuXSwgdmFsdWUsIGNvbm5lY3QgPSB0cnVlLCByZXF1aXJlZCA9IHRydWUpID0+IHtcclxuICBsZXQgbGlzdCA9IFtdXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uTGlzdCkpIHtcclxuICAgIGxpc3QgPSBvcHRpb25MaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBsYWJlbDogaXRlbSxcclxuICAgICAgICAgIHZhbHVlOiBpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpdGVtXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZSxcclxuICAgIGxhYmVsLFxyXG4gICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICBjb250cm9sOiAnc2VsZWN0JyxcclxuICAgIG9wdGlvbkxpc3Q6IGxpc3QsXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGNvbm5lY3QsXHJcbiAgICB2YWx1ZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc2xvdCA9IChuYW1lID0gJ3Nsb3QnLCBsYWJlbCA9ICfmj5Lmp70nKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsYWJlbCxcclxuICAgIHR5cGU6ICdzbG90J1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY29sb3IgPSAobmFtZSA9ICdjb2xvcicsIGxhYmVsID0gJ+minOiJsicsIHZhbHVlID0gJycpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZSxcclxuICAgIGxhYmVsLFxyXG4gICAgdHlwZTogJ2NvbG9yJyxcclxuICAgIHZhbHVlXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvbkNsaWNrID0ge1xyXG4gIGxhYmVsOiAn5Y2V5Ye7JyxcclxuICBuYW1lOiAnb25DbGljaydcclxufVxyXG5jb25zdCBvbkNoYW5nZSA9IHtcclxuICBsYWJlbDogJ+aUueWPmCcsXHJcbiAgbmFtZTogJ29uQ2hhbmdlJ1xyXG59XHJcblxyXG5jb25zdCBldmVudCA9IChuYW1lLCBsYWJlbCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBsYWJlbCwgbmFtZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY2hpbGRyZW4gPSB7XHJcbiAgbmFtZTogJ2NoaWxkcmVuJyxcclxuICBoaWRkZW46IHRydWUsXHJcbiAgdHlwZTogJ2NoaWxkcmVuJ1xyXG59XHJcblxyXG5jb25zdCBvcHRpb25Db25maWcgPSAobmFtZSA9ICdvcHRpb25zJywgbGFiZWwgPSAn6YCJ6aG55YiX6KGoJywgdmFsdWUgPSBbe1xyXG4gIGxhYmVsOiAn6YCJ6aG5MScsXHJcbiAgdmFsdWU6ICd2YWx1ZTEnXHJcbn0sIHtcclxuICBsYWJlbDogJ+mAiemhuTInLFxyXG4gIHZhbHVlOiAndmFsdWUyJ1xyXG59XSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lLFxyXG4gICAgbGFiZWwsXHJcbiAgICB2YWx1ZSxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIGNvbnRyb2w6ICgpID0+IGltcG9ydCgncmlkZ2Vqcy1lZGl0b3IvY29udHJvbC9PcHRpb25Db25maWcuanN4JylcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGpzb24gPSAobmFtZSA9ICdqc29uJywgbGFiZWwgPSAn5a+56LGhJywgdmFsdWUgPSB7fSwgY29ubmVjdCA9IGZhbHNlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsYWJlbCxcclxuICAgIHZhbHVlLFxyXG4gICAgY29ubmVjdCxcclxuICAgIHR5cGU6ICdvYmplY3QnXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBhcnJheSA9IChuYW1lID0gJ2FycmF5JywgbGFiZWwgPSAn5pWw57uEJywgdmFsdWUgPSBbXSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lLFxyXG4gICAgbGFiZWwsXHJcbiAgICB2YWx1ZSxcclxuICAgIHR5cGU6ICdvYmplY3QnXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBib29sZWFuLCBpbWFnZSwgbnVtYmVyLCB2YWx1ZSwgc3RyaW5nLCBqc29uLCBzZWxlY3QsIGFycmF5LCBpY29uLCBjb2xvciwgY2hpbGRyZW4sIGNsYXNzTGlzdCwgcmFkaW9ncm91cCwgb3B0aW9uQ29uZmlnLCBzbG90LCBvbkNsaWNrLCBvbkNoYW5nZSwgZXZlbnQgfVxyXG4iXSwibmFtZXMiOlsiYm9vbGVhbiIsIm5hbWUiLCJsYWJlbCIsImRlZmF1bHRWYWx1ZSIsImNvbm5lY3QiLCJ0eXBlIiwid2lkdGgiLCJ2YWx1ZSIsIm51bWJlciIsImljb24iLCJjb250cm9sIiwic3RyaW5nIiwiY2xhc3NMaXN0IiwiaW1hZ2UiLCJtYXBPcHRpb25MaXN0Iiwib3B0aW9uTGlzdCIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsIml0ZW0iLCJsaXN0Iiwic3BsaXQiLCJyYWRpb2dyb3VwIiwiX29wdGlvbkxpc3QkIiwic2VsZWN0IiwicmVxdWlyZWQiLCJzbG90IiwiY29sb3IiLCJvbkNsaWNrIiwib25DaGFuZ2UiLCJldmVudCIsImNoaWxkcmVuIiwiaGlkZGVuIiwib3B0aW9uQ29uZmlnIiwianNvbiIsImFycmF5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../core/tools/src/props.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = (function() { return this["React"]; }());

/***/ }),

/***/ "ridgejs":
/*!****************************!*\
  !*** external "RidgeCore" ***!
  \****************************/
/***/ ((module) => {

module.exports = (function() { return this["RidgeCore"]; }());

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".ridge.dist.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "ridge-basic:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkridge_basic"] = globalThis["webpackChunkridge_basic"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./concat.js");
/******/ 	this["ridge-basic"] = __webpack_exports__;
/******/ 	
/******/ })()
;