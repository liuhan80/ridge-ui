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

/***/ "./src/weather-data/WeatherStore.js":
/*!******************************************!*\
  !*** ./src/weather-data/WeatherStore.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  state: ({\n    location\n  }) => {\n    return {\n      location: location ?? 'Beijing',\n      last_updated_epoch: 1705019400,\n      last_updated: '--',\n      temp_c: -8.0,\n      temp_f: 17.6,\n      is_day: 1,\n      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',\n      text: 'Sunny',\n      wind_mph: 4.3,\n      wind_kph: 6.8,\n      wind_degree: 360,\n      wind_dir: 'N',\n      pressure_mb: 1021.0,\n      pressure_in: 30.15,\n      precip_mm: 0.0,\n      precip_in: 0.0,\n      humidity: 79,\n      cloud: 0,\n      feelslike_c: -10.9,\n      feelslike_f: 12.4,\n      vis_km: 10.0,\n      vis_miles: 6.0,\n      uv: 2.0,\n      gust_mph: 6.0,\n      gust_kph: 9.6\n    };\n  },\n  setup() {\n    this.updateCurrentRealtime();\n    this.debounceUpdate = lodash__WEBPACK_IMPORTED_MODULE_1___default().debounce(this.updateCurrentRealtime, 500);\n    this.timer = setTimeout(() => {\n      this.updateCurrentRealtime();\n    }, 60 * 60 * 1000);\n  },\n  exit() {\n    window.clearTimeout(this.timer);\n  },\n  watch: {\n    location() {\n      this.debounceUpdate();\n    }\n  },\n  actions: {\n    // 获取实时天气\n    async updateCurrentRealtime() {\n      if (this.state.location && this.properties.token) {\n        try {\n          const result = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`//api.weatherapi.com/v1/current.json?q=${this.state.location}&aqi=no&key=${this.properties.token}&lang=zh`);\n          Object.assign(this.state, result.data.current);\n          this.state.temp_c = this.state.temp_c + '°';\n          Object.assign(this.state, result.data.current.condition);\n          console.log(result);\n        } catch (e) {}\n      }\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YW1wbGUtc3RvcmUvLy4vc3JjL3dlYXRoZXItZGF0YS9XZWF0aGVyU3RvcmUuanM/NDgyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzdGF0ZTogKHsgbG9jYXRpb24gfSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9jYXRpb246IGxvY2F0aW9uID8/ICdCZWlqaW5nJyxcclxuICAgICAgbGFzdF91cGRhdGVkX2Vwb2NoOiAxNzA1MDE5NDAwLFxyXG4gICAgICBsYXN0X3VwZGF0ZWQ6ICctLScsXHJcbiAgICAgIHRlbXBfYzogLTguMCxcclxuICAgICAgdGVtcF9mOiAxNy42LFxyXG4gICAgICBpc19kYXk6IDEsXHJcbiAgICAgIGljb246ICcvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L2RheS8xMTMucG5nJyxcclxuICAgICAgdGV4dDogJ1N1bm55JyxcclxuICAgICAgd2luZF9tcGg6IDQuMyxcclxuICAgICAgd2luZF9rcGg6IDYuOCxcclxuICAgICAgd2luZF9kZWdyZWU6IDM2MCxcclxuICAgICAgd2luZF9kaXI6ICdOJyxcclxuICAgICAgcHJlc3N1cmVfbWI6IDEwMjEuMCxcclxuICAgICAgcHJlc3N1cmVfaW46IDMwLjE1LFxyXG4gICAgICBwcmVjaXBfbW06IDAuMCxcclxuICAgICAgcHJlY2lwX2luOiAwLjAsXHJcbiAgICAgIGh1bWlkaXR5OiA3OSxcclxuICAgICAgY2xvdWQ6IDAsXHJcbiAgICAgIGZlZWxzbGlrZV9jOiAtMTAuOSxcclxuICAgICAgZmVlbHNsaWtlX2Y6IDEyLjQsXHJcbiAgICAgIHZpc19rbTogMTAuMCxcclxuICAgICAgdmlzX21pbGVzOiA2LjAsXHJcbiAgICAgIHV2OiAyLjAsXHJcbiAgICAgIGd1c3RfbXBoOiA2LjAsXHJcbiAgICAgIGd1c3Rfa3BoOiA5LjZcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzZXR1cCAoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRSZWFsdGltZSgpXHJcbiAgICB0aGlzLmRlYm91bmNlVXBkYXRlID0gXy5kZWJvdW5jZSh0aGlzLnVwZGF0ZUN1cnJlbnRSZWFsdGltZSwgNTAwKVxyXG5cclxuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50UmVhbHRpbWUoKVxyXG4gICAgfSwgNjAgKiA2MCAqIDEwMDApXHJcbiAgfSxcclxuXHJcbiAgZXhpdCAoKSB7XHJcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXHJcbiAgfSxcclxuXHJcbiAgd2F0Y2g6IHtcclxuICAgIGxvY2F0aW9uICgpIHtcclxuICAgICAgdGhpcy5kZWJvdW5jZVVwZGF0ZSgpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWN0aW9uczoge1xyXG4gICAgLy8g6I635Y+W5a6e5pe25aSp5rCUXHJcbiAgICBhc3luYyB1cGRhdGVDdXJyZW50UmVhbHRpbWUgKCkge1xyXG4gICAgICBpZiAodGhpcy5zdGF0ZS5sb2NhdGlvbiAmJiB0aGlzLnByb3BlcnRpZXMudG9rZW4pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3MuZ2V0KGAvL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/cT0ke3RoaXMuc3RhdGUubG9jYXRpb259JmFxaT1ubyZrZXk9JHt0aGlzLnByb3BlcnRpZXMudG9rZW59Jmxhbmc9emhgKVxyXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLCByZXN1bHQuZGF0YS5jdXJyZW50KVxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS50ZW1wX2MgPSB0aGlzLnN0YXRlLnRlbXBfYyArICfCsCdcclxuICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgcmVzdWx0LmRhdGEuY3VycmVudC5jb25kaXRpb24pXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiXyIsInN0YXRlIiwibG9jYXRpb24iLCJsYXN0X3VwZGF0ZWRfZXBvY2giLCJsYXN0X3VwZGF0ZWQiLCJ0ZW1wX2MiLCJ0ZW1wX2YiLCJpc19kYXkiLCJpY29uIiwidGV4dCIsIndpbmRfbXBoIiwid2luZF9rcGgiLCJ3aW5kX2RlZ3JlZSIsIndpbmRfZGlyIiwicHJlc3N1cmVfbWIiLCJwcmVzc3VyZV9pbiIsInByZWNpcF9tbSIsInByZWNpcF9pbiIsImh1bWlkaXR5IiwiY2xvdWQiLCJmZWVsc2xpa2VfYyIsImZlZWxzbGlrZV9mIiwidmlzX2ttIiwidmlzX21pbGVzIiwidXYiLCJndXN0X21waCIsImd1c3Rfa3BoIiwic2V0dXAiLCJ1cGRhdGVDdXJyZW50UmVhbHRpbWUiLCJkZWJvdW5jZVVwZGF0ZSIsImRlYm91bmNlIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiZXhpdCIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsIndhdGNoIiwiYWN0aW9ucyIsInByb3BlcnRpZXMiLCJ0b2tlbiIsInJlc3VsdCIsImdldCIsIk9iamVjdCIsImFzc2lnbiIsImRhdGEiLCJjdXJyZW50IiwiY29uZGl0aW9uIiwiY29uc29sZSIsImxvZyIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/weather-data/WeatherStore.js\n");

/***/ }),

