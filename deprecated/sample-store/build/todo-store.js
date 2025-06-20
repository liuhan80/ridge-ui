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

/***/ "./src/todo-store/TodoStore.js":
/*!*************************************!*\
  !*** ./src/todo-store/TodoStore.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  state: () => {\n    return {\n      todoText: '',\n      todoInvalid: false,\n      todoList: []\n    };\n  },\n  computed: {\n    finishedTodoList: {\n      get: state => {\n        return state.todoList.filter(todo => todo.finished);\n      },\n      dependencies: ['todoList']\n    },\n    activeTodoList: {\n      get: state => {\n        return state.todoList.filter(todo => !todo.finished);\n      },\n      dependencies: ['todoList']\n    },\n    // scoped computed value\n    todoItemText: (state, scope) => {\n      var _scope$item;\n      return scope === null || scope === void 0 ? void 0 : (_scope$item = scope.item) === null || _scope$item === void 0 ? void 0 : _scope$item.text;\n    },\n    todoItemFinished: {\n      set: (val, state, scope) => {\n        scope.item.finished = val;\n      },\n      get: (state, scope) => {\n        var _scope$item2;\n        return scope === null || scope === void 0 ? void 0 : (_scope$item2 = scope.item) === null || _scope$item2 === void 0 ? void 0 : _scope$item2.finished;\n      }\n    }\n  },\n  setup() {\n    if (window.localStorage.ridge_todo_sample_data) {\n      this.state.todoList = JSON.parse(window.localStorage.ridge_todo_sample_data);\n    }\n  },\n  exit() {},\n  watch: {\n    todoText(val) {\n      if (val !== '') {\n        this.state.todoInvalid = false;\n      }\n    }\n  },\n  actions: {\n    addTodo() {\n      if (this.state.todoText !== '') {\n        this.state.todoList.push({\n          text: this.state.todoText,\n          finished: false\n        });\n        this.state.todoText = '';\n      } else {\n        this.state.todoInvalid = true;\n      }\n    },\n    removeTodo(p, context) {\n      this.state.todoList = this.state.todoList.filter(todo => todo !== context.scope.item);\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDSCxLQUFLLENBQUNHLFFBQVEsQ0FBQ0ksTUFBTSxDQUFDQyxJQUFJLElBQUlBLElBQUksS0FBSzBCLE9BQU8sQ0FBQ3JCLEtBQUssQ0FBQ0UsSUFBSSxDQUFDO0lBQ3ZGO0VBQ0Y7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2Utc2FtcGxlLXN0b3JlLy8uL3NyYy90b2RvLXN0b3JlL1RvZG9TdG9yZS5qcz9iMTk2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBzdGF0ZTogKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdG9kb1RleHQ6ICcnLFxyXG4gICAgICB0b2RvSW52YWxpZDogZmFsc2UsXHJcbiAgICAgIHRvZG9MaXN0OiBbXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBmaW5pc2hlZFRvZG9MaXN0OiB7XHJcbiAgICAgIGdldDogc3RhdGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS50b2RvTGlzdC5maWx0ZXIodG9kbyA9PiB0b2RvLmZpbmlzaGVkKVxyXG4gICAgICB9LFxyXG4gICAgICBkZXBlbmRlbmNpZXM6IFsndG9kb0xpc3QnXVxyXG4gICAgfSxcclxuICAgIGFjdGl2ZVRvZG9MaXN0OiB7XHJcbiAgICAgIGdldDogc3RhdGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS50b2RvTGlzdC5maWx0ZXIodG9kbyA9PiAhdG9kby5maW5pc2hlZClcclxuICAgICAgfSxcclxuICAgICAgZGVwZW5kZW5jaWVzOiBbJ3RvZG9MaXN0J11cclxuICAgIH0sXHJcbiAgICAvLyBzY29wZWQgY29tcHV0ZWQgdmFsdWVcclxuICAgIHRvZG9JdGVtVGV4dDogKHN0YXRlLCBzY29wZSkgPT4ge1xyXG4gICAgICByZXR1cm4gc2NvcGU/Lml0ZW0/LnRleHRcclxuICAgIH0sXHJcbiAgICB0b2RvSXRlbUZpbmlzaGVkOiB7XHJcbiAgICAgIHNldDogKHZhbCwgc3RhdGUsIHNjb3BlKSA9PiB7XHJcbiAgICAgICAgc2NvcGUuaXRlbS5maW5pc2hlZCA9IHZhbFxyXG4gICAgICB9LFxyXG4gICAgICBnZXQ6IChzdGF0ZSwgc2NvcGUpID0+IHtcclxuICAgICAgICByZXR1cm4gc2NvcGU/Lml0ZW0/LmZpbmlzaGVkXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzZXR1cCAoKSB7XHJcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5yaWRnZV90b2RvX3NhbXBsZV9kYXRhKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUudG9kb0xpc3QgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UucmlkZ2VfdG9kb19zYW1wbGVfZGF0YSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleGl0ICgpIHt9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICB0b2RvVGV4dCAodmFsKSB7XHJcbiAgICAgIGlmICh2YWwgIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS50b2RvSW52YWxpZCA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhY3Rpb25zOiB7XHJcbiAgICBhZGRUb2RvICgpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhdGUudG9kb1RleHQgIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgIHRleHQ6IHRoaXMuc3RhdGUudG9kb1RleHQsXHJcbiAgICAgICAgICBmaW5pc2hlZDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc3RhdGUudG9kb1RleHQgPSAnJ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudG9kb0ludmFsaWQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVUb2RvIChwLCBjb250ZXh0KSB7XHJcbiAgICAgIHRoaXMuc3RhdGUudG9kb0xpc3QgPSB0aGlzLnN0YXRlLnRvZG9MaXN0LmZpbHRlcih0b2RvID0+IHRvZG8gIT09IGNvbnRleHQuc2NvcGUuaXRlbSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInN0YXRlIiwidG9kb1RleHQiLCJ0b2RvSW52YWxpZCIsInRvZG9MaXN0IiwiY29tcHV0ZWQiLCJmaW5pc2hlZFRvZG9MaXN0IiwiZ2V0IiwiZmlsdGVyIiwidG9kbyIsImZpbmlzaGVkIiwiZGVwZW5kZW5jaWVzIiwiYWN0aXZlVG9kb0xpc3QiLCJ0b2RvSXRlbVRleHQiLCJzY29wZSIsIl9zY29wZSRpdGVtIiwiaXRlbSIsInRleHQiLCJ0b2RvSXRlbUZpbmlzaGVkIiwic2V0IiwidmFsIiwiX3Njb3BlJGl0ZW0yIiwic2V0dXAiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJyaWRnZV90b2RvX3NhbXBsZV9kYXRhIiwiSlNPTiIsInBhcnNlIiwiZXhpdCIsIndhdGNoIiwiYWN0aW9ucyIsImFkZFRvZG8iLCJwdXNoIiwicmVtb3ZlVG9kbyIsInAiLCJjb250ZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/todo-store/TodoStore.js\n");

/***/ }),

