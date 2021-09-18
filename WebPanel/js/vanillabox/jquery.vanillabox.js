/**
 * @license Vanillabox
 * (C) 2013 cocopon.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Util = require('./util.js');

/**
 * @namespace
 */
var Animation = {};

Animation.None = {
	showMask: function showMask(mask) {
		return mask.getElement().show().promise();
	},

	hideMask: function hideMask(mask) {
		return mask.getElement().hide();
	},

	showFrame: function showFrame(frame) {
		Animation.None.resizeFrame(frame);
		return frame.getElement().show().promise();
	},

	hideFrame: function hideFrame(frame) {
		return frame.getElement().hide();
	},

	resizeFrame: function resizeFrame(frame) {
		var container = frame.getContainer();
		var containerSize = container.getSize();
		var offset = frame.getPreferredOffset(containerSize);

		container.getElement().css({
			width: containerSize.width,
			height: containerSize.height
		});

		frame.getElement().css({
			left: offset.left,
			top: offset.top
		});

		return Util.Deferred.emptyPromise();
	},

	showContent: function showContent(content) {
		return content.getElement().show().promise();
	},

	hideContent: function hideContent(content) {
		return content.getElement().hide().promise();
	}
};

Animation.Default = {
	showMask: function showMask(mask) {
		return mask.getElement().fadeIn(200).promise();
	},

	hideMask: function hideMask(mask) {
		return mask.getElement().fadeOut(300).promise();
	},

	animateFrame_: function animateFrame_(frame, containerSize, offset, duration) {
		var container = frame.getContainer();
		var containerElem = container.getElement();
		containerElem.stop();
		var containerPromise = containerElem.animate({
			width: containerSize.width,
			height: containerSize.height
		}, duration);

		var frameElem = frame.getElement();
		frameElem.stop();
		var framePromise = frameElem.animate({
			left: offset.left,
			top: offset.top
		}, duration);

		return $.when(containerPromise, framePromise);
	},

	showFrame: function showFrame(frame) {
		var container = frame.getContainer();
		var containerSize = container.getSize();
		var offset = frame.getPreferredOffset(containerSize);

		container.getElement().css({
			width: containerSize.width,
			height: containerSize.height
		});

		frame.getElement().css({
			left: offset.left,
			top: offset.top
		});

		return Util.Deferred.emptyPromise();
	},

	hideFrame: function hideFrame() {
		return Util.Deferred.emptyPromise();
	},

	resizeFrame: function resizeFrame(frame) {
		var container = frame.getContainer();
		var containerSize = container.getSize();
		var offset = frame.getPreferredOffset(containerSize);

		return Animation.Default.animateFrame_(frame, containerSize, offset, 300);
	},

	showContent: function showContent(content) {
		return content.getElement().fadeIn(200).promise();
	},

	hideContent: function hideContent(content) {
		return content.getElement().fadeOut(300).promise();
	}
};

module.exports = Animation;

},{"./util.js":20}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Animation = require('./animation.js');

/**
 * @alias AnimationProvider
 */

var AnimationProvider = (function () {
	function AnimationProvider() {
		_classCallCheck(this, AnimationProvider);
	}

	_createClass(AnimationProvider, null, [{
		key: 'get',
		value: function get(id) {
			var animation = AnimationProvider.ANIMATIONS_[id];
			return animation || AnimationProvider.getDefault();
		}
	}, {
		key: 'getDefault',
		value: function getDefault() {
			return Animation.Default;
		}
	}]);

	return AnimationProvider;
})();

AnimationProvider.ANIMATIONS_ = {
	'none': Animation.None,
	'default': Animation.Default
};

module.exports = AnimationProvider;

},{"./animation.js":1}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Events = require('./events.js');
var Util = require('./util.js');

/**
 * @constructor
 */

var Button = (function () {
	function Button(config) {
		_classCallCheck(this, Button);

		this.cls_ = config.cls;
		this.disabled_ = Util.getOrDefault(config.disabled, false);

		this.setup_();
	}

	_createClass(Button, [{
		key: 'setup_',
		value: function setup_() {
			var elem = $('<div>');
			elem.addClass(Util.CSS_PREFIX + 'button');
			if (this.cls_) {
				elem.addClass(this.cls_);
			}

			// Enable :active pseudo-class on touch device
			elem.attr('ontouchstart', 'void(0)');

			this.elem_ = elem;

			this.attach_();
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			this.elem_ = null;
		}
	}, {
		key: 'attach_',
		value: function attach_() {
			var elem = this.getElement();
			elem.on('click', $.proxy(this.onClick_, this));
		}
	}, {
		key: 'detach_',
		value: function detach_() {
			var elem = this.getElement();
			elem.off('click', this.onClick_);
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.elem_;
		}
	}, {
		key: 'isDisabled',
		value: function isDisabled() {
			return this.disabled_;
		}
	}, {
		key: 'setDisabled',
		value: function setDisabled(disabled) {
			var elem = this.elem_;

			this.disabled_ = disabled;

			if (this.disabled_) {
				elem.addClass(Util.CSS_PREFIX + 'disabled');
			} else {
				elem.removeClass(Util.CSS_PREFIX + 'disabled');
			}
		}
	}, {
		key: 'onClick_',
		value: function onClick_(e) {
			e.stopPropagation();

			if (!this.isDisabled()) {
				$(this).trigger(Events.CLICK);
			}
		}
	}]);

	return Button;
})();

module.exports = Button;

},{"./events.js":9,"./util.js":20}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AnimationProvider = require('./animation_provider.js');
var Events = require('./events.js');
var Util = require('./util.js');

/**
 * @constructor
 */

