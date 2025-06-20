/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base/HTMLComponent.js":
/*!***********************************!*\
  !*** ./src/base/HTMLComponent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HTMLComponent)\n/* harmony export */ });\nclass HTMLComponent {\n  constructor(props) {\n    this.props = props;\n  }\n  random(length = 8) {\n    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';\n    let str = '';\n    for (let i = 0; i < length; i++) {\n      str += chars.charAt(Math.floor(Math.random() * chars.length));\n    }\n    return str;\n  }\n  mounted() {}\n  updateRuntime() {}\n  innerHTML(props) {\n    return /*#__PURE__*/React.createElement(\"div\", null, \"Should Extend innerHTML\");\n  }\n  mount(el) {\n    if (el) this.el = el;\n    this.el.innerHTML = this.innerHTML(this.props);\n    this.mounted();\n  }\n  update(props) {\n    this.props = props;\n    if (this.props.__mode === 'edit') {\n      this.mount();\n    } else {\n      if (this.runtimeUpdate) {\n        this.runtimeUpdate();\n      } else {\n        this.mount();\n      }\n    }\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFzZS9IVE1MQ29tcG9uZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxNQUFNQSxhQUFhLENBQUM7RUFDakNDLFdBQVdBLENBQUVDLEtBQUssRUFBRTtJQUNsQixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztFQUNwQjtFQUVBQyxNQUFNQSxDQUFFQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ2xCLE1BQU1DLEtBQUssR0FBRyxzREFBc0Q7SUFFcEUsSUFBSUMsR0FBRyxHQUFHLEVBQUU7SUFDWixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0gsTUFBTSxFQUFFRyxDQUFDLEVBQUUsRUFBRTtNQUMvQkQsR0FBRyxJQUFJRCxLQUFLLENBQUNHLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ04sTUFBTSxDQUFDLENBQUMsR0FBR0UsS0FBSyxDQUFDRCxNQUFNLENBQUMsQ0FBQztJQUMvRDtJQUNBLE9BQU9FLEdBQUc7RUFDWjtFQUVBSyxPQUFPQSxDQUFBLEVBQUksQ0FBQztFQUNaQyxhQUFhQSxDQUFBLEVBQUksQ0FBQztFQUNsQkMsU0FBU0EsQ0FBRVgsS0FBSyxFQUFFO0lBQ2hCLG9CQUFPWSxLQUFBLENBQUFDLGFBQUEsY0FBSyx5QkFBNEIsQ0FBQztFQUMzQztFQUVBQyxLQUFLQSxDQUFFQyxFQUFFLEVBQUU7SUFDVCxJQUFJQSxFQUFFLEVBQUUsSUFBSSxDQUFDQSxFQUFFLEdBQUdBLEVBQUU7SUFFcEIsSUFBSSxDQUFDQSxFQUFFLENBQUNKLFNBQVMsR0FBRyxJQUFJLENBQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUNYLEtBQUssQ0FBQztJQUM5QyxJQUFJLENBQUNTLE9BQU8sQ0FBQyxDQUFDO0VBQ2hCO0VBRUFPLE1BQU1BLENBQUVoQixLQUFLLEVBQUU7SUFDYixJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLElBQUksQ0FBQ0EsS0FBSyxDQUFDaUIsTUFBTSxLQUFLLE1BQU0sRUFBRTtNQUNoQyxJQUFJLENBQUNILEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxNQUFNO01BQ0wsSUFBSSxJQUFJLENBQUNJLGFBQWEsRUFBRTtRQUN0QixJQUFJLENBQUNBLGFBQWEsQ0FBQyxDQUFDO01BQ3RCLENBQUMsTUFBTTtRQUNMLElBQUksQ0FBQ0osS0FBSyxDQUFDLENBQUM7TUFDZDtJQUNGO0VBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWJ1bG1hLy8uL3NyYy9iYXNlL0hUTUxDb21wb25lbnQuanM/MDZiNSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wc1xyXG4gIH1cclxuXHJcbiAgcmFuZG9tIChsZW5ndGggPSA4KSB7XHJcbiAgICBjb25zdCBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xyXG5cclxuICAgIGxldCBzdHIgPSAnJ1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBzdHIgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyXHJcbiAgfVxyXG5cclxuICBtb3VudGVkICgpIHt9XHJcbiAgdXBkYXRlUnVudGltZSAoKSB7fVxyXG4gIGlubmVySFRNTCAocHJvcHMpIHtcclxuICAgIHJldHVybiA8ZGl2PlNob3VsZCBFeHRlbmQgaW5uZXJIVE1MPC9kaXY+XHJcbiAgfVxyXG5cclxuICBtb3VudCAoZWwpIHtcclxuICAgIGlmIChlbCkgdGhpcy5lbCA9IGVsXHJcblxyXG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTCh0aGlzLnByb3BzKVxyXG4gICAgdGhpcy5tb3VudGVkKClcclxuICB9XHJcblxyXG4gIHVwZGF0ZSAocHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wc1xyXG4gICAgaWYgKHRoaXMucHJvcHMuX19tb2RlID09PSAnZWRpdCcpIHtcclxuICAgICAgdGhpcy5tb3VudCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5ydW50aW1lVXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lVXBkYXRlKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdW50KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiSFRNTENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJyYW5kb20iLCJsZW5ndGgiLCJjaGFycyIsInN0ciIsImkiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJtb3VudGVkIiwidXBkYXRlUnVudGltZSIsImlubmVySFRNTCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIm1vdW50IiwiZWwiLCJ1cGRhdGUiLCJfX21vZGUiLCJydW50aW1lVXBkYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/base/HTMLComponent.js\n");

/***/ }),

