(this["webpackJsonpsmall-demo"]=this["webpackJsonpsmall-demo"]||[]).push([[0],{1:function(e,o,t){e.exports={container:"VoiceControl_container__1O57l",top:"VoiceControl_top__2YrSR",handler:"VoiceControl_handler__TEZT_",anchor:"VoiceControl_anchor__2FQnK",head:"VoiceControl_head__-thKl",axis:"VoiceControl_axis__3Rojz",voiceContainer:"VoiceControl_voiceContainer__2UMIo",voiceDisplay:"VoiceControl_voiceDisplay__14lGb",voiceNumber:"VoiceControl_voiceNumber__2jJ0y",voiceFill:"VoiceControl_voiceFill__CU_vX",voiceLogo:"VoiceControl_voiceLogo__18jv4",bottom:"VoiceControl_bottom__RF4y-"}},10:function(e,o,t){},12:function(e,o,t){"use strict";t.r(o);var c=t(2),n=t.n(c),i=t(4),a=t.n(i),s=(t(10),t(5)),r=t(1),l=t.n(r),u=t.p+"static/media/voice.9d1147f6.svg",d=t(0),v=!1,j=0,m=0,_=0,b=function(e){var o=e.size,t=void 0===o?10:o,n=Object(c.useRef)(null),i=Object(c.useState)(0),a=Object(s.a)(i,2),r=a[0],b=a[1];Object(c.useEffect)((function(){return document.onmousemove=h,document.onmouseup=function(){return v=!1},function(){document.onmousemove=null,document.onmouseup=null}}),[]);var h=function(e){if(v&&n.current){var o=[n.current.offsetLeft,n.current.offsetTop+n.current.offsetHeight],t=o[0],c=o[1],i=e.clientX-t,a=c-e.clientY,s=0;a>0?(s=Math.atan(i/a)/(Math.PI/180),i<0&&(s+=360)):0===a?i>0?s=90:i<0&&(s=270):a<0&&(s=Math.atan(i/a)/(Math.PI/180)+180),a>0&&(e.clientX>_&&s<m&&s<10&&j<100?j++:e.clientX<_&&s>m&&360-s<10&&j>0&&j--),b(s),m=s,_=e.clientX}};return Object(d.jsxs)("div",{className:l.a.container,children:[Object(d.jsxs)("div",{className:l.a.top,children:[Object(d.jsxs)("div",{ref:n,className:l.a.handler,style:{transform:"rotate(".concat(r,"deg)")},onMouseDown:function(){return v=!0},children:[Object(d.jsx)("div",{className:l.a.head}),Object(d.jsx)("div",{className:l.a.axis}),Object(d.jsx)("div",{className:l.a.anchor})]}),Object(d.jsxs)("div",{className:l.a.voiceContainer,children:[Object(d.jsxs)("div",{className:l.a.voiceDisplay,children:[Object(d.jsxs)("div",{className:l.a.voiceNumber,children:[" ",j]}),Object(d.jsx)("div",{className:l.a.voiceFill,style:{borderBottomWidth:"".concat(.14*t*j,"px")}})]}),Object(d.jsx)("img",{src:u,alt:"voice",className:l.a.voiceLogo})]})]}),Object(d.jsx)("div",{className:l.a.bottom})]})};var h=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(b,{})})},f=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,13)).then((function(o){var t=o.getCLS,c=o.getFID,n=o.getFCP,i=o.getLCP,a=o.getTTFB;t(e),c(e),n(e),i(e),a(e)}))};a.a.render(Object(d.jsx)(n.a.StrictMode,{children:Object(d.jsx)(h,{})}),document.getElementById("root")),f()}},[[12,1,2]]]);
//# sourceMappingURL=main.7be1dfdd.chunk.js.map