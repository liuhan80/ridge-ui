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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   badge: () => (/* reexport safe */ _src_badge_index_d_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   testimonials: () => (/* reexport safe */ _src_testimonials_index_d_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _src_badge_index_d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/badge/index.d.js */ \"./src/badge/index.d.js\");\n/* harmony import */ var _src_testimonials_index_d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/testimonials/index.d.js */ \"./src/testimonials/index.d.js\");\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25jYXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2UtY29tcG9uZW50LXRhaWx3aW5kLy4vY29uY2F0LmpzPzExY2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhZGdlIGZyb20gJy4vc3JjL2JhZGdlL2luZGV4LmQuanMnXG5pbXBvcnQgdGVzdGltb25pYWxzIGZyb20gJy4vc3JjL3Rlc3RpbW9uaWFscy9pbmRleC5kLmpzJ1xuZXhwb3J0IHsgYmFkZ2UsIHRlc3RpbW9uaWFscyB9Il0sIm5hbWVzIjpbImJhZGdlIiwidGVzdGltb25pYWxzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./concat.js\n");

/***/ }),

/***/ "./src/badge/Badge.jsx":
/*!*****************************!*\
  !*** ./src/badge/Badge.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({\n  text = '徽章',\n  preset = '',\n  classNames = []\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: 'items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ' + preset + '' + classNames.join(' ')\n  }, text);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFkZ2UvQmFkZ2UuanN4IiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QjtBQUN6QixpRUFBZSxDQUFDO0VBQ2RDLElBQUksR0FBRyxJQUFJO0VBQ1hDLE1BQU0sR0FBRyxFQUFFO0VBQ1hDLFVBQVUsR0FBRztBQUNmLENBQUMsS0FBSztFQUNKLG9CQUNFSCwwREFBQTtJQUFNSyxTQUFTLEVBQUUsb0hBQW9ILEdBQUdILE1BQU0sR0FBRyxFQUFFLEdBQUdDLFVBQVUsQ0FBQ0csSUFBSSxDQUFDLEdBQUc7RUFBRSxHQUFFTCxJQUFXLENBQUM7QUFFN0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWNvbXBvbmVudC10YWlsd2luZC8uL3NyYy9iYWRnZS9CYWRnZS5qc3g/NzY1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmV4cG9ydCBkZWZhdWx0ICh7XHJcbiAgdGV4dCA9ICflvr3nq6AnLFxyXG4gIHByZXNldCA9ICcnLFxyXG4gIGNsYXNzTmFtZXMgPSBbXVxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuIGNsYXNzTmFtZT17J2l0ZW1zLWNlbnRlciByb3VuZGVkLW1kIGJnLWdyYXktNTAgcHgtMiBweS0xIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTYwMCByaW5nLTEgcmluZy1pbnNldCByaW5nLWdyYXktNTAwLzEwICcgKyBwcmVzZXQgKyAnJyArIGNsYXNzTmFtZXMuam9pbignICcpfT57dGV4dH08L3NwYW4+XHJcbiAgKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInRleHQiLCJwcmVzZXQiLCJjbGFzc05hbWVzIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/badge/Badge.jsx\n");

/***/ }),

