import{_ as u,a as m,u as g,b as v,o as c,c as o,F as C,f,i as k,y as b,d as y,e as s,t as n,D as V,B as w}from"./index-e2d856b9.js";const x={class:"collect"},B=["onClick"],D={class:"collect-item-right"},F={class:"collect-item-right-title"},N={class:"collect-item-right-bottom"},$={class:"collect-item-right-price"},q=["onClick"],E={__name:"CollectView",setup(I){let l=m({data:[]});const a=()=>{b().then(e=>{l.data=e})};a();const _=e=>{V(e).then(i=>{i.status==200&&(w("取消收藏成功"),a())})};let r=g();const d=e=>{r.push({path:"/detail",query:{ids:e}})};return(e,i)=>{const p=v("van-image");return c(),o("div",x,[(c(!0),o(C,null,f(k(l).data,t=>(c(),o("div",{class:"collect-item",onClick:h=>d(t.pid),key:t.id},[y(p,{class:"collect-item-img",src:t.image},null,8,["src"]),s("div",D,[s("div",F,n(t.store_name),1),s("div",N,[s("span",$,"￥"+n(t.price),1),s("span",{class:"collect-item-right-del",onClick:h=>_(t.pid)},"删除",8,q)])])],8,B))),128))])}}},R=u(E,[["__scopeId","data-v-7bff4cab"]]);export{R as default};
