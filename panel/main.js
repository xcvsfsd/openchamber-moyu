(()=>{var L="openchamber.sdk",W=1;var GT=`
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
`;function LE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let A=new WeakMap;_.addEventListener("scroll",(X)=>{let C=X.target===_?S:X.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let P=A.get(C);if(P!==void 0)clearTimeout(P);A.set(C,setTimeout(()=>{A.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var VS=`(${LE.toString()})(document);`;var XT=128,DT=65536;var w_=128;var b_=65536;var VT=8000,NT=192000,PT=120000;var WE=(_)=>{let S=[],A=0,X=0;return{push:(C)=>{S.push(C),X+=C.length;while(X-A>_&&S.length>1){let P=S.shift();X-=P?.length??0,A=0}},pull:(C)=>{let P=0;while(P<C.length&&S.length>0){let D=S[0],M=Math.min(C.length-P,D.length-A);if(C.set(D.subarray(A,A+M),P),P+=M,A+=M,A>=D.length)S.shift(),X-=D.length,A=0}C.fill(0,P)},clear:()=>{S.length=0,A=0,X=0},get size(){return X-A}}};var FE=/^[a-z][a-z0-9-]{0,39}$/;var QE=(_)=>Object(_)===_&&!Array.isArray(_),LT=(_,S)=>Object.keys(_).every((A)=>S.includes(A)),YE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,KE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,$E=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let A of _){if(!QE(A)||!FE.test(A.id)||!YE(A.label))return!1;if(A.disabled!==void 0&&A.disabled!==!0&&A.disabled!==!1)return!1;if(S.has(A.id))return!1;if(S.add(A.id),A.kind==="button"){if(!LT(A,["kind","id","label","disabled"]))return!1;continue}if(A.kind!=="select"||!LT(A,["kind","id","label","value","options","disabled"]))return!1;if(!KE(A.value)||!Array.isArray(A.options)||A.options.length<1||A.options.length>16)return!1;let X=new Set;for(let C of A.options){if(!QE(C)||!LT(C,["value","label"])||!KE(C.value)||!YE(C.label)||X.has(C.value))return!1;X.add(C.value)}if(!X.has(A.value))return!1}return!0};var BE=["{id}","{segment}","{segments+}"];var eS=new Set(BE);var ZE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var TO=new Set(ZE);var q_=20000000,y_=256;var WT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,zE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let A=0;A<_.bytes.byteLength;A+=1)if(_.bytes[A]!==S.bytes[A])return!1;return!0};var JE=/^[A-Za-z0-9_-]{1,80}$/;var fE=["left","right","top","bottom"];var kE=(_,S=0,A={remaining:16000})=>{if(--A.remaining<0||S>=32)return!1;if(_===null)return!0;let X=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of X)if(!kE(C,S+1,A))return!1;return!0},QT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(QT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(QT)}return String(_)===_||Number.isFinite(_)},YT=(_)=>{try{if(String(_.id)!==_.id||!JE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!fE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!kE(_.data)||!QT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var FT=2000;var jE=["file","directory","other","missing"],$T=(_)=>Boolean(_&&"sessionId"in _),BT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var xE=/^[0-9a-f]{7,64}$/i,ZT=(_)=>xE.test(_),g_=500,m_=32000,wE=16000,bE=128,qE=200,yE=2000,gE=16000,mE=80,hE=200,cE=16000;var dE=2000;var zT=20000,h_=1024,c_=2000000;var d_=64000,v_=8000,JT=4000;var fT=960000;var vE=999,pE=1e4,J_=500,uE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],lE=["stopped","starting","ready","failed"],PS=new Set(uE),aE=(_)=>PS.has(_),oE=(_)=>_&&aE(_)?_:"HOST_REJECTED",N_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(N_);if(Object(_)===_)return Object.values(_).every(N_);return!1},nE=(_)=>N_(_)&&JSON.stringify(_).length<=cE,HE=(_)=>_?.trim().slice(0,hE)??"",P_=(_)=>{let S=_.id.trim().slice(0,bE),A=_.title.trim().slice(0,qE),X=_.url.trim().slice(0,yE),C=_.text?.trim().slice(0,gE),P=_.author?.trim().slice(0,mE),D=_.kind==="pull"?"pull":"issue",M={providerId:_.providerId.trim(),id:S,title:A||S,url:X,kind:D};if(C)M.text=C;if(P)M.author=P;if(D==="pull"){let K=HE(_.branches?.head),z=HE(_.branches?.base);if(K&&z)M.branches={head:K,base:z}}if(nE(_.data))M.data=_.data;return M},kT=(_)=>{let S=P_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},HT=(_)=>{let S={text:_.text.trim().slice(0,wE)};if(_.send)S.send=!0;return S},jT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(vE,Math.max(0,Math.round(_)))},xT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(pE,Math.max(0,Math.ceil(_)))};var L_=(_)=>_.length>0&&_.length<=h_&&!_.includes("\x00")&&!_.includes("\\");var p_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>dE)return!1;return!_.split("/").some((A)=>A==="."||A==="..")},LS=new Set(lE),wT=(_)=>Boolean(_&&"status"in _&&LS.has(String(_.status))&&!("body"in _)),u_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),bT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),qT=(_)=>Boolean(_&&"written"in _&&_.written===!0),yT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),WS=new Set(jE),gT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&WS.has(String(_.kind))&&Number.isFinite(_.size)),mT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),QS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),YS=(_)=>Object(_)===_?_:null,KT=(_)=>String(_)===_&&_.length>0,KS=(_)=>{if(!KT(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&KT(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:oE(KT(_.code)?_.code:void 0)};return null},hT=(_)=>{let S=YS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return KS(S);if(!QS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var iE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),FS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class I extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var rE=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),l_=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${h_} characters without NUL or backslash.`)),a_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},cT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let A=_.acceptSource??((T)=>T===S.parent),X=_.requestTimeoutMs??zT,C=new Set,P=new Set,D=new Set,M=new Set,K=new Set,z=new Set,F=new Set,m=new Set,O_=new Set,v=new Set,A_=new Set,p=new Set,F_=[],I_=null,o=null,C_=new Set,k_=new Set,$_=null,B_=null,UT=!1,G_=new Map,X_=new Map,D_=new Map,u=!1,V={value:0},G=null,i=null,Z_=!1,z_=!1,AE=null,h=null,UE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},w=(T)=>{S.parent.postMessage(T,"*")},RE=()=>{if(u||S.parent===S||p.size===0||G?.features?.lateGenerateResults!==!0)return;w({channel:L,v:W,type:"generate-late-listen"})},$=(T,E)=>{for(let R of T)try{R(E)}catch(U){console.error(U)}},ME=(T)=>{if(!(T instanceof MessageEvent))return;if(!A(T.source))return;let E=hT(T.data);if(!E)return;if(E.type==="workspace"){let U=X_.get(E.payload.subscriptionId);if(U)$([U],E.payload.snapshot);return}if(E.type==="shells"){let U=D_.get(E.payload.subscriptionId);if(U)$([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){h?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=h;if(!U)return;h=null,U.release(),$(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(G=E.payload,i=UE(E.payload.session),$(C,E.payload),$(P,E.payload.directory),$(D,E.payload.session),i)$(M,i);if($(K,E.payload.connection),$(z,E.payload.settings),$(F,E.payload.item),E.payload.block)$(m,E.payload.block);RE();return}if(E.type==="service-event"){$(O_,E.payload);return}if(E.type==="generate-late"){if(p.size===0)F_.push(E.payload);else $(p,E.payload);return}if(E.type==="directory"){if(G)G={...G,directory:E.payload.directory};$(P,E.payload.directory);return}if(E.type==="session"){if(G)G={...G,session:E.payload.session};if(!E.payload.session)i=null;else if(i?.sessionId!==E.payload.session.id)i=UE(E.payload.session);$(D,E.payload.session);return}if(E.type==="session-lifecycle"){i=E.payload,$(M,E.payload);return}if(E.type==="connection"){if(G)G={...G,connection:E.payload.connection};$(K,E.payload.connection);return}if(E.type==="settings"){if(G)G={...G,settings:E.payload.settings};$(z,E.payload.settings);return}if(E.type==="item"){if(G)G={...G,item:E.payload.item};$(F,E.payload.item);return}if(E.type==="status-control-event"){$(v,E.payload);return}if(E.type==="popover-closed"){$(A_,E.payload);return}if(E.type==="action"){let U=(Y)=>{if(!u)w({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=o;if(!Q){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>U({ok:!0}),(Y)=>{let B=(Y instanceof Error?Y.message:String(Y)).trim();U({ok:!1,error:(B||"Action failed.").slice(0,J_)})});return}if(E.type==="file-open"){let U=E.payload;if(B_&&zE(B_,U))return;B_=U,$(C_,E.payload);return}if(E.type==="file-saved"){$(k_,E.payload.version);return}if(E.type==="file-snapshot"){let U=(B)=>{if(!u)w({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:B})},Q=(B)=>U({error:(B.trim()||"Could not read the edited file.").slice(0,J_)}),Y=$_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then((B)=>{if(WT(B)>q_){Q(`The file is over ${q_} ${"bytes"in B?"bytes":"characters"}.`);return}if(B.version.length>y_){Q(`The snapshot version is over ${y_} characters.`);return}U({snapshot:"bytes"in B?{bytes:B.bytes,version:B.version}:{content:B.content,version:B.version}})},(B)=>Q(B instanceof Error?B.message:String(B)));return}if(E.type==="resolve"){let U=(Y)=>{w({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=I_;if(!Q){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>U({item:Y?P_(Y):null}),(Y)=>{let B=(Y instanceof Error?Y.message:String(Y)).trim();U({error:(B||"Command failed.").slice(0,J_)})});return}let R=G_.get(E.id);if(!R)return;if(clearTimeout(R.timer),G_.delete(E.id),E.ok){R.resolve(E.payload);return}R.reject(new I(E.code,E.error))};S.addEventListener("message",ME),w({channel:L,v:W,type:"hello"});let j=(T,E=X)=>{if(u||S.parent===S)return Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,U)=>{let Q=setTimeout(()=>{G_.delete(T.id),U(new I("HOST_TIMEOUT","Host did not answer in time."))},E);G_.set(T.id,{resolve:R,reject:U,timer:Q}),w(T)})},H=(T)=>j(T).then(()=>{return}),J={channel:L,v:W},RT=(T)=>{if(!u&&S.parent!==S)w(T)},IE=()=>RT({...J,type:"file-save"}),MT=()=>{if(!u&&S.parent!==S)w({...J,type:"microphone-close",id:N(V)})},XS=async()=>{if(h)throw new I("HOST_REJECTED","The microphone is already open in this frame.");if(G?.features?.microphone!==!0)throw new I("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new I("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<VT||E.sampleRate>NT)throw E.close().catch(()=>{return}),new I("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let R=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=WE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(d)=>U.pull(d.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let B=new Set,V_={queue:U,endedListeners:B,release:()=>{Q.onaudioprocess=null,Q.disconnect(),U.clear();for(let d of Y.stream.getTracks())d.stop();E.close().catch(()=>{return})}};h=V_;try{let d=await j({...J,type:"microphone-open",id:N(V),payload:{sampleRate:E.sampleRate}},PT);if(!d||!("opened"in d)||d.opened!==!0)throw new I("HOST_REJECTED","Host did not open the microphone.");if(await R,h!==V_)throw new I("DISCONNECTED","The microphone closed while it was opening.")}catch(d){if(h===V_)h=null;throw V_.release(),MT(),d}return{stream:Y.stream,close:()=>{if(h!==V_)return;h=null,V_.release(),MT()},onEnded:(d)=>{return B.add(d),()=>{B.delete(d)}}}},CE=(T)=>{if(!iE(T)||!FS(T))return;T.preventDefault(),IE()},GE=(T)=>{if(!iE(T)||T.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;T.preventDefault(),NE(G.popover.id,"escape").catch(()=>{return})},H_=()=>{let T=G?.surface==="popover"?G.popover:void 0;if(!T)return;let E=Z_||z_;if(AE===E)return;AE=E,PE(T.id,E).catch(()=>{return})},j_=()=>{if(G?.surface!=="popover"||Z_)return;Z_=!0,H_()},XE=(T)=>{if(G?.surface!=="popover"||T.relatedTarget!==null||!Z_)return;Z_=!1,H_()},DE=()=>{if(G?.surface!=="popover"||z_)return;z_=!0,H_()},VE=()=>{if(G?.surface!=="popover"||!z_)return;z_=!1,H_()},l=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new I("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},IT=async(T)=>{if(T.kind!=="projects")l(T.projectId);let E=await j({...J,type:"workspace-read",id:N(V),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return E},CT=async(T,E)=>{if(T.kind!=="projects")l(T.projectId);let R=N(V);X_.set(R,E);try{await H({...J,type:"workspace-subscribe",id:N(V),payload:{subscriptionId:R,query:T}})}catch(U){if(X_.delete(R),!u)w({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:R}});throw U}return()=>{if(!X_.delete(R)||u)return;w({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:R}})}},DS=async(T,E)=>{if(T.kind==="session")l(T.sessionId);if(T.kind==="project")l(T.projectId);let R=N(V);D_.set(R,E);try{await H({...J,type:"shells-subscribe",id:N(V),payload:{subscriptionId:R,scope:T}})}catch(U){if(D_.delete(R),!u)w({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:R}});throw U}return()=>{if(!D_.delete(R)||u)return;w({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:R}})}},x_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>XT))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!N_(T.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>DT)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&G?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let E=await j({...J,type:"storage",id:N(V),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new I("HOST_REJECTED","Host did not return storage data.");return E},NE=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):H({...J,type:"popover-close",id:N(V),payload:E?{id:T,reason:E}:{id:T}}),PE=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):H({...J,type:"popover-anchor",id:N(V),payload:{id:T,active:E}});return S.addEventListener("keydown",GE,!0),S.addEventListener("pointerover",j_),S.addEventListener("pointermove",j_),S.addEventListener("pointerout",XE),S.addEventListener("focus",DE),S.addEventListener("blur",VE),{onAction:(T)=>{return o=T,()=>{if(o===T)o=null}},listProjects:async()=>{let T=await IT({kind:"projects"});if(T.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await IT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await IT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>CT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>CT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")E(R)}),onSessions:(T,E)=>CT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")E(R)}),onRunningShells:(T,E)=>DS(T,E),readShellOutput:async(T,E)=>{l(T,w_);let R=E?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>b_))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${b_}.`);let Y=await j({...J,type:"shell-output",id:N(V),payload:{shellId:T,cursor:R,tailBytes:U}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(l(T,w_),(await j({...J,type:"shell-stop",id:N(V),payload:{shellId:T}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{l(T),await H({...J,type:"open-session",id:N(V),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let R=a_(E),U={op:"get",key:T};if(R)U.scope=R;let Q=await x_(U);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,R)=>{let U=a_(R),Q={op:"set",key:T,value:E};if(U)Q.scope=U;await x_(Q)},delete:async(T,E)=>{let R=a_(E),U={op:"delete",key:T};if(R)U.scope=R;await x_(U)},keys:async(T)=>{let E=a_(T),R={op:"keys"};if(E)R.scope=E;let U=await x_(R);if(U.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(C.add(T),G)T(G);return()=>{C.delete(T)}},onDirectory:(T)=>{if(P.add(T),G)T(G.directory);return()=>{P.delete(T)}},onSession:(T)=>{if(D.add(T),G)T(G.session);return()=>{D.delete(T)}},onSessionLifecycle:(T)=>{if(M.add(T),i)T(i);return()=>{M.delete(T)}},onConnection:(T)=>{if(K.add(T),G)T(G.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(z.add(T),G)T(G.settings);return()=>{z.delete(T)}},onItem:(T)=>{if(F.add(T),G)T(G.item);return()=>{F.delete(T)}},onBlock:(T)=>{if(m.add(T),G?.block)T(G.block);return()=>{m.delete(T)}},onServiceEvent:(T)=>{return O_.add(T),()=>{O_.delete(T)}},onStatusControl:(T)=>{return v.add(T),()=>{v.delete(T)}},onPopoverClosed:(T)=>{return A_.add(T),()=>{A_.delete(T)}},setStatusControls:(T)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support status controls."));if(!$E(T))return Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return H({...J,type:"status-controls",id:N(V),payload:{controls:T}})},openPopover:(T)=>{if(G?.features?.popovers!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support popovers."));if(!YT(T))return Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return H({...J,type:"popover-open",id:N(V),payload:T})},closePopover:NE,setPopoverAnchorActive:PE,onResolve:(T)=>{return I_=T,()=>{if(I_===T)I_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>g_)return Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${g_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>m_))return Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${m_} characters.`));return H({channel:L,v:W,type:"toast",id:N(V),payload:{...T,message:E}})},openUrl:(T)=>H({channel:L,v:W,type:"open-url",id:N(V),payload:{url:T}}),openCommit:(T)=>ZT(T)?H({channel:L,v:W,type:"open-commit",id:N(V),payload:{sha:T}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>H({channel:L,v:W,type:"block-answer",id:N(V),payload:{text:T.trim().slice(0,FT)}}),openSurface:(T)=>H({channel:L,v:W,type:"open-surface",id:N(V),payload:{surfaceId:T}}),writeClipboard:(T)=>H({channel:L,v:W,type:"clipboard-write",id:N(V),payload:{text:T}}),compose:(T)=>H({channel:L,v:W,type:"compose",id:N(V),payload:T}),attach:(T)=>H({channel:L,v:W,type:"attach",id:N(V),payload:P_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)l(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")l(E.directory);else{if(E.name!==void 0)l(E.name,200);if(E.baseBranch!==void 0)l(E.baseBranch,200)}let R=await j({channel:L,v:W,type:"start-session",id:N(V),payload:kT(T)},_.requestTimeoutMs??180000);if(!$T(R))throw new I("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>j({channel:L,v:W,type:"prompt",id:N(V),payload:HT(T)}).then((E)=>{if(!BT(E))throw new I("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>H({channel:L,v:W,type:"session-link",id:N(V),payload:P_(T)}),close:()=>H({channel:L,v:W,type:"close",id:N(V)}),oauthStart:()=>H({channel:L,v:W,type:"oauth-start",id:N(V)}),oauthDisconnect:()=>H({channel:L,v:W,type:"oauth-disconnect",id:N(V)}),request:(T)=>(p_(T.path)?j({channel:L,v:W,type:"request",id:N(V),payload:T}):rE()).then((E)=>{if(!u_(E))throw new I("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(p_(T.path)?j({channel:L,v:W,type:"service-request",id:N(V),payload:T}):rE()).then((E)=>{if(!u_(E))throw new I("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>j({channel:L,v:W,type:"service-status",id:N(V)}).then((T)=>{if(!wT(T))throw new I("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(L_(T)?j({channel:L,v:W,type:"file-read",id:N(V),payload:{path:T}}):l_()).then((E)=>{if(!bT(E))throw new I("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!L_(T))return l_();if(E.length>c_)return Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${c_} characters.`));return j({channel:L,v:W,type:"file-write",id:N(V),payload:{path:T,content:E}}).then((R)=>{if(!qT(R))throw new I("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(L_(T)?j({channel:L,v:W,type:"file-list",id:N(V),payload:{path:T}}):l_()).then((E)=>{if(!yT(E))throw new I("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(L_(T)?j({channel:L,v:W,type:"file-stat",id:N(V),payload:{path:T}}):l_()).then((E)=>{if(!gT(E))throw new I("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),R=T.system?.trim();if(E.length===0||E.length>d_)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${d_} characters.`));if(R!==void 0&&(R.length===0||R.length>v_))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${v_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min(JT,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(R!==void 0)Q.system=R;if(U!==void 0)Q.maxOutputTokens=U;return j({channel:L,v:W,type:"generate",id:N(V),payload:Q},_.requestTimeoutMs??fT).then((Y)=>{if(!mT(Y))throw new I("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{p.add(T);for(let E of F_.splice(0))$([T],E);return RE(),()=>{p.delete(T)}},openMicrophone:XS,setBadge:(T)=>H({channel:L,v:W,type:"badge",id:N(V),payload:{count:jT(T)}}),setHeight:(T)=>H({channel:L,v:W,type:"resize",id:N(V),payload:{height:xT(T)}}),onFileOpen:(T)=>{if(C_.add(T),!UT)UT=!0,S.addEventListener("keydown",CE,!0);if(B_)T(B_);return()=>{C_.delete(T)}},onFileSnapshot:(T)=>{return $_=T,()=>{if($_===T)$_=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>RT({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:IE,reportFileUnsupported:()=>RT({...J,type:"file-unsupported"}),dispose:()=>{for(let T of X_.keys())w({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:T}});X_.clear();for(let T of D_.keys())w({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:T}});if(D_.clear(),h)MT(),h.release(),h=null;if(u=!0,I_=null,o=null,$_=null,C_.clear(),k_.clear(),UT)S.removeEventListener("keydown",CE,!0);S.removeEventListener("message",ME),S.removeEventListener("keydown",GE,!0),S.removeEventListener("pointerover",j_),S.removeEventListener("pointermove",j_),S.removeEventListener("pointerout",XE),S.removeEventListener("focus",DE),S.removeEventListener("blur",VE);for(let T of G_.values())clearTimeout(T.timer),T.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));G_.clear(),C.clear(),P.clear(),D.clear(),M.clear(),K.clear(),z.clear(),F.clear(),m.clear(),O_.clear(),v.clear(),A_.clear(),p.clear(),F_.length=0}}};var sE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var WO=new Set(sE);var tE=["none","agent","user"];var YO=new Set(tE);var $S=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],BS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],eE=(_,S)=>{S.style.colorScheme=_.mode;for(let[A,X]of $S)S.style.setProperty(A,_.tokens[X]);for(let[A,X,C]of BS){let P=_.tokens[C]??"";S.style.setProperty(A,P),S.style.setProperty(X,P)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},dT=(_,S)=>{if(eE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var ZS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Z=(_,S)=>`var(--${_}, var(--oc-${ZS[_]}, ${S}))`,s=Z("surface-background","transparent"),n_=Z("surface-elevated","transparent"),W_=Z("surface-elevated-foreground","inherit"),c=Z("surface-foreground","inherit"),f=Z("surface-muted-foreground","gray"),zS=Z("surface-muted","transparent"),U_=Z("interactive-border","currentColor"),b=Z("interactive-hover","transparent"),R_=Z("interactive-active","transparent"),vT=Z("interactive-selection","transparent"),pT=Z("interactive-selection-foreground","inherit"),r=Z("primary","currentColor"),uT=Z("primary-text","inherit"),lT=Z("error-text","inherit"),JS=Z("font-sans","inherit"),aT=Z("font-mono","monospace"),SS=Z("radius","9px"),oT=`calc(${SS} - 2px)`,_S=`calc(${SS} - 4px)`,k=(_,S,A="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${A})`,TS=`background-image: linear-gradient(${b}, ${b});`,nT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,iT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ES="box-shadow: var(--oc-sdk-lit);",rT=`inset 0 0.5px 0 0 ${k(c,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,fS=`
:root {
  --oc-sdk-edge: ${k(c,16)};
  --oc-sdk-field-bg: ${n_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(c,14)};
  --oc-sdk-field-bg: ${k(s,50,n_)};
  --oc-sdk-raised-bg: ${n_};
  --oc-sdk-field-lift: ${rT};
  --oc-sdk-raised-lift: ${rT};
  --oc-sdk-lit: ${rT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,o_=(_)=>{let S=Z(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${Z(`${_}-text`,"inherit")}; }`},O=(_)=>`calc(${_}rem / 14)`,kS=`
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
`,OS=`${fS}
.oc-sdk { color: ${c}; font-family: ${JS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${TS} }
.oc-sdk-mono { font-family: ${aT}; }
.oc-sdk-muted { color: ${f}; }
${o_("success")}${o_("warning")}${o_("error")}${o_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${uT}; }

.oc-sdk-btn { border-radius: ${oT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${_S}; }
.oc-sdk-btn[data-variant="default"] { color: ${uT}; background: ${k(r,10,s)}; border-color: ${k(r,12)}; ${ES} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${zS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${R_}, ${R_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${W_}; ${iT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${R_}, ${R_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${R_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Z("status-error","red")}; color: ${lT}; background: ${k("var(--oc-sdk-tone)",7,s)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${ES} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${f}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${lT}; }
.oc-sdk-input { border-radius: ${oT}; background: var(--oc-sdk-field-bg); color: ${W_}; ${nT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${f}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${nT(k(c,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${nT(Z("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${aT}; }

.oc-sdk-search-icon { color: ${f}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${_S}; color: ${f}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${c}; }

.oc-sdk-trigger { border-radius: ${oT}; background: var(--oc-sdk-raised-bg); color: ${W_}; ${iT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${R_}, ${R_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${f}; }
.oc-sdk-trigger-chevron { color: ${f}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${W_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${n_}; background-clip: padding-box; color: ${W_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${b}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${vT}; color: ${pT}; }
.oc-sdk-option-check { color: ${c}; }
.oc-sdk-option[data-destructive="true"] { color: ${lT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(Z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${f}; }
.oc-sdk-popup-empty { color: ${f}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${U_}; border-radius: 4px; color: ${c}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(c,60,U_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${U_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${TS} }
.oc-sdk-check-desc { color: ${f}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(c,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${f}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${c}; }
.oc-sdk-tab[aria-selected="true"] { color: ${pT}; background: ${vT}; border-color: ${U_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${W_}; background: var(--oc-sdk-raised-bg); ${iT} }
.oc-sdk-tab-count { color: ${f}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(c,6)}; color: ${f}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${b}; }
.oc-sdk-row[aria-selected="true"] { background: ${vT}; color: ${pT}; }
.oc-sdk-row-lead { font-family: ${aT}; color: ${f}; }
.oc-sdk-row-sub { color: ${f}; }
.oc-sdk-row-meta { color: ${f}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${f}; }

.oc-sdk-empty-body { color: ${f}; }

.oc-sdk-spinner { color: ${f}; }
.oc-sdk-spinner-ring { border-color: ${U_}; border-top-color: ${r}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${f}; }

.oc-sdk-separator { color: ${f}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(U_,40)}; }

.oc-sdk-progress-label { color: ${f}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(c,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Z("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Z("success-text","inherit")}; }

.oc-sdk-text a { color: ${uT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(U_,60)}; }
`,x=`
${GT}
${kS}
${OS}`;var AS=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var ST=[],MS=()=>{let _=document.querySelector("#msg2");if(_&&ST.length>0)_.innerHTML=`<div class="err">${ST.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{ST.push("页面错误："+String(_.message??_)),MS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,A=S?.code;ST.push("未处理异常"+(A?` [${A}]`:"")+"："+String(S?.message??S)),MS()});var bS=["toutiao"],_E=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],qS=180000,yS=12,tT=25,n=cT(),IS=document.querySelector("#app");if(!IS)throw Error("Missing #app");IS.innerHTML=`
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
  <div class="sec">话题 <span id="tcount" class="mut"></span> <button class="btn" id="b-refresh" title="手动刷新">↻</button></div><div id="msg2"></div><div id="catchips"></div><div id="topics"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span></div>
</aside>
</div>`;var a=(_)=>document.querySelector(`#${_}`),gS=a("cname"),_T=a("topics"),TT=a("catchips"),mS="v0.10.1-catprog";gS.textContent="阅读";document.querySelector("#build").textContent=mS;var Y_="",g=[],__=[],K_=0,eT=!1,T_=0,M_=new Map,US=!1,E_="",TE=0,CS=0,ET=!1,GS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},OT=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),SE=async(_)=>{try{return await n.storage.get(_)}catch{return}},OE=async(_,S)=>{try{await n.storage.set(_,S)}catch{}},EE=async(_,S,A)=>{let X=S;if(Y_&&_==="GET"&&X.startsWith("/"))X+=(X.includes("?")?"&":"?")+`proxy=${encodeURIComponent(Y_)}`;return n.serviceRequest({method:_,path:X,body:A})};var hS=(_)=>{if(TT.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=E_===""?"on":"",S.onclick=()=>{E_="",S_()},TT.appendChild(S);for(let A of _){let X=document.createElement("button"),C=g.filter((P)=>M_.get(e(P))===A).length;X.textContent=`${A} ${C}`,X.className=E_===A?"on":"",X.onclick=()=>{E_=E_===A?"":A,S_()},TT.appendChild(X)}},e=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,S_=()=>{let _=[...new Set(g.map((D)=>M_.get(e(D))).filter((D)=>!!D))],S=_E.filter((D)=>_.includes(D));hS(S);let A=K_>0?(()=>{let D=new Date(K_);return`${D.getHours()}:${String(D.getMinutes()).padStart(2,"0")}`})():"",X=__.length>0?` · ${__.join("、")}暂不可用`:"",C=ET?` · 分类 ${TE}/${CS}`:"";a("tcount").textContent=g.length>0?`${g.length}${A?` · 更新 ${A}`:""}${C}${X}`:X.replace(/^ · /,""),_T.innerHTML="";let P=E_?[E_]:S.length>0?S:[""];for(let D of P){if(!E_&&D){let M=document.createElement("div");M.className="cathead",M.textContent=D,_T.appendChild(M)}for(let M of g){if(D&&M_.get(e(M))!==D)continue;let K=document.createElement("div");K.className="nrow";let z=M.excerpt?`<br><span class="xp">${OT(M.excerpt)}</span>`:"";K.innerHTML=`<span class="tt">${OT(M.title)}${z}</span>`;let F=document.createElement("button");F.className="aibtn",F.title="AI 总结这篇",F.textContent="✦",F.onclick=()=>void dS(M,K,F),K.appendChild(F),_T.appendChild(K)}}},cS=async(_)=>{if(US)return;let S=g.filter((A)=>!M_.has(e(A)));if(CS=S.length,TE=0,ET=S.length>0,S_(),S.length===0)return;for(let A=0;A<S.length;A+=tT){if(_!==T_)return;let X=S.slice(A,A+tT),C=await Promise.all(X.map(async(D)=>{let M=await SE(e(D));return typeof M==="string"&&M?M:""})),P=X.filter((D,M)=>!C[M]);if(P.length>0)try{let D=P.map((z,F)=>`${F}. ${z.title}`).join(`
`).slice(0,3000),M=await n.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${_E.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:D,maxOutputTokens:256}),K=[];for(let z of M.text.split(`
`)){let F=/^\s*(\d+)\s*[:：]\s*(\S+)/.exec(z);if(!F)continue;let m=_E.includes(F[2])?F[2]:"其他";K[Number(F[1])]=m}await Promise.all(P.map(async(z,F)=>{let m=K[F]??"其他";M_.set(e(z),m),await OE(e(z),m)}))}catch(D){let M=D?.code;if(M==="NO_MODEL"||M==="MODEL_FAILED"){US=!0,ET=!1,GS(OT(M==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),S_();return}for(let K of P)M_.set(e(K),"其他")}else X.forEach((D,M)=>M_.set(e(D),C[M]));if(_!==T_)return;TE=Math.min(S.length,A+tT),S_()}if(_===T_)ET=!1,S_()},RS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),dS=async(_,S,A)=>{let X=S.querySelector(".aisum");if(X){X.remove();return}let C=`moyu:csum:${_.community}:${_.id}`;A.disabled=!0;let P=A.textContent;A.textContent="…";try{let D=await SE(C),M=typeof D==="string"&&D?D:"";if(!M){let z=await EE("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),F=JSON.parse(z.body);if(!F.ok||!F.thread)throw Error(F.error??"正文失败");let m=F.thread,O_=[m.opening?RS(m.opening.html):"",...m.posts.map((v)=>RS(v.html))].filter(Boolean).join(`
`).slice(0,3500);if(!O_){if(!bS.includes(_.community))throw Error("这篇没有可总结的正文");let v="";try{let A_=await EE("GET",`/search?q=${encodeURIComponent(_.title)}`),p=JSON.parse(A_.body);if(p.ok&&p.results&&p.results.length>0){let F_=p.results.slice(0,5).map((o,C_)=>`${C_+1}. 「${o.title}」${o.snippet}${o.site?`（${o.site}）`:""}`).join(`
`).slice(0,2500);v=(await n.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${F_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(v)M=v+"（联网版）";else{if(M=(await n.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!M)throw Error("小模型没有返回总结");M+="（标题版）"}}else if(M=(await n.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${O_}`,maxOutputTokens:256})).text.trim().slice(0,500),!M)throw Error("小模型没有返回总结");await OE(C,M)}let K=document.createElement("div");K.className="aisum",K.textContent=`✦ ${M}`,S.appendChild(K)}catch(D){let M=D?.code,K=M==="NO_MODEL"?"无可用小模型":M==="MODEL_FAILED"?"小模型出错":D instanceof Error?D.message:"未知错误",z=document.createElement("div");z.className="aisum",z.textContent=`总结失败：${K}`,S.appendChild(z)}finally{A.disabled=!1,A.textContent=P}},AT=async(_=!1)=>{if(eT||document.hidden)return;if(!_&&Date.now()-K_<qS&&g.length>0)return;eT=!0;let S=++T_;try{let A=AS.flatMap((C)=>C.channels.map((P)=>({c:C,ch:P})));if(g=[],__=[],a("tcount").textContent=`加载中 0/${A.length}`,_T.innerHTML="",TT.innerHTML="",await Promise.all(A.map(async({c:C,ch:P})=>{try{let D=await EE("GET",`/list?community=${C.id}&channel=${encodeURIComponent(P.id)}`),M=JSON.parse(D.body);if(!M.ok)throw Error(M.error??"列表失败");if(S!==T_)return;let K=(M.topics??[]).slice(0,yS);if(g.push(...K),S!==T_)return;a("tcount").textContent=`加载中 ${g.length} · 已回 ${A.length-__.length}/${A.length}`,S_()}catch{if(S!==T_)return;if(!__.includes(C.name))__.push(C.name)}})),S!==T_)return;K_=Date.now();let X=new Set;g=g.filter((C)=>{let P=C.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!P||X.has(P))return!1;return X.add(P),!0}),GS(__.length>0?OT(`${__.join("、")}暂不可用（多为对侧限流过一会儿点↻再试）`):""),S_(),cS(S)}finally{eT=!1}};a("b-refresh").onclick=()=>{K_=0,AT(!0)};a("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){a("cfg-out").textContent="格式不对，要 http(s)://host:port";return}Y_=_,await OE("moyu:proxy",Y_),a("cfg-out").textContent="已保存，正在测试…",K_=0,await AT(!0),a("cfg-out").textContent=g.length>0?`连通（${g.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")AT(!0);else if(_.key==="q")n.close()});var e_=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(e_++,e_>=2)e_=0,n.close();setTimeout(()=>e_=0,500)}});var vS=async()=>{Y_=await SE("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=Y_};n.onReady((_)=>{dT(_,document.documentElement)});vS().then(()=>void AT(!0));})();
