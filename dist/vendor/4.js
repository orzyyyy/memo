(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./src/assets/mapping.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./src/assets/mapping.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/_css-loader@2.1.0@css-loader/dist/runtime/api.js */ "./node_modules/_css-loader@2.1.0@css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".mapping .canvas-wrapper {\r\n  width: 2000%;\r\n  height: 2000vh;\r\n  border: 1px solid #ccc;\r\n}\r\n\r\n.mapping {\r\n  /* overflow: hidden; */\r\n}", ""]);



/***/ }),

/***/ "./src/assets/mapping.css":
/*!********************************!*\
  !*** ./src/assets/mapping.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./mapping.css */ "./node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./src/assets/mapping.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "./node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/pages/mapping.js":
/*!******************************!*\
  !*** ./src/pages/mapping.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mapping; });
/* harmony import */ var antd_lib_message_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/message/style/css */ "./node_modules/_antd@3.13.6@antd/lib/message/style/css.js");
/* harmony import */ var antd_lib_message_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_message_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/message */ "./node_modules/_antd@3.13.6@antd/lib/message/index.js");
/* harmony import */ var antd_lib_message__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_message__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/_react@16.8.3@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_mapping_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/mapping.css */ "./src/assets/mapping.css");
/* harmony import */ var _assets_mapping_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_mapping_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _urlHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../urlHelper */ "./src/urlHelper/index.js");
/* harmony import */ var mini_xmind__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mini-xmind */ "./node_modules/_mini-xmind@1.1.3@mini-xmind/lib/index.js");
/* harmony import */ var mini_xmind__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mini_xmind__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/_date-fns@2.0.0-alpha.27@date-fns/esm/index.js");
/* harmony import */ var date_fns_locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns/locale */ "./node_modules/_date-fns@2.0.0-alpha.27@date-fns/esm/locale/index.js");



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Mapping =
/*#__PURE__*/
function (_Component) {
  _inherits(Mapping, _Component);

  function Mapping(props) {
    var _this;

    _classCallCheck(this, Mapping);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mapping).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.bindKeyDown();

      _this.getMapping();
    });

    _defineProperty(_assertThisInitialized(_this), "bindKeyDown", function () {
      document.onkeydown = function (e) {
        var ctrlKey = e.ctrlKey,
            keyCode = e.keyCode; // ctrl + s

        if (ctrlKey && keyCode === 83) {
          e.preventDefault();
          var data = DataCollector.getAll();

          _this.send(data);
        } else {
          e.stopPropagation();
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "send", function (data) {
      var id = _this.getMappingId();

      Object(_urlHelper__WEBPACK_IMPORTED_MODULE_4__["ajax"])({
        url: 'save',
        params: {
          method: 'POST',
          body: JSON.stringify({
            layout: data,
            id: id
          }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        success: function success(result) {
          if (!result) {
            antd_lib_message__WEBPACK_IMPORTED_MODULE_1___default.a.error('error with save');
          } else {
            location.reload(); // this.getMapping();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getMapping", function () {
      var id = _this.getMappingId();

      Object(_urlHelper__WEBPACK_IMPORTED_MODULE_4__["ajax"])({
        url: "dist/layout/".concat(id, ".json"),
        success: function success(data) {
          var date = Object(date_fns__WEBPACK_IMPORTED_MODULE_6__["format"])(new Date(), 'a HH:mm:ss', {
            locale: date_fns_locale__WEBPACK_IMPORTED_MODULE_7__["zhCN"]
          });

          antd_lib_message__WEBPACK_IMPORTED_MODULE_1___default.a.success("\u66F4\u65B0\u65F6\u95F4\uFF1A".concat(date));

          _this.setState({
            data: data
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getMappingId", function () {
      var hash = location.hash.split('/');
      var param = hash[hash.length - 1];

      if (param.includes('?')) {
        var search = param.split('?');
        return search[search.length - 1];
      }

      return param;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var data = _this.state.data;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "mapping"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(mini_xmind__WEBPACK_IMPORTED_MODULE_5__["Toolbar"], null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(mini_xmind__WEBPACK_IMPORTED_MODULE_5__["Canvas"], {
        data: data,
        className: "canvas-wrapper",
        orientation: "v"
      }));
    });

    _this.state = {
      data: {}
    };
    return _this;
  }

  return Mapping;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);



/***/ }),

/***/ "./src/urlHelper/index.js":
/*!********************************!*\
  !*** ./src/urlHelper/index.js ***!
  \********************************/
/*! exports provided: checkMethod, checkType, getRealParams, serialize, getRealUrl, isDev, ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkMethod", function() { return checkMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkType", function() { return checkType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRealParams", function() { return getRealParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return serialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRealUrl", function() { return getRealUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajax", function() { return ajax; });
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path */ "./src/urlHelper/path.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDev", function() { return _path__WEBPACK_IMPORTED_MODULE_0__["isDev"]; });

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// import { fetch } from 'whatwg-fetch';

var types = ['json', 'html', 'text'];
var methods = ['GET', 'POST', 'PUT', 'DELETE'];
/**
 * 封装的fetch请求
 * @param { key } 请求地址对应的简写key
 * @param { url } 请求地址，当传入此参数时，key将会失效
 * @param { method } 请求方式，只支持fetch自带的方法枚举，比如大写POST
 * @param { data } 请求参数，可以是对象或数组
 * @param { type } 解析方式，枚举['json', 'html', 'text']，默认为json
 * @param { params } 当需要设置header时可以用这个
 * @param { success } 请求结束时的回调
 * @param { fix } 使用代理时，被代理地址参数分隔符
 * @param { isProxy } 是否启用代理，默认为 false
 * @param { error } 异常抛出
 */

var ajax = function ajax(_ref) {
  var url = _ref.url,
      key = _ref.key,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      data = _ref.data,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'json' : _ref$type,
      success = _ref.success,
      params = _ref.params,
      _ref$fix = _ref.fix,
      fix = _ref$fix === void 0 ? '&' : _ref$fix,
      _ref$isProxy = _ref.isProxy,
      isProxy = _ref$isProxy === void 0 ? false : _ref$isProxy,
      error = _ref.error;
  var realUrl,
      realParams,
      postParam = {};
  checkType(type);
  checkMethod(method);
  realUrl = getRealUrl(key, _path__WEBPACK_IMPORTED_MODULE_0__["path"], _path__WEBPACK_IMPORTED_MODULE_0__["proxy"], isProxy) || url;
  realParams = getRealParams(realUrl, data, fix);

  if (method != 'GET') {
    postParam = {
      body: JSON.stringify(data),
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  postParam = _extends({}, postParam, params);
  fetch(realUrl + realParams, postParam).then(function (result) {
    return result[type]();
  }).then(function (result) {
    return success && success(result);
  })["catch"](function (err) {
    return error && error(err);
  });
};

var checkMethod = function checkMethod(method) {
  if (!method) {
    console.error('fetch method is undefined.');
    return;
  }

  method = method.toUpperCase();

  if (!methods.includes(method)) {
    console.error('fetch method error.');
    return;
  }

  return method;
};
var checkType = function checkType(type) {
  if (!type) {
    console.error('fetch type is undefined.');
    return;
  }

  type = type.toLowerCase();

  if (!types.includes(type)) {
    console.error('fetch type error.');
    return;
  }

  return type;
};
var getRealParams = function getRealParams(url, data, fixStr) {
  if (!url || !data) {
    return '';
  }

  var fix = url.includes('?') ? fixStr : '?';
  var result = serialize(data, fixStr);

  if (result) {
    return fix + result;
  }

  return result;
};
var serialize = function serialize(data, fixStr) {
  if (!data || Object.keys(data).lenght == 0 || data instanceof Array) {
    return '';
  }

  if (typeof data == 'string') {
    return data;
  }

  var paramStr = '';

  for (var key in data) {
    paramStr += "".concat(key, "=").concat(data[key]).concat(fixStr);
  }

  paramStr = paramStr.substr(0, paramStr.length - (fixStr == '&' ? 1 : 3));
  return paramStr;
};
var getRealUrl = function getRealUrl(key, path, proxy, isProxy) {
  var realUrl;

  for (var realKey in path) {
    if (key == realKey) {
      realUrl = path[realKey];
      break;
    }
  }

  if (!realUrl) {
    return;
  }

  if (proxy && isProxy) {
    realUrl = proxy + realUrl;
  }

  return realUrl;
};


/***/ }),

/***/ "./src/urlHelper/path.js":
/*!*******************************!*\
  !*** ./src/urlHelper/path.js ***!
  \*******************************/
/*! exports provided: path, proxy, isDev */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "path", function() { return path; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxy", function() { return proxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDev", function() { return isDev; });
/*eslint-disable */
var proxy = null;
var isDev = "development" === 'development';
var prod = {};
var dev = {};
var path = isDev ? dev : prod;


/***/ })

}]);
//# sourceMappingURL=4.js.map