(()=>{var V="openchamber.sdk",N=1;var MT=`
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
`;function GE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(C)=>{let D=C.target===_?S:C.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let P=O.get(D);if(P!==void 0)clearTimeout(P);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var IS=`(${GE.toString()})(document);`;var IT=128,CT=65536;var x_=128;var w_=65536;var XT=8000,GT=192000,DT=120000;var DE=(_)=>{let S=[],O=0,C=0;return{push:(D)=>{S.push(D),C+=D.length;while(C-O>_&&S.length>1){let P=S.shift();C-=P?.length??0,O=0}},pull:(D)=>{let P=0;while(P<D.length&&S.length>0){let z=S[0],Q=Math.min(D.length-P,z.length-O);if(D.set(z.subarray(O,O+Q),P),P+=Q,O+=Q,O>=z.length)S.shift(),C-=z.length,O=0}D.fill(0,P)},clear:()=>{S.length=0,O=0,C=0},get size(){return C-O}}};var LE=/^[a-z][a-z0-9-]{0,39}$/;var VE=(_)=>Object(_)===_&&!Array.isArray(_),VT=(_,S)=>Object.keys(_).every((O)=>S.includes(O)),NE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,PE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,WE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let O of _){if(!VE(O)||!LE.test(O.id)||!NE(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(S.has(O.id))return!1;if(S.add(O.id),O.kind==="button"){if(!VT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!VT(O,["kind","id","label","value","options","disabled"]))return!1;if(!PE(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let C=new Set;for(let D of O.options){if(!VE(D)||!VT(D,["value","label"])||!PE(D.value)||!NE(D.label)||C.has(D.value))return!1;C.add(D.value)}if(!C.has(O.value))return!1}return!0};var QE=["{id}","{segment}","{segments+}"];var aS=new Set(QE);var YE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var nS=new Set(YE);var b_=20000000,q_=256;var NT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,KE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==S.bytes[O])return!1;return!0};var FE=/^[A-Za-z0-9_-]{1,80}$/;var BE=["left","right","top","bottom"];var $E=(_,S=0,O={remaining:16000})=>{if(--O.remaining<0||S>=32)return!1;if(_===null)return!0;let C=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of C)if(!$E(D,S+1,O))return!1;return!0},PT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(PT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(PT)}return String(_)===_||Number.isFinite(_)},LT=(_)=>{try{if(String(_.id)!==_.id||!FE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!BE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!$E(_.data)||!PT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var QT=2000;var zE=["file","directory","other","missing"],YT=(_)=>Boolean(_&&"sessionId"in _),KT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var fE=/^[0-9a-f]{7,64}$/i,FT=(_)=>fE.test(_),y_=500,g_=32000,JE=16000,kE=128,HE=200,jE=2000,xE=16000,wE=80,bE=200,qE=16000;var yE=2000;var BT=20000,h_=1024,m_=2000000;var c_=64000,d_=8000,$T=4000;var ZT=960000;var gE=999,hE=1e4,$_=500,mE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],cE=["stopped","starting","ready","failed"],XS=new Set(mE),dE=(_)=>XS.has(_),pE=(_)=>_&&dE(_)?_:"HOST_REJECTED",C_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(C_);if(Object(_)===_)return Object.values(_).every(C_);return!1},vE=(_)=>C_(_)&&JSON.stringify(_).length<=qE,ZE=(_)=>_?.trim().slice(0,bE)??"",X_=(_)=>{let S=_.id.trim().slice(0,kE),O=_.title.trim().slice(0,HE),C=_.url.trim().slice(0,jE),D=_.text?.trim().slice(0,xE),P=_.author?.trim().slice(0,wE),z=_.kind==="pull"?"pull":"issue",Q={providerId:_.providerId.trim(),id:S,title:O||S,url:C,kind:z};if(D)Q.text=D;if(P)Q.author=P;if(z==="pull"){let H=ZE(_.branches?.head),j=ZE(_.branches?.base);if(H&&j)Q.branches={head:H,base:j}}if(vE(_.data))Q.data=_.data;return Q},zT=(_)=>{let S=X_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},fT=(_)=>{let S={text:_.text.trim().slice(0,JE)};if(_.send)S.send=!0;return S},JT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(gE,Math.max(0,Math.round(_)))},kT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(hE,Math.max(0,Math.ceil(_)))};var G_=(_)=>_.length>0&&_.length<=h_&&!_.includes("\x00")&&!_.includes("\\");var p_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>yE)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},GS=new Set(cE),HT=(_)=>Boolean(_&&"status"in _&&GS.has(String(_.status))&&!("body"in _)),v_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),jT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),xT=(_)=>Boolean(_&&"written"in _&&_.written===!0),wT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),DS=new Set(zE),bT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&DS.has(String(_.kind))&&Number.isFinite(_.size)),qT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),VS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),NS=(_)=>Object(_)===_?_:null,WT=(_)=>String(_)===_&&_.length>0,PS=(_)=>{if(!WT(_.id))return null;if(_.ok===!0){let S={channel:V,v:N,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&WT(_.error))return{channel:V,v:N,type:"result",id:_.id,ok:!1,error:_.error,code:pE(WT(_.code)?_.code:void 0)};return null},yT=(_)=>{let S=NS(_);if(!S||S.channel!==V||S.v!==N)return null;if(S.type==="result")return PS(S);if(!VS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var uE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),LS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var lE=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),u_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${h_} characters without NUL or backslash.`)),l_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},gT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===S.parent),C=_.requestTimeoutMs??BT,D=new Set,P=new Set,z=new Set,Q=new Set,H=new Set,j=new Set,u=new Set,r=new Set,T_=new Set,s=new Set,z_=new Set,A_=new Set,ET=[],W_=null,Q_=null,f_=new Set,J_=new Set,Y_=null,K_=null,ST=!1,U_=new Map,R_=new Map,M_=new Map,c=!1,X={value:0},I=null,l=null,F_=!1,B_=!1,_E=null,y=null,TE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},x=(T)=>{S.parent.postMessage(T,"*")},EE=()=>{if(c||S.parent===S||A_.size===0||I?.features?.lateGenerateResults!==!0)return;x({channel:V,v:N,type:"generate-late-listen"})},Y=(T,E)=>{for(let R of T)try{R(E)}catch(U){console.error(U)}},SE=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let E=yT(T.data);if(!E)return;if(E.type==="workspace"){let U=R_.get(E.payload.subscriptionId);if(U)Y([U],E.payload.snapshot);return}if(E.type==="shells"){let U=M_.get(E.payload.subscriptionId);if(U)Y([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){y?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=y;if(!U)return;y=null,U.release(),Y(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(I=E.payload,l=TE(E.payload.session),Y(D,E.payload),Y(P,E.payload.directory),Y(z,E.payload.session),l)Y(Q,l);if(Y(H,E.payload.connection),Y(j,E.payload.settings),Y(u,E.payload.item),E.payload.block)Y(r,E.payload.block);EE();return}if(E.type==="service-event"){Y(T_,E.payload);return}if(E.type==="generate-late"){if(A_.size===0)ET.push(E.payload);else Y(A_,E.payload);return}if(E.type==="directory"){if(I)I={...I,directory:E.payload.directory};Y(P,E.payload.directory);return}if(E.type==="session"){if(I)I={...I,session:E.payload.session};if(!E.payload.session)l=null;else if(l?.sessionId!==E.payload.session.id)l=TE(E.payload.session);Y(z,E.payload.session);return}if(E.type==="session-lifecycle"){l=E.payload,Y(Q,E.payload);return}if(E.type==="connection"){if(I)I={...I,connection:E.payload.connection};Y(H,E.payload.connection);return}if(E.type==="settings"){if(I)I={...I,settings:E.payload.settings};Y(j,E.payload.settings);return}if(E.type==="item"){if(I)I={...I,item:E.payload.item};Y(u,E.payload.item);return}if(E.type==="status-control-event"){Y(s,E.payload);return}if(E.type==="popover-closed"){Y(z_,E.payload);return}if(E.type==="action"){let U=(W)=>{if(!c)x({channel:V,v:N,type:"action-result",id:E.id,payload:W})},L=Q_;if(!L){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>L(E.payload)).then(()=>U({ok:!0}),(W)=>{let K=(W instanceof Error?W.message:String(W)).trim();U({ok:!1,error:(K||"Action failed.").slice(0,$_)})});return}if(E.type==="file-open"){let U=E.payload;if(K_&&KE(K_,U))return;K_=U,Y(f_,E.payload);return}if(E.type==="file-saved"){Y(J_,E.payload.version);return}if(E.type==="file-snapshot"){let U=(K)=>{if(!c)x({channel:V,v:N,type:"file-snapshot-result",id:E.id,payload:K})},L=(K)=>U({error:(K.trim()||"Could not read the edited file.").slice(0,$_)}),W=Y_;if(!W){L("This extension does not edit files.");return}Promise.resolve().then(()=>W(E.payload.purpose)).then((K)=>{if(NT(K)>b_){L(`The file is over ${b_} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>q_){L(`The snapshot version is over ${q_} characters.`);return}U({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>L(K instanceof Error?K.message:String(K)));return}if(E.type==="resolve"){let U=(W)=>{x({channel:V,v:N,type:"resolve-result",id:E.id,payload:W})},L=W_;if(!L){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>L(E.payload)).then((W)=>U({item:W?X_(W):null}),(W)=>{let K=(W instanceof Error?W.message:String(W)).trim();U({error:(K||"Command failed.").slice(0,$_)})});return}let R=U_.get(E.id);if(!R)return;if(clearTimeout(R.timer),U_.delete(E.id),E.ok){R.resolve(E.payload);return}R.reject(new M(E.code,E.error))};S.addEventListener("message",SE),x({channel:V,v:N,type:"hello"});let J=(T,E=C)=>{if(c||S.parent===S)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,U)=>{let L=setTimeout(()=>{U_.delete(T.id),U(new M("HOST_TIMEOUT","Host did not answer in time."))},E);U_.set(T.id,{resolve:R,reject:U,timer:L}),x(T)})},f=(T)=>J(T).then(()=>{return}),B={channel:V,v:N},OT=(T)=>{if(!c&&S.parent!==S)x(T)},OE=()=>OT({...B,type:"file-save"}),AT=()=>{if(!c&&S.parent!==S)x({...B,type:"microphone-close",id:G(X)})},RS=async()=>{if(y)throw new M("HOST_REJECTED","The microphone is already open in this frame.");if(I?.features?.microphone!==!0)throw new M("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new M("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<XT||E.sampleRate>GT)throw E.close().catch(()=>{return}),new M("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let R=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=DE(Math.round(E.sampleRate/4)),L=E.createScriptProcessor(1024,1,1);L.onaudioprocess=(m)=>U.pull(m.outputBuffer.getChannelData(0));let W=E.createMediaStreamDestination();L.connect(W);let K=new Set,I_={queue:U,endedListeners:K,release:()=>{L.onaudioprocess=null,L.disconnect(),U.clear();for(let m of W.stream.getTracks())m.stop();E.close().catch(()=>{return})}};y=I_;try{let m=await J({...B,type:"microphone-open",id:G(X),payload:{sampleRate:E.sampleRate}},DT);if(!m||!("opened"in m)||m.opened!==!0)throw new M("HOST_REJECTED","Host did not open the microphone.");if(await R,y!==I_)throw new M("DISCONNECTED","The microphone closed while it was opening.")}catch(m){if(y===I_)y=null;throw I_.release(),AT(),m}return{stream:W.stream,close:()=>{if(y!==I_)return;y=null,I_.release(),AT()},onEnded:(m)=>{return K.add(m),()=>{K.delete(m)}}}},AE=(T)=>{if(!uE(T)||!LS(T))return;T.preventDefault(),OE()},UE=(T)=>{if(!uE(T)||T.key!=="Escape"||I?.surface!=="popover"||!I.popover)return;T.preventDefault(),CE(I.popover.id,"escape").catch(()=>{return})},k_=()=>{let T=I?.surface==="popover"?I.popover:void 0;if(!T)return;let E=F_||B_;if(_E===E)return;_E=E,XE(T.id,E).catch(()=>{return})},H_=()=>{if(I?.surface!=="popover"||F_)return;F_=!0,k_()},RE=(T)=>{if(I?.surface!=="popover"||T.relatedTarget!==null||!F_)return;F_=!1,k_()},ME=()=>{if(I?.surface!=="popover"||B_)return;B_=!0,k_()},IE=()=>{if(I?.surface!=="popover"||!B_)return;B_=!1,k_()},d=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new M("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},UT=async(T)=>{if(T.kind!=="projects")d(T.projectId);let E=await J({...B,type:"workspace-read",id:G(X),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return E},RT=async(T,E)=>{if(T.kind!=="projects")d(T.projectId);let R=G(X);R_.set(R,E);try{await f({...B,type:"workspace-subscribe",id:G(X),payload:{subscriptionId:R,query:T}})}catch(U){if(R_.delete(R),!c)x({...B,type:"workspace-unsubscribe",id:G(X),payload:{subscriptionId:R}});throw U}return()=>{if(!R_.delete(R)||c)return;x({...B,type:"workspace-unsubscribe",id:G(X),payload:{subscriptionId:R}})}},MS=async(T,E)=>{if(T.kind==="session")d(T.sessionId);if(T.kind==="project")d(T.projectId);let R=G(X);M_.set(R,E);try{await f({...B,type:"shells-subscribe",id:G(X),payload:{subscriptionId:R,scope:T}})}catch(U){if(M_.delete(R),!c)x({...B,type:"shells-unsubscribe",id:G(X),payload:{subscriptionId:R}});throw U}return()=>{if(!M_.delete(R)||c)return;x({...B,type:"shells-unsubscribe",id:G(X),payload:{subscriptionId:R}})}},j_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>IT))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!C_(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>CT)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&I?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let E=await J({...B,type:"storage",id:G(X),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return E},CE=(T,E)=>I?.features?.popovers!==!0&&!(I?.surface==="popover"&&I.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):f({...B,type:"popover-close",id:G(X),payload:E?{id:T,reason:E}:{id:T}}),XE=(T,E)=>I?.features?.popovers!==!0&&!(I?.surface==="popover"&&I.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):f({...B,type:"popover-anchor",id:G(X),payload:{id:T,active:E}});return S.addEventListener("keydown",UE,!0),S.addEventListener("pointerover",H_),S.addEventListener("pointermove",H_),S.addEventListener("pointerout",RE),S.addEventListener("focus",ME),S.addEventListener("blur",IE),{onAction:(T)=>{return Q_=T,()=>{if(Q_===T)Q_=null}},listProjects:async()=>{let T=await UT({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await UT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await UT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>RT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>RT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")E(R)}),onSessions:(T,E)=>RT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")E(R)}),onRunningShells:(T,E)=>MS(T,E),readShellOutput:async(T,E)=>{d(T,x_);let R=E?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>w_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${w_}.`);let W=await J({...B,type:"shell-output",id:G(X),payload:{shellId:T,cursor:R,tailBytes:U}});if(!W||typeof W.output!=="string"||!Number.isFinite(W.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async(T)=>{if(d(T,x_),(await J({...B,type:"shell-stop",id:G(X),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{d(T),await f({...B,type:"open-session",id:G(X),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let R=l_(E),U={op:"get",key:T};if(R)U.scope=R;let L=await j_(U);return L.op==="get"&&L.found?L.value:void 0},set:async(T,E,R)=>{let U=l_(R),L={op:"set",key:T,value:E};if(U)L.scope=U;await j_(L)},delete:async(T,E)=>{let R=l_(E),U={op:"delete",key:T};if(R)U.scope=R;await j_(U)},keys:async(T)=>{let E=l_(T),R={op:"keys"};if(E)R.scope=E;let U=await j_(R);if(U.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(D.add(T),I)T(I);return()=>{D.delete(T)}},onDirectory:(T)=>{if(P.add(T),I)T(I.directory);return()=>{P.delete(T)}},onSession:(T)=>{if(z.add(T),I)T(I.session);return()=>{z.delete(T)}},onSessionLifecycle:(T)=>{if(Q.add(T),l)T(l);return()=>{Q.delete(T)}},onConnection:(T)=>{if(H.add(T),I)T(I.connection);return()=>{H.delete(T)}},onSettings:(T)=>{if(j.add(T),I)T(I.settings);return()=>{j.delete(T)}},onItem:(T)=>{if(u.add(T),I)T(I.item);return()=>{u.delete(T)}},onBlock:(T)=>{if(r.add(T),I?.block)T(I.block);return()=>{r.delete(T)}},onServiceEvent:(T)=>{return T_.add(T),()=>{T_.delete(T)}},onStatusControl:(T)=>{return s.add(T),()=>{s.delete(T)}},onPopoverClosed:(T)=>{return z_.add(T),()=>{z_.delete(T)}},setStatusControls:(T)=>{if(I?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!WE(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return f({...B,type:"status-controls",id:G(X),payload:{controls:T}})},openPopover:(T)=>{if(I?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!LT(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return f({...B,type:"popover-open",id:G(X),payload:T})},closePopover:CE,setPopoverAnchorActive:XE,onResolve:(T)=>{return W_=T,()=>{if(W_===T)W_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>y_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${y_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>g_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${g_} characters.`));return f({channel:V,v:N,type:"toast",id:G(X),payload:{...T,message:E}})},openUrl:(T)=>f({channel:V,v:N,type:"open-url",id:G(X),payload:{url:T}}),openCommit:(T)=>FT(T)?f({channel:V,v:N,type:"open-commit",id:G(X),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>f({channel:V,v:N,type:"block-answer",id:G(X),payload:{text:T.trim().slice(0,QT)}}),openSurface:(T)=>f({channel:V,v:N,type:"open-surface",id:G(X),payload:{surfaceId:T}}),writeClipboard:(T)=>f({channel:V,v:N,type:"clipboard-write",id:G(X),payload:{text:T}}),compose:(T)=>f({channel:V,v:N,type:"compose",id:G(X),payload:T}),attach:(T)=>f({channel:V,v:N,type:"attach",id:G(X),payload:X_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)d(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")d(E.directory);else{if(E.name!==void 0)d(E.name,200);if(E.baseBranch!==void 0)d(E.baseBranch,200)}let R=await J({channel:V,v:N,type:"start-session",id:G(X),payload:zT(T)},_.requestTimeoutMs??180000);if(!YT(R))throw new M("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>J({channel:V,v:N,type:"prompt",id:G(X),payload:fT(T)}).then((E)=>{if(!KT(E))throw new M("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>f({channel:V,v:N,type:"session-link",id:G(X),payload:X_(T)}),close:()=>f({channel:V,v:N,type:"close",id:G(X)}),oauthStart:()=>f({channel:V,v:N,type:"oauth-start",id:G(X)}),oauthDisconnect:()=>f({channel:V,v:N,type:"oauth-disconnect",id:G(X)}),request:(T)=>(p_(T.path)?J({channel:V,v:N,type:"request",id:G(X),payload:T}):lE()).then((E)=>{if(!v_(E))throw new M("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(p_(T.path)?J({channel:V,v:N,type:"service-request",id:G(X),payload:T}):lE()).then((E)=>{if(!v_(E))throw new M("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>J({channel:V,v:N,type:"service-status",id:G(X)}).then((T)=>{if(!HT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(G_(T)?J({channel:V,v:N,type:"file-read",id:G(X),payload:{path:T}}):u_()).then((E)=>{if(!jT(E))throw new M("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!G_(T))return u_();if(E.length>m_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${m_} characters.`));return J({channel:V,v:N,type:"file-write",id:G(X),payload:{path:T,content:E}}).then((R)=>{if(!xT(R))throw new M("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(G_(T)?J({channel:V,v:N,type:"file-list",id:G(X),payload:{path:T}}):u_()).then((E)=>{if(!wT(E))throw new M("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(G_(T)?J({channel:V,v:N,type:"file-stat",id:G(X),payload:{path:T}}):u_()).then((E)=>{if(!bT(E))throw new M("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),R=T.system?.trim();if(E.length===0||E.length>c_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${c_} characters.`));if(R!==void 0&&(R.length===0||R.length>d_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${d_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min($T,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let L={prompt:E};if(R!==void 0)L.system=R;if(U!==void 0)L.maxOutputTokens=U;return J({channel:V,v:N,type:"generate",id:G(X),payload:L},_.requestTimeoutMs??ZT).then((W)=>{if(!qT(W))throw new M("HOST_REJECTED","Host did not return generated text.");return W})},onLateGenerateResult:(T)=>{A_.add(T);for(let E of ET.splice(0))Y([T],E);return EE(),()=>{A_.delete(T)}},openMicrophone:RS,setBadge:(T)=>f({channel:V,v:N,type:"badge",id:G(X),payload:{count:JT(T)}}),setHeight:(T)=>f({channel:V,v:N,type:"resize",id:G(X),payload:{height:kT(T)}}),onFileOpen:(T)=>{if(f_.add(T),!ST)ST=!0,S.addEventListener("keydown",AE,!0);if(K_)T(K_);return()=>{f_.delete(T)}},onFileSnapshot:(T)=>{return Y_=T,()=>{if(Y_===T)Y_=null}},onFileSaved:(T)=>{return J_.add(T),()=>{J_.delete(T)}},reportFileChange:(T)=>OT({...B,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:OE,reportFileUnsupported:()=>OT({...B,type:"file-unsupported"}),dispose:()=>{for(let T of R_.keys())x({...B,type:"workspace-unsubscribe",id:G(X),payload:{subscriptionId:T}});R_.clear();for(let T of M_.keys())x({...B,type:"shells-unsubscribe",id:G(X),payload:{subscriptionId:T}});if(M_.clear(),y)AT(),y.release(),y=null;if(c=!0,W_=null,Q_=null,Y_=null,f_.clear(),J_.clear(),ST)S.removeEventListener("keydown",AE,!0);S.removeEventListener("message",SE),S.removeEventListener("keydown",UE,!0),S.removeEventListener("pointerover",H_),S.removeEventListener("pointermove",H_),S.removeEventListener("pointerout",RE),S.removeEventListener("focus",ME),S.removeEventListener("blur",IE);for(let T of U_.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));U_.clear(),D.clear(),P.clear(),z.clear(),Q.clear(),H.clear(),j.clear(),u.clear(),r.clear(),T_.clear(),s.clear(),z_.clear(),A_.clear(),ET.length=0}}};var aE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var XO=new Set(aE);var oE=["none","agent","user"];var DO=new Set(oE);var WS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],QS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],nE=(_,S)=>{S.style.colorScheme=_.mode;for(let[O,C]of WS)S.style.setProperty(O,_.tokens[C]);for(let[O,C,D]of QS){let P=_.tokens[D]??"";S.style.setProperty(O,P),S.style.setProperty(C,P)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},hT=(_,S)=>{if(nE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var YS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${YS[_]}, ${S}))`,o=F("surface-background","transparent"),o_=F("surface-elevated","transparent"),D_=F("surface-elevated-foreground","inherit"),g=F("surface-foreground","inherit"),$=F("surface-muted-foreground","gray"),KS=F("surface-muted","transparent"),E_=F("interactive-border","currentColor"),w=F("interactive-hover","transparent"),S_=F("interactive-active","transparent"),mT=F("interactive-selection","transparent"),cT=F("interactive-selection-foreground","inherit"),a=F("primary","currentColor"),dT=F("primary-text","inherit"),pT=F("error-text","inherit"),FS=F("font-sans","inherit"),vT=F("font-mono","monospace"),tE=F("radius","9px"),uT=`calc(${tE} - 2px)`,iE=`calc(${tE} - 4px)`,Z=(_,S,O="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${O})`,rE=`background-image: linear-gradient(${w}, ${w});`,lT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,aT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",sE="box-shadow: var(--oc-sdk-lit);",oT=`inset 0 0.5px 0 0 ${Z(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,BS=`
:root {
  --oc-sdk-edge: ${Z(g,16)};
  --oc-sdk-field-bg: ${o_};
  --oc-sdk-raised-bg: ${o};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(g,14)};
  --oc-sdk-field-bg: ${Z(o,50,o_)};
  --oc-sdk-raised-bg: ${o_};
  --oc-sdk-field-lift: ${oT};
  --oc-sdk-raised-lift: ${oT};
  --oc-sdk-lit: ${oT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,a_=(_)=>{let S=F(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${F(`${_}-text`,"inherit")}; }`},A=(_)=>`calc(${_}rem / 14)`,$S=`
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
`,eE=`${BS}
.oc-sdk { color: ${g}; font-family: ${FS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${rE} }
.oc-sdk-mono { font-family: ${vT}; }
.oc-sdk-muted { color: ${$}; }
${a_("success")}${a_("warning")}${a_("error")}${a_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${a}; --oc-sdk-tone-text: ${dT}; }

.oc-sdk-btn { border-radius: ${uT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${iE}; }
.oc-sdk-btn[data-variant="default"] { color: ${dT}; background: ${Z(a,10,o)}; border-color: ${Z(a,12)}; ${sE} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(a,16,o)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(a,22,o)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${KS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${S_}, ${S_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${D_}; ${aT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${S_}, ${S_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${S_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${pT}; background: ${Z("var(--oc-sdk-tone)",7,o)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${sE} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,o)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,o)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${pT}; }
.oc-sdk-input { border-radius: ${uT}; background: var(--oc-sdk-field-bg); color: ${D_}; ${lT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${lT(Z(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${lT(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${vT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${a}; }
.oc-sdk-search-clear { border-radius: ${iE}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${uT}; background: var(--oc-sdk-raised-bg); color: ${D_}; ${aT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${S_}, ${S_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${D_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${o_}; background-clip: padding-box; color: ${D_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${mT}; color: ${cT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${pT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Z(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${E_}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(g,60,E_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${E_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${o}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${a}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${rE} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${cT}; background: ${mT}; border-color: ${E_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${D_}; background: var(--oc-sdk-raised-bg); ${aT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Z(g,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${mT}; color: ${cT}; }
.oc-sdk-row-lead { font-family: ${vT}; color: ${$}; }
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
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${a}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${dT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(E_,60)}; }
`,k=`
${MT}
${$S}
${eE}`;var t_=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"zhihu",name:"知乎",channels:[{id:"hot",name:"热榜"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"csdn",name:"CSDN",channels:[{id:"hot",name:"热点"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var _T=[],ES=()=>{let _=document.querySelector("#msg2");if(_&&_T.length>0)_.innerHTML=`<div class="err">${_T.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{_T.push("页面错误："+String(_.message??_)),ES()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,O=S?.code;_T.push("未处理异常"+(O?` [${O}]`:"")+"："+String(S?.message??S)),ES()});var h="v2ex",SS=["zhihu","toutiao","csdn"],i=()=>t_.find((_)=>_.id===h),kS=180000,__=gT(),OS=document.querySelector("#app");if(!OS)throw Error("Missing #app");OS.innerHTML=`
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
</div>`;var p=(_)=>document.querySelector(`#${_}`),HS=p("cname"),_S=p("topics"),jS="v0.8.0-list";HS.textContent="阅读";document.querySelector("#build").textContent=jS;var L_="",v=i().channels[0].id,e=[],N_=0,iT=!1,rT=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},t=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),xS=(_)=>{if(!_)return"";let S=Date.now()-_;if(S<60000)return"刚刚";if(S<3600000)return`${Math.floor(S/60000)} 分钟前`;if(S<86400000)return`${Math.floor(S/3600000)} 小时前`;return new Date(_).toLocaleDateString()},P_=async(_)=>{try{return await __.storage.get(_)}catch{return}},TT=async(_,S)=>{try{await __.storage.set(_,S)}catch{}},AS=async(_,S,O)=>{let C=S;if(L_&&_==="GET"&&C.startsWith("/"))C+=(C.includes("?")?"&":"?")+`proxy=${encodeURIComponent(L_)}`;return __.serviceRequest({method:_,path:C,body:O})},wS=async()=>{let _=await P_("moyu:community")??"v2ex";if(t_.some((O)=>O.id===_))h=_;L_=await P_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=L_;let S=await P_(`moyu:channel:${h}`)??"";if(v=i().channels[0].id,S&&i().channels.some((O)=>O.id===S))v=S},tT=()=>{let _=p("communities");_.innerHTML="";for(let S of t_){let O=document.createElement("button");O.className="nrow chan"+(h===S.id?" active":""),O.innerHTML=`<span class="dot">●</span><span class="tt">${t(S.name)}</span>`,O.onclick=()=>{if(h!==S.id)bS(S.id)},_.appendChild(O)}},bS=async(_)=>{h=_,await TT("moyu:community",h),v=i().channels[0].id,e=[],N_=0,document.querySelector("#cfg-out").textContent="";let S=await P_(`moyu:channel:${h}`)??"";if(S&&i().channels.some((O)=>O.id===S))v=S;tT(),US(),O_(!0)},eT=()=>{let _=i().channels.length<=1;if(p("sec-channels").style.display=_?"none":"",p("chanrow2").style.display=_?"none":"",_)return;let S=p("channels");S.innerHTML="";for(let O of i().channels){let C=document.createElement("button");C.className="nrow chan"+(v===O.id?" active":""),C.innerHTML=`<span class="dot">#</span><span class="tt">${t(O.name)}</span>`,C.onclick=()=>{if(v!==O.id)v=O.id,N_=0,TT(`moyu:channel:${h}`,v),eT(),O_(!0)},S.appendChild(C)}},US=()=>{tT(),eT(),p("tcount").textContent=e.length>0?`${e.length}`:"",_S.innerHTML="";for(let _ of e){let S=document.createElement("div");S.className="nrow";let O=[];if(_.author)O.push(t(_.author));if(_.channel)O.push(t(_.channel));if(_.replies!==null)O.push(`${_.replies}回复`);if(_.time)O.push(xS(_.time));let C=SS.includes(_.community)?' <span class="ext" title="该源无可抓正文，✦ 为标题版总结">↗</span>':"",D=_.excerpt?`<br><span class="xp">${t(_.excerpt)}</span>`:"";S.innerHTML=`<span class="tt">${t(_.title)}${C}${D}${O.length>0?`<br><span class="mm" style="font-size:12px;color:var(--oc-muted,#999)">${O.join(" · ")}</span>`:""}</span>`;let P=document.createElement("button");P.className="aibtn",P.title="AI 总结这篇",P.textContent="✦",P.onclick=()=>void qS(_,S,P),S.appendChild(P),_S.appendChild(S)}},TS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),qS=async(_,S,O)=>{let C=S.querySelector(".aisum");if(C){C.remove();return}let D=`moyu:csum:${h}:${_.id}`;O.disabled=!0;let P=O.textContent;O.textContent="…";try{let z=await P_(D),Q=typeof z==="string"&&z?z:"";if(!Q){let j=await AS("GET",`/thread?community=${h}&id=${encodeURIComponent(_.id)}&page=1`),u=JSON.parse(j.body);if(!u.ok||!u.thread)throw Error(u.error??"正文失败");let r=u.thread,T_=[r.opening?TS(r.opening.html):"",...r.posts.map((s)=>TS(s.html))].filter(Boolean).join(`
`).slice(0,3500);if(!T_){if(!SS.includes(_.community))throw Error("这篇没有可总结的正文");if(Q=(await __.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${i().name}/${_.channel??""}】${_.title}`,maxOutputTokens:64})).text.trim().slice(0,80),!Q)throw Error("小模型没有返回总结");Q+="（标题版）"}else if(Q=(await __.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${T_}`,maxOutputTokens:256})).text.trim().slice(0,500),!Q)throw Error("小模型没有返回总结");await TT(D,Q)}let H=document.createElement("div");H.className="aisum",H.textContent=`✦ ${Q}`,S.appendChild(H)}catch(z){let Q=z?.code,H=Q==="NO_MODEL"?"无可用小模型":Q==="MODEL_FAILED"?"小模型出错":z instanceof Error?z.message:"未知错误",j=document.createElement("div");j.className="aisum",j.textContent=`总结失败：${H}`,S.appendChild(j)}finally{O.disabled=!1,O.textContent=P}},O_=async(_=!1)=>{if(iT||document.hidden)return;let S=await P_(`moyu:channel:${h}`)??"";if(S&&S!==v&&i().channels.some((O)=>O.id===S))v=S,N_=0;if(!_&&Date.now()-N_<kS&&e.length>0)return;iT=!0;try{let O=await AS("GET",`/list?community=${h}&channel=${encodeURIComponent(v)}`),C=JSON.parse(O.body);if(!C.ok){rT(t(C.error??"列表失败"));return}rT(""),e=C.topics??[],N_=Date.now(),US()}catch(O){let C=O?.code,D=C==="NO_SERVICE"?"（service 没起来：去 设置→扩展 看阅读卡片上的 service 错误）":C==="NOT_GRANTED"?"（service 能力没批准：重装时勾上）":"";rT(t(`列表失败${C?` [${C}]`:""}：${O instanceof Error?O.message:"未知错误"}${D}`));return}finally{iT=!1}};p("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){p("cfg-out").textContent="格式不对，要 http(s)://host:port";return}L_=_,await TT("moyu:proxy",L_),p("cfg-out").textContent="已保存，正在测试…",N_=0,await O_(!0),p("cfg-out").textContent=e.length>0?`连通（${e.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")O_(!0);else if(_.key==="q")__.close()});var e_=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(e_++,e_>=2)e_=0,__.close();setTimeout(()=>e_=0,500)}});document.addEventListener("visibilitychange",()=>{if(!document.hidden)O_(!1)});__.onReady((_)=>{hT(_,document.documentElement)});var sT=()=>{let _=document.documentElement.clientWidth;document.body.dataset.narrow=_>0&&_<700?"1":""};if(typeof ResizeObserver<"u")new ResizeObserver(()=>sT()).observe(document.documentElement);else window.addEventListener("resize",()=>sT());sT();wS().then(()=>{tT(),eT(),O_(!0)});setInterval(()=>void O_(!1),60000);})();
