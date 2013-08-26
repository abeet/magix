define("magix/magix",function(){[].slice;var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=?([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c={},f=0,s="/",u="vframe",v={iniFile:"app/ini",appName:"app",appHome:"./",tagName:u,rootId:"magix_vf_root"},p=c.hasOwnProperty,l=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=C.isObject(t)?g(e,t):d(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},h=function(e){var t=this;t.c=[],t.x=e||20,t.b=t.x+5},m=function(e){return new h(e)},d=function(e,t){return e?p.call(e,t):0},g=function(e,t,n){for(var r in t)n&&d(n,r)||(e[r]=t[r]);return e};g(h.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,d(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=f++,t=t.v)),t},set:function(e,t){var n=this,r=n.c;e=a+e;var i=r[e];if(!d(r,e)){if(r.length>=n.b){r.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=n.b-n.x;o--;)i=r.pop(),delete r[i.k]}i={},r.push(i),r[e]=i}return i.k=e,i.v=t,i.f=1,i.t=f++,i},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e])},has:function(e){return e=a+e,d(this.c,e)}});var x=m(60),w=m(),b=function(e,t,n,r,i,a){for(C.isArray(e)||(e=[e]),t&&(C.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=C.isFunction(a)&&a.apply(n,t)}catch(o){}return i},y=function(){},C={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:d,safeExec:b,noop:y,config:l(v),start:function(e){var t=this;e=g(v,e),t.libEnv(e),e.ready&&(b(e.ready),delete e.ready),t.libRequire(e.iniFile,function(n){v=g(e,n,e),v.tagNameChanged=v.tagName!=u;var r=e.progress;t.libRequire(["magix/router","magix/vom"],function(n,i){n.on("!ul",i.locChged),n.on("changed",i.locChged),r&&i.on("progress",r),t.libRequire(e.extensions,n.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)d(e,n)&&t.push(n);return t},local:l({}),path:function(i,a){var c=i+"\n"+a,f=w.get(c);if(!f){if(o.test(a))f=a;else if(i=i.replace(n,r).replace(t,r)+s,a.charAt(0)==s){var u=o.test(i)?8:0,v=i.indexOf(s,u);f=i.substring(0,v)+a}else f=i+a;for(;e.test(f);)f=f.replace(e,"$1/");w.set(c,f)}return f},pathToObject:function(e,t){var c=x.get(e);if(!c){c={};var f={},u=r;if(n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e),e=e.replace(u,r),u&&o.test(u)){var v=u.indexOf(s,8);u=-1==v?s:u.substring(v)}e.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}f[n]=r}),c[a]=u,c.params=f,x.set(e,c)}return c},objectToPath:function(e,t){var n,r=e[a],i=[],o=e.params;for(var c in o)n=o[c],t&&encodeURIComponent(n),i.push(c+"="+n);return i.length&&(r=r+"?"+i.join("&")),r},tmpl:function(e,t){return 1==arguments.length?{v:c[e],h:d(c,e)}:(c[e]=t,t)},listToMap:function(e,t){var n,r,i,a={};if(C.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:m},E=Object.prototype.toString;return g(C,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},libEnv:function(e){var t=this,n=e.appHome,i=location;i.protocol;var a=e.appName;n=t.path(i.href,n+s),e.appHome=n;var o=e.debug;o&&(o=0==n.indexOf(i.protocol+s+s+i.host+s));var c=r;c=o?Date.now():e.appTag,c&&(c+=".js");var f={};f[a]=n+a+"/",seajs.config({paths:f})},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==E.call(e)},isString:function(e){return"[object String]"==E.call(e)},isNumber:function(e){return"[object Number]"==E.call(e)},isRegExp:function(e){return"[object RegExp]"==E.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,C.mix(e.prototype,n),C.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,n,r,i,a,o=e("magix/magix"),c=e("magix/event"),f=window,s="",u="pathname",v=o.has,p=o.mix,l=document,h=/^UTF-8$/i.test(l.charset||l.characterSet||"UTF-8"),m=o.config(),d=o.cache(),g=o.cache(),x=/#.*$/,w=/^[^#]*#?!?/,b="params",y=m.nativeHistory,C=function(e,t,n){if(e){n=this[b],o.isArray(e)||(e=e.split(","));for(var r=0;e.length>r&&!(t=v(n,e[r]));r++);}return t},E=function(){return v(this,u)},V=function(){return v(this,"view")},M=function(){var e=this,t=e.hash,n=e.query;return t[u]!=n[u]},j=function(e){var t=this,n=t.hash,r=t.query;return n[b][e]!=r[b][e]},I=function(e){var t=this,n=t.hash;return v(n[b],e)},T=function(e){var t=this,n=t.query;return v(n[b],e)},k=function(e){var t=this,n=t[b];return n[e]},O=function(e){var t=o.pathToObject(e,h),n=t[u];return n&&a&&(t[u]=o.path(f.location[u],n)),t},H=p({getView:function(e){if(!r){r={rs:m.routes||{},nf:m.notFoundView};var t=m.defaultView;if(!t)throw Error("unset defaultView");r.home=t;var n=m.defaultPathname||s;r.rs[n]=t,r[u]=n}var i;e||(e=r[u]);var a=r.rs;return i=o.isFunction(a)?a.call(m,e):a[e],{view:i?i:r.nf||r.home,pathname:i||y?e:r.nf?e:r[u]}},start:function(){var e=H,t=f.history;i=y&&t.pushState,a=y&&!i,i?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||f.location.href;var n=H,r=d.get(e);if(!r){var i=e.replace(x,s),a=e.replace(w,s),o=O(i),c=O(a),v={};p(v,o[b]),p(v,c[b]),r={pathnameDiff:M,paramDiff:j,hashOwn:I,queryOwn:T,get:k,href:e,srcQuery:i,srcHash:a,query:o,hash:c,params:v},d.set(e,r)}if(t&&!r.view){var l;l=y?r.hash[u]||r.query[u]:r.hash[u];var h=n.getView(l);p(r,h)}return r},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=g.get(i);if(a||(i=r+"\n"+i,a=g.get(i)),!a){var o;a={params:{}},e[u]!=t[u]&&(a[u]=1,o=1),e.view!=t.view&&(a.view=1,o=1);var c,f=e[b],s=t[b];for(c in f)f[c]!=s[c]&&(o=1,a[b][c]=1);for(c in s)f[c]!=s[c]&&(o=1,a[b][c]=1);a.occur=o,a.isParam=C,a.isPathname=E,a.isView=V,g.set(i,a)}return a},route:function(){var e=H,r=e.parseQH(0,1),i=n||{params:{},href:"~"},a=!n;n=r;var o=e.getChged(i,r);o.occur&&(t=r,e.fire("changed",{location:r,changed:o,force:a}))},navigate:function(e,n,r){var c=H;if(!n&&o.isObject(e)&&(n=e,e=s),n&&(e=o.objectToPath({params:n,pathname:e},h)),e){var f=O(e),l={};if(l[b]=p({},f[b]),l[u]=f[u],l[u]){if(a){var m=t.query;if(m&&(m=m[b]))for(var d in m)v(m,d)&&!v(l[b],d)&&(l[b][d]=s)}}else{var g=p({},t[b]);l[b]=p(g,l[b]),l[u]=t[u]}var x,w=o.objectToPath(l);x=i?w!=t.srcQuery:w!=t.srcHash,x&&(i?(c.poped=1,history[r?"replaceState":"pushState"](null,null,w),c.route()):(p(l,t,l),l.srcHash=w,l.hash={params:l[b],pathname:l[u]},c.fire("!ul",{loc:t=l}),w="#!"+w,r?location.replace(w):location.hash=w))}}},c);return H.useState=function(){var e=H,t=location.href;$(f).on("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},H.useHash=function(){$(f).on("hashchange",H.route,!1)},H}),define("magix/body",["magix/magix"],function(e){var t,n=e("magix/magix"),r=n.has,i=n.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),a=document.body,o={},c="mx-owner",f="mx-ie",s={},u=65536,v=function(e){return e.id||(e.id="mx-e-"+u--)},p=function(e,t,n){return n?e.setAttribute(t,n):n=e.getAttribute(t),n},l={process:function(e){for(var n=e.target||e.srcElement;n&&1!=n.nodeType;)n=n.parentNode;var i=n,o=e.type,u=s[o]||(s[o]=RegExp("(?:^|,)"+o+"(?:,|$)"));if(!u.test(p(n,f))){for(var l,h,m="mx-"+o,d=[];i&&i!=a&&(l=p(i,m),h=p(i,f),!l&&!u.test(h));)d.push(i),i=i.parentNode;if(l){var g=p(i,c);if(!g)for(var x=i,w=t.all();x&&x!=a;){if(r(w,x.id)){p(i,c,g=x.id);break}x=x.parentNode}if(!g)throw Error("miss "+c+":"+l);var b=t.get(g),y=b&&b.view;y&&y.processEvent({info:l,se:e,tId:v(n),cId:v(i)})}else for(var C;d.length;)C=d.shift(),h=p(C,f),u.test(h)||(h=h?h+","+o:o,p(C,f,h))}},on:function(e,n){var r=this;if(o[e])o[e]++;else{t=n,o[e]=1;var c=i[e];c?r.unbubble(0,a,e):a["on"+e]=function(e){e=e||window.event,e&&r.process(e)}}},un:function(e){var t=this,n=o[e];if(n>0){if(n--,!n){var r=i[e];r?t.unbubble(1,a,e):a["on"+e]=null}o[e]=n}}};return l.unbubble=function(e,t,n){var r=e?"undelegate":"delegate";$(t)[r]("[mx-"+n+"]",n,l.process)},l}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),c=this,f=c[o];if(f){t||(t={}),t.type||(t.type=e);for(var s,u,v=f.length,p=v-1;v--;)s=a?v:p-v,u=f[s],(u.d||u.r)&&(f.splice(s,1),p--),u.d||r(u.f,t,c)}i&&delete c[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,n,r,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),c=document,f=65536,s=window,u=i.safeExec,v=[].slice,p=s.CollectGarbage||i.noop,l=i.mix,h=i.config("tagName"),m=i.config("rootId"),d=!i.config("tagNameChanged"),g=i.has,x="mx-view",w=d?"mx-defer":"mx-vframe",b="alter",y="created",C=function(e){return"object"==typeof e?e:c.getElementById(e)},E=function(e,t){return C(e).getElementsByTagName(t)},V=function(e){return c.createElement(e)},M=function(e){return e.id||(e.id="magix_vf_"+f--)},j=/<script[^>]*>[\s\S]*?<\/script>/gi,I=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return l(I,{root:function(e,n){if(!t){r=n;var i=C(m);i||(i=V(h),i.id=m,c.body.insertBefore(i,c.body.firstChild)),t=new I(m),e.add(t)}return t}}),l(l(I.prototype,a),{mountView:function(e,t,n){var a=this,c=C(a.id);if(c._bak?c._chgd=1:(c._bak=1,c._tmpl=c.innerHTML.replace(j,"")),a.unmountView(),e){var f=i.pathToObject(e),s=f.pathname,v=--a.sign;i.libRequire(s,function(e){if(v==a.sign){var i=a.owner;o.prepare(e);var p=new e({owner:a,id:a.id,$:C,path:s,vom:i,location:r});a.view=p,p.on("interact",function(e){e.tmpl||(c._chgd&&(c.innerHTML=c._tmpl),a.mountZoneVframes(0,0,1)),p.on("rendered",function(){a.mountZoneVframes(0,0,1)}),p.on("prerender",function(){a.unmountZoneVframes()||a.cAlter()}),p.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:p}),n&&u(n,p,a)})},0),t=t||{},p.load(l(t,f.params,t))}})}},unmountView:function(){var e=this;if(e.view){n||(n={}),e.unmountZoneVframes(),e.cAlter(n),e.view.destroy();var t=C(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,n=0,e.fire("viewUnmounted"),p()}e.sign--},mountVframe:function(e,t,n,r){var i=this,a=i.owner,o=a.get(e);return o||(o=new I(e),o.pId=i.id,g(i.cM,e)||i.cC++,i.cM[e]=r,a.add(o)),o.mountView(t,n),o},mountZoneVframes:function(e,t,n){var r=this,i=e||r.id;r.unmountZoneVframes(i);var a=E(i,h),o=a.length,c={};if(o)for(var f,s,u,v,p=0;o>p;p++)if(f=a[p],s=M(f),!g(c,s)&&(u=f.getAttribute(x),v=!f.getAttribute(w),v=v==d,v||u)){r.mountVframe(s,u,t,n);for(var l,m=E(f,h),b=0,y=m.length;y>b;b++)l=m[b],u=l.getAttribute(x),v=!l.getAttribute(w),v=v==d,v||u||(c[M(l)]=1)}r.cC==r.rC&&r.cCreated({})},unmountVframe:function(e){var t=this;e=e||t.id;var n=t.owner,r=n.get(e);if(r){var i=r.fcc;r.unmountView(),n.remove(e,i),t.fire("destroy");var a=n.get(r.pId);a&&g(a.cM,e)&&(delete a.cM[e],a.cC--)}},unmountZoneVframes:function(e){var t,n,r=this;if(e){t=E(e,h);for(var i,a={},o=r.cM,c=t.length-1;c>=0;c--)i=t[c].id,g(o,i)&&(a[i]=1);t=a}else t=r.cM;for(var f in t)n=!0,r.unmountVframe(f);return n},invokeView:function(e){var t,n=this,r=n.view,i=v.call(arguments,1);return n.viewInited&&r[e]&&(t=u(r[e],i,r)),t},cCreated:function(e){var t=this,n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(y,e),t.fire(y,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!g(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.rC==a.cC&&a.cCreated(e))},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(b,e),t.fire(b,e));var i=t.owner,a=i.get(t.pId);if(a&&g(a.rM,r)){var o=a.rM[r];a.rC--,delete a.rM[r],o&&a.cAlter(e)}}},locChged:function(e,t){var n=this,r=n.view;if(r&&r.sign&&r.rendered){var a=r.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&u(r.locationChange,o,r);for(var c,f=o.cs||i.keys(n.cM),s=0,v=f.length,p=n.owner;v>s;s++)c=p.get(f[s]),c&&c.locChged(e,t)}}}),I}),define("magix/view",["magix/magix","magix/event","magix/body"],function(e){var t=e("magix/magix"),n=e("magix/event"),r=e("magix/body"),i=t.safeExec,a=t.has,o=",",c=[],f=t.mix,s=["render","renderUI"],u="~",v=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},p=t.cache(40),l=window.CollectGarbage||t.noop,h=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,m=/\smx-owner\s*=/,d=/\smx-[^v][a-z]+\s*=/,g=function(e){return!m.test(e)&&d.test(e)?e+' mx-owner="'+g.t+'"':e},x={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},w=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,b=/(\w+):([^,]+)/g,y=function(e){var t=this;f(t,e),t.sign=1};f(y,{wrapUpdate:function(){var e=this;if(!e[u]){e[u]=1;for(var n,r,i=e.prototype,a=s.length-1;a>-1;a--)r=s[a],n=i[r],t.isFunction(n)&&n!=t.noop&&(i[r]=v(n))}}}),f(f(y.prototype,n),{render:t.noop,locationChange:t.noop,init:t.noop,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,o=a(e,"template"),f=function(a){if(r==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,n,e),e.fire("inited",0,1),i(e.render,c,e);var f=!t&&!e.rendered;f&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(f):f()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"),l())},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return g.t=this.id,(e+"").replace(h,g)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(o)))},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},parentView:function(){var e=this,t=e.vom,n=e.owner,r=t.get(n.pId),i=null;return r&&r.viewInited&&(i=r.view),i},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,r=e.se,a=p.get(n);a||(a=n.match(w),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(b,function(e,t,n){a.p[t]=n}),p.set(n,a));var o=t.events;if(o){var c=o[r.type],s=x[a.f];s&&s.call(x,r),s=c&&c[a.n],s&&i(s,f({view:t,currentId:e.cId,targetId:e.tId,domEvent:r,events:o,params:a.p},x),c)}}},delegateEvents:function(e){var t=this,n=t.events,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var C=t.config("appHome"),E=t.config("debug")?"?t="+Date.now():"",V=function(e,n,r){for(var i in n)t.isObject(n[i])?(a(e,i)||(e[i]={}),V(e[i],n[i],1)):r&&(e[i]=n[i])};return y.prototype.fetchTmpl=function(e){var n=this,r="template"in n;if(r)e(tmpl);else{var a=t.tmpl(n.path);if(a.h)e(a.v);else{var o=C+n.path+".html",c=V[o],f=function(r){e(t.tmpl(n.path,r))};c?c.push(f):(c=V[o]=[f],$.ajax({url:o+E,success:function(e){i(c,e),delete V[o]},error:function(e,t){i(c,t),delete V[o]}}))}}},y.extend=function(e,n,r){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&i(n,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,r)},y.prepare=function(e){var t=this;if(!e.wrapUpdate){e.wrapUpdate=t.wrapUpdate,e.extend=t.extend;for(var n,r=e.prototype,i=e.superclass;i;)n=i.constructor,V(r,n.prototype),i=n.superclass}e.wrapUpdate()},y}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),n=e("magix/magix"),r=e("magix/event"),i=n.has,a=n.mix,o=0,c=0,f=0,s=0,u={},v={},p=n.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,e.owner=p,p.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e,t){var n=u[e];n&&(o--,t&&c--,delete u[e],p.fire("remove",{vframe:n}))},vfCreated:function(){if(!s){c++;var e=c/o;e>f&&p.fire("progress",{percent:f=e},s=1==e)}},root:function(){return t.root(p,v)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,a(v,n),!t){var r=p.root(),i=e.changed;i.isView()?r.mountView(n.view):r.locChged(n,i)}}},r);return p}),function(e){document.createElement("vframe");var t=function(){};e.console||(e.console={log:t,info:t,warn:t});var n,r={};e.Magix||(e.Magix={config:function(e){for(var t in e)r[t]=e[t]},start:function(e){n=e||{}}},seajs.use("magix/magix",function(t){e.Magix=t,t.config(r),n&&t.start(n)}))}(this);