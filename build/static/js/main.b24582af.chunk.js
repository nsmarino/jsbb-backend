(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(13),c=n.n(o),i=n(14),u=n(2),l=function(t){var e=t.note,n=t.toggleImportance,r=e.important?"make not important":"make important";return a.a.createElement("li",{className:"note"},e.content,a.a.createElement("button",{onClick:n},r))},m=n(3),s=n.n(m),f=function(){return s.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return s.a.post("/api/notes",t).then((function(t){return t.data}))},b=function(t,e){return s.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))};function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var O=function(t){var e=t.message;return null===e?null:a.a.createElement("div",{className:"error"},e)},v=function(){var t=Object(r.useState)([]),e=Object(u.a)(t,2),n=e[0],o=e[1],c=Object(r.useState)(""),m=Object(u.a)(c,2),s=m[0],v=m[1],j=Object(r.useState)(!0),h=Object(u.a)(j,2),E=h[0],g=h[1],y=Object(r.useState)(null),w=Object(u.a)(y,2),P=w[0],S=w[1];Object(r.useEffect)((function(){f().then((function(t){o(t)}))}),[]);var T=E?n:n.filter((function(t){return t.important})),k=function(t){var e=n.find((function(e){return e.id===t})),r=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){Object(i.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e,{important:!e.important});b(t,r).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(r){S("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){S(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))};return a.a.createElement("div",null,a.a.createElement("h1",null,"Notes"),a.a.createElement(O,{message:P}),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return g(!E)}},"show ",E?"important":"all")),a.a.createElement("ul",null,T.map((function(t){return a.a.createElement(l,{key:t.id,note:t,toggleImportance:function(){return k(t.id)}})}))),a.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString(),important:Math.random()>.5};p(e).then((function(t){o(n.concat(t)),v("")}))}},a.a.createElement("input",{value:s,onChange:function(t){v(t.target.value)}}),a.a.createElement("button",{type:"submit"},"save")))};n(37);c.a.render(a.a.createElement(v,{notes:[{id:1,content:"HTML is easy",date:"2019-05-30T17:30:31.098Z",important:!0},{id:2,content:"Browser can execute only Javascript",date:"2019-05-30T18:39:34.091Z",important:!1},{id:3,content:"GET and POST are the most important methods of HTTP protocol",date:"2019-05-30T19:20:14.298Z",important:!0}]}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b24582af.chunk.js.map