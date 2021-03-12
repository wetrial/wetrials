(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{BAzq:function(e,t,n){"use strict";n.r(t);var l=n("q1tI"),a=n.n(l),r=n("dEAq"),c=n("TN5+"),o=n("0zqC"),m=n("ZpkN"),u=a.a.memo(n("JjdP").default["request-basic"].component);t["default"]=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"request---\u8bf7\u6c42\u5e93"},a.a.createElement(r["AnchorLink"],{to:"#request---\u8bf7\u6c42\u5e93","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"request - \u8bf7\u6c42\u5e93"),a.a.createElement("p",null,"\u63d0\u4f9b ajax \u8bf7\u6c42\u7684\u5c01\u88c5,\u5305\u62ec\u8bf7\u6c42\u62e6\u622a\u3001\u54cd\u5e94\u62e6\u622a\u3001\u5f02\u5e38\u5904\u7406\u7b49(\u4e0d\u5efa\u8bae\u76f4\u63a5\u4f7f\u7528)"),a.a.createElement("blockquote",null,a.a.createElement("p",null,"\u901a\u5e38\u4f1a\u5728\u9879\u76ee\u4e2d\u63d0\u53d6\u4e00\u5c42\uff0c\u5982:src/utils/request.ts")),a.a.createElement(m["a"],{code:"import {\n  addRequestInterceptor,\n  addResponseInterceptor,\n  commonRequestInterceptor,\n  commonResponseInterceptor,\n} from '@wetrial/core';\n\n// \u6dfb\u52a0\u8bf7\u6c42\u62e6\u622a\u5668(\u81ea\u52a8\u5e26\u4e0aAuthority\u8bf7\u6c42\u5934)\naddRequestInterceptor(...commonRequestInterceptor);\n// \u6dfb\u52a0\u54cd\u5e94\u62e6\u622a\u5668(\u5904\u7406tip\u3001\u5168\u5c40\u9519\u8bef\u7b49)\naddResponseInterceptor(...commonResponseInterceptor);\n\nexport { request, get, post, put, patch } from '@wetrial/core';\n",lang:"ts"}),a.a.createElement("h2",{id:"\u4f7f\u7528\u65b9\u5f0f"},a.a.createElement(r["AnchorLink"],{to:"#\u4f7f\u7528\u65b9\u5f0f","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"\u4f7f\u7528\u65b9\u5f0f"),a.a.createElement(m["a"],{code:"import { get, post, request } from '@/utils/request';\n\nconst result = await get('');\n",lang:"tsx"}),a.a.createElement("h3",{id:"\u57fa\u7840\u4f7f\u7528"},a.a.createElement(r["AnchorLink"],{to:"#\u57fa\u7840\u4f7f\u7528","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"\u57fa\u7840\u4f7f\u7528")),a.a.createElement(o["default"],n("JjdP").default["request-basic"].previewerProps,a.a.createElement(u,null)),a.a.createElement("div",{className:"markdown"},a.a.createElement("h2",{id:"methods"},a.a.createElement(r["AnchorLink"],{to:"#methods","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"Methods"),a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u540d\u79f0"),a.a.createElement("th",null,"\u63cf\u8ff0"),a.a.createElement("th",null,"\u7c7b\u578b"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"get"),a.a.createElement("td",null,"\u53d1\u9001 get \u8bf7\u6c42\uff0c\u8fd4\u56de Promise \u7c7b\u578b\u7684\u6cdb\u578b T\uff0c",a.a.createElement(r["AnchorLink"],{to:"#irequestoption"},"IRequestOption")),a.a.createElement("td",null,a.a.createElement("code",null,"(opt:IRequestOption | string):Promise<T>"))),a.a.createElement("tr",null,a.a.createElement("td",null,"post"),a.a.createElement("td",null,"\u53d1\u9001 post \u8bf7\u6c42\uff0c\u8fd4\u56de Promise \u7c7b\u578b\u7684\u6cdb\u578b T\uff0c",a.a.createElement(r["AnchorLink"],{to:"#irequestoption"},"IRequestOption")),a.a.createElement("td",null,a.a.createElement("code",null,"(opt:IRequestOption):Promise<T>"))),a.a.createElement("tr",null,a.a.createElement("td",null,"put"),a.a.createElement("td",null,"\u53d1\u9001 put \u8bf7\u6c42\uff0c\u8fd4\u56de Promise \u7c7b\u578b\u7684\u6cdb\u578b T\uff0c",a.a.createElement(r["AnchorLink"],{to:"#irequestoption"},"IRequestOption")),a.a.createElement("td",null,a.a.createElement("code",null,"(opt:IRequestOption):Promise<T>"))),a.a.createElement("tr",null,a.a.createElement("td",null,"del"),a.a.createElement("td",null,"\u53d1\u9001 delete \u8bf7\u6c42\uff0c\u8fd4\u56de Promise \u7c7b\u578b\u7684\u6cdb\u578b T\uff0c",a.a.createElement(r["AnchorLink"],{to:"#irequestoption"},"IRequestOption")),a.a.createElement("td",null,a.a.createElement("code",null,"(opt:IRequestOption):Promise<T>"))),a.a.createElement("tr",null,a.a.createElement("td",null,"patch"),a.a.createElement("td",null,"\u53d1\u9001 patch \u8bf7\u6c42\uff0c\u8fd4\u56de Promise \u7c7b\u578b\u7684\u6cdb\u578b T\uff0c",a.a.createElement(r["AnchorLink"],{to:"#irequestoption"},"IRequestOption")),a.a.createElement("td",null,a.a.createElement("code",null,"(opt:IRequestOption):Promise<T>"))),a.a.createElement("tr",null,a.a.createElement("td",null,"request"),a.a.createElement("td",null,"\u5404\u7c7b\u8bf7\u6c42\u7684\u57fa\u7c7b\uff0cget\u3001post\u3001put\u3001del\u3001patch \u90fd\u662f\u5728\u8be5\u65b9\u6cd5\u7684\u57fa\u7840\u4e0a\u8fdb\u884c\u6269\u5c55\u7684(\u6bd4\u5982\u8bbe\u7f6e method)"),a.a.createElement("td",null,a.a.createElement("code",null,"(opt:IRequestOption):Promise<T>"))),a.a.createElement("tr",null,a.a.createElement("td",null,"instance"),a.a.createElement("td",null,"axios \u7684\u5b9e\u4f8b"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"commonRequestInterceptor"),a.a.createElement("td",null,"\u9884\u5b9a\u4e49\u7684\u901a\u7528\u8bf7\u6c42\u62e6\u622a\u5668\uff0c\u4f1a\u5c06 getToken \u83b7\u53d6\u5230\u7684\u503c\u8bbe\u7f6e\u5230\u8bf7\u6c42\u5934\u7684 Authorization"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"commonResponseInterceptor"),a.a.createElement("td",null,"\u9884\u5b9a\u4e49\u7684\u901a\u7528\u54cd\u5e94\u62e6\u622a\u5668\uff0c\u62e6\u622a\u5f02\u5e38\u4fe1\u606f(\u975e 200-302 \u4e4b\u95f4\u7684\u72b6\u6001\u7801)\u3001\u5904\u7406",a.a.createElement("code",null,"showTip"),"\u3001\u672a\u6388\u6743\u8bf7\u6c42\u3001\u6570\u636e\u8f6c\u6362\u672a\u6388\u6743\u7b49"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"commonResponseWithRefreshTokenInterceptor"),a.a.createElement("td",null,"\u9884\u5b9a\u4e49\u7684\u901a\u7528\u54cd\u5e94\u62e6\u622a\u5668,\u5728 commonResponseInterceptor \u7684\u57fa\u7840\u4e0a\u589e\u52a0\u4e86 token \u5931\u6548\u7684\u5904\u7406,\u5f53\u670d\u52a1\u5668\u7aef\u8fd4\u56de 401 \u800c\u672c\u5730\u5b58\u5728 token \u7684\u60c5\u51b5\u7b97\u4f5c token \u8fc7\u671f\uff0c\u4f1a\u62e6\u622a\u8fdb\u884c\u5237\u65b0 token \u7684\u64cd\u4f5c"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"addRequestInterceptor"),a.a.createElement("td",null,"\u6dfb\u52a0\u8bf7\u6c42\u62e6\u622a\u5668"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"ejectRequestInterceptor"),a.a.createElement("td",null,"\u5220\u9664\u8bf7\u6c42\u62e6\u622a\u5668"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"addResponseInterceptor"),a.a.createElement("td",null,"\u6dfb\u52a0\u54cd\u5e94\u62e6\u622a\u5668"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"ejectResponseInterceptor"),a.a.createElement("td",null,"\u5220\u9664\u54cd\u5e94\u62e6\u622a\u5668"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"configGlobalHeader"),a.a.createElement("td",null,"\u7528\u4e8e\u914d\u7f6e\u5168\u5c40\u6dfb\u52a0\u7684\u8bf7\u6c42\u5934,\u4e00\u6b21\u914d\u7f6e\u6240\u6709\u8bf7\u6c42\u751f\u6548"),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"configRefreshToken"),a.a.createElement("td",null,"\u7528\u4e8e\u914d\u7f6e\u5168\u5c40\u5237\u65b0\u5931\u6548 token \u7684\u65b9\u6cd5,\u4e00\u6b21\u914d\u7f6e\u6240\u6709\u8bf7\u6c42\u751f\u6548(\u9700\u8981\u5148\u914d\u5408 commonResponseWithRefreshTokenInterceptor \u62e6\u622a\u5668\u4f7f\u7528)"),a.a.createElement("td",null)))),a.a.createElement(c["a"],{type:"warning"},"\u9ed8\u8ba4\u4e0d\u4f1a\u6dfb\u52a0\u4efb\u4f55\u62e6\u622a\u5668\uff0c\u5982\u6709\u9700\u8981\uff1b\u8bf7\u5728\u81ea\u5b9a\u4e49\u7684ajax\u4e2d\u6dfb\u52a0\uff0c\u53ef\u4ee5\u53c2\u8003",a.a.createElement(r["Link"],{to:"https://github.com/wetrial/wetrial-template/blob/master/src/utils/request.ts",target:"_blank"},"[wetrial-template\u4e2d\u7684\u5b9e\u73b0]")),a.a.createElement("h3",{id:"irequestoption"},a.a.createElement(r["AnchorLink"],{to:"#irequestoption","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"IRequestOption"),a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u53c2\u6570"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"successTip"),a.a.createElement("td",null,"\u662f\u5426\u663e\u793a\u64cd\u4f5c\u6210\u529f\u7684\u63d0\u793a"),a.a.createElement("td",null,"boolean?"),a.a.createElement("td",null,"get \u8bf7\u6c42 false,\u5176\u4ed6 true")),a.a.createElement("tr",null,a.a.createElement("td",null,"url"),a.a.createElement("td",null,"\u8bf7\u6c42\u7684 url \u5730\u5740"),a.a.createElement("td",null,"string"),a.a.createElement("td",null,"-")),a.a.createElement("tr",null,a.a.createElement("td",null,"method"),a.a.createElement("td",null,"\u8bf7\u6c42\u7684 method,\u53ef\u4ee5\u901a\u8fc7\u6269\u5c55\u65b9\u6cd5\u6bd4\u5982\uff0cpost \u4e0d\u9700\u8981\u63d0\u4f9b\u8be5\u53c2\u6570"),a.a.createElement("td",null,"string? 'post'\u3001'get'\u3001'put','delete','patch'"),a.a.createElement("td",null,"-")),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement(r["Link"],{to:"https://github.com/axios/axios#request-config"},"\u66f4\u591a\u914d\u7f6e")),a.a.createElement("td",null),a.a.createElement("td",null),a.a.createElement("td",null,"-")))),a.a.createElement("h4",{id:"commonrequestinterceptor"},a.a.createElement(r["AnchorLink"],{to:"#commonrequestinterceptor","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"commonRequestInterceptor"),a.a.createElement("ul",null,a.a.createElement("li",null,"\u4f1a\u5c06 configGlobalHeader \u4e2d\u53cd\u56de\u7684\u503c\u8bbe\u7f6e\u5230 headers \u4e2d\u53bb"),a.a.createElement("li",null,"\u4f1a\u81ea\u52a8\u6dfb\u52a0 Authorization \u8bf7\u6c42\u5934,\u4f1a\u8c03\u7528 authority \u4e2d\u7684 getToken \u65b9\u6cd5\u83b7\u53d6 token \u503c"),a.a.createElement("li",null,"\u6839\u636e\u914d\u7f6e\u662f\u5426\u52a0\u5bc6\u6765\u5bf9\u8bf7\u6c42\u5185\u5bb9\u8fdb\u884c\u52a0\u5bc6\u4ee5\u53ca\u89e3\u5bc6\u7684\u5bc6\u94a5\u4ee5\u8bf7\u6c42\u5934\u7684\u5f62\u5f0f\u4f20\u9012\u7ed9\u540e\u7aef")),a.a.createElement("h4",{id:"commonresponseinterceptor"},a.a.createElement(r["AnchorLink"],{to:"#commonresponseinterceptor","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"commonResponseInterceptor"),a.a.createElement("ul",null,a.a.createElement("li",null,"\u6839\u636e\u914d\u7f6e\u53c2\u6570 successTip \u5f39\u6210\u529f\u63d0\u793a"),a.a.createElement("li",null,"\u6839\u636e\u914d\u7f6e\u7684\u52a0\u5bc6\u6765\u89e3\u5bc6\u54cd\u5e94\u5185\u5bb9"),a.a.createElement("li",null,"\u5904\u7406\u975e 200-302 \u7684\u8bf7\u6c42\u8fdb\u5165\u5f02\u5e38\u5904\u7406")),a.a.createElement("h4",{id:"commonresponsewithrefreshtokeninterceptor"},a.a.createElement(r["AnchorLink"],{to:"#commonresponsewithrefreshtokeninterceptor","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:["icon","icon-link"]})),"commonResponseWithRefreshTokenInterceptor"),a.a.createElement("p",null,"\u5728 commonResponseInterceptor \u7684\u57fa\u7840\u4e0a\u589e\u52a0\u4e86 token \u5931\u6548\u7684\u5904\u7406,\u5f53\u670d\u52a1\u5668\u7aef\u8fd4\u56de 401 \u800c\u672c\u5730\u5b58\u5728 token \u7684\u60c5\u51b5\u7b97\u4f5c token \u8fc7\u671f\uff0c\u4f1a\u62e6\u622a\u8fdb\u884c\u5237\u65b0 token \u7684\u64cd\u4f5c"),a.a.createElement(c["a"],{type:"warning"},"\u524d\u7f6e\u6761\u4ef6: \u9700\u8981\u914d\u7f6e\u4e86configRefreshToken"),a.a.createElement("ul",null,a.a.createElement("li",null,"\u5f53\u54cd\u5e94\u72b6\u6001\u7801\u4e3a 401\uff0c\u800c\u4e14\u672c\u5730\u6709 token"),a.a.createElement("li",null,"\u4f1a\u5904\u7406\u591a\u4e2a token \u8fc7\u671f\u7684\u65f6\u5019\u540c\u65f6\u7684\u591a\u4e2a\u8bf7\u6c42\u7684\u95ee\u9898(token \u5237\u65b0\u6210\u529f\u540e\uff0c\u4f1a\u7528\u65b0 token \u91cd\u8bd5\u5931\u8d25\u7684\u8bf7\u6c42)")))))}},"TN5+":function(e,t,n){"use strict";var l=n("wx14"),a=n("q1tI"),r=n.n(a);n("kERV");t["a"]=e=>r.a.createElement("div",Object(l["a"])({className:"__dumi-default-alert"},e))},kERV:function(e,t,n){}}]);