/***/ "./src/weather-data/index.d.js":
/*!*************************************!*\
  !*** ./src/weather-data/index.d.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _WeatherStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeatherStore */ \"./src/weather-data/WeatherStore.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'WeatherData',\n  icon: 'bi bi-cloud-sun',\n  title: '天气数据',\n  type: 'store',\n  component: _WeatherStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  props: [{\n    name: 'location',\n    label: '城市/位置',\n    connect: true,\n    type: 'string'\n  }, {\n    name: 'token',\n    label: 'API Token',\n    type: 'string',\n    value: '6cfe4cf6818d420581703248241201'\n  }]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvd2VhdGhlci1kYXRhL2luZGV4LmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBeUM7QUFFekMsaUVBQWU7RUFDYkMsSUFBSSxFQUFFLGFBQWE7RUFDbkJDLElBQUksRUFBRSxpQkFBaUI7RUFDdkJDLEtBQUssRUFBRSxNQUFNO0VBQ2JDLElBQUksRUFBRSxPQUFPO0VBQ2JDLFNBQVMsRUFBRUwscURBQVk7RUFDdkJNLEtBQUssRUFBRSxDQUFDO0lBQ05MLElBQUksRUFBRSxVQUFVO0lBQ2hCTSxLQUFLLEVBQUUsT0FBTztJQUNkQyxPQUFPLEVBQUUsSUFBSTtJQUNiSixJQUFJLEVBQUU7RUFDUixDQUFDLEVBQUU7SUFDREgsSUFBSSxFQUFFLE9BQU87SUFDYk0sS0FBSyxFQUFFLFdBQVc7SUFDbEJILElBQUksRUFBRSxRQUFRO0lBQ2RLLEtBQUssRUFBRTtFQUNULENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2Utc2FtcGxlLXN0b3JlLy8uL3NyYy93ZWF0aGVyLWRhdGEvaW5kZXguZC5qcz8xM2E2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWF0aGVyU3RvcmUgZnJvbSAnLi9XZWF0aGVyU3RvcmUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ1dlYXRoZXJEYXRhJyxcclxuICBpY29uOiAnYmkgYmktY2xvdWQtc3VuJyxcclxuICB0aXRsZTogJ+WkqeawlOaVsOaNricsXHJcbiAgdHlwZTogJ3N0b3JlJyxcclxuICBjb21wb25lbnQ6IFdlYXRoZXJTdG9yZSxcclxuICBwcm9wczogW3tcclxuICAgIG5hbWU6ICdsb2NhdGlvbicsXHJcbiAgICBsYWJlbDogJ+WfjuW4gi/kvY3nva4nLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ3Rva2VuJyxcclxuICAgIGxhYmVsOiAnQVBJIFRva2VuJyxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgdmFsdWU6ICc2Y2ZlNGNmNjgxOGQ0MjA1ODE3MDMyNDgyNDEyMDEnXHJcbiAgfV1cclxufVxyXG4iXSwibmFtZXMiOlsiV2VhdGhlclN0b3JlIiwibmFtZSIsImljb24iLCJ0aXRsZSIsInR5cGUiLCJjb21wb25lbnQiLCJwcm9wcyIsImxhYmVsIiwiY29ubmVjdCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/weather-data/index.d.js\n");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/***/ ((module) => {

module.exports = (function() { return this["_"]; }());

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = (function() { return this["axios"]; }());

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/weather-data/index.d.js");
/******/ 	this["ridge-sample-store/weather-data"] = __webpack_exports__;
/******/ 	
/******/ })()
;