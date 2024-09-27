(()=>{var u,or={5710:(u,b,E)=>{"use strict";E.r(b),E.d(b,{add:()=>k,angle:()=>w,ceil:()=>Z,clone:()=>x,copy:()=>P,create:()=>U,cross:()=>i,dist:()=>q,distance:()=>I,div:()=>S,divide:()=>$,dot:()=>t,equals:()=>L,exactEquals:()=>T,floor:()=>G,forEach:()=>tr,fromValues:()=>F,inverse:()=>er,len:()=>p,length:()=>Q,lerp:()=>o,max:()=>rr,min:()=>z,mul:()=>d,multiply:()=>W,negate:()=>nr,normalize:()=>s,random:()=>y,rotate:()=>v,round:()=>H,scale:()=>K,scaleAndAdd:()=>J,set:()=>D,sqrDist:()=>R,sqrLen:()=>N,squaredDistance:()=>j,squaredLength:()=>X,str:()=>A,sub:()=>_,subtract:()=>V,transformMat2:()=>a,transformMat2d:()=>m,transformMat3:()=>l,transformMat4:()=>c,zero:()=>g});var C=E(6009);function U(){var r=new C.WT(2);return C.WT!=Float32Array&&(r[0]=0,r[1]=0),r}function x(r){var n=new C.WT(2);return n[0]=r[0],n[1]=r[1],n}function F(r,n){var e=new C.WT(2);return e[0]=r,e[1]=n,e}function P(r,n){return r[0]=n[0],r[1]=n[1],r}function D(r,n,e){return r[0]=n,r[1]=e,r}function k(r,n,e){return r[0]=n[0]+e[0],r[1]=n[1]+e[1],r}function V(r,n,e){return r[0]=n[0]-e[0],r[1]=n[1]-e[1],r}function W(r,n,e){return r[0]=n[0]*e[0],r[1]=n[1]*e[1],r}function $(r,n,e){return r[0]=n[0]/e[0],r[1]=n[1]/e[1],r}function Z(r,n){return r[0]=Math.ceil(n[0]),r[1]=Math.ceil(n[1]),r}function G(r,n){return r[0]=Math.floor(n[0]),r[1]=Math.floor(n[1]),r}function z(r,n,e){return r[0]=Math.min(n[0],e[0]),r[1]=Math.min(n[1],e[1]),r}function rr(r,n,e){return r[0]=Math.max(n[0],e[0]),r[1]=Math.max(n[1],e[1]),r}function H(r,n){return r[0]=Math.round(n[0]),r[1]=Math.round(n[1]),r}function K(r,n,e){return r[0]=n[0]*e,r[1]=n[1]*e,r}function J(r,n,e,f){return r[0]=n[0]+e[0]*f,r[1]=n[1]+e[1]*f,r}function I(r,n){return Math.hypot(n[0]-r[0],n[1]-r[1])}function j(r,n){var e=n[0]-r[0],f=n[1]-r[1];return e*e+f*f}function Q(r){return Math.hypot(r[0],r[1])}function X(r){var n=r[0],e=r[1];return n*n+e*e}function nr(r,n){return r[0]=-n[0],r[1]=-n[1],r}function er(r,n){return r[0]=1/n[0],r[1]=1/n[1],r}function s(r,n){var e=n[0],f=n[1],M=e*e+f*f;return M>0&&(M=1/Math.sqrt(M)),r[0]=n[0]*M,r[1]=n[1]*M,r}function t(r,n){return r[0]*n[0]+r[1]*n[1]}function i(r,n,e){var f=n[0]*e[1]-n[1]*e[0];return r[0]=r[1]=0,r[2]=f,r}function o(r,n,e,f){var M=n[0],O=n[1];return r[0]=M+f*(e[0]-M),r[1]=O+f*(e[1]-O),r}function y(r,n){n=n||1;var e=2*C.FD()*Math.PI;return r[0]=Math.cos(e)*n,r[1]=Math.sin(e)*n,r}function a(r,n,e){var f=n[0],M=n[1];return r[0]=e[0]*f+e[2]*M,r[1]=e[1]*f+e[3]*M,r}function m(r,n,e){var f=n[0],M=n[1];return r[0]=e[0]*f+e[2]*M+e[4],r[1]=e[1]*f+e[3]*M+e[5],r}function l(r,n,e){var f=n[0],M=n[1];return r[0]=e[0]*f+e[3]*M+e[6],r[1]=e[1]*f+e[4]*M+e[7],r}function c(r,n,e){var f=n[0],M=n[1];return r[0]=e[0]*f+e[4]*M+e[12],r[1]=e[1]*f+e[5]*M+e[13],r}function v(r,n,e,f){var M=n[0]-e[0],O=n[1]-e[1],Y=Math.sin(f),B=Math.cos(f);return r[0]=M*B-O*Y+e[0],r[1]=M*Y+O*B+e[1],r}function w(r,n){var e=r[0],f=r[1],M=n[0],O=n[1],Y=Math.sqrt(e*e+f*f)*Math.sqrt(M*M+O*O);return Math.acos(Math.min(Math.max(Y&&(e*M+f*O)/Y,-1),1))}function g(r){return r[0]=0,r[1]=0,r}function A(r){return"vec2("+r[0]+", "+r[1]+")"}function T(r,n){return r[0]===n[0]&&r[1]===n[1]}function L(r,n){var e=r[0],f=r[1],M=n[0],O=n[1];return Math.abs(e-M)<=C.Ib*Math.max(1,Math.abs(e),Math.abs(M))&&Math.abs(f-O)<=C.Ib*Math.max(1,Math.abs(f),Math.abs(O))}var r,p=Q,_=V,d=W,S=$,q=I,R=j,N=X,tr=(r=U(),function(n,e,f,M,O,Y){var B,ar;for(e||(e=2),f||(f=0),ar=M?Math.min(M*e+f,n.length):n.length,B=f;B<ar;B+=e)r[0]=n[B],r[1]=n[B+1],O(r,r,Y),n[B]=r[0],n[B+1]=r[1];return n})},837:(u,b,E)=>{var C=E(7240).default;(()=>{"use strict";function U(s,t=new Set){if(Array.isArray(s))s.forEach(i=>U(i,t));else if(s?.buffer instanceof ArrayBuffer)t.add(s.buffer);else if(s&&"object"==typeof s)for(const i in s)Object.prototype.hasOwnProperty.call(s,i)&&U(s[i],t);return t}const x=E(5071),F=E(5014),P=E(9330),D=E(5710);function k(s,t,i,o){let m=t[i],l=t[i+1],c=t[i+2];o&&(m=m*o[0]+o[12],l=l*o[5]+o[13],c=c*o[10]+o[14]),s[0]=m,s[1]=l,s[2]=c}function W(s,t,i,o){let a=t[i],m=t[i+1];o&&(a=a*o[0]+o[6],m=m*o[4]+o[4]),s[0]=a,s[1]=m}function $(s,t,i,o,y){const a=new Float32Array(s.length),m=i?i.length:s.length/3,l=(0,P.create)(),c=(0,P.create)(),v=(0,P.create)(),w=(0,D.create)(),g=(0,D.create)(),A=(0,D.create)(),T=[l,c,v],L=[w,g,A];for(let p=0;p<m;p+=3){for(let d=0;d<3;d++){const S=i?i[p+d]:p+d;k(T[d],s,3*S,o),W(L[d],t,2*S,y)}(0,P.subtract)(c,c,l),(0,P.subtract)(v,v,l),(0,D.subtract)(g,g,w),(0,D.subtract)(A,A,w);const _=g[0]*A[1]-g[1]*A[0]||.001;(0,P.scale)(c,c,A[1]),(0,P.scale)(v,v,g[1]),(0,P.subtract)(l,c,v),(0,P.scale)(l,l,1/_);for(let d=0;d<3;d++){const S=i?3*i[p+d]:3*(p+d);a[S]+=l[0],a[S+1]+=l[1],a[S+2]+=l[2]}}return a}const Z=[0,0,0],G=[1,1,1];function z(s){const{data:t,numComponents:i,stride:o}=s;return o?t.length*t.BYTES_PER_ELEMENT/o:t.length/i}const rr={1:Uint8Array,2:Uint16Array,4:Uint32Array},H=(0,F.create)(),K=(0,F.create)(),J=(0,x.create)(),I=(0,x.create)();function j(s,t){if(!t.geometry)return console.error("Human.assets.geometries.createGeometry","Mandatory attribute 'geometryId' expected on geometry: "+s),null;if(!t.boundary){let i,o;if(t.geometry.positionDecodeMat){const y=t.geometry.positionDecodeMat;i=new Float32Array([y[0],y[5],y[10]]),o=new Float32Array([y[12],y[13],y[14]])}t.boundary=function(y,a,m){a||(a=G),m||(m=Z);let l,c,v,w=1/0,g=1/0,A=1/0,T=-1/0,L=-1/0,p=-1/0;for(let _=0,d=y.length-2;_<d;_+=3)l=y[_]*a[0]+m[0],c=y[_+1]*a[1]+m[1],v=y[_+2]*a[2]+m[2],l<w&&(w=l),c<g&&(g=c),v<A&&(A=v),l>T&&(T=l),c>L&&(L=c),v>p&&(p=v);return{xmin:w,ymin:g,zmin:A,xmax:T,ymax:L,zmax:p}}(t.geometry.positions.data,i,o)}return t}function X(s,t,i){s[0]=t[0]*i[0]+i[12],s[1]=t[1]*i[5]+i[13],s[2]=t[2]*i[10]+i[14]}function nr(s,t){let i=t[0],o=t[1];i/=i<0?128:127,o/=o<0?128:127;const y=1-Math.abs(i)-Math.abs(o);y<0&&(i=(1-Math.abs(o))*(i>=0?1:-1),o=(1-Math.abs(i))*(o>=0?1:-1));const a=Math.sqrt(i*i+o*o+y*y);return s[0]=i/a,s[1]=o/a,s[2]=y/a,s}!function(s,t){function i(o,y){const a=U(y);self.postMessage({requestId:o,resource:y},Array.from(a))}self.onmessage=function(){var o=C(function*(y){const{requestId:a,options:m}=y.data;try{let l=(({geometryId:s,asset:t,options:i})=>function er(s,t,i={}){const o=new Uint32Array(t,0,1)[0],y={geometry:{primitive:"triangles",positions:null},boundary:null,draco:19===o,compressed:17!==o};if(y.draco)throw new Error("Draco geometry compression not supported");return y.compressed?function Q(s,t,i){const o=new DataView(s),y=o.getUint32(4,!0),a=o.getUint32(8,!0),m=o.getUint32(12,!0),l=o.getUint32(16,!0),c=o.getUint32(20,!0),v=o.getUint32(24,!0),w=o.getUint32(28,!0),g=o.getUint16(32,!0),A=o.getUint8(34),T=o.getUint8(35),L=new Array(T);let p,_;for(_=0,p=36;_<T;_++,p+=6)L[_]={uvSize:o.getUint32(p,!0),uvDecodeSize:o.getUint16(p+4,!0)};if(p=m+y+a,g>0&&(function(d,S){const q=S.subarray(0,3),R=S.subarray(3,6),N=(0,F.create)();(0,F.fromScaling)(H,R),(0,F.fromTranslation)(K,q),(0,F.multiply)(N,K,H),d.positionTranslate=q,d.positionScale=R,d.geometry.positionDecodeMat=N}(t,new Float32Array(s,p,g/Float32Array.BYTES_PER_ELEMENT)),p+=g),T>0&&(function(d,S,q){d.geometry.uvDecodeMats=new Array(q),d.uvTranslates=new Array(q),d.uvScales=new Array(q);for(let R=0;R<q;R++){const N=4*R,tr=d.uvTranslates[R]=S.subarray(N,N+2),r=d.uvScales[R]=S.subarray(N+2,N+4);(0,x.fromScaling)(J,r),(0,x.fromTranslation)(I,tr),d.geometry.uvDecodeMats[R]=(0,x.create)(),(0,x.multiply)(d.geometry.uvDecodeMats[R],I,J)}}(t,new Float32Array(s,p,4*T),T),p+=16*T),c>0&&(t.geometry.positions={numComponents:3,data:new Uint16Array(s,p,c/Uint16Array.BYTES_PER_ELEMENT)},p+=c),T>0){for(t.geometry.uvs=new Array(T),_=0;_<T;_++)t.geometry.uvs[_]={numComponents:2,data:new Uint16Array(s,p,L[_].uvSize/Uint16Array.BYTES_PER_ELEMENT)},p+=L[_].uvSize;t.geometry.uv=t.geometry.uvs[0]}if(v>0&&(t.geometry.normals={numComponents:2,data:new Int8Array(s,p,v/Int8Array.BYTES_PER_ELEMENT)},p+=v),w>0){const d=rr[A];t.geometry.indices=new d(s,l,w/d.BYTES_PER_ELEMENT)}j(i,t)}(t,y,s):function(a,m,l){const c=new Uint32Array(a,0,11),g=c[3],A=c[4],T=c[5],L=c[6],p=11*Uint32Array.BYTES_PER_ELEMENT+c[1]+c[2],_=p+g,d=_+A,S=d+T;let q=0;g>0&&(m.geometry.positions={numComponents:3,data:new Float32Array(a,p,g/Float32Array.BYTES_PER_ELEMENT)},q=m.geometry.positions.data.length/3),A>0&&(m.geometry.normals={numComponents:3,data:new Float32Array(a,_,A/Float32Array.BYTES_PER_ELEMENT)}),L>0&&(m.geometry.uv={numComponents:2,data:new Float32Array(a,S,L/Float32Array.BYTES_PER_ELEMENT)}),T>0&&(m.geometry.indices=new Uint32Array(a,d,T/Uint32Array.BYTES_PER_ELEMENT),q<=256?m.geometry.indices=new Uint8Array(m.geometry.indices):q<=65536&&(m.geometry.indices=new Uint16Array(m.geometry.indices))),j(l,m)}(t,y,s),function(a,m){if(a.compressed){if(m.decompressPositions){const{positions:c,positionDecodeMat:v}=a.geometry,w=new Float32Array(c.data.length);for(let g=0,A=3;g<w.length;g+=3,A+=3){const T=c.data.subarray(g,A);X(w.subarray(g,A),T,v)}a.geometry.positions.data=w}if(m.decompressNormals){const c=a.geometry.normals,v=new Float32Array(3*c.data.length/2);for(let w=0,g=0;w<c.data.length;w+=2,g+=3){const A=c.data.subarray(w,w+2);nr(v.subarray(g,g+3),A)}a.geometry.normals.numComponents=3,a.geometry.normals.data=v}}if(m.decompressUVs){const{uvDecodeMats:c,uvs:v}=a.geometry;if(v&&c){const w=new Float32Array([0,0,1]),g=new Float32Array(3);for(let A=0,T=Math.min(v.length,c.length);A<T;A++){const L=c[A],p=v[A].data,_=new Float32Array(p.length);for(let d=0,S=1;d<p.length;d+=2,S+=2)w[0]=p[d],w[1]=p[S],(0,P.transformMat3)(g,w,L),_[d]=g[0],_[S]=g[1];v[A].data=_}}}const l=a.geometry.uvs?.[0]||a.geometry.uv;if(m.computeTangents&&l&&!a.geometry.tangent){const{positions:c,indices:v,positionDecodeMat:w,uvDecodeMats:g}=a.geometry;a.geometry.tangent={numComponents:3,data:$(c.data,l.data,v,m.decompressPositions?null:w,m.decompressUVs?null:g?.[0])}}}(y,i),function(a,m){const l=m.geometry,c=z(l.positions);if(!(c>=3))throw new Error(`Geometry error '${a}': geometry must have at least 3 positions.`);if(l.normals&&c!==z(l.normals))throw new Error(`Geometry error '${a}': normals and positions don't match.`);if(l.uv&&c!==z(l.uv))throw new Error(`Geometry error '${a}': uvs and positions don't match.`);if(l.colors&&c!==z(l.colors))throw new Error(`Geometry error '${a}': colors and positions don't match.`);if(l.tangent&&c!==z(l.tangent))throw new Error(`Geometry error '${a}': tangents and positions don't match.`)}(s,y),y}(s,t,i))(m);l instanceof Promise&&(l=yield l),i(a,l)}catch(l){!function(c,v){const{message:w,stack:g}=v;self.postMessage({requestId:c,error:{message:w,stack:g}})}(a,l)}});return function(y){return o.apply(this,arguments)}}()}()})()}},sr={};function h(u){var b=sr[u];if(void 0!==b)return b.exports;var E=sr[u]={exports:{}};return or[u](E,E.exports,h),E.exports}h.m=or,h.x=()=>{var u=h.O(void 0,[14,296,592],()=>h(837));return h.O(u)},u=[],h.O=(b,E,C,U)=>{if(!E){var F=1/0;for(x=0;x<u.length;x++){for(var[E,C,U]=u[x],P=!0,D=0;D<E.length;D++)(!1&U||F>=U)&&Object.keys(h.O).every(G=>h.O[G](E[D]))?E.splice(D--,1):(P=!1,U<F&&(F=U));if(P){u.splice(x--,1);var k=C();void 0!==k&&(b=k)}}return b}U=U||0;for(var x=u.length;x>0&&u[x-1][2]>U;x--)u[x]=u[x-1];u[x]=[E,C,U]},h.d=(u,b)=>{for(var E in b)h.o(b,E)&&!h.o(u,E)&&Object.defineProperty(u,E,{enumerable:!0,get:b[E]})},h.f={},h.e=u=>Promise.all(Object.keys(h.f).reduce((b,E)=>(h.f[E](u,b),b),[])),h.u=u=>(592===u?"common":u)+".js",h.miniCssF=u=>{},h.o=(u,b)=>Object.prototype.hasOwnProperty.call(u,b),h.r=u=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(u,"__esModule",{value:!0})},(()=>{var u;h.tt=()=>(void 0===u&&(u={createScriptURL:b=>b},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(u=trustedTypes.createPolicy("angular#bundler",u))),u)})(),h.tu=u=>h.tt().createScriptURL(u),h.p="",(()=>{var u={837:1};h.f.i=(U,x)=>{u[U]||importScripts(h.tu(h.p+h.u(U)))};var E=self.webpackChunkhuman_studio_next=self.webpackChunkhuman_studio_next||[],C=E.push.bind(E);E.push=U=>{var[x,F,P]=U;for(var D in F)h.o(F,D)&&(h.m[D]=F[D]);for(P&&P(h);x.length;)u[x.pop()]=1;C(U)}})(),(()=>{var u=h.x;h.x=()=>Promise.all([14,296,592].map(h.e,h)).then(u)})(),h.x()})();