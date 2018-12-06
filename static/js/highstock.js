/*
 Highstock JS v6.1.2 (2018-08-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T,L){
    "object"===typeof module&&module.exports?module.exports=T.document?L(T):L:"function"===typeof define&&define.amd?define(
        function(){
            return L(T)
        }
        ):T.Highcharts=L(T)
})("undefined"!==typeof window?window:this,function(T){
    var L=function(){
        var a="undefined"===typeof T?window:T,
            C=a.document,
            D=a.navigator&&a.navigator.userAgent||"",
            G=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,
            p=/(edge|msie|trident)/i.test(D)&&!a.opera,
            l=-1!==D.indexOf("Firefox"),
    g=-1!==D.indexOf("Chrome"),
            u=l&&4>parseInt(D.split("Firefox/")[1],10);
        return a.Highcharts?a.Highcharts.error(16,!0):{
            product:"Highstock",
            version:"6.1.2",
            deg2rad:2*Math.PI/360,
            doc:C,
            hasBidiBug:u,
            hasTouch:C&&void 0!==C.documentElement.ontouchstart,
            isMS:p,
            isWebKit:-1!==D.indexOf("AppleWebKit"),
            isFirefox:l,
            isChrome:g,
            isSafari:!g&&-1!==D.indexOf("Safari"),
            isTouchDevice:/(Mobile|Android|Windows Phone)/.test(D),
            SVG_NS:"http://www.w3.org/2000/svg",
            chartCount:0,
            seriesTypes:{},
            symbolSizes:{},
            svg:G,
            win:a,
            marginNames:["plotTop",
        "marginRight",
                "marginBottom",
                "plotLeft"],
            noop:function(){},
            charts:[]}}();
    (function(a){
        a.timers=[];
        var C=a.charts,
            D=a.doc,
            G=a.win;
        a.error=function(p,l){
            p=a.isNumber(p)?"Highcharts error #"+p+": www.highcharts.com/errors/"+p:p;
            if(l)throw Error(p);
            G.console&&console.log(p)
        };
        a.Fx=function(a,l,g){
            this.options=l;
            this.elem=a;
            this.prop=g
        };
        a.Fx.prototype={
            dSetter:function(){
                var a=this.paths[0],
                    l=this.paths[1],
                    g=[],
                    u=this.now,
                    A=a.length,
                    r;
                if(1===u)g=this.toD;
                else if(A===l.length&&1>u)
                    for(;A--;)r=parseFloat(a[A]),
        g[A]=isNaN(r)?l[A]:u*parseFloat(l[A]-r)+r;
                    else g=l;
                    this.elem.attr("d",g,null,!0)},
            update:function(){
                var a=this.elem,
                    l=this.prop,
                    g=this.now,
                    u=this.options.step;
                if(this[l+"Setter"])this[l+"Setter"]();
                else a.attr?a.element&&a.attr(l,g,null,!0):a.style[l]=g+this.unit;u&&u.call(a,g,this)},
            run:function(p,l,g){
                var u=this,
                    A=u.options,
                    r=function(a){
                    return r.stopped?!1:u.step(a)},
                    x=G.requestAnimationFrame||function(a){
                    setTimeout(a,13)
                    },
                    m=function(){
                    for(var b=0;
                        b<a.timers.length;
                        b++)a.timers[b]()||a.timers.splice(b--,1);
                    a.timers.length&&x(m)
                };
                p!==l||this.elem["forceAnimate:"+this.prop]?(
                    this.startTime=+new Date,
                        this.start=p,
                        this.end=l,
                        this.unit=g,
                        this.now=this.start,
                        this.pos=0,
                        r.elem=this.elem,
                        r.prop=this.prop,
                    r()&&1===a.timers.push(r)&&x(m)):(delete A.curAnim[this.prop],
                A.complete&&0===a.keys(A.curAnim).length&&A.complete.call(this.elem))
            },
            step:function(p){
                var l=+new Date,g,
                    u=this.options,
                    A=this.elem,
                    r=u.complete,
                    x=u.duration,
                    m=u.curAnim;
                A.attr&&!A.element?p=!1:p||l>=x+this.startTime?(this.now=this.end,
                    this.pos= 1,
                    this.update(),
                    g=m[this.prop]=!0,
                    a.objectEach(m,
                        function(a){
                        !0!==a&&(g=!1)
                    }),
                g&&r&&r.call(A),
                    p=!1):(this.pos=u.easing((l-this.startTime)/x),
                    this.now=this.start+(this.end-this.start)*this.pos,
                    this.update(),
                    p=!0);
                return p},
            initPath:function(p,l,g){
                function u(a){
                    var c,b;
                    for(e=a.length;e--;)c="M"===a[e]||"L"===a[e],
                        b=/[a-zA-Z]/.test(a[e+3]),
                    c&&b&&a.splice(e+1,0,a[e+1],a[e+2],a[e+1],a[e+2])
                }function A(a,c){
                    for(;a.length<f;){
                        a[0]=c[f-a.length];
                        var b=a.slice(0,h);
                        [].splice.apply(a,[0,0].concat(b));
                        w&&(b= a.slice(a.length-h),
                            [].splice.apply(a,[a.length,0].concat(b)),e--)
                    }a[0]="M"
                }function r(a,e){
                    for(var b=(f-a.length)/h;0<b&&b--;)
                        c=a.slice().splice(a.length/y-h,h*y),
                            c[0]=e[f-h-b*h],
                        d&&(c[h-6]=c[h-2],
                            c[h-5]=c[h-1]),
                            [].splice.apply(a,[a.length/y,0].concat(c)),
                        w&&b--}l=l||"";
                var x,m=p.startX,
                    b=p.endX,
                    d=-1<l.indexOf("C"),
                    h=d?7:3,f,c,e;
                l=l.split(" ");
                g=g.slice();
                var w=p.isArea,
                    y=w?2:1,
                    t;
                d&&(u(l),u(g));
                if(m&&b){
                    for(e=0;e<m.length;e++)
                        if(m[e]===b[0]){
                            x=e;
                            break
                        }else if(m[0]===b[b.length-m.length+e]){
                            x=e;
                            t=!0;
                            break
                        }
                        void 0===x&&(l=[])
                }l.length&&a.isNumber(x)&&(f=g.length+x*y*h,
                    t?(A(l,g),r(g,l)):(A(g,l),r(l,g)));
                return[l,g]
            },
            fillSetter:function(){
                a.Fx.prototype.strokeSetter.apply(this,arguments)
            },
            strokeSetter:function(){
                this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)
            }
        };
        a.merge=function(){
            var p,
                l=arguments,
                g,
                u={},
                A=function(g,x){
                "object"!==typeof g&&(g={});
                a.objectEach(x,function(m,b){
                    !a.isObject(m,!0)||a.isClass(m)||a.isDOMElement(m)?g[b]=x[b]:g[b]=A(g[b]||{},m)
                });
                return g
            };
            !0===l[0]&&(u=l[1],
                l=Array.prototype.slice.call(l,2));
            g=l.length;
            for(p=0;p<g;p++)u=A(u,l[p]);
            return u
        };
        a.pInt=function(a,l){
            return parseInt(a,l||10)
        };
        a.isString=function(a){
            return"string"===typeof a
        };
        a.isArray=function(a){
            a=Object.prototype.toString.call(a);
            return"[object Array]"===a||"[object Array Iterator]"===a
        };
        a.isObject=function(p,l){
            return!!p&&"object"===typeof p&&(!l||!a.isArray(p))
        };
        a.isDOMElement=function(p){
            return a.isObject(p)&&"number"===typeof p.nodeType
        };
        a.isClass=function(p){
            var l=p&&p.constructor;
            return!(!a.isObject(p,!0)||a.isDOMElement(p)||!l||!l.name||"Object"===l.name)
        };
        a.isNumber=function(a){
            return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a
        };
        a.erase=function(a,l){
            for(var g=a.length;g--;)
                if(a[g]===l){
                    a.splice(g,1);
                    break
                }
        };
        a.defined=function(a){
            return void 0!==a&&null!==a
        };
        a.attr=function(p,l,g){
            var u;
            a.isString(l)?a.defined(g)?p.setAttribute(l,g):p&&p.getAttribute&&((u=p.getAttribute(l))||"class"!==l||(u=p.getAttribute(l+"Name"))):a.defined(l)&&a.isObject(l)&&
    a.objectEach(l,function(a,g){p.setAttribute(g,a)});
            return u
        };
        a.splat=function(p){
            return a.isArray(p)?p:[p]
        };
        a.syncTimeout=function(a,l,g){
            if(l)
                return setTimeout(a,l,g);
            a.call(0,g)};
        a.clearTimeout=function(p){
            a.defined(p)&&clearTimeout(p)
        };
        a.extend=function(a,l){
            var g;
            a||(a={});
            for(g in l)
                a[g]=l[g];
            return a
        };
        a.pick=function(){
            var a=arguments,l,g,u=a.length;
            for(l=0;l<u;l++)
                if(g=a[l],void 0!==g&&null!==g)
                    return g
        };
        a.css=function(p,l){
            a.isMS&&!a.svg&&l&&void 0!==l.opacity&&(l.filter="alpha(opacity\x3d"+
    100*l.opacity+")");
            a.extend(p.style,l)
        };
        a.createElement=function(p,l,g,u,A){
            p=D.createElement(p);
            var r=a.css;
            l&&a.extend(p,l);
            A&&r(p,{padding:0,border:"none",margin:0});
            g&&r(p,g);
            u&&u.appendChild(p);
            return p
        };
        a.extendClass=function(p,l){
            var g=function(){};
            g.prototype=new p;
            a.extend(g.prototype,l);
            return g
        };
        a.pad=function(a,l,g){
            return Array((l||2)+1-String(a).replace("-","").length).join(g||0)+a
        };
        a.relativeLength=function(a,l,g){
            return/%$/.test(a)?l*parseFloat(a)/100+(g||0):parseFloat(a)
        };
        a.wrap=function(a,l,g){
            var u=a[l];
            a[l]=function(){
                var a=Array.prototype.slice.call(arguments),r=arguments,x=this;
                x.proceed=function(){
                    u.apply(x,arguments.length?arguments:r)
                };
                a.unshift(u);
                a=g.apply(this,a);
                x.proceed=null;
                return a
            }
        };
        a.formatSingle=function(p,l,g){
            var u=/\.([0-9])/,
                A=a.defaultOptions.lang;
            /f$/.test(p)?(g=(g=p.match(u))?g[1]:-1,
            null!==l&&(l=a.numberFormat(l,g,A.decimalPoint,-1<p.indexOf(",")?A.thousandsSep:""))):l=(g||a.time).dateFormat(p,l);
            return l
        };
        a.format=function(p,l,g){
            for(var u="{",A=!1,r,x,m,b,d=[],h;p;){
                u=p.indexOf(u);
                if(-1===u)break;
                r=p.slice(0,u);
                if(A){r=r.split(":");
                x=r.shift().split(".");
                b=x.length;
                h=l;
                for(m=0;m<b;m++)h&&(h=h[x[m]]);
                r.length&&(h=a.formatSingle(r.join(":"),h,g));
                d.push(h)
                }else
                    d.push(r);
                p=p.slice(u+1);
                u=(A=!A)?"}":"{"
            }
            d.push(p);
            return d.join("")
        };
        a.getMagnitude=function(a){
            return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))
        };
        a.normalizeTickInterval=function(p,l,g,u,A){
            var r,x=p;
            g=a.pick(g,1);
            r=p/g;
            l||(l=A?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],
            !1===u&&(1===g?l=a.grep(l,function(a){
                return 0===a%1
            }):.1>=g&&(l=[1/g])));
            for(u=0;u<l.length&&!(x=l[u],A&&x*g>=p||!A&&r<=(l[u]+(l[u+1]||l[u]))/2);u++);
            return x=a.correctFloat(x*g,-Math.round(Math.log(.001)/Math.LN10))
        };
        a.stableSort=function(a,l){
            var g=a.length,u,A;
            for(A=0;A<g;A++)a[A].safeI=A;
            a.sort(function(a,g){
                u=l(a,g);
                return 0===u?a.safeI-g.safeI:u
            });
            for(A=0;A<g;A++)
                delete a[A].safeI
        };
        a.arrayMin=function(a){
            for(var l=a.length,g=a[0];l--;)
                a[l]<g&&(g=a[l]);
            return g
        };
        a.arrayMax=function(a){
            for(var l=a.length,g=a[0];l--;)
            a[l]>g&&(g=a[l]);
            return g
        };
        a.destroyObjectProperties=function(p,l){
            a.objectEach(p,function(a,u){
                a&&a!==l&&a.destroy&&a.destroy();
                delete p[u]
            })};
        a.discardElement=function(p){
            var l=a.garbageBin;
            l||(l=a.createElement("div"));
            p&&l.appendChild(p);
            l.innerHTML=""};
        a.correctFloat=function(a,l){
            return parseFloat(a.toPrecision(l||14))
        };
        a.setAnimation=function(p,l){
            l.renderer.globalAnimation=a.pick(p,l.options.chart.animation,!0)
        };
        a.animObject=function(p){
            return a.isObject(p)?a.merge(p):{
                duration:p?500:0
            }
        };
        a.timeUnits={
            millisecond:1,
            second:1E3,
            minute:6E4,
            hour:36E5,
            day:864E5,
            week:6048E5,
            month:24192E5,
            year:314496E5
        };
        a.numberFormat=function(p,l,g,u){
            p=+p||0;
            l=+l;
            var A=a.defaultOptions.lang,
                r=(p.toString().split(".")[1]||"").split("e")[0].length,
                x,
                m,
                b=p.toString().split("e");
            -1===l?l=Math.min(r,
                20):a.isNumber(l)?l&&b[1]&&0>b[1]&&(x=l+ +b[1],
                0<=x?(b[0]=(+b[0]).toExponential(x).split("e")[0],
                    l=x):(b[0]=b[0].split(".")[0]||0,
                    p=20>l?(b[0]*Math.pow(10,
                        b[1])).toFixed(l):0,
                    b[1]=0)):l=2;
            m=(Math.abs(b[1]?b[0]:p)+Math.pow(10,
                -Math.max(l,r)-1)).toFixed(l);
            r=String(a.pInt(m));
            x=3<r.length?r.length%3:0;
            g=a.pick(g,A.decimalPoint);
            u=a.pick(u,A.thousandsSep);
            p=(0>p?"-":"")+(x?r.substr(0,x)+u:"");
            p+=r.substr(x).replace(/(\d{3})(?=\d)/g,"$1"+u);
            l&&(p+=g+m.slice(-l));b[1]&&0!==+p&&(p+="e"+b[1]);
            return p
        };
        Math.easeInOutSine=function(a){
            return-.5*(Math.cos(Math.PI*a)-1)
        };
        a.getStyle=function(p,l,g){
            if("width"===l)
                return Math.max(0,
                    Math.min(
                        p.offsetWidth,
                        p.scrollWidth)-a.getStyle(
                            p,
                    "padding-left")-a.getStyle(p,
    "padding-right"));
            if("height"===l)
                return Math.max(
                    0,
                    Math.min(
                        p.offsetHeight,
                        p.scrollHeight)-a.getStyle(
                            p,
                    "padding-top")-a.getStyle(
                        p,
                    "padding-bottom"));
            G.getComputedStyle||a.error(27,!0);
            if(p=G.getComputedStyle(p,void 0))
                p=p.getPropertyValue(l),
                a.pick(g,
                    "opacity"!==l)&&(p=a.pInt(p));
            return p
        };
        a.inArray=function(p,l,g){
            return(a.indexOfPolyfill||Array.prototype.indexOf).call(l,p,g)
        };
        a.grep=function(p,l){
            return(a.filterPolyfill||Array.prototype.filter).call(p,l)
        };
        a.find=Array.prototype.find?function(a,l){
            return a.find(l)
        }:function(a,l){
            var g,
                u=a.length;
            for(g=0;g<u;g++)
                if(l(a[g],g))
                    return a[g]};
        a.some=function(p,l,g){
            return(a.somePolyfill||Array.prototype.some).call(p,l,g)
        };
        a.map=function(a,l){
            for(var g=[],u=0,A=a.length;u<A;u++)
                g[u]=l.call(a[u],a[u],u,a);
            return g
        };
        a.keys=function(p){
            return(a.keysPolyfill||Object.keys).call(void 0,p)
        };
        a.reduce=function(p,l,g){
            return(a.reducePolyfill||Array.prototype.reduce).apply(p,2<arguments.length?[l,g]:[l])
        };
        a.offset=function(a){
            var l=D.documentElement;
            a=a.parentElement||a.parentNode?a.getBoundingClientRect():{
                top:0,
                left:0
            };
            return{
                top:a.top+(G.pageYOffset||l.scrollTop)-(l.clientTop||0),
                left:a.left+(G.pageXOffset||l.scrollLeft)-(l.clientLeft||0)
            }
        };
        a.stop=function(p,l){
            for(var g=a.timers.length;g--;)
                a.timers[g].elem!==p||l&&l!==a.timers[g].prop||(a.timers[g].stopped=!0)
        };
        a.each=function(p,l,g){
            return(a.forEachPolyfill||Array.prototype.forEach).call(p,l,g)
        };
        a.objectEach=function(a,l,g){
            for(var u in a)
                a.hasOwnProperty(u)&&l.call(g||a[u],a[u],u,a)
        };
        a.addEvent=function(p, l,g,u){
            var A,r=p.addEventListener||a.addEventListenerPolyfill;
            A="function"===typeof p&&p.prototype?p.prototype.protoEvents=p.prototype.protoEvents||{}:p.hcEvents=p.hcEvents||{};
            a.Point&&p instanceof a.Point&&p.series&&p.series.chart&&(p.series.chart.runTrackerClick=!0);
            r&&r.call(p,l,g,!1);
            A[l]||(A[l]=[]);
            A[l].push(g);
            u&&a.isNumber(u.order)&&(g.order=u.order,A[l].sort(function(a,m){
                return a.order-m.order
            }));
            return function(){
                a.removeEvent(p,l,g)
            }
        };
        a.removeEvent=function(p,l,g){
            function u(m,b){
                var d=p.removeEventListener||a.removeEventListenerPolyfill;
                d&&d.call(p,m,b,!1)
            }function A(m){
                var b,d;
                p.nodeName&&(
                    l?(b={},
                    b[l]=!0):b=m,
                    a.objectEach(b,function(a,b){
                        if(m[b])
                            for(d=m[b].length;d--;)
                                u(b,m[b][d])
                    }))
            }
            var r,x;
            a.each(["protoEvents","hcEvents"],
                function(m){
                var b=p[m];
                b&&(
                    l?(r=b[l]||[],
                    g?(x=a.inArray(g,r),
                    -1<x&&(r.splice(x,1),
                        b[l]=r),
                        u(l,g)):(A(b),
                        b[l]=[])):(A(b),
                        p[m]={}))})
        };
        a.fireEvent=function(p,l,g,u){
            var A,r,x,m,b;
            g=g||{};
            D.createEvent&&(p.dispatchEvent||p.fireEvent)?(A=D.createEvent("Events"),
                A.initEvent(l,!0,!0),
                a.extend(A,g),
                p.dispatchEvent?p.dispatchEvent(A):p.fireEvent(l,A)):a.each(["protoEvents","hcEvents"],
                function(d){
                    if(p[d])
                        for(r=p[d][l]||[],x=r.length,g.target||a.extend(g,
                            {preventDefault:function(){
                                g.defaultPrevented=!0
                                },
                                target:p,
                                type:l
                            }),
                                m=0;
                            m<x;
                            m++)(b=r[m])&&!1===b.call(p,g)&&g.preventDefault()
                });
            u&&!g.defaultPrevented&&u.call(p,g)
        };
        a.animate=function(p,l,g){
            var u,
                A="",
                r,
                x,
                m;
            a.isObject(g)||(m=arguments,
                g={
                duration:m[2],
                    easing:m[3],
                    complete:m[4]
            });
            a.isNumber(g.duration)||(g.duration=400);
            g.easing="function"===typeof g.easing?g.easing:Math[g.easing]||Math.easeInOutSine;
            g.curAnim=a.merge(l);a.objectEach(l,function(b,d){a.stop(p,d);
            x=new a.Fx(p,g,d);
            r=null;
            "d"===d?(x.paths=x.initPath(p,
                p.d,
                l.d),
                x.toD=l.d,
                u=0,
                r=1):p.attr?u=p.attr(d):(u=parseFloat(a.getStyle(p,d))||0,
            "opacity"!==d&&(A="px"));
            r||(r=b);
            r&&r.match&&r.match("px")&&(r=r.replace(/px/g,""));
            x.run(u,r,A)
            })
        };
        a.seriesType=function(p,l,g,u,A){
            var r=a.getOptions(),
                x=a.seriesTypes;
            r.plotOptions[p]=a.merge(r.plotOptions[l],g);
            x[p]=a.extendClass(x[l]||function(){},u);
            x[p].prototype.type=p;
            A&&(x[p].prototype.pointClass=a.extendClass(a.Point,A));
            return x[p]
        };
        a.uniqueKey=function(){
            var a=Math.random().toString(36).substring(2,9),
                l=0;
            return function(){
                    return"highcharts-"+a+"-"+l++}
        }();
        G.jQuery&&(G.jQuery.fn.highcharts=function(){
            var p=[].slice.call(arguments);
            if(this[0])return p[0]?(new (a[a.isString(p[0])?p.shift():"Chart"])(this[0],
                p[0],
                p[1]),
                this):C[a.attr(this[0],
                "data-highcharts-chart")
                ]}
                )})(L);
    (function(a){
        var C=a.each,
            D=a.isNumber,
            G=a.map,
            p=a.merge,
            l=a.pInt;
        a.Color=function(g){
            if(!(this instanceof a.Color))
                return new a.Color(g);
            this.init(g)
        };
        a.Color.prototype={
            parsers:[{
                regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse:function(a){
                    return[l(a[1]),
                        l(a[2]),
                        l(a[3]),
                        parseFloat(a[4],10)]}},
                {
                    regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse:function(a){return[l(a[1]),
                        l(a[2]),
                        l(a[3]),
                        1]}
                }],
            names:{
                white:"#ffffff",
                black:"#000000"
            },
            init:function(g){
                var l,
                    A,
                    r,
                    x;
                if((this.input=g=this.names[g&&g.toLowerCase?g.toLowerCase():""]||g)&&g.stops)
                    this.stops=G(g.stops,function(m){
                        return new a.Color(m[1])
                    });
                else if(g&&g.charAt&&"#"===g.charAt()&&(l=g.length,
                    g=parseInt(
                        g.substr(1),
                        16),
                    7===l?A=[(g&16711680)>>16,
                        (g&65280)>>8,
                        g&255,
                        1]:4===l&&(A=[(g&3840)>>4|(g&3840)>>8,
                        (g&240)>>4|g&240,
                        (g&15)<<4|g&15,1])),
                    !A) for(r=this.parsers.length;r--&&!A;)
                        x=this.parsers[r],
                        (l=x.regex.exec(g))&&(A=x.parse(l));
                this.rgba=A||[]},
            get:function(a){
                var g=this.input,
                    l=this.rgba,
                    r;
                this.stops?(r=p(g),
                    r.stops=[].concat(r.stops),
                    C(this.stops,function(g,m){
                        r.stops[m]=[r.stops[m][0],
                            g.get(a)]})):r=l&&D(l[0])?"rgb"===a||!a&&1===l[3]?"rgb("+l[0]+","+l[1]+","+l[2]+")":"a"===a?l[3]:"rgba("+l.join(",")+")":g;
                return r
            },
            brighten:function(a){
                var g,
                    A=this.rgba;
                if(this.stops)C(this.stops,function(g){
                    g.brighten(a)
                });
                else if(D(a)&&0!==a)
                    for(g=0;3>g;g++)
                        A[g]+=l(255*a),
                        0>A[g]&&(A[g]=0),
                        255<A[g]&&(A[g]=255);
                    return this
            },
            setOpacity:function(a){
                this.rgba[3]=a;
                return this
            },
            tweenTo:function(a,l){
                var g=this.rgba,
                    r=a.rgba;
                r.length&&g&&g.length?(a=1!==r[3]||1!==g[3],
                    l=(a?"rgba(":"rgb(")+Math.round(r[0]+(g[0]-r[0])*(1-l))+","+Math.round(r[1]+(g[1]-r[1])*(1-l))+","+Math.round(r[2]+(g[2]-r[2])*(1-l))+(a?","+(r[3]+(g[3]-r[3])*(1-l)):"")+")"):l=a.input||"none";
                return l
            }
        };
        a.color=function(g){
            return new a.Color(g)
        }
    })(L);
    (function(a){
        var C,
            D,
            G=a.addEvent,
            p=a.animate,
            l=a.attr,
            g=a.charts,
            u=a.color,
            A=a.css,
            r=a.createElement,
            x=a.defined,
            m=a.deg2rad,
            b=a.destroyObjectProperties,
            d=a.doc,
            h=a.each,
            f=a.extend,
            c=a.erase,
            e=a.grep,
            w=a.hasTouch,
            y=a.inArray,
            t=a.isArray,
            v=a.isFirefox,
            J=a.isMS,
            n=a.isObject,
            F=a.isString,
            q=a.isWebKit,
            I=a.merge,
            H=a.noop,
            B=a.objectEach,
            z=a.pick,
            k=a.pInt,
            E=a.removeEvent,
            N=a.stop,
            P=a.svg,
            K=a.SVG_NS,
            Q=a.symbolSizes,
            O=a.win;
        C=a.SVGElement=function(){
            return this
        };
        f(C.prototype,{
            opacity:1,
            SVG_NS:K,
            textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init:function(a,c){
                this.element="span"===c?r(c):d.createElementNS(
                    this.SVG_NS,
                    c);
                this.renderer=a
            },
            animate:function(c,k,e){
                k=a.animObject(z(
                    k,
                    this.renderer.globalAnimation,!0));
                0!==k.duration?(e&&(k.complete=e),
                    p(this,c,k)):(this.attr(c,null,e),
                k.step&&k.step.call(this));
                return this
            },
            complexColor:function(c,k,e){
                var M=this.renderer,
                    E,
                    b,
                    f,
                    K,
                    q,
                    z,
                    d,
                    n,
                    w,
                    v,
                    y,
                    N=[],
                    H;
                a.fireEvent(
                    this.renderer,
                    "complexColor",
                    {args:arguments},
                    function(){
                        c.radialGradient?b="radialGradient":c.linearGradient&&(b="linearGradient");
                        b&&(f=c[b],
                            q=M.gradients,
                            d=c.stops,
                            v=e.radialReference,
                        t(f)&&(c[b]=f={
                            x1:f[0],
                            y1:f[1],
                            x2:f[2],
                            y2:f[3],
                            gradientUnits:"userSpaceOnUse"
                        }),
                        "radialGradient"===b&&v&&!x(f.gradientUnits)&&(K=f,f=I(f,M.getRadialAttr(v,K),
                            {gradientUnits:"userSpaceOnUse"
                            })),
                            B(f,function(a,c){
                                "id"!==c&&N.push(c,a)
                            }),
                            B(d,function(a){
                                N.push(a)
                            }),
                            N=N.join(","),
                            q[N]?y=q[N].attr("id"):(f.id=y=a.uniqueKey(),
                                q[N]=z=M.createElement(b).attr(f).add(M.defs),
                                z.radAttr=K,
                                z.stops=[],
                                h(d,function(c){
                                    0===c[1].indexOf("rgba")?(E=a.color(c[1]),
                                        n=E.get("rgb"),
                                        w=E.get("a")):(n=c[1],
                                        w=1);
                                    c=M.createElement("stop").attr({
                                        offset:c[0],
                                        "stop-color":n,
                                        "stop-opacity":w
                                    }).add(z);
                                    z.stops.push(c)
                                })),
                            H="url("+M.url+"#"+y+")",
                            e.setAttribute(k,H),
                            e.gradient=N,
                            c.toString=function(){
                            return H
                        })
                    })},
            applyTextOutline:function(k){
                var e=this.element,
                    M,
                    b,
                    E,
                    f,
                    K;
                -1!==k.indexOf("contrast")&&(k=k.replace(/contrast/g,this.renderer.getContrast(e.style.fill)));
                k=k.split(" ");
                b=k[k.length-1];
                if((E=k[0])&&"none"!==E&&a.svg){
                    this.fakeTS=!0;
                    k=[].slice.call(e.getElementsByTagName("tspan"));
                    this.ySetter=this.xSetter;
                    E=E.replace(/(^[\d\.]+)(.*?)$/g,
                        function(a, c,k){
                        return 2*c+k
                    });
                    for(K=k.length;K--;)
                        M=k[K],
                        "highcharts-text-outline"===M.getAttribute("class")&&c(k,e.removeChild(M));
                    f=e.firstChild;
                    h(k,function(a,c){
                        0===c&&(a.setAttribute("x",
                            e.getAttribute("x")),
                            c=e.getAttribute("y"),
                            a.setAttribute("y",c||0),
                        null===c&&e.setAttribute("y",0));
                        a=a.cloneNode(1);
                        l(a,{
                            "class":"highcharts-text-outline",
                            fill:b,
                            stroke:b,
                            "stroke-width":E,
                            "stroke-linejoin":"round"
                        });
                        e.insertBefore(a,f)})
                }
                },
            attr:function(a,c,k,e){
                var M,
                    E=this.element,
                    b,
                    f=this,
                    K,
                    q;
                "string"===typeof a&& void 0!==c&&(M=a,a={},a[M]=c);
                "string"===typeof a?f=(this[a+"Getter"]||this._defaultGetter).call(this,a,E):(B(a,function(c,k){
                    K=!1;e||N(this,k);
                    this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(k)&&(b||(this.symbolAttr(a),b=!0),K=!0);
                    !this.rotation||"x"!==k&&"y"!==k||(this.doTransform=!0);
                    K||(q=this[k+"Setter"]||this._defaultSetter,q.call(this,c,k,E),
                    this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(k)&&this.updateShadows(k,c,q))
                },
                    this),
                    this.afterSetters());
        k&&k.call(this);
        return f
            },
            afterSetters:function(){
                this.doTransform&&(this.updateTransform(),
                    this.doTransform=!1)
            },
            updateShadows:function(a,c,k){
                for(var e=this.shadows,M=e.length;M--;)
                    k.call(e[M],"height"===a?Math.max(c-(e[M].cutHeight||0),0):"d"===a?this.d:c,a,e[M])
            },
            addClass:function(a,c){
                var k=this.attr("class")||"";
                -1===k.indexOf(a)&&(c||(a=(k+(k?" ":"")+a).replace("  "," ")),
                    this.attr("class",a));
                return this
            },
            hasClass:function(a){
                return-1!==y(a,(
                    this.attr("class")||"").split(" "))
            },
            removeClass:function(a){
                return this.attr("class",
                    (this.attr("class")||"").replace(a,""))
            },
            symbolAttr:function(a){
                var c=this;
                h("x y r start end width height innerR anchorX anchorY".split(" "),
                    function(k){
                    c[k]=z(a[k],c[k])
                });
                c.attr({
                    d:c.renderer.symbols[
                        c.symbolName](
                        c.x,
                        c.y,
                        c.width,
                        c.height,
                        c)
                })
            },
            clip:function(a){
                return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")
            },
            crisp:function(a,c){
                var k;
                c=c||a.strokeWidth||0;
                k=Math.round(c)%2/2;
                a.x=Math.floor(a.x||this.x||0)+k;
                a.y=Math.floor(a.y||this.y||0)+k;
                a.width=Math.floor((a.width||this.width||0)-2*k);
                a.height=Math.floor((a.height||this.height||0)-2*k);
                x(a.strokeWidth)&&(a.strokeWidth=c);
                return a
            },
            css:function(a){
                var c=this.styles,
                    e={},
                    E=this.element,
                    b,
                    M="",
                    K,
                    q=!c,
                    z=["textOutline","textOverflow","width"];
                a&&a.color&&(a.fill=a.color);
                c&&B(a,function(a,k){
                    a!==c[k]&&(e[k]=a,q=!0)
                });
                q&&(c&&(a=f(c,e)),
                a&&(null===a.width||"auto"===a.width?delete this.textWidth:"text"===E.nodeName.toLowerCase()&&a.width&&(b=this.textWidth=k(a.width))),
                    this.styles=a,b&&!P&&this.renderer.forExport&&delete a.width,E.namespaceURI===this.SVG_NS?(K=function(a,c){
                        return"-"+c.toLowerCase()
                },
                    B(a,function(a,c){
                        -1===y(c,z)&&(M+=c.replace(/([A-Z])/g,K)+":"+a+";")
                    }),
                M&&l(E,"style",M)):A(E,a),
                this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),
                a&&a.textOutline&&this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth:function(){
                return this["stroke-width"]||0
            },
            on:function(a,c){
                var k=this,
                    e=k.element;
                w&&"click"===a?(e.ontouchstart=function(a){k.touchEventFired=Date.now();
                a.preventDefault();
                c.call(e,a)
                },
                    e.onclick=function(a){
                    (-1===O.navigator.userAgent.indexOf("Android")||1100<Date.now()-(k.touchEventFired||0))&&c.call(e,a)}):e["on"+a]=c;
                return this
            },
            setRadialReference:function(a){
                var c=this.renderer.gradients[this.element.gradient];
                this.element.radialReference=a;
                c&&c.radAttr&&c.animate(this.renderer.getRadialAttr(a,c.radAttr));
                return this
            },
            translate:function(a,c){
                return this.attr({translateX:a,translateY:c})},
            invert:function(a){
                this.inverted=a;
                this.updateTransform();
                return this
            },
            updateTransform:function(){
                var a=this.translateX||0,
                    c=this.translateY||0,
                    k=this.scaleX,
                    e=this.scaleY,
                    E=this.inverted,
                    b=this.rotation,
                    f=this.matrix,
                    K=this.element;
                E&&(a+=this.width,c+=this.height);
                a=["translate("+a+","+c+")"];
                x(f)&&a.push("matrix("+f.join(",")+")");
                E?a.push("rotate(90) scale(-1,1)"):b&&a.push("rotate("+b+" "+z(this.rotationOriginX,
                    K.getAttribute("x"),
                    0)+" "+z(this.rotationOriginY,
                    K.getAttribute("y")||0)+")");
                (x(k)||x(e))&&a.push("scale("+z(k,1)+" "+z(e,1)+")");
                a.length&&K.setAttribute("transform",a.join(" "))
            },
            toFront:function(){
                var a=this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align:function(a,k,e){
                var E,
                    b,
                    f,
                    M,
                    K={};
                b=this.renderer;
                f=b.alignedObjects;
                var q,
                    d;
                if(a){
                    if(this.alignOptions=a,this.alignByTranslate=k,!e||F(e))
                        this.alignTo=E=e||"renderer",
                            c(f,this),
                            f.push(this),
                            e=null
                }else
                    a=this.alignOptions,
                        k=this.alignByTranslate,
                        E=this.alignTo;
                e=z(e,b[E],b);
                E=a.align;
                b=a.verticalAlign;
                f=(e.x||0)+(a.x||0);
                M=(e.y||0)+(a.y||0);
                "right"===E?q=1:"center"===E&&(q=2);
                q&&(f+=(e.width-(a.width||0))/q);
                K[k?"translateX":"x"]=Math.round(f);
                "bottom"===b?d=1:"middle"===b&&(d=2);
                d&&(M+=(e.height-(a.height||0))/d);
                K[k?"translateY":"y"]=Math.round(M);
                this[this.placed?"animate":"attr"](K);
                this.placed=!0;
                this.alignAttr=K;
                return this
            },
            getBBox:function(a,c){
                var k,
                    e=this.renderer,
                    E,
                    b=this.element,
                    M=this.styles,
                    K,
                    q=this.textStr,
                    d,
                    B=e.cache,
                    n=e.cacheKeys,
                    w;
                c=z(c,this.rotation);
                E=c*m;
                K=M&&M.fontSize;
                x(q)&&(w=q.toString(),
                -1===w.indexOf("\x3c")&&(w=w.replace(/[0-9]/g,"0")),
                    w+=["",c||0,K,this.textWidth,M&&M.textOverflow].join());
                w&&!a&&(k=B[w]);
                if(!k){
                    if(b.namespaceURI===this.SVG_NS||e.forExport){
                        try{
                            (d=this.fakeTS&&function(a){
                                h(b.querySelectorAll(".highcharts-text-outline"),
                                    function(c){
                                    c.style.display=a
                                })})&&d("none"),
                                k=b.getBBox?f({},
                                    b.getBBox()):{
                                width:b.offsetWidth,height:b.offsetHeight
                                },d&&d("")
                        }catch(V){

                        }
                        if(!k||0>k.width)k={
                            width:0,
                            height:0
                        }
                    }else k=this.htmlGetBBox();
                    e.isSVG&&(
                        a=k.width,
                            e=k.height,
                        M&&"11px"===M.fontSize&&17===Math.round(e)&&(k.height=e=14),
                        c&&(k.width=Math.abs(e*Math.sin(E))+Math.abs(a*Math.cos(E)),
                            k.height=Math.abs(e*Math.cos(E))+Math.abs(a* Math.sin(E))));if(w&&0<k.height){for(;250<n.length;)delete B[n.shift()];B[w]||n.push(w);B[w]=k}}return k},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var c=this;c.animate({opacity:0},{duration:a||150,complete:function(){c.attr({y:-9999})}})},add:function(a){var c=this.renderer,k=this.element,e;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&c.buildText(this);this.added=
        !0;if(!a||a.handleZ||this.zIndex)e=this.zIndexSetter();e||(a?a.element:c.box).appendChild(k);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var c=a.parentNode;c&&c.removeChild(a)},destroy:function(){var a=this,k=a.element||{},e=a.renderer.isSVG&&"SPAN"===k.nodeName&&a.parentGroup,E=k.ownerSVGElement,b=a.clipPath;k.onclick=k.onmouseout=k.onmouseover=k.onmousemove=k.point=null;N(a);b&&E&&(h(E.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){var c=a.getAttribute("clip-path"),
        k=b.element.id;(-1<c.indexOf("(#"+k+")")||-1<c.indexOf('("#'+k+'")'))&&a.removeAttribute("clip-path")}),a.clipPath=b.destroy());if(a.stops){for(E=0;E<a.stops.length;E++)a.stops[E]=a.stops[E].destroy();a.stops=null}a.safeRemoveChild(k);for(a.destroyShadows();e&&e.div&&0===e.div.childNodes.length;)k=e.parentGroup,a.safeRemoveChild(e.div),delete e.div,e=k;a.alignTo&&c(a.renderer.alignedObjects,a);B(a,function(c,k){delete a[k]});return null},shadow:function(a,c,k){var e=[],E,b,f=this.element,K,q,M,d;
        if(!a)this.destroyShadows();else if(!this.shadows){q=z(a.width,3);M=(a.opacity||.15)/q;d=this.parentInverted?"(-1,-1)":"("+z(a.offsetX,1)+", "+z(a.offsetY,1)+")";for(E=1;E<=q;E++)b=f.cloneNode(0),K=2*q+1-2*E,l(b,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":M*E,"stroke-width":K,transform:"translate"+d,fill:"none"}),k&&(l(b,"height",Math.max(l(b,"height")-K,0)),b.cutHeight=K),c?c.element.appendChild(b):f.parentNode&&f.parentNode.insertBefore(b,f),e.push(b);this.shadows=e}return this},
    destroyShadows:function(){h(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=z(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,c,k){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[c]!==a&&(k.setAttribute(c,
        a),this[c]=a)},dashstyleSetter:function(a){var c,e=this["stroke-width"];"inherit"===e&&(e=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(c=a.length;c--;)a[c]=k(a[c])*e;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.alignValue=
        a;this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,c,k){this[c]=a;k.setAttribute(c,a)},titleSetter:function(a){var c=this.element.getElementsByTagName("title")[0];c||(c=d.createElementNS(this.SVG_NS,"title"),this.element.appendChild(c));c.firstChild&&c.removeChild(c.firstChild);c.appendChild(d.createTextNode(String(z(a),"").replace(/<[^>]*>/g,"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},textSetter:function(a){a!==this.textStr&&
    (delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,c,k){"string"===typeof a?k.setAttribute(c,a):a&&this.complexColor(a,c,k)},visibilitySetter:function(a,c,k){"inherit"===a?k.removeAttribute(c):this[c]!==a&&k.setAttribute(c,a);this[c]=a},zIndexSetter:function(a,c){var e=this.renderer,E=this.parentGroup,b=(E||e).element||e.box,f,K=this.element,q,d,e=b===e.box;f=this.added;var z;x(a)?(K.setAttribute("data-z-index",a),a=+a,this[c]===a&&(f=!1)):x(this[c])&&
        K.removeAttribute("data-z-index");this[c]=a;if(f){(a=this.zIndex)&&E&&(E.handleZ=!0);c=b.childNodes;for(z=c.length-1;0<=z&&!q;z--)if(E=c[z],f=E.getAttribute("data-z-index"),d=!x(f),E!==K)if(0>a&&d&&!e&&!z)b.insertBefore(K,c[z]),q=!0;else if(k(f)<=a||d&&(!x(a)||0<=a))b.insertBefore(K,c[z+1]||null),q=!0;q||(b.insertBefore(K,c[e?3:0]||null),q=!0)}return q},_defaultSetter:function(a,c,k){k.setAttribute(c,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=
    C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.rotationOriginXSetter=C.prototype.rotationOriginYSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=C.prototype.matrixSetter=function(a,c){this[c]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,c,k){this[c]=a;this.stroke&&this["stroke-width"]?(C.prototype.fillSetter.call(this,this.stroke,"stroke",k),k.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===
    c&&0===a&&this.hasStroke&&(k.removeAttribute("stroke"),this.hasStroke=!1)};D=a.SVGRenderer=function(){this.init.apply(this,arguments)};f(D.prototype,{Element:C,SVG_NS:K,init:function(a,c,k,e,E,b){var f;e=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(e));f=e.element;a.appendChild(f);l(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&l(f,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=f;this.boxWrapper=e;this.alignedObjects=[];this.url=(v||q)&&d.getElementsByTagName("base").length?
        O.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(d.createTextNode("Created with Highstock 6.1.2"));this.defs=this.createElement("defs").add();this.allowHTML=b;this.forExport=E;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(c,k,!1);var K;v&&a.getBoundingClientRect&&(c=function(){A(a,{left:0,top:0});K=a.getBoundingClientRect();A(a,{left:Math.ceil(K.left)-K.left+
            "px",top:Math.ceil(K.top)-K.top+"px"})},c(),this.unSubPixelFix=G(O,"resize",c))},getStyle:function(a){return this.style=f({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();b(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());
        this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var c=new this.Element;c.init(this,a);return c},draw:H,getRadialAttr:function(a,c){return{cx:a[0]-a[2]/2+c.cx*a[2],cy:a[1]-a[2]/2+c.cy*a[2],r:c.r*a[2]}},getSpanWidth:function(a){return a.getBBox(!0).width},applyEllipsis:function(a,c,k,e){var E=a.rotation,b=k,f,K=0,q=k.length,z=function(a){c.removeChild(c.firstChild);a&&c.appendChild(d.createTextNode(a))},B;a.rotation=0;b=this.getSpanWidth(a,c);if(B=
        b>e){for(;K<=q;)f=Math.ceil((K+q)/2),b=k.substring(0,f)+"\u2026",z(b),b=this.getSpanWidth(a,c),K===q?K=q+1:b>e?q=f-1:K=f;0===q&&z("")}a.rotation=E;return B},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var c=a.element,b=this,E=b.forExport,f=z(a.textStr,"").toString(),q=-1!==f.indexOf("\x3c"),w=c.childNodes,n,v=l(c,"x"),t=a.styles,N=a.textWidth,H=t&&t.lineHeight,m=t&&t.textOutline,M=t&&"ellipsis"===t.textOverflow,F=t&&"nowrap"===
        t.whiteSpace,I=t&&t.fontSize,Q,J,g=w.length,t=N&&!a.added&&this.box,r=function(a){var e;e=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:I||b.style.fontSize||12;return H?k(H):b.fontMetrics(e,a.getAttribute("style")?a:c).h},x=function(a,c){B(b.escapes,function(k,e){c&&-1!==y(k,c)||(a=a.toString().replace(new RegExp(k,"g"),e))});return a},O=function(a,c){var k;k=a.indexOf("\x3c");a=a.substring(k,a.indexOf("\x3e")-k);k=a.indexOf(c+"\x3d");if(-1!==k&&(k=k+c.length+1,c=a.charAt(k),'"'===c||"'"===
    c))return a=a.substring(k+1),a.substring(0,a.indexOf(c))};Q=[f,M,F,H,m,I,N].join();if(Q!==a.textCache){for(a.textCache=Q;g--;)c.removeChild(w[g]);q||m||M||N||-1!==f.indexOf(" ")?(t&&t.appendChild(c),f=q?f.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[f],f=e(f,function(a){return""!==a}),h(f,function(k,e){var f,q=0;k=k.replace(/^\s+|\s+$/g,
        "").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");f=k.split("|||");h(f,function(k){if(""!==k||1===f.length){var z={},B=d.createElementNS(b.SVG_NS,"tspan"),w,t;(w=O(k,"class"))&&l(B,"class",w);if(w=O(k,"style"))w=w.replace(/(;| |^)color([ :])/,"$1fill$2"),l(B,"style",w);(t=O(k,"href"))&&!E&&(l(B,"onclick",'location.href\x3d"'+t+'"'),l(B,"class","highcharts-anchor"),A(B,{cursor:"pointer"}));k=x(k.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==k){B.appendChild(d.createTextNode(k));
        q?z.dx=0:e&&null!==v&&(z.x=v);l(B,z);c.appendChild(B);!q&&J&&(!P&&E&&A(B,{display:"block"}),l(B,"dy",r(B)));if(N){z=k.replace(/([^\^])-/g,"$1- ").split(" ");t=1<f.length||e||1<z.length&&!F;var y=[],h,H=r(B),m=a.rotation;for(M&&(n=b.applyEllipsis(a,B,k,N));!M&&t&&(z.length||y.length);)a.rotation=0,h=b.getSpanWidth(a,B),k=h>N,void 0===n&&(n=k),k&&1!==z.length?(B.removeChild(B.firstChild),y.unshift(z.pop())):(z=y,y=[],z.length&&!F&&(B=d.createElementNS(K,"tspan"),l(B,{dy:H,x:v}),w&&l(B,"style",w),c.appendChild(B)),
        h>N&&(N=h+1)),z.length&&B.appendChild(d.createTextNode(z.join(" ").replace(/- /g,"-")));a.rotation=m}q++}}});J=J||c.childNodes.length}),M&&n&&a.attr("title",x(a.textStr,["\x26lt;","\x26gt;"])),t&&t.removeChild(c),m&&a.applyTextOutline&&a.applyTextOutline(m)):c.appendChild(d.createTextNode(x(f)))}},getContrast:function(a){a=u(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,c,k,e,b,E,K,q,z){var d=this.label(a,c,k,z,null,null,null,null,"button"),B=
        0;d.attr(I({padding:8,r:2},b));var w,n,t,v;b=I({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},b);w=b.style;delete b.style;E=I(b,{fill:"#e6e6e6"},E);n=E.style;delete E.style;K=I(b,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},K);t=K.style;delete K.style;q=I(b,{style:{color:"#cccccc"}},q);v=q.style;delete q.style;G(d.element,J?"mouseover":"mouseenter",function(){3!==B&&d.setState(1)});G(d.element,J?"mouseout":"mouseleave",
        function(){3!==B&&d.setState(B)});d.setState=function(a){1!==a&&(d.state=B=a);d.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);d.attr([b,E,K,q][a||0]).css([w,n,t,v][a||0])};d.attr(b).css(f({cursor:"default"},w));return d.on("click",function(a){3!==B&&e.call(d,a)})},crispLine:function(a,c){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-c%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+c%2/2);return a},path:function(a){var c=
        {fill:"none"};t(a)?c.d=a:n(a)&&f(c,a);return this.createElement("path").attr(c)},circle:function(a,c,k){a=n(a)?a:{x:a,y:c,r:k};c=this.createElement("circle");c.xSetter=c.ySetter=function(a,c,k){k.setAttribute("c"+c,a)};return c.attr(a)},arc:function(a,c,k,e,b,E){n(a)?(e=a,c=e.y,k=e.r,a=e.x):e={innerR:e,start:b,end:E};a=this.symbol("arc",a,c,k,k,e);a.r=k;return a},rect:function(a,c,k,e,b,E){b=n(a)?a.r:b;var f=this.createElement("rect");a=n(a)?a:void 0===a?{}:{x:a,y:c,width:Math.max(k,0),height:Math.max(e,
            0)};void 0!==E&&(a.strokeWidth=E,a=f.crisp(a));a.fill="none";b&&(a.r=b);f.rSetter=function(a,c,k){l(k,{rx:a,ry:a})};return f.attr(a)},setSize:function(a,c,k){var e=this.alignedObjects,b=e.length;this.width=a;this.height=c;for(this.boxWrapper.animate({width:a,height:c},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:z(k,!0)?void 0:0});b--;)e[b].align()},g:function(a){var c=this.createElement("g");return a?c.attr({"class":"highcharts-"+a}):c},image:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          c,k,e,b,E){var K={preserveAspectRatio:"none"},q,z=function(a,c){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",c):a.setAttribute("hc-svg-href",c)},d=function(c){z(q.element,a);E.call(q,c)};1<arguments.length&&f(K,{x:c,y:k,width:e,height:b});q=this.createElement("image").attr(K);E?(z(q.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),K=new O.Image,G(K,"load",d),K.src=a,K.complete&&d({})):z(q.element,a);return q},symbol:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             c,k,e,b,E){var K=this,q,B=/^url\((.*?)\)$/,w=B.test(a),n=!w&&(this.symbols[a]?a:"circle"),t=n&&this.symbols[n],v=x(c)&&t&&t.call(this.symbols,Math.round(c),Math.round(k),e,b,E),y,N;t?(q=this.path(v),q.attr("fill","none"),f(q,{symbolName:n,x:c,y:k,width:e,height:b}),E&&f(q,E)):w&&(y=a.match(B)[1],q=this.image(y),q.imgwidth=z(Q[y]&&Q[y].width,E&&E.width),q.imgheight=z(Q[y]&&Q[y].height,E&&E.height),N=function(){q.attr({width:q.width,height:q.height})},h(["width","height"],function(a){q[a+"Setter"]=
        function(a,c){var k={},e=this["img"+c],b="width"===c?"translateX":"translateY";this[c]=a;x(e)&&(this.element&&this.element.setAttribute(c,e),this.alignByTranslate||(k[b]=((this[c]||0)-e)/2,this.attr(k)))}}),x(c)&&q.attr({x:c,y:k}),q.isImg=!0,x(q.imgwidth)&&x(q.imgheight)?N():(q.attr({width:0,height:0}),r("img",{onload:function(){var a=g[K.chartIndex];0===this.width&&(A(this,{position:"absolute",top:"-999em"}),d.body.appendChild(this));Q[y]={width:this.width,height:this.height};q.imgwidth=this.width;
            q.imgheight=this.height;q.element&&N();this.parentNode&&this.parentNode.removeChild(this);K.imgCount--;if(!K.imgCount&&a&&a.onload)a.onload()},src:y}),this.imgCount++));return q},symbols:{circle:function(a,c,k,e){return this.arc(a+k/2,c+e/2,k/2,e/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,c,k,e){return["M",a,c,"L",a+k,c,a+k,c+e,a,c+e,"Z"]},triangle:function(a,c,k,e){return["M",a+k/2,c,"L",a+k,c+e,a,c+e,"Z"]},"triangle-down":function(a,c,k,e){return["M",a,c,"L",a+k,c,a+k/2,c+e,"Z"]},diamond:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               c,k,e){return["M",a+k/2,c,"L",a+k,c+e/2,a+k/2,c+e,a,c+e/2,"Z"]},arc:function(a,c,k,e,b){var E=b.start,f=b.r||k,q=b.r||e||k,K=b.end-.001;k=b.innerR;e=z(b.open,.001>Math.abs(b.end-b.start-2*Math.PI));var d=Math.cos(E),B=Math.sin(E),w=Math.cos(K),K=Math.sin(K);b=.001>b.end-E-Math.PI?0:1;f=["M",a+f*d,c+q*B,"A",f,q,0,b,1,a+f*w,c+q*K];x(k)&&f.push(e?"M":"L",a+k*w,c+k*K,"A",k,k,0,b,0,a+k*d,c+k*B);f.push(e?"":"Z");return f},callout:function(a,c,k,e,b){var E=Math.min(b&&b.r||0,k,e),f=E+6,q=b&&b.anchorX;b=
            b&&b.anchorY;var K;K=["M",a+E,c,"L",a+k-E,c,"C",a+k,c,a+k,c,a+k,c+E,"L",a+k,c+e-E,"C",a+k,c+e,a+k,c+e,a+k-E,c+e,"L",a+E,c+e,"C",a,c+e,a,c+e,a,c+e-E,"L",a,c+E,"C",a,c,a,c,a+E,c];q&&q>k?b>c+f&&b<c+e-f?K.splice(13,3,"L",a+k,b-6,a+k+6,b,a+k,b+6,a+k,c+e-E):K.splice(13,3,"L",a+k,e/2,q,b,a+k,e/2,a+k,c+e-E):q&&0>q?b>c+f&&b<c+e-f?K.splice(33,3,"L",a,b+6,a-6,b,a,b-6,a,c+E):K.splice(33,3,"L",a,e/2,q,b,a,e/2,a,c+E):b&&b>e&&q>a+f&&q<a+k-f?K.splice(23,3,"L",q+6,c+e,q,c+e+6,q-6,c+e,a+E,c+e):b&&0>b&&q>a+f&&q<a+k-
            f&&K.splice(3,3,"L",q-6,c,q,c-6,q+6,c,k-E,c);return K}},clipRect:function(c,k,e,b){var E=a.uniqueKey(),f=this.createElement("clipPath").attr({id:E}).add(this.defs);c=this.rect(c,k,e,b,0).add(f);c.id=E;c.clipPath=f;c.count=0;return c},text:function(a,c,k,e){var b={};if(e&&(this.allowHTML||!this.forExport))return this.html(a,c,k);b.x=Math.round(c||0);k&&(b.y=Math.round(k));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);e||(a.xSetter=function(a,c,k){var e=k.getElementsByTagName("tspan"),b,
        E=k.getAttribute(c),f;for(f=0;f<e.length;f++)b=e[f],b.getAttribute(c)===E&&b.setAttribute(c,a);k.setAttribute(c,a)});return a},fontMetrics:function(a,c){a=a||c&&c.style&&c.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?k(a):/em/.test(a)?parseFloat(a)*(c?this.fontMetrics(null,c.parentNode).f:16):12;c=24>a?a+3:Math.round(1.2*a);return{h:c,b:Math.round(.8*c),f:a}},rotCorr:function(a,c,k){var e=a;c&&k&&(e=Math.max(e*Math.cos(c*m),4));return{x:-a/3*Math.sin(c*m),y:e}},label:function(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           k,e,b,q,K,z,d,B){var w=this,n=w.g("button"!==B&&"label"),t=n.text=w.text("",0,0,z).attr({zIndex:1}),v,y,N=0,H=3,m=0,P,F,Q,J,g,r={},l,O,M=/^url\((.*?)\)$/.test(b),A=M,u,p,U,R;B&&n.addClass("highcharts-"+B);A=M;u=function(){return(l||0)%2/2};p=function(){var a=t.element.style,c={};y=(void 0===P||void 0===F||g)&&x(t.textStr)&&t.getBBox();n.width=(P||y.width||0)+2*H+m;n.height=(F||y.height||0)+2*H;O=H+w.fontMetrics(a&&a.fontSize,t).b;A&&(v||(n.box=v=w.symbols[b]||M?w.symbol(b):w.rect(),v.addClass(("button"===
    B?"":"highcharts-label-box")+(B?" highcharts-"+B+"-box":"")),v.add(n),a=u(),c.x=a,c.y=(d?-O:0)+a),c.width=Math.round(n.width),c.height=Math.round(n.height),v.attr(f(c,r)),r={})};U=function(){var a=m+H,c;c=d?0:O;x(P)&&y&&("center"===g||"right"===g)&&(a+={center:.5,right:1}[g]*(P-y.width));if(a!==t.x||c!==t.y)t.attr("x",a),t.hasBoxWidthChanged&&(y=t.getBBox(!0),p()),void 0!==c&&t.attr("y",c);t.x=a;t.y=c};R=function(a,c){v?v.attr(a,c):r[a]=c};n.onAdd=function(){t.add(n);n.attr({text:c||0===c?c:"",x:k,
        y:e});v&&x(q)&&n.attr({anchorX:q,anchorY:K})};n.widthSetter=function(c){P=a.isNumber(c)?c:null};n.heightSetter=function(a){F=a};n["text-alignSetter"]=function(a){g=a};n.paddingSetter=function(a){x(a)&&a!==H&&(H=n.padding=a,U())};n.paddingLeftSetter=function(a){x(a)&&a!==m&&(m=a,U())};n.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==N&&(N=a,y&&n.attr({x:Q}))};n.textSetter=function(a){void 0!==a&&t.textSetter(a);p();U()};n["stroke-widthSetter"]=function(a,c){a&&(A=!0);l=this["stroke-width"]=
        a;R(c,a)};n.strokeSetter=n.fillSetter=n.rSetter=function(a,c){"r"!==c&&("fill"===c&&a&&(A=!0),n[c]=a);R(c,a)};n.anchorXSetter=function(a,c){q=n.anchorX=a;R(c,Math.round(a)-u()-Q)};n.anchorYSetter=function(a,c){K=n.anchorY=a;R(c,a-J)};n.xSetter=function(a){n.x=a;N&&(a-=N*((P||y.width)+2*H),n["forceAnimate:x"]=!0);Q=Math.round(a);n.attr("translateX",Q)};n.ySetter=function(a){J=n.y=Math.round(a);n.attr("translateY",J)};var S=n.css;return f(n,{css:function(a){if(a){var c={};a=I(a);h(n.textProps,function(k){void 0!==
        a[k]&&(c[k]=a[k],delete a[k])});t.css(c);"width"in c&&p()}return S.call(n,a)},getBBox:function(){return{width:y.width+2*H,height:y.height+2*H,x:y.x-H,y:y.y-H}},shadow:function(a){a&&(p(),v&&v.shadow(a));return n},destroy:function(){E(n.element,"mouseenter");E(n.element,"mouseleave");t&&(t=t.destroy());v&&(v=v.destroy());C.prototype.destroy.call(n);n=w=p=U=R=null}})}});a.Renderer=D})(L);(function(a){var C=a.attr,D=a.createElement,G=a.css,p=a.defined,l=a.each,g=a.extend,u=a.isFirefox,A=a.isMS,r=a.isWebKit,
    x=a.pick,m=a.pInt,b=a.SVGRenderer,d=a.win,h=a.wrap;g(a.SVGElement.prototype,{htmlCss:function(a){var c=this.element;if((c=a&&"SPAN"===c.tagName&&a.width)||this.textWidth&&!c)delete a.width,this.textWidth=c,this.htmlUpdateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=g(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=
        this.renderer,c=this.element,e=this.translateX||0,b=this.translateY||0,d=this.x||0,t=this.y||0,v=this.textAlign||"left",h={left:0,center:.5,right:1}[v],n=this.styles,F=n&&n.whiteSpace;G(c,{marginLeft:e,marginTop:b});this.shadows&&l(this.shadows,function(a){G(a,{marginLeft:e+1,marginTop:b+1})});this.inverted&&l(c.childNodes,function(e){a.invertChild(e,c)});if("SPAN"===c.tagName){var n=this.rotation,q=this.textWidth&&m(this.textWidth),I=[n,v,c.innerHTML,this.textWidth,this.textAlign].join(),H;(H=q!==
        this.oldTextWidth)&&!(H=q>this.oldTextWidth)&&((H=this.textPxLength)||(G(c,{width:"",whiteSpace:F||"nowrap"}),H=c.offsetWidth),H=H>q);H&&/[ \-]/.test(c.textContent||c.innerText)?(G(c,{width:q+"px",display:"block",whiteSpace:F||"normal"}),this.oldTextWidth=q,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;I!==this.cTT&&(F=a.fontMetrics(c.style.fontSize).b,!p(n)||n===(this.oldRotation||0)&&v===this.oldAlign||this.setSpanRotation(n,h,F),this.getSpanCorrection(!p(n)&&this.textPxLength||c.offsetWidth,
        F,h,n,v));G(c,{left:d+(this.xCorr||0)+"px",top:t+(this.yCorr||0)+"px"});this.cTT=I;this.oldRotation=n;this.oldAlign=v}}else this.alignOnAdd=!0},setSpanRotation:function(a,c,e){var b={},f=this.renderer.getTransformKey();b[f]=b.transform="rotate("+a+"deg)";b[f+(u?"Origin":"-origin")]=b.transformOrigin=100*c+"% "+e+"px";G(this.element,b)},getSpanCorrection:function(a,c,e){this.xCorr=-a*e;this.yCorr=-c}});g(b.prototype,{getTransformKey:function(){return A&&!/Edge/.test(d.navigator.userAgent)?"-ms-transform":
        r?"-webkit-transform":u?"MozTransform":d.opera?"-o-transform":""},html:function(a,c,e){var b=this.createElement("span"),f=b.element,d=b.renderer,v=d.isSVG,m=function(a,c){l(["opacity","visibility"],function(e){h(a,e+"Setter",function(a,e,b,q){a.call(this,e,b,q);c[b]=e})});a.addedSetters=!0};b.textSetter=function(a){a!==f.innerHTML&&delete this.bBox;this.textStr=a;f.innerHTML=x(a,"");b.doTransform=!0};v&&m(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=function(a,c){"align"===
    c&&(c="textAlign");b[c]=a;b.doTransform=!0};b.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};b.attr({text:a,x:Math.round(c),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});f.style.whiteSpace="nowrap";b.css=b.htmlCss;v&&(b.add=function(a){var c,e=d.box.parentNode,n=[];if(this.parentGroup=a){if(c=a.div,!c){for(;a;)n.push(a),a=a.parentGroup;l(n.reverse(),function(a){function q(c,k){a[k]=c;"translateX"===
    k?f.left=c+"px":f.top=c+"px";a.doTransform=!0}var f,k=C(a.element,"class");k&&(k={className:k});c=a.div=a.div||D("div",k,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},c||e);f=c.style;g(a,{classSetter:function(a){return function(c){this.element.setAttribute("class",c);a.className=c}}(c),on:function(){n[0].div&&b.on.apply({element:n[0].div},arguments);return a},translateXSetter:q,translateYSetter:q});
        a.addedSetters||m(a,f)})}}else c=e;c.appendChild(f);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}})})(L);(function(a){var C=a.defined,D=a.each,G=a.extend,p=a.merge,l=a.pick,g=a.timeUnits,u=a.win;a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},update:function(a){var g=l(a&&a.useUTC,!0),x=this;this.options=a=p(!0,this.options||{},a);this.Date=a.Date||u.Date;this.timezoneOffset=(this.useUTC=g)&&a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();
        (this.variableTimezone=!(g&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,b){var d=b.getTime(),h=d-x.getTimezoneOffset(b);b.setTime(h);a=b["getUTC"+a]();b.setTime(d);return a},this.set=function(a,b,d){var h;if("Milliseconds"===a||"Seconds"===a||"Minutes"===a&&0===b.getTimezoneOffset()%60)b["set"+a](d);else h=x.getTimezoneOffset(b),h=b.getTime()-h,b.setTime(h),b["setUTC"+a](d),a=x.getTimezoneOffset(b),h=b.getTime()+a,b.setTime(h)}):g?(this.get=function(a,b){return b["getUTC"+
        a]()},this.set=function(a,b,d){return b["setUTC"+a](d)}):(this.get=function(a,b){return b["get"+a]()},this.set=function(a,b,d){return b["set"+a](d)})},makeTime:function(g,r,x,m,b,d){var h,f,c;this.useUTC?(h=this.Date.UTC.apply(0,arguments),f=this.getTimezoneOffset(h),h+=f,c=this.getTimezoneOffset(h),f!==c?h+=c-f:f-36E5!==this.getTimezoneOffset(h-36E5)||a.isSafari||(h-=36E5)):h=(new this.Date(g,r,l(x,1),l(m,0),l(b,0),l(d,0))).getTime();return h},timezoneOffsetFunction:function(){var g=this,r=this.options,
        l=u.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(r.timezone){if(l)return function(a){return 6E4*-l.tz(a,r.timezone).utcOffset()};a.error(25)}return this.useUTC&&r.getTimezoneOffset?function(a){return 6E4*r.getTimezoneOffset(a)}:function(){return 6E4*(g.timezoneOffset||0)}},dateFormat:function(g,l,x){if(!a.defined(l)||isNaN(l))return a.defaultOptions.lang.invalidDate||"";g=a.pick(g,"%Y-%m-%d %H:%M:%S");var m=this,b=new this.Date(l),d=this.get("Hours",b),
        h=this.get("Day",b),f=this.get("Date",b),c=this.get("Month",b),e=this.get("FullYear",b),w=a.defaultOptions.lang,y=w.weekdays,t=w.shortWeekdays,v=a.pad,b=a.extend({a:t?t[h]:y[h].substr(0,3),A:y[h],d:v(f),e:v(f,2," "),w:h,b:w.shortMonths[c],B:w.months[c],m:v(c+1),o:c+1,y:e.toString().substr(2,2),Y:e,H:v(d),k:d,I:v(d%12||12),l:d%12||12,M:v(m.get("Minutes",b)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:v(b.getSeconds()),L:v(Math.round(l%1E3),3)},a.dateFormats);a.objectEach(b,function(a,c){for(;-1!==g.indexOf("%"+
        c);)g=g.replace("%"+c,"function"===typeof a?a.call(m,l):a)});return x?g.substr(0,1).toUpperCase()+g.substr(1):g},getTimeTicks:function(a,r,x,m){var b=this,d=[],h={},f,c=new b.Date(r),e=a.unitRange,w=a.count||1,y;if(C(r)){b.set("Milliseconds",c,e>=g.second?0:w*Math.floor(b.get("Milliseconds",c)/w));e>=g.second&&b.set("Seconds",c,e>=g.minute?0:w*Math.floor(b.get("Seconds",c)/w));e>=g.minute&&b.set("Minutes",c,e>=g.hour?0:w*Math.floor(b.get("Minutes",c)/w));e>=g.hour&&b.set("Hours",c,e>=g.day?0:w*Math.floor(b.get("Hours",
        c)/w));e>=g.day&&b.set("Date",c,e>=g.month?1:w*Math.floor(b.get("Date",c)/w));e>=g.month&&(b.set("Month",c,e>=g.year?0:w*Math.floor(b.get("Month",c)/w)),f=b.get("FullYear",c));e>=g.year&&b.set("FullYear",c,f-f%w);e===g.week&&b.set("Date",c,b.get("Date",c)-b.get("Day",c)+l(m,1));f=b.get("FullYear",c);m=b.get("Month",c);var t=b.get("Date",c),v=b.get("Hours",c);r=c.getTime();b.variableTimezone&&(y=x-r>4*g.month||b.getTimezoneOffset(r)!==b.getTimezoneOffset(x));c=c.getTime();for(r=1;c<x;)d.push(c),c=
        e===g.year?b.makeTime(f+r*w,0):e===g.month?b.makeTime(f,m+r*w):!y||e!==g.day&&e!==g.week?y&&e===g.hour&&1<w?b.makeTime(f,m,t,v+r*w):c+e*w:b.makeTime(f,m,t+r*w*(e===g.day?1:7)),r++;d.push(c);e<=g.hour&&1E4>d.length&&D(d,function(a){0===a%18E5&&"000000000"===b.dateFormat("%H%M%S%L",a)&&(h[a]="day")})}d.info=G(a,{higherRanks:h,totalRange:e*w});return d}}})(L);(function(a){var C=a.color,D=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
    symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,
    chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",
        labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",
            position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:C("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
        pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(C){a.defaultOptions=D(!0,a.defaultOptions,C);
    a.time.update(D(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(D(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(D,p,l){return a.time.dateFormat(D,p,l)}})(L);(function(a){var C=a.correctFloat,D=a.defined,G=a.destroyObjectProperties,p=a.fireEvent,l=a.isNumber,g=a.merge,u=a.pick,A=a.deg2rad;a.Tick=function(a,g,m,b){this.axis=a;this.pos=
    g;this.type=m||"";this.isNewLabel=this.isNew=!0;m||b||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,l=a.options,m=a.chart,b=a.categories,d=a.names,h=this.pos,f=l.labels,c=a.tickPositions,e=h===c[0],w=h===c[c.length-1],d=b?u(b[h],d[h],h):h,b=this.label,c=c.info,y;a.isDatetimeAxis&&c&&(y=l.dateTimeLabelFormats[c.higherRanks[h]||c.unitName]);this.isFirst=e;this.isLast=w;l={axis:a,chart:m,isFirst:e,isLast:w,dateTimeLabelFormat:y,value:a.isLog?C(a.lin2log(d)):d,pos:h};l=a.labelFormatter.call(l,
        l);if(D(b))b&&b.attr({text:l});else{if(this.label=b=D(l)&&f.enabled?m.renderer.text(l,0,0,f.useHTML).css(g(f.style)).add(a.labelGroup):null)b.textPxLength=b.getBBox().width;this.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var g=this.axis,m=g.options.labels,b=a.x,d=g.chart.chartWidth,h=g.chart.spacing,f=u(g.labelLeft,Math.min(g.pos,h[3])),h=u(g.labelRight,Math.max(g.isRadial?0:g.pos+g.len,d-h[1])),c=this.label,
        e=this.rotation,w={left:0,center:.5,right:1}[g.labelAlign||c.attr("align")],y=c.getBBox().width,t=g.getSlotWidth(this),v=t,J=1,n,F={};if(e||!1===m.overflow)0>e&&b-w*y<f?n=Math.round(b/Math.cos(e*A)-f):0<e&&b+w*y>h&&(n=Math.round((d-b)/Math.cos(e*A)));else if(d=b+(1-w)*y,b-w*y<f?v=a.x+v*(1-w)-f:d>h&&(v=h-a.x+v*w,J=-1),v=Math.min(t,v),v<t&&"center"===g.labelAlign&&(a.x+=J*(t-v-w*(t-Math.min(y,v)))),y>v||g.autoRotation&&(c.styles||{}).width)n=v;n&&(F.width=n,(m.style||{}).textOverflow||(F.textOverflow=
        "ellipsis"),c.css(F))},getPosition:function(g,l,m,b){var d=this.axis,h=d.chart,f=b&&h.oldChartHeight||h.chartHeight;g={x:g?a.correctFloat(d.translate(l+m,null,null,b)+d.transB):d.left+d.offset+(d.opposite?(b&&h.oldChartWidth||h.chartWidth)-d.right-d.left:0),y:g?f-d.bottom+d.offset-(d.opposite?d.height:0):a.correctFloat(f-d.translate(l+m,null,null,b)-d.transB)};p(this,"afterGetPosition",{pos:g});return g},getLabelPosition:function(a,g,m,b,d,h,f,c){var e=this.axis,w=e.transA,y=e.reversed,t=e.staggerLines,
        v=e.tickRotCorr||{x:0,y:0},J=d.y,n=b||e.reserveSpaceDefault?0:-e.labelOffset*("center"===e.labelAlign?.5:1),F={};D(J)||(J=0===e.side?m.rotation?-8:-m.getBBox().height:2===e.side?v.y+8:Math.cos(m.rotation*A)*(v.y-m.getBBox(!1,0).height/2));a=a+d.x+n+v.x-(h&&b?h*w*(y?-1:1):0);g=g+J-(h&&!b?h*w*(y?1:-1):0);t&&(m=f/(c||1)%t,e.opposite&&(m=t-m-1),g+=e.labelOffset/t*m);F.x=a;F.y=Math.round(g);p(this,"afterGetLabelPosition",{pos:F});return F},getMarkPath:function(a,g,m,b,d,h){return h.crispLine(["M",a,g,
        "L",a+(d?0:-m),g+(d?m:0)],b)},renderGridLine:function(a,g,m){var b=this.axis,d=b.options,h=this.gridLine,f={},c=this.pos,e=this.type,w=b.tickmarkOffset,y=b.chart.renderer,t=e?e+"Grid":"grid",v=d[t+"LineWidth"],J=d[t+"LineColor"],d=d[t+"LineDashStyle"];h||(f.stroke=J,f["stroke-width"]=v,d&&(f.dashstyle=d),e||(f.zIndex=1),a&&(f.opacity=0),this.gridLine=h=y.path().attr(f).addClass("highcharts-"+(e?e+"-":"")+"grid-line").add(b.gridGroup));if(!a&&h&&(a=b.getPlotLinePath(c+w,h.strokeWidth()*m,a,!0)))h[this.isNew?
        "attr":"animate"]({d:a,opacity:g})},renderMark:function(a,g,m){var b=this.axis,d=b.options,h=b.chart.renderer,f=this.type,c=f?f+"Tick":"tick",e=b.tickSize(c),w=this.mark,y=!w,t=a.x;a=a.y;var v=u(d[c+"Width"],!f&&b.isXAxis?1:0),d=d[c+"Color"];e&&(b.opposite&&(e[0]=-e[0]),y&&(this.mark=w=h.path().addClass("highcharts-"+(f?f+"-":"")+"tick").add(b.axisGroup),w.attr({stroke:d,"stroke-width":v})),w[y?"attr":"animate"]({d:this.getMarkPath(t,a,e[0],w.strokeWidth()*m,b.horiz,h),opacity:g}))},renderLabel:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     g,m,b){var d=this.axis,h=d.horiz,f=d.options,c=this.label,e=f.labels,w=e.step,d=d.tickmarkOffset,y=!0,t=a.x;a=a.y;c&&l(t)&&(c.xy=a=this.getLabelPosition(t,a,c,h,e,d,b,w),this.isFirst&&!this.isLast&&!u(f.showFirstLabel,1)||this.isLast&&!this.isFirst&&!u(f.showLastLabel,1)?y=!1:!h||e.step||e.rotation||g||0===m||this.handleOverflow(a),w&&b%w&&(y=!1),y&&l(a.y)?(a.opacity=m,c[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(c.attr("y",-9999),this.isNewLabel=!0))},render:function(g,l,m){var b=
        this.axis,d=b.horiz,h=this.getPosition(d,this.pos,b.tickmarkOffset,l),f=h.x,c=h.y,b=d&&f===b.pos+b.len||!d&&c===b.pos?-1:1;m=u(m,1);this.isActive=!0;this.renderGridLine(l,m,b);this.renderMark(h,m,b);this.renderLabel(h,l,m,g);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){G(this,this.axis)}}})(L);var ea=function(a){var C=a.addEvent,D=a.animObject,G=a.arrayMax,p=a.arrayMin,l=a.color,g=a.correctFloat,u=a.defaultOptions,A=a.defined,r=a.deg2rad,x=a.destroyObjectProperties,m=a.each,b=
    a.extend,d=a.fireEvent,h=a.format,f=a.getMagnitude,c=a.grep,e=a.inArray,w=a.isArray,y=a.isNumber,t=a.isString,v=a.merge,J=a.normalizeTickInterval,n=a.objectEach,F=a.pick,q=a.removeEvent,I=a.splat,H=a.syncTimeout,B=a.Tick,z=function(){this.init.apply(this,arguments)};a.extend(z.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,x:0,style:{color:"#666666",
                cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,
        tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},
    defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var k=c.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!k:k;b.isXAxis=k;b.coll=b.coll||(k?"xAxis":"yAxis");d(this,"init",{userOptions:c});b.opposite=c.opposite;b.side=c.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(c);var E=this.options,f=E.type;b.labelFormatter=E.labels.formatter||b.defaultLabelFormatter;b.userOptions=c;b.minPixelPadding=0;b.reversed=E.reversed;b.visible=!1!==E.visible;
        b.zoomEnabled=!1!==E.zoomEnabled;b.hasNames="category"===f||!0===E.categories;b.categories=E.categories||b.hasNames;b.names||(b.names=[],b.names.keys={});b.plotLinesAndBandsGroups={};b.isLog="logarithmic"===f;b.isDatetimeAxis="datetime"===f;b.positiveValuesOnly=b.isLog&&!b.allowNegativeLog;b.isLinked=A(E.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands={};b.len=0;b.minRange=b.userMinRange=E.minRange||E.maxZoom;b.range=E.range;b.offset=E.offset||0;b.stacks=
            {};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=F(E.crosshair,I(a.options.tooltip.crosshairs)[k?0:1],!1);c=b.options.events;-1===e(b,a.axes)&&(k?a.axes.splice(a.xAxis.length,0,b):a.axes.push(b),a[b.coll].push(b));b.series=b.series||[];a.inverted&&!b.isZAxis&&k&&void 0===b.reversed&&(b.reversed=!0);n(c,function(a,c){C(b,c,a)});b.lin2log=E.linearToLogConverter||b.lin2log;b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log);d(this,"afterInit")},setOptions:function(a){this.options=
        v(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],v(u[this.coll],a));d(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var c=this.axis,e=this.value,b=c.chart.time,f=c.categories,q=this.dateTimeLabelFormat,d=u.lang,z=d.numericSymbols,d=d.numericSymbolMagnitude||1E3,B=z&&z.length,n,t=c.options.labels.format,c=c.isLog?Math.abs(e):c.tickInterval;
        if(t)n=h(t,this,b);else if(f)n=e;else if(q)n=b.dateFormat(q,e);else if(B&&1E3<=c)for(;B--&&void 0===n;)b=Math.pow(d,B+1),c>=b&&0===10*e%b&&null!==z[B]&&0!==e&&(n=a.numberFormat(e/b,-1)+z[B]);void 0===n&&(n=1E4<=Math.abs(e)?a.numberFormat(e,-1):a.numberFormat(e,-1,void 0,""));return n},getSeriesExtremes:function(){var a=this,e=a.chart;d(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();m(a.series,
        function(k){if(k.visible||!e.options.chart.ignoreHiddenSeries){var b=k.options,E=b.threshold,f;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=E&&(E=null);if(a.isXAxis)b=k.xData,b.length&&(k=p(b),f=G(b),y(k)||k instanceof Date||(b=c(b,y),k=p(b),f=G(b)),b.length&&(a.dataMin=Math.min(F(a.dataMin,b[0],k),k),a.dataMax=Math.max(F(a.dataMax,b[0],f),f)));else if(k.getExtremes(),f=k.dataMax,k=k.dataMin,A(k)&&A(f)&&(a.dataMin=Math.min(F(a.dataMin,k),k),a.dataMax=Math.max(F(a.dataMax,f),f)),A(E)&&(a.threshold=
            E),!b.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});d(this,"afterGetSeriesExtremes")},translate:function(a,c,e,b,f,q){var k=this.linkedParent||this,E=1,K=0,d=b?k.oldTransA:k.transA;b=b?k.oldMin:k.min;var z=k.minPixelPadding;f=(k.isOrdinal||k.isBroken||k.isLog&&f)&&k.lin2val;d||(d=k.transA);e&&(E*=-1,K=k.len);k.reversed&&(E*=-1,K-=E*(k.sector||k.len));c?(a=(a*E+K-z)/d+b,f&&(a=k.lin2val(a))):(f&&(a=k.val2lin(a)),a=y(b)?E*(a-b)*d+K+E*z+(y(q)?d*q:0):void 0);return a},toPixels:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                c){return this.translate(a,!1,!this.horiz,null,!0)+(c?0:this.pos)},toValue:function(a,c){return this.translate(a-(c?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,c,b,e,f){var k=this.chart,E=this.left,q=this.top,K,d,z=b&&k.oldChartHeight||k.chartHeight,B=b&&k.oldChartWidth||k.chartWidth,n;K=this.transB;var t=function(a,c,k){if(a<c||a>k)e?a=Math.min(Math.max(c,a),k):n=!0;return a};f=F(f,this.translate(a,null,null,b));f=Math.min(Math.max(-1E5,f),1E5);a=b=Math.round(f+K);K=d=Math.round(z-
        f-K);y(f)?this.horiz?(K=q,d=z-this.bottom,a=b=t(a,E,E+this.width)):(a=E,b=B-this.right,K=d=t(K,q,q+this.height)):(n=!0,e=!1);return n&&!e?null:k.renderer.crispLine(["M",a,K,"L",b,d],c||1)},getLinearTickPositions:function(a,c,b){var k,e=g(Math.floor(c/a)*a);b=g(Math.ceil(b/a)*a);var E=[],f;g(e+a)===e&&(f=20);if(this.single)return[c];for(c=e;c<=b;){E.push(c);c=g(c+a,f);if(c===k)break;k=c}return E},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?F(a.minorTickInterval,"auto"):
        !1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,c=a.options,b=a.tickPositions,e=a.minorTickInterval,f=[],q=a.pointRangePadding||0,d=a.min-q,q=a.max+q,z=q-d;if(z&&z/e<a.len/3)if(a.isLog)m(this.paddedTicks,function(c,k,b){k&&f.push.apply(f,a.getLogTickPositions(e,b[k-1],b[k],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())f=f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e),d,q,c.startOfWeek));else for(c=d+(b[0]-d)%e;c<=q&&c!==f[0];c+=
        e)f.push(c);0!==f.length&&a.trimTicks(f);return f},adjustForMinRange:function(){var a=this.options,c=this.min,b=this.max,e,f,q,d,z,B,n,t;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(A(a.min)||A(a.max)?this.minRange=null:(m(this.series,function(a){B=a.xData;for(d=n=a.xIncrement?1:B.length-1;0<d;d--)if(z=B[d]-B[d-1],void 0===q||z<q)q=z}),this.minRange=Math.min(5*q,this.dataMax-this.dataMin)));b-c<this.minRange&&(f=this.dataMax-this.dataMin>=this.minRange,t=this.minRange,e=(t-b+c)/2,e=[c-e,F(a.min,
        c-e)],f&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),c=G(e),b=[c+t,F(a.max,c+t)],f&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=p(b),b-c<t&&(e[0]=b-t,e[1]=F(a.min,b-t),c=G(e)));this.min=c;this.max=b},getClosest:function(){var a;this.categories?a=1:m(this.series,function(c){var k=c.closestPointRange,b=c.visible||!c.chart.options.chart.ignoreHiddenSeries;!c.noSharedTooltip&&A(k)&&b&&(a=A(a)?Math.min(a,k):k)});return a},nameToX:function(a){var c=w(this.categories),b=c?this.categories:
        this.names,k=a.options.x,f;a.series.requireSorting=!1;A(k)||(k=!1===this.options.uniqueNames?a.series.autoIncrement():c?e(a.name,b):F(b.keys[a.name],-1));-1===k?c||(f=b.length):f=k;void 0!==f&&(this.names[f]=a.name,this.names.keys[a.name]=f);return f},updateNames:function(){var c=this,b=this.names;0<b.length&&(m(a.keys(b.keys),function(a){delete b.keys[a]}),b.length=0,this.minRange=this.userMinRange,m(this.series||[],function(a){a.xIncrement=null;if(!a.points||a.isDirtyData)a.processData(),a.generatePoints();
        m(a.points,function(b,k){var e;b.options&&(e=c.nameToX(b),void 0!==e&&e!==b.x&&(b.x=e,a.xData[k]=e))})}))},setAxisTranslation:function(a){var c=this,b=c.max-c.min,e=c.axisPointRange||0,k,f=0,q=0,z=c.linkedParent,B=!!c.categories,n=c.transA,v=c.isXAxis;if(v||B||e)k=c.getClosest(),z?(f=z.minPointOffset,q=z.pointRangePadding):m(c.series,function(a){var b=B?1:v?F(a.options.pointRange,k,0):c.axisPointRange||0;a=a.options.pointPlacement;e=Math.max(e,b);c.single||(f=Math.max(f,t(a)?0:b/2),q=Math.max(q,"on"===
    a?0:b))}),z=c.ordinalSlope&&k?c.ordinalSlope/k:1,c.minPointOffset=f*=z,c.pointRangePadding=q*=z,c.pointRange=Math.min(e,b),v&&(c.closestPointRange=k);a&&(c.oldTransA=n);c.translationSlope=c.transA=n=c.options.staticScale||c.len/(b+q||1);c.transB=c.horiz?c.left:c.bottom;c.minPixelPadding=n*f;d(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(c){var b=this,e=b.chart,k=b.options,q=b.isLog,z=b.isDatetimeAxis,B=b.isXAxis,n=b.isLinked,t=k.maxPadding,
        v=k.minPadding,w=k.tickInterval,h=k.tickPixelInterval,H=b.categories,I=y(b.threshold)?b.threshold:null,l=b.softThreshold,r,x,u,p;z||H||n||this.getTickAmount();u=F(b.userMin,k.min);p=F(b.userMax,k.max);n?(b.linkedParent=e[b.coll][k.linkedTo],e=b.linkedParent.getExtremes(),b.min=F(e.min,e.dataMin),b.max=F(e.max,e.dataMax),k.type!==b.linkedParent.options.type&&a.error(11,1)):(!l&&A(I)&&(b.dataMin>=I?(r=I,v=0):b.dataMax<=I&&(x=I,t=0)),b.min=F(u,r,b.dataMin),b.max=F(p,x,b.dataMax));q&&(b.positiveValuesOnly&&
    !c&&0>=Math.min(b.min,F(b.dataMin,b.min))&&a.error(10,1),b.min=g(b.log2lin(b.min),15),b.max=g(b.log2lin(b.max),15));b.range&&A(b.max)&&(b.userMin=b.min=u=Math.max(b.dataMin,b.minFromRange()),b.userMax=p=b.max,b.range=null);d(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();!(H||b.axisPointRange||b.usePercentage||n)&&A(b.min)&&A(b.max)&&(e=b.max-b.min)&&(!A(u)&&v&&(b.min-=e*v),!A(p)&&t&&(b.max+=e*t));y(k.softMin)&&!y(b.userMin)&&(b.min=Math.min(b.min,k.softMin));y(k.softMax)&&
    !y(b.userMax)&&(b.max=Math.max(b.max,k.softMax));y(k.floor)&&(b.min=Math.max(b.min,k.floor));y(k.ceiling)&&(b.max=Math.min(b.max,k.ceiling));l&&A(b.dataMin)&&(I=I||0,!A(u)&&b.min<I&&b.dataMin>=I?b.min=I:!A(p)&&b.max>I&&b.dataMax<=I&&(b.max=I));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:n&&!w&&h===b.linkedParent.options.tickPixelInterval?w=b.linkedParent.tickInterval:F(w,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,H?1:(b.max-b.min)*h/Math.max(b.len,h));B&&
    !c&&m(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!w&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));c=F(k.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!w&&b.tickInterval<c&&(b.tickInterval=c);z||q||w||(b.tickInterval=J(b.tickInterval,null,f(b.tickInterval),F(k.allowDecimals,
        !(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,c,b=a.tickPositions;c=this.getMinorTickInterval();var e=a.tickPositioner,f=a.startOnTick,q=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===c&&this.tickInterval?this.tickInterval/5:c;this.single=this.min===this.max&&
        A(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=c=b&&b.slice();!c&&(c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()],c[0]===c[1]&&(c.length=
        1)),this.tickPositions=c,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=c=e);this.paddedTicks=c.slice(0);this.trimTicks(c,f,q);this.isLinked||(this.single&&2>c.length&&(this.min-=.5,this.max+=.5),b||e||this.adjustTickAmount());d(this,"afterSetTickPositions")},trimTicks:function(a,c,b){var e=a[0],k=a[a.length-1],f=this.minPointOffset||0;if(!this.isLinked){if(c&&-Infinity!==e)this.min=e;else for(;this.min-f>a[0];)a.shift();if(b)this.max=k;else for(;this.max+f<a[a.length-1];)a.pop();
        0===a.length&&A(e)&&!this.options.tickPositions&&a.push((k+e)/2)}},alignToOthers:function(){var a={},c,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||!1===b.startOnTick||!1===b.endOnTick||this.isLog||m(this.chart[this.coll],function(b){var e=b.options,e=[b.horiz?e.left:e.top,e.width,e.height,e.pane].join();b.series.length&&(a[e]?c=!0:a[e]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!A(a.tickInterval)&&this.len<b&&!this.isRadial&&
    !this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=c},adjustTickAmount:function(){var a=this.tickInterval,c=this.tickPositions,b=this.tickAmount,e=this.finalTickAmt,f=c&&c.length,q=F(this.threshold,this.softThreshold?0:null);if(this.hasData()){if(f<b){for(;c.length<b;)c.length%2||this.min===q?c.push(g(c[c.length-1]+a)):c.unshift(g(c[0]-a));this.transA*=(f-1)/(b-1);this.min=c[0];this.max=c[c.length-1]}else f>
    b&&(this.tickInterval*=2,this.setTickPositions());if(A(e)){for(a=b=c.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<b-1)&&c.splice(a,1);this.finalTickAmt=void 0}}},setScale:function(){var a,c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();c=this.len!==this.oldAxisLength;m(this.series,function(c){if(c.isDirtyData||c.isDirty||c.xAxis.isDirty)a=!0});c||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?
        (this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();d(this,"afterSetScale")},setExtremes:function(a,c,e,f,q){var k=this,z=k.chart;e=F(e,!0);m(k.series,function(a){delete a.kdTree});q=b(q,{min:a,max:c});d(k,"setExtremes",q,function(){k.userMin=a;k.userMax=c;k.eventArgs=q;e&&
    z.redraw(f)})},zoom:function(a,c){var b=this.dataMin,e=this.dataMax,k=this.options,f=Math.min(b,F(k.min,b)),k=Math.max(e,F(k.max,e));if(a!==this.min||c!==this.max)this.allowZoomOutside||(A(b)&&(a<f&&(a=f),a>k&&(a=k)),A(e)&&(c<f&&(c=f),c>k&&(c=k))),this.displayBtn=void 0!==a||void 0!==c,this.setExtremes(a,c,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var c=this.chart,b=this.options,e=b.offsets||[0,0,0,0],f=this.horiz,q=this.width=Math.round(a.relativeLength(F(b.width,c.plotWidth-e[3]+
        e[1]),c.plotWidth)),d=this.height=Math.round(a.relativeLength(F(b.height,c.plotHeight-e[0]+e[2]),c.plotHeight)),z=this.top=Math.round(a.relativeLength(F(b.top,c.plotTop+e[0]),c.plotHeight,c.plotTop)),b=this.left=Math.round(a.relativeLength(F(b.left,c.plotLeft+e[3]),c.plotWidth,c.plotLeft));this.bottom=c.chartHeight-d-z;this.right=c.chartWidth-q-b;this.len=Math.max(f?q:d,0);this.pos=f?b:z},getExtremes:function(){var a=this.isLog;return{min:a?g(this.lin2log(this.min)):this.min,max:a?g(this.lin2log(this.max)):
            this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var c=this.isLog,b=c?this.lin2log(this.min):this.min,c=c?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=b:Infinity===a?a=c:b>a?a=b:c<a&&(a=c);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(F(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var c=this.options,b=c[a+"Length"],e=F(c[a+"Width"],"tick"===
    a&&this.isXAxis?1:0);if(e&&b)return"inside"===c[a+"Position"]&&(b=-b),[b,e]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,b=this.tickInterval,e=b,f=this.len/(((this.categories?1:0)+this.max-this.min)/b),q,d=a.rotation,z=this.labelMetrics(),B,n=Number.MAX_VALUE,t,v=function(a){a/=
        f||1;a=1<a?Math.ceil(a):1;return g(a*b)};c?(t=!a.staggerLines&&!a.step&&(A(d)?[d]:f<F(a.autoRotationLimit,80)&&a.autoRotation))&&m(t,function(a){var c;if(a===d||a&&-90<=a&&90>=a)B=v(Math.abs(z.h/Math.sin(r*a))),c=B+Math.abs(a/360),c<n&&(n=c,q=a,e=B)}):a.step||(e=v(z.h));this.autoRotation=t;this.labelRotation=F(q,d);return e},getSlotWidth:function(){var a=this.chart,c=this.horiz,b=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),f=a.margin[3];return c&&2>(b.step||0)&&
        !b.rotation&&(this.staggerLines||1)*this.len/e||!c&&(b.style&&parseInt(b.style.width,10)||f&&f-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,c=a.renderer,b=this.tickPositions,e=this.ticks,f=this.options.labels,q=f&&f.style||{},d=this.horiz,z=this.getSlotWidth(),B=Math.max(1,Math.round(z-2*(f.padding||5))),n={},v=this.labelMetrics(),w=f.style&&f.style.textOverflow,y,h,H=0,I;t(f.rotation)||(n.rotation=f.rotation||0);m(b,function(a){(a=e[a])&&a.label&&a.label.textPxLength>
    H&&(H=a.label.textPxLength)});this.maxLabelLength=H;if(this.autoRotation)H>B&&H>v.h?n.rotation=this.labelRotation:this.labelRotation=0;else if(z&&(y=B,!w))for(h="clip",B=b.length;!d&&B--;)if(I=b[B],I=e[I].label)I.styles&&"ellipsis"===I.styles.textOverflow?I.css({textOverflow:"clip"}):I.textPxLength>z&&I.css({width:z+"px"}),I.getBBox().height>this.len/b.length-(v.h-v.f)&&(I.specificTextOverflow="ellipsis");n.rotation&&(y=H>.5*a.chartHeight?.33*a.chartHeight:H,w||(h="ellipsis"));if(this.labelAlign=
        f.align||this.autoLabelAlign(this.labelRotation))n.align=this.labelAlign;m(b,function(a){var c=(a=e[a])&&a.label,b=q.width,k={};c&&(c.attr(n),y&&!b&&"nowrap"!==q.whiteSpace&&(y<c.textPxLength||"SPAN"===c.element.tagName)?(k.width=y,w||(k.textOverflow=c.specificTextOverflow||h),c.css(k)):c.styles&&c.styles.width&&!k.width&&!b&&c.css({width:null}),delete c.specificTextOverflow,a.rotation=n.rotation)});this.tickRotCorr=c.rotCorr(v.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||
        A(this.min)&&A(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var c=this.chart.renderer,b=this.horiz,e=this.opposite,k=this.options.title,f;this.axisTitle||((f=k.textAlign)||(f=(b?{low:"left",middle:"center",high:"right"}:{low:e?"right":"left",middle:"center",high:e?"left":"right"})[k.align]),this.axisTitle=c.text(k.text,0,0,k.useHTML).attr({zIndex:7,rotation:k.rotation||0,align:f}).addClass("highcharts-axis-title").css(v(k.style)).add(this.axisGroup),this.axisTitle.isNew=
        !0);k.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var c=this.ticks;c[a]?c[a].addLabel():c[a]=new B(this,a)},getOffset:function(){var a=this,c=a.chart,b=c.renderer,e=a.options,f=a.tickPositions,q=a.ticks,z=a.horiz,B=a.side,t=c.inverted&&!a.isZAxis?[1,0,3,2][B]:B,v,w,y=0,h,H=0,I=e.title,g=e.labels,J=0,l=c.axisOffset,c=c.clipOffset,r=[-1,1,1,-1][B],x=e.className,u=a.axisParent,p=this.tickSize("tick");v=a.hasData();a.showAxis=
        w=v||F(e.showEmpty,!0);a.staggerLines=a.horiz&&g.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(x||"")).add(u),a.axisGroup=b.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(x||"")).add(u),a.labelGroup=b.g("axis-labels").attr({zIndex:g.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(x||"")).add(u));v||a.isLinked?(m(f,function(c,b){a.generateTick(c,
        b)}),a.renderUnsquish(),a.reserveSpaceDefault=0===B||2===B||{1:"left",3:"right"}[B]===a.labelAlign,F(g.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&m(f,function(a){J=Math.max(q[a].getLabelSize(),J)}),a.staggerLines&&(J*=a.staggerLines),a.labelOffset=J*(a.opposite?-1:1)):n(q,function(a,c){a.destroy();delete q[c]});I&&I.text&&!1!==I.enabled&&(a.addTitle(w),w&&!1!==I.reserveSpace&&(a.titleOffset=y=a.axisTitle.getBBox()[z?"height":"width"],h=I.offset,H=A(h)?0:F(I.margin,z?5:10)));
        a.renderLine();a.offset=r*F(e.offset,l[B]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===B?-a.labelMetrics().h:2===B?a.tickRotCorr.y:0;H=Math.abs(J)+H;J&&(H=H-b+r*(z?F(g.y,a.tickRotCorr.y+8*r):g.x));a.axisTitleMargin=F(h,H);l[B]=Math.max(l[B],a.axisTitleMargin+y+r*a.offset,H,v&&f.length&&p?p[0]+r*a.offset:0);e=e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[t]=Math.max(c[t],e);d(this,"afterGetOffset")},getLinePath:function(a){var c=this.chart,b=this.opposite,e=this.offset,k=this.horiz,f=this.left+
        (b?this.width:0)+e,e=c.chartHeight-this.bottom-(b?this.height:0)+e;b&&(a*=-1);return c.renderer.crispLine(["M",k?this.left:f,k?e:this.top,"L",k?c.chartWidth-this.right:f,k?e:c.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,c=this.left,b=this.top,
        e=this.len,f=this.options.title,q=a?c:b,z=this.opposite,d=this.offset,B=f.x||0,n=f.y||0,t=this.axisTitle,v=this.chart.renderer.fontMetrics(f.style&&f.style.fontSize,t),t=Math.max(t.getBBox(null,0).height-v.h-1,0),e={low:q+(a?0:e),middle:q+e/2,high:q+(a?e:0)}[f.align],c=(a?b+this.height:c)+(a?1:-1)*(z?-1:1)*this.axisTitleMargin+[-t,t,v.f,-t][this.side];return{x:a?e+B:c+(z?this.width:0)+d+B,y:a?c+n-(z?this.height:0)+d:e+n}},renderMinorTick:function(a){var c=this.chart.hasRendered&&y(this.oldMin),b=
        this.minorTicks;b[a]||(b[a]=new B(this,a,"minor"));c&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1)},renderTick:function(a,c){var b=this.isLinked,e=this.ticks,k=this.chart.hasRendered&&y(this.oldMin);if(!b||a>=this.min&&a<=this.max)e[a]||(e[a]=new B(this,a)),k&&e[a].isNew&&e[a].render(c,!0,.1),e[a].render(c)},render:function(){var c=this,b=c.chart,e=c.options,f=c.isLog,q=c.isLinked,z=c.tickPositions,t=c.axisTitle,v=c.ticks,w=c.minorTicks,h=c.alternateBands,I=e.stackLabels,F=e.alternateGridColor,
        g=c.tickmarkOffset,J=c.axisLine,l=c.showAxis,r=D(b.renderer.globalAnimation),x,u;c.labelEdge.length=0;c.overlap=!1;m([v,w,h],function(a){n(a,function(a){a.isActive=!1})});if(c.hasData()||q)c.minorTickInterval&&!c.categories&&m(c.getMinorTickPositions(),function(a){c.renderMinorTick(a)}),z.length&&(m(z,function(a,b){c.renderTick(a,b)}),g&&(0===c.min||c.single)&&(v[-1]||(v[-1]=new B(c,-1,null,!0)),v[-1].render(-1))),F&&m(z,function(e,k){u=void 0!==z[k+1]?z[k+1]+g:c.max-g;0===k%2&&e<c.max&&u<=c.max+
    (b.polar?-g:g)&&(h[e]||(h[e]=new a.PlotLineOrBand(c)),x=e+g,h[e].options={from:f?c.lin2log(x):x,to:f?c.lin2log(u):u,color:F},h[e].render(),h[e].isActive=!0)}),c._addedPlotLB||(m((e.plotLines||[]).concat(e.plotBands||[]),function(a){c.addPlotBandOrLine(a)}),c._addedPlotLB=!0);m([v,w,h],function(a){var c,e=[],f=r.duration;n(a,function(a,c){a.isActive||(a.render(c,!1,0),a.isActive=!1,e.push(c))});H(function(){for(c=e.length;c--;)a[e[c]]&&!a[e[c]].isActive&&(a[e[c]].destroy(),delete a[e[c]])},a!==h&&
    b.hasRendered&&f?f:0)});J&&(J[J.isPlaced?"animate":"attr"]({d:this.getLinePath(J.strokeWidth())}),J.isPlaced=!0,J[l?"show":"hide"](!0));t&&l&&(e=c.getTitlePosition(),y(e.y)?(t[t.isNew?"attr":"animate"](e),t.isNew=!1):(t.attr("y",-9999),t.isNew=!0));I&&I.enabled&&c.renderStackTotals();c.isDirty=!1;d(this,"afterRender")},redraw:function(){this.visible&&(this.render(),m(this.plotLinesAndBands,function(a){a.render()}));m(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),
    destroy:function(a){var c=this,b=c.stacks,f=c.plotLinesAndBands,k;d(this,"destroy",{keepEvents:a});a||q(c);n(b,function(a,c){x(a);b[c]=null});m([c.ticks,c.minorTicks,c.alternateBands],function(a){x(a)});if(f)for(a=f.length;a--;)f[a].destroy();m("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});for(k in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[k]=c.plotLinesAndBandsGroups[k].destroy();n(c,function(a,b){-1===
    e(b,c.keepProps)&&delete c[b]})},drawCrosshair:function(a,c){var b,e=this.crosshair,f=F(e.snap,!0),k,q=this.cross;d(this,"drawCrosshair",{e:a,point:c});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(A(c)||!f)){f?A(c)&&(k=F(c.crosshairPos,this.isXAxis?c.plotX:this.len-c.plotY)):k=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);A(k)&&(b=this.getPlotLinePath(c&&(this.isXAxis?c.x:F(c.stackY,c.y)),null,null,null,k)||null);if(!A(b)){this.hideCrosshair();return}f=this.categories&&
        !this.isRadial;q||(this.cross=q=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(f?"category ":"thin ")+e.className).attr({zIndex:F(e.zIndex,2)}).add(),q.attr({stroke:e.color||(f?l("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(e.width,1)}).css({"pointer-events":"none"}),e.dashStyle&&q.attr({dashstyle:e.dashStyle}));q.show().attr({d:b});f&&!e.width&&q.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();d(this,"afterDrawCrosshair",
        {e:a,point:c})},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=z}(L);(function(a){var C=a.Axis,D=a.getMagnitude,G=a.normalizeTickInterval,p=a.timeUnits;C.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};C.prototype.normalizeTimeTickInterval=function(a,g){var l=g||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],
    ["month",[1,2,3,4,6]],["year",null]];g=l[l.length-1];var A=p[g[0]],r=g[1],x;for(x=0;x<l.length&&!(g=l[x],A=p[g[0]],r=g[1],l[x+1]&&a<=(A*r[r.length-1]+p[l[x+1][0]])/2);x++);A===p.year&&a<5*A&&(r=[1,2,5]);a=G(a/A,r,"year"===g[0]?Math.max(D(a/A),1):1);return{unitRange:A,count:a,unitName:g[0]}}})(L);(function(a){var C=a.Axis,D=a.getMagnitude,G=a.map,p=a.normalizeTickInterval,l=a.pick;C.prototype.getLogTickPositions=function(a,u,A,r){var g=this.options,m=this.len,b=[];r||(this._minorAutoInterval=null);
    if(.5<=a)a=Math.round(a),b=this.getLinearTickPositions(a,u,A);else if(.08<=a)for(var m=Math.floor(u),d,h,f,c,e,g=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];m<A+1&&!e;m++)for(h=g.length,d=0;d<h&&!e;d++)f=this.log2lin(this.lin2log(m)*g[d]),f>u&&(!r||c<=A)&&void 0!==c&&b.push(c),c>A&&(e=!0),c=f;else u=this.lin2log(u),A=this.lin2log(A),a=r?this.getMinorTickInterval():g.tickInterval,a=l("auto"===a?null:a,this._minorAutoInterval,g.tickPixelInterval/(r?5:1)*(A-u)/((r?m/this.tickPositions.length:
        m)||1)),a=p(a,null,D(a)),b=G(this.getLinearTickPositions(a,u,A),this.log2lin),r||(this._minorAutoInterval=a/5);r||(this.tickInterval=a);return b};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a,C){var D=a.arrayMax,G=a.arrayMin,p=a.defined,l=a.destroyObjectProperties,g=a.each,u=a.erase,A=a.merge,r=a.pick;a.PlotLineOrBand=function(a,m){this.axis=a;m&&(this.options=m,this.id=m.id)};a.PlotLineOrBand.prototype={render:function(){var g=
        this,m=g.axis,b=m.horiz,d=g.options,h=d.label,f=g.label,c=d.to,e=d.from,w=d.value,y=p(e)&&p(c),t=p(w),v=g.svgElem,J=!v,n=[],F=d.color,q=r(d.zIndex,0),I=d.events,n={"class":"highcharts-plot-"+(y?"band ":"line ")+(d.className||"")},H={},B=m.chart.renderer,z=y?"bands":"lines";m.isLog&&(e=m.log2lin(e),c=m.log2lin(c),w=m.log2lin(w));t?(n.stroke=F,n["stroke-width"]=d.width,d.dashStyle&&(n.dashstyle=d.dashStyle)):y&&(F&&(n.fill=F),d.borderWidth&&(n.stroke=d.borderColor,n["stroke-width"]=d.borderWidth));
        H.zIndex=q;z+="-"+q;(F=m.plotLinesAndBandsGroups[z])||(m.plotLinesAndBandsGroups[z]=F=B.g("plot-"+z).attr(H).add());J&&(g.svgElem=v=B.path().attr(n).add(F));if(t)n=m.getPlotLinePath(w,v.strokeWidth());else if(y)n=m.getPlotBandPath(e,c,d);else return;J&&n&&n.length?(v.attr({d:n}),I&&a.objectEach(I,function(a,c){v.on(c,function(a){I[c].apply(g,[a])})})):v&&(n?(v.show(),v.animate({d:n})):(v.hide(),f&&(g.label=f=f.destroy())));h&&p(h.text)&&n&&n.length&&0<m.width&&0<m.height&&!n.isFlat?(h=A({align:b&&
                y&&"center",x:b?!y&&4:10,verticalAlign:!b&&y&&"middle",y:b?y?16:10:y?6:-4,rotation:b&&!y&&90},h),this.renderLabel(h,n,y,q)):f&&f.hide();return g},renderLabel:function(a,m,b,d){var h=this.label,f=this.axis.chart.renderer;h||(h={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(b?"band":"line")+"-label "+(a.className||"")},h.zIndex=d,this.label=h=f.text(a.text,0,0,a.useHTML).attr(h).add(),h.css(a.style));d=m.xBounds||[m[1],m[4],b?m[6]:m[1]];m=m.yBounds||[m[2],m[5],b?m[7]:m[2]];
        b=G(d);f=G(m);h.align(a,!1,{x:b,y:f,width:D(d)-b,height:D(m)-f});h.show()},destroy:function(){u(this.axis.plotLinesAndBands,this);delete this.axis;l(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,m){var b=this.getPlotLinePath(m,null,null,!0),d=this.getPlotLinePath(a,null,null,!0),h=[],f=this.horiz,c=1,e;a=a<this.min&&m<this.min||a>this.max&&m>this.max;if(d&&b)for(a&&(e=d.toString()===b.toString(),c=0),a=0;a<d.length;a+=6)f&&b[a+1]===d[a+1]?(b[a+1]+=c,b[a+4]+=c):f||b[a+2]!==d[a+2]||(b[a+
    2]+=c,b[a+5]+=c),h.push("M",d[a+1],d[a+2],"L",d[a+4],d[a+5],b[a+4],b[a+5],b[a+1],b[a+2],"z"),h.isFlat=e;return h},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(g,m){var b=(new a.PlotLineOrBand(this,g)).render(),d=this.userOptions;b&&(m&&(d[m]=d[m]||[],d[m].push(g)),this.plotLinesAndBands.push(b));return b},removePlotBandOrLine:function(a){for(var m=this.plotLinesAndBands,b=this.options,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          d=this.userOptions,h=m.length;h--;)m[h].id===a&&m[h].destroy();g([b.plotLines||[],d.plotLines||[],b.plotBands||[],d.plotBands||[]],function(b){for(h=b.length;h--;)b[h].id===a&&u(b,b[h])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(L,ea);(function(a){var C=a.doc,D=a.each,G=a.extend,p=a.format,l=a.isNumber,g=a.map,u=a.merge,A=a.pick,r=a.splat,x=a.syncTimeout,m=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};
    a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split;this.outside=d.outside&&!this.split},cleanSplit:function(a){D(this.chart.series,function(b){var d=b&&b.tt;d&&(!d.isActive||a?b.tt=d.destroy():d.isActive=!1)})},getLabel:function(){var b=this.chart.renderer,d=this.options,h;this.label||(this.outside&&(this.container=h=a.doc.createElement("div"),h.className="highcharts-tooltip-container",
            a.css(h,{position:"absolute",top:"1px",pointerEvents:d.style&&d.style.pointerEvents}),a.doc.body.appendChild(h),this.renderer=b=new a.Renderer(h,0,0)),this.split?this.label=b.g("tooltip"):(this.label=b.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.outside&&(this.label.attr({x:this.distance,y:this.distance}),this.label.xSetter=function(a){h.style.left=
            a+"px"},this.label.ySetter=function(a){h.style.top=a+"px"}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();u(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,u(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),a.discardElement(this.container));a.clearTimeout(this.hideTimer);
            a.clearTimeout(this.tooltipTimeout)},move:function(b,d,h,f){var c=this,e=c.now,w=!1!==c.options.animation&&!c.isHidden&&(1<Math.abs(b-e.x)||1<Math.abs(d-e.y)),y=c.followPointer||1<c.len;G(e,{x:w?(2*e.x+b)/3:b,y:w?(e.y+d)/2:d,anchorX:y?void 0:w?(2*e.anchorX+h)/3:h,anchorY:y?void 0:w?(e.anchorY+f)/2:f});c.getLabel().attr(e);w&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){c&&c.move(b,d,h,f)},32))},hide:function(b){var d=this;a.clearTimeout(this.hideTimer);b=A(b,this.options.hideDelay,
            500);this.isHidden||(this.hideTimer=x(function(){d.getLabel()[b?"fadeOut":"hide"]();d.isHidden=!0},b))},getAnchor:function(a,d){var b=this.chart,f=b.pointer,c=b.inverted,e=b.plotTop,w=b.plotLeft,y=0,t=0,v,m;a=r(a);this.followPointer&&d||f.followTouchMove&&d&&"touchmove"===d.type?(void 0===d.chartX&&(d=f.normalize(d)),a=[d.chartX-b.plotLeft,d.chartY-e]):a[0].tooltipPos?a=a[0].tooltipPos:(D(a,function(a){v=a.series.yAxis;m=a.series.xAxis;y+=a.plotX+(!c&&m?m.left-w:0);t+=(a.plotLow?(a.plotLow+a.plotHigh)/
            2:a.plotY)+(!c&&v?v.top-e:0)}),y/=a.length,t/=a.length,a=[c?b.plotWidth-t:y,this.shared&&!c&&1<a.length&&d?d.chartY-e:c?b.plotHeight-y:t]);return g(a,Math.round)},getPosition:function(a,d,h){var b=this.chart,c=this.distance,e={},w=b.inverted&&h.h||0,y,t=this.outside,v=t?C.documentElement.clientWidth-2*c:b.chartWidth,m=t?Math.max(C.body.scrollHeight,C.documentElement.scrollHeight,C.body.offsetHeight,C.documentElement.offsetHeight,C.documentElement.clientHeight):b.chartHeight,n=b.pointer.chartPosition,
            F=["y",m,d,(t?n.top-c:0)+h.plotY+b.plotTop,t?0:b.plotTop,t?m:b.plotTop+b.plotHeight],q=["x",v,a,(t?n.left-c:0)+h.plotX+b.plotLeft,t?0:b.plotLeft,t?v:b.plotLeft+b.plotWidth],I=!this.followPointer&&A(h.ttBelow,!b.inverted===!!h.negative),H=function(a,b,f,k,q,z){var d=f<k-c,B=k+c+f<b,n=k-c-f;k+=c;if(I&&B)e[a]=k;else if(!I&&d)e[a]=n;else if(d)e[a]=Math.min(z-f,0>n-w?n:n-w);else if(B)e[a]=Math.max(q,k+w+f>b?k:k+w);else return!1},B=function(a,b,f,k){var q;k<c||k>b-c?q=!1:e[a]=k<f/2?1:k>b-f/2?b-f-2:k-f/
                2;return q},z=function(a){var c=F;F=q;q=c;y=a},k=function(){!1!==H.apply(0,F)?!1!==B.apply(0,q)||y||(z(!0),k()):y?e.x=e.y=0:(z(!0),k())};(b.inverted||1<this.len)&&z();k();return e},defaultFormatter:function(a){var b=this.points||r(this),h;h=[a.tooltipFooterHeaderFormatter(b[0])];h=h.concat(a.bodyFormatter(b));h.push(a.tooltipFooterHeaderFormatter(b[0],!0));return h},refresh:function(b,d){var h,f=this.options,c,e=b,w,y={},t=[];h=f.formatter||this.defaultFormatter;var y=this.shared,v;f.enabled&&(a.clearTimeout(this.hideTimer),
            this.followPointer=r(e)[0].series.tooltipOptions.followPointer,w=this.getAnchor(e,d),d=w[0],c=w[1],!y||e.series&&e.series.noSharedTooltip?y=e.getLabelConfig():(D(e,function(a){a.setState("hover");t.push(a.getLabelConfig())}),y={x:e[0].category,y:e[0].y},y.points=t,e=e[0]),this.len=t.length,y=h.call(y,this),v=e.series,this.distance=A(v.tooltipOptions.distance,16),!1===y?this.hide():(h=this.getLabel(),this.isHidden&&h.attr({opacity:1}).show(),this.split?this.renderSplit(y,r(b)):(f.style.width||h.css({width:this.chart.spacingBox.width}),
            h.attr({text:y&&y.join?y.join(""):y}),h.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+A(e.colorIndex,v.colorIndex)),h.attr({stroke:f.borderColor||e.color||v.color||"#666666"}),this.updatePosition({plotX:d,plotY:c,negative:e.negative,ttBelow:e.ttBelow,h:w[2]||0})),this.isHidden=!1))},renderSplit:function(b,d){var h=this,f=[],c=this.chart,e=c.renderer,w=!0,y=this.options,t=0,v=this.getLabel();a.isString(b)&&(b=[!1,b]);D(b.slice(0,d.length+1),function(a,b){if(!1!==a){b=d[b-1]||
            {isHeader:!0,plotX:d[0].plotX};var n=b.series||h,q=n.tt,I=b.series||{},H="highcharts-color-"+A(b.colorIndex,I.colorIndex,"none");q||(n.tt=q=e.label(null,null,null,"callout",null,null,y.useHTML).addClass("highcharts-tooltip-box "+H).attr({padding:y.padding,r:y.borderRadius,fill:y.backgroundColor,stroke:y.borderColor||b.color||I.color||"#333333","stroke-width":y.borderWidth}).add(v));q.isActive=!0;q.attr({text:a});q.css(y.style).shadow(y.shadow);a=q.getBBox();I=a.width+q.strokeWidth();b.isHeader?(t=
            a.height,I=Math.max(0,Math.min(b.plotX+c.plotLeft-I/2,c.chartWidth-I))):I=b.plotX+c.plotLeft-A(y.distance,16)-I;0>I&&(w=!1);a=(b.series&&b.series.yAxis&&b.series.yAxis.pos)+(b.plotY||0);a-=c.plotTop;f.push({target:b.isHeader?c.plotHeight+t:a,rank:b.isHeader?1:0,size:n.tt.getBBox().height+1,point:b,x:I,tt:q})}});this.cleanSplit();a.distribute(f,c.plotHeight+t);D(f,function(a){var b=a.point,e=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:w||b.isHeader?a.x:b.plotX+c.plotLeft+A(y.distance,
                16),y:a.pos+c.plotTop,anchorX:b.isHeader?b.plotX+c.plotLeft:b.plotX+e.xAxis.pos,anchorY:b.isHeader?a.pos+c.plotTop-15:b.plotY+e.yAxis.pos})})},updatePosition:function(a){var b=this.chart,h=this.getLabel(),f=(this.options.positioner||this.getPosition).call(this,h.width,h.height,a),c=a.plotX+b.plotLeft;a=a.plotY+b.plotTop;var e;this.outside&&(e=(this.options.borderWidth||0)+2*this.distance,this.renderer.setSize(h.width+e,h.height+e,!1),c+=b.pointer.chartPosition.left-f.x,a+=b.pointer.chartPosition.top-
            f.y);this.move(Math.round(f.x),Math.round(f.y||0),c,a)},getDateFormat:function(a,d,h,f){var c=this.chart.time,b=c.dateFormat("%m-%d %H:%M:%S.%L",d),w,y,t={millisecond:15,second:12,minute:9,hour:6,day:3},v="millisecond";for(y in m){if(a===m.week&&+c.dateFormat("%w",d)===h&&"00:00:00.000"===b.substr(6)){y="week";break}if(m[y]>a){y=v;break}if(t[y]&&b.substr(t[y])!=="01-01 00:00:00.000".substr(t[y]))break;"week"!==y&&(v=y)}y&&(w=f[y]);return w},getXDateFormat:function(a,d,h){d=d.dateTimeLabelFormats;
            var b=h&&h.closestPointRange;return(b?this.getDateFormat(b,a.x,h.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){d=d?"footer":"header";var b=a.series,f=b.tooltipOptions,c=f.xDateFormat,e=b.xAxis,w=e&&"datetime"===e.options.type&&l(a.key),y=f[d+"Format"];w&&!c&&(c=this.getXDateFormat(a,f,e));w&&c&&D(a.point&&a.point.tooltipDateKeys||["key"],function(a){y=y.replace("{point."+a+"}","{point."+a+":"+c+"}")});return p(y,{point:a,series:b},this.chart.time)},bodyFormatter:function(a){return g(a,
            function(a){var b=a.series.tooltipOptions;return(b[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,b[(a.point.formatPrefix||"point")+"Format"])})}}})(L);(function(a){var C=a.addEvent,D=a.attr,G=a.charts,p=a.color,l=a.css,g=a.defined,u=a.each,A=a.extend,r=a.find,x=a.fireEvent,m=a.isNumber,b=a.isObject,d=a.offset,h=a.pick,f=a.splat,c=a.Tooltip;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=
        b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};c&&(a.tooltip=new c(a,b.tooltip),this.followTouchMove=h(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var c=this.chart,b=c.options.chart,e=b.zoomType||"",c=c.inverted;/touch/.test(a.type)&&(e=h(b.pinchType,e));this.zoomX=a=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=a&&!c||e&&c;this.zoomVert=e&&!c||a&&c;this.hasZoom=a||e},normalize:function(a,c){var b;b=a.touches?a.touches.length?a.touches.item(0):
        a.changedTouches[0]:a;c||(this.chartPosition=c=d(this.chart.container));return A(a,{chartX:Math.round(b.pageX-c.left),chartY:Math.round(b.pageY-c.top)})},getCoordinates:function(a){var c={xAxis:[],yAxis:[]};u(this.chart.axes,function(b){c[b.isXAxis?"xAxis":"yAxis"].push({axis:b,value:b.toValue(a[b.horiz?"chartX":"chartY"])})});return c},findNearestKDPoint:function(a,c,f){var e;u(a,function(a){var d=!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(f,d);if((d=b(a,
        !0))&&!(d=!b(e,!0)))var d=e.distX-a.distX,n=e.dist-a.dist,t=(a.series.group&&a.series.group.zIndex)-(e.series.group&&e.series.group.zIndex),d=0<(0!==d&&c?d:0!==n?n:0!==t?t:e.series.index>a.series.index?-1:1);d&&(e=a)});return e},getPointFromEvent:function(a){a=a.target;for(var c;a&&!c;)c=a.point,a=a.parentNode;return c},getChartCoordinatesFromPoint:function(a,c){var b=a.series,e=b.xAxis,b=b.yAxis,f=h(a.clientX,a.plotX),d=a.shapeArgs;if(e&&b)return c?{chartX:e.len+e.pos-f,chartY:b.len+b.pos-a.plotY}:
        {chartX:f+e.pos,chartY:a.plotY+b.pos};if(d&&d.x&&d.y)return{chartX:d.x,chartY:d.y}},getHoverData:function(c,f,d,t,v,m,n){var e,q=[],w=n&&n.isBoosting;t=!(!t||!c);n=f&&!f.stickyTracking?[f]:a.grep(d,function(a){return a.visible&&!(!v&&a.directTouch)&&h(a.options.enableMouseTracking,!0)&&a.stickyTracking});f=(e=t?c:this.findNearestKDPoint(n,v,m))&&e.series;e&&(v&&!f.noSharedTooltip?(n=a.grep(d,function(a){return a.visible&&!(!v&&a.directTouch)&&h(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),
        u(n,function(a){var c=r(a.points,function(a){return a.x===e.x&&!a.isNull});b(c)&&(w&&(c=a.getPoint(c)),q.push(c))})):q.push(e));return{hoverPoint:e,hoverSeries:f,hoverPoints:q}},runPointActions:function(c,b){var e=this.chart,f=e.tooltip&&e.tooltip.options.enabled?e.tooltip:void 0,d=f?f.shared:!1,w=b||e.hoverPoint,n=w&&w.series||e.hoverSeries,n=this.getHoverData(w,n,e.series,!!b||n&&n.directTouch&&this.isDirectTouch,d,c,{isBoosting:e.isBoosting}),m,w=n.hoverPoint;m=n.hoverPoints;n=n.hoverSeries;b=
        c&&"touchmove"===c.type?!0===this.followTouchMove:n&&n.tooltipOptions.followPointer;d=d&&n&&!n.noSharedTooltip;if(w&&(w!==e.hoverPoint||f&&f.isHidden)){u(e.hoverPoints||[],function(c){-1===a.inArray(c,m)&&c.setState()});u(m||[],function(a){a.setState("hover")});if(e.hoverSeries!==n)n.onMouseOver();e.hoverPoint&&e.hoverPoint.firePointEvent("mouseOut");if(!w.series)return;w.firePointEvent("mouseOver");e.hoverPoints=m;e.hoverPoint=w;f&&f.refresh(d?m:w,c)}else b&&f&&!f.isHidden&&(w=f.getAnchor([{}],c),
        f.updatePosition({plotX:w[0],plotY:w[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(e.container.ownerDocument,"mousemove",function(c){var b=G[a.hoverChartIndex];if(b)b.pointer.onDocumentMouseMove(c)}));u(e.axes,function(b){var e=h(b.crosshair.snap,!0),f=e?a.find(m,function(a){return a.series[b.coll]===b}):void 0;f||!e?b.drawCrosshair(c,f):b.hideCrosshair()})},reset:function(a,c){var b=this.chart,e=b.hoverSeries,d=b.hoverPoint,w=b.hoverPoints,n=b.tooltip,h=n&&n.shared?w:d;a&&h&&u(f(h),function(c){c.series.isCartesian&&
    void 0===c.plotX&&(a=!1)});if(a)n&&h&&(n.refresh(h),n.shared&&w?u(w,function(a){a.setState(a.state,!0);a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a);a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a)}):d&&(d.setState(d.state,!0),u(b.axes,function(a){a.crosshair&&a.drawCrosshair(null,d)})));else{if(d)d.onMouseOut();w&&u(w,function(a){a.setState()});if(e)e.onMouseOut();n&&n.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());u(b.axes,function(a){a.hideCrosshair()});
        this.hoverX=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,e;u(b.series,function(f){e=a||f.getPlotBox();f.xAxis&&f.xAxis.zoomEnabled&&f.group&&(f.group.attr(e),f.markerGroup&&(f.markerGroup.attr(e),f.markerGroup.clip(c?b.clipRect:null)),f.dataLabelsGroup&&f.dataLabelsGroup.attr(e))});b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var c=
        this.chart,b=c.options.chart,e=a.chartX,f=a.chartY,d=this.zoomHor,n=this.zoomVert,h=c.plotLeft,q=c.plotTop,m=c.plotWidth,H=c.plotHeight,B,z=this.selectionMarker,k=this.mouseDownX,g=this.mouseDownY,l=b.panKey&&a[b.panKey+"Key"];z&&z.touch||(e<h?e=h:e>h+m&&(e=h+m),f<q?f=q:f>q+H&&(f=q+H),this.hasDragged=Math.sqrt(Math.pow(k-e,2)+Math.pow(g-f,2)),10<this.hasDragged&&(B=c.isInsidePlot(k-h,g-q),c.hasCartesianSeries&&(this.zoomX||this.zoomY)&&B&&!l&&!z&&(this.selectionMarker=z=c.renderer.rect(h,q,d?1:m,
        n?1:H,0).attr({fill:b.selectionMarkerFill||p("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),z&&d&&(e-=k,z.attr({width:Math.abs(e),x:(0<e?0:e)+k})),z&&n&&(e=f-g,z.attr({height:Math.abs(e),y:(0<e?0:e)+g})),B&&!z&&b.panning&&c.pan(a,b.panning)))},drop:function(a){var c=this,b=this.chart,e=this.hasPinched;if(this.selectionMarker){var f={originalEvent:a,xAxis:[],yAxis:[]},d=this.selectionMarker,n=d.attr?d.attr("x"):d.x,h=d.attr?d.attr("y"):d.y,q=d.attr?d.attr("width"):
        d.width,I=d.attr?d.attr("height"):d.height,H;if(this.hasDragged||e)u(b.axes,function(b){if(b.zoomEnabled&&g(b.min)&&(e||c[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var d=b.horiz,k="touchend"===a.type?b.minPixelPadding:0,B=b.toValue((d?n:h)+k),d=b.toValue((d?n+q:h+I)-k);f[b.coll].push({axis:b,min:Math.min(B,d),max:Math.max(B,d)});H=!0}}),H&&x(b,"selection",f,function(a){b.zoom(A(a,e?{animation:!1}:null))});m(b.index)&&(this.selectionMarker=this.selectionMarker.destroy());e&&this.scaleGroups()}b&&m(b.index)&&
    (l(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(c){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(c)},onDocumentMouseMove:function(a){var c=this.chart,b=this.chartPosition;a=this.normalize(a,b);!b||this.inClass(a.target,"highcharts-tracker")||
    c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)||this.reset()},onContainerMouseLeave:function(c){var b=G[a.hoverChartIndex];b&&(c.relatedTarget||c.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=null)},onContainerMouseMove:function(c){var b=this.chart;g(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=b.index);c=this.normalize(c);c.returnValue=!1;"mousedown"===b.mouseIsDown&&this.drag(c);!this.inClass(c.target,"highcharts-tracker")&&!b.isInsidePlot(c.chartX-
        b.plotLeft,c.chartY-b.plotTop)||b.openMenu||this.runPointActions(c)},inClass:function(a,c){for(var b;a;){if(b=D(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var c=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!c||!a||c.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut()},
    onContainerClick:function(a){var c=this.chart,b=c.hoverPoint,e=c.plotLeft,f=c.plotTop;a=this.normalize(a);c.cancelClick||(b&&this.inClass(a.target,"highcharts-tracker")?(x(b.series,"click",A(a,{point:b})),c.hoverPoint&&b.firePointEvent("click",a)):(A(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-e,a.chartY-f)&&x(c,"click",a)))},setDOMEvents:function(){var c=this,b=c.chart.container,f=b.ownerDocument;b.onmousedown=function(a){c.onContainerMouseDown(a)};b.onmousemove=function(a){c.onContainerMouseMove(a)};
        b.onclick=function(a){c.onContainerClick(a)};this.unbindContainerMouseLeave=C(b,"mouseleave",c.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=C(f,"mouseup",c.onDocumentMouseUp));a.hasTouch&&(b.ontouchstart=function(a){c.onContainerTouchStart(a)},b.ontouchmove=function(a){c.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=C(f,"touchend",c.onDocumentTouchEnd)))},destroy:function(){var c=this;c.unDocMouseMove&&c.unDocMouseMove();this.unbindContainerMouseLeave();
        a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(c.tooltipTimeout);a.objectEach(c,function(a,b){c[b]=null})}}})(L);(function(a){var C=a.charts,D=a.each,G=a.extend,p=a.map,l=a.noop,g=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,g,l,p,m,b){this.zoomHor&&this.pinchTranslateDirection(!0,a,g,l,p,m,b);this.zoomVert&&this.pinchTranslateDirection(!1,a,g,l,p,
        m,b)},pinchTranslateDirection:function(a,g,l,p,m,b,d,h){var f=this.chart,c=a?"x":"y",e=a?"X":"Y",w="chart"+e,y=a?"width":"height",t=f["plot"+(a?"Left":"Top")],v,J,n=h||1,F=f.inverted,q=f.bounds[a?"h":"v"],I=1===g.length,H=g[0][w],B=l[0][w],z=!I&&g[1][w],k=!I&&l[1][w],E;l=function(){!I&&20<Math.abs(H-z)&&(n=h||Math.abs(B-k)/Math.abs(H-z));J=(t-B)/n+H;v=f["plot"+(a?"Width":"Height")]/n};l();g=J;g<q.min?(g=q.min,E=!0):g+v>q.max&&(g=q.max-v,E=!0);E?(B-=.8*(B-d[c][0]),I||(k-=.8*(k-d[c][1])),l()):d[c]=
        [B,k];F||(b[c]=J-t,b[y]=v);b=F?1/n:n;m[y]=v;m[c]=g;p[F?a?"scaleY":"scaleX":"scale"+e]=n;p["translate"+e]=b*t+(B-b*H)},pinch:function(a){var u=this,r=u.chart,x=u.pinchDown,m=a.touches,b=m.length,d=u.lastValidTouch,h=u.hasZoom,f=u.selectionMarker,c={},e=1===b&&(u.inClass(a.target,"highcharts-tracker")&&r.runTrackerClick||u.runChartClick),w={};1<b&&(u.initiated=!0);h&&u.initiated&&!e&&a.preventDefault();p(m,function(a){return u.normalize(a)});"touchstart"===a.type?(D(m,function(a,c){x[c]={chartX:a.chartX,
        chartY:a.chartY}}),d.x=[x[0].chartX,x[1]&&x[1].chartX],d.y=[x[0].chartY,x[1]&&x[1].chartY],D(r.axes,function(a){if(a.zoomEnabled){var c=r.bounds[a.horiz?"h":"v"],b=a.minPixelPadding,e=a.toPixels(g(a.options.min,a.dataMin)),f=a.toPixels(g(a.options.max,a.dataMax)),d=Math.max(e,f);c.min=Math.min(a.pos,Math.min(e,f)-b);c.max=Math.max(a.pos+a.len,d+b)}}),u.res=!0):u.followTouchMove&&1===b?this.runPointActions(u.normalize(a)):x.length&&(f||(u.selectionMarker=f=G({destroy:l,touch:!0},r.plotBox)),u.pinchTranslate(x,
        m,c,f,w,d),u.hasPinched=h,u.scaleGroups(c,w),u.res&&(u.res=!1,this.reset(!1,0)))},touch:function(l,p){var r=this.chart,u,m;if(r.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=r.index;1===l.touches.length?(l=this.normalize(l),(m=r.isInsidePlot(l.chartX-r.plotLeft,l.chartY-r.plotTop))&&!r.openMenu?(p&&this.runPointActions(l),"touchmove"===l.type&&(p=this.pinchDown,u=p[0]?4<=Math.sqrt(Math.pow(p[0].chartX-l.chartX,2)+Math.pow(p[0].chartY-l.chartY,2)):!1),g(u,
        !0)&&this.pinch(l)):p&&this.reset()):2===l.touches.length&&this.pinch(l)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(g){C[a.hoverChartIndex]&&C[a.hoverChartIndex].pointer.drop(g)}})})(L);(function(a){var C=a.addEvent,D=a.charts,G=a.css,p=a.doc,l=a.extend,g=a.noop,u=a.Pointer,A=a.removeEvent,r=a.win,x=a.wrap;if(!a.hasTouch&&(r.PointerEvent||r.MSPointerEvent)){var m={},b=!!r.PointerEvent,d=function(){var b=
    [];b.item=function(a){return this[a]};a.objectEach(m,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},h=function(b,c,e,h){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!D[a.hoverChartIndex]||(h(b),h=D[a.hoverChartIndex].pointer,h[c]({type:e,target:b.currentTarget,preventDefault:g,touches:d()}))};l(u.prototype,{onContainerPointerDown:function(a){h(a,"onContainerTouchStart","touchstart",function(a){m[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},
    onContainerPointerMove:function(a){h(a,"onContainerTouchMove","touchmove",function(a){m[a.pointerId]={pageX:a.pageX,pageY:a.pageY};m[a.pointerId].target||(m[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){h(a,"onDocumentTouchEnd","touchend",function(a){delete m[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,b?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,b?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(p,b?
        "pointerup":"MSPointerUp",this.onDocumentPointerUp)}});x(u.prototype,"init",function(a,c,b){a.call(this,c,b);this.hasZoom&&G(c.container,{"-ms-touch-action":"none","touch-action":"none"})});x(u.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});x(u.prototype,"destroy",function(a){this.batchMSEvents(A);a.call(this)})}})(L);(function(a){var C=a.addEvent,D=a.css,G=a.discardElement,p=a.defined,l=a.each,g=a.fireEvent,u=a.isFirefox,A=a.marginNames,
    r=a.merge,x=a.pick,m=a.setAnimation,b=a.stableSort,d=a.win,h=a.wrap;a.Legend=function(a,c){this.init(a,c)};a.Legend.prototype={init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=C(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())},setOptions:function(a){var c=x(a.padding,8);this.options=
        a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=r(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=c;this.initialItemY=c-5;this.symbolWidth=x(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted},update:function(a,c){var b=this.chart;this.setOptions(r(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;x(c,!0)&&b.redraw();g(this,"afterUpdate")},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");
        var b=this.options,f=a.legendItem,d=a.legendLine,h=a.legendSymbol,v=this.itemHiddenStyle.color,b=c?b.itemStyle.color:v,m=c?a.color||v:v,n=a.options&&a.options.marker,l={fill:m};f&&f.css({fill:b,color:b});d&&d.attr({stroke:m});h&&(n&&h.isMarker&&(l=a.pointAttribs(),c||(l.stroke=l.fill=v)),h.attr(l));g(this,"afterColorizeItem",{item:a,visible:c})},positionItems:function(){l(this.allItems,this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(a){var c=this.options,
        b=c.symbolPadding,c=!c.rtl,f=a._legendItemPos,d=f[0],f=f[1],h=a.checkbox;if((a=a.legendGroup)&&a.element)a[p(a.translateY)?"animate":"attr"]({translateX:c?d:this.legendWidth-d-2*b-4,translateY:f});h&&(h.x=d,h.y=f)},destroyItem:function(a){var c=a.checkbox;l(["legendItem","legendLine","legendSymbol","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())});c&&G(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}l(this.getAllItems(),function(c){l(["legendItem","legendGroup"],
        a,c)});l("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,c,b=this.clipHeight||this.legendHeight,d=this.titleHeight;a&&(c=a.translateY,l(this.allItems,function(e){var f=e.checkbox,h;f&&(h=c+d+f.y+(this.scrollOffset||0)+3,D(f,{left:a.translateX+e.checkboxOffset+f.x-20+"px",top:h+"px",display:h>c-6&&h<c+b-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,c=this.padding,b=a.title,d=
        0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),d=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:d}));this.titleHeight=d},setText:function(b){var c=this.options;b.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,b,this.chart.time):c.labelFormatter.call(b)})},renderItem:function(a){var c=this.chart,b=c.renderer,f=this.options,
        d=this.symbolWidth,h=f.symbolPadding,v=this.itemStyle,m=this.itemHiddenStyle,n="horizontal"===f.layout?x(f.itemDistance,20):0,g=!f.rtl,q=a.legendItem,I=!a.series,H=!I&&a.series.drawLegendSymbol?a.series:a,B=H.options,B=this.createCheckboxForItem&&B&&B.showCheckbox,n=d+h+n+(B?20:0),z=f.useHTML,k=a.options.className;q||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+H.type+"-series highcharts-color-"+a.colorIndex+(k?" "+k:"")+(I?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),
        a.legendItem=q=b.text("",g?d+h:-h,this.baseline||0,z).css(r(a.visible?v:m)).attr({align:g?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(d=v.fontSize,this.fontMetrics=b.fontMetrics(d,q),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,q.attr("y",this.baseline)),this.symbolHeight=f.symbolHeight||this.fontMetrics.f,H.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,q,z),B&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);v.width||q.css({width:(f.itemWidth||
            f.width||c.spacingBox.width)-n});this.setText(a);c=q.getBBox();a.itemWidth=a.checkboxOffset=f.itemWidth||a.legendItemWidth||c.width+n;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||c.height||this.symbolHeight)},layoutItem:function(a){var c=this.options,b=this.padding,f="horizontal"===c.layout,d=a.itemHeight,h=c.itemMarginBottom||0,v=this.itemMarginTop,m=f?x(c.itemDistance,20):0,n=c.width,g=n||this.chart.spacingBox.width-
        2*b-c.x,c=c.alignColumns&&this.totalItemWidth>g?this.maxItemWidth:a.itemWidth;f&&this.itemX-b+c>g&&(this.itemX=b,this.itemY+=v+this.lastLineHeight+h,this.lastLineHeight=0);this.lastItemY=v+this.itemY+h;this.lastLineHeight=Math.max(d,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=c:(this.itemY+=v+d+h,this.lastLineHeight=d);this.offsetWidth=n||Math.max((f?this.itemX-b-(a.checkbox?0:m):c)+b,this.offsetWidth)},getAllItems:function(){var a=[];l(this.chart.series,function(c){var b=
        c&&c.options;c&&x(b.showInLegend,p(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});g(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,c){var b=this.chart,f=this.options,d=this.getAlignment();d&&l([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(e,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             h){e.test(d)&&!p(a[h])&&(b[A[h]]=Math.max(b[A[h]],b.legend[(h+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][h]*f[h%2?"x":"y"]+x(f.margin,12)+c[h]+(0===h&&void 0!==b.options.title.margin?b.titleOffset+b.options.title.margin:0)))})},proximatePositions:function(){var b=this.chart,c=[],e="left"===this.options.align;l(this.allItems,function(f){var d,h;d=e;f.xAxis&&f.points&&(f.xAxis.options.reversed&&(d=!d),d=a.find(d?f.points:f.points.slice(0).reverse(),function(c){return a.isNumber(c.plotY)}),h=f.legendGroup.getBBox().height,
        c.push({target:f.visible?(d?d.plotY:f.xAxis.height)-.3*h:b.plotHeight,size:h,item:f}))},this);a.distribute(c,b.plotHeight);l(c,function(a){a.item._legendItemPos[1]=b.plotTop-b.spacing[0]+a.pos})},render:function(){var a=this.chart,c=a.renderer,e=this.group,d,h,m,v=this.box,g=this.options,n=this.padding;this.itemX=n;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;e||(this.group=e=c.g("legend").attr({zIndex:7}).add(),this.contentGroup=c.g().attr({zIndex:1}).add(e),this.scrollGroup=c.g().add(this.contentGroup));
        this.renderTitle();d=this.getAllItems();b(d,function(a,c){return(a.options&&a.options.legendIndex||0)-(c.options&&c.options.legendIndex||0)});g.reversed&&d.reverse();this.allItems=d;this.display=h=!!d.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;l(d,this.renderItem,this);l(d,this.layoutItem,this);d=(g.width||this.offsetWidth)+n;m=this.lastItemY+this.lastLineHeight+this.titleHeight;m=this.handleOverflow(m);m+=n;v||(this.box=v=c.rect().addClass("highcharts-legend-box").attr({r:g.borderRadius}).add(e),
            v.isNew=!0);v.attr({stroke:g.borderColor,"stroke-width":g.borderWidth||0,fill:g.backgroundColor||"none"}).shadow(g.shadow);0<d&&0<m&&(v[v.isNew?"attr":"animate"](v.crisp.call({},{x:0,y:0,width:d,height:m},v.strokeWidth())),v.isNew=!1);v[h?"show":"hide"]();this.legendWidth=d;this.legendHeight=m;h&&(c=a.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(c=r(c,{y:c.y+a.titleOffset+a.options.title.margin})),e.align(r(g,{width:d,height:m,verticalAlign:this.proximate?"top":g.verticalAlign}),!0,c));this.proximate||
        this.positionItems()},handleOverflow:function(a){var c=this,b=this.chart,f=b.renderer,d=this.options,h=d.y,m=this.padding,b=b.spacingBox.height+("top"===d.verticalAlign?-h:h)-m,h=d.maxHeight,g,n=this.clipRect,F=d.navigation,q=x(F.animation,!0),I=F.arrowSize||12,H=this.nav,B=this.pages,z,k=this.allItems,E=function(a){"number"===typeof a?n.attr({height:a}):n&&(c.clipRect=n.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+m+"px,9999px,"+(m+a)+"px,0)":"auto")};
        "horizontal"!==d.layout||"middle"===d.verticalAlign||d.floating||(b/=2);h&&(b=Math.min(b,h));B.length=0;a>b&&!1!==F.enabled?(this.clipHeight=g=Math.max(b-20-this.titleHeight-m,0),this.currentPage=x(this.currentPage,1),this.fullHeight=a,l(k,function(a,c){var b=a._legendItemPos[1],e=Math.round(a.legendItem.getBBox().height),f=B.length;if(!f||b-B[f-1]>g&&(z||b)!==B[f-1])B.push(z||b),f++;a.pageIx=f-1;z&&(k[c-1].pageIx=f-1);c===k.length-1&&b+e-B[f-1]>g&&(B.push(b),a.pageIx=f);b!==z&&(z=b)}),n||(n=c.clipRect=
            f.clipRect(0,m,9999,0),c.contentGroup.clip(n)),E(g),H||(this.nav=H=f.g().attr({zIndex:1}).add(this.group),this.up=f.symbol("triangle",0,0,I,I).on("click",function(){c.scroll(-1,q)}).add(H),this.pager=f.text("",15,10).addClass("highcharts-legend-navigation").css(F.style).add(H),this.down=f.symbol("triangle-down",0,0,I,I).on("click",function(){c.scroll(1,q)}).add(H)),c.scroll(0),a=b):H&&(E(),this.nav=H.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var b=
        this.pages,f=b.length;a=this.currentPage+a;var d=this.clipHeight,h=this.options.navigation,v=this.pager,g=this.padding;a>f&&(a=f);0<a&&(void 0!==c&&m(c,this.chart),this.nav.attr({translateX:g,translateY:d+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),v.attr({text:a+"/"+f}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),
        this.up.attr({fill:1===a?h.inactiveColor:h.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===f?h.inactiveColor:h.activeColor}).css({cursor:a===f?"default":"pointer"}),this.scrollOffset=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,f=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(f?(a.symbolWidth-b)/2:
        0,a.baseline-b+1,f?b:a.symbolWidth,b,x(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,b=c.marker,d=a.symbolWidth,f=a.symbolHeight,h=f/2,m=this.chart.renderer,g=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var n;n={"stroke-width":c.lineWidth||0};c.dashStyle&&(n.dashstyle=c.dashStyle);this.legendLine=m.path(["M",0,a,"L",d,a]).addClass("highcharts-graph").attr(n).add(g);b&&!1!==b.enabled&&d&&
    (c=Math.min(x(b.radius,h),h),0===this.symbol.indexOf("url")&&(b=r(b,{width:f,height:f}),c=0),this.legendSymbol=b=m.symbol(this.symbol,d/2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(g),b.isMarker=!0)}};(/Trident\/7\.0/.test(d.navigator.userAgent)||u)&&h(a.Legend.prototype,"positionItem",function(a,c){var b=this,d=function(){c._legendItemPos&&a.call(b,c)};d();setTimeout(d)})})(L);(function(a){var C=a.addEvent,D=a.animate,G=a.animObject,p=a.attr,l=a.doc,g=a.Axis,u=a.createElement,A=a.defaultOptions,
    r=a.discardElement,x=a.charts,m=a.css,b=a.defined,d=a.each,h=a.extend,f=a.find,c=a.fireEvent,e=a.grep,w=a.isNumber,y=a.isObject,t=a.isString,v=a.Legend,J=a.marginNames,n=a.merge,F=a.objectEach,q=a.Pointer,I=a.pick,H=a.pInt,B=a.removeEvent,z=a.seriesTypes,k=a.splat,E=a.syncTimeout,N=a.win,P=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,c,b){return new P(a,c,b)};h(P.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(t(a[0])||a[0].nodeName)this.renderTo=
        a.shift();this.init(a[0],a[1])},init:function(b,e){var k,d,f=b.series,q=b.plotOptions||{};c(this,"init",{args:arguments},function(){b.series=null;k=n(A,b);for(d in k.plotOptions)k.plotOptions[d].tooltip=q[d]&&n(q[d].tooltip)||void 0;k.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;k.series=b.series=f;this.userOptions=b;var z=k.chart,B=z.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=e;this.isResizing=0;this.options=
        k;this.axes=[];this.series=[];this.time=b.time&&a.keys(b.time).length?new a.Time(b.time):a.time;this.hasCartesianSeries=z.showAxes;var h=this;h.index=x.length;x.push(h);a.chartCount++;B&&F(B,function(a,c){C(h,c,a)});h.xAxis=[];h.yAxis=[];h.pointCount=h.colorCounter=h.symbolCounter=0;c(h,"afterInit");h.firstRender()})},initSeries:function(c){var b=this.options.chart;(b=z[c.type||b.type||b.defaultSeriesType])||a.error(17,!0);b=new b;b.init(this,c);return b},orderSeries:function(a){var c=this.series;
        for(a=a||0;a<c.length;a++)c[a]&&(c[a].index=a,c[a].name=c[a].getName())},isInsidePlot:function(a,c,b){var e=b?c:a;a=b?a:c;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){c(this,"beforeRedraw");var e=this.axes,k=this.series,f=this.pointer,q=this.legend,z=this.isDirtyLegend,B,n,m=this.hasCartesianSeries,g=this.isDirtyBox,v,H=this.renderer,I=H.isHidden(),t=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);I&&this.temporaryDisplay();this.layOutTitles();
        for(b=k.length;b--;)if(v=k[b],v.options.stacking&&(B=!0,v.isDirty)){n=!0;break}if(n)for(b=k.length;b--;)v=k[b],v.options.stacking&&(v.isDirty=!0);d(k,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),z=!0);a.isDirtyData&&c(a,"updatedData")});z&&q.options.enabled&&(q.render(),this.isDirtyLegend=!1);B&&this.getStacks();m&&d(e,function(a){a.updateNames();a.setScale()});this.getMargins();m&&(d(e,function(a){a.isDirty&&(g=!0)}),d(e,function(a){var b=a.min+","+a.max;
            a.extKey!==b&&(a.extKey=b,t.push(function(){c(a,"afterSetExtremes",h(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(g||B)&&a.redraw()}));g&&this.drawChartBox();c(this,"predraw");d(k,function(a){(g||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});f&&f.reset(!0);H.draw();c(this,"redraw");c(this,"render");I&&this.temporaryDisplay(!0);d(t,function(a){a.call()})},get:function(a){function c(c){return c.id===a||c.options&&c.options.id===a}var b,e=this.series,k;b=f(this.axes,c)||f(this.series,
        c);for(k=0;!b&&k<e.length;k++)b=f(e[k].points||[],c);return b},getAxes:function(){var a=this,b=this.options,e=b.xAxis=k(b.xAxis||{}),b=b.yAxis=k(b.yAxis||{});c(this,"getAxes");d(e,function(a,c){a.index=c;a.isX=!0});d(b,function(a,c){a.index=c});e=e.concat(b);d(e,function(c){new g(a,c)});c(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];d(this.series,function(c){a=a.concat(e(c.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return e(this.series,function(a){return a.selected})},
    setTitle:function(a,c,b){var e=this,k=e.options,f;f=k.title=n({style:{color:"#333333",fontSize:k.isStock?"16px":"18px"}},k.title,a);k=k.subtitle=n({style:{color:"#666666"}},k.subtitle,c);d([["title",a,f],["subtitle",c,k]],function(a,c){var b=a[0],k=e[b],d=a[1];a=a[2];k&&d&&(e[b]=k=k.destroy());a&&!k&&(e[b]=e.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).add(),e[b].update=function(a){e.setTitle(!c&&a,c&&a)},e[b].css(a.style))});e.layOutTitles(b)},
    layOutTitles:function(a){var c=0,b,e=this.renderer,k=this.spacingBox;d(["title","subtitle"],function(a){var b=this[a],d=this.options[a];a="title"===a?-3:d.verticalAlign?0:c+2;var f;b&&(f=d.style.fontSize,f=e.fontMetrics(f,b).b,b.css({width:(d.width||k.width+d.widthAdjust)+"px"}).align(h({y:a+f},d),!1,"spacingBox"),d.floating||d.verticalAlign||(c=Math.ceil(c+b.getBBox(d.useHTML).height)))},this);b=this.titleOffset!==c;this.titleOffset=c;!this.isDirtyBox&&b&&(this.isDirtyBox=this.isDirtyLegend=b,this.hasRendered&&
    I(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var c=this.options.chart,e=c.width,c=c.height,k=this.renderTo;b(e)||(this.containerWidth=a.getStyle(k,"width"));b(c)||(this.containerHeight=a.getStyle(k,"height"));this.chartWidth=Math.max(0,e||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(c,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(c){var b=this.renderTo;if(c)for(;b&&b.style;)b.hcOrigStyle&&(a.css(b,b.hcOrigStyle),
        delete b.hcOrigStyle),b.hcOrigDetached&&(l.body.removeChild(b),b.hcOrigDetached=!1),b=b.parentNode;else for(;b&&b.style;){l.body.contains(b)||b.parentNode||(b.hcOrigDetached=!0,l.body.appendChild(b));if("none"===a.getStyle(b,"display",!1)||b.hcOricDetached)b.hcOrigStyle={display:b.style.display,height:b.style.height,overflow:b.style.overflow},c={display:"block",overflow:"hidden"},b!==this.renderTo&&(c.height=0),a.css(b,c),b.offsetWidth||b.style.setProperty("display","block","important");b=b.parentNode;
        if(b===l.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,e=this.options,k=e.chart,d,f;b=this.renderTo;var q=a.uniqueKey(),z;b||(this.renderTo=b=k.renderTo);t(b)&&(this.renderTo=b=l.getElementById(b));b||a.error(13,!0);d=H(p(b,"data-highcharts-chart"));w(d)&&x[d]&&x[d].hasRendered&&x[d].destroy();p(b,"data-highcharts-chart",this.index);b.innerHTML="";k.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();
        d=this.chartWidth;f=this.chartHeight;z=h({position:"relative",overflow:"hidden",width:d+"px",height:f+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},k.style);this.container=b=u("div",{id:q},z,b);this._cursor=b.style.cursor;this.renderer=new (a[k.renderer]||a.Renderer)(b,d,f,null,k.forExport,e.exporting&&e.exporting.allowHTML);this.setClassName(k.className);this.renderer.setStyle(k.style);this.renderer.chartIndex=this.index;c(this,"afterGetContainer")},
    getMargins:function(a){var e=this.spacing,k=this.margin,d=this.titleOffset;this.resetMargins();d&&!b(k[0])&&(this.plotTop=Math.max(this.plotTop,d+this.options.title.margin+e[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(k,e);c(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,c=a.axisOffset=[0,0,0,0],e=a.margin;a.hasCartesianSeries&&d(a.axes,function(a){a.visible&&a.getOffset()});d(J,function(k,d){b(e[d])||(a[k]+=c[d])});a.setChartSize()},reflow:function(c){var e=
        this,k=e.options.chart,d=e.renderTo,f=b(k.width)&&b(k.height),q=k.width||a.getStyle(d,"width"),k=k.height||a.getStyle(d,"height"),d=c?c.target:N;if(!f&&!e.isPrinting&&q&&k&&(d===N||d===l)){if(q!==e.containerWidth||k!==e.containerHeight)a.clearTimeout(e.reflowTimeout),e.reflowTimeout=E(function(){e.container&&e.setSize(void 0,void 0,!1)},c?100:0);e.containerWidth=q;e.containerHeight=k}},setReflow:function(a){var c=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):
        (this.unbindReflow=C(N,"resize",function(a){c.reflow(a)}),C(this,"destroy",this.unbindReflow))},setSize:function(b,e,k){var f=this,q=f.renderer;f.isResizing+=1;a.setAnimation(k,f);f.oldChartHeight=f.chartHeight;f.oldChartWidth=f.chartWidth;void 0!==b&&(f.options.chart.width=b);void 0!==e&&(f.options.chart.height=e);f.getChartSize();b=q.globalAnimation;(b?D:m)(f.container,{width:f.chartWidth+"px",height:f.chartHeight+"px"},b);f.setChartSize(!0);q.setSize(f.chartWidth,f.chartHeight,k);d(f.axes,function(a){a.isDirty=
        !0;a.setScale()});f.isDirtyLegend=!0;f.isDirtyBox=!0;f.layOutTitles();f.getMargins();f.redraw(k);f.oldChartHeight=null;c(f,"resize");E(function(){f&&c(f,"endResize",null,function(){--f.isResizing})},G(b).duration)},setChartSize:function(a){var b=this.inverted,e=this.renderer,k=this.chartWidth,f=this.chartHeight,q=this.options.chart,z=this.spacing,B=this.clipOffset,n,h,m,v;this.plotLeft=n=Math.round(this.plotLeft);this.plotTop=h=Math.round(this.plotTop);this.plotWidth=m=Math.max(0,Math.round(k-n-this.marginRight));
        this.plotHeight=v=Math.max(0,Math.round(f-h-this.marginBottom));this.plotSizeX=b?v:m;this.plotSizeY=b?m:v;this.plotBorderWidth=q.plotBorderWidth||0;this.spacingBox=e.spacingBox={x:z[3],y:z[0],width:k-z[3]-z[1],height:f-z[0]-z[2]};this.plotBox=e.plotBox={x:n,y:h,width:m,height:v};k=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(k,B[3])/2);e=Math.ceil(Math.max(k,B[0])/2);this.clipBox={x:b,y:e,width:Math.floor(this.plotSizeX-Math.max(k,B[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-
                Math.max(k,B[2])/2-e))};a||d(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()});c(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){var a=this,c=a.options.chart;d(["margin","spacing"],function(b){var e=c[b],k=y(e)?e:[e,e,e,e];d(["Top","Right","Bottom","Left"],function(e,f){a[b][f]=I(c[b+e],k[f])})});d(J,function(c,b){a[c]=I(a.margin[b],a.spacing[b])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,e=this.chartWidth,
        k=this.chartHeight,f=this.chartBackground,d=this.plotBackground,q=this.plotBorder,z,B=this.plotBGImage,n=a.backgroundColor,h=a.plotBackgroundColor,m=a.plotBackgroundImage,v,g=this.plotLeft,H=this.plotTop,I=this.plotWidth,t=this.plotHeight,l=this.plotBox,E=this.clipRect,F=this.clipBox,w="animate";f||(this.chartBackground=f=b.rect().addClass("highcharts-background").add(),w="attr");z=a.borderWidth||0;v=z+(a.shadow?8:0);n={fill:n||"none"};if(z||f["stroke-width"])n.stroke=a.borderColor,n["stroke-width"]=
        z;f.attr(n).shadow(a.shadow);f[w]({x:v/2,y:v/2,width:e-v-z%2,height:k-v-z%2,r:a.borderRadius});w="animate";d||(w="attr",this.plotBackground=d=b.rect().addClass("highcharts-plot-background").add());d[w](l);d.attr({fill:h||"none"}).shadow(a.plotShadow);m&&(B?B.animate(l):this.plotBGImage=b.image(m,g,H,I,t).add());E?E.animate({width:F.width,height:F.height}):this.clipRect=b.clipRect(F);w="animate";q||(w="attr",this.plotBorder=q=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());q.attr({stroke:a.plotBorderColor,
        "stroke-width":a.plotBorderWidth||0,fill:"none"});q[w](q.crisp({x:g,y:H,width:I,height:t},-q.strokeWidth()));this.isDirtyBox=!1;c(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,c=a.options.chart,b,e=a.options.series,k,f;d(["inverted","angular","polar"],function(d){b=z[c.type||c.defaultSeriesType];f=c[d]||b&&b.prototype[d];for(k=e&&e.length;!f&&k--;)(b=z[e[k].type])&&b.prototype[d]&&(f=!0);a[d]=f})},linkSeries:function(){var a=this,b=a.series;d(b,function(a){a.linkedSeries.length=
        0});d(b,function(c){var b=c.options.linkedTo;t(b)&&(b=":previous"===b?a.series[c.index-1]:a.get(b))&&b.linkedParent!==c&&(b.linkedSeries.push(c),c.linkedParent=b,c.visible=I(c.options.visible,b.options.visible,c.visible))});c(this,"afterLinkSeries")},renderSeries:function(){d(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,c=a.options.labels;c.items&&d(c.items,function(b){var e=h(c.style,b.style),k=H(e.left)+a.plotLeft,f=H(e.top)+a.plotTop+12;delete e.left;delete e.top;
        a.renderer.text(b.html,k,f).attr({zIndex:2}).css(e).add()})},render:function(){var a=this.axes,c=this.renderer,b=this.options,e,k,f;this.setTitle();this.legend=new v(this,b.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();b=this.plotWidth;e=this.plotHeight=Math.max(this.plotHeight-21,0);d(a,function(a){a.setScale()});this.getAxisMargins();k=1.1<b/this.plotWidth;f=1.05<e/this.plotHeight;if(k||f)d(a,function(a){(a.horiz&&k||!a.horiz&&f)&&a.setTickInterval(!0)}),this.getMargins();
        this.drawChartBox();this.hasCartesianSeries&&d(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=c.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var c=this;a=n(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&
    (N.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){c.credits=c.credits.destroy();c.addCredits(a)})},destroy:function(){var b=this,e=b.axes,k=b.series,f=b.container,q,z=f&&f.parentNode;c(b,"destroy");b.renderer.forExport?a.erase(x,b):x[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");B(b);for(q=e.length;q--;)e[q]=e[q].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();
        for(q=k.length;q--;)k[q]=k[q].destroy();d("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});f&&(f.innerHTML="",B(f),z&&r(f));F(b,function(a,c){delete b[c]})},firstRender:function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();
        d(b.series||[],function(c){a.initSeries(c)});a.linkSeries();c(a,"beforeRender");q&&(a.pointer=new q(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){d([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);c(this,"load");c(this,"render");b(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})})(L);(function(a){var C=a.addEvent,D=a.Chart,G=a.each;C(D,"afterSetChartSize",function(p){var l=
    this.options.chart.scrollablePlotArea;(l=l&&l.minWidth)&&!this.renderer.forExport&&(this.scrollablePixels=l=Math.max(0,l-this.chartWidth))&&(this.plotWidth+=l,this.clipBox.width+=l,p.skipAxes||G(this.axes,function(g){1===g.side?g.getPlotLinePath=function(){var l=this.right,p;this.right=l-g.chart.scrollablePixels;p=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=l;return p}:(g.setAxisSize(),g.setAxisTranslation())}))});C(D,"render",function(){this.scrollablePixels?(this.setUpScrolling&&
this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});D.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};D.prototype.applyFixed=function(){var p=this.container,
    l,g,u=!this.fixedDiv;u&&(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.fixedRenderer=l=new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=l.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(.85).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),a.each([this.inverted?".highcharts-xaxis":
    ".highcharts-yaxis",this.inverted?".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-subtitle",".highcharts-title",".highcharts-legend-checkbox"],function(g){a.each(p.querySelectorAll(g),function(a){(a.namespaceURI===l.SVG_NS?l.box:l.box.parentNode).appendChild(a);a.style.pointerEvents="auto"})}));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);g=this.chartWidth+this.scrollablePixels;a.stop(this.container);
    this.container.style.width=g+"px";this.renderer.boxWrapper.attr({width:g,height:this.chartHeight,viewBox:[0,0,g,this.chartHeight].join(" ")});this.chartBackground.attr({width:g});u&&(g=this.options.chart.scrollablePlotArea,g.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixels*g.scrollPositionX));u=this.axisOffset;g=this.plotTop-u[0]-1;var u=this.plotTop+this.plotHeight+u[2],A=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?
            ["M",0,g,"L",this.plotLeft-1,g,"L",this.plotLeft-1,u,"L",0,u,"Z","M",A,g,"L",this.chartWidth,g,"L",this.chartWidth,u,"L",A,u,"Z"]:["M",0,0]})}})(L);(function(a){var C,D=a.each,G=a.extend,p=a.erase,l=a.fireEvent,g=a.format,u=a.isArray,A=a.isNumber,r=a.pick,x=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,b,d){this.series=a;this.color=a.color;this.applyOptions(b,d);a.options.colorByPoint?(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter],b=
        b.length,d=a.colorCounter,a.colorCounter++,a.colorCounter===b&&(a.colorCounter=0)):d=a.colorIndex;this.colorIndex=r(this.colorIndex,d);a.chart.pointCount++;l(this,"afterInit");return this},applyOptions:function(a,b){var d=this.series,h=d.options.pointValKey||d.pointValKey;a=C.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;h&&(this.y=this[h]);this.isNull=r(this.isValid&&!this.isValid(),null===this.x||!A(this.y,!0));this.selected&&
    (this.state="select");"name"in this&&void 0===b&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===b?d.autoIncrement(this):b);return this},setNestedProperty:function(g,b,d){d=d.split(".");a.reduce(d,function(d,f,c,e){d[f]=e.length-1===c?b:a.isObject(d[f],!0)?d[f]:{};return d[f]},g);return g},optionsToObject:function(g){var b={},d=this.series,h=d.options.keys,f=h||d.pointArrayMap||["y"],c=f.length,e=0,m=0;if(A(g)||null===g)b[f[0]]=g;else if(u(g))for(!h&&
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      g.length>c&&(d=typeof g[0],"string"===d?b.name=g[0]:"number"===d&&(b.x=g[0]),e++);m<c;)h&&void 0===g[e]||(0<f[m].indexOf(".")?a.Point.prototype.setNestedProperty(b,g[e],f[m]):b[f[m]]=g[e]),e++,m++;else"object"===typeof g&&(b=g,g.dataLabels&&(d._hasPointLabels=!0),g.marker&&(d._hasPointMarkers=!0));return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?
        " highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,b=a.zones,a=a.zoneAxis||"y",d=0,h;for(h=b[d];this[a]>=h.value;)h=b[++d];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=h&&h.color&&!this.options.color?h.color:this.nonZonedColor;return h},destroy:function(){var a=this.series.chart,b=a.hoverPoints,d;a.pointCount--;
        b&&(this.setState(),p(b,this),b.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)x(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(d in this)this[d]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,d=6;d--;)b=a[d],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||
            this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,d=b.tooltipOptions,h=r(d.valueDecimals,""),f=d.valuePrefix||"",c=d.valueSuffix||"";D(b.pointArrayMap||["y"],function(b){b="{point."+b;if(f||c)a=a.replace(RegExp(b+"}","g"),f+b+"}"+c);a=a.replace(RegExp(b+"}","g"),b+":,."+h+"f}")});return g(a,{point:this,series:this.series},b.chart.time)},firePointEvent:function(a,b,d){var h=this,f=this.series.options;
        (f.point.events[a]||h.options&&h.options.events&&h.options.events[a])&&this.importEvents();"click"===a&&f.allowPointSelect&&(d=function(a){h.select&&h.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});l(this,a,b,d)},visible:!0}})(L);(function(a){var C=a.addEvent,D=a.animObject,G=a.arrayMax,p=a.arrayMin,l=a.correctFloat,g=a.defaultOptions,u=a.defaultPlotOptions,A=a.defined,r=a.each,x=a.erase,m=a.extend,b=a.fireEvent,d=a.grep,h=a.isArray,f=a.isNumber,c=a.isString,e=a.merge,w=a.objectEach,y=a.pick,t=a.removeEvent,
    v=a.splat,J=a.SVGElement,n=a.syncTimeout,F=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,
            -1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x",
        "y"],coll:"series",init:function(a,c){var e=this,f,d=a.series,k;e.chart=a;e.options=c=e.setOptions(c);e.linkedSeries=[];e.bindAxes();m(e,{name:c.name,state:"",visible:!1!==c.visible,selected:!0===c.selected});f=c.events;w(f,function(a,c){C(e,c,a)});if(f&&f.click||c.point&&c.point.events&&c.point.events.click||c.allowPointSelect)a.runTrackerClick=!0;e.getColor();e.getSymbol();r(e.parallelArrays,function(a){e[a+"Data"]=[]});e.setData(c.data,!1);e.isCartesian&&(a.hasCartesianSeries=!0);d.length&&(k=
        d[d.length-1]);e._i=y(k&&k._i,-1)+1;a.orderSeries(this.insert(d));b(this,"afterInit")},insert:function(a){var c=this.options.index,b;if(f(c)){for(b=a.length;b--;)if(c>=y(a[b].options.index,a[b]._i)){a.splice(b+1,0,this);break}-1===b&&a.unshift(this);b+=1}else a.push(this);return y(b,a.length-1)},bindAxes:function(){var c=this,b=c.options,e=c.chart,f;r(c.axisTypes||[],function(d){r(e[d],function(a){f=a.options;if(b[d]===f.index||void 0!==b[d]&&b[d]===f.id||void 0===b[d]&&0===f.index)c.insert(a.series),
        c[d]=a,a.isDirty=!0});c[d]||c.optionalAxis===d||a.error(18,!0)})},updateParallelArrays:function(a,c){var b=a.series,e=arguments,d=f(c)?function(e){var k="y"===e&&b.toYData?b.toYData(a):a[e];b[e+"Data"][c]=k}:function(a){Array.prototype[c].apply(b[a+"Data"],Array.prototype.slice.call(e,2))};r(b.parallelArrays,d)},autoIncrement:function(){var a=this.options,c=this.xIncrement,b,e=a.pointIntervalUnit,f=this.chart.time,c=y(c,a.pointStart,0);this.pointInterval=b=y(this.pointInterval,a.pointInterval,1);
        e&&(a=new f.Date(c),"day"===e?f.set("Date",a,f.get("Date",a)+b):"month"===e?f.set("Month",a,f.get("Month",a)+b):"year"===e&&f.set("FullYear",a,f.get("FullYear",a)+b),b=a.getTime()-c);this.xIncrement=c+b;return c},setOptions:function(a){var c=this.chart,f=c.options,d=f.plotOptions,q=(c.userOptions||{}).plotOptions||{},k=d[this.type];this.userOptions=a;c=e(k,d.series,a);this.tooltipOptions=e(g.tooltip,g.plotOptions.series&&g.plotOptions.series.tooltip,g.plotOptions[this.type].tooltip,f.tooltip.userOptions,
        d.series&&d.series.tooltip,d[this.type].tooltip,a.tooltip);this.stickyTracking=y(a.stickyTracking,q[this.type]&&q[this.type].stickyTracking,q.series&&q.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:c.stickyTracking);null===k.marker&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",color:c.negativeColor,fillColor:c.negativeFillColor});
        a.length&&A(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});b(this,"afterSetOptions",{options:c});return c},getName:function(){return this.name||"Series "+(this.index+1)},getCyclic:function(a,c,b){var e,f=this.chart,k=this.userOptions,d=a+"Index",q=a+"Counter",n=b?b.length:y(f.options.chart[a+"Count"],f[a+"Count"]);c||(e=y(k[d],k["_"+d]),A(e)||(f.series.length||(f[q]=0),k["_"+d]=e=f[q]%n,f[q]+=1),b&&(c=b[e]));void 0!==e&&(this[d]=e);this[a]=c},getColor:function(){this.options.colorByPoint?
        this.options.color=null:this.getCyclic("color",this.options.color||u[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(c){var b=this.options,e=this.points,d=[],q,k,n,h=this.requireSorting;r(c,function(c){var k;k=a.defined(c)&&this.pointClass.prototype.optionsToObject.call({series:this},c).x;f(k)&&(k=a.inArray(k,this.xData,n),-1===k?
        d.push(c):c!==b.data[k]?(e[k].update(c,!1,null,!1),e[k].touched=!0,h&&(n=k)):e[k]&&(e[k].touched=!0),q=!0)},this);if(q)for(c=e.length;c--;)k=e[c],k.touched||k.remove(!1),k.touched=!1;else if(c.length===e.length)r(c,function(a,c){e[c].update&&a!==b.data[c]&&e[c].update(a,!1,null,!1)});else return!1;r(d,function(a){this.addPoint(a,!1)},this);return!0},setData:function(b,e,d,B){var q=this,k=q.points,n=k&&k.length||0,g,v=q.options,t=q.chart,m=null,l=q.xAxis,I=v.turboThreshold,F=this.xData,H=this.yData,
        w=(g=q.pointArrayMap)&&g.length,J;b=b||[];g=b.length;e=y(e,!0);!1!==B&&g&&n&&!q.cropped&&!q.hasGroupedData&&q.visible&&!q.isSeriesBoosting&&(J=this.updateData(b));if(!J){q.xIncrement=null;q.colorCounter=0;r(this.parallelArrays,function(a){q[a+"Data"].length=0});if(I&&g>I){for(d=0;null===m&&d<g;)m=b[d],d++;if(f(m))for(d=0;d<g;d++)F[d]=this.autoIncrement(),H[d]=b[d];else if(h(m))if(w)for(d=0;d<g;d++)m=b[d],F[d]=m[0],H[d]=m.slice(1,w+1);else for(d=0;d<g;d++)m=b[d],F[d]=m[0],H[d]=m[1];else a.error(12)}else for(d=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            0;d<g;d++)void 0!==b[d]&&(m={series:q},q.pointClass.prototype.applyOptions.apply(m,[b[d]]),q.updateParallelArrays(m,d));H&&c(H[0])&&a.error(14,!0);q.data=[];q.options.data=q.userOptions.data=b;for(d=n;d--;)k[d]&&k[d].destroy&&k[d].destroy();l&&(l.minRange=l.userMinRange);q.isDirty=t.isDirtyBox=!0;q.isDirtyData=!!k;d=!1}"point"===v.legendType&&(this.processData(),this.generatePoints());e&&t.redraw(d)},processData:function(c){var b=this.xData,e=this.yData,d=b.length,f;f=0;var k,q,n=this.xAxis,h,g=this.options;
        h=g.cropThreshold;var v=this.getExtremesFromAll||g.getExtremesFromAll,m=this.isCartesian,g=n&&n.val2lin,t=n&&n.isLog,l=this.requireSorting,F,w;if(m&&!this.isDirty&&!n.isDirty&&!this.yAxis.isDirty&&!c)return!1;n&&(c=n.getExtremes(),F=c.min,w=c.max);m&&this.sorted&&!v&&(!h||d>h||this.forceCrop)&&(b[d-1]<F||b[0]>w?(b=[],e=[]):this.yData&&(b[0]<F||b[d-1]>w)&&(f=this.cropData(this.xData,this.yData,F,w),b=f.xData,e=f.yData,f=f.start,k=!0));for(h=b.length||1;--h;)d=t?g(b[h])-g(b[h-1]):b[h]-b[h-1],0<d&&(void 0===
            q||d<q)?q=d:0>d&&l&&(a.error(15),l=!1);this.cropped=k;this.cropStart=f;this.processedXData=b;this.processedYData=e;this.closestPointRange=q},cropData:function(a,c,b,e,d){var k=a.length,f=0,q=k,n;d=y(d,this.cropShoulder,1);for(n=0;n<k;n++)if(a[n]>=b){f=Math.max(0,n-d);break}for(b=n;b<k;b++)if(a[b]>e){q=b+d;break}return{xData:a.slice(f,q),yData:c.slice(f,q),start:f,end:q}},generatePoints:function(){var a=this.options,c=a.data,b=this.data,e,d=this.processedXData,k=this.processedYData,f=this.pointClass,
        n=d.length,h=this.cropStart||0,g,m=this.hasGroupedData,a=a.keys,t,l=[],F;b||m||(b=[],b.length=c.length,b=this.data=b);a&&m&&(this.options.keys=!1);for(F=0;F<n;F++)g=h+F,m?(t=(new f).init(this,[d[F]].concat(v(k[F]))),t.dataGroup=this.groupMap[F]):(t=b[g])||void 0===c[g]||(b[g]=t=(new f).init(this,c[g],d[F])),t&&(t.index=g,l[F]=t);this.options.keys=a;if(b&&(n!==(e=b.length)||m))for(F=0;F<e;F++)F!==h||m||(F+=n),b[F]&&(b[F].destroyElements(),b[F].plotX=void 0);this.data=b;this.points=l},getExtremes:function(a){var c=
        this.yAxis,b=this.processedXData,e,d=[],k=0;e=this.xAxis.getExtremes();var q=e.min,n=e.max,g,v,m=this.requireSorting?1:0,t,l;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(l=0;l<e;l++)if(v=b[l],t=a[l],g=(f(t,!0)||h(t))&&(!c.positiveValuesOnly||t.length||0<t),v=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(b[l+m]||v)>=q&&(b[l-m]||v)<=n,g&&v)if(g=t.length)for(;g--;)"number"===typeof t[g]&&(d[k++]=t[g]);else d[k++]=t;this.dataMin=p(d);this.dataMax=G(d)},translate:function(){this.processedXData||
    this.processData();this.generatePoints();var a=this.options,c=a.stacking,e=this.xAxis,d=e.categories,n=this.yAxis,k=this.points,h=k.length,g=!!this.modifyValue,v=a.pointPlacement,t="between"===v||f(v),m=a.threshold,F=a.startFromThreshold?m:0,w,J,r,p,u=Number.MAX_VALUE;"between"===v&&(v=.5);f(v)&&(v*=y(a.pointRange||e.pointRange));for(a=0;a<h;a++){var x=k[a],D=x.x,C=x.y;J=x.low;var G=c&&n.stacks[(this.negStacks&&C<(F?0:m)?"-":"")+this.stackKey],L;n.positiveValuesOnly&&null!==C&&0>=C&&(x.isNull=!0);
        x.plotX=w=l(Math.min(Math.max(-1E5,e.translate(D,0,0,0,1,v,"flags"===this.type)),1E5));c&&this.visible&&!x.isNull&&G&&G[D]&&(p=this.getStackIndicator(p,D,this.index),L=G[D],C=L.points[p.key],J=C[0],C=C[1],J===F&&p.key===G[D].base&&(J=y(f(m)&&m,n.min)),n.positiveValuesOnly&&0>=J&&(J=null),x.total=x.stackTotal=L.total,x.percentage=L.total&&x.y/L.total*100,x.stackY=C,L.setOffset(this.pointXOffset||0,this.barW||0));x.yBottom=A(J)?Math.min(Math.max(-1E5,n.translate(J,0,1,0,1)),1E5):null;g&&(C=this.modifyValue(C,
            x));x.plotY=J="number"===typeof C&&Infinity!==C?Math.min(Math.max(-1E5,n.translate(C,0,1,0,1)),1E5):void 0;x.isInside=void 0!==J&&0<=J&&J<=n.len&&0<=w&&w<=e.len;x.clientX=t?l(e.translate(D,0,0,0,1,v)):w;x.negative=x.y<(m||0);x.category=d&&void 0!==d[x.x]?d[x.x]:x.x;x.isNull||(void 0!==r&&(u=Math.min(u,Math.abs(w-r))),r=w);x.zone=this.zones.length&&x.getZone()}this.closestPointRangePx=u;b(this,"afterTranslate")},getValidPoints:function(a,c){var b=this.chart;return d(a||this.points||[],function(a){return c&&
    !b.isInsidePlot(a.plotX,a.plotY,b.inverted)?!1:!a.isNull})},setClip:function(a){var c=this.chart,b=this.options,e=c.renderer,d=c.inverted,k=this.clipBox,f=k||c.clipBox,q=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,f.height,b.xAxis,b.yAxis].join(),n=c[q],h=c[q+"m"];n||(a&&(f.width=0,d&&(f.x=c.plotSizeX),c[q+"m"]=h=e.clipRect(d?c.plotSizeX+99:-99,d?-c.plotLeft:-c.plotTop,99,d?c.chartWidth:c.chartHeight)),c[q]=n=e.clipRect(f),n.count={length:0});a&&!n.count[this.index]&&(n.count[this.index]=
        !0,n.count.length+=1);!1!==b.clip&&(this.group.clip(a||k?n:c.clipRect),this.markerGroup.clip(h),this.sharedClipKey=q);a||(n.count[this.index]&&(delete n.count[this.index],--n.count.length),0===n.count.length&&q&&c[q]&&(k||(c[q]=c[q].destroy()),c[q+"m"]&&(c[q+"m"]=c[q+"m"].destroy())))},animate:function(a){var c=this.chart,b=D(this.options.animation),e;a?this.setClip(b):(e=this.sharedClipKey,(a=c[e])&&a.animate({width:c.plotSizeX,x:0},b),c[e+"m"]&&c[e+"m"].animate({width:c.plotSizeX+99,x:0},b),this.animate=
        null)},afterAnimate:function(){this.setClip();b(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,c=this.chart,b,e,d,k,f=this.options.marker,n,h,g,v=this[this.specialGroup]||this.markerGroup,t,m=y(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=f.enabledThreshold*f.radius);if(!1!==f.enabled||this._hasPointMarkers)for(b=0;b<a.length;b++)e=a[b],k=e.graphic,n=e.marker||{},h=!!e.marker,d=m&&void 0===n.enabled||n.enabled,g=e.isInside,d&&!e.isNull?(d=
        y(n.symbol,this.symbol),t=this.markerAttribs(e,e.selected&&"select"),k?k[g?"show":"hide"](!0).animate(t):g&&(0<t.width||e.hasImage)&&(e.graphic=k=c.renderer.symbol(d,t.x,t.y,t.width,t.height,h?n:f).add(v)),k&&k.attr(this.pointAttribs(e,e.selected&&"select")),k&&k.addClass(e.getClassName(),!0)):k&&(e.graphic=k.destroy())},markerAttribs:function(a,c){var b=this.options.marker,e=a.marker||{},d=e.symbol||b.symbol,k=y(e.radius,b.radius);c&&(b=b.states[c],c=e.states&&e.states[c],k=y(c&&c.radius,b&&b.radius,
        k+(b&&b.radiusPlus||0)));a.hasImage=d&&0===d.indexOf("url");a.hasImage&&(k=0);a={x:Math.floor(a.plotX)-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,c){var b=this.options.marker,e=a&&a.options,d=e&&e.marker||{},k=this.color,f=e&&e.color,q=a&&a.color,e=y(d.lineWidth,b.lineWidth);a=a&&a.zone&&a.zone.color;k=f||a||q||k;a=d.fillColor||b.fillColor||k;k=d.lineColor||b.lineColor||k;c&&(b=b.states[c],c=d.states&&d.states[c]||{},e=y(c.lineWidth,b.lineWidth,e+y(c.lineWidthPlus,
        b.lineWidthPlus,0)),a=c.fillColor||b.fillColor||a,k=c.lineColor||b.lineColor||k);return{stroke:k,"stroke-width":e,fill:a}},destroy:function(){var c=this,e=c.chart,d=/AppleWebKit\/533/.test(F.navigator.userAgent),f,n,k=c.data||[],h,g;b(c,"destroy");t(c);r(c.axisTypes||[],function(a){(g=c[a])&&g.series&&(x(g.series,c),g.isDirty=g.forceRedraw=!0)});c.legendItem&&c.chart.legend.destroyItem(c);for(n=k.length;n--;)(h=k[n])&&h.destroy&&h.destroy();c.points=null;a.clearTimeout(c.animationTimeout);w(c,function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   c){a instanceof J&&!a.survive&&(f=d&&"group"===c?"hide":"destroy",a[f]())});e.hoverSeries===c&&(e.hoverSeries=null);x(e.series,c);e.orderSeries();w(c,function(a,b){delete c[b]})},getGraphPath:function(a,c,b){var e=this,d=e.options,k=d.step,f,n=[],q=[],h;a=a||e.points;(f=a.reversed)&&a.reverse();(k={right:1,center:2}[k]||k&&3)&&f&&(k=4-k);!d.connectNulls||c||b||(a=this.getValidPoints(a));r(a,function(f,g){var z=f.plotX,v=f.plotY,B=a[g-1];(f.leftCliff||B&&B.rightCliff)&&!b&&(h=!0);f.isNull&&!A(c)&&
    0<g?h=!d.connectNulls:f.isNull&&!c?h=!0:(0===g||h?g=["M",f.plotX,f.plotY]:e.getPointSpline?g=e.getPointSpline(a,f,g):k?(g=1===k?["L",B.plotX,v]:2===k?["L",(B.plotX+z)/2,B.plotY,"L",(B.plotX+z)/2,v]:["L",z,B.plotY],g.push("L",z,v)):g=["L",z,v],q.push(f.x),k&&(q.push(f.x),2===k&&q.push(f.x)),n.push.apply(n,g),h=!1)});n.xMap=q;return e.graphPath=n},drawGraph:function(){var a=this,c=this.options,b=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",c.lineColor||this.color,c.dashStyle]],
        e=a.getZonesGraphs(e);r(e,function(e,d){var f=e[0],k=a[f];k?(k.endX=a.preventGraphAnimation?null:b.xMap,k.animate({d:b})):b.length&&(a[f]=a.chart.renderer.path(b).addClass(e[1]).attr({zIndex:1}).add(a.group),k={stroke:e[2],"stroke-width":c.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?k.dashstyle=e[3]:"square"!==c.linecap&&(k["stroke-linecap"]=k["stroke-linejoin"]="round"),k=a[f].attr(k).shadow(2>d&&c.shadow));k&&(k.startX=b.xMap,k.isArea=b.isArea)})},getZonesGraphs:function(a){r(this.zones,function(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     b){a.push(["zone-graph-"+b,"highcharts-graph highcharts-zone-graph-"+b+" "+(c.className||""),c.color||this.color,c.dashStyle||this.options.dashStyle])},this);return a},applyZones:function(){var a=this,c=this.chart,b=c.renderer,e=this.zones,d,f,n=this.clips||[],h,g=this.graph,v=this.area,t=Math.max(c.chartWidth,c.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],l,F,w=c.inverted,J,p,u,x,A=!1;e.length&&(g||v)&&m&&void 0!==m.min&&(F=m.reversed,J=m.horiz,g&&!this.showLine&&g.hide(),v&&v.hide(),l=m.getExtremes(),
        r(e,function(e,k){d=F?J?c.plotWidth:0:J?0:m.toPixels(l.min);d=Math.min(Math.max(y(f,d),0),t);f=Math.min(Math.max(Math.round(m.toPixels(y(e.value,l.max),!0)),0),t);A&&(d=f=m.toPixels(l.max));p=Math.abs(d-f);u=Math.min(d,f);x=Math.max(d,f);m.isXAxis?(h={x:w?x:u,y:0,width:p,height:t},J||(h.x=c.plotHeight-h.x)):(h={x:0,y:w?x:u,width:t,height:p},J&&(h.y=c.plotWidth-h.y));w&&b.isVML&&(h=m.isXAxis?{x:0,y:F?u:x,height:h.width,width:c.chartWidth}:{x:h.y-c.plotLeft-c.spacingBox.x,y:0,width:h.height,height:c.chartHeight});
            n[k]?n[k].animate(h):(n[k]=b.clipRect(h),g&&a["zone-graph-"+k].clip(n[k]),v&&a["zone-area-"+k].clip(n[k]));A=e.value>l.max;a.resetZones&&0===f&&(f=void 0)}),this.clips=n)},invertGroups:function(a){function c(){r(["group","markerGroup"],function(c){b[c]&&(e.renderer.isVML&&b[c].attr({width:b.yAxis.len,height:b.xAxis.len}),b[c].width=b.yAxis.len,b[c].height=b.xAxis.len,b[c].invert(a))})}var b=this,e=b.chart,d;b.xAxis&&(d=C(e,"resize",c),C(b,"destroy",d),c(a),b.invertGroups=c)},plotGroup:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               c,b,e,d){var f=this[a],n=!f;n&&(this[a]=f=this.chart.renderer.g().attr({zIndex:e||.1}).add(d));f.addClass("highcharts-"+c+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(A(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(f.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);f.attr({visibility:b})[n?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,c=this.xAxis,b=this.yAxis;a.inverted&&(c=b,
        b=this.xAxis);return{translateX:c?c.left:a.plotLeft,translateY:b?b.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,c=a.chart,e,d=a.options,f=!!a.animate&&c.renderer.isSVG&&D(d.animation).duration,k=a.visible?"inherit":"hidden",h=d.zIndex,g=a.hasRendered,v=c.seriesGroup,t=c.inverted;e=a.plotGroup("group","series",k,h,v);a.markerGroup=a.plotGroup("markerGroup","markers",k,h,v);f&&a.animate(!0);e.inverted=a.isCartesian?t:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&
    a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(t);!1===d.clip||a.sharedClipKey||g||e.clip(c.clipRect);f&&a.animate();g||(a.animationTimeout=n(function(){a.afterAnimate()},f));a.isDirty=!1;a.hasRendered=!0;b(a,"afterRender")},redraw:function(){var a=this.chart,c=this.isDirty||this.isDirtyData,b=this.group,e=this.xAxis,d=this.yAxis;b&&(a.inverted&&b.attr({width:a.plotWidth,height:a.plotHeight}),b.animate({translateX:y(e&&
            e.left,a.plotLeft),translateY:y(d&&d.top,a.plotTop)}));this.translate();this.render();c&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,c){var b=this.xAxis,e=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?b.len-a.chartY+b.pos:a.chartX-b.pos,plotY:d?e.len-a.chartX+e.pos:a.chartY-e.pos},c)},buildKDTree:function(){function a(b,e,d){var f,k;if(k=b&&b.length)return f=c.kdAxisArray[e%d],b.sort(function(a,c){return a[f]-c[f]}),k=Math.floor(k/2),{point:b[k],
        left:a(b.slice(0,k),e+1,d),right:a(b.slice(k+1),e+1,d)}}this.buildingKdTree=!0;var c=this,b=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;n(function(){c.kdTree=a(c.getValidPoints(null,!c.directTouch),b,b);c.buildingKdTree=!1},c.options.kdNow?0:1)},searchKDTree:function(a,c){function b(a,c,k,h){var g=c.point,q=e.kdAxisArray[k%h],v,z,t=g;z=A(a[d])&&A(g[d])?Math.pow(a[d]-g[d],2):null;v=A(a[f])&&A(g[f])?Math.pow(a[f]-g[f],2):null;v=(z||0)+(v||0);g.dist=A(v)?Math.sqrt(v):Number.MAX_VALUE;
        g.distX=A(z)?Math.sqrt(z):Number.MAX_VALUE;q=a[q]-g[q];v=0>q?"left":"right";z=0>q?"right":"left";c[v]&&(v=b(a,c[v],k+1,h),t=v[n]<t[n]?v:g);c[z]&&Math.sqrt(q*q)<t[n]&&(a=b(a,c[z],k+1,h),t=a[n]<t[n]?a:t);return t}var e=this,d=this.kdAxisArray[0],f=this.kdAxisArray[1],n=c?"distX":"dist";c=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return b(a,this.kdTree,c,c)}})})(L);(function(a){var C=a.Axis,D=a.Chart,G=a.correctFloat,p=a.defined,
    l=a.destroyObjectProperties,g=a.each,u=a.format,A=a.objectEach,r=a.pick,x=a.Series;a.StackItem=function(a,b,d,h,f){var c=a.chart.inverted;this.axis=a;this.isNegative=d;this.options=b;this.x=h;this.total=null;this.points={};this.stack=f;this.rightCliff=this.leftCliff=0;this.alignOptions={align:b.align||(c?d?"left":"right":"center"),verticalAlign:b.verticalAlign||(c?"middle":d?"bottom":"top"),y:r(b.y,c?4:d?14:-6),x:r(b.x,c?d?-6:6:0)};this.textAlign=b.textAlign||(c?d?"right":"left":"center")};a.StackItem.prototype=
    {destroy:function(){l(this,this.axis)},render:function(a){var b=this.axis.chart,d=this.options,h=d.format,h=h?u(h,this,b.time):d.formatter.call(this);this.label?this.label.attr({text:h,visibility:"hidden"}):this.label=b.renderer.text(h,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a);this.label.labelrank=b.plotHeight},setOffset:function(a,b){var d=this.axis,h=d.chart,f=d.translate(d.usePercentage?100:this.total,0,0,0,1),c=d.translate(0),
            c=p(f)&&Math.abs(f-c);a=h.xAxis[0].translate(this.x)+a;d=p(f)&&this.getStackBox(h,this,a,f,b,c,d);(b=this.label)&&d&&(b.align(this.alignOptions,null,d),d=b.alignAttr,b[!1===this.options.crop||h.isInsidePlot(d.x,d.y)?"show":"hide"](!0))},getStackBox:function(a,b,d,h,f,c,e){var g=b.axis.reversed,m=a.inverted;a=e.height+e.pos-(m?a.plotLeft:a.plotTop);b=b.isNegative&&!g||!b.isNegative&&g;return{x:m?b?h:h-c:d,y:m?a-d-f:b?a-h-c:a-h,width:m?c:f,height:m?f:c}}};D.prototype.getStacks=function(){var a=this;
    g(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});g(a.series,function(b){!b.options.stacking||!0!==b.visible&&!1!==a.options.chart.ignoreHiddenSeries||(b.stackKey=b.type+r(b.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,b=r(this.options.reversedStacks,!0),d=a.length,h;if(!this.isXAxis){this.usePercentage=!1;for(h=d;h--;)a[b?h:d-h-1].setStackedPoints();for(h=0;h<d;h++)a[h].modifyStacks()}};C.prototype.renderStackTotals=function(){var a=this.chart,
    b=a.renderer,d=this.stacks,h=this.stackTotalGroup;h||(this.stackTotalGroup=h=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());h.translate(a.plotLeft,a.plotTop);A(d,function(a){A(a,function(a){a.render(h)})})};C.prototype.resetStacks=function(){var a=this,b=a.stacks;a.isXAxis||A(b,function(b){A(b,function(d,f){d.touched<a.stacksTouched?(d.destroy(),delete b[f]):(d.total=null,d.cumulative=null)})})};C.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=
    this.oldStacks),A(a,function(a){A(a,function(a){a.cumulative=a.total})}))};x.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var g=this.processedXData,b=this.processedYData,d=[],h=b.length,f=this.options,c=f.threshold,e=r(f.startFromThreshold&&c,0),l=f.stack,f=f.stacking,y=this.stackKey,t="-"+y,v=this.negStacks,J=this.yAxis,n=J.stacks,F=J.oldStacks,q,I,H,B,z,k,E;J.stacksTouched+=1;for(z=0;z<h;z++)k=g[z],E=b[z],
    q=this.getStackIndicator(q,k,this.index),B=q.key,H=(I=v&&E<(e?0:c))?t:y,n[H]||(n[H]={}),n[H][k]||(F[H]&&F[H][k]?(n[H][k]=F[H][k],n[H][k].total=null):n[H][k]=new a.StackItem(J,J.options.stackLabels,I,k,l)),H=n[H][k],null!==E?(H.points[B]=H.points[this.index]=[r(H.cumulative,e)],p(H.cumulative)||(H.base=B),H.touched=J.stacksTouched,0<q.index&&!1===this.singleStacks&&(H.points[B][0]=H.points[this.index+","+k+",0"][0])):H.points[B]=H.points[this.index]=null,"percent"===f?(I=I?y:t,v&&n[I]&&n[I][k]?(I=
    n[I][k],H.total=I.total=Math.max(I.total,H.total)+Math.abs(E)||0):H.total=G(H.total+(Math.abs(E)||0))):H.total=G(H.total+(E||0)),H.cumulative=r(H.cumulative,e)+(E||0),null!==E&&(H.points[B].push(H.cumulative),d[z]=H.cumulative);"percent"===f&&(J.usePercentage=!0);this.stackedYData=d;J.oldStacks={}}};x.prototype.modifyStacks=function(){var a=this,b=a.stackKey,d=a.yAxis.stacks,h=a.processedXData,f,c=a.options.stacking;a[c+"Stacker"]&&g([b,"-"+b],function(b){for(var e=h.length,g,t;e--;)if(g=h[e],f=a.getStackIndicator(f,
    g,a.index,b),t=(g=d[b]&&d[b][g])&&g.points[f.key])a[c+"Stacker"](t,g,e)})};x.prototype.percentStacker=function(a,b,d){b=b.total?100/b.total:0;a[0]=G(a[0]*b);a[1]=G(a[1]*b);this.stackedYData[d]=a[1]};x.prototype.getStackIndicator=function(a,b,d,h){!p(a)||a.x!==b||h&&a.key!==h?a={x:b,index:0,key:h}:a.index++;a.key=[d,b,a.index].join();return a}})(L);(function(a){var C=a.addEvent,D=a.animate,G=a.Axis,p=a.createElement,l=a.css,g=a.defined,u=a.each,A=a.erase,r=a.extend,x=a.fireEvent,m=a.inArray,b=a.isNumber,
    d=a.isObject,h=a.isArray,f=a.merge,c=a.objectEach,e=a.pick,w=a.Point,y=a.Series,t=a.seriesTypes,v=a.setAnimation,J=a.splat;r(a.Chart.prototype,{addSeries:function(a,c,b){var d,f=this;a&&(c=e(c,!0),x(f,"addSeries",{options:a},function(){d=f.initSeries(a);f.isDirtyLegend=!0;f.linkSeries();x(f,"afterAddSeries");c&&f.redraw(b)}));return d},addAxis:function(a,c,b,d){var n=c?"xAxis":"yAxis",h=this.options;a=f(a,{index:this[n].length,isX:c});c=new G(this,a);h[n]=J(h[n]||{});h[n].push(a);e(b,!0)&&this.redraw(d);
        return c},showLoading:function(a){var c=this,b=c.options,e=c.loadingDiv,d=b.loading,f=function(){e&&l(e,{left:c.plotLeft+"px",top:c.plotTop+"px",width:c.plotWidth+"px",height:c.plotHeight+"px"})};e||(c.loadingDiv=e=p("div",{className:"highcharts-loading highcharts-loading-hidden"},null,c.container),c.loadingSpan=p("span",{className:"highcharts-loading-inner"},null,e),C(c,"redraw",f));e.className="highcharts-loading";c.loadingSpan.innerHTML=a||b.lang.loading;l(e,r(d.style,{zIndex:10}));l(c.loadingSpan,
        d.labelStyle);c.loadingShown||(l(e,{opacity:0,display:""}),D(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));c.loadingShown=!0;f()},hideLoading:function(){var a=this.options,c=this.loadingDiv;c&&(c.className="highcharts-loading highcharts-loading-hidden",D(c,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){l(c,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
    propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),update:function(a,d,h,v){var n=this,q={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},z=a.chart,k,t,l=[];x(n,"update",{options:a});if(z){f(!0,n.options.chart,z);"className"in z&&n.setClassName(z.className);"reflow"in z&&n.setReflow(z.reflow);if("inverted"in z||"polar"in z||"type"in z)n.propFromSeries(),k=!0;"alignTicks"in z&&(k=!0);c(z,function(a,c){-1!==
    m("chart."+c,n.propsRequireUpdateSeries)&&(t=!0);-1!==m(c,n.propsRequireDirtyBox)&&(n.isDirtyBox=!0)});"style"in z&&n.renderer.setStyle(z.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&f(!0,this.options.plotOptions,a.plotOptions);c(a,function(a,c){if(n[c]&&"function"===typeof n[c].update)n[c].update(a,!1);else if("function"===typeof n[q[c]])n[q[c]](a);"chart"!==c&&-1!==m(c,n.propsRequireUpdateSeries)&&(t=!0)});u("xAxis yAxis zAxis series colorAxis pane".split(" "),function(c){var b;
        a[c]&&("series"===c&&(b=[],u(n[c],function(a,c){a.options.isInternal||b.push(c)})),u(J(a[c]),function(a,e){(e=g(a.id)&&n.get(a.id)||n[c][b?b[e]:e])&&e.coll===c&&(e.update(a,!1),h&&(e.touched=!0));if(!e&&h)if("series"===c)n.addSeries(a,!1).touched=!0;else if("xAxis"===c||"yAxis"===c)n.addAxis(a,"xAxis"===c,!1).touched=!0}),h&&u(n[c],function(a){a.touched||a.options.isInternal?delete a.touched:l.push(a)}))});u(l,function(a){a.remove(!1)});k&&u(n.axes,function(a){a.update({},!1)});t&&u(n.series,function(a){a.update({},
        !1)});a.loading&&f(!0,n.options.loading,a.loading);k=z&&z.width;z=z&&z.height;b(k)&&k!==n.chartWidth||b(z)&&z!==n.chartHeight?n.setSize(k,z,v):e(d,!0)&&n.redraw(v);x(n,"afterUpdate",{options:a})},setSubtitle:function(a){this.setTitle(void 0,a)}});r(w.prototype,{update:function(a,c,b,f){function n(){h.applyOptions(a);null===h.y&&k&&(h.graphic=k.destroy());d(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(h.graphic=k.destroy()),a&&a.dataLabels&&h.dataLabel&&(h.dataLabel=h.dataLabel.destroy()),
    h.connector&&(h.connector=h.connector.destroy()));q=h.index;g.updateParallelArrays(h,q);t.data[q]=d(t.data[q],!0)||d(a,!0)?h.options:e(a,t.data[q]);g.isDirty=g.isDirtyData=!0;!g.fixedBox&&g.hasCartesianSeries&&(v.isDirtyBox=!0);"point"===t.legendType&&(v.isDirtyLegend=!0);c&&v.redraw(b)}var h=this,g=h.series,k=h.graphic,q,v=g.chart,t=g.options;c=e(c,!0);!1===f?n():h.firePointEvent("update",{options:a},n)},remove:function(a,c){this.series.removePoint(m(this,this.series.data),a,c)}});r(y.prototype,
    {addPoint:function(a,c,b,d){var f=this.options,n=this.data,h=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,g=f.data,q,v,t=this.xData,l,m;c=e(c,!0);q={series:this};this.pointClass.prototype.applyOptions.apply(q,[a]);m=q.x;l=t.length;if(this.requireSorting&&m<t[l-1])for(v=!0;l&&t[l-1]>m;)l--;this.updateParallelArrays(q,"splice",l,0,0);this.updateParallelArrays(q,l);k&&q.name&&(k[m]=q.name);g.splice(l,0,a);v&&(this.data.splice(l,0,null),this.processData());"point"===f.legendType&&this.generatePoints();
            b&&(n[0]&&n[0].remove?n[0].remove(!1):(n.shift(),this.updateParallelArrays(q,"shift"),g.shift()));this.isDirtyData=this.isDirty=!0;c&&h.redraw(d)},removePoint:function(a,c,b){var d=this,f=d.data,n=f[a],h=d.points,k=d.chart,g=function(){h&&h.length===f.length&&h.splice(a,1);f.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(n||{series:d},"splice",a,1);n&&n.destroy();d.isDirty=!0;d.isDirtyData=!0;c&&k.redraw()};v(b,k);c=e(c,!0);n?n.firePointEvent("remove",null,g):g()},remove:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                c,b){function d(){f.destroy();n.isDirtyLegend=n.isDirtyBox=!0;n.linkSeries();e(a,!0)&&n.redraw(c)}var f=this,n=f.chart;!1!==b?x(f,"remove",null,d):d()},update:function(c,b){var d=this,n=d.chart,h=d.userOptions,g=d.oldType||d.type,v=c.type||h.type||n.options.chart.type,k=t[g].prototype,l,w=["group","markerGroup","dataLabelsGroup"],F=["navigatorSeries","baseSeries"],y=d.finishedAnimating&&{animation:!1},J=["data","name","turboThreshold"],p=a.keys(c),A=0<p.length;u(p,function(a){-1===m(a,J)&&(A=!1)});
            if(A)c.data&&this.setData(c.data,!1),c.name&&this.setName(c.name,!1);else{F=w.concat(F);u(F,function(a){F[a]=d[a];delete d[a]});c=f(h,y,{index:d.index,pointStart:e(h.pointStart,d.xData[0])},{data:d.options.data},c);d.remove(!1,null,!1);for(l in k)d[l]=void 0;t[v||g]?r(d,t[v||g].prototype):a.error(17,!0);u(F,function(a){d[a]=F[a]});d.init(n,c);c.zIndex!==h.zIndex&&u(w,function(a){d[a]&&d[a].attr({zIndex:c.zIndex})});d.oldType=g;n.linkSeries()}x(this,"afterUpdate");e(b,!0)&&n.redraw(!1)},setName:function(a){this.name=
            this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});r(G.prototype,{update:function(a,b){var d=this.chart,h=a&&a.events||{};a=f(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);c(d.options[this.coll].events,function(a,c){"undefined"===typeof h[c]&&(h[c]=void 0)});this.destroy(!0);this.init(d,r(a,{events:h}));d.isDirtyBox=!0;e(b,!0)&&d.redraw()},remove:function(a){for(var c=this.chart,b=this.coll,d=this.series,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                f=d.length;f--;)d[f]&&d[f].remove(!1);A(c.axes,this);A(c[b],this);h(c.options[b])?c.options[b].splice(this.options.index,1):delete c.options[b];u(c[b],function(a,c){a.options.index=a.userOptions.index=c});this.destroy();c.isDirtyBox=!0;e(a,!0)&&c.redraw()},setTitle:function(a,c){this.update({title:a},c)},setCategories:function(a,c){this.update({categories:a},c)}})})(L);(function(a){var C=a.color,D=a.each,G=a.map,p=a.pick,l=a.Series,g=a.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,
    getStackPoints:function(g){var l=[],r=[],u=this.xAxis,m=this.yAxis,b=m.stacks[this.stackKey],d={},h=this.index,f=m.series,c=f.length,e,w=p(m.options.reversedStacks,!0)?1:-1,y;g=g||this.points;if(this.options.stacking){for(y=0;y<g.length;y++)g[y].leftNull=g[y].rightNull=null,d[g[y].x]=g[y];a.objectEach(b,function(a,c){null!==a.total&&r.push(c)});r.sort(function(a,c){return a-c});e=G(f,function(){return this.visible});D(r,function(a,f){var g=0,n,v;if(d[a]&&!d[a].isNull)l.push(d[a]),D([-1,1],function(g){var q=
        1===g?"rightNull":"leftNull",t=0,l=b[r[f+g]];if(l)for(y=h;0<=y&&y<c;)n=l.points[y],n||(y===h?d[a][q]=!0:e[y]&&(v=b[a].points[y])&&(t-=v[1]-v[0])),y+=w;d[a][1===g?"rightCliff":"leftCliff"]=t});else{for(y=h;0<=y&&y<c;){if(n=b[a].points[y]){g=n[1];break}y+=w}g=m.translate(g,0,1,0,1);l.push({isNull:!0,plotX:u.translate(a,0,0,0,1),x:a,plotY:g,yBottom:g})}})}return l},getGraphPath:function(a){var g=l.prototype.getGraphPath,r=this.options,u=r.stacking,m=this.yAxis,b,d,h=[],f=[],c=this.index,e,w=m.stacks[this.stackKey],
        y=r.threshold,t=m.getThreshold(r.threshold),v,r=r.connectNulls||"percent"===u,J=function(b,d,g){var n=a[b];b=u&&w[n.x].points[c];var v=n[g+"Null"]||0;g=n[g+"Cliff"]||0;var q,z,n=!0;g||v?(q=(v?b[0]:b[1])+g,z=b[0]+g,n=!!v):!u&&a[d]&&a[d].isNull&&(q=z=y);void 0!==q&&(f.push({plotX:e,plotY:null===q?t:m.getThreshold(q),isNull:n,isCliff:!0}),h.push({plotX:e,plotY:null===z?t:m.getThreshold(z),doCurve:!1}))};a=a||this.points;u&&(a=this.getStackPoints(a));for(b=0;b<a.length;b++)if(d=a[b].isNull,e=p(a[b].rectPlotX,
        a[b].plotX),v=p(a[b].yBottom,t),!d||r)r||J(b,b-1,"left"),d&&!u&&r||(f.push(a[b]),h.push({x:b,plotX:e,plotY:v})),r||J(b,b+1,"right");b=g.call(this,f,!0,!0);h.reversed=!0;d=g.call(this,h,!0,!0);d.length&&(d[0]="L");d=b.concat(d);g=g.call(this,f,!1,r);d.xMap=b.xMap;this.areaPath=d;return g},drawGraph:function(){this.areaPath=[];l.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,r=this.options,x=[["area","highcharts-area",this.color,r.fillColor]];D(this.zones,function(g,b){x.push(["zone-area-"+
    b,"highcharts-area highcharts-zone-area-"+b+" "+g.className,g.color||a.color,g.fillColor||r.fillColor])});D(x,function(l){var b=l[0],d=a[b];d?(d.endX=a.preventGraphAnimation?null:g.xMap,d.animate({d:g})):(d=a[b]=a.chart.renderer.path(g).addClass(l[1]).attr({fill:p(l[3],C(l[2]).setOpacity(p(r.fillOpacity,.75)).get()),zIndex:0}).add(a.group),d.isArea=!0);d.startX=g.xMap;d.shiftUnit=r.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var C=a.pick;a=a.seriesType;a("spline",
    "line",{},{getPointSpline:function(a,G,p){var l=G.plotX,g=G.plotY,u=a[p-1];p=a[p+1];var A,r,x,m;if(u&&!u.isNull&&!1!==u.doCurve&&!G.isCliff&&p&&!p.isNull&&!1!==p.doCurve&&!G.isCliff){a=u.plotY;x=p.plotX;p=p.plotY;var b=0;A=(1.5*l+u.plotX)/2.5;r=(1.5*g+a)/2.5;x=(1.5*l+x)/2.5;m=(1.5*g+p)/2.5;x!==A&&(b=(m-r)*(x-l)/(x-A)+g-m);r+=b;m+=b;r>a&&r>g?(r=Math.max(a,g),m=2*g-r):r<a&&r<g&&(r=Math.min(a,g),m=2*g-r);m>p&&m>g?(m=Math.max(p,g),r=2*g-m):m<p&&m<g&&(m=Math.min(p,g),r=2*g-m);G.rightContX=x;G.rightContY=
            m}G=["C",C(u.rightContX,u.plotX),C(u.rightContY,u.plotY),C(A,l),C(r,g),l,g];u.rightContX=u.rightContY=null;return G}})})(L);(function(a){var C=a.seriesTypes.area.prototype,D=a.seriesType;D("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var C=a.animObject,D=a.color,G=a.each,p=a.extend,l=a.isNumber,g=a.merge,u=a.pick,A=a.Series,r=a.seriesType,x=a.svg;
    r("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){A.prototype.init.apply(this,
            arguments);var a=this,b=a.chart;b.hasRendered&&G(b.series,function(b){b.type===a.type&&(b.isDirty=!0)})},getColumnMetrics:function(){var a=this,b=a.options,d=a.xAxis,h=a.yAxis,f=d.options.reversedStacks,f=d.reversed&&!f||!d.reversed&&f,c,e={},g=0;!1===b.grouping?g=1:G(a.chart.series,function(b){var d=b.options,f=b.yAxis,v;b.type!==a.type||!b.visible&&a.chart.options.chart.ignoreHiddenSeries||h.len!==f.len||h.pos!==f.pos||(d.stacking?(c=b.stackKey,void 0===e[c]&&(e[c]=g++),v=e[c]):!1!==d.grouping&&
            (v=g++),b.columnIndex=v)});var l=Math.min(Math.abs(d.transA)*(d.ordinalSlope||b.pointRange||d.closestPointRange||d.tickInterval||1),d.len),t=l*b.groupPadding,v=(l-2*t)/(g||1),b=Math.min(b.maxPointWidth||d.len,u(b.pointWidth,v*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(v-b)/2+(t+((a.columnIndex||0)+(f?1:0))*v-l/2)*(f?-1:1)};return a.columnMetrics},crispCol:function(a,b,d,h){var f=this.chart,c=this.borderWidth,e=-(c%2?.5:0),c=c%2?.5:1;f.inverted&&f.renderer.isVML&&(c+=1);this.options.crisp&&
        (d=Math.round(a+d)+e,a=Math.round(a)+e,d-=a);h=Math.round(b+h)+c;e=.5>=Math.abs(b)&&.5<h;b=Math.round(b)+c;h-=b;e&&h&&(--b,h+=1);return{x:a,y:b,width:d,height:h}},translate:function(){var a=this,b=a.chart,d=a.options,h=a.dense=2>a.closestPointRange*a.xAxis.transA,h=a.borderWidth=u(d.borderWidth,h?0:1),f=a.yAxis,c=d.threshold,e=a.translatedThreshold=f.getThreshold(c),g=u(d.minPointLength,5),l=a.getColumnMetrics(),t=l.width,v=a.barW=Math.max(t,1+2*h),J=a.pointXOffset=l.offset;b.inverted&&(e-=.5);d.pointPadding&&
        (v=Math.ceil(v));A.prototype.translate.apply(a);G(a.points,function(d){var h=u(d.yBottom,e),n=999+Math.abs(h),n=Math.min(Math.max(-n,d.plotY),f.len+n),l=d.plotX+J,m=v,B=Math.min(n,h),z,k=Math.max(n,h)-B;g&&Math.abs(k)<g&&(k=g,z=!f.reversed&&!d.negative||f.reversed&&d.negative,d.y===c&&a.dataMax<=c&&f.min<c&&(z=!z),B=Math.abs(B-e)>g?h-g:e-(z?g:0));d.barX=l;d.pointWidth=t;d.tooltipPos=b.inverted?[f.len+f.pos-b.plotLeft-n,a.xAxis.len-l-m/2,k]:[l+m/2,n+f.pos-b.plotTop,k];d.shapeType="rect";d.shapeArgs=
            a.crispCol.apply(a,d.isNull?[l,e,m,0]:[l,B,m,k])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,b){var d=this.options,h,f=this.pointAttrToOptions||{};h=f.stroke||"borderColor";var c=f["stroke-width"]||"borderWidth",e=a&&a.color||this.color,l=a&&a[h]||d[h]||this.color||e,m=a&&a[c]||d[c]||this[c]||0,f=d.dashStyle;a&&this.zones.length&&(e=a.getZone(),e=a.options.color||
            e&&e.color||this.color);b&&(a=g(d.states[b],a.options.states&&a.options.states[b]||{}),b=a.brightness,e=a.color||void 0!==b&&D(e).brighten(a.brightness).get()||e,l=a[h]||l,m=a[c]||m,f=a.dashStyle||f);h={fill:e,stroke:l,"stroke-width":m};f&&(h.dashstyle=f);return h},drawPoints:function(){var a=this,b=this.chart,d=a.options,h=b.renderer,f=d.animationLimit||250,c;G(a.points,function(e){var m=e.graphic,y=m&&b.pointCount<f?"animate":"attr";if(l(e.plotY)&&null!==e.y){c=e.shapeArgs;if(m)m[y](g(c));else e.graphic=
            m=h[e.shapeType](c).add(e.group||a.group);d.borderRadius&&m.attr({r:d.borderRadius});m[y](a.pointAttribs(e,e.selected&&"select")).shadow(d.shadow,null,d.stacking&&!d.borderRadius);m.addClass(e.getClassName(),!0)}else m&&(e.graphic=m.destroy())})},animate:function(a){var b=this,d=this.yAxis,h=b.options,f=this.chart.inverted,c={},e=f?"translateX":"translateY",g;x&&(a?(c.scaleY=.001,a=Math.min(d.pos+d.len,Math.max(d.pos,d.toPixels(h.threshold))),f?c.translateX=a-d.len:c.translateY=a,b.group.attr(c)):
            (g=b.group.attr(e),b.group.animate({scaleY:1},p(C(b.options.animation),{step:function(a,f){c[e]=g+f.pos*(d.pos-g);b.group.attr(c)}})),b.animate=null))},remove:function(){var a=this,b=a.chart;b.hasRendered&&G(b.series,function(b){b.type===a.type&&(b.isDirty=!0)});A.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
        pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(L);(function(a){var C=a.deg2rad,D=a.isNumber,G=a.pick,p=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,g=this.chart,u=2*(a.slicedOffset||0),A=g.plotWidth-2*u,
        g=g.plotHeight-2*u,r=a.center,r=[G(r[0],"50%"),G(r[1],"50%"),a.size||"100%",a.innerSize||0],x=Math.min(A,g),m,b;for(m=0;4>m;++m)b=r[m],a=2>m||2===m&&/%$/.test(b),r[m]=p(b,[A,g,x,r[2]][m])+(a?u:0);r[3]>r[2]&&(r[3]=r[2]);return r},getStartAndEndRadians:function(a,g){a=D(a)?a:0;g=D(g)&&g>a&&360>g-a?g:a+360;return{start:C*(a+-90),end:C*(g+-90)}}}})(L);(function(a){var C=a.addEvent,D=a.CenteredSeriesMixin,G=a.defined,p=a.each,l=a.extend,g=D.getStartAndEndRadians,u=a.inArray,A=a.noop,r=a.pick,x=a.Point,
    m=a.Series,b=a.seriesType,d=a.setAnimation;b("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,
    trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=this,c=b.points,e=b.startAngleRad;a||(p(c,function(a){var c=a.graphic,d=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:e,end:e}),c.animate({r:d.r,start:d.start,end:d.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,b=0,c=this.points,e=c.length,d,g=this.options.ignoreHiddenPoint;for(a=0;a<e;a++)d=c[a],b+=g&&!d.visible?0:d.isNull?
        0:d.y;this.total=b;for(a=0;a<e;a++)d=c[a],d.percentage=0<b&&(d.visible||!g)?d.y/b*100:0,d.total=b},generatePoints:function(){m.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,c=this.options,e=c.slicedOffset,d=e+(c.borderWidth||0),h,t,v,l=g(c.startAngle,c.endAngle),n=this.startAngleRad=l.start,l=(this.endAngleRad=l.end)-n,m=this.points,q,p=c.dataLabels.distance,c=c.ignoreHiddenPoint,u,B=m.length,z;a||(this.center=a=this.getCenter());this.getX=
        function(c,b,e){v=Math.asin(Math.min((c-a[1])/(a[2]/2+e.labelDistance),1));return a[0]+(b?-1:1)*Math.cos(v)*(a[2]/2+e.labelDistance)};for(u=0;u<B;u++){z=m[u];z.labelDistance=r(z.options.dataLabels&&z.options.dataLabels.distance,p);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,z.labelDistance);h=n+b*l;if(!c||z.visible)b+=z.percentage/100;t=n+b*l;z.shapeType="arc";z.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*h)/1E3,end:Math.round(1E3*t)/1E3};v=(t+h)/2;v>1.5*Math.PI?
        v-=2*Math.PI:v<-Math.PI/2&&(v+=2*Math.PI);z.slicedTranslation={translateX:Math.round(Math.cos(v)*e),translateY:Math.round(Math.sin(v)*e)};t=Math.cos(v)*a[2]/2;q=Math.sin(v)*a[2]/2;z.tooltipPos=[a[0]+.7*t,a[1]+.7*q];z.half=v<-Math.PI/2||v>Math.PI/2?1:0;z.angle=v;h=Math.min(d,z.labelDistance/5);z.labelPos=[a[0]+t+Math.cos(v)*z.labelDistance,a[1]+q+Math.sin(v)*z.labelDistance,a[0]+t+Math.cos(v)*h,a[1]+q+Math.sin(v)*h,a[0]+t,a[1]+q,0>z.labelDistance?"center":z.half?"right":"left",v]}},drawGraph:null,
    drawPoints:function(){var a=this,b=a.chart.renderer,c,e,d,g,t=a.options.shadow;t&&!a.shadowGroup&&(a.shadowGroup=b.g("shadow").add(a.group));p(a.points,function(f){e=f.graphic;if(f.isNull)e&&(f.graphic=e.destroy());else{g=f.shapeArgs;c=f.getTranslate();var h=f.shadowGroup;t&&!h&&(h=f.shadowGroup=b.g("shadow").add(a.shadowGroup));h&&h.attr(c);d=a.pointAttribs(f,f.selected&&"select");e?e.setRadialReference(a.center).attr(d).animate(l(g,c)):(f.graphic=e=b[f.shapeType](g).setRadialReference(a.center).attr(c).add(a.group),
        e.attr(d).attr({"stroke-linejoin":"round"}).shadow(t,h));e.attr({visibility:f.visible?"inherit":"hidden"});e.addClass(f.getClassName())}})},searchPoint:A,sortByAngle:function(a,b){a.sort(function(a,e){return void 0!==a.angle&&(e.angle-a.angle)*b})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:D.getCenter,getSymbol:A},{init:function(){x.prototype.init.apply(this,arguments);var a=this,b;a.name=r(a.name,"Slice");b=function(c){a.slice("select"===c.type)};C(a,"select",b);C(a,"unselect",
        b);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,b){var c=this,e=c.series,d=e.chart,f=e.options.ignoreHiddenPoint;b=r(b,f);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,e.options.data[u(c,e.data)]=c.options,p(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)}),c.legendItem&&d.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),f&&(e.isDirty=!0),b&&d.redraw())},slice:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                b,c){var e=this.series;d(c,e.chart);r(b,!0);this.sliced=this.options.sliced=G(a)?a:!this.sliced;e.options.data[u(this,e.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r-
            1,start:b.start,end:b.end})}})})(L);(function(a){var C=a.addEvent,D=a.arrayMax,G=a.defined,p=a.each,l=a.extend,g=a.format,u=a.map,A=a.merge,r=a.noop,x=a.pick,m=a.relativeLength,b=a.Series,d=a.seriesTypes,h=a.some,f=a.stableSort;a.distribute=function(c,b,d){function e(a,c){return a.target-c.target}var g,v=!0,l=c,n=[],m;m=0;var q=l.reducedLen||b;for(g=c.length;g--;)m+=c[g].size;if(m>q){f(c,function(a,c){return(c.rank||0)-(a.rank||0)});for(m=g=0;m<=q;)m+=c[g].size,g++;n=c.splice(g-1,c.length)}f(c,e);
    for(c=u(c,function(a){return{size:a.size,targets:[a.target],align:x(a.align,.5)}});v;){for(g=c.length;g--;)v=c[g],m=(Math.min.apply(0,v.targets)+Math.max.apply(0,v.targets))/2,v.pos=Math.min(Math.max(0,m-v.size*v.align),b-v.size);g=c.length;for(v=!1;g--;)0<g&&c[g-1].pos+c[g-1].size>c[g].pos&&(c[g-1].size+=c[g].size,c[g-1].targets=c[g-1].targets.concat(c[g].targets),c[g-1].align=.5,c[g-1].pos+c[g-1].size>b&&(c[g-1].pos=b-c[g-1].size),c.splice(g,1),v=!0)}l.push.apply(l,n);g=0;h(c,function(c){var e=
        0;if(h(c.targets,function(){l[g].pos=c.pos+e;if(Math.abs(l[g].pos-l[g].target)>d)return p(l.slice(0,g+1),function(a){delete a.pos}),l.reducedLen=(l.reducedLen||b)-.1*b,l.reducedLen>.1*b&&a.distribute(l,b,d),!0;e+=l[g].size;g++}))return!0});f(l,e)};b.prototype.drawDataLabels=function(){function c(a,c){var b=c.filter;return b?(c=b.operator,a=a[b.property],b=b.value,"\x3e"===c&&a>b||"\x3c"===c&&a<b||"\x3e\x3d"===c&&a>=b||"\x3c\x3d"===c&&a<=b||"\x3d\x3d"===c&&a==b||"\x3d\x3d\x3d"===c&&a===b?!0:!1):!0}
    var b=this,d=b.chart,f=b.options,h=f.dataLabels,v=b.points,l,n,m=b.hasRendered||0,q,r,u=x(h.defer,!!f.animation),B=d.renderer;if(h.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(h),r=b.plotGroup("dataLabelsGroup","data-labels",u&&!m?"hidden":"visible",h.zIndex||6),u&&(r.attr({opacity:+m}),m||C(b,"afterAnimate",function(){b.visible&&r.show(!0);r[f.animation?"animate":"attr"]({opacity:1},{duration:200})})),n=h,p(v,function(e){var k,v=e.dataLabel,z,t,m=e.connector,F=!v,w;l=e.dlOptions||
        e.options&&e.options.dataLabels;(k=x(l&&l.enabled,n.enabled)&&!e.isNull)&&(k=!0===c(e,l||h));k&&(h=A(n,l),z=e.getLabelConfig(),w=h[e.formatPrefix+"Format"]||h.format,q=G(w)?g(w,z,d.time):(h[e.formatPrefix+"Formatter"]||h.formatter).call(z,h),w=h.style,z=h.rotation,w.color=x(h.color,w.color,b.color,"#000000"),"contrast"===w.color&&(e.contrastColor=B.getContrast(e.color||b.color),w.color=h.inside||0>x(e.labelDistance,h.distance)||f.stacking?e.contrastColor:"#000000"),f.cursor&&(w.cursor=f.cursor),t=
        {fill:h.backgroundColor,stroke:h.borderColor,"stroke-width":h.borderWidth,r:h.borderRadius||0,rotation:z,padding:h.padding,zIndex:1},a.objectEach(t,function(a,c){void 0===a&&delete t[c]}));!v||k&&G(q)?k&&G(q)&&(v?t.text=q:(v=e.dataLabel=z?B.text(q,0,-9999,h.useHTML).addClass("highcharts-data-label"):B.label(q,0,-9999,h.shape,null,null,h.useHTML,null,"data-label"),v.addClass(" highcharts-data-label-color-"+e.colorIndex+" "+(h.className||"")+(h.useHTML?" highcharts-tracker":""))),v.attr(t),v.css(w).shadow(h.shadow),
    v.added||v.add(r),b.alignDataLabel(e,v,h,null,F)):(e.dataLabel=v=v.destroy(),m&&(e.connector=m.destroy()))});a.fireEvent(this,"afterDrawDataLabels")};b.prototype.alignDataLabel=function(a,b,d,f,g){var c=this.chart,e=c.inverted,h=x(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),t=x(a.plotY,-9999),q=b.getBBox(),m,w=d.rotation,B=d.align,z=this.visible&&(a.series.forceDL||c.isInsidePlot(h,Math.round(t),e)||f&&c.isInsidePlot(h,e?f.x+1:f.y+f.height-1,e)),k="justify"===x(d.overflow,"justify");if(z&&(m=d.style.fontSize,
    m=c.renderer.fontMetrics(m,b).b,f=l({x:e?this.yAxis.len-t:h,y:Math.round(e?this.xAxis.len-h:t),width:0,height:0},f),l(d,{width:q.width,height:q.height}),w?(k=!1,h=c.renderer.rotCorr(m,w),h={x:f.x+d.x+f.width/2+h.x,y:f.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*f.height},b[g?"attr":"animate"](h).attr({align:B}),t=(w+720)%360,t=180<t&&360>t,"left"===B?h.y-=t?q.height:0:"center"===B?(h.x-=q.width/2,h.y-=q.height/2):"right"===B&&(h.x-=q.width,h.y-=t?0:q.height),b.placed=!0,b.alignAttr=h):(b.align(d,
    null,f),h=b.alignAttr),k&&0<=f.height?a.isLabelJustified=this.justifyDataLabel(b,d,h,q,f,g):x(d.crop,!0)&&(z=c.isInsidePlot(h.x,h.y)&&c.isInsidePlot(h.x+q.width,h.y+q.height)),d.shape&&!w))b[g?"attr":"animate"]({anchorX:e?c.plotWidth-a.plotY:a.plotX,anchorY:e?c.plotHeight-a.plotX:a.plotY});z||(b.attr({y:-9999}),b.placed=!1)};b.prototype.justifyDataLabel=function(a,b,d,f,g,h){var c=this.chart,e=b.align,v=b.verticalAlign,q,l,t=a.box?0:a.padding||0;q=d.x+t;0>q&&("right"===e?b.align="left":b.x=-q,l=!0);
    q=d.x+f.width-t;q>c.plotWidth&&("left"===e?b.align="right":b.x=c.plotWidth-q,l=!0);q=d.y+t;0>q&&("bottom"===v?b.verticalAlign="top":b.y=-q,l=!0);q=d.y+f.height-t;q>c.plotHeight&&("top"===v?b.verticalAlign="bottom":b.y=c.plotHeight-q,l=!0);l&&(a.placed=!h,a.align(b,null,g));return l};d.pie&&(d.pie.prototype.drawDataLabels=function(){var c=this,e=c.data,d,f=c.chart,g=c.options.dataLabels,h=x(g.connectorPadding,10),l=x(g.connectorWidth,1),n=f.plotWidth,m=f.plotHeight,q=Math.round(f.chartWidth/3),r,u=
    c.center,B=u[2]/2,z=u[1],k,E,A,P,K=[[],[]],C,O,M,U,S=[0,0,0,0];c.visible&&(g.enabled||c._hasPointLabels)&&(p(e,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),b.prototype.drawDataLabels.apply(c),p(e,function(a){a.dataLabel&&(a.visible?(K[a.half].push(a),a.dataLabel._pos=null,!G(g.style.width)&&!G(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>
q&&(a.dataLabel.css({width:.7*q}),a.dataLabel.shortened=!0)):a.dataLabel=a.dataLabel.destroy())}),p(K,function(b,e){var v,q,l=b.length,t=[],F;if(l)for(c.sortByAngle(b,e-.5),0<c.maxLabelDistance&&(v=Math.max(0,z-B-c.maxLabelDistance),q=Math.min(z+B+c.maxLabelDistance,f.plotHeight),p(b,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,z-B-a.labelDistance),a.bottom=Math.min(z+B+a.labelDistance,f.plotHeight),F=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPos[1]-a.top+F/
        2,size:F,rank:a.y},t.push(a.distributeBox))}),v=q+F-v,a.distribute(t,v,v/5)),U=0;U<l;U++)d=b[U],A=d.labelPos,k=d.dataLabel,M=!1===d.visible?"hidden":"inherit",O=v=A[1],t&&G(d.distributeBox)&&(void 0===d.distributeBox.pos?M="hidden":(P=d.distributeBox.size,O=d.top+d.distributeBox.pos)),delete d.positionIndex,C=g.justify?u[0]+(e?-1:1)*(B+d.labelDistance):c.getX(O<d.top+2||O>d.bottom-2?v:O,e,d),k._attr={visibility:M,align:A[6]},k._pos={x:C+g.x+({left:h,right:-h}[A[6]]||0),y:O+g.y-10},A.x=C,A.y=O,x(g.crop,
    !0)&&(E=k.getBBox().width,v=null,C-E<h&&1===e?(v=Math.round(E-C+h),S[3]=Math.max(v,S[3])):C+E>n-h&&0===e&&(v=Math.round(C+E-n+h),S[1]=Math.max(v,S[1])),0>O-P/2?S[0]=Math.max(Math.round(-O+P/2),S[0]):O+P/2>m&&(S[2]=Math.max(Math.round(O+P/2-m),S[2])),k.sideOverflow=v)}),0===D(S)||this.verifyDataLabelOverflow(S))&&(this.placeDataLabels(),l&&p(this.points,function(a){var b;r=a.connector;if((k=a.dataLabel)&&k._pos&&a.visible&&0<a.labelDistance){M=k._attr.visibility;if(b=!r)a.connector=r=f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+
    a.colorIndex+(a.className?" "+a.className:"")).add(c.dataLabelsGroup),r.attr({"stroke-width":l,stroke:g.connectorColor||a.color||"#666666"});r[b?"attr":"animate"]({d:c.connectorPath(a.labelPos)});r.attr("visibility",M)}else r&&(a.connector=r.destroy())}))},d.pie.prototype.connectorPath=function(a){var c=a.x,b=a.y;return x(this.options.dataLabels.softConnector,!0)?["M",c+("left"===a[6]?5:-5),b,"C",c,b,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",c+("left"===a[6]?5:-5),b,"L",a[2],a[3],"L",
    a[4],a[5]]},d.pie.prototype.placeDataLabels=function(){p(this.points,function(a){var c=a.dataLabel;c&&a.visible&&((a=c._pos)?(c.sideOverflow&&(c._attr.width=c.getBBox().width-c.sideOverflow,c.css({width:c._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),c.shortened=!0),c.attr(c._attr),c[c.moved?"animate":"attr"](a),c.moved=!0):c&&c.attr({y:-9999}))},this)},d.pie.prototype.alignDataLabel=r,d.pie.prototype.verifyDataLabelOverflow=function(a){var c=this.center,
    b=this.options,d=b.center,f=b.minSize||80,g,h=null!==b.size;h||(null!==d[0]?g=Math.max(c[2]-Math.max(a[1],a[3]),f):(g=Math.max(c[2]-a[1]-a[3],f),c[0]+=(a[3]-a[1])/2),null!==d[1]?g=Math.max(Math.min(g,c[2]-Math.max(a[0],a[2])),f):(g=Math.max(Math.min(g,c[2]-a[0]-a[2]),f),c[1]+=(a[0]-a[2])/2),g<c[2]?(c[2]=g,c[3]=Math.min(m(b.innerSize||0,g),g),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):h=!0);return h});d.column&&(d.column.prototype.alignDataLabel=function(a,e,d,f,g){var c=this.chart.inverted,
    h=a.series,n=a.dlBox||a.shapeArgs,l=x(a.below,a.plotY>x(this.translatedThreshold,h.yAxis.len)),q=x(d.inside,!!this.options.stacking);n&&(f=A(n),0>f.y&&(f.height+=f.y,f.y=0),n=f.y+f.height-h.yAxis.len,0<n&&(f.height-=n),c&&(f={x:h.yAxis.len-f.y-f.height,y:h.xAxis.len-f.x-f.width,width:f.height,height:f.width}),q||(c?(f.x+=l?0:f.width,f.width=0):(f.y+=l?f.height:0,f.height=0)));d.align=x(d.align,!c||q?"center":l?"right":"left");d.verticalAlign=x(d.verticalAlign,c||q?"middle":l?"top":"bottom");b.prototype.alignDataLabel.call(this,
    a,e,d,f,g);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(L);(function(a){var C=a.Chart,D=a.each,G=a.objectEach,p=a.pick;a=a.addEvent;a(C,"render",function(){var a=[];D(this.labelCollectors||[],function(g){a=a.concat(g())});D(this.yAxis||[],function(g){g.options.stackLabels&&!g.options.stackLabels.allowOverlap&&G(g.stacks,function(g){G(g,function(g){a.push(g.label)})})});D(this.series||[],function(g){var l=g.options.dataLabels,A=g.dataLabelCollections||["dataLabel"];
    (l.enabled||g._hasPointLabels)&&!l.allowOverlap&&g.visible&&D(A,function(l){D(g.points,function(g){g[l]&&(g[l].labelrank=p(g.labelrank,g.shapeArgs&&g.shapeArgs.height),a.push(g[l]))})})});this.hideOverlappingLabels(a)});C.prototype.hideOverlappingLabels=function(a){var g=a.length,l=this.renderer,p,r,x,m,b,d,h=function(a,c,b,d,g,h,v,l){return!(g>a+b||g+v<a||h>c+d||h+l<c)};x=function(a){var c,b,d,f=2*(a.box?0:a.padding||0);d=0;if(a&&(!a.alignAttr||a.placed))return c=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},
    b=a.parentGroup,a.width||(d=a.getBBox(),a.width=d.width,a.height=d.height,d=l.fontMetrics(null,a.element).h),{x:c.x+(b.translateX||0),y:c.y+(b.translateY||0)-d,width:a.width-f,height:a.height-f}};for(r=0;r<g;r++)if(p=a[r])p.oldOpacity=p.opacity,p.newOpacity=1,p.absoluteBox=x(p);a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(r=0;r<g;r++)for(d=(x=a[r])&&x.absoluteBox,p=r+1;p<g;++p)if(b=(m=a[p])&&m.absoluteBox,d&&b&&x!==m&&0!==x.newOpacity&&0!==m.newOpacity&&(b=h(d.x,d.y,d.width,
    d.height,b.x,b.y,b.width,b.height)))(x.labelrank<m.labelrank?x:m).newOpacity=0;D(a,function(a){var c,b;a&&(b=a.newOpacity,a.oldOpacity!==b&&(a.alignAttr&&a.placed?(b?a.show(!0):c=function(){a.hide()},a.alignAttr.opacity=b,a[a.isOld?"animate":"attr"](a.alignAttr,null,c)):a.attr({opacity:b})),a.isOld=!0)})}})(L);(function(a){var C=a.addEvent,D=a.Chart,G=a.createElement,p=a.css,l=a.defaultOptions,g=a.defaultPlotOptions,u=a.each,A=a.extend,r=a.fireEvent,x=a.hasTouch,m=a.inArray,b=a.isObject,d=a.Legend,
    h=a.merge,f=a.pick,c=a.Point,e=a.Series,w=a.seriesTypes,y=a.svg,t;t=a.TrackerMixin={drawTrackerPoint:function(){var a=this,c=a.chart.pointer,b=function(a){var b=c.getPointFromEvent(a);void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a))};u(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(u(a.trackerGroups,function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",b).on("mouseout",
        function(a){c.onTrackerMouseOut(a)});if(x)a[e].on("touchstart",b);a.options.cursor&&a[e].css(p).css({cursor:a.options.cursor})}}),a._hasTracking=!0);r(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,c=a.options,b=c.trackByArea,e=[].concat(b?a.areaPath:a.graphPath),d=e.length,f=a.chart,g=f.pointer,h=f.renderer,l=f.options.tooltip.snap,k=a.tracker,t,m=function(){if(f.hoverSeries!==a)a.onMouseOver()},p="rgba(192,192,192,"+(y?.0001:.002)+")";if(d&&!b)for(t=d+1;t--;)"M"===e[t]&&e.splice(t+
        1,0,e[t+1]-l,e[t+2],"L"),(t&&"M"===e[t]||t===d)&&e.splice(t,0,"L",e[t-2]+l,e[t-1]);k?k.attr({d:e}):a.graph&&(a.tracker=h.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:p,fill:b?p:"none","stroke-width":a.graph.strokeWidth()+(b?0:2*l),zIndex:2}).add(a.group),u([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){g.onTrackerMouseOut(a)});c.cursor&&a.css({cursor:c.cursor});if(x)a.on("touchstart",m)}));
        r(this,"afterDrawTracker")}};w.column&&(w.column.prototype.drawTracker=t.drawTrackerPoint);w.pie&&(w.pie.prototype.drawTracker=t.drawTrackerPoint);w.scatter&&(w.scatter.prototype.drawTracker=t.drawTrackerPoint);A(d.prototype,{setItemEvents:function(a,b,e){var d=this,f=d.chart.renderer.boxWrapper,g="highcharts-legend-"+(a instanceof c?"point":"series")+"-active";(e?b:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(g);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(h(a.visible?
        d.itemStyle:d.itemHiddenStyle));f.removeClass(g);a.setState()}).on("click",function(c){var b=function(){a.setVisible&&a.setVisible()};f.removeClass(g);c={browserEvent:c};a.firePointEvent?a.firePointEvent("legendItemClick",c,b):r(a,"legendItemClick",c,b)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(c){r(a.series||
        a,"checkboxClick",{checked:c.target.checked,item:a},function(){a.select()})})}});l.legend.itemStyle.cursor="pointer";A(D.prototype,{showResetZoom:function(){function a(){c.zoomOut()}var c=this,b=l.lang,e=c.options.chart.resetZoomButton,d=e.theme,f=d.states,g="chart"===e.relativeTo?null:"plotBox";r(this,"beforeShowResetZoom",null,function(){c.resetZoomButton=c.renderer.button(b.resetZoom,null,null,a,d,f&&f.hover).attr({align:e.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,
        !1,g)})},zoomOut:function(){r(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var c,e=this.pointer,d=!1,g;!a||a.resetSelection?(u(this.axes,function(a){c=a.zoom()}),e.initiated=!1):u(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(c=b.zoom(a.min,a.max),b.displayBtn&&(d=!0))});g=this.resetZoomButton;d&&!g?this.showResetZoom():!d&&b(g)&&(this.resetZoomButton=g.destroy());c&&this.redraw(f(this.options.chart.animation,a&&a.animation,100>this.pointCount))},
    pan:function(a,c){var b=this,e=b.hoverPoints,d;e&&u(e,function(a){a.setState()});u("xy"===c?[1,0]:[1],function(c){c=b[c?"xAxis":"yAxis"][0];var e=c.horiz,f=a[e?"chartX":"chartY"],e=e?"mouseDownX":"mouseDownY",g=b[e],k=(c.pointRange||0)/2,h=c.reversed&&!b.inverted||!c.reversed&&b.inverted?-1:1,n=c.getExtremes(),l=c.toValue(g-f,!0)+k*h,h=c.toValue(g+c.len-f,!0)-k*h,q=h<l,g=q?h:l,l=q?l:h,h=Math.min(n.dataMin,k?n.min:c.toValue(c.toPixels(n.min)-c.minPixelPadding)),k=Math.max(n.dataMax,k?n.max:c.toValue(c.toPixels(n.max)+
        c.minPixelPadding)),q=h-g;0<q&&(l+=q,g=h);q=l-k;0<q&&(l=k,g-=q);c.series.length&&g!==n.min&&l!==n.max&&(c.setExtremes(g,l,!1,!1,{trigger:"pan"}),d=!0);b[e]=f});d&&b.redraw(!1);p(b.container,{cursor:"move"})}});A(c.prototype,{select:function(a,c){var b=this,e=b.series,d=e.chart;a=f(a,!b.selected);b.firePointEvent(a?"select":"unselect",{accumulate:c},function(){b.selected=b.options.selected=a;e.options.data[m(b,e.data)]=b.options;b.setState(a&&"select");c||u(d.getSelectedPoints(),function(a){a.selected&&
    a!==b&&(a.selected=a.options.selected=!1,e.options.data[m(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var c=this.series.chart,b=c.pointer;a=a?b.normalize(a):b.getChartCoordinatesFromPoint(this,c.inverted);b.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");u(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var c=this,
        b=h(c.series.options.point,c.options).events;c.events=b;a.objectEach(b,function(a,b){C(c,b,a)});this.hasImportedEvents=!0}},setState:function(a,c){var b=Math.floor(this.plotX),e=this.plotY,d=this.series,h=d.options.states[a||"normal"]||{},l=g[d.type].marker&&d.options.marker,v=l&&!1===l.enabled,z=l&&l.states&&l.states[a||"normal"]||{},k=!1===z.enabled,t=d.stateMarkerGraphic,m=this.marker||{},p=d.chart,w=d.halo,y,u=l&&d.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===
        h.enabled||a&&(k||v&&!1===z.enabled)||a&&m.states&&m.states[a]&&!1===m.states[a].enabled)){u&&(y=d.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(d.pointAttribs(this,a),f(p.options.chart.animation,h.animation)),y&&this.graphic.animate(y,f(p.options.chart.animation,z.animation,l.animation)),t&&t.hide();else{if(a&&z){l=m.symbol||d.symbol;t&&t.currentSymbol!==l&&(t=t.destroy());
        if(t)t[c?"animate":"attr"]({x:y.x,y:y.y});else l&&(d.stateMarkerGraphic=t=p.renderer.symbol(l,y.x,y.y,y.width,y.height).add(d.markerGroup),t.currentSymbol=l);t&&t.attr(d.pointAttribs(this,a))}t&&(t[a&&p.isInsidePlot(b,e,p.inverted)?"show":"hide"](),t.element.point=this)}(b=h.halo)&&b.size?(w||(d.halo=w=p.renderer.path().add((this.graphic||t).parentGroup)),w.show()[c?"animate":"attr"]({d:this.haloPath(b.size)}),w.attr({"class":"highcharts-halo highcharts-color-"+f(this.colorIndex,d.colorIndex)+(this.className?
            " "+this.className:""),zIndex:-1}),w.point=this,w.attr(A({fill:this.color||d.color,"fill-opacity":b.opacity},b.attributes))):w&&w.point&&w.point.haloPath&&w.animate({d:w.point.haloPath(0)},null,w.hide);this.state=a;r(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});A(e.prototype,{onMouseOver:function(){var a=this.chart,c=a.hoverSeries;if(c&&c!==this)c.onMouseOut();this.options.events.mouseOver&&r(this,"mouseOver");
        this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,c=this.chart,b=c.tooltip,e=c.hoverPoint;c.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&r(this,"mouseOut");!b||this.stickyTracking||b.shared&&!this.noSharedTooltip||b.hide();this.setState()},setState:function(a){var c=this,b=c.options,e=c.graph,d=b.states,g=b.lineWidth,b=0;a=a||"";if(c.state!==a&&(u([c.group,c.markerGroup,c.dataLabelsGroup],function(b){b&&(c.state&&b.removeClass("highcharts-series-"+
        c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!d[a]||!1!==d[a].enabled)&&(a&&(g=d[a].lineWidth||g+(d[a].lineWidthPlus||0)),e&&!e.dashstyle))for(g={"stroke-width":g},e.animate(g,f(d[a||"normal"]&&d[a||"normal"].animation,c.chart.options.chart.animation));c["zone-graph-"+b];)c["zone-graph-"+b].attr(g),b+=1},setVisible:function(a,c){var b=this,e=b.chart,d=b.legendItem,f,g=e.options.chart.ignoreHiddenSeries,h=b.visible;f=(b.visible=a=b.options.visible=b.userOptions.visible=void 0===a?!h:
        a)?"show":"hide";u(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(b[a])b[a][f]()});if(e.hoverSeries===b||(e.hoverPoint&&e.hoverPoint.series)===b)b.onMouseOut();d&&e.legend.colorizeItem(b,a);b.isDirty=!0;b.options.stacking&&u(e.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});u(b.linkedSeries,function(c){c.setVisible(a,!1)});g&&(e.isDirtyBox=!0);r(b,f);!1!==c&&e.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=
        a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);r(this,a?"select":"unselect")},drawTracker:t.drawTrackerGraph})})(L);(function(a){var C=a.Chart,D=a.each,G=a.inArray,p=a.isArray,l=a.isObject,g=a.pick,u=a.splat;C.prototype.setResponsive=function(g){var l=this.options.responsive,p=[],m=this.currentResponsive;l&&l.rules&&D(l.rules,function(b){void 0===b._id&&(b._id=a.uniqueKey());this.matchResponsiveRule(b,p,g)},this);var b=a.merge.apply(0,a.map(p,function(b){return a.find(l.rules,
    function(a){return a._id===b}).chartOptions})),p=p.toString()||void 0;p!==(m&&m.ruleIds)&&(m&&this.update(m.undoOptions,g),p?(this.currentResponsive={ruleIds:p,mergedOptions:b,undoOptions:this.currentOptions(b)},this.update(b,g)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,l){var p=a.condition;(p.callback||function(){return this.chartWidth<=g(p.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=g(p.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=g(p.minWidth,0)&&this.chartHeight>=
    g(p.minHeight,0)}).call(this)&&l.push(a._id)};C.prototype.currentOptions=function(g){function r(g,b,d,h){var f;a.objectEach(g,function(a,e){if(!h&&-1<G(e,["series","xAxis","yAxis"]))for(a=u(a),d[e]=[],f=0;f<a.length;f++)b[e][f]&&(d[e][f]={},r(a[f],b[e][f],d[e][f],h+1));else l(a)?(d[e]=p(a)?[]:{},r(a,b[e]||{},d[e],h+1)):d[e]=b[e]||null})}var x={};r(g,this.options,x,0);return x}})(L);(function(a){var C=a.addEvent,D=a.Axis,G=a.Chart,p=a.css,l=a.defined,g=a.each,u=a.extend,A=a.noop,r=a.pick,x=a.timeUnits,
    m=a.wrap;m(a.Series.prototype,"init",function(a){var b;a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&C(this,"updatedData",function(){delete b.ordinalIndex})});m(D.prototype,"getTimeTicks",function(a,d,g,f,c,e,m,p){var b=0,h,w,n={},r,q,u,y=[],B=-Number.MAX_VALUE,z=this.options.tickPixelInterval,k=this.chart.time;if(!this.options.ordinal&&!this.options.breaks||!e||3>e.length||void 0===g)return a.call(this,d,g,f,c);q=e.length;for(h=0;h<q;h++){u=h&&e[h-1]>f;
    e[h]<g&&(b=h);if(h===q-1||e[h+1]-e[h]>5*m||u){if(e[h]>B){for(w=a.call(this,d,e[b],e[h],c);w.length&&w[0]<=B;)w.shift();w.length&&(B=w[w.length-1]);y=y.concat(w)}b=h+1}if(u)break}a=w.info;if(p&&a.unitRange<=x.hour){h=y.length-1;for(b=1;b<h;b++)k.dateFormat("%d",y[b])!==k.dateFormat("%d",y[b-1])&&(n[y[b]]="day",r=!0);r&&(n[y[0]]="day");a.higherRanks=n}y.info=a;if(p&&l(z)){p=k=y.length;h=[];var E;for(r=[];p--;)b=this.translate(y[p]),E&&(r[p]=E-b),h[p]=E=b;r.sort();r=r[Math.floor(r.length/2)];r<.6*z&&
(r=null);p=y[k-1]>f?k-1:k;for(E=void 0;p--;)b=h[p],f=Math.abs(E-b),E&&f<.8*z&&(null===r||f<.8*r)?(n[y[p]]&&!n[y[p+1]]?(f=p+1,E=b):f=p,y.splice(f,1)):E=b}return y});u(D.prototype,{beforeSetTickPositions:function(){var a,d=[],h,f=!1,c,e=this.getExtremes(),m=e.min,p=e.max,t,v=this.isXAxis&&!!this.options.breaks,e=this.options.ordinal,u=Number.MAX_VALUE,n=this.chart.options.chart.ignoreHiddenSeries;c="highcharts-navigator-xaxis"===this.options.className;var F;!this.options.overscroll||this.max!==this.dataMax||
    this.chart.mouseIsDown&&!c||this.eventArgs&&(!this.eventArgs||"navigator"===this.eventArgs.trigger)||(this.max+=this.options.overscroll,!c&&l(this.userMin)&&(this.min+=this.options.overscroll));if(e||v){g(this.series,function(c,b){h=[];if(!(n&&!1===c.visible||!1===c.takeOrdinalPosition&&!v)&&(d=d.concat(c.processedXData),a=d.length,d.sort(function(a,c){return a-c}),u=Math.min(u,r(c.closestPointRange,u)),a)){for(b=0;b<a-1;)d[b]!==d[b+1]&&h.push(d[b+1]),b++;h[0]!==d[0]&&h.unshift(d[0]);d=h}c.isSeriesBoosting&&
    (F=!0)});F&&(d.length=0);a=d.length;if(2<a){c=d[1]-d[0];for(t=a-1;t--&&!f;)d[t+1]-d[t]!==c&&(f=!0);!this.options.keepOrdinalPadding&&(d[0]-m>c||p-d[d.length-1]>c)&&(f=!0)}else this.options.overscroll&&(2===a?u=d[1]-d[0]:1===a?(u=this.options.overscroll,d=[d[0],d[0]+u]):u=this.overscrollPointsRange);f?(this.options.overscroll&&(this.overscrollPointsRange=u,d=d.concat(this.getOverscrollPositions())),this.ordinalPositions=d,c=this.ordinal2lin(Math.max(m,d[0]),!0),t=Math.max(this.ordinal2lin(Math.min(p,
        d[d.length-1]),!0),1),this.ordinalSlope=p=(p-m)/(t-c),this.ordinalOffset=m-c*p):(this.overscrollPointsRange=r(this.closestPointRange,this.overscrollPointsRange),this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0)}this.isOrdinal=e&&f;this.groupIntervalFactor=null},val2lin:function(a,d){var b=this.ordinalPositions;if(b){var f=b.length,c,e;for(c=f;c--;)if(b[c]===a){e=c;break}for(c=f-1;c--;)if(a>b[c]||0===c){a=(a-b[c])/(b[c+1]-b[c]);e=c+a;break}d=d?e:this.ordinalSlope*(e||0)+this.ordinalOffset}else d=
        a;return d},lin2val:function(a,d){var b=this.ordinalPositions;if(b){var f=this.ordinalSlope,c=this.ordinalOffset,e=b.length-1,g;if(d)0>a?a=b[0]:a>e?a=b[e]:(e=Math.floor(a),g=a-e);else for(;e--;)if(d=f*e+c,a>=d){f=f*(e+1)+c;g=(a-d)/(f-d);break}return void 0!==g&&void 0!==b[e]?b[e]+(g?g*(b[e+1]-b[e]):0):a}return a},getExtendedPositions:function(){var a=this,d=a.chart,h=a.series[0].currentDataGrouping,f=a.ordinalIndex,c=h?h.count+h.unitName:"raw",e=a.options.overscroll,l=a.getExtremes(),m,t;f||(f=a.ordinalIndex=
        {});f[c]||(m={series:[],chart:d,getExtremes:function(){return{min:l.dataMin,max:l.dataMax+e}},options:{ordinal:!0},val2lin:D.prototype.val2lin,ordinal2lin:D.prototype.ordinal2lin},g(a.series,function(c){t={xAxis:m,xData:c.xData.slice(),chart:d,destroyGroupedData:A};t.xData=t.xData.concat(a.getOverscrollPositions());t.options={dataGrouping:h?{enabled:!0,forced:!0,approximation:"open",units:[[h.unitName,[h.count]]]}:{enabled:!1}};c.processData.apply(t);m.series.push(t)}),a.beforeSetTickPositions.apply(m),
        f[c]=m.ordinalPositions);return f[c]},getOverscrollPositions:function(){var b=this.options.overscroll,d=this.overscrollPointsRange,g=[],f=this.dataMax;if(a.defined(d))for(g.push(f);f<=this.dataMax+b;)f+=d,g.push(f);return g},getGroupIntervalFactor:function(a,d,g){var b;g=g.processedXData;var c=g.length,e=[];b=this.groupIntervalFactor;if(!b){for(b=0;b<c-1;b++)e[b]=g[b+1]-g[b];e.sort(function(a,c){return a-c});e=e[Math.floor(c/2)];a=Math.max(a,g[0]);d=Math.min(d,g[c-1]);this.groupIntervalFactor=b=c*
        e/(d-a)}return b},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?this.closestPointRange||a:a/(b/this.closestPointRange):a}});D.prototype.ordinal2lin=D.prototype.val2lin;m(G.prototype,"pan",function(a,d){var b=this.xAxis[0],f=b.options.overscroll,c=d.chartX,e=!1;if(b.options.ordinal&&b.series.length){var l=this.mouseDownX,m=b.getExtremes(),t=m.dataMax,v=m.min,r=m.max,n=this.hoverPoints,u=b.closestPointRange||b.overscrollPointsRange,l=(l-c)/(b.translationSlope*
    (b.ordinalSlope||u)),q={ordinalPositions:b.getExtendedPositions()},u=b.lin2val,x=b.val2lin,A;q.ordinalPositions?1<Math.abs(l)&&(n&&g(n,function(a){a.setState()}),0>l?(n=q,A=b.ordinalPositions?b:q):(n=b.ordinalPositions?b:q,A=q),q=A.ordinalPositions,t>q[q.length-1]&&q.push(t),this.fixedRange=r-v,l=b.toFixedRange(null,null,u.apply(n,[x.apply(n,[v,!0])+l,!0]),u.apply(A,[x.apply(A,[r,!0])+l,!0])),l.min>=Math.min(m.dataMin,v)&&l.max<=Math.max(t,r)+f&&b.setExtremes(l.min,l.max,!0,!1,{trigger:"pan"}),this.mouseDownX=
    c,p(this.container,{cursor:"move"})):e=!0}else e=!0;e&&(f&&(b.max=b.dataMax+f),a.apply(this,Array.prototype.slice.call(arguments,1)))})})(L);(function(a){function C(){return Array.prototype.slice.call(arguments,1)}function D(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,p(this.pointArrayMap,["y"]))}var G=a.addEvent,p=a.pick,l=a.wrap,g=a.each,u=a.extend,A=a.isArray,r=a.fireEvent,x=a.Axis,m=a.Series;u(x.prototype,{isInBreak:function(a,d){var b=a.repeat||Infinity,f=a.from,
        c=a.to-a.from;d=d>=f?(d-f)%b:b-(f-d)%b;return a.inclusive?d<=c:d<c&&0!==d},isInAnyBreak:function(a,d){var b=this.options.breaks,f=b&&b.length,c,e,g;if(f){for(;f--;)this.isInBreak(b[f],a)&&(c=!0,e||(e=p(b[f].showPoints,this.isXAxis?!1:!0)));g=c&&d?c&&!e:c}return g}});G(x,"afterSetTickPositions",function(){if(this.options.breaks){var a=this.tickPositions,d=this.tickPositions.info,g=[],f;for(f=0;f<a.length;f++)this.isInAnyBreak(a[f])||g.push(a[f]);this.tickPositions=g;this.tickPositions.info=d}});G(x,
    "afterSetOptions",function(){this.options.breaks&&this.options.breaks.length&&(this.options.ordinal=!1)});G(x,"afterInit",function(){var a=this,d;d=this.options.breaks;a.isBroken=A(d)&&!!d.length;a.isBroken&&(a.val2lin=function(b){var d=b,c,e;for(e=0;e<a.breakArray.length;e++)if(c=a.breakArray[e],c.to<=b)d-=c.len;else if(c.from>=b)break;else if(a.isInBreak(c,b)){d-=b-c.from;break}return d},a.lin2val=function(b){var d,c;for(c=0;c<a.breakArray.length&&!(d=a.breakArray[c],d.from>=b);c++)d.to<b?b+=d.len:
    a.isInBreak(d,b)&&(b+=d.len);return b},a.setExtremes=function(a,b,c,e,d){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;x.prototype.setExtremes.call(this,a,b,c,e,d)},a.setAxisTranslation=function(b){x.prototype.setAxisTranslation.call(this,b);b=a.options.breaks;var d=[],c=[],e=0,h,l,t=a.userMin||a.min,m=a.userMax||a.max,u=p(a.pointRangePadding,0),n,F;g(b,function(c){l=c.repeat||Infinity;a.isInBreak(c,t)&&(t+=c.to%l-t%l);a.isInBreak(c,m)&&
(m-=m%l-c.from%l)});g(b,function(a){n=a.from;for(l=a.repeat||Infinity;n-l>t;)n-=l;for(;n<t;)n+=l;for(F=n;F<m;F+=l)d.push({value:F,move:"in"}),d.push({value:F+(a.to-a.from),move:"out",size:a.breakSize})});d.sort(function(a,c){return a.value===c.value?("in"===a.move?0:1)-("in"===c.move?0:1):a.value-c.value});h=0;n=t;g(d,function(a){h+="in"===a.move?1:-1;1===h&&"in"===a.move&&(n=a.value);0===h&&(c.push({from:n,to:a.value,len:a.value-n-(a.size||0)}),e+=a.value-n-(a.size||0))});a.breakArray=c;a.unitLength=
    m-t-e+u;r(a,"afterBreaks");a.options.staticScale?a.transA=a.options.staticScale:a.unitLength&&(a.transA*=(m-a.min+u)/a.unitLength);u&&(a.minPixelPadding=a.transA*a.minPointOffset);a.min=t;a.max=m})});l(m.prototype,"generatePoints",function(a){a.apply(this,C(arguments));var b=this.xAxis,g=this.yAxis,f=this.points,c,e=f.length,l=this.options.connectNulls,m;if(b&&g&&(b.options.breaks||g.options.breaks))for(;e--;)c=f[e],m=null===c.y&&!1===l,m||!b.isInAnyBreak(c.x,!0)&&!g.isInAnyBreak(c.y,!0)||(f.splice(e,
    1),this.data[e]&&this.data[e].destroyElements())});a.Series.prototype.drawBreaks=function(a,d){var b=this,f=b.points,c,e,l,m;a&&g(d,function(d){c=a.breakArray||[];e=a.isXAxis?a.min:p(b.options.threshold,a.min);g(f,function(b){m=p(b["stack"+d.toUpperCase()],b[d]);g(c,function(c){l=!1;if(e<c.from&&m>c.to||e>c.from&&m<c.from)l="pointBreak";else if(e<c.from&&m>c.from&&m<c.to||e>c.from&&m>c.to&&m<c.from)l="pointInBreak";l&&r(a,l,{point:b,brk:c})})})})};a.Series.prototype.gappedPath=function(){var b=this.currentDataGrouping,
    d=b&&b.totalRange,b=this.options.gapSize,g=this.points.slice(),f=g.length-1,c=this.yAxis;if(b&&0<f)for("value"!==this.options.gapUnit&&(b*=this.closestPointRange),d&&d>b&&(b=d);f--;)g[f+1].x-g[f].x>b&&(d=(g[f].x+g[f+1].x)/2,g.splice(f+1,0,{isNull:!0,x:d}),this.options.stacking&&(d=c.stacks[this.stackKey][d]=new a.StackItem(c,c.options.stackLabels,!1,d,this.stack),d.total=0));return this.getGraphPath(g)};l(a.seriesTypes.column.prototype,"drawPoints",D);l(a.Series.prototype,"drawPoints",D)})(L);(function(a){var C=
    a.addEvent,D=a.arrayMax,G=a.arrayMin,p=a.Axis,l=a.defaultPlotOptions,g=a.defined,u=a.each,A=a.extend,r=a.format,x=a.isNumber,m=a.merge,b=a.pick,d=a.Point,h=a.Series,f=a.Tooltip,c=a.wrap,e=h.prototype,w=e.processData,y=e.generatePoints,t={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],
        hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},v={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",
        groupPixelWidth:5}},J=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],n=a.approximations={sum:function(a){var c=a.length,b;if(!c&&a.hasNulls)b=null;else if(c)for(b=0;c--;)b+=a[c];return b},average:function(a){var c=a.length;a=n.sum(a);x(a)&&c&&(a/=c);return a},averages:function(){var a=[];u(arguments,function(c){a.push(n.average(c))});
        return void 0===a[0]?void 0:a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?D(a):a.hasNulls?null:void 0},low:function(a){return a.length?G(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,c,b,e){a=n.open(a);c=n.high(c);b=n.low(b);e=n.close(e);if(x(a)||x(c)||x(b)||x(e))return[a,c,b,e]},range:function(a,c){a=n.low(a);c=n.high(c);if(x(a)||x(c))return[a,c];if(null===a&&null===c)return null}};
    e.groupData=function(a,c,b,e){var d=this.data,f=this.options.data,k=[],g=[],h=[],l=a.length,m,q,p=!!c,r=[];e="function"===typeof e?e:n[e]||v[this.type]&&n[v[this.type].approximation]||n[t.approximation];var w=this.pointArrayMap,y=w&&w.length,F=0;q=0;var A,J;y?u(w,function(){r.push([])}):r.push([]);A=y||1;for(J=0;J<=l&&!(a[J]>=b[0]);J++);for(J;J<=l;J++){for(;void 0!==b[F+1]&&a[J]>=b[F+1]||J===l;){m=b[F];this.dataGroupInfo={start:q,length:r[0].length};q=e.apply(this,r);void 0!==q&&(k.push(m),g.push(q),
        h.push(this.dataGroupInfo));q=J;for(m=0;m<A;m++)r[m].length=0,r[m].hasNulls=!1;F+=1;if(J===l)break}if(J===l)break;if(w){m=this.cropStart+J;var I=d&&d[m]||this.pointClass.prototype.applyOptions.apply({series:this},[f[m]]),H;for(m=0;m<y;m++)H=I[w[m]],x(H)?r[m].push(H):null===H&&(r[m].hasNulls=!0)}else m=p?c[J]:null,x(m)?r[0].push(m):null===m&&(r[0].hasNulls=!0)}return[k,g,h]};e.processData=function(){var a=this.chart,c=this.options.dataGrouping,d=!1!==this.allowDG&&c&&b(c.enabled,a.options.isStock),
        f=this.visible||!a.options.chart.ignoreHiddenSeries,h,l=this.currentDataGrouping,k;this.forceCrop=d;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==w.apply(this,arguments)&&d){this.destroyGroupedData();var n,m=c.groupAll?this.xData:this.processedXData,t=c.groupAll?this.yData:this.processedYData,v=a.plotSizeX,a=this.xAxis,p=a.options.ordinal,r=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(r){this.isDirty=h=!0;this.points=null;d=a.getExtremes();k=d.min;d=d.max;p=p&&a.getGroupIntervalFactor(k,
        d,this)||1;r=r*(d-k)/v*p;v=a.getTimeTicks(a.normalizeTimeTickInterval(r,c.units||J),Math.min(k,m[0]),Math.max(d,m[m.length-1]),a.options.startOfWeek,m,this.closestPointRange);t=e.groupData.apply(this,[m,t,v,c.approximation]);m=t[0];p=t[1];if(c.smoothed&&m.length){n=m.length-1;for(m[n]=Math.min(m[n],d);n--&&0<n;)m[n]+=r/2;m[0]=Math.max(m[0],k)}k=v.info;this.closestPointRange=v.info.totalRange;this.groupMap=t[2];g(m[0])&&m[0]<a.dataMin&&f&&(a.min<=a.dataMin&&(a.min=m[0]),a.dataMin=m[0]);c.groupAll&&
    (c=this.cropData(m,p,a.min,a.max,1),m=c.xData,p=c.yData);this.processedXData=m;this.processedYData=p}else this.groupMap=null;this.hasGroupedData=h;this.currentDataGrouping=k;this.preventGraphAnimation=(l&&l.totalRange)!==(k&&k.totalRange)}};e.destroyGroupedData=function(){var a=this.groupedData;u(a||[],function(c,b){c&&(a[b]=c.destroy?c.destroy():null)});this.groupedData=null};e.generatePoints=function(){y.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};
    C(d,"update",function(){if(this.dataGroup)return a.error(24),!1});c(f.prototype,"tooltipFooterHeaderFormatter",function(a,c,b){var e=this.chart.time,d=c.series,f=d.tooltipOptions,k=d.options.dataGrouping,g=f.xDateFormat,h,l=d.xAxis;return l&&"datetime"===l.options.type&&k&&x(c.key)?(a=d.currentDataGrouping,k=k.dateTimeLabelFormats,a?(l=k[a.unitName],1===a.count?g=l[0]:(g=l[1],h=l[2])):!g&&k&&(g=this.getXDateFormat(c,f,l)),g=e.dateFormat(g,c.key),h&&(g+=e.dateFormat(h,c.key+a.totalRange-1)),r(f[(b?
        "footer":"header")+"Format"],{point:A(c.point,{key:g}),series:d},e)):a.call(this,c,b)});C(h,"destroy",e.destroyGroupedData);C(h,"afterSetOptions",function(a){a=a.options;var c=this.type,b=this.chart.options.plotOptions,e=l[c].dataGrouping,d=this.useCommonDataGrouping&&t;if(v[c]||d)e||(e=m(t,v[c])),a.dataGrouping=m(d,e,b.series&&b.series.dataGrouping,b[c].dataGrouping,this.userOptions.dataGrouping);this.chart.options.isStock&&(this.requireSorting=!0)});C(p,"afterSetScale",function(){u(this.series,
        function(a){a.hasProcessed=!1})});p.prototype.getGroupPixelWidth=function(){var a=this.series,c=a.length,b,e=0,d=!1,f;for(b=c;b--;)(f=a[b].options.dataGrouping)&&(e=Math.max(e,f.groupPixelWidth));for(b=c;b--;)(f=a[b].options.dataGrouping)&&a[b].hasProcessed&&(c=(a[b].processedXData||a[b].data).length,a[b].groupPixelWidth||c>this.chart.plotSizeX/e||c&&f.forced)&&(d=!0);return d?e:0};p.prototype.setDataGrouping=function(a,c){var e;c=b(c,!0);a||(a={forced:!1,units:null});if(this instanceof p)for(e=this.series.length;e--;)this.series[e].update({dataGrouping:a},
        !1);else u(this.chart.options.series,function(c){c.dataGrouping=a},!1);this.ordinalSlope=null;c&&this.chart.redraw()}})(L);(function(a){var C=a.each,D=a.Point,G=a.seriesType,p=a.seriesTypes;G("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},threshold:null,states:{hover:{lineWidth:3}},
    stickyTracking:!0},{directTouch:!1,pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"close",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,g){g=p.column.prototype.pointAttribs.call(this,a,g);var l=this.options;delete g.fill;!a.options.color&&l.upColor&&a.open<a.close&&(g.stroke=l.upColor);return g},translate:function(){var a=this,g=a.yAxis,u=!!a.modifyValue,A=["plotOpen","plotHigh","plotLow","plotClose",
        "yBottom"];p.column.prototype.translate.apply(a);C(a.points,function(l){C([l.open,l.high,l.low,l.close,l.low],function(p,m){null!==p&&(u&&(p=a.modifyValue(p)),l[A[m]]=g.toPixels(p,!0))});l.tooltipPos[1]=l.plotHigh+g.pos-a.chart.plotTop})},drawPoints:function(){var a=this,g=a.chart;C(a.points,function(l){var p,r,u,m,b=l.graphic,d,h=!b;void 0!==l.plotY&&(b||(l.graphic=b=g.renderer.path().add(a.group)),b.attr(a.pointAttribs(l,l.selected&&"select")),r=b.strokeWidth()%2/2,d=Math.round(l.plotX)-r,u=Math.round(l.shapeArgs.width/
        2),m=["M",d,Math.round(l.yBottom),"L",d,Math.round(l.plotHigh)],null!==l.open&&(p=Math.round(l.plotOpen)+r,m.push("M",d,p,"L",d-u,p)),null!==l.close&&(p=Math.round(l.plotClose)+r,m.push("M",d,p,"L",d+u,p)),b[h?"attr":"animate"]({d:m}).addClass(l.getClassName(),!0))})},animate:null},{getClassName:function(){return D.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(L);(function(a){var C=a.defaultPlotOptions,D=a.each,G=a.merge,p=a.seriesType,
    l=a.seriesTypes;p("candlestick","ohlc",G(C.column,{states:{hover:{lineWidth:2}},tooltip:C.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(a,p){var g=l.column.prototype.pointAttribs.call(this,a,p),r=this.options,u=a.open<a.close,m=r.lineColor||this.color;g["stroke-width"]=r.lineWidth;g.fill=a.options.color||(u?r.upColor||this.color:this.color);g.stroke=a.lineColor||(u?r.upLineColor||m:m);p&&(a=r.states[p],g.fill=a.color||g.fill,
        g.stroke=a.lineColor||g.stroke,g["stroke-width"]=a.lineWidth||g["stroke-width"]);return g},drawPoints:function(){var a=this,l=a.chart,p=a.yAxis.reversed;D(a.points,function(g){var r=g.graphic,m,b,d,h,f,c,e,w=!r;void 0!==g.plotY&&(r||(g.graphic=r=l.renderer.path().add(a.group)),r.attr(a.pointAttribs(g,g.selected&&"select")).shadow(a.options.shadow),f=r.strokeWidth()%2/2,c=Math.round(g.plotX)-f,m=g.plotOpen,b=g.plotClose,d=Math.min(m,b),m=Math.max(m,b),e=Math.round(g.shapeArgs.width/2),b=p?m!==g.yBottom:
        Math.round(d)!==Math.round(g.plotHigh),h=p?Math.round(d)!==Math.round(g.plotHigh):m!==g.yBottom,d=Math.round(d)+f,m=Math.round(m)+f,f=[],f.push("M",c-e,m,"L",c-e,d,"L",c+e,d,"L",c+e,m,"Z","M",c,d,"L",c,b?Math.round(p?g.yBottom:g.plotHigh):d,"M",c,m,"L",c,h?Math.round(p?g.plotHigh:g.yBottom):m),r[w?"attr":"animate"]({d:f}).addClass(g.getClassName(),!0))})}})})(L);ea=function(a){var C=a.each,D=a.defined,G=a.seriesTypes,p=a.stableSort;return{getPlotBox:function(){return a.Series.prototype.getPlotBox.call(this.options.onSeries&&
        this.chart.get(this.options.onSeries)||this)},translate:function(){G.column.prototype.translate.apply(this);var a=this.options,g=this.chart,u=this.points,A=u.length-1,r,x,m=a.onSeries,m=m&&g.get(m),a=a.onKey||"y",b=m&&m.options.step,d=m&&m.points,h=d&&d.length,f=g.inverted,c=this.xAxis,e=this.yAxis,w=0,y,t,v,J;if(m&&m.visible&&h)for(w=(m.pointXOffset||0)+(m.barW||0)/2,r=m.currentDataGrouping,t=d[h-1].x+(r?r.totalRange:0),p(u,function(a,c){return a.x-c.x}),a="plot"+a[0].toUpperCase()+a.substr(1);h--&&
    u[A]&&!(y=d[h],r=u[A],r.y=y.y,y.x<=r.x&&void 0!==y[a]&&(r.x<=t&&(r.plotY=y[a],y.x<r.x&&!b&&(v=d[h+1])&&void 0!==v[a]&&(J=(r.x-y.x)/(v.x-y.x),r.plotY+=J*(v[a]-y[a]),r.y+=J*(v.y-y.y))),A--,h++,0>A)););C(u,function(a,b){var d;a.plotX+=w;if(void 0===a.plotY||f)0<=a.plotX&&a.plotX<=c.len?f?(a.plotY=c.translate(a.x,0,1,0,1),a.plotX=D(a.y)?e.translate(a.y,0,0,0,1):0):a.plotY=g.chartHeight-c.bottom-(c.opposite?c.height:0)+c.offset-e.top:a.shapeArgs={};(x=u[b-1])&&x.plotX===a.plotX&&(void 0===x.stackIndex&&
    (x.stackIndex=0),d=x.stackIndex+1);a.stackIndex=d});this.onSeries=m}}}(L);(function(a,C){function D(a){m[a+"pin"]=function(b,g,f,c,e){var d=e&&e.anchorX;e=e&&e.anchorY;"circle"===a&&c>f&&(b-=Math.round((c-f)/2),f=c);b=m[a](b,g,f,c);d&&e&&(b.push("M","circle"===a?b[1]-b[4]:b[1]+b[4]/2,g>e?g:g+c,"L",d,e),b=b.concat(m.circle(d-1,e-1,2,2)));return b}}var G=a.addEvent,p=a.each,l=a.merge,g=a.noop,u=a.Renderer,A=a.seriesType,r=a.TrackerMixin,x=a.VMLRenderer,m=a.SVGRenderer.prototype.symbols;A("flags","column",
    {pointRange:0,allowOverlapX:!1,shape:"flag",stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,d){var b=this.options,f=a&&a.color||this.color,c=b.lineColor,
            e=a&&a.lineWidth;a=a&&a.fillColor||b.fillColor;d&&(a=b.states[d].fillColor,c=b.states[d].lineColor,e=b.states[d].lineWidth);return{fill:a||f,stroke:c||f,"stroke-width":e||b.lineWidth||0}},translate:C.translate,getPlotBox:C.getPlotBox,drawPoints:function(){var b=this.points,d=this.chart,g=d.renderer,f,c,e=d.inverted,m=this.options,r=m.y,t,v,u,n,x,q,A=this.yAxis,C={},B=[];for(v=b.length;v--;)u=b[v],q=(e?u.plotY:u.plotX)>this.xAxis.len,f=u.plotX,n=u.stackIndex,t=u.options.shape||m.shape,c=u.plotY,void 0!==
        c&&(c=u.plotY+r-(void 0!==n&&n*m.stackDistance)),u.anchorX=n?void 0:u.plotX,x=n?void 0:u.plotY,n=u.graphic,void 0!==c&&0<=f&&!q?(n||(n=u.graphic=g.label("",null,null,t,null,null,m.useHTML).attr(this.pointAttribs(u)).css(l(m.style,u.style)).attr({align:"flag"===t?"left":"center",width:m.width,height:m.height,"text-align":m.textAlign}).addClass("highcharts-point").add(this.markerGroup),u.graphic.div&&(u.graphic.div.point=u),n.shadow(m.shadow),n.isNew=!0),0<f&&(f-=n.strokeWidth()%2),t={y:c,anchorY:x},
        m.allowOverlapX&&(t.x=f,t.anchorX=u.anchorX),n.attr({text:u.options.title||m.title||"A"})[n.isNew?"attr":"animate"](t),m.allowOverlapX||(C[u.plotX]?C[u.plotX].size=Math.max(C[u.plotX].size,n.width):C[u.plotX]={align:0,size:n.width,target:f,anchorX:f}),u.tooltipPos=[f,c+A.pos-d.plotTop]):n&&(u.graphic=n.destroy());m.allowOverlapX||(a.objectEach(C,function(a){a.plotX=a.anchorX;B.push(a)}),a.distribute(B,e?A.len:this.xAxis.len,100),p(b,function(a){var c=a.graphic&&C[a.plotX];c&&(a.graphic[a.graphic.isNew?
            "attr":"animate"]({x:c.pos,anchorX:a.anchorX}),c.pos?a.graphic.isNew=!1:(a.graphic.attr({x:-9999,anchorX:-9999}),a.graphic.isNew=!0))}));m.useHTML&&a.wrap(this.markerGroup,"on",function(c){return a.SVGElement.prototype.on.apply(c.apply(this,[].slice.call(arguments,1)),[].slice.call(arguments,1))})},drawTracker:function(){var a=this.points;r.drawTrackerPoint.apply(this);p(a,function(b){var d=b.graphic;d&&G(d.element,"mouseover",function(){0<b.stackIndex&&!b.raised&&(b._y=d.y,d.attr({y:b._y-8}),b.raised=
            !0);p(a,function(a){a!==b&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:g,buildKDTree:g,setClip:g,invertGroups:g});m.flag=function(a,d,g,f,c){var b=c&&c.anchorX||a;c=c&&c.anchorY||d;return m.circle(b-1,c-1,2,2).concat(["M",b,c,"L",a,d+f,a,d,a+g,d,a+g,d+f,a,d+f,"Z"])};D("circle");D("square");u===x&&p(["flag","circlepin","squarepin"],function(a){x.prototype.symbols[a]=m[a]})})(L,ea);(function(a){function C(a,b,d){this.init(a,b,d)}var D=a.addEvent,G=a.Axis,p=a.correctFloat,
    l=a.defaultOptions,g=a.defined,u=a.destroyObjectProperties,A=a.each,r=a.fireEvent,x=a.hasTouch,m=a.merge,b=a.pick,d=a.removeEvent,h,f={height:a.isTouchDevice?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:void 0,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",
        trackBorderWidth:1};l.scrollbar=m(!0,f,l.scrollbar);a.swapXY=h=function(a,b){var c=a.length,e;if(b)for(b=0;b<c;b+=3)e=a[b+1],a[b+1]=a[b+2],a[b+2]=e;return a};C.prototype={init:function(a,e,d){this.scrollbarButtons=[];this.renderer=a;this.userOptions=e;this.options=m(f,e);this.chart=d;this.size=b(this.options.size,this.options.height);e.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,d=this.size,f;this.group=f=a.g("scrollbar").attr({zIndex:b.zIndex,
        translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,r:b.trackBorderRadius||0,height:d,width:d}).add(f);this.track.attr({fill:b.trackBackgroundColor,stroke:b.trackBorderColor,"stroke-width":b.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(f);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:d,width:d,r:b.barBorderRadius||0}).add(this.scrollbarGroup);
        this.scrollbarRifles=a.path(h(["M",-3,d/4,"L",-3,2*d/3,"M",0,d/4,"L",0,2*d/3,"M",3,d/4,"L",3,2*d/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbar.attr({fill:b.barBackgroundColor,stroke:b.barBorderColor,"stroke-width":b.barBorderWidth});this.scrollbarRifles.attr({stroke:b.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);
        this.drawScrollbarButton(1)},position:function(a,b,d,f){var c=this.options.vertical,e=0,g=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;this.width=d;this.xOffset=this.height=f;this.yOffset=e;c?(this.width=this.yOffset=d=e=this.size,this.xOffset=b=0,this.barWidth=f-2*d,this.x=a+=this.options.margin):(this.height=this.xOffset=f=b=this.size,this.barWidth=d-2*f,this.y+=this.options.margin);this.group[g]({translateX:a,translateY:this.y});this.track[g]({width:d,height:f});this.scrollbarButtons[1][g]({translateX:c?
            0:d-b,translateY:c?f-e:0})},drawScrollbarButton:function(a){var c=this.renderer,b=this.scrollbarButtons,d=this.options,f=this.size,g;g=c.g().add(this.group);b.push(g);g=c.rect().addClass("highcharts-scrollbar-button").add(g);g.attr({stroke:d.buttonBorderColor,"stroke-width":d.buttonBorderWidth,fill:d.buttonBackgroundColor});g.attr(g.crisp({x:-.5,y:-.5,width:f+1,height:f+1,r:d.buttonBorderRadius},g.strokeWidth()));g=c.path(h(["M",f/2+(a?-1:1),f/2-3,"L",f/2+(a?-1:1),f/2+3,"L",f/2+(a?2:-2),f/2],d.vertical)).addClass("highcharts-scrollbar-arrow").add(b[a]);
        g.attr({fill:d.buttonArrowColor})},setRange:function(a,b){var c=this.options,e=c.vertical,d=c.minWidth,f=this.barWidth,h,l,m=!this.rendered||this.hasDragged||this.chart.navigator&&this.chart.navigator.hasDragged?"attr":"animate";g(f)&&(a=Math.max(a,0),h=Math.ceil(f*a),this.calculatedWidth=l=p(f*Math.min(b,1)-h),l<d&&(h=(f-d+l)*a,l=d),d=Math.floor(h+this.xOffset+this.yOffset),f=l/2-.5,this.from=a,this.to=b,e?(this.scrollbarGroup[m]({translateY:d}),this.scrollbar[m]({height:l}),this.scrollbarRifles[m]({translateY:f}),
        this.scrollbarTop=d,this.scrollbarLeft=0):(this.scrollbarGroup[m]({translateX:d}),this.scrollbar[m]({width:l}),this.scrollbarRifles[m]({translateX:f}),this.scrollbarLeft=d,this.scrollbarTop=0),12>=l?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===c.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var c=a.chart.pointer.normalize(b),e=a.options.vertical?"chartY":"chartX",d=a.initPositions;!a.grabbedCenter||
    b.touches&&0===b.touches[0][e]||(c=a.cursorToScrollbarPosition(c)[e],e=a[e],e=c-e,a.hasDragged=!0,a.updatePosition(d[0]+e,d[1]+e),a.hasDragged&&r(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&r(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);b=a.cursorToScrollbarPosition(b);
        a.chartX=b.chartX;a.chartY=b.chartY;a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(b){var c=p(a.to-a.from)*a.options.step;a.updatePosition(p(a.from-c),p(a.to-c));r(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var c=(a.to-a.from)*a.options.step;a.updatePosition(a.from+c,a.to+c);r(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var c=a.chart.pointer.normalize(b),e=a.to-a.from,
        d=a.y+a.scrollbarTop,f=a.x+a.scrollbarLeft;a.options.vertical&&c.chartY>d||!a.options.vertical&&c.chartX>f?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-e,a.to-e);r(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,b){1<
    b&&(a=p(1-p(b-a)),b=1);0>a&&(b=p(b-a),a=0);this.from=a;this.to=b},update:function(a){this.destroy();this.init(this.chart.renderer,m(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,d=this.scrollbarGroup.element,f=this.mouseDownHandler,g=this.mouseMoveHandler,h=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[d,"mousedown",
        f],[d.ownerDocument,"mousemove",g],[d.ownerDocument,"mouseup",h]];x&&a.push([d,"touchstart",f],[d.ownerDocument,"touchmove",g],[d.ownerDocument,"touchend",h]);A(a,function(a){D.apply(null,a)});this._events=a},removeEvents:function(){A(this._events,function(a){d.apply(null,a)});this._events.length=0},destroy:function(){var a=this.chart.scroller;this.removeEvents();A(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);
        a&&this===a.scrollbar&&(a.scrollbar=null,u(a.scrollbarButtons))}};D(G,"afterInit",function(){var a=this;a.options.scrollbar&&a.options.scrollbar.enabled&&(a.options.scrollbar.vertical=!a.horiz,a.options.startOnTick=a.options.endOnTick=!1,a.scrollbar=new C(a.chart.renderer,a.options.scrollbar,a.chart),D(a.scrollbar,"changed",function(c){var d=Math.min(b(a.options.min,a.min),a.min,a.dataMin),e=Math.max(b(a.options.max,a.max),a.max,a.dataMax)-d,f;a.horiz&&!a.reversed||!a.horiz&&a.reversed?(f=d+e*this.to,
    d+=e*this.from):(f=d+e*(1-this.from),d+=e*(1-this.to));a.setExtremes(d,f,!0,!1,c)}))});D(G,"afterRender",function(){var a=Math.min(b(this.options.min,this.min),this.min,b(this.dataMin,this.min)),d=Math.max(b(this.options.max,this.max),this.max,b(this.dataMax,this.max)),f=this.scrollbar,h=this.titleOffset||0;if(f){this.horiz?(f.position(this.left,this.top+this.height+2+this.chart.scrollbarsOffsets[1]+(this.opposite?0:h+this.axisTitleMargin+this.offset),this.width,this.height),h=1):(f.position(this.left+
    this.width+2+this.chart.scrollbarsOffsets[0]+(this.opposite?h+this.axisTitleMargin+this.offset:0),this.top,this.width,this.height),h=0);if(!this.opposite&&!this.horiz||this.opposite&&this.horiz)this.chart.scrollbarsOffsets[h]+=this.scrollbar.size+this.scrollbar.options.margin;isNaN(a)||isNaN(d)||!g(this.min)||!g(this.max)?f.setRange(0,0):(h=(this.min-a)/(d-a),a=(this.max-a)/(d-a),this.horiz&&!this.reversed||!this.horiz&&this.reversed?f.setRange(h,a):f.setRange(1-a,1-h))}});D(G,"afterGetOffset",function(){var a=
    this.horiz?2:1,b=this.scrollbar;b&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[a]+=b.size+b.options.margin)});a.Scrollbar=C})(L);(function(a){function C(a){this.init(a)}var D=a.addEvent,G=a.Axis,p=a.Chart,l=a.color,g=a.defaultOptions,u=a.defined,A=a.destroyObjectProperties,r=a.each,x=a.erase,m=a.error,b=a.extend,d=a.grep,h=a.hasTouch,f=a.isArray,c=a.isNumber,e=a.isObject,w=a.isTouchDevice,y=a.merge,t=a.pick,v=a.removeEvent,J=a.Scrollbar,n=a.Series,F=a.seriesTypes,q=a.wrap,I=[].concat(a.defaultDataGroupingUnits),
    H=function(a){var b=d(arguments,c);if(b.length)return Math[a].apply(0,b)};I[4]=["day",[1,2,3,4]];I[5]=["week",[1,2,3]];F=void 0===F.areaspline?"line":"areaspline";b(g,{navigator:{height:40,margin:25,maskInside:!0,handles:{width:7,height:15,symbols:["navigator-handle","navigator-handle"],enabled:!0,lineWidth:1,backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:l("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",outlineWidth:1,series:{type:F,fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",
                enabled:!0,groupPixelWidth:2,smoothed:!0,units:I},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,threshold:null},xAxis:{overscroll:0,className:"highcharts-navigator-xaxis",tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,
            endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});a.Renderer.prototype.symbols["navigator-handle"]=function(a,b,c,d,e){a=e.width/2;b=Math.round(a/3)+.5;e=e.height;return["M",-a-1,.5,"L",a,.5,"L",a,e+.5,"L",-a-1,e+.5,"L",-a-1,.5,"M",-b,4,"L",-b,e-3,"M",b-1,4,"L",b-1,e-3]};C.prototype={drawHandle:function(a,b,c,d){var e=this.navigatorOptions.handles.height;this.handles[b][d](c?{translateX:Math.round(this.left+this.height/2),translateY:Math.round(this.top+
            parseInt(a,10)+.5-e)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-e/2-1)})},drawOutline:function(a,b,c,d){var e=this.navigatorOptions.maskInside,f=this.outline.strokeWidth(),g=f/2,f=f%2/2,k=this.outlineHeight,h=this.scrollbarHeight,l=this.size,n=this.left-h,m=this.top;c?(n-=g,c=m+b+f,b=m+a+f,a=["M",n+k,m-h-f,"L",n+k,c,"L",n,c,"L",n,b,"L",n+k,b,"L",n+k,m+l+h].concat(e?["M",n+k,c-g,"L",n+k,b+g]:[])):(a+=n+h-f,b+=n+h-f,m+=g,a=["M",n,m,"L",a,m,"L",a,m+
    k,"L",b,m+k,"L",b,m,"L",n+l+2*h,m].concat(e?["M",a-g,m,"L",b+g,m]:[]));this.outline[d]({d:a})},drawMasks:function(a,b,c,d){var e=this.left,f=this.top,g=this.height,k,h,l,n;c?(l=[e,e,e],n=[f,f+a,f+b],h=[g,g,g],k=[a,b-a,this.size-b]):(l=[e,e+a,e+b],n=[f,f,f],h=[a,b-a,this.size-b],k=[g,g,g]);r(this.shades,function(a,b){a[d]({x:l[b],y:n[b],width:h[b],height:k[b]})})},renderElements:function(){var a=this,b=a.navigatorOptions,c=b.maskInside,d=a.chart,e=d.inverted,f=d.renderer,g;a.navigatorGroup=g=f.g("navigator").attr({zIndex:8,
        visibility:"hidden"}).add();var h={cursor:e?"ns-resize":"ew-resize"};r([!c,c,!c],function(c,d){a.shades[d]=f.rect().addClass("highcharts-navigator-mask"+(1===d?"-inside":"-outside")).attr({fill:c?b.maskFill:"rgba(0,0,0,0)"}).css(1===d&&h).add(g)});a.outline=f.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor}).add(g);b.handles.enabled&&r([0,1],function(c){b.handles.inverted=d.inverted;a.handles[c]=f.symbol(b.handles.symbols[c],-b.handles.width/
        2-1,0,b.handles.width,b.handles.height,b.handles);a.handles[c].attr({zIndex:7-c}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][c]).add(g);var e=b.handles;a.handles[c].attr({fill:e.backgroundColor,stroke:e.borderColor,"stroke-width":e.lineWidth}).css(h)})},update:function(a){r(this.series||[],function(a){a.baseSeries&&delete a.baseSeries.navigatorSeries});this.destroy();y(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             d,e,f){var g=this.chart,k,h,l=this.scrollbarHeight,n,m=this.xAxis;k=m.fake?g.xAxis[0]:m;var q=this.navigatorEnabled,z,p=this.rendered;h=g.inverted;var v,B=g.xAxis[0].minRange,r=g.xAxis[0].options.maxRange;if(!this.hasDragged||u(e)){if(!c(b)||!c(d))if(p)e=0,f=t(m.width,k.width);else return;this.left=t(m.left,g.plotLeft+l+(h?g.plotWidth:0));this.size=z=n=t(m.len,(h?g.plotHeight:g.plotWidth)-2*l);g=h?l:n+2*l;e=t(e,m.toPixels(b,!0));f=t(f,m.toPixels(d,!0));c(e)&&Infinity!==Math.abs(e)||(e=0,f=g);b=m.toValue(e,
        !0);d=m.toValue(f,!0);v=Math.abs(a.correctFloat(d-b));v<B?this.grabbedLeft?e=m.toPixels(d-B,!0):this.grabbedRight&&(f=m.toPixels(b+B,!0)):u(r)&&v>r&&(this.grabbedLeft?e=m.toPixels(d-r,!0):this.grabbedRight&&(f=m.toPixels(b+r,!0)));this.zoomedMax=Math.min(Math.max(e,f,0),z);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(e,f),0),z);this.range=this.zoomedMax-this.zoomedMin;z=Math.round(this.zoomedMax);e=Math.round(this.zoomedMin);q&&(this.navigatorGroup.attr({visibility:"visible"}),
        p=p&&!this.hasDragged?"animate":"attr",this.drawMasks(e,z,h,p),this.drawOutline(e,z,h,p),this.navigatorOptions.handles.enabled&&(this.drawHandle(e,0,h,p),this.drawHandle(z,1,h,p)));this.scrollbar&&(h?(h=this.top-l,k=this.left-l+(q||!k.opposite?0:(k.titleOffset||0)+k.axisTitleMargin),l=n+2*l):(h=this.top+(q?this.height:-l),k=this.left-l),this.scrollbar.position(k,h,g,l),this.scrollbar.setRange(this.zoomedMin/(n||1),this.zoomedMax/(n||1)));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,
        c=b.container,d=[],e,f;a.mouseMoveHandler=e=function(b){a.onMouseMove(b)};a.mouseUpHandler=f=function(b){a.onMouseUp(b)};d=a.getPartsEvents("mousedown");d.push(D(c,"mousemove",e),D(c.ownerDocument,"mouseup",f));h&&(d.push(D(c,"touchmove",e),D(c.ownerDocument,"touchend",f)),d.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=d;a.series&&a.series[0]&&d.push(D(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,c=[];
        r(["shades","handles"],function(d){r(b[d],function(e,f){c.push(D(e.element,a,function(a){b[d+"Mousedown"](a,f)}))})});return c},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);var c=this.chart,d=this.xAxis,e=this.zoomedMin,f=this.left,g=this.size,h=this.range,l=a.chartX,n,m;c.inverted&&(l=a.chartY,f=this.top);1===b?(this.grabbedCenter=l,this.fixedWidth=h,this.dragOffset=l-e):(a=l-f-h/2,0===b?a=Math.max(0,a):2===b&&a+h>=g&&(a=g-h,d.reversed?(a-=h,m=this.getUnionExtremes().dataMin):
        n=this.getUnionExtremes().dataMax),a!==e&&(this.fixedWidth=h,b=d.toFixedRange(a,a+h,m,n),u(b.min)&&c.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var c=a.xAxis[0],d=a.inverted&&!c.reversed||!a.inverted&&c.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=d?c.min:c.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=
        d?c.max:c.min);a.fixedRange=null},onMouseMove:function(b){var c=this,d=c.chart,e=c.left,f=c.navigatorSize,g=c.range,h=c.dragOffset,l=d.inverted;b.touches&&0===b.touches[0].pageX||(b=d.pointer.normalize(b),d=b.chartX,l&&(e=c.top,d=b.chartY),c.grabbedLeft?(c.hasDragged=!0,c.render(0,0,d-e,c.otherHandlePos)):c.grabbedRight?(c.hasDragged=!0,c.render(0,0,c.otherHandlePos,d-e)):c.grabbedCenter&&(c.hasDragged=!0,d<h?d=h:d>f+h-g&&(d=f+h-g),c.render(0,0,d-h,d-h+g)),c.hasDragged&&c.scrollbar&&t(c.scrollbar.options.liveRedraw,
        a.svg&&!w&&!this.chart.isBoosting)&&(b.DOMType=b.type,setTimeout(function(){c.onMouseUp(b)},0)))},onMouseUp:function(a){var b=this.chart,c=this.xAxis,d=c&&c.reversed,e=this.scrollbar,f,g,h=a.DOMEvent||a;(!this.hasDragged||e&&e.hasDragged)&&"scrollbar"!==a.trigger||(e=this.getUnionExtremes(),this.zoomedMin===this.otherHandlePos?f=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(g=this.fixedExtreme),this.zoomedMax===this.size&&(g=d?e.dataMin:e.dataMax),0===this.zoomedMin&&(f=d?e.dataMax:e.dataMin),
        c=c.toFixedRange(this.zoomedMin,this.zoomedMax,f,g),u(c.min)&&b.xAxis[0].setExtremes(Math.min(c.min,c.max),Math.max(c.min,c.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:h}));"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(r(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);
        this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&(!1!==this.navigatorOptions.adaptToUpdatedData&&r(a,function(a){v(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&v(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,c=b.navigator,d=c.enabled,e=b.scrollbar,f=e.enabled,b=d?c.height:0,g=f?e.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=
        g;this.scrollbarEnabled=f;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=e;this.outlineHeight=b+g;this.opposite=t(c.opposite,!d&&a.inverted);var h=this,d=h.baseSeries,e=a.xAxis.length,f=a.yAxis.length,l=d&&d[0]&&d[0].xAxis||a.xAxis[0]||{options:{}};a.isDirtyBox=!0;h.navigatorEnabled?(h.xAxis=new G(a,y({breaks:l.options.breaks,ordinal:l.options.ordinal},c.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,type:"datetime",index:e,isInternal:!0,offset:0,keepOrdinalPadding:!0,
            startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[g,0,-g,0],width:b}:{offsets:[0,-g,0,g],height:b})),h.yAxis=new G(a,y(c.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:f,isInternal:!0,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),d||c.series.data?h.updateNavigatorSeries(!1):0===a.series.length&&(h.unbindRedraw=D(a,"beforeRedraw",function(){0<a.series.length&&!h.series&&(h.setBaseSeries(),h.unbindRedraw())})),h.renderElements(),h.addMouseEvents()):
        h.xAxis={translate:function(b,c){var d=a.xAxis[0],e=d.getExtremes(),f=d.len-2*g,k=H("min",d.options.min,e.dataMin),d=H("max",d.options.max,e.dataMax)-k;return c?b*d/f+k:f*(b-k)/d},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:G.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=h.scrollbar=new J(a.renderer,y(a.options.scrollbar,{margin:h.navigatorEnabled?0:10,vertical:a.inverted}),a),D(h.scrollbar,"changed",function(b){var c=
        h.size,d=c*this.to,c=c*this.from;h.hasDragged=h.scrollbar.hasDragged;h.render(0,0,c,d);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType&&"touchmove"!==b.DOMType)&&setTimeout(function(){h.onMouseUp(b)})}));h.addBaseSeriesEvents();h.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;a&&null===b.dataMin||(f={dataMin:t(d&&d.min,H("min",e.min,b.dataMin,c.dataMin,c.min)),dataMax:t(d&&d.max,H("max",e.max,b.dataMax,c.dataMax,c.max))});return f},
    setBaseSeries:function(a,b){var c=this.chart,d=this.baseSeries=[];a=a||c.options&&c.options.navigator.baseSeries||0;r(c.series||[],function(b,c){b.options.isInternal||!b.options.showInNavigator&&(c!==a&&b.options.id!==a||!1===b.options.showInNavigator)||d.push(b)});this.xAxis&&!this.xAxis.fake&&this.updateNavigatorSeries(!0,b)},updateNavigatorSeries:function(c,d){var e=this,h=e.chart,l=e.baseSeries,n,m,t=e.navigatorOptions.series,q,p={enableMouseTracking:!1,index:null,linkedTo:null,group:"nav",padXAxis:!1,
        xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0},z=e.series=a.grep(e.series||[],function(b){var c=b.baseSeries;return 0>a.inArray(c,l)?(c&&(v(c,"updatedData",e.updatedDataHandler),delete c.navigatorSeries),b.chart&&b.destroy(),!1):!0});l&&l.length&&r(l,function(a){var c=a.navigatorSeries,k=b({color:a.color,visible:a.visible},f(t)?g.navigator.series:t);c&&!1===e.navigatorOptions.adaptToUpdatedData||(p.name="Navigator "+l.length,n=a.options||{},q=n.navigatorOptions||
        {},m=y(n,p,k,q),k=q.data||k.data,e.hasNavigatorData=e.hasNavigatorData||!!k,m.data=k||n.data&&n.data.slice(0),c&&c.options?c.update(m,d):(a.navigatorSeries=h.initSeries(m),a.navigatorSeries.baseSeries=a,z.push(a.navigatorSeries)))});if(t.data&&(!l||!l.length)||f(t))e.hasNavigatorData=!1,t=a.splat(t),r(t,function(a,b){p.name="Navigator "+(z.length+1);m=y(g.navigator.series,{color:h.series[b]&&!h.series[b].options.isInternal&&h.series[b].color||h.options.colors[b]||h.options.colors[0]},p,a);m.data=
        a.data;m.data&&(e.hasNavigatorData=!0,z.push(h.initSeries(m)))});c&&this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&D(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);r(b,function(b){D(b,"show",function(){this.navigatorSeries&&this.navigatorSeries.setVisible(!0,!1)});D(b,"hide",function(){this.navigatorSeries&&this.navigatorSeries.setVisible(!1,!1)});!1!==this.navigatorOptions.adaptToUpdatedData&&b.xAxis&&D(b,"updatedData",this.updatedDataHandler);
        D(b,"remove",function(){this.navigatorSeries&&(x(a.series,this.navigatorSeries),u(this.navigatorSeries.options)&&this.navigatorSeries.remove(!1),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),d=b.dataMin,e=b.dataMax,b=b.max-b.min,f=a.stickToMin,g=
        a.stickToMax,h=t(this.options.overscroll,0),l,m,n=a.series&&a.series[0],q=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(f&&(m=d,l=m+b),g&&(l=e+h,f||(m=Math.max(l-b,n&&n.xData?n.xData[0]:-Number.MAX_VALUE))),q&&(f||g)&&c(m)&&(this.min=this.userMin=m,this.max=this.userMax=l));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMax=a.xAxis.reversed?0===Math.round(a.zoomedMin):Math.round(a.zoomedMax)>=
        Math.round(a.size);a.stickToMin=c(this.xAxis.min)&&this.xAxis.min<=this.xData[0]&&(!this.chart.fixedRange||!a.stickToMax);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){this.eventsToUnbind||(this.eventsToUnbind=[]);this.eventsToUnbind.push(D(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)}),D(this.chart,
        "getMargins",function(){var a=this.navigator,b=a.opposite?"plotTop":"marginBottom";this.inverted&&(b=a.opposite?"marginRight":"plotLeft");this[b]=(this[b]||0)+(a.navigatorEnabled||!this.inverted?a.outlineHeight:0)+a.navigatorOptions.margin}))},destroy:function(){this.removeEvents();this.xAxis&&(x(this.chart.xAxis,this.xAxis),x(this.chart.axes,this.xAxis));this.yAxis&&(x(this.chart.yAxis,this.yAxis),x(this.chart.axes,this.yAxis));r(this.series||[],function(a){a.destroy&&a.destroy()});r("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),
        function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);r([this.handles],function(a){A(a)},this)}};a.Navigator=C;q(G.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,g=e.chart.pinchType,k=e.navigator,e=e.rangeSelector,h;this.isXAxis&&(k&&k.enabled||e&&e.enabled)&&(!w&&"x"===f||w&&"x"===g?d.resetZoomButton="blocked":"y"===f?h=!1:(!w&&"xy"===f||w&&"xy"===g)&&this.options.range&&(d=this.previousZoom,u(b)?this.previousZoom=[this.min,this.max]:d&&(b=
    d[0],c=d[1],delete this.previousZoom)));return void 0!==h?h:a.call(this,b,c)});D(p,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new C(this)});D(p,"afterSetChartSize",function(){var a=this.legend,b=this.navigator,c,d,e,f;b&&(d=a&&a.options,e=b.xAxis,f=b.yAxis,c=b.scrollbarHeight,this.inverted?(b.left=b.opposite?this.chartWidth-c-b.height:this.spacing[3]+c,b.top=this.plotTop+c):(b.left=this.plotLeft+c,b.top=b.navigatorOptions.top||
    this.chartHeight-b.height-c-this.spacing[2]-(this.rangeSelector&&this.extraBottomMargin?this.rangeSelector.getHeight():0)-(d&&"bottom"===d.verticalAlign&&d.enabled&&!d.floating?a.legendHeight+t(d.margin,10):0)),e&&f&&(this.inverted?e.options.left=f.options.left=b.left:e.options.top=f.options.top=b.top,e.setAxisSize(),f.setAxisSize()))});D(p,"update",function(a){var b=a.options.navigator||{},c=a.options.scrollbar||{};this.navigator||this.scroller||!b.enabled&&!c.enabled||(y(!0,this.options.navigator,
    b),y(!0,this.options.scrollbar,c),delete a.options.navigator,delete a.options.scrollbar)});D(p,"afterUpdate",function(){this.navigator||this.scroller||!this.options.navigator.enabled&&!this.options.scrollbar.enabled||(this.scroller=this.navigator=new C(this))});q(n.prototype,"addPoint",function(a,b,c,d,f){var g=this.options.turboThreshold;g&&this.xData.length>g&&e(b,!0)&&this.chart.navigator&&m(20,!0);a.call(this,b,c,d,f)});D(p,"afterAddSeries",function(){this.navigator&&this.navigator.setBaseSeries(null,
    !1)});D(n,"afterUpdate",function(){this.chart.navigator&&!this.options.isInternal&&this.chart.navigator.setBaseSeries(null,!1)});p.prototype.callbacks.push(function(a){var b=a.navigator;b&&a.xAxis[0]&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(L);(function(a){function C(a){this.init(a)}var D=a.addEvent,G=a.Axis,p=a.Chart,l=a.css,g=a.createElement,u=a.defaultOptions,A=a.defined,r=a.destroyObjectProperties,x=a.discardElement,m=a.each,b=a.extend,d=a.fireEvent,h=a.isNumber,f=a.merge,c=a.pick,
    e=a.pInt,w=a.splat,y=a.wrap;b(u,{rangeSelector:{verticalAlign:"top",buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},floating:!1,x:0,y:0,height:void 0,inputPosition:{align:"right",x:0,y:0},buttonPosition:{align:"left",x:0,y:0},labelStyle:{color:"#666666"}}});u.lang=f(u.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});C.prototype={clickButton:function(a,b){var d=this,e=d.chart,f=d.buttonOptions[a],g=e.xAxis[0],l=e.scroller&&e.scroller.getUnionExtremes()||
        g||{},t=l.dataMin,p=l.dataMax,v,k=g&&Math.round(Math.min(g.max,c(p,g.max))),r=f.type,u,l=f._range,x,y,A,C=f.dataGrouping;if(null!==t&&null!==p){e.fixedRange=l;C&&(this.forcedDataGrouping=!0,G.prototype.setDataGrouping.call(g||{chart:this.chart},C,!1),this.frozenStates=f.preserveDataGrouping);if("month"===r||"year"===r)g?(r={range:f,max:k,chart:e,dataMin:t,dataMax:p},v=g.minFromRange.call(r),h(r.newMax)&&(k=r.newMax)):l=f;else if(l)v=Math.max(k-l,t),k=Math.min(v+l,p);else if("ytd"===r)if(g)void 0===
    p&&(t=Number.MAX_VALUE,p=Number.MIN_VALUE,m(e.series,function(a){a=a.xData;t=Math.min(a[0],t);p=Math.max(a[a.length-1],p)}),b=!1),k=d.getYTDExtremes(p,t,e.time.useUTC),v=x=k.min,k=k.max;else{D(e,"beforeRender",function(){d.clickButton(a)});return}else"all"===r&&g&&(v=t,k=p);v+=f._offsetMin;k+=f._offsetMax;d.setSelected(a);g?g.setExtremes(v,k,c(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:f}):(u=w(e.options.xAxis)[0],A=u.range,u.range=l,y=u.min,u.min=x,D(e,"load",function(){u.range=
        A;u.min=y}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,c=a.options.rangeSelector,e=c.buttons||[].concat(b.defaultButtons),f=c.selected,g=function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&d(a,"blur");c&&c.blur&&d(c,"blur")};b.chart=a;b.options=c;b.buttons=
        [];a.extraTopMargin=c.height;b.buttonOptions=e;this.unMouseDown=D(a.container,"mousedown",g);this.unResize=D(a,"resize",g);m(e,b.computeButtonRange);void 0!==f&&e[f]&&this.clickButton(f,!1);D(a,"load",function(){a.xAxis&&a.xAxis[0]&&D(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&b.forcedDataGrouping&&!b.frozenStates&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this,b=this.chart,c=b.xAxis[0],
        d=Math.round(c.max-c.min),e=!c.hasVisibleSeries,f=b.scroller&&b.scroller.getUnionExtremes()||c,g=f.dataMin,l=f.dataMax,b=a.getYTDExtremes(l,g,b.time.useUTC),p=b.min,r=b.max,k=a.selected,u=h(k),x=a.options.allButtonsEnabled,w=a.buttons;m(a.buttonOptions,function(b,f){var h=b._range,m=b.type,n=b.count||1,t=w[f],q=0;b=b._offsetMax-b._offsetMin;f=f===k;var v=h>l-g,z=h<c.minRange,B=!1,y=!1,h=h===d;("month"===m||"year"===m)&&d+36E5>=864E5*{month:28,year:365}[m]*n-b&&d-36E5<=864E5*{month:31,year:366}[m]*
    n+b?h=!0:"ytd"===m?(h=r-p+b===d,B=!f):"all"===m&&(h=c.max-c.min>=l-g,y=!f&&u&&h);m=!x&&(v||z||y||e);n=f&&h||h&&!u&&!B||f&&a.frozenStates;m?q=3:n&&(u=!0,q=2);t.state!==q&&t.setState(q)})},computeButtonRange:function(a){var b=a.type,d=a.count||1,e={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(e[b])a._range=e[b]*d;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*d;a._offsetMin=c(a.offsetMin,0);a._offsetMax=c(a.offsetMax,0);a._range+=a._offsetMax-a._offsetMin},
    setInputValue:function(a,b){var c=this.chart.options.rangeSelector,d=this.chart.time,e=this[a+"Input"];A(b)&&(e.previousValue=e.HCTime,e.HCTime=b);e.value=d.dateFormat(c.inputEditDateFormat||"%Y-%m-%d",e.HCTime);this[a+"DateBox"].attr({text:d.dateFormat(c.inputDateFormat||"%b %e, %Y",e.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];l(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},
    hideInput:function(a){l(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function c(){var a=z.value,b=(t.inputDateParser||Date.parse)(a),c=m.xAxis[0],f=m.scroller&&m.scroller.xAxis?m.scroller.xAxis:c,g=f.dataMin,f=f.dataMax;b!==z.previousValue&&(z.previousValue=b,h(b)||(b=a.split("-"),b=Date.UTC(e(b[0]),e(b[1])-1,e(b[2]))),h(b)&&(m.time.useUTC||(b+=6E4*(new Date).getTimezoneOffset()),x?b>d.maxInput.HCTime?b=void 0:b<g&&(b=g):b<d.minInput.HCTime?b=void 0:
        b>f&&(b=f),void 0!==b&&c.setExtremes(x?b:c.min,x?c.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var d=this,m=d.chart,p=m.renderer.style||{},q=m.renderer,t=m.options.rangeSelector,r=d.div,x="min"===a,z,k,w=this.inputGroup;this[a+"Label"]=k=q.label(u.lang[x?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(w);w.offset+=k.width+5;this[a+"DateBox"]=q=q.label("",w.offset).addClass("highcharts-range-input").attr({padding:2,width:t.inputBoxWidth||
            90,height:t.inputBoxHeight||17,stroke:t.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){d.showInput(a);d[a+"Input"].focus()}).add(w);w.offset+=q.width+(x?10:0);this[a+"Input"]=z=g("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:m.plotTop+"px"},r);k.css(f(p,t.labelStyle));q.css(f({color:"#333333"},p,t.inputStyle));l(z,b({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:p.fontSize,fontFamily:p.fontFamily,
        top:"-9999em"},t.inputStyle));z.onfocus=function(){d.showInput(a)};z.onblur=function(){d.hideInput(a)};z.onchange=c;z.onkeypress=function(a){13===a.keyCode&&c()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a="top"===b.verticalAlign?a.plotTop-a.axisOffset[0]:0;return{buttonTop:a+b.buttonPosition.y,inputTop:a+b.inputPosition.y-10}},getYTDExtremes:function(a,b,c){var d=this.chart.time,e=new d.Date(a),f=d.get("FullYear",e);c=c?d.Date.UTC(f,0,1):+new d.Date(f,0,1);b=Math.max(b||
        0,c);e=e.getTime();return{max:Math.min(a||e,e),min:b}},render:function(a,b){var d=this,e=d.chart,f=e.renderer,h=e.container,l=e.options,p=l.exporting&&!1!==l.exporting.enabled&&l.navigation&&l.navigation.buttonOptions,t=u.lang,r=d.div,k=l.rangeSelector,l=k.floating,v=d.buttons,r=d.inputGroup,x=k.buttonTheme,w=k.buttonPosition,y=k.inputPosition,A=k.inputEnabled,C=x&&x.states,D=e.plotLeft,G,L=d.buttonGroup,R;R=d.rendered;var Y=d.options.verticalAlign,aa=e.legend,ba=aa&&aa.options,ca=w.y,Z=y.y,da=R||
        !1,T=da?"animate":"attr",X=0,W=0,V;if(!1!==k.enabled){R||(d.group=R=f.g("range-selector-group").attr({zIndex:7}).add(),d.buttonGroup=L=f.g("range-selector-buttons").add(R),d.zoomText=f.text(t.rangeSelectorZoom,0,15).css(k.labelStyle).add(L),m(d.buttonOptions,function(a,b){v[b]=f.button(a.text,0,0,function(){var c=a.events&&a.events.click,e;c&&(e=c.call(a));!1!==e&&d.clickButton(b);d.isActive=!0},x,C&&C.hover,C&&C.select,C&&C.disabled).attr({"text-align":"center"}).add(L)}),!1!==A&&(d.div=r=g("div",
        null,{position:"relative",height:0,zIndex:1}),h.parentNode.insertBefore(r,h),d.inputGroup=r=f.g("input-group").add(R),r.offset=0,d.drawInput("min"),d.drawInput("max")));d.zoomText[T]({x:c(D+w.x,D)});G=c(D+w.x,D)+d.zoomText.getBBox().width+5;m(d.buttonOptions,function(a,b){v[b][T]({x:G});G+=v[b].width+c(k.buttonSpacing,5)});D=e.plotLeft-e.spacing[3];d.updateButtonStates();p&&this.titleCollision(e)&&"top"===Y&&"right"===w.align&&w.y+L.getBBox().height-12<(p.y||0)+p.height&&(X=-40);"left"===w.align?
        V=w.x-e.spacing[3]:"right"===w.align&&(V=w.x+X-e.spacing[1]);L.align({y:w.y,width:L.getBBox().width,align:w.align,x:V},!0,e.spacingBox);d.group.placed=da;d.buttonGroup.placed=da;!1!==A&&(X=p&&this.titleCollision(e)&&"top"===Y&&"right"===y.align&&y.y-r.getBBox().height-12<(p.y||0)+p.height+e.spacing[0]?-40:0,"left"===y.align?V=D:"right"===y.align&&(V=-Math.max(e.axisOffset[1],-X)),r.align({y:y.y,width:r.getBBox().width,align:y.align,x:y.x+V-2},!0,e.spacingBox),h=r.alignAttr.translateX+r.alignOptions.x-
        X+r.getBBox().x+2,p=r.alignOptions.width,t=L.alignAttr.translateX+L.getBBox().x,V=L.getBBox().width+20,(y.align===w.align||t+V>h&&h+p>t&&ca<Z+r.getBBox().height)&&r.attr({translateX:r.alignAttr.translateX+(e.axisOffset[1]>=-X?0:-X),translateY:r.alignAttr.translateY+L.getBBox().height+10}),d.setInputValue("min",a),d.setInputValue("max",b),d.inputGroup.placed=da);d.group.align({verticalAlign:Y},!0,e.spacingBox);a=d.group.getBBox().height+20;b=d.group.alignAttr.translateY;"bottom"===Y&&(aa=ba&&"bottom"===
    ba.verticalAlign&&ba.enabled&&!ba.floating?aa.legendHeight+c(ba.margin,10):0,a=a+aa-20,W=b-a-(l?0:k.y)-10);if("top"===Y)l&&(W=0),e.titleOffset&&(W=e.titleOffset+e.options.title.margin),W+=e.margin[0]-e.spacing[0]||0;else if("middle"===Y)if(Z===ca)W=0>Z?b+void 0:b;else if(Z||ca)W=0>Z||0>ca?W-Math.min(Z,ca):b-a+NaN;d.group.translate(k.x,k.y+Math.floor(W));!1!==A&&(d.minInput.style.marginTop=d.group.translateY+"px",d.maxInput.style.marginTop=d.group.translateY+"px");d.rendered=!0}},getHeight:function(){var a=
        this.options,b=this.group,c=a.y,d=a.buttonPosition.y,a=a.inputPosition.y,b=b?b.getBBox(!0).height+13+c:0,c=Math.min(a,d);if(0>a&&0>d||0<a&&0<d)b+=Math.abs(c);return b},titleCollision:function(a){return!(a.options.title.text||a.options.subtitle.text)},update:function(a){var b=this.chart;f(!0,b.options.rangeSelector,a);this.destroy();this.init(b);b.rangeSelector.render()},destroy:function(){var b=this,c=b.minInput,d=b.maxInput;b.unMouseDown();b.unResize();r(b.buttons);c&&(c.onfocus=c.onblur=c.onchange=
        null);d&&(d.onfocus=d.onblur=d.onchange=null);a.objectEach(b,function(a,c){a&&"chart"!==c&&(a.destroy?a.destroy():a.nodeType&&x(this[c]));a!==C.prototype[c]&&(b[c]=null)},this)}};G.prototype.toFixedRange=function(a,b,d,e){var f=this.chart&&this.chart.fixedRange;a=c(d,this.translate(a,!0,!this.horiz));b=c(e,this.translate(b,!0,!this.horiz));d=f&&(b-a)/f;.7<d&&1.3>d&&(e?a=b-f:b=a+f);h(a)&&h(b)||(a=b=void 0);return{min:a,max:b}};G.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],
    d,e=this.max,f,g,l=function(a,c){var d=new Date(a),e=d["get"+b]();d["set"+b](e+c);e===d["get"+b]()&&d.setDate(0);return d.getTime()-a};h(a)?(d=e-a,g=a):(d=e+l(e,-a.count),this.chart&&(this.chart.fixedRange=e-d));f=c(this.dataMin,Number.MIN_VALUE);h(d)||(d=f);d<=f&&(d=f,void 0===g&&(g=l(d,a.count)),this.newMax=Math.min(d+g,this.dataMax));h(e)||(d=void 0);return d};D(p,"afterGetContainer",function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new C(this))});y(p.prototype,"render",function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            b,c){var d=this.axes,e=this.rangeSelector;e&&(m(d,function(a){a.updateNames();a.setScale()}),this.getAxisMargins(),e.render(),d=e.options.verticalAlign,e.options.floating||("bottom"===d?this.extraBottomMargin=!0:"middle"!==d&&(this.extraTopMargin=!0)));a.call(this,b,c)});D(p,"update",function(a){var b=a.options.rangeSelector;a=this.rangeSelector;var c=this.extraBottomMargin,d=this.extraTopMargin;b&&b.enabled&&!A(a)&&(this.options.rangeSelector.enabled=!0,this.rangeSelector=new C(this));this.extraTopMargin=
    this.extraBottomMargin=!1;a&&(a.render(),b=b&&b.verticalAlign||a.options&&a.options.verticalAlign,a.options.floating||("bottom"===b?this.extraBottomMargin=!0:"middle"!==b&&(this.extraTopMargin=!0)),this.extraBottomMargin!==c||this.extraTopMargin!==d)&&(this.isDirtyBox=!0)});y(p.prototype,"redraw",function(a,b,c){var d=this.rangeSelector;d&&!d.options.floating&&(d.render(),d=d.options.verticalAlign,"bottom"===d?this.extraBottomMargin=!0:"middle"!==d&&(this.extraTopMargin=!0));a.call(this,b,c)});D(p,
    "getMargins",function(){var a=this.rangeSelector;a&&(a=a.getHeight(),this.extraTopMargin&&(this.plotTop+=a),this.extraBottomMargin&&(this.marginBottom+=a))});p.prototype.callbacks.push(function(a){function b(){c=a.xAxis[0].getExtremes();h(c.min)&&d.render(c.min,c.max)}var c,d=a.rangeSelector,e,f;d&&(f=D(a.xAxis[0],"afterSetExtremes",function(a){d.render(a.min,a.max)}),e=D(a,"redraw",b),b());D(a,"destroy",function(){d&&(e(),f())})});a.RangeSelector=C})(L);(function(a){var C=a.addEvent,D=a.arrayMax,
    G=a.arrayMin,p=a.Axis,l=a.Chart,g=a.defined,u=a.each,A=a.extend,r=a.format,x=a.grep,m=a.inArray,b=a.isNumber,d=a.isString,h=a.map,f=a.merge,c=a.pick,e=a.Point,w=a.Renderer,y=a.Series,t=a.splat,v=a.SVGRenderer,J=a.VMLRenderer,n=a.wrap,F=y.prototype,q=F.init,I=F.processData,H=e.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(b,e,g){var k=d(b)||b.nodeName,m=arguments[k?1:0],n=m.series,p=a.getOptions(),q,r=c(m.navigator&&m.navigator.enabled,p.navigator.enabled,!0),u=r?{startOnTick:!1,endOnTick:!1}:
    null,v={marker:{enabled:!1,radius:2}},z={shadow:!1,borderWidth:0};m.xAxis=h(t(m.xAxis||{}),function(a,b){return f({minPadding:0,maxPadding:0,overscroll:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},p.xAxis,p.xAxis&&p.xAxis[b],a,{type:"datetime",categories:null},u)});m.yAxis=h(t(m.yAxis||{}),function(a,b){q=c(a.opposite,!0);return f({labels:{y:-2},opposite:q,showLastLabel:!(!a.categories&&"category"!==a.type),title:{text:null}},p.yAxis,p.yAxis&&p.yAxis[b],a)});m.series=
    null;m=f({chart:{panning:!0,pinchType:"x"},navigator:{enabled:r},scrollbar:{enabled:c(p.scrollbar.enabled,!0)},rangeSelector:{enabled:c(p.rangeSelector.enabled,!0)},title:{text:null},tooltip:{split:c(p.tooltip.split,!0),crosshairs:!0},legend:{enabled:!1},plotOptions:{line:v,spline:v,area:v,areaspline:v,arearange:v,areasplinerange:v,column:z,columnrange:z,candlestick:z,ohlc:z}},m,{isStock:!0});m.series=n;return k?new l(b,m,g):new l(m,e)};n(p.prototype,"autoLabelAlign",function(a){var b=this.chart,
    c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&(d.x=0),void 0===d.align&&(d.align="right"),b[c]=this,"right"):a.apply(this,[].slice.call(arguments,1))});C(p,"destroy",function(){var a=this.chart,b=this.options&&this.options.top+","+this.options.height;b&&a._labelPanes&&a._labelPanes[b]===this&&delete a._labelPanes[b]});n(p.prototype,"getPlotLinePath",function(e,f,k,l,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 n,p){var q=this,r=this.isLinked&&!this.series?this.linkedParent.series:this.series,t=q.chart,v=t.renderer,z=q.left,x=q.top,w,y,A,B,C=[],E=[],D,F;if("xAxis"!==q.coll&&"yAxis"!==q.coll)return e.apply(this,[].slice.call(arguments,1));E=function(a){var c="xAxis"===a?"yAxis":"xAxis";a=q.options[c];return b(a)?[t[c][a]]:d(a)?[t.get(a)]:h(r,function(a){return a[c]})}(q.coll);u(q.isXAxis?t.yAxis:t.xAxis,function(a){if(g(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",
    b=g(a.options[b])?t[b][a.options[b]]:t[b][0];q===b&&E.push(a)}});D=E.length?[]:[q.isXAxis?t.yAxis[0]:t.xAxis[0]];u(E,function(b){-1!==m(b,D)||a.find(D,function(a){return a.pos===b.pos&&a.len===b.len})||D.push(b)});F=c(p,q.translate(f,null,null,l));b(F)&&(q.horiz?u(D,function(a){var b;y=a.pos;B=y+a.len;w=A=Math.round(F+q.transB);if(w<z||w>z+q.width)n?w=A=Math.min(Math.max(z,w),z+q.width):b=!0;b||C.push("M",w,y,"L",A,B)}):u(D,function(a){var b;w=a.pos;A=w+a.len;y=B=Math.round(x+q.height-F);if(y<x||
    y>x+q.height)n?y=B=Math.min(Math.max(x,y),q.top+q.height):b=!0;b||C.push("M",w,y,"L",A,B)}));return 0<C.length?v.crispPolyLine(C,k||1):null});v.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};w===J&&(J.prototype.crispPolyLine=v.prototype.crispPolyLine);n(p.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});
    C(p,"afterDrawCrosshair",function(a){var b,d;if(g(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){var e=this.chart,f=this.options.crosshair.label,h=this.horiz;b=this.opposite;d=this.left;var l=this.top,m=this.crossLabel,n=f.format,p="",q="inside"===this.options.tickPosition,t=!1!==this.crosshair.snap,u=0,v=a.e||this.cross&&this.cross.e,w=a.point;a=this.lin2log;var x,y;this.isLog?(x=a(this.min),y=a(this.max)):(x=this.min,y=this.max);a=h?"center":b?"right"===this.labelAlign?"right":
        "left":"left"===this.labelAlign?"left":"center";m||(m=this.crossLabel=e.renderer.label(null,null,null,f.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:f.align||a,padding:c(f.padding,8),r:c(f.borderRadius,3),zIndex:2}).add(this.labelGroup),m.attr({fill:f.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:f.borderColor||"","stroke-width":f.borderWidth||0}).css(A({color:"#ffffff",fontWeight:"normal",
        fontSize:"11px",textAlign:"center"},f.style)));h?(a=t?w.plotX+d:v.chartX,l+=b?0:this.height):(a=b?this.width+d:0,l=t?w.plotY+l:v.chartY);n||f.formatter||(this.isDatetimeAxis&&(p="%b %d, %Y"),n="{value"+(p?":"+p:"")+"}");p=t?w[this.isXAxis?"x":"y"]:this.toValue(h?v.chartX:v.chartY);m.attr({text:n?r(n,{value:p},e.time):f.formatter.call(this,p),x:a,y:l,visibility:p<x||p>y?"hidden":"visible"});f=m.getBBox();if(h){if(q&&!b||!q&&b)l=m.y-f.height}else l=m.y-f.height/2;h?(b=d-f.x,d=d+this.width-f.x):(b="left"===
    this.labelAlign?d:0,d="right"===this.labelAlign?d+this.width:e.chartWidth);m.translateX<b&&(u=b-m.translateX);m.translateX+f.width>=d&&(u=-(m.translateX+f.width-d));m.attr({x:a+u,y:l,anchorX:h?a:this.opposite?0:e.chartWidth,anchorY:h?this.opposite?e.chartHeight:0:l+f.height/2})}});F.init=function(){q.apply(this,arguments);this.setCompare(this.options.compare)};F.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b=
        "value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=!0)};F.processData=function(){var a,c=-1,d,e,f=!0===this.options.compareStart?0:1,g,h;I.apply(this,arguments);if(this.xAxis&&this.processedYData)for(d=this.processedXData,e=this.processedYData,g=e.length,this.pointArrayMap&&(c=m("close",this.pointArrayMap),-1===c&&(c=m(this.pointValKey||"y",this.pointArrayMap))),a=0;a<g-f;a++)if(h=e[a]&&-1<c?e[a][c]:
        e[a],b(h)&&d[a+f]>=this.xAxis.min&&0!==h){this.compareValue=h;break}};n(F,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=G(b),this.dataMax=D(b))});p.prototype.setCompare=function(a,b){this.isXAxis||(u(this.series,function(b){b.setCompare(a)}),c(b,!0)&&this.chart.redraw())};e.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,
        c(this.series.tooltipOptions.changeDecimals,2)));return H.apply(this,[b])};n(y.prototype,"render",function(a){var b;this.chart.is3d&&this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(b=this.yAxis.len-(this.xAxis.axisLine?Math.floor(this.xAxis.axisLine.strokeWidth()/2):0),!this.clipBox&&this.animate?(this.clipBox=f(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=b):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,
        height:b}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=b));a.call(this)});n(l.prototype,"getSelectedPoints",function(a){var b=a.call(this);u(this.series,function(a){a.hasGroupedData&&(b=b.concat(x(a.points||[],function(a){return a.selected})))});return b});C(l,"update",function(a){a=a.options;"scrollbar"in a&&this.navigator&&(f(!0,this.options.scrollbar,a.scrollbar),this.navigator.update({},!1),delete a.scrollbar)})})(L);return L});