/***/ "./src/badge/index.d.js":
/*!******************************!*\
  !*** ./src/badge/index.d.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Badge_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Badge.jsx */ \"./src/badge/Badge.jsx\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'Badge',\n  title: '徽章',\n  component: _Badge_jsx__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'icons/text.svg',\n  order: 4,\n  type: 'react',\n  props: [{\n    label: '内容',\n    connect: true,\n    name: 'text',\n    type: 'string',\n    value: '徽章'\n  }, {\n    label: '预置',\n    name: 'preset',\n    type: 'string',\n    control: 'select',\n    options: [{\n      label: '灰色',\n      value: 'bg-gray-50 text-gray-600 ring-gray-500/10'\n    }, {\n      label: '红色',\n      value: 'bg-red-50 text-red-700 ring-red-500/10'\n    }, {\n      label: '黄色',\n      value: 'bg-yellow-50 text-yellow-800 ring-yellow-500/10'\n    }, {\n      label: '绿色',\n      value: 'bg-green-50 text-green-700 ring-green-500/10'\n    }, {\n      label: '蓝色',\n      value: 'bg-blue-50 text-blue-700 ring-blue-700/10'\n    }, {\n      label: '靛蓝',\n      value: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10'\n    }, {\n      label: '紫色',\n      value: 'text-purple-700 bg-purple-50 ring-purple-700/10'\n    }, {\n      label: '粉红',\n      value: 'bg-pink-50 text-pink-700 ring-pink-700/10'\n    }],\n    value: 'bg-gray-50 text-gray-600'\n  }, {\n    label: '样式',\n    connect: true,\n    name: 'classNames',\n    type: 'style',\n    value: []\n  }],\n  width: 100,\n  height: 22\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFkZ2UvaW5kZXguZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUErQjtBQUMvQixpRUFBZTtFQUNiQyxJQUFJLEVBQUUsT0FBTztFQUNiQyxLQUFLLEVBQUUsSUFBSTtFQUNYQyxTQUFTLEVBQUVILGtEQUFLO0VBQ2hCSSxJQUFJLEVBQUUsZ0JBQWdCO0VBQ3RCQyxLQUFLLEVBQUUsQ0FBQztFQUNSQyxJQUFJLEVBQUUsT0FBTztFQUNiQyxLQUFLLEVBQUUsQ0FBQztJQUNOQyxLQUFLLEVBQUUsSUFBSTtJQUNYQyxPQUFPLEVBQUUsSUFBSTtJQUNiUixJQUFJLEVBQUUsTUFBTTtJQUNaSyxJQUFJLEVBQUUsUUFBUTtJQUNkSSxLQUFLLEVBQUU7RUFDVCxDQUFDLEVBQUU7SUFDREYsS0FBSyxFQUFFLElBQUk7SUFDWFAsSUFBSSxFQUFFLFFBQVE7SUFDZEssSUFBSSxFQUFFLFFBQVE7SUFDZEssT0FBTyxFQUFFLFFBQVE7SUFDakJDLE9BQU8sRUFBRSxDQUFDO01BQ1JKLEtBQUssRUFBRSxJQUFJO01BQ1hFLEtBQUssRUFBRTtJQUNULENBQUMsRUFBRTtNQUNERixLQUFLLEVBQUUsSUFBSTtNQUNYRSxLQUFLLEVBQUU7SUFDVCxDQUFDLEVBQUU7TUFDREYsS0FBSyxFQUFFLElBQUk7TUFDWEUsS0FBSyxFQUFFO0lBQ1QsQ0FBQyxFQUFFO01BQ0RGLEtBQUssRUFBRSxJQUFJO01BQ1hFLEtBQUssRUFBRTtJQUNULENBQUMsRUFBRTtNQUNERixLQUFLLEVBQUUsSUFBSTtNQUNYRSxLQUFLLEVBQUU7SUFDVCxDQUFDLEVBQUU7TUFDREYsS0FBSyxFQUFFLElBQUk7TUFDWEUsS0FBSyxFQUFFO0lBQ1QsQ0FBQyxFQUFFO01BQ0RGLEtBQUssRUFBRSxJQUFJO01BQ1hFLEtBQUssRUFBRTtJQUNULENBQUMsRUFBRTtNQUNERixLQUFLLEVBQUUsSUFBSTtNQUNYRSxLQUFLLEVBQUU7SUFDVCxDQUFDLENBQUM7SUFDRkEsS0FBSyxFQUFFO0VBQ1QsQ0FBQyxFQUFFO0lBQ0RGLEtBQUssRUFBRSxJQUFJO0lBQ1hDLE9BQU8sRUFBRSxJQUFJO0lBQ2JSLElBQUksRUFBRSxZQUFZO0lBQ2xCSyxJQUFJLEVBQUUsT0FBTztJQUNiSSxLQUFLLEVBQUU7RUFDVCxDQUFDLENBQUM7RUFDRkcsS0FBSyxFQUFFLEdBQUc7RUFDVkMsTUFBTSxFQUFFO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWNvbXBvbmVudC10YWlsd2luZC8uL3NyYy9iYWRnZS9pbmRleC5kLmpzPzQ2MDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhZGdlIGZyb20gJy4vQmFkZ2UuanN4J1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ0JhZGdlJyxcclxuICB0aXRsZTogJ+W+veeroCcsXHJcbiAgY29tcG9uZW50OiBCYWRnZSxcclxuICBpY29uOiAnaWNvbnMvdGV4dC5zdmcnLFxyXG4gIG9yZGVyOiA0LFxyXG4gIHR5cGU6ICdyZWFjdCcsXHJcbiAgcHJvcHM6IFt7XHJcbiAgICBsYWJlbDogJ+WGheWuuScsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgbmFtZTogJ3RleHQnLFxyXG4gICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICB2YWx1ZTogJ+W+veeroCdcclxuICB9LCB7XHJcbiAgICBsYWJlbDogJ+mihOe9ricsXHJcbiAgICBuYW1lOiAncHJlc2V0JyxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgY29udHJvbDogJ3NlbGVjdCcsXHJcbiAgICBvcHRpb25zOiBbe1xyXG4gICAgICBsYWJlbDogJ+eBsOiJsicsXHJcbiAgICAgIHZhbHVlOiAnYmctZ3JheS01MCB0ZXh0LWdyYXktNjAwIHJpbmctZ3JheS01MDAvMTAnXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiAn57qi6ImyJyxcclxuICAgICAgdmFsdWU6ICdiZy1yZWQtNTAgdGV4dC1yZWQtNzAwIHJpbmctcmVkLTUwMC8xMCdcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6ICfpu4ToibInLFxyXG4gICAgICB2YWx1ZTogJ2JnLXllbGxvdy01MCB0ZXh0LXllbGxvdy04MDAgcmluZy15ZWxsb3ctNTAwLzEwJ1xyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogJ+e7v+iJsicsXHJcbiAgICAgIHZhbHVlOiAnYmctZ3JlZW4tNTAgdGV4dC1ncmVlbi03MDAgcmluZy1ncmVlbi01MDAvMTAnXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiAn6JOd6ImyJyxcclxuICAgICAgdmFsdWU6ICdiZy1ibHVlLTUwIHRleHQtYmx1ZS03MDAgcmluZy1ibHVlLTcwMC8xMCdcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6ICfpnZvok50nLFxyXG4gICAgICB2YWx1ZTogJ2JnLWluZGlnby01MCB0ZXh0LWluZGlnby03MDAgcmluZy1pbmRpZ28tNzAwLzEwJ1xyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogJ+e0q+iJsicsXHJcbiAgICAgIHZhbHVlOiAndGV4dC1wdXJwbGUtNzAwIGJnLXB1cnBsZS01MCByaW5nLXB1cnBsZS03MDAvMTAnXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiAn57KJ57qiJyxcclxuICAgICAgdmFsdWU6ICdiZy1waW5rLTUwIHRleHQtcGluay03MDAgcmluZy1waW5rLTcwMC8xMCdcclxuICAgIH1dLFxyXG4gICAgdmFsdWU6ICdiZy1ncmF5LTUwIHRleHQtZ3JheS02MDAnXHJcbiAgfSwge1xyXG4gICAgbGFiZWw6ICfmoLflvI8nLFxyXG4gICAgY29ubmVjdDogdHJ1ZSxcclxuICAgIG5hbWU6ICdjbGFzc05hbWVzJyxcclxuICAgIHR5cGU6ICdzdHlsZScsXHJcbiAgICB2YWx1ZTogW11cclxuICB9XSxcclxuICB3aWR0aDogMTAwLFxyXG4gIGhlaWdodDogMjJcclxufVxyXG4iXSwibmFtZXMiOlsiQmFkZ2UiLCJuYW1lIiwidGl0bGUiLCJjb21wb25lbnQiLCJpY29uIiwib3JkZXIiLCJ0eXBlIiwicHJvcHMiLCJsYWJlbCIsImNvbm5lY3QiLCJ2YWx1ZSIsImNvbnRyb2wiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/badge/index.d.js\n");

