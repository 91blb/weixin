/*
Copyright 2014, KISSY v1.47
MIT Licensed
build time: Jul 23 14:31
*/
KISSY.add("dom/base/api",[],function(i){var m=i.Env.host||{},n=m.document,q=i.UA,d={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12},e={isCustomDomain:function(d){var d=d||m,d=e.get(d),h=d.document.domain,d=d.location.hostname;return h!==d&&h!=="["+d+"]"},getEmptyIframeSrc:function(d){d=d||m;d=e.get(d);return q.ie&&e.isCustomDomain(d)?
"javascript:void(function(){"+encodeURIComponent('document.open();document.domain="'+d.document.domain+'";document.close();')+"}())":""},NodeType:d,getWindow:function(j){if(!j)return m;j=e.get(j);if(i.isWindow(j))return j;var h=j;h.nodeType!==d.DOCUMENT_NODE&&(h=j.ownerDocument);return h.defaultView||h.parentWindow},getDocument:function(j){if(!j)return n;j=e.get(j);return i.isWindow(j)?j.document:j.nodeType===d.DOCUMENT_NODE?j:j.ownerDocument},isDomNodeList:function(d){return d&&!d.nodeType&&d.item&&
!d.setTimeout},nodeName:function(d){var h=e.get(d),d=h.nodeName.toLowerCase();q.ie&&(h=h.scopeName)&&"HTML"!==h&&(d=h.toLowerCase()+":"+d);return d},_RE_NUM_NO_PX:RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+")(?!px)[a-z%]+$","i")};i.mix(e,d);return e});
KISSY.add("dom/base/attr",["./api"],function(i,m){function n(a){return null==a?"":a+""}function q(a,b){var b=g[b]||b,d=o[b];return d&&d.get?d.get(a,b):a[b]}var d=m("./api"),e=i.Env.host.document,j=d.NodeType,e=e&&e.documentElement,h=d.nodeName,f=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,k=/^(?:button|input|object|select|textarea)$/i,l=/^a(?:rea)?$/i,c=/:|^on/,b=/\r/g,a={},s={val:1,css:1,html:1,text:1,data:1,width:1,
height:1,offset:1,scrollTop:1,scrollLeft:1},t={tabindex:{get:function(a){var b=a.getAttributeNode("tabindex");return b&&b.specified?parseInt(b.value,10):k.test(a.nodeName)||l.test(a.nodeName)&&a.href?0:void 0}}},g={hidefocus:"hideFocus",tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},p=
{get:function(a,b){return d.prop(a,b)?b.toLowerCase():void 0},set:function(a,b,c){!1===b?d.removeAttr(a,c):(b=g[c]||c,b in a&&(a[b]=!0),a.setAttribute(c,c.toLowerCase()));return c}},o={},u={},z={select:{get:function(a){var b=a.selectedIndex,c=a.options,g;if(0>b)return null;if("select-one"===""+a.type)return d.val(c[b]);a=[];b=0;for(g=c.length;b<g;++b)c[b].selected&&a.push(d.val(c[b]));return a},set:function(a,b){var c=i.makeArray(b);i.each(a.options,function(a){a.selected=i.inArray(d.val(a),c)});
c.length||(a.selectedIndex=-1);return c}}};i.each(["radio","checkbox"],function(a){z[a]={get:function(a){return null===a.getAttribute("value")?"on":a.value},set:function(a,b){if(i.isArray(b))return a.checked=i.inArray(d.val(a),b),1}}});t.style={get:function(a){return a.style.cssText}};i.mix(d,{_valHooks:z,_propFix:g,_attrHooks:t,_propHooks:o,_attrNodeHook:u,_attrFix:a,prop:function(a,b,c){var f=d.query(a),h,e;if(i.isPlainObject(b))i.each(b,function(a,b){d.prop(f,b,a)});else if(b=g[b]||b,e=o[b],void 0!==
c)for(a=f.length-1;0<=a;a--)h=f[a],e&&e.set?e.set(h,c,b):h[b]=c;else if(f.length)return q(f[0],b)},hasProp:function(a,b){var c=d.query(a),g,f=c.length,h;for(g=0;g<f;g++)if(h=c[g],void 0!==q(h,b))return!0;return!1},removeProp:function(a,b){var b=g[b]||b,c=d.query(a),f,h;for(f=c.length-1;0<=f;f--){h=c[f];try{h[b]=void 0,delete h[b]}catch(e){}}},attr:function(b,g,e,k){var l=d.query(b),o=l[0];if(i.isPlainObject(g)){var k=e,r;for(r in g)d.attr(l,r,g[r],k)}else{if(k&&s[g])return d[g](b,e);g=g.toLowerCase();
if(k&&s[g])return d[g](b,e);g=a[g]||g;b=f.test(g)?p:c.test(g)?u:t[g];if(void 0===e){if(o&&o.nodeType===j.ELEMENT_NODE){"form"===h(o)&&(b=u);if(b&&b.get)return b.get(o,g);e=o.getAttribute(g);return""===e&&(g=o.getAttributeNode(g),!g||!g.specified)?void 0:null===e?void 0:e}}else for(k=l.length-1;0<=k;k--)if((o=l[k])&&o.nodeType===j.ELEMENT_NODE)"form"===h(o)&&(b=u),b&&b.set?b.set(o,e,g):o.setAttribute(g,""+e)}},removeAttr:function(b,c){var c=c.toLowerCase(),c=a[c]||c,h=d.query(b),e,s,p;for(p=h.length-
1;0<=p;p--)if(s=h[p],s.nodeType===j.ELEMENT_NODE&&(s.removeAttribute(c),f.test(c)&&(e=g[c]||c)in s))s[e]=!1},hasAttr:e&&!e.hasAttribute?function(b,a){var a=a.toLowerCase(),c=d.query(b),g,f;for(g=0;g<c.length;g++)if(f=c[g],(f=f.getAttributeNode(a))&&f.specified)return!0;return!1}:function(a,b){var c=d.query(a),g,f=c.length;for(g=0;g<f;g++)if(c[g].hasAttribute(b))return!0;return!1},val:function(a,c){var g,f,e,s,r;if(void 0===c){if(e=d.get(a)){if((g=z[h(e)]||z[e.type])&&"get"in g&&void 0!==(f=g.get(e,
"value")))return f;f=e.value;return"string"===typeof f?f.replace(b,""):null==f?"":f}}else{f=d.query(a);for(s=f.length-1;0<=s;s--){e=f[s];if(1!==e.nodeType)break;r=c;null==r?r="":"number"===typeof r?r+="":i.isArray(r)&&(r=i.map(r,n));g=z[h(e)]||z[e.type];if(!g||!("set"in g)||void 0===g.set(e,r,"value"))e.value=r}}},text:function(a,b){var g,c,f,e;if(void 0===b)return g=d.get(a),d._getText(g);c=d.query(a);for(f=c.length-1;0<=f;f--)if(g=c[f],e=g.nodeType,e===j.ELEMENT_NODE)d.cleanData(g.getElementsByTagName("*")),
"textContent"in g?g.textContent=b:g.innerText=b;else if(e===j.TEXT_NODE||e===j.CDATA_SECTION_NODE)g.nodeValue=b},_getText:function(a){return a.textContent}});return d});
KISSY.add("dom/base/class",["./api"],function(i,m){function n(d){for(var d=i.trim(d||""),d=d.split(f),e=[],c,b=d.length,a=0;a<b;a++)(c=d[a])&&e.push(c);return e}function q(d){return function(f,c){var b,a,e,h=f.classList,g=j.call(arguments,2);b=0;for(a=c.length;b<a;b++)(e=c[b])&&h[d].apply(h,[e].concat(g))}}function d(d){return function(f,c){var b=n(c),a=j.call(arguments,2);e.query(f).each(function(c){c.nodeType===h.ELEMENT_NODE&&e[d].apply(e,[c,b].concat(a))})}}var e=m("./api"),j=[].slice,h=e.NodeType,
f=/[\.\s]\s*\.?/;i.mix(e,{_hasClass:function(d,f){var c,b,a,e=d.classList;if(e.length){c=0;for(b=f.length;c<b;c++)if((a=f[c])&&!e.contains(a))return!1;return!0}return!1},_addClass:q("add"),_removeClass:q("remove"),_toggleClass:q("toggle"),hasClass:function(d,f){var c=!1,f=n(f);e.query(d).each(function(b){if(b.nodeType===h.ELEMENT_NODE&&e._hasClass(b,f))return c=!0,!1});return c},replaceClass:function(d,f,c){e.removeClass(d,f);e.addClass(d,c)},addClass:d("_addClass"),removeClass:d("_removeClass"),
toggleClass:d("_toggleClass")});return e});
KISSY.add("dom/base/create",["./api"],function(i,m){function n(r){r=r&&r!==k?r.createElement(b):a;r===a&&(r.innerHTML="");return r}function q(a,b){var d=n(b);d.innerHTML="m<div>"+a+"</div>";return d.lastChild}function d(a,b){if(b)if(o&&b.canHaveChildren&&"removeNode"in a){if(a.firstChild)a:{try{a.innerHTML="";break a}catch(g){}for(var c;c=a.lastChild;)d(c,a)}a.removeNode(!1)}else b.removeChild(a)}function e(a,b,d){var g=b.nodeType;if(g===l.DOCUMENT_FRAGMENT_NODE){b=b.childNodes;d=d.childNodes;for(g=
0;b[g];)d[g]&&e(a,b[g],d[g]),g++}else if(g===l.ELEMENT_NODE){b=b.getElementsByTagName("*");d=d.getElementsByTagName("*");for(g=0;b[g];)d[g]&&a(b[g],d[g]),g++}}function j(a,b){var g=i.Env.mods["event/dom/base"],d,c,g=g&&g.exports;if(b.nodeType!==l.ELEMENT_NODE||f.hasData(a)){d=f.data(a);for(c in d)f.data(b,c,d[c]);g&&g.clone&&g.clone(a,b)}}function h(a){var b=null,g,d;if(a&&(a.push||a.item)&&a[0]){b=a[0].ownerDocument;b=b.createDocumentFragment();a=i.makeArray(a);g=0;for(d=a.length;g<d;g++)b.appendChild(a[g])}return b}
var f=m("./api"),k=i.Env.host.document,l=f.NodeType,c=i.UA.ieMode,b="div",a=k&&k.createElement(b),s=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,t=/<([\w:]+)/,g=/^\s+/,p=/\s+$/,o=!!(c&&9>c),u=o,z=/<|&#?\w+;/,A=k&&"outerHTML"in k.documentElement,F=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;i.mix(f,{create:function(a,d,c,e){var o=null;if(!a)return o;if(a.nodeType)return f.clone(a);if("string"!==typeof a)return o;void 0===e&&(e=!0);e&&(a=i.trim(a));var e=f._creators,j,n,c=c||k,A,m=b;if(z.test(a))if(A=
F.exec(a))o=c.createElement(A[1]);else{a=a.replace(s,"<$1></$2>");if((A=t.exec(a))&&(j=A[1]))m=j.toLowerCase();j=(e[m]||q)(a,c);u&&(n=a.match(g))&&j.insertBefore(c.createTextNode(n[0]),j.firstChild);u&&/\S/.test(a)&&(n=a.match(p))&&j.appendChild(c.createTextNode(n[0]));a=j.childNodes;1===a.length?o=a[0].parentNode.removeChild(a[0]):a.length&&(o=h(a))}else o=c.createTextNode(a);i.isPlainObject(d)&&(o.nodeType===l.ELEMENT_NODE?f.attr(o,d,!0):o.nodeType===l.DOCUMENT_FRAGMENT_NODE&&f.attr(o.childNodes,
d,!0));return o},_fixCloneAttributes:function(a,b){"textarea"===f.nodeName(a)&&(b.defaultValue=a.defaultValue,b.value=a.value)},_creators:{div:q},_defaultCreator:q,html:function(a,b,d){var a=f.query(a),c=a[0],e=!1,h,p;if(!c)return null;if(void 0===b)return c.nodeType===l.ELEMENT_NODE?c.innerHTML:c.nodeType===l.DOCUMENT_FRAGMENT_NODE?(d=n(c.ownerDocument),d.appendChild(c),d.innerHTML):null;b+="";if(!b.match(/<(?:script|style|link)/i)&&(!u||!b.match(g))&&!x[(b.match(t)||["",""])[1].toLowerCase()])try{for(h=
a.length-1;0<=h;h--)p=a[h],p.nodeType===l.ELEMENT_NODE&&(f.cleanData(p.getElementsByTagName("*")),p.innerHTML=b);e=!0}catch(s){}e||(b=f.create(b,0,c.ownerDocument,0),f.empty(a),f.append(b,a,d))},outerHtml:function(a,b,d){var a=f.query(a),g=a.length,c=a[0];if(!c)return null;if(void 0===b){if(A&&c.nodeType!==f.DOCUMENT_FRAGMENT_NODE)return c.outerHTML;b=n(c.ownerDocument);b.appendChild(f.clone(c,!0));return b.innerHTML}b+="";if(!b.match(/<(?:script|style|link)/i)&&A)for(d=g-1;0<=d;d--)c=a[d],c.nodeType===
l.ELEMENT_NODE&&(f.cleanData(c,1),c.outerHTML=b);else b=f.create(b,0,c.ownerDocument,0),f.insertBefore(b,a,d),f.remove(a)},remove:function(a,b){var c,g=f.query(a),e,h=i.Env.mods["event/dom/base"],p,h=h&&h.exports;for(p=g.length-1;0<=p;p--)c=g[p],!b&&c.nodeType===l.ELEMENT_NODE&&(e=i.makeArray(c.getElementsByTagName("*")),e.push(c),f.removeData(e),h&&h.detach&&h.detach(e)),d(c,c.parentNode)},clone:function(a,b,c,d){"object"===typeof b&&(d=b.deepWithDataAndEvent,c=b.withDataAndEvent,b=b.deep);var a=
f.get(a),g,h=f._fixCloneAttributes,p;if(!a)return null;p=a.nodeType;g=a.cloneNode(b);if(p===l.ELEMENT_NODE||p===l.DOCUMENT_FRAGMENT_NODE)h&&p===l.ELEMENT_NODE&&h(a,g),b&&h&&e(h,a,g);c&&(j(a,g),b&&d&&e(j,a,g));return g},empty:function(a){var a=f.query(a),b,c;for(c=a.length-1;0<=c;c--)b=a[c],f.remove(b.childNodes)},_nodeListToFragment:h});f.outerHTML=f.outerHtml;var D=f._creators,G=f.create,x={area:"map",thead:"table",td:"tr",th:"tr",tr:"tbody",tbody:"table",tfoot:"table",caption:"table",colgroup:"table",
col:"colgroup",legend:"fieldset"},w;for(w in x)(function(a){D[w]=function(b,c){return G("<"+a+">"+b+"</"+a+">",void 0,c)}})(x[w]);D.option=D.optgroup=function(a,b){return G('<select multiple="multiple">'+a+"</select>",void 0,b)};x.option=x.optgroup=1;return f});
KISSY.add("dom/base/data",["./api"],function(i,m){var n=m("./api"),q=i.Env.host,d="_ks_data_"+i.now(),e={},j={},h={applet:1,object:1,embed:1},f={hasData:function(c,b){if(c)if(void 0!==b){if(b in c)return!0}else if(!i.isEmptyObject(c))return!0;return!1}},k={hasData:function(c,b){return c==q?k.hasData(j,b):f.hasData(c[d],b)},data:function(c,b,a){if(c==q)return k.data(j,b,a);var e=c[d];if(void 0!==a)e=c[d]=c[d]||{},e[b]=a;else return void 0!==b?e&&e[b]:e=c[d]=c[d]||{}},removeData:function(c,b){if(c==
q)return k.removeData(j,b);var a=c[d];if(void 0!==b)delete a[b],i.isEmptyObject(a)&&k.removeData(c);else try{delete c[d]}catch(e){c[d]=void 0}}},l={hasData:function(c,b){var a=c[d];return!a?!1:f.hasData(e[a],b)},data:function(c,b,a){if(!h[c.nodeName.toLowerCase()]){var f=c[d];if(!f){if(void 0!==b&&void 0===a)return;f=c[d]=i.guid()}c=e[f];if(void 0!==a)c=e[f]=e[f]||{},c[b]=a;else return void 0!==b?c&&c[b]:c=e[f]=e[f]||{}}},removeData:function(c,b){var a=c[d],f;if(a)if(f=e[a],void 0!==b)delete f[b],
i.isEmptyObject(f)&&l.removeData(c);else{delete e[a];try{delete c[d]}catch(h){c[d]=void 0}c.removeAttribute&&c.removeAttribute(d)}}};i.mix(n,{__EXPANDO:d,hasData:function(c,b){for(var a=!1,d=n.query(c),f=0;f<d.length&&!(a=d[f],a=a.nodeType?l.hasData(a,b):k.hasData(a,b));f++);return a},data:function(c,b,a){var c=n.query(c),d=c[0];if(i.isPlainObject(b))for(var f in b)n.data(c,f,b[f]);else if(void 0===a){if(d)return d.nodeType?l.data(d,b):k.data(d,b)}else for(f=c.length-1;0<=f;f--)d=c[f],d.nodeType?
l.data(d,b,a):k.data(d,b,a)},removeData:function(d,b){var a=n.query(d),f,e;for(e=a.length-1;0<=e;e--)f=a[e],f.nodeType?l.removeData(f,b):k.removeData(f,b)},cleanData:function(d,b){var a=n.query(d),f,e,g=i.Env.mods["event/dom/base"],g=g&&g.exports;for(e=a.length-1;0<=e;e--)if(f=a[e],f.nodeType){var h=b&&i.makeArray(f.getElementsByTagName("*"))||[];h.push(f);f=0;for(var o=h.length;f<o;f++)l.removeData(h[f]);g&&g.detach&&g.detach(h)}else k.removeData(f)}});return n});
KISSY.add("dom/base/insertion",["./api"],function(i,m){function n(b,a){var d=[],e,g,p;for(e=0;b[e];e++)if(g=b[e],p=f(g),g.nodeType===j.DOCUMENT_FRAGMENT_NODE)d.push.apply(d,n(k(g.childNodes),a));else if("script"===p&&(!g.type||c.test(g.type)))g.parentNode&&g.parentNode.removeChild(g),a&&a.push(g);else{if(g.nodeType===j.ELEMENT_NODE&&!h.test(p)){p=[];var o,i,z=g.getElementsByTagName("script");for(i=0;i<z.length;i++)o=z[i],(!o.type||c.test(o.type))&&p.push(o);l.apply(b,[e+1,0].concat(p))}d.push(g)}return d}
function q(b){b.src?i.getScript(b.src):(b=i.trim(b.text||b.textContent||b.innerHTML||""))&&i.globalEval(b)}function d(b,a,d,c){b=e.query(b);c&&(c=[]);b=n(b,c);e._fixInsertionChecked&&e._fixInsertionChecked(b);var a=e.query(a),g,f,h,k,j=a.length;if((b.length||c&&c.length)&&j){b=e._nodeListToFragment(b);1<j&&(k=e.clone(b,!0),a=i.makeArray(a));for(g=0;g<j;g++)f=a[g],b&&(h=0<g?e.clone(k,!0):b,d(h,f)),c&&c.length&&i.each(c,q)}}var e=m("./api"),j=e.NodeType,h=/^(?:button|input|object|select|textarea)$/i,
f=e.nodeName,k=i.makeArray,l=[].splice,c=/\/(java|ecma)script/i;i.mix(e,{_fixInsertionChecked:null,insertBefore:function(b,a,c){d(b,a,function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b)},c)},insertAfter:function(b,a,c){d(b,a,function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)},c)},appendTo:function(b,a,c){d(b,a,function(a,b){b.appendChild(a)},c)},prependTo:function(b,a,c){d(b,a,function(a,b){b.insertBefore(a,b.firstChild)},c)},wrapAll:function(b,a){a=e.clone(e.get(a),!0);
b=e.query(b);b[0].parentNode&&e.insertBefore(a,b[0]);for(var c;(c=a.firstChild)&&1===c.nodeType;)a=c;e.appendTo(b,a)},wrap:function(b,a){b=e.query(b);a=e.get(a);i.each(b,function(b){e.wrapAll(b,a)})},wrapInner:function(b,a){b=e.query(b);a=e.get(a);i.each(b,function(b){var c=b.childNodes;c.length?e.wrapAll(c,a):b.appendChild(a)})},unwrap:function(b){b=e.query(b);i.each(b,function(a){a=a.parentNode;e.replaceWith(a,a.childNodes)})},replaceWith:function(b,a){var c=e.query(b),a=e.query(a);e.remove(a,!0);
e.insertBefore(a,c);e.remove(c)}});i.each({prepend:"prependTo",append:"appendTo",before:"insertBefore",after:"insertAfter"},function(b,a){e[a]=e[b]});return e});
KISSY.add("dom/base/offset",["./api"],function(i,m){function n(c){var d,f=c.ownerDocument.body;if(!c.getBoundingClientRect)return{left:0,top:0};d=c.getBoundingClientRect();c=d[b];d=d[a];c-=k.clientLeft||f.clientLeft||0;d-=k.clientTop||f.clientTop||0;return{left:c,top:d}}function q(a,b){var c={left:0,top:0},f=l(a),e,h=a,b=b||f;do{if(f==b){var i=h;e=n(i);i=l(i);e.left+=d[s](i);e.top+=d[t](i)}else e=n(h);c.left+=e.left;c.top+=e.top}while(f&&f!=b&&(h=f.frameElement)&&(f=f.parent));return c}var d=m("./api"),
e=i.Env.host,j=i.UA,h=e.document,f=d.NodeType,k=h&&h.documentElement,l=d.getWindow,c=Math.max,b="left",a="top",s="scrollLeft",t="scrollTop";i.mix(d,{offset:function(a,b,c){if(void 0===b){var a=d.get(a),f;a&&(f=q(a,c));return f}c=d.query(a);for(f=c.length-1;0<=f;f--){var a=c[f],e=b;"static"===d.css(a,"position")&&(a.style.position="relative");var h=q(a),i={},k=void 0,j=void 0;for(j in e)k=parseFloat(d.css(a,j))||0,i[j]=k+e[j]-h[j];d.css(a,i)}},scrollIntoView:function(c,e,h,k){var j,n,m,q;if(m=d.get(c)){e&&
(e=d.get(e));e||(e=m.ownerDocument);e.nodeType===f.DOCUMENT_NODE&&(e=l(e));i.isPlainObject(h)&&(k=h.allowHorizontalScroll,q=h.onlyScrollIfNeeded,h=h.alignWithTop);k=void 0===k?!0:k;n=i.isWindow(e);var c=d.offset(m),s=d.outerHeight(m);j=d.outerWidth(m);var t,w,r,v;n?(n=e,t=d.height(n),w=d.width(n),v={left:d.scrollLeft(n),top:d.scrollTop(n)},n=c[b]-v[b],m=c[a]-v[a],j=c[b]+j-(v[b]+w),c=c[a]+s-(v[a]+t)):(t=d.offset(e),w=e.clientHeight,r=e.clientWidth,v={left:d.scrollLeft(e),top:d.scrollTop(e)},n=c[b]-
(t[b]+(parseFloat(d.css(e,"borderLeftWidth"))||0)),m=c[a]-(t[a]+(parseFloat(d.css(e,"borderTopWidth"))||0)),j=c[b]+j-(t[b]+r+(parseFloat(d.css(e,"borderRightWidth"))||0)),c=c[a]+s-(t[a]+w+(parseFloat(d.css(e,"borderBottomWidth"))||0)));if(q){if(0>m||0<c)!0===h?d.scrollTop(e,v.top+m):!1===h?d.scrollTop(e,v.top+c):0>m?d.scrollTop(e,v.top+m):d.scrollTop(e,v.top+c)}else(h=void 0===h?!0:!!h)?d.scrollTop(e,v.top+m):d.scrollTop(e,v.top+c);if(k)if(q){if(0>n||0<j)!0===h?d.scrollLeft(e,v.left+n):!1===h?d.scrollLeft(e,
v.left+j):0>n?d.scrollLeft(e,v.left+n):d.scrollLeft(e,v.left+j)}else void 0===h||h?d.scrollLeft(e,v.left+n):d.scrollLeft(e,v.left+j)}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0,scrollTop:0,scrollLeft:0});i.each(["Left","Top"],function(a,b){var c="scroll"+a;d[c]=function(h,i){if("number"===typeof h)return arguments.callee(e,h);var h=d.get(h),k,j,n,m;h&&h.nodeType===f.ELEMENT_NODE?void 0!==i?h[c]=parseFloat(i):k=h[c]:(m=l(h),void 0!==i?(i=parseFloat(i),j="Left"===a?i:d.scrollLeft(m),n=
"Top"===a?i:d.scrollTop(m),m.scrollTo(j,n)):(k=m["page"+(b?"Y":"X")+"Offset"],"number"!==typeof k&&(j=m.document,k=j.documentElement[c],"number"!==typeof k&&(k=j.body[c]))));return k}});i.each(["Width","Height"],function(a){d["doc"+a]=function(b){b=d.get(b);b=d.getDocument(b);return c(b.documentElement["scroll"+a],b.body["scroll"+a],d["viewport"+a](b))};d["viewport"+a]=function(b){var b=d.get(b),c=l(b),b=c["inner"+a];if(j.mobile&&b)return b;var b="client"+a,c=c.document,e=c.body,f=c.documentElement[b];
return"CSS1Compat"===c.compatMode&&f||e&&e[b]||f}});return d});
KISSY.add("dom/base/style",["./api","ua"],function(i,m){function n(a,b){return b.toUpperCase()}function q(a){-1!==a.indexOf("-")&&(a=a.replace(c,n));if(a in t)return t[a];if(!u||a in u)t[a]={propertyName:a,propertyNamePrefix:""};else{for(var b=a.charAt(0).toUpperCase()+a.slice(1),d,e=0;e<p;e++){var f=g[e];d=f+b;d in u&&(t[a]={propertyName:d,propertyNamePrefix:f})}t[a]=t[a]||null}return t[a]}function d(a){if(J[a])return J[a];var b=q(a);return b&&b.propertyName||a}function e(a,b,c){var d={},e=a.style,
f;for(f in b)d[f]=e[f],e[f]=b[f];c.call(a);for(f in b)e[f]=d[f]}function j(a,b,e){var f,h,g;if(!(3===a.nodeType||8===a.nodeType||!(f=a.style)))if(b=b.replace(c,n),g=I[b],b=d(b),void 0!==e){null===e||e===H?e=H:!isNaN(Number(e))&&!v[b]&&(e+=L);g&&g.set&&(e=g.set(a,e));if(void 0!==e){try{f[b]=e}catch(i){}e===H&&f.removeAttribute&&f.removeAttribute(b)}f.cssText||a.removeAttribute("style")}else{if(!g||!("get"in g&&void 0!==(h=g.get(a,!1))))h=f[b];return void 0===h?"":h}}function h(a){var b,c=arguments;
0!==a.offsetWidth?b=l.apply(void 0,c):e(a,C,function(){b=l.apply(void 0,c)});return b}function f(b,c,e,d){var f=0,h,g,i;for(g=0;g<c.length;g++)if(h=c[g])for(i=0;i<e.length;i++)f+=parseFloat(a._getComputedStyle(b,"border"===h?h+e[i]+"Width":h+e[i],d))||0;return f}function k(a){var b=a.ownerDocument,c;b.defaultView&&(c=b.defaultView.getComputedStyle(a,null));return c}function l(c,e,d){if(b.isWindow(c))return e===w?a.viewportWidth(c):a.viewportHeight(c);if(9===c.nodeType)return e===w?a.docWidth(c):a.docHeight(c);
var h=e===w?["Left","Right"]:["Top","Bottom"],g=e===w?c.offsetWidth:c.offsetHeight,i=k(c),r="border-box"===a._getComputedStyle(c,"boxSizing",i),j=0;if(null==g||0>=g){g=void 0;j=a._getComputedStyle(c,e,i);if(null==j||0>Number(j))j=c.style[e]||0;j=parseFloat(j)||0}void 0===d&&(d=r?D:A);e=void 0!==g||r;g=g||j;return d===A?e?g-f(c,["border","padding"],h,i):j:e?g+(d===D?0:d===F?-f(c,["border"],h,i):f(c,["margin"],h,i)):j+f(c,z.slice(d),h,i)}var c=/-([a-z])/ig,b=i,a=m("./api"),s=i.Env.host,t={},g=["Webkit",
"Moz","O","ms"],p=g.length,o=s.document||{},u=(o&&o.documentElement).style;m("ua");var z=["margin","border","padding"],A=-1,F=2,D=1,G=a.nodeName,x=/^margin/,w="width",r="display"+b.now(),v={fillOpacity:1,fontWeight:1,lineHeight:1,opacity:1,orphans:1,widows:1,zIndex:1,zoom:1},H="",L="px",M=/\d(?!px)[a-z%]+$/i,I={},J={},y={},B=q("userSelect"),E=B&&B.propertyName;J["float"]="cssFloat";b.mix(a,{_cssHooks:I,_cssProps:J,_getComputedStyle:function(b,c,e){var f="",h,g;h=b.ownerDocument;c=d(c);if(e=e||h.defaultView.getComputedStyle(b,
null))f=e.getPropertyValue(c)||e[c];""===f&&!a.contains(h,b)&&(f=b.style[c]);a._RE_NUM_NO_PX.test(f)&&x.test(c)&&(g=b.style,b=g.width,c=g.minWidth,h=g.maxWidth,g.minWidth=g.maxWidth=g.width=f,f=e.width,g.width=b,g.minWidth=c,g.maxWidth=h);return f},style:function(c,e,d){var c=a.query(c),f,h=c[0];if(b.isPlainObject(e))for(f in e)for(h=c.length-1;0<=h;h--)j(c[h],f,e[f]);else{if(void 0===d)return f="",h&&(f=j(h,e,d)),f;for(h=c.length-1;0<=h;h--)j(c[h],e,d)}},css:function(e,d,f){var e=a.query(e),h=e[0],
g;if(b.isPlainObject(d))for(g in d)for(h=e.length-1;0<=h;h--)j(e[h],g,d[g]);else{d=d.replace(c,n);g=I[d];if(void 0===f){f="";if(h&&(!g||!("get"in g&&void 0!==(f=g.get(h,!0)))))f=a._getComputedStyle(h,d);return"undefined"===typeof f?"":f}for(h=e.length-1;0<=h;h--)j(e[h],d,f)}},show:function(b){var b=a.query(b),c,e,d;for(d=b.length-1;0<=d;d--)if(e=b[d],e.style.display=a.data(e,r)||H,"none"===a.css(e,"display")){c=e.tagName.toLowerCase();var f=void 0,h=y[c],g=void 0;y[c]||(f=o.body||o.documentElement,
g=o.createElement(c),a.prepend(g,f),h=a.css(g,"display"),f.removeChild(g),y[c]=h);c=h;a.data(e,r,c);e.style.display=c}},hide:function(b){var b=a.query(b),c,e;for(e=b.length-1;0<=e;e--){c=b[e];var d=c.style,f=d.display;"none"!==f&&(f&&a.data(c,r,f),d.display="none")}},toggle:function(b){var b=a.query(b),c,e;for(e=b.length-1;0<=e;e--)c=b[e],"none"===a.css(c,"display")?a.show(c):a.hide(c)},addStyleSheet:function(b,c,e){"string"===typeof b&&(e=c,c=b,b=s);var b=a.getDocument(b),d;if(e&&(e=e.replace("#",
H)))d=a.get("#"+e,b);d||(d=a.create("<style>",{id:e},b),a.get("head",b).appendChild(d),d.styleSheet?d.styleSheet.cssText=c:d.appendChild(b.createTextNode(c)))},unselectable:!E?function(c){var c=a.query(c),e,d,f=0,h,g;for(d=c.length-1;0<=d;d--){e=c[d];g=e.getElementsByTagName("*");e.setAttribute("unselectable","on");for(h=["iframe","textarea","input","select"];e=g[f++];)b.inArray(G(e),h)||e.setAttribute("unselectable","on")}}:function(b){for(var b=a.query(b),c=b.length-1;0<=c;c--)b[c].style[E]="none"},
innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0,width:0,height:0});b.each([w,"height"],function(c){a["inner"+b.ucfirst(c)]=function(b){return(b=a.get(b))&&h(b,c,F)};a["outer"+b.ucfirst(c)]=function(b,e){var d=a.get(b);return d&&h(d,c,e?0:D)};var e=c===w?["Left","Right"]:["Top","Bottom"];a[c]=function(b,d){var g=a.get(b);if(void 0!==d){if(g){var i=k(g);"border-box"===a._getComputedStyle(g,"boxSizing",i)&&(d+=f(g,["padding","border"],e,i));return a.css(g,c,d)}}else return g&&h(g,c,A)};I[c]={get:function(b,
a){var e;a&&(e=h(b,c)+"px");return e}}});var C={position:"absolute",visibility:"hidden",display:"block"};b.each(["left","top"],function(b){I[b]={get:function(c,e){var d,f,h;if(e){h=a.css(c,"position");if("static"===h)return"auto";d=a._getComputedStyle(c,b);if((f="auto"===d)&&"relative"===h)return"0px";if(f||M.test(d)){h={top:0,left:0};if("fixed"===a.css(c,"position"))f=c.getBoundingClientRect();else{for(d=c.offsetParent||(c.ownerDocument||o).body;d&&!N.test(d.nodeName)&&"static"===a.css(d,"position");)d=
d.offsetParent;f=a.offset(c);h=a.offset(d);h.top+=parseFloat(a.css(d,"borderTopWidth"))||0;h.left+=parseFloat(a.css(d,"borderLeftWidth"))||0}f.top-=parseFloat(a.css(c,"marginTop"))||0;f.left-=parseFloat(a.css(c,"marginLeft"))||0;d={top:f.top-h.top,left:f.left-h.left}[b]+"px"}}return d}}});var N=/^(?:body|html)$/i;return a});
KISSY.add("dom/base/selector",["./api"],function(i,m){function n(b){var a=this.length,c;for(c=0;c<a&&!1!==b(this[c],c);c++);}function q(b){b=b.substr(1);if(!b)throw Error("An invalid or illegal string was specified for selector.");return b}function d(a){return function(e){var d=c._getElementById(a,b);return d&&c._contains(e,d)?[d]:[]}}function e(b){return function(a){return a.getElementsByClassName(b)}}function j(b){return function(a){return a.getElementsByTagName(b)}}function h(a,f){var k,l,m="string"===
typeof a,s=void 0!==f?h(f):(l=1)&&[b],u=s.length;if(a)if(m){a=w(a);if(l)if("body"===a)k=[b.body];else if(A.test(a)&&t)k=p(b.getElementsByClassName(RegExp.$1));else if(G.test(a))k=(l=c._getElementById(RegExp.$2,b))&&l.nodeName.toLowerCase()===RegExp.$1?[l]:[];else if(F.test(a))k=(l=c._getElementById(a.substr(1),b))?[l]:[];else if(D.test(a))k=p(b.getElementsByTagName(a));else if(!a.match(/,|\+|=|~|\[|\]|:|>|\||\$|\^|\*|\(|\)|[\w-]+\.[\w-]+|[\w-]+#[\w-]+/)&&t){k=a.split(/\s+/);var y=s,B,E;l=0;for(m=
k.length;l<m;l++){B=k;E=l;var C;C=k[l];var x=C.charAt(0);C="#"===x?d(q(C)):"."===x?e(q(C)):j(C);B[E]=C}l=0;for(m=k.length;l<m;l++){C=k[l];var x=[],K;B=0;for(E=y.length;B<E;B++)K=C(y[B]),x.push.apply(x,p(K));y=x;if(!y.length)break}k=y&&1<y.length?c.unique(y):y}if(!k){k=[];for(l=0;l<u;l++)z.apply(k,c._selectInternal(a,s[l]));1<k.length&&1<u&&c.unique(k)}}else{if(k=a.nodeType||i.isWindow(a)?[a]:a.getDOMNodes?a.getDOMNodes():g(a)?a:o(a)?p(a):[a],!l){m=k;B=m.length;k=[];for(l=0;l<B;l++)for(y=0;y<u;y++)if(c._contains(s[y],
m[l])){k.push(m[l]);break}}}else k=[];k.each=n;return k}function f(b,a){var c=b&&k(b,"class");return c&&(c=c.replace(/[\r\t\n]/g,u))&&-1<(u+c+u).indexOf(u+a+u)}function k(b,a){var c=b&&b.getAttributeNode(a);if(c&&c.specified)return c.nodeValue}function l(b,a){return"*"===a||b.nodeName.toLowerCase()===a.toLowerCase()}var c=m("./api"),b=i.Env.host.document,a=b.documentElement,s=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector,t="getElementsByClassName"in
b,g=i.isArray,p=i.makeArray,o=c.isDomNodeList,u=" ",z=Array.prototype.push,A=/^\.([\w-]+)$/,F=/^#([\w-]+)$/,D=/^([\w-])+$/,G=/^([\w-]+)#([\w-]+)$/,x=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/,w=i.trim;i.mix(c,{_compareNodeOrder:function(b,a){return!b.compareDocumentPosition||!a.compareDocumentPosition?b.compareDocumentPosition?-1:1:b.compareDocumentPosition(a)&4?-1:1},_getElementsByTagName:function(b,a){return p(a.querySelectorAll(b))},_getElementById:function(b,a){return a.getElementById(b)},
_getSimpleAttr:k,_isTag:l,_hasSingleClass:f,_matchesInternal:function(b,a){for(var c=[],e=0,d,f=a.length;e<f;e++)d=a[e],s.call(d,b)&&c.push(d);return c},_selectInternal:function(b,a){return p(a.querySelectorAll(b))},query:h,get:function(b,a){return h(b,a)[0]||null},unique:function(){function b(e,d){return e===d?(a=!0,0):c._compareNodeOrder(e,d)}var a,e=!0;[0,0].sort(function(){e=!1;return 0});return function(c){a=e;c.sort(b);if(a)for(var d=1,f=c.length;d<f;)c[d]===c[d-1]?(c.splice(d,1),--f):d++;return c}}(),
filter:function(b,a,e){var b=h(b,e),d,g,j,m,e=[];if("string"===typeof a&&(a=w(a))&&(j=x.exec(a)))d=j[1],g=j[2],m=j[3],d?d&&!g&&!m&&(a=function(a){return k(a,"id")===d}):a=function(a){var b=!0,c=!0;g&&(b=l(a,g));m&&(c=f(a,m));return c&&b};return e="function"===typeof a?i.filter(b,a):c._matchesInternal(a,b)},test:function(a,b,e){a=h(a,e);return a.length&&c.filter(a,b,e).length===a.length}});return c});
KISSY.add("dom/base/traversal",["./api"],function(i,m){function n(d,f,k,l,c,b,a){if(!(d=e.get(d)))return null;if(0===f)return d;b||(d=d[k]);if(!d)return null;c=c&&e.get(c)||null;void 0===f&&(f=1);var b=[],m=i.isArray(f),n,g;"number"===typeof f&&(n=0,g=f,f=function(){return++n===g});for(;d&&d!==c;){if((d.nodeType===j.ELEMENT_NODE||d.nodeType===j.TEXT_NODE&&a)&&q(d,f)&&(!l||l(d)))if(b.push(d),!m)break;d=d[k]}return m?b:b[0]||null}function q(d,f){if(!f)return!0;if(i.isArray(f)){var k,j=f.length;if(!j)return!0;
for(k=0;k<j;k++)if(e.test(d,f[k]))return!0}else if(e.test(d,f))return!0;return!1}function d(d,f,k,l){var c=[],b,a;if((b=d=e.get(d))&&k)b=d.parentNode;if(b){k=i.makeArray(b.childNodes);for(b=0;b<k.length;b++)a=k[b],(l||a.nodeType===j.ELEMENT_NODE)&&a!==d&&c.push(a);f&&(c=e.filter(c,f))}return c}var e=m("./api"),j=e.NodeType;i.mix(e,{_contains:function(d,e){return!!(d.compareDocumentPosition(e)&16)},closest:function(d,e,i,l){return n(d,e,"parentNode",function(c){return c.nodeType!==j.DOCUMENT_FRAGMENT_NODE},
i,!0,l)},parent:function(d,e,i){return n(d,e,"parentNode",function(d){return d.nodeType!==j.DOCUMENT_FRAGMENT_NODE},i,void 0)},first:function(d,f,i){d=e.get(d);return n(d&&d.firstChild,f,"nextSibling",void 0,void 0,!0,i)},last:function(d,f,i){d=e.get(d);return n(d&&d.lastChild,f,"previousSibling",void 0,void 0,!0,i)},next:function(d,e,i){return n(d,e,"nextSibling",void 0,void 0,void 0,i)},prev:function(d,e,i){return n(d,e,"previousSibling",void 0,void 0,void 0,i)},siblings:function(e,f,i){return d(e,
f,!0,i)},children:function(e,f){return d(e,f,void 0)},contents:function(e,f){return d(e,f,void 0,1)},contains:function(d,f){d=e.get(d);f=e.get(f);return d&&f?e._contains(d,f):!1},index:function(d,f){var k=e.query(d),l,c=0;l=k[0];if(!f){k=l&&l.parentNode;if(!k)return-1;for(;l=l.previousSibling;)l.nodeType===j.ELEMENT_NODE&&c++;return c}c=e.query(f);return"string"===typeof f?i.indexOf(l,c):i.indexOf(c[0],k)},equals:function(d,f){d=e.query(d);f=e.query(f);if(d.length!==f.length)return!1;for(var i=d.length;0<=
i;i--)if(d[i]!==f[i])return!1;return!0}});return e});KISSY.add("dom/base","./base/api,./base/attr,./base/class,./base/create,./base/data,./base/insertion,./base/offset,./base/style,./base/selector,./base/traversal".split(","),function(i,m){var n=m("./base/api");m("./base/attr");m("./base/class");m("./base/create");m("./base/data");m("./base/insertion");m("./base/offset");m("./base/style");m("./base/selector");m("./base/traversal");i.mix(i,{DOM:n,get:n.get,query:n.query});return n});