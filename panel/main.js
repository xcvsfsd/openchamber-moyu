(()=>{var V="openchamber.sdk",N=1;var CT=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function DE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(I)=>{let X=I.target===_?S:I.target;if(!(X instanceof Element))return;if(!X.hasAttribute("data-oc-scrolling"))X.setAttribute("data-oc-scrolling","");let P=O.get(X);if(P!==void 0)clearTimeout(P);O.set(X,setTimeout(()=>{O.delete(X),X.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var CS=`(${DE.toString()})(document);`;var XT=128,GT=65536;var w_=128;var b_=65536;var DT=8000,VT=192000,NT=120000;var VE=(_)=>{let S=[],O=0,I=0;return{push:(X)=>{S.push(X),I+=X.length;while(I-O>_&&S.length>1){let P=S.shift();I-=P?.length??0,O=0}},pull:(X)=>{let P=0;while(P<X.length&&S.length>0){let z=S[0],Q=Math.min(X.length-P,z.length-O);if(X.set(z.subarray(O,O+Q),P),P+=Q,O+=Q,O>=z.length)S.shift(),I-=z.length,O=0}X.fill(0,P)},clear:()=>{S.length=0,O=0,I=0},get size(){return I-O}}};var WE=/^[a-z][a-z0-9-]{0,39}$/;var NE=(_)=>Object(_)===_&&!Array.isArray(_),PT=(_,S)=>Object.keys(_).every((O)=>S.includes(O)),PE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,LE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,QE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let O of _){if(!NE(O)||!WE.test(O.id)||!PE(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(S.has(O.id))return!1;if(S.add(O.id),O.kind==="button"){if(!PT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!PT(O,["kind","id","label","value","options","disabled"]))return!1;if(!LE(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let I=new Set;for(let X of O.options){if(!NE(X)||!PT(X,["value","label"])||!LE(X.value)||!PE(X.label)||I.has(X.value))return!1;I.add(X.value)}if(!I.has(O.value))return!1}return!0};var YE=["{id}","{segment}","{segments+}"];var oS=new Set(YE);var KE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var iS=new Set(KE);var q_=20000000,y_=256;var LT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,FE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==S.bytes[O])return!1;return!0};var BE=/^[A-Za-z0-9_-]{1,80}$/;var $E=["left","right","top","bottom"];var ZE=(_,S=0,O={remaining:16000})=>{if(--O.remaining<0||S>=32)return!1;if(_===null)return!0;let I=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let X of I)if(!ZE(X,S+1,O))return!1;return!0},WT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(WT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(WT)}return String(_)===_||Number.isFinite(_)},QT=(_)=>{try{if(String(_.id)!==_.id||!BE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!$E.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!ZE(_.data)||!WT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var KT=2000;var fE=["file","directory","other","missing"],FT=(_)=>Boolean(_&&"sessionId"in _),BT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var JE=/^[0-9a-f]{7,64}$/i,$T=(_)=>JE.test(_),g_=500,h_=32000,kE=16000,HE=128,jE=200,xE=2000,wE=16000,bE=80,qE=200,yE=16000;var gE=2000;var ZT=20000,m_=1024,c_=2000000;var d_=64000,p_=8000,zT=4000;var fT=960000;var hE=999,mE=1e4,$_=500,cE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],dE=["stopped","starting","ready","failed"],GS=new Set(cE),pE=(_)=>GS.has(_),vE=(_)=>_&&pE(_)?_:"HOST_REJECTED",C_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(C_);if(Object(_)===_)return Object.values(_).every(C_);return!1},uE=(_)=>C_(_)&&JSON.stringify(_).length<=yE,zE=(_)=>_?.trim().slice(0,qE)??"",X_=(_)=>{let S=_.id.trim().slice(0,HE),O=_.title.trim().slice(0,jE),I=_.url.trim().slice(0,xE),X=_.text?.trim().slice(0,wE),P=_.author?.trim().slice(0,bE),z=_.kind==="pull"?"pull":"issue",Q={providerId:_.providerId.trim(),id:S,title:O||S,url:I,kind:z};if(X)Q.text=X;if(P)Q.author=P;if(z==="pull"){let j=zE(_.branches?.head),x=zE(_.branches?.base);if(j&&x)Q.branches={head:j,base:x}}if(uE(_.data))Q.data=_.data;return Q},JT=(_)=>{let S=X_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},kT=(_)=>{let S={text:_.text.trim().slice(0,kE)};if(_.send)S.send=!0;return S},HT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(hE,Math.max(0,Math.round(_)))},jT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(mE,Math.max(0,Math.ceil(_)))};var G_=(_)=>_.length>0&&_.length<=m_&&!_.includes("\x00")&&!_.includes("\\");var v_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>gE)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},DS=new Set(dE),xT=(_)=>Boolean(_&&"status"in _&&DS.has(String(_.status))&&!("body"in _)),u_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),wT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),bT=(_)=>Boolean(_&&"written"in _&&_.written===!0),qT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),VS=new Set(fE),yT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&VS.has(String(_.kind))&&Number.isFinite(_.size)),gT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),NS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),PS=(_)=>Object(_)===_?_:null,YT=(_)=>String(_)===_&&_.length>0,LS=(_)=>{if(!YT(_.id))return null;if(_.ok===!0){let S={channel:V,v:N,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&YT(_.error))return{channel:V,v:N,type:"result",id:_.id,ok:!1,error:_.error,code:vE(YT(_.code)?_.code:void 0)};return null},hT=(_)=>{let S=PS(_);if(!S||S.channel!==V||S.v!==N)return null;if(S.type==="result")return LS(S);if(!NS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var lE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),WS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var aE=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),l_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${m_} characters without NUL or backslash.`)),a_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},D=(_)=>{return _.value+=1,`oc-${_.value}`},mT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===S.parent),I=_.requestTimeoutMs??ZT,X=new Set,P=new Set,z=new Set,Q=new Set,j=new Set,x=new Set,u=new Set,s=new Set,T_=new Set,t=new Set,f_=new Set,A_=new Set,OT=[],W_=null,Q_=null,J_=new Set,k_=new Set,Y_=null,K_=null,AT=!1,U_=new Map,R_=new Map,M_=new Map,c=!1,G={value:0},C=null,l=null,F_=!1,B_=!1,TE=null,g=null,EE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},w=(T)=>{S.parent.postMessage(T,"*")},SE=()=>{if(c||S.parent===S||A_.size===0||C?.features?.lateGenerateResults!==!0)return;w({channel:V,v:N,type:"generate-late-listen"})},Y=(T,E)=>{for(let R of T)try{R(E)}catch(U){console.error(U)}},OE=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let E=hT(T.data);if(!E)return;if(E.type==="workspace"){let U=R_.get(E.payload.subscriptionId);if(U)Y([U],E.payload.snapshot);return}if(E.type==="shells"){let U=M_.get(E.payload.subscriptionId);if(U)Y([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){g?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=g;if(!U)return;g=null,U.release(),Y(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(C=E.payload,l=EE(E.payload.session),Y(X,E.payload),Y(P,E.payload.directory),Y(z,E.payload.session),l)Y(Q,l);if(Y(j,E.payload.connection),Y(x,E.payload.settings),Y(u,E.payload.item),E.payload.block)Y(s,E.payload.block);SE();return}if(E.type==="service-event"){Y(T_,E.payload);return}if(E.type==="generate-late"){if(A_.size===0)OT.push(E.payload);else Y(A_,E.payload);return}if(E.type==="directory"){if(C)C={...C,directory:E.payload.directory};Y(P,E.payload.directory);return}if(E.type==="session"){if(C)C={...C,session:E.payload.session};if(!E.payload.session)l=null;else if(l?.sessionId!==E.payload.session.id)l=EE(E.payload.session);Y(z,E.payload.session);return}if(E.type==="session-lifecycle"){l=E.payload,Y(Q,E.payload);return}if(E.type==="connection"){if(C)C={...C,connection:E.payload.connection};Y(j,E.payload.connection);return}if(E.type==="settings"){if(C)C={...C,settings:E.payload.settings};Y(x,E.payload.settings);return}if(E.type==="item"){if(C)C={...C,item:E.payload.item};Y(u,E.payload.item);return}if(E.type==="status-control-event"){Y(t,E.payload);return}if(E.type==="popover-closed"){Y(f_,E.payload);return}if(E.type==="action"){let U=(W)=>{if(!c)w({channel:V,v:N,type:"action-result",id:E.id,payload:W})},L=Q_;if(!L){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>L(E.payload)).then(()=>U({ok:!0}),(W)=>{let K=(W instanceof Error?W.message:String(W)).trim();U({ok:!1,error:(K||"Action failed.").slice(0,$_)})});return}if(E.type==="file-open"){let U=E.payload;if(K_&&FE(K_,U))return;K_=U,Y(J_,E.payload);return}if(E.type==="file-saved"){Y(k_,E.payload.version);return}if(E.type==="file-snapshot"){let U=(K)=>{if(!c)w({channel:V,v:N,type:"file-snapshot-result",id:E.id,payload:K})},L=(K)=>U({error:(K.trim()||"Could not read the edited file.").slice(0,$_)}),W=Y_;if(!W){L("This extension does not edit files.");return}Promise.resolve().then(()=>W(E.payload.purpose)).then((K)=>{if(LT(K)>q_){L(`The file is over ${q_} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>y_){L(`The snapshot version is over ${y_} characters.`);return}U({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>L(K instanceof Error?K.message:String(K)));return}if(E.type==="resolve"){let U=(W)=>{w({channel:V,v:N,type:"resolve-result",id:E.id,payload:W})},L=W_;if(!L){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>L(E.payload)).then((W)=>U({item:W?X_(W):null}),(W)=>{let K=(W instanceof Error?W.message:String(W)).trim();U({error:(K||"Command failed.").slice(0,$_)})});return}let R=U_.get(E.id);if(!R)return;if(clearTimeout(R.timer),U_.delete(E.id),E.ok){R.resolve(E.payload);return}R.reject(new M(E.code,E.error))};S.addEventListener("message",OE),w({channel:V,v:N,type:"hello"});let J=(T,E=I)=>{if(c||S.parent===S)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,U)=>{let L=setTimeout(()=>{U_.delete(T.id),U(new M("HOST_TIMEOUT","Host did not answer in time."))},E);U_.set(T.id,{resolve:R,reject:U,timer:L}),w(T)})},f=(T)=>J(T).then(()=>{return}),B={channel:V,v:N},UT=(T)=>{if(!c&&S.parent!==S)w(T)},AE=()=>UT({...B,type:"file-save"}),RT=()=>{if(!c&&S.parent!==S)w({...B,type:"microphone-close",id:D(G)})},MS=async()=>{if(g)throw new M("HOST_REJECTED","The microphone is already open in this frame.");if(C?.features?.microphone!==!0)throw new M("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new M("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<DT||E.sampleRate>VT)throw E.close().catch(()=>{return}),new M("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let R=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=VE(Math.round(E.sampleRate/4)),L=E.createScriptProcessor(1024,1,1);L.onaudioprocess=(m)=>U.pull(m.outputBuffer.getChannelData(0));let W=E.createMediaStreamDestination();L.connect(W);let K=new Set,I_={queue:U,endedListeners:K,release:()=>{L.onaudioprocess=null,L.disconnect(),U.clear();for(let m of W.stream.getTracks())m.stop();E.close().catch(()=>{return})}};g=I_;try{let m=await J({...B,type:"microphone-open",id:D(G),payload:{sampleRate:E.sampleRate}},NT);if(!m||!("opened"in m)||m.opened!==!0)throw new M("HOST_REJECTED","Host did not open the microphone.");if(await R,g!==I_)throw new M("DISCONNECTED","The microphone closed while it was opening.")}catch(m){if(g===I_)g=null;throw I_.release(),RT(),m}return{stream:W.stream,close:()=>{if(g!==I_)return;g=null,I_.release(),RT()},onEnded:(m)=>{return K.add(m),()=>{K.delete(m)}}}},UE=(T)=>{if(!lE(T)||!WS(T))return;T.preventDefault(),AE()},RE=(T)=>{if(!lE(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),XE(C.popover.id,"escape").catch(()=>{return})},H_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let E=F_||B_;if(TE===E)return;TE=E,GE(T.id,E).catch(()=>{return})},j_=()=>{if(C?.surface!=="popover"||F_)return;F_=!0,H_()},ME=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!F_)return;F_=!1,H_()},IE=()=>{if(C?.surface!=="popover"||B_)return;B_=!0,H_()},CE=()=>{if(C?.surface!=="popover"||!B_)return;B_=!1,H_()},d=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new M("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},MT=async(T)=>{if(T.kind!=="projects")d(T.projectId);let E=await J({...B,type:"workspace-read",id:D(G),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return E},IT=async(T,E)=>{if(T.kind!=="projects")d(T.projectId);let R=D(G);R_.set(R,E);try{await f({...B,type:"workspace-subscribe",id:D(G),payload:{subscriptionId:R,query:T}})}catch(U){if(R_.delete(R),!c)w({...B,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:R}});throw U}return()=>{if(!R_.delete(R)||c)return;w({...B,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:R}})}},IS=async(T,E)=>{if(T.kind==="session")d(T.sessionId);if(T.kind==="project")d(T.projectId);let R=D(G);M_.set(R,E);try{await f({...B,type:"shells-subscribe",id:D(G),payload:{subscriptionId:R,scope:T}})}catch(U){if(M_.delete(R),!c)w({...B,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:R}});throw U}return()=>{if(!M_.delete(R)||c)return;w({...B,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:R}})}},x_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>XT))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!C_(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>GT)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let E=await J({...B,type:"storage",id:D(G),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return E},XE=(T,E)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):f({...B,type:"popover-close",id:D(G),payload:E?{id:T,reason:E}:{id:T}}),GE=(T,E)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):f({...B,type:"popover-anchor",id:D(G),payload:{id:T,active:E}});return S.addEventListener("keydown",RE,!0),S.addEventListener("pointerover",j_),S.addEventListener("pointermove",j_),S.addEventListener("pointerout",ME),S.addEventListener("focus",IE),S.addEventListener("blur",CE),{onAction:(T)=>{return Q_=T,()=>{if(Q_===T)Q_=null}},listProjects:async()=>{let T=await MT({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await MT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await MT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>IT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>IT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")E(R)}),onSessions:(T,E)=>IT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")E(R)}),onRunningShells:(T,E)=>IS(T,E),readShellOutput:async(T,E)=>{d(T,w_);let R=E?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>b_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${b_}.`);let W=await J({...B,type:"shell-output",id:D(G),payload:{shellId:T,cursor:R,tailBytes:U}});if(!W||typeof W.output!=="string"||!Number.isFinite(W.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async(T)=>{if(d(T,w_),(await J({...B,type:"shell-stop",id:D(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{d(T),await f({...B,type:"open-session",id:D(G),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let R=a_(E),U={op:"get",key:T};if(R)U.scope=R;let L=await x_(U);return L.op==="get"&&L.found?L.value:void 0},set:async(T,E,R)=>{let U=a_(R),L={op:"set",key:T,value:E};if(U)L.scope=U;await x_(L)},delete:async(T,E)=>{let R=a_(E),U={op:"delete",key:T};if(R)U.scope=R;await x_(U)},keys:async(T)=>{let E=a_(T),R={op:"keys"};if(E)R.scope=E;let U=await x_(R);if(U.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(X.add(T),C)T(C);return()=>{X.delete(T)}},onDirectory:(T)=>{if(P.add(T),C)T(C.directory);return()=>{P.delete(T)}},onSession:(T)=>{if(z.add(T),C)T(C.session);return()=>{z.delete(T)}},onSessionLifecycle:(T)=>{if(Q.add(T),l)T(l);return()=>{Q.delete(T)}},onConnection:(T)=>{if(j.add(T),C)T(C.connection);return()=>{j.delete(T)}},onSettings:(T)=>{if(x.add(T),C)T(C.settings);return()=>{x.delete(T)}},onItem:(T)=>{if(u.add(T),C)T(C.item);return()=>{u.delete(T)}},onBlock:(T)=>{if(s.add(T),C?.block)T(C.block);return()=>{s.delete(T)}},onServiceEvent:(T)=>{return T_.add(T),()=>{T_.delete(T)}},onStatusControl:(T)=>{return t.add(T),()=>{t.delete(T)}},onPopoverClosed:(T)=>{return f_.add(T),()=>{f_.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!QE(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return f({...B,type:"status-controls",id:D(G),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!QT(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return f({...B,type:"popover-open",id:D(G),payload:T})},closePopover:XE,setPopoverAnchorActive:GE,onResolve:(T)=>{return W_=T,()=>{if(W_===T)W_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>g_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${g_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>h_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${h_} characters.`));return f({channel:V,v:N,type:"toast",id:D(G),payload:{...T,message:E}})},openUrl:(T)=>f({channel:V,v:N,type:"open-url",id:D(G),payload:{url:T}}),openCommit:(T)=>$T(T)?f({channel:V,v:N,type:"open-commit",id:D(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>f({channel:V,v:N,type:"block-answer",id:D(G),payload:{text:T.trim().slice(0,KT)}}),openSurface:(T)=>f({channel:V,v:N,type:"open-surface",id:D(G),payload:{surfaceId:T}}),writeClipboard:(T)=>f({channel:V,v:N,type:"clipboard-write",id:D(G),payload:{text:T}}),compose:(T)=>f({channel:V,v:N,type:"compose",id:D(G),payload:T}),attach:(T)=>f({channel:V,v:N,type:"attach",id:D(G),payload:X_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)d(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")d(E.directory);else{if(E.name!==void 0)d(E.name,200);if(E.baseBranch!==void 0)d(E.baseBranch,200)}let R=await J({channel:V,v:N,type:"start-session",id:D(G),payload:JT(T)},_.requestTimeoutMs??180000);if(!FT(R))throw new M("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>J({channel:V,v:N,type:"prompt",id:D(G),payload:kT(T)}).then((E)=>{if(!BT(E))throw new M("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>f({channel:V,v:N,type:"session-link",id:D(G),payload:X_(T)}),close:()=>f({channel:V,v:N,type:"close",id:D(G)}),oauthStart:()=>f({channel:V,v:N,type:"oauth-start",id:D(G)}),oauthDisconnect:()=>f({channel:V,v:N,type:"oauth-disconnect",id:D(G)}),request:(T)=>(v_(T.path)?J({channel:V,v:N,type:"request",id:D(G),payload:T}):aE()).then((E)=>{if(!u_(E))throw new M("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(v_(T.path)?J({channel:V,v:N,type:"service-request",id:D(G),payload:T}):aE()).then((E)=>{if(!u_(E))throw new M("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>J({channel:V,v:N,type:"service-status",id:D(G)}).then((T)=>{if(!xT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(G_(T)?J({channel:V,v:N,type:"file-read",id:D(G),payload:{path:T}}):l_()).then((E)=>{if(!wT(E))throw new M("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!G_(T))return l_();if(E.length>c_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${c_} characters.`));return J({channel:V,v:N,type:"file-write",id:D(G),payload:{path:T,content:E}}).then((R)=>{if(!bT(R))throw new M("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(G_(T)?J({channel:V,v:N,type:"file-list",id:D(G),payload:{path:T}}):l_()).then((E)=>{if(!qT(E))throw new M("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(G_(T)?J({channel:V,v:N,type:"file-stat",id:D(G),payload:{path:T}}):l_()).then((E)=>{if(!yT(E))throw new M("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),R=T.system?.trim();if(E.length===0||E.length>d_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${d_} characters.`));if(R!==void 0&&(R.length===0||R.length>p_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${p_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min(zT,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let L={prompt:E};if(R!==void 0)L.system=R;if(U!==void 0)L.maxOutputTokens=U;return J({channel:V,v:N,type:"generate",id:D(G),payload:L},_.requestTimeoutMs??fT).then((W)=>{if(!gT(W))throw new M("HOST_REJECTED","Host did not return generated text.");return W})},onLateGenerateResult:(T)=>{A_.add(T);for(let E of OT.splice(0))Y([T],E);return SE(),()=>{A_.delete(T)}},openMicrophone:MS,setBadge:(T)=>f({channel:V,v:N,type:"badge",id:D(G),payload:{count:HT(T)}}),setHeight:(T)=>f({channel:V,v:N,type:"resize",id:D(G),payload:{height:jT(T)}}),onFileOpen:(T)=>{if(J_.add(T),!AT)AT=!0,S.addEventListener("keydown",UE,!0);if(K_)T(K_);return()=>{J_.delete(T)}},onFileSnapshot:(T)=>{return Y_=T,()=>{if(Y_===T)Y_=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>UT({...B,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:AE,reportFileUnsupported:()=>UT({...B,type:"file-unsupported"}),dispose:()=>{for(let T of R_.keys())w({...B,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:T}});R_.clear();for(let T of M_.keys())w({...B,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:T}});if(M_.clear(),g)RT(),g.release(),g=null;if(c=!0,W_=null,Q_=null,Y_=null,J_.clear(),k_.clear(),AT)S.removeEventListener("keydown",UE,!0);S.removeEventListener("message",OE),S.removeEventListener("keydown",RE,!0),S.removeEventListener("pointerover",j_),S.removeEventListener("pointermove",j_),S.removeEventListener("pointerout",ME),S.removeEventListener("focus",IE),S.removeEventListener("blur",CE);for(let T of U_.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));U_.clear(),X.clear(),P.clear(),z.clear(),Q.clear(),j.clear(),x.clear(),u.clear(),s.clear(),T_.clear(),t.clear(),f_.clear(),A_.clear(),OT.length=0}}};var oE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var GO=new Set(oE);var nE=["none","agent","user"];var VO=new Set(nE);var QS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],YS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],iE=(_,S)=>{S.style.colorScheme=_.mode;for(let[O,I]of QS)S.style.setProperty(O,_.tokens[I]);for(let[O,I,X]of YS){let P=_.tokens[X]??"";S.style.setProperty(O,P),S.style.setProperty(I,P)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},cT=(_,S)=>{if(iE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var KS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${KS[_]}, ${S}))`,o=F("surface-background","transparent"),n_=F("surface-elevated","transparent"),D_=F("surface-elevated-foreground","inherit"),h=F("surface-foreground","inherit"),$=F("surface-muted-foreground","gray"),FS=F("surface-muted","transparent"),E_=F("interactive-border","currentColor"),b=F("interactive-hover","transparent"),S_=F("interactive-active","transparent"),dT=F("interactive-selection","transparent"),pT=F("interactive-selection-foreground","inherit"),a=F("primary","currentColor"),vT=F("primary-text","inherit"),uT=F("error-text","inherit"),BS=F("font-sans","inherit"),lT=F("font-mono","monospace"),eE=F("radius","9px"),aT=`calc(${eE} - 2px)`,rE=`calc(${eE} - 4px)`,Z=(_,S,O="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${O})`,sE=`background-image: linear-gradient(${b}, ${b});`,oT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,nT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",tE="box-shadow: var(--oc-sdk-lit);",iT=`inset 0 0.5px 0 0 ${Z(h,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,$S=`
:root {
  --oc-sdk-edge: ${Z(h,16)};
  --oc-sdk-field-bg: ${n_};
  --oc-sdk-raised-bg: ${o};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(h,14)};
  --oc-sdk-field-bg: ${Z(o,50,n_)};
  --oc-sdk-raised-bg: ${n_};
  --oc-sdk-field-lift: ${iT};
  --oc-sdk-raised-lift: ${iT};
  --oc-sdk-lit: ${iT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,o_=(_)=>{let S=F(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${F(`${_}-text`,"inherit")}; }`},A=(_)=>`calc(${_}rem / 14)`,ZS=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${A(8)}; height: ${A(32)}; padding: 0 ${A(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${A(6)}; height: ${A(28)}; padding: 0 ${A(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${A(4)}; height: ${A(24)}; padding: 0 ${A(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${A(14)}; height: ${A(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${A(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${A(32)}; padding: 0 ${A(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${A(8)} ${A(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${A(34)}; padding-right: ${A(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${A(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${A(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${A(24)}; height: ${A(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${A(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${A(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${A(28)}; padding: 0 ${A(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${A(2)}; min-width: ${A(160)}; max-width: calc(100vw - ${A(16)}); max-height: min(${A(320)}, calc(100vh - ${A(16)})); overflow: auto; padding: ${A(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${A(2)} ${A(2)} ${A(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${A(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${A(8)}; width: 100%; padding: ${A(6)} ${A(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${A(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${A(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${A(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${A(14)}; height: ${A(14)}; margin-top: ${A(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${A(36)}; height: ${A(20)}; --oc-sdk-thumb-travel: ${A(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${A(2)}; left: ${A(2)}; width: ${A(16)}; height: ${A(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${A(2)}; padding: ${A(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${A(6)}; height: ${A(28)}; padding: 0 ${A(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${A(1)} ${A(6)}; font-size: ${A(11)}; font-weight: 500; line-height: ${A(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${A(8)}; width: 100%; padding: ${A(6)} ${A(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${A(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${A(16)} ${A(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${A(4)}; padding: ${A(40)} ${A(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${A(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${A(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${A(16)}; height: ${A(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${A(12)}; height: ${A(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${A(12)}; padding: ${A(8)} ${A(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${A(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${A(8)}; width: 100%; margin: ${A(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${A(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${A(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${A(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${A(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${A(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${A(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${A(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${A(36)}; height: ${A(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${A(44)}; }
  .oc-sdk-check { min-height: ${A(36)}; padding: ${A(8)} 0; }
}
`,_S=`${$S}
.oc-sdk { color: ${h}; font-family: ${BS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${sE} }
.oc-sdk-mono { font-family: ${lT}; }
.oc-sdk-muted { color: ${$}; }
${o_("success")}${o_("warning")}${o_("error")}${o_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${a}; --oc-sdk-tone-text: ${vT}; }

.oc-sdk-btn { border-radius: ${aT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${rE}; }
.oc-sdk-btn[data-variant="default"] { color: ${vT}; background: ${Z(a,10,o)}; border-color: ${Z(a,12)}; ${tE} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(a,16,o)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(a,22,o)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${FS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${S_}, ${S_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${D_}; ${nT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${S_}, ${S_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${S_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${uT}; background: ${Z("var(--oc-sdk-tone)",7,o)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${tE} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,o)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,o)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${uT}; }
.oc-sdk-input { border-radius: ${aT}; background: var(--oc-sdk-field-bg); color: ${D_}; ${oT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${oT(Z(h,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${oT(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${lT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${a}; }
.oc-sdk-search-clear { border-radius: ${rE}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${h}; }

.oc-sdk-trigger { border-radius: ${aT}; background: var(--oc-sdk-raised-bg); color: ${D_}; ${nT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${S_}, ${S_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${D_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${n_}; background-clip: padding-box; color: ${D_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${b}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${dT}; color: ${pT}; }
.oc-sdk-option-check { color: ${h}; }
.oc-sdk-option[data-destructive="true"] { color: ${uT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Z(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${E_}; border-radius: 4px; color: ${h}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(h,60,E_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${E_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${o}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${a}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${sE} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(h,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${h}; }
.oc-sdk-tab[aria-selected="true"] { color: ${pT}; background: ${dT}; border-color: ${E_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${D_}; background: var(--oc-sdk-raised-bg); ${nT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Z(h,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${b}; }
.oc-sdk-row[aria-selected="true"] { background: ${dT}; color: ${pT}; }
.oc-sdk-row-lead { font-family: ${lT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${E_}; border-top-color: ${a}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Z(E_,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(h,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${a}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${vT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(E_,60)}; }
`,H=`
${CT}
${ZS}
${_S}`;var e_=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"zhihu",name:"知乎",channels:[{id:"hot",name:"热榜"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"csdn",name:"CSDN",channels:[{id:"hot",name:"热点"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var ET=[],SS=()=>{let _=document.querySelector("#msg2");if(_&&ET.length>0)_.innerHTML=`<div class="err">${ET.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{ET.push("页面错误："+String(_.message??_)),SS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,O=S?.code;ET.push("未处理异常"+(O?` [${O}]`:"")+"："+String(S?.message??S)),SS()});var k="v2ex",OS=["zhihu","toutiao","csdn"],r=()=>e_.find((_)=>_.id===k),HS=180000,__=mT(),AS=document.querySelector("#app");if(!AS)throw Error("Missing #app");AS.innerHTML=`
<style>
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;font:14px/1.6 var(--oc-font,system-ui,sans-serif);background:var(--oc-bg,#1b1e22);color:var(--oc-fg,inherit)}
#app{display:flex;height:100vh;overflow:hidden;background:var(--oc-bg,#1b1e22);color:var(--oc-fg,inherit);position:relative}
aside{width:100%;display:flex;flex-direction:column;padding:10px 8px;gap:2px;overflow-y:auto}
.sec{font-size:12px;color:var(--oc-muted,#999);padding:8px 10px 4px}
.nrow{display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap;width:100%;text-align:left;padding:7px 10px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--oc-fg,inherit);font:inherit}
.nrow .tt{flex:1;min-width:0;font-size:13.5px;overflow-wrap:anywhere}
.nrow .mm{font-size:12px;color:var(--oc-muted,#999);white-space:nowrap}
.nrow .ext{color:var(--oc-muted,#999);font-size:12px;white-space:nowrap;margin-left:4px}
.nrow .aibtn{flex:0 0 auto;align-self:center;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 9px;white-space:nowrap}
.nrow .aibtn:hover{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
.nrow .aisum{flex:1 1 100%;font-size:12.5px;line-height:1.7;opacity:.92;border-left:2px solid var(--oc-border,#8888);padding-left:8px;margin:2px 0 2px 2px}
.nrow .xp{display:block;font-size:12.5px;opacity:.8;margin-top:1px}
.nrow.chan .tt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nrow.chan .dot{color:var(--oc-muted,#999)}
#chanrow > div,#chanrow2 > div{display:flex;gap:4px;flex-wrap:wrap}
button.nrow:hover{background:var(--oc-hover,#8881)}
.nrow.active{background:var(--oc-hover,#8882)}
div.nrow:hover{background:var(--oc-hover,#8881)}
button,select,input,textarea{font:inherit}
.btn{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
.btn.primary{background:var(--oc-primary,#3574f0);border-color:transparent;color:var(--oc-primary-fg,#fff)}
#msg2:empty{display:none}
#msg2{padding:4px 10px}#msg2 .err{margin-top:4px}
.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
.mut{font-size:12px;color:var(--oc-muted,#999)}
#cfgside{border-top:1px solid var(--oc-border,#8883);margin-top:6px;padding:8px 6px 4px;display:flex;flex-direction:column;gap:6px}
#cfgside input{width:100%;padding:6px 8px;font-size:12.5px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:inherit}
#cfgver{padding:2px 10px 6px;font-size:11px}
</style>
<div style="display:flex;flex:1;min-height:0;width:100%" id="cols">
<aside>
  <div class="sec">社区</div><div id="chanrow"><div id="communities"></div></div>
  <div class="sec" id="sec-channels">频道</div><div id="chanrow2"><div id="channels"></div></div>
  <div class="sec">话题 <span id="tcount" class="mut"></span></div><div id="msg2"></div><div id="topics"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span><br>R 刷新</div>
</aside>
</div>`;var p=(_)=>document.querySelector(`#${_}`),jS=p("cname"),TS=p("topics"),xS="v0.8.1-cstatus";jS.textContent="阅读";document.querySelector("#build").textContent=xS;var L_="",v=r().channels[0].id,e=[],N_=0,sT=!1,TT=new Map,tT=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},i=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),wS=(_)=>{if(!_)return"";let S=Date.now()-_;if(S<60000)return"刚刚";if(S<3600000)return`${Math.floor(S/60000)} 分钟前`;if(S<86400000)return`${Math.floor(S/3600000)} 小时前`;return new Date(_).toLocaleDateString()},P_=async(_)=>{try{return await __.storage.get(_)}catch{return}},ST=async(_,S)=>{try{await __.storage.set(_,S)}catch{}},US=async(_,S,O)=>{let I=S;if(L_&&_==="GET"&&I.startsWith("/"))I+=(I.includes("?")?"&":"?")+`proxy=${encodeURIComponent(L_)}`;return __.serviceRequest({method:_,path:I,body:O})},bS=async()=>{let _=await P_("moyu:community")??"v2ex";if(e_.some((O)=>O.id===_))k=_;L_=await P_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=L_;let S=await P_(`moyu:channel:${k}`)??"";if(v=r().channels[0].id,S&&r().channels.some((O)=>O.id===S))v=S},z_=()=>{let _=p("communities");_.innerHTML="";for(let S of e_){let O=document.createElement("button");O.className="nrow chan"+(k===S.id?" active":"");let I=TT.get(S.id),X=I?` <span class="ext" title="${i(I)}">⚠</span>`:"";O.innerHTML=`<span class="dot">●</span><span class="tt">${i(S.name)}${X}</span>`,O.onclick=()=>{if(k!==S.id)qS(S.id)},_.appendChild(O)}},qS=async(_)=>{k=_,await ST("moyu:community",k),v=r().channels[0].id,e=[],N_=0,document.querySelector("#cfg-out").textContent="";let S=await P_(`moyu:channel:${k}`)??"";if(S&&r().channels.some((O)=>O.id===S))v=S;z_(),RS(),O_(!0)},_E=()=>{let _=r().channels.length<=1;if(p("sec-channels").style.display=_?"none":"",p("chanrow2").style.display=_?"none":"",_)return;let S=p("channels");S.innerHTML="";for(let O of r().channels){let I=document.createElement("button");I.className="nrow chan"+(v===O.id?" active":""),I.innerHTML=`<span class="dot">#</span><span class="tt">${i(O.name)}</span>`,I.onclick=()=>{if(v!==O.id)v=O.id,N_=0,ST(`moyu:channel:${k}`,v),_E(),O_(!0)},S.appendChild(I)}},RS=()=>{z_(),_E(),p("tcount").textContent=e.length>0?`${e.length}`:"",TS.innerHTML="";for(let _ of e){let S=document.createElement("div");S.className="nrow";let O=[];if(_.author)O.push(i(_.author));if(_.channel)O.push(i(_.channel));if(_.replies!==null)O.push(`${_.replies}回复`);if(_.time)O.push(wS(_.time));let I=OS.includes(_.community)?' <span class="ext" title="该源无可抓正文，✦ 为标题版总结">↗</span>':"",X=_.excerpt?`<br><span class="xp">${i(_.excerpt)}</span>`:"";S.innerHTML=`<span class="tt">${i(_.title)}${I}${X}${O.length>0?`<br><span class="mm" style="font-size:12px;color:var(--oc-muted,#999)">${O.join(" · ")}</span>`:""}</span>`;let P=document.createElement("button");P.className="aibtn",P.title="AI 总结这篇",P.textContent="✦",P.onclick=()=>void yS(_,S,P),S.appendChild(P),TS.appendChild(S)}},ES=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),yS=async(_,S,O)=>{let I=S.querySelector(".aisum");if(I){I.remove();return}let X=`moyu:csum:${k}:${_.id}`;O.disabled=!0;let P=O.textContent;O.textContent="…";try{let z=await P_(X),Q=typeof z==="string"&&z?z:"";if(!Q){let x=await US("GET",`/thread?community=${k}&id=${encodeURIComponent(_.id)}&page=1`),u=JSON.parse(x.body);if(!u.ok||!u.thread)throw Error(u.error??"正文失败");let s=u.thread,T_=[s.opening?ES(s.opening.html):"",...s.posts.map((t)=>ES(t.html))].filter(Boolean).join(`
`).slice(0,3500);if(!T_){if(!OS.includes(_.community))throw Error("这篇没有可总结的正文");if(Q=(await __.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${r().name}/${_.channel??""}】${_.title}`,maxOutputTokens:64})).text.trim().slice(0,80),!Q)throw Error("小模型没有返回总结");Q+="（标题版）"}else if(Q=(await __.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${T_}`,maxOutputTokens:256})).text.trim().slice(0,500),!Q)throw Error("小模型没有返回总结");await ST(X,Q)}let j=document.createElement("div");j.className="aisum",j.textContent=`✦ ${Q}`,S.appendChild(j)}catch(z){let Q=z?.code,j=Q==="NO_MODEL"?"无可用小模型":Q==="MODEL_FAILED"?"小模型出错":z instanceof Error?z.message:"未知错误",x=document.createElement("div");x.className="aisum",x.textContent=`总结失败：${j}`,S.appendChild(x)}finally{O.disabled=!1,O.textContent=P}},O_=async(_=!1)=>{if(sT||document.hidden)return;let S=await P_(`moyu:channel:${k}`)??"";if(S&&S!==v&&r().channels.some((O)=>O.id===S))v=S,N_=0;if(!_&&Date.now()-N_<HS&&e.length>0)return;sT=!0;try{let O=await US("GET",`/list?community=${k}&channel=${encodeURIComponent(v)}`),I=JSON.parse(O.body);if(!I.ok){let X=I.error??"列表失败";TT.set(k,X),z_(),tT(i(X));return}tT(""),TT.delete(k),e=I.topics??[],N_=Date.now(),RS()}catch(O){let I=O?.code,X=I==="NO_SERVICE"?"（service 没起来：去 设置→扩展 看阅读卡片上的 service 错误）":I==="NOT_GRANTED"?"（service 能力没批准：重装时勾上）":"",P=`列表失败${I?` [${I}]`:""}：${O instanceof Error?O.message:"未知错误"}${X}`;TT.set(k,P),z_(),tT(i(P));return}finally{sT=!1}};p("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){p("cfg-out").textContent="格式不对，要 http(s)://host:port";return}L_=_,await ST("moyu:proxy",L_),p("cfg-out").textContent="已保存，正在测试…",N_=0,await O_(!0),p("cfg-out").textContent=e.length>0?`连通（${e.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")O_(!0);else if(_.key==="q")__.close()});var _T=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(_T++,_T>=2)_T=0,__.close();setTimeout(()=>_T=0,500)}});document.addEventListener("visibilitychange",()=>{if(!document.hidden)O_(!1)});__.onReady((_)=>{cT(_,document.documentElement)});var eT=()=>{let _=document.documentElement.clientWidth;document.body.dataset.narrow=_>0&&_<700?"1":""};if(typeof ResizeObserver<"u")new ResizeObserver(()=>eT()).observe(document.documentElement);else window.addEventListener("resize",()=>eT());eT();bS().then(()=>{z_(),_E(),O_(!0)});setInterval(()=>void O_(!1),60000);})();
