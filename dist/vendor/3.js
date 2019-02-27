(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./src/assets/MainPage.css":
/*!*****************************************************************************************!*\
  !*** ./node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./src/assets/MainPage.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/_css-loader@2.1.0@css-loader/dist/runtime/api.js */ "./node_modules/_css-loader@2.1.0@css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".MainPage img {\r\n  width: 100%;\r\n}\r\n\r\n.MainPage .card {\r\n  width: 15%;\r\n  text-align: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.MainPage .add {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 288px;\r\n}\r\n\r\n.MainPage {\r\n  height: 100vh;\r\n}", ""]);



/***/ }),

/***/ "./src/assets/MainPage.css":
/*!*********************************!*\
  !*** ./src/assets/MainPage.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./MainPage.css */ "./node_modules/_css-loader@2.1.0@css-loader/dist/cjs.js!./src/assets/MainPage.css");

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

/***/ "./src/options/menu.js":
/*!*****************************!*\
  !*** ./src/options/menu.js ***!
  \*****************************/
/*! exports provided: defaultSelectedKeys, defaultOpenKeys, menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSelectedKeys", function() { return defaultSelectedKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOpenKeys", function() { return defaultOpenKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "menu", function() { return menu; });
var defaultSelectedKeys = 'basic';
var defaultOpenKeys = 'JavaScript';
var menu = [{
  key: 'JavaScript',
  title: 'JavaScript',
  children: [{
    key: 'basic',
    value: '基础'
  }, {
    key: 'react',
    value: 'react'
  }, {
    key: 'optimization',
    value: '优化'
  }]
}, {
  key: 'music-theory',
  title: '乐理',
  children: [{
    key: 'musical-pitch',
    value: '音律'
  }]
}];


/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainPage; });
/* harmony import */ var antd_lib_tooltip_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/tooltip/style/css */ "./node_modules/_antd@3.13.6@antd/lib/tooltip/style/css.js");
/* harmony import */ var antd_lib_tooltip_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tooltip_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/tooltip */ "./node_modules/_antd@3.13.6@antd/lib/tooltip/index.js");
/* harmony import */ var antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_dropdown_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/dropdown/style/css */ "./node_modules/_antd@3.13.6@antd/lib/dropdown/style/css.js");
/* harmony import */ var antd_lib_dropdown_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_dropdown_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/dropdown */ "./node_modules/_antd@3.13.6@antd/lib/dropdown/index.js");
/* harmony import */ var antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd_lib_breadcrumb_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/lib/breadcrumb/style/css */ "./node_modules/_antd@3.13.6@antd/lib/breadcrumb/style/css.js");
/* harmony import */ var antd_lib_breadcrumb_style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_breadcrumb_style_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/lib/breadcrumb */ "./node_modules/_antd@3.13.6@antd/lib/breadcrumb/index.js");
/* harmony import */ var antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var antd_lib_card_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/lib/card/style/css */ "./node_modules/_antd@3.13.6@antd/lib/card/style/css.js");
/* harmony import */ var antd_lib_card_style_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_lib_card_style_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd/lib/card */ "./node_modules/_antd@3.13.6@antd/lib/card/index.js");
/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd_lib_card__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd_lib_icon_style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd/lib/icon/style/css */ "./node_modules/_antd@3.13.6@antd/lib/icon/style/css.js");
/* harmony import */ var antd_lib_icon_style_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd_lib_icon_style_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd/lib/icon */ "./node_modules/_antd@3.13.6@antd/lib/icon/index.js");
/* harmony import */ var antd_lib_icon__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(antd_lib_icon__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var antd_lib_layout_style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd/lib/layout/style/css */ "./node_modules/_antd@3.13.6@antd/lib/layout/style/css.js");
/* harmony import */ var antd_lib_layout_style_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout_style_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd/lib/layout */ "./node_modules/_antd@3.13.6@antd/lib/layout/index.js");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd_lib_menu_style_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd/lib/menu/style/css */ "./node_modules/_antd@3.13.6@antd/lib/menu/style/css.js");
/* harmony import */ var antd_lib_menu_style_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu_style_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd/lib/menu */ "./node_modules/_antd@3.13.6@antd/lib/menu/index.js");
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "./node_modules/_react@16.8.3@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _assets_MainPage_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../assets/MainPage.css */ "./src/assets/MainPage.css");
/* harmony import */ var _assets_MainPage_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_assets_MainPage_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _urlHelper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../urlHelper */ "./src/urlHelper/index.js");
/* harmony import */ var _options_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../options/menu */ "./src/options/menu.js");















function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var SubMenu = antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default.a.SubMenu;
var Content = antd_lib_layout__WEBPACK_IMPORTED_MODULE_11___default.a.Content,
    Footer = antd_lib_layout__WEBPACK_IMPORTED_MODULE_11___default.a.Footer,
    Sider = antd_lib_layout__WEBPACK_IMPORTED_MODULE_11___default.a.Sider;