var Container = (function () {
	function Container(opt_config) {
		_classCallCheck(this, Container);

		var config = opt_config || {};

		this.animation_ = Util.getOrDefault(config.animation, AnimationProvider.getDefault());
		this.adjustToWindow_ = Util.getOrDefault(config.adjustToWindow, 'both');

		this.setup_();
	}

	_createClass(Container, [{
		key: 'setup_',
		value: function setup_() {
			var elem = $('<div>');
			elem.addClass(Util.CSS_PREFIX + 'container');
			this.elem_ = elem;

			this.attach_();
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			this.detach_();
			this.elem_ = null;
		}
	}, {
		key: 'attach_',
		value: function attach_() {}
	}, {
		key: 'detach_',
		value: function detach_() {
			this.detachContent_();
		}
	}, {
		key: 'attachContent_',
		value: function attachContent_() {
			var content = this.getContent();

			$(content).on(Events.COMPLETE, $.proxy(this.onContentComplete_, this));
		}
	}, {
		key: 'detachContent_',
		value: function detachContent_() {
			var content = this.getContent();
			if (!content) {
				return;
			}

			$(content).off(Events.COMPLETE, this.onContentComplete_);
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.elem_;
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			return this.content_;
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			var _this = this;

			var animation = this.animation_;

			if (content === this.content_) {
				return;
			}

			if (this.content_) {
				(function () {
					_this.detachContent_();

					var prevContent = _this.content_;
					animation.hideContent(prevContent).done(function () {
						_this.onContentHide_(prevContent);
					});
				})();
			}

			this.content_ = content;
			if (!this.content_) {
				return;
			}

			this.attachContent_();

			if (this.maxContentSize_) {
				this.applyMaxContentSize_();
			}

			var elem = this.getElement();
			var contentElem = this.content_.getElement();
			var contentElems = elem.find('> *');
			if (contentElems.length === 0) {
				elem.append(contentElem);
			} else {
				// Insert newer content behind all existing contents
				contentElem.insertBefore(contentElems.first());
			}

			animation.showContent(this.content_).done(function () {
				_this.onContentShow_();
			});
		}
	}, {
		key: 'getSize',
		value: function getSize() {
			var content = this.getContent();

			var contentSize = {
				width: 0,
				height: 0
			};
			if (content) {
				contentSize = content.getSize();
			}

			return {
				width: Math.max(contentSize.width, Container.MIN_WIDTH),
				height: Math.max(contentSize.height, Container.MIN_HEIGHT)
			};
		}
	}, {
		key: 'needsAdjustment',
		value: function needsAdjustment(direction) {
			return this.adjustToWindow_ === true || this.adjustToWindow_ === 'both' || this.adjustToWindow_ === direction;
		}
	}, {
		key: 'updateMaxContentSize_',
		value: function updateMaxContentSize_() {
			var safetyMargin = Container.CONTENT_SIZE_SAFETY_MARGIN;
			this.maxContentSize_ = {
				width: this.needsAdjustment('horizontal') ? Util.Dom.getViewportWidth() - safetyMargin : Number.MAX_VALUE,
				height: this.needsAdjustment('vertical') ? Util.Dom.getViewportHeight() - safetyMargin : Number.MAX_VALUE
			};

			var content = this.content_;
			if (!content) {
				return;
			}

			this.applyMaxContentSize_();
		}
	}, {
		key: 'applyMaxContentSize_',
		value: function applyMaxContentSize_() {
			var content = this.getContent();
			var maxSize = this.maxContentSize_;

			content.setMaxContentSize(Math.max(maxSize.width, Container.MIN_WIDTH), Math.max(maxSize.height, Container.MIN_HEIGHT));
		}
	}, {
		key: 'layout',
		value: function layout() {
			var content = this.getContent();
			var contentSize = content.getSize();

			content.setOffset(-Math.round(contentSize.width / 2), -Math.round(contentSize.height / 2));
		}
	}, {
		key: 'onContentComplete_',
		value: function onContentComplete_() {
			this.layout();
		}
	}, {
		key: 'onContentShow_',
		value: function onContentShow_() {
			$(this).trigger(Events.CONTENT_SHOW, [this, this.getContent()]);
		}
	}, {
		key: 'onContentHide_',
		value: function onContentHide_(content) {
			$(this).trigger(Events.CONTENT_HIDE, [this, content]);
		}
	}]);

	return Container;
})();

Container.CONTENT_SIZE_SAFETY_MARGIN = 100;
Container.MIN_WIDTH = 200;
Container.MIN_HEIGHT = 150;

module.exports = Container;

},{"./animation_provider.js":2,"./events.js":9,"./util.js":20}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Events = require('./events.js');
var Util = require('./util.js');

/**
 * @constructor
 */

var Content = (function () {
	function Content(opt_config) {
		_classCallCheck(this, Content);

		var config = opt_config || {};

		this.loaded_ = false;
		this.success_ = false;

		this.path_ = config.path;
		this.title_ = Util.getOrDefault(config.title, '');

		this.setup_();
	}

	_createClass(Content, [{
		key: 'setup_',
		value: function setup_() {
			var elem = $('<div>');
			elem.addClass(Util.CSS_PREFIX + 'content');
			this.elem_ = elem;

			this.setupInternal_();
			this.attach_();
		}
	}, {
		key: 'setupInternal_',
		value: function setupInternal_() {}
	}, {
		key: 'attach_',
		value: function attach_() {}
	}, {
		key: 'detach_',
		value: function detach_() {}
	}, {
		key: 'dispose',
		value: function dispose() {
			this.detach_();
			this.elem_.remove();
			this.elem_ = null;
		}
	}, {
		key: 'shouldUnloadOnHide',
		value: function shouldUnloadOnHide() {
			return false;
		}
	}, {
		key: 'isLoaded',
		value: function isLoaded() {
			return this.loaded_;
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.elem_;
		}
	}, {
		key: 'getTitle',
		value: function getTitle() {
			return this.title_;
		}
	}, {
		key: 'getSize',
		value: function getSize() {
			var elem = this.getElement();

			return {
				width: elem.width(),
				height: elem.height()
			};
		}
	}, {
		key: 'setOffset',
		value: function setOffset(left, top) {
			var elem = this.getElement();

			elem.css({
				marginLeft: left,
				marginTop: top
			});
		}
	}, {
		key: 'setMaxContentSize',
		value: function setMaxContentSize(width, height) {
			this.getElement().css({
				maxWidth: width,
				maxHeight: height
			});
		}
	}, {
		key: 'load',
		value: function load() {
			var elem = this.getElement();

			elem.addClass(Util.CSS_PREFIX + 'loading');

			if (this.loaded_) {
				this.onComplete_(this.success_);
				return;
			}

			this.loadInternal_();
		}
	}, {
		key: 'loadInternal_',
		value: function loadInternal_() {}
	}, {
		key: 'unload',
		value: function unload() {
			this.unloadInternal_();
			this.loaded_ = false;
		}
	}, {
		key: 'unloadInternal_',
		value: function unloadInternal_() {}
	}, {
		key: 'onComplete_',
		value: function onComplete_(success) {
			var elem = this.getElement();

			this.loaded_ = true;
			this.success_ = success;

			elem.removeClass(Util.CSS_PREFIX + 'loading');
			if (!success) {
				elem.addClass(Util.CSS_PREFIX + 'error');
			}

			$(this).trigger(Events.COMPLETE, success);
		}
	}]);

	return Content;
})();

