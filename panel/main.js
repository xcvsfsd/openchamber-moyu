(()=>{var L="openchamber.sdk",W=1;var DT=`
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
`;function WE(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let A=new WeakMap;_.addEventListener("scroll",(I)=>{let O=I.target===_?S:I.target;if(!(O instanceof Element))return;if(!O.hasAttribute("data-oc-scrolling"))O.setAttribute("data-oc-scrolling","");let D=A.get(O);if(D!==void 0)clearTimeout(D);A.set(O,setTimeout(()=>{A.delete(O),O.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var WS=`(${WE.toString()})(document);`;var VT=128,NT=65536;var b_=128;var q_=65536;var PT=8000,LT=192000,WT=120000;var QE=(_)=>{let S=[],A=0,I=0;return{push:(O)=>{S.push(O),I+=O.length;while(I-A>_&&S.length>1){let D=S.shift();I-=D?.length??0,A=0}},pull:(O)=>{let D=0;while(D<O.length&&S.length>0){let P=S[0],X=Math.min(O.length-D,P.length-A);if(O.set(P.subarray(A,A+X),D),D+=X,A+=X,A>=P.length)S.shift(),I-=P.length,A=0}O.fill(0,D)},clear:()=>{S.length=0,A=0,I=0},get size(){return I-A}}};var BE=/^[a-z][a-z0-9-]{0,39}$/;var YE=(_)=>Object(_)===_&&!Array.isArray(_),QT=(_,S)=>Object.keys(_).every((A)=>S.includes(A)),KE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,$E=(_)=>String(_)===_&&_.length>=1&&_.length<=80,ZE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let A of _){if(!YE(A)||!BE.test(A.id)||!KE(A.label))return!1;if(A.disabled!==void 0&&A.disabled!==!0&&A.disabled!==!1)return!1;if(S.has(A.id))return!1;if(S.add(A.id),A.kind==="button"){if(!QT(A,["kind","id","label","disabled"]))return!1;continue}if(A.kind!=="select"||!QT(A,["kind","id","label","value","options","disabled"]))return!1;if(!$E(A.value)||!Array.isArray(A.options)||A.options.length<1||A.options.length>16)return!1;let I=new Set;for(let O of A.options){if(!YE(O)||!QT(O,["value","label"])||!$E(O.value)||!KE(O.label)||I.has(O.value))return!1;I.add(O.value)}if(!I.has(A.value))return!1}return!0};var FE=["{id}","{segment}","{segments+}"];var AO=new Set(FE);var zE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var RO=new Set(zE);var y_=20000000,g_=256;var YT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,JE=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let A=0;A<_.bytes.byteLength;A+=1)if(_.bytes[A]!==S.bytes[A])return!1;return!0};var fE=/^[A-Za-z0-9_-]{1,80}$/;var kE=["left","right","top","bottom"];var HE=(_,S=0,A={remaining:16000})=>{if(--A.remaining<0||S>=32)return!1;if(_===null)return!0;let I=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let O of I)if(!HE(O,S+1,A))return!1;return!0},KT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(KT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(KT)}return String(_)===_||Number.isFinite(_)},$T=(_)=>{try{if(String(_.id)!==_.id||!fE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!kE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!HE(_.data)||!KT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var ZT=2000;var xE=["file","directory","other","missing"],FT=(_)=>Boolean(_&&"sessionId"in _),zT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var wE=/^[0-9a-f]{7,64}$/i,JT=(_)=>wE.test(_),h_=500,m_=32000,bE=16000,qE=128,yE=200,gE=2000,hE=16000,mE=80,cE=200,dE=16000;var vE=2000;var fT=20000,c_=1024,d_=2000000;var v_=64000,p_=8000,kT=4000;var HT=960000;var pE=999,uE=1e4,J_=500,lE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],aE=["stopped","starting","ready","failed"],YS=new Set(lE),oE=(_)=>YS.has(_),nE=(_)=>_&&oE(_)?_:"HOST_REJECTED",N_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(N_);if(Object(_)===_)return Object.values(_).every(N_);return!1},iE=(_)=>N_(_)&&JSON.stringify(_).length<=dE,jE=(_)=>_?.trim().slice(0,cE)??"",P_=(_)=>{let S=_.id.trim().slice(0,qE),A=_.title.trim().slice(0,yE),I=_.url.trim().slice(0,gE),O=_.text?.trim().slice(0,hE),D=_.author?.trim().slice(0,mE),P=_.kind==="pull"?"pull":"issue",X={providerId:_.providerId.trim(),id:S,title:A||S,url:I,kind:P};if(O)X.text=O;if(D)X.author=D;if(P==="pull"){let K=jE(_.branches?.head),z=jE(_.branches?.base);if(K&&z)X.branches={head:K,base:z}}if(iE(_.data))X.data=_.data;return X},jT=(_)=>{let S=P_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},xT=(_)=>{let S={text:_.text.trim().slice(0,bE)};if(_.send)S.send=!0;return S},wT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(pE,Math.max(0,Math.round(_)))},bT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(uE,Math.max(0,Math.ceil(_)))};var L_=(_)=>_.length>0&&_.length<=c_&&!_.includes("\x00")&&!_.includes("\\");var u_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>vE)return!1;return!_.split("/").some((A)=>A==="."||A==="..")},KS=new Set(aE),qT=(_)=>Boolean(_&&"status"in _&&KS.has(String(_.status))&&!("body"in _)),l_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),yT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),gT=(_)=>Boolean(_&&"written"in _&&_.written===!0),hT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),$S=new Set(xE),mT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&$S.has(String(_.kind))&&Number.isFinite(_.size)),cT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),BS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),ZS=(_)=>Object(_)===_?_:null,BT=(_)=>String(_)===_&&_.length>0,FS=(_)=>{if(!BT(_.id))return null;if(_.ok===!0){let S={channel:L,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&BT(_.error))return{channel:L,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:nE(BT(_.code)?_.code:void 0)};return null},dT=(_)=>{let S=ZS(_);if(!S||S.channel!==L||S.v!==W)return null;if(S.type==="result")return FS(S);if(!BS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var rE=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),zS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class C extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var sE=()=>Promise.reject(new C("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),a_=()=>Promise.reject(new C("BAD_PATH",`File path must be 1 to ${c_} characters without NUL or backslash.`)),o_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new C("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},vT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new C("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let A=_.acceptSource??((T)=>T===S.parent),I=_.requestTimeoutMs??fT,O=new Set,D=new Set,P=new Set,X=new Set,K=new Set,z=new Set,$=new Set,E_=new Set,A_=new Set,v=new Set,U_=new Set,p=new Set,$_=[],I_=null,o=null,C_=new Set,H_=new Set,B_=null,Z_=null,MT=!1,G_=new Map,X_=new Map,D_=new Map,u=!1,V={value:0},G=null,i=null,F_=!1,z_=!1,UE=null,h=null,RE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},b=(T)=>{S.parent.postMessage(T,"*")},ME=()=>{if(u||S.parent===S||p.size===0||G?.features?.lateGenerateResults!==!0)return;b({channel:L,v:W,type:"generate-late-listen"})},B=(T,E)=>{for(let M of T)try{M(E)}catch(R){console.error(R)}},IE=(T)=>{if(!(T instanceof MessageEvent))return;if(!A(T.source))return;let E=dT(T.data);if(!E)return;if(E.type==="workspace"){let R=X_.get(E.payload.subscriptionId);if(R)B([R],E.payload.snapshot);return}if(E.type==="shells"){let R=D_.get(E.payload.subscriptionId);if(R)B([R],E.payload.snapshot);return}if(E.type==="microphone-audio"){h?.queue.push(E.payload.samples);return}if(E.type==="microphone-ended"){let R=h;if(!R)return;h=null,R.release(),B(R.endedListeners,E.payload.reason);return}if(E.type==="ready"){if(G=E.payload,i=RE(E.payload.session),B(O,E.payload),B(D,E.payload.directory),B(P,E.payload.session),i)B(X,i);if(B(K,E.payload.connection),B(z,E.payload.settings),B($,E.payload.item),E.payload.block)B(E_,E.payload.block);ME();return}if(E.type==="service-event"){B(A_,E.payload);return}if(E.type==="generate-late"){if(p.size===0)$_.push(E.payload);else B(p,E.payload);return}if(E.type==="directory"){if(G)G={...G,directory:E.payload.directory};B(D,E.payload.directory);return}if(E.type==="session"){if(G)G={...G,session:E.payload.session};if(!E.payload.session)i=null;else if(i?.sessionId!==E.payload.session.id)i=RE(E.payload.session);B(P,E.payload.session);return}if(E.type==="session-lifecycle"){i=E.payload,B(X,E.payload);return}if(E.type==="connection"){if(G)G={...G,connection:E.payload.connection};B(K,E.payload.connection);return}if(E.type==="settings"){if(G)G={...G,settings:E.payload.settings};B(z,E.payload.settings);return}if(E.type==="item"){if(G)G={...G,item:E.payload.item};B($,E.payload.item);return}if(E.type==="status-control-event"){B(v,E.payload);return}if(E.type==="popover-closed"){B(U_,E.payload);return}if(E.type==="action"){let R=(Y)=>{if(!u)b({channel:L,v:W,type:"action-result",id:E.id,payload:Y})},Q=o;if(!Q){R({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(E.payload)).then(()=>R({ok:!0}),(Y)=>{let Z=(Y instanceof Error?Y.message:String(Y)).trim();R({ok:!1,error:(Z||"Action failed.").slice(0,J_)})});return}if(E.type==="file-open"){let R=E.payload;if(Z_&&JE(Z_,R))return;Z_=R,B(C_,E.payload);return}if(E.type==="file-saved"){B(H_,E.payload.version);return}if(E.type==="file-snapshot"){let R=(Z)=>{if(!u)b({channel:L,v:W,type:"file-snapshot-result",id:E.id,payload:Z})},Q=(Z)=>R({error:(Z.trim()||"Could not read the edited file.").slice(0,J_)}),Y=B_;if(!Y){Q("This extension does not edit files.");return}Promise.resolve().then(()=>Y(E.payload.purpose)).then((Z)=>{if(YT(Z)>y_){Q(`The file is over ${y_} ${"bytes"in Z?"bytes":"characters"}.`);return}if(Z.version.length>g_){Q(`The snapshot version is over ${g_} characters.`);return}R({snapshot:"bytes"in Z?{bytes:Z.bytes,version:Z.version}:{content:Z.content,version:Z.version}})},(Z)=>Q(Z instanceof Error?Z.message:String(Z)));return}if(E.type==="resolve"){let R=(Y)=>{b({channel:L,v:W,type:"resolve-result",id:E.id,payload:Y})},Q=I_;if(!Q){R({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(E.payload)).then((Y)=>R({item:Y?P_(Y):null}),(Y)=>{let Z=(Y instanceof Error?Y.message:String(Y)).trim();R({error:(Z||"Command failed.").slice(0,J_)})});return}let M=G_.get(E.id);if(!M)return;if(clearTimeout(M.timer),G_.delete(E.id),E.ok){M.resolve(E.payload);return}M.reject(new C(E.code,E.error))};S.addEventListener("message",IE),b({channel:L,v:W,type:"hello"});let x=(T,E=I)=>{if(u||S.parent===S)return Promise.reject(new C("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((M,R)=>{let Q=setTimeout(()=>{G_.delete(T.id),R(new C("HOST_TIMEOUT","Host did not answer in time."))},E);G_.set(T.id,{resolve:M,reject:R,timer:Q}),b(T)})},H=(T)=>x(T).then(()=>{return}),J={channel:L,v:W},IT=(T)=>{if(!u&&S.parent!==S)b(T)},CE=()=>IT({...J,type:"file-save"}),CT=()=>{if(!u&&S.parent!==S)b({...J,type:"microphone-close",id:N(V)})},PS=async()=>{if(h)throw new C("HOST_REJECTED","The microphone is already open in this frame.");if(G?.features?.microphone!==!0)throw new C("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new C("UNSUPPORTED","This frame has no Web Audio.");let E=new T;if(E.sampleRate<PT||E.sampleRate>LT)throw E.close().catch(()=>{return}),new C("UNSUPPORTED",`Audio at ${E.sampleRate} Hz is not supported.`);let M=E.state==="suspended"?E.resume().catch(()=>{return}):void 0,R=QE(Math.round(E.sampleRate/4)),Q=E.createScriptProcessor(1024,1,1);Q.onaudioprocess=(d)=>R.pull(d.outputBuffer.getChannelData(0));let Y=E.createMediaStreamDestination();Q.connect(Y);let Z=new Set,V_={queue:R,endedListeners:Z,release:()=>{Q.onaudioprocess=null,Q.disconnect(),R.clear();for(let d of Y.stream.getTracks())d.stop();E.close().catch(()=>{return})}};h=V_;try{let d=await x({...J,type:"microphone-open",id:N(V),payload:{sampleRate:E.sampleRate}},WT);if(!d||!("opened"in d)||d.opened!==!0)throw new C("HOST_REJECTED","Host did not open the microphone.");if(await M,h!==V_)throw new C("DISCONNECTED","The microphone closed while it was opening.")}catch(d){if(h===V_)h=null;throw V_.release(),CT(),d}return{stream:Y.stream,close:()=>{if(h!==V_)return;h=null,V_.release(),CT()},onEnded:(d)=>{return Z.add(d),()=>{Z.delete(d)}}}},GE=(T)=>{if(!rE(T)||!zS(T))return;T.preventDefault(),CE()},XE=(T)=>{if(!rE(T)||T.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;T.preventDefault(),PE(G.popover.id,"escape").catch(()=>{return})},j_=()=>{let T=G?.surface==="popover"?G.popover:void 0;if(!T)return;let E=F_||z_;if(UE===E)return;UE=E,LE(T.id,E).catch(()=>{return})},x_=()=>{if(G?.surface!=="popover"||F_)return;F_=!0,j_()},DE=(T)=>{if(G?.surface!=="popover"||T.relatedTarget!==null||!F_)return;F_=!1,j_()},VE=()=>{if(G?.surface!=="popover"||z_)return;z_=!0,j_()},NE=()=>{if(G?.surface!=="popover"||!z_)return;z_=!1,j_()},l=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new C("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},GT=async(T)=>{if(T.kind!=="projects")l(T.projectId);let E=await x({...J,type:"workspace-read",id:N(V),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new C("HOST_REJECTED","Host did not return workspace data.");return E},XT=async(T,E)=>{if(T.kind!=="projects")l(T.projectId);let M=N(V);X_.set(M,E);try{await H({...J,type:"workspace-subscribe",id:N(V),payload:{subscriptionId:M,query:T}})}catch(R){if(X_.delete(M),!u)b({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:M}});throw R}return()=>{if(!X_.delete(M)||u)return;b({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:M}})}},LS=async(T,E)=>{if(T.kind==="session")l(T.sessionId);if(T.kind==="project")l(T.projectId);let M=N(V);D_.set(M,E);try{await H({...J,type:"shells-subscribe",id:N(V),payload:{subscriptionId:M,scope:T}})}catch(R){if(D_.delete(M),!u)b({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:M}});throw R}return()=>{if(!D_.delete(M)||u)return;b({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:M}})}},w_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>VT))throw new C("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!N_(T.value))throw new C("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>NT)throw new C("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&G?.features?.deviceStorage!==!0)throw new C("UNSUPPORTED","This host does not support device storage.");let E=await x({...J,type:"storage",id:N(V),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new C("HOST_REJECTED","Host did not return storage data.");return E},PE=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new C("UNSUPPORTED","This host does not support popovers.")):H({...J,type:"popover-close",id:N(V),payload:E?{id:T,reason:E}:{id:T}}),LE=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new C("UNSUPPORTED","This host does not support popovers.")):H({...J,type:"popover-anchor",id:N(V),payload:{id:T,active:E}});return S.addEventListener("keydown",XE,!0),S.addEventListener("pointerover",x_),S.addEventListener("pointermove",x_),S.addEventListener("pointerout",DE),S.addEventListener("focus",VE),S.addEventListener("blur",NE),{onAction:(T)=>{return o=T,()=>{if(o===T)o=null}},listProjects:async()=>{let T=await GT({kind:"projects"});if(T.kind!=="projects")throw new C("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await GT({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new C("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await GT({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new C("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>XT({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>XT({kind:"worktrees",projectId:T},(M)=>{if(M.kind==="worktrees")E(M)}),onSessions:(T,E)=>XT({kind:"sessions",projectId:T},(M)=>{if(M.kind==="sessions")E(M)}),onRunningShells:(T,E)=>LS(T,E),readShellOutput:async(T,E)=>{l(T,b_);let M=E?.cursor;if(M!==void 0&&(!Number.isInteger(M)||M<0))throw new C("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let R=E?.tailBytes;if(R!==void 0&&(!Number.isInteger(R)||R<1||R>q_))throw new C("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${q_}.`);let Y=await x({...J,type:"shell-output",id:N(V),payload:{shellId:T,cursor:M,tailBytes:R}});if(!Y||typeof Y.output!=="string"||!Number.isFinite(Y.cursor))throw new C("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async(T)=>{if(l(T,b_),(await x({...J,type:"shell-stop",id:N(V),payload:{shellId:T}}))?.stopped!==!0)throw new C("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{l(T),await H({...J,type:"open-session",id:N(V),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let M=o_(E),R={op:"get",key:T};if(M)R.scope=M;let Q=await w_(R);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,E,M)=>{let R=o_(M),Q={op:"set",key:T,value:E};if(R)Q.scope=R;await w_(Q)},delete:async(T,E)=>{let M=o_(E),R={op:"delete",key:T};if(M)R.scope=M;await w_(R)},keys:async(T)=>{let E=o_(T),M={op:"keys"};if(E)M.scope=E;let R=await w_(M);if(R.op!=="keys")throw new C("HOST_REJECTED","Expected storage keys.");return R.keys}},onReady:(T)=>{if(O.add(T),G)T(G);return()=>{O.delete(T)}},onDirectory:(T)=>{if(D.add(T),G)T(G.directory);return()=>{D.delete(T)}},onSession:(T)=>{if(P.add(T),G)T(G.session);return()=>{P.delete(T)}},onSessionLifecycle:(T)=>{if(X.add(T),i)T(i);return()=>{X.delete(T)}},onConnection:(T)=>{if(K.add(T),G)T(G.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(z.add(T),G)T(G.settings);return()=>{z.delete(T)}},onItem:(T)=>{if($.add(T),G)T(G.item);return()=>{$.delete(T)}},onBlock:(T)=>{if(E_.add(T),G?.block)T(G.block);return()=>{E_.delete(T)}},onServiceEvent:(T)=>{return A_.add(T),()=>{A_.delete(T)}},onStatusControl:(T)=>{return v.add(T),()=>{v.delete(T)}},onPopoverClosed:(T)=>{return U_.add(T),()=>{U_.delete(T)}},setStatusControls:(T)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new C("UNSUPPORTED","This host does not support status controls."));if(!ZE(T))return Promise.reject(new C("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return H({...J,type:"status-controls",id:N(V),payload:{controls:T}})},openPopover:(T)=>{if(G?.features?.popovers!==!0)return Promise.reject(new C("UNSUPPORTED","This host does not support popovers."));if(!$T(T))return Promise.reject(new C("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return H({...J,type:"popover-open",id:N(V),payload:T})},closePopover:PE,setPopoverAnchorActive:LE,onResolve:(T)=>{return I_=T,()=>{if(I_===T)I_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>h_)return Promise.reject(new C("HOST_REJECTED",`Toast message must contain 1 to ${h_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>m_))return Promise.reject(new C("HOST_REJECTED",`Toast copy text must contain 1 to ${m_} characters.`));return H({channel:L,v:W,type:"toast",id:N(V),payload:{...T,message:E}})},openUrl:(T)=>H({channel:L,v:W,type:"open-url",id:N(V),payload:{url:T}}),openCommit:(T)=>JT(T)?H({channel:L,v:W,type:"open-commit",id:N(V),payload:{sha:T}}):Promise.reject(new C("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>H({channel:L,v:W,type:"block-answer",id:N(V),payload:{text:T.trim().slice(0,ZT)}}),openSurface:(T)=>H({channel:L,v:W,type:"open-surface",id:N(V),payload:{surfaceId:T}}),writeClipboard:(T)=>H({channel:L,v:W,type:"clipboard-write",id:N(V),payload:{text:T}}),compose:(T)=>H({channel:L,v:W,type:"compose",id:N(V),payload:T}),attach:(T)=>H({channel:L,v:W,type:"attach",id:N(V),payload:P_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)l(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")l(E.directory);else{if(E.name!==void 0)l(E.name,200);if(E.baseBranch!==void 0)l(E.baseBranch,200)}let M=await x({channel:L,v:W,type:"start-session",id:N(V),payload:jT(T)},_.requestTimeoutMs??180000);if(!FT(M))throw new C("HOST_REJECTED","Host did not return a session.");return M},prompt:(T)=>x({channel:L,v:W,type:"prompt",id:N(V),payload:xT(T)}).then((E)=>{if(!zT(E))throw new C("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>H({channel:L,v:W,type:"session-link",id:N(V),payload:P_(T)}),close:()=>H({channel:L,v:W,type:"close",id:N(V)}),oauthStart:()=>H({channel:L,v:W,type:"oauth-start",id:N(V)}),oauthDisconnect:()=>H({channel:L,v:W,type:"oauth-disconnect",id:N(V)}),request:(T)=>(u_(T.path)?x({channel:L,v:W,type:"request",id:N(V),payload:T}):sE()).then((E)=>{if(!l_(E))throw new C("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(u_(T.path)?x({channel:L,v:W,type:"service-request",id:N(V),payload:T}):sE()).then((E)=>{if(!l_(E))throw new C("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>x({channel:L,v:W,type:"service-status",id:N(V)}).then((T)=>{if(!qT(T))throw new C("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(L_(T)?x({channel:L,v:W,type:"file-read",id:N(V),payload:{path:T}}):a_()).then((E)=>{if(!yT(E))throw new C("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!L_(T))return a_();if(E.length>d_)return Promise.reject(new C("FILE_TOO_LARGE",`Content is over ${d_} characters.`));return x({channel:L,v:W,type:"file-write",id:N(V),payload:{path:T,content:E}}).then((M)=>{if(!gT(M))throw new C("HOST_REJECTED","Host did not confirm the write.");return M})},listDir:(T)=>(L_(T)?x({channel:L,v:W,type:"file-list",id:N(V),payload:{path:T}}):a_()).then((E)=>{if(!hT(E))throw new C("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(L_(T)?x({channel:L,v:W,type:"file-stat",id:N(V),payload:{path:T}}):a_()).then((E)=>{if(!mT(E))throw new C("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),M=T.system?.trim();if(E.length===0||E.length>v_)return Promise.reject(new C("HOST_REJECTED",`Prompt must be 1 to ${v_} characters.`));if(M!==void 0&&(M.length===0||M.length>p_))return Promise.reject(new C("HOST_REJECTED",`System prompt must be 1 to ${p_} characters.`));let R=T.maxOutputTokens===void 0?void 0:Math.min(kT,Math.max(1,Math.floor(T.maxOutputTokens)));if(R!==void 0&&!Number.isFinite(R))return Promise.reject(new C("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:E};if(M!==void 0)Q.system=M;if(R!==void 0)Q.maxOutputTokens=R;return x({channel:L,v:W,type:"generate",id:N(V),payload:Q},_.requestTimeoutMs??HT).then((Y)=>{if(!cT(Y))throw new C("HOST_REJECTED","Host did not return generated text.");return Y})},onLateGenerateResult:(T)=>{p.add(T);for(let E of $_.splice(0))B([T],E);return ME(),()=>{p.delete(T)}},openMicrophone:PS,setBadge:(T)=>H({channel:L,v:W,type:"badge",id:N(V),payload:{count:wT(T)}}),setHeight:(T)=>H({channel:L,v:W,type:"resize",id:N(V),payload:{height:bT(T)}}),onFileOpen:(T)=>{if(C_.add(T),!MT)MT=!0,S.addEventListener("keydown",GE,!0);if(Z_)T(Z_);return()=>{C_.delete(T)}},onFileSnapshot:(T)=>{return B_=T,()=>{if(B_===T)B_=null}},onFileSaved:(T)=>{return H_.add(T),()=>{H_.delete(T)}},reportFileChange:(T)=>IT({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:CE,reportFileUnsupported:()=>IT({...J,type:"file-unsupported"}),dispose:()=>{for(let T of X_.keys())b({...J,type:"workspace-unsubscribe",id:N(V),payload:{subscriptionId:T}});X_.clear();for(let T of D_.keys())b({...J,type:"shells-unsubscribe",id:N(V),payload:{subscriptionId:T}});if(D_.clear(),h)CT(),h.release(),h=null;if(u=!0,I_=null,o=null,B_=null,C_.clear(),H_.clear(),MT)S.removeEventListener("keydown",GE,!0);S.removeEventListener("message",IE),S.removeEventListener("keydown",XE,!0),S.removeEventListener("pointerover",x_),S.removeEventListener("pointermove",x_),S.removeEventListener("pointerout",DE),S.removeEventListener("focus",VE),S.removeEventListener("blur",NE);for(let T of G_.values())clearTimeout(T.timer),T.reject(new C("HOST_UNAVAILABLE","Host client was disposed."));G_.clear(),O.clear(),D.clear(),P.clear(),X.clear(),K.clear(),z.clear(),$.clear(),E_.clear(),A_.clear(),v.clear(),U_.clear(),p.clear(),$_.length=0}}};var tE=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ZO=new Set(tE);var eE=["none","agent","user"];var zO=new Set(eE);var JS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],fS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],_S=(_,S)=>{S.style.colorScheme=_.mode;for(let[A,I]of JS)S.style.setProperty(A,_.tokens[I]);for(let[A,I,O]of fS){let D=_.tokens[O]??"";S.style.setProperty(A,D),S.style.setProperty(I,D)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},pT=(_,S)=>{if(_S(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var kS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(_,S)=>`var(--${_}, var(--oc-${kS[_]}, ${S}))`,s=F("surface-background","transparent"),i_=F("surface-elevated","transparent"),W_=F("surface-elevated-foreground","inherit"),m=F("surface-foreground","inherit"),f=F("surface-muted-foreground","gray"),HS=F("surface-muted","transparent"),R_=F("interactive-border","currentColor"),q=F("interactive-hover","transparent"),M_=F("interactive-active","transparent"),uT=F("interactive-selection","transparent"),lT=F("interactive-selection-foreground","inherit"),r=F("primary","currentColor"),aT=F("primary-text","inherit"),oT=F("error-text","inherit"),jS=F("font-sans","inherit"),nT=F("font-mono","monospace"),OS=F("radius","9px"),iT=`calc(${OS} - 2px)`,TS=`calc(${OS} - 4px)`,k=(_,S,A="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${A})`,ES=`background-image: linear-gradient(${q}, ${q});`,rT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,sT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",SS="box-shadow: var(--oc-sdk-lit);",tT=`inset 0 0.5px 0 0 ${k(m,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,xS=`
:root {
  --oc-sdk-edge: ${k(m,16)};
  --oc-sdk-field-bg: ${i_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(m,14)};
  --oc-sdk-field-bg: ${k(s,50,i_)};
  --oc-sdk-raised-bg: ${i_};
  --oc-sdk-field-lift: ${tT};
  --oc-sdk-raised-lift: ${tT};
  --oc-sdk-lit: ${tT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,n_=(_)=>{let S=F(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${F(`${_}-text`,"inherit")}; }`},U=(_)=>`calc(${_}rem / 14)`,wS=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${U(8)}; height: ${U(32)}; padding: 0 ${U(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${U(6)}; height: ${U(28)}; padding: 0 ${U(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${U(4)}; height: ${U(24)}; padding: 0 ${U(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${U(14)}; height: ${U(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${U(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${U(32)}; padding: 0 ${U(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${U(8)} ${U(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${U(34)}; padding-right: ${U(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${U(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${U(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${U(24)}; height: ${U(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${U(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${U(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${U(28)}; padding: 0 ${U(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${U(2)}; min-width: ${U(160)}; max-width: calc(100vw - ${U(16)}); max-height: min(${U(320)}, calc(100vh - ${U(16)})); overflow: auto; padding: ${U(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${U(2)} ${U(2)} ${U(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${U(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${U(8)}; width: 100%; padding: ${U(6)} ${U(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${U(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${U(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${U(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${U(14)}; height: ${U(14)}; margin-top: ${U(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${U(36)}; height: ${U(20)}; --oc-sdk-thumb-travel: ${U(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${U(2)}; left: ${U(2)}; width: ${U(16)}; height: ${U(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${U(2)}; padding: ${U(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${U(6)}; height: ${U(28)}; padding: 0 ${U(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${U(1)} ${U(6)}; font-size: ${U(11)}; font-weight: 500; line-height: ${U(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${U(8)}; width: 100%; padding: ${U(6)} ${U(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${U(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${U(16)} ${U(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${U(4)}; padding: ${U(40)} ${U(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${U(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${U(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${U(16)}; height: ${U(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${U(12)}; height: ${U(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${U(12)}; padding: ${U(8)} ${U(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${U(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${U(8)}; width: 100%; margin: ${U(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${U(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${U(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${U(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${U(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${U(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${U(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${U(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${U(36)}; height: ${U(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${U(44)}; }
  .oc-sdk-check { min-height: ${U(36)}; padding: ${U(8)} 0; }
}
`,AS=`${xS}
.oc-sdk { color: ${m}; font-family: ${jS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ES} }
.oc-sdk-mono { font-family: ${nT}; }
.oc-sdk-muted { color: ${f}; }
${n_("success")}${n_("warning")}${n_("error")}${n_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${aT}; }

.oc-sdk-btn { border-radius: ${iT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${TS}; }
.oc-sdk-btn[data-variant="default"] { color: ${aT}; background: ${k(r,10,s)}; border-color: ${k(r,12)}; ${SS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${HS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${W_}; ${sT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${M_}, ${M_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${q}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${M_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${oT}; background: ${k("var(--oc-sdk-tone)",7,s)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${SS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${f}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${oT}; }
.oc-sdk-input { border-radius: ${iT}; background: var(--oc-sdk-field-bg); color: ${W_}; ${rT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${f}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${rT(k(m,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${rT(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${nT}; }

.oc-sdk-search-icon { color: ${f}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${TS}; color: ${f}; }
.oc-sdk-search-clear:hover { background: ${q}; color: ${m}; }

.oc-sdk-trigger { border-radius: ${iT}; background: var(--oc-sdk-raised-bg); color: ${W_}; ${sT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${f}; }
.oc-sdk-trigger-chevron { color: ${f}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${W_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${i_}; background-clip: padding-box; color: ${W_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${q}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${uT}; color: ${lT}; }
.oc-sdk-option-check { color: ${m}; }
.oc-sdk-option[data-destructive="true"] { color: ${oT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${f}; }
.oc-sdk-popup-empty { color: ${f}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${R_}; border-radius: 4px; color: ${m}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(m,60,R_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${R_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ES} }
.oc-sdk-check-desc { color: ${f}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(m,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${f}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${m}; }
.oc-sdk-tab[aria-selected="true"] { color: ${lT}; background: ${uT}; border-color: ${R_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${W_}; background: var(--oc-sdk-raised-bg); ${sT} }
.oc-sdk-tab-count { color: ${f}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(m,6)}; color: ${f}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${q}; }
.oc-sdk-row[aria-selected="true"] { background: ${uT}; color: ${lT}; }
.oc-sdk-row-lead { font-family: ${nT}; color: ${f}; }
.oc-sdk-row-sub { color: ${f}; }
.oc-sdk-row-meta { color: ${f}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${f}; }

.oc-sdk-empty-body { color: ${f}; }

.oc-sdk-spinner { color: ${f}; }
.oc-sdk-spinner-ring { border-color: ${R_}; border-top-color: ${r}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${f}; }

.oc-sdk-separator { color: ${f}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(R_,40)}; }

.oc-sdk-progress-label { color: ${f}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(m,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${aT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(R_,60)}; }
`,w=`
${DT}
${wS}
${AS}`;var US=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"},{id:"top",name:"热门"},{id:"develop",name:"开发调优"},{id:"gossip",name:"搞七捻三"},{id:"resource",name:"资源荟萃"},{id:"welfare",name:"福利羊毛"},{id:"news",name:"前沿快讯"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"create",name:"分享创造"},{id:"qna",name:"问与答"},{id:"jobs",name:"酷工作"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]}];var UT=[],CS=()=>{let _=document.querySelector("#msg2");if(_&&UT.length>0)_.innerHTML=`<div class="err">${UT.map((S)=>S).join("<br>")}</div>`};window.addEventListener("error",(_)=>{UT.push("页面错误："+String(_.message??_)),CS()});window.addEventListener("unhandledrejection",(_)=>{let S=_.reason,A=S?.code;UT.push("未处理异常"+(A?` [${A}]`:"")+"："+String(S?.message??S)),CS()});var hS=["toutiao"],EE=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],mS=180000,cS=12,RS=30,dS=3,c=vT(),GS=document.querySelector("#app");if(!GS)throw Error("Missing #app");GS.innerHTML=`
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
</div>`;var a=(_)=>document.querySelector(`#${_}`),vS=a("cname"),ET=a("topics"),ST=a("catchips"),pS="v0.11.1-feedfix";vS.textContent="阅读";document.querySelector("#build").textContent=pS;var K_="",j=[],e=[],T_=0,_E=!1,n=0,O_=new Map,_T=!1,S_="",OT=0,XS=0,AT=!1,DS=(_)=>{let S=document.querySelector("#msg2");if(S)S.innerHTML=_?`<div class="err">${_}</div>`:""},SE=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),k_=async(_)=>{try{return await c.storage.get(_)}catch{return}},AE=async(_,S)=>{try{await c.storage.set(_,S)}catch{}},VS="moyu:feed",TE=48000,uS=async()=>{try{let _=j.map((O)=>[O.community,O.id,O.title,O.author,O.channel,O.replies,O.time,O.url,O.excerpt??""]),S=JSON.stringify({at:T_,failed:e,rows:_}),A=Math.max(1,Math.ceil(S.length/TE));await c.storage.set(VS,{at:T_,failed:e,parts:A});let I=[];for(let O=0;O<A;O++)I.push(S.slice(O*TE,(O+1)*TE));await Promise.all(I.map((O,D)=>c.storage.set(`moyu:feed:p${D}`,O)));for(let O=A;O<A+4;O++)try{await c.storage.delete(`moyu:feed:p${O}`)}catch{}}catch{}},lS=async()=>{try{let _=await k_(VS);if(!_||typeof _.at!=="number"||typeof _.parts!=="number")return!1;let S=_.parts;if(S<1||S>40)return!1;let A=[];for(let O=0;O<S;O++){let D=await k_(`moyu:feed:p${O}`);if(typeof D!=="string")return!1;A.push(D)}let I=JSON.parse(A.join(""));if(typeof I.at!=="number"||!Array.isArray(I.rows)||I.rows.length===0)return!1;return T_=I.at,e=Array.isArray(I.failed)?I.failed:[],j=I.rows.map((O)=>({community:O[0],id:String(O[1]??""),title:String(O[2]??""),author:String(O[3]??""),avatar:null,channel:typeof O[4]==="string"?O[4]:null,replies:typeof O[5]==="number"?O[5]:null,time:typeof O[6]==="number"?O[6]:null,url:String(O[7]??""),excerpt:typeof O[8]==="string"&&O[8]?O[8]:null})).filter((O)=>O.title&&O.id),j.length>0}catch{return!1}},OE=async(_,S,A)=>{let I=S;if(K_&&_==="GET"&&I.startsWith("/"))I+=(I.includes("?")?"&":"?")+`proxy=${encodeURIComponent(K_)}`;return c.serviceRequest({method:_,path:I,body:A})};var aS=(_)=>{if(ST.innerHTML="",_.length===0)return;let S=document.createElement("button");S.textContent="全部",S.className=S_===""?"on":"",S.onclick=()=>{S_="",__()},ST.appendChild(S);for(let A of _){let I=document.createElement("button"),O=j.filter((D)=>O_.get(Y_(D))===A).length;I.textContent=`${A} ${O}`,I.className=S_===A?"on":"",I.onclick=()=>{S_=S_===A?"":A,__()},ST.appendChild(I)}},Y_=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,__=()=>{let _=[...new Set(j.map((P)=>O_.get(Y_(P))).filter((P)=>!!P))],S=EE.filter((P)=>_.includes(P));aS(S);let A=T_>0?(()=>{let P=new Date(T_);return`${P.getHours()}:${String(P.getMinutes()).padStart(2,"0")}`})():"",I=AT?` · 分类 ${OT}/${XS}`:"";a("tcount").textContent=j.length>0?`${j.length}${A?` · 更新 ${A}`:""}${I}`:A?`更新 ${A}`:"";let O=document.querySelector("#srcerr");if(O)O.textContent=e.length>0?`暂不可用：${e.join("、")}（多为对侧限流，过一会儿点↻再试）`:"";ET.innerHTML="";let D=S_?[S_]:S.length>0?S:[""];for(let P of D){if(!S_&&P){let X=document.createElement("div");X.className="cathead",X.textContent=P,ET.appendChild(X)}for(let X of j){if(P&&O_.get(Y_(X))!==P)continue;let K=document.createElement("div");K.className="nrow";let z=X.excerpt?`<br><span class="xp">${SE(X.excerpt)}</span>`:"";K.innerHTML=`<span class="tt">${SE(X.title)}${z}</span>`;let $=document.createElement("button");$.className="aibtn",$.title="AI 总结这篇",$.textContent="✦",$.onclick=()=>void oS(X,K,$),K.appendChild($),ET.appendChild(K)}}},MS=()=>{let _=Object.fromEntries(O_),S=Object.keys(_);if(S.length>1000)_=Object.fromEntries(S.slice(-1000).map((A)=>[A,_[A]]));AE("moyu:cats",_)},NS=async(_)=>{if(_T)return;let S=j.filter((O)=>!O_.has(Y_(O)));if(XS=S.length,OT=0,AT=S.length>0,__(),S.length===0)return;let A=0,I=async()=>{while(!0){if(_!==n||_T)return;let O=A;if(A+=RS,O>=S.length)return;let D=S.slice(O,O+RS);try{let P=D.map((z,$)=>`${$}. ${z.title}`).join(`
`).slice(0,3500),X=await c.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${EE.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:P,maxOutputTokens:320});if(_!==n||_T)return;let K=[];for(let z of X.text.split(`
`)){let $=/^\s*(\d+)\s*[:：]\s*(\S+)/.exec(z);if(!$)continue;K[Number($[1])]=EE.includes($[2])?$[2]:"其他"}D.forEach((z,$)=>O_.set(Y_(z),K[$]??"其他")),MS()}catch(P){let X=P?.code;if(X==="NO_MODEL"||X==="MODEL_FAILED"){_T=!0,AT=!1,DS(SE(X==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),__();return}for(let K of D)O_.set(Y_(K),"其他")}if(OT=Math.min(S.length,OT+D.length),_!==n)return;__()}};if(await Promise.all(Array.from({length:Math.min(dS,S.length)},()=>I())),_===n)AT=!1,MS(),__()},IS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').split(`
`).map((S)=>S.trim()).filter(Boolean).join(`
`),oS=async(_,S,A)=>{let I=S.querySelector(".aisum");if(I){I.remove();return}let O=`moyu:csum:${_.community}:${_.id}`;A.disabled=!0;let D=A.textContent;A.textContent="…";try{let P=await k_(O),X=typeof P==="string"&&P?P:"";if(!X){let z=await OE("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),$=JSON.parse(z.body);if(!$.ok||!$.thread)throw Error($.error??"正文失败");let E_=$.thread,A_=[E_.opening?IS(E_.opening.html):"",...E_.posts.map((v)=>IS(v.html))].filter(Boolean).join(`
`).slice(0,3500);if(!A_){if(!hS.includes(_.community))throw Error("这篇没有可总结的正文");let v="";try{let U_=await OE("GET",`/search?q=${encodeURIComponent(_.title)}`),p=JSON.parse(U_.body);if(p.ok&&p.results&&p.results.length>0){let $_=p.results.slice(0,5).map((o,C_)=>`${C_+1}. 「${o.title}」${o.snippet}${o.site?`（${o.site}）`:""}`).join(`
`).slice(0,2500);v=(await c.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${$_}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(v)X=v+"（联网版）";else{if(X=(await c.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!X)throw Error("小模型没有返回总结");X+="（标题版）"}}else if(X=(await c.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${A_}`,maxOutputTokens:256})).text.trim().slice(0,500),!X)throw Error("小模型没有返回总结");await AE(O,X)}let K=document.createElement("div");K.className="aisum",K.textContent=`✦ ${X}`,S.appendChild(K)}catch(P){let X=P?.code,K=X==="NO_MODEL"?"无可用小模型":X==="MODEL_FAILED"?"小模型出错":P instanceof Error?P.message:"未知错误",z=document.createElement("div");z.className="aisum",z.textContent=`总结失败：${K}`,S.appendChild(z)}finally{A.disabled=!1,A.textContent=D}},RT=async(_=!1)=>{if(_E||document.hidden)return;if(!_&&Date.now()-T_<mS&&j.length>0)return;_E=!0;let S=++n;try{let A=US.flatMap((O)=>O.channels.map((D)=>({c:O,ch:D})));if(j=[],e=[],a("tcount").textContent=`加载中 0/${A.length}`,ET.innerHTML="",ST.innerHTML="",await Promise.all(A.map(async({c:O,ch:D})=>{try{let P=await OE("GET",`/list?community=${O.id}&channel=${encodeURIComponent(D.id)}`),X=JSON.parse(P.body);if(!X.ok)throw Error(X.error??"列表失败");if(S!==n)return;let K=(X.topics??[]).slice(0,cS);if(j.push(...K),S!==n)return;a("tcount").textContent=`加载中 ${j.length} · 已回 ${A.length-e.length}/${A.length}`,__()}catch{if(S!==n)return;if(!e.includes(O.name))e.push(O.name)}})),S!==n)return;T_=Date.now();let I=new Set;j=j.filter((O)=>{let D=O.title.replace(/[\s\p{P}]+/gu,"").toLowerCase();if(!D||I.has(D))return!1;return I.add(D),!0}),uS(),DS(""),__(),NS(S)}finally{_E=!1}};a("b-refresh").onclick=()=>{T_=0,RT(!0)};a("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){a("cfg-out").textContent="格式不对，要 http(s)://host:port";return}K_=_,await AE("moyu:proxy",K_),a("cfg-out").textContent="已保存，正在测试…",T_=0,await RT(!0),a("cfg-out").textContent=j.length>0?`连通（${j.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let S=_.target?.tagName;if(S==="TEXTAREA"||S==="INPUT"||S==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")RT(!0);else if(_.key==="q")c.close()});var TT=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(TT++,TT>=2)TT=0,c.close();setTimeout(()=>TT=0,500)}});var nS=async()=>{K_=await k_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=K_};c.onReady((_)=>{pT(_,document.documentElement)});(async()=>{await nS();try{let _=await k_("moyu:cats");if(_&&typeof _==="object"){for(let[A,I]of Object.entries(_))if(typeof I==="string")O_.set(A,I)}if(await lS()){__(),NS(++n);return}}catch{}RT(!0)})();})();
