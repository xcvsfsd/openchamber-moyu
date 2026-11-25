(()=>{var L="openchamber.sdk",W=1;var CT=`
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
`;function VE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let A=new WeakMap;_.addEventListener("scroll",(D)=>{let I=D.target===_?S:D.target;if(!(I instanceof Element))return;if(!I.hasAttribute("data-oc-scrolling"))I.setAttribute("data-oc-scrolling","");let C=A.get(I);if(C!==void 0)clearTimeout(C);A.set(I,setTimeout(()=>{A.delete(I),I.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var GS=`(${VE.toString()})(document);`;var GT=128,XT=65536;var w_=128;var b_=65536;var DT=8000,VT=192000,NT=120000;var NE=(_)=>{let S=[],A=0,D=0;return{push:(I)=>{S.push(I),D+=I.length;while(D-A>_&&S.length>1){let C=S.shift();D-=C?.length??0,A=0}},pull:(I)=>{let C=0;while(C<I.length&&S.length>0){let P=S[0],G=Math.min(I.length-C,P.length-A);if(I.set(P.subarray(A,A+G),C),C+=G,A+=G,A>=P.length)S.shift(),D-=P.length,A=0}I.fill(0,C)},clear:()=>{S.length=0,A=0,D=0},get size(){return D-A}}};var QE=/^[a-z][a-z0-9-]{0,39}$/;var PE=(_)=>Object(_)===_&&!Array.isArray(_),PT=(_,S)=>Object.keys(_).every((A)=>S.includes(A)),LE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,WE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,YE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let A of _){if(!PE(A)||!QE.test(A.id)||!LE(A.label))return!1;if(A.disabled!==void 0&&A.disabled!==!0&&A.disabled!==!1)return!1;if(S.has(A.id))return!1;if(S.add(A.id),A.kind==="button"){if(!PT(A,["kind","id","label","disabled"]))return!1;continue}if(A.kind!=="select"||!PT(A,["kind","id","label","value","options","disabled"]))return!1;if(!WE(A.value)||!Array.isArray(A.options)||A.options.length<1||A.options.length>16)return!1;let D=new Set;for(let I of A.options){if(!PE(I)||!PT(I,["value","label"])||!WE(I.value)||!LE(I.label)||D.has(I.value))return!1;D.add(I.value)}if(!D.has(A.value))return!1}return!0};var KE=["{id}","{segment}","{segments+}"];var rS=new Set(KE);var FE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var tS=new Set(FE);var q_=20000000,y_=256;var LT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,$E=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let A=0;A<_.bytes.byteLength;A+=1)if(_.bytes[A]!==S.bytes[A])return!1;return!0};var BE=/^[A-Za-z0-9_-]{1,80}$/;var ZE=["left","right","top","bottom"];var zE=(_,S=0,A={remaining:16000})=>{if(--A.remaining<0||S>=32)return!1;if(_===null)return!0;let D=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let I of D)if(!zE(I,S+1,A))return!1;return!0},WT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(WT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(WT)}return String(_)===_||Number.isFinite(_)},QT=(_)=>{try{if(String(_.id)!==_.id||!BE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!ZE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!zE(_.data)||!WT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var KT=2000;var fE=["file","directory","other","missing"],FT=(_)=>Boolean(_&&"sessionId"in _),$T=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var kE=/^[0-9a-f]{7,64}$/i,BT=(_)=>kE.test(_),g_=500,m_=32000,HE=16000,jE=128,xE=200,wE=2000,bE=16000,qE=80,yE=200,gE=16000;var mE=2000;var ZT=20000,h_=1024,c_=2000000;var d_=64000,p_=8000,zT=4000;var JT=960000;var hE=999,cE=1e4,z_=500,dE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pE=["stopped","starting","ready","failed"],DS=new Set(dE),vE=(_)=>DS.has(_),uE=(_)=>_&&vE(_)?_:"HOST_REJECTED",V_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(V_);if(Object(_)===_)return Object.values(_).every(V_);return!1},lE=(_)=>V_(_)&&JSON.stringify(_).length<=gE,JE=(_)=>_?.trim().slice(0,yE)??"",N_=(_)=>{let S=_.id.trim().slice(0,jE),A=_.title.trim().slice(0,xE),D=_.url.trim().slice(0,wE),I=_.text?.trim().slice(0,bE),C=_.author?.trim().slice(0,qE),P=_.kind==="pull"?"pull":"issue",G={providerId:_.providerId.trim(),id:S,title:A||S,url:D,kind:P};if(I)G.text=I;if(C)G.author=C;if(P==="pull"){let Z=JE(_.branches?.head),K=JE(_.branches?.base);if(Z&&K)G.branches={head:Z,base:K}}if(lE(_.data))G.data=_.data;return G},fT=(_)=>{let S=N_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},kT=(_)=>{let S={text:_.text.trim().slice(0,HE)};if(_.send)S.send=!0;return S},HT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(hE,Math.max(0,Math.round(_)))},jT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(cE,Math.max(0,Math.ceil(_)))};var P_=(_)=>_.length>0&&_.length<=h_&&!_.includes("\x00")&&!_.includes("\\");var v_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>mE)return!1;return!_.split("/").some((A)=>A==="."||A==="..")},VS=new Set(pE),xT=(_)=>Boolean(_&&"status"in _&&VS.has(String(_.status))&&!("body"in _)),u_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),wT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),bT=(_)=>Boolean(_&&"written"in _&&_.written===!0),qT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),NS=new Set(fE),yT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&NS.has(String(_.kind))&&Number.isFinite(_.size)),gT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),PS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),LS=(_)=>Object(_)===_?_:null,YT=(_)=>String(_)===_&&_.length>0,WS=(_)=>{if(!YT(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&YT(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:uE(YT(_.code)?_.code:void 0)};return null},mT=(_)=>{let S=LS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return WS(S);if(!PS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var aE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),QS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var oE=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),l_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${h_} characters without NUL or backslash.`)),a_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},hT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let A=_.acceptSource??((T)=>T===S.parent),D=_.requestTimeoutMs??ZT,I=new Set,C=new Set,P=new Set,G=new Set,Z=new Set,K=new Set,H=new Set,m=new Set,E_=new Set,p=new Set,S_=new Set,v=new Set,K_=[],M_=null,o=null,I_=new Set,k_=new Set,F_=null,$_=null,AT=!1,C_=new Map,G_=new Map,X_=new Map,u=!1,V={value:0},X=null,i=null,B_=!1,Z_=!1,EE=null,h=null,SE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},w=(T)=>{S.parent.postMessage(T,"*")},OE=()=>{if(u||S.parent===S||v.size===0||X?.features?.lateGenerateResults!==!0)return;w({channel:L,v:W,type:"generate-late-listen"})},F=(T,E)=>{for(let R of T)try{R(E)}catch(U){console.error(U)}},AE=(T)=>{if(!(T instanceof MessageEvent))return;if(!A(T.source))return;let E=mT(T.data);if(!E)return;if(E.type==="workspace"){let U=G_.get(E.payload.subscriptionId);if(U)F([U],E.payload.snapshot);return}if(E.type==="shells"){let U=X_.get(E.payload.subscriptionId);if(U)F([U],E.payload.snapshot);return}if(E.type==="microphone-audio"){h?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let U=h;if(!U)return;h=null,U.release(),F(U.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(X=E.payload,i=SE(E.payload.session),F(I,E.payload),F(C,E.payload.directory),F(P,E.payload.session),i)F(G,i);if(F(Z,E.payload.connection),F(K,E.payload.settings),F(H,E.payload.item),E.payload.block)F(m,E.payload.block);OE();return}if(E.type==="service-event"){F(E_,E.payload);return}if(E.type==="generate-late"){if(v.size===0)K_.push(E.payload);else F(v,E.payload);return}if(E.type==="directory"){if(X)X={...X,directory:E.payload.directory};F(C,E.payload.directory);return}if(E.type==="session"){if(X)X={...X,session:E.payload.session};if(!E.payload.session)i=null;else if(i?.sessionId!==E.payload.session.id)i=SE(E.payload.session);F(P,E.payload.session);return}if(E.type==="session-lifecycle"){i=E.payload,F(G,E.payload);return}if(E.type==="connection"){if(X)X={...X,connection:E.payload.connection};F(Z,E.payload.connection);return}if(E.type==="settings"){if(X)X={...X,settings:E.payload.settings};F(K,E.payload.settings);return}if(E.type==="item"){if(X)X={...X,item:E.payload.item};F(H,E.payload.item);return}if(E.type==="status-control-event"){F(p,E.payload);return}if(E.type==="popover-closed"){F(S_,E.payload);return}if(E.type==="action"){let U=(Y)=>{if(!u)w({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=o;if(!Q){U({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>U({ok:!0}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();U({ok:!1,error:($||"Action failed.").slice(0,z_)})});return}if(E.type==="file-open"){let U=E.payload;if($_&&$E($_,U))return;$_=U,F(I_,E.payload);return}if(E.type==="file-saved"){F(k_,E.payload.version);return}if(E.type==="file-snapshot"){let U=($)=>{if(!u)w({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:$})},Q=($)=>U({error:($.trim()||"Could not read the edited file.").slice(0,z_)}),Y=F_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then(($)=>{if(LT($)>q_){Q(`The file is over ${q_} ${"bytes"in $?"bytes":"characters"}.`);return}if($.version.length>y_){Q(`The snapshot version is over ${y_} characters.`);return}U({snapshot:"bytes"in $?{bytes:$.bytes,version:$.version}:{content:$.content,version:$.version}})},($)=>Q($ instanceof Error?$.message:String($)));return}if(E.type==="resolve"){let U=(Y)=>{w({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=M_;if(!Q){U({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>U({item:Y?N_(Y):null}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();U({error:($||"Command failed.").slice(0,z_)})});return}let R=C_.get(E.id);if(!R)return;if(clearTimeout(R.timer),C_.delete(E.id),E.ok){R.resolve(E.payload);return}R.reject(new M(E.code,E.error))};S.addEventListener("message",AE),w({channel:L,v:W,type:"hello"});let j=(T,E=D)=>{if(u||S.parent===S)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,U)=>{let Q=setTimeout(()=>{C_.delete(T.id),U(new M("HOST_TIMEOUT","Host did not answer in time."))},E);C_.set(T.id,{resolve:R,reject:U,timer:Q}),w(T)})},k=(T)=>j(T).then(()=>{return}),z={channel:L,v:W},UT=(T)=>{if(!u&&S.parent!==S)w(T)},UE=()=>UT({...z,type:"file-save"}),RT=()=>{if(!u&&S.parent!==S)w({...z,type:"microphone-close",id:N(V)})},IS=async()=>{if(h)throw new M("HOST_REJECTED","The microphone is already open in this frame.");if(X?.features?.microphone!==!0)throw new M("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new M("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<DT||E.sampleRate>VT)throw E.close().catch(()=>{return}),new M("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let R=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,U=NE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(d)=>U.pull(d.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let $=new Set,D_={queue:U,endedListeners:$,release:()=>{Q.onaudioprocess=null,Q.disconnect(),U.clear();for(let d of Y.stream.getTracks())d.stop();E.close().catch(()=>{return})}};h=D_;try{let d=await j({...z,type:"microphone-open",id:N(V),payload:{sampleRate:E.sampleRate}},NT);if(!d||!("opened"in d)||d.opened!==!0)throw new M("HOST_REJECTED","Host did not open the microphone.");if(await R,h!==D_)throw new M("DISCONNECTED","The microphone closed while it was opening.")}catch(d){if(h===D_)h=null;throw D_.release(),RT(),d}return{stream:Y.stream,close:()=>{if(h!==D_)return;h=null,D_.release(),RT()},onEnded:(d)=>{return $.add(d),()=>{$.delete(d)}}}},RE=(T)=>{if(!aE(T)||!QS(T))return;T.preventDefault(),UE()},ME=(T)=>{if(!aE(T)||T.key!=="Escape"||X?.surface!=="popover"||!X.popover)return;T.preventDefault(),XE(X.popover.id,"escape").catch(()=>{return})},H_=()=>{let T=X?.surface==="popover"?X.popover:void 0;if(!T)return;let E=B_||Z_;if(EE===E)return;EE=E,DE(T.id,E).catch(()=>{return})},j_=()=>{if(X?.surface!=="popover"||B_)return;B_=!0,H_()},IE=(T)=>{if(X?.surface!=="popover"||T.relatedTarget!==null||!B_)return;B_=!1,H_()},CE=()=>{if(X?.surface!=="popover"||Z_)return;Z_=!0,H_()},GE=()=>{if(X?.surface!=="popover"||!Z_)return;Z_=!1,H_()},l=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new M("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},MT=async(T)=>{if(T.kind!=="projects")l(T.projectId);let E=await j({...z,type:"workspace-read",id:N(V),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return E},IT=async(T,E)=>{if(T.kind!=="projects")l(T.projectId);let R=N(V);G_.set(R,E);try{await k({...z,type:"workspace-subscribe",id:N(V),payload:{subscriptionId:R,query:T}})}catch(U){if(G_.delete(R),!u)w({...z,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:R}});throw U}return()=>{if(!G_.delete(R)||u)return;w({...z,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:R}})}},CS=async(T,E)=>{if(T.kind==="session")l(T.sessionId);if(T.kind==="project")l(T.projectId);let R=N(V);X_.set(R,E);try{await k({...z,type:"shells-subscribe",id:N(V),payload:{subscriptionId:R,scope:T}})}catch(U){if(X_.delete(R),!u)w({...z,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:R}});throw U}return()=>{if(!X_.delete(R)||u)return;w({...z,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:R}})}},x_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>GT))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!V_(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>XT)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&X?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let E=await j({...z,type:"storage",id:N(V),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return E},XE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...z,type:"popover-close",id:N(V),payload:E?{id:T,reason:E}:{id:T}}),DE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...z,type:"popover-anchor",id:N(V),payload:{id:T,active:E}});return S.addEventListener("keydown",ME,!0),S.addEventListener("pointerover",j_),S.addEventListener("pointermove",j_),S.addEventListener("pointerout",IE),S.addEventListener("focus",CE),S.addEventListener("blur",GE),{onAction:(T)=>{return o=T,()=>{if(o===T)o=null}},listProjects:async()=>{let T=await MT({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await MT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await MT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>IT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>IT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")E(R)}),onSessions:(T,E)=>IT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")E(R)}),onRunningShells:(T,E)=>CS(T,E),readShellOutput:async(T,E)=>{l(T,w_);let R=E?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let U=E?.tailBytes;if(U!==void 0&&(!Number.isInteger(U)||U<1||U>b_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${b_}.`);let Y=await j({...z,type:"shell-output",id:N(V),payload:{shellId:T,cursor:R,tailBytes:U}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(l(T,w_),(await j({...z,type:"shell-stop",id:N(V),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{l(T),await k({...z,type:"open-session",id:N(V),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let R=a_(E),U={op:"get",key:T};if(R)U.scope=R;let Q=await x_(U);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,R)=>{let U=a_(R),Q={op:"set",key:T,value:E};if(U)Q.scope=U;await x_(Q)},delete:async(T,E)=>{let R=a_(E),U={op:"delete",key:T};if(R)U.scope=R;await x_(U)},keys:async(T)=>{let E=a_(T),R={op:"keys"};if(E)R.scope=E;let U=await x_(R);if(U.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return U.keys}},onReady:(T)=>{if(I.add(T),X)T(X);return()=>{I.delete(T)}},onDirectory:(T)=>{if(C.add(T),X)T(X.directory);return()=>{C.delete(T)}},onSession:(T)=>{if(P.add(T),X)T(X.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(G.add(T),i)T(i);return()=>{G.delete(T)}},onConnection:(T)=>{if(Z.add(T),X)T(X.connection);return()=>{Z.delete(T)}},onSettings:(T)=>{if(K.add(T),X)T(X.settings);return()=>{K.delete(T)}},onItem:(T)=>{if(H.add(T),X)T(X.item);return()=>{H.delete(T)}},onBlock:(T)=>{if(m.add(T),X?.block)T(X.block);return()=>{m.delete(T)}},onServiceEvent:(T)=>{return E_.add(T),()=>{E_.delete(T)}},onStatusControl:(T)=>{return p.add(T),()=>{p.delete(T)}},onPopoverClosed:(T)=>{return S_.add(T),()=>{S_.delete(T)}},setStatusControls:(T)=>{if(X?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!YE(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...z,type:"status-controls",id:N(V),payload:{controls:T}})},openPopover:(T)=>{if(X?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!QT(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...z,type:"popover-open",id:N(V),payload:T})},closePopover:XE,setPopoverAnchorActive:DE,onResolve:(T)=>{return M_=T,()=>{if(M_===T)M_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>g_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${g_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>m_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${m_} characters.`));return k({channel:L,v:W,type:"toast",id:N(V),payload:{...T,message:E}})},openUrl:(T)=>k({channel:L,v:W,type:"open-url",id:N(V),payload:{url:T}}),openCommit:(T)=>BT(T)?k({channel:L,v:W,type:"open-commit",id:N(V),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>k({channel:L,v:W,type:"block-answer",id:N(V),payload:{text:T.trim().slice(0,KT)}}),openSurface:(T)=>k({channel:L,v:W,type:"open-surface",id:N(V),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:L,v:W,type:"clipboard-write",id:N(V),payload:{text:T}}),compose:(T)=>k({channel:L,v:W,type:"compose",id:N(V),payload:T}),attach:(T)=>k({channel:L,v:W,type:"attach",id:N(V),payload:N_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)l(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")l(E.directory);else{if(E.name!==void 0)l(E.name,200);if(E.baseBranch!==void 0)l(E.baseBranch,200)}let R=await j({channel:L,v:W,type:"start-session",id:N(V),payload:fT(T)},_.requestTimeoutMs??180000);if(!FT(R))throw new M("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>j({channel:L,v:W,type:"prompt",id:N(V),payload:kT(T)}).then((E)=>{if(!$T(E))throw new M("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>k({channel:L,v:W,type:"session-link",id:N(V),payload:N_(T)}),close:()=>k({channel:L,v:W,type:"close",id:N(V)}),oauthStart:()=>k({channel:L,v:W,type:"oauth-start",id:N(V)}),oauthDisconnect:()=>k({channel:L,v:W,type:"oauth-disconnect",id:N(V)}),request:(T)=>(v_(T.path)?j({channel:L,v:W,type:"request",id:N(V),payload:T}):oE()).then((E)=>{if(!u_(E))throw new M("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(v_(T.path)?j({channel:L,v:W,type:"service-request",id:N(V),payload:T}):oE()).then((E)=>{if(!u_(E))throw new M("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>j({channel:L,v:W,type:"service-status",id:N(V)}).then((T)=>{if(!xT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(P_(T)?j({channel:L,v:W,type:"file-read",id:N(V),payload:{path:T}}):l_()).then((E)=>{if(!wT(E))throw new M("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!P_(T))return l_();if(E.length>c_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${c_} characters.`));return j({channel:L,v:W,type:"file-write",id:N(V),payload:{path:T,content:E}}).then((R)=>{if(!bT(R))throw new M("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(P_(T)?j({channel:L,v:W,type:"file-list",id:N(V),payload:{path:T}}):l_()).then((E)=>{if(!qT(E))throw new M("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(P_(T)?j({channel:L,v:W,type:"file-stat",id:N(V),payload:{path:T}}):l_()).then((E)=>{if(!yT(E))throw new M("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),R=T.system?.trim();if(E.length===0||E.length>d_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${d_} characters.`));if(R!==void 0&&(R.length===0||R.length>p_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${p_} characters.`));let U=T.maxOutputTokens===void 0?void 0:Math.min(zT,Math.max(1,Math.floor(T.maxOutputTokens)));if(U!==void 0&&!Number.isFinite(U))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(R!==void 0)Q.system=R;if(U!==void 0)Q.maxOutputTokens=U;return j({channel:L,v:W,type:"generate",id:N(V),payload:Q},_.requestTimeoutMs??JT).then((Y)=>{if(!gT(Y))throw new M("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{v.add(T);for(let E of K_.splice(0))F([T],E);return OE(),()=>{v.delete(T)}},openMicrophone:IS,setBadge:(T)=>k({channel:L,v:W,type:"badge",id:N(V),payload:{count:HT(T)}}),setHeight:(T)=>k({channel:L,v:W,type:"resize",id:N(V),payload:{height:jT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!AT)AT=!0,S.addEventListener("keydown",RE,!0);if($_)T($_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return F_=T,()=>{if(F_===T)F_=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>UT({...z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:UE,reportFileUnsupported:()=>UT({...z,type:"file-unsupported"}),dispose:()=>{for(let T of G_.keys())w({...z,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:T}});G_.clear();for(let T of X_.keys())w({...z,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:T}});if(X_.clear(),h)RT(),h.release(),h=null;if(u=!0,M_=null,o=null,F_=null,I_.clear(),k_.clear(),AT)S.removeEventListener("keydown",RE,!0);S.removeEventListener("message",AE),S.removeEventListener("keydown",ME,!0),S.removeEventListener("pointerover",j_),S.removeEventListener("pointermove",j_),S.removeEventListener("pointerout",IE),S.removeEventListener("focus",CE),S.removeEventListener("blur",GE);for(let T of C_.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));C_.clear(),I.clear(),C.clear(),P.clear(),G.clear(),Z.clear(),K.clear(),H.clear(),m.clear(),E_.clear(),p.clear(),S_.clear(),v.clear(),K_.length=0}}};var nE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var NO=new Set(nE);var iE=["none","agent","user"];var LO=new Set(iE);var YS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],KS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],rE=(_,S)=>{S.style.colorScheme=_.mode;for(let[A,D]of YS)S.style.setProperty(A,_.tokens[D]);for(let[A,D,I]of KS){let C=_.tokens[I]??"";S.style.setProperty(A,C),S.style.setProperty(D,C)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},cT=(_,S)=>{if(rE(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var FS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},B=(_,S)=>`var(--${_}, var(--oc-${FS[_]}, ${S}))`,s=B("surface-background","transparent"),n_=B("surface-elevated","transparent"),L_=B("surface-elevated-foreground","inherit"),c=B("surface-foreground","inherit"),J=B("surface-muted-foreground","gray"),$S=B("surface-muted","transparent"),O_=B("interactive-border","currentColor"),b=B("interactive-hover","transparent"),A_=B("interactive-active","transparent"),dT=B("interactive-selection","transparent"),pT=B("interactive-selection-foreground","inherit"),r=B("primary","currentColor"),vT=B("primary-text","inherit"),uT=B("error-text","inherit"),BS=B("font-sans","inherit"),lT=B("font-mono","monospace"),_S=B("radius","9px"),aT=`calc(${_S} - 2px)`,sE=`calc(${_S} - 4px)`,f=(_,S,A="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${A})`,tE=`background-image: linear-gradient(${b}, ${b});`,oT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,nT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",eE="box-shadow: var(--oc-sdk-lit);",iT=`inset 0 0.5px 0 0 ${f(c,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ZS=`
:root {
  --oc-sdk-edge: ${f(c,16)};
  --oc-sdk-field-bg: ${n_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${f(c,14)};
  --oc-sdk-field-bg: ${f(s,50,n_)};
  --oc-sdk-raised-bg: ${n_};
  --oc-sdk-field-lift: ${iT};
  --oc-sdk-raised-lift: ${iT};
  --oc-sdk-lit: ${iT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,o_=(_)=>{let S=B(`status-${_}`,"currentColor");return`
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
.oc-sdk { color: ${c}; font-family: ${BS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${tE} }
.oc-sdk-mono { font-family: ${lT}; }
.oc-sdk-muted { color: ${J}; }
${o_("success")}${o_("warning")}${o_("error")}${o_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${vT}; }

.oc-sdk-btn { border-radius: ${aT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${sE}; }
.oc-sdk-btn[data-variant="default"] { color: ${vT}; background: ${f(r,10,s)}; border-color: ${f(r,12)}; ${eE} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${f(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${f(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${$S}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${L_}; ${nT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${B("status-error","red")}; color: ${uT}; background: ${f("var(--oc-sdk-tone)",7,s)}; border-color: ${f("var(--oc-sdk-tone)",12)}; ${eE} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${f("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${f("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${J}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${uT}; }
.oc-sdk-input { border-radius: ${aT}; background: var(--oc-sdk-field-bg); color: ${L_}; ${oT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${J}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${oT(f(c,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${oT(B("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${lT}; }

.oc-sdk-search-icon { color: ${J}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${sE}; color: ${J}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${c}; }

.oc-sdk-trigger { border-radius: ${aT}; background: var(--oc-sdk-raised-bg); color: ${L_}; ${nT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${J}; }
.oc-sdk-trigger-chevron { color: ${J}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${L_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${n_}; background-clip: padding-box; color: ${L_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${b}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${dT}; color: ${pT}; }
.oc-sdk-option-check { color: ${c}; }
.oc-sdk-option[data-destructive="true"] { color: ${uT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${f(B("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${J}; }
.oc-sdk-popup-empty { color: ${J}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${O_}; border-radius: 4px; color: ${c}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${f(c,60,O_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${O_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${tE} }
.oc-sdk-check-desc { color: ${J}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${f(c,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${J}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${c}; }
.oc-sdk-tab[aria-selected="true"] { color: ${pT}; background: ${dT}; border-color: ${O_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${L_}; background: var(--oc-sdk-raised-bg); ${nT} }
.oc-sdk-tab-count { color: ${J}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${f(c,6)}; color: ${J}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${f("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${b}; }
.oc-sdk-row[aria-selected="true"] { background: ${dT}; color: ${pT}; }
.oc-sdk-row-lead { font-family: ${lT}; color: ${J}; }
.oc-sdk-row-sub { color: ${J}; }
.oc-sdk-row-meta { color: ${J}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${J}; }

.oc-sdk-empty-body { color: ${J}; }

.oc-sdk-spinner { color: ${J}; }
.oc-sdk-spinner-ring { border-color: ${O_}; border-top-color: ${r}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${f("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${J}; }

.oc-sdk-separator { color: ${J}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${f(O_,40)}; }

.oc-sdk-progress-label { color: ${J}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${f(c,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${B("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${B("success-text","inherit")}; }

.oc-sdk-text a { color: ${vT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${f(O_,60)}; }
`,x=`
${CT}
${zS}
${TS}`;var ES=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var ET=[],US=()=>{let _=document.querySelector("#msg2");if(_&&ET.length>0)_.innerHTML=`<div class="err">${ET.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{ET.push("页面错误："+String(_.message??_)),US()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,A=S?.code;ET.push("未处理异常"+(A?` [${A}]`:"")+"："+String(S?.message??S)),US()});var jS=["toutiao"],tT=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],xS=180000,wS=12,SS=25,n=hT(),RS=document.querySelector("#app");if(!RS)throw Error("Missing #app");RS.innerHTML=`
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
</div>`;var a=(_)=>document.querySelector(`#${_}`),bS=a("cname"),_T=a("topics"),TT=a("catchips"),qS="v0.10.0-more";bS.textContent="阅读";document.querySelector("#build").textContent=qS;var Q_="",g=[],__=[],Y_=0,sT=!1,U_=0,R_=new Map,OS=!1,T_="",MS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},ST=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),_E=async(_)=>{try{return await n.storage.get(_)}catch{return}},TE=async(_,S)=>{try{await n.storage.set(_,S)}catch{}},eT=async(_,S,A)=>{let D=S;if(Q_&&_==="GET"&&D.startsWith("/"))D+=(D.includes("?")?"&":"?")+`proxy=${encodeURIComponent(Q_)}`;return n.serviceRequest({method:_,path:D,body:A})};var yS=(_)=>{if(TT.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=T_===""?"on":"",S.onclick=()=>{T_="",f_()},TT.appendChild(S);for(let A of _){let D=document.createElement("button"),I=g.filter((C)=>R_.get(e(C))===A).length;D.textContent=`${A} ${I}`,D.className=T_===A?"on":"",D.onclick=()=>{T_=T_===A?"":A,f_()},TT.appendChild(D)}},e=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,f_=()=>{let _=[...new Set(g.map((C)=>R_.get(e(C))).filter((C)=>!!C))],S=tT.filter((C)=>_.includes(C));yS(S);let A=Y_>0?(()=>{let C=new Date(Y_);return`${C.getHours()}:${String(C.getMinutes()).padStart(2,"0")}`})():"",D=__.length>0?` · ${__.join("、")}暂不可用`:"";a("tcount").textContent=g.length>0?`${g.length}${A?` · 更新 ${A}`:""}${D}`:D.replace(/^ · /,""),_T.innerHTML="";let I=T_?[T_]:S.length>0?S:[""];for(let C of I){if(!T_&&C){let P=document.createElement("div");P.className="cathead",P.textContent=C,_T.appendChild(P)}for(let P of g){if(C&&R_.get(e(P))!==C)continue;let G=document.createElement("div");G.className="nrow";let Z=P.excerpt?`<br><span class="xp">${ST(P.excerpt)}</span>`:"";G.innerHTML=`<span class="tt">${ST(P.title)}${Z}</span>`;let K=document.createElement("button");K.className="aibtn",K.title="AI 总结这篇",K.textContent="✦",K.onclick=()=>void mS(P,G,K),G.appendChild(K),_T.appendChild(G)}}},gS=async(_)=>{if(OS)return;let S=g.filter((A)=>!R_.has(e(A)));for(let A=0;A<S.length;A+=SS){if(_!==U_)return;let D=S.slice(A,A+SS),I=await Promise.all(D.map(async(P)=>{let G=await _E(e(P));return typeof G==="string"&&G?G:""})),C=D.filter((P,G)=>!I[G]);if(C.length>0)try{let P=C.map((K,H)=>`${H}. ${K.title}`).join(`
`).slice(0,3000),G=await n.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${tT.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:256}),Z=[];for(let K of G.text.split(`
`)){let H=/^\s*(\d+)\s*[:：]\s*(\S+)/.exec(K);if(!H)continue;let m=tT.includes(H[2])?H[2]:"其他";Z[Number(H[1])]=m}await Promise.all(C.map(async(K,H)=>{let m=Z[H]??"其他";R_.set(e(K),m),await TE(e(K),m)}))}catch(P){let G=P?.code;if(G==="NO_MODEL"||G==="MODEL_FAILED"){OS=!0,MS(ST(G==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）"));return}for(let Z of C)R_.set(e(Z),"其他")}else D.forEach((P,G)=>R_.set(e(P),I[G]));if(_!==U_)return;f_()}},AS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),mS=async(_,S,A)=>{let D=S.querySelector(".aisum");if(D){D.remove();return}let I=`moyu:csum:${_.community}:${_.id}`;A.disabled=!0;let C=A.textContent;A.textContent="…";try{let P=await _E(I),G=typeof P==="string"&&P?P:"";if(!G){let K=await eT("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),H=JSON.parse(K.body);if(!H.ok||!H.thread)throw Error(H.error??"正文失败");let m=H.thread,E_=[m.opening?AS(m.opening.html):"",...m.posts.map((p)=>AS(p.html))].filter(Boolean).join(`
`).slice(0,3500);if(!E_){if(!jS.includes(_.community))throw Error("这篇没有可总结的正文");let p="";try{let S_=await eT("GET",`/search?q=${encodeURIComponent(_.title)}`),v=JSON.parse(S_.body);if(v.ok&&v.results&&v.results.length>0){let K_=v.results.slice(0,5).map((o,I_)=>`${I_+1}. 「${o.title}」${o.snippet}${o.site?`（${o.site}）`:""}`).join(`
`).slice(0,2500);p=(await n.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${K_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(p)G=p+"（联网版）";else{if(G=(await n.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!G)throw Error("小模型没有返回总结");G+="（标题版）"}}else if(G=(await n.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${E_}`,maxOutputTokens:256})).text.trim().slice(0,500),!G)throw Error("小模型没有返回总结");await TE(I,G)}let Z=document.createElement("div");Z.className="aisum",Z.textContent=`✦ ${G}`,S.appendChild(Z)}catch(P){let G=P?.code,Z=G==="NO_MODEL"?"无可用小模型":G==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",K=document.createElement("div");K.className="aisum",K.textContent=`总结失败：${Z}`,S.appendChild(K)}finally{A.disabled=!1,A.textContent=C}},OT=async(_=!1)=>{if(sT||document.hidden)return;if(!_&&Date.now()-Y_<xS&&g.length>0)return;sT=!0;let S=++U_;try{let A=ES.flatMap((I)=>I.channels.map((C)=>({c:I,ch:C})));if(g=[],__=[],a("tcount").textContent=`加载中 0/${A.length}`,_T.innerHTML="",TT.innerHTML="",await Promise.all(A.map(async({c:I,ch:C})=>{try{let P=await eT("GET",`/list?community=${I.id}&channel=${encodeURIComponent(C.id)}`),G=JSON.parse(P.body);if(!G.ok)throw Error(G.error??"列表失败");if(S!==U_)return;let Z=(G.topics??[]).slice(0,wS);if(g.push(...Z),S!==U_)return;a("tcount").textContent=`加载中 ${g.length} · 已回 ${A.length-__.length}/${A.length}`,f_()}catch{if(S!==U_)return;if(!__.includes(I.name))__.push(I.name)}})),S!==U_)return;Y_=Date.now();let D=new Set;g=g.filter((I)=>{let C=I.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!C||D.has(C))return!1;return D.add(C),!0}),MS(__.length>0?ST(`${__.join("、")}暂不可用（多为对侧限流过一会儿点↻再试）`):""),f_(),gS(S)}finally{sT=!1}};a("b-refresh").onclick=()=>{Y_=0,OT(!0)};a("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){a("cfg-out").textContent="格式不对，要 http(s)://host:port";return}Q_=_,await TE("moyu:proxy",Q_),a("cfg-out").textContent="已保存，正在测试…",Y_=0,await OT(!0),a("cfg-out").textContent=g.length>0?`连通（${g.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")OT(!0);else if(_.key==="q")n.close()});var e_=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(e_++,e_>=2)e_=0,n.close();setTimeout(()=>e_=0,500)}});var hS=async()=>{Q_=await _E("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=Q_};n.onReady((_)=>{cT(_,document.documentElement)});hS().then(()=>void OT(!0));})();