module.exports = Content;

},{"./events.js":9,"./util.js":20}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var IframeContent = require('./iframe_content.js');
var ImageContent = require('./image_content.js');

/**
 * @alias ContentFactory
 */

var ContentFactory = (function () {
	function ContentFactory() {
		_classCallCheck(this, ContentFactory);
	}

	_createClass(ContentFactory, null, [{
		key: 'create',
		value: function create(target, options) {
			var factoryFn = ContentFactory.FACTORIES_[options.type];

			if (!factoryFn) {
				throw new VanillaException(VanillaException.Types.INVALID_TYPE);
			}

			return factoryFn(target, options);
		}
	}]);

	return ContentFactory;
})();

ContentFactory.FACTORIES_ = {
	'image': function image(target) {
		return new ImageContent({
			path: target.attr('href'),
			title: target.attr('title')
		});
	},
	'iframe': function iframe(target, options) {
		return new IframeContent({
			path: target.attr('href'),
			preferredWidth: options.preferredWidth,
			preferredHeight: options.preferredHeight,
			title: target.attr('title')
		});
	}
};

module.exports = ContentFactory;

},{"./iframe_content.js":12,"./image_content.js":13}],7:[function(require,module,exports){
'use strict';

module.exports = {
	'animation': 'default',
	'closeButton': false,
	'adjustToWindow': 'both',
	'keyboard': true,
	'loop': false,
	'preferredHeight': 600,
	'preferredWidth': 800,
	'repositionOnScroll': false,
	'type': 'image',
	'grouping': true
};

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = require('./content.js');
var Events = require('./events.js');
var Util = require('./util.js');

/**
 * @constructor
 * @extends Content
 */

var EmptyContent = (function (_Content) {
	_inherits(EmptyContent, _Content);

	function EmptyContent() {
		_classCallCheck(this, EmptyContent);

		_get(Object.getPrototypeOf(EmptyContent.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(EmptyContent, [{
		key: 'setup_',
		value: function setup_() {
			_get(Object.getPrototypeOf(EmptyContent.prototype), 'setup_', this).call(this);

			this.elem_.addClass(Util.CSS_PREFIX + 'empty');
		}
	}, {
		key: 'load',
		value: function load() {
			var _this = this;

			setTimeout(function () {
				$(_this).trigger(Events.COMPLETE, true);
			}, 0);
		}
	}]);

	return EmptyContent;
})(Content);

module.exports = EmptyContent;

},{"./content.js":5,"./events.js":9,"./util.js":20}],9:[function(require,module,exports){
'use strict';

var Util = require('./util.js');

/**
 * @alias Events
 */
var Events = {
	CHANGE: Util.EVENT_PREFIX + 'change',
	CLICK: Util.EVENT_PREFIX + 'click',
	COMPLETE: Util.EVENT_PREFIX + 'complete',
	CONTENT_HIDE: Util.EVENT_PREFIX + 'content_hide',
	CONTENT_SHOW: Util.EVENT_PREFIX + 'content_show',
	HIDE: Util.EVENT_PREFIX + 'hide',
	LOAD: Util.EVENT_PREFIX + 'load',
	SHOW: Util.EVENT_PREFIX + 'show'
};

module.exports = Events;

},{"./util.js":20}],10:[function(require,module,exports){
/**
 * @constructor
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var VanillaException = (function () {
	function VanillaException(type) {
		_classCallCheck(this, VanillaException);

		this.type_ = type;
	}

	_createClass(VanillaException, [{
		key: 'getType',
		value: function getType() {
			return this.type_;
		}
	}]);

	return VanillaException;
})();

VanillaException.Types = {
	INVALID_TYPE: 'invalid_type',
	NO_IMAGE: 'no_image'
};

module.exports = VanillaException;

},{}],11:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Container = require('./container.js');
var Util = require('./util.js');

/**
 * @constructor
 */

var Frame = (function () {
	function Frame(opt_config) {
		_classCallCheck(this, Frame);

		var config = opt_config || {};

		var container = new Container({
			animation: config.animation,
			adjustToWindow: config.adjustToWindow
		});
		this.container_ = container;

		this.setup_();
		this.attach_();
	}

	_createClass(Frame, [{
		key: 'setup_',
		value: function setup_() {
			var elem = $('<div>');
			elem.addClass(Util.CSS_PREFIX + 'frame');
			this.elem_ = elem;

			var container = this.container_;
			this.elem_.append(container.getElement());
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			this.container_.dispose();
			this.container_ = null;

			this.detach_();
			this.elem_ = null;
		}
	}, {
		key: 'attach_',
		value: function attach_() {
			this.elem_.on('click', $.proxy(this.onClick_, this));
		}
	}, {
		key: 'detach_',
		value: function detach_() {
			this.elem_.off('click', this.onClick_);
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.elem_;
		}
	}, {
		key: 'getContainer',
		value: function getContainer() {
			return this.container_;
		}
	}, {
		key: 'getPreferredOffset',
		value: function getPreferredOffset(contentSize) {
			var container = this.getContainer();
			var containerElem = container.getElement();

			// Save current size
			var w = containerElem.width();
			var h = containerElem.height();

			// Set specified size temporarily
			containerElem.width(contentSize.width);
			containerElem.height(contentSize.height);

			// Get preferred position
			var $window = $(window);
			var elem = this.getElement();
			var ow = Util.Dom.getViewportWidth();
			var oh = Util.Dom.getViewportHeight();
			var left = Math.round($window.scrollLeft() + (ow - elem.outerWidth()) / 2);
			var top = Math.max(Math.round($window.scrollTop() + (oh - elem.outerHeight()) / 2), 0);

			// Restore original size
			containerElem.width(w);
			containerElem.height(h);

			return {
				left: left,
				top: top
			};
		}
	}, {
		key: 'onClick_',
		value: function onClick_(e) {
			e.stopPropagation();
		}
	}]);

	return Frame;
})();

Frame.RESIZE_TIMEOUT_DELAY = 500;

module.exports = Frame;

},{"./container.js":4,"./util.js":20}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = require('./content.js');
var Util = require('./util.js');

/**
 * @constructor
 * @extends Content
 */

var IframeContent = (function (_Content) {
	_inherits(IframeContent, _Content);

	function IframeContent(opt_config) {
		_classCallCheck(this, IframeContent);

		var config = opt_config || {};

		_get(Object.getPrototypeOf(IframeContent.prototype), 'constructor', this).call(this, config);

		this.preferredWidth_ = config.preferredWidth;
		this.preferredHeight_ = config.preferredHeight;
	}

	_createClass(IframeContent, [{
		key: 'setupInternal_',
		value: function setupInternal_() {
			var iframeElem = $('<iframe>');
			iframeElem.attr({
				'frameborder': 0, // Need to disable border in IE
				'allowfullscreen': true
			});
			this.elem_.append(iframeElem);
			this.iframeElem_ = iframeElem;
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			_get(Object.getPrototypeOf(IframeContent.prototype), 'dispose', this).call(this);

			this.iframeElem_ = null;
		}
	}, {
		key: 'shouldUnloadOnHide',
		value: function shouldUnloadOnHide() {
			return true;
		}
	}, {
		key: 'attach_',
		value: function attach_() {
			var iframeElem = this.iframeElem_;
			iframeElem.on('load', $.proxy(this.onLoad_, this));
			iframeElem.on('error', $.proxy(this.onError_, this));
		}
	}, {
		key: 'detach_',
		value: function detach_() {
			var iframeElem = this.iframeElem_;
			iframeElem.off('load', this.onLoad_);
			iframeElem.off('error', this.onError_);
		}
	}, {
		key: 'getFlexibleElement',
		value: function getFlexibleElement() {
			// In iOS, cannot restrict a size of an iframe element
			// so return an outer element instead
			return Util.Browser.isIos() ? this.getElement() : this.iframeElem_;
		}
	}, {
		key: 'getSize',
		value: function getSize() {
			var elem = this.getFlexibleElement();
			return {
				width: elem.width(),
				height: elem.height()
			};
		}
	}, {
		key: 'setMaxContentSize',
		value: function setMaxContentSize(width, height) {
			var elem = this.getFlexibleElement();
			elem.css({
				maxWidth: width,
				maxHeight: height
			});
		}
	}, {
		key: 'loadInternal_',
		value: function loadInternal_() {
			this.iframeElem_.attr('src', this.path_);
		}
	}, {
		key: 'unloadInternal_',
		value: function unloadInternal_() {
			this.iframeElem_.attr('src', IframeContent.EMPTY_SRC);

			var elem = this.getFlexibleElement();
			elem.width('');
			elem.height('');
		}
	}, {
		key: 'onLoad_',
		value: function onLoad_() {
			var iframeElem = this.iframeElem_;

			var src = iframeElem.attr('src');
			if (!src) {
				// Ignore unwanted load event that is fired when appending to DOM
				return;
			}
			if (src === IframeContent.EMPTY_SRC) {
				return;
			}

			var elem = this.getFlexibleElement();
			elem.width(this.preferredWidth_);
			elem.height(this.preferredHeight_);

			this.onComplete_(true);
		}
	}, {
		key: 'onError_',
		value: function onError_() {
			this.onComplete_(false);
		}
	}]);

	return IframeContent;
})(Content);

IframeContent.EMPTY_SRC = 'about:blank';

module.exports = IframeContent;

},{"./content.js":5,"./util.js":20}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = require('./content.js');

/**
 * @constructor
 * @extends Content
 */

var ImageContent = (function (_Content) {
	_inherits(ImageContent, _Content);

	function ImageContent(opt_config) {
		_classCallCheck(this, ImageContent);

		_get(Object.getPrototypeOf(ImageContent.prototype), 'constructor', this).call(this, opt_config);
	}

	_createClass(ImageContent, [{
		key: 'setupInternal_',
		value: function setupInternal_() {
			var imgElem = $('<img>');
			this.elem_.append(imgElem);
			this.imgElem_ = imgElem;
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			_get(Object.getPrototypeOf(ImageContent.prototype), 'dispose', this).call(this);
			this.imgElem_ = null;
		}
	}, {
		key: 'attach_',
		value: function attach_() {
			var imgElem = this.imgElem_;
			imgElem.on('load', $.proxy(this.onLoad_, this));
			imgElem.on('error', $.proxy(this.onError_, this));
		}
	}, {
		key: 'detach_',
		value: function detach_() {
			var imgElem = this.imgElem_;
			imgElem.off('load', this.onLoad_);
			imgElem.off('error', this.onError_);
		}
	}, {
		key: 'setMaxContentSize',
		value: function setMaxContentSize(width, height) {
			this.imgElem_.css({
				maxWidth: width,
				maxHeight: height
			});
		}
	}, {
		key: 'loadInternal_',
		value: function loadInternal_() {
			this.imgElem_.attr('src', this.path_);
		}
	}, {
		key: 'unloadInternal_',
		value: function unloadInternal_() {
			this.imgElem_.attr('src', ImageContent.EMPTY_SRC);
		}
	}, {
		key: 'onLoad_',
		value: function onLoad_() {
			if (this.imgElem_.attr('src') === ImageContent.EMPTY_SRC) {
				return;
			}

			this.onComplete_(true);
		}
	}, {
		key: 'onError_',
		value: function onError_() {
			this.onComplete_(false);
		}
	}]);

	return ImageContent;
})(Content);

ImageContent.EMPTY_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

module.exports = ImageContent;

},{"./content.js":5}],14:[function(require,module,exports){
'use strict';

var AnimationProvider = require('./animation_provider.js');
var DefaultConfig = require('./default_config.js');
var Vanillabox = require('./vanillabox.js');

$.fn.vanillabox = function (opt_config) {
	var config = {};
	$.extend(config, DefaultConfig);
	$.extend(config, opt_config);

	var targetElems = $(this);
	var animation = AnimationProvider.get(config['animation']);

	var box = new Vanillabox({
		animation: animation,
		closeButton: config['closeButton'],
		adjustToWindow: config['adjustToWindow'],
		keyboard: config['keyboard'],
		loop: config['loop'],
		preferredHeight: config['preferredHeight'],
		preferredWidth: config['preferredWidth'],
		repositionOnScroll: config['repositionOnScroll'],
		targets: targetElems,
		type: config['type'],
		grouping: config['grouping']
	});

	return box;
};

},{"./animation_provider.js":2,"./default_config.js":7,"./vanillabox.js":21}],15:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Util = require('./util.js');

/**
 * @constructor
 */

var Label = (function () {
	function Label(config) {
		_classCallCheck(this, Label);

		this.cls_ = config.cls;

		this.setup_();
	}

	_createClass(Label, [{
		key: 'setup_',
		value: function setup_() {
			var elem = $('<div>');
			elem.addClass(Util.CSS_PREFIX + 'label');
			if (this.cls_) {
				elem.addClass(this.cls_);
			}
			this.elem_ = elem;
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			this.elem_ = null;
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.elem_;
		}
	}, {
		key: 'getText',
		value: function getText() {
			return this.elem_.text();
		}
	}, {
		key: 'setText',
		value: function setText(text) {
			this.elem_.text(text);
		}
	}]);

	return Label;
})();

module.exports = Label;

},{"./util.js":20}],16:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Events = require('./events.js');
var Util = require('./util.js');

