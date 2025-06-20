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

/***/ "./src/browser/Browser.js":
/*!********************************!*\
  !*** ./src/browser/Browser.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  state: () => {\n    return {};\n  },\n  computed: {},\n  async setup() {},\n  exit() {},\n  watch: {},\n  actions: {\n    windowOpen(url) {\n      window.open(url);\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYnJvd3Nlci9Ccm93c2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZTtFQUNiQSxLQUFLLEVBQUVBLENBQUEsS0FBTTtJQUNYLE9BQU8sQ0FBQyxDQUFDO0VBQ1gsQ0FBQztFQUVEQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0VBRVosTUFBTUMsS0FBS0EsQ0FBQSxFQUFJLENBQUMsQ0FBQztFQUVqQkMsSUFBSUEsQ0FBQSxFQUFJLENBQUMsQ0FBQztFQUVWQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0VBRVRDLE9BQU8sRUFBRTtJQUNQQyxVQUFVQSxDQUFFQyxHQUFHLEVBQUU7TUFDZkMsTUFBTSxDQUFDQyxJQUFJLENBQUNGLEdBQUcsQ0FBQztJQUNsQjtFQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLXNhbXBsZS1zdG9yZS8vLi9zcmMvYnJvd3Nlci9Ccm93c2VyLmpzPzM1ZjkiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gIHN0YXRlOiAoKSA9PiB7XHJcbiAgICByZXR1cm4ge31cclxuICB9LFxyXG5cclxuICBjb21wdXRlZDoge30sXHJcblxyXG4gIGFzeW5jIHNldHVwICgpIHt9LFxyXG5cclxuICBleGl0ICgpIHt9LFxyXG5cclxuICB3YXRjaDoge30sXHJcblxyXG4gIGFjdGlvbnM6IHtcclxuICAgIHdpbmRvd09wZW4gKHVybCkge1xyXG4gICAgICB3aW5kb3cub3Blbih1cmwpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJzdGF0ZSIsImNvbXB1dGVkIiwic2V0dXAiLCJleGl0Iiwid2F0Y2giLCJhY3Rpb25zIiwid2luZG93T3BlbiIsInVybCIsIndpbmRvdyIsIm9wZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/browser/Browser.js\n");

/***/ }),

/***/ "./src/browser/index.d.js":
/*!********************************!*\
  !*** ./src/browser/index.d.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Browser */ \"./src/browser/Browser.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'Browser',\n  icon: 'bi bi-browser-chrome',\n  title: '浏览器',\n  type: 'store',\n  component: _Browser__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  props: [],\n  width: 100,\n  height: 36\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYnJvd3Nlci9pbmRleC5kLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQStCO0FBRS9CLGlFQUFlO0VBQ2JDLElBQUksRUFBRSxTQUFTO0VBQ2ZDLElBQUksRUFBRSxzQkFBc0I7RUFDNUJDLEtBQUssRUFBRSxLQUFLO0VBQ1pDLElBQUksRUFBRSxPQUFPO0VBQ2JDLFNBQVMsRUFBRUwsZ0RBQU87RUFDbEJNLEtBQUssRUFBRSxFQUFFO0VBQ1RDLEtBQUssRUFBRSxHQUFHO0VBQ1ZDLE1BQU0sRUFBRTtBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yaWRnZS1zYW1wbGUtc3RvcmUvLy4vc3JjL2Jyb3dzZXIvaW5kZXguZC5qcz8zYTYxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCcm93c2VyIGZyb20gJy4vQnJvd3NlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnQnJvd3NlcicsXHJcbiAgaWNvbjogJ2JpIGJpLWJyb3dzZXItY2hyb21lJyxcclxuICB0aXRsZTogJ+a1j+iniOWZqCcsXHJcbiAgdHlwZTogJ3N0b3JlJyxcclxuICBjb21wb25lbnQ6IEJyb3dzZXIsXHJcbiAgcHJvcHM6IFtdLFxyXG4gIHdpZHRoOiAxMDAsXHJcbiAgaGVpZ2h0OiAzNlxyXG59XHJcbiJdLCJuYW1lcyI6WyJCcm93c2VyIiwibmFtZSIsImljb24iLCJ0aXRsZSIsInR5cGUiLCJjb21wb25lbnQiLCJwcm9wcyIsIndpZHRoIiwiaGVpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/browser/index.d.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/browser/index.d.js");
/******/ 	this["ridge-sample-store/browser"] = __webpack_exports__;
/******/ 	
/******/ })()
;