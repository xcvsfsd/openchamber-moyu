(()=>{var L="openchamber.sdk",W=1;var VT=`
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
`;function LE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let A=new WeakMap;_.addEventListener("scroll",(X)=>{let M=X.target===_?S:X.target;if(!(M instanceof Element))return;if(!M.hasAttribute("data-oc-scrolling"))M.setAttribute("data-oc-scrolling","");let N=A.get(M);if(N!==void 0)clearTimeout(N);A.set(M,setTimeout(()=>{A.delete(M),M.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var PS=`(${LE.toString()})(document);`;var NT=128,PT=65536;var w_=128;var b_=65536;var LT=8000,WT=192000,QT=120000;var WE=(_)=>{let S=[],A=0,X=0;return{push:(M)=>{S.push(M),X+=M.length;while(X-A>_&&S.length>1){let N=S.shift();X-=N?.length??0,A=0}},pull:(M)=>{let N=0;while(N<M.length&&S.length>0){let P=S[0],G=Math.min(M.length-N,P.length-A);if(M.set(P.subarray(A,A+G),N),N+=G,A+=G,A>=P.length)S.shift(),X-=P.length,A=0}M.fill(0,N)},clear:()=>{S.length=0,A=0,X=0},get size(){return X-A}}};var KE=/^[a-z][a-z0-9-]{0,39}$/;var QE=(_)=>Object(_)===_&&!Array.isArray(_),YT=(_,S)=>Object.keys(_).every((A)=>S.includes(A)),YE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,FE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,$E=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let A of _){if(!QE(A)||!KE.test(A.id)||!YE(A.label))return!1;if(A.disabled!==void 0&&A.disabled!==!0&&A.disabled!==!1)return!1;if(S.has(A.id))return!1;if(S.add(A.id),A.kind==="button"){if(!YT(A,["kind","id","label","disabled"]))return!1;continue}if(A.kind!=="select"||!YT(A,["kind","id","label","value","options","disabled"]))return!1;if(!FE(A.value)||!Array.isArray(A.options)||A.options.length<1||A.options.length>16)return!1;let X=new Set;for(let M of A.options){if(!QE(M)||!YT(M,["value","label"])||!FE(M.value)||!YE(M.label)||X.has(M.value))return!1;X.add(M.value)}if(!X.has(A.value))return!1}return!0};var BE=["{id}","{segment}","{segments+}"];var TO=new Set(BE);var ZE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var SO=new Set(ZE);var q_=20000000,y_=256;var FT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,zE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let A=0;A<_.bytes.byteLength;A+=1)if(_.bytes[A]!==S.bytes[A])return!1;return!0};var JE=/^[A-Za-z0-9_-]{1,80}$/;var kE=["left","right","top","bottom"];var fE=(_,S=0,A={remaining:16000})=>{if(--A.remaining<0||S>=32)return!1;if(_===null)return!0;let X=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let M of X)if(!fE(M,S+1,A))return!1;return!0},KT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(KT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(KT)}return String(_)===_||Number.isFinite(_)},$T=(_)=>{try{if(String(_.id)!==_.id||!JE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!kE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!fE(_.data)||!KT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var ZT=2000;var jE=["file","directory","other","missing"],zT=(_)=>Boolean(_&&"sessionId"in _),JT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var xE=/^[0-9a-f]{7,64}$/i,kT=(_)=>xE.test(_),g_=500,h_=32000,wE=16000,bE=128,qE=200,yE=2000,gE=16000,hE=80,mE=200,cE=16000;var dE=2000;var fT=20000,m_=1024,c_=2000000;var d_=64000,v_=8000,HT=4000;var jT=960000;var vE=999,pE=1e4,J_=500,uE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],lE=["stopped","starting","ready","failed"],WS=new Set(uE),aE=(_)=>WS.has(_),oE=(_)=>_&&aE(_)?_:"HOST_REJECTED",N_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(N_);if(Object(_)===_)return Object.values(_).every(N_);return!1},nE=(_)=>N_(_)&&JSON.stringify(_).length<=cE,HE=(_)=>_?.trim().slice(0,mE)??"",P_=(_)=>{let S=_.id.trim().slice(0,bE),A=_.title.trim().slice(0,qE),X=_.url.trim().slice(0,yE),M=_.text?.trim().slice(0,gE),N=_.author?.trim().slice(0,hE),P=_.kind==="pull"?"pull":"issue",G={providerId:_.providerId.trim(),id:S,title:A||S,url:X,kind:P};if(M)G.text=M;if(N)G.author=N;if(P==="pull"){let F=HE(_.branches?.head),z=HE(_.branches?.base);if(F&&z)G.branches={head:F,base:z}}if(nE(_.data))G.data=_.data;return G},xT=(_)=>{let S=P_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},wT=(_)=>{let S={text:_.text.trim().slice(0,wE)};if(_.send)S.send=!0;return S},bT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(vE,Math.max(0,Math.round(_)))},qT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(pE,Math.max(0,Math.ceil(_)))};var L_=(_)=>_.length>0&&_.length<=m_&&!_.includes("\x00")&&!_.includes("\\");var p_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>dE)return!1;return!_.split("/").some((A)=>A==="."||A==="..")},QS=new Set(lE),yT=(_)=>Boolean(_&&"status"in _&&QS.has(String(_.status))&&!("body"in _)),u_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),gT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),hT=(_)=>Boolean(_&&"written"in _&&_.written===!0),mT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),YS=new Set(jE),cT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&YS.has(String(_.kind))&&Number.isFinite(_.size)),dT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),FS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),KS=(_)=>Object(_)===_?_:null,BT=(_)=>String(_)===_&&_.length>0,$S=(_)=>{if(!BT(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&BT(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:oE(BT(_.code)?_.code:void 0)};return null},vT=(_)=>{let S=KS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return $S(S);if(!FS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var iE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),BS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class I extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var rE=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),l_=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${m_} characters without NUL or backslash.`)),a_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},V=(_)=>{return _.value+=1,`oc-${_.value}`},pT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let A=_.acceptSource??((T)=>T===S.parent),X=_.requestTimeoutMs??fT,M=new Set,N=new Set,P=new Set,G=new Set,F=new Set,z=new Set,K=new Set,__=new Set,A_=new Set,d=new Set,U_=new Set,v=new Set,K_=[],I_=null,a=null,C_=new Set,f_=new Set,$_=null,B_=null,IT=!1,G_=new Map,X_=new Map,D_=new Map,p=!1,D={value:0},C=null,i=null,Z_=!1,z_=!1,AE=null,h=null,UE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},b=(T)=>{S.parent.postMessage(T,"*")},RE=()=>{if(p||S.parent===S||v.size===0||C?.features?.lateGenerateResults!==!0)return;b({channel:L,v:W,type:"generate-late-listen"})},$=(T,E)=>{for(let R of T)try{R(E)}catch(U){console.error(U)}},ME=(T)=>{if(!(T instanceof MessageEvent))return;if(!A(T.source))return;let E=vT(T.data);if(!E)return;if(E.type==="workspace"){let U=X_.get(E.payload.subscriptionId);if(U)$([U],E.payload.snapshot);return}if(E.type==="shells"){let U=D_.get(E.payload.subscriptionId);if(U)$([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){h?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=h;if(!U)return;h=null,U.release(),$(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(C=E.payload,i=UE(E.payload.session),$(M,E.payload),$(N,E.payload.directory),$(P,E.payload.session),i)$(G,i);if($(F,E.payload.connection),$(z,E.payload.settings),$(K,E.payload.item),E.payload.block)$(__,E.payload.block);RE();return}if(E.type==="service-event"){$(A_,E.payload);return}if(E.type==="generate-late"){if(v.size===0)K_.push(E.payload);else $(v,E.payload);return}if(E.type==="directory"){if(C)C={...C,directory:E.payload.directory};$(N,E.payload.directory);return}if(E.type==="session"){if(C)C={...C,session:E.payload.session};if(!E.payload.session)i=null;else if(i?.sessionId!==E.payload.session.id)i=UE(E.payload.session);$(P,E.payload.session);return}if(E.type==="session-lifecycle"){i=E.payload,$(G,E.payload);return}if(E.type==="connection"){if(C)C={...C,connection:E.payload.connection};$(F,E.payload.connection);return}if(E.type==="settings"){if(C)C={...C,settings:E.payload.settings};$(z,E.payload.settings);return}if(E.type==="item"){if(C)C={...C,item:E.payload.item};$(K,E.payload.item);return}if(E.type==="status-control-event"){$(d,E.payload);return}if(E.type==="popover-closed"){$(U_,E.payload);return}if(E.type==="action"){let U=(Y)=>{if(!p)b({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=a;if(!Q){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>U({ok:!0}),(Y)=>{let B=(Y instanceof Error?Y.message:String(Y)).trim();U({ok:!1,error:(B||"Action failed.").slice(0,J_)})});return}if(E.type==="file-open"){let U=E.payload;if(B_&&zE(B_,U))return;B_=U,$(C_,E.payload);return}if(E.type==="file-saved"){$(f_,E.payload.version);return}if(E.type==="file-snapshot"){let U=(B)=>{if(!p)b({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:B})},Q=(B)=>U({error:(B.trim()||"Could not read the edited file.").slice(0,J_)}),Y=$_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then((B)=>{if(FT(B)>q_){Q(`The file is over ${q_} ${"bytes"in B?"bytes":"characters"}.`);return}if(B.version.length>y_){Q(`The snapshot version is over ${y_} characters.`);return}U({snapshot:"bytes"in B?{bytes:B.bytes,version:B.version}:{content:B.content,version:B.version}})},(B)=>Q(B instanceof Error?B.message:String(B)));return}if(E.type==="resolve"){let U=(Y)=>{b({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=I_;if(!Q){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>U({item:Y?P_(Y):null}),(Y)=>{let B=(Y instanceof Error?Y.message:String(Y)).trim();U({error:(B||"Command failed.").slice(0,J_)})});return}let R=G_.get(E.id);if(!R)return;if(clearTimeout(R.timer),G_.delete(E.id),E.ok){R.resolve(E.payload);return}R.reject(new I(E.code,E.error))};S.addEventListener("message",ME),b({channel:L,v:W,type:"hello"});let j=(T,E=X)=>{if(p||S.parent===S)return Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,U)=>{let Q=setTimeout(()=>{G_.delete(T.id),U(new I("HOST_TIMEOUT","Host did not answer in time."))},E);G_.set(T.id,{resolve:R,reject:U,timer:Q}),b(T)})},H=(T)=>j(T).then(()=>{return}),J={channel:L,v:W},CT=(T)=>{if(!p&&S.parent!==S)b(T)},IE=()=>CT({...J,type:"file-save"}),GT=()=>{if(!p&&S.parent!==S)b({...J,type:"microphone-close",id:V(D)})},VS=async()=>{if(h)throw new I("HOST_REJECTED","The microphone is already open in this frame.");if(C?.features?.microphone!==!0)throw new I("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new I("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<LT||E.sampleRate>WT)throw E.close().catch(()=>{return}),new I("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let R=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=WE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(c)=>U.pull(c.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let B=new Set,V_={queue:U,endedListeners:B,release:()=>{Q.onaudioprocess=null,Q.disconnect(),U.clear();for(let c of Y.stream.getTracks())c.stop();E.close().catch(()=>{return})}};h=V_;try{let c=await j({...J,type:"microphone-open",id:V(D),payload:{sampleRate:E.sampleRate}},QT);if(!c||!("opened"in c)||c.opened!==!0)throw new I("HOST_REJECTED","Host did not open the microphone.");if(await R,h!==V_)throw new I("DISCONNECTED","The microphone closed while it was opening.")}catch(c){if(h===V_)h=null;throw V_.release(),GT(),c}return{stream:Y.stream,close:()=>{if(h!==V_)return;h=null,V_.release(),GT()},onEnded:(c)=>{return B.add(c),()=>{B.delete(c)}}}},CE=(T)=>{if(!iE(T)||!BS(T))return;T.preventDefault(),IE()},GE=(T)=>{if(!iE(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),NE(C.popover.id,"escape").catch(()=>{return})},H_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let E=Z_||z_;if(AE===E)return;AE=E,PE(T.id,E).catch(()=>{return})},j_=()=>{if(C?.surface!=="popover"||Z_)return;Z_=!0,H_()},XE=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!Z_)return;Z_=!1,H_()},DE=()=>{if(C?.surface!=="popover"||z_)return;z_=!0,H_()},VE=()=>{if(C?.surface!=="popover"||!z_)return;z_=!1,H_()},u=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new I("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},XT=async(T)=>{if(T.kind!=="projects")u(T.projectId);let E=await j({...J,type:"workspace-read",id:V(D),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return E},DT=async(T,E)=>{if(T.kind!=="projects")u(T.projectId);let R=V(D);X_.set(R,E);try{await H({...J,type:"workspace-subscribe",id:V(D),payload:{subscriptionId:R,query:T}})}catch(U){if(X_.delete(R),!p)b({...J,type:"workspace-unsubscribe",id:V(D),payload:{subscriptionId:R}});throw U}return()=>{if(!X_.delete(R)||p)return;b({...J,type:"workspace-unsubscribe",id:V(D),payload:{subscriptionId:R}})}},NS=async(T,E)=>{if(T.kind==="session")u(T.sessionId);if(T.kind==="project")u(T.projectId);let R=V(D);D_.set(R,E);try{await H({...J,type:"shells-subscribe",id:V(D),payload:{subscriptionId:R,scope:T}})}catch(U){if(D_.delete(R),!p)b({...J,type:"shells-unsubscribe",id:V(D),payload:{subscriptionId:R}});throw U}return()=>{if(!D_.delete(R)||p)return;b({...J,type:"shells-unsubscribe",id:V(D),payload:{subscriptionId:R}})}},x_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>NT))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!N_(T.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>PT)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let E=await j({...J,type:"storage",id:V(D),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new I("HOST_REJECTED","Host did not return storage data.");return E},NE=(T,E)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):H({...J,type:"popover-close",id:V(D),payload:E?{id:T,reason:E}:{id:T}}),PE=(T,E)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):H({...J,type:"popover-anchor",id:V(D),payload:{id:T,active:E}});return S.addEventListener("keydown",GE,!0),S.addEventListener("pointerover",j_),S.addEventListener("pointermove",j_),S.addEventListener("pointerout",XE),S.addEventListener("focus",DE),S.addEventListener("blur",VE),{onAction:(T)=>{return a=T,()=>{if(a===T)a=null}},listProjects:async()=>{let T=await XT({kind:"projects"});if(T.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await XT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await XT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>DT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>DT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")E(R)}),onSessions:(T,E)=>DT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")E(R)}),onRunningShells:(T,E)=>NS(T,E),readShellOutput:async(T,E)=>{u(T,w_);let R=E?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>b_))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${b_}.`);let Y=await j({...J,type:"shell-output",id:V(D),payload:{shellId:T,cursor:R,tailBytes:U}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(u(T,w_),(await j({...J,type:"shell-stop",id:V(D),payload:{shellId:T}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{u(T),await H({...J,type:"open-session",id:V(D),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let R=a_(E),U={op:"get",key:T};if(R)U.scope=R;let Q=await x_(U);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,R)=>{let U=a_(R),Q={op:"set",key:T,value:E};if(U)Q.scope=U;await x_(Q)},delete:async(T,E)=>{let R=a_(E),U={op:"delete",key:T};if(R)U.scope=R;await x_(U)},keys:async(T)=>{let E=a_(T),R={op:"keys"};if(E)R.scope=E;let U=await x_(R);if(U.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(M.add(T),C)T(C);return()=>{M.delete(T)}},onDirectory:(T)=>{if(N.add(T),C)T(C.directory);return()=>{N.delete(T)}},onSession:(T)=>{if(P.add(T),C)T(C.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(G.add(T),i)T(i);return()=>{G.delete(T)}},onConnection:(T)=>{if(F.add(T),C)T(C.connection);return()=>{F.delete(T)}},onSettings:(T)=>{if(z.add(T),C)T(C.settings);return()=>{z.delete(T)}},onItem:(T)=>{if(K.add(T),C)T(C.item);return()=>{K.delete(T)}},onBlock:(T)=>{if(__.add(T),C?.block)T(C.block);return()=>{__.delete(T)}},onServiceEvent:(T)=>{return A_.add(T),()=>{A_.delete(T)}},onStatusControl:(T)=>{return d.add(T),()=>{d.delete(T)}},onPopoverClosed:(T)=>{return U_.add(T),()=>{U_.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support status controls."));if(!$E(T))return Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return H({...J,type:"status-controls",id:V(D),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support popovers."));if(!$T(T))return Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return H({...J,type:"popover-open",id:V(D),payload:T})},closePopover:NE,setPopoverAnchorActive:PE,onResolve:(T)=>{return I_=T,()=>{if(I_===T)I_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>g_)return Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${g_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>h_))return Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${h_} characters.`));return H({channel:L,v:W,type:"toast",id:V(D),payload:{...T,message:E}})},openUrl:(T)=>H({channel:L,v:W,type:"open-url",id:V(D),payload:{url:T}}),openCommit:(T)=>kT(T)?H({channel:L,v:W,type:"open-commit",id:V(D),payload:{sha:T}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>H({channel:L,v:W,type:"block-answer",id:V(D),payload:{text:T.trim().slice(0,ZT)}}),openSurface:(T)=>H({channel:L,v:W,type:"open-surface",id:V(D),payload:{surfaceId:T}}),writeClipboard:(T)=>H({channel:L,v:W,type:"clipboard-write",id:V(D),payload:{text:T}}),compose:(T)=>H({channel:L,v:W,type:"compose",id:V(D),payload:T}),attach:(T)=>H({channel:L,v:W,type:"attach",id:V(D),payload:P_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)u(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")u(E.directory);else{if(E.name!==void 0)u(E.name,200);if(E.baseBranch!==void 0)u(E.baseBranch,200)}let R=await j({channel:L,v:W,type:"start-session",id:V(D),payload:xT(T)},_.requestTimeoutMs??180000);if(!zT(R))throw new I("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>j({channel:L,v:W,type:"prompt",id:V(D),payload:wT(T)}).then((E)=>{if(!JT(E))throw new I("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>H({channel:L,v:W,type:"session-link",id:V(D),payload:P_(T)}),close:()=>H({channel:L,v:W,type:"close",id:V(D)}),oauthStart:()=>H({channel:L,v:W,type:"oauth-start",id:V(D)}),oauthDisconnect:()=>H({channel:L,v:W,type:"oauth-disconnect",id:V(D)}),request:(T)=>(p_(T.path)?j({channel:L,v:W,type:"request",id:V(D),payload:T}):rE()).then((E)=>{if(!u_(E))throw new I("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(p_(T.path)?j({channel:L,v:W,type:"service-request",id:V(D),payload:T}):rE()).then((E)=>{if(!u_(E))throw new I("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>j({channel:L,v:W,type:"service-status",id:V(D)}).then((T)=>{if(!yT(T))throw new I("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(L_(T)?j({channel:L,v:W,type:"file-read",id:V(D),payload:{path:T}}):l_()).then((E)=>{if(!gT(E))throw new I("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!L_(T))return l_();if(E.length>c_)return Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${c_} characters.`));return j({channel:L,v:W,type:"file-write",id:V(D),payload:{path:T,content:E}}).then((R)=>{if(!hT(R))throw new I("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(L_(T)?j({channel:L,v:W,type:"file-list",id:V(D),payload:{path:T}}):l_()).then((E)=>{if(!mT(E))throw new I("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(L_(T)?j({channel:L,v:W,type:"file-stat",id:V(D),payload:{path:T}}):l_()).then((E)=>{if(!cT(E))throw new I("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),R=T.system?.trim();if(E.length===0||E.length>d_)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${d_} characters.`));if(R!==void 0&&(R.length===0||R.length>v_))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${v_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min(HT,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(R!==void 0)Q.system=R;if(U!==void 0)Q.maxOutputTokens=U;return j({channel:L,v:W,type:"generate",id:V(D),payload:Q},_.requestTimeoutMs??jT).then((Y)=>{if(!dT(Y))throw new I("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{v.add(T);for(let E of K_.splice(0))$([T],E);return RE(),()=>{v.delete(T)}},openMicrophone:VS,setBadge:(T)=>H({channel:L,v:W,type:"badge",id:V(D),payload:{count:bT(T)}}),setHeight:(T)=>H({channel:L,v:W,type:"resize",id:V(D),payload:{height:qT(T)}}),onFileOpen:(T)=>{if(C_.add(T),!IT)IT=!0,S.addEventListener("keydown",CE,!0);if(B_)T(B_);return()=>{C_.delete(T)}},onFileSnapshot:(T)=>{return $_=T,()=>{if($_===T)$_=null}},onFileSaved:(T)=>{return f_.add(T),()=>{f_.delete(T)}},reportFileChange:(T)=>CT({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:IE,reportFileUnsupported:()=>CT({...J,type:"file-unsupported"}),dispose:()=>{for(let T of X_.keys())b({...J,type:"workspace-unsubscribe",id:V(D),payload:{subscriptionId:T}});X_.clear();for(let T of D_.keys())b({...J,type:"shells-unsubscribe",id:V(D),payload:{subscriptionId:T}});if(D_.clear(),h)GT(),h.release(),h=null;if(p=!0,I_=null,a=null,$_=null,C_.clear(),f_.clear(),IT)S.removeEventListener("keydown",CE,!0);S.removeEventListener("message",ME),S.removeEventListener("keydown",GE,!0),S.removeEventListener("pointerover",j_),S.removeEventListener("pointermove",j_),S.removeEventListener("pointerout",XE),S.removeEventListener("focus",DE),S.removeEventListener("blur",VE);for(let T of G_.values())clearTimeout(T.timer),T.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));G_.clear(),M.clear(),N.clear(),P.clear(),G.clear(),F.clear(),z.clear(),K.clear(),__.clear(),A_.clear(),d.clear(),U_.clear(),v.clear(),K_.length=0}}};var sE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var YO=new Set(sE);var tE=["none","agent","user"];var KO=new Set(tE);var ZS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],zS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],eE=(_,S)=>{S.style.colorScheme=_.mode;for(let[A,X]of ZS)S.style.setProperty(A,_.tokens[X]);for(let[A,X,M]of zS){let N=_.tokens[M]??"";S.style.setProperty(A,N),S.style.setProperty(X,N)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},uT=(_,S)=>{if(eE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var JS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Z=(_,S)=>`var(--${_}, var(--oc-${JS[_]}, ${S}))`,s=Z("surface-background","transparent"),n_=Z("surface-elevated","transparent"),W_=Z("surface-elevated-foreground","inherit"),m=Z("surface-foreground","inherit"),k=Z("surface-muted-foreground","gray"),kS=Z("surface-muted","transparent"),R_=Z("interactive-border","currentColor"),q=Z("interactive-hover","transparent"),M_=Z("interactive-active","transparent"),lT=Z("interactive-selection","transparent"),aT=Z("interactive-selection-foreground","inherit"),r=Z("primary","currentColor"),oT=Z("primary-text","inherit"),nT=Z("error-text","inherit"),fS=Z("font-sans","inherit"),iT=Z("font-mono","monospace"),SS=Z("radius","9px"),rT=`calc(${SS} - 2px)`,_S=`calc(${SS} - 4px)`,f=(_,S,A="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${A})`,TS=`background-image: linear-gradient(${q}, ${q});`,sT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,tT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ES="box-shadow: var(--oc-sdk-lit);",eT=`inset 0 0.5px 0 0 ${f(m,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,HS=`
:root {
  --oc-sdk-edge: ${f(m,16)};
  --oc-sdk-field-bg: ${n_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${f(m,14)};
  --oc-sdk-field-bg: ${f(s,50,n_)};
  --oc-sdk-raised-bg: ${n_};
  --oc-sdk-field-lift: ${eT};
  --oc-sdk-raised-lift: ${eT};
  --oc-sdk-lit: ${eT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,o_=(_)=>{let S=Z(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${Z(`${_}-text`,"inherit")}; }`},O=(_)=>`calc(${_}rem / 14)`,jS=`
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
`,OS=`${HS}
.oc-sdk { color: ${m}; font-family: ${fS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${TS} }
.oc-sdk-mono { font-family: ${iT}; }
.oc-sdk-muted { color: ${k}; }
${o_("success")}${o_("warning")}${o_("error")}${o_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${oT}; }

.oc-sdk-btn { border-radius: ${rT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${_S}; }
.oc-sdk-btn[data-variant="default"] { color: ${oT}; background: ${f(r,10,s)}; border-color: ${f(r,12)}; ${ES} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${f(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${f(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${kS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${W_}; ${tT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${M_}, ${M_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${q}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${M_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Z("status-error","red")}; color: ${nT}; background: ${f("var(--oc-sdk-tone)",7,s)}; border-color: ${f("var(--oc-sdk-tone)",12)}; ${ES} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${f("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${f("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${nT}; }
.oc-sdk-input { border-radius: ${rT}; background: var(--oc-sdk-field-bg); color: ${W_}; ${sT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${sT(f(m,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${sT(Z("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${iT}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${_S}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${q}; color: ${m}; }

.oc-sdk-trigger { border-radius: ${rT}; background: var(--oc-sdk-raised-bg); color: ${W_}; ${tT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${W_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${n_}; background-clip: padding-box; color: ${W_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${q}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${lT}; color: ${aT}; }
.oc-sdk-option-check { color: ${m}; }
.oc-sdk-option[data-destructive="true"] { color: ${nT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${f(Z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${R_}; border-radius: 4px; color: ${m}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${f(m,60,R_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${R_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${TS} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${f(m,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${m}; }
.oc-sdk-tab[aria-selected="true"] { color: ${aT}; background: ${lT}; border-color: ${R_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${W_}; background: var(--oc-sdk-raised-bg); ${tT} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${f(m,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${f("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${q}; }
.oc-sdk-row[aria-selected="true"] { background: ${lT}; color: ${aT}; }
.oc-sdk-row-lead { font-family: ${iT}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${R_}; border-top-color: ${r}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${f("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${f(R_,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${f(m,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Z("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Z("success-text","inherit")}; }

.oc-sdk-text a { color: ${oT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${f(R_,60)}; }
`,w=`
${VT}
${jS}
${OS}`;var AS=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var AT=[],IS=()=>{let _=document.querySelector("#msg2");if(_&&AT.length>0)_.innerHTML=`<div class="err">${AT.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{AT.push("页面错误："+String(_.message??_)),IS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,A=S?.code;AT.push("未处理异常"+(A?` [${A}]`:"")+"："+String(S?.message??S)),IS()});var yS=["toutiao"],EE=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],gS=180000,hS=12,US=30,mS=3,n=pT(),CS=document.querySelector("#app");if(!CS)throw Error("Missing #app");CS.innerHTML=`
<style>
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;font:14px/1.6 var(--oc-font,system-ui,sans-serif);background:var(--oc-bg,#1b1e22);color:var(--oc-fg,inherit)}
#app{display:flex;height:100vh;overflow:hidden;background:var(--oc-bg,#1b1e22);color:var(--oc-fg,inherit);position:relative}
aside{width:100%;display:flex;flex-direction:column;padding:10px 8px;gap:2px;overflow-y:auto}
.sec{font-size:12px;color:var(--oc-muted,#999);padding:8px 10px 4px}
.nrow{display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap;width:100%;text-align:left;padding:7px 10px;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--oc-fg,inherit);font:inherit}
.nrow .tt{flex:1;min-width:0;font-size:13.5px;overflow-wrap:anywhere}
.nrow .src{display:block;font-size:11.5px;color:var(--oc-muted,#999);margin-top:1px}
.nrow .aibtn{flex:0 0 auto;align-self:center;border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 9px;white-space:nowrap}
.nrow .aibtn:hover{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
.nrow .aisum{flex:1 1 100%;font-size:12.5px;line-height:1.7;opacity:.92;border-left:2px solid var(--oc-border,#8888);padding-left:8px;margin:2px 0 2px 2px}
.nrow .xp{display:block;font-size:12.5px;opacity:.8;margin-top:1px}
.cathead{font-size:12px;color:var(--oc-muted,#999);padding:10px 10px 2px;font-weight:700}
#catchips{display:flex;gap:6px;flex-wrap:wrap;padding:2px 10px 4px}
#catchips button{border:1px solid var(--oc-border,#8888);border-radius:999px;background:transparent;color:var(--oc-muted,#999);cursor:pointer;font-size:12px;padding:2px 10px;white-space:nowrap}
#catchips button.on{color:var(--oc-fg,inherit);border-color:var(--oc-primary,#3574f0)}
button,select,input,textarea{font:inherit}
.btn{padding:4px 10px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
.btn.primary{background:var(--oc-primary,#3574f0);border-color:transparent;color:var(--oc-primary-fg,#fff)}
#msg2:empty{display:none}
#msg2{padding:4px 10px}#msg2 .err{margin-top:4px}
.err{background:#7f1d1d22;border:1px solid #7f1d1d66;border-radius:8px;padding:8px}
.mut{font-size:12px;color:var(--oc-muted,#999)}
div.nrow:hover{background:var(--oc-hover,#8881)}
#cfgside{border-top:1px solid var(--oc-border,#8883);margin-top:6px;padding:8px 6px 4px;display:flex;flex-direction:column;gap:6px}
#cfgside input{width:100%;padding:6px 8px;font-size:12.5px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:inherit}
#cfgver{padding:2px 10px 6px;font-size:11px}
</style>
<div style="display:flex;flex:1;min-height:0;width:100%" id="cols">
<aside>
  <div class="sec">话题 <span id="tcount" class="mut"></span> <button class="btn" id="b-refresh" title="手动刷新">↻</button></div><div id="catchips"></div><div id="topics"></div><div id="msg2"></div><div class="mut" id="srcerr" style="padding:2px 10px"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span></div>
</aside>
</div>`;var l=(_)=>document.querySelector(`#${_}`),cS=l("cname"),TT=l("topics"),ET=l("catchips"),dS="v0.11.0-fast";cS.textContent="阅读";document.querySelector("#build").textContent=dS;var F_="",x=[],T_=[],S_=0,TE=!1,o=0,O_=new Map,e_=!1,E_="",ST=0,GS=0,OT=!1,XS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},SE=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),UT=async(_)=>{try{return await n.storage.get(_)}catch{return}},RT=async(_,S)=>{try{await n.storage.set(_,S)}catch{}},OE=async(_,S,A)=>{let X=S;if(F_&&_==="GET"&&X.startsWith("/"))X+=(X.includes("?")?"&":"?")+`proxy=${encodeURIComponent(F_)}`;return n.serviceRequest({method:_,path:X,body:A})};var vS=(_)=>{if(ET.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=E_===""?"on":"",S.onclick=()=>{E_="",e()},ET.appendChild(S);for(let A of _){let X=document.createElement("button"),M=x.filter((N)=>O_.get(Y_(N))===A).length;X.textContent=`${A} ${M}`,X.className=E_===A?"on":"",X.onclick=()=>{E_=E_===A?"":A,e()},ET.appendChild(X)}},Y_=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,e=()=>{let _=[...new Set(x.map((P)=>O_.get(Y_(P))).filter((P)=>!!P))],S=EE.filter((P)=>_.includes(P));vS(S);let A=S_>0?(()=>{let P=new Date(S_);return`${P.getHours()}:${String(P.getMinutes()).padStart(2,"0")}`})():"",X=OT?` · 分类 ${ST}/${GS}`:"";l("tcount").textContent=x.length>0?`${x.length}${A?` · 更新 ${A}`:""}${X}`:A?`更新 ${A}`:"";let M=document.querySelector("#srcerr");if(M)M.textContent=T_.length>0?`暂不可用：${T_.join("、")}（多为对侧限流，过一会儿点↻再试）`:"";TT.innerHTML="";let N=E_?[E_]:S.length>0?S:[""];for(let P of N){if(!E_&&P){let G=document.createElement("div");G.className="cathead",G.textContent=P,TT.appendChild(G)}for(let G of x){if(P&&O_.get(Y_(G))!==P)continue;let F=document.createElement("div");F.className="nrow";let z=G.excerpt?`<br><span class="xp">${SE(G.excerpt)}</span>`:"";F.innerHTML=`<span class="tt">${SE(G.title)}${z}</span>`;let K=document.createElement("button");K.className="aibtn",K.title="AI 总结这篇",K.textContent="✦",K.onclick=()=>void pS(G,F,K),F.appendChild(K),TT.appendChild(F)}}},RS=()=>{let _=Object.fromEntries(O_),S=Object.keys(_);if(S.length>1000)_=Object.fromEntries(S.slice(-1000).map((A)=>[A,_[A]]));RT("moyu:cats",_)},DS=async(_)=>{if(e_)return;let S=x.filter((M)=>!O_.has(Y_(M)));if(GS=S.length,ST=0,OT=S.length>0,e(),S.length===0)return;let A=0,X=async()=>{while(!0){if(_!==o||e_)return;let M=A;if(A+=US,M>=S.length)return;let N=S.slice(M,M+US);try{let P=N.map((z,K)=>`${K}. ${z.title}`).join(`
`).slice(0,3500),G=await n.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${EE.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:320});if(_!==o||e_)return;let F=[];for(let z of G.text.split(`
`)){let K=/^\s*(\d+)\s*[:：]\s*(\S+)/.exec(z);if(!K)continue;F[Number(K[1])]=EE.includes(K[2])?K[2]:"其他"}N.forEach((z,K)=>O_.set(Y_(z),F[K]??"其他")),RS()}catch(P){let G=P?.code;if(G==="NO_MODEL"||G==="MODEL_FAILED"){e_=!0,OT=!1,XS(SE(G==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),e();return}for(let F of N)O_.set(Y_(F),"其他")}if(ST=Math.min(S.length,ST+N.length),_!==o)return;e()}};if(await Promise.all(Array.from({length:Math.min(mS,S.length)},()=>X())),_===o)OT=!1,RS(),e()},MS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),pS=async(_,S,A)=>{let X=S.querySelector(".aisum");if(X){X.remove();return}let M=`moyu:csum:${_.community}:${_.id}`;A.disabled=!0;let N=A.textContent;A.textContent="…";try{let P=await UT(M),G=typeof P==="string"&&P?P:"";if(!G){let z=await OE("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),K=JSON.parse(z.body);if(!K.ok||!K.thread)throw Error(K.error??"正文失败");let __=K.thread,A_=[__.opening?MS(__.opening.html):"",...__.posts.map((d)=>MS(d.html))].filter(Boolean).join(`
`).slice(0,3500);if(!A_){if(!yS.includes(_.community))throw Error("这篇没有可总结的正文");let d="";try{let U_=await OE("GET",`/search?q=${encodeURIComponent(_.title)}`),v=JSON.parse(U_.body);if(v.ok&&v.results&&v.results.length>0){let K_=v.results.slice(0,5).map((a,C_)=>`${C_+1}. 「${a.title}」${a.snippet}${a.site?`（${a.site}）`:""}`).join(`
`).slice(0,2500);d=(await n.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${K_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(d)G=d+"（联网版）";else{if(G=(await n.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!G)throw Error("小模型没有返回总结");G+="（标题版）"}}else if(G=(await n.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${A_}`,maxOutputTokens:256})).text.trim().slice(0,500),!G)throw Error("小模型没有返回总结");await RT(M,G)}let F=document.createElement("div");F.className="aisum",F.textContent=`✦ ${G}`,S.appendChild(F)}catch(P){let G=P?.code,F=G==="NO_MODEL"?"无可用小模型":G==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",z=document.createElement("div");z.className="aisum",z.textContent=`总结失败：${F}`,S.appendChild(z)}finally{A.disabled=!1,A.textContent=N}},MT=async(_=!1)=>{if(TE||document.hidden)return;if(!_&&Date.now()-S_<gS&&x.length>0)return;TE=!0;let S=++o;try{let A=AS.flatMap((M)=>M.channels.map((N)=>({c:M,ch:N})));if(x=[],T_=[],l("tcount").textContent=`加载中 0/${A.length}`,TT.innerHTML="",ET.innerHTML="",await Promise.all(A.map(async({c:M,ch:N})=>{try{let P=await OE("GET",`/list?community=${M.id}&channel=${encodeURIComponent(N.id)}`),G=JSON.parse(P.body);if(!G.ok)throw Error(G.error??"列表失败");if(S!==o)return;let F=(G.topics??[]).slice(0,hS);if(x.push(...F),S!==o)return;l("tcount").textContent=`加载中 ${x.length} · 已回 ${A.length-T_.length}/${A.length}`,e()}catch{if(S!==o)return;if(!T_.includes(M.name))T_.push(M.name)}})),S!==o)return;S_=Date.now();let X=new Set;x=x.filter((M)=>{let N=M.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!N||X.has(N))return!1;return X.add(N),!0}),RT("moyu:feed",{at:S_,topics:x,failed:T_}),XS(""),e(),DS(S)}finally{TE=!1}};l("b-refresh").onclick=()=>{S_=0,MT(!0)};l("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){l("cfg-out").textContent="格式不对，要 http(s)://host:port";return}F_=_,await RT("moyu:proxy",F_),l("cfg-out").textContent="已保存，正在测试…",S_=0,await MT(!0),l("cfg-out").textContent=x.length>0?`连通（${x.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")MT(!0);else if(_.key==="q")n.close()});var _T=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(_T++,_T>=2)_T=0,n.close();setTimeout(()=>_T=0,500)}});var uS=async()=>{F_=await UT("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=F_};n.onReady((_)=>{uT(_,document.documentElement)});(async()=>{await uS();try{let _=await UT("moyu:cats");if(_&&typeof _==="object"){for(let[A,X]of Object.entries(_))if(typeof X==="string")O_.set(A,X)}let S=await UT("moyu:feed");if(S&&typeof S.at==="number"&&Array.isArray(S.topics)&&S.topics.length>0){S_=S.at,x=S.topics,T_=Array.isArray(S.failed)?S.failed:[],e(),DS(++o);return}}catch{}MT(!0)})();})();
