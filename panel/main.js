(()=>{var W="openchamber.sdk",L=1;var WT=`
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
`;function ZE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(R)=>{let U=R.target===_?S:R.target;if(!(U instanceof Element))return;if(!U.hasAttribute("data-oc-scrolling"))U.setAttribute("data-oc-scrolling","");let C=O.get(U);if(C!==void 0)clearTimeout(C);O.set(U,setTimeout(()=>{O.delete(U),U.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var $S=`(${ZE.toString()})(document);`;var LT=128,QT=65536;var m_=128;var c_=65536;var YT=8000,BT=192000,KT=120000;var $E=(_)=>{let S=[],O=0,R=0;return{push:(U)=>{S.push(U),R+=U.length;while(R-O>_&&S.length>1){let C=S.shift();R-=C?.length??0,O=0}},pull:(U)=>{let C=0;while(C<U.length&&S.length>0){let P=S[0],D=Math.min(U.length-C,P.length-O);if(U.set(P.subarray(O,O+D),C),C+=D,O+=D,O>=P.length)S.shift(),R-=P.length,O=0}U.fill(0,C)},clear:()=>{S.length=0,O=0,R=0},get size(){return R-O}}};var HE=/^[a-z][a-z0-9-]{0,39}$/;var FE=(_)=>Object(_)===_&&!Array.isArray(_),ZT=(_,S)=>Object.keys(_).every((O)=>S.includes(O)),zE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,JE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,kE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let O of _){if(!FE(O)||!HE.test(O.id)||!zE(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(S.has(O.id))return!1;if(S.add(O.id),O.kind==="button"){if(!ZT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!ZT(O,["kind","id","label","value","options","disabled"]))return!1;if(!JE(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let R=new Set;for(let U of O.options){if(!FE(U)||!ZT(U,["value","label"])||!JE(U.value)||!zE(U.label)||R.has(U.value))return!1;R.add(U.value)}if(!R.has(O.value))return!1}return!0};var fE=["{id}","{segment}","{segments+}"];var VO=new Set(fE);var jE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var PO=new Set(jE);var v_=20000000,d_=256;var $T=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,xE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==S.bytes[O])return!1;return!0};var wE=/^[A-Za-z0-9_-]{1,80}$/;var bE=["left","right","top","bottom"];var qE=(_,S=0,O={remaining:16000})=>{if(--O.remaining<0||S>=32)return!1;if(_===null)return!0;let R=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let U of R)if(!qE(U,S+1,O))return!1;return!0},FT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(FT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(FT)}return String(_)===_||Number.isFinite(_)},zT=(_)=>{try{if(String(_.id)!==_.id||!wE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!bE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!qE(_.data)||!FT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var HT=2000;var gE=["file","directory","other","missing"],kT=(_)=>Boolean(_&&"sessionId"in _),fT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var hE=/^[0-9a-f]{7,64}$/i,jT=(_)=>hE.test(_),p_=500,u_=32000,mE=16000,cE=128,vE=200,dE=2000,pE=16000,uE=80,lE=200,aE=16000;var oE=2000;var xT=20000,l_=1024,a_=2000000;var o_=64000,n_=8000,wT=4000;var bT=960000;var nE=999,iE=1e4,k_=500,rE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],sE=["stopped","starting","ready","failed"],zS=new Set(rE),tE=(_)=>zS.has(_),eE=(_)=>_&&tE(_)?_:"HOST_REJECTED",D_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(D_);if(Object(_)===_)return Object.values(_).every(D_);return!1},_S=(_)=>D_(_)&&JSON.stringify(_).length<=aE,yE=(_)=>_?.trim().slice(0,lE)??"",V_=(_)=>{let S=_.id.trim().slice(0,cE),O=_.title.trim().slice(0,vE),R=_.url.trim().slice(0,dE),U=_.text?.trim().slice(0,pE),C=_.author?.trim().slice(0,uE),P=_.kind==="pull"?"pull":"issue",D={providerId:_.providerId.trim(),id:S,title:O||S,url:R,kind:P};if(U)D.text=U;if(C)D.author=C;if(P==="pull"){let Q=yE(_.branches?.head),z=yE(_.branches?.base);if(Q&&z)D.branches={head:Q,base:z}}if(_S(_.data))D.data=_.data;return D},qT=(_)=>{let S=V_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},yT=(_)=>{let S={text:_.text.trim().slice(0,mE)};if(_.send)S.send=!0;return S},gT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(nE,Math.max(0,Math.round(_)))},hT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(iE,Math.max(0,Math.ceil(_)))};var N_=(_)=>_.length>0&&_.length<=l_&&!_.includes("\x00")&&!_.includes("\\");var i_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>oE)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},JS=new Set(sE),mT=(_)=>Boolean(_&&"status"in _&&JS.has(String(_.status))&&!("body"in _)),r_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),cT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),vT=(_)=>Boolean(_&&"written"in _&&_.written===!0),dT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),HS=new Set(gE),pT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&HS.has(String(_.kind))&&Number.isFinite(_.size)),uT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),kS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),fS=(_)=>Object(_)===_?_:null,JT=(_)=>String(_)===_&&_.length>0,jS=(_)=>{if(!JT(_.id))return null;if(_.ok===!0){let S={channel:W,v:L,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&JT(_.error))return{channel:W,v:L,type:"result",id:_.id,ok:!1,error:_.error,code:eE(JT(_.code)?_.code:void 0)};return null},lT=(_)=>{let S=fS(_);if(!S||S.channel!==W||S.v!==L)return null;if(S.type==="result")return jS(S);if(!kS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var TS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),xS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class G extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var ES=()=>Promise.reject(new G("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),s_=()=>Promise.reject(new G("BAD_PATH",`File path must be 1 to ${l_} characters without NUL or backslash.`)),t_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new G("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},aT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new G("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===S.parent),R=_.requestTimeoutMs??xT,U=new Set,C=new Set,P=new Set,D=new Set,Q=new Set,z=new Set,K=new Set,j=new Set,w=new Set,i=new Set,s=new Set,l=new Set,K_=[],Z_=null,$_=null,b_=new Set,q_=new Set,F_=null,z_=null,CT=!1,I_=new Map,G_=new Map,X_=new Map,a=!1,V={value:0},X=null,t=null,J_=!1,H_=!1,XE=null,v=null,CE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},g=(T)=>{S.parent.postMessage(T,"*")},DE=()=>{if(a||S.parent===S||l.size===0||X?.features?.lateGenerateResults!==!0)return;g({channel:W,v:L,type:"generate-late-listen"})},Z=(T,E)=>{for(let I of T)try{I(E)}catch(M){console.error(M)}},VE=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let E=lT(T.data);if(!E)return;if(E.type==="workspace"){let M=G_.get(E.payload.subscriptionId);if(M)Z([M],E.payload.snapshot);return}if(E.type==="shells"){let M=X_.get(E.payload.subscriptionId);if(M)Z([M],E.payload.snapshot);return}if(E.type==="microphone-audio"){v?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let M=v;if(!M)return;v=null,M.release(),Z(M.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(X=E.payload,t=CE(E.payload.session),Z(U,E.payload),Z(C,E.payload.directory),Z(P,E.payload.session),t)Z(D,t);if(Z(Q,E.payload.connection),Z(z,E.payload.settings),Z(K,E.payload.item),E.payload.block)Z(j,E.payload.block);DE();return}if(E.type==="service-event"){Z(w,E.payload);return}if(E.type==="generate-late"){if(l.size===0)K_.push(E.payload);else Z(l,E.payload);return}if(E.type==="directory"){if(X)X={...X,directory:E.payload.directory};Z(C,E.payload.directory);return}if(E.type==="session"){if(X)X={...X,session:E.payload.session};if(!E.payload.session)t=null;else if(t?.sessionId!==E.payload.session.id)t=CE(E.payload.session);Z(P,E.payload.session);return}if(E.type==="session-lifecycle"){t=E.payload,Z(D,E.payload);return}if(E.type==="connection"){if(X)X={...X,connection:E.payload.connection};Z(Q,E.payload.connection);return}if(E.type==="settings"){if(X)X={...X,settings:E.payload.settings};Z(z,E.payload.settings);return}if(E.type==="item"){if(X)X={...X,item:E.payload.item};Z(K,E.payload.item);return}if(E.type==="status-control-event"){Z(i,E.payload);return}if(E.type==="popover-closed"){Z(s,E.payload);return}if(E.type==="action"){let M=(B)=>{if(!a)g({channel:W,v:L,type:"action-result",id:E.id,payload:B})},Y=$_;if(!Y){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Y(E.payload)).then(()=>M({ok:!0}),(B)=>{let $=(B instanceof Error?B.message:String(B)).trim();M({ok:!1,error:($||"Action failed.").slice(0,k_)})});return}if(E.type==="file-open"){let M=E.payload;if(z_&&xE(z_,M))return;z_=M,Z(b_,E.payload);return}if(E.type==="file-saved"){Z(q_,E.payload.version);return}if(E.type==="file-snapshot"){let M=($)=>{if(!a)g({channel:W,v:L,type:"file-snapshot-result",id:E.id,payload:$})},Y=($)=>M({error:($.trim()||"Could not read the edited file.").slice(0,k_)}),B=F_;if(!B){Y("This extension does not edit files.");return}Promise.resolve().then(()=>B(E.payload.purpose)).then(($)=>{if($T($)>v_){Y(`The file is over ${v_} ${"bytes"in $?"bytes":"characters"}.`);return}if($.version.length>d_){Y(`The snapshot version is over ${d_} characters.`);return}M({snapshot:"bytes"in $?{bytes:$.bytes,version:$.version}:{content:$.content,version:$.version}})},($)=>Y($ instanceof Error?$.message:String($)));return}if(E.type==="resolve"){let M=(B)=>{g({channel:W,v:L,type:"resolve-result",id:E.id,payload:B})},Y=Z_;if(!Y){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Y(E.payload)).then((B)=>M({item:B?V_(B):null}),(B)=>{let $=(B instanceof Error?B.message:String(B)).trim();M({error:($||"Command failed.").slice(0,k_)})});return}let I=I_.get(E.id);if(!I)return;if(clearTimeout(I.timer),I_.delete(E.id),E.ok){I.resolve(E.payload);return}I.reject(new G(E.code,E.error))};S.addEventListener("message",VE),g({channel:W,v:L,type:"hello"});let b=(T,E=R)=>{if(a||S.parent===S)return Promise.reject(new G("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((I,M)=>{let Y=setTimeout(()=>{I_.delete(T.id),M(new G("HOST_TIMEOUT","Host did not answer in time."))},E);I_.set(T.id,{resolve:I,reject:M,timer:Y}),g(T)})},f=(T)=>b(T).then(()=>{return}),J={channel:W,v:L},DT=(T)=>{if(!a&&S.parent!==S)g(T)},NE=()=>DT({...J,type:"file-save"}),VT=()=>{if(!a&&S.parent!==S)g({...J,type:"microphone-close",id:N(V)})},KS=async()=>{if(v)throw new G("HOST_REJECTED","The microphone is already open in this frame.");if(X?.features?.microphone!==!0)throw new G("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new G("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<YT||E.sampleRate>BT)throw E.close().catch(()=>{return}),new G("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let I=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,M=$E(Math.round(E.sampleRate/4)),Y=E.createScriptProcessor(1024,1,1);Y.onaudioprocess=(u)=>M.pull(u.outputBuffer.getChannelData(0));let B=E.createMediaStreamDestination();Y.connect(B);let $=new Set,C_={queue:M,endedListeners:$,release:()=>{Y.onaudioprocess=null,Y.disconnect(),M.clear();for(let u of B.stream.getTracks())u.stop();E.close().catch(()=>{return})}};v=C_;try{let u=await b({...J,type:"microphone-open",id:N(V),payload:{sampleRate:E.sampleRate}},KT);if(!u||!("opened"in u)||u.opened!==!0)throw new G("HOST_REJECTED","Host did not open the microphone.");if(await I,v!==C_)throw new G("DISCONNECTED","The microphone closed while it was opening.")}catch(u){if(v===C_)v=null;throw C_.release(),VT(),u}return{stream:B.stream,close:()=>{if(v!==C_)return;v=null,C_.release(),VT()},onEnded:(u)=>{return $.add(u),()=>{$.delete(u)}}}},PE=(T)=>{if(!TS(T)||!xS(T))return;T.preventDefault(),NE()},WE=(T)=>{if(!TS(T)||T.key!=="Escape"||X?.surface!=="popover"||!X.popover)return;T.preventDefault(),BE(X.popover.id,"escape").catch(()=>{return})},y_=()=>{let T=X?.surface==="popover"?X.popover:void 0;if(!T)return;let E=J_||H_;if(XE===E)return;XE=E,KE(T.id,E).catch(()=>{return})},g_=()=>{if(X?.surface!=="popover"||J_)return;J_=!0,y_()},LE=(T)=>{if(X?.surface!=="popover"||T.relatedTarget!==null||!J_)return;J_=!1,y_()},QE=()=>{if(X?.surface!=="popover"||H_)return;H_=!0,y_()},YE=()=>{if(X?.surface!=="popover"||!H_)return;H_=!1,y_()},o=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new G("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},NT=async(T)=>{if(T.kind!=="projects")o(T.projectId);let E=await b({...J,type:"workspace-read",id:N(V),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new G("HOST_REJECTED","Host did not return workspace data.");return E},PT=async(T,E)=>{if(T.kind!=="projects")o(T.projectId);let I=N(V);G_.set(I,E);try{await f({...J,type:"workspace-subscribe",id:N(V),payload:{subscriptionId:I,query:T}})}catch(M){if(G_.delete(I),!a)g({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:I}});throw M}return()=>{if(!G_.delete(I)||a)return;g({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:I}})}},ZS=async(T,E)=>{if(T.kind==="session")o(T.sessionId);if(T.kind==="project")o(T.projectId);let I=N(V);X_.set(I,E);try{await f({...J,type:"shells-subscribe",id:N(V),payload:{subscriptionId:I,scope:T}})}catch(M){if(X_.delete(I),!a)g({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:I}});throw M}return()=>{if(!X_.delete(I)||a)return;g({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:I}})}},h_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>LT))throw new G("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!D_(T.value))throw new G("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>QT)throw new G("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&X?.features?.deviceStorage!==!0)throw new G("UNSUPPORTED","This host does not support device storage.");let E=await b({...J,type:"storage",id:N(V),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new G("HOST_REJECTED","Host did not return storage data.");return E},BE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new G("UNSUPPORTED","This host does not support popovers.")):f({...J,type:"popover-close",id:N(V),payload:E?{id:T,reason:E}:{id:T}}),KE=(T,E)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new G("UNSUPPORTED","This host does not support popovers.")):f({...J,type:"popover-anchor",id:N(V),payload:{id:T,active:E}});return S.addEventListener("keydown",WE,!0),S.addEventListener("pointerover",g_),S.addEventListener("pointermove",g_),S.addEventListener("pointerout",LE),S.addEventListener("focus",QE),S.addEventListener("blur",YE),{onAction:(T)=>{return $_=T,()=>{if($_===T)$_=null}},listProjects:async()=>{let T=await NT({kind:"projects"});if(T.kind!=="projects")throw new G("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await NT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new G("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await NT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new G("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>PT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>PT({kind:"worktrees",projectId:T},(I)=>{if(I.kind==="worktrees")E(I)}),onSessions:(T,E)=>PT({kind:"sessions",projectId:T},(I)=>{if(I.kind==="sessions")E(I)}),onRunningShells:(T,E)=>ZS(T,E),readShellOutput:async(T,E)=>{o(T,m_);let I=E?.cursor;if(I!==void 0&&(!Number.isInteger(I)||I<0))throw new G("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=E?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>c_))throw new G("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${c_}.`);let B=await b({...J,type:"shell-output",id:N(V),payload:{shellId:T,cursor:I,tailBytes:M}});if(!B||typeof B.output!=="string"||!Number.isFinite(B.cursor))throw new G("HOST_REJECTED","Host did not return shell output.");return B},stopShell:async(T)=>{if(o(T,m_),(await b({...J,type:"shell-stop",id:N(V),payload:{shellId:T}}))?.stopped!==!0)throw new G("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{o(T),await f({...J,type:"open-session",id:N(V),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let I=t_(E),M={op:"get",key:T};if(I)M.scope=I;let Y=await h_(M);return Y.op==="get"&&Y.found?Y.value:void 0},set:async(T,E,I)=>{let M=t_(I),Y={op:"set",key:T,value:E};if(M)Y.scope=M;await h_(Y)},delete:async(T,E)=>{let I=t_(E),M={op:"delete",key:T};if(I)M.scope=I;await h_(M)},keys:async(T)=>{let E=t_(T),I={op:"keys"};if(E)I.scope=E;let M=await h_(I);if(M.op!=="keys")throw new G("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(U.add(T),X)T(X);return()=>{U.delete(T)}},onDirectory:(T)=>{if(C.add(T),X)T(X.directory);return()=>{C.delete(T)}},onSession:(T)=>{if(P.add(T),X)T(X.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(D.add(T),t)T(t);return()=>{D.delete(T)}},onConnection:(T)=>{if(Q.add(T),X)T(X.connection);return()=>{Q.delete(T)}},onSettings:(T)=>{if(z.add(T),X)T(X.settings);return()=>{z.delete(T)}},onItem:(T)=>{if(K.add(T),X)T(X.item);return()=>{K.delete(T)}},onBlock:(T)=>{if(j.add(T),X?.block)T(X.block);return()=>{j.delete(T)}},onServiceEvent:(T)=>{return w.add(T),()=>{w.delete(T)}},onStatusControl:(T)=>{return i.add(T),()=>{i.delete(T)}},onPopoverClosed:(T)=>{return s.add(T),()=>{s.delete(T)}},setStatusControls:(T)=>{if(X?.features?.statusControls!==!0)return Promise.reject(new G("UNSUPPORTED","This host does not support status controls."));if(!kE(T))return Promise.reject(new G("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return f({...J,type:"status-controls",id:N(V),payload:{controls:T}})},openPopover:(T)=>{if(X?.features?.popovers!==!0)return Promise.reject(new G("UNSUPPORTED","This host does not support popovers."));if(!zT(T))return Promise.reject(new G("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return f({...J,type:"popover-open",id:N(V),payload:T})},closePopover:BE,setPopoverAnchorActive:KE,onResolve:(T)=>{return Z_=T,()=>{if(Z_===T)Z_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>p_)return Promise.reject(new G("HOST_REJECTED",`Toast message must contain 1 to ${p_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>u_))return Promise.reject(new G("HOST_REJECTED",`Toast copy text must contain 1 to ${u_} characters.`));return f({channel:W,v:L,type:"toast",id:N(V),payload:{...T,message:E}})},openUrl:(T)=>f({channel:W,v:L,type:"open-url",id:N(V),payload:{url:T}}),openCommit:(T)=>jT(T)?f({channel:W,v:L,type:"open-commit",id:N(V),payload:{sha:T}}):Promise.reject(new G("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>f({channel:W,v:L,type:"block-answer",id:N(V),payload:{text:T.trim().slice(0,HT)}}),openSurface:(T)=>f({channel:W,v:L,type:"open-surface",id:N(V),payload:{surfaceId:T}}),writeClipboard:(T)=>f({channel:W,v:L,type:"clipboard-write",id:N(V),payload:{text:T}}),compose:(T)=>f({channel:W,v:L,type:"compose",id:N(V),payload:T}),attach:(T)=>f({channel:W,v:L,type:"attach",id:N(V),payload:V_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)o(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")o(E.directory);else{if(E.name!==void 0)o(E.name,200);if(E.baseBranch!==void 0)o(E.baseBranch,200)}let I=await b({channel:W,v:L,type:"start-session",id:N(V),payload:qT(T)},_.requestTimeoutMs??180000);if(!kT(I))throw new G("HOST_REJECTED","Host did not return a session.");return I},prompt:(T)=>b({channel:W,v:L,type:"prompt",id:N(V),payload:yT(T)}).then((E)=>{if(!fT(E))throw new G("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>f({channel:W,v:L,type:"session-link",id:N(V),payload:V_(T)}),close:()=>f({channel:W,v:L,type:"close",id:N(V)}),oauthStart:()=>f({channel:W,v:L,type:"oauth-start",id:N(V)}),oauthDisconnect:()=>f({channel:W,v:L,type:"oauth-disconnect",id:N(V)}),request:(T)=>(i_(T.path)?b({channel:W,v:L,type:"request",id:N(V),payload:T}):ES()).then((E)=>{if(!r_(E))throw new G("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(i_(T.path)?b({channel:W,v:L,type:"service-request",id:N(V),payload:T}):ES()).then((E)=>{if(!r_(E))throw new G("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>b({channel:W,v:L,type:"service-status",id:N(V)}).then((T)=>{if(!mT(T))throw new G("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(N_(T)?b({channel:W,v:L,type:"file-read",id:N(V),payload:{path:T}}):s_()).then((E)=>{if(!cT(E))throw new G("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!N_(T))return s_();if(E.length>a_)return Promise.reject(new G("FILE_TOO_LARGE",`Content is over ${a_} characters.`));return b({channel:W,v:L,type:"file-write",id:N(V),payload:{path:T,content:E}}).then((I)=>{if(!vT(I))throw new G("HOST_REJECTED","Host did not confirm the write.");return I})},listDir:(T)=>(N_(T)?b({channel:W,v:L,type:"file-list",id:N(V),payload:{path:T}}):s_()).then((E)=>{if(!dT(E))throw new G("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(N_(T)?b({channel:W,v:L,type:"file-stat",id:N(V),payload:{path:T}}):s_()).then((E)=>{if(!pT(E))throw new G("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),I=T.system?.trim();if(E.length===0||E.length>o_)return Promise.reject(new G("HOST_REJECTED",`Prompt must be 1 to ${o_} characters.`));if(I!==void 0&&(I.length===0||I.length>n_))return Promise.reject(new G("HOST_REJECTED",`System prompt must be 1 to ${n_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(wT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new G("HOST_REJECTED","maxOutputTokens must be a number."));let Y={prompt:E};if(I!==void 0)Y.system=I;if(M!==void 0)Y.maxOutputTokens=M;return b({channel:W,v:L,type:"generate",id:N(V),payload:Y},_.requestTimeoutMs??bT).then((B)=>{if(!uT(B))throw new G("HOST_REJECTED","Host did not return generated text.");return B})},onLateGenerateResult:(T)=>{l.add(T);for(let E of K_.splice(0))Z([T],E);return DE(),()=>{l.delete(T)}},openMicrophone:KS,setBadge:(T)=>f({channel:W,v:L,type:"badge",id:N(V),payload:{count:gT(T)}}),setHeight:(T)=>f({channel:W,v:L,type:"resize",id:N(V),payload:{height:hT(T)}}),onFileOpen:(T)=>{if(b_.add(T),!CT)CT=!0,S.addEventListener("keydown",PE,!0);if(z_)T(z_);return()=>{b_.delete(T)}},onFileSnapshot:(T)=>{return F_=T,()=>{if(F_===T)F_=null}},onFileSaved:(T)=>{return q_.add(T),()=>{q_.delete(T)}},reportFileChange:(T)=>DT({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:NE,reportFileUnsupported:()=>DT({...J,type:"file-unsupported"}),dispose:()=>{for(let T of G_.keys())g({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:T}});G_.clear();for(let T of X_.keys())g({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:T}});if(X_.clear(),v)VT(),v.release(),v=null;if(a=!0,Z_=null,$_=null,F_=null,b_.clear(),q_.clear(),CT)S.removeEventListener("keydown",PE,!0);S.removeEventListener("message",VE),S.removeEventListener("keydown",WE,!0),S.removeEventListener("pointerover",g_),S.removeEventListener("pointermove",g_),S.removeEventListener("pointerout",LE),S.removeEventListener("focus",QE),S.removeEventListener("blur",YE);for(let T of I_.values())clearTimeout(T.timer),T.reject(new G("HOST_UNAVAILABLE","Host client was disposed."));I_.clear(),U.clear(),C.clear(),P.clear(),D.clear(),Q.clear(),z.clear(),K.clear(),j.clear(),w.clear(),i.clear(),s.clear(),l.clear(),K_.length=0}}};var SS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var wO=new Set(SS);var OS=["none","agent","user"];var qO=new Set(OS);var wS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],bS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],US=(_,S)=>{S.style.colorScheme=_.mode;for(let[O,R]of wS)S.style.setProperty(O,_.tokens[R]);for(let[O,R,U]of bS){let C=_.tokens[U]??"";S.style.setProperty(O,C),S.style.setProperty(R,C)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},oT=(_,S)=>{if(US(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var qS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${qS[_]}, ${S}))`,__=F("surface-background","transparent"),_T=F("surface-elevated","transparent"),P_=F("surface-elevated-foreground","inherit"),d=F("surface-foreground","inherit"),H=F("surface-muted-foreground","gray"),yS=F("surface-muted","transparent"),A_=F("interactive-border","currentColor"),h=F("interactive-hover","transparent"),R_=F("interactive-active","transparent"),nT=F("interactive-selection","transparent"),iT=F("interactive-selection-foreground","inherit"),e=F("primary","currentColor"),rT=F("primary-text","inherit"),sT=F("error-text","inherit"),gS=F("font-sans","inherit"),tT=F("font-mono","monospace"),IS=F("radius","9px"),eT=`calc(${IS} - 2px)`,AS=`calc(${IS} - 4px)`,k=(_,S,O="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${O})`,RS=`background-image: linear-gradient(${h}, ${h});`,_E=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,TE="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",MS="box-shadow: var(--oc-sdk-lit);",EE=`inset 0 0.5px 0 0 ${k(d,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,hS=`
:root {
  --oc-sdk-edge: ${k(d,16)};
  --oc-sdk-field-bg: ${_T};
  --oc-sdk-raised-bg: ${__};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(d,14)};
  --oc-sdk-field-bg: ${k(__,50,_T)};
  --oc-sdk-raised-bg: ${_T};
  --oc-sdk-field-lift: ${EE};
  --oc-sdk-raised-lift: ${EE};
  --oc-sdk-lit: ${EE};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,e_=(_)=>{let S=F(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${F(`${_}-text`,"inherit")}; }`},A=(_)=>`calc(${_}rem / 14)`,mS=`
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
`,GS=`${hS}
.oc-sdk { color: ${d}; font-family: ${gS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${RS} }
.oc-sdk-mono { font-family: ${tT}; }
.oc-sdk-muted { color: ${H}; }
${e_("success")}${e_("warning")}${e_("error")}${e_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${e}; --oc-sdk-tone-text: ${rT}; }

.oc-sdk-btn { border-radius: ${eT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${AS}; }
.oc-sdk-btn[data-variant="default"] { color: ${rT}; background: ${k(e,10,__)}; border-color: ${k(e,12)}; ${MS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(e,16,__)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(e,22,__)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${yS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${R_}, ${R_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${P_}; ${TE} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${R_}, ${R_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${h}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${R_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${sT}; background: ${k("var(--oc-sdk-tone)",7,__)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${MS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,__)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,__)}; box-shadow: none; }

.oc-sdk-field-note { color: ${H}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${sT}; }
.oc-sdk-input { border-radius: ${eT}; background: var(--oc-sdk-field-bg); color: ${P_}; ${_E("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${H}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${_E(k(d,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${_E(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${tT}; }

.oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${e}; }
.oc-sdk-search-clear { border-radius: ${AS}; color: ${H}; }
.oc-sdk-search-clear:hover { background: ${h}; color: ${d}; }

.oc-sdk-trigger { border-radius: ${eT}; background: var(--oc-sdk-raised-bg); color: ${P_}; ${TE} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${R_}, ${R_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${H}; }
.oc-sdk-trigger-chevron { color: ${H}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${P_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${_T}; background-clip: padding-box; color: ${P_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${h}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${nT}; color: ${iT}; }
.oc-sdk-option-check { color: ${d}; }
.oc-sdk-option[data-destructive="true"] { color: ${sT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${H}; }
.oc-sdk-popup-empty { color: ${H}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${A_}; border-radius: 4px; color: ${d}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(d,60,A_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${A_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${__}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${RS} }
.oc-sdk-check-desc { color: ${H}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(d,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${H}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${d}; }
.oc-sdk-tab[aria-selected="true"] { color: ${iT}; background: ${nT}; border-color: ${A_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${P_}; background: var(--oc-sdk-raised-bg); ${TE} }
.oc-sdk-tab-count { color: ${H}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(d,6)}; color: ${H}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${h}; }
.oc-sdk-row[aria-selected="true"] { background: ${nT}; color: ${iT}; }
.oc-sdk-row-lead { font-family: ${tT}; color: ${H}; }
.oc-sdk-row-sub { color: ${H}; }
.oc-sdk-row-meta { color: ${H}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${H}; }

.oc-sdk-empty-body { color: ${H}; }

.oc-sdk-spinner { color: ${H}; }
.oc-sdk-spinner-ring { border-color: ${A_}; border-top-color: ${e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${H}; }

.oc-sdk-separator { color: ${H}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(A_,40)}; }

.oc-sdk-progress-label { color: ${H}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(d,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${e}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${rT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(A_,60)}; }
`,y=`
${WT}
${mS}
${GS}`;var XS=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"qna",name:"问与答"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]},{id:"news",name:"国内新闻",channels:[{id:"hot",name:"要闻"}]},{id:"weibo",name:"微博",channels:[{id:"hot",name:"热搜"}]},{id:"douyin",name:"抖音",channels:[{id:"hot",name:"热点"}]}];var IT=[],PS=()=>{let _=document.querySelector("#msg2");if(_&&IT.length>0)_.innerHTML=`<div class="err">${IT.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{IT.push("页面错误："+String(_.message??_)),PS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,O=S?.code;IT.push("未处理异常"+(O?` [${O}]`:"")+"："+String(S?.message??S)),PS()});var uS=["toutiao","weibo","douyin"],lS=["news"],AT=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],aS=180000,oS=12,CS=30,nS=3,q=aT(),WS=document.querySelector("#app");if(!WS)throw Error("Missing #app");WS.innerHTML=`
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
.nrow.read .tt{opacity:.45}
.nrow.read .xp{opacity:.3}
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
</div>`;var p=(_)=>document.querySelector(`#${_}`),iS=p("cname"),RT=p("topics"),MT=p("catchips"),rS="v0.12.0-rebang";iS.textContent="阅读";document.querySelector("#build").textContent=rS;var Y_="",x=[],E_=[],O_=0,OE=!1,n=0,r=new Map,j_=!1,U_="",x_=0,IE=0,w_=!1,LS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},RE=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),B_=async(_)=>{try{return await q.storage.get(_)}catch{return}},GT=async(_,S)=>{try{await q.storage.set(_,S)}catch{}},QS="moyu:feed",UE=48000,sS=async()=>{try{let _=x.map((U)=>[U.community,U.id,U.title,U.author,U.channel,U.replies,U.time,U.url,U.excerpt??""]),S=JSON.stringify({at:O_,failed:E_,rows:_}),O=Math.max(1,Math.ceil(S.length/UE));await q.storage.set(QS,{at:O_,failed:E_,parts:O});let R=[];for(let U=0;U<O;U++)R.push(S.slice(U*UE,(U+1)*UE));await Promise.all(R.map((U,C)=>q.storage.set(`moyu:feed:p${C}`,U)));for(let U=O;U<O+4;U++)try{await q.storage.delete(`moyu:feed:p${U}`)}catch{}}catch{}},tS=async()=>{try{let _=await B_(QS);if(!_||typeof _.at!=="number"||typeof _.parts!=="number")return!1;let S=_.parts;if(S<1||S>40)return!1;let O=[];for(let U=0;U<S;U++){let C=await B_(`moyu:feed:p${U}`);if(typeof C!=="string")return!1;O.push(C)}let R=JSON.parse(O.join(""));if(typeof R.at!=="number"||!Array.isArray(R.rows)||R.rows.length===0)return!1;return O_=R.at,E_=Array.isArray(R.failed)?R.failed:[],x=R.rows.map((U)=>({community:U[0],id:String(U[1]??""),title:String(U[2]??""),author:String(U[3]??""),avatar:null,channel:typeof U[4]==="string"?U[4]:null,replies:typeof U[5]==="number"?U[5]:null,time:typeof U[6]==="number"?U[6]:null,url:String(U[7]??""),excerpt:typeof U[8]==="string"&&U[8]?U[8]:null})).filter((U)=>U.title&&U.id),x.length>0}catch{return!1}},ME=async(_,S,O)=>{let R=S;if(Y_&&_==="GET"&&R.startsWith("/"))R+=(R.includes("?")?"&":"?")+`proxy=${encodeURIComponent(Y_)}`;return q.serviceRequest({method:_,path:R,body:O})};var eS=(_)=>{if(MT.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=U_===""?"on":"",S.onclick=()=>{U_="",S_()},MT.appendChild(S);for(let O of _){let R=document.createElement("button"),U=x.filter((C)=>r.get(M_(C))===O).length;R.textContent=`${O} ${U}`,R.className=U_===O?"on":"",R.onclick=()=>{U_=U_===O?"":O,S_()},MT.appendChild(R)}},M_=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,YS="moyu:read",DS=800,Q_=new Set,L_=[],AE=null,_O=(_)=>{let S=0;for(let O of _)S=S*31+O.codePointAt(0)>>>0;return S.toString(36)},BS=(_)=>`${_.community}:${_O(_.title)}`,TO=(_)=>{let S=BS(_);if(Q_.has(S))return;if(Q_.add(S),L_.push(S),L_.length>DS){let O=L_.splice(0,L_.length-DS);for(let R of O)Q_.delete(R)}if(!AE)AE=setTimeout(()=>{AE=null,GT(YS,L_)},1000)},S_=()=>{let _=[...new Set(x.map((P)=>r.get(M_(P))).filter((P)=>!!P))],S=AT.filter((P)=>_.includes(P));eS(S);let O=O_>0?(()=>{let P=new Date(O_);return`${P.getHours()}:${String(P.getMinutes()).padStart(2,"0")}`})():"",R=w_?` · 分类 ${x_}/${IE}`:"";p("tcount").textContent=x.length>0?`${x.length}${O?` · 更新 ${O}`:""}${R}`:O?`更新 ${O}`:"";let U=document.querySelector("#srcerr");if(U)U.textContent=E_.length>0?`暂不可用：${E_.join("、")}（多为对侧限流，过一会儿点↻再试）`:"";RT.innerHTML="";let C=U_?[U_]:S.length>0?S:[""];for(let P of C){if(!U_&&P){let D=document.createElement("div");D.className="cathead",D.textContent=P,RT.appendChild(D)}for(let D of x){if(P&&r.get(M_(D))!==P)continue;let Q=document.createElement("div");Q.className="nrow"+(Q_.has(BS(D))?" read":"");let z=D.excerpt?`<br><span class="xp">${RE(D.excerpt)}</span>`:"";Q.innerHTML=`<span class="tt">${RE(D.title)}${z}</span>`,Q.onmouseenter=()=>{TO(D),Q.classList.add("read")};let K=document.createElement("button");K.className="aibtn",K.title="AI 总结这篇",K.textContent="✦",K.onclick=()=>void EO(D,Q,K),Q.appendChild(K),RT.appendChild(Q)}}},VS=()=>{let _=Object.fromEntries(r),S=Object.keys(_);if(S.length>1000)_=Object.fromEntries(S.slice(-1000).map((O)=>[O,_[O]]));GT("moyu:cats",_)},GE=async(_)=>{if(j_)return;let S=x.filter((U)=>!r.has(M_(U)));if(IE=S.length,x_=0,w_=S.length>0,S_(),S.length===0)return;let O=0,R=async()=>{while(!0){if(_!==n||j_)return;let U=O;if(O+=CS,U>=S.length)return;let C=S.slice(U,U+CS);try{let P=C.map((K,j)=>`${j}. ${K.title}`).join(`
`).slice(0,3500),D=await q.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${AT.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:320});if(_!==n||j_)return;let Q=[];for(let K of D.text.split(`
`)){let j=/^\s*(?:[-*•]\s*)?(?:\*\*|__)?\s*(\d+)\s*(?:\*\*|__)?\s*[.、:：)）]\s*(.+?)\s*$/.exec(K);if(!j)continue;let w=j[2].replace(/[*`]/g,"").trim(),i=AT.find((s)=>w.startsWith(s))??AT.find((s)=>w.includes(s));Q[Number(j[1])]=i??"其他"}if(Q.filter(Boolean).length<Math.ceil(C.length*0.6))for(let K of C)r.set(M_(K),"其他");else C.forEach((K,j)=>r.set(M_(K),Q[j]??"其他"));VS()}catch(P){let D=P?.code;if(D==="NO_MODEL"||D==="MODEL_FAILED"){j_=!0,w_=!1,LS(RE(D==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),S_();return}for(let Q of C)r.set(M_(Q),"其他")}if(x_=Math.min(S.length,x_+C.length),_!==n)return;S_()}};if(await Promise.all(Array.from({length:Math.min(nS,S.length)},()=>R())),_===n)w_=!1,VS(),S_()},NS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/在浏览器中查看原文/g,"").split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),EO=async(_,S,O)=>{let R=S.querySelector(".aisum");if(R){R.remove();return}let U=`moyu:csum:${_.community}:${_.id}`;O.disabled=!0;let C=O.textContent;O.textContent="…";try{let P=await B_(U),D=typeof P==="string"&&P?P:"";if(!D){let z="";if(lS.includes(_.community)&&_.excerpt&&_.excerpt.length>=30)z=_.excerpt.slice(0,2500);else{let K=await ME("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),j=JSON.parse(K.body);if(!j.ok||!j.thread)throw Error(j.error??"正文失败");let w=j.thread;z=[w.opening?NS(w.opening.html):"",...w.posts.map((i)=>NS(i.html))].filter(Boolean).join(`
`).slice(0,3500)}if(!z){if(!uS.includes(_.community))throw Error("这篇没有可总结的正文");let K="";try{let j=await ME("GET",`/search?q=${encodeURIComponent(_.title)}`),w=JSON.parse(j.body);if(w.ok&&w.results&&w.results.length>0){let i=w.results.slice(0,5).map((l,K_)=>`${K_+1}. 「${l.title}」${l.snippet}${l.site?`（${l.site}）`:""}`).join(`
`).slice(0,2500);K=(await q.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${i}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(K)D=K+"（联网版）";else{if(D=(await q.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!D)throw Error("小模型没有返回总结");D+="（标题版）"}}else if(D=(await q.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${z}`,maxOutputTokens:256})).text.trim().slice(0,500),!D)throw Error("小模型没有返回总结");await GT(U,D)}let Q=document.createElement("div");Q.className="aisum",Q.textContent=`✦ ${D}`,S.appendChild(Q)}catch(P){let D=P?.code,Q=D==="NO_MODEL"?"无可用小模型":D==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",z=document.createElement("div");z.className="aisum",z.textContent=`总结失败：${Q}`,S.appendChild(z)}finally{O.disabled=!1,O.textContent=C}},XT=async(_=!1)=>{if(OE||document.hidden)return;if(!_&&Date.now()-O_<aS&&x.length>0)return;OE=!0;let S=++n;try{let O=XS.flatMap((U)=>U.channels.map((C)=>({c:U,ch:C})));if(x=[],E_=[],p("tcount").textContent=`加载中 0/${O.length}`,RT.innerHTML="",MT.innerHTML="",await Promise.all(O.map(async({c:U,ch:C})=>{try{let P=_?"&force=1":"",D=await ME("GET",`/list?community=${U.id}&channel=${encodeURIComponent(C.id)}${P}`),Q=JSON.parse(D.body);if(!Q.ok)throw Error(Q.error??"列表失败");if(S!==n)return;let z=(Q.topics??[]).slice(0,oS);if(x.push(...z),S!==n)return;p("tcount").textContent=`加载中 ${x.length} · 已回 ${O.length-E_.length}/${O.length}`,S_()}catch{if(S!==n)return;if(!E_.includes(U.name))E_.push(U.name)}})),S!==n)return;O_=Date.now();let R=new Set;x=x.filter((U)=>{let C=U.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!C||R.has(C))return!1;return R.add(C),!0}),sS(),LS(""),S_(),GE(S)}finally{OE=!1}};p("b-refresh").onclick=()=>{O_=0,XT(!0)};p("b-clearcache").onclick=async()=>{let _=p("cfg-out");_.textContent="正在清空 AI 缓存…";try{let O=(await q.storage.keys()).filter((R)=>/^moyu:(cat|csum|cats)(:|$)/.test(R));await Promise.all(O.map((R)=>q.storage.delete(R).catch(()=>{return}))),r.clear(),j_=!1,x_=0,IE=0,w_=!1,_.textContent=`已清 ${O.length} 条，正在用当前模型重算分类…`,GE(++n),await q.toast({kind:"success",message:`已清空 AI 缓存（${O.length} 条）`})}catch(S){_.textContent=`清空失败：${S instanceof Error?S.message:"未知错误"}`}};p("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){p("cfg-out").textContent="格式不对，要 http(s)://host:port";return}Y_=_,await GT("moyu:proxy",Y_),p("cfg-out").textContent="已保存，正在测试…",O_=0,await XT(!0),p("cfg-out").textContent=x.length>0?`连通（${x.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")XT(!0);else if(_.key==="q")q.close()});var UT=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(UT++,UT>=2)UT=0,q.close();setTimeout(()=>UT=0,500)}});var SO=async()=>{Y_=await B_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=Y_};q.onReady((_)=>{oT(_,document.documentElement)});(async()=>{await SO();try{let _=await B_(YS);if(Array.isArray(_))for(let R of _){if(typeof R!=="string"||Q_.has(R))continue;Q_.add(R),L_.push(R)}let S=await B_("moyu:cats");if(S&&typeof S==="object"){for(let[R,U]of Object.entries(S))if(typeof U==="string")r.set(R,U)}if(await tS()){S_(),GE(++n);return}}catch{}XT(!1)})();})();