var MainPage =
/*#__PURE__*/
function (_Component) {
  _inherits(MainPage, _Component);

  function MainPage(props) {
    var _this;

    _classCallCheck(this, MainPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.getMapping();
    });

    _defineProperty(_assertThisInitialized(_this), "getMapping", function () {
      Object(_urlHelper__WEBPACK_IMPORTED_MODULE_16__["ajax"])({
        url: 'dist/mapping.json',
        success: function success(data) {
          return _this.setState({
            data: data
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (_ref) {
      var id = _ref.id;
      location.hash = "/".concat(id);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDelete", function (_ref2) {
      var id = _ref2.id;
      Object(_urlHelper__WEBPACK_IMPORTED_MODULE_16__["ajax"])({
        url: 'del',
        params: {
          method: 'DELETE',
          body: JSON.stringify({
            id: id
          }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        success: function success(result) {
          if (!result) {
            console.error('error with delete');
          } else {
            DataCollector.clear();

            _this.getMapping();
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdd", function () {
      Object(_urlHelper__WEBPACK_IMPORTED_MODULE_16__["ajax"])({
        url: 'save/new',
        type: 'text',
        params: {
          method: 'POST',
          body: '',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        success: function success(result) {
          if (result) {
            location.hash = '/new?' + result;
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuClick", function (_ref3) {
      var keyPath = _ref3.keyPath;

      _this.setState({
        breadChild: keyPath[0],
        breadParent: keyPath[1]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "generateMainPage", function () {
      var _this$state = _this.state,
          data = _this$state.data,
          breadParent = _this$state.breadParent,
          breadChild = _this$state.breadChild;

      if (data.length == 0) {
        return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_card__WEBPACK_IMPORTED_MODULE_7___default.a.Grid, {
          className: "card add",
          onClick: _this.handleAdd
        }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_icon__WEBPACK_IMPORTED_MODULE_9___default.a, {
          type: "plus"
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_layout__WEBPACK_IMPORTED_MODULE_11___default.a, {
        style: {
          minHeight: '100vh'
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(Sider, {
        collapsible: true,
        theme: "light"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default.a, {
        defaultSelectedKeys: [_options_menu__WEBPACK_IMPORTED_MODULE_17__["defaultSelectedKeys"]],
        defaultOpenKeys: [_options_menu__WEBPACK_IMPORTED_MODULE_17__["defaultOpenKeys"]],
        mode: "inline",
        onClick: _this.handleMenuClick
      }, _options_menu__WEBPACK_IMPORTED_MODULE_17__["menu"].map(function (item) {
        var key = item.key,
            title = item.title,
            children = item.children;
        return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(SubMenu, {
          key: key,
          title: title
        }, children.map(function (jtem) {
          return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default.a.Item, {
            key: jtem.key
          }, jtem.value);
        }));
      }))), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_layout__WEBPACK_IMPORTED_MODULE_11___default.a, null, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(Content, {
        style: {
          margin: '0 16px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_5___default.a, {
        style: {
          margin: '16px 0'
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_5___default.a.Item, null, breadParent), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_5___default.a.Item, null, breadChild)), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        style: {
          padding: 24,
          background: '#fff',
          minHeight: '100%'
        }
      }, data.map(function (item) {
        var thumbnailUrl = item.thumbnailUrl,
            id = item.id,
            hoverText = item.hoverText;
        var menu = react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default.a, null, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default.a.Item, {
          key: "add-".concat(id),
          onClick: _this.handleAdd
        }, "\u65B0\u589E"), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_13___default.a.Item, {
          key: "delete-".concat(id),
          onClick: function onClick() {
            return _this.handleDelete(item);
          }
        }, "\u5220\u9664"));
        return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_1___default.a, {
          title: hoverText,
          key: "fragment-".concat(id)
        }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_card__WEBPACK_IMPORTED_MODULE_7___default.a.Grid, {
          className: "card"
        }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, {
          overlay: menu,
          trigger: ['contextMenu']
        }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("img", {
          src: thumbnailUrl,
          onClick: function onClick() {
            return _this.handleClick(item);
          }
        }))));
      }))), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(Footer, {
        style: {
          textAlign: 'center'
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, "\u4F60\u7761\u4E86\u4E00\u4E0B\u5348\uFF0C\u9192\u7684\u65F6\u5019\u5C4B\u5B50\u91CC\u9ED1\u6F06\u6F06\uFF0C\u4E00\u70B9\u58F0\u97F3\u90FD\u6CA1\u6709\u3002\u62AC\u5934\u671B\u4E86\u671B\u7A97\u5916\uFF0C\u5929\u8FD8\u6CA1\u5B8C\u5168\u9ED1\u3002\u56DB\u5904\u6478\u4E86\u6478\uFF0C\u5728\u6795\u5934\u4E0B\u627E\u5230\u624B\u673A\uFF0C\u6253\u5F00\u540E\u5C4F\u5E55\u4EAE\u8D77\uFF0C\u5E72\u51C0\uFF0C\u6CA1\u6709\u4E00\u6761\u4FE1\u606F"), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", null, "\u6253\u5F00\u7535\u8111\uFF0C\u6253\u5F00 github\u3002pull request \u5199\u5F97\u5F88\u83DC\uFF0Ccollaborators \u90FD\u5728\u55B7\u4F60\uFF0C\u4F46\u5FFD\u7136\u5C31\u4E0D\u5B64\u72EC\u4E86"))));
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "MainPage"
      }, _this.generateMainPage());
    });

    _this.state = {
      data: [],
      breadParent: _options_menu__WEBPACK_IMPORTED_MODULE_17__["defaultOpenKeys"],
      breadChild: _options_menu__WEBPACK_IMPORTED_MODULE_17__["defaultSelectedKeys"]
    };
    return _this;
  }

  return MainPage;
}(react__WEBPACK_IMPORTED_MODULE_14__["Component"]);



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
//# sourceMappingURL=3.js.map