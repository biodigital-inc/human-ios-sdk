(()=>{var V,Re={49513:(V,k,_)=>{var R=_(15985).default;(()=>{"use strict";function O(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}const a=_(38472),E=_(7928),j=_(65133),q=(0,j.create)(),L=(0,j.create)();function pe(e,t,o){if(o?(0,j.fromScaling)(L,o):(0,j.identity)(L),t){const n=t[0],r=t[1],i=t[2];n&&((0,j.fromXRotation)(q,n),(0,j.multiply)(L,q,L)),r&&((0,j.fromYRotation)(q,r),(0,j.multiply)(L,q,L)),i&&((0,j.fromZRotation)(q,i),(0,j.multiply)(L,q,L))}return(0,E.fromMat4)(e,L)}const te=(0,a.create)(),he=Math.PI/180,oe=(0,a.create)(),le=Math.PI/180,Ue=2*Math.PI,ne=(0,a.create)(),xe=Math.PI/180,we=Math.PI/180,ae=(0,a.create)(),re=(0,a.create)(),me=Math.PI/180,Ce=Math.PI,De=2*Ce,ge=Math.PI/180;class Fe{constructor(){R(this,"translate",void 0),R(this,"rotate",void 0),R(this,"scale",void 0),R(this,"xform",void 0),R(this,"inverseXform",void 0),R(this,"normalXform",void 0),R(this,"dirty",void 0)}}const Le={shapeTranslate:"translate",shapeRotate:"rotate",shapeScale:"scale"};function G(e,t,o,n,r){const i=Le[t],s=i&&e[i];return"shapeRotate"===t&&(o*=ge,n*=ge,r*=ge),!!s&&(s[0]=o,s[1]=n,s[2]=r,e.dirty=!0,!0)}class ve extends Fe{constructor(t){super(),this.translate=t?.translate?(0,a.clone)(t.translate):null,this.xform=t?.scale||t?.rotate?(0,E.create)():null,this.xform?(this.rotate=(0,a.fromValues)(0,0,0),t?.rotate&&(0,a.scale)(this.rotate,t.rotate,ge),this.scale=(0,a.fromValues)(1,1,1),t?.scale&&(0,a.copy)(this.scale,t.scale),this.inverseXform=(0,E.create)(),this.normalXform=(0,E.create)(),this.dirty=!0,this.updateXform()):(this.rotate=null,this.scale=null,this.inverseXform=null,this.normalXform=null,this.dirty=!1)}updateXform(){this.xform&&this.dirty&&(pe(this.xform,this.rotate,this.scale),(0,E.invert)(this.inverseXform,this.xform),(0,E.transpose)(this.normalXform,this.inverseXform)),this.dirty=!1}}const ye=(e,t=0,o=1)=>Math.max(t,Math.min(o,e)),x=new class{constructor(e,t,o=100){R(this,"activeCount",void 0),R(this,"size",void 0),R(this,"get",void 0),R(this,"release",void 0);const n=[];let r=0;Object.defineProperties(this,{activeCount:{get:()=>r},size:{get:()=>n.length}}),this.get=()=>(r++,n.length?n.pop():e()),this.release=i=>{if(r<=0)throw new Error("Pool: too many objects released.");r--,n.length<o&&(t&&t(i),n.push(i))}}}(()=>(0,a.create)(),e=>(0,a.set)(e,0,0,0)),$e=Math.PI/180,Xe=(0,E.create)();function _e(e,t){return t[0]*e.normal[0]+t[1]*e.normal[1]+t[2]*e.normal[2]}function Te(e){const t=e[0],o=e[1],n=e[2];return t*t+o*o+n*n}const Y={Cube:class extends ve{in(e){const t=e[0],o=e[1],n=e[2];return t>=-.5&&t<=.5&&o>=-.5&&o<=.5&&n>=-.5&&n<=.5}out(e){const t=e[0],o=e[1],n=e[2];return t<=-.5||t>=.5||o<=-.5||o>=.5||n<=-.5||n>=.5}surfaceProjection(e,t,o){let n=e[0],r=e[1],i=e[2];const s=Math.abs(n+.5),c=Math.abs(n-.5),p=Math.abs(r+.5),l=Math.abs(r-.5),d=Math.abs(i+.5),h=Math.abs(i-.5);s<c&&s<p&&s<l&&s<d&&s<h?(n=-.5,(0,a.set)(o,-1,0,0)):c<p&&c<l&&c<d&&c<h?(n=.5,(0,a.set)(o,1,0,0)):p<l&&p<d&&p<h?(r=-.5,(0,a.set)(o,0,-1,0)):l<d&&l<h?(r=.5,(0,a.set)(o,0,1,0)):d<h?(i=-.5,(0,a.set)(o,0,0,-1)):(i=.5,(0,a.set)(o,0,0,1)),t[0]=ye(n,-.5,.5),t[1]=ye(r,-.5,.5),t[2]=ye(i,-.5,.5),this.xform&&(this.updateXform(),(0,a.transformMat3)(t,t,this.xform),(0,a.transformMat3)(o,o,this.normalXform),(0,a.normalize)(o,o)),this.translate&&(0,a.add)(t,t,this.translate)}},Cylinder:class extends ve{in(e){const t=e[0],o=e[1],n=e[2];return t*t+n*n<=1&&o>=-1&&o<=1}out(e){const t=e[0],o=e[1],n=e[2];return t*t+n*n>=1||o<=-1||o>=1}surfaceProjection(e,t,o){let n=e[0],r=e[1],i=e[2];if(r<=-1)(0,a.set)(o,0,-1,0),r=-1;else if(r>=1)(0,a.set)(o,0,1,0),r=1;else{const s=Math.sqrt(n*n+i*i);s>=1||1-Math.abs(r)>=1-s?(n/=s,i/=s,(0,a.set)(o,n,0,i)):(r=Math.sign(r),(0,a.set)(o,0,r,0))}t[0]=n,t[1]=r,t[2]=i,this.xform&&(this.updateXform(),(0,a.transformMat3)(t,t,this.xform),(0,a.transformMat3)(o,o,this.normalXform),(0,a.normalize)(o,o)),this.translate&&(0,a.add)(t,t,this.translate)}},Plane:class extends Fe{constructor(t){super(),R(this,"translate",void 0),R(this,"rotate",void 0),R(this,"normal",void 0),R(this,"distance",void 0),R(this,"xform",void 0),R(this,"dirty",!0),this.translate=(0,a.clone)(t.translate||[0,0,0]),this.rotate=(0,a.clone)(t.rotate||[0,0,0]),t.rotate&&(0,a.scale)(this.rotate,t.rotate,$e),this.normal=(0,a.create)(),this.distance=0,this.updateXform()}updateXform(){this.dirty&&(this.normal[0]=0,this.normal[1]=1,this.normal[2]=0,pe(Xe,this.rotate),(0,a.transformMat3)(this.normal,this.normal,Xe),this.distance=(0,a.dot)(this.translate,this.normal),this.dirty=!1)}in(t){return this.updateXform(),_e(this,t)<=this.distance}out(t){return this.updateXform(),_e(this,t)>=this.distance}surfaceProjection(t,o,n){this.updateXform(),n[0]=this.normal[0],n[1]=this.normal[1],n[2]=this.normal[2];const r=x.get();(0,a.scale)(r,n,this.distance-(0,a.dot)(t,n)),(0,a.add)(o,t,r),x.release(r)}},Sphere:class extends ve{in(e){return Te(e)<=1}out(e){return Te(e)>=1}surfaceProjection(e,t,o){(0,a.normalize)(t,e),O(o)?o.set(t):(0,a.copy)(o,t),this.xform&&(this.updateXform(),(0,a.transformMat3)(t,t,this.xform),(0,a.transformMat3)(o,o,this.normalXform),(0,a.normalize)(o,o)),this.translate&&(0,a.add)(t,t,this.translate)}}};function Z(e,t,o,n){const r=3*n;return e[0]=o[r],e[1]=o[r+1],e[2]=o[r+2],t?.translate&&(e[0]-=t.translate[0],e[1]-=t.translate[1],e[2]-=t.translate[2]),t?.inverseXform&&(t instanceof ve&&t.updateXform(),(0,a.transformMat3)(e,e,t.inverseXform)),e}const Me=(0,a.create)(),Se=(0,a.create)(),se=(0,a.create)(),Ie=(0,a.create)(),Ve=(0,a.create)(),W=(0,a.create)(),ee=(0,a.create)(),ke={CubePosition:function(e){const t=e.translate?(0,a.clone)(e.translate):null,o=e.scale||e.rotate?(0,E.create)():null,n=o?(0,a.create)():null;e.rotate&&(0,a.scale)(n,e.rotate,he);const r={scale:o?(0,a.clone)(e.scale)||(0,a.fromValues)(1,1,1):null,rotate:n,translate:t};let i=!0;return{set(s,c,p,l){"rotate"===s?(0,a.set)(n,c*he,p*he,l*he):s in r&&(0,a.set)(r[s],c,p,l),i=!0},update(s,c,p){const l=s.get("position");o&&i&&(pe(o,n,r.scale),i=!1);for(let d=c,h=3*d;d<p;d++,h+=3)te[0]=Math.random()-.5,te[1]=Math.random()-.5,te[2]=Math.random()-.5,o&&(0,a.transformMat3)(te,te,o),t&&(0,a.add)(te,te,t),l.set(te,h)}}},CylinderPosition:function(e){const t=e.translate?(0,a.clone)(e.translate):null,o=e.scale||e.rotate?(0,E.create)():null,n=o?(0,a.create)():null;e.rotate&&(0,a.scale)(n,e.rotate,le);const r={scale:o?(0,a.clone)(e.scale)||(0,a.fromValues)(1,1,1):null,rotate:n,translate:t};let i=!0;return{set(s,c,p,l){"rotate"===s?(0,a.set)(n,c*le,p*le,l*le):s in r&&(0,a.set)(r[s],c,p,l),i=!0},update(s,c,p){const l=s.get("position");o&&i&&(pe(o,n,r.scale),i=!1);for(let d=c,h=3*d;d<p;d++,h+=3){const g=Math.random()*Ue,y=Math.random(),m=2*Math.random()-1;oe[0]=y*Math.cos(g),oe[1]=m,oe[2]=y*Math.sin(g),o&&(0,a.transformMat3)(oe,oe,o),t&&(0,a.add)(oe,oe,t),l.set(oe,h)}}}},DirectionalVelocity:function(e){const t=(0,a.clone)(e.directionAverage);(0,a.normalize)(t,t);const o={directionAverage:t},n={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0,directionVariance:e.directionVariance||0};return{components:["velocity"],set(r,i,s,c){r in o?(0,a.set)(o[r],i,s,c):r in n&&(n[r]=i)},update(r,i,s){const c=r.get("velocity"),{forceAverage:p,forceVariance:l,directionVariance:d}=n;for(let h=i,g=3*h;h<s;h++,g+=3){const y=p+2*Math.random()*l-l;ne[0]=t[0]+2*Math.random()*d-d,ne[1]=t[1]+2*Math.random()*d-d,ne[2]=t[2]+2*Math.random()*d-d,(0,a.normalize)(ne,ne),c[g]+=ne[0]*y,c[g+1]+=ne[1]*y,c[g+2]+=ne[2]*y}}}},Lifetime:function(e){const t={average:e.average,variance:e.variance||0};return{components:["lifetime","age"],set(o,n){o in t&&(t[o]=n)},update(o,n,r){const i=o.get("age"),s=o.get("lifetime");let{average:c,variance:p}=t;p>c&&(c=p=(c+p)/2);for(let l=n;l<r;l++)i[l]=0,s[l]=c,p>0&&(s[l]+=2*Math.random()*p-p)}}},PointPosition:function(e){const t=(0,a.clone)(e.position),o={position:t};return{set(n,r,i,s){n in o&&(0,a.set)(o[n],r,i,s)},update(n,r,i){const s=n.get("position");for(let c=r,p=3*c;c<i;c++,p+=3)s.set(t,p)}}},RandomRotation:function(e){const t={average:e.average*xe,variance:(e.variance||0)*xe};return{components:["uvRotate"],set(o,n){o in t&&(t[o]=n*xe)},update(o,n,r){const i=o.get("uvRotate"),{average:s,variance:c}=t;for(let p=n;p<r;p++){let l=s;c>0&&(l+=2*Math.random()*c-c),i[p]=l}}}},RandomRotationSpeed:function(e){const t={average:e.average*we,variance:(e.variance||0)*we};return{components:["rotationSpeed","uvRotate"],set(o,n){o in t&&(t[o]=n*we)},update(o,n,r){const i=o.get("rotationSpeed"),{average:s,variance:c}=t;for(let p=n;p<r;p++){let l=s;c>0&&(l+=2*Math.random()*c-c),i[p]=l}}}},RandomScale:function(e){const t={average:e.average,variance:e.variance||0};return{components:["scale"],set(o,n){o in t&&(t[o]=n)},update(o,n,r){const i=o.get("scale");let{average:s,variance:c}=t;c>s&&(s=c=(s+c)/2);for(let p=n;p<r;p++){let l=s;c>0&&(l+=2*Math.random()*c-c),i[p]=l}}}},RandomVelocity:function(e){const t={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0};return{components:["velocity"],set(o,n){o in t&&(t[o]=n)},update(o,n,r){const i=o.get("velocity"),{forceAverage:s,forceVariance:c}=t;for(let p=n,l=3*p;p<r;p++,l+=3){const d=s+2*Math.random()*c-c;ae[0]=2*Math.random()-1,ae[1]=2*Math.random()-1,ae[2]=2*Math.random()-1,(0,a.normalize)(ae,ae),i[l]+=ae[0]*d,i[l+1]+=ae[1]*d,i[l+2]+=ae[2]*d}}}},SpherePosition:function(e){const t=e.translate?(0,a.clone)(e.translate):null,o=e.scale||e.rotate?(0,E.create)():null,n=o?(0,a.create)():null;e.rotate&&(0,a.scale)(n,e.rotate,me);const r={scale:o?(0,a.clone)(e.scale)||(0,a.fromValues)(1,1,1):null,rotate:n,translate:t};let i=!0;return{set(s,c,p,l){"rotate"===s?(0,a.set)(n,c*me,p*me,l*me):s in r&&(0,a.set)(r[s],c,p,l),i=!0},update(s,c,p){const l=s.get("position");o&&i&&(pe(o,n,r.scale),i=!1);for(let d=c,h=3*d;d<p;d++,h+=3){const g=Math.random()*Ce,y=Math.random()*De,m=Math.random(),v=Math.sin(g);re[0]=m*v*Math.sin(y),re[1]=m*Math.cos(g),re[2]=m*v*Math.cos(y),o&&(0,a.transformMat3)(re,re,o),t&&(0,a.add)(re,re,t),l.set(re,h)}}}},SpriteAnimationDuration:function(e,t,o){const n={average:e.average,variance:e.variance||0,startFrame:o.spriteStartFrame||0,endFrame:o.spriteEndFrame||Math.max(0,o.spriteCols*o.spriteCols-1)};return{components:["uvTranslate","spriteFrameDuration","spriteCurrentTime"],set(r,i){r in n&&(n[r]=i)},update(r,i,s){const c=r.get("spriteFrameDuration"),p=r.get("spriteCurrentTime"),{startFrame:l,endFrame:d}=n,h=d-l;let{average:g,variance:y}=n;y>g&&(g=y=(g+y)/2);for(let m=i;m<s;m++){let v=g;y>0&&(v+=2*Math.random()*y-y),p[m]=0,c[m]=h?Math.max(v/h,0):0}}}}},Oe={AgeColorBlend:function(e){const t=[];for(let i=0,s=e.colors.length;i<s;i++)t[i]=new Uint8Array(e.colors[i]);const o=e.shape?new Y[e.shape.type](e.shape):null,r=o?o[e.shape?.direction||"in"].bind(o):null;return{components:["position","age","lifetime","color"],set(i,s,c,p){G(o,i,s,c,p)},update(i,s,c){const p=i.get("position"),l=i.get("age"),d=i.get("lifetime"),h=i.get("color"),g=t.length-1,y=o?x.get():null;for(let m=s,v=4*m;m<c;m++,v+=4)if(!r||r(Z(y,o,p,m))){const f=d[m]?l[m]/d[m]*g:0,A=Math.floor(f),S=t[A],u=t[A+1]||t[A],M=f-A,b=1-M;h[v]=b*S[0]+M*u[0],h[v+1]=b*S[1]+M*u[1],h[v+2]=b*S[2]+M*u[2],h[v+3]=b*S[3]+M*u[3]}y&&x.release(y)}}},AxisForce:function(e){const t=e.forceAverage,o=e.forceVariance||0,n=(0,a.clone)(e.position),r=(0,a.clone)(e.direction);(0,a.normalize)(r,r);const i=e.shape?new Y[e.shape.type](e.shape):null,c=i?i[e.shape?.direction||"in"].bind(i):null,p={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0};return{components:["velocity","position"],set(l,d,h,g){"shapeTranslate"===l||"shapeRotate"===l||"shapeScale"===l?G(i,l,d,h,g):l in p&&(p[l]=d)},update(l,d,h,g){const y=l.get("position"),m=l.get("velocity"),v=t*g,f=o*g,A=i?x.get():null,w=x.get(),S=x.get(),u=x.get(),M=x.get();for(let b=d,C=3*b;b<h;b++,C+=3)if(!c||c(Z(A,i,y,b))){const F=C+1,z=C+2;let X=v;f>0&&(X+=2*Math.random()*f-f),w[0]=y[C],w[1]=y[F],w[2]=y[z],(0,a.subtract)(M,w,n);const $=(0,a.dot)(M,r);(0,a.scale)(u,r,$),(0,a.add)(S,u,n),(0,a.subtract)(S,w,S),(0,a.normalize)(S,S),m[C]+=S[0]*X,m[F]+=S[1]*X,m[z]+=S[2]*X}A&&x.release(A),x.release(w),x.release(S),x.release(u),x.release(M)}}},BrownianMotion:function(e){const t=e.shape?new Y[e.shape.type](e.shape):null,n=t?t[e.shape?.direction||"in"].bind(t):null,r={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0,frequency:e.frequency};return{components:["velocity","position"],set(i,s,c,p){"shapeTranslate"===i||"shapeRotate"===i||"shapeScale"===i?G(t,i,s,c,p):i in r&&(r[i]=s)},update(i,s,c,p){const l=i.get("position"),d=i.get("velocity"),h=r.frequency*p,g=r.forceAverage*p,y=r.forceVariance*p,m=t?x.get():null,v=x.get();for(let f=s,A=3*f;f<c;f++,A+=3)if((!n||n(Z(m,t,l,f)))&&Math.random()<h){let w=g;y>0&&(w+=2*Math.random()*y-y),v[0]=2*Math.random()-1,v[1]=2*Math.random()-1,v[2]=2*Math.random()-1,(0,a.normalize)(v,v),d[A]+=v[0]*w,d[A+1]+=v[1]*w,d[A+2]+=v[2]*w}m&&x.release(m),x.release(v)}}},Gravity:function(e){const t=(0,a.clone)(e.position),o=e.shape?new Y[e.shape.type](e.shape):null,r=o?o[e.shape?.direction||"in"].bind(o):null,i={position:t},s={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0,radius:e.radius};return{components:["velocity","position"],set(c,p,l,d){"shapeTranslate"===c||"shapeRotate"===c||"shapeScale"===c?G(o,c,p,l,d):c in i?(0,a.set)(i[c],p,l,d):c in s&&(s[c]=p)},update(c,p,l,d){const{forceAverage:h,forceVariance:g,radius:y}=s;if(0===y)return;const m=c.get("position"),v=c.get("velocity"),f=h*d,A=g*d,w=o?x.get():null,S=i.position,u=x.get();for(let M=p,b=3*M;M<l;M++,b+=3)if(!r||r(Z(w,o,m,M))){let C=f;A>0&&(C+=2*Math.random()*A-A);const F=b+1,z=b+2;u[0]=S[0]-m[b],u[1]=S[1]-m[F],u[2]=S[2]-m[z];const X=1/Math.max((0,a.length)(u),y);(0,a.scale)(u,u,X),C*=X*X,v[b]+=u[0]*C,v[b+1]+=u[1]*C,v[b+2]+=u[2]*C}w&&x.release(w),x.release(u)}}},Friction:function(e){const t=e.shape?new Y[e.shape.type](e.shape):null,n=t?t[e.shape?.direction||"in"].bind(t):null,r={friction:1-e.friction};return{components:["velocity","position"],set(i,s,c,p){"shapeTranslate"===i||"shapeRotate"===i||"shapeScale"===i?G(t,i,s,c,p):i in r&&(r[i]=1-s)},update(i,s,c,p){const l=i.get("position"),d=i.get("velocity"),h=Math.pow(r.friction,p),g=t?x.get():null;for(let y=s,m=3*y;y<c;y++,m+=3)n&&!n(Z(g,t,l,y))||(d[m]*=h,d[m+1]*=h,d[m+2]*=h);g&&x.release(g)}}},Path:function(e,t){const o=function(s){const c=[];return s.forEach(({position:p,radius:l,forceAverage:d,forceVariance:h},g)=>{const y=(0,a.clone)(p),m=g?(0,a.subtract)((0,a.create)(),y,c[g-1].position):null,v=g?(0,a.length)(m):0,f={position:y,radiusSquared:l?l*l:0,forceVariance:h||0,forceAverage:d,vec:m,dir:g?(0,a.scale)((0,a.create)(),m,1/v):null,length:v};c.push(f)}),c}(e.nodes);t.path=o;const n=e.shape?new Y[e.shape.type](e.shape):null,i=n?n[e.shape?.direction||"in"].bind(n):null;return{components:["velocity","position","pathIndex"],set(s,c,p,l){G(n,s,c,p,l)},update(s,c,p,l){const d=s.get("position"),h=s.get("velocity"),g=s.get("pathIndex"),y=n?x.get():null,m=x.get(),v=x.get(),f=x.get();for(let A=c,w=3*A;A<p;A++,w+=3)if(!i||i(Z(y,n,d,A))){const S=g[A];let u=o[S];if(u){const M=w+1,b=w+2;m[0]=d[w],m[1]=d[M],m[2]=d[b];let C=null;if(S){if((0,a.subtract)(v,m,o[S-1].position),(0,a.dot)(v,u.dir)>u.length){const z=S+1;if(g[A]=z,u=o[z],u){f[0]=h[w],f[1]=h[M],f[2]=h[b];const X=(0,a.length)(f);(0,a.scale)(f,u.dir,X),h.set(f,w)}}u&&(C=u.dir)}else{if((0,a.squaredDistance)(m,u.position)<u.radiusSquared){const F=S+1;g[A]=F,u=o[F]}u&&((0,a.subtract)(v,u.position,m),C=(0,a.normalize)(v,v))}if(u){const z=u.forceVariance*l;let X=u.forceAverage*l;z>0&&(X+=2*Math.random()*z-z),h[w]+=C[0]*X,h[M]+=C[1]*X,h[b]+=C[2]*X}}}y&&x.release(y),x.release(m),x.release(v),x.release(f)}}},RadialForce:function(e){const t=(0,a.clone)(e.position),o=e.shape?new Y[e.shape.type](e.shape):null,r=o?o[e.shape?.direction||"in"].bind(o):null,i={position:t},s={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0};return{components:["velocity","position"],set(c,p,l,d){"shapeTranslate"===c||"shapeRotate"===c||"shapeScale"===c?G(o,c,p,l,d):c in i?(0,a.set)(i[c],p,l,d):c in s&&(s[c]=p)},update(c,p,l,d){const h=c.get("position"),g=c.get("velocity"),y=s.forceAverage*d,m=s.forceVariance*d,v=o?x.get():null,f=x.get();for(let A=p,w=3*A;A<l;A++,w+=3)if(!r||r(Z(v,o,h,A))){let S=y;m>0&&(S+=2*Math.random()*m-m);const u=w+1,M=w+2;f[0]=h[w]-t[0],f[1]=h[u]-t[1],f[2]=h[M]-t[2],(0,a.normalize)(f,f),g[w]+=f[0]*S,g[u]+=f[1]*S,g[M]+=f[2]*S}v&&x.release(v),x.release(f)}}},SpriteAnimation:function(e,t,o){const n=o.spriteRows||0,r=o.spriteCols||1,i=o.spriteStartFrame||0,s=(o.spriteEndFrame||Math.max(0,n*r-1))-i;return{components:["uvTranslate","spriteFrameDuration","spriteCurrentTime"],update(c,p,l,d){const h=c.get("uvTranslate"),g=c.get("spriteFrameDuration"),y=c.get("spriteCurrentTime");for(let m=p,v=2*m,f=m+1;m<l;m++,v+=2,f+=2){y[m]=(y[m]+d)%(s*g[m]);const w=Math.floor(y[m]/g[m]);h[v]=w%r/r;const u=Math.floor(w/r)+1;h[f]=-u/n}}}},UniformForce:function(e){const t=(0,a.clone)(e.directionAverage),o=e.shape?new Y[e.shape.type](e.shape):null,r=o?o[e.shape?.direction||"in"].bind(o):null,i={directionAverage:t},s={forceAverage:e.forceAverage,forceVariance:e.forceVariance||0,directionVariance:e.directionVariance||0};return{components:["velocity","position"],set(c,p,l,d){"shapeTranslate"===c||"shapeRotate"===c||"shapeScale"===c?G(o,c,p,l,d):c in i?(0,a.set)(i[c],p,l,d):c in s&&(s[c]=p)},update(c,p,l,d){const h=c.get("position"),g=c.get("velocity"),{forceAverage:y,forceVariance:m,directionVariance:v}=s,f=y*d,A=m*d,w=o?x.get():null,S=x.get();for(let u=p,M=3*u;u<l;u++,M+=3)if(!r||r(Z(w,o,h,u))){let b=f;A>0&&(b+=2*Math.random()*A-A),(0,a.copy)(S,t),v&&(S[0]+=2*Math.random()*v-v,S[1]+=2*Math.random()*v-v,S[2]+=2*Math.random()*v-v,(0,a.normalize)(S,S)),g[M]+=S[0]*b,g[M+1]+=S[1]*b,g[M+2]+=S[2]*b}w&&x.release(w),x.release(S)}}}},Ee={LifetimeKill:function(){return{components:["lifetime","age","dead"],update(e,t,o){const n=e.get("age"),r=e.get("lifetime"),i=e.get("dead");for(let s=t;s<o;s++)n[s]>=r[s]&&(i[s]=!0)}}},LifetimeStop:function(){return{components:["lifetime","age","stopped"],update(e,t,o){const n=e.get("age"),r=e.get("lifetime"),i=e.get("stopped");for(let s=t;s<o;s++)n[s]>=r[s]&&(i[s]=!0)}}},PathRadius:function(e,t){const{path:o=[]}=t;return{components:["position","pathIndex"],update(n,r,i){const s=n.get("position"),c=n.get("pathIndex");for(let p=r,l=3*p;p<i;p++,l+=3){const d=c[p],h=d>0?o[d]:null;if(h){const g=l+1,y=l+2;Me[0]=s[l],Me[1]=s[g],Me[2]=s[y],(0,a.subtract)(Se,Me,o[d-1].position);const v=(0,a.dot)(Se,h.dir);(0,a.scale)(se,h.dir,v),(0,a.subtract)(se,Se,se);const f=(0,a.squaredLength)(se);if(f>h.radiusSquared){(0,a.normalize)(se,se);const A=(0,a.scale)(se,se,Math.sqrt(h.radiusSquared)-Math.sqrt(f));s[l]=A[0],s[g]=A[1],s[y]=A[2]}}}}}},PathKill:function(e,t){const{path:o=[]}=t,n=o.length;return{components:["position","path","pathIndex","dead"],update(r,i,s){const c=r.get("pathIndex"),p=r.get("dead");for(let l=i;l<s;l++)c[l]>=n&&(p[l]=!0)}}},PathStop:function(e,t){const{path:o=[]}=t,n=o.length;return{components:["position","path","pathIndex","stopped"],update(r,i,s){const c=r.get("pathIndex"),p=r.get("stopped");for(let l=i;l<s;l++)c[l]>=n&&(p[l]=!0)}}},ShapeBounce:function(e,t){const o=new Y[e.shape.type](e.shape),n=e.shape.direction||"in",r=!!e.trap,i=t.trapId||0;r&&(t.trapId=i+1);const s=1<<i,c=["position","velocity"];r&&c.push("trap");const p=o[n].bind(o);return{components:c,set(l,d,h,g){G(o,l,d,h,g)},update(l,d,h){const g=l.get("position"),y=l.get("velocity"),m=r?l.get("trap"):null,v=x.get();for(let f=d;f<h;f++)if(Z(v,o,g,f),p(v)){if(!r||m[f]&s){const A=3*f;o.surfaceProjection(v,Ie,Ve),g.set(Ie,A),W[0]=y[A],W[1]=y[A+1],W[2]=y[A+2];const w=(0,a.length)(W);if(w){W[0]/=w,W[1]/=w,W[2]/=w;const S=(0,a.dot)(W,Ve);(0,a.scale)(ee,Ve,2*S),(0,a.subtract)(ee,W,ee),(0,a.scale)(ee,ee,w)}else ee[0]=0,ee[1]=0,ee[2]=0;y.set(ee,A)}}else r&&(m[f]|=s);x.release(v)}}},ShapeKill:function(e,t){const o=new Y[e.shape.type](e.shape),n=e.shape.direction||"in",r=!!e.trap,i=t.trapId||0;r&&(t.trapId=i+1);const s=1<<i,c=["position","dead"];r&&c.push("trap");const p=o[n].bind(o);return{components:c,set(l,d,h,g){G(o,l,d,h,g)},update(l,d,h){const g=l.get("position"),y=l.get("dead"),m=r?l.get("trap"):null,v=x.get();for(let f=d;f<h;f++)Z(v,o,g,f),p(v)?(!r||m[f]&s)&&(y[f]=!0):r&&(m[f]|=s);x.release(v)}}},ShapeStop:function(e,t){const o=new Y[e.shape.type](e.shape),n=e.shape.direction||"in",r=!!e.trap,i=t.trapId||0;r&&(t.trapId=i+1);const s=1<<i,c=["position","stopped"];r&&c.push("trap");const p=o[n].bind(o);return{components:c,set(l,d,h,g){G(o,l,d,h,g)},update(l,d,h){const g=l.get("position"),y=l.get("stopped"),m=r?l.get("trap"):null,v=x.get();for(let f=d;f<h;f++)Z(v,o,g,f),p(v)?(!r||m[f]&s)&&(y[f]=!0):r&&(m[f]|=s);x.release(v)}}}},be={position:{construct:Float32Array,size:3},velocity:{construct:Float32Array,size:3},color:{construct:Uint8Array,size:4,geometry:!0},scale:{construct:Float32Array,size:1,geometry:!0,init:1},uvRotate:{construct:Float32Array,size:1,geometry:!0},uvTranslate:{construct:Float32Array,size:2,geometry:2,init(e,t,o,n){const{spriteRows:r=0,spriteCols:i=1,spriteStartFrame:s=0}=n,c=s%i/i,p=(r-1-Math.floor(s/i))/r;for(let l=2*t,d=2*o;l<d;l+=2)e[l]=c,e[l+1]=p}},dead:{init:!1},stopped:{init:!1}},B=(0,a.create)();class Ge{constructor(t){R(this,"playBackRate",void 0),R(this,"emissionAverage",void 0),R(this,"emissionVariance",void 0),R(this,"bounds",{min:(0,a.fromValues)(1/0,1/0,1/0),max:(0,a.fromValues)(-1/0,-1/0,-1/0)}),R(this,"arrays",void 0),R(this,"particles",void 0),R(this,"active",void 0),R(this,"subSystemIds",void 0),R(this,"update",void 0),R(this,"reset",void 0),R(this,"set",void 0);const{numParticles:o}=t,n=new Float32Array(3*o),r=new Float32Array(3*o),i={position:{data:n,numComponents:3,drawType:35048}},s=new Map([["position",n],["velocity",r]]),c={},p=new Map;function l(u){return"function"==typeof u?u:(u.components&&u.components.forEach(M=>{if(!s.has(M)){const b=be[M],C=b?.construct||Array,F=b?.size||1,z=new C(o*F);s.set(M,z),b?.geometry&&(i[M]={data:z,drawType:35048,numComponents:F})}}),u.update)}const d=[];t.creators.filter(u=>!!ke[u.type]||(console.error(`Undefined particle system creator: '${u.type}'`,u),!1)).forEach(u=>{const M=ke[u.type](u,c,t),b=l(M);d.push(b),u.id&&("function"!=typeof M?p.set(u.id,M):console.error("Cannot update component",u.type))});const h=[];t.updaters?.filter(u=>!!Oe[u.type]||(console.error(`Undefined particle system updater: '${u.type}'`,u),!1)).map(u=>{const M=Oe[u.type](u,c,t),b=l(M);h.push(b),u.id&&("function"!=typeof M?p.set(u.id,M):console.error("Cannot update component",u.type))});const g=[];t.constraints?.filter(u=>!!Ee[u.type]||(console.error(`Undefined particle system constraint: '${u.type}'`,u),!1)).map(u=>{const M=Ee[u.type](u,c,t),b=l(M);g.push(b),u.id&&("function"!=typeof M?p.set(u.id,M):console.error("Cannot update component",u.type))});const y=t.maxSpeed||0,m=y*y;this.playBackRate=1,this.emissionAverage=t.emissionAverage??1,this.emissionVariance=t.emissionVariance||0,this.subSystemIds=new Set(p.keys());let v=1/0,f=0,A=0;function w(u){const M=f-1;f--,u!==M&&s.forEach((b,C)=>{const F=be[C];if(F?.copy)return void F.copy(b,M,u);const z=F?.size||1;if(1===z)b[u]=b[M];else for(let X=0,$=M*z,N=u*z;X<z;X++,$++,N++)b[N]=b[$]})}function S(u){const M=A;A++,u!==M&&s.forEach((b,C)=>{const F=be[C];if(F?.swap)return void F.swap(b,M,u);const z=F?.size||1;if(1===z){const X=b[u];b[u]=b[M],b[M]=X}else for(let X=0,$=M*z,N=u*z;X<z;X++,$++,N++){const de=b[N];b[N]=b[$],b[$]=de}})}this.update=u=>{const M=ye(u-v,0,.04)*this.playBackRate;v=u;let b=!1;if(f<o){const H=this.emissionVariance*M;let K=Math.max(this.emissionAverage*M+2*Math.random()*H-H,0);if(K=K>=1?Math.floor(K):Math.random()<K?1:0,K>0){const T=Math.min(f+K,o);s.forEach((I,Q)=>{const D=be[Q];if("function"==typeof D?.init)return void D.init(I,f,T,t);const ie=D?.size||1,fe=D?.init??0;if(O(I))I.fill(fe,f*ie,T*ie);else if(Array.isArray(I))if(1===ie)for(let ce=f;ce<T;ce++)I[ce]=fe;else for(let ce=f*ie,Ze=T*ie;ce<Ze;ce++)I[ce]=fe}),d.forEach(I=>{I(s,f,T,M)}),f=T,b=!0}}if(f>A){h.forEach(T=>{T(s,A,f,M)});for(let T=A,I=3*T,Q=I+1,D=I+2;T<f;T++,I+=3,Q+=3,D+=3){if(B[0]=r[I]*M,B[1]=r[Q]*M,B[2]=r[D]*M,m>0){const ie=B[0]*B[0]+B[1]*B[1]+B[2]*B[2];if(ie>m){const fe=Math.sqrt(ie);(0,a.scale)(B,B,y/fe),r.set(B,I)}}n[I]+=B[0],n[Q]+=B[1],n[D]+=B[2]}const U=s.get("rotationSpeed");if(U){const T=s.get("uvRotate");for(let I=A;I<f;I++)T[I]+=U[I]*M}const H=s.get("age"),K=s.get("lifetime");if(H&&K)for(let T=A;T<f;T++)H[T]=Math.min(H[T]+M,K[T]);g.forEach(T=>{T(s,A,f,M)}),b=!0}const C=s.get("dead"),F=s.get("stopped");if(C||F)for(let U=f-1;U>=A;U--)C&&C[U]?(w(U),b=!0):F&&F[U]&&(S(U),b=!0);let z=1/0,X=1/0,$=1/0,N=-1/0,de=-1/0,Pe=-1/0;for(let U=0,H=3*U,K=H+1,T=H+2;U<f;U++,H+=3,K+=3,T+=3){const I=n[H],Q=n[K],D=n[T];I<z&&(z=I),Q<X&&(X=Q),D<$&&($=D),I>N&&(N=I),Q>de&&(de=Q),D>Pe&&(Pe=D)}return(0,a.set)(this.bounds.min,z,X,$),(0,a.set)(this.bounds.max,N,de,Pe),b},this.reset=()=>{f=0,A=0},this.set=(u,M,b,C,F)=>{const z=p.get(u);z&&z.set&&z.set(M,b,C,F)},Object.defineProperties(this,{arrays:{get:()=>i},particles:{get:()=>f},active:{get:()=>f-A}})}}const J=new Map,Ae=new Set;let ue=0;function qe(e,t,o="update"){const{particles:n,arrays:r,bounds:i}=t,s={},c=[];Object.keys(r).forEach(p=>{const{data:l,...d}=r[p],g=l.slice(0,"create"===o?l.length:n*(d.numComponents||3));s[p]={...d,data:g},c.push(g.buffer)}),self.postMessage({command:o,id:e,particles:n,arrays:s,bounds:{min:Array.from(i.min),max:Array.from(i.max)}},c)}function Be(){const e=performance.now()/1e3;Ae.forEach(t=>{const o=J.get(t);o.update(e)&&qe(t,o)}),ue=setTimeout(Be,8)}const Ye={create:function(e){const{id:t,def:o}=e;if(J.has(t))return void console.warn(`Simulation worker: Simulation already exists: '${t}'`);const n=new Ge(o);J.set(t,n),qe(t,n,"create")},destroy:function(e){const{id:t}=e;J.get(t)?J.delete(t):console.warn(`Simulation worker: Simulation not found: '${t}'`)},start:function(e){Ae.add(e.id),ue||(ue=setTimeout(Be,8))},pause:function(e){Ae.delete(e.id),Ae.size||(clearTimeout(ue),ue=0)},set(e){const{id:t,componentId:o,key:n,x:r,y:i,z:s}=e;J.get(t).set(o,n,r,i,s)},playBackRate(e){const{id:t,value:o}=e;J.get(t).playBackRate=o},emissionAverage(e){const{id:t,value:o}=e;J.get(t).emissionAverage=o},emissionVariance(e){const{id:t,value:o}=e;J.get(t).emissionVariance=o},reset(e){J.get(e.id).reset()},returnArrays(){}};self.onmessage=e=>{const t=Ye[e.data.command];t?t(e.data):console.warn(`Simulation worker: Unrecognized command: '${e.data.command||""}'`)}})()}},ze={};function P(V){var k=ze[V];if(void 0!==k)return k.exports;var _=ze[V]={exports:{}};return Re[V](_,_.exports,P),_.exports}P.m=Re,P.x=()=>{var V=P.O(void 0,[449,76],()=>P(49513));return P.O(V)},V=[],P.O=(k,_,R,O)=>{if(!_){var E=1/0;for(a=0;a<V.length;a++){for(var[_,R,O]=V[a],j=!0,q=0;q<_.length;q++)(!1&O||E>=O)&&Object.keys(P.O).every(le=>P.O[le](_[q]))?_.splice(q--,1):(j=!1,O<E&&(E=O));if(j){V.splice(a--,1);var L=R();void 0!==L&&(k=L)}}return k}O=O||0;for(var a=V.length;a>0&&V[a-1][2]>O;a--)V[a]=V[a-1];V[a]=[_,R,O]},P.d=(V,k)=>{for(var _ in k)P.o(k,_)&&!P.o(V,_)&&Object.defineProperty(V,_,{enumerable:!0,get:k[_]})},P.f={},P.e=V=>Promise.all(Object.keys(P.f).reduce((k,_)=>(P.f[_](V,k),k),[])),P.u=V=>(76===V?"common":V)+".js",P.miniCssF=V=>{},P.o=(V,k)=>Object.prototype.hasOwnProperty.call(V,k),P.r=V=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(V,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(V,"__esModule",{value:!0})},(()=>{var V;P.tt=()=>(void 0===V&&(V={createScriptURL:k=>k},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(V=trustedTypes.createPolicy("angular#bundler",V))),V)})(),P.tu=V=>P.tt().createScriptURL(V),P.p="",(()=>{var V={513:1};P.f.i=(O,a)=>{V[O]||importScripts(P.tu(P.p+P.u(O)))};var _=self.webpackChunkhuman_studio_next=self.webpackChunkhuman_studio_next||[],R=_.push.bind(_);_.push=O=>{var[a,E,j]=O;for(var q in E)P.o(E,q)&&(P.m[q]=E[q]);for(j&&j(P);a.length;)V[a.pop()]=1;R(O)}})(),(()=>{var V=P.x;P.x=()=>Promise.all([P.e(449),P.e(76)]).then(V)})(),P.x()})();