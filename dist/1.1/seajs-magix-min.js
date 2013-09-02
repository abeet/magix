define("magix/magix",function(){var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=?([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c=0,f="/",s="vframe",u=function(){},v={tagName:s,rootId:"magix_vf_root",execError:u},h={}.hasOwnProperty,d=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=y.isObject(t)?g(e,t):m(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},l=function(e){var t=this;t.c=[],t.x=e||20,t.b=t.x+5},p=function(e){return new l(e)},m=function(e,t){return e?h.call(e,t):e},g=function(e,t,n){for(var r in t)n&&m(n,r)||(e[r]=t[r]);return e};g(l.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,m(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=c++,t=t.v)),t},set:function(e,t){var n=this,r=n.c;e=a+e;var i=r[e];if(!m(r,e)){if(r.length>=n.b){r.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=n.b-n.x;o--;)i=r.pop(),delete r[i.k]}i={},r.push(i),r[e]=i}return i.k=e,i.v=t,i.f=1,i.t=c++,i},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e])},has:function(e){return e=a+e,m(this.c,e)}});var x=p(60),w=p(),b=function(e,t,n,r,i,a){for(y.isArray(e)||(e=[e]),t&&(y.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=y.isFunction(a)&&a.apply(n,t)}catch(o){v.execError(o)}return i},y={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:m,safeExec:b,noop:u,config:d(v),start:function(e){var t=this;g(v,e),t.libRequire(v.iniFile,function(n){v=g(v,n,e),v.tagNameChanged=v.tagName!=s;var r=v.progress;t.libRequire(["magix/router","magix/vom"],function(e,n){e.on("!ul",n.locChged),e.on("changed",n.locChged),r&&n.on("progress",r),t.libRequire(v.extensions,e.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)m(e,n)&&t.push(n);return t},local:d({}),path:function(i,a){var c=i+"\n"+a,s=w.get(c);if(!s){if(o.test(a))s=a;else if(i=i.replace(n,r).replace(t,r)+f,a.charAt(0)==f){var u=o.test(i)?8:0,v=i.indexOf(f,u);s=i.substring(0,v)+a}else s=i+a;for(;e.test(s);)s=s.replace(e,"$1/");w.set(c,s)}return s},pathToObject:function(e,t){var c=x.get(e);if(!c){c={};var s={},u=r;n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e);var v=e.replace(u,r);if(u&&o.test(u)){var h=u.indexOf(f,8);u=-1==h?f:u.substring(h)}v.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}s[n]=r}),c[a]=u,c.params=s,x.set(e,c)}return c},objectToPath:function(e,t){var n,r=e[a],i=[],o=e.params;for(var c in o)n=o[c],t&&encodeURIComponent(n),i.push(c+"="+n);return i.length&&(r=r+"?"+i.join("&")),r},listToMap:function(e,t){var n,r,i,a={};if(y.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:p},C=Object.prototype.toString;return g(y,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==C.call(e)},isString:function(e){return"[object String]"==C.call(e)},isNumber:function(e){return"[object Number]"==C.call(e)},isRegExp:function(e){return"[object RegExp]"==C.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype,t.prototype.constructor=t;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,y.mix(e.prototype,n),y.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,n,r,i,a,o=e("magix/magix"),c=e("magix/event"),f=window,s="",u="pathname",v=o.has,h=o.mix,d=document,l=/^UTF-8$/i.test(d.charset||d.characterSet||"UTF-8"),p=o.config(),m=o.cache(),g=o.cache(),x=/#.*$/,w=/^[^#]*#?!?/,b="params",y=p.nativeHistory,C=function(e,t,n){if(e){n=this[b],o.isArray(e)||(e=e.split(","));for(var r=0;e.length>r&&!(t=v(n,e[r]));r++);}return t},E=function(){return v(this,u)},V=function(){return v(this,"view")},M=function(){var e=this,t=e.hash,n=e.query;return t[u]!=n[u]},j=function(e){var t=this,n=t.hash,r=t.query;return n[b][e]!=r[b][e]},T=function(e){var t=this,n=t.hash;return v(n[b],e)},I=function(e){var t=this,n=t.query;return v(n[b],e)},$=function(e){var t=this,n=t[b];return n[e]},k=function(e){var t=o.pathToObject(e,l),n=t[u];return n&&a&&(t[u]=o.path(f.location[u],n)),t},O=h({getView:function(e,t){if(!r){r={rs:p.routes||{},nf:p.notFoundView};var n=p.defaultView;if(!n)throw Error("unset defaultView");r.home=n;var i=p.defaultPathname||s;r.rs[i]=n,r[u]=i}var a;e||(e=r[u]);var c=r.rs;return a=o.isFunction(c)?c.call(p,e,t):c[e],{view:a?a:r.nf||r.home,pathname:a||y?e:r.nf?e:r[u]}},start:function(){var e=O,t=f.history;i=y&&t.pushState,a=y&&!i,i?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||f.location.href;var n=O,r=m.get(e);if(!r){var i=e.replace(x,s),a=e.replace(w,s),o=k(i),c=k(a),v={};h(v,o[b]),h(v,c[b]),r={pathnameDiff:M,paramDiff:j,hashOwn:T,queryOwn:I,get:$,href:e,srcQuery:i,srcHash:a,query:o,hash:c,params:v},m.set(e,r)}if(t&&!r.view){var d;d=y?r.hash[u]||r.query[u]:r.hash[u];var l=n.getView(d,r);h(r,l)}return r},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=g.get(i);if(a||(i=r+"\n"+i,a=g.get(i)),!a){var o,c,f;a={params:{}},c=e[u],f=t[u],c!=f&&(a[u]={from:c,to:f},o=1),c=e.view,f=t.view,c!=f&&(a.view={from:c,to:f},o=1);var s,v=e[b],h=t[b];for(s in v)c=v[s],f=h[s],v[s]!=h[s]&&(o=1,a[b][s]={from:c,to:f});for(s in h)c=v[s],f=h[s],v[s]!=h[s]&&(o=1,a[b][s]={from:c,to:f});a.occur=o,a.isParam=C,a.isPathname=E,a.isView=V,g.set(i,a)}return a},route:function(){var e=O,r=e.parseQH(0,1),i=n||{params:{},href:"~"},a=!n;n=r;var o=e.getChged(i,r);o.occur&&(t=r,e.fire("changed",{location:r,changed:o,force:a}))},navigate:function(e,n,r){var c=O;if(!n&&o.isObject(e)&&(n=e,e=s),n&&(e=o.objectToPath({params:n,pathname:e},l)),e){var f=k(e),d={};if(d[b]=h({},f[b]),d[u]=f[u],d[u]){if(a){var p=t.query;if(p&&(p=p[b]))for(var m in p)v(p,m)&&!v(d[b],m)&&(d[b][m]=s)}}else{var g=h({},t[b]);d[b]=h(g,d[b]),d[u]=t[u]}var x,w=o.objectToPath(d);x=i?w!=t.srcQuery:w!=t.srcHash,x&&(i?(c.poped=1,history[r?"replaceState":"pushState"](null,null,w),c.route()):(h(d,t,d),d.srcHash=w,d.hash={params:d[b],pathname:d[u]},c.fire("!ul",{loc:t=d}),w="#!"+w,r?location.replace(w):location.hash=w))}}},c);return O.useState=function(){var e=O,t=location.href;f.addEventListener("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},O.useHash=function(){f.addEventListener("hashchange",O.route,!1)},O}),define("magix/body",["magix/magix"],function(e){var t,n=e("magix/magix"),r=n.has,i=n.listToMap(""),a=document.body,o={},c=String.fromCharCode(26),f="mx-owner",s="mx-ie",u={},v=65536,h=function(e){return e.id||(e.id="mx-e-"+v--)},d=function(e,t,n){return n?e.setAttribute(t,n):n=e.getAttribute(t),n},l={process:function(e){for(var n=e.target||e.srcElement;n&&1!=n.nodeType;)n=n.parentNode;var i=n,o=e.type,v=u[o]||(u[o]=RegExp("(?:^|,)"+o+"(?:,|$)"));if(!v.test(d(n,s))){for(var l,p,m="mx-"+o,g=[];i&&i!=a&&(l=d(i,m),p=d(i,s),!l&&!v.test(p));)g.push(i),i=i.parentNode;if(l){var x,w=l.indexOf(c);w>-1&&(x=l.slice(0,w),l=l.slice(w));var b=d(i,f)||x;if(!b)for(var y=i,C=t.all();y&&y!=a;){if(r(C,y.id)){d(i,f,b=y.id);break}y=y.parentNode}if(!b)throw Error("miss "+f+":"+l);var E=t.get(b),V=E&&E.view;V&&V.processEvent({info:l,se:e,st:o,tId:h(n),cId:h(i)})}else for(var M;g.length;)M=g.shift(),p=d(M,s),v.test(p)||(p=p?p+","+o:o,d(M,s,p))}},on:function(e,n){var r=this;if(o[e])o[e]++;else{t=n,o[e]=1;var c=i[e];c?r.unbubble(0,a,e):a["on"+e]=function(e){e=e||window.event,e&&r.process(e)}}},un:function(e){var t=this,n=o[e];if(n>0){if(n--,!n){var r=i[e];r?t.unbubble(1,a,e):a["on"+e]=null}o[e]=n}}};return l.unbubble=function(e,t,n){var r=e?"undelegate":"delegate";$(t)[r]("[mx-"+n+"]",n,l.process)},l}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),c=this,f=c[o];if(f){t||(t={}),t.type||(t.type=e);for(var s,u,v=f.length,h=v-1;v--;)s=a?v:h-v,u=f[s],(u.d||u.r)&&(f.splice(s,1),h--),u.d||r(u.f,t,c)}i&&delete c[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,n,r,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),c=document,f=65536,s=i.safeExec,u=[].slice,v=i.mix,h=i.config("tagName"),d=i.config("rootId"),l=!i.config("tagNameChanged"),p=i.has,m="mx-view",g=l?"mx-defer":"mx-vframe",x="alter",w="created",b=function(e){return"object"==typeof e?e:c.getElementById(e)},y=function(e,t,n){return n=b(e),n?n.getElementsByTagName(t):[]},C=function(e){return c.createElement(e)},E=function(e){return e.id||(e.id="magix_vf_"+f--)},V=function(e,t,n){if(e=b(e),t=b(t),e&&t)if(e!==t)try{n=t.contains?t.contains(e):16&t.compareDocumentPosition(e)}catch(r){n=0}else n=1;return n},M=/<script[^>]*>[\s\S]*?<\/script>/gi,j=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return v(j,{root:function(e,n){if(!t){r=n;var i=b(d);i||(i=C(h),i.id=d,c.body.insertBefore(i,c.body.firstChild)),t=new j(d),e.add(t)}return t}}),v(v(j.prototype,a),{mountView:function(e,t,n){var a=this,c=b(a.id);if(c._bak?c._chgd=1:(c._bak=1,c._tmpl=c.innerHTML.replace(M,"")),a.unmountView(),e){var f=i.pathToObject(e),u=f.pathname,h=--a.sign;i.libRequire(u,function(e){if(h==a.sign){var i=a.owner;o.prepare(e);var d=new e({owner:a,id:a.id,$:b,path:u,vom:i,location:r});a.view=d,d.on("interact",function(e){e.tmpl||(c._chgd&&(c.innerHTML=c._tmpl),a.mountZoneVframes(0,0,1)),d.on("rendered",function(){a.mountZoneVframes(0,0,1)}),d.on("prerender",function(){a.unmountZoneVframes(0,1)||a.cAlter()}),d.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:d}),n&&s(n,d,a)})},0),t=t||{},d.load(v(t,f.params,t))}})}},unmountView:function(){var e=this;if(e.view){n||(n={}),e.unmountZoneVframes(0,1),e.cAlter(n),e.view.destroy();var t=b(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,n=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,n){var r=this,i=r.owner,a=i.get(e);return a||(a=new j(e),a.pId=r.id,p(r.cM,e)||r.cC++,r.cM[e]=1,i.add(a)),a.mountView(t,n),a},mountZoneVframes:function(e,t){var n=this,r=e||n.id;n.unmountZoneVframes(r,1);var i=y(r,h),a=i.length,o={};if(a)for(var c,f,s,u,v=0;a>v;v++)if(c=i[v],f=E(c),!p(o,f)&&(s=c.getAttribute(m),u=!c.getAttribute(g),u=u==l,u||s)){n.mountVframe(f,s,t);for(var d,x=y(c,h),w=0,b=x.length;b>w;w++)d=x[w],s=d.getAttribute(m),u=!d.getAttribute(g),u=u==l,u||s||(o[E(d)]=1)}n.cCreated()},unmountVframe:function(e,t){var n=this;e=e||n.id;var r=n.owner,i=r.get(e);if(i){var a=i.fcc;i.unmountView(),r.remove(e,a),n.fire("destroy");var o=r.get(i.pId);o&&p(o.cM,e)&&(delete o.cM[e],o.cC--,t||o.cCreated())}},unmountZoneVframes:function(e,t){var n,r,i,a=this;if(e){var o=a.cM,c={};for(i in o)V(i,e)&&(c[i]=1);n=c}else n=a.cM;for(i in n)r=1,a.unmountVframe(i,1);return t||a.cCreated(),r},invokeView:function(e){var t,n=this,r=n.view,i=u.call(arguments,1);return n.viewInited&&r[e]&&(t=s(r[e],i,r)),t},cCreated:function(e){var t=this;if(t.cC==t.rC){var n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(w,e),t.fire(w,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!p(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.cCreated(e))}},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(x,e),t.fire(x,e));var i=t.owner,a=i.get(t.pId);a&&p(a.rM,r)&&(a.rC--,delete a.rM[r],a.cAlter(e))}},locChged:function(e,t){var n=this,r=n.view;if(r&&r.sign&&r.rendered){var a=r.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&s(r.locationChange,o,r);for(var c,f=o.cs||i.keys(n.cM),u=0,v=f.length,h=n.owner;v>u;u++)c=h.get(f[u]),c&&c.locChged(e,t)}}}),j}),define("magix/view",function(e){var t=e("magix/magix"),n=e("magix/event"),r=e("magix/body"),i=t.safeExec,a=t.has,o=",",c=[],f=t.noop,s=t.mix,u={render:1,renderUI:1},v="~",h=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},d=t.cache(40),l=/\smx-(?!view|defer|owner)[a-z]+\s*=\s*['"]/g,p=String.fromCharCode(26),m=function(){this.render()},g={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},x=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,w=/(\w+):([^,]+)/g,b=/([$\w]+)<([\w,]+)>/,y=function(e){var t=this;s(t,e),t.sign=1};y.prepare=function(e){var t=this,n=e.superclass;if(n&&t.prepare(n.constructor),!e[v]){e[v]=1,e.extend=t.extend;var r,i,c,s,d,l=e.prototype,m={};for(var g in l)if(a(l,g))if(r=l[g],i=g.match(b))for(c=i[1],s=i[2],s=s.split(o),d=s.length-1;d>-1;d--)i=s[d],m[i]=1,l[c+p+i]=r;else a(u,g)&&r!=f&&(l[g]=h(r));s&&(l.$evts=m)}},s(s(y.prototype,n),{render:f,locationChange:f,init:f,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,o=a(e,"template"),f=function(a){if(r==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,n,e),e.fire("inited",0,1),i(e.render,c,e);var f=!t&&!e.rendered;f&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(f):f()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(l,"$&"+this.id+p)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(o))),r.locationChange==f&&(r.locationChange=m)},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,r=e.se,a=d.get(n);a||(a=n.match(x),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(w,function(e,t,n){a.p[t]=n}),d.set(n,a));var o=a.n+p+r.type,c=t[o];if(c){var f=g[a.f];f&&f.call(g,r),i(c,s({currentId:e.cId,targetId:e.tId,type:e.st,domEvent:r,params:a.p},g),t)}}},delegateEvents:function(e){var t=this,n=t.$evts,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var C,E="?t="+Date.now(),V={},M={};return y.prototype.fetchTmpl=function(e){var t=this,n="template"in t;if(n)e(t.template);else if(a(V,t.path))e(V[t.path]);else{var r=t.path.indexOf("/");if(!C){var o=t.path.substring(0,r);C=seajs.data.paths[o]}var c=t.path.substring(r+1),f=C+c+".html",s=M[f],u=function(n){e(V[t.path]=n)};s?s.push(u):(s=M[f]=[u],$.ajax({url:f+E,success:function(e){i(s,e),delete M[f]},error:function(e,t){i(s,t),delete M[f]}}))}},y.extend=function(e,n,r){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&i(n,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,r)},y}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),n=e("magix/magix"),r=e("magix/event"),i=n.has,a=n.mix,o=0,c=0,f=0,s=0,u={},v={},h=n.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,e.owner=h,h.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e,t){var n=u[e];n&&(o--,t&&c--,delete u[e],h.fire("remove",{vframe:n}))},vfCreated:function(){if(!s){c++;var e=c/o;e>f&&h.fire("progress",{percent:f=e},s=1==e)}},root:function(){return t.root(h,v)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,a(v,n),!t){var r=h.root(),i=e.changed;i.isView()?r.mountView(n.view):r.locChged(n,i)}}},r);return h}),document.createElement("vframe");