/***/ }),

/***/ "./src/testimonials/Testimonials.jsx":
/*!*******************************************!*\
  !*** ./src/testimonials/Testimonials.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({\n  testimonials,\n  username,\n  userAvatar = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',\n  companyLogo = '/npm/ridge-component-basic/icons/composite.svg',\n  position\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"section\", {\n    className: \"relative isolate overflow-hidden bg-white px-6 py-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"mx-auto max-w-2xl lg:max-w-4xl\"\n  }, companyLogo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"mx-auto h-12\",\n    src: companyLogo,\n    alt: \"\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"figure\", {\n    className: \"mt-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"blockquote\", {\n    className: \"text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, testimonials ?? '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"figcaption\", {\n    className: \"mt-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"mx-auto h-20 w-20 rounded-full\",\n    src: userAvatar,\n    alt: \"\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"mt-6 flex items-center justify-center space-x-3 text-base\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"font-semibold text-gray-900\"\n  }, username ?? ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"svg\", {\n    viewBox: \"0 0 2 2\",\n    width: \"3\",\n    height: \"3\",\n    \"aria-hidden\": \"true\",\n    className: \"fill-gray-900\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"circle\", {\n    cx: \"1\",\n    cy: \"1\",\n    r: \"1\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"text-gray-600\"\n  }, position ?? ''))))));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGVzdGltb25pYWxzL1Rlc3RpbW9uaWFscy5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXlCO0FBQ3pCLGlFQUFlLENBQUM7RUFDZEMsWUFBWTtFQUNaQyxRQUFRO0VBQ1JDLFVBQVUsR0FBRywySkFBMko7RUFDeEtDLFdBQVcsR0FBRyxnREFBZ0Q7RUFDOURDO0FBQ0YsQ0FBQyxLQUFLO0VBQ0osb0JBQ0VMLDBEQUFBO0lBQVNPLFNBQVMsRUFBQztFQUFxRCxnQkFDdEVQLDBEQUFBO0lBQUtPLFNBQVMsRUFBQztFQUEyRyxDQUFFLENBQUMsZUFDN0hQLDBEQUFBO0lBQUtPLFNBQVMsRUFBQztFQUErTCxDQUFFLENBQUMsZUFDak5QLDBEQUFBO0lBQUtPLFNBQVMsRUFBQztFQUFnQyxHQUU1Q0gsV0FBVyxpQkFBSUosMERBQUE7SUFBS08sU0FBUyxFQUFDLGNBQWM7SUFBQ0MsR0FBRyxFQUFFSixXQUFZO0lBQUNLLEdBQUcsRUFBQztFQUFFLENBQUUsQ0FBQyxlQUN6RVQsMERBQUE7SUFBUU8sU0FBUyxFQUFDO0VBQU0sZ0JBQ3RCUCwwREFBQTtJQUFZTyxTQUFTLEVBQUM7RUFBb0YsZ0JBQ3hHUCwwREFBQSxZQUFJQyxZQUFZLElBQUksRUFBTSxDQUNoQixDQUFDLGVBQ2JELDBEQUFBO0lBQVlPLFNBQVMsRUFBQztFQUFNLGdCQUMxQlAsMERBQUE7SUFBS08sU0FBUyxFQUFDLGdDQUFnQztJQUFDQyxHQUFHLEVBQUVMLFVBQVc7SUFBQ00sR0FBRyxFQUFDO0VBQUUsQ0FBRSxDQUFDLGVBQzFFVCwwREFBQTtJQUFLTyxTQUFTLEVBQUM7RUFBMkQsZ0JBQ3hFUCwwREFBQTtJQUFLTyxTQUFTLEVBQUM7RUFBNkIsR0FBRUwsUUFBUSxJQUFJLEVBQVEsQ0FBQyxlQUNuRUYsMERBQUE7SUFBS1UsT0FBTyxFQUFDLFNBQVM7SUFBQ0MsS0FBSyxFQUFDLEdBQUc7SUFBQ0MsTUFBTSxFQUFDLEdBQUc7SUFBQyxlQUFZLE1BQU07SUFBQ0wsU0FBUyxFQUFDO0VBQWUsZ0JBQ3RGUCwwREFBQTtJQUFRYSxFQUFFLEVBQUMsR0FBRztJQUFDQyxFQUFFLEVBQUMsR0FBRztJQUFDQyxDQUFDLEVBQUM7RUFBRyxDQUFFLENBQzFCLENBQUMsZUFDTmYsMERBQUE7SUFBS08sU0FBUyxFQUFDO0VBQWUsR0FBRUYsUUFBUSxJQUFJLEVBQVEsQ0FDakQsQ0FDSyxDQUNOLENBQ0wsQ0FDRSxDQUFDO0FBRWQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JpZGdlLWNvbXBvbmVudC10YWlsd2luZC8uL3NyYy90ZXN0aW1vbmlhbHMvVGVzdGltb25pYWxzLmpzeD83ODQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuZXhwb3J0IGRlZmF1bHQgKHtcclxuICB0ZXN0aW1vbmlhbHMsXHJcbiAgdXNlcm5hbWUsXHJcbiAgdXNlckF2YXRhciA9ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQzODc2MTY4MTAzMy02NDYxZmZhZDhkODA/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxyXG4gIGNvbXBhbnlMb2dvID0gJy9ucG0vcmlkZ2UtY29tcG9uZW50LWJhc2ljL2ljb25zL2NvbXBvc2l0ZS5zdmcnLFxyXG4gIHBvc2l0aW9uXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPSdyZWxhdGl2ZSBpc29sYXRlIG92ZXJmbG93LWhpZGRlbiBiZy13aGl0ZSBweC02IHB5LTYnPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYWJzb2x1dGUgaW5zZXQtMCAtei0xMCBiZy1bcmFkaWFsLWdyYWRpZW50KDQ1cmVtXzUwcmVtX2F0X3RvcCx0aGVtZShjb2xvcnMuaW5kaWdvLjEwMCksd2hpdGUpXSBvcGFjaXR5LTIwJyAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTEvMiAtei0xMCBtci0xNiB3LVsyMDAlXSBvcmlnaW4tYm90dG9tLWxlZnQgc2tldy14LVstMzBkZWddIGJnLXdoaXRlIHNoYWRvdy14bCBzaGFkb3ctaW5kaWdvLTYwMC8xMCByaW5nLTEgcmluZy1pbmRpZ28tNTAgc206bXItMjggbGc6bXItMCB4bDptci0xNiB4bDpvcmlnaW4tY2VudGVyJyAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbXgtYXV0byBtYXgtdy0yeGwgbGc6bWF4LXctNHhsJz5cclxuICAgICAgICB7LyogaHR0cHM6Ly90YWlsd2luZHVpLmNvbS9pbWcvbG9nb3Mvd29ya2NhdGlvbi1sb2dvLWluZGlnby02MDAuc3ZnICovfVxyXG4gICAgICAgIHtjb21wYW55TG9nbyAmJiA8aW1nIGNsYXNzTmFtZT0nbXgtYXV0byBoLTEyJyBzcmM9e2NvbXBhbnlMb2dvfSBhbHQ9JycgLz59XHJcbiAgICAgICAgPGZpZ3VyZSBjbGFzc05hbWU9J210LTYnPlxyXG4gICAgICAgICAgPGJsb2NrcXVvdGUgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlciB0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgbGVhZGluZy04IHRleHQtZ3JheS05MDAgc206dGV4dC0yeGwgc206bGVhZGluZy05Jz5cclxuICAgICAgICAgICAgPHA+e3Rlc3RpbW9uaWFscyA/PyAnJ308L3A+XHJcbiAgICAgICAgICA8L2Jsb2NrcXVvdGU+XHJcbiAgICAgICAgICA8ZmlnY2FwdGlvbiBjbGFzc05hbWU9J210LTMnPlxyXG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT0nbXgtYXV0byBoLTIwIHctMjAgcm91bmRlZC1mdWxsJyBzcmM9e3VzZXJBdmF0YXJ9IGFsdD0nJyAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbXQtNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzcGFjZS14LTMgdGV4dC1iYXNlJz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwJz57dXNlcm5hbWUgPz8gJyd9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PScwIDAgMiAyJyB3aWR0aD0nMycgaGVpZ2h0PSczJyBhcmlhLWhpZGRlbj0ndHJ1ZScgY2xhc3NOYW1lPSdmaWxsLWdyYXktOTAwJz5cclxuICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9JzEnIGN5PScxJyByPScxJyAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0ZXh0LWdyYXktNjAwJz57cG9zaXRpb24gPz8gJyd9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9maWdjYXB0aW9uPlxyXG4gICAgICAgIDwvZmlndXJlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidGVzdGltb25pYWxzIiwidXNlcm5hbWUiLCJ1c2VyQXZhdGFyIiwiY29tcGFueUxvZ28iLCJwb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzcmMiLCJhbHQiLCJ2aWV3Qm94Iiwid2lkdGgiLCJoZWlnaHQiLCJjeCIsImN5IiwiciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/testimonials/Testimonials.jsx\n");

/***/ }),

