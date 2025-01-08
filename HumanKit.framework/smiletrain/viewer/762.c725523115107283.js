(()=>{var h,dt={559:(h,x,b)=>{"use strict";b.r(x),b.d(x,{add:()=>B,angle:()=>rt,ceil:()=>q,clone:()=>A,copy:()=>v,create:()=>_,cross:()=>H,dist:()=>a,distance:()=>I,div:()=>p,divide:()=>R,dot:()=>W,equals:()=>o,exactEquals:()=>lt,floor:()=>O,forEach:()=>E,fromValues:()=>T,inverse:()=>ot,len:()=>u,length:()=>V,lerp:()=>Q,max:()=>k,min:()=>j,mul:()=>d,multiply:()=>K,negate:()=>J,normalize:()=>$,random:()=>X,rotate:()=>tt,round:()=>D,scale:()=>et,scaleAndAdd:()=>at,set:()=>P,sqrDist:()=>s,sqrLen:()=>c,squaredDistance:()=>N,squaredLength:()=>S,str:()=>ut,sub:()=>i,subtract:()=>G,transformMat2:()=>Z,transformMat2d:()=>st,transformMat3:()=>it,transformMat4:()=>ct,zero:()=>nt});var L=b(9818);function _(){var t=new L.tb(2);return L.tb!=Float32Array&&(t[0]=0,t[1]=0),t}function A(t){var r=new L.tb(2);return r[0]=t[0],r[1]=t[1],r}function T(t,r){var n=new L.tb(2);return n[0]=t,n[1]=r,n}function v(t,r){return t[0]=r[0],t[1]=r[1],t}function P(t,r,n){return t[0]=r,t[1]=n,t}function B(t,r,n){return t[0]=r[0]+n[0],t[1]=r[1]+n[1],t}function G(t,r,n){return t[0]=r[0]-n[0],t[1]=r[1]-n[1],t}function K(t,r,n){return t[0]=r[0]*n[0],t[1]=r[1]*n[1],t}function R(t,r,n){return t[0]=r[0]/n[0],t[1]=r[1]/n[1],t}function q(t,r){return t[0]=Math.ceil(r[0]),t[1]=Math.ceil(r[1]),t}function O(t,r){return t[0]=Math.floor(r[0]),t[1]=Math.floor(r[1]),t}function j(t,r,n){return t[0]=Math.min(r[0],n[0]),t[1]=Math.min(r[1],n[1]),t}function k(t,r,n){return t[0]=Math.max(r[0],n[0]),t[1]=Math.max(r[1],n[1]),t}function D(t,r){return t[0]=Math.round(r[0]),t[1]=Math.round(r[1]),t}function et(t,r,n){return t[0]=r[0]*n,t[1]=r[1]*n,t}function at(t,r,n,e){return t[0]=r[0]+n[0]*e,t[1]=r[1]+n[1]*e,t}function I(t,r){return Math.hypot(r[0]-t[0],r[1]-t[1])}function N(t,r){var n=r[0]-t[0],e=r[1]-t[1];return n*n+e*e}function V(t){return Math.hypot(t[0],t[1])}function S(t){var r=t[0],n=t[1];return r*r+n*n}function J(t,r){return t[0]=-r[0],t[1]=-r[1],t}function ot(t,r){return t[0]=1/r[0],t[1]=1/r[1],t}function $(t,r){var n=r[0],e=r[1],l=n*n+e*e;return l>0&&(l=1/Math.sqrt(l)),t[0]=r[0]*l,t[1]=r[1]*l,t}function W(t,r){return t[0]*r[0]+t[1]*r[1]}function H(t,r,n){var e=r[0]*n[1]-r[1]*n[0];return t[0]=t[1]=0,t[2]=e,t}function Q(t,r,n,e){var l=r[0],f=r[1];return t[0]=l+e*(n[0]-l),t[1]=f+e*(n[1]-f),t}function X(t,r){r=r||1;var n=2*L.Ov()*Math.PI;return t[0]=Math.cos(n)*r,t[1]=Math.sin(n)*r,t}function Z(t,r,n){var e=r[0],l=r[1];return t[0]=n[0]*e+n[2]*l,t[1]=n[1]*e+n[3]*l,t}function st(t,r,n){var e=r[0],l=r[1];return t[0]=n[0]*e+n[2]*l+n[4],t[1]=n[1]*e+n[3]*l+n[5],t}function it(t,r,n){var e=r[0],l=r[1];return t[0]=n[0]*e+n[3]*l+n[6],t[1]=n[1]*e+n[4]*l+n[7],t}function ct(t,r,n){var e=r[0],l=r[1];return t[0]=n[0]*e+n[4]*l+n[12],t[1]=n[1]*e+n[5]*l+n[13],t}function tt(t,r,n,e){var l=r[0]-n[0],f=r[1]-n[1],m=Math.sin(e),y=Math.cos(e);return t[0]=l*y-f*m+n[0],t[1]=l*m+f*y+n[1],t}function rt(t,r){var n=t[0],e=t[1],l=r[0],f=r[1],m=Math.sqrt(n*n+e*e)*Math.sqrt(l*l+f*f);return Math.acos(Math.min(Math.max(m&&(n*l+e*f)/m,-1),1))}function nt(t){return t[0]=0,t[1]=0,t}function ut(t){return"vec2("+t[0]+", "+t[1]+")"}function lt(t,r){return t[0]===r[0]&&t[1]===r[1]}function o(t,r){var n=t[0],e=t[1],l=r[0],f=r[1];return Math.abs(n-l)<=L.p8*Math.max(1,Math.abs(n),Math.abs(l))&&Math.abs(e-f)<=L.p8*Math.max(1,Math.abs(e),Math.abs(f))}var t,u=V,i=G,d=K,p=R,a=I,s=N,c=S,E=(t=_(),function(r,n,e,l,f,m){var y,g;for(n||(n=2),e||(e=0),g=l?Math.min(l*n+e,r.length):r.length,y=e;y<g;y+=n)t[0]=r[y],t[1]=r[y+1],f(t,t,m),r[y]=t[0],r[y+1]=t[1];return r})},9762:(h,x,b)=>{var L=b(1049).default;(()=>{"use strict";function _(o,u=new Set){if(Array.isArray(o))o.forEach(i=>_(i,u));else if(o?.buffer instanceof ArrayBuffer)u.add(o.buffer);else if(o&&"object"==typeof o)for(const i in o)Object.prototype.hasOwnProperty.call(o,i)&&_(o[i],u);return u}const A=b(7928),T=b(5133),v=b(8472),P=b(559);function B(o,u,i,d){let s=u[i],c=u[i+1],E=u[i+2];d&&(s=s*d[0]+d[12],c=c*d[5]+d[13],E=E*d[10]+d[14]),o[0]=s,o[1]=c,o[2]=E}const G=.001;function K(o,u,i,d){let a=u[i],s=u[i+1];d&&(a=a*d[0]+d[6],s=s*d[4]+d[4]),o[0]=a,o[1]=s}const R=(0,v.create)(),q=(0,v.create)(),O=(0,v.create)(),j=(0,P.create)(),k=(0,P.create)(),D=(0,P.create)(),et=[R,q,O],at=[j,k,D];function I(o,u,i,d,p){const a=new Float32Array(o.length),s=i?i.length:o.length/3;for(let c=0;c<s;c+=3){for(let t=0;t<3;t++){const r=i?i[c+t]:c+t;B(et[t],o,3*r,d),K(at[t],u,2*r,p)}(0,v.subtract)(q,q,R),(0,v.subtract)(O,O,R),(0,P.subtract)(k,k,j),(0,P.subtract)(D,D,j);const E=k[0]*D[1]-k[1]*D[0]||G;(0,v.scale)(q,q,D[1]),(0,v.scale)(O,O,k[1]),(0,v.subtract)(R,q,O),(0,v.scale)(R,R,1/E);for(let t=0;t<3;t++){const r=i?3*i[c+t]:3*(c+t);a[r]+=R[0],a[r+1]+=R[1],a[r+2]+=R[2]}}return a}function N(o){const{data:u,numComponents:i,stride:d}=o;return d?u.length*u.BYTES_PER_ELEMENT/d:u.length/i}function V(){return{min:(0,v.fromValues)(1/0,1/0,1/0),max:(0,v.fromValues)(-1/0,-1/0,-1/0)}}const S=(0,v.create)();function J(o,u,i){for(let d=0;d<u.length;d+=3)B(S,u,d,i),S[0]<o.min[0]&&(o.min[0]=S[0]),S[1]<o.min[1]&&(o.min[1]=S[1]),S[2]<o.min[2]&&(o.min[2]=S[2]),S[0]>o.max[0]&&(o.max[0]=S[0]),S[1]>o.max[1]&&(o.max[1]=S[1]),S[2]>o.max[2]&&(o.max[2]=S[2]);return o}const $={1:Uint8Array,2:Uint16Array,4:Uint32Array},W=(0,T.create)(),H=(0,T.create)(),Q=(0,A.create)(),X=(0,A.create)();function Z(o){const u=V(),{data:i,decodeMat:d}=o.attributes.position;return J(u,i,d),u}function it(o,u){let i=Math.max(u[0]/127,-1),d=Math.max(u[1]/127,-1);const p=1-Math.abs(i)-Math.abs(d);p<0&&(i=(1-Math.abs(d))*(i>=0?1:-1),d=(1-Math.abs(i))*(d>=0?1:-1));const a=Math.sqrt(i*i+d*d+p*p);return o[0]=i/a,o[1]=d/a,o[2]=p/a,o}function tt(o,u,i){return JSON.parse(function(d,p,a,s="utf-8"){p=p||0,a=a||d.byteLength;const c=new Uint8Array(d,p,a);return new TextDecoder(s).decode(c)}(o,u,i))}const rt=(0,T.create)(),nt=(0,T.create)();function ut(o){const u=V();return o.forEach(i=>{const{data:d,decodeMat:p}=i.attributes.position;J(u,d,p)}),u}!function(o,u){function i(d,p){const a=_(p);self.postMessage({requestId:d,resource:p},Array.from(a))}self.onmessage=function(){var d=L(function*(p){const{requestId:a,options:s}=p.data;try{let c=(({geometryId:o,morphId:u,buffers:i,options:d})=>{const p=function ct(o,u,i={}){const d=new Uint32Array(u,0,1)[0];if(19===d)throw new Error("Draco geometry compression not supported");const p={primitive:"triangles",attributes:{position:null},boundary:V()};return 17!==d?function st(o,u){const i=new DataView(o),d=i.getUint32(4,!0),p=i.getUint32(8,!0),a=i.getUint32(12,!0),s=i.getUint32(16,!0),c=i.getUint32(20,!0),E=i.getUint32(24,!0),t=i.getUint32(28,!0),r=i.getUint16(32,!0),n=i.getUint8(34),e=i.getUint8(35),l=[];let f,m=null,y=null;for(let g=0,w=36;g<e;g++,w+=6)l[g]=i.getUint32(w,!0);if(f=a+d+p,r>0&&(m=function(g,w){const F=w.subarray(0,3),C=w.subarray(3,6),U=(0,T.create)();return(0,T.fromScaling)(W,C),(0,T.fromTranslation)(H,F),(0,T.multiply)(U,H,W),U}(0,new Float32Array(o,f,r/Float32Array.BYTES_PER_ELEMENT)),f+=r),e>0&&(y=function(g,w,F){const C=[];for(let U=0;U<F;U++){const Y=4*U,ft=w.subarray(Y,Y+2),z=w.subarray(Y+2,Y+4);(0,A.fromScaling)(Q,z),(0,A.fromTranslation)(X,ft),C[U]=(0,A.create)(),(0,A.multiply)(C[U],X,Q)}return C}(0,new Float32Array(o,f,4*e),e)[0],f+=16*e),c>0&&(u.attributes.position={numComponents:3,data:new Uint16Array(o,f,c/Uint16Array.BYTES_PER_ELEMENT)},m&&(u.attributes.position.decodeMat=m),f+=c),e>0)for(let g=0;g<e;g++){const w=l[g];g||(u.attributes.texcoord={numComponents:2,data:new Uint16Array(o,f,w/Uint16Array.BYTES_PER_ELEMENT)},y&&(u.attributes.texcoord.decodeMat=y)),f+=w}if(E>0&&(u.attributes.normal={numComponents:2,data:new Int8Array(o,f,E/Int8Array.BYTES_PER_ELEMENT)},f+=E),t>0){const g=N(u.attributes.position),w=Math.pow(256,$[n].BYTES_PER_ELEMENT),F=$[n];let C=new F(o,s,t/F.BYTES_PER_ELEMENT);if(1===n||n<4&&g>=w){const U=2*n,Y=Array.from(C);C=new $[U](Y)}u.indices=C}u.boundary=Z(u)}(u,p):function(a,s){const c=new Uint32Array(a,0,11),r=c[3],n=c[4],e=c[5],l=c[6],f=11*Uint32Array.BYTES_PER_ELEMENT+c[1]+c[2],m=f+r,y=m+n,g=y+e;let w=0;r>0&&(s.attributes.position={numComponents:3,data:new Float32Array(a,f,r/Float32Array.BYTES_PER_ELEMENT)},w=s.attributes.position.data.length/3),n>0&&(s.attributes.normal={numComponents:3,normalize:!0,data:new Float32Array(a,m,n/Float32Array.BYTES_PER_ELEMENT)}),l>0&&(s.attributes.texcoord={numComponents:2,data:new Float32Array(a,g,l/Float32Array.BYTES_PER_ELEMENT)}),e>0&&(s.indices=new Uint32Array(a,y,e/Uint32Array.BYTES_PER_ELEMENT),w<=256?s.indices=new Uint8Array(s.indices):w<=65536&&(s.indices=new Uint16Array(s.indices))),s.boundary=Z(s)}(u,p),function(a,s){const c=a.attributes.position,E=c.decodeMat;if(s.decompressPositions&&E){const r=new Float32Array(c.data.length);for(let n=0,e=3;n<r.length;n+=3,e+=3)B(r.subarray(n,e),c.data,n,E);a.attributes.position={numComponents:3,data:r}}if(s.decompressNormals&&a.attributes.normal.data instanceof Int8Array){const r=a.attributes.normal,n=new Float32Array(3*r.data.length/2);for(let e=0,l=0;e<r.data.length;e+=2,l+=3){const f=r.data.subarray(e,e+2);it(n.subarray(l,l+3),f)}a.attributes.normal.numComponents=3,a.attributes.normal.data=n}if(s.decompressUVs){const{texcoord:r}=a.attributes;if(r?.decodeMat){const n=new Float32Array([0,0,1]),e=new Float32Array(3),l=r.decodeMat,f=r.data,m=new Float32Array(f.length);for(let y=0,g=1;y<f.length;y+=2,g+=2)n[0]=f[y],n[1]=f[g],(0,v.transformMat3)(e,n,l),m[y]=e[0],m[g]=e[1];a.attributes.texcoord={numComponents:2,data:m}}}const t=a.attributes.texcoord;if(s.computeTangents&&t&&!a.attributes.tangent){const{indices:r}=a,{position:n}=a.attributes;a.attributes.tangent={numComponents:3,data:I(n.data,t.data,r,s.decompressPositions?null:n.decodeMat,s.decompressUVs?null:t.decodeMat)}}}(p,i),function(a,s){const{attributes:c}=s,E=N(c.position);if(!(E>=3))throw new Error(`Geometry error '${a}': geometry must have at least 3 positions.`);if(c.normal&&E!==N(c.normal))throw new Error(`Geometry error '${a}': normals and positions don't match.`);if(c.texcoord&&E!==N(c.texcoord))throw new Error(`Geometry error '${a}': texcoords and positions don't match.`);if(c.color&&E!==N(c.color))throw new Error(`Geometry error '${a}': colors and positions don't match.`);if(c.tangent&&E!==N(c.tangent))throw new Error(`Geometry error '${a}': tangents and positions don't match.`)}(o,p),p}(o,i.geometry,d);if(!u||!i.morph)return p;const a=function lt(o,u,i,d={}){const p=17!==new Uint32Array(u,0,1)[0]?function(a){const s=new DataView(a),c=s.getUint32(4,!0),E=s.getUint32(8,!0),t=s.getUint32(12,!0),r=s.getUint32(20,!0),n=s.getUint32(24,!0),e=s.getUint16(32,!0),l=s.getUint8(34);let f=0,m=0;for(m=0,f=36;m<l;m++,f+=5);f=t+c;const{keys:y}=tt(a,f,E),g=y.length,w=[],F=e/g,C=r/g,U=C/Uint16Array.BYTES_PER_ELEMENT,Y=n/g,ft=Y/Int8Array.BYTES_PER_ELEMENT;f+=E;const z=[];if(e>0)for(m=0;m<g;m++){const pt=new Float32Array(a,f,3),yt=new Float32Array(a,f+12,3);(0,T.fromScaling)(rt,yt),(0,T.fromTranslation)(nt,pt);const ht=(0,T.create)();z[m]=ht,(0,T.multiply)(ht,nt,rt),f+=F}for(m=0;m<g;m++)w[m]={time:y[m],attributes:{position:{numComponents:3,data:new Uint16Array(a,f+m*C,U)}}},z.length>m&&(w[m].attributes.position.decodeMat=z[m]);if(f+=r,n>0)for(m=0;m<g;m++)w[m].attributes.normal={numComponents:2,normalize:!0,data:new Int8Array(a,f+m*Y,ft)};return w}(u):function(a){const s=new Uint32Array(a,0,11),E=s[2],t=s[3],r=s[4],n=11*Uint32Array.BYTES_PER_ELEMENT+s[1],e=n+E,l=e+t,f=tt(a,n,E),m=f.length,y=[],g=t/m,w=g/Float32Array.BYTES_PER_ELEMENT,F=r/m,C=F/Float32Array.BYTES_PER_ELEMENT;for(let U=0;U<m;U++)y[U]={time:f[U],attributes:{position:{numComponents:3,data:new Float32Array(a,e+U*g,w)}}},r>0&&(y[U].attributes.normal={numComponents:3,data:new Float32Array(a,l+U*F,C)});return y}(u);return function(a,s,c){const E=s.attributes.texcoord;if(c.computeTangents&&E){const{indices:t}=s,r=E.decodeMat;a.forEach(n=>{const{position:e}=n.attributes;n.attributes.tangent={numComponents:3,data:I(e.data,E.data,t,c.decompressPositions?null:e.decodeMat,c.decompressUVs?null:r)}})}}(p,i,d),function(a,s){if(s.length<2)throw new Error(`Morph error '${a}': morph must have at least two keys.`);const c=s[0],E=N(c.attributes.position);if(!(E>=3))throw new Error(`Morph error '${a}': morph must have at least 3 positions.`);if(c.attributes.normal&&E!==N(c.attributes.normal))throw new Error(`Morph error '${a}': normals and positions don't match.`)}(o,p),{morphKeys:p,boundary:ut(p)}}(u,i.morph,p,d);return Object.assign(p,a)})(s);c instanceof Promise&&(c=yield c),i(a,c)}catch(c){!function(E,t){const{message:r,stack:n}=t;self.postMessage({requestId:E,error:{message:r,stack:n}})}(a,c)}});return function(p){return d.apply(this,arguments)}}()}()})()}},mt={};function M(h){var x=mt[h];if(void 0!==x)return x.exports;var b=mt[h]={exports:{}};return dt[h](b,b.exports,M),b.exports}M.m=dt,M.x=()=>{var h=M.O(void 0,[449,76],()=>M(9762));return M.O(h)},h=[],M.O=(x,b,L,_)=>{if(!b){var T=1/0;for(A=0;A<h.length;A++){for(var[b,L,_]=h[A],v=!0,P=0;P<b.length;P++)(!1&_||T>=_)&&Object.keys(M.O).every(O=>M.O[O](b[P]))?b.splice(P--,1):(v=!1,_<T&&(T=_));if(v){h.splice(A--,1);var B=L();void 0!==B&&(x=B)}}return x}_=_||0;for(var A=h.length;A>0&&h[A-1][2]>_;A--)h[A]=h[A-1];h[A]=[b,L,_]},M.d=(h,x)=>{for(var b in x)M.o(x,b)&&!M.o(h,b)&&Object.defineProperty(h,b,{enumerable:!0,get:x[b]})},M.f={},M.e=h=>Promise.all(Object.keys(M.f).reduce((x,b)=>(M.f[b](h,x),x),[])),M.u=h=>(76===h?"common":h)+"."+{76:"b402aef13e5ca2ba",449:"4190a880663f77fb"}[h]+".js",M.miniCssF=h=>{},M.o=(h,x)=>Object.prototype.hasOwnProperty.call(h,x),M.r=h=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(h,"__esModule",{value:!0})},(()=>{var h;M.tt=()=>(void 0===h&&(h={createScriptURL:x=>x},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(h=trustedTypes.createPolicy("angular#bundler",h))),h)})(),M.tu=h=>M.tt().createScriptURL(h),M.p="",(()=>{var h={762:1};M.f.i=(_,A)=>{h[_]||importScripts(M.tu(M.p+M.u(_)))};var b=self.webpackChunkhuman_studio_next=self.webpackChunkhuman_studio_next||[],L=b.push.bind(b);b.push=_=>{var[A,T,v]=_;for(var P in T)M.o(T,P)&&(M.m[P]=T[P]);for(v&&v(M);A.length;)h[A.pop()]=1;L(_)}})(),(()=>{var h=M.x;M.x=()=>Promise.all([M.e(449),M.e(76)]).then(h)})(),M.x()})();