/**
 * @constructor
 */

var Mask = (function () {
	function Mask() {
		_classCallCheck(this, Mask);

		this.setup_();
	}

	_createClass(Mask, [{
		key: 'setup_',
		value: function setup_() {
			var $elem = $('<div>');
			$elem.addClass(Util.CSS_PREFIX + 'mask');

			this.elem_ = $elem;
			this.attach_();
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			this.detach_();
			this.elem_ = null;
		}
	}, {
		key: 'attach_',
		value: function attach_() {
			$(window).on('resize', $.proxy(this.onWindowResize_, this));

			var elem = this.getElement();
			elem.on('click', $.proxy(this.onClick_, this));
		}
	}, {
		key: 'detach_',
		value: function detach_() {
			$(window).off('resize', this.onWindowResize_);

			var elem = this.getElement();
			elem.off('click', this.onClick_);
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			return this.elem_;
		}
	}, {
		key: 'layout',
		value: function layout() {
			var elem = this.getElement();

			elem.width('');
			elem.height('');

			var $window = $(window);
			var $document = $(document);
			var w = Math.max($document.width(), $window.width());
			var h = Math.max($document.height(), $window.height());

			elem.width(w);
			elem.height(h);
		}
	}, {
		key: 'onWindowResize_',
		value: function onWindowResize_() {
			this.layout();
		}
	}, {
		key: 'onClick_',
		value: function onClick_() {
			$(this).trigger(Events.CLICK);
		}
	}]);

	return Mask;
})();

module.exports = Mask;

},{"./events.js":9,"./util.js":20}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Events = require('./events.js');
var Util = require('./util.js');

/**
 * The pager class manages a current page.
 * @constructor
 */

var Pager = (function () {
	function Pager(opt_config) {
		_classCallCheck(this, Pager);

		var config = opt_config || {};

		this.totalPages_ = Util.getOrDefault(config.totalPages, 1);
		this.allowsLoop_ = Util.getOrDefault(config.loop, false);

		this.setPage(Util.getOrDefault(config.page, 0));
	}

	/**
 * @return {Number} Current page of the pager.
 */

	_createClass(Pager, [{
		key: 'getPage',
		value: function getPage() {
			return this.currentPage_;
		}

		/**
  * @param {Number} page Current page of the pager.
  */
	}, {
		key: 'setPage',
		value: function setPage(page) {
			var currentIndex = this.currentPage_;
			var totalPages = this.getTotalPages();
			var newIndex = Math.min(Math.max(page, 0), totalPages - 1);

			this.currentPage_ = newIndex;

			if (currentIndex !== newIndex) {
				$(this).trigger(Events.CHANGE);
			}
		}

		/**
  * @return {Number} Total number of pages of the pager.
  */
	}, {
		key: 'getTotalPages',
		value: function getTotalPages() {
			return this.totalPages_;
		}

		/**
  * @return {Boolean} true if the current page has a previous page
  */
	}, {
		key: 'hasPrevious',
		value: function hasPrevious() {
			if (this.allowsLoop_) {
				return true;
			}

			return this.currentPage_ > 0;
		}

		/**
  * @return {Boolean} true if the current page has a next page
  */
	}, {
		key: 'hasNext',
		value: function hasNext() {
			if (this.allowsLoop_) {
				return true;
			}

			var totalPages = this.getTotalPages();
			return this.currentPage_ < totalPages - 1;
		}

		/**
  * Sets the current page to the next page.
  */
	}, {
		key: 'next',
		value: function next() {
			var totalPages = this.getTotalPages();
			var currentIndex = this.currentPage_;
			var nextIndex = currentIndex + 1;

			if (nextIndex > totalPages - 1) {
				nextIndex = this.allowsLoop_ ? 0 : totalPages - 1;
			}
			this.currentPage_ = nextIndex;

			if (currentIndex !== nextIndex) {
				$(this).trigger(Events.CHANGE);
			}
		}

		/**
  * Sets the current page to the previous page.
  */
	}, {
		key: 'previous',
		value: function previous() {
			var totalPages = this.getTotalPages();
			var currentIndex = this.currentPage_;
			var prevIndex = currentIndex - 1;

			if (prevIndex < 0) {
				prevIndex = this.allowsLoop_ ? totalPages - 1 : 0;
			}
			this.currentPage_ = prevIndex;

			if (currentIndex !== prevIndex) {
				$(this).trigger(Events.CHANGE);
			}
		}
	}]);

	return Pager;
})();

module.exports = Pager;

},{"./events.js":9,"./util.js":20}],18:[function(require,module,exports){
'use strict';

require('./jquery_fn.js');
require('./test.js');

},{"./jquery_fn.js":14,"./test.js":19}],19:[function(require,module,exports){
'use strict';

var Container = require('./container.js');
var DefaultConfig = require('./default_config.js');
var Events = require('./events.js');
var Pager = require('./pager.js');
var Util = require('./util.js');
var Vanillabox = require('./vanillabox.js');
var VanillaException = require('./exception.js');

// For testing of private classes
$.fn.vanillabox['privateClasses_'] = {
	'Container': Container,
	'Events': Events,
	'DEFAULT_CONFIG': DefaultConfig,
	'Pager': Pager,
	'Util': Util,
	'Vanillabox': Vanillabox,
	'VanillaException': VanillaException
};

},{"./container.js":4,"./default_config.js":7,"./events.js":9,"./exception.js":10,"./pager.js":17,"./util.js":20,"./vanillabox.js":21}],20:[function(require,module,exports){
/**
 * @namespace
 */
'use strict';

var Util = {
	/**
  * @constant
  * @type {String}
  */
	ROOT_CSS: 'vnbx',

	/**
  * @constant
  * @type {String}
  */
	CSS_PREFIX: 'vnbx-',

	/**
  * @constant
  * @type {String}
  */
	EVENT_PREFIX: 'vnbx_',

	/**
  * @param {*} value
  * @return {Boolean} true if the value is defined
  */
	isDefined: function isDefined(value) {
		return value !== undefined;
	},

	/**
  * @param {*} value
  * @param {*} defaultValue
  * @return {*}
  */
	getOrDefault: function getOrDefault(value, defaultValue) {
		return Util.isDefined(value) ? value : defaultValue;
	}
};

Util.Array = {
	forEach: function forEach(array, fn, opt_scope) {
		var scope = opt_scope || undefined;
		var len = array.length;

		for (var i = 0; i < len; i++) {
			fn.call(scope, array[i], i);
		}
	},

	map: function map(array, fn, opt_scope) {
		var scope = opt_scope || undefined;
		var result = [];
		var len = array.length;

		for (var i = 0; i < len; i++) {
			result.push(fn.call(scope, array[i], i));
		}

		return result;
	},

	indexOf: function indexOf(array, item) {
		var len = array.length;

		for (var i = 0; i < len; i++) {
			if (array[i] === item) {
				return i;
			}
		}
		return -1;
	}
};

Util.Deferred = {
	emptyPromise: function emptyPromise() {
		var d = new $.Deferred();

		setTimeout(function () {
			d.resolve();
		}, 0);

		return d.promise();
	}
};

Util.Dom = {
	getViewportWidth: function getViewportWidth() {
		return window.innerWidth || document.documentElement.clientWidth;
	},

	getViewportHeight: function getViewportHeight() {
		return window.innerHeight || document.documentElement.clientHeight;
	}
};

Util.Browser = {
	isIos: function isIos() {
		var ua = navigator.userAgent;
		return !!ua.match(/(ipod|iphone|ipad)/ig);
	}
};

module.exports = Util;

},{}],21:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AnimationProvider = require('./animation_provider.js');
var Button = require('./button.js');
var ContentFactory = require('./content_factory.js');
var EmptyContent = require('./empty_content.js');
var Events = require('./events.js');
var Frame = require('./frame.js');
var Label = require('./label.js');
var Mask = require('./mask.js');
var Pager = require('./pager.js');
var Util = require('./util.js');
var VanillaException = require('./exception.js');

/**
 * @param {Object} config Config options.
 * @constructor
 */