/***/ "./src/testimonials/index.d.js":
/*!*************************************!*\
  !*** ./src/testimonials/index.d.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Testimonials_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Testimonials.jsx */ \"./src/testimonials/Testimonials.jsx\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'Testimonials',\n  title: ' 客户评价',\n  component: _Testimonials_jsx__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  icon: 'icons/users.svg',\n  order: 4,\n  type: 'react',\n  props: [{\n    label: '内容',\n    connect: true,\n    name: 'testimonials',\n    type: 'string',\n    value: '这款组件真是惊艳！功能强大，操作简便，极大地提升了工作效率，强烈推荐给所有需要的人！'\n  }, {\n    label: '用户名',\n    connect: true,\n    name: 'username',\n    type: 'string',\n    value: '曹晓明'\n  }, {\n    label: '头像',\n    connect: true,\n    name: 'userAvatar',\n    type: 'image'\n  }, {\n    label: '公司Logo',\n    connect: true,\n    name: 'companyLogo',\n    type: 'image'\n  }, {\n    label: '职位',\n    connect: true,\n    name: 'position',\n    type: 'string',\n    value: 'CEO of Workcation'\n  }],\n  width: 620,\n  height: 335\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGVzdGltb25pYWxzL2luZGV4LmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNkM7QUFDN0MsaUVBQWU7RUFDYkMsSUFBSSxFQUFFLGNBQWM7RUFDcEJDLEtBQUssRUFBRSxPQUFPO0VBQ2RDLFNBQVMsRUFBRUgseURBQVk7RUFDdkJJLElBQUksRUFBRSxpQkFBaUI7RUFDdkJDLEtBQUssRUFBRSxDQUFDO0VBQ1JDLElBQUksRUFBRSxPQUFPO0VBQ2JDLEtBQUssRUFBRSxDQUFDO0lBQ05DLEtBQUssRUFBRSxJQUFJO0lBQ1hDLE9BQU8sRUFBRSxJQUFJO0lBQ2JSLElBQUksRUFBRSxjQUFjO0lBQ3BCSyxJQUFJLEVBQUUsUUFBUTtJQUNkSSxLQUFLLEVBQUU7RUFDVCxDQUFDLEVBQUU7SUFDREYsS0FBSyxFQUFFLEtBQUs7SUFDWkMsT0FBTyxFQUFFLElBQUk7SUFDYlIsSUFBSSxFQUFFLFVBQVU7SUFDaEJLLElBQUksRUFBRSxRQUFRO0lBQ2RJLEtBQUssRUFBRTtFQUNULENBQUMsRUFBRTtJQUNERixLQUFLLEVBQUUsSUFBSTtJQUNYQyxPQUFPLEVBQUUsSUFBSTtJQUNiUixJQUFJLEVBQUUsWUFBWTtJQUNsQkssSUFBSSxFQUFFO0VBQ1IsQ0FBQyxFQUFFO0lBQ0RFLEtBQUssRUFBRSxRQUFRO0lBQ2ZDLE9BQU8sRUFBRSxJQUFJO0lBQ2JSLElBQUksRUFBRSxhQUFhO0lBQ25CSyxJQUFJLEVBQUU7RUFDUixDQUFDLEVBQUU7SUFDREUsS0FBSyxFQUFFLElBQUk7SUFDWEMsT0FBTyxFQUFFLElBQUk7SUFDYlIsSUFBSSxFQUFFLFVBQVU7SUFDaEJLLElBQUksRUFBRSxRQUFRO0lBQ2RJLEtBQUssRUFBRTtFQUNULENBQUMsQ0FBQztFQUNGQyxLQUFLLEVBQUUsR0FBRztFQUNWQyxNQUFNLEVBQUU7QUFDVixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmlkZ2UtY29tcG9uZW50LXRhaWx3aW5kLy4vc3JjL3Rlc3RpbW9uaWFscy9pbmRleC5kLmpzPzU1NWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlc3RpbW9uaWFscyBmcm9tICcuL1Rlc3RpbW9uaWFscy5qc3gnXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnVGVzdGltb25pYWxzJyxcclxuICB0aXRsZTogJyDlrqLmiLfor4Tku7cnLFxyXG4gIGNvbXBvbmVudDogVGVzdGltb25pYWxzLFxyXG4gIGljb246ICdpY29ucy91c2Vycy5zdmcnLFxyXG4gIG9yZGVyOiA0LFxyXG4gIHR5cGU6ICdyZWFjdCcsXHJcbiAgcHJvcHM6IFt7XHJcbiAgICBsYWJlbDogJ+WGheWuuScsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgbmFtZTogJ3Rlc3RpbW9uaWFscycsXHJcbiAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgIHZhbHVlOiAn6L+Z5qy+57uE5Lu255yf5piv5oOK6Imz77yB5Yqf6IO95by65aSn77yM5pON5L2c566A5L6/77yM5p6B5aSn5Zyw5o+Q5Y2H5LqG5bel5L2c5pWI546H77yM5by654OI5o6o6I2Q57uZ5omA5pyJ6ZyA6KaB55qE5Lq677yBJ1xyXG4gIH0sIHtcclxuICAgIGxhYmVsOiAn55So5oi35ZCNJyxcclxuICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICBuYW1lOiAndXNlcm5hbWUnLFxyXG4gICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICB2YWx1ZTogJ+abueaZk+aYjidcclxuICB9LCB7XHJcbiAgICBsYWJlbDogJ+WktOWDjycsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgbmFtZTogJ3VzZXJBdmF0YXInLFxyXG4gICAgdHlwZTogJ2ltYWdlJ1xyXG4gIH0sIHtcclxuICAgIGxhYmVsOiAn5YWs5Y+4TG9nbycsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgbmFtZTogJ2NvbXBhbnlMb2dvJyxcclxuICAgIHR5cGU6ICdpbWFnZSdcclxuICB9LCB7XHJcbiAgICBsYWJlbDogJ+iBjOS9jScsXHJcbiAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgbmFtZTogJ3Bvc2l0aW9uJyxcclxuICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgdmFsdWU6ICdDRU8gb2YgV29ya2NhdGlvbidcclxuICB9XSxcclxuICB3aWR0aDogNjIwLFxyXG4gIGhlaWdodDogMzM1XHJcbn1cclxuIl0sIm5hbWVzIjpbIlRlc3RpbW9uaWFscyIsIm5hbWUiLCJ0aXRsZSIsImNvbXBvbmVudCIsImljb24iLCJvcmRlciIsInR5cGUiLCJwcm9wcyIsImxhYmVsIiwiY29ubmVjdCIsInZhbHVlIiwid2lkdGgiLCJoZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/testimonials/index.d.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = (function() { return this["React"]; }());

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
/******/ 	var __webpack_exports__ = __webpack_require__("./concat.js");
/******/ 	this["ridge-component-tailwind"] = __webpack_exports__;
/******/ 	
/******/ })()
;