/***/ "./src/text/Text.js":
/*!**************************!*\
  !*** ./src/text/Text.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Button)\n/* harmony export */ });\n/* harmony import */ var _base_HTMLComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/HTMLComponent */ \"./src/base/HTMLComponent.js\");\n\nclass Button extends _base_HTMLComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  innerHTML({\n    text\n  }) {\n    return `<div style=\"width:100%; height: 100%;\" class=\"text\">\n      ${text == null ? '' : text}\n    </div>`;\n  }\n  mounted() {\n    Object.assign(this.el.querySelector('div.text').style, this.props.fontStyle, {\n      padding: this.props.padding\n    });\n  }\n  updated() {\n    Object.assign(this.el.querySelector('div.text').style, this.props.fontStyle, {\n      padding: this.props.padding\n    });\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dC9UZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWlEO0FBQ2xDLE1BQU1DLE1BQU0sU0FBU0QsMkRBQWEsQ0FBQztFQUNoREUsU0FBU0EsQ0FBRTtJQUNUQztFQUNGLENBQUMsRUFBRTtJQUNELE9BQVE7QUFDWixRQUFRQSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBR0EsSUFBSztBQUNqQyxXQUFXO0VBQ1Q7RUFFQUMsT0FBT0EsQ0FBQSxFQUFJO0lBQ1RDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ0MsRUFBRSxDQUFDQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUNDLEtBQUssRUFBRSxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsU0FBUyxFQUFFO01BQzNFQyxPQUFPLEVBQUUsSUFBSSxDQUFDRixLQUFLLENBQUNFO0lBQ3RCLENBQUMsQ0FBQztFQUNKO0VBRUFDLE9BQU9BLENBQUEsRUFBSTtJQUNUUixNQUFNLENBQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUNDLEVBQUUsQ0FBQ0MsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDQyxLQUFLLEVBQUUsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFNBQVMsRUFBRTtNQUMzRUMsT0FBTyxFQUFFLElBQUksQ0FBQ0YsS0FBSyxDQUFDRTtJQUN0QixDQUFDLENBQUM7RUFDSjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2UtYnVsbWEvLy4vc3JjL3RleHQvVGV4dC5qcz8yYTBlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIVE1MQ29tcG9uZW50IGZyb20gJy4uL2Jhc2UvSFRNTENvbXBvbmVudCdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgSFRNTENvbXBvbmVudCB7XHJcbiAgaW5uZXJIVE1MICh7XHJcbiAgICB0ZXh0XHJcbiAgfSkge1xyXG4gICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTsgaGVpZ2h0OiAxMDAlO1wiIGNsYXNzPVwidGV4dFwiPlxyXG4gICAgICAke3RleHQgPT0gbnVsbCA/ICcnIDogdGV4dH1cclxuICAgIDwvZGl2PmBcclxuICB9XHJcblxyXG4gIG1vdW50ZWQgKCkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi50ZXh0Jykuc3R5bGUsIHRoaXMucHJvcHMuZm9udFN0eWxlLCB7XHJcbiAgICAgIHBhZGRpbmc6IHRoaXMucHJvcHMucGFkZGluZ1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHVwZGF0ZWQgKCkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi50ZXh0Jykuc3R5bGUsIHRoaXMucHJvcHMuZm9udFN0eWxlLCB7XHJcbiAgICAgIHBhZGRpbmc6IHRoaXMucHJvcHMucGFkZGluZ1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkhUTUxDb21wb25lbnQiLCJCdXR0b24iLCJpbm5lckhUTUwiLCJ0ZXh0IiwibW91bnRlZCIsIk9iamVjdCIsImFzc2lnbiIsImVsIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwicHJvcHMiLCJmb250U3R5bGUiLCJwYWRkaW5nIiwidXBkYXRlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/text/Text.js\n");

