(function(G) {
	"use strict";

	// deep-equal function
	function deepEq(a, b) {
		if (typeof a !== typeof b) {
			return false;
		}
		if (a instanceof Function) {
			return a.toString() === b.toString();
		}
		if (a === b || a.valueOf() === b.valueOf()) {
			return true;
		}
		if (!(a instanceof Object)) {
			return false;
		}
		var ka = Object.keys(a);
		if (ka.length != Object.keys(b).length) {
			return false;
		}
		for (var i in b) {
			if (!b.hasOwnProperty(i)) {
				continue;
			}
			if (ka.indexOf(i) === -1) {
				return false;
			}
			if (!deepEq(a[i], b[i])) {
				return false;
			}
		}
		return true;
	}

	// simple spy (function collecting its calls)
	function spy(f) {
		var s = function() {
			var result;
			s.called = s.called || [];
			s.thrown = s.thrown || [];
			if (f) {
				try {
					result = f.apply(f.this, arguments);
					s.thrown.push(undefined);
				} catch (e) {
					s.thrown.push(e);
				}
			}
			s.called.push(arguments);
			return result;
		};
		return s;
	}

	var pendingTests = [];
	var runNextTest = function() {
		if (pendingTests.length > 0) {
			pendingTests[0](runNextTest);
		} else {
			testHandler('finalize');
		}
	};

	var env = G;
	var testHandler = function() {};

	G.test = function(name, f, async) {
		if (typeof name == 'function') {
			testHandler = name;
			env = f || G;
			return;
		}
		var testfn = function(next) {
			var prev = {
				ok: env.ok,
				spy: env.spy,
				eq: env.eq
			};

			var handler = testHandler;

			var restore = function() {
				env.ok = prev.ok;
				env.spy = prev.spy;
				env.eq = prev.eq;
				handler('end', name);
				pendingTests.shift();
				if (next) next();
			};

			env.eq = deepEq;
			env.spy = spy;
			env.ok = function(cond, msg) {
				cond = !!cond;
				if (cond) {
					handler('pass', name, msg);
				} else {
					handler('fail', name, msg);
				}
			};

			handler('begin', name);
			try {
				f(restore);
			} catch (e) {
				handler('except', name, e);
			}
			if (!async) {
				handler('end', name);
				env.ok = prev.ok;
				env.spy = prev.spy;
				env.eq = prev.eq;
			}
		};
		if (!async) {
			testfn();
		} else {
			pendingTests.push(testfn);
			if (pendingTests.length == 1) {
				runNextTest();
			}
		}
	};
})((function() {return this;}.call())); // use whatever global object

if (typeof window === 'undefined') {
	test(function(e, test, msg) {
		if (e == 'pass') {
			console.log('\033[32m\u2714\033[0m ' + test + ': ' + msg);
		} else if (e == 'fail' || e == 'except') {
			console.log('\033[31m\u2718\033[0m ' + test + ': ' + msg);
		}
	});
} else {
	var css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '.kludjs li, .kludjs ul { margin: 0; padding: 0; }' + 
		'.kludjs-pass, .kludjs-except, .kludjs-fail { list-style: none; }' +
		'.kludjs-pass:before {content:"✓";margin-right:1em;color:green;}'+
		'.kludjs-fail:before, .kludjs-except:before {content:"✖";margin-right:1em;color:red;}';
	document.head.appendChild(css);

	var el, testEl, assertEl, passed, failed;

	test(function(e, test, msg) {
		if (el === undefined) {
			el = document.createElement('ul');
			el.className = 'kludjs';
			(document.querySelector('.kludjs') || document.body).appendChild(el);
		}
		if (e === 'begin') {
			passed = failed = 0;
			testEl = document.createElement('li');
			assertEl = document.createElement('ul');
			testEl.appendChild(document.createTextNode(test));
			testEl.appendChild(assertEl);
			el.appendChild(testEl);
		} else if (e === 'end') {
			testEl.insertBefore(document.createTextNode(' (' + passed + '/' + (passed+failed) + ')'), assertEl);
		} else if (e === 'pass' || e === 'fail' || e === 'except') {
			assertEl.innerHTML += '<li class="kludjs-item kludjs-'+e+'">' + msg + '</li>';
			if (e === 'pass') {
				passed++;
			} else {
				failed++;
			}
		}
	});
}

if (typeof module !== 'undefined') {
	module.exports = test;
}