/***/ "./src/todo-store/index.d.js":
/*!***********************************!*\
  !*** ./src/todo-store/index.d.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _TodoStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoStore */ \"./src/todo-store/TodoStore.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'TodoData',\n  icon: 'bi bi-list-check',\n  title: '待办数据',\n  type: 'store',\n  component: _TodoStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  props: []\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdG9kby1zdG9yZS9pbmRleC5kLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW1DO0FBRW5DLGlFQUFlO0VBQ2JDLElBQUksRUFBRSxVQUFVO0VBQ2hCQyxJQUFJLEVBQUUsa0JBQWtCO0VBQ3hCQyxLQUFLLEVBQUUsTUFBTTtFQUNiQyxJQUFJLEVBQUUsT0FBTztFQUNiQyxTQUFTLEVBQUVMLGtEQUFTO0VBQ3BCTSxLQUFLLEVBQUU7QUFDVCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2Utc2FtcGxlLXN0b3JlLy8uL3NyYy90b2RvLXN0b3JlL2luZGV4LmQuanM/YzFkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kb1N0b3JlIGZyb20gJy4vVG9kb1N0b3JlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdUb2RvRGF0YScsXHJcbiAgaWNvbjogJ2JpIGJpLWxpc3QtY2hlY2snLFxyXG4gIHRpdGxlOiAn5b6F5Yqe5pWw5o2uJyxcclxuICB0eXBlOiAnc3RvcmUnLFxyXG4gIGNvbXBvbmVudDogVG9kb1N0b3JlLFxyXG4gIHByb3BzOiBbXVxyXG59XHJcbiJdLCJuYW1lcyI6WyJUb2RvU3RvcmUiLCJuYW1lIiwiaWNvbiIsInRpdGxlIiwidHlwZSIsImNvbXBvbmVudCIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/todo-store/index.d.js\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/todo-store/index.d.js");
/******/ 	this["ridge-sample-store/todo-store"] = __webpack_exports__;
/******/ 	
/******/ })()
;