/***/ }),

/***/ "./src/text/index.d.js":
/*!*****************************!*\
  !*** ./src/text/index.d.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text */ \"./src/text/Text.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'text',\n  title: '文本',\n  component: _Text__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'IconTextRectangle',\n  type: 'vanilla',\n  props: [{\n    name: 'text',\n    label: '内容',\n    connect: true,\n    type: 'string',\n    value: '文字'\n  }, {\n    name: 'fontStyle',\n    label: '样式',\n    type: 'font',\n    value: {}\n  }],\n  events: [],\n  width: 160,\n  height: 32\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dC9pbmRleC5kLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXlCO0FBQ3pCLGlFQUFlO0VBQ2JDLElBQUksRUFBRSxNQUFNO0VBQ1pDLEtBQUssRUFBRSxJQUFJO0VBQ1hDLFNBQVMsRUFBRUgsNkNBQUk7RUFDZkksSUFBSSxFQUFFLG1CQUFtQjtFQUN6QkMsSUFBSSxFQUFFLFNBQVM7RUFDZkMsS0FBSyxFQUFFLENBQUM7SUFDTkwsSUFBSSxFQUFFLE1BQU07SUFDWk0sS0FBSyxFQUFFLElBQUk7SUFDWEMsT0FBTyxFQUFFLElBQUk7SUFDYkgsSUFBSSxFQUFFLFFBQVE7SUFDZEksS0FBSyxFQUFFO0VBQ1QsQ0FBQyxFQUFFO0lBQ0RSLElBQUksRUFBRSxXQUFXO0lBQ2pCTSxLQUFLLEVBQUUsSUFBSTtJQUNYRixJQUFJLEVBQUUsTUFBTTtJQUNaSSxLQUFLLEVBQUUsQ0FBQztFQUNWLENBQUMsQ0FBQztFQUNGQyxNQUFNLEVBQUUsRUFBRTtFQUNWQyxLQUFLLEVBQUUsR0FBRztFQUNWQyxNQUFNLEVBQUU7QUFDVixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2UtYnVsbWEvLy4vc3JjL3RleHQvaW5kZXguZC5qcz9mZjk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0IGZyb20gJy4vVGV4dCdcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICd0ZXh0JyxcclxuICB0aXRsZTogJ+aWh+acrCcsXHJcbiAgY29tcG9uZW50OiBUZXh0LFxyXG4gIGljb246ICdJY29uVGV4dFJlY3RhbmdsZScsXHJcbiAgdHlwZTogJ3ZhbmlsbGEnLFxyXG4gIHByb3BzOiBbe1xyXG4gICAgbmFtZTogJ3RleHQnLFxyXG4gICAgbGFiZWw6ICflhoXlrrknLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgdmFsdWU6ICfmloflrZcnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ2ZvbnRTdHlsZScsXHJcbiAgICBsYWJlbDogJ+agt+W8jycsXHJcbiAgICB0eXBlOiAnZm9udCcsXHJcbiAgICB2YWx1ZToge31cclxuICB9XSxcclxuICBldmVudHM6IFtdLFxyXG4gIHdpZHRoOiAxNjAsXHJcbiAgaGVpZ2h0OiAzMlxyXG59XHJcbiJdLCJuYW1lcyI6WyJUZXh0IiwibmFtZSIsInRpdGxlIiwiY29tcG9uZW50IiwiaWNvbiIsInR5cGUiLCJwcm9wcyIsImxhYmVsIiwiY29ubmVjdCIsInZhbHVlIiwiZXZlbnRzIiwid2lkdGgiLCJoZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/text/index.d.js\n");

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
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/text/index.d.js");
/******/ 	this["ridge-bulma/text"] = __webpack_exports__;
/******/ 	
/******/ })()
;