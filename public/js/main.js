"use strict";

// Promise polyfill
if (!("Promise" in window)) {
	!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){W=t}function r(t){z=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof U?function(){U(a)}:c()}function s(){var t=0,e=new H(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<N;t+=2){var e=Q[t],n=Q[t+1];e(n),Q[t]=void 0,Q[t+1]=void 0}N=0}function f(){try{var t=Function("return this")().require("vertx");return U=t.runOnLoop||t.runOnContext,i()}catch(e){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[V]&&x(r);var o=n._state;if(o){var i=arguments[o-1];z(function(){return T(o,r,i,n._result)})}else j(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return w(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function y(t,e,n){z(function(t){var r=!1,o=_(n,e,function(n){r||(r=!0,e!==n?w(t,n):A(t,n))},function(e){r||(r=!0,S(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,S(t,o))},t)}function m(t,e){e._state===Z?A(t,e._result):e._state===$?S(t,e._result):j(e,void 0,function(e){return w(t,e)},function(e){return S(t,e)})}function b(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?m(t,n):void 0===r?A(t,n):e(r)?y(t,n,r):A(t,n)}function w(e,n){if(e===n)S(e,v());else if(t(n)){var r=void 0;try{r=n.then}catch(o){return void S(e,o)}b(e,n,r)}else A(e,n)}function g(t){t._onerror&&t._onerror(t._result),E(t)}function A(t,e){t._state===X&&(t._result=e,t._state=Z,0!==t._subscribers.length&&z(E,t))}function S(t,e){t._state===X&&(t._state=$,t._result=e,z(g,t))}function j(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+Z]=n,o[i+$]=r,0===i&&t._state&&z(E,t)}function E(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?T(n,r,o,i):o(i);t._subscribers.length=0}}function T(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=!0;if(i){try{s=r(o)}catch(a){c=!1,u=a}if(n===s)return void S(n,d())}else s=o;n._state!==X||(i&&c?w(n,s):c===!1?S(n,u):t===Z?A(n,s):t===$&&S(n,s))}function M(t,e){try{e(function(e){w(t,e)},function(e){S(t,e)})}catch(n){S(t,n)}}function P(){return tt++}function x(t){t[V]=tt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function C(){return new Error("Array Methods must be provided an Array")}function O(t){return new et(this,t).promise}function k(t){var e=this;return new e(L(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return S(n,t),n}function Y(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function D(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=nt}var K=void 0;K=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var L=K,N=0,U=void 0,W=void 0,z=function(t,e){Q[N]=t,Q[N+1]=e,N+=2,2===N&&(W?W(a):R())},B="undefined"!=typeof window?window:void 0,G=B||{},H=G.MutationObserver||G.WebKitMutationObserver,I="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),J="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Q=new Array(1e3),R=void 0;R=I?o():H?s():J?u():void 0===B&&"function"==typeof require?f():c();var V=Math.random().toString(36).substring(2),X=void 0,Z=1,$=2,tt=0,et=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[V]||x(this.promise),L(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&A(this.promise,this._result))):S(this.promise,C())}return t.prototype._enumerate=function(t){for(var e=0;this._state===X&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(u){s=!0,i=u}if(o===l&&t._state!==X)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===nt){var c=new n(p);s?S(c,i):b(c,t,o),this._willSettleAt(c,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===X&&(this._remaining--,t===$?S(r,n):this._result[e]=n),0===this._remaining&&A(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;j(t,void 0,function(t){return n._settledAt(Z,e,t)},function(t){return n._settledAt($,e,t)})},t}(),nt=function(){function t(e){this[V]=P(),this._result=this._state=void 0,this._subscribers=[],p!==e&&("function"!=typeof e&&Y(),this instanceof t?M(this,e):q())}return t.prototype["catch"]=function(t){return this.then(null,t)},t.prototype["finally"]=function(t){var n=this,r=n.constructor;return e(t)?n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):n.then(t,t)},t}();return nt.prototype.then=l,nt.all=O,nt.race=k,nt.resolve=h,nt.reject=F,nt._setScheduler=n,nt._setAsap=r,nt._asap=z,nt.polyfill=D,nt.Promise=nt,nt.polyfill(),nt});
}

window.emoji = {
	happy: "\uD83D\uDE04",
	sad: "\uD83D\uDE22"
};
window.isEmpty = function (x) {
	return (x === undefined || x === null);
};
window.seal$ = function (obj) {
	if (Object.seal)
		Object.seal(obj);
	return obj;
};
window.freeze$ = function (obj) {
	if (Object.freeze)
		Object.freeze(obj);
	return obj;
};
window._ = function (id) {
	return ((typeof id === "string") ? document.getElementById(id) : id);
};
window.cancelEvent = function (evt) {
	if (evt) {
		if ("isCancelled" in evt)
			evt.isCancelled = true;
		if ("preventDefault" in evt)
			evt.preventDefault();
		if ("stopPropagation" in evt)
			evt.stopPropagation();
	}
	return false;
};
window.parseQueryString = function () {
	var i, pair, assoc = {}, keyValues = location.search.substring(1).split("&");
	for (i in keyValues) {
		pair = keyValues[i].split("=");
		if (pair.length > 1) {
			assoc[decodeURIComponent(pair[0].replace(/\+/g, " "))] = decodeURIComponent(pair[1].replace(/\+/g, " "));
		}
	}
	window.queryString = assoc;
	return assoc;
};
window.encode = (function () {
	var lt = /</g, gt = />/g;
	return function (x) {
		return (x ? x.replace(lt, "&lt;").replace(gt, "&gt;") : "");
	};
})();
window.prepareCopyHandler = function (modal, selector) {
	function copyError() {
		alert("Por favor, tecle Ctrl+C / Command+C para copiar " + emoji.sad);
	}

	var lastTooltipBtn = null,
		lastTooltipTimeout = 0,
		opt = (modal ? { container: _(modal) } : undefined),
		clipboard = new ClipboardJS(selector || ".btn-copyjs", opt);
	clipboard.on("success", function (e) {
		var btn = e.trigger;

		if (!btn.tooltipOK) {
			btn.tooltipOK = true;
			btn.setAttribute("title", "Copiado!");
			$(btn).tooltip({ trigger: "manual" });
			btn.setAttribute("title", "Copiar");
		}

		if (lastTooltipTimeout) {
			$(lastTooltipBtn).tooltip("hide");
			clearTimeout(lastTooltipTimeout);
			lastTooltipTimeout = 0;
		}

		$(lastTooltipBtn = btn).tooltip("show");
		lastTooltipTimeout = setTimeout(function () {
			if (lastTooltipTimeout) {
				$(lastTooltipBtn).tooltip("hide");
				lastTooltipBtn = null;
				lastTooltipTimeout = 0;
			}
		}, 2000);
	});
	clipboard.on("error", copyError);
};
window.customFilterHandler = function (table, input) {
	var lastSearch = "", handler = function () {
		var s = trim(input.value.normalize()).toUpperCase();
		if (lastSearch !== s) {
			lastSearch = s;
			table.search(s).draw();
		}
		return true;
	};
	input.onchange = handler;
	input.onkeyup = handler;
};
window.customFilterHandlerPlain = function (table, input) {
	var lastSearch = "", handler = function () {
		var s = trim(input.value.normalize());
		if (lastSearch !== s) {
			lastSearch = s;
			table.search(s).draw();
		}
		return true;
	};
	input.onchange = handler;
	input.onkeyup = handler;
};
window.prepareCustomFilter = function (table, tableId, customFilterLabel, placeholder) {
	var label, input, parent = _(tableId + "_filter");
	if (parent) {
		while (parent.firstChild)
			parent.removeChild(parent.firstChild);
		label = document.createElement("label");
		label.appendChild(document.createTextNode((customFilterLabel === null || customFilterLabel === undefined) ? "Filtro:" : customFilterLabel));
		input = document.createElement("input");
		if (window.prepareCustomFilterPlain)
			customFilterHandlerPlain(table, input);
		else
			customFilterHandler(table, input);
		input.className = "form-control form-control-sm input-sm upper";
		input.setAttribute("type", "search");
		input.setAttribute("placeholder", placeholder || "");
		input.setAttribute("aria-controls", tableId);
		label.appendChild(input);
		parent.appendChild(label);
	}
};
window.format2 = function (x) {
	return ((x < 10) ? ("0" + x) : x);
};
window.formatHex8 = function (x) {
	var s = "0000000" + x.toString(16).toLowerCase();
	return s.substr(s.length - 8);
};
window.formatPeriod = function (period) {
	return (period < 60 ? (period + " minutos") : (period == 60 ? "1 hora" : (((period / 60) | 0) + " horas")));
};
window.formatDuration = function (duration) {
	var s = ((duration / 1000) | 0), m = ((s / 60) | 0);
	s = s % 60;
	return format2(m) + ":" + format2(s);
};
window.formatSize = (function () {
	var expr = /\B(?=(\d{3})+(?!\d))/g, thousands = (window.currentLanguageId === 1 ? "." : ",");
	window.formatSizeLong = function (size) {
		//if (size < 16384)
		//	return size + " bytes";
		//return ((size * 0.0009765625) | 0).toString().replace(expr, ".") + " KB";
		if (size) {
			size = (size * 0.0009765625) | 0;
			if (size <= 0)
				size = 1;
		}
		return size.toString().replace(expr, thousands) + " KB";
	};
	return function (size) {
		//if (size < 16384)
		//	return size + " bytes";
		//return (size >>> 10).toString().replace(expr, ".") + " KB";
		if (size) {
			size >>>= 10;
			if (size <= 0)
				size = 1;
		}
		return size.toString().replace(expr, thousands) + " KB";
	};
})();
window.formatNumber = (function () {
	var expr = /\B(?=(\d{3})+(?!\d))/g;
	return function (x) {
		return x.toString().replace(expr, ".");
	};
})();
window.formatHour = function (x) {
	return format2(x >>> 6) + ":" + format2(x & 63);
};
window.formatHourDec = function (x) {
	return format2((x / 100) | 0) + ":" + format2(x % 100);
};
//https://github.com/igorescobar/jQuery-Mask-Plugin
//https://igorescobar.github.io/jQuery-Mask-Plugin/
window.maskCNPJ = function (field) {
	$(field).mask("00.000.000/0000-00");
};
window.maskCPF = function (field) {
	$(field).mask("000.000.000-00");
};
window.maskPhone = function (field) {
	$(field).mask("(00) 0000-0000JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ", { translation: { "J": { pattern: /[\d\D]/g } } });
};
window.maskHour = function (field) {
	$(field).mask("00:00");
};
window.maskTextId = function (field) {
	$(field).mask("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", { translation: { Z: { pattern: /[A-Za-z0-9\-]/, optional: true } } });
};
window.maskMobilePhone = function (field) {
	var reg = /\D/g, behavior = function (val) {
		return ((val.replace(reg, "").length === 11) ? "(00) 00000-0000" : "(00) 0000-00009");
	}, opt = {
		onKeyPress: function (val, e, field, options) {
			field.mask(behavior.apply({}, arguments), options);
		}
	};
	$(field).mask(behavior, opt);
};
window.addFilterButton = function (parent, icon, text, handler, title, btnClass) {
	var p = _(parent), label, btn, i;
	if (!p)
		return;
	label = document.createElement("label");
	btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.className = "btn btn-sm " + (btnClass || "btn-secondary");
	i = document.createElement("i");
	i.className = "fa fa14 " + icon;
	btn.appendChild(i);
	if (text)
		btn.appendChild(document.createTextNode(text));
	if (title)
		btn.setAttribute("title", title);
	btn.onclick = handler;
	label.appendChild(btn);
	p.insertBefore(document.createTextNode(" "), p.firstChild);
	p.insertBefore(label, p.firstChild);
	return btn;
};
window.selectRow = function (row, selected) {
	if (selected) {
		row.style.background = "#b8f7b8";
		$(row).addClass("included-row");
	} else {
		row.style.background = "";
		$(row).removeClass("included-row");
	}
};
window.enableTableUIForMultipleSelection = function (id, enable) {
	var i, lis, li, dlg;

	if ((dlg = _(id)) && (lis = dlg.getElementsByTagName("thead")).length) {
		if (!enable) {
			lis[0].style.opacity = "0.5";
			lis[0].style.pointerEvents = "none";
		} else {
			lis[0].style.opacity = "";
			lis[0].style.pointerEvents = "";
		}
	}

	if ((dlg = _(id + "_paginate")) && (lis = dlg.getElementsByTagName("li")).length) {
		if (!enable) {
			for (i = lis.length - 1; i >= 0; i--) {
				li = $(lis[i]);
				if (li.hasClass("disabled")) {
					li[0].removeAttribute("data-disabled");
				} else {
					li[0].setAttribute("data-disabled", "true");
					li.addClass("disabled");
				}
			}
		} else {
			for (i = lis.length - 1; i >= 0; i--) {
				li = $(lis[i]);
				if (li[0].getAttribute("data-disabled")) {
					li[0].removeAttribute("data-disabled");
					li.removeClass("disabled");
				}
			}
		}
	}

	if ((dlg = _(id + "_length")) && (lis = dlg.getElementsByTagName("select")).length) {
		if (!enable)
			lis[0].setAttribute("disabled", "disabled");
		else
			lis[0].removeAttribute("disabled");
	}

	if ((dlg = _(id + "_filter")) && (lis = dlg.getElementsByTagName("input")).length) {
		if (!enable)
			lis[0].setAttribute("disabled", "disabled");
		else
			lis[0].removeAttribute("disabled");
	}
};
window.toggleMultipleSelection = (function () {
	var firstShift = null, firstShiftWasChecking = false;
	window.resetMultipleSelection = function () {
		firstShift = null;
		firstShiftWasChecking = false;
	};

	return function (e) {
		if (e.button || JsonWebApi.active)
			return;
		var i, row, dtrows, rows, first, last;
		if (firstShift) {
			enableTableUIForMultipleSelection("dataTableMain", true);
			if (document.getSelection && (i = document.getSelection()).removeAllRanges)
				i.removeAllRanges();
			dtrows = dataTableMain.rows({ order: "current" });
			rows = dtrows.nodes();
			first = rows.indexOf(firstShift);
			last = rows.indexOf(this.parentNode.parentNode);
			if (first > last) {
				i = first;
				first = last;
				last = i;
			}
			firstShift = null;
			for (i = first; i <= last; i++) {
				row = rows[i];
				row.getElementsByTagName("input")[0].checked = firstShiftWasChecking;
				selectRow(row, firstShiftWasChecking);
			}
			return;
		}

		selectRow(this.parentNode.parentNode, this.checked);

		if (e.shiftKey) {
			enableTableUIForMultipleSelection("dataTableMain", false);
			if (document.getSelection && (i = document.getSelection()).removeAllRanges)
				i.removeAllRanges();
			firstShift = this.parentNode.parentNode;
			firstShiftWasChecking = this.checked;
		}
	};
})();
window.prepareDataTableMain = (function () {
	var lastUl = null, lastUlParent = null, wrapper = null, justShown = false, docOk = false,
		lastBootstrap = null,
		closeLastBootstrap = function () {
			if (lastBootstrap) {
				if (lastBootstrap.getAttribute("aria-expanded") == "true") {
					$(lastBootstrap.parentNode).removeClass("open");
					lastBootstrap.setAttribute("aria-expanded", "false");
					lastBootstrap = null;
					return true;
				}
				lastBootstrap = null;
			}
			return false;
		},
		docHandler = function () {
			if (!lastUl)
				return;
			if (justShown) {
				justShown = false;
				return;
			}
			lastUl.style.display = "";
			lastUl.style.width = "";
			lastUl.style.left = "";
			lastUl.style.top = "";
			lastUl.style.right = "";
			lastUl.style.bottom = "";
			lastUl.parentNode.removeChild(lastUl);
			lastUlParent.appendChild(lastUl);
			lastUl = null;
			lastUlParent = null;
			if (wrapper)
				wrapper.style.position = "";
		};

	return function (menu, menuItemCount) {
		$("#dataTableMain > tbody").on("click", "tr", function (e) {
			var a, ul, rect, rect2, x, y;

			switch (e.target.tagName) {
				case "A":
				case "INPUT":
					return;
				case "I":
					if (e.target.parentNode.tagName != "BUTTON")
						return;
				case "BUTTON":
					if (menu) {
						if (menuItemCount > 3) {
							ul = this.getElementsByTagName("ul");
							if (!ul || !(ul = ul[0]))
								return;
							ul.style.bottom = (this.parentNode.getElementsByTagName("tr")[0] === this ? "-28px" : "");
						}
						closeLastBootstrap();
						lastBootstrap = ((e.target.tagName == "I") ? e.target.parentNode : e.target);
					}
					return;
				case "TD":
					ul = e.target.getElementsByTagName("input");
					if (e.button || !ul || ul.length !== 1 || ul[0].getAttribute("type") !== "checkbox")
						break;
					if (e.shiftKey) {
						if (("MouseEvent" in window)) {
							ul[0].dispatchEvent(new MouseEvent("click", {
								bubbles: true,
								cancelable: true,
								shiftKey: true
							}));
						} else if (("createEvent" in document) &&
							(a = document.createEvent("MouseEvent")) &&
							("initMouseEvent" in a)) {
							a.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
							ul[0].dispatchEvent(a);
						} else {
							ul[0].click();
						}
					} else {
						ul[0].click();
					}
					return;
			}

			if (menu) {
				if (!docOk) {
					(("onclick" in document) ? document : document.body).addEventListener("click", docHandler, false);
					docOk = true;
				}
				if (!wrapper)
					wrapper = document.body;//_("wrapper");
				ul = this.getElementsByTagName("ul");
				if (closeLastBootstrap())
					return;
				if (lastUl) {
					docHandler();
					return;
				}
				if (!ul || !(ul = ul[0]))
					return;
				if (menuItemCount > 3)
					ul.style.bottom = "";
				lastUl = ul;
				lastUlParent = ul.parentNode;
				wrapper.style.position = "relative";
				rect = wrapper.getBoundingClientRect();
				x = ((e.originalEvent.clientX - rect.left) | 0);
				//if ((x + 160) >= rect.right)
				//	x = rect.right - 161;
				ul.style.width = "auto";
				ul.style.left = x + "px";
				ul.style.top = (y = ((e.originalEvent.clientY - rect.top - 2) | 0)) + "px";
				ul.style.right = "auto";
				ul.style.bottom = "auto";
				ul.parentNode.removeChild(ul);
				wrapper.appendChild(ul);
				ul.style.display = "block";
				rect2 = ul.getBoundingClientRect();
				if (rect2.right >= rect.right) {
					x -= (rect2.right - rect.right) + 1;
					ul.style.left = x + "px";
				}
				if (rect2.bottom >= rect.bottom) {
					y -= (rect2.bottom - rect.bottom) + 1;
					ul.style.top = y + "px";
				}
				justShown = true;
				return;// cancelEvent(e);
			} else {
				a = this.getElementsByTagName("a");
				if (!a || !a.length)
					a = this.getElementsByTagName("button");
				if (a && a.length) {
					x = a.length - 1;
					if (x && a[x].getAttribute("data-delete") == "1")
						x--;
					a[x].click();
				}
			}
		});
	};
})();
if (window.currentLanguageId === 1) {
	window.months = ["JAN/", "FEB/", "MAR/", "APR/", "MAY/", "JUN/", "JUL/", "AUG/", "SEP/", "OCT/", "NOV/", "DEC/"];
	window.monthsToInt = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
	window.formatDateTime = function (utcTicks) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
		//Date has 2 versions for the methods: getXXX() and getUTCXXX()
		//The constructor always takes the ticks since epoch at UTC
		//
		//The getTime() method returns the numeric value corresponding to the time for the specified date according to universal time.
		//getTime() always uses UTC for time representation.For example, a client browser in one timezone, getTime() will be the same as a client browser in any other timezone.
		var d = new Date(utcTicks);
		return months[d.getUTCMonth()] + format2(d.getUTCDate()) + "/" + d.getUTCFullYear() + " at " + format2(d.getUTCHours()) + ":" + format2(d.getUTCMinutes());
		//var tmp = (utcTicks / (64 * 64 * 32)) | 0;
		//return format2(tmp & 31) + months[(tmp >>> 5) & 15] + (tmp >>> 9) + " às " + format2((tmp >>> 12) & 31) + ":" + format2((tmp >>> 6) & 63);
	};
	window.formatDate = function (utcTicks) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
		//Date has 2 versions for the methods: getXXX() and getUTCXXX()
		//The constructor always takes the ticks since epoch at UTC
		//
		//The getTime() method returns the numeric value corresponding to the time for the specified date according to universal time.
		//getTime() always uses UTC for time representation.For example, a client browser in one timezone, getTime() will be the same as a client browser in any other timezone.
		var d = new Date(utcTicks);
		return months[d.getUTCMonth()] + format2(d.getUTCDate()) + "/" + d.getUTCFullYear();
		//var tmp = (utcTicks / (64 * 64 * 32)) | 0;
		//return format2(tmp & 31) + months[(tmp >>> 5) & 15] + (tmp >>> 9);
	};
} else {
	window.months = ["/JAN/", "/FEV/", "/MAR/", "/ABR/", "/MAI/", "/JUN/", "/JUL/", "/AGO/", "/SET/", "/OUT/", "/NOV/", "/DEZ/"];
	window.monthsToInt = { JAN: 1, FEV: 2, MAR: 3, ABR: 4, MAI: 5, JUN: 6, JUL: 7, AGO: 8, SET: 9, OUT: 10, NOV: 11, DEZ: 12 };
	window.formatDateTime = function (utcTicks) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
		//Date has 2 versions for the methods: getXXX() and getUTCXXX()
		//The constructor always takes the ticks since epoch at UTC
		//
		//The getTime() method returns the numeric value corresponding to the time for the specified date according to universal time.
		//getTime() always uses UTC for time representation.For example, a client browser in one timezone, getTime() will be the same as a client browser in any other timezone.
		var d = new Date(utcTicks);
		return format2(d.getUTCDate()) + months[d.getUTCMonth()] + d.getUTCFullYear() + " às " + format2(d.getUTCHours()) + ":" + format2(d.getUTCMinutes());
		//var tmp = (utcTicks / (64 * 64 * 32)) | 0;
		//return format2(tmp & 31) + months[(tmp >>> 5) & 15] + (tmp >>> 9) + " às " + format2((tmp >>> 12) & 31) + ":" + format2((tmp >>> 6) & 63);
	};
	window.formatDate = function (utcTicks) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
		//Date has 2 versions for the methods: getXXX() and getUTCXXX()
		//The constructor always takes the ticks since epoch at UTC
		//
		//The getTime() method returns the numeric value corresponding to the time for the specified date according to universal time.
		//getTime() always uses UTC for time representation.For example, a client browser in one timezone, getTime() will be the same as a client browser in any other timezone.
		var d = new Date(utcTicks);
		return format2(d.getUTCDate()) + months[d.getUTCMonth()] + d.getUTCFullYear();
		//var tmp = (utcTicks / (64 * 64 * 32)) | 0;
		//return format2(tmp & 31) + months[(tmp >>> 5) & 15] + (tmp >>> 9);
	};
}
window.parseDateInput = function (input, setAtEndOfDay) {
	var date = trimValue(input).toUpperCase(), day, month, year, literalMonth = false, i;
	if (!(new RegExp("[0-9][0-9]?/[0-9][0-9]?/[0-9][0-9][0-9][0-9]")).test(date)) {
		literalMonth = true;
		if (window.currentLanguageId === 1) {
			if (!(new RegExp("[A-Z][A-Z][A-Z]/[0-9][0-9]?/[0-9][0-9][0-9][0-9]")).test(date))
				return 0;
		} else {
			if (!(new RegExp("[0-9][0-9]?/[A-Z][A-Z][A-Z]/[0-9][0-9][0-9][0-9]")).test(date))
				return 0;
		}
	}
	date = date.split("/", 3);
	if (window.currentLanguageId === 1) {
		if (literalMonth) {
			date[0] = monthsToInt[date[0]];
			if (!date[0])
				return 0;
		}
		month = parseInt(date[0]);
		day = parseInt(date[1]);
	} else {
		if (literalMonth) {
			date[1] = monthsToInt[date[1]];
			if (!date[1])
				return 0;
		}
		day = parseInt(date[0]);
		month = parseInt(date[1]);
	}
	if (date.length !== 3 ||
		isNaN(day) ||
		isNaN(month) ||
		isNaN(year = parseInt(date[2])) ||
		day <= 0 ||
		day > 31 ||
		month <= 0 ||
		month > 12 ||
		year < 1900 ||
		year > 2200)
		return 0;
	if ((month == 2 && day > 29) ||
		((month == 4 ||
			month == 6 ||
			month == 9 ||
			month == 11) && day > 30))
		return 0;
	//SQL server rounds to the following day when using 999 millis
	//return (year * 67108864) + (month * 4194304) + (day * 131072) + (setAtEndOfDay ? 98043 : 0);
	//return (setAtEndOfDay ? new Date(year, month - 1, day, 23, 59, 59, 0) : new Date(year, month - 1, day, 0, 0, 0, 0)).getTime();
	return (setAtEndOfDay ? Date.UTC(year, month - 1, day, 23, 59, 59, 0) : Date.UTC(year, month - 1, day, 0, 0, 0, 0));
	//Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
	//returns the number of milliseconds in a Date object since January 1, 1970, 00:00:00, universal time
	//Date.UTC() uses universal time instead of the local time.
	//Date.UTC() returns a time value as a number instead of creating a Date object.
	//return date;
};
window.parseNoNaN = function (str) {
	var x = parseInt(trim(str));
	return (isNaN(x) ? 0 : x);
};
window.parseHour = function (str) {
	if (!str || str.length < 5 || str.charAt(2) != ':')
		return -1;
	var h = parseInt(str.substr(0, 2)), m = parseInt(str.substr(3, 2));
	return ((isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) ? -1 : ((h << 6) | m));
};
window.trim = (function () {
	if (window.String && window.String.prototype && window.String.prototype.trim)
		return function (str) { return str.trim(); };
	var expr = /^\s+|\s+$/g;
	return function (str) { return str.replace(expr, ""); };
})();
window.trimValue = function (input) {
	return trim(_(input).value);
};
window.startsWith = (function () {
	if (window.String && window.String.prototype && window.String.prototype.startsWith)
		return function (str, start) { return str.startsWith(start); };
	return function (str, start) {
		// Try to simulate the actual behavior of startsWith()
		if (str === "")
			return (start === "");
		if (!str)
			return false;
		if (start === "")
			return true;
		if (!start || start.length > str.length)
			return false;
		return (str.indexOf(start) === 0);
	};
})();
window.endsWith = (function () {
	if (window.String && window.String.prototype && window.String.prototype.endsWith)
		return function (str, end) { return str.endsWith(end); };
	return function (str, end) {
		// Try to simulate the actual behavior of endsWith()
		if (str === "")
			return (end === "");
		if (!str)
			return false;
		if (end === "")
			return true;
		if (!end || end.length > str.length)
			return false;
		var i = str.lastIndexOf(end);
		return (i >= 0 && i === (str.length - end.length));
	};
})();
window.resetForm = function (f) {
	var $form = $(f), i, validator;
	if (!$form || !$form.length)
		return;
	for (i = $form.length - 1; i >= 0; i--)
		$form[i].reset();
	$form.find("label.error").remove();
	$form.find(".error").removeClass("error");
	$form.find(".valid").removeClass("valid");
	validator = $form.validate();
	if (validator) {
		validator.resetForm();
		validator.formSubmitted = false;
	}
};
window.validateColor = function (color) {
	if (!color || color.length !== 7 || color.charCodeAt(0) !== 0x23)
		return false;

	var i, c;

	for (i = 1; i < 7; i++) {
		c = color.charCodeAt(i);
		if (!((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66)))
			return false;
	}

	return true;
}
window.validateCNPJ = function (cnpj) {
	if (!cnpj || !(cnpj = trim(cnpj.replace(/\./g, "").replace(/\-/g, "").replace(/\//g, ""))) || cnpj.length !== 14)
		return false;

	var i, sum = 0, modulus;

	for (i = 0; i < 12; i++)
		sum += (cnpj.charCodeAt(i) - 0x30) * (((i < 4) ? 5 : 13) - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	if ((cnpj.charCodeAt(12) - 0x30) !== modulus)
		return false;

	sum = 0;
	for (i = 0; i < 13; i++)
		sum += (cnpj.charCodeAt(i) - 0x30) * (((i < 5) ? 6 : 14) - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	return ((cnpj.charCodeAt(13) - 0x30) === modulus);
};
window.validateCPF = function (cpf) {
	if (!cpf || !(cpf = trim(cpf.replace(/\./g, "").replace(/\-/g, ""))) || cpf.length !== 11)
		return false;

	var i, sum = 1, modulus = cpf.charCodeAt(0);

	for (i = 1; i < 9; i++) {
		if (cpf.charCodeAt(i) !== modulus) {
			sum = 0;
			break;
		}
	}
	if (sum)
		return false;

	sum = 0;
	for (i = 0; i < 9; i++)
		sum += (cpf.charCodeAt(i) - 0x30) * (10 - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	if ((cpf.charCodeAt(9) - 0x30) !== modulus)
		return false;

	sum = modulus * 2;
	for (i = 0; i < 9; i++)
		sum += (cpf.charCodeAt(i) - 0x30) * (11 - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	return ((cpf.charCodeAt(10) - 0x30) === modulus);
};
window.validateEmail = function (email) {
	if (!email || !(email = trim(email)))
		return false;

	var at = email.indexOf("@"),
		at2 = email.lastIndexOf("@"),
		dot = email.lastIndexOf(".");

	return (email.indexOf(":") < 0 && at > 0 && dot > (at + 1) && dot !== (email.length - 1) && at2 === at);
};
window.createItem = function (parent, icon, className, text, badge, clickHandler, name0, value0) {
	var i, btn = document.createElement("button"), c = (className || "btn-secondary");
	btn.setAttribute("type", "button");
	for (i = 6; i < arguments.length; i += 2)
		btn.setAttribute(arguments[i], arguments[i + 1]);
	if (icon) {
		i = document.createElement("i");
		i.className = "fa fa-nomargin " + icon;
		btn.appendChild(i);
	}
	if (badge) {
		btn.appendChild(document.createTextNode(text + " "));
		i = document.createElement("span");
		i.className = "badge";
		i.textContent = badge;
		btn.appendChild(i);
	} else {
		btn.appendChild(document.createTextNode(text));
	}
	if (clickHandler)
		btn.onclick = clickHandler;
	btn.className = c + (icon ? " btn btn-block btn-social" : " btn btn-block");
	if (parent)
		parent.appendChild(btn);
	return btn;
};
window.createRoundLink = function (parent, icon, style, href, name0, value0) {
	var i, btn = document.createElement("a");
	btn.setAttribute("href", href);
	for (i = 4; i < arguments.length; i += 2)
		btn.setAttribute(arguments[i], arguments[i + 1]);
	btn.className = "btn " + style;// + " btn-circle";
	i = document.createElement("i");
	i.className = "fa fa-nomargin " + icon;
	btn.appendChild(i);
	if (parent)
		parent.appendChild(btn);
	return btn;
};
window.createRoundButton = function (parent, icon, style, clickHandler, name0, value0) {
	var i, btn = document.createElement("button");
	btn.setAttribute("type", "button");
	for (i = 4; i < arguments.length; i += 2)
		btn.setAttribute(arguments[i], arguments[i + 1]);
	btn.className = "btn " + style;// + " btn-circle";
	i = document.createElement("i");
	i.className = "fa fa-nomargin " + icon;
	btn.appendChild(i);
	if (clickHandler)
		btn.onclick = clickHandler;
	if (parent)
		parent.appendChild(btn);
	return btn;
};
window.cleanupFile = function (name) {
	var n = (name || "").toUpperCase(), i;
	if ((i = n.lastIndexOf("/")) >= 0)
		n = n.substr(i + 1);
	if ((i = n.lastIndexOf("\\")) >= 0)
		n = n.substr(i + 1);
	if ((i = n.lastIndexOf(".")) >= 0)
		n = n.substr(0, i);
	return n;
};
window.intToColor = function (i) {
	if (i < 0)
		return "transparent";
	var s = "00000" + i.toString(16);
	return "#" + s.substr(s.length - 6);
};
window.relativeLuminance = function (rgb) {
	if (rgb < 0)
		return 1;
	//http://www.w3.org/TR/2007/WD-WCAG20-TECHS-20070517/Overview.html#G18
	var RsRGB = ((rgb >>> 16) & 0xff) / 255.0,
		GsRGB = ((rgb >>> 8) & 0xff) / 255.0,
		BsRGB = (rgb & 0xff) / 255.0,
		R, G, B;
	if (RsRGB <= 0.03928) R = RsRGB / 12.92; else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
	if (GsRGB <= 0.03928) G = GsRGB / 12.92; else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
	if (BsRGB <= 0.03928) B = BsRGB / 12.92; else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
	return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
};
window.textColorForBackground = function (i) {
	return (relativeLuminance(i) < 0.4 ? "#fff" : "#000");
};
window.fixUrlOnBlur = function (input) {
	var i = _(input);
	i.addEventListener("blur", function () {
		var v = trim(i.value), uv;
		if (v) {
			if ((uv = v.toUpperCase()).indexOf("HTTP://") && uv.indexOf("HTTPS://")) {
				setTimeout(function () {
					i.value = "http://" + v;
					$(i).valid();
				}, 20);
			}
		}
	});
};
window.capitalizarPalavras = function (s, classe, tag) {
	var i, html = '', partes = encode(s).split(" ");
	if (!tag)
		tag = "span";
	for (i = 0; i < partes.length; i++) {
		if (i)
			html += ' ';
		html += (classe ? '<' + tag + ' class="' + classe + '">' : '<' + tag + '>') + partes[i].charAt(0) + '</' + tag + '>';
		html += partes[i].substr(1);
	}
	return html;
};
window.capitalizarFrase = function (s, classe, tag) {
	var i, html = '', partes = [encode(s)];
	if (!tag)
		tag = "span";
	for (i = 0; i < partes.length; i++) {
		if (i)
			html += ' ';
		html += (classe ? '<' + tag + ' class="' + classe + '">' : '<' + tag + '>') + partes[i].charAt(0) + '</' + tag + '>';
		html += partes[i].substr(1);
	}
	return html;
};
(function () {
	var fullScreenFrame = null, offsetY = 0;

	window.openFullScreenFrame = function (url) {
		if (fullScreenFrame)
			return;
		offsetY = (("scrollY" in window) ? window.scrollY : window.pageYOffset);
		if (isNaN(offsetY) || !offsetY)
			offsetY = 0;
		fullScreenFrame = document.createElement("iframe");
		fullScreenFrame.className = "fullscreen-iframe";
		fullScreenFrame.setAttribute("src", url);
		document.body.appendChild(fullScreenFrame);
		document.body.style.overflow = "hidden";
		var tmp = fullScreenFrame;
		setTimeout(function () { tmp.className = "fullscreen-iframe fullscreen-iframe-visible"; }, 10);
		setTimeout(function () { if (tmp === fullScreenFrame) _("wrapper").style.display = "none"; }, 410);
	}

	window.closeFullScreenFrame = function () {
		if (!fullScreenFrame)
			return;
		var tmp = fullScreenFrame, b = null;
		fullScreenFrame = null;
		if (tmp.contentWindow)
			b = tmp.contentWindow.document.getElementsByTagName("body");
		else if (tmp.contentDocument)
			b = tmp.contentDocument.getElementsByTagName("body");
		if (b && b.length)
			b[0].style.overflow = "hidden";
		_("wrapper").style.display = "";
		document.body.style.overflow = "";
		tmp.className = "fullscreen-iframe";
		if (("scrollTo" in window))
			window.scrollTo(0, offsetY);
		setTimeout(function () { document.body.removeChild(tmp); }, 410);
	}

	window.removeFullScreenBackground = function () {
		if (!fullScreenFrame)
			return;
		fullScreenFrame.style.background = "none";
	}
})();
/*!
 JsonWebApi v1.0.0 is distributed under the FreeBSD License

 Copyright (c) 2016, Carlos Rafael Gimenes das Neves
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 https://github.com/carlosrafaelgn/JsonWebApi
*/
(function () {
	var buildException = function (xhr, ex) {
		return (ex.message ?
			{ xhr: xhr, success: false, status: -1, value: JsonWebApi.messages.exceptionDescription + ex.message, exceptionType: (ex.name || "Error") } :
			{ xhr: xhr, success: false, status: -1, value: JsonWebApi.messages.exceptionDescription + ex, exceptionType: (ex.name || "Error") });
	},
		buildResponse = function (xhr) {
			try {
				if (xhr.status === 200 && xhr.responseText) {
					return { xhr: xhr, success: true, status: 200, value: JSON.parse(xhr.responseText) };
				} else if (xhr.status >= 200 && xhr.status < 299) {
					return { xhr: xhr, success: true, status: xhr.status, value: "" };
				} else {
					// Errors are handled here (299 is a special value treated as error)
					var err = JSON.parse(xhr.responseText);
					if (err && err.ExceptionMessage)
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: err.ExceptionMessage, exceptionType: (err.ExceptionType || "System.Exception") };
					else if (err && err.Message)
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: err.Message, exceptionType: (err.ExceptionType || "System.Exception") };
					else if (err && err.length)
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: err.toString(), exceptionType: (err.ExceptionType || "System.Exception") };
					else
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: JsonWebApi.messages.networkError + xhr.status, exceptionType: "System.Exception" };
				}
			} catch (ex) {
				if (ex.name === "SyntaxError")
					return { xhr: xhr, success: false, status: -1, value: xhr.responseText, exceptionType: "SyntaxError" };
				return buildException(xhr, ex);
			}
		},
		buildFullUrl = function (url, args, start) {
			var name, value, i, j, fullUrl = url + "?";
			for (i = start; i < args.length; i += 2) {
				name = args[i];
				value = args[i + 1];

				if (!name && name !== 0)
					throw JsonWebApi.messages.invalidParameterName;
				name = encodeURIComponent(name) + "=";

				// Completely skip the parameter
				if (value === undefined || value === null)
					continue;

				if (value.constructor === Array) {
					if (!value.length) {
						// Completely skip the parameter, because if "name=" is sent, ASP.NET
						// will deserialize it as an array with 1 element containing default(type)
						continue;
					} else {
						if (i !== start)
							fullUrl += "&";

						fullUrl += name + encodeURIComponent((value[0] === undefined || value[0] === null) ? "" : value[0]);
						for (j = 1; j < value.length; j++)
							fullUrl += "&" + name + encodeURIComponent((value[j] === undefined || value[j] === null) ? "" : value[j]);
						continue;
					}
				} else {
					switch ((typeof value)) {
						case "function":
							throw JsonWebApi.messages.parameterValueCannotBeFunction;
						case "object":
							throw JsonWebApi.messages.parameterValueCannotBeObject;
					}
				}

				if (i !== start)
					fullUrl += "&";

				fullUrl += name + encodeURIComponent(value);
			}
			return fullUrl;
		},
		sendRequest = function (async, method, url, callback, bodyObject) {
			var done = false, xhr;

			JsonWebApi.active++;

			try {
				xhr = new XMLHttpRequest();

				xhr.open(method, url, async);

				if (JsonWebApi.avoidCache) {
					xhr.setRequestHeader("Cache-Control", "no-cache, no-store");
					xhr.setRequestHeader("Pragma", "no-cache");
				}

				xhr.setRequestHeader("Accept", "application/json");

				if (async) {
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4 && !done) {
							done = true;
							JsonWebApi.active--;
							callback(buildResponse(xhr));
						}
					}
				}

				xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
				if (bodyObject !== undefined)
					xhr.send(JSON.stringify(bodyObject));
				else
					xhr.send();

				if (async)
					return true;

				return buildResponse(xhr);
			} catch (ex) {
				if (!async)
					return buildException(xhr, ex);

				done = true;
				JsonWebApi.active--;
				callback(buildException(xhr, ex));
				return false;
			} finally {
				if (!async)
					JsonWebApi.active--;
			}
		};
	window.JsonWebApi = {
		messages: {
			invalidURL: "URL inválido",
			invalidCallback: "Callback inválido",
			invalidBodyObject: "Objeto do corpo da requisição inválido",
			invalidArguments: "Argumentos inválidos",
			invalidArgumentCount: "Quantidade de argumentos inválidos",
			invalidParameterName: "Nome do parâmetro inválido",
			parameterValueCannotBeObject: "O valor de um parâmetro não podem ser um objeto",
			parameterValueCannotBeFunction: "O valor de um parâmetro não podem ser uma função",
			exceptionDescription: "Ocorreu o seguinte erro: ",
			networkError: "Ocorreu um erro de rede: "
		},
		active: 0,
		avoidCache: true,
		redirect: function (url, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			window.location.href = ((arguments.length > 1) ? buildFullUrl(url, arguments, 1) : url);

			return true;
		},
		getSync: function (url, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(false, "get", (arguments.length > 1) ? buildFullUrl(url, arguments, 1) : url, null);
		},
		get: function (url, callback, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!callback)
				throw JsonWebApi.messages.invalidCallback;

			if ((arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(true, "get", (arguments.length > 2) ? buildFullUrl(url, arguments, 2) : url, callback);
		},
		deleteSync: function (url, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(false, "delete", (arguments.length > 1) ? buildFullUrl(url, arguments, 1) : url, null);
		},
		delete: function (url, callback, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!callback)
				throw JsonWebApi.messages.invalidCallback;

			if ((arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(true, "delete", (arguments.length > 2) ? buildFullUrl(url, arguments, 2) : url, callback);
		},
		postSync: function (url, bodyObject, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (bodyObject === undefined)
				throw JsonWebApi.messages.invalidBodyObject

			if ((arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(false, "post", (arguments.length > 2) ? buildFullUrl(url, arguments, 2) : url, null, bodyObject);
		},
		post: function (url, bodyObject, callback, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (bodyObject === undefined)
				throw JsonWebApi.messages.invalidBodyObject;

			if (!callback)
				throw JsonWebApi.messages.invalidCallback;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(true, "post", (arguments.length > 3) ? buildFullUrl(url, arguments, 3) : url, callback, bodyObject);
		},
		postForm: function (url, callback, name0, value0) {
			//
			//Para usar isso:
			//
			//http://stackoverflow.com/questions/11593595/is-there-a-way-to-handle-form-post-data-in-a-web-api-controller
			//
			//
			if (!url || !url.length) {
				throw "URL inválido";
			}

			if (!callback) {
				throw "Callback inválido";
			}

			if ((arguments.length & 1) || arguments.length < 4) {
				throw "Quantidade de argumentos inválidos";
			}

			var i, name, value, req, done, formData = new FormData();

			JsonWebApi.active++;

			try {
				//Preenche todos os campos do formulário
				for (i = 2; i < arguments.length; i += 2) {
					if (!arguments[i] || !arguments[i + 1]) {
						throw "Argumentos inválidos";
					}
					name = arguments[i].toString();
					value = arguments[i + 1].toString();
					if (!name || !name.length) {
						throw "Argumentos inválidos";
					}
					formData.append(name, value);
				}

				// Cria uma requisição AJAX
				req = new XMLHttpRequest();

				// Abre a requisição com o método HTTP POST

				// *** A requisição está sendo aberta em modo assíncrono!
				req.open("post", url, true);

				// Configura a requisição para enviar dados JSON através do corpo
				// da mensagem (por onde será enviado o objeto pessoa)
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				// Pede para o servidor devolver dados em JSON
				req.setRequestHeader("Accept", "application/json");

				// Configura o callback assíncrono
				req.onreadystatechange = function () {
					if (req.readyState === 4 && !done) {
						done = true;
						JsonWebApi.active--;
						callback(buildResponse(req));
					}
				}

				// Envia a requisição assincronamente
				req.send(formData);
			} catch(ex) {
				done = true;
				JsonWebApi.active--;
				callback(buildException(xhr, ex));
			}
		},
		postFormData: function (url, formData, callback) {
			//
			//Para usar isso:
			//
			//http://stackoverflow.com/questions/11593595/is-there-a-way-to-handle-form-post-data-in-a-web-api-controller
			//
			//
			if (!url || !url.length) {
				throw "URL inválido";
			}

			if (!formData) {
				throw "Formulário inválido";
			}

			if (!callback) {
				throw "Callback inválido";
			}

			var req, done;

			JsonWebApi.active++;

			try {
				// Cria uma requisição AJAX
				req = new XMLHttpRequest();

				// Abre a requisição com o método HTTP POST

				// *** A requisição está sendo aberta em modo assíncrono!
				req.open("post", url, true);

				// Configura a requisição para enviar dados JSON através do corpo
				// da mensagem (por onde será enviado o objeto pessoa)
				if (window.$ && formData.constructor != FormData)
					req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				// Pede para o servidor devolver dados em JSON
				req.setRequestHeader("Accept", "application/json");

				// Configura o callback assíncrono
				req.onreadystatechange = function () {
					if (req.readyState === 4 && !done) {
						done = true;
						JsonWebApi.active--;
						callback(buildResponse(req));
					}
				}

				// Envia a requisição assincronamente
				req.send((window.$ && formData.constructor != FormData) ? $(formData).serialize() : formData);
			} catch (ex) {
				done = true;
				JsonWebApi.active--;
				callback(buildException(xhr, ex));
			}
		}
	};
})();
window.BlobDownloader = {
	blobURL: null,

	saveAs: (window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || window.navigator.saveBlob || window.navigator.webkitSaveBlob || window.navigator.mozSaveBlob || window.navigator.msSaveBlob),

	supported: (("Blob" in window) && ("URL" in window) && ("createObjectURL" in window.URL) && ("revokeObjectURL" in window.URL)),

	alertNotSupported: function () {
		alert("Infelizmente seu navegador não suporta essa funcionalidade " + emoji.sad);
		return false;
	},

	download: function (filename, blob) {
		if (!BlobDownloader.supported)
			return false;
		if (BlobDownloader.blobURL) {
			URL.revokeObjectURL(BlobDownloader.blobURL);
			BlobDownloader.blobURL = null;
		}

		if (BlobDownloader.saveAs) {
			try {
				BlobDownloader.saveAs.call(window.navigator, blob, filename);
				return;
			} catch (ex) {
				alert("Ocorreu um erro durante o download dos dados " + emoji.sad);
			}
		}

		var a = document.createElement("a"), evt;
		BlobDownloader.blobURL = URL.createObjectURL(blob);
		a.href = BlobDownloader.blobURL;
		a.download = filename;
		if (document.createEvent && (window.MouseEvent || window.MouseEvents)) {
			try {
				evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(evt);
				return;
			} catch (ex) {
			}
		}
		a.click(); // Works on Chrome but not on Firefox...
		return true;
	}
};
// Search for selects
(function () {
	var regSlash = /[\/\\]/g, regTrim = /^\s+|\s+$/g, regA = /[ÁÀÃÂÄ]/g, regE = /[ÉÈÊË]/g, regI = /[ÍÌÎ]/g, regO = /[ÓÒÕÔ]/g, regU = /[ÚÙÛ]/g, regC = /[Ç]/g;

	function cbSearch_SetValue(select, value) {
		select.value = value;
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			select.dispatchEvent(evt);
		} else {
			select.fireEvent("onchange");
		}
	}

	function cbSearch_Normalize(x) {
		return x.toUpperCase().replace(regSlash, " ").replace(regTrim, "").replace(regA, "A").replace(regE, "E").replace(regI, "I").replace(regO, "O").replace(regU, "U").replace(regC, "C");
	}

	window.normalizeAccent = function (x) {
		return (x ? x.toUpperCase().replace(regTrim, "").replace(regA, "A").replace(regE, "E").replace(regI, "I").replace(regO, "O").replace(regU, "U").replace(regC, "C") : "");
	};

	function cbSearch_Change() {
		var i, opt = this.selectedOptions, v;
		if (opt) {
			opt = opt[0];
			this.cbSearchInput.value = ((opt && opt.value && opt.value != "0") ? opt.textContent : "");
		} else {
			opt = this.options;
			v = this.value;
			if (v && v != "0") {
				for (i = opt.length - 1; i >= 0; i--) {
					if (opt[i].value == v) {
						this.cbSearchInput.value = opt[i].textContent;
						return;
					}
				}
			}
			this.cbSearchInput.value = "";
		}
	}

	function cbSearch_MouseDown(e) {
		if (e.button)
			return;
		if (e.offsetX >= 0 && e.offsetX < 38 && e.offsetY >= 0 && (!e.target || e.target.tagName !== "OPTION")) { //(this.offsetWidth - 25)) {
			this.cbSearchFocusByMouse = false;
			this.cbSearchInput.focus();
			if (this.cbSearchInput.setSelectionRange)
				this.cbSearchInput.setSelectionRange(0, this.cbSearchInput.value.length);
			else
				this.cbSearchInput.select();
			return cancelEvent(e);
		} else {
			this.cbSearchFocusByMouse = true;
		}
	}

	function cbSearch_Blur() {
		if (this.cbSearchSelect) {
			var data = this.cbSearchData;
			if (!data)
				return;

			if (data.timerID)
				clearTimeout(data.timerID);

			if (data.menuVisible) {
				data.version++;
				data.timerID = setTimeout(cbSearch_BlurTimeout, 300, { data: data, version: data.version });
			}

			if (!this.value)
				cbSearch_SetValue(this.cbSearchSelect, this.cbSearchSelect.options[0].value);
			else
				cbSearch_Change.apply(this.cbSearchSelect);
		} else if (this.cbSearchInput) {
			$(this.cbSearchInput).removeClass("forced-focus");
		}
	}

	function cbSearch_BlurTimeout(x) {
		if (!x || !x.data || x.data.version !== x.version)
			return;
		x.data.close();
		//if (x.data.onblur)
		//	x.data.onblur.call(x.data.elemento);
		cbSearch_Change.apply(x.data.cbSearchSelect);
	}

	function cbSearch_Focus() {
		if (this.cbSearchInput) {
			$(this.cbSearchInput).addClass("forced-focus");
			if (this.cbSearchFocusByMouse)
				this.cbSearchFocusByMouse = false;
			//else
			//	this.cbSearchInput.focus();
		}
	}

	function cbSearch_AClick(e) {
		var data = this.cbSearchData;
		if (data) {
			data.close();
			cbSearch_SetValue(data.cbSearchSelect, this.parentNode.cbSearchValue);
		}
		return cancelEvent(e);
	}

	function cbSearch_KeyDown(e) {
		var data = this.cbSearchData, keyCode;
		if (!data)
			return;

		if ("key" in e) {
			switch (e.key) {
				case "ArrowUp":
					keyCode = 38;
					break;
				case "ArrowDown":
					keyCode = 40;
					break;
				case "ArrowLeft":
					keyCode = 37;
					break;
				case "ArrowRight":
					keyCode = 39;
					break;
				case "Enter":
					keyCode = 13;
					break;
				case "Escape":
					keyCode = 27;
					break;
				case "Shift":
				case "ShiftLeft":
				case "ShiftRight":
					keyCode = 16;
					break;
				case "Control":
				case "ControlLeft":
				case "ControlRight":
					keyCode = 17;
					break;
				case "Tab":
					keyCode = 9;
					break;
				default:
					keyCode = 0;
					break;
			}
		} else if ("keyCode" in e) {
			keyCode = e.keyCode;
		} else {
			keyCode = e.which;
		}

		switch (keyCode) {
			case 9: // tab
				if (data.menuVisible && data.selection >= 0)
					data.select();
			case 16: // shift
			case 17: // ctrl
			case 37: // left
			case 39: // right
				return true;
			case 38: // up
				if (e.preventDefault)
					e.preventDefault();
				if (data.menuVisible) {
					data.selection--;
					data.updateSelection();
				} else {
					data.open(data.cbSearchInput.value);
				}
				return false;
			case 40: // down
				if (e.preventDefault)
					e.preventDefault();
				if (data.menuVisible) {
					data.selection++;
					data.updateSelection();
				} else {
					data.open(data.cbSearchInput.value);
				}
				return false;
			case 13: // enter
				if (e.preventDefault)
					e.preventDefault();
				if (!data.menuVisible)
					data.open(data.cbSearchInput.value);
				return false;
			case 27: // escape
				if (data.menuVisible) {
					data.close();
					return cancelEvent(e);
				} else if (this.cbSearchSelect) {
					this.cbSearchSelect.cbSearchFocusByMouse = true;
					this.cbSearchSelect.focus();
					return cancelEvent(e);
				}
				break;
		}
		return true;
	}

	function cbSearch_KeyUp(e) {
		var data = this.cbSearchData, keyCode;
		if (!data)
			return;

		if ("key" in e) {
			switch (e.key) {
				case "ArrowUp":
					keyCode = 38;
					break;
				case "ArrowDown":
					keyCode = 40;
					break;
				case "ArrowLeft":
					keyCode = 37;
					break;
				case "ArrowRight":
					keyCode = 39;
					break;
				case "Enter":
					keyCode = 13;
					break;
				case "Escape":
					keyCode = 27;
					break;
				case "Shift":
				case "ShiftLeft":
				case "ShiftRight":
					keyCode = 16;
					break;
				case "Control":
				case "ControlLeft":
				case "ControlRight":
					keyCode = 17;
					break;
				case "Tab":
					keyCode = 9;
					break;
				default:
					keyCode = 0;
					break;
			}
		} else if ("keyCode" in e) {
			keyCode = e.keyCode;
		} else {
			keyCode = e.which;
		}

		switch (keyCode) {
			case 9: // tab
			case 16: // shift
			case 17: // ctrl
			case 37: // left
			case 39: // right
				return true;
			case 38: // up
			case 40: // down
				if (e.preventDefault)
					e.preventDefault();
				if (data.menuVisible)
					return false;
				data.lastSearch = null;
				break;
			case 13: // enter
				if (e.preventDefault)
					e.preventDefault();
				if (data.menuVisible) {
					data.select();
					return false;
				}
				data.lastSearch = null;
				break;
			case 27: // escape
				return cancelEvent(e);
		}

		var normalized = cbSearch_Normalize(this.value);
		if (data.lastSearch == normalized)
			return;

		data.lastSearch = normalized;

		if (normalized)
			data.open(normalized);
		else
			data.close();

		return true;
	}

	function cbSearch_DataSelect() {
		if (!this.menu || !this.menu.childNodes.length)
			return;
		if (this.selection < 0)
			this.selection = 0;
		else if (this.selection >= this.menu.childNodes.length)
			this.selection = this.menu.childNodes.length - 1;
		var li = this.menu.childNodes[this.selection];
		this.close();
		cbSearch_SetValue(this.cbSearchSelect, li.cbSearchValue);
	}

	function cbSearch_DataUpdateSelection() {
		if (!this.menu || !this.menu.childNodes.length)
			return;
		if (this.selection < 0)
			this.selection = 0;
		else if (this.selection >= this.menu.childNodes.length)
			this.selection = this.menu.childNodes.length - 1;
		var i, c;
		for (i = this.menu.childNodes.length - 1; i >= 0; i--)
			this.menu.childNodes[i].firstChild.style.background = "";
		c = this.menu.childNodes[this.selection];
		this.menu.scrollTop = c.offsetTop - 5;
		c.firstChild.style.background = "rgba(102,175,233,.75)";
	}

	function cbSearch_DataOpen(normalized) {
		var i, li, left, a, ok = false, cbSearchSelect = this.cbSearchSelect, list = cbSearchSelect.getElementsByTagName("OPTION"), menu = this.menu, txt, norm, value = null, rect;

		while (menu.firstChild)
			menu.removeChild(menu.firstChild);

		for (i = 0; i < list.length; i++) {
			li = list[i];
			if (!(value = li.value) || value == "0")
				continue;
			txt = li.textContent;
			norm = li.cbSearchNormalized;
			if (!norm) {
				norm = cbSearch_Normalize(txt);
				li.cbSearchNormalized = norm;
			}
			if (!normalized || norm.indexOf(normalized) >= 0) {
				li = document.createElement("li");
				if (value)
					li.cbSearchValue = value;
				a = document.createElement("a");
				if (!ok)
					a.style.background = "rgba(102,175,233,.75)";
				a.className = "dropdown-item";
				a.setAttribute("href", "#");
				a.cbSearchData = this;
				a.onclick = cbSearch_AClick;
				a.appendChild(document.createTextNode(txt));
				li.appendChild(a);
				menu.appendChild(li);
				ok = true;
			}
		}
		menu.scrollTop = 0;

		this.version++;

		if (this.timerID) {
			clearTimeout(this.timerID);
			this.timerID = null;
		}

		this.selection = 0;

		if (ok) {
			rect = this.dropDown.getBoundingClientRect();
			left = ((window.scrollX + rect.left) | 0);
			menu.style.left = left + "px";
			menu.style.top = ((window.scrollY + rect.bottom + 2) | 0) + "px";
			if (!this.menuVisible) {
				document.body.appendChild(menu);
				this.menuVisible = true;
			}
			rect = menu.getBoundingClientRect();
			if (rect.right > window.innerWidth)
				menu.style.left = ((left - (rect.right - window.innerWidth) - 32) | 0) + "px";
		} else {
			if (this.menuVisible) {
				if (menu.parentNode)
					menu.parentNode.removeChild(menu);
				this.menuVisible = false;
			}
		}
	}

	function cbSearch_DataClose() {
		if (this.menuVisible && this.menu.parentNode)
			this.menu.parentNode.removeChild(this.menu);
		this.menuVisible = false;
		while (this.menu.firstChild)
			this.menu.removeChild(this.menu.firstChild);
		this.version++;
		if (this.timerID) {
			clearTimeout(this.timerID);
			this.timerID = null;
		}
		this.lastSearch = null;
		this.selection = -1;
	}

	window.getCbSearchRoot = function (select) {
		return (select ? _(select).parentNode : null);
	};

	window.setCbSearch = function (select, value) {
		if (!select)
			return;
		select.value = value;
		if (("createEvent" in document)) {
			var e = document.createEvent("HTMLEvents");
			e.initEvent("change", false, true);
			select.dispatchEvent(e);
		} else if (("fireEvent" in select)) {
			select.fireEvent("onchange");
		} else if (select.onchange) {
			select.onchange();
		}
		if (select.cbSearchChange)
			select.cbSearchChange();
	};

	window.prepareCbSearch = function (select) {
		if (!select)
			return;

		var parent = select.parentNode,
			outerdiv = document.createElement("div"),
			groupdiv = document.createElement("div"),
			span = document.createElement("span"),
			button = document.createElement("button"),
			i = document.createElement("i"),
			input = document.createElement("input"),
			data = {
				cbSearchSelect: select,
				cbSearchInput: input,
				selection: -1,
				lastSearch: null,
				version: 0,
				dropDown: outerdiv,
				menu: document.createElement("ul"),
				menuVisible: false,
				select: cbSearch_DataSelect,
				updateSelection: cbSearch_DataUpdateSelection,
				open: cbSearch_DataOpen,
				close: cbSearch_DataClose
			};

		select.cbSearchData = data;
		select.cbSearchInput = input;
		select.onfocus = cbSearch_Focus;
		select.onblur = cbSearch_Blur;
		select.onmousedown = cbSearch_MouseDown;
		select.addEventListener("change", cbSearch_Change);
		select.cbSearchChange = cbSearch_Change;
		select.setAttribute("tabindex", "-1");
		outerdiv.className = "dropdown";
		groupdiv.className = "form-group input-group";
		groupdiv.style.position = "absolute";
		groupdiv.style.left = "0";
		groupdiv.style.top = "0";
		groupdiv.style.pointerEvents = "none";
		span.className = "input-group-btn";
		button.className = "btn btn-default btn-force-border";
		button.setAttribute("type", "button");
		button.setAttribute("aria-label", "Pesquisar");
		button.setAttribute("tabindex", "-1");
		button.cbSearchSelect = select;
		i.className = "fa fa-nomargin fa-filter";
		if (window.prepareCbSearchAllowLower)
			input.className = "form-control select-arrow" + ((select.className.indexOf("upper") >= 0) ? " upper" : "");
		else
			input.className = "form-control upper select-arrow";
		input.setAttribute("type", "text");
		input.setAttribute("spellcheck", "false");
		// In order to disable address autofill/autocomplete
		// https://stackoverflow.com/a/30976223
		input.setAttribute("autocomplete", "new-password");
		if (select.options[0])
			input.setAttribute("placeholder", select.options[0].textContent);
		input.cbSearchData = data;
		input.cbSearchSelect = select;
		input.onfocus = cbSearch_Focus;
		input.onblur = cbSearch_Blur;
		input.onkeydown = cbSearch_KeyDown;
		input.onkeyup = cbSearch_KeyUp;
		data.menu.className = "dropdown-menu";
		data.menu.style.maxHeight = "140px";// 10 (padding) + (26 x item count)
		data.menu.style.overflowY = "auto";
		data.menu.style.height = "auto";
		data.menu.style.width = "auto";
		data.menu.style.right = "auto";
		data.menu.style.bottom = "auto";
		data.menu.style.display = "block";
		data.menu.style.zIndex = "9999999";

		button.appendChild(i);
		span.appendChild(button);
		groupdiv.appendChild(span);
		groupdiv.appendChild(input);

		parent.removeChild(select);
		select.style.borderColor = "transparent";
		select.style.webkitBoxShadow = "none";
		select.style.boxShadow = "none";

		outerdiv.appendChild(select);
		outerdiv.appendChild(groupdiv);

		parent.appendChild(outerdiv);

		if (select.value && select.value != "0")
			cbSearch_Change.apply(select);
	};

	window.prepareCascadeCbSearch = function (select, nextSelect, emptyValue, autoSetSingleValue, valueGetter, textGetter, optsCallback) {
		if (!select)
			return;

		if (!select.cbSearchChange)
			prepareCbSearch(select);

		if (!nextSelect.cbSearchChange)
			prepareCbSearch(nextSelect);

		if (!nextSelect || !valueGetter || !textGetter || !optsCallback)
			return;

		select.addEventListener("change", function () {
			var i, nextValue = emptyValue, opt, opts = optsCallback(select.options.selectedIndex, select.value);
			while (nextSelect.childNodes.length > 1)
				nextSelect.removeChild(nextSelect.childNodes[1]);
			if (opts && opts.length) {
				for (i = 0; i < opts.length; i++) {
					opt = document.createElement("option");
					opt.setAttribute("value", valueGetter(opts[i]));
					opt.textContent = textGetter(opts[i]);
					nextSelect.appendChild(opt);
				}
				if (autoSetSingleValue && opts.length === 1)
					nextValue = valueGetter(opts[0]);
			}
			setCbSearch(nextSelect, nextValue);
		});
	};
})();
window.prepareFilteredCbState = function (cbState, cbCity, callback) {
	if (cbCity) {
		var i, j, tmp, cities;
		for (i = 0; i < cbState.options.length; i++) {
			tmp = cbState.options[i].getAttribute("data-cities");
			cbState.options[i].removeAttribute("data-cities");
			if (tmp && tmp.length) {
				tmp = tmp.split("|");
				if (tmp.length >= 2) {
					cities = [];
					for (j = 0; j < tmp.length; j += 2)
						cities.push([tmp[j], tmp[j + 1]]);
					cbState.options[i].dataCities = cities;
				} else {
					cbState.options[i].dataCities = [];
				}
			} else {
				cbState.options[i].dataCities = [];
			}
		}
		cbState.onchange = function () {
			var i, opt, cities = cbState.options[cbState.options.selectedIndex].dataCities;
			while (cbCity.childNodes.length > 1)
				cbCity.removeChild(cbCity.childNodes[1]);
			cbCity.value = "0";
			if (cbCity.cbSearchInput)
				cbCity.cbSearchInput.value = "";
			if (cities && cities.length) {
				for (i = 0; i < cities.length; i++) {
					opt = document.createElement("option");
					opt.setAttribute("value", cities[i][1]);
					opt.textContent = cities[i][0];
					cbCity.appendChild(opt);
				}
			}
			if (callback)
				callback();
		};
	}
};
window.prepareCbState = function (cbState, cbCity, callback) {
	if (cbCity) {
		cbState.onchange = function () {
			var i, id, opt, s = parseInt(cbState.value);
			s = ((!isNaN(s) && s > 0) ? window.cidades[s] : null);
			while (cbCity.childNodes.length > 1)
				cbCity.removeChild(cbCity.childNodes[1]);
			cbCity.value = "0";
			if (cbCity.cbSearchInput)
				cbCity.cbSearchInput.value = "";
			if (s && s.c && s.c.length) {
				id = s.i;
				s = s.c;
				for (i = 0; i < s.length; i++) {
					opt = document.createElement("option");
					opt.setAttribute("value", id + i);
					opt.textContent = s[i];
					cbCity.appendChild(opt);
				}
			}
			if (callback)
				callback();
		};
		cbState.onchange();
		if (cbState.cbSearchChange)
			cbState.cbSearchChange();
	}
};
window.converterDataISO = function (data, formatoBr) {
	if (!data || !(data = trim(data)) || data.length < 10)
		return null;
	let b1 = data.indexOf("/");
	let b2 = data.lastIndexOf("/");
	let dia, mes, ano;
	if (b1 <= 0 || b2 <= b1) {
		let b1 = data.indexOf("-");
		let b2 = data.lastIndexOf("-");
		if (b1 <= 0 || b2 <= b1)
			return null;
		ano = parseInt(data.substring(0, b1));
		mes = parseInt(data.substring(b1 + 1, b2));
		dia = parseInt(data.substring(b2 + 1));
	} else {
		dia = parseInt(data.substring(0, b1));
		mes = parseInt(data.substring(b1 + 1, b2));
		ano = parseInt(data.substring(b2 + 1));
	}
	if (isNaN(dia) || isNaN(mes) || isNaN(ano) ||
		dia < 1 || mes < 1 || ano < 1 ||
		dia > 31 || mes > 12 || ano > 9999)
		return null;
	switch (mes) {
		case 2:
			if (!(ano % 4) && ((ano % 100) || !(ano % 400))) {
				if (dia > 29)
					return null;
			} else {
				if (dia > 28)
					return null;
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			if (dia > 30)
				return null;
			break;
	}
	return (formatoBr ?
		(((dia < 10) ? ("0" + dia) : dia) + "/" + ((mes < 10) ? ("0" + mes) : mes) + "/" + ano) :
		(ano + "-" + ((mes < 10) ? ("0" + mes) : mes) + "-" + ((dia < 10) ? ("0" + dia) : dia)));
};

window.prepareDatePicker = function (id, options) {
	// http://bootstrap-datepicker.readthedocs.org/en/latest/options.html#format
	// https://uxsolutions.github.io/bootstrap-datepicker
	var i, i$ = $(id), d, opt = {
		autoclose: true,
		clearBtn: true,
		format: "dd/mm/yyyy",
		language: "pt-BR",
		todayBtn: true,
		todayHighlight: true
	};

	if (options) {
		for (i in options)
			opt[i] = options[i];
	}

	d = i$.datepicker(opt);

	if ((i$ = i$[0])) {
		i$.setAttribute("autocomplete", "off");
		i$.setAttribute("spellcheck", "false");
	}

	return d;
};

window.setDatePickerValue = function (id, value) {
	var $i, i;
	if ((i = ($i = $(id))[0])) {
		i.value = value;
		$i.datepicker("update");
		//if (("dispatchEvent" in i) && ("Event" in window)) {
		//	i.dispatchEvent(new Event("keydown"));
		//	i.dispatchEvent(new Event("change"));
		//	i.dispatchEvent(new Event("keyup"));
		//}
	}
};

window.isSwalOpen = function () {
	return !!Swal.getContainer();
};

window.isModalOpen = function () {
	return !!$(".modal.show").length;
};

Swal.error = function (message, title) {
	var options = message;

	if (!options)
		options = {};

	if (typeof message === "string")
		options = { text: message };

	if (!options.icon)
		options.icon = "error";

	if (!options.title)
		options.title = title || "Oops...";

	if (!options.buttonsStyling) {
		options.buttonsStyling = false;

		if (!options.customClass)
			options.customClass = {};

		if (!options.customClass.confirmButton)
			options.customClass.confirmButton = "btn btn-danger";
	}

	return Swal.fire(options);
};

Swal.info = function (message, title) {
	var options = message;

	if (!options)
		options = {};

	if (typeof message === "string")
		options = { text: message };

	if (!options.icon)
		options.icon = "info";

	if (!options.title)
		options.title = title || "Informação";

	if (!options.buttonsStyling) {
		options.buttonsStyling = false;

		if (!options.customClass)
			options.customClass = {};

		if (!options.customClass.confirmButton)
			options.customClass.confirmButton = "btn btn-primary";
	}

	return Swal.fire(options);
};

Swal.success = function (message, title) {
	var options = message;

	if (!options)
		options = {};

	if (typeof message === "string")
		options = { text: message };

	if (!options.icon)
		options.icon = "success";

	if (!options.title)
		options.title = title || "Sucesso!";

	if (!options.buttonsStyling) {
		options.buttonsStyling = false;

		if (!options.customClass)
			options.customClass = {};

		if (!options.customClass.confirmButton)
			options.customClass.confirmButton = "btn btn-success";
	}

	return Swal.fire(options);
};

Swal.okcancel = function (message, title, danger) {
	var options = message;

	if (!options)
		options = {};

	if (typeof message === "string")
		options = { text: message };

	if (!options.icon)
		options.icon = (danger ? "warning" : "question");

	if (!options.title)
		options.title = title || (danger ? "Oops..." : "Confirmação");

	options.showCancelButton = true;

	if (!options.buttonsStyling) {
		options.buttonsStyling = false;

		if (!options.customClass)
			options.customClass = {};

		if (!options.customClass.confirmButton)
			options.customClass.confirmButton = (danger ? "btn btn-danger" : "btn btn-primary");

		if (!options.customClass.cancelButton)
			options.customClass.cancelButton = "btn btn-secondary ml-2";
	}

	if (!options.confirmButtonText)
		options.confirmButtonText = "OK";

	if (!options.cancelButtonText)
		options.cancelButtonText = "Cancelar";

	if (!("focusCancel" in options))
		options.focusCancel = true;

	return Swal.fire(options);
};

Swal.okcancelNoIcon = function (message, title) {
	var options = message;

	if (!options)
		options = {};

	if (typeof message === "string")
		options = { text: message };

	if (!options.title)
		options.title = title || "Confirmação";

	options.showCancelButton = true;

	if (!options.buttonsStyling) {
		options.buttonsStyling = false;

		if (!options.customClass)
			options.customClass = {};

		if (!options.customClass.confirmButton)
			options.customClass.confirmButton = "btn btn-primary";

		if (!options.customClass.cancelButton)
			options.customClass.cancelButton = "btn btn-secondary ml-2";
	}

	if (!options.confirmButtonText)
		options.confirmButtonText = "OK";

	if (!options.cancelButtonText)
		options.cancelButtonText = "Cancelar";

	if (!("focusCancel" in options))
		options.focusCancel = true;

	return Swal.fire(options);
};

Swal.wait = function (message) {
	var options = message;

	if (!options)
		options = {};

	if (typeof message === "string")
		options = { text: message };

	if (!options.html && !options.text)
		options.text = "Por favor, aguarde...";

	if (!options.allowOutsideClick)
		options.allowOutsideClick = false;

	if (!options.allowEscapeKey)
		options.allowEscapeKey = false;

	if (!options.allowEnterKey)
		options.allowEnterKey = false;

	var didOpen = options.didOpen;

	options.didOpen = function () {
		Swal.showLoading();
		if (didOpen)
			didOpen();
	};

	return Swal.fire(options);
};
