import{b as f,r as l,aU as P,j as t,aw as h,aV as j,as as B,aW as E,U as H,ax as k,aX as I,au as U,ad as b,aY as C}from"./sanity-5c67b729.js";const w=f(B)`
  position: relative;
`;function y(s){const{children:o}=s,{collapsed:n}=E();return t.jsx(w,{hidden:n,height:"fill",overflow:"auto",children:o})}function R(s){const{actionHandlers:o,index:n,menuItems:e,menuItemGroups:r,title:i}=s,{features:a}=H();return!(e!=null&&e.length)&&!i?null:t.jsx(k,{actions:t.jsx(I,{menuItems:e,menuItemGroups:r,actionHandlers:o}),backButton:a.backButton&&n>0&&t.jsx(U,{as:b,"data-as":"a",icon:C,mode:"bleed",tooltipProps:{content:"Back"}}),title:i})}function V(s){const{index:o,pane:n,paneKey:e,...r}=s,{child:i,component:a,menuItems:d,menuItemGroups:u,type:S,...p}=n,[c,x]=l.useState(null),{title:m=""}=P(n);return t.jsxs(h,{id:e,minWidth:320,selected:r.isSelected,children:[t.jsx(R,{actionHandlers:c==null?void 0:c.actionHandlers,index:o,menuItems:d,menuItemGroups:u,title:m}),t.jsxs(y,{children:[j.isValidElementType(a)&&l.createElement(a,{...r,...p,ref:x,child:i,paneKey:e}),l.isValidElement(a)&&a]})]})}export{V as default};