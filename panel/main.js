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
`;function KE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(R)=>{let U=R.target===_?S:R.target;if(!(U instanceof Element))return;if(!U.hasAttribute("data-oc-scrolling"))U.setAttribute("data-oc-scrolling","");let D=O.get(U);if(D!==void 0)clearTimeout(D);O.set(U,setTimeout(()=>{O.delete(U),U.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var QS=`(${KE.toString()})(document);`;var NT=128,PT=65536;var g_=128;var h_=65536;var LT=8000,WT=192000,QT=120000;var BE=(_)=>{let S=[],O=0,R=0;return{push:(U)=>{S.push(U),R+=U.length;while(R-O>_&&S.length>1){let D=S.shift();R-=D?.length??0,O=0}},pull:(U)=>{let D=0;while(D<U.length&&S.length>0){let P=S[0],C=Math.min(U.length-D,P.length-O);if(U.set(P.subarray(O,O+C),D),D+=C,O+=C,O>=P.length)S.shift(),R-=P.length,O=0}U.fill(0,D)},clear:()=>{S.length=0,O=0,R=0},get size(){return R-O}}};var zE=/^[a-z][a-z0-9-]{0,39}$/;var ZE=(_)=>Object(_)===_&&!Array.isArray(_),YT=(_,S)=>Object.keys(_).every((O)=>S.includes(O)),$E=(_)=>String(_)===_&&_.length>=1&&_.length<=60,FE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,JE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let O of _){if(!ZE(O)||!zE.test(O.id)||!$E(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(S.has(O.id))return!1;if(S.add(O.id),O.kind==="button"){if(!YT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!YT(O,["kind","id","label","value","options","disabled"]))return!1;if(!FE(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let R=new Set;for(let U of O.options){if(!ZE(U)||!YT(U,["value","label"])||!FE(U.value)||!$E(U.label)||R.has(U.value))return!1;R.add(U.value)}if(!R.has(O.value))return!1}return!0};var kE=["{id}","{segment}","{segments+}"];var AO=new Set(kE);var HE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var MO=new Set(HE);var m_=20000000,c_=256;var KT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,fE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==S.bytes[O])return!1;return!0};var jE=/^[A-Za-z0-9_-]{1,80}$/;var xE=["left","right","top","bottom"];var wE=(_,S=0,O={remaining:16000})=>{if(--O.remaining<0||S>=32)return!1;if(_===null)return!0;let R=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let U of R)if(!wE(U,S+1,O))return!1;return!0},BT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(BT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(BT)}return String(_)===_||Number.isFinite(_)},ZT=(_)=>{try{if(String(_.id)!==_.id||!jE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!xE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!wE(_.data)||!BT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var FT=2000;var qE=["file","directory","other","missing"],zT=(_)=>Boolean(_&&"sessionId"in _),JT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var yE=/^[0-9a-f]{7,64}$/i,kT=(_)=>yE.test(_),v_=500,d_=32000,gE=16000,hE=128,mE=200,cE=2000,vE=16000,dE=80,pE=200,uE=16000;var lE=2000;var HT=20000,p_=1024,u_=2000000;var l_=64000,a_=8000,fT=4000;var jT=960000;var aE=999,oE=1e4,J_=500,nE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],iE=["stopped","starting","ready","failed"],KS=new Set(nE),rE=(_)=>KS.has(_),sE=(_)=>_&&rE(_)?_:"HOST_REJECTED",N_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(N_);if(Object(_)===_)return Object.values(_).every(N_);return!1},tE=(_)=>N_(_)&&JSON.stringify(_).length<=uE,bE=(_)=>_?.trim().slice(0,pE)??"",P_=(_)=>{let S=_.id.trim().slice(0,hE),O=_.title.trim().slice(0,mE),R=_.url.trim().slice(0,cE),U=_.text?.trim().slice(0,vE),D=_.author?.trim().slice(0,dE),P=_.kind==="pull"?"pull":"issue",C={providerId:_.providerId.trim(),id:S,title:O||S,url:R,kind:P};if(U)C.text=U;if(D)C.author=D;if(P==="pull"){let K=bE(_.branches?.head),z=bE(_.branches?.base);if(K&&z)C.branches={head:K,base:z}}if(tE(_.data))C.data=_.data;return C},xT=(_)=>{let S=P_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},wT=(_)=>{let S={text:_.text.trim().slice(0,gE)};if(_.send)S.send=!0;return S},bT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(aE,Math.max(0,Math.round(_)))},qT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(oE,Math.max(0,Math.ceil(_)))};var L_=(_)=>_.length>0&&_.length<=p_&&!_.includes("\x00")&&!_.includes("\\");var o_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>lE)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},BS=new Set(iE),yT=(_)=>Boolean(_&&"status"in _&&BS.has(String(_.status))&&!("body"in _)),n_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),gT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),hT=(_)=>Boolean(_&&"written"in _&&_.written===!0),mT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),ZS=new Set(qE),cT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&ZS.has(String(_.kind))&&Number.isFinite(_.size)),vT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),$S=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),FS=(_)=>Object(_)===_?_:null,$T=(_)=>String(_)===_&&_.length>0,zS=(_)=>{if(!$T(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&$T(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:sE($T(_.code)?_.code:void 0)};return null},dT=(_)=>{let S=FS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return zS(S);if(!$S.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var eE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),JS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class G extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var _S=()=>Promise.reject(new G("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),i_=()=>Promise.reject(new G("BAD_PATH",`File path must be 1 to ${p_} characters without NUL or backslash.`)),r_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new G("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},pT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new G("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===S.parent),R=_.requestTimeoutMs??HT,U=new Set,D=new Set,P=new Set,C=new Set,K=new Set,z=new Set,B=new Set,S_=new Set,U_=new Set,p=new Set,A_=new Set,u=new Set,B_=[],I_=null,n=null,G_=new Set,w_=new Set,Z_=null,$_=null,IT=!1,X_=new Map,C_=new Map,D_=new Map,l=!1,V={value:0},X=null,i=null,F_=!1,z_=!1,IE=null,m=null,GE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},q=(T)=>{S.parent.postMessage(T,"*")},XE=()=>{if(l||S.parent===S||u.size===0||X?.features?.lateGenerateResults!==!0)return;q({channel:L,v:W,type:"generate-late-listen"})},Z=(T,E)=>{for(let I of T)try{I(E)}catch(M){console.error(M)}},CE=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let E=dT(T.data);if(!E)return;if(E.type==="workspace"){let M=C_.get(E.payload.subscriptionId);if(M)Z([M],E.payload.snapshot);return}if(E.type==="shells"){let M=D_.get(E.payload.subscriptionId);if(M)Z([M],E.payload.snapshot);return}if(E.type==="microphone-audio"){m?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let M=m;if(!M)return;m=null,M.release(),Z(M.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(X=E.payload,i=GE(E.payload.session),Z(U,E.payload),Z(D,E.payload.directory),Z(P,E.payload.session),i)Z(C,i);if(Z(K,E.payload.connection),Z(z,E.payload.settings),Z(B,E.payload.item),E.payload.block)Z(S_,E.payload.block);XE();return}if(E.type==="service-event"){Z(U_,E.payload);return}if(E.type==="generate-late"){if(u.size===0)B_.push(E.payload);else Z(u,E.payload);return}if(E.type==="directory"){if(X)X={...X,directory:E.payload.directory};Z(D,E.payload.directory);return}if(E.type==="session"){if(X)X={...X,session:E.payload.session};if(!E.payload.session)i=null;else if(i?.sessionId!==E.payload.session.id)i=GE(E.payload.session);Z(P,E.payload.session);return}if(E.type==="session-lifecycle"){i=E.payload,Z(C,E.payload);return}if(E.type==="connection"){if(X)X={...X,connection:E.payload.connection};Z(K,E.payload.connection);return}if(E.type==="settings"){if(X)X={...X,settings:E.payload.settings};Z(z,E.payload.settings);return}if(E.type==="item"){if(X)X={...X,item:E.payload.item};Z(B,E.payload.item);return}if(E.type==="status-control-event"){Z(p,E.payload);return}if(E.type==="popover-closed"){Z(A_,E.payload);return}if(E.type==="action"){let M=(Y)=>{if(!l)q({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=n;if(!Q){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>M({ok:!0}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();M({ok:!1,error:($||"Action failed.").slice(0,J_)})});return}if(E.type==="file-open"){let M=E.payload;if($_&&fE($_,M))return;$_=M,Z(G_,E.payload);return}if(E.type==="file-saved"){Z(w_,E.payload.version);return}if(E.type==="file-snapshot"){let M=($)=>{if(!l)q({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:$})},Q=($)=>M({error:($.trim()||"Could not read the edited file.").slice(0,J_)}),Y=Z_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then(($)=>{if(KT($)>m_){Q(`The file is over ${m_} ${"bytes"in $?"bytes":"characters"}.`);return}if($.version.length>c_){Q(`The snapshot version is over ${c_} characters.`);return}M({snapshot:"bytes"in $?{bytes:$.bytes,version:$.version}:{content:$.content,version:$.version}})},($)=>Q($ instanceof Error?$.message:String($)));return}if(E.type==="resolve"){let M=(Y)=>{q({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=I_;if(!Q){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>M({item:Y?P_(Y):null}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();M({error:($||"Command failed.").slice(0,J_)})});return}let I=X_.get(E.id);if(!I)return;if(clearTimeout(I.timer),X_.delete(E.id),E.ok){I.resolve(E.payload);return}I.reject(new G(E.code,E.error))};S.addEventListener("message",CE),q({channel:L,v:W,type:"hello"});let x=(T,E=R)=>{if(l||S.parent===S)return Promise.reject(new G("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((I,M)=>{let Q=setTimeout(()=>{X_.delete(T.id),M(new G("HOST_TIMEOUT","Host did not answer in time."))},E);X_.set(T.id,{resolve:I,reject:M,timer:Q}),q(T)})},f=(T)=>x(T).then(()=>{return}),J={channel:L,v:W},GT=(T)=>{if(!l&&S.parent!==S)q(T)},DE=()=>GT({...J,type:"file-save"}),XT=()=>{if(!l&&S.parent!==S)q({...J,type:"microphone-close",id:N(V)})},LS=async()=>{if(m)throw new G("HOST_REJECTED","The microphone is already open in this frame.");if(X?.features?.microphone!==!0)throw new G("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new G("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<LT||E.sampleRate>WT)throw E.close().catch(()=>{return}),new G("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let I=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,M=BE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(d)=>M.pull(d.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let $=new Set,V_={queue:M,endedListeners:$,release:()=>{Q.onaudioprocess=null,Q.disconnect(),M.clear();for(let d of Y.stream.getTracks())d.stop();E.close().catch(()=>{return})}};m=V_;try{let d=await x({...J,type:"microphone-open",id:N(V),payload:{sampleRate:E.sampleRate}},QT);if(!d||!("opened"in d)||d.opened!==!0)throw new G("HOST_REJECTED","Host did not open the microphone.");if(await I,m!==V_)throw new G("DISCONNECTED","The microphone closed while it was opening.")}catch(d){if(m===V_)m=null;throw V_.release(),XT(),d}return{stream:Y.stream,close:()=>{if(m!==V_)return;m=null,V_.release(),XT()},onEnded:(d)=>{return $.add(d),()=>{$.delete(d)}}}},VE=(T)=>{if(!eE(T)||!JS(T))return;T.preventDefault(),DE()},NE=(T)=>{if(!eE(T)||T.key!=="Escape"||X?.surface!=="popover"||!X.popover)return;T.preventDefault(),QE(X.popover.id,"escape").catch(()=>{return})},b_=()=>{let T=X?.surface==="popover"?X.popover:void 0;if(!T)return;let E=F_||z_;if(IE===E)return;IE=E,YE(T.id,E).catch(()=>{return})},q_=()=>{if(X?.surface!=="popover"||F_)return;F_=!0,b_()},PE=(T)=>{if(X?.surface!=="popover"||T.relatedTarget!==null||!F_)return;F_=!1,b_()},LE=()=>{if(X?.surface!=="popover"||z_)return;z_=!0,b_()},WE=()=>{if(X?.surface!=="popover"||!z_)return;z_=!1,b_()},a=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new G("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},CT=async(T)=>{if(T.kind!=="projects")a(T.projectId);let E=await x({...J,type:"workspace-read",id:N(V),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new G("HOST_REJECTED","Host did not return workspace data.");return E},DT=async(T,E)=>{if(T.kind!=="projects")a(T.projectId);let I=N(V);C_.set(I,E);try{await f({...J,type:"workspace-subscribe",id:N(V),payload:{subscriptionId:I,query:T}})}catch(M){if(C_.delete(I),!l)q({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:I}});throw M}return()=>{if(!C_.delete(I)||l)return;q({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:I}})}},WS=async(T,E)=>{if(T.kind==="session")a(T.sessionId);if(T.kind==="project")a(T.projectId);let I=N(V);D_.set(I,E);try{await f({...J,type:"shells-subscribe",id:N(V),payload:{subscriptionId:I,scope:T}})}catch(M){if(D_.delete(I),!l)q({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:I}});throw M}return()=>{if(!D_.delete(I)||l)return;q({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:I}})}},y_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>NT))throw new G("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!N_(T.value))throw new G("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>PT)throw new G("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&X?.features?.deviceStorage!==!0)throw new G("UNSUPPORTED","This host does not support device storage.");let E=await x({...J,type:"storage",id:N(V),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new G("HOST_REJECTED","Host did not return storage data.");return E},QE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new G("UNSUPPORTED","This host does not support popovers.")):f({...J,type:"popover-close",id:N(V),payload:E?{id:T,reason:E}:{id:T}}),YE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new G("UNSUPPORTED","This host does not support popovers.")):f({...J,type:"popover-anchor",id:N(V),payload:{id:T,active:E}});return S.addEventListener("keydown",NE,!0),S.addEventListener("pointerover",q_),S.addEventListener("pointermove",q_),S.addEventListener("pointerout",PE),S.addEventListener("focus",LE),S.addEventListener("blur",WE),{onAction:(T)=>{return n=T,()=>{if(n===T)n=null}},listProjects:async()=>{let T=await CT({kind:"projects"});if(T.kind!=="projects")throw new G("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await CT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new G("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await CT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new G("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>DT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>DT({kind:"worktrees",projectId:T},(I)=>{if(I.kind==="worktrees")E(I)}),onSessions:(T,E)=>DT({kind:"sessions",projectId:T},(I)=>{if(I.kind==="sessions")E(I)}),onRunningShells:(T,E)=>WS(T,E),readShellOutput:async(T,E)=>{a(T,g_);let I=E?.cursor;if(I!==void 0&&(!Number.isInteger(I)||I<0))throw new G("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=E?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>h_))throw new G("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${h_}.`);let Y=await x({...J,type:"shell-output",id:N(V),payload:{shellId:T,cursor:I,tailBytes:M}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new G("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(a(T,g_),(await x({...J,type:"shell-stop",id:N(V),payload:{shellId:T}}))?.stopped!==!0)throw new G("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{a(T),await f({...J,type:"open-session",id:N(V),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let I=r_(E),M={op:"get",key:T};if(I)M.scope=I;let Q=await y_(M);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,I)=>{let M=r_(I),Q={op:"set",key:T,value:E};if(M)Q.scope=M;await y_(Q)},delete:async(T,E)=>{let I=r_(E),M={op:"delete",key:T};if(I)M.scope=I;await y_(M)},keys:async(T)=>{let E=r_(T),I={op:"keys"};if(E)I.scope=E;let M=await y_(I);if(M.op!=="keys")throw new G("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(U.add(T),X)T(X);return()=>{U.delete(T)}},onDirectory:(T)=>{if(D.add(T),X)T(X.directory);return()=>{D.delete(T)}},onSession:(T)=>{if(P.add(T),X)T(X.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(C.add(T),i)T(i);return()=>{C.delete(T)}},onConnection:(T)=>{if(K.add(T),X)T(X.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(z.add(T),X)T(X.settings);return()=>{z.delete(T)}},onItem:(T)=>{if(B.add(T),X)T(X.item);return()=>{B.delete(T)}},onBlock:(T)=>{if(S_.add(T),X?.block)T(X.block);return()=>{S_.delete(T)}},onServiceEvent:(T)=>{return U_.add(T),()=>{U_.delete(T)}},onStatusControl:(T)=>{return p.add(T),()=>{p.delete(T)}},onPopoverClosed:(T)=>{return A_.add(T),()=>{A_.delete(T)}},setStatusControls:(T)=>{if(X?.features?.statusControls!==!0)return Promise.reject(new G("UNSUPPORTED","This host does not support status controls."));if(!JE(T))return Promise.reject(new G("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return f({...J,type:"status-controls",id:N(V),payload:{controls:T}})},openPopover:(T)=>{if(X?.features?.popovers!==!0)return Promise.reject(new G("UNSUPPORTED","This host does not support popovers."));if(!ZT(T))return Promise.reject(new G("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return f({...J,type:"popover-open",id:N(V),payload:T})},closePopover:QE,setPopoverAnchorActive:YE,onResolve:(T)=>{return I_=T,()=>{if(I_===T)I_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>v_)return Promise.reject(new G("HOST_REJECTED",`Toast message must contain 1 to ${v_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>d_))return Promise.reject(new G("HOST_REJECTED",`Toast copy text must contain 1 to ${d_} characters.`));return f({channel:L,v:W,type:"toast",id:N(V),payload:{...T,message:E}})},openUrl:(T)=>f({channel:L,v:W,type:"open-url",id:N(V),payload:{url:T}}),openCommit:(T)=>kT(T)?f({channel:L,v:W,type:"open-commit",id:N(V),payload:{sha:T}}):Promise.reject(new G("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>f({channel:L,v:W,type:"block-answer",id:N(V),payload:{text:T.trim().slice(0,FT)}}),openSurface:(T)=>f({channel:L,v:W,type:"open-surface",id:N(V),payload:{surfaceId:T}}),writeClipboard:(T)=>f({channel:L,v:W,type:"clipboard-write",id:N(V),payload:{text:T}}),compose:(T)=>f({channel:L,v:W,type:"compose",id:N(V),payload:T}),attach:(T)=>f({channel:L,v:W,type:"attach",id:N(V),payload:P_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)a(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")a(E.directory);else{if(E.name!==void 0)a(E.name,200);if(E.baseBranch!==void 0)a(E.baseBranch,200)}let I=await x({channel:L,v:W,type:"start-session",id:N(V),payload:xT(T)},_.requestTimeoutMs??180000);if(!zT(I))throw new G("HOST_REJECTED","Host did not return a session.");return I},prompt:(T)=>x({channel:L,v:W,type:"prompt",id:N(V),payload:wT(T)}).then((E)=>{if(!JT(E))throw new G("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>f({channel:L,v:W,type:"session-link",id:N(V),payload:P_(T)}),close:()=>f({channel:L,v:W,type:"close",id:N(V)}),oauthStart:()=>f({channel:L,v:W,type:"oauth-start",id:N(V)}),oauthDisconnect:()=>f({channel:L,v:W,type:"oauth-disconnect",id:N(V)}),request:(T)=>(o_(T.path)?x({channel:L,v:W,type:"request",id:N(V),payload:T}):_S()).then((E)=>{if(!n_(E))throw new G("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(o_(T.path)?x({channel:L,v:W,type:"service-request",id:N(V),payload:T}):_S()).then((E)=>{if(!n_(E))throw new G("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>x({channel:L,v:W,type:"service-status",id:N(V)}).then((T)=>{if(!yT(T))throw new G("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(L_(T)?x({channel:L,v:W,type:"file-read",id:N(V),payload:{path:T}}):i_()).then((E)=>{if(!gT(E))throw new G("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!L_(T))return i_();if(E.length>u_)return Promise.reject(new G("FILE_TOO_LARGE",`Content is over ${u_} characters.`));return x({channel:L,v:W,type:"file-write",id:N(V),payload:{path:T,content:E}}).then((I)=>{if(!hT(I))throw new G("HOST_REJECTED","Host did not confirm the write.");return I})},listDir:(T)=>(L_(T)?x({channel:L,v:W,type:"file-list",id:N(V),payload:{path:T}}):i_()).then((E)=>{if(!mT(E))throw new G("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(L_(T)?x({channel:L,v:W,type:"file-stat",id:N(V),payload:{path:T}}):i_()).then((E)=>{if(!cT(E))throw new G("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),I=T.system?.trim();if(E.length===0||E.length>l_)return Promise.reject(new G("HOST_REJECTED",`Prompt must be 1 to ${l_} characters.`));if(I!==void 0&&(I.length===0||I.length>a_))return Promise.reject(new G("HOST_REJECTED",`System prompt must be 1 to ${a_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(fT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new G("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(I!==void 0)Q.system=I;if(M!==void 0)Q.maxOutputTokens=M;return x({channel:L,v:W,type:"generate",id:N(V),payload:Q},_.requestTimeoutMs??jT).then((Y)=>{if(!vT(Y))throw new G("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{u.add(T);for(let E of B_.splice(0))Z([T],E);return XE(),()=>{u.delete(T)}},openMicrophone:LS,setBadge:(T)=>f({channel:L,v:W,type:"badge",id:N(V),payload:{count:bT(T)}}),setHeight:(T)=>f({channel:L,v:W,type:"resize",id:N(V),payload:{height:qT(T)}}),onFileOpen:(T)=>{if(G_.add(T),!IT)IT=!0,S.addEventListener("keydown",VE,!0);if($_)T($_);return()=>{G_.delete(T)}},onFileSnapshot:(T)=>{return Z_=T,()=>{if(Z_===T)Z_=null}},onFileSaved:(T)=>{return w_.add(T),()=>{w_.delete(T)}},reportFileChange:(T)=>GT({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:DE,reportFileUnsupported:()=>GT({...J,type:"file-unsupported"}),dispose:()=>{for(let T of C_.keys())q({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:T}});C_.clear();for(let T of D_.keys())q({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:T}});if(D_.clear(),m)XT(),m.release(),m=null;if(l=!0,I_=null,n=null,Z_=null,G_.clear(),w_.clear(),IT)S.removeEventListener("keydown",VE,!0);S.removeEventListener("message",CE),S.removeEventListener("keydown",NE,!0),S.removeEventListener("pointerover",q_),S.removeEventListener("pointermove",q_),S.removeEventListener("pointerout",PE),S.removeEventListener("focus",LE),S.removeEventListener("blur",WE);for(let T of X_.values())clearTimeout(T.timer),T.reject(new G("HOST_UNAVAILABLE","Host client was disposed."));X_.clear(),U.clear(),D.clear(),P.clear(),C.clear(),K.clear(),z.clear(),B.clear(),S_.clear(),U_.clear(),p.clear(),A_.clear(),u.clear(),B_.length=0}}};var TS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var FO=new Set(TS);var ES=["none","agent","user"];var JO=new Set(ES);var kS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],HS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],SS=(_,S)=>{S.style.colorScheme=_.mode;for(let[O,R]of kS)S.style.setProperty(O,_.tokens[R]);for(let[O,R,U]of HS){let D=_.tokens[U]??"";S.style.setProperty(O,D),S.style.setProperty(R,D)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},uT=(_,S)=>{if(SS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var fS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${fS[_]}, ${S}))`,s=F("surface-background","transparent"),t_=F("surface-elevated","transparent"),W_=F("surface-elevated-foreground","inherit"),c=F("surface-foreground","inherit"),k=F("surface-muted-foreground","gray"),jS=F("surface-muted","transparent"),R_=F("interactive-border","currentColor"),y=F("interactive-hover","transparent"),M_=F("interactive-active","transparent"),lT=F("interactive-selection","transparent"),aT=F("interactive-selection-foreground","inherit"),r=F("primary","currentColor"),oT=F("primary-text","inherit"),nT=F("error-text","inherit"),xS=F("font-sans","inherit"),iT=F("font-mono","monospace"),RS=F("radius","9px"),rT=`calc(${RS} - 2px)`,OS=`calc(${RS} - 4px)`,H=(_,S,O="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${O})`,US=`background-image: linear-gradient(${y}, ${y});`,sT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,tT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",AS="box-shadow: var(--oc-sdk-lit);",eT=`inset 0 0.5px 0 0 ${H(c,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,wS=`
:root {
  --oc-sdk-edge: ${H(c,16)};
  --oc-sdk-field-bg: ${t_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${H(c,14)};
  --oc-sdk-field-bg: ${H(s,50,t_)};
  --oc-sdk-raised-bg: ${t_};
  --oc-sdk-field-lift: ${eT};
  --oc-sdk-raised-lift: ${eT};
  --oc-sdk-lit: ${eT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,s_=(_)=>{let S=F(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${F(`${_}-text`,"inherit")}; }`},A=(_)=>`calc(${_}rem / 14)`,bS=`
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
`,MS=`${wS}
.oc-sdk { color: ${c}; font-family: ${xS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${US} }
.oc-sdk-mono { font-family: ${iT}; }
.oc-sdk-muted { color: ${k}; }
${s_("success")}${s_("warning")}${s_("error")}${s_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${oT}; }

.oc-sdk-btn { border-radius: ${rT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${OS}; }
.oc-sdk-btn[data-variant="default"] { color: ${oT}; background: ${H(r,10,s)}; border-color: ${H(r,12)}; ${AS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${H(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${H(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${jS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${W_}; ${tT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${M_}, ${M_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${y}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${M_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${nT}; background: ${H("var(--oc-sdk-tone)",7,s)}; border-color: ${H("var(--oc-sdk-tone)",12)}; ${AS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${H("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${H("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${nT}; }
.oc-sdk-input { border-radius: ${rT}; background: var(--oc-sdk-field-bg); color: ${W_}; ${sT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${sT(H(c,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${sT(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${iT}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${OS}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${y}; color: ${c}; }

.oc-sdk-trigger { border-radius: ${rT}; background: var(--oc-sdk-raised-bg); color: ${W_}; ${tT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${W_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${t_}; background-clip: padding-box; color: ${W_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${y}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${lT}; color: ${aT}; }
.oc-sdk-option-check { color: ${c}; }
.oc-sdk-option[data-destructive="true"] { color: ${nT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${H(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${R_}; border-radius: 4px; color: ${c}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${H(c,60,R_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${R_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${US} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${H(c,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${c}; }
.oc-sdk-tab[aria-selected="true"] { color: ${aT}; background: ${lT}; border-color: ${R_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${W_}; background: var(--oc-sdk-raised-bg); ${tT} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${H(c,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${H("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${y}; }
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
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${H("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${H(R_,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${H(c,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${oT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${H(R_,60)}; }
`,b=`
${VT}
${bS}
${MS}`;var IS=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"qna",name:"问与答"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var AT=[],DS=()=>{let _=document.querySelector("#msg2");if(_&&AT.length>0)_.innerHTML=`<div class="err">${AT.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{AT.push("页面错误："+String(_.message??_)),DS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,O=S?.code;AT.push("未处理异常"+(O?` [${O}]`:"")+"："+String(S?.message??S)),DS()});var mS=["toutiao"],SE=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],cS=180000,vS=12,GS=30,dS=3,w=pT(),VS=document.querySelector("#app");if(!VS)throw Error("Missing #app");VS.innerHTML=`
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
    <button class="btn" id="b-clearcache" title="删掉分类与总结缓存，用当前模型重算">清空 AI 缓存</button>
    <div class="mut" id="cfg-out"></div>
  </div>
  <div class="mut" id="cfgver"><span id="cname"></span> · <span id="build"></span></div>
</aside>
</div>`;var v=(_)=>document.querySelector(`#${_}`),pS=v("cname"),OT=v("topics"),UT=v("catchips"),uS="v0.11.3-pace";pS.textContent="阅读";document.querySelector("#build").textContent=uS;var K_="",j=[],e=[],E_=0,TE=!1,o=0,T_=new Map,H_=!1,O_="",f_=0,AE=0,j_=!1,NS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},OE=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x_=async(_)=>{try{return await w.storage.get(_)}catch{return}},RE=async(_,S)=>{try{await w.storage.set(_,S)}catch{}},PS="moyu:feed",EE=48000,lS=async()=>{try{let _=j.map((U)=>[U.community,U.id,U.title,U.author,U.channel,U.replies,U.time,U.url,U.excerpt??""]),S=JSON.stringify({at:E_,failed:e,rows:_}),O=Math.max(1,Math.ceil(S.length/EE));await w.storage.set(PS,{at:E_,failed:e,parts:O});let R=[];for(let U=0;U<O;U++)R.push(S.slice(U*EE,(U+1)*EE));await Promise.all(R.map((U,D)=>w.storage.set(`moyu:feed:p${D}`,U)));for(let U=O;U<O+4;U++)try{await w.storage.delete(`moyu:feed:p${U}`)}catch{}}catch{}},aS=async()=>{try{let _=await x_(PS);if(!_||typeof _.at!=="number"||typeof _.parts!=="number")return!1;let S=_.parts;if(S<1||S>40)return!1;let O=[];for(let U=0;U<S;U++){let D=await x_(`moyu:feed:p${U}`);if(typeof D!=="string")return!1;O.push(D)}let R=JSON.parse(O.join(""));if(typeof R.at!=="number"||!Array.isArray(R.rows)||R.rows.length===0)return!1;return E_=R.at,e=Array.isArray(R.failed)?R.failed:[],j=R.rows.map((U)=>({community:U[0],id:String(U[1]??""),title:String(U[2]??""),author:String(U[3]??""),avatar:null,channel:typeof U[4]==="string"?U[4]:null,replies:typeof U[5]==="number"?U[5]:null,time:typeof U[6]==="number"?U[6]:null,url:String(U[7]??""),excerpt:typeof U[8]==="string"&&U[8]?U[8]:null})).filter((U)=>U.title&&U.id),j.length>0}catch{return!1}},UE=async(_,S,O)=>{let R=S;if(K_&&_==="GET"&&R.startsWith("/"))R+=(R.includes("?")?"&":"?")+`proxy=${encodeURIComponent(K_)}`;return w.serviceRequest({method:_,path:R,body:O})};var oS=(_)=>{if(UT.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=O_===""?"on":"",S.onclick=()=>{O_="",__()},UT.appendChild(S);for(let O of _){let R=document.createElement("button"),U=j.filter((D)=>T_.get(Y_(D))===O).length;R.textContent=`${O} ${U}`,R.className=O_===O?"on":"",R.onclick=()=>{O_=O_===O?"":O,__()},UT.appendChild(R)}},RT="m2",Y_=(_)=>`moyu:cat:${RT}:${_.community}:${_.id}:${_.title.slice(0,30)}`,__=()=>{let _=[...new Set(j.map((P)=>T_.get(Y_(P))).filter((P)=>!!P))],S=SE.filter((P)=>_.includes(P));oS(S);let O=E_>0?(()=>{let P=new Date(E_);return`${P.getHours()}:${String(P.getMinutes()).padStart(2,"0")}`})():"",R=j_?` · 分类 ${f_}/${AE}`:"";v("tcount").textContent=j.length>0?`${j.length}${O?` · 更新 ${O}`:""}${R}`:O?`更新 ${O}`:"";let U=document.querySelector("#srcerr");if(U)U.textContent=e.length>0?`暂不可用：${e.join("、")}（多为对侧限流，过一会儿点↻再试）`:"";OT.innerHTML="";let D=O_?[O_]:S.length>0?S:[""];for(let P of D){if(!O_&&P){let C=document.createElement("div");C.className="cathead",C.textContent=P,OT.appendChild(C)}for(let C of j){if(P&&T_.get(Y_(C))!==P)continue;let K=document.createElement("div");K.className="nrow";let z=C.excerpt?`<br><span class="xp">${OE(C.excerpt)}</span>`:"";K.innerHTML=`<span class="tt">${OE(C.title)}${z}</span>`;let B=document.createElement("button");B.className="aibtn",B.title="AI 总结这篇",B.textContent="✦",B.onclick=()=>void nS(C,K,B),K.appendChild(B),OT.appendChild(K)}}},XS=()=>{let _=Object.fromEntries(T_),S=Object.keys(_);if(S.length>1000)_=Object.fromEntries(S.slice(-1000).map((O)=>[O,_[O]]));RE(`moyu:cats:${RT}`,_)},ME=async(_)=>{if(H_)return;let S=j.filter((U)=>!T_.has(Y_(U)));if(AE=S.length,f_=0,j_=S.length>0,__(),S.length===0)return;let O=0,R=async()=>{while(!0){if(_!==o||H_)return;let U=O;if(O+=GS,U>=S.length)return;let D=S.slice(U,U+GS);try{let P=D.map((z,B)=>`${B}. ${z.title}`).join(`
`).slice(0,3500),C=await w.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${SE.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:320});if(_!==o||H_)return;let K=[];for(let z of C.text.split(`
`)){let B=/^\s*(\d+)\s*[:：]\s*(\S+)/.exec(z);if(!B)continue;K[Number(B[1])]=SE.includes(B[2])?B[2]:"其他"}D.forEach((z,B)=>T_.set(Y_(z),K[B]??"其他")),XS()}catch(P){let C=P?.code;if(C==="NO_MODEL"||C==="MODEL_FAILED"){H_=!0,j_=!1,NS(OE(C==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),__();return}for(let K of D)T_.set(Y_(K),"其他")}if(f_=Math.min(S.length,f_+D.length),_!==o)return;__()}};if(await Promise.all(Array.from({length:Math.min(dS,S.length)},()=>R())),_===o)j_=!1,XS(),__()},CS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),nS=async(_,S,O)=>{let R=S.querySelector(".aisum");if(R){R.remove();return}let U=`moyu:csum:${RT}:${_.community}:${_.id}`;O.disabled=!0;let D=O.textContent;O.textContent="…";try{let P=await x_(U),C=typeof P==="string"&&P?P:"";if(!C){let z=await UE("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),B=JSON.parse(z.body);if(!B.ok||!B.thread)throw Error(B.error??"正文失败");let S_=B.thread,U_=[S_.opening?CS(S_.opening.html):"",...S_.posts.map((p)=>CS(p.html))].filter(Boolean).join(`
`).slice(0,3500);if(!U_){if(!mS.includes(_.community))throw Error("这篇没有可总结的正文");let p="";try{let A_=await UE("GET",`/search?q=${encodeURIComponent(_.title)}`),u=JSON.parse(A_.body);if(u.ok&&u.results&&u.results.length>0){let B_=u.results.slice(0,5).map((n,G_)=>`${G_+1}. 「${n.title}」${n.snippet}${n.site?`（${n.site}）`:""}`).join(`
`).slice(0,2500);p=(await w.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${B_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(p)C=p+"（联网版）";else{if(C=(await w.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!C)throw Error("小模型没有返回总结");C+="（标题版）"}}else if(C=(await w.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${U_}`,maxOutputTokens:256})).text.trim().slice(0,500),!C)throw Error("小模型没有返回总结");await RE(U,C)}let K=document.createElement("div");K.className="aisum",K.textContent=`✦ ${C}`,S.appendChild(K)}catch(P){let C=P?.code,K=C==="NO_MODEL"?"无可用小模型":C==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",z=document.createElement("div");z.className="aisum",z.textContent=`总结失败：${K}`,S.appendChild(z)}finally{O.disabled=!1,O.textContent=D}},MT=async(_=!1)=>{if(TE||document.hidden)return;if(!_&&Date.now()-E_<cS&&j.length>0)return;TE=!0;let S=++o;try{let O=IS.flatMap((U)=>U.channels.map((D)=>({c:U,ch:D})));if(j=[],e=[],v("tcount").textContent=`加载中 0/${O.length}`,OT.innerHTML="",UT.innerHTML="",await Promise.all(O.map(async({c:U,ch:D})=>{try{let P=await UE("GET",`/list?community=${U.id}&channel=${encodeURIComponent(D.id)}`),C=JSON.parse(P.body);if(!C.ok)throw Error(C.error??"列表失败");if(S!==o)return;let K=(C.topics??[]).slice(0,vS);if(j.push(...K),S!==o)return;v("tcount").textContent=`加载中 ${j.length} · 已回 ${O.length-e.length}/${O.length}`,__()}catch{if(S!==o)return;if(!e.includes(U.name))e.push(U.name)}})),S!==o)return;E_=Date.now();let R=new Set;j=j.filter((U)=>{let D=U.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!D||R.has(D))return!1;return R.add(D),!0}),lS(),NS(""),__(),ME(S)}finally{TE=!1}};v("b-refresh").onclick=()=>{E_=0,MT(!0)};v("b-clearcache").onclick=async()=>{let _=v("cfg-out");_.textContent="正在清空 AI 缓存…";try{let O=(await w.storage.keys()).filter((R)=>/^moyu:(cat|csum|cats)(:|$)/.test(R));await Promise.all(O.map((R)=>w.storage.delete(R).catch(()=>{return}))),T_.clear(),H_=!1,f_=0,AE=0,j_=!1,_.textContent=`已清 ${O.length} 条，正在用当前模型重算分类…`,ME(++o),await w.toast({kind:"success",message:`已清空 AI 缓存（${O.length} 条）`})}catch(S){_.textContent=`清空失败：${S instanceof Error?S.message:"未知错误"}`}};v("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){v("cfg-out").textContent="格式不对，要 http(s)://host:port";return}K_=_,await RE("moyu:proxy",K_),v("cfg-out").textContent="已保存，正在测试…",E_=0,await MT(!0),v("cfg-out").textContent=j.length>0?`连通（${j.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")MT(!0);else if(_.key==="q")w.close()});var ST=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(ST++,ST>=2)ST=0,w.close();setTimeout(()=>ST=0,500)}});var iS=async()=>{K_=await x_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=K_};w.onReady((_)=>{uT(_,document.documentElement)});(async()=>{await iS();try{let _=await x_(`moyu:cats:${RT}`);if(_&&typeof _==="object"){for(let[O,R]of Object.entries(_))if(typeof R==="string")T_.set(O,R)}if(await aS()){__(),ME(++o);return}}catch{}MT(!0)})();})();
