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
`;function VE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let A=new WeakMap;_.addEventListener("scroll",(M)=>{let D=M.target===_?S:M.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let Q=A.get(D);if(Q!==void 0)clearTimeout(Q);A.set(D,setTimeout(()=>{A.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var IS=`(${VE.toString()})(document);`;var XT=128,GT=65536;var b_=128;var q_=65536;var DT=8000,VT=192000,NT=120000;var NE=(_)=>{let S=[],A=0,M=0;return{push:(D)=>{S.push(D),M+=D.length;while(M-A>_&&S.length>1){let Q=S.shift();M-=Q?.length??0,A=0}},pull:(D)=>{let Q=0;while(Q<D.length&&S.length>0){let z=S[0],W=Math.min(D.length-Q,z.length-A);if(D.set(z.subarray(A,A+W),Q),Q+=W,A+=W,A>=z.length)S.shift(),M-=z.length,A=0}D.fill(0,Q)},clear:()=>{S.length=0,A=0,M=0},get size(){return M-A}}};var QE=/^[a-z][a-z0-9-]{0,39}$/;var PE=(_)=>Object(_)===_&&!Array.isArray(_),PT=(_,S)=>Object.keys(_).every((A)=>S.includes(A)),LE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,WE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,YE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let A of _){if(!PE(A)||!QE.test(A.id)||!LE(A.label))return!1;if(A.disabled!==void 0&&A.disabled!==!0&&A.disabled!==!1)return!1;if(S.has(A.id))return!1;if(S.add(A.id),A.kind==="button"){if(!PT(A,["kind","id","label","disabled"]))return!1;continue}if(A.kind!=="select"||!PT(A,["kind","id","label","value","options","disabled"]))return!1;if(!WE(A.value)||!Array.isArray(A.options)||A.options.length<1||A.options.length>16)return!1;let M=new Set;for(let D of A.options){if(!PE(D)||!PT(D,["value","label"])||!WE(D.value)||!LE(D.label)||M.has(D.value))return!1;M.add(D.value)}if(!M.has(A.value))return!1}return!0};var KE=["{id}","{segment}","{segments+}"];var aS=new Set(KE);var FE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var nS=new Set(FE);var y_=20000000,g_=256;var LT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,BE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let A=0;A<_.bytes.byteLength;A+=1)if(_.bytes[A]!==S.bytes[A])return!1;return!0};var $E=/^[A-Za-z0-9_-]{1,80}$/;var ZE=["left","right","top","bottom"];var zE=(_,S=0,A={remaining:16000})=>{if(--A.remaining<0||S>=32)return!1;if(_===null)return!0;let M=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of M)if(!zE(D,S+1,A))return!1;return!0},WT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(WT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(WT)}return String(_)===_||Number.isFinite(_)},QT=(_)=>{try{if(String(_.id)!==_.id||!$E.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!ZE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!zE(_.data)||!WT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var KT=2000;var JE=["file","directory","other","missing"],FT=(_)=>Boolean(_&&"sessionId"in _),BT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var kE=/^[0-9a-f]{7,64}$/i,$T=(_)=>kE.test(_),h_=500,m_=32000,HE=16000,jE=128,xE=200,wE=2000,bE=16000,qE=80,yE=200,gE=16000;var hE=2000;var ZT=20000,c_=1024,d_=2000000;var p_=64000,v_=8000,zT=4000;var fT=960000;var mE=999,cE=1e4,f_=500,dE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pE=["stopped","starting","ready","failed"],XS=new Set(dE),vE=(_)=>XS.has(_),uE=(_)=>_&&vE(_)?_:"HOST_REJECTED",V_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(V_);if(Object(_)===_)return Object.values(_).every(V_);return!1},lE=(_)=>V_(_)&&JSON.stringify(_).length<=gE,fE=(_)=>_?.trim().slice(0,yE)??"",N_=(_)=>{let S=_.id.trim().slice(0,jE),A=_.title.trim().slice(0,xE),M=_.url.trim().slice(0,wE),D=_.text?.trim().slice(0,bE),Q=_.author?.trim().slice(0,qE),z=_.kind==="pull"?"pull":"issue",W={providerId:_.providerId.trim(),id:S,title:A||S,url:M,kind:z};if(D)W.text=D;if(Q)W.author=Q;if(z==="pull"){let j=fE(_.branches?.head),x=fE(_.branches?.base);if(j&&x)W.branches={head:j,base:x}}if(lE(_.data))W.data=_.data;return W},JT=(_)=>{let S=N_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},kT=(_)=>{let S={text:_.text.trim().slice(0,HE)};if(_.send)S.send=!0;return S},HT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(mE,Math.max(0,Math.round(_)))},jT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(cE,Math.max(0,Math.ceil(_)))};var P_=(_)=>_.length>0&&_.length<=c_&&!_.includes("\x00")&&!_.includes("\\");var u_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>hE)return!1;return!_.split("/").some((A)=>A==="."||A==="..")},GS=new Set(pE),xT=(_)=>Boolean(_&&"status"in _&&GS.has(String(_.status))&&!("body"in _)),l_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),wT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),bT=(_)=>Boolean(_&&"written"in _&&_.written===!0),qT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),DS=new Set(JE),yT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&DS.has(String(_.kind))&&Number.isFinite(_.size)),gT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),VS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),NS=(_)=>Object(_)===_?_:null,YT=(_)=>String(_)===_&&_.length>0,PS=(_)=>{if(!YT(_.id))return null;if(_.ok===!0){let S={channel:V,v:N,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&YT(_.error))return{channel:V,v:N,type:"result",id:_.id,ok:!1,error:_.error,code:uE(YT(_.code)?_.code:void 0)};return null},hT=(_)=>{let S=NS(_);if(!S||S.channel!==V||S.v!==N)return null;if(S.type==="result")return PS(S);if(!VS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var aE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),LS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class I extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var oE=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),a_=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${c_} characters without NUL or backslash.`)),o_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},mT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let A=_.acceptSource??((T)=>T===S.parent),M=_.requestTimeoutMs??ZT,D=new Set,Q=new Set,z=new Set,W=new Set,j=new Set,x=new Set,a=new Set,__=new Set,E_=new Set,c=new Set,S_=new Set,d=new Set,F_=[],M_=null,o=null,I_=new Set,H_=new Set,B_=null,$_=null,AT=!1,C_=new Map,X_=new Map,G_=new Map,p=!1,X={value:0},C=null,n=null,Z_=!1,z_=!1,EE=null,g=null,SE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},w=(T)=>{S.parent.postMessage(T,"*")},OE=()=>{if(p||S.parent===S||d.size===0||C?.features?.lateGenerateResults!==!0)return;w({channel:V,v:N,type:"generate-late-listen"})},Y=(T,E)=>{for(let R of T)try{R(E)}catch(U){console.error(U)}},AE=(T)=>{if(!(T instanceof MessageEvent))return;if(!A(T.source))return;let E=hT(T.data);if(!E)return;if(E.type==="workspace"){let U=X_.get(E.payload.subscriptionId);if(U)Y([U],E.payload.snapshot);return}if(E.type==="shells"){let U=G_.get(E.payload.subscriptionId);if(U)Y([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){g?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=g;if(!U)return;g=null,U.release(),Y(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(C=E.payload,n=SE(E.payload.session),Y(D,E.payload),Y(Q,E.payload.directory),Y(z,E.payload.session),n)Y(W,n);if(Y(j,E.payload.connection),Y(x,E.payload.settings),Y(a,E.payload.item),E.payload.block)Y(__,E.payload.block);OE();return}if(E.type==="service-event"){Y(E_,E.payload);return}if(E.type==="generate-late"){if(d.size===0)F_.push(E.payload);else Y(d,E.payload);return}if(E.type==="directory"){if(C)C={...C,directory:E.payload.directory};Y(Q,E.payload.directory);return}if(E.type==="session"){if(C)C={...C,session:E.payload.session};if(!E.payload.session)n=null;else if(n?.sessionId!==E.payload.session.id)n=SE(E.payload.session);Y(z,E.payload.session);return}if(E.type==="session-lifecycle"){n=E.payload,Y(W,E.payload);return}if(E.type==="connection"){if(C)C={...C,connection:E.payload.connection};Y(j,E.payload.connection);return}if(E.type==="settings"){if(C)C={...C,settings:E.payload.settings};Y(x,E.payload.settings);return}if(E.type==="item"){if(C)C={...C,item:E.payload.item};Y(a,E.payload.item);return}if(E.type==="status-control-event"){Y(c,E.payload);return}if(E.type==="popover-closed"){Y(S_,E.payload);return}if(E.type==="action"){let U=(L)=>{if(!p)w({channel:V,v:N,type:"action-result",id:E.id,payload:L})},P=o;if(!P){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>P(E.payload)).then(()=>U({ok:!0}),(L)=>{let K=(L instanceof Error?L.message:String(L)).trim();U({ok:!1,error:(K||"Action failed.").slice(0,f_)})});return}if(E.type==="file-open"){let U=E.payload;if($_&&BE($_,U))return;$_=U,Y(I_,E.payload);return}if(E.type==="file-saved"){Y(H_,E.payload.version);return}if(E.type==="file-snapshot"){let U=(K)=>{if(!p)w({channel:V,v:N,type:"file-snapshot-result",id:E.id,payload:K})},P=(K)=>U({error:(K.trim()||"Could not read the edited file.").slice(0,f_)}),L=B_;if(!L){P("This extension does not edit files.");return}Promise.resolve().then(()=>L(E.payload.purpose)).then((K)=>{if(LT(K)>y_){P(`The file is over ${y_} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>g_){P(`The snapshot version is over ${g_} characters.`);return}U({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>P(K instanceof Error?K.message:String(K)));return}if(E.type==="resolve"){let U=(L)=>{w({channel:V,v:N,type:"resolve-result",id:E.id,payload:L})},P=M_;if(!P){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>P(E.payload)).then((L)=>U({item:L?N_(L):null}),(L)=>{let K=(L instanceof Error?L.message:String(L)).trim();U({error:(K||"Command failed.").slice(0,f_)})});return}let R=C_.get(E.id);if(!R)return;if(clearTimeout(R.timer),C_.delete(E.id),E.ok){R.resolve(E.payload);return}R.reject(new I(E.code,E.error))};S.addEventListener("message",AE),w({channel:V,v:N,type:"hello"});let J=(T,E=M)=>{if(p||S.parent===S)return Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,U)=>{let P=setTimeout(()=>{C_.delete(T.id),U(new I("HOST_TIMEOUT","Host did not answer in time."))},E);C_.set(T.id,{resolve:R,reject:U,timer:P}),w(T)})},f=(T)=>J(T).then(()=>{return}),B={channel:V,v:N},UT=(T)=>{if(!p&&S.parent!==S)w(T)},UE=()=>UT({...B,type:"file-save"}),RT=()=>{if(!p&&S.parent!==S)w({...B,type:"microphone-close",id:G(X)})},RS=async()=>{if(g)throw new I("HOST_REJECTED","The microphone is already open in this frame.");if(C?.features?.microphone!==!0)throw new I("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new I("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<DT||E.sampleRate>VT)throw E.close().catch(()=>{return}),new I("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let R=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=NE(Math.round(E.sampleRate/4)),P=E.createScriptProcessor(1024,1,1);P.onaudioprocess=(m)=>U.pull(m.outputBuffer.getChannelData(0));let L=E.createMediaStreamDestination();P.connect(L);let K=new Set,D_={queue:U,endedListeners:K,release:()=>{P.onaudioprocess=null,P.disconnect(),U.clear();for(let m of L.stream.getTracks())m.stop();E.close().catch(()=>{return})}};g=D_;try{let m=await J({...B,type:"microphone-open",id:G(X),payload:{sampleRate:E.sampleRate}},NT);if(!m||!("opened"in m)||m.opened!==!0)throw new I("HOST_REJECTED","Host did not open the microphone.");if(await R,g!==D_)throw new I("DISCONNECTED","The microphone closed while it was opening.")}catch(m){if(g===D_)g=null;throw D_.release(),RT(),m}return{stream:L.stream,close:()=>{if(g!==D_)return;g=null,D_.release(),RT()},onEnded:(m)=>{return K.add(m),()=>{K.delete(m)}}}},RE=(T)=>{if(!aE(T)||!LS(T))return;T.preventDefault(),UE()},ME=(T)=>{if(!aE(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),GE(C.popover.id,"escape").catch(()=>{return})},j_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let E=Z_||z_;if(EE===E)return;EE=E,DE(T.id,E).catch(()=>{return})},x_=()=>{if(C?.surface!=="popover"||Z_)return;Z_=!0,j_()},IE=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!Z_)return;Z_=!1,j_()},CE=()=>{if(C?.surface!=="popover"||z_)return;z_=!0,j_()},XE=()=>{if(C?.surface!=="popover"||!z_)return;z_=!1,j_()},v=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new I("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},MT=async(T)=>{if(T.kind!=="projects")v(T.projectId);let E=await J({...B,type:"workspace-read",id:G(X),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return E},IT=async(T,E)=>{if(T.kind!=="projects")v(T.projectId);let R=G(X);X_.set(R,E);try{await f({...B,type:"workspace-subscribe",id:G(X),payload:{subscriptionId:R,query:T}})}catch(U){if(X_.delete(R),!p)w({...B,type:"workspace-unsubscribe",id:G(X),payload:{subscriptionId:R}});throw U}return()=>{if(!X_.delete(R)||p)return;w({...B,type:"workspace-unsubscribe",id:G(X),payload:{subscriptionId:R}})}},MS=async(T,E)=>{if(T.kind==="session")v(T.sessionId);if(T.kind==="project")v(T.projectId);let R=G(X);G_.set(R,E);try{await f({...B,type:"shells-subscribe",id:G(X),payload:{subscriptionId:R,scope:T}})}catch(U){if(G_.delete(R),!p)w({...B,type:"shells-unsubscribe",id:G(X),payload:{subscriptionId:R}});throw U}return()=>{if(!G_.delete(R)||p)return;w({...B,type:"shells-unsubscribe",id:G(X),payload:{subscriptionId:R}})}},w_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>XT))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!V_(T.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>GT)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let E=await J({...B,type:"storage",id:G(X),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new I("HOST_REJECTED","Host did not return storage data.");return E},GE=(T,E)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):f({...B,type:"popover-close",id:G(X),payload:E?{id:T,reason:E}:{id:T}}),DE=(T,E)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):f({...B,type:"popover-anchor",id:G(X),payload:{id:T,active:E}});return S.addEventListener("keydown",ME,!0),S.addEventListener("pointerover",x_),S.addEventListener("pointermove",x_),S.addEventListener("pointerout",IE),S.addEventListener("focus",CE),S.addEventListener("blur",XE),{onAction:(T)=>{return o=T,()=>{if(o===T)o=null}},listProjects:async()=>{let T=await MT({kind:"projects"});if(T.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await MT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await MT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>IT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>IT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")E(R)}),onSessions:(T,E)=>IT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")E(R)}),onRunningShells:(T,E)=>MS(T,E),readShellOutput:async(T,E)=>{v(T,b_);let R=E?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>q_))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${q_}.`);let L=await J({...B,type:"shell-output",id:G(X),payload:{shellId:T,cursor:R,tailBytes:U}});if(!L||typeof L.output!=="string"||!Number.isFinite(L.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return L},stopShell:async(T)=>{if(v(T,b_),(await J({...B,type:"shell-stop",id:G(X),payload:{shellId:T}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{v(T),await f({...B,type:"open-session",id:G(X),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let R=o_(E),U={op:"get",key:T};if(R)U.scope=R;let P=await w_(U);return P.op==="get"&&P.found?P.value:void 0},set:async(T,E,R)=>{let U=o_(R),P={op:"set",key:T,value:E};if(U)P.scope=U;await w_(P)},delete:async(T,E)=>{let R=o_(E),U={op:"delete",key:T};if(R)U.scope=R;await w_(U)},keys:async(T)=>{let E=o_(T),R={op:"keys"};if(E)R.scope=E;let U=await w_(R);if(U.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(D.add(T),C)T(C);return()=>{D.delete(T)}},onDirectory:(T)=>{if(Q.add(T),C)T(C.directory);return()=>{Q.delete(T)}},onSession:(T)=>{if(z.add(T),C)T(C.session);return()=>{z.delete(T)}},onSessionLifecycle:(T)=>{if(W.add(T),n)T(n);return()=>{W.delete(T)}},onConnection:(T)=>{if(j.add(T),C)T(C.connection);return()=>{j.delete(T)}},onSettings:(T)=>{if(x.add(T),C)T(C.settings);return()=>{x.delete(T)}},onItem:(T)=>{if(a.add(T),C)T(C.item);return()=>{a.delete(T)}},onBlock:(T)=>{if(__.add(T),C?.block)T(C.block);return()=>{__.delete(T)}},onServiceEvent:(T)=>{return E_.add(T),()=>{E_.delete(T)}},onStatusControl:(T)=>{return c.add(T),()=>{c.delete(T)}},onPopoverClosed:(T)=>{return S_.add(T),()=>{S_.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support status controls."));if(!YE(T))return Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return f({...B,type:"status-controls",id:G(X),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support popovers."));if(!QT(T))return Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return f({...B,type:"popover-open",id:G(X),payload:T})},closePopover:GE,setPopoverAnchorActive:DE,onResolve:(T)=>{return M_=T,()=>{if(M_===T)M_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>h_)return Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${h_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>m_))return Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${m_} characters.`));return f({channel:V,v:N,type:"toast",id:G(X),payload:{...T,message:E}})},openUrl:(T)=>f({channel:V,v:N,type:"open-url",id:G(X),payload:{url:T}}),openCommit:(T)=>$T(T)?f({channel:V,v:N,type:"open-commit",id:G(X),payload:{sha:T}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>f({channel:V,v:N,type:"block-answer",id:G(X),payload:{text:T.trim().slice(0,KT)}}),openSurface:(T)=>f({channel:V,v:N,type:"open-surface",id:G(X),payload:{surfaceId:T}}),writeClipboard:(T)=>f({channel:V,v:N,type:"clipboard-write",id:G(X),payload:{text:T}}),compose:(T)=>f({channel:V,v:N,type:"compose",id:G(X),payload:T}),attach:(T)=>f({channel:V,v:N,type:"attach",id:G(X),payload:N_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)v(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")v(E.directory);else{if(E.name!==void 0)v(E.name,200);if(E.baseBranch!==void 0)v(E.baseBranch,200)}let R=await J({channel:V,v:N,type:"start-session",id:G(X),payload:JT(T)},_.requestTimeoutMs??180000);if(!FT(R))throw new I("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>J({channel:V,v:N,type:"prompt",id:G(X),payload:kT(T)}).then((E)=>{if(!BT(E))throw new I("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>f({channel:V,v:N,type:"session-link",id:G(X),payload:N_(T)}),close:()=>f({channel:V,v:N,type:"close",id:G(X)}),oauthStart:()=>f({channel:V,v:N,type:"oauth-start",id:G(X)}),oauthDisconnect:()=>f({channel:V,v:N,type:"oauth-disconnect",id:G(X)}),request:(T)=>(u_(T.path)?J({channel:V,v:N,type:"request",id:G(X),payload:T}):oE()).then((E)=>{if(!l_(E))throw new I("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(u_(T.path)?J({channel:V,v:N,type:"service-request",id:G(X),payload:T}):oE()).then((E)=>{if(!l_(E))throw new I("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>J({channel:V,v:N,type:"service-status",id:G(X)}).then((T)=>{if(!xT(T))throw new I("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(P_(T)?J({channel:V,v:N,type:"file-read",id:G(X),payload:{path:T}}):a_()).then((E)=>{if(!wT(E))throw new I("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!P_(T))return a_();if(E.length>d_)return Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${d_} characters.`));return J({channel:V,v:N,type:"file-write",id:G(X),payload:{path:T,content:E}}).then((R)=>{if(!bT(R))throw new I("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(P_(T)?J({channel:V,v:N,type:"file-list",id:G(X),payload:{path:T}}):a_()).then((E)=>{if(!qT(E))throw new I("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(P_(T)?J({channel:V,v:N,type:"file-stat",id:G(X),payload:{path:T}}):a_()).then((E)=>{if(!yT(E))throw new I("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),R=T.system?.trim();if(E.length===0||E.length>p_)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${p_} characters.`));if(R!==void 0&&(R.length===0||R.length>v_))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${v_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min(zT,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let P={prompt:E};if(R!==void 0)P.system=R;if(U!==void 0)P.maxOutputTokens=U;return J({channel:V,v:N,type:"generate",id:G(X),payload:P},_.requestTimeoutMs??fT).then((L)=>{if(!gT(L))throw new I("HOST_REJECTED","Host did not return generated text.");return L})},onLateGenerateResult:(T)=>{d.add(T);for(let E of F_.splice(0))Y([T],E);return OE(),()=>{d.delete(T)}},openMicrophone:RS,setBadge:(T)=>f({channel:V,v:N,type:"badge",id:G(X),payload:{count:HT(T)}}),setHeight:(T)=>f({channel:V,v:N,type:"resize",id:G(X),payload:{height:jT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!AT)AT=!0,S.addEventListener("keydown",RE,!0);if($_)T($_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return B_=T,()=>{if(B_===T)B_=null}},onFileSaved:(T)=>{return H_.add(T),()=>{H_.delete(T)}},reportFileChange:(T)=>UT({...B,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:UE,reportFileUnsupported:()=>UT({...B,type:"file-unsupported"}),dispose:()=>{for(let T of X_.keys())w({...B,type:"workspace-unsubscribe",id:G(X),payload:{subscriptionId:T}});X_.clear();for(let T of G_.keys())w({...B,type:"shells-unsubscribe",id:G(X),payload:{subscriptionId:T}});if(G_.clear(),g)RT(),g.release(),g=null;if(p=!0,M_=null,o=null,B_=null,I_.clear(),H_.clear(),AT)S.removeEventListener("keydown",RE,!0);S.removeEventListener("message",AE),S.removeEventListener("keydown",ME,!0),S.removeEventListener("pointerover",x_),S.removeEventListener("pointermove",x_),S.removeEventListener("pointerout",IE),S.removeEventListener("focus",CE),S.removeEventListener("blur",XE);for(let T of C_.values())clearTimeout(T.timer),T.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));C_.clear(),D.clear(),Q.clear(),z.clear(),W.clear(),j.clear(),x.clear(),a.clear(),__.clear(),E_.clear(),c.clear(),S_.clear(),d.clear(),F_.length=0}}};var nE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var XO=new Set(nE);var iE=["none","agent","user"];var DO=new Set(iE);var WS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],QS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],rE=(_,S)=>{S.style.colorScheme=_.mode;for(let[A,M]of WS)S.style.setProperty(A,_.tokens[M]);for(let[A,M,D]of QS){let Q=_.tokens[D]??"";S.style.setProperty(A,Q),S.style.setProperty(M,Q)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},cT=(_,S)=>{if(rE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var YS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${YS[_]}, ${S}))`,r=F("surface-background","transparent"),i_=F("surface-elevated","transparent"),L_=F("surface-elevated-foreground","inherit"),h=F("surface-foreground","inherit"),$=F("surface-muted-foreground","gray"),KS=F("surface-muted","transparent"),O_=F("interactive-border","currentColor"),b=F("interactive-hover","transparent"),A_=F("interactive-active","transparent"),dT=F("interactive-selection","transparent"),pT=F("interactive-selection-foreground","inherit"),i=F("primary","currentColor"),vT=F("primary-text","inherit"),uT=F("error-text","inherit"),FS=F("font-sans","inherit"),lT=F("font-mono","monospace"),_S=F("radius","9px"),aT=`calc(${_S} - 2px)`,sE=`calc(${_S} - 4px)`,Z=(_,S,A="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${A})`,tE=`background-image: linear-gradient(${b}, ${b});`,oT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,nT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",eE="box-shadow: var(--oc-sdk-lit);",iT=`inset 0 0.5px 0 0 ${Z(h,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,BS=`
:root {
  --oc-sdk-edge: ${Z(h,16)};
  --oc-sdk-field-bg: ${i_};
  --oc-sdk-raised-bg: ${r};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(h,14)};
  --oc-sdk-field-bg: ${Z(r,50,i_)};
  --oc-sdk-raised-bg: ${i_};
  --oc-sdk-field-lift: ${iT};
  --oc-sdk-raised-lift: ${iT};
  --oc-sdk-lit: ${iT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,n_=(_)=>{let S=F(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${F(`${_}-text`,"inherit")}; }`},O=(_)=>`calc(${_}rem / 14)`,$S=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${O(8)}; height: ${O(32)}; padding: 0 ${O(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${O(6)}; height: ${O(28)}; padding: 0 ${O(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${O(4)}; height: ${O(24)}; padding: 0 ${O(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${O(14)}; height: ${O(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${O(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${O(32)}; padding: 0 ${O(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${O(8)} ${O(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${O(34)}; padding-right: ${O(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${O(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${O(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${O(24)}; height: ${O(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${O(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${O(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${O(28)}; padding: 0 ${O(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${O(2)}; min-width: ${O(160)}; max-width: calc(100vw - ${O(16)}); max-height: min(${O(320)}, calc(100vh - ${O(16)})); overflow: auto; padding: ${O(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${O(2)} ${O(2)} ${O(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${O(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${O(8)}; width: 100%; padding: ${O(6)} ${O(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${O(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${O(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${O(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${O(14)}; height: ${O(14)}; margin-top: ${O(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${O(36)}; height: ${O(20)}; --oc-sdk-thumb-travel: ${O(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${O(2)}; left: ${O(2)}; width: ${O(16)}; height: ${O(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${O(2)}; padding: ${O(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${O(6)}; height: ${O(28)}; padding: 0 ${O(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${O(1)} ${O(6)}; font-size: ${O(11)}; font-weight: 500; line-height: ${O(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${O(8)}; width: 100%; padding: ${O(6)} ${O(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${O(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${O(16)} ${O(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${O(4)}; padding: ${O(40)} ${O(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${O(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${O(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${O(16)}; height: ${O(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${O(12)}; height: ${O(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${O(12)}; padding: ${O(8)} ${O(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${O(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${O(8)}; width: 100%; margin: ${O(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${O(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${O(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${O(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${O(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${O(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${O(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${O(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${O(36)}; height: ${O(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${O(44)}; }
  .oc-sdk-check { min-height: ${O(36)}; padding: ${O(8)} 0; }
}
`,TS=`${BS}
.oc-sdk { color: ${h}; font-family: ${FS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${tE} }
.oc-sdk-mono { font-family: ${lT}; }
.oc-sdk-muted { color: ${$}; }
${n_("success")}${n_("warning")}${n_("error")}${n_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${i}; --oc-sdk-tone-text: ${vT}; }

.oc-sdk-btn { border-radius: ${aT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${sE}; }
.oc-sdk-btn[data-variant="default"] { color: ${vT}; background: ${Z(i,10,r)}; border-color: ${Z(i,12)}; ${eE} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(i,16,r)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(i,22,r)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${KS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${L_}; ${nT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${uT}; background: ${Z("var(--oc-sdk-tone)",7,r)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${eE} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,r)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,r)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${uT}; }
.oc-sdk-input { border-radius: ${aT}; background: var(--oc-sdk-field-bg); color: ${L_}; ${oT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${oT(Z(h,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${oT(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${lT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${i}; }
.oc-sdk-search-clear { border-radius: ${sE}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${h}; }

.oc-sdk-trigger { border-radius: ${aT}; background: var(--oc-sdk-raised-bg); color: ${L_}; ${nT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${L_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${i_}; background-clip: padding-box; color: ${L_}; box-shadow: var(--oc-sdk-float); }
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
.oc-sdk-check-box { border-color: ${O_}; border-radius: 4px; color: ${h}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(h,60,O_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${O_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${r}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${i}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${tE} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(h,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${h}; }
.oc-sdk-tab[aria-selected="true"] { color: ${pT}; background: ${dT}; border-color: ${O_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${L_}; background: var(--oc-sdk-raised-bg); ${nT} }
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
.oc-sdk-spinner-ring { border-color: ${O_}; border-top-color: ${i}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Z(O_,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(h,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${i}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${vT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(O_,60)}; }
`,H=`
${CT}
${$S}
${TS}`;var _T=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"zhihu",name:"知乎",channels:[{id:"hot",name:"热榜"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"csdn",name:"CSDN",channels:[{id:"hot",name:"热点"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var ST=[],OS=()=>{let _=document.querySelector("#msg2");if(_&&ST.length>0)_.innerHTML=`<div class="err">${ST.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{ST.push("页面错误："+String(_.message??_)),OS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,A=S?.code;ST.push("未处理异常"+(A?` [${A}]`:"")+"："+String(S?.message??S)),OS()});var k="v2ex",kS=["zhihu","toutiao","csdn"],e=()=>_T.find((_)=>_.id===k),HS=180000,t=mT(),AS=document.querySelector("#app");if(!AS)throw Error("Missing #app");AS.innerHTML=`
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
</div>`;var u=(_)=>document.querySelector(`#${_}`),jS=u("cname"),ES=u("topics"),xS="v0.8.3-websearch";jS.textContent="阅读";document.querySelector("#build").textContent=xS;var K_="",l=e().channels[0].id,T_=[],Q_=0,sT=!1,ET=new Map,tT=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},U_=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");var Y_=async(_)=>{try{return await t.storage.get(_)}catch{return}},OT=async(_,S)=>{try{await t.storage.set(_,S)}catch{}},eT=async(_,S,A)=>{let M=S;if(K_&&_==="GET"&&M.startsWith("/"))M+=(M.includes("?")?"&":"?")+`proxy=${encodeURIComponent(K_)}`;return t.serviceRequest({method:_,path:M,body:A})},wS=async()=>{let _=await Y_("moyu:community")??"v2ex";if(_T.some((A)=>A.id===_))k=_;K_=await Y_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=K_;let S=await Y_(`moyu:channel:${k}`)??"";if(l=e().channels[0].id,S&&e().channels.some((A)=>A.id===S))l=S},k_=()=>{let _=u("communities");_.innerHTML="";for(let S of _T){let A=document.createElement("button");A.className="nrow chan"+(k===S.id?" active":"");let M=ET.get(S.id),D=M?` <span class="ext" title="${U_(M)}">⚠</span>`:"";A.innerHTML=`<span class="dot">●</span><span class="tt">${U_(S.name)}${D}</span>`,A.onclick=()=>{if(k!==S.id)bS(S.id)},_.appendChild(A)}},bS=async(_)=>{k=_,await OT("moyu:community",k),l=e().channels[0].id,T_=[],Q_=0,document.querySelector("#cfg-out").textContent="";let S=await Y_(`moyu:channel:${k}`)??"";if(S&&e().channels.some((A)=>A.id===S))l=S;k_(),US(),R_(!0)},TE=()=>{let _=e().channels.length<=1;if(u("sec-channels").style.display=_?"none":"",u("chanrow2").style.display=_?"none":"",_)return;let S=u("channels");S.innerHTML="";for(let A of e().channels){let M=document.createElement("button");M.className="nrow chan"+(l===A.id?" active":""),M.innerHTML=`<span class="dot">#</span><span class="tt">${U_(A.name)}</span>`,M.onclick=()=>{if(l!==A.id)l=A.id,Q_=0,OT(`moyu:channel:${k}`,l),TE(),R_(!0)},S.appendChild(M)}},US=()=>{k_(),TE(),u("tcount").textContent=T_.length>0?`${T_.length}`:"",ES.innerHTML="";for(let _ of T_){let S=document.createElement("div");S.className="nrow";let A=_.excerpt?`<br><span class="xp">${U_(_.excerpt)}</span>`:"";S.innerHTML=`<span class="tt">${U_(_.title)}${A}</span>`;let M=document.createElement("button");M.className="aibtn",M.title="AI 总结这篇",M.textContent="✦",M.onclick=()=>void qS(_,S,M),S.appendChild(M),ES.appendChild(S)}},SS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),qS=async(_,S,A)=>{let M=S.querySelector(".aisum");if(M){M.remove();return}let D=`moyu:csum:${k}:${_.id}`;A.disabled=!0;let Q=A.textContent;A.textContent="…";try{let z=await Y_(D),W=typeof z==="string"&&z?z:"";if(!W){let x=await eT("GET",`/thread?community=${k}&id=${encodeURIComponent(_.id)}&page=1`),a=JSON.parse(x.body);if(!a.ok||!a.thread)throw Error(a.error??"正文失败");let __=a.thread,E_=[__.opening?SS(__.opening.html):"",...__.posts.map((c)=>SS(c.html))].filter(Boolean).join(`
`).slice(0,3500);if(!E_){if(!kS.includes(_.community))throw Error("这篇没有可总结的正文");let c="";try{let S_=await eT("GET",`/search?q=${encodeURIComponent(_.title)}`),d=JSON.parse(S_.body);if(d.ok&&d.results&&d.results.length>0){let F_=d.results.slice(0,5).map((o,I_)=>`${I_+1}. 「${o.title}」${o.snippet}${o.site?`（${o.site}）`:""}`).join(`
`).slice(0,2500);c=(await t.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${F_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(c)W=c+"（联网版）";else{if(W=(await t.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${e().name}/${_.channel??""}】${_.title}`,maxOutputTokens:64})).text.trim().slice(0,80),!W)throw Error("小模型没有返回总结");W+="（标题版）"}}else if(W=(await t.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${E_}`,maxOutputTokens:256})).text.trim().slice(0,500),!W)throw Error("小模型没有返回总结");await OT(D,W)}let j=document.createElement("div");j.className="aisum",j.textContent=`✦ ${W}`,S.appendChild(j)}catch(z){let W=z?.code,j=W==="NO_MODEL"?"无可用小模型":W==="MODEL_FAILED"?"小模型出错":z instanceof Error?z.message:"未知错误",x=document.createElement("div");x.className="aisum",x.textContent=`总结失败：${j}`,S.appendChild(x)}finally{A.disabled=!1,A.textContent=Q}},R_=async(_=!1)=>{if(sT||document.hidden)return;let S=await Y_(`moyu:channel:${k}`)??"";if(S&&S!==l&&e().channels.some((A)=>A.id===S))l=S,Q_=0;if(!_&&Date.now()-Q_<HS&&T_.length>0)return;sT=!0;try{let A=await eT("GET",`/list?community=${k}&channel=${encodeURIComponent(l)}`),M=JSON.parse(A.body);if(!M.ok){let D=M.error??"列表失败";ET.set(k,D),k_(),tT(U_(D));return}tT(""),ET.delete(k),T_=M.topics??[],Q_=Date.now(),US()}catch(A){let M=A?.code,D=M==="NO_SERVICE"?"（service 没起来：去 设置→扩展 看阅读卡片上的 service 错误）":M==="NOT_GRANTED"?"（service 能力没批准：重装时勾上）":"",Q=`列表失败${M?` [${M}]`:""}：${A instanceof Error?A.message:"未知错误"}${D}`;ET.set(k,Q),k_(),tT(U_(Q));return}finally{sT=!1}};u("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){u("cfg-out").textContent="格式不对，要 http(s)://host:port";return}K_=_,await OT("moyu:proxy",K_),u("cfg-out").textContent="已保存，正在测试…",Q_=0,await R_(!0),u("cfg-out").textContent=T_.length>0?`连通（${T_.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")R_(!0);else if(_.key==="q")t.close()});var TT=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(TT++,TT>=2)TT=0,t.close();setTimeout(()=>TT=0,500)}});document.addEventListener("visibilitychange",()=>{if(!document.hidden)R_(!1)});t.onReady((_)=>{cT(_,document.documentElement)});var _E=()=>{let _=document.documentElement.clientWidth;document.body.dataset.narrow=_>0&&_<700?"1":""};if(typeof ResizeObserver<"u")new ResizeObserver(()=>_E()).observe(document.documentElement);else window.addEventListener("resize",()=>_E());_E();wS().then(()=>{k_(),TE(),R_(!0)});setInterval(()=>void R_(!1),60000);})();
