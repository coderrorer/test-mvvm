/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _compiler = __webpack_require__(2);
	
	var _compiler2 = _interopRequireDefault(_compiler);
	
	var _util = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _instance = null;
	
	var MVVM = function () {
	    function MVVM(config) {
	        _classCallCheck(this, MVVM);
	
	        this.options = Object.assign({}, {
	            template: '',
	            style: '',
	            data: {},
	            watch: {},
	            components: {}
	        }, config);
	        this.data = (0, _util.extendDeep)(this.options.data);
	        this._data = {};
	        this.observer = new _util.Event();
	        this.init();
	    }
	
	    _createClass(MVVM, [{
	        key: 'init',
	        value: function init() {
	            var dom = (0, _compiler2.default)(this, this.options.template);
	            document.querySelector("app").appendChild(dom);
	            console.log(this.data);
	            for (var item in this.options.data) {
	                this.data[item] = this.options.data[item];
	            }
	            if (this.options.ready && typeof this.options.ready == 'function') this.options.ready.apply(this);
	        }
	    }]);
	
	    return MVVM;
	}();
	
	exports.default = MVVM;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * template render function
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */
	
	exports.default = compiler;
	
	var _index = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function compiler(mvvm, node) {
	    var util = Util.getInstance();
	    util.mvvm = mvvm;
	    util.doms = util.parseHTML(node);
	    util.walk(util.doms, mvvm);
	    return util.doms;
	}
	var _util = null;
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	
	        this.doms = null;
	    }
	    //通过此方法深度优先遍历HTML模版
	
	
	    _createClass(Util, [{
	        key: 'walk',
	        value: function walk(node, mvvm) {
	            var _this = this;
	
	            var childNodes = node.childNodes;
	            if (childNodes && childNodes.length) {
	                childNodes.forEach(function (child) {
	                    if (child.nodeName == '#text') {
	                        //节点类型为text时,处理双重花括号的变量绑定
	                        if (child.textContent) {
	                            if (child.textContent.indexOf('{{') != -1 && child.textContent.indexOf('}}') != -1) {
	                                var bindName = child.textContent.substring(child.textContent.indexOf('{{') + 2, child.textContent.indexOf('}}'));
	                                (0, _index.doubleQuoteVM)(bindName, child, mvvm);
	                                child.textContent = "";
	                            }
	                        }
	                    }
	                    if (child.attributes && child.attributes.length) {
	                        var _loop = function _loop(i) {
	                            var attribute = child.attributes[i];
	                            if (attribute.nodeName.indexOf('@') == 0) {
	                                //如果属性以@开头,则给该DOM绑定监听事件
	                                var eventName = new String(attribute.nodeName);
	                                eventName = eventName.substr(1);
	                                _this.addListener(child, eventName, mvvm.options.methods[attribute.nodeValue]);
	                            } else if (attribute.nodeName.indexOf(':') == 0) {
	                                //如果属性以:开头,则将该属性的值绑定为对应的变量值
	                                var propName = new String(attribute.nodeName);
	                                propName = propName.substr(1);
	                                (0, _index.propertyVM)(attribute.nodeValue, child, mvvm, propName);
	                            } else if (attribute.nodeName == 'm-model') {
	                                //two-way binding  不仅将INPUT的值绑定为对应变量值,还要给INPUT添加ONINPUT事件
	                                (0, _index.modelVM)(attribute.nodeValue, child, mvvm);
	                                _this.addListener(child, 'input', function (e) {
	                                    mvvm.data[attribute.nodeValue] = e.target.value;
	                                });
	                            }
	                            //todo add if/else for-loop
	                        };
	
	                        //遍历节点的属性
	                        for (var i = 0; i < child.attributes.length; i++) {
	                            _loop(i);
	                        }
	                    }
	                    if (child.childNodes && child.childNodes.length) {
	                        _this.walk(child, mvvm);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'addListener',
	        value: function addListener(node, eventName, fn) {
	            node.addEventListener(eventName, fn.bind(this.mvvm));
	        }
	    }, {
	        key: 'parseHTML',
	        value: function parseHTML(str) {
	            // Elements that require special handling when
	            // not encapsulated in their standard containers:
	            var specials = {
	                td: {
	                    container: 'table',
	                    html: '<tbody><tr class="x_root"></tr></tbody>'
	                },
	                tr: {
	                    container: 'table',
	                    html: '<tbody class="x_root"></tbody>'
	                },
	                thead: {
	                    container: 'table',
	                    html: '<tbody class="x_root"></tbody>'
	                },
	                caption: {
	                    container: 'table',
	                    html: '<tbody class="x_root"></tbody>'
	                },
	                li: {
	                    container: 'ul'
	                },
	                dd: {
	                    container: 'dl'
	                },
	                dt: {
	                    container: 'dl'
	                },
	                optgroup: {
	                    container: 'select'
	                },
	                option: {
	                    container: 'select'
	                }
	            };
	            var container, docfrag, output, root, special, tags;
	            // Use native templating where available:
	            container = document.createElement('TEMPLATE');
	            if (container.content) {
	                container.innerHTML = str;
	                output = container.content;
	            }
	            // Fallback for Internet Explorer, early editions of Edge,
	            // and Android < 4.4:
	            else {
	
	                    // See if the template string starts with a "<tag",
	                    // and check if that tag is one of our specials:
	
	                    tags = str.match(/^\s*<([^>\s]+)/);
	                    if (tags) {
	                        special = specials[tags[1].toLowerCase()];
	                        if (special) {
	
	                            // We have a match! Inject the template into an appropriate
	                            // container, encapsulated in additional markup if necessary:
	
	                            container = document.createElement(special.container);
	                            if (special.html) {
	                                container.innerHTML = special.html;
	                                root = container.querySelector('.x_root');
	                                root.innerHTML = str;
	                            } else {
	                                container.innerHTML = str;
	                                root = container;
	                            }
	                        }
	                    }
	
	                    // Templates that don't require special handling just
	                    // get injected into a DIV:
	
	                    if (!root) {
	                        container = document.createElement('DIV');
	                        container.innerHTML = str;
	                        root = container;
	                    }
	
	                    // The "root" is the element that contains the DOM
	                    // represented by the original template string. The "root"
	                    // element may not be the same as the outer "container".
	                    // Iterate through the root's child elements, moving them
	                    // to an empty DocumentFragment instance:
	
	                    docfrag = document.createDocumentFragment();
	                    while (root.firstChild) {
	                        docfrag.appendChild(root.firstChild);
	                    }
	                    output = docfrag;
	                }
	            return output;
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (_util) return _util;else return new Util();
	        }
	    }]);

	    return Util;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.modelVM = exports.propertyVM = exports.doubleQuoteVM = undefined;
	
	var _doublequote = __webpack_require__(4);
	
	var _doublequote2 = _interopRequireDefault(_doublequote);
	
	var _property = __webpack_require__(5);
	
	var _property2 = _interopRequireDefault(_property);
	
	var _model = __webpack_require__(6);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var doubleQuoteVM = exports.doubleQuoteVM = _doublequote2.default;
	var propertyVM = exports.propertyVM = _property2.default;
	var modelVM = exports.modelVM = _model2.default;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (bindName, node, mvvm) {
	    mvvm.observer.on(bindName + '_Changed', function (v) {
	        mvvm._data[bindName] = v;
	        node.textContent = v;
	    });
	    Object.defineProperty(mvvm.data, bindName, {
	        get: function get() {
	            return mvvm._data[bindName];
	        },
	        set: function set(v) {
	            console.log(bindName, v);
	            if (v === mvvm._data[bindName]) return;
	            mvvm.observer.trigger(bindName + '_Changed', v);
	        }
	    });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (bindName, node, mvvm, propertyName) {
	    mvvm.observer.on(bindName + '_Changed', function (v) {
	        mvvm._data[bindName] = v;
	        node.setAttribute(propertyName, v);
	    });
	    Object.defineProperty(mvvm.data, bindName, {
	        get: function get() {
	            return mvvm._data[bindName];
	        },
	        set: function set(v) {
	            console.log(bindName, v);
	            if (v === mvvm._data[bindName]) return;
	            mvvm.observer.trigger(bindName + '_Changed', v);
	        }
	    });
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (bindName, node, mvvm) {
	    mvvm.observer.on(bindName + '_Changed', function (v) {
	        mvvm._data[bindName] = v;
	        node.value = v;
	    });
	    Object.defineProperty(mvvm.data, bindName, {
	        get: function get() {
	            return mvvm._data[bindName];
	        },
	        set: function set(v) {
	            console.log(bindName, v);
	            if (v === mvvm._data[bindName]) return;
	            mvvm.observer.trigger(bindName + '_Changed', v);
	        }
	    });
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.extendDeep = extendDeep;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function extendDeep(parent, child) {
	    child = child || {};
	    for (var i in parent) {
	        if (parent.hasOwnProperty(i)) {
	            //检测当前属性是否为对象
	            if (_typeof(parent[i]) === "object") {
	                //如果当前属性为对象，还要检测它是否为数组
	                //这是因为数组的字面量表示和对象的字面量表示不同
	                //前者是[],而后者是{}
	                child[i] = Object.prototype.toString.call(parent[i]) === "[object Array]" ? [] : {};
	                //递归调用extend
	                extendDeep(parent[i], child[i]);
	            } else {
	                child[i] = parent[i];
	            }
	        }
	    }
	    return child;
	}
	
	var Event = exports.Event = function () {
	    function Event() {
	        _classCallCheck(this, Event);
	    }
	
	    _createClass(Event, [{
	        key: "on",
	        value: function on(name, lister) {
	            if (!name) {
	                return;
	            }
	            if (!this._events_) {
	                this._events_ = {};
	            }
	            var events = this._events_;
	            if (!events[name]) {
	                events[name] = [];
	            }
	            events[name].push(lister);
	        }
	    }, {
	        key: "trigger",
	        value: function trigger(name) {
	            var events = this._events_;
	            if (!name || !events || !events[name]) {
	                return;
	            }
	            var queue = events[name];
	            var length = queue.length;
	            var args = Array.prototype.slice.call(arguments, 1);
	            for (var i = 0; i < length; i++) {
	                queue[i].apply(this, args);
	            }
	        }
	    }]);
	
	    return Event;
	}();
	
	;

/***/ }
/******/ ]);
//# sourceMappingURL=index.map