(()=>{var L="openchamber.sdk",W=1;var NT=`
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
`;function KE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(R)=>{let U=R.target===_?S:R.target;if(!(U instanceof Element))return;if(!U.hasAttribute("data-oc-scrolling"))U.setAttribute("data-oc-scrolling","");let C=O.get(U);if(C!==void 0)clearTimeout(C);O.set(U,setTimeout(()=>{O.delete(U),U.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var QS=`(${KE.toString()})(document);`;var PT=128,LT=65536;var g_=128;var h_=65536;var WT=8000,QT=192000,YT=120000;var BE=(_)=>{let S=[],O=0,R=0;return{push:(U)=>{S.push(U),R+=U.length;while(R-O>_&&S.length>1){let C=S.shift();R-=C?.length??0,O=0}},pull:(U)=>{let C=0;while(C<U.length&&S.length>0){let P=S[0],D=Math.min(U.length-C,P.length-O);if(U.set(P.subarray(O,O+D),C),C+=D,O+=D,O>=P.length)S.shift(),R-=P.length,O=0}U.fill(0,C)},clear:()=>{S.length=0,O=0,R=0},get size(){return R-O}}};var zE=/^[a-z][a-z0-9-]{0,39}$/;var ZE=(_)=>Object(_)===_&&!Array.isArray(_),KT=(_,S)=>Object.keys(_).every((O)=>S.includes(O)),$E=(_)=>String(_)===_&&_.length>=1&&_.length<=60,FE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,JE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let O of _){if(!ZE(O)||!zE.test(O.id)||!$E(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(S.has(O.id))return!1;if(S.add(O.id),O.kind==="button"){if(!KT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!KT(O,["kind","id","label","value","options","disabled"]))return!1;if(!FE(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let R=new Set;for(let U of O.options){if(!ZE(U)||!KT(U,["value","label"])||!FE(U.value)||!$E(U.label)||R.has(U.value))return!1;R.add(U.value)}if(!R.has(O.value))return!1}return!0};var kE=["{id}","{segment}","{segments+}"];var AO=new Set(kE);var HE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var MO=new Set(HE);var m_=20000000,c_=256;var BT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,fE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==S.bytes[O])return!1;return!0};var jE=/^[A-Za-z0-9_-]{1,80}$/;var xE=["left","right","top","bottom"];var wE=(_,S=0,O={remaining:16000})=>{if(--O.remaining<0||S>=32)return!1;if(_===null)return!0;let R=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let U of R)if(!wE(U,S+1,O))return!1;return!0},ZT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(ZT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(ZT)}return String(_)===_||Number.isFinite(_)},$T=(_)=>{try{if(String(_.id)!==_.id||!jE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!xE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!wE(_.data)||!ZT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var zT=2000;var qE=["file","directory","other","missing"],JT=(_)=>Boolean(_&&"sessionId"in _),kT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var yE=/^[0-9a-f]{7,64}$/i,HT=(_)=>yE.test(_),v_=500,d_=32000,gE=16000,hE=128,mE=200,cE=2000,vE=16000,dE=80,pE=200,uE=16000;var lE=2000;var fT=20000,p_=1024,u_=2000000;var l_=64000,a_=8000,jT=4000;var xT=960000;var aE=999,oE=1e4,J_=500,nE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],iE=["stopped","starting","ready","failed"],KS=new Set(nE),rE=(_)=>KS.has(_),sE=(_)=>_&&rE(_)?_:"HOST_REJECTED",P_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(P_);if(Object(_)===_)return Object.values(_).every(P_);return!1},tE=(_)=>P_(_)&&JSON.stringify(_).length<=uE,bE=(_)=>_?.trim().slice(0,pE)??"",L_=(_)=>{let S=_.id.trim().slice(0,hE),O=_.title.trim().slice(0,mE),R=_.url.trim().slice(0,cE),U=_.text?.trim().slice(0,vE),C=_.author?.trim().slice(0,dE),P=_.kind==="pull"?"pull":"issue",D={providerId:_.providerId.trim(),id:S,title:O||S,url:R,kind:P};if(U)D.text=U;if(C)D.author=C;if(P==="pull"){let K=bE(_.branches?.head),f=bE(_.branches?.base);if(K&&f)D.branches={head:K,base:f}}if(tE(_.data))D.data=_.data;return D},wT=(_)=>{let S=L_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},bT=(_)=>{let S={text:_.text.trim().slice(0,gE)};if(_.send)S.send=!0;return S},qT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(aE,Math.max(0,Math.round(_)))},yT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(oE,Math.max(0,Math.ceil(_)))};var W_=(_)=>_.length>0&&_.length<=p_&&!_.includes("\x00")&&!_.includes("\\");var o_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>lE)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},BS=new Set(iE),gT=(_)=>Boolean(_&&"status"in _&&BS.has(String(_.status))&&!("body"in _)),n_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),hT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),mT=(_)=>Boolean(_&&"written"in _&&_.written===!0),cT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),ZS=new Set(qE),vT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&ZS.has(String(_.kind))&&Number.isFinite(_.size)),dT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),$S=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),FS=(_)=>Object(_)===_?_:null,FT=(_)=>String(_)===_&&_.length>0,zS=(_)=>{if(!FT(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&FT(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:sE(FT(_.code)?_.code:void 0)};return null},pT=(_)=>{let S=FS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return zS(S);if(!$S.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var eE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),JS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class G extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var _S=()=>Promise.reject(new G("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),i_=()=>Promise.reject(new G("BAD_PATH",`File path must be 1 to ${p_} characters without NUL or backslash.`)),r_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new G("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},uT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new G("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===S.parent),R=_.requestTimeoutMs??fT,U=new Set,C=new Set,P=new Set,D=new Set,K=new Set,f=new Set,B=new Set,x=new Set,r=new Set,c=new Set,l=new Set,a=new Set,B_=[],G_=null,s=null,X_=new Set,w_=new Set,Z_=null,$_=null,GT=!1,C_=new Map,D_=new Map,V_=new Map,o=!1,V={value:0},X=null,e=null,F_=!1,z_=!1,IE=null,v=null,GE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},y=(T)=>{S.parent.postMessage(T,"*")},XE=()=>{if(o||S.parent===S||a.size===0||X?.features?.lateGenerateResults!==!0)return;y({channel:L,v:W,type:"generate-late-listen"})},Z=(T,E)=>{for(let I of T)try{I(E)}catch(M){console.error(M)}},CE=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let E=pT(T.data);if(!E)return;if(E.type==="workspace"){let M=D_.get(E.payload.subscriptionId);if(M)Z([M],E.payload.snapshot);return}if(E.type==="shells"){let M=V_.get(E.payload.subscriptionId);if(M)Z([M],E.payload.snapshot);return}if(E.type==="microphone-audio"){v?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let M=v;if(!M)return;v=null,M.release(),Z(M.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(X=E.payload,e=GE(E.payload.session),Z(U,E.payload),Z(C,E.payload.directory),Z(P,E.payload.session),e)Z(D,e);if(Z(K,E.payload.connection),Z(f,E.payload.settings),Z(B,E.payload.item),E.payload.block)Z(x,E.payload.block);XE();return}if(E.type==="service-event"){Z(r,E.payload);return}if(E.type==="generate-late"){if(a.size===0)B_.push(E.payload);else Z(a,E.payload);return}if(E.type==="directory"){if(X)X={...X,directory:E.payload.directory};Z(C,E.payload.directory);return}if(E.type==="session"){if(X)X={...X,session:E.payload.session};if(!E.payload.session)e=null;else if(e?.sessionId!==E.payload.session.id)e=GE(E.payload.session);Z(P,E.payload.session);return}if(E.type==="session-lifecycle"){e=E.payload,Z(D,E.payload);return}if(E.type==="connection"){if(X)X={...X,connection:E.payload.connection};Z(K,E.payload.connection);return}if(E.type==="settings"){if(X)X={...X,settings:E.payload.settings};Z(f,E.payload.settings);return}if(E.type==="item"){if(X)X={...X,item:E.payload.item};Z(B,E.payload.item);return}if(E.type==="status-control-event"){Z(c,E.payload);return}if(E.type==="popover-closed"){Z(l,E.payload);return}if(E.type==="action"){let M=(Y)=>{if(!o)y({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=s;if(!Q){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>M({ok:!0}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();M({ok:!1,error:($||"Action failed.").slice(0,J_)})});return}if(E.type==="file-open"){let M=E.payload;if($_&&fE($_,M))return;$_=M,Z(X_,E.payload);return}if(E.type==="file-saved"){Z(w_,E.payload.version);return}if(E.type==="file-snapshot"){let M=($)=>{if(!o)y({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:$})},Q=($)=>M({error:($.trim()||"Could not read the edited file.").slice(0,J_)}),Y=Z_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then(($)=>{if(BT($)>m_){Q(`The file is over ${m_} ${"bytes"in $?"bytes":"characters"}.`);return}if($.version.length>c_){Q(`The snapshot version is over ${c_} characters.`);return}M({snapshot:"bytes"in $?{bytes:$.bytes,version:$.version}:{content:$.content,version:$.version}})},($)=>Q($ instanceof Error?$.message:String($)));return}if(E.type==="resolve"){let M=(Y)=>{y({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=G_;if(!Q){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>M({item:Y?L_(Y):null}),(Y)=>{let $=(Y instanceof Error?Y.message:String(Y)).trim();M({error:($||"Command failed.").slice(0,J_)})});return}let I=C_.get(E.id);if(!I)return;if(clearTimeout(I.timer),C_.delete(E.id),E.ok){I.resolve(E.payload);return}I.reject(new G(E.code,E.error))};S.addEventListener("message",CE),y({channel:L,v:W,type:"hello"});let w=(T,E=R)=>{if(o||S.parent===S)return Promise.reject(new G("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((I,M)=>{let Q=setTimeout(()=>{C_.delete(T.id),M(new G("HOST_TIMEOUT","Host did not answer in time."))},E);C_.set(T.id,{resolve:I,reject:M,timer:Q}),y(T)})},H=(T)=>w(T).then(()=>{return}),z={channel:L,v:W},XT=(T)=>{if(!o&&S.parent!==S)y(T)},DE=()=>XT({...z,type:"file-save"}),CT=()=>{if(!o&&S.parent!==S)y({...z,type:"microphone-close",id:N(V)})},LS=async()=>{if(v)throw new G("HOST_REJECTED","The microphone is already open in this frame.");if(X?.features?.microphone!==!0)throw new G("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new G("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<WT||E.sampleRate>QT)throw E.close().catch(()=>{return}),new G("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let I=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,M=BE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(u)=>M.pull(u.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let $=new Set,N_={queue:M,endedListeners:$,release:()=>{Q.onaudioprocess=null,Q.disconnect(),M.clear();for(let u of Y.stream.getTracks())u.stop();E.close().catch(()=>{return})}};v=N_;try{let u=await w({...z,type:"microphone-open",id:N(V),payload:{sampleRate:E.sampleRate}},YT);if(!u||!("opened"in u)||u.opened!==!0)throw new G("HOST_REJECTED","Host did not open the microphone.");if(await I,v!==N_)throw new G("DISCONNECTED","The microphone closed while it was opening.")}catch(u){if(v===N_)v=null;throw N_.release(),CT(),u}return{stream:Y.stream,close:()=>{if(v!==N_)return;v=null,N_.release(),CT()},onEnded:(u)=>{return $.add(u),()=>{$.delete(u)}}}},VE=(T)=>{if(!eE(T)||!JS(T))return;T.preventDefault(),DE()},NE=(T)=>{if(!eE(T)||T.key!=="Escape"||X?.surface!=="popover"||!X.popover)return;T.preventDefault(),QE(X.popover.id,"escape").catch(()=>{return})},b_=()=>{let T=X?.surface==="popover"?X.popover:void 0;if(!T)return;let E=F_||z_;if(IE===E)return;IE=E,YE(T.id,E).catch(()=>{return})},q_=()=>{if(X?.surface!=="popover"||F_)return;F_=!0,b_()},PE=(T)=>{if(X?.surface!=="popover"||T.relatedTarget!==null||!F_)return;F_=!1,b_()},LE=()=>{if(X?.surface!=="popover"||z_)return;z_=!0,b_()},WE=()=>{if(X?.surface!=="popover"||!z_)return;z_=!1,b_()},n=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new G("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},DT=async(T)=>{if(T.kind!=="projects")n(T.projectId);let E=await w({...z,type:"workspace-read",id:N(V),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new G("HOST_REJECTED","Host did not return workspace data.");return E},VT=async(T,E)=>{if(T.kind!=="projects")n(T.projectId);let I=N(V);D_.set(I,E);try{await H({...z,type:"workspace-subscribe",id:N(V),payload:{subscriptionId:I,query:T}})}catch(M){if(D_.delete(I),!o)y({...z,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:I}});throw M}return()=>{if(!D_.delete(I)||o)return;y({...z,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:I}})}},WS=async(T,E)=>{if(T.kind==="session")n(T.sessionId);if(T.kind==="project")n(T.projectId);let I=N(V);V_.set(I,E);try{await H({...z,type:"shells-subscribe",id:N(V),payload:{subscriptionId:I,scope:T}})}catch(M){if(V_.delete(I),!o)y({...z,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:I}});throw M}return()=>{if(!V_.delete(I)||o)return;y({...z,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:I}})}},y_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>PT))throw new G("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!P_(T.value))throw new G("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>LT)throw new G("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&X?.features?.deviceStorage!==!0)throw new G("UNSUPPORTED","This host does not support device storage.");let E=await w({...z,type:"storage",id:N(V),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new G("HOST_REJECTED","Host did not return storage data.");return E},QE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new G("UNSUPPORTED","This host does not support popovers.")):H({...z,type:"popover-close",id:N(V),payload:E?{id:T,reason:E}:{id:T}}),YE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new G("UNSUPPORTED","This host does not support popovers.")):H({...z,type:"popover-anchor",id:N(V),payload:{id:T,active:E}});return S.addEventListener("keydown",NE,!0),S.addEventListener("pointerover",q_),S.addEventListener("pointermove",q_),S.addEventListener("pointerout",PE),S.addEventListener("focus",LE),S.addEventListener("blur",WE),{onAction:(T)=>{return s=T,()=>{if(s===T)s=null}},listProjects:async()=>{let T=await DT({kind:"projects"});if(T.kind!=="projects")throw new G("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await DT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new G("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await DT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new G("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>VT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>VT({kind:"worktrees",projectId:T},(I)=>{if(I.kind==="worktrees")E(I)}),onSessions:(T,E)=>VT({kind:"sessions",projectId:T},(I)=>{if(I.kind==="sessions")E(I)}),onRunningShells:(T,E)=>WS(T,E),readShellOutput:async(T,E)=>{n(T,g_);let I=E?.cursor;if(I!==void 0&&(!Number.isInteger(I)||I<0))throw new G("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=E?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>h_))throw new G("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${h_}.`);let Y=await w({...z,type:"shell-output",id:N(V),payload:{shellId:T,cursor:I,tailBytes:M}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new G("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(n(T,g_),(await w({...z,type:"shell-stop",id:N(V),payload:{shellId:T}}))?.stopped!==!0)throw new G("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{n(T),await H({...z,type:"open-session",id:N(V),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let I=r_(E),M={op:"get",key:T};if(I)M.scope=I;let Q=await y_(M);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,I)=>{let M=r_(I),Q={op:"set",key:T,value:E};if(M)Q.scope=M;await y_(Q)},delete:async(T,E)=>{let I=r_(E),M={op:"delete",key:T};if(I)M.scope=I;await y_(M)},keys:async(T)=>{let E=r_(T),I={op:"keys"};if(E)I.scope=E;let M=await y_(I);if(M.op!=="keys")throw new G("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(U.add(T),X)T(X);return()=>{U.delete(T)}},onDirectory:(T)=>{if(C.add(T),X)T(X.directory);return()=>{C.delete(T)}},onSession:(T)=>{if(P.add(T),X)T(X.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(D.add(T),e)T(e);return()=>{D.delete(T)}},onConnection:(T)=>{if(K.add(T),X)T(X.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(f.add(T),X)T(X.settings);return()=>{f.delete(T)}},onItem:(T)=>{if(B.add(T),X)T(X.item);return()=>{B.delete(T)}},onBlock:(T)=>{if(x.add(T),X?.block)T(X.block);return()=>{x.delete(T)}},onServiceEvent:(T)=>{return r.add(T),()=>{r.delete(T)}},onStatusControl:(T)=>{return c.add(T),()=>{c.delete(T)}},onPopoverClosed:(T)=>{return l.add(T),()=>{l.delete(T)}},setStatusControls:(T)=>{if(X?.features?.statusControls!==!0)return Promise.reject(new G("UNSUPPORTED","This host does not support status controls."));if(!JE(T))return Promise.reject(new G("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return H({...z,type:"status-controls",id:N(V),payload:{controls:T}})},openPopover:(T)=>{if(X?.features?.popovers!==!0)return Promise.reject(new G("UNSUPPORTED","This host does not support popovers."));if(!$T(T))return Promise.reject(new G("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return H({...z,type:"popover-open",id:N(V),payload:T})},closePopover:QE,setPopoverAnchorActive:YE,onResolve:(T)=>{return G_=T,()=>{if(G_===T)G_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>v_)return Promise.reject(new G("HOST_REJECTED",`Toast message must contain 1 to ${v_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>d_))return Promise.reject(new G("HOST_REJECTED",`Toast copy text must contain 1 to ${d_} characters.`));return H({channel:L,v:W,type:"toast",id:N(V),payload:{...T,message:E}})},openUrl:(T)=>H({channel:L,v:W,type:"open-url",id:N(V),payload:{url:T}}),openCommit:(T)=>HT(T)?H({channel:L,v:W,type:"open-commit",id:N(V),payload:{sha:T}}):Promise.reject(new G("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>H({channel:L,v:W,type:"block-answer",id:N(V),payload:{text:T.trim().slice(0,zT)}}),openSurface:(T)=>H({channel:L,v:W,type:"open-surface",id:N(V),payload:{surfaceId:T}}),writeClipboard:(T)=>H({channel:L,v:W,type:"clipboard-write",id:N(V),payload:{text:T}}),compose:(T)=>H({channel:L,v:W,type:"compose",id:N(V),payload:T}),attach:(T)=>H({channel:L,v:W,type:"attach",id:N(V),payload:L_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)n(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")n(E.directory);else{if(E.name!==void 0)n(E.name,200);if(E.baseBranch!==void 0)n(E.baseBranch,200)}let I=await w({channel:L,v:W,type:"start-session",id:N(V),payload:wT(T)},_.requestTimeoutMs??180000);if(!JT(I))throw new G("HOST_REJECTED","Host did not return a session.");return I},prompt:(T)=>w({channel:L,v:W,type:"prompt",id:N(V),payload:bT(T)}).then((E)=>{if(!kT(E))throw new G("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>H({channel:L,v:W,type:"session-link",id:N(V),payload:L_(T)}),close:()=>H({channel:L,v:W,type:"close",id:N(V)}),oauthStart:()=>H({channel:L,v:W,type:"oauth-start",id:N(V)}),oauthDisconnect:()=>H({channel:L,v:W,type:"oauth-disconnect",id:N(V)}),request:(T)=>(o_(T.path)?w({channel:L,v:W,type:"request",id:N(V),payload:T}):_S()).then((E)=>{if(!n_(E))throw new G("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(o_(T.path)?w({channel:L,v:W,type:"service-request",id:N(V),payload:T}):_S()).then((E)=>{if(!n_(E))throw new G("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>w({channel:L,v:W,type:"service-status",id:N(V)}).then((T)=>{if(!gT(T))throw new G("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(W_(T)?w({channel:L,v:W,type:"file-read",id:N(V),payload:{path:T}}):i_()).then((E)=>{if(!hT(E))throw new G("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!W_(T))return i_();if(E.length>u_)return Promise.reject(new G("FILE_TOO_LARGE",`Content is over ${u_} characters.`));return w({channel:L,v:W,type:"file-write",id:N(V),payload:{path:T,content:E}}).then((I)=>{if(!mT(I))throw new G("HOST_REJECTED","Host did not confirm the write.");return I})},listDir:(T)=>(W_(T)?w({channel:L,v:W,type:"file-list",id:N(V),payload:{path:T}}):i_()).then((E)=>{if(!cT(E))throw new G("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(W_(T)?w({channel:L,v:W,type:"file-stat",id:N(V),payload:{path:T}}):i_()).then((E)=>{if(!vT(E))throw new G("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),I=T.system?.trim();if(E.length===0||E.length>l_)return Promise.reject(new G("HOST_REJECTED",`Prompt must be 1 to ${l_} characters.`));if(I!==void 0&&(I.length===0||I.length>a_))return Promise.reject(new G("HOST_REJECTED",`System prompt must be 1 to ${a_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(jT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new G("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(I!==void 0)Q.system=I;if(M!==void 0)Q.maxOutputTokens=M;return w({channel:L,v:W,type:"generate",id:N(V),payload:Q},_.requestTimeoutMs??xT).then((Y)=>{if(!dT(Y))throw new G("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{a.add(T);for(let E of B_.splice(0))Z([T],E);return XE(),()=>{a.delete(T)}},openMicrophone:LS,setBadge:(T)=>H({channel:L,v:W,type:"badge",id:N(V),payload:{count:qT(T)}}),setHeight:(T)=>H({channel:L,v:W,type:"resize",id:N(V),payload:{height:yT(T)}}),onFileOpen:(T)=>{if(X_.add(T),!GT)GT=!0,S.addEventListener("keydown",VE,!0);if($_)T($_);return()=>{X_.delete(T)}},onFileSnapshot:(T)=>{return Z_=T,()=>{if(Z_===T)Z_=null}},onFileSaved:(T)=>{return w_.add(T),()=>{w_.delete(T)}},reportFileChange:(T)=>XT({...z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:DE,reportFileUnsupported:()=>XT({...z,type:"file-unsupported"}),dispose:()=>{for(let T of D_.keys())y({...z,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:T}});D_.clear();for(let T of V_.keys())y({...z,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:T}});if(V_.clear(),v)CT(),v.release(),v=null;if(o=!0,G_=null,s=null,Z_=null,X_.clear(),w_.clear(),GT)S.removeEventListener("keydown",VE,!0);S.removeEventListener("message",CE),S.removeEventListener("keydown",NE,!0),S.removeEventListener("pointerover",q_),S.removeEventListener("pointermove",q_),S.removeEventListener("pointerout",PE),S.removeEventListener("focus",LE),S.removeEventListener("blur",WE);for(let T of C_.values())clearTimeout(T.timer),T.reject(new G("HOST_UNAVAILABLE","Host client was disposed."));C_.clear(),U.clear(),C.clear(),P.clear(),D.clear(),K.clear(),f.clear(),B.clear(),x.clear(),r.clear(),c.clear(),l.clear(),a.clear(),B_.length=0}}};var TS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var FO=new Set(TS);var ES=["none","agent","user"];var JO=new Set(ES);var kS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],HS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],SS=(_,S)=>{S.style.colorScheme=_.mode;for(let[O,R]of kS)S.style.setProperty(O,_.tokens[R]);for(let[O,R,U]of HS){let C=_.tokens[U]??"";S.style.setProperty(O,C),S.style.setProperty(R,C)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},lT=(_,S)=>{if(SS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var fS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${fS[_]}, ${S}))`,T_=F("surface-background","transparent"),t_=F("surface-elevated","transparent"),Q_=F("surface-elevated-foreground","inherit"),d=F("surface-foreground","inherit"),J=F("surface-muted-foreground","gray"),jS=F("surface-muted","transparent"),R_=F("interactive-border","currentColor"),g=F("interactive-hover","transparent"),M_=F("interactive-active","transparent"),aT=F("interactive-selection","transparent"),oT=F("interactive-selection-foreground","inherit"),__=F("primary","currentColor"),nT=F("primary-text","inherit"),iT=F("error-text","inherit"),xS=F("font-sans","inherit"),rT=F("font-mono","monospace"),RS=F("radius","9px"),sT=`calc(${RS} - 2px)`,OS=`calc(${RS} - 4px)`,k=(_,S,O="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${O})`,US=`background-image: linear-gradient(${g}, ${g});`,tT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,eT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",AS="box-shadow: var(--oc-sdk-lit);",_E=`inset 0 0.5px 0 0 ${k(d,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,wS=`
:root {
  --oc-sdk-edge: ${k(d,16)};
  --oc-sdk-field-bg: ${t_};
  --oc-sdk-raised-bg: ${T_};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(d,14)};
  --oc-sdk-field-bg: ${k(T_,50,t_)};
  --oc-sdk-raised-bg: ${t_};
  --oc-sdk-field-lift: ${_E};
  --oc-sdk-raised-lift: ${_E};
  --oc-sdk-lit: ${_E};
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
.oc-sdk { color: ${d}; font-family: ${xS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${US} }
.oc-sdk-mono { font-family: ${rT}; }
.oc-sdk-muted { color: ${J}; }
${s_("success")}${s_("warning")}${s_("error")}${s_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${__}; --oc-sdk-tone-text: ${nT}; }

.oc-sdk-btn { border-radius: ${sT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${OS}; }
.oc-sdk-btn[data-variant="default"] { color: ${nT}; background: ${k(__,10,T_)}; border-color: ${k(__,12)}; ${AS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(__,16,T_)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(__,22,T_)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${jS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Q_}; ${eT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${M_}, ${M_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${g}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${M_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${iT}; background: ${k("var(--oc-sdk-tone)",7,T_)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${AS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,T_)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,T_)}; box-shadow: none; }

.oc-sdk-field-note { color: ${J}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${iT}; }
.oc-sdk-input { border-radius: ${sT}; background: var(--oc-sdk-field-bg); color: ${Q_}; ${tT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${J}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${tT(k(d,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${tT(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${rT}; }

.oc-sdk-search-icon { color: ${J}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${__}; }
.oc-sdk-search-clear { border-radius: ${OS}; color: ${J}; }
.oc-sdk-search-clear:hover { background: ${g}; color: ${d}; }

.oc-sdk-trigger { border-radius: ${sT}; background: var(--oc-sdk-raised-bg); color: ${Q_}; ${eT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${J}; }
.oc-sdk-trigger-chevron { color: ${J}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Q_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${t_}; background-clip: padding-box; color: ${Q_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${g}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${aT}; color: ${oT}; }
.oc-sdk-option-check { color: ${d}; }
.oc-sdk-option[data-destructive="true"] { color: ${iT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${J}; }
.oc-sdk-popup-empty { color: ${J}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${R_}; border-radius: 4px; color: ${d}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(d,60,R_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${R_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${T_}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${__}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${US} }
.oc-sdk-check-desc { color: ${J}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(d,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${J}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${d}; }
.oc-sdk-tab[aria-selected="true"] { color: ${oT}; background: ${aT}; border-color: ${R_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Q_}; background: var(--oc-sdk-raised-bg); ${eT} }
.oc-sdk-tab-count { color: ${J}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(d,6)}; color: ${J}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${g}; }
.oc-sdk-row[aria-selected="true"] { background: ${aT}; color: ${oT}; }
.oc-sdk-row-lead { font-family: ${rT}; color: ${J}; }
.oc-sdk-row-sub { color: ${J}; }
.oc-sdk-row-meta { color: ${J}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${J}; }

.oc-sdk-empty-body { color: ${J}; }

.oc-sdk-spinner { color: ${J}; }
.oc-sdk-spinner-ring { border-color: ${R_}; border-top-color: ${__}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${J}; }

.oc-sdk-separator { color: ${J}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(R_,40)}; }

.oc-sdk-progress-label { color: ${J}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(d,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${__}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${nT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(R_,60)}; }
`,q=`
${NT}
${bS}
${MS}`;var IS=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"qna",name:"问与答"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var RT=[],DS=()=>{let _=document.querySelector("#msg2");if(_&&RT.length>0)_.innerHTML=`<div class="err">${RT.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{RT.push("页面错误："+String(_.message??_)),DS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,O=S?.code;RT.push("未处理异常"+(O?` [${O}]`:"")+"："+String(S?.message??S)),DS()});var mS=["toutiao"],OT=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],cS=180000,vS=12,GS=30,dS=3,b=uT(),VS=document.querySelector("#app");if(!VS)throw Error("Missing #app");VS.innerHTML=`
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
</div>`;var p=(_)=>document.querySelector(`#${_}`),pS=p("cname"),UT=p("topics"),AT=p("catchips"),uS="v0.11.4-robust";pS.textContent="阅读";document.querySelector("#build").textContent=uS;var K_="",j=[],S_=[],U_=0,EE=!1,i=0,t=new Map,H_=!1,A_="",f_=0,AE=0,j_=!1,NS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},OE=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x_=async(_)=>{try{return await b.storage.get(_)}catch{return}},RE=async(_,S)=>{try{await b.storage.set(_,S)}catch{}},PS="moyu:feed",SE=48000,lS=async()=>{try{let _=j.map((U)=>[U.community,U.id,U.title,U.author,U.channel,U.replies,U.time,U.url,U.excerpt??""]),S=JSON.stringify({at:U_,failed:S_,rows:_}),O=Math.max(1,Math.ceil(S.length/SE));await b.storage.set(PS,{at:U_,failed:S_,parts:O});let R=[];for(let U=0;U<O;U++)R.push(S.slice(U*SE,(U+1)*SE));await Promise.all(R.map((U,C)=>b.storage.set(`moyu:feed:p${C}`,U)));for(let U=O;U<O+4;U++)try{await b.storage.delete(`moyu:feed:p${U}`)}catch{}}catch{}},aS=async()=>{try{let _=await x_(PS);if(!_||typeof _.at!=="number"||typeof _.parts!=="number")return!1;let S=_.parts;if(S<1||S>40)return!1;let O=[];for(let U=0;U<S;U++){let C=await x_(`moyu:feed:p${U}`);if(typeof C!=="string")return!1;O.push(C)}let R=JSON.parse(O.join(""));if(typeof R.at!=="number"||!Array.isArray(R.rows)||R.rows.length===0)return!1;return U_=R.at,S_=Array.isArray(R.failed)?R.failed:[],j=R.rows.map((U)=>({community:U[0],id:String(U[1]??""),title:String(U[2]??""),author:String(U[3]??""),avatar:null,channel:typeof U[4]==="string"?U[4]:null,replies:typeof U[5]==="number"?U[5]:null,time:typeof U[6]==="number"?U[6]:null,url:String(U[7]??""),excerpt:typeof U[8]==="string"&&U[8]?U[8]:null})).filter((U)=>U.title&&U.id),j.length>0}catch{return!1}},UE=async(_,S,O)=>{let R=S;if(K_&&_==="GET"&&R.startsWith("/"))R+=(R.includes("?")?"&":"?")+`proxy=${encodeURIComponent(K_)}`;return b.serviceRequest({method:_,path:R,body:O})};var oS=(_)=>{if(AT.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=A_===""?"on":"",S.onclick=()=>{A_="",O_()},AT.appendChild(S);for(let O of _){let R=document.createElement("button"),U=j.filter((C)=>t.get(I_(C))===O).length;R.textContent=`${O} ${U}`,R.className=A_===O?"on":"",R.onclick=()=>{A_=A_===O?"":O,O_()},AT.appendChild(R)}},MT="m2",I_=(_)=>`moyu:cat:${MT}:${_.community}:${_.id}:${_.title.slice(0,30)}`,O_=()=>{let _=[...new Set(j.map((P)=>t.get(I_(P))).filter((P)=>!!P))],S=OT.filter((P)=>_.includes(P));oS(S);let O=U_>0?(()=>{let P=new Date(U_);return`${P.getHours()}:${String(P.getMinutes()).padStart(2,"0")}`})():"",R=j_?` · 分类 ${f_}/${AE}`:"";p("tcount").textContent=j.length>0?`${j.length}${O?` · 更新 ${O}`:""}${R}`:O?`更新 ${O}`:"";let U=document.querySelector("#srcerr");if(U)U.textContent=S_.length>0?`暂不可用：${S_.join("、")}（多为对侧限流，过一会儿点↻再试）`:"";UT.innerHTML="";let C=A_?[A_]:S.length>0?S:[""];for(let P of C){if(!A_&&P){let D=document.createElement("div");D.className="cathead",D.textContent=P,UT.appendChild(D)}for(let D of j){if(P&&t.get(I_(D))!==P)continue;let K=document.createElement("div");K.className="nrow";let f=D.excerpt?`<br><span class="xp">${OE(D.excerpt)}</span>`:"";K.innerHTML=`<span class="tt">${OE(D.title)}${f}</span>`;let B=document.createElement("button");B.className="aibtn",B.title="AI 总结这篇",B.textContent="✦",B.onclick=()=>void nS(D,K,B),K.appendChild(B),UT.appendChild(K)}}},XS=()=>{let _=Object.fromEntries(t),S=Object.keys(_);if(S.length>1000)_=Object.fromEntries(S.slice(-1000).map((O)=>[O,_[O]]));RE(`moyu:cats:${MT}`,_)},ME=async(_)=>{if(H_)return;let S=j.filter((U)=>!t.has(I_(U)));if(AE=S.length,f_=0,j_=S.length>0,O_(),S.length===0)return;let O=0,R=async()=>{while(!0){if(_!==i||H_)return;let U=O;if(O+=GS,U>=S.length)return;let C=S.slice(U,U+GS);try{let P=C.map((B,x)=>`${x}. ${B.title}`).join(`
`).slice(0,3500),D=await b.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${OT.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:320});if(_!==i||H_)return;let K=[];for(let B of D.text.split(`
`)){let x=/^\s*(?:[-*•]\s*)?(?:\*\*|__)?\s*(\d+)\s*(?:\*\*|__)?\s*[.、:：)）]\s*(.+?)\s*$/.exec(B);if(!x)continue;let r=x[2].replace(/[*`]/g,"").trim(),c=OT.find((l)=>r.startsWith(l))??OT.find((l)=>r.includes(l));K[Number(x[1])]=c??"其他"}if(K.filter(Boolean).length<Math.ceil(C.length*0.6))for(let B of C)t.set(I_(B),"其他");else C.forEach((B,x)=>t.set(I_(B),K[x]??"其他"));XS()}catch(P){let D=P?.code;if(D==="NO_MODEL"||D==="MODEL_FAILED"){H_=!0,j_=!1,NS(OE(D==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),O_();return}for(let K of C)t.set(I_(K),"其他")}if(f_=Math.min(S.length,f_+C.length),_!==i)return;O_()}};if(await Promise.all(Array.from({length:Math.min(dS,S.length)},()=>R())),_===i)j_=!1,XS(),O_()},CS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),nS=async(_,S,O)=>{let R=S.querySelector(".aisum");if(R){R.remove();return}let U=`moyu:csum:${MT}:${_.community}:${_.id}`;O.disabled=!0;let C=O.textContent;O.textContent="…";try{let P=await x_(U),D=typeof P==="string"&&P?P:"";if(!D){let f=await UE("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),B=JSON.parse(f.body);if(!B.ok||!B.thread)throw Error(B.error??"正文失败");let x=B.thread,r=[x.opening?CS(x.opening.html):"",...x.posts.map((c)=>CS(c.html))].filter(Boolean).join(`
`).slice(0,3500);if(!r){if(!mS.includes(_.community))throw Error("这篇没有可总结的正文");let c="";try{let l=await UE("GET",`/search?q=${encodeURIComponent(_.title)}`),a=JSON.parse(l.body);if(a.ok&&a.results&&a.results.length>0){let B_=a.results.slice(0,5).map((s,X_)=>`${X_+1}. 「${s.title}」${s.snippet}${s.site?`（${s.site}）`:""}`).join(`
`).slice(0,2500);c=(await b.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${B_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(c)D=c+"（联网版）";else{if(D=(await b.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!D)throw Error("小模型没有返回总结");D+="（标题版）"}}else if(D=(await b.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${r}`,maxOutputTokens:256})).text.trim().slice(0,500),!D)throw Error("小模型没有返回总结");await RE(U,D)}let K=document.createElement("div");K.className="aisum",K.textContent=`✦ ${D}`,S.appendChild(K)}catch(P){let D=P?.code,K=D==="NO_MODEL"?"无可用小模型":D==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",f=document.createElement("div");f.className="aisum",f.textContent=`总结失败：${K}`,S.appendChild(f)}finally{O.disabled=!1,O.textContent=C}},IT=async(_=!1)=>{if(EE||document.hidden)return;if(!_&&Date.now()-U_<cS&&j.length>0)return;EE=!0;let S=++i;try{let O=IS.flatMap((U)=>U.channels.map((C)=>({c:U,ch:C})));if(j=[],S_=[],p("tcount").textContent=`加载中 0/${O.length}`,UT.innerHTML="",AT.innerHTML="",await Promise.all(O.map(async({c:U,ch:C})=>{try{let P=await UE("GET",`/list?community=${U.id}&channel=${encodeURIComponent(C.id)}`),D=JSON.parse(P.body);if(!D.ok)throw Error(D.error??"列表失败");if(S!==i)return;let K=(D.topics??[]).slice(0,vS);if(j.push(...K),S!==i)return;p("tcount").textContent=`加载中 ${j.length} · 已回 ${O.length-S_.length}/${O.length}`,O_()}catch{if(S!==i)return;if(!S_.includes(U.name))S_.push(U.name)}})),S!==i)return;U_=Date.now();let R=new Set;j=j.filter((U)=>{let C=U.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!C||R.has(C))return!1;return R.add(C),!0}),lS(),NS(""),O_(),ME(S)}finally{EE=!1}};p("b-refresh").onclick=()=>{U_=0,IT(!0)};p("b-clearcache").onclick=async()=>{let _=p("cfg-out");_.textContent="正在清空 AI 缓存…";try{let O=(await b.storage.keys()).filter((R)=>/^moyu:(cat|csum|cats)(:|$)/.test(R));await Promise.all(O.map((R)=>b.storage.delete(R).catch(()=>{return}))),t.clear(),H_=!1,f_=0,AE=0,j_=!1,_.textContent=`已清 ${O.length} 条，正在用当前模型重算分类…`,ME(++i),await b.toast({kind:"success",message:`已清空 AI 缓存（${O.length} 条）`})}catch(S){_.textContent=`清空失败：${S instanceof Error?S.message:"未知错误"}`}};p("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){p("cfg-out").textContent="格式不对，要 http(s)://host:port";return}K_=_,await RE("moyu:proxy",K_),p("cfg-out").textContent="已保存，正在测试…",U_=0,await IT(!0),p("cfg-out").textContent=j.length>0?`连通（${j.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")IT(!0);else if(_.key==="q")b.close()});var ST=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(ST++,ST>=2)ST=0,b.close();setTimeout(()=>ST=0,500)}});var iS=async()=>{K_=await x_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=K_};b.onReady((_)=>{lT(_,document.documentElement)});(async()=>{await iS();try{let _=await x_(`moyu:cats:${MT}`);if(_&&typeof _==="object"){for(let[O,R]of Object.entries(_))if(typeof R==="string")t.set(O,R)}if(await aS()){O_(),ME(++i);return}}catch{}IT(!0)})();})();
