!function n(t,i,u){function c(r,e){if(!i[r]){if(!t[r]){var o="function"==typeof require&&require;if(!e&&o)return o(r,!0);if(l)return l(r,!0);throw(e=new Error("Cannot find module '"+r+"'")).code="MODULE_NOT_FOUND",e}o=i[r]={exports:{}},t[r][0].call(o.exports,function(e){return c(t[r][1][e]||e)},o,o.exports,n,t,i,u)}return i[r].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,r,o){"use strict";o.__esModule=!0,o.sayHello=void 0,o.sayHello=function(e){return"Hello from ".concat(e)}},{}],2:[function(e,r,o){"use strict";o.__esModule=!0;var n,o=e("./interface");e="greeting",n="TypeScript",document.getElementById(e).innerText=(0,o.sayHello)(n),console.log("hi"),console.log("This also works!")},{"./interface":1}]},{},[2]);
//# sourceMappingURL=bundle.js.map
