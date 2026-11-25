(()=>{var L="openchamber.sdk",W=1;var IT=`
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
`;function VE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let A=new WeakMap;_.addEventListener("scroll",(C)=>{let R=C.target===_?S:C.target;if(!(R instanceof Element))return;if(!R.hasAttribute("data-oc-scrolling"))R.setAttribute("data-oc-scrolling","");let N=A.get(R);if(N!==void 0)clearTimeout(N);A.set(R,setTimeout(()=>{A.delete(R),R.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var GS=`(${VE.toString()})(document);`;var CT=128,GT=65536;var b_=128;var q_=65536;var XT=8000,DT=192000,VT=120000;var NE=(_)=>{let S=[],A=0,C=0;return{push:(R)=>{S.push(R),C+=R.length;while(C-A>_&&S.length>1){let N=S.shift();C-=N?.length??0,A=0}},pull:(R)=>{let N=0;while(N<R.length&&S.length>0){let P=S[0],X=Math.min(R.length-N,P.length-A);if(R.set(P.subarray(A,A+X),N),N+=X,A+=X,A>=P.length)S.shift(),C-=P.length,A=0}R.fill(0,N)},clear:()=>{S.length=0,A=0,C=0},get size(){return C-A}}};var QE=/^[a-z][a-z0-9-]{0,39}$/;var PE=(_)=>Object(_)===_&&!Array.isArray(_),NT=(_,S)=>Object.keys(_).every((A)=>S.includes(A)),LE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,WE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,YE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let A of _){if(!PE(A)||!QE.test(A.id)||!LE(A.label))return!1;if(A.disabled!==void 0&&A.disabled!==!0&&A.disabled!==!1)return!1;if(S.has(A.id))return!1;if(S.add(A.id),A.kind==="button"){if(!NT(A,["kind","id","label","disabled"]))return!1;continue}if(A.kind!=="select"||!NT(A,["kind","id","label","value","options","disabled"]))return!1;if(!WE(A.value)||!Array.isArray(A.options)||A.options.length<1||A.options.length>16)return!1;let C=new Set;for(let R of A.options){if(!PE(R)||!NT(R,["value","label"])||!WE(R.value)||!LE(R.label)||C.has(R.value))return!1;C.add(R.value)}if(!C.has(A.value))return!1}return!0};var KE=["{id}","{segment}","{segments+}"];var sS=new Set(KE);var FE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var eS=new Set(FE);var y_=20000000,g_=256;var PT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,$E=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let A=0;A<_.bytes.byteLength;A+=1)if(_.bytes[A]!==S.bytes[A])return!1;return!0};var BE=/^[A-Za-z0-9_-]{1,80}$/;var ZE=["left","right","top","bottom"];var zE=(_,S=0,A={remaining:16000})=>{if(--A.remaining<0||S>=32)return!1;if(_===null)return!0;let C=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let R of C)if(!zE(R,S+1,A))return!1;return!0},LT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(LT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(LT)}return String(_)===_||Number.isFinite(_)},WT=(_)=>{try{if(String(_.id)!==_.id||!BE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!ZE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!zE(_.data)||!LT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var YT=2000;var fE=["file","directory","other","missing"],KT=(_)=>Boolean(_&&"sessionId"in _),FT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var kE=/^[0-9a-f]{7,64}$/i,$T=(_)=>kE.test(_),m_=500,h_=32000,HE=16000,jE=128,xE=200,wE=2000,bE=16000,qE=80,yE=200,gE=16000;var mE=2000;var BT=20000,c_=1024,d_=2000000;var p_=64000,v_=8000,ZT=4000;var zT=960000;var hE=999,cE=1e4,Z_=500,dE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pE=["stopped","starting","ready","failed"],DS=new Set(dE),vE=(_)=>DS.has(_),uE=(_)=>_&&vE(_)?_:"HOST_REJECTED",V_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(V_);if(Object(_)===_)return Object.values(_).every(V_);return!1},lE=(_)=>V_(_)&&JSON.stringify(_).length<=gE,JE=(_)=>_?.trim().slice(0,yE)??"",N_=(_)=>{let S=_.id.trim().slice(0,jE),A=_.title.trim().slice(0,xE),C=_.url.trim().slice(0,wE),R=_.text?.trim().slice(0,bE),N=_.author?.trim().slice(0,qE),P=_.kind==="pull"?"pull":"issue",X={providerId:_.providerId.trim(),id:S,title:A||S,url:C,kind:P};if(R)X.text=R;if(N)X.author=N;if(P==="pull"){let K=JE(_.branches?.head),f=JE(_.branches?.base);if(K&&f)X.branches={head:K,base:f}}if(lE(_.data))X.data=_.data;return X},JT=(_)=>{let S=N_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},fT=(_)=>{let S={text:_.text.trim().slice(0,HE)};if(_.send)S.send=!0;return S},kT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(hE,Math.max(0,Math.round(_)))},HT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(cE,Math.max(0,Math.ceil(_)))};var P_=(_)=>_.length>0&&_.length<=c_&&!_.includes("\x00")&&!_.includes("\\");var u_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>mE)return!1;return!_.split("/").some((A)=>A==="."||A==="..")},VS=new Set(pE),jT=(_)=>Boolean(_&&"status"in _&&VS.has(String(_.status))&&!("body"in _)),l_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),xT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),wT=(_)=>Boolean(_&&"written"in _&&_.written===!0),bT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),NS=new Set(fE),qT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&NS.has(String(_.kind))&&Number.isFinite(_.size)),yT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),PS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),LS=(_)=>Object(_)===_?_:null,QT=(_)=>String(_)===_&&_.length>0,WS=(_)=>{if(!QT(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&QT(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:uE(QT(_.code)?_.code:void 0)};return null},gT=(_)=>{let S=LS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return WS(S);if(!PS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var aE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),QS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class I extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var oE=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),a_=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${c_} characters without NUL or backslash.`)),o_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},V=(_)=>{return _.value+=1,`oc-${_.value}`},mT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let A=_.acceptSource??((T)=>T===S.parent),C=_.requestTimeoutMs??BT,R=new Set,N=new Set,P=new Set,X=new Set,K=new Set,f=new Set,H=new Set,g=new Set,E_=new Set,p=new Set,S_=new Set,v=new Set,Y_=[],M_=null,a=null,I_=new Set,H_=new Set,K_=null,F_=null,OT=!1,C_=new Map,G_=new Map,X_=new Map,u=!1,D={value:0},G=null,i=null,$_=!1,B_=!1,EE=null,m=null,SE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},w=(T)=>{S.parent.postMessage(T,"*")},OE=()=>{if(u||S.parent===S||v.size===0||G?.features?.lateGenerateResults!==!0)return;w({channel:L,v:W,type:"generate-late-listen"})},F=(T,E)=>{for(let M of T)try{M(E)}catch(U){console.error(U)}},AE=(T)=>{if(!(T instanceof MessageEvent))return;if(!A(T.source))return;let E=gT(T.data);if(!E)return;if(E.type==="workspace"){let U=G_.get(E.payload.subscriptionId);if(U)F([U],E.payload.snapshot);return}if(E.type==="shells"){let U=X_.get(E.payload.subscriptionId);if(U)F([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){m?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=m;if(!U)return;m=null,U.release(),F(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(G=E.payload,i=SE(E.payload.session),F(R,E.payload),F(N,E.payload.directory),F(P,E.payload.session),i)F(X,i);if(F(K,E.payload.connection),F(f,E.payload.settings),F(H,E.payload.item),E.payload.block)F(g,E.payload.block);OE();return}if(E.type==="service-event"){F(E_,E.payload);return}if(E.type==="generate-late"){if(v.size===0)Y_.push(E.payload);else F(v,E.payload);return}if(E.type==="directory"){if(G)G={...G,directory:E.payload.directory};F(N,E.payload.directory);return}if(E.type==="session"){if(G)G={...G,session:E.payload.session};if(!E.payload.session)i=null;else if(i?.sessionId!==E.payload.session.id)i=SE(E.payload.session);F(P,E.payload.session);return}if(E.type==="session-lifecycle"){i=E.payload,F(X,E.payload);return}if(E.type==="connection"){if(G)G={...G,connection:E.payload.connection};F(K,E.payload.connection);return}if(E.type==="settings"){if(G)G={...G,settings:E.payload.settings};F(f,E.payload.settings);return}if(E.type==="item"){if(G)G={...G,item:E.payload.item};F(H,E.payload.item);return}if(E.type==="status-control-event"){F(p,E.payload);return}if(E.type==="popover-closed"){F(S_,E.payload);return}if(E.type==="action"){let U=(Y)=>{if(!u)w({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=a;if(!Q){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>U({ok:!0}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();U({ok:!1,error:($||"Action failed.").slice(0,Z_)})});return}if(E.type==="file-open"){let U=E.payload;if(F_&&$E(F_,U))return;F_=U,F(I_,E.payload);return}if(E.type==="file-saved"){F(H_,E.payload.version);return}if(E.type==="file-snapshot"){let U=($)=>{if(!u)w({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:$})},Q=($)=>U({error:($.trim()||"Could not read the edited file.").slice(0,Z_)}),Y=K_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then(($)=>{if(PT($)>y_){Q(`The file is over ${y_} ${"bytes"in $?"bytes":"characters"}.`);return}if($.version.length>g_){Q(`The snapshot version is over ${g_} characters.`);return}U({snapshot:"bytes"in $?{bytes:$.bytes,version:$.version}:{content:$.content,version:$.version}})},($)=>Q($ instanceof Error?$.message:String($)));return}if(E.type==="resolve"){let U=(Y)=>{w({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=M_;if(!Q){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>U({item:Y?N_(Y):null}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();U({error:($||"Command failed.").slice(0,Z_)})});return}let M=C_.get(E.id);if(!M)return;if(clearTimeout(M.timer),C_.delete(E.id),E.ok){M.resolve(E.payload);return}M.reject(new I(E.code,E.error))};S.addEventListener("message",AE),w({channel:L,v:W,type:"hello"});let j=(T,E=C)=>{if(u||S.parent===S)return Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((M,U)=>{let Q=setTimeout(()=>{C_.delete(T.id),U(new I("HOST_TIMEOUT","Host did not answer in time."))},E);C_.set(T.id,{resolve:M,reject:U,timer:Q}),w(T)})},k=(T)=>j(T).then(()=>{return}),Z={channel:L,v:W},AT=(T)=>{if(!u&&S.parent!==S)w(T)},UE=()=>AT({...Z,type:"file-save"}),UT=()=>{if(!u&&S.parent!==S)w({...Z,type:"microphone-close",id:V(D)})},IS=async()=>{if(m)throw new I("HOST_REJECTED","The microphone is already open in this frame.");if(G?.features?.microphone!==!0)throw new I("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new I("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<XT||E.sampleRate>DT)throw E.close().catch(()=>{return}),new I("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let M=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=NE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(c)=>U.pull(c.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let $=new Set,D_={queue:U,endedListeners:$,release:()=>{Q.onaudioprocess=null,Q.disconnect(),U.clear();for(let c of Y.stream.getTracks())c.stop();E.close().catch(()=>{return})}};m=D_;try{let c=await j({...Z,type:"microphone-open",id:V(D),payload:{sampleRate:E.sampleRate}},VT);if(!c||!("opened"in c)||c.opened!==!0)throw new I("HOST_REJECTED","Host did not open the microphone.");if(await M,m!==D_)throw new I("DISCONNECTED","The microphone closed while it was opening.")}catch(c){if(m===D_)m=null;throw D_.release(),UT(),c}return{stream:Y.stream,close:()=>{if(m!==D_)return;m=null,D_.release(),UT()},onEnded:(c)=>{return $.add(c),()=>{$.delete(c)}}}},RE=(T)=>{if(!aE(T)||!QS(T))return;T.preventDefault(),UE()},ME=(T)=>{if(!aE(T)||T.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;T.preventDefault(),XE(G.popover.id,"escape").catch(()=>{return})},j_=()=>{let T=G?.surface==="popover"?G.popover:void 0;if(!T)return;let E=$_||B_;if(EE===E)return;EE=E,DE(T.id,E).catch(()=>{return})},x_=()=>{if(G?.surface!=="popover"||$_)return;$_=!0,j_()},IE=(T)=>{if(G?.surface!=="popover"||T.relatedTarget!==null||!$_)return;$_=!1,j_()},CE=()=>{if(G?.surface!=="popover"||B_)return;B_=!0,j_()},GE=()=>{if(G?.surface!=="popover"||!B_)return;B_=!1,j_()},l=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new I("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},RT=async(T)=>{if(T.kind!=="projects")l(T.projectId);let E=await j({...Z,type:"workspace-read",id:V(D),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return E},MT=async(T,E)=>{if(T.kind!=="projects")l(T.projectId);let M=V(D);G_.set(M,E);try{await k({...Z,type:"workspace-subscribe",id:V(D),payload:{subscriptionId:M,query:T}})}catch(U){if(G_.delete(M),!u)w({...Z,type:"workspace-unsubscribe",id:V(D),payload:{subscriptionId:M}});throw U}return()=>{if(!G_.delete(M)||u)return;w({...Z,type:"workspace-unsubscribe",id:V(D),payload:{subscriptionId:M}})}},CS=async(T,E)=>{if(T.kind==="session")l(T.sessionId);if(T.kind==="project")l(T.projectId);let M=V(D);X_.set(M,E);try{await k({...Z,type:"shells-subscribe",id:V(D),payload:{subscriptionId:M,scope:T}})}catch(U){if(X_.delete(M),!u)w({...Z,type:"shells-unsubscribe",id:V(D),payload:{subscriptionId:M}});throw U}return()=>{if(!X_.delete(M)||u)return;w({...Z,type:"shells-unsubscribe",id:V(D),payload:{subscriptionId:M}})}},w_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>CT))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!V_(T.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>GT)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&G?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let E=await j({...Z,type:"storage",id:V(D),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new I("HOST_REJECTED","Host did not return storage data.");return E},XE=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):k({...Z,type:"popover-close",id:V(D),payload:E?{id:T,reason:E}:{id:T}}),DE=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):k({...Z,type:"popover-anchor",id:V(D),payload:{id:T,active:E}});return S.addEventListener("keydown",ME,!0),S.addEventListener("pointerover",x_),S.addEventListener("pointermove",x_),S.addEventListener("pointerout",IE),S.addEventListener("focus",CE),S.addEventListener("blur",GE),{onAction:(T)=>{return a=T,()=>{if(a===T)a=null}},listProjects:async()=>{let T=await RT({kind:"projects"});if(T.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await RT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await RT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>MT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>MT({kind:"worktrees",projectId:T},(M)=>{if(M.kind==="worktrees")E(M)}),onSessions:(T,E)=>MT({kind:"sessions",projectId:T},(M)=>{if(M.kind==="sessions")E(M)}),onRunningShells:(T,E)=>CS(T,E),readShellOutput:async(T,E)=>{l(T,b_);let M=E?.cursor;if(M!==void 0&&(!Number.isInteger(M)||M<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>q_))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${q_}.`);let Y=await j({...Z,type:"shell-output",id:V(D),payload:{shellId:T,cursor:M,tailBytes:U}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(l(T,b_),(await j({...Z,type:"shell-stop",id:V(D),payload:{shellId:T}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{l(T),await k({...Z,type:"open-session",id:V(D),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let M=o_(E),U={op:"get",key:T};if(M)U.scope=M;let Q=await w_(U);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,M)=>{let U=o_(M),Q={op:"set",key:T,value:E};if(U)Q.scope=U;await w_(Q)},delete:async(T,E)=>{let M=o_(E),U={op:"delete",key:T};if(M)U.scope=M;await w_(U)},keys:async(T)=>{let E=o_(T),M={op:"keys"};if(E)M.scope=E;let U=await w_(M);if(U.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(R.add(T),G)T(G);return()=>{R.delete(T)}},onDirectory:(T)=>{if(N.add(T),G)T(G.directory);return()=>{N.delete(T)}},onSession:(T)=>{if(P.add(T),G)T(G.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(X.add(T),i)T(i);return()=>{X.delete(T)}},onConnection:(T)=>{if(K.add(T),G)T(G.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(f.add(T),G)T(G.settings);return()=>{f.delete(T)}},onItem:(T)=>{if(H.add(T),G)T(G.item);return()=>{H.delete(T)}},onBlock:(T)=>{if(g.add(T),G?.block)T(G.block);return()=>{g.delete(T)}},onServiceEvent:(T)=>{return E_.add(T),()=>{E_.delete(T)}},onStatusControl:(T)=>{return p.add(T),()=>{p.delete(T)}},onPopoverClosed:(T)=>{return S_.add(T),()=>{S_.delete(T)}},setStatusControls:(T)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support status controls."));if(!YE(T))return Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...Z,type:"status-controls",id:V(D),payload:{controls:T}})},openPopover:(T)=>{if(G?.features?.popovers!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support popovers."));if(!WT(T))return Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...Z,type:"popover-open",id:V(D),payload:T})},closePopover:XE,setPopoverAnchorActive:DE,onResolve:(T)=>{return M_=T,()=>{if(M_===T)M_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>m_)return Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${m_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>h_))return Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${h_} characters.`));return k({channel:L,v:W,type:"toast",id:V(D),payload:{...T,message:E}})},openUrl:(T)=>k({channel:L,v:W,type:"open-url",id:V(D),payload:{url:T}}),openCommit:(T)=>$T(T)?k({channel:L,v:W,type:"open-commit",id:V(D),payload:{sha:T}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>k({channel:L,v:W,type:"block-answer",id:V(D),payload:{text:T.trim().slice(0,YT)}}),openSurface:(T)=>k({channel:L,v:W,type:"open-surface",id:V(D),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:L,v:W,type:"clipboard-write",id:V(D),payload:{text:T}}),compose:(T)=>k({channel:L,v:W,type:"compose",id:V(D),payload:T}),attach:(T)=>k({channel:L,v:W,type:"attach",id:V(D),payload:N_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)l(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")l(E.directory);else{if(E.name!==void 0)l(E.name,200);if(E.baseBranch!==void 0)l(E.baseBranch,200)}let M=await j({channel:L,v:W,type:"start-session",id:V(D),payload:JT(T)},_.requestTimeoutMs??180000);if(!KT(M))throw new I("HOST_REJECTED","Host did not return a session.");return M},prompt:(T)=>j({channel:L,v:W,type:"prompt",id:V(D),payload:fT(T)}).then((E)=>{if(!FT(E))throw new I("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>k({channel:L,v:W,type:"session-link",id:V(D),payload:N_(T)}),close:()=>k({channel:L,v:W,type:"close",id:V(D)}),oauthStart:()=>k({channel:L,v:W,type:"oauth-start",id:V(D)}),oauthDisconnect:()=>k({channel:L,v:W,type:"oauth-disconnect",id:V(D)}),request:(T)=>(u_(T.path)?j({channel:L,v:W,type:"request",id:V(D),payload:T}):oE()).then((E)=>{if(!l_(E))throw new I("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(u_(T.path)?j({channel:L,v:W,type:"service-request",id:V(D),payload:T}):oE()).then((E)=>{if(!l_(E))throw new I("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>j({channel:L,v:W,type:"service-status",id:V(D)}).then((T)=>{if(!jT(T))throw new I("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(P_(T)?j({channel:L,v:W,type:"file-read",id:V(D),payload:{path:T}}):a_()).then((E)=>{if(!xT(E))throw new I("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!P_(T))return a_();if(E.length>d_)return Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${d_} characters.`));return j({channel:L,v:W,type:"file-write",id:V(D),payload:{path:T,content:E}}).then((M)=>{if(!wT(M))throw new I("HOST_REJECTED","Host did not confirm the write.");return M})},listDir:(T)=>(P_(T)?j({channel:L,v:W,type:"file-list",id:V(D),payload:{path:T}}):a_()).then((E)=>{if(!bT(E))throw new I("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(P_(T)?j({channel:L,v:W,type:"file-stat",id:V(D),payload:{path:T}}):a_()).then((E)=>{if(!qT(E))throw new I("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),M=T.system?.trim();if(E.length===0||E.length>p_)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${p_} characters.`));if(M!==void 0&&(M.length===0||M.length>v_))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${v_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min(ZT,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(M!==void 0)Q.system=M;if(U!==void 0)Q.maxOutputTokens=U;return j({channel:L,v:W,type:"generate",id:V(D),payload:Q},_.requestTimeoutMs??zT).then((Y)=>{if(!yT(Y))throw new I("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{v.add(T);for(let E of Y_.splice(0))F([T],E);return OE(),()=>{v.delete(T)}},openMicrophone:IS,setBadge:(T)=>k({channel:L,v:W,type:"badge",id:V(D),payload:{count:kT(T)}}),setHeight:(T)=>k({channel:L,v:W,type:"resize",id:V(D),payload:{height:HT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!OT)OT=!0,S.addEventListener("keydown",RE,!0);if(F_)T(F_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return K_=T,()=>{if(K_===T)K_=null}},onFileSaved:(T)=>{return H_.add(T),()=>{H_.delete(T)}},reportFileChange:(T)=>AT({...Z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:UE,reportFileUnsupported:()=>AT({...Z,type:"file-unsupported"}),dispose:()=>{for(let T of G_.keys())w({...Z,type:"workspace-unsubscribe",id:V(D),payload:{subscriptionId:T}});G_.clear();for(let T of X_.keys())w({...Z,type:"shells-unsubscribe",id:V(D),payload:{subscriptionId:T}});if(X_.clear(),m)UT(),m.release(),m=null;if(u=!0,M_=null,a=null,K_=null,I_.clear(),H_.clear(),OT)S.removeEventListener("keydown",RE,!0);S.removeEventListener("message",AE),S.removeEventListener("keydown",ME,!0),S.removeEventListener("pointerover",x_),S.removeEventListener("pointermove",x_),S.removeEventListener("pointerout",IE),S.removeEventListener("focus",CE),S.removeEventListener("blur",GE);for(let T of C_.values())clearTimeout(T.timer),T.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));C_.clear(),R.clear(),N.clear(),P.clear(),X.clear(),K.clear(),f.clear(),H.clear(),g.clear(),E_.clear(),p.clear(),S_.clear(),v.clear(),Y_.length=0}}};var nE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var PO=new Set(nE);var iE=["none","agent","user"];var WO=new Set(iE);var YS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],KS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],rE=(_,S)=>{S.style.colorScheme=_.mode;for(let[A,C]of YS)S.style.setProperty(A,_.tokens[C]);for(let[A,C,R]of KS){let N=_.tokens[R]??"";S.style.setProperty(A,N),S.style.setProperty(C,N)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},hT=(_,S)=>{if(rE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var FS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},B=(_,S)=>`var(--${_}, var(--oc-${FS[_]}, ${S}))`,s=B("surface-background","transparent"),i_=B("surface-elevated","transparent"),L_=B("surface-elevated-foreground","inherit"),h=B("surface-foreground","inherit"),z=B("surface-muted-foreground","gray"),$S=B("surface-muted","transparent"),O_=B("interactive-border","currentColor"),b=B("interactive-hover","transparent"),A_=B("interactive-active","transparent"),cT=B("interactive-selection","transparent"),dT=B("interactive-selection-foreground","inherit"),r=B("primary","currentColor"),pT=B("primary-text","inherit"),vT=B("error-text","inherit"),BS=B("font-sans","inherit"),uT=B("font-mono","monospace"),_S=B("radius","9px"),lT=`calc(${_S} - 2px)`,sE=`calc(${_S} - 4px)`,J=(_,S,A="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${A})`,tE=`background-image: linear-gradient(${b}, ${b});`,aT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,oT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",eE="box-shadow: var(--oc-sdk-lit);",nT=`inset 0 0.5px 0 0 ${J(h,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ZS=`
:root {
  --oc-sdk-edge: ${J(h,16)};
  --oc-sdk-field-bg: ${i_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${J(h,14)};
  --oc-sdk-field-bg: ${J(s,50,i_)};
  --oc-sdk-raised-bg: ${i_};
  --oc-sdk-field-lift: ${nT};
  --oc-sdk-raised-lift: ${nT};
  --oc-sdk-lit: ${nT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,n_=(_)=>{let S=B(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${B(`${_}-text`,"inherit")}; }`},O=(_)=>`calc(${_}rem / 14)`,zS=`
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
`,TS=`${ZS}
.oc-sdk { color: ${h}; font-family: ${BS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${tE} }
.oc-sdk-mono { font-family: ${uT}; }
.oc-sdk-muted { color: ${z}; }
${n_("success")}${n_("warning")}${n_("error")}${n_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${pT}; }

.oc-sdk-btn { border-radius: ${lT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${sE}; }
.oc-sdk-btn[data-variant="default"] { color: ${pT}; background: ${J(r,10,s)}; border-color: ${J(r,12)}; ${eE} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${J(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${J(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${$S}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${L_}; ${oT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${B("status-error","red")}; color: ${vT}; background: ${J("var(--oc-sdk-tone)",7,s)}; border-color: ${J("var(--oc-sdk-tone)",12)}; ${eE} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${J("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${J("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${vT}; }
.oc-sdk-input { border-radius: ${lT}; background: var(--oc-sdk-field-bg); color: ${L_}; ${aT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${aT(J(h,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${aT(B("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${uT}; }

.oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${sE}; color: ${z}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${h}; }

.oc-sdk-trigger { border-radius: ${lT}; background: var(--oc-sdk-raised-bg); color: ${L_}; ${oT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${z}; }
.oc-sdk-trigger-chevron { color: ${z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${L_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${i_}; background-clip: padding-box; color: ${L_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${b}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${cT}; color: ${dT}; }
.oc-sdk-option-check { color: ${h}; }
.oc-sdk-option[data-destructive="true"] { color: ${vT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${J(B("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${z}; }
.oc-sdk-popup-empty { color: ${z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${O_}; border-radius: 4px; color: ${h}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${J(h,60,O_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${O_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${tE} }
.oc-sdk-check-desc { color: ${z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${J(h,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${h}; }
.oc-sdk-tab[aria-selected="true"] { color: ${dT}; background: ${cT}; border-color: ${O_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${L_}; background: var(--oc-sdk-raised-bg); ${oT} }
.oc-sdk-tab-count { color: ${z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${J(h,6)}; color: ${z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${J("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${b}; }
.oc-sdk-row[aria-selected="true"] { background: ${cT}; color: ${dT}; }
.oc-sdk-row-lead { font-family: ${uT}; color: ${z}; }
.oc-sdk-row-sub { color: ${z}; }
.oc-sdk-row-meta { color: ${z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${z}; }

.oc-sdk-empty-body { color: ${z}; }

.oc-sdk-spinner { color: ${z}; }
.oc-sdk-spinner-ring { border-color: ${O_}; border-top-color: ${r}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${J("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${z}; }

.oc-sdk-separator { color: ${z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${J(O_,40)}; }

.oc-sdk-progress-label { color: ${z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${J(h,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${B("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${B("success-text","inherit")}; }

.oc-sdk-text a { color: ${pT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${J(O_,60)}; }
`,x=`
${IT}
${zS}
${TS}`;var ES=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"zhihu",name:"知乎",channels:[{id:"hot",name:"热榜"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"csdn",name:"CSDN",channels:[{id:"hot",name:"热点"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var ST=[],US=()=>{let _=document.querySelector("#msg2");if(_&&ST.length>0)_.innerHTML=`<div class="err">${ST.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{ST.push("页面错误："+String(_.message??_)),US()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,A=S?.code;ST.push("未处理异常"+(A?` [${A}]`:"")+"："+String(S?.message??S)),US()});var jS=["zhihu","toutiao","csdn"],sT=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],xS=180000,wS=12,SS=25,n=mT(),RS=document.querySelector("#app");if(!RS)throw Error("Missing #app");RS.innerHTML=`
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
  <div class="sec">话题 <span id="tcount" class="mut"></span></div><div id="msg2"></div><div id="catchips"></div><div id="topics"></div>
  <div class="sec">配置</div>
  <div id="cfgside">
    <div class="mut">HTTP 代理（宿主不透传系统代理，直连失败时填）。只存本机。</div>
    <input id="cfg-proxy" type="text" placeholder="http://127.0.0.1:7897（留空=直连）" />
    <button class="btn primary" id="b-save">保存并测试</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span><br>R 刷新</div>
</aside>
</div>`;var o=(_)=>document.querySelector(`#${_}`),bS=o("cname"),TT=o("topics"),ET=o("catchips"),qS="v0.9.0-fused";bS.textContent="阅读";document.querySelector("#build").textContent=qS;var Q_="",d=[],__=[],tT=0,rT=!1,U_=0,R_=new Map,OS=!1,T_="",MS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},J_=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),_E=async(_)=>{try{return await n.storage.get(_)}catch{return}},TE=async(_,S)=>{try{await n.storage.set(_,S)}catch{}},eT=async(_,S,A)=>{let C=S;if(Q_&&_==="GET"&&C.startsWith("/"))C+=(C.includes("?")?"&":"?")+`proxy=${encodeURIComponent(Q_)}`;return n.serviceRequest({method:_,path:C,body:A})},yS=(_,S,A)=>A?`${_.name}·${S.name}`:_.name,gS=(_)=>{if(ET.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=T_===""?"on":"",S.onclick=()=>{T_="",f_()},ET.appendChild(S);for(let A of _){let C=document.createElement("button"),R=d.filter((N)=>R_.get(e(N))===A).length;C.textContent=`${A} ${R}`,C.className=T_===A?"on":"",C.onclick=()=>{T_=T_===A?"":A,f_()},ET.appendChild(C)}},e=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,f_=()=>{let _=[...new Set(d.map((R)=>R_.get(e(R))).filter((R)=>!!R))],S=sT.filter((R)=>_.includes(R));gS(S);let A=__.length>0?` · ${__.join("、")}暂不可用`:"";o("tcount").textContent=d.length>0?`${d.length}${A}`:A.replace(/^ · /,""),TT.innerHTML="";let C=T_?[T_]:S.length>0?S:[""];for(let R of C){if(!T_&&R){let N=document.createElement("div");N.className="cathead",N.textContent=R,TT.appendChild(N)}for(let N of d){if(R&&R_.get(e(N))!==R)continue;let P=document.createElement("div");P.className="nrow";let X=N.excerpt?`<br><span class="xp">${J_(N.excerpt)}</span>`:"";P.innerHTML=`<span class="tt">${J_(N.title)}<br><span class="src">${J_(N.src)}</span>${X}</span>`;let K=document.createElement("button");K.className="aibtn",K.title="AI 总结这篇",K.textContent="✦",K.onclick=()=>void hS(N,P,K),P.appendChild(K),TT.appendChild(P)}}},mS=async(_)=>{if(OS)return;let S=d.filter((A)=>!R_.has(e(A)));for(let A=0;A<S.length;A+=SS){if(_!==U_)return;let C=S.slice(A,A+SS),R=await Promise.all(C.map(async(P)=>{let X=await _E(e(P));return typeof X==="string"&&X?X:""})),N=C.filter((P,X)=>!R[X]);if(N.length>0)try{let P=N.map((f,H)=>`${H}. ${f.title}`).join(`
`).slice(0,3000),X=await n.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${sT.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:256}),K=[];for(let f of X.text.split(`
`)){let H=/^\s*(\d+)\s*[:：]\s*(\S+)/.exec(f);if(!H)continue;let g=sT.includes(H[2])?H[2]:"其他";K[Number(H[1])]=g}await Promise.all(N.map(async(f,H)=>{let g=K[H]??"其他";R_.set(e(f),g),await TE(e(f),g)}))}catch(P){let X=P?.code;if(X==="NO_MODEL"||X==="MODEL_FAILED"){OS=!0,MS(J_(X==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）"));return}for(let K of N)R_.set(e(K),"其他")}else C.forEach((P,X)=>R_.set(e(P),R[X]));if(_!==U_)return;f_()}},AS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),hS=async(_,S,A)=>{let C=S.querySelector(".aisum");if(C){C.remove();return}let R=`moyu:csum:${_.community}:${_.id}`;A.disabled=!0;let N=A.textContent;A.textContent="…";try{let P=await _E(R),X=typeof P==="string"&&P?P:"";if(!X){let f=await eT("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),H=JSON.parse(f.body);if(!H.ok||!H.thread)throw Error(H.error??"正文失败");let g=H.thread,E_=[g.opening?AS(g.opening.html):"",...g.posts.map((p)=>AS(p.html))].filter(Boolean).join(`
`).slice(0,3500);if(!E_){if(!jS.includes(_.community))throw Error("这篇没有可总结的正文");let p="";try{let S_=await eT("GET",`/search?q=${encodeURIComponent(_.title)}`),v=JSON.parse(S_.body);if(v.ok&&v.results&&v.results.length>0){let Y_=v.results.slice(0,5).map((a,I_)=>`${I_+1}. 「${a.title}」${a.snippet}${a.site?`（${a.site}）`:""}`).join(`
`).slice(0,2500);p=(await n.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${Y_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(p)X=p+"（联网版）";else{if(X=(await n.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!X)throw Error("小模型没有返回总结");X+="（标题版）"}}else if(X=(await n.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${E_}`,maxOutputTokens:256})).text.trim().slice(0,500),!X)throw Error("小模型没有返回总结");await TE(R,X)}let K=document.createElement("div");K.className="aisum",K.textContent=`✦ ${X}`,S.appendChild(K)}catch(P){let X=P?.code,K=X==="NO_MODEL"?"无可用小模型":X==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",f=document.createElement("div");f.className="aisum",f.textContent=`总结失败：${K}`,S.appendChild(f)}finally{A.disabled=!1,A.textContent=N}},k_=async(_=!1)=>{if(rT||document.hidden)return;if(!_&&Date.now()-tT<xS&&d.length>0)return;rT=!0;let S=++U_;try{let A=ES.flatMap((C)=>C.channels.map((R)=>({c:C,ch:R})));if(d=[],__=[],o("tcount").textContent=`加载中 0/${A.length}`,TT.innerHTML="",ET.innerHTML="",await Promise.all(A.map(async({c:C,ch:R})=>{try{let N=await eT("GET",`/list?community=${C.id}&channel=${encodeURIComponent(R.id)}`),P=JSON.parse(N.body);if(!P.ok)throw Error(P.error??"列表失败");if(S!==U_)return;let X=(P.topics??[]).slice(0,wS).map((K)=>({...K,src:yS(C,R,C.channels.length>1)}));if(d.push(...X),S!==U_)return;o("tcount").textContent=`加载中 ${d.length} · 已回 ${A.length-__.length}/${A.length}`,f_()}catch{if(S!==U_)return;if(!__.includes(C.name))__.push(C.name)}})),S!==U_)return;tT=Date.now(),MS(__.length>0?J_(`${__.join("、")}暂不可用（多为对侧限流过一会儿按 R 再试）`):""),f_(),mS(S)}finally{rT=!1}};o("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){o("cfg-out").textContent="格式不对，要 http(s)://host:port";return}Q_=_,await TE("moyu:proxy",Q_),o("cfg-out").textContent="已保存，正在测试…",tT=0,await k_(!0),o("cfg-out").textContent=d.length>0?`连通（${d.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")k_(!0);else if(_.key==="q")n.close()});var _T=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(_T++,_T>=2)_T=0,n.close();setTimeout(()=>_T=0,500)}});document.addEventListener("visibilitychange",()=>{if(!document.hidden)k_(!1)});var cS=async()=>{Q_=await _E("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=Q_};n.onReady((_)=>{hT(_,document.documentElement)});cS().then(()=>void k_(!0));setInterval(()=>void k_(!1),60000);})();