var Vanillabox = (function () {
	function Vanillabox(config) {
		_classCallCheck(this, Vanillabox);

		if (!config.targets || config.targets.length === 0) {
			throw new VanillaException(VanillaException.Types.NO_IMAGE);
		}

		this.showed_ = false;

		this.targetElems_ = config.targets;
		this.animation_ = Util.getOrDefault(config.animation, AnimationProvider.getDefault());
		this.repositionOnScroll_ = config.repositionOnScroll;
		this.supportsKeyboard_ = config.keyboard;
		this.closeButtonEnabled_ = config.closeButton;
		this.adjustToWindow_ = config.adjustToWindow;
		this.grouping_ = config.grouping;

		this.contentOptions_ = {
			preferredWidth: config.preferredWidth,
			preferredHeight: config.preferredHeight,
			type: config.type
		};

		this.pager_ = new Pager({
			loop: config.loop,
			totalPages: this.targetElems_.length
		});

		this.setup_();
	}

	/** @private */

	_createClass(Vanillabox, [{
		key: 'setup_',
		value: function setup_() {
			var mask = new Mask();
			var maskElem = mask.getElement();
			maskElem.addClass(Util.ROOT_CSS);
			maskElem.hide();
			$('body').append(maskElem);
			this.mask_ = mask;

			this.setupRootCss_();

			var frame = new Frame({
				animation: this.animation_,
				adjustToWindow: this.adjustToWindow_
			});
			var frameElem = frame.getElement();
			this.frame_ = frame;
			maskElem.append(frameElem);

			var titleLabel = new Label({
				cls: Util.CSS_PREFIX + 'title'
			});
			this.titleLabel_ = titleLabel;
			frameElem.append(titleLabel.getElement());

			var pagerLabel = new Label({
				cls: Util.CSS_PREFIX + 'pager'
			});
			this.pagerLabel_ = pagerLabel;
			frameElem.append(pagerLabel.getElement());

			var prevButton = new Button({
				cls: Util.CSS_PREFIX + 'prev'
			});
			this.prevButton_ = prevButton;
			frameElem.append(prevButton.getElement());

			var nextButton = new Button({
				cls: Util.CSS_PREFIX + 'next'
			});
			this.nextButton_ = nextButton;
			frameElem.append(nextButton.getElement());

			var closeButton = new Button({
				cls: Util.CSS_PREFIX + 'close'
			});
			if (!this.closeButtonEnabled_) {
				closeButton.getElement().hide();
			}
			this.closeButton_ = closeButton;
			frameElem.append(closeButton.getElement());

			this.attach_();

			this.setupContents_();
		}

		/** @private */
	}, {
		key: 'setupRootCss_',
		value: function setupRootCss_() {
			var rootElem = this.mask_.getElement();

			if (Util.Browser.isIos()) {
				rootElem.addClass(Util.CSS_PREFIX + 'ios');
			}
			if (this.closeButtonEnabled_) {
				rootElem.addClass(Util.CSS_PREFIX + 'close-button-enabled');
			}
			if (this.grouping_ && this.pager_.getTotalPages() > 1) {
				rootElem.addClass(Util.CSS_PREFIX + 'group');
			}
		}

		/**
  * Disposes the component.
  */
	}, {
		key: 'dispose',
		value: function dispose() {
			this.detachWindow_();
			this.detach_();

			this.disposeAllContents_();

			this.titleLabel_.dispose();
			this.titleLabel_ = null;

			this.pagerLabel_.dispose();
			this.pagerLabel_ = null;

			this.closeButton_.dispose();
			this.closeButton_ = null;

			this.prevButton_.dispose();
			this.prevButton_ = null;

			this.nextButton_.dispose();
			this.nextButton_ = null;

			this.frame_.dispose();
			this.frame_ = null;

			this.mask_.getElement().remove();
			this.mask_.dispose();
			this.mask_ = null;
		}

		/** @private */
	}, {
		key: 'setupContents_',
		value: function setupContents_() {
			var _this = this;

			this.contents_ = Util.Array.map(this.targetElems_, function (target) {
				var targetElem = $(target);
				return ContentFactory.create(targetElem, _this.contentOptions_);
			});

			var emptyContent = new EmptyContent();
			this.setContent_(emptyContent);
		}

		/** @private */
	}, {
		key: 'disposeAllContents_',
		value: function disposeAllContents_() {
			var container = this.frame_.getContainer();
			container.setContent(null);

			if (this.contents_) {
				Util.Array.forEach(this.contents_, function (content) {
					content.dispose();
				});
				this.contents_ = null;
			}
		}

		/** @private */
	}, {
		key: 'attach_',
		value: function attach_() {
			this.targetElems_.on('click', $.proxy(this.onTargetElementClick_, this));

			$(this.mask_).on(Events.CLICK, $.proxy(this.onMaskClick_, this));

			var container = this.frame_.getContainer();
			$(container).on(Events.CONTENT_HIDE, $.proxy(this.onContentHide_, this));

			var pager = this.pager_;
			$(pager).on(Events.CHANGE, $.proxy(this.onPagerChange_, this));

			$(this.closeButton_).on(Events.CLICK, $.proxy(this.onCloseButtonClick_, this));
			$(this.prevButton_).on(Events.CLICK, $.proxy(this.onPreviousButtonClick_, this));
			$(this.nextButton_).on(Events.CLICK, $.proxy(this.onNextButtonClick_, this));
		}

		/** @private */
	}, {
		key: 'detach_',
		value: function detach_() {
			this.targetElems_.off('click', this.onTargetElementClick_);

			$(this.mask_).off(Events.CLICK, this.onMaskClick_);

			var container = this.frame_.getContainer();
			$(container).off(Events.CONTENT_HIDE, this.onContentHide_);

			var pager = this.pager_;
			$(pager).off(Events.CHANGE, this.onPagerChange_);

			$(this.closeButton_).off(Events.CLICK, this.onCloseButtonClick_);
			$(this.prevButton_).off(Events.CLICK, this.onPreviousButtonClick_);
			$(this.nextButton_).off(Events.CLICK, this.onNextButtonClick_);

			this.detachContent_();
			this.content_ = null;
		}

		/** @private */
	}, {
		key: 'attachWindow_',
		value: function attachWindow_() {
			var $window = $(window);
			var $document = $(document);

			$window.on('resize', $.proxy(this.onWindowResize_, this));
			$window.on('scroll', $.proxy(this.onWindowScroll_, this));
			$document.on('keyup', $.proxy(this.onDocumentKeyUp_, this));
		}

		/** @private */
	}, {
		key: 'detachWindow_',
		value: function detachWindow_() {
			var $window = $(window);
			var $document = $(document);

			$window.off('resize', this.onWindowResize_, this);
			$window.off('scroll', this.onWindowScroll_, this);
			$document.off('keyup', this.onDocumentKeyUp_, this);
		}

		/** @private */
	}, {
		key: 'attachContent_',
		value: function attachContent_() {
			var content = this.getContent_();
			$(content).on(Events.COMPLETE, $.proxy(this.onContentComplete_, this));

			var contentElem = content.getElement();
			contentElem.on('click', $.proxy(this.onContentClick_, this));
		}

		/** @private */
	}, {
		key: 'detachContent_',
		value: function detachContent_() {
			var content = this.getContent_();
			if (!content) {
				return;
			}
			$(content).off('complete', this.onContentComplete_);

			var contentElem = content.getElement();
			contentElem.off('click', this.onContentClick_);
		}

		/**
  * Shows the component.
  * @param {Number} opt_index Index of a content to show.
  * @return {Promise} Promise object for showing animation.
  */
	}, {
		key: 'show',
		value: function show(opt_index) {
			var _this2 = this;

			var animation = this.animation_;

			if (this.showed_) {
				return Util.Deferred.emptyPromise();
			}
			this.showed_ = true;

			if (this.contents_ === null) {
				this.setupContents_();
			}

			this.attachWindow_();

			var container = this.frame_.getContainer();
			container.updateMaxContentSize_();

			var mask = this.mask_;
			mask.layout();
			var maskPromise = animation.showMask(mask);

			var framePromise = animation.showFrame(this.frame_);

			var pager = this.pager_;
			var index = Util.getOrDefault(opt_index, 0);
			var triggeredPagerEvent = index !== pager.getPage();
			pager.setPage(index);
			if (!triggeredPagerEvent) {
				this.updateContent_();
			}

			return $.when(maskPromise, framePromise).then(function () {
				$(_this2).trigger(Events.SHOW);
			});
		}

		/**
  * Hides the component.
  * @return {Promise} promise Promise object for hiding operation.
  */
	}, {
		key: 'hide',
		value: function hide() {
			var _this3 = this;

			if (!this.showed_) {
				return Util.Deferred.emptyPromise();
			}

			return $.when(this.animation_.hideFrame(this.frame_), this.animation_.hideMask(this.mask_)).then(function () {
				_this3.detachWindow_();
				_this3.showed_ = false;

				Util.Array.forEach(_this3.contents_, function (content) {
					if (content.shouldUnloadOnHide()) {
						content.unload();
					}
				});

				$(_this3).trigger(Events.HIDE);
			});
		}

		/** @private */
	}, {
		key: 'setTitle_',
		value: function setTitle_(title) {
			var titleLabel = this.titleLabel_;

			titleLabel.setText(title);
		}

		/**
  * Shows the previous content.
  */
	}, {
		key: 'previous',
		value: function previous() {
			if (!this.grouping_) {
				return;
			}

			this.pager_.previous();
		}

		/**
  * Shows the next content.
  */
	}, {
		key: 'next',
		value: function next() {
			if (!this.grouping_) {
				return;
			}

			this.pager_.next();
		}

		/** @private */
	}, {
		key: 'getContent_',
		value: function getContent_() {
			var container = this.frame_.getContainer();

			return container.getContent();
		}

		/** @private */
	}, {
		key: 'setContent_',
		value: function setContent_(content) {
			var container = this.frame_.getContainer();

			var prevContent = this.getContent_();
			if (prevContent && prevContent.isLoaded() && prevContent === content) {
				// Already loaded a same content
				container.layout();
				return;
			}

			this.detachContent_();

			container.setContent(content);

			this.attachContent_();
			this.setTitle_(content.getTitle());

			content.load();
			container.layout();
		}

		/** @private */
	}, {
		key: 'layout_',
		value: function layout_(forceLayout) {
			var needsResizing = forceLayout || this.repositionOnScroll_;

			if (needsResizing) {
				this.animation_.resizeFrame(this.frame_);
			}
		}

		/** @private */
	}, {
		key: 'updatePager_',
		value: function updatePager_() {
			var pager = this.pager_;

			var page = pager.getPage();
			var totalPages = pager.getTotalPages();
			var text = String(page + 1) + ' of ' + String(totalPages);

			var label = this.pagerLabel_;
			label.setText(text);

			this.prevButton_.setDisabled(!pager.hasPrevious());
			this.nextButton_.setDisabled(!pager.hasNext());
		}

		/** @private */
	}, {
		key: 'updateContent_',
		value: function updateContent_() {
			this.updatePager_();

			var index = this.pager_.getPage();
			var content = this.contents_[index];
			this.setContent_(content);
		}

		/** @private */
	}, {
		key: 'delayedLayout_',
		value: function delayedLayout_(forceLayout) {
			var _this4 = this;

			if (this.layoutTimeout_) {
				clearTimeout(this.layoutTimeout_);
			}

			this.layoutTimeout_ = setTimeout(function () {
				_this4.layout_(forceLayout);
			}, Vanillabox.DELAYED_LAYOUT_DELAY);
		}

		/** @private */
	}, {
		key: 'onWindowResize_',
		value: function onWindowResize_() {
			this.delayedLayout_(false);
		}

		/** @private */
	}, {
		key: 'onWindowScroll_',
		value: function onWindowScroll_() {
			this.delayedLayout_(false);
		}

		/** @private */
	}, {
		key: 'onDocumentKeyUp_',
		value: function onDocumentKeyUp_(e) {
			if (!this.supportsKeyboard_) {
				return;
			}

			switch (e.keyCode) {
				case 27:
					// Escape
					this.hide();
					break;
				case 37:
					// Left
					this.previous();
					break;
				case 39:
					// Right
					this.next();
					break;
			}
		}

		/** @private */
	}, {
		key: 'onTargetElementClick_',
		value: function onTargetElementClick_(e) {
			var index = this.targetElems_.index(e.delegateTarget);

			if (index < 0) {
				return;
			}

			e.preventDefault();

			this.show(index);
		}

		/** @private */
	}, {
		key: 'onPagerChange_',
		value: function onPagerChange_() {
			this.updateContent_();
		}

		/** @private */
	}, {
		key: 'onMaskClick_',
		value: function onMaskClick_() {
			if (!this.closeButtonEnabled_) {
				this.hide();
			}
		}

		/** @private */
	}, {
		key: 'onCloseButtonClick_',
		value: function onCloseButtonClick_() {
			if (!this.closeButtonEnabled_) {
				return;
			}

			this.hide();
		}

		/** @private */
	}, {
		key: 'onPreviousButtonClick_',
		value: function onPreviousButtonClick_() {
			this.previous();
		}

		/** @private */
	}, {
		key: 'onNextButtonClick_',
		value: function onNextButtonClick_() {
			this.next();
		}

		/** @private */
	}, {
		key: 'onContentComplete_',
		value: function onContentComplete_(e, success) {
			this.layout_(true);

			var content = e.target;
			var index = Util.Array.indexOf(this.contents_, content);
			if (index >= 0) {
				$(this).trigger(Events.LOAD, [success, content, index]);
			}
		}

		/** @private */
	}, {
		key: 'onContentClick_',
		value: function onContentClick_(e) {
			var pager = this.pager_;

			e.stopPropagation();

			if (!this.grouping_) {
				this.hide();
				return;
			}

			if (!pager.hasNext()) {
				this.hide();
			} else {
				this.next();
			}
		}

		/** @private */
	}, {
		key: 'onContentHide_',
		value: function onContentHide_(e, container, content) {
			if (content.shouldUnloadOnHide()) {
				content.unload();
			}
		}
	}]);

	return Vanillabox;
})();

Vanillabox.DELAYED_LAYOUT_DELAY = 300;

module.exports = Vanillabox;

},{"./animation_provider.js":2,"./button.js":3,"./content_factory.js":6,"./empty_content.js":8,"./events.js":9,"./exception.js":10,"./frame.js":11,"./label.js":15,"./mask.js":16,"./pager.js":17,"./util.js":20}]},{},[18]);
