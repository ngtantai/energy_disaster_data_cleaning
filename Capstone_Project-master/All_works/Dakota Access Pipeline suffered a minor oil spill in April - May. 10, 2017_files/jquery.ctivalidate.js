/* qTip2 v2.2.0 viewport ie6 | qtip2.com | Licensed MIT, GPL | Sun Dec 15 2013 17:07:46 */

!function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)}(function(d){"use strict";function e(a,b,c,e){this.id=c,this.target=a,this.tooltip=B,this.elements={target:a},this._id=O+"-"+c,this.timers={img:{}},this.options=b,this.plugins={},this.cache={event:{},target:d(),disabled:A,attr:e,onTooltip:A,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=A}function f(a){return a===B||"object"!==d.type(a)}function g(a){return!(d.isFunction(a)||a&&a.attr||a.length||"object"===d.type(a)&&(a.jquery||a.then))}function h(a){var b,c,e,h;return f(a)?A:(f(a.metadata)&&(a.metadata={type:a.metadata}),"content"in a&&(b=a.content,f(b)||b.jquery||b.done?b=a.content={text:c=g(b)?A:b}:c=b.text,"ajax"in b&&(e=b.ajax,h=e&&e.once!==A,delete b.ajax,b.text=function(a,b){var f=c||d(this).attr(b.options.content.attr)||"Loading...",g=d.ajax(d.extend({},e,{context:b})).then(e.success,B,e.error).then(function(a){return a&&h&&b.set("content.text",a),a},function(a,c,d){b.destroyed||0===a.status||b.set("content.text",c+": "+d)});return h?f:(b.set("content.text",f),g)}),"title"in b&&(f(b.title)||(b.button=b.title.button,b.title=b.title.text),g(b.title||A)&&(b.title=A))),"position"in a&&f(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&f(a.show)&&(a.show=a.show.jquery?{target:a.show}:a.show===z?{ready:z}:{event:a.show}),"hide"in a&&f(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&f(a.style)&&(a.style={classes:a.style}),d.each(N,function(){this.sanitize&&this.sanitize(a)}),a)}function i(a,b){for(var c,d=0,e=a,f=b.split(".");e=e[f[d++]];)d<f.length&&(c=e);return[c||a,f.pop()]}function j(a,b){var c,d,e;for(c in this.checks)for(d in this.checks[c])(e=new RegExp(d,"i").exec(a))&&(b.push(e),("builtin"===c||this.plugins[c])&&this.checks[c][d].apply(this.plugins[c]||this,b))}function k(a){return R.concat("").join(a?"-"+a+" ":" ")}function l(c){return c&&{type:c.type,pageX:c.pageX,pageY:c.pageY,target:c.target,relatedTarget:c.relatedTarget,scrollX:c.scrollX||a.pageXOffset||b.body.scrollLeft||b.documentElement.scrollLeft,scrollY:c.scrollY||a.pageYOffset||b.body.scrollTop||b.documentElement.scrollTop}||{}}function m(a,b){return b>0?setTimeout(d.proxy(a,this),b):(a.call(this),void 0)}function n(a){return this.tooltip.hasClass(Y)?A:(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=m.call(this,function(){this.toggle(z,a)},this.options.show.delay),void 0)}function o(a){if(this.tooltip.hasClass(Y))return A;var b=d(a.relatedTarget),c=b.closest(S)[0]===this.tooltip[0],e=b[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==b[0]&&"mouse"===this.options.position.target&&c||this.options.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(c||e))try{a.preventDefault(),a.stopImmediatePropagation()}catch(f){}else this.timers.hide=m.call(this,function(){this.toggle(A,a)},this.options.hide.delay,this)}function p(a){return this.tooltip.hasClass(Y)||!this.options.hide.inactive?A:(clearTimeout(this.timers.inactive),this.timers.inactive=m.call(this,function(){this.hide(a)},this.options.hide.inactive),void 0)}function q(a){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(a)}function r(a,c,e){d(b.body).delegate(a,(c.split?c:c.join(db+" "))+db,function(){var a=u.api[d.attr(this,Q)];a&&!a.disabled&&e.apply(a,arguments)})}function s(a,c,f){var g,i,j,k,l,m=d(b.body),n=a[0]===b?m:a,o=a.metadata?a.metadata(f.metadata):B,p="html5"===f.metadata.type&&o?o[f.metadata.name]:B,q=a.data(f.metadata.name||"qtipopts");try{q="string"==typeof q?d.parseJSON(q):q}catch(r){}if(k=d.extend(z,{},u.defaults,f,"object"==typeof q?h(q):B,h(p||o)),i=k.position,k.id=c,"boolean"==typeof k.content.text){if(j=a.attr(k.content.attr),k.content.attr===A||!j)return A;k.content.text=j}if(i.container.length||(i.container=m),i.target===A&&(i.target=n),k.show.target===A&&(k.show.target=n),k.show.solo===z&&(k.show.solo=i.container.closest("body")),k.hide.target===A&&(k.hide.target=n),k.position.viewport===z&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new w(i.at,z),i.my=new w(i.my),a.data(O))if(k.overwrite)a.qtip("destroy",!0);else if(k.overwrite===A)return A;return a.attr(P,c),k.suppress&&(l=a.attr("title"))&&a.removeAttr("title").attr($,l).attr("title",""),g=new e(a,k,c,!!j),a.data(O,g),a.one("remove.qtip-"+c+" removeqtip.qtip-"+c,function(){var a;(a=d(this).data(O))&&a.destroy(!0)}),g}function t(a){this._ns="ie6",this.init(this.qtip=a)}var u,v,w,x,y,z=!0,A=!1,B=null,C="x",D="y",E="width",F="height",G="top",H="left",I="bottom",J="right",K="center",L="flipinvert",M="shift",N={},O="qtip",P="data-hasqtip",Q="data-qtip-id",R=["ui-widget","ui-tooltip"],S="."+O,T="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),U=O+"-fixed",V=O+"-default",W=O+"-focus",X=O+"-hover",Y=O+"-disabled",Z="_replacedByqTip",$="oldtitle",_={ie:function(){for(var a=3,c=b.createElement("div");(c.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c.getElementsByTagName("i")[0];);return a>4?a:0/0}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||A};v=e.prototype,v._when=function(a){return d.when.apply(d,a)},v.render=function(a){if(this.rendered||this.destroyed)return this;var b,c=this,e=this.options,f=this.cache,g=this.elements,h=e.content.text,i=e.content.title,j=e.content.button,k=e.position,l=("."+this._id+" ",[]);return d.attr(this.target[0],"aria-describedby",this._id),this.tooltip=g.tooltip=b=d("<div/>",{id:this._id,"class":[O,V,e.style.classes,O+"-pos-"+e.position.my.abbrev()].join(" "),width:e.style.width||"",height:e.style.height||"",tracking:"mouse"===k.target&&k.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":A,"aria-describedby":this._id+"-content","aria-hidden":z}).toggleClass(Y,this.disabled).attr(Q,this.id).data(O,this).appendTo(k.container).append(g.content=d("<div />",{"class":O+"-content",id:this._id+"-content","aria-atomic":z})),this.rendered=-1,this.positioning=z,i&&(this._createTitle(),d.isFunction(i)||l.push(this._updateTitle(i,A))),j&&this._createButton(),d.isFunction(h)||l.push(this._updateContent(h,A)),this.rendered=z,this._setWidget(),d.each(N,function(a){var b;"render"===this.initialize&&(b=this(c))&&(c.plugins[a]=b)}),this._unassignEvents(),this._assignEvents(),this._when(l).then(function(){c._trigger("render"),c.positioning=A,c.hiddenDuringWait||!e.show.ready&&!a||c.toggle(z,f.event,A),c.hiddenDuringWait=A}),u.api[this.id]=this,this},v.destroy=function(a){function b(){if(!this.destroyed){this.destroyed=z;var a=this.target,b=a.attr($);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),d.each(this.plugins,function(){this.destroy&&this.destroy()}),clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this._unassignEvents(),a.removeData(O).removeAttr(Q).removeAttr(P).removeAttr("aria-describedby"),this.options.suppress&&b&&a.attr("title",b).removeAttr($),this._unbind(a),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=B,delete u.api[this.id]}}return this.destroyed?this.target:(a===z&&"hide"!==this.triggering||!this.rendered?b.call(this):(this.tooltip.one("tooltiphidden",d.proxy(b,this)),!this.triggering&&this.hide()),this.target)},x=v.checks={builtin:{"^id$":function(a,b,c,e){var f=c===z?u.nextid:c,g=O+"-"+f;f!==A&&f.length>0&&!d("#"+g).length?(this._id=g,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):a[b]=e},"^prerender":function(a,b,c){c&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(a,b,c){this._updateContent(c)},"^content.attr$":function(a,b,c,d){this.options.content.text===this.target.attr(d)&&this._updateContent(this.target.attr(c))},"^content.title$":function(a,b,c){return c?(c&&!this.elements.title&&this._createTitle(),this._updateTitle(c),void 0):this._removeTitle()},"^content.button$":function(a,b,c){this._updateButton(c)},"^content.title.(text|button)$":function(a,b,c){this.set("content."+b,c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(a[b]=new w(c,"at"===b))},"^position.container$":function(a,b,c){this.rendered&&this.tooltip.appendTo(c)},"^show.ready$":function(a,b,c){c&&(!this.rendered&&this.render(z)||this.toggle(z))},"^style.classes$":function(a,b,c,d){this.rendered&&this.tooltip.removeClass(d).addClass(c)},"^style.(width|height)":function(a,b,c){this.rendered&&this.tooltip.css(b,c)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(a,b,c){this.rendered&&this.tooltip.toggleClass(V,!!c)},"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){this.rendered&&this.tooltip[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var a=this.options.position;this.tooltip.attr("tracking","mouse"===a.target&&a.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},v.get=function(a){if(this.destroyed)return this;var b=i(this.options,a.toLowerCase()),c=b[0][b[1]];return c.precedance?c.string():c};var ab=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,bb=/^prerender|show\.ready/i;v.set=function(a,b){if(this.destroyed)return this;{var c,e=this.rendered,f=A,g=this.options;this.checks}return"string"==typeof a?(c=a,a={},a[c]=b):a=d.extend({},a),d.each(a,function(b,c){if(e&&bb.test(b))return delete a[b],void 0;var h,j=i(g,b.toLowerCase());h=j[0][j[1]],j[0][j[1]]=c&&c.nodeType?d(c):c,f=ab.test(b)||f,a[b]=[j[0],j[1],c,h]}),h(g),this.positioning=z,d.each(a,d.proxy(j,this)),this.positioning=A,this.rendered&&this.tooltip[0].offsetWidth>0&&f&&this.reposition("mouse"===g.position.target?B:this.cache.event),this},v._update=function(a,b){var c=this,e=this.cache;return this.rendered&&a?(d.isFunction(a)&&(a=a.call(this.elements.target,e.event,this)||""),d.isFunction(a.then)?(e.waiting=z,a.then(function(a){return e.waiting=A,c._update(a,b)},B,function(a){return c._update(a,b)})):a===A||!a&&""!==a?A:(a.jquery&&a.length>0?b.empty().append(a.css({display:"block",visibility:"visible"})):b.html(a),this._waitForContent(b).then(function(a){a.images&&a.images.length&&c.rendered&&c.tooltip[0].offsetWidth>0&&c.reposition(e.event,!a.length)}))):A},v._waitForContent=function(a){var b=this.cache;return b.waiting=z,(d.fn.imagesLoaded?a.imagesLoaded():d.Deferred().resolve([])).done(function(){b.waiting=A}).promise()},v._updateContent=function(a,b){this._update(a,this.elements.content,b)},v._updateTitle=function(a,b){this._update(a,this.elements.title,b)===A&&this._removeTitle(A)},v._createTitle=function(){var a=this.elements,b=this._id+"-title";a.titlebar&&this._removeTitle(),a.titlebar=d("<div />",{"class":O+"-titlebar "+(this.options.style.widget?k("header"):"")}).append(a.title=d("<div />",{id:b,"class":O+"-title","aria-atomic":z})).insertBefore(a.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover","mouseover"===a.type)}),this.options.content.button&&this._createButton()},v._removeTitle=function(a){var b=this.elements;b.title&&(b.titlebar.remove(),b.titlebar=b.title=b.button=B,a!==A&&this.reposition())},v.reposition=function(c,e){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=z;var f,g,h=this.cache,i=this.tooltip,j=this.options.position,k=j.target,l=j.my,m=j.at,n=j.viewport,o=j.container,p=j.adjust,q=p.method.split(" "),r=i.outerWidth(A),s=i.outerHeight(A),t=0,u=0,v=i.css("position"),w={left:0,top:0},x=i[0].offsetWidth>0,y=c&&"scroll"===c.type,B=d(a),C=o[0].ownerDocument,D=this.mouse;if(d.isArray(k)&&2===k.length)m={x:H,y:G},w={left:k[0],top:k[1]};else if("mouse"===k)m={x:H,y:G},!D||!D.pageX||!p.mouse&&c&&c.pageX?c&&c.pageX||((!p.mouse||this.options.show.distance)&&h.origin&&h.origin.pageX?c=h.origin:(!c||c&&("resize"===c.type||"scroll"===c.type))&&(c=h.event)):c=D,"static"!==v&&(w=o.offset()),C.body.offsetWidth!==(a.innerWidth||C.documentElement.clientWidth)&&(g=d(b.body).offset()),w={left:c.pageX-w.left+(g&&g.left||0),top:c.pageY-w.top+(g&&g.top||0)},p.mouse&&y&&D&&(w.left-=(D.scrollX||0)-B.scrollLeft(),w.top-=(D.scrollY||0)-B.scrollTop());else{if("event"===k?c&&c.target&&"scroll"!==c.type&&"resize"!==c.type?h.target=d(c.target):c.target||(h.target=this.elements.target):"event"!==k&&(h.target=d(k.jquery?k:this.elements.target)),k=h.target,k=d(k).eq(0),0===k.length)return this;k[0]===b||k[0]===a?(t=_.iOS?a.innerWidth:k.width(),u=_.iOS?a.innerHeight:k.height(),k[0]===a&&(w={top:(n||k).scrollTop(),left:(n||k).scrollLeft()})):N.imagemap&&k.is("area")?f=N.imagemap(this,k,m,N.viewport?q:A):N.svg&&k&&k[0].ownerSVGElement?f=N.svg(this,k,m,N.viewport?q:A):(t=k.outerWidth(A),u=k.outerHeight(A),w=k.offset()),f&&(t=f.width,u=f.height,g=f.offset,w=f.position),w=this.reposition.offset(k,w,o),(_.iOS>3.1&&_.iOS<4.1||_.iOS>=4.3&&_.iOS<4.33||!_.iOS&&"fixed"===v)&&(w.left-=B.scrollLeft(),w.top-=B.scrollTop()),(!f||f&&f.adjustable!==A)&&(w.left+=m.x===J?t:m.x===K?t/2:0,w.top+=m.y===I?u:m.y===K?u/2:0)}return w.left+=p.x+(l.x===J?-r:l.x===K?-r/2:0),w.top+=p.y+(l.y===I?-s:l.y===K?-s/2:0),N.viewport?(w.adjusted=N.viewport(this,w,j,t,u,r,s),g&&w.adjusted.left&&(w.left+=g.left),g&&w.adjusted.top&&(w.top+=g.top)):w.adjusted={left:0,top:0},this._trigger("move",[w,n.elem||n],c)?(delete w.adjusted,e===A||!x||isNaN(w.left)||isNaN(w.top)||"mouse"===k||!d.isFunction(j.effect)?i.css(w):d.isFunction(j.effect)&&(j.effect.call(i,this,d.extend({},w)),i.queue(function(a){d(this).css({opacity:"",height:""}),_.ie&&this.style.removeAttribute("filter"),a()})),this.positioning=A,this):this},v.reposition.offset=function(a,c,e){function f(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}if(!e[0])return c;var g,h,i,j,k=d(a[0].ownerDocument),l=!!_.ie&&"CSS1Compat"!==b.compatMode,m=e[0];do"static"!==(h=d.css(m,"position"))&&("fixed"===h?(i=m.getBoundingClientRect(),f(k,-1)):(i=d(m).position(),i.left+=parseFloat(d.css(m,"borderLeftWidth"))||0,i.top+=parseFloat(d.css(m,"borderTopWidth"))||0),c.left-=i.left+(parseFloat(d.css(m,"marginLeft"))||0),c.top-=i.top+(parseFloat(d.css(m,"marginTop"))||0),g||"hidden"===(j=d.css(m,"overflow"))||"visible"===j||(g=d(m)));while(m=m.offsetParent);return g&&(g[0]!==k[0]||l)&&f(g,1),c};var cb=(w=v.reposition.Corner=function(a,b){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,K).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!b;var c=a.charAt(0);this.precedance="t"===c||"b"===c?D:C}).prototype;cb.invert=function(a,b){this[a]=this[a]===H?J:this[a]===J?H:b||this[a]},cb.string=function(){var a=this.x,b=this.y;return a===b?a:this.precedance===D||this.forceY&&"center"!==b?b+" "+a:a+" "+b},cb.abbrev=function(){var a=this.string().split(" ");return a[0].charAt(0)+(a[1]&&a[1].charAt(0)||"")},cb.clone=function(){return new w(this.string(),this.forceY)},v.toggle=function(a,c){var e=this.cache,f=this.options,g=this.tooltip;if(c){if(/over|enter/.test(c.type)&&/out|leave/.test(e.event.type)&&f.show.target.add(c.target).length===f.show.target.length&&g.has(c.relatedTarget).length)return this;e.event=l(c)}if(this.waiting&&!a&&(this.hiddenDuringWait=z),!this.rendered)return a?this.render(1):this;if(this.destroyed||this.disabled)return this;var h,i,j,k=a?"show":"hide",m=this.options[k],n=(this.options[a?"hide":"show"],this.options.position),o=this.options.content,p=this.tooltip.css("width"),q=this.tooltip.is(":visible"),r=a||1===m.target.length,s=!c||m.target.length<2||e.target[0]===c.target;return(typeof a).search("boolean|number")&&(a=!q),h=!g.is(":animated")&&q===a&&s,i=h?B:!!this._trigger(k,[90]),this.destroyed?this:(i!==A&&a&&this.focus(c),!i||h?this:(d.attr(g[0],"aria-hidden",!a),a?(e.origin=l(this.mouse),d.isFunction(o.text)&&this._updateContent(o.text,A),d.isFunction(o.title)&&this._updateTitle(o.title,A),!y&&"mouse"===n.target&&n.adjust.mouse&&(d(b).bind("mousemove."+O,this._storeMouse),y=z),p||g.css("width",g.outerWidth(A)),this.reposition(c,arguments[2]),p||g.css("width",""),m.solo&&("string"==typeof m.solo?d(m.solo):d(S,m.solo)).not(g).not(m.target).qtip("hide",d.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete e.origin,y&&!d(S+'[tracking="true"]:visible',m.solo).not(g).length&&(d(b).unbind("mousemove."+O),y=A),this.blur(c)),j=d.proxy(function(){a?(_.ie&&g[0].style.removeAttribute("filter"),g.css("overflow",""),"string"==typeof m.autofocus&&d(this.options.show.autofocus,g).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):g.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(a?"visible":"hidden")},this),m.effect===A||r===A?(g[k](),j()):d.isFunction(m.effect)?(g.stop(1,1),m.effect.call(g,this),g.queue("fx",function(a){j(),a()})):g.fadeTo(90,a?1:0,j),a&&m.target.trigger("qtip-"+this.id+"-inactive"),this))},v.show=function(a){return this.toggle(z,a)},v.hide=function(a){return this.toggle(A,a)},v.focus=function(a){if(!this.rendered||this.destroyed)return this;var b=d(S),c=this.tooltip,e=parseInt(c[0].style.zIndex,10),f=u.zindex+b.length;return c.hasClass(W)||this._trigger("focus",[f],a)&&(e!==f&&(b.each(function(){this.style.zIndex>e&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+W).qtip("blur",a)),c.addClass(W)[0].style.zIndex=f),this},v.blur=function(a){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass(W),this._trigger("blur",[this.tooltip.css("zIndex")],a),this)},v.disable=function(a){return this.destroyed?this:("toggle"===a?a=!(this.rendered?this.tooltip.hasClass(Y):this.disabled):"boolean"!=typeof a&&(a=z),this.rendered&&this.tooltip.toggleClass(Y,a).attr("aria-disabled",a),this.disabled=!!a,this)},v.enable=function(){return this.disable(A)},v._createButton=function(){var a=this,b=this.elements,c=b.tooltip,e=this.options.content.button,f="string"==typeof e,g=f?e:"Close tooltip";b.button&&b.button.remove(),b.button=e.jquery?e:d("<a />",{"class":"qtip-close "+(this.options.style.widget?"":O+"-icon"),title:g,"aria-label":g}).prepend(d("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),b.button.appendTo(b.titlebar||c).attr("role","button").click(function(b){return c.hasClass(Y)||a.hide(b),A})},v._updateButton=function(a){if(!this.rendered)return A;var b=this.elements.button;a?this._createButton():b.remove()},v._setWidget=function(){var a=this.options.style.widget,b=this.elements,c=b.tooltip,d=c.hasClass(Y);c.removeClass(Y),Y=a?"ui-state-disabled":"qtip-disabled",c.toggleClass(Y,d),c.toggleClass("ui-helper-reset "+k(),a).toggleClass(V,this.options.style.def&&!a),b.content&&b.content.toggleClass(k("content"),a),b.titlebar&&b.titlebar.toggleClass(k("header"),a),b.button&&b.button.toggleClass(O+"-icon",!a)},v._storeMouse=function(a){(this.mouse=l(a)).type="mousemove"},v._bind=function(a,b,c,e,f){var g="."+this._id+(e?"-"+e:"");b.length&&d(a).bind((b.split?b:b.join(g+" "))+g,d.proxy(c,f||this))},v._unbind=function(a,b){d(a).unbind("."+this._id+(b?"-"+b:""))};var db="."+O;d(function(){r(S,["mouseenter","mouseleave"],function(a){var b="mouseenter"===a.type,c=d(a.currentTarget),e=d(a.relatedTarget||a.target),f=this.options;b?(this.focus(a),c.hasClass(U)&&!c.hasClass(Y)&&clearTimeout(this.timers.hide)):"mouse"===f.position.target&&f.hide.event&&f.show.target&&!e.closest(f.show.target[0]).length&&this.hide(a),c.toggleClass(X,b)}),r("["+Q+"]",T,p)}),v._trigger=function(a,b,c){var e=d.Event("tooltip"+a);return e.originalEvent=c&&d.extend({},c)||this.cache.event||B,this.triggering=a,this.tooltip.trigger(e,[this].concat(b||[])),this.triggering=A,!e.isDefaultPrevented()},v._bindEvents=function(a,b,c,e,f,g){if(e.add(c).length===e.length){var h=[];b=d.map(b,function(b){var c=d.inArray(b,a);return c>-1?(h.push(a.splice(c,1)[0]),void 0):b}),h.length&&this._bind(c,h,function(a){var b=this.rendered?this.tooltip[0].offsetWidth>0:!1;(b?g:f).call(this,a)})}this._bind(c,a,f),this._bind(e,b,g)},v._assignInitialEvents=function(a){function b(a){return this.disabled||this.destroyed?A:(this.cache.event=l(a),this.cache.target=a?d(a.target):[c],clearTimeout(this.timers.show),this.timers.show=m.call(this,function(){this.render("object"==typeof a||e.show.ready)},e.show.delay),void 0)}var e=this.options,f=e.show.target,g=e.hide.target,h=e.show.event?d.trim(""+e.show.event).split(" "):[],i=e.hide.event?d.trim(""+e.hide.event).split(" "):[];/mouse(over|enter)/i.test(e.show.event)&&!/mouse(out|leave)/i.test(e.hide.event)&&i.push("mouseleave"),this._bind(f,"mousemove",function(a){this._storeMouse(a),this.cache.onTarget=z}),this._bindEvents(h,i,f,g,b,function(){clearTimeout(this.timers.show)}),(e.show.ready||e.prerender)&&b.call(this,a)},v._assignEvents=function(){var c=this,e=this.options,f=e.position,g=this.tooltip,h=e.show.target,i=e.hide.target,j=f.container,k=f.viewport,l=d(b),m=(d(b.body),d(a)),r=e.show.event?d.trim(""+e.show.event).split(" "):[],s=e.hide.event?d.trim(""+e.hide.event).split(" "):[];d.each(e.events,function(a,b){c._bind(g,"toggle"===a?["tooltipshow","tooltiphide"]:["tooltip"+a],b,null,g)}),/mouse(out|leave)/i.test(e.hide.event)&&"window"===e.hide.leave&&this._bind(l,["mouseout","blur"],function(a){/select|option/.test(a.target.nodeName)||a.relatedTarget||this.hide(a)}),e.hide.fixed?i=i.add(g.addClass(U)):/mouse(over|enter)/i.test(e.show.event)&&this._bind(i,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+e.hide.event).indexOf("unfocus")>-1&&this._bind(j.closest("html"),["mousedown","touchstart"],function(a){var b=d(a.target),c=this.rendered&&!this.tooltip.hasClass(Y)&&this.tooltip[0].offsetWidth>0,e=b.parents(S).filter(this.tooltip[0]).length>0;b[0]===this.target[0]||b[0]===this.tooltip[0]||e||this.target.has(b[0]).length||!c||this.hide(a)}),"number"==typeof e.hide.inactive&&(this._bind(h,"qtip-"+this.id+"-inactive",p),this._bind(i.add(g),u.inactiveEvents,p,"-inactive")),this._bindEvents(r,s,h,i,n,o),this._bind(h.add(g),"mousemove",function(a){if("number"==typeof e.hide.distance){var b=this.cache.origin||{},c=this.options.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&this.hide(a)}this._storeMouse(a)}),"mouse"===f.target&&f.adjust.mouse&&(e.hide.event&&this._bind(h,["mouseenter","mouseleave"],function(a){this.cache.onTarget="mouseenter"===a.type}),this._bind(l,"mousemove",function(a){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(Y)&&this.tooltip[0].offsetWidth>0&&this.reposition(a)})),(f.adjust.resize||k.length)&&this._bind(d.event.special.resize?k:m,"resize",q),f.adjust.scroll&&this._bind(m.add(f.container),"scroll",q)},v._unassignEvents=function(){var c=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],a,b];this._unbind(d([]).pushStack(d.grep(c,function(a){return"object"==typeof a})))},u=d.fn.qtip=function(a,b,e){var f=(""+a).toLowerCase(),g=B,i=d.makeArray(arguments).slice(1),j=i[i.length-1],k=this[0]?d.data(this[0],O):B;return!arguments.length&&k||"api"===f?k:"string"==typeof a?(this.each(function(){var a=d.data(this,O);if(!a)return z;if(j&&j.timeStamp&&(a.cache.event=j),!b||"option"!==f&&"options"!==f)a[f]&&a[f].apply(a,i);else{if(e===c&&!d.isPlainObject(b))return g=a.get(b),A;a.set(b,e)}}),g!==B?g:this):"object"!=typeof a&&arguments.length?void 0:(k=h(d.extend(z,{},a)),this.each(function(a){var b,c;return c=d.isArray(k.id)?k.id[a]:k.id,c=!c||c===A||c.length<1||u.api[c]?u.nextid++:c,b=s(d(this),c,k),b===A?z:(u.api[c]=b,d.each(N,function(){"initialize"===this.initialize&&this(b)}),b._assignInitialEvents(j),void 0)}))},d.qtip=e,u.api={},d.each({attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&"object"==typeof f&&f.options.suppress)return arguments.length<2?d.attr(c,$):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr($,b))}return d.fn["attr"+Z].apply(this,arguments)},clone:function(a){var b=(d([]),d.fn["clone"+Z].apply(this,arguments));return a||b.filter("["+$+"]").attr("title",function(){return d.attr(this,$)}).removeAttr($),b}},function(a,b){if(!b||d.fn[a+Z])return z;var c=d.fn[a+Z]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+Z]=d.cleanData,d.cleanData=function(a){for(var b,c=0;(b=d(a[c])).length;c++)if(b.attr(P))try{b.triggerHandler("removeqtip")}catch(e){}d["cleanData"+Z].apply(this,arguments)}),u.version="2.2.0",u.nextid=0,u.inactiveEvents=T,u.zindex=15e3,u.defaults={prerender:A,id:A,overwrite:z,suppress:z,content:{text:z,attr:"title",title:A,button:A},position:{my:"top left",at:"bottom right",target:A,container:A,viewport:A,adjust:{x:0,y:0,mouse:z,scroll:z,resize:z,method:"flipinvert flipinvert"},effect:function(a,b){d(this).animate(b,{duration:200,queue:A})}},show:{target:A,event:"mouseenter",effect:z,delay:90,solo:A,ready:A,autofocus:A},hide:{target:A,event:"mouseleave",effect:z,delay:0,fixed:A,inactive:A,leave:"window",distance:A},style:{classes:"",widget:A,width:A,height:A,def:z},events:{render:B,move:B,show:B,hide:B,toggle:B,visible:B,hidden:B,focus:B,blur:B}},N.viewport=function(c,d,e,f,g,h,i){function j(a,b,c,e,f,g,h,i,j){var k=d[f],m=v[a],t=w[a],u=c===M,x=m===f?j:m===g?-j:-j/2,y=t===f?i:t===g?-i:-i/2,z=r[f]+s[f]-(o?0:n[f]),A=z-k,B=k+j-(h===E?p:q)-z,C=x-(v.precedance===a||m===v[b]?y:0)-(t===K?i/2:0);return u?(C=(m===f?1:-1)*x,d[f]+=A>0?A:B>0?-B:0,d[f]=Math.max(-n[f]+s[f],k-C,Math.min(Math.max(-n[f]+s[f]+(h===E?p:q),k+C),d[f],"center"===m?k-x:1e9))):(e*=c===L?2:0,A>0&&(m!==f||B>0)?(d[f]-=C+e,l.invert(a,f)):B>0&&(m!==g||A>0)&&(d[f]-=(m===K?-C:C)+e,l.invert(a,g)),d[f]<r&&-d[f]>B&&(d[f]=k,l=v.clone())),d[f]-k}var k,l,m,n,o,p,q,r,s,t=e.target,u=c.elements.tooltip,v=e.my,w=e.at,x=e.adjust,y=x.method.split(" "),z=y[0],B=y[1]||y[0],N=e.viewport,P=e.container,Q=c.cache,R={left:0,top:0};return N.jquery&&t[0]!==a&&t[0]!==b.body&&"none"!==x.method?(n=P.offset()||R,o="static"===P.css("position"),k="fixed"===u.css("position"),p=N[0]===a?N.width():N.outerWidth(A),q=N[0]===a?N.height():N.outerHeight(A),r={left:k?0:N.scrollLeft(),top:k?0:N.scrollTop()},s=N.offset()||R,("shift"!==z||"shift"!==B)&&(l=v.clone()),R={left:"none"!==z?j(C,D,z,x.x,H,J,E,f,h):0,top:"none"!==B?j(D,C,B,x.y,G,I,F,g,i):0},l&&Q.lastClass!==(m=O+"-pos-"+l.abbrev())&&u.removeClass(c.cache.lastClass).addClass(c.cache.lastClass=m),R):R};var eb,fb='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';d.extend(t.prototype,{_scroll:function(){var b=this.qtip.elements.overlay;b&&(b[0].style.top=d(a).scrollTop()+"px")},init:function(c){var e=c.tooltip;d("select, object").length<1&&(this.bgiframe=c.elements.bgiframe=d(fb).appendTo(e),c._bind(e,"tooltipmove",this.adjustBGIFrame,this._ns,this)),this.redrawContainer=d("<div/>",{id:O+"-rcontainer"}).appendTo(b.body),c.elements.overlay&&c.elements.overlay.addClass("qtipmodal-ie6fix")&&(c._bind(a,["scroll","resize"],this._scroll,this._ns,this),c._bind(e,["tooltipshow"],this._scroll,this._ns,this)),this.redraw()},adjustBGIFrame:function(){var a,b,c=this.qtip.tooltip,d={height:c.outerHeight(A),width:c.outerWidth(A)},e=this.qtip.plugins.tip,f=this.qtip.elements.tip;b=parseInt(c.css("borderLeftWidth"),10)||0,b={left:-b,top:-b},e&&f&&(a="x"===e.corner.precedance?[E,H]:[F,G],b[a[1]]-=f[a[0]]()),this.bgiframe.css(b).css(d)},redraw:function(){if(this.qtip.rendered<1||this.drawing)return this;var a,b,c,d,e=this.qtip.tooltip,f=this.qtip.options.style,g=this.qtip.options.position.container;return this.qtip.drawing=1,f.height&&e.css(F,f.height),f.width?e.css(E,f.width):(e.css(E,"").appendTo(this.redrawContainer),b=e.width(),1>b%2&&(b+=1),c=e.css("maxWidth")||"",d=e.css("minWidth")||"",a=(c+d).indexOf("%")>-1?g.width()/100:0,c=(c.indexOf("%")>-1?a:1)*parseInt(c,10)||b,d=(d.indexOf("%")>-1?a:1)*parseInt(d,10)||0,b=c+d?Math.min(Math.max(b,d),c):b,e.css(E,Math.round(b)).appendTo(g)),this.drawing=0,this},destroy:function(){this.bgiframe&&this.bgiframe.remove(),this.qtip._unbind([a,this.qtip.tooltip],this._ns)}}),eb=N.ie6=function(a){return 6===_.ie?new t(a):A},eb.initialize="render",x.ie6={"^content|style$":function(){this.redraw()}}})}(window,document);

function Validate()
{
    this.form_selector = 'form.cti_validation';
    this.autosubmit_form_selector = 'form.auto_submit';
    this.validation_error_class_name = 'validation_error';
    this.validation_error_selector = '.'+this.validation_error_class_name;
    this.validation_message_selector = '.validation_message';
    this.validation_input_error_color = '#f2dede';
    this.validation_input_error_border_color = '#eed3d7';
    this.message_type = 'tooltip'; // you can use tooltip, dialog, inline, growl, single-growl
    this.submit_message_type = 'dialog';
    this.bind_type = 'keyup change'; //can be click, change, focus, etc
    this.select_bind_type = 'keyup change focus';
    this.submit_validation = false; //defaulting to false till logging is done
    //this automatically switches the tooltips from right to left when mobile
    this.override_tooltip_mobile_position = true;
    this.override_tooltip_mobile_displays = ['phone', 'phone-tablet', 'portait-tablet'];
    this.validation_modal_selector = '#validation_modal';
    this.validation_modal_content_selector = '#validation_modal_content';

    //tooltip options
    //this is the default positining
    this.tooltip_options = {
        position: {
            my: 'bottom left',
            at: 'top right',
            adjust: {
                screen: true
                //method: 'flipinvert'
            }
        },
        hide: { //You can look at http://qtip2.com/options#hide for overrides
            event: 'click unfocus'
        },
        show: {
            event: false,
            ready: true,
            inactive: 3000
        },
        style: {
            classes: 'qtip-default  qtip qtip-red qtip-rounded' // Make it red... the classic error colour!
        }
    }
    
    //dialog options
    this.dialog_options = {
        position: {
            my: "center top"
        },
        draggable: true,
        width: '520',
        close : function()
        {
            $(this).remove();
        }
    }
    this.dialog_selector = '#cti_validation_dialog';
    this.dialog_html = '<div id="cti_validation_dialog" style="display:none;"><ul class="form-errors"></ul></div>';
    this.dialog_label_html = '<b>{field}</b>';
    this.dialog_message_html = '<ul class="form-errors"><li>{message}</li></ul>';

    this.inline_options = {};
    this.inline_options.html = '<p class="'+this.validation_error_class_name+'">{message}</p>';

    this.forms = {};
    this.elements = {};
    this.errors = {};

    this.rules = {
        required: {
            message: '{field} is required.',
            check: (/^\s*$/)
        },
        min_length: {
            message: '{field} must be less than {option} characters in length.'
        },
        max_length: {
            message: '{field} must not be greater than {option} characters in length.'
        },
        email: {
            message: 'The email "{value}" is not a valid email.',
            check: (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        },
        phone: {
            message: 'The {field} value of "{value}" is not valid.',
            check: /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/
        },
        zip_code: {
            message: 'The {field} value of "{value}" is not valid.',
            check: /(^\d{5}$)|(^\d{5}-\d{4}$)/
        },
        not_zero: {
            message: '{field} is required.',
            check: (/^0$/)
        },
        alpha_numeric_space_only: {
            message: '{field} can only contain numbers, letters and spaces.',
            check: (/^[a-zA-Z0-9 ]+$/)
        },
        first_last_name: {
            message: '{field} must contain a first and last name separated by a space.',
            check: (/^[A-Za-z]+\ ([A-Za-z]\ )?[A-Za-z]+$/)
        },
        alpha_numeric_space_period_pound_only: {
            message: '{field} can only contain numbers, letters, spaces, . and #.',
            check: (/^[a-zA-Z0-9 ]+$/)
        },
        alpha_spaces_only: {
            message: '{field} can only contain letters and spaces.',
            check: (/^[a-zA-Z ]+$/)
        },
        regexp_test: { //false for failure
            //you need to define your message and test
            message: null,
            check: null
        }, 
        callback: { //will only show error when true is returned
            message: null,
            check: null //should be the name of a callable method
        } 
    }

    //Private Setup method for starting everything
    var _init = function(self)
    {
        //get all the auto and inline form validation clients
        self.forms = $(self.form_selector, self.auto_submit_form_selector);
        //setup the binds for each form
        $.each(self.forms, function(index)
        {
            _config(self, self.forms[index]);
            _bind(self, self.forms[index]);
        });
    }
    
    //Private method for creating all the bindings
    var _bind = function(self, form)
    {
        /*
         This is for submit validation
         */
        if(self.submit_validation && $(form).hasClass('auto_submit') == false)
        {
            //dirty hack to remove any disabled on submit buttons
            setInterval(function() { $(form).find('[type="submit"]').removeAttr('disabled');}, 500);
            //bind the submit
            $(form).unbind('submit');
            $(form).bind('submit', function(event)
            {
                //prevent the submit
                event.preventDefault();
                //run the form_validation
                self.form_check(form, true);
                //log the request
                _log(self, form); //this currently does not log, but the method is in place
                //enable the button
                $(form).find('[type="submit"]').removeAttr('disabled');
            });
        }
        /*
         This is for inline validation
         */
        //find all the form elements
        this.elements = $(form).find('input:visible, select:visible');
        //iterate and build the dom bindings for each one that has a valid rule
        $.each(elements, function(index)
        {
            if(typeof($(elements[index]).data() != 'undefined'))
            {
                //change selects bind
                if($(elements[index]).is('select')) {
                    self.bind_type = self.select_bind_type;
                }
                $(elements[index]).unbind(self.bind_type);
                $(elements[index]).bind(self.bind_type, function()
                {
                    self.check(elements[index]);
                });
            }
        });
    }

    this.config = function(form)
    {
        _config(this, form);
    }

    var _config = function(self, form)
    {
        self.validation_error_selector = (typeof($(form).data('validation_error_selector')) != 'undefined' 
                ? $(form).data('validation_error_selector') : self.validation_error_selector);
        self.validation_message_selector = (typeof($(form).data('validation_message_selector')) != 'undefined' 
                ? $(form).data('validation_message_selector') : self.validation_message_selector);
        self.validation_input_error_color = (typeof($(form).data('validation_input_error_color')) != 'undefined' 
                ? $(form).data('validation_input_error_color') : self.validation_input_error_color);
        self.validation_input_error_border_color = (typeof($(form).data('validation_input_error_border_color')) != 'undefined' 
                ? $(form).data('validation_input_error_border_color') : self.validation_input_error_border_color);
        self.message_type = (typeof($(form).data('message_type')) != 'undefined' 
                ? $(form).data('message_type') : self.message_type);
        self.submit_message_type = (typeof($(form).data('submit_message_type')) != 'undefined' 
                ? $(form).data('submit_message_type') : self.message_type);
        self.bind_type = (typeof($(form).data('bind_type')) != 'undefined' 
                ? $(form).data('bind_type') : self.bind_type); //can be click, change, focus, etc
        self.select_bind_type = (typeof($(form).data('select_bind_type')) != 'undefined' 
                ? $(form).data('select_bind_type') : self.select_bind_type);
        self.submit_validation = (typeof($(form).data('submit_validation')) != 'undefined' 
                ? $(form).data('submit_validation') : self.submit_validation);
    }

    var _get_viewport = function()
    {
        var width = $(document).width();
        var display = null;
        if(width > 1200) {
            display = 'large-display';
        } else if (width > 980 && width < 1200) {
            display = 'default';
        } else if (width > 768 && width < 980) {
            display = 'portait-tablet';
        } else if (width > 480 && width < 768) {
            display = 'phone-tablet';
        } else if (width < 480) {
            display = 'phone';
        }
        return display;
    }

    var _log = function(selfance, form)
    {
        //$.getJSON('/test', { form_data: $(form).serializeArray(), errors: selfance.errors });
    }

    //This if form manually adding a form if you wanted to make some non data-driven changes to the config
    //var custom_validation = new Validate();
    //custom_validation.tooltip_options.hide = "click";
    //custom_validation.form($('form#custom_form'));
    this.form = function(form)
    {
        _bind(this, form);
    }

    this.form_check = function(form, submit)
    {
        var self = this;
        self.elements = $(form).find('input:visible, select:visible');
        var og_message_type = self.message_type;
        self.message_type = self.submit_message_type;
        //iterate and build the dom bindings for each one that has a valid rule
        var valid = true;
        $.each(elements, function(index)
        {
            if(typeof($(elements[index]).data() != 'undefined'))
            {
                var check = self.check(elements[index]);
                if(check == false) {
                    valid = false;
                }
                //submit form if at end and valid is still true
                if((index == (elements.length-1)) && valid && submit) {
                    $(form).unbind('submit');
                    $(form).submit();
                }
            }
        });
        self.message_type = og_message_type;
    }

    //This automatically fires, but you can call it on a field manually for other requests
    this.check = function(element)
    {
        //local version of the Validate selfance
        var self = this;
        //get all the rules
        var options = $(element).data();
        var valid = true;
        //clear out any previous errors
        self.clear_error(element);
        for(var name in options)
        {
            switch(name)
            {
                case 'required':
                    var test = self.rules.required.check.test($(element).val());
                    if(test == true) {
                        self.show_error(element, self.message(element, self.rules.required));
                        valid = false;
                    }
                    break;
                case 'not_zero':
                    var test = self.rules.not_zero.check.test($(element).val());
                    if(test == true) {
                        self.show_error(element, self.message(element, self.rules.required));
                        valid = false;
                    }    
                    break;
                case 'min_length':
                    //set the option
                    $(element).data('option',$(element).data('min_length'));
                    //run the test
                    var test = ($(element).val().length < parseInt($(element).data('min_length')));
                    if(test == true){
                        self.show_error(element, self.message(element, self.rules.min_length));
                        valid = false;
                    }
                    break;
                case 'max_length':
                    //set the option
                    $(element).data('option',$(element).data('max_length'));
                    //run the test
                    var test = ($(element).val().length > parseInt($(element).data('max_length')));
                    if(test == true){
                        self.show_error(element, self.message(element, self.rules.max_length));
                        valid = false;
                    }
                    break;
                case 'email':
                    var test = self.rules.email.check.test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.email));
                        valid = false;
                    }    
                    break;
                case 'phone':
                    var numbers = $(element).val().replace(/\D/g, '' );
                    var test = new RegExp(self.rules.phone.check).test(numbers);
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.phone));
                        valid = false;
                    }    
                    break;
                case 'zip_code':
                    var test = self.rules.zip_code.check.test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.zip_code));
                        valid = false;
                    }
                    break;
                case 'first_last_name':
                    var test = new RegExp(self.rules.first_last_name.check).test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.first_last_name));
                        valid = false;
                    }
                    break;
                case 'alpha_spaces_only':
                    var test = new RegExp(self.rules.alpha_spaces_only.check).test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.alpha_spaces_only));
                        valid = false;
                    }
                    break;
                case 'alpha_numeric_space_only':
                    var test = new RegExp(self.rules.alpha_numeric_space_only.check).test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.alpha_numeric_space_only));
                        valid = false;
                    }
                    break;
                case 'alpha_numeric_space_period_pound_only':
                    var test = new RegExp(self.rules.alpha_numeric_space_period_pound_only.check).test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.alpha_numeric_space_period_pound_only));
                        valid = false;
                    }
                    break;
                case 'alpha_numeric_space_period_pound_only':
                    var test = new RegExp(self.rules.alpha_numeric_space_period_pound_only.check).test($(element).val());
                    if(test == false) {
                        self.show_error(element, self.message(element, self.rules.alpha_numeric_space_period_pound_only));
                        valid = false;
                    }
                    break;
                case 'regexp_test':
                    //Example data-regexp_test="(^\d{5}$)|(^\d{5}-\d{4}$)" data-regexp_test_message="{field} must be 5 or 9 integers." 
                    var test = new RegExp($(element).data('regexp_test')).test($(element).val());
                    if(test == false) {
                        self.rules.regexp_test.message = $(element).data('regexp_test_message');
                        self.show_error(element, self.message(element, self.rules.regexp_test));
                        valid = false;
                    }
                    break;
                case 'callback':
                    //Example data-callback="testCallback" data-callback_message="{value} is a invalid {field}"
                    var test = window[$(element).data('callback')]($(element).val());
                    if(test == false) {
                        self.rules.callback.message = $(element).data('callback_message');
                        self.show_error(element, self.message(element, self.rules.callback));
                        valid = false;
                    }
                    break;
                default:
                    break;
            }
        }
        return valid;
    }

    this.clear_error = function(element)
    {
        $(element).attr('data-is-valid', true).closest('form').attr('data-is-valid', true);
        //kill any errors
        try{
            $(element).qtip('destroy');
            $(element).parent().find(this.validation_error_selector).remove();
        }
        catch(e){ }
        delete this.elements[element];
    }

    this.clear_errors = function()
    {
        var self = this;
        self.errors = {};
        var elements = $('body').find('input:visible, select:visible');
        $.each(elements, function(index)
        {
            self.clear_error($(elements[index]));
        });
    }

    this.show_error = function(element, message)
    {
        //this.errors[$(element).attr('name')] = message;
        //save the element
        //this.elements[$(element).attr('name')] = element;
        //clear any previous error on this element
        //this.clear_error(element);
        //add error class
        $(element).attr('data-is-valid', false).closest('form').attr('data-is-valid', false);
        //create the notification description
        // you can use tooltip, dialog, inline, growl, single-growl
        if($(element).data('message')){
            message = $(element).data('message');
        }
        
        //unhide any fields in case they have errors (used on short form)
        $('form .hide').removeClass("hide");
        $('form .resetValue').val('');

        this.message_type;

        //if its a mobile then display validation inline
        if($.inArray(_get_viewport(), this.override_tooltip_mobile_displays) != -1) {
            this.message_type = "inline";
            $('body').addClass('error--inline');
        }

        switch(this.message_type)
        {
            case 'tooltip':
                this.tooltip(element, message);
                break;
            case 'inline':
                this.inline(element, message);
                break;
            case 'modal':
                this.modal(message);
                break;
            case 'dialog':
                this.dialog(element, message);
                break;
        }
    }

    this.message = function(element, rule)
    {
        if(typeof(rule) == 'undefined' || typeof(rule.message) == 'undefined') {
            return false;
        }
        var message = rule.message;
        if(message.indexOf('{value}') != -1) {
            var value = $(element).val();
            message = message.replace('{value}', value);
        }
        if(message.indexOf('{option}') != -1) {
            var option = $(element).data('option');
            message = message.replace('{option}', option);
        }
        if(message.indexOf('{field}') != -1) {
            var    label = $(element).data('label');
            if(!label) {
                label = $(element).attr('name');
            }
            message = message.replace('{field}', label);
        }
        return message;
    }

    this.tooltip = function(element, message)
    {
        //ensure tooltips are available
        if(typeof($.qtip) == 'undefined') {
            console.log('Qtip is not loaded.');
            return;
        }
        //check to see if there is a target position
        var target = $(element).data('target');
        if(typeof(target) != 'undefined') {
            element = $(target);
        }
        if ($(element).is(":hidden")) {
            return;
        }
        var options = this.tooltip_options;
        //check the viewport and override if mobile
        if(this.override_tooltip_mobile_position) {
            if($.inArray(_get_viewport(), this.override_tooltip_mobile_displays) != -1) {
                options.position.my = ['bottom left'];
                options.position.at = ['top left'];
            }
        }
        //set the tooltop message
        options.content = message;
        //get any data driven options related to the tooltip
        //Position Options are explained http://qtip2.com/options#position
        //top left, top center, top right, right top, right center, right bottom, bottom right, bottom center, bottom left, left bottom, left center, left top
        if(typeof($(element).data('tooltip_position_my')) != 'undefined') {
            options.position.my = $(element).data('tooltip_position_my');
        }
        if(typeof($(element).data('tooltip_position_at')) != 'undefined') {
            options.position.at = $(element).data('tooltip_position_at');
        }
        $(element).qtip(options);
    }

    this.inline = function(element, message)
    {
        //set the message
        var final_message = this.inline_options.html.replace('{message}', message);
        //check to see if there is a target position
        var target = $(element).data('target');
        if(typeof(target) != 'undefined') {
            if ($(target).is(':input')) {
                // if data-target is an input, insert message after
                $(target).after(final_message);
            } else {
                // else append message to target
                $(target).append(final_message);
            }
        } else {
            $(element).after(final_message);
        }
    }

    this.modal = function(message)
    {
        var self = this;
        $(self.validation_modal_content_selector).html(' ');
        var modal = $(self.validation_modal_selector);
        $(self.validation_modal_content_selector).append('<li>'+message+'</li>');   
        var visible = modal.is(':visible');
        if(!visible){
            modal.modal('show');
        }
    }

    this.dialog = function(element, message)
    {
        var self = this;
        //create the dialog if it doesnt exist
        if($(self.dialog_selector).is(':visible') == false) {
            $('body').append(self.dialog_html);
        } else {
            //check to see if list for the element exists
            if($(self.dialog_selector).find('li[name="'+$(element).attr('name')+'"]').length > 0)
            {

            }
            var html = '<li>' + message + '</li>';
            $(self.dialog_selector).append(html);
        }
        $(self.dialog_selector).dialog(self.dialog_options);
    }

    //Private methods
    _init(this);
}
