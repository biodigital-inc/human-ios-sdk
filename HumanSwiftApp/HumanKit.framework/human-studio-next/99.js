"use strict";(self.webpackChunkhuman_studio_next=self.webpackChunkhuman_studio_next||[]).push([[99],{19099:(vt,N,s)=>{s.r(N),s.d(N,{ExploreModule:()=>xt});var v,g=s(60177),m=s(38645),_=s(85052),K=s(27561),q=s(82656),b=s(2573),ee=s(27180),te=s(90699),L=s(17215),H=s(66874),oe=s(28696),I=s(38104),z=s(15623),p=s(65763),f=s(37925),X=s(32914),ne=s(14264),ae=s(21082),re=s(39705),ie=s(11756),Y=s(40634),T=s(21424),h=s(49204),x=s(16823),R=s(47632),U=s(51036),se=s(66432),e=s(54438);class G{constructor(o,t){this.templateRef=o,this.viewContainer=t,this.ngUnsubscribe=new _.B}ngOnInit(){this.isZSpaceAccount$.pipe().subscribe(o=>this.update(o))}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}update(o){o?this.viewContainer.createEmbeddedView(this.templateRef):this.viewContainer.clear()}}(v=G).\u0275fac=function(o){return new(o||v)(e.rXU(e.C4Q),e.rXU(e.c1b))},v.\u0275dir=e.FsC({type:v,selectors:[["","appFlagZSpace",""]]}),function(n,o,t,a){var l,i=arguments.length,r=i<3?o:null===a?a=Object.getOwnPropertyDescriptor(o,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,o,t,a);else for(var c=n.length-1;c>=0;c--)(l=n[c])&&(r=(i<3?l(r):i>3?l(o,t,r):l(o,t))||r);i>3&&r&&Object.defineProperty(o,t,r)}([(0,p.l6)(T.q.isZSpaceAccount),function(n,o){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata("design:type",o)}(0,b.c)],G.prototype,"isZSpaceAccount$",void 0);var ge=s(8961),pe=s(68511),he=s(76718),A=s(35426),de=s(35160),me=s(87996);let S=(()=>{var n;class o{constructor(a){this.elementRef=a}}return(n=o).\u0275fac=function(a){return new(a||n)(e.rXU(e.aKT))},n.\u0275dir=e.FsC({type:n,selectors:[["","app-scrollable-list-item",""]]}),o})();var F=s(26779);const fe=["container"],ue=["scrollRef"],_e=["*"],be=(n,o,t,a,i,r,l)=>({"scrollable-list--fade":n,"scrollable-list--ghost":o,"scrollable-list--light":t,"scrollable-list--dark":a,"scrollable-list--large":i,"scrollable-list--first":r,"scrollable-list--last":l});function xe(n,o){if(1&n){const t=e.RV6();e.j41(0,"div",5)(1,"button",6),e.bIt("click",function(){e.eBV(t);const i=e.XpG();return e.Njj(i.handlePrevClick())}),e.nrm(2,"app-icon",7),e.k0s(),e.j41(3,"button",8),e.bIt("click",function(){e.eBV(t);const i=e.XpG();return e.Njj(i.handleNextClick())}),e.nrm(4,"app-icon",9),e.k0s()()}if(2&n){const t=e.XpG();e.R7$(),e.AVh("hidden",t.isFirstInView),e.R7$(2),e.AVh("hidden",t.isLastInView)}}function y(n,o){const t=n.getBoundingClientRect(),a=o.getBoundingClientRect();return a.left>=t.left&&a.left<=t.right&&a.right>=t.left&&a.right<=t.right}let $=(()=>{var n;class o{get scrollableElements(){return this.scrollableItems.map(a=>a.elementRef.nativeElement)}constructor(a){this.changeDetectorRef=a,this.fade=!1,this.ghost=!1,this.theme="light",this.size="default",this.enableNavigation=!0,this.listScrolled=new e.bkB,this.navigationUpdated=new e.bkB,this.ngUnsubscribe=new _.B}ngOnInit(){}ngAfterViewInit(){(0,he.h)(this.scrollableItems.changes,(0,A.R)(window,"scroll"),(0,A.R)(this.scrollRef.nativeElement,"scroll")).pipe((0,de.Z)(1),(0,me.B)(125),(0,f.Q)(this.ngUnsubscribe)).subscribe(()=>{this.setButtonVisiblity()}),setTimeout(()=>this.setButtonVisiblity(),0)}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}handlePrevClick(){this.scroll("backwards")}handleNextClick(){this.scroll("forwards")}scroll(a){const i=this.scrollRef.nativeElement,r=this.scrollableElements,l=r.findIndex((c,C)=>{const W=y(i,c);if("forwards"===a){const O=r[C-1];if(!W&&!(0,h.isNil)(O))return y(i,O)}else{const O=r[C+1];if(!W&&!(0,h.isNil)(O))return y(i,O)}});l>-1&&(r[l].scrollIntoView({behavior:"smooth",block:"nearest",inline:"forwards"===a?"start":"end"}),this.selectedIndex=l,this.changeDetectorRef.markForCheck(),this.listScrolled.emit(l))}setButtonVisiblity(){const a=this.scrollRef.nativeElement,i=this.scrollableElements,r=i[0],l=i[i.length-1];if(!(0,h.isNil)(r)){const c=y(a,r);this.isFirstInView=c||0===a.scrollLeft}if(!(0,h.isNil)(l)){const c=y(a,l);this.isLastInView=c||a.scrollWidth/(a.offsetWidth+a.scrollLeft)-1<.01}this.changeDetectorRef.markForCheck(),this.navigationUpdated.emit([this.isFirstInView,this.isLastInView])}}return(n=o).\u0275fac=function(a){return new(a||n)(e.rXU(e.gRc))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-scrollable-list"]],contentQueries:function(a,i,r){if(1&a&&e.wni(r,S,5),2&a){let l;e.mGM(l=e.lsd())&&(i.scrollableItems=l)}},viewQuery:function(a,i){if(1&a&&(e.GBs(fe,7),e.GBs(ue,7)),2&a){let r;e.mGM(r=e.lsd())&&(i.container=r.first),e.mGM(r=e.lsd())&&(i.scrollRef=r.first)}},inputs:{fade:"fade",ghost:"ghost",theme:"theme",size:"size",enableNavigation:"enableNavigation"},outputs:{listScrolled:"listScrolled",navigationUpdated:"navigationUpdated"},ngContentSelectors:_e,decls:6,vars:10,consts:[["container",""],["scrollRef",""],[1,"scrollable-list",3,"ngClass"],[1,"scrollable-list__overflow"],["class","scrollable-list__nav",4,"ngIf"],[1,"scrollable-list__nav"],["type","button","app-button","","buttonShape","circle","buttonType","default",1,"scrollable-list__nav-item","scrollable-list__prev",3,"click"],["icon","chevron-left"],["type","button","app-button","","buttonShape","circle","buttonType","flat",1,"scrollable-list__nav-item","scrollable-list__next",3,"click"],["icon","chevron-right"]],template:function(a,i){1&a&&(e.NAR(),e.j41(0,"div",2,0)(2,"div",3,1),e.SdG(4),e.k0s(),e.DNE(5,xe,5,4,"div",4),e.k0s()),2&a&&(e.Y8G("ngClass",e.sGs(2,be,i.fade,i.ghost,"light"===i.theme,"dark"===i.theme,"large"===i.size,i.isFirstInView,i.isLastInView)),e.R7$(5),e.Y8G("ngIf",i.enableNavigation))},dependencies:[g.YU,g.bT,F.R],styles:[".scrollable-list[_ngcontent-%COMP%]{position:relative}.scrollable-list__overflow[_ngcontent-%COMP%]{overflow:auto;scrollbar-width:none}.scrollable-list__overflow[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.scrollable-list__nav[_ngcontent-%COMP%]{display:none}.scrollable-list__nav-item[_ngcontent-%COMP%]{position:absolute;z-index:1;top:50%;transform:translateY(-50%);font-size:20px;width:36px;height:36px;border-radius:50%;transition:opacity .25s,background-color .25s,font-size .25s}.scrollable-list__prev[_ngcontent-%COMP%]{left:-12px}.scrollable-list__next[_ngcontent-%COMP%]{right:-12px}.scrollable-list--fade.scrollable-list--light[_ngcontent-%COMP%]:not(.scrollable-list--first)   .scrollable-list__overflow[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(to right,rgba(255,255,255,0),rgb(255,255,255) 1em);mask-image:linear-gradient(to right,#fff0,#fff 1em)}.scrollable-list--fade.scrollable-list--light[_ngcontent-%COMP%]:not(.scrollable-list--last)   .scrollable-list__overflow[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(to left,rgba(255,255,255,0),rgb(255,255,255) 1em);mask-image:linear-gradient(to left,#fff0,#fff 1em)}.scrollable-list--fade.scrollable-list--dark[_ngcontent-%COMP%]:not(.scrollable-list--first)   .scrollable-list__overflow[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(to right,rgba(0,0,0,0),rgb(0,0,0) 1em);mask-image:linear-gradient(to right,#0000,#000 1em)}.scrollable-list--fade.scrollable-list--dark[_ngcontent-%COMP%]:not(.scrollable-list--last)   .scrollable-list__overflow[_ngcontent-%COMP%]{-webkit-mask-image:linear-gradient(to left,rgba(0,0,0,0),rgb(0,0,0) 1em);mask-image:linear-gradient(to left,#0000,#000 1em)}.scrollable-list--light[_ngcontent-%COMP%]   .scrollable-list__nav-item[_ngcontent-%COMP%]{color:#374a68;background:#fff;border:1px solid #d7e0ea}.scrollable-list--dark[_ngcontent-%COMP%]   .scrollable-list__nav-item[_ngcontent-%COMP%]{color:#fff;background:#101823;border:1px solid #283853}.scrollable-list--ghost[_ngcontent-%COMP%]   .scrollable-list__nav-item[_ngcontent-%COMP%]{background:none!important;border:none!important}.scrollable-list--large[_ngcontent-%COMP%]   .scrollable-list__nav-item[_ngcontent-%COMP%]{background:#131c2a66;font-size:20px;width:36px;height:36px;border:none;border-radius:50%}.scrollable-list--large[_ngcontent-%COMP%]   .scrollable-list__nav-item[_ngcontent-%COMP%]:hover{background:#131c2a99}.scrollable-list--large[_ngcontent-%COMP%]   .scrollable-list__prev[_ngcontent-%COMP%]{left:8px}.scrollable-list--large[_ngcontent-%COMP%]   .scrollable-list__next[_ngcontent-%COMP%]{right:8px}@media (hover: hover){.scrollable-list[_ngcontent-%COMP%]:hover   .scrollable-list__nav[_ngcontent-%COMP%]{display:block}.scrollable-list--large[_ngcontent-%COMP%]   .scrollable-list__nav-item[_ngcontent-%COMP%]:hover{background:#131c2a99}}"],changeDetection:0}),o})();var Ce=s(86225);const ve=()=>["/results/modules"],ye=(n,o)=>({categoryId:n,type:o});function ke(n,o){if(1&n&&e.nrm(0,"app-category-image",7),2&n){const t=e.XpG(2).$implicit,a=e.XpG();e.Y8G("color",a.isSelected(t.id)?"color":"mono")("category",t.id)}}function we(n,o){if(1&n&&(e.j41(0,"li")(1,"a",6),e.DNE(2,ke,1,2,"app-category-image",7),e.j41(3,"div",8),e.EFF(4),e.k0s()()()),2&n){const t=e.XpG().$implicit;e.R7$(),e.Y8G("routerLink",e.lJ4(4,ve))("queryParams",e.l_i(5,ye,t.id,t.type)),e.R7$(),e.vxM(2,t.icon?2:-1),e.R7$(2),e.JRh(t.title)}}function Pe(n,o){if(1&n&&(e.qex(0),e.DNE(1,we,5,8,"li",5),e.bVm()),2&n){const t=o.$implicit;e.R7$(),e.Y8G("ngIf","all"!==t.id)}}let Me=(()=>{var n;class o extends pe.P{}return(n=o).\u0275fac=(()=>{let t;return function(i){return(t||(t=e.xGo(n)))(i||n)}})(),n.\u0275cmp=e.VBU({type:n,selectors:[["app-gallery-categories-tags"]],features:[e.Vt3],decls:5,vars:1,consts:[["list",""],["size","large","theme","dark"],["data-test","exploreTags",1,"gallery-categories-tags"],[1,"gallery-categories-tags-menu"],[4,"ngFor","ngForOf"],[4,"ngIf"],["app-scrollable-list-item","",1,"flex","flex-row","items-center","gallery-categories-tags__item",3,"routerLink","queryParams"],[1,"gallery-categories-tags__image",3,"color","category"],[1,"gallery-categories-tags__title"]],template:function(a,i){1&a&&(e.j41(0,"app-scrollable-list",1,0)(2,"nav",2)(3,"ul",3),e.DNE(4,Pe,2,1,"ng-container",4),e.k0s()()()),2&a&&(e.R7$(4),e.Y8G("ngForOf",i.allCategories))},dependencies:[m.Wk,g.Sq,g.bT,$,S,Ce.f],styles:[".gallery-categories-tags-menu[_ngcontent-%COMP%]{display:flex;flex-direction:row;gap:16px}.gallery-categories-tags-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-of-type{margin-left:2px}.gallery-categories-tags-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-of-type{margin-right:2px}.gallery-categories-tags__item[_ngcontent-%COMP%]{color:#1c2a3f;font-size:.875rem;line-height:1.25rem;display:flex;align-items:center;width:100%;background:none;border:none;margin:2px auto;padding:16px 16px 16px 12px;white-space:pre;box-shadow:0 1px 2px 1px #0000001f;border-radius:8px;text-decoration:none}.gallery-categories-tags__item[_ngcontent-%COMP%]:hover, .gallery-categories-tags__item[_ngcontent-%COMP%]:focus{background-color:#eaeff5}.gallery-categories-tags__item[_ngcontent-%COMP%]:focus-visible{outline:#2d72dc solid 2px!important}.gallery-categories-tags__title[_ngcontent-%COMP%]{flex:1 1 auto;white-space:pre}.gallery-categories-tags__image[_ngcontent-%COMP%]{color:#374a68;margin-right:8px;flex:0 0 24px;width:24px;height:24px}"],changeDetection:0}),o})();var Z=s(22346),Oe=s(59e3),Re=s(97948),u=s(49969),d=s(89417),Se=s(21007),Fe=s(37737),E=s(30234),Be=s(27153);const je=[{icon:"search",tag:"Heart Disease",params:{categoryId:"all",query:"Heart Disease",type:"Category"}},{icon:"search",tag:"Eye Health",params:{categoryId:"all",query:"Eye Health",type:"Category"}},{icon:"search",tag:"Cancer Treatment",params:{categoryId:"all",query:"Cancer Treatment",type:"Category"}},{icon:"search",tag:"Pregnancy",params:{categoryId:"all",query:"Pregnancy",type:"Category"}},{icon:"search",tag:"Back Pain",params:{categoryId:"all",query:"Back Pain",type:"Category"}},{icon:"search",tag:"Allergies",params:{categoryId:"all",query:"Allergies",type:"Category"}},{icon:"search",tag:"Heart Blood Flow",params:{categoryId:"all",query:"Heart Blood Flow",type:"Category"}},{icon:"search",tag:"Nursing Procedures",params:{categoryId:"all",query:"Nursing Procedures",type:"Category"}},{icon:"search",tag:"Muscles",params:{categoryId:"all",query:"Muscles",type:"Category"}},{icon:"search",tag:"Physical Therapy",params:{categoryId:"all",query:"Physical Therapy",type:"Category"}}],Ie={icon:"search",tag:Be.n3[E.a.Zspace],params:{categoryId:E.a.Zspace,type:"Category"}};var k;const Ue=()=>["/results/modules"];function Ge(n,o){if(1&n&&(e.j41(0,"li",4)(1,"a",5),e.nrm(2,"app-icon",6),e.EFF(3),e.k0s()()),2&n){const t=o.$implicit;e.R7$(),e.Y8G("routerLink",e.lJ4(5,Ue))("queryParams",t.params),e.BMQ("data-test",t.tag+"HeroTag"),e.R7$(),e.Y8G("icon",t.icon),e.R7$(),e.SpI(" ",t.tag," ")}}class D{constructor(o){this.changeDetectorRef=o,this.ngUnsubscribe=new _.B}ngOnInit(){this.initTags()}initTags(){this.isZSpaceAccount$.pipe((0,f.Q)(this.ngUnsubscribe)).subscribe(o=>{const t=[...je];o&&t.unshift(Ie),this.tags=t,this.changeDetectorRef.markForCheck()})}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}}(k=D).\u0275fac=function(o){return new(o||k)(e.rXU(e.gRc))},k.\u0275cmp=e.VBU({type:k,selectors:[["app-hero-search-tags"]],decls:4,vars:4,consts:[[3,"ghost","fade","theme"],[1,"hero-search","flex"],[1,"hero-search__tags"],["class","hero-search__tag-group","app-scrollable-list-item","",4,"ngFor","ngForOf"],["app-scrollable-list-item","",1,"hero-search__tag-group"],[1,"hero-search__tag",3,"routerLink","queryParams"],["size","sm",1,"hero-search__tag-icon",3,"icon"]],template:function(o,t){1&o&&(e.j41(0,"app-scrollable-list",0)(1,"div",1)(2,"ul",2),e.DNE(3,Ge,4,6,"li",3),e.k0s()()()),2&o&&(e.Y8G("ghost",!0)("fade",!0)("theme","dark"),e.R7$(3),e.Y8G("ngForOf",t.tags))},dependencies:[F.R,$,S,g.Sq,m.Wk],styles:[".hero-search[_ngcontent-%COMP%]{width:100%;justify-content:center}.hero-search__tags[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;margin:4px}.hero-search__tag-group[_ngcontent-%COMP%]:nth-child(n+6){display:none}.hero-search__tag[_ngcontent-%COMP%]{display:block;border-radius:100px;padding:8px 12px;background:#131c2a99;color:#eaeff5;font-size:.75rem;line-height:1rem;text-decoration:none;white-space:nowrap}.hero-search__tag[_ngcontent-%COMP%]:hover{background:#131c2a}.hero-search__tag-icon[_ngcontent-%COMP%]{padding-right:8px}@media (max-width: 959px){.hero-search[_ngcontent-%COMP%]{justify-content:flex-start}.hero-search__tag-group[_ngcontent-%COMP%]:nth-child(n+6){display:unset}.hero-search__tag-icon[_ngcontent-%COMP%]{display:none;padding-right:0}}"],changeDetection:0}),function(n,o,t,a){var l,i=arguments.length,r=i<3?o:null===a?a=Object.getOwnPropertyDescriptor(o,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,o,t,a);else for(var c=n.length-1;c>=0;c--)(l=n[c])&&(r=(i<3?l(r):i>3?l(o,t,r):l(o,t))||r);i>3&&r&&Object.defineProperty(o,t,r)}([(0,p.l6)(T.q.isZSpaceAccount),function(n,o){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata("design:type",o)}(0,b.c)],D.prototype,"isZSpaceAccount$",void 0);var w,Q=function(n,o,t,a){var l,i=arguments.length,r=i<3?o:null===a?a=Object.getOwnPropertyDescriptor(o,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,o,t,a);else for(var c=n.length-1;c>=0;c--)(l=n[c])&&(r=(i<3?l(r):i>3?l(o,t,r):l(o,t))||r);return i>3&&r&&Object.defineProperty(o,t,r),r},J=function(n,o){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,o)};class B{constructor(o,t,a){this.router=o,this.vendorAnalyticsService=t,this.formBuilder=a,this.heroImages=[],this.multipleImages=!1,this.frontImage=!0,this.ngUnsubscribe=new _.B,this.searchPlaceholder=(0,e.vPA)(""),this.form=this.formBuilder.group({query:[""]})}ngOnInit(){this.horizontalBreakpoint$.pipe((0,f.Q)(this.ngUnsubscribe)).subscribe(o=>{this.searchPlaceholder.set(o<=z.m.Small?"Search by term, subject or phrase":"Search 3D models by term, subject, or phrase")})}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete(),this.interval&&window.clearInterval(this.interval)}onSearchSubmit(){this.handleSearch(this.form.value)}handleSearch(o){const t=o.query;this.vendorAnalyticsService.track("Homepage Search",{query:t}),this.router.navigate(["/results/modules"],{queryParams:{categoryId:"all",query:t,type:Re.n.Category}})}}(w=B).\u0275fac=function(o){return new(o||w)(e.rXU(m.Ix),e.rXU(Oe.e),e.rXU(d.ze))},w.\u0275cmp=e.VBU({type:w,selectors:[["app-explore-hero"]],decls:15,vars:4,consts:[[1,"explore-hero"],["src","assets/images/hero/biodigital-lady_480.png",1,"explore-hero__image"],[1,"explore-hero__content"],[1,"explore-hero__title"],[3,"ngSubmit","formGroup"],[1,"explore-hero__search-bar"],["for","explore-search",1,"sr-only"],[1,"explore-hero__search-icon"],["size","lg","icon","search-sparkle",3,"custom"],["data-test","explore-search","autocomplete","off","id","explore-search","appAutoFocus","","type","text","formControlName","query",1,"explore-hero__search-input",3,"placeholder"],["type","submit","app-button","","buttonType","flat","buttonTheme","light","tabindex","0",1,"hidden","mr-1","h-9"],["data-test","exploreHeroTags",1,"explore-hero__tags"]],template:function(o,t){1&o&&(e.j41(0,"div",0),e.nrm(1,"img",1),e.j41(2,"div",2)(3,"h1",3),e.EFF(4," Visualize anatomy, disease, and treatments in interactive 3D "),e.k0s(),e.j41(5,"form",4),e.bIt("ngSubmit",function(){return t.onSearchSubmit()}),e.j41(6,"div",5)(7,"label",6),e.EFF(8),e.k0s(),e.j41(9,"span",7),e.nrm(10,"app-icon",8),e.k0s(),e.nrm(11,"input",9),e.j41(12,"button",10),e.EFF(13," Search "),e.k0s()()(),e.nrm(14,"app-hero-search-tags",11),e.k0s()()),2&o&&(e.R7$(5),e.Y8G("formGroup",t.form),e.R7$(3),e.JRh(t.searchPlaceholder()),e.R7$(2),e.Y8G("custom",!0),e.R7$(),e.Y8G("placeholder",t.searchPlaceholder()))},dependencies:[Se.Q,Fe.B,F.R,d.qT,d.me,d.BC,d.cb,d.j4,d.JD,D],styles:[".explore-hero[_ngcontent-%COMP%]{background:#131c2a;display:flex;height:480px;justify-content:center;align-items:center;padding:0 20px;position:relative;background:radial-gradient(60.09% 60.09% at 50% 45.75%,#0b3681,#031529)}.explore-hero__image[_ngcontent-%COMP%]{position:absolute;right:0;max-height:100%}.explore-hero__content[_ngcontent-%COMP%]{max-width:880px;position:relative;color:#fff;text-align:center;text-shadow:2px 2px 4px rgba(0,0,0,.5)}.explore-hero__title[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem;font-weight:500}.explore-hero__description[_ngcontent-%COMP%]{font-size:1.25rem;line-height:1.75rem;line-height:32px;font-weight:400}.explore-hero__search-bar[_ngcontent-%COMP%]{border-radius:8px;max-width:680px;display:flex;align-items:center;margin:32px auto 0;background-color:#fff;text-shadow:none;box-shadow:0 0 0 6px #1c2a3f66}.explore-hero__search-bar[_ngcontent-%COMP%]:focus-within{outline:#2d72dc solid 2px!important}.explore-hero__search-icon[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;color:#61779e;padding-left:12px;flex:0 0 36px;-webkit-user-select:none;user-select:none}.explore-hero__search-input[_ngcontent-%COMP%]{display:block;flex:1 1 auto;height:44px;width:100%;border:0;margin:0;border-radius:inherit;font-size:1rem;line-height:1.5rem;padding:12px;color:#283853}.explore-hero__search-input[_ngcontent-%COMP%]:focus{outline:0}.explore-hero__search-input[_ngcontent-%COMP%]::placeholder{color:#374a6880}.explore-hero__tags[_ngcontent-%COMP%]{padding-top:14px;display:block;margin:0 auto;max-width:680px}@media (min-width: 960px){.explore-hero__top-image[_ngcontent-%COMP%], .explore-hero__bottom-image[_ngcontent-%COMP%]{object-position:center!important}}@media (max-width: 959px){.explore-hero[_ngcontent-%COMP%]{height:380px}.explore-hero__content[_ngcontent-%COMP%]{max-width:calc(100% - 128px)}.explore-hero__title[_ngcontent-%COMP%]{font-size:1.875rem;line-height:2.25rem}.explore-hero__description[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem}}@media (max-width: 640px){.explore-hero__content[_ngcontent-%COMP%]{max-width:calc(100% - 40px)}.explore-hero__title[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.explore-hero__description[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.25rem}}"],data:{animation:[(0,u.hZ)("crossfade",[(0,u.wk)("true",(0,u.iF)({opacity:"1"})),(0,u.wk)("false",(0,u.iF)({opacity:"0"})),(0,u.kY)("* => *",(0,u.i0)("1s ease-out"))])]},changeDetection:0}),Q([(0,p.l6)(x.k.getProfile),J("design:type",b.c)],B.prototype,"profile$",void 0),Q([(0,p.l6)(I.V.getHorizontalBreakpoint),J("design:type",b.c)],B.prototype,"horizontalBreakpoint$",void 0);var P,$e=s(83513),Ee=s(44971);const Ne=["featureContent"],He=n=>({"feature-row--loading":n});function Xe(n,o){if(1&n&&(e.j41(0,"div",12),e.EFF(1),e.k0s()),2&n){const t=e.XpG();e.R7$(),e.JRh(t.description)}}function Ye(n,o){if(1&n){const t=e.RV6();e.j41(0,"li",13)(1,"app-gallery-card",14),e.nI1(2,"async"),e.bIt("bookmarkAction",function(i){e.eBV(t);const r=e.XpG();return e.Njj(r.handleBookmarkAction(i))})("selectBookmark",function(i){e.eBV(t);const r=e.XpG();return e.Njj(r.handleSelect(i))}),e.k0s()()}if(2&n){const t=o.$implicit,a=e.XpG();e.R7$(),e.Y8G("bookmark",t)("loading",a.loading)("responsive",e.bMT(2,3,a.horizontalBreakpoint$)<=a.horizontalBreakpoint.Medium)}}class j{constructor(o){this.bookmarkActionsService=o,this.title="",this.description="",this.categoryURL="",this.bookmarks=[],this.loading=!1,this.horizontalBreakpoint=z.m}ngOnInit(){this.bookmarks=this.bookmarks.slice(0,10)}handleSelect(o){this.bookmarkActionsService.view(o)}handleBookmarkAction(o){this.bookmarkActionsService.handleBookmarkAction(o)}trackCard(o,t){return t.id}}(P=j).\u0275fac=function(o){return new(o||P)(e.rXU($e.h))},P.\u0275cmp=e.VBU({type:P,selectors:[["app-feature-row"]],viewQuery:function(o,t){if(1&o&&e.GBs(Ne,5),2&o){let a;e.mGM(a=e.lsd())&&(t.featureContent=a.first)}},inputs:{title:"title",description:"description",categoryURL:"categoryURL",bookmarks:"bookmarks",loading:"loading"},ngContentSelectors:["*"],decls:14,vars:9,consts:[["featureContent",""],["data-test","featureRow",1,"feature-row",3,"ngClass"],[1,"feature-row__header"],[1,"feature-row__title-row",3,"href"],[1,"feature-row__title","font-semibold"],[1,"feature-row__see-all"],["icon","chevron-right","size","sm"],["class","feature-row__description",4,"ngIf"],[1,"feature-row__container"],["size","large","theme","dark"],[1,"feature-row__content"],["class","feature-row__card","app-scrollable-list-item","",4,"ngFor","ngForOf","ngForTrackBy"],[1,"feature-row__description"],["app-scrollable-list-item","",1,"feature-row__card"],[3,"bookmarkAction","selectBookmark","bookmark","loading","responsive"]],template:function(o,t){1&o&&(e.NAR(),e.j41(0,"div",1)(1,"div",2)(2,"a",3)(3,"h2",4),e.EFF(4),e.k0s(),e.j41(5,"div",5),e.nrm(6,"app-icon",6),e.k0s()(),e.DNE(7,Xe,2,1,"div",7),e.k0s(),e.SdG(8),e.j41(9,"div",8)(10,"app-scrollable-list",9)(11,"ul",10,0),e.DNE(13,Ye,3,5,"li",11),e.k0s()()()()),2&o&&(e.Y8G("ngClass",e.eq3(7,He,t.loading)),e.BMQ("data-loading",!0===t.loading),e.R7$(2),e.Y8G("href",t.categoryURL,e.B4B),e.R7$(2),e.JRh(t.title),e.R7$(3),e.Y8G("ngIf",t.description),e.R7$(6),e.Y8G("ngForOf",t.bookmarks)("ngForTrackBy",t.trackCard))},dependencies:[F.R,$,S,g.YU,g.Sq,g.bT,Ee.u,g.Jj],styles:['@keyframes _ngcontent-%COMP%_loaderShimmer{0%{background-position:100% 0}to{background-position:-100% 0}}.feature-row[_ngcontent-%COMP%]{width:100%}.feature-row__header[_ngcontent-%COMP%]{padding-bottom:8px}.feature-row__title-row[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem;cursor:pointer;text-decoration:none;margin-bottom:8px;border-radius:4px}.feature-row__title-row[_ngcontent-%COMP%]:hover{text-decoration:underline;color:#1c2a3f}.feature-row__title[_ngcontent-%COMP%]{color:#1c2a3f;display:inline}.feature-row__see-all[_ngcontent-%COMP%]{font-size:1.25rem;line-height:1.75rem;color:#1c2a3f;display:inline;padding-left:12px}.feature-row__description[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.25rem;font-weight:400;color:#374a68;padding-top:4px}.feature-row__container[_ngcontent-%COMP%]{position:relative}.feature-row__container[_ngcontent-%COMP%]:hover   .feature-row__nav[_ngcontent-%COMP%]{opacity:1}.feature-row__content[_ngcontent-%COMP%]{height:100%;display:flex;gap:24px;padding:8px 2px}.feature-row__card[_ngcontent-%COMP%]{width:220px;min-width:220px;max-width:220px;height:-moz-fit-content;height:fit-content}.feature-row--loading[_ngcontent-%COMP%]{pointer-events:none}.feature-row--loading[_ngcontent-%COMP%]   .feature-row__title[_ngcontent-%COMP%]:after{content:"";display:block;width:100%;height:auto;border-radius:100px;background:#eaeff5;background-image:linear-gradient(to right,#eaeff5,#f9fafd 20%,#eaeff5 40% 100%);background-repeat:no-repeat;background-size:300% 100%;display:inline-block;position:relative;animation:_ngcontent-%COMP%_loaderShimmer 1.5s infinite forwards;width:420px;max-width:75%;height:24px}.feature-row--loading[_ngcontent-%COMP%]   .feature-row__see-all[_ngcontent-%COMP%], .feature-row--loading[_ngcontent-%COMP%]   .feature-row__description[_ngcontent-%COMP%]{display:none}@media (max-width: 959px){.feature-row__title[_ngcontent-%COMP%]{font-size:1.25rem;line-height:1.75rem}.feature-row__see-all[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem}}'],changeDetection:0}),function(n,o,t,a){var l,i=arguments.length,r=i<3?o:null===a?a=Object.getOwnPropertyDescriptor(o,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,o,t,a);else for(var c=n.length-1;c>=0;c--)(l=n[c])&&(r=(i<3?l(r):i>3?l(o,t,r):l(o,t))||r);i>3&&r&&Object.defineProperty(o,t,r)}([(0,p.l6)(I.V.getHorizontalBreakpoint),function(n,o){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata("design:type",o)}(0,b.c)],j.prototype,"horizontalBreakpoint$",void 0);var Ae=s(96931);function Ze(n,o){1&n&&e.nrm(0,"app-zspace-alert")}let Qe=(()=>{var n;class o{constructor(a,i,r){this.exploreService=a,this.bookmarksService=i,this.changeDetectorRef=r,this.zspaceRestricted=!1,this.ngUnsubscribe=new _.B}ngOnInit(){this.zspaceRestricted=this.bookmarksService.getZSpaceRestriction()!==E.O.None,this.zSpaceShowcase=this.exploreService.createMockShowcase(this.bookmarksService.createMockBookmarks()),this.exploreService.getZSpaceShowcase().pipe((0,f.Q)(this.ngUnsubscribe)).subscribe(a=>{this.zSpaceShowcase=a,this.changeDetectorRef.markForCheck()})}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}}return(n=o).\u0275fac=function(a){return new(a||n)(e.rXU(H.z),e.rXU(Y.x),e.rXU(e.gRc))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-zspace-showcase"]],decls:2,vars:6,consts:[["data-test","zSpaceFeatureRow",3,"title","description","categoryURL","bookmarks","loading"],[4,"ngIf"]],template:function(a,i){1&a&&(e.j41(0,"app-feature-row",0),e.DNE(1,Ze,1,0,"app-zspace-alert",1),e.k0s()),2&a&&(e.Y8G("title",i.zSpaceShowcase.title)("description",i.zSpaceShowcase.description)("categoryURL",i.zSpaceShowcase.url)("bookmarks",i.zSpaceShowcase.bookmarks)("loading",i.zSpaceShowcase.loading),e.R7$(),e.Y8G("ngIf",i.zspaceRestricted))},dependencies:[Ae.u,g.bT,j]}),o})();var M;const Ke=n=>({categoryId:n,type:"Category"});function qe(n,o){if(1&n){const t=e.RV6();e.j41(0,"div",7)(1,"app-message-toggle",8),e.bIt("handleDismiss",function(){e.eBV(t);const i=e.XpG();return e.Njj(i.handleMessageDismiss())}),e.j41(2,"div",9),e.EFF(3,"What's New"),e.k0s(),e.j41(4,"div",10),e.EFF(5," We've introduced a brand new design to make it easier than ever to browse the Human Library and explore in 3D. "),e.j41(6,"a",11),e.EFF(7,"Learn More."),e.k0s()()()()}if(2&n){const t=e.XpG();e.R7$(),e.Y8G("shown",t.showNotification)("dismiss",!0)}}function et(n,o){if(1&n){const t=e.RV6();e.j41(0,"div",12)(1,"app-gallery-categories-tags",13),e.bIt("categorySelected",function(i){e.eBV(t);const r=e.XpG();return e.Njj(r.handleCategorySelected(i))}),e.k0s()()}}function tt(n,o){1&n&&e.nrm(0,"app-zspace-showcase")}function ot(n,o){if(1&n&&e.nrm(0,"app-featured-card",16),2&n){const t=o.$implicit;e.Y8G("image",t.image)("featuredIcon",t.featuredIcon)("outerColor",t.outerColor)("innerColor",t.innerColor)("title",t.title)("subtitle",t.subtitle)("metadata",t.metadata)("queryParams",e.eq3(8,Ke,t.id))}}function nt(n,o){if(1&n&&(e.j41(0,"div")(1,"h2",14),e.EFF(2,"Expert Collections"),e.k0s(),e.j41(3,"div",15),e.Z7z(4,ot,1,10,"app-featured-card",16,e.Vm6),e.k0s()()),2&n){const t=e.XpG();e.R7$(4),e.Dyx(t.siteFeaturedCategories)}}function at(n,o){if(1&n&&e.nrm(0,"app-feature-row",18),2&n){const t=e.XpG().$implicit;e.Y8G("title",t.title)("description",t.description)("categoryURL",t.url)("bookmarks",t.bookmarks)("loading",t.loading)}}function rt(n,o){if(1&n&&(e.qex(0),e.DNE(1,at,1,5,"app-feature-row",17),e.bVm()),2&n){const t=o.$implicit;e.R7$(),e.Y8G("ngIf",t.loading||t.bookmarks.length>0)}}function it(n,o){if(1&n&&e.nrm(0,"app-feature-row",19),2&n){const t=o.$implicit;e.Y8G("title",t.title)("description",t.description)("categoryURL",t.url)("bookmarks",t.bookmarks)("loading",t.loading)}}class V{constructor(o,t,a,i,r,l){this.store=o,this.actions=t,this.storageService=a,this.exploreService=i,this.bookmarksService=r,this.changeDetectorRef=l,this.envApplication=ee.c,this.nativePlatform=te.I,this.horizontalBreakpoint=z.m,this.siteFeaturedCategories=(0,se.e7)("expert collections",this.store.selectSnapshot(x.k.getUserLanguage)),this.ngUnsubscribe=new _.B,this.showNotification=!1,this.privateShowcases=[],this.exploreShowcase=[]}ngOnInit(){this.showNotification=!1,this.privateShowcases=this.createMockShowcases(2),this.exploreShowcase=this.createMockShowcases(4),this.initFeatureRows()}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}initFeatureRows(){const o=this.store.select(x.k.getProfile),t=this.store.select(T.q.getOrganization),a=this.store.select(x.k.getUserLanguage);this.actions.pipe((0,f.Q)(this.ngUnsubscribe),(0,p.xi)(R.x$,R.DN,R.te,R.lN),(0,X.n)(()=>(0,K.y)([o,t,a])),(0,X.n)(([r,l,c])=>this.bookmarksService.getShowcase(r,l,c))).subscribe(r=>{this.privateShowcases=r,this.changeDetectorRef.markForCheck()}),(0,q.z)([o,t]).pipe((0,ne.p)(([r,l])=>!(0,h.isNil)(r)&&((0,U.Q)(r.data)&&!(r.data.organizations.length>0)||!(0,h.isNil)(l))),(0,ae.F)(([r,l],[c,C])=>this.checkSameProfile(r,c)&&l?.id===C?.id),(0,re.M)(([r,l])=>{const c=(0,U.Q)(r.data)&&!(0,h.isNil)(l)?2:1;this.privateShowcases=this.createMockShowcases(c),this.changeDetectorRef.markForCheck()}),(0,ie.Z)(([r,l])=>{const c=this.store.selectSnapshot(x.k.getUserLanguage);return this.bookmarksService.getShowcase(r,l,c)}),(0,f.Q)(this.ngUnsubscribe)).subscribe(r=>{this.privateShowcases=r,this.changeDetectorRef.markForCheck()});const i=this.store.selectSnapshot(x.k.getUserLanguage);this.exploreService.getShowcase(i).pipe((0,f.Q)(this.ngUnsubscribe)).subscribe(r=>{this.exploreShowcase=r,this.changeDetectorRef.markForCheck()})}handleMessageDismiss(){this.showNotification=!1,this.storageService.setLocalItem(L.UT.ExploreRedesignMessage,!0)}handleCategorySelected(o){this.store.dispatch(new oe.w.SearchCategory(o))}createMockShowcases(o){const t=this.bookmarksService.createMockBookmarks();return this.exploreService.createMockShowcases(o,t)}checkSameProfile(o,t){return(0,U.Q)(t.data)?o.data.email===t.data.email:o.data.session_source_id===t.data.session_source_id}}(M=V).\u0275fac=function(o){return new(o||M)(e.rXU(p.il),e.rXU(p.En),e.rXU(L.n$),e.rXU(H.z),e.rXU(Y.x),e.rXU(e.gRc))},M.\u0275cmp=e.VBU({type:M,selectors:[["app-categories"]],decls:10,vars:9,consts:[[1,"categories"],["class","m-8",4,"ngIf"],["class","px-5 py-3 mt-4 mb-2 categories__tags",4,"ngIf"],[1,"categories__container"],[4,"appFlagZSpace"],[4,"ngFor","ngForOf"],["data-test","exploreFeatureRow",3,"title","description","categoryURL","bookmarks","loading",4,"ngFor","ngForOf"],[1,"m-8"],["type","notification","icon","info-circle","theme","light",3,"handleDismiss","shown","dismiss"],[1,"text-base","font-semibold"],[1,"text-sm"],["href","https://support.biodigital.com/hc/en-us/articles/1500005098521","target","_blank",1,"underline","text-link"],[1,"px-5","py-3","mt-4","mb-2","categories__tags"],[3,"categorySelected"],[1,"pb-3","text-2xl","font-semibold"],[1,"flex","flex-col","w-full","gap-10","md:flex-row"],["routerLink","/results/modules",1,"flex-grow",3,"image","featuredIcon","outerColor","innerColor","title","subtitle","metadata","queryParams"],["data-test","personalFeatureRow",3,"title","description","categoryURL","bookmarks","loading",4,"ngIf"],["data-test","personalFeatureRow",3,"title","description","categoryURL","bookmarks","loading"],["data-test","exploreFeatureRow",3,"title","description","categoryURL","bookmarks","loading"]],template:function(o,t){1&o&&(e.j41(0,"div",0),e.nrm(1,"app-explore-hero"),e.DNE(2,qe,8,2,"div",1)(3,et,2,0,"div",2),e.nI1(4,"async"),e.j41(5,"div",3),e.DNE(6,tt,1,0,"app-zspace-showcase",4)(7,nt,6,0,"div")(8,rt,2,1,"ng-container",5)(9,it,1,5,"app-feature-row",6),e.k0s()()),2&o&&(e.AVh("categories--notification",t.showNotification),e.R7$(2),e.Y8G("ngIf",t.showNotification),e.R7$(),e.Y8G("ngIf",e.bMT(4,7,t.horizontalBreakpoint$)<=t.horizontalBreakpoint.Medium),e.R7$(4),e.vxM(7,t.siteFeaturedCategories.length?7:-1),e.R7$(),e.Y8G("ngForOf",t.privateShowcases),e.R7$(),e.Y8G("ngForOf",t.exploreShowcase))},dependencies:[G,ge.X,g.Sq,g.bT,m.Wk,Me,Z.K,B,j,Qe,g.Jj],styles:[".categories[_ngcontent-%COMP%]{padding-bottom:80px}.categories__container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:60px;padding:0 20px;max-width:1240px;margin:54px auto 36px}.categories--notification[_ngcontent-%COMP%]   .categories__group[_ngcontent-%COMP%]:first-child{margin-top:0}"],changeDetection:0}),function(n,o,t,a){var l,i=arguments.length,r=i<3?o:null===a?a=Object.getOwnPropertyDescriptor(o,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,o,t,a);else for(var c=n.length-1;c>=0;c--)(l=n[c])&&(r=(i<3?l(r):i>3?l(o,t,r):l(o,t))||r);i>3&&r&&Object.defineProperty(o,t,r)}([(0,p.l6)(I.V.getHorizontalBreakpoint),function(n,o){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata("design:type",o)}(0,b.c)],V.prototype,"horizontalBreakpoint$",void 0);var st=s(85446),lt=s(20736),ct=s(22083);const gt=[{path:"",component:lt.m,canActivate:[st.q],data:{showHeader:!0,siteHeaderType:ct.D.Application,overlayHeader:!0,fixedHeight:!1},children:[{path:"",component:V,data:{title:"Home"}}]}];let pt=(()=>{var n;class o{}return(n=o).\u0275fac=function(a){return new(a||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[m.iI.forChild(gt),m.iI]}),o})();var ht=s(21604),dt=s(45189),mt=s(76549),ft=s(28107),ut=s(8377),_t=s(45367);let bt=(()=>{var n;class o{constructor(){this.title=(0,e.hFB)(""),this.description=(0,e.hFB)(""),this.backgroundImagePosition=(0,e.hFB)("end"),this.backgroundColor=(0,e.hFB)("transparent"),this.backgroundImage=(0,e.hFB)(""),this.linkTitle=(0,e.hFB)(""),this.linkUrl=(0,e.hFB)(""),this.textColor=(0,e.hFB)("dark"),this.textHorizontalPosition=(0,e.hFB)("center"),this.textVerticalPosition=(0,e.hFB)("center"),this.backgroundStyle=(0,e.EWP)(()=>(this.backgroundImage()?`url(${this.backgroundImage()}), `:"")+this.backgroundColor()),this.hostClass=(0,e.EWP)(()=>`promo-banner--image-${this.backgroundImagePosition()} promo-banner--text-horizontal-${this.textHorizontalPosition()} promo-banner--text-vertical-${this.textVerticalPosition()} promo-banner--text-${this.textColor()}`)}}return(n=o).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=e.VBU({type:n,selectors:[["app-promo-banner"]],inputs:{title:[e.Mj6.SignalBased,"title"],description:[e.Mj6.SignalBased,"description"],backgroundImagePosition:[e.Mj6.SignalBased,"backgroundImagePosition"],backgroundColor:[e.Mj6.SignalBased,"backgroundColor"],backgroundImage:[e.Mj6.SignalBased,"backgroundImage"],linkTitle:[e.Mj6.SignalBased,"linkTitle"],linkUrl:[e.Mj6.SignalBased,"linkUrl"],textColor:[e.Mj6.SignalBased,"textColor"],textHorizontalPosition:[e.Mj6.SignalBased,"textHorizontalPosition"],textVerticalPosition:[e.Mj6.SignalBased,"textVerticalPosition"]},standalone:!0,features:[e.aNF],decls:9,vars:8,consts:[["promoBanner",""],[1,"promo-banner"],[1,"promo-banner__content"],[1,"promo-banner__title"],[1,"promo-banner__description"],[1,"button","button--large","button--primary",2,"width","fit-content",3,"href"]],template:function(a,i){1&a&&(e.j41(0,"div",1,0)(2,"div",2)(3,"h1",3),e.EFF(4),e.k0s(),e.j41(5,"p",4),e.EFF(6),e.k0s(),e.j41(7,"a",5),e.EFF(8),e.k0s()()()),2&a&&(e.HbH(i.hostClass()),e.xc7("background",i.backgroundStyle()),e.R7$(4),e.JRh(i.title()),e.R7$(2),e.JRh(i.description()),e.R7$(),e.Y8G("href",i.linkUrl(),e.B4B),e.R7$(),e.JRh(i.linkTitle()))},dependencies:[g.MD],styles:[".promo-banner[_ngcontent-%COMP%]{--text-color: #f9fafd;--text-shadow: 2px 2px 4px rgba(0, 0, 0, .5);--content-align: center;--content-justify: center;--text-align: center;--image-background-position: right center;border:1px solid #d7e0ea;border-radius:4px;display:flex;flex-direction:column;justify-content:var(--content-justify);align-items:var(--content-align);min-height:360px;background-repeat:no-repeat!important;background-position:var(--image-background-position)!important;background-size:auto 100%!important;padding:20px}.promo-banner--text-light[_ngcontent-%COMP%]{--text-color: #f9fafd;--text-shadow: 2px 2px 4px rgba(0, 0, 0, .5)}.promo-banner--text-dark[_ngcontent-%COMP%]{--text-color: #131c2a;--text-shadow: 1px 2px rgba(255, 255, 255, .6)}.promo-banner--text-horizontal-start[_ngcontent-%COMP%]{--content-align: flex-start;--text-align: flex-start}.promo-banner--text-horizontal-center[_ngcontent-%COMP%]{--content-align: center;--text-align: center}.promo-banner--text-horizontal-end[_ngcontent-%COMP%]{--content-align: flex-end;--text-align: flex-start}.promo-banner--text-vertical-start[_ngcontent-%COMP%]{--content-justify: flex-start}.promo-banner--text-vertical-center[_ngcontent-%COMP%]{--content-justify: center}.promo-banner--text-vertical-end[_ngcontent-%COMP%]{--content-justify: flex-end}.promo-banner--image-start[_ngcontent-%COMP%]{--image-background-position: left center}.promo-banner--image-center[_ngcontent-%COMP%]{--image-background-position: center center}.promo-banner--image-end[_ngcontent-%COMP%]{--image-background-position: right center}.promo-banner__content[_ngcontent-%COMP%]{max-width:556px;display:flex;flex-direction:column;align-items:var(--text-align)}.promo-banner__title[_ngcontent-%COMP%]{font-size:44px;font-weight:700;margin-bottom:8px;color:var(--text-color);text-shadow:var(--text-shadow)}.promo-banner__description[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem;font-weight:300;margin-bottom:28px;color:var(--text-color);text-shadow:var(--text-shadow)}"],changeDetection:0}),o})(),xt=(()=>{var n;class o{}return(n=o).\u0275fac=function(a){return new(a||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[ht.G,dt.G,g.MD,m.iI,pt,ft.R,mt.k,ut.l,_t.P,d.X1,bt,Z.K]}),o})()}}]);