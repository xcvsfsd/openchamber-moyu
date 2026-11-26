(()=>{var Q="openchamber.sdk",Y=1;var WT=`
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
`;function ZE(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(R)=>{let U=R.target===_?E:R.target;if(!(U instanceof Element))return;if(!U.hasAttribute("data-oc-scrolling"))U.setAttribute("data-oc-scrolling","");let V=O.get(U);if(V!==void 0)clearTimeout(V);O.set(U,setTimeout(()=>{O.delete(U),U.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var FS=`(${ZE.toString()})(document);`;var LT=128,QT=65536;var m_=128;var c_=65536;var YT=8000,BT=192000,KT=120000;var $E=(_)=>{let E=[],O=0,R=0;return{push:(U)=>{E.push(U),R+=U.length;while(R-O>_&&E.length>1){let V=E.shift();R-=V?.length??0,O=0}},pull:(U)=>{let V=0;while(V<U.length&&E.length>0){let C=E[0],I=Math.min(U.length-V,C.length-O);if(U.set(C.subarray(O,O+I),V),V+=I,O+=I,O>=C.length)E.shift(),R-=C.length,O=0}U.fill(0,V)},clear:()=>{E.length=0,O=0,R=0},get size(){return R-O}}};var HE=/^[a-z][a-z0-9-]{0,39}$/;var FE=(_)=>Object(_)===_&&!Array.isArray(_),ZT=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),zE=(_)=>String(_)===_&&_.length>=1&&_.length<=60,JE=(_)=>String(_)===_&&_.length>=1&&_.length<=80,kE=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!FE(O)||!HE.test(O.id)||!zE(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!ZT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!ZT(O,["kind","id","label","value","options","disabled"]))return!1;if(!JE(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let R=new Set;for(let U of O.options){if(!FE(U)||!ZT(U,["value","label"])||!JE(U.value)||!zE(U.label)||R.has(U.value))return!1;R.add(U.value)}if(!R.has(O.value))return!1}return!0};var fE=["{id}","{segment}","{segments+}"];var QO=new Set(fE);var jE=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var BO=new Set(jE);var v_=20000000,d_=256;var $T=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,xE=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var wE=/^[A-Za-z0-9_-]{1,80}$/;var bE=["left","right","top","bottom"];var qE=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let R=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let U of R)if(!qE(U,E+1,O))return!1;return!0},FT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(FT);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(FT)}return String(_)===_||Number.isFinite(_)},zT=(_)=>{try{if(String(_.id)!==_.id||!wE.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!bE.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!qE(_.data)||!FT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var HT=2000;var gE=["file","directory","other","missing"],kT=(_)=>Boolean(_&&"sessionId"in _),fT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var hE=/^[0-9a-f]{7,64}$/i,jT=(_)=>hE.test(_),p_=500,u_=32000,mE=16000,cE=128,vE=200,dE=2000,pE=16000,uE=80,lE=200,aE=16000;var oE=2000;var xT=20000,l_=1024,a_=2000000;var o_=64000,n_=8000,wT=4000;var bT=960000;var nE=999,iE=1e4,k_=500,rE=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],sE=["stopped","starting","ready","failed"],JS=new Set(rE),tE=(_)=>JS.has(_),eE=(_)=>_&&tE(_)?_:"HOST_REJECTED",D_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(D_);if(Object(_)===_)return Object.values(_).every(D_);return!1},_S=(_)=>D_(_)&&JSON.stringify(_).length<=aE,yE=(_)=>_?.trim().slice(0,lE)??"",V_=(_)=>{let E=_.id.trim().slice(0,cE),O=_.title.trim().slice(0,vE),R=_.url.trim().slice(0,dE),U=_.text?.trim().slice(0,pE),V=_.author?.trim().slice(0,uE),C=_.kind==="pull"?"pull":"issue",I={providerId:_.providerId.trim(),id:E,title:O||E,url:R,kind:C};if(U)I.text=U;if(V)I.author=V;if(C==="pull"){let W=yE(_.branches?.head),Z=yE(_.branches?.base);if(W&&Z)I.branches={head:W,base:Z}}if(_S(_.data))I.data=_.data;return I},qT=(_)=>{let E=V_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},yT=(_)=>{let E={text:_.text.trim().slice(0,mE)};if(_.send)E.send=!0;return E},gT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(nE,Math.max(0,Math.round(_)))},hT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(iE,Math.max(0,Math.ceil(_)))};var N_=(_)=>_.length>0&&_.length<=l_&&!_.includes("\x00")&&!_.includes("\\");var i_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>oE)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},HS=new Set(sE),mT=(_)=>Boolean(_&&"status"in _&&HS.has(String(_.status))&&!("body"in _)),r_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),cT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),vT=(_)=>Boolean(_&&"written"in _&&_.written===!0),dT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),kS=new Set(gE),pT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&kS.has(String(_.kind))&&Number.isFinite(_.size)),uT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),fS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),jS=(_)=>Object(_)===_?_:null,JT=(_)=>String(_)===_&&_.length>0,xS=(_)=>{if(!JT(_.id))return null;if(_.ok===!0){let E={channel:Q,v:Y,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&JT(_.error))return{channel:Q,v:Y,type:"result",id:_.id,ok:!1,error:_.error,code:eE(JT(_.code)?_.code:void 0)};return null},lT=(_)=>{let E=jS(_);if(!E||E.channel!==Q||E.v!==Y)return null;if(E.type==="result")return xS(E);if(!fS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var TS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),wS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class X extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var ES=()=>Promise.reject(new X("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),s_=()=>Promise.reject(new X("BAD_PATH",`File path must be 1 to ${l_} characters without NUL or backslash.`)),t_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new X("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},P=(_)=>{return _.value+=1,`oc-${_.value}`},aT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new X("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),R=_.requestTimeoutMs??xT,U=new Set,V=new Set,C=new Set,I=new Set,W=new Set,Z=new Set,L=new Set,J=new Set,x=new Set,i=new Set,s=new Set,l=new Set,K_=[],Z_=null,$_=null,b_=new Set,q_=new Set,F_=null,z_=null,CT=!1,I_=new Map,G_=new Map,X_=new Map,a=!1,N={value:0},D=null,t=null,J_=!1,H_=!1,XE=null,v=null,CE=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},g=(T)=>{E.parent.postMessage(T,"*")},DE=()=>{if(a||E.parent===E||l.size===0||D?.features?.lateGenerateResults!==!0)return;g({channel:Q,v:Y,type:"generate-late-listen"})},$=(T,S)=>{for(let G of T)try{G(S)}catch(M){console.error(M)}},VE=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=lT(T.data);if(!S)return;if(S.type==="workspace"){let M=G_.get(S.payload.subscriptionId);if(M)$([M],S.payload.snapshot);return}if(S.type==="shells"){let M=X_.get(S.payload.subscriptionId);if(M)$([M],S.payload.snapshot);return}if(S.type==="microphone-audio"){v?.queue.push(S.payload.samples);return}if(S.type==="microphone-ended"){let M=v;if(!M)return;v=null,M.release(),$(M.endedListeners,S.payload.reason);return}if(S.type==="ready"){if(D=S.payload,t=CE(S.payload.session),$(U,S.payload),$(V,S.payload.directory),$(C,S.payload.session),t)$(I,t);if($(W,S.payload.connection),$(Z,S.payload.settings),$(L,S.payload.item),S.payload.block)$(J,S.payload.block);DE();return}if(S.type==="service-event"){$(x,S.payload);return}if(S.type==="generate-late"){if(l.size===0)K_.push(S.payload);else $(l,S.payload);return}if(S.type==="directory"){if(D)D={...D,directory:S.payload.directory};$(V,S.payload.directory);return}if(S.type==="session"){if(D)D={...D,session:S.payload.session};if(!S.payload.session)t=null;else if(t?.sessionId!==S.payload.session.id)t=CE(S.payload.session);$(C,S.payload.session);return}if(S.type==="session-lifecycle"){t=S.payload,$(I,S.payload);return}if(S.type==="connection"){if(D)D={...D,connection:S.payload.connection};$(W,S.payload.connection);return}if(S.type==="settings"){if(D)D={...D,settings:S.payload.settings};$(Z,S.payload.settings);return}if(S.type==="item"){if(D)D={...D,item:S.payload.item};$(L,S.payload.item);return}if(S.type==="status-control-event"){$(i,S.payload);return}if(S.type==="popover-closed"){$(s,S.payload);return}if(S.type==="action"){let M=(K)=>{if(!a)g({channel:Q,v:Y,type:"action-result",id:S.id,payload:K})},B=$_;if(!B){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>B(S.payload)).then(()=>M({ok:!0}),(K)=>{let F=(K instanceof Error?K.message:String(K)).trim();M({ok:!1,error:(F||"Action failed.").slice(0,k_)})});return}if(S.type==="file-open"){let M=S.payload;if(z_&&xE(z_,M))return;z_=M,$(b_,S.payload);return}if(S.type==="file-saved"){$(q_,S.payload.version);return}if(S.type==="file-snapshot"){let M=(F)=>{if(!a)g({channel:Q,v:Y,type:"file-snapshot-result",id:S.id,payload:F})},B=(F)=>M({error:(F.trim()||"Could not read the edited file.").slice(0,k_)}),K=F_;if(!K){B("This extension does not edit files.");return}Promise.resolve().then(()=>K(S.payload.purpose)).then((F)=>{if($T(F)>v_){B(`The file is over ${v_} ${"bytes"in F?"bytes":"characters"}.`);return}if(F.version.length>d_){B(`The snapshot version is over ${d_} characters.`);return}M({snapshot:"bytes"in F?{bytes:F.bytes,version:F.version}:{content:F.content,version:F.version}})},(F)=>B(F instanceof Error?F.message:String(F)));return}if(S.type==="resolve"){let M=(K)=>{g({channel:Q,v:Y,type:"resolve-result",id:S.id,payload:K})},B=Z_;if(!B){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>B(S.payload)).then((K)=>M({item:K?V_(K):null}),(K)=>{let F=(K instanceof Error?K.message:String(K)).trim();M({error:(F||"Command failed.").slice(0,k_)})});return}let G=I_.get(S.id);if(!G)return;if(clearTimeout(G.timer),I_.delete(S.id),S.ok){G.resolve(S.payload);return}G.reject(new X(S.code,S.error))};E.addEventListener("message",VE),g({channel:Q,v:Y,type:"hello"});let b=(T,S=R)=>{if(a||E.parent===E)return Promise.reject(new X("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((G,M)=>{let B=setTimeout(()=>{I_.delete(T.id),M(new X("HOST_TIMEOUT","Host did not answer in time."))},S);I_.set(T.id,{resolve:G,reject:M,timer:B}),g(T)})},j=(T)=>b(T).then(()=>{return}),H={channel:Q,v:Y},DT=(T)=>{if(!a&&E.parent!==E)g(T)},NE=()=>DT({...H,type:"file-save"}),VT=()=>{if(!a&&E.parent!==E)g({...H,type:"microphone-close",id:P(N)})},ZS=async()=>{if(v)throw new X("HOST_REJECTED","The microphone is already open in this frame.");if(D?.features?.microphone!==!0)throw new X("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let T=globalThis.AudioContext;if(typeof T!=="function")throw new X("UNSUPPORTED","This frame has no Web Audio.");let S=new T;if(S.sampleRate<YT||S.sampleRate>BT)throw S.close().catch(()=>{return}),new X("UNSUPPORTED",`Audio at ${S.sampleRate} Hz is not supported.`);let G=S.state==="suspended"?S.resume().catch(()=>{return}):void 0,M=$E(Math.round(S.sampleRate/4)),B=S.createScriptProcessor(1024,1,1);B.onaudioprocess=(u)=>M.pull(u.outputBuffer.getChannelData(0));let K=S.createMediaStreamDestination();B.connect(K);let F=new Set,C_={queue:M,endedListeners:F,release:()=>{B.onaudioprocess=null,B.disconnect(),M.clear();for(let u of K.stream.getTracks())u.stop();S.close().catch(()=>{return})}};v=C_;try{let u=await b({...H,type:"microphone-open",id:P(N),payload:{sampleRate:S.sampleRate}},KT);if(!u||!("opened"in u)||u.opened!==!0)throw new X("HOST_REJECTED","Host did not open the microphone.");if(await G,v!==C_)throw new X("DISCONNECTED","The microphone closed while it was opening.")}catch(u){if(v===C_)v=null;throw C_.release(),VT(),u}return{stream:K.stream,close:()=>{if(v!==C_)return;v=null,C_.release(),VT()},onEnded:(u)=>{return F.add(u),()=>{F.delete(u)}}}},PE=(T)=>{if(!TS(T)||!wS(T))return;T.preventDefault(),NE()},WE=(T)=>{if(!TS(T)||T.key!=="Escape"||D?.surface!=="popover"||!D.popover)return;T.preventDefault(),BE(D.popover.id,"escape").catch(()=>{return})},y_=()=>{let T=D?.surface==="popover"?D.popover:void 0;if(!T)return;let S=J_||H_;if(XE===S)return;XE=S,KE(T.id,S).catch(()=>{return})},g_=()=>{if(D?.surface!=="popover"||J_)return;J_=!0,y_()},LE=(T)=>{if(D?.surface!=="popover"||T.relatedTarget!==null||!J_)return;J_=!1,y_()},QE=()=>{if(D?.surface!=="popover"||H_)return;H_=!0,y_()},YE=()=>{if(D?.surface!=="popover"||!H_)return;H_=!1,y_()},o=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new X("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},NT=async(T)=>{if(T.kind!=="projects")o(T.projectId);let S=await b({...H,type:"workspace-read",id:P(N),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new X("HOST_REJECTED","Host did not return workspace data.");return S},PT=async(T,S)=>{if(T.kind!=="projects")o(T.projectId);let G=P(N);G_.set(G,S);try{await j({...H,type:"workspace-subscribe",id:P(N),payload:{subscriptionId:G,query:T}})}catch(M){if(G_.delete(G),!a)g({...H,type:"workspace-unsubscribe",id:P(N),payload:{subscriptionId:G}});throw M}return()=>{if(!G_.delete(G)||a)return;g({...H,type:"workspace-unsubscribe",id:P(N),payload:{subscriptionId:G}})}},$S=async(T,S)=>{if(T.kind==="session")o(T.sessionId);if(T.kind==="project")o(T.projectId);let G=P(N);X_.set(G,S);try{await j({...H,type:"shells-subscribe",id:P(N),payload:{subscriptionId:G,scope:T}})}catch(M){if(X_.delete(G),!a)g({...H,type:"shells-unsubscribe",id:P(N),payload:{subscriptionId:G}});throw M}return()=>{if(!X_.delete(G)||a)return;g({...H,type:"shells-unsubscribe",id:P(N),payload:{subscriptionId:G}})}},h_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>LT))throw new X("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!D_(T.value))throw new X("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>QT)throw new X("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&D?.features?.deviceStorage!==!0)throw new X("UNSUPPORTED","This host does not support device storage.");let S=await b({...H,type:"storage",id:P(N),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new X("HOST_REJECTED","Host did not return storage data.");return S},BE=(T,S)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new X("UNSUPPORTED","This host does not support popovers.")):j({...H,type:"popover-close",id:P(N),payload:S?{id:T,reason:S}:{id:T}}),KE=(T,S)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new X("UNSUPPORTED","This host does not support popovers.")):j({...H,type:"popover-anchor",id:P(N),payload:{id:T,active:S}});return E.addEventListener("keydown",WE,!0),E.addEventListener("pointerover",g_),E.addEventListener("pointermove",g_),E.addEventListener("pointerout",LE),E.addEventListener("focus",QE),E.addEventListener("blur",YE),{onAction:(T)=>{return $_=T,()=>{if($_===T)$_=null}},listProjects:async()=>{let T=await NT({kind:"projects"});if(T.kind!=="projects")throw new X("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await NT({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new X("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await NT({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new X("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>PT({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>PT({kind:"worktrees",projectId:T},(G)=>{if(G.kind==="worktrees")S(G)}),onSessions:(T,S)=>PT({kind:"sessions",projectId:T},(G)=>{if(G.kind==="sessions")S(G)}),onRunningShells:(T,S)=>$S(T,S),readShellOutput:async(T,S)=>{o(T,m_);let G=S?.cursor;if(G!==void 0&&(!Number.isInteger(G)||G<0))throw new X("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=S?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>c_))throw new X("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${c_}.`);let K=await b({...H,type:"shell-output",id:P(N),payload:{shellId:T,cursor:G,tailBytes:M}});if(!K||typeof K.output!=="string"||!Number.isFinite(K.cursor))throw new X("HOST_REJECTED","Host did not return shell output.");return K},stopShell:async(T)=>{if(o(T,m_),(await b({...H,type:"shell-stop",id:P(N),payload:{shellId:T}}))?.stopped!==!0)throw new X("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{o(T),await j({...H,type:"open-session",id:P(N),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let G=t_(S),M={op:"get",key:T};if(G)M.scope=G;let B=await h_(M);return B.op==="get"&&B.found?B.value:void 0},set:async(T,S,G)=>{let M=t_(G),B={op:"set",key:T,value:S};if(M)B.scope=M;await h_(B)},delete:async(T,S)=>{let G=t_(S),M={op:"delete",key:T};if(G)M.scope=G;await h_(M)},keys:async(T)=>{let S=t_(T),G={op:"keys"};if(S)G.scope=S;let M=await h_(G);if(M.op!=="keys")throw new X("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(U.add(T),D)T(D);return()=>{U.delete(T)}},onDirectory:(T)=>{if(V.add(T),D)T(D.directory);return()=>{V.delete(T)}},onSession:(T)=>{if(C.add(T),D)T(D.session);return()=>{C.delete(T)}},onSessionLifecycle:(T)=>{if(I.add(T),t)T(t);return()=>{I.delete(T)}},onConnection:(T)=>{if(W.add(T),D)T(D.connection);return()=>{W.delete(T)}},onSettings:(T)=>{if(Z.add(T),D)T(D.settings);return()=>{Z.delete(T)}},onItem:(T)=>{if(L.add(T),D)T(D.item);return()=>{L.delete(T)}},onBlock:(T)=>{if(J.add(T),D?.block)T(D.block);return()=>{J.delete(T)}},onServiceEvent:(T)=>{return x.add(T),()=>{x.delete(T)}},onStatusControl:(T)=>{return i.add(T),()=>{i.delete(T)}},onPopoverClosed:(T)=>{return s.add(T),()=>{s.delete(T)}},setStatusControls:(T)=>{if(D?.features?.statusControls!==!0)return Promise.reject(new X("UNSUPPORTED","This host does not support status controls."));if(!kE(T))return Promise.reject(new X("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return j({...H,type:"status-controls",id:P(N),payload:{controls:T}})},openPopover:(T)=>{if(D?.features?.popovers!==!0)return Promise.reject(new X("UNSUPPORTED","This host does not support popovers."));if(!zT(T))return Promise.reject(new X("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return j({...H,type:"popover-open",id:P(N),payload:T})},closePopover:BE,setPopoverAnchorActive:KE,onResolve:(T)=>{return Z_=T,()=>{if(Z_===T)Z_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>p_)return Promise.reject(new X("HOST_REJECTED",`Toast message must contain 1 to ${p_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>u_))return Promise.reject(new X("HOST_REJECTED",`Toast copy text must contain 1 to ${u_} characters.`));return j({channel:Q,v:Y,type:"toast",id:P(N),payload:{...T,message:S}})},openUrl:(T)=>j({channel:Q,v:Y,type:"open-url",id:P(N),payload:{url:T}}),openCommit:(T)=>jT(T)?j({channel:Q,v:Y,type:"open-commit",id:P(N),payload:{sha:T}}):Promise.reject(new X("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(T)=>j({channel:Q,v:Y,type:"block-answer",id:P(N),payload:{text:T.trim().slice(0,HT)}}),openSurface:(T)=>j({channel:Q,v:Y,type:"open-surface",id:P(N),payload:{surfaceId:T}}),writeClipboard:(T)=>j({channel:Q,v:Y,type:"clipboard-write",id:P(N),payload:{text:T}}),compose:(T)=>j({channel:Q,v:Y,type:"compose",id:P(N),payload:T}),attach:(T)=>j({channel:Q,v:Y,type:"attach",id:P(N),payload:V_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)o(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")o(S.directory);else{if(S.name!==void 0)o(S.name,200);if(S.baseBranch!==void 0)o(S.baseBranch,200)}let G=await b({channel:Q,v:Y,type:"start-session",id:P(N),payload:qT(T)},_.requestTimeoutMs??180000);if(!kT(G))throw new X("HOST_REJECTED","Host did not return a session.");return G},prompt:(T)=>b({channel:Q,v:Y,type:"prompt",id:P(N),payload:yT(T)}).then((S)=>{if(!fT(S))throw new X("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>j({channel:Q,v:Y,type:"session-link",id:P(N),payload:V_(T)}),close:()=>j({channel:Q,v:Y,type:"close",id:P(N)}),oauthStart:()=>j({channel:Q,v:Y,type:"oauth-start",id:P(N)}),oauthDisconnect:()=>j({channel:Q,v:Y,type:"oauth-disconnect",id:P(N)}),request:(T)=>(i_(T.path)?b({channel:Q,v:Y,type:"request",id:P(N),payload:T}):ES()).then((S)=>{if(!r_(S))throw new X("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(i_(T.path)?b({channel:Q,v:Y,type:"service-request",id:P(N),payload:T}):ES()).then((S)=>{if(!r_(S))throw new X("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>b({channel:Q,v:Y,type:"service-status",id:P(N)}).then((T)=>{if(!mT(T))throw new X("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(N_(T)?b({channel:Q,v:Y,type:"file-read",id:P(N),payload:{path:T}}):s_()).then((S)=>{if(!cT(S))throw new X("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!N_(T))return s_();if(S.length>a_)return Promise.reject(new X("FILE_TOO_LARGE",`Content is over ${a_} characters.`));return b({channel:Q,v:Y,type:"file-write",id:P(N),payload:{path:T,content:S}}).then((G)=>{if(!vT(G))throw new X("HOST_REJECTED","Host did not confirm the write.");return G})},listDir:(T)=>(N_(T)?b({channel:Q,v:Y,type:"file-list",id:P(N),payload:{path:T}}):s_()).then((S)=>{if(!dT(S))throw new X("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(N_(T)?b({channel:Q,v:Y,type:"file-stat",id:P(N),payload:{path:T}}):s_()).then((S)=>{if(!pT(S))throw new X("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),G=T.system?.trim();if(S.length===0||S.length>o_)return Promise.reject(new X("HOST_REJECTED",`Prompt must be 1 to ${o_} characters.`));if(G!==void 0&&(G.length===0||G.length>n_))return Promise.reject(new X("HOST_REJECTED",`System prompt must be 1 to ${n_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(wT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new X("HOST_REJECTED","maxOutputTokens must be a number."));let B={prompt:S};if(G!==void 0)B.system=G;if(M!==void 0)B.maxOutputTokens=M;return b({channel:Q,v:Y,type:"generate",id:P(N),payload:B},_.requestTimeoutMs??bT).then((K)=>{if(!uT(K))throw new X("HOST_REJECTED","Host did not return generated text.");return K})},onLateGenerateResult:(T)=>{l.add(T);for(let S of K_.splice(0))$([T],S);return DE(),()=>{l.delete(T)}},openMicrophone:ZS,setBadge:(T)=>j({channel:Q,v:Y,type:"badge",id:P(N),payload:{count:gT(T)}}),setHeight:(T)=>j({channel:Q,v:Y,type:"resize",id:P(N),payload:{height:hT(T)}}),onFileOpen:(T)=>{if(b_.add(T),!CT)CT=!0,E.addEventListener("keydown",PE,!0);if(z_)T(z_);return()=>{b_.delete(T)}},onFileSnapshot:(T)=>{return F_=T,()=>{if(F_===T)F_=null}},onFileSaved:(T)=>{return q_.add(T),()=>{q_.delete(T)}},reportFileChange:(T)=>DT({...H,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:NE,reportFileUnsupported:()=>DT({...H,type:"file-unsupported"}),dispose:()=>{for(let T of G_.keys())g({...H,type:"workspace-unsubscribe",id:P(N),payload:{subscriptionId:T}});G_.clear();for(let T of X_.keys())g({...H,type:"shells-unsubscribe",id:P(N),payload:{subscriptionId:T}});if(X_.clear(),v)VT(),v.release(),v=null;if(a=!0,Z_=null,$_=null,F_=null,b_.clear(),q_.clear(),CT)E.removeEventListener("keydown",PE,!0);E.removeEventListener("message",VE),E.removeEventListener("keydown",WE,!0),E.removeEventListener("pointerover",g_),E.removeEventListener("pointermove",g_),E.removeEventListener("pointerout",LE),E.removeEventListener("focus",QE),E.removeEventListener("blur",YE);for(let T of I_.values())clearTimeout(T.timer),T.reject(new X("HOST_UNAVAILABLE","Host client was disposed."));I_.clear(),U.clear(),V.clear(),C.clear(),I.clear(),W.clear(),Z.clear(),L.clear(),J.clear(),x.clear(),i.clear(),s.clear(),l.clear(),K_.length=0}}};var SS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var hO=new Set(SS);var OS=["none","agent","user"];var cO=new Set(OS);var bS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],qS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],US=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,R]of bS)E.style.setProperty(O,_.tokens[R]);for(let[O,R,U]of qS){let V=_.tokens[U]??"";E.style.setProperty(O,V),E.style.setProperty(R,V)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size",_.tokens.fontSize??"0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},oT=(_,E)=>{if(US(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var yS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},z=(_,E)=>`var(--${_}, var(--oc-${yS[_]}, ${E}))`,__=z("surface-background","transparent"),_T=z("surface-elevated","transparent"),P_=z("surface-elevated-foreground","inherit"),d=z("surface-foreground","inherit"),k=z("surface-muted-foreground","gray"),gS=z("surface-muted","transparent"),A_=z("interactive-border","currentColor"),h=z("interactive-hover","transparent"),R_=z("interactive-active","transparent"),nT=z("interactive-selection","transparent"),iT=z("interactive-selection-foreground","inherit"),e=z("primary","currentColor"),rT=z("primary-text","inherit"),sT=z("error-text","inherit"),hS=z("font-sans","inherit"),tT=z("font-mono","monospace"),IS=z("radius","9px"),eT=`calc(${IS} - 2px)`,AS=`calc(${IS} - 4px)`,f=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,RS=`background-image: linear-gradient(${h}, ${h});`,_E=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,TE="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",MS="box-shadow: var(--oc-sdk-lit);",EE=`inset 0 0.5px 0 0 ${f(d,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,mS=`
:root {
  --oc-sdk-edge: ${f(d,16)};
  --oc-sdk-field-bg: ${_T};
  --oc-sdk-raised-bg: ${__};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${f(d,14)};
  --oc-sdk-field-bg: ${f(__,50,_T)};
  --oc-sdk-raised-bg: ${_T};
  --oc-sdk-field-lift: ${EE};
  --oc-sdk-raised-lift: ${EE};
  --oc-sdk-lit: ${EE};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,e_=(_)=>{let E=z(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${z(`${_}-text`,"inherit")}; }`},A=(_)=>`calc(${_}rem / 14)`,cS=`
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
`,GS=`${mS}
.oc-sdk { color: ${d}; font-family: ${hS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${RS} }
.oc-sdk-mono { font-family: ${tT}; }
.oc-sdk-muted { color: ${k}; }
${e_("success")}${e_("warning")}${e_("error")}${e_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${e}; --oc-sdk-tone-text: ${rT}; }

.oc-sdk-btn { border-radius: ${eT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${AS}; }
.oc-sdk-btn[data-variant="default"] { color: ${rT}; background: ${f(e,10,__)}; border-color: ${f(e,12)}; ${MS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${f(e,16,__)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${f(e,22,__)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${gS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${R_}, ${R_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${P_}; ${TE} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${R_}, ${R_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${h}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${R_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${z("status-error","red")}; color: ${sT}; background: ${f("var(--oc-sdk-tone)",7,__)}; border-color: ${f("var(--oc-sdk-tone)",12)}; ${MS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${f("var(--oc-sdk-tone)",9,__)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${f("var(--oc-sdk-tone)",11,__)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${sT}; }
.oc-sdk-input { border-radius: ${eT}; background: var(--oc-sdk-field-bg); color: ${P_}; ${_E("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${_E(f(d,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${_E(z("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${tT}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${e}; }
.oc-sdk-search-clear { border-radius: ${AS}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${h}; color: ${d}; }

.oc-sdk-trigger { border-radius: ${eT}; background: var(--oc-sdk-raised-bg); color: ${P_}; ${TE} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${R_}, ${R_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${P_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${_T}; background-clip: padding-box; color: ${P_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${h}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${nT}; color: ${iT}; }
.oc-sdk-option-check { color: ${d}; }
.oc-sdk-option[data-destructive="true"] { color: ${sT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${f(z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${A_}; border-radius: 4px; color: ${d}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${f(d,60,A_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${A_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${__}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${RS} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${f(d,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${d}; }
.oc-sdk-tab[aria-selected="true"] { color: ${iT}; background: ${nT}; border-color: ${A_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${P_}; background: var(--oc-sdk-raised-bg); ${TE} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${f(d,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${f("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${h}; }
.oc-sdk-row[aria-selected="true"] { background: ${nT}; color: ${iT}; }
.oc-sdk-row-lead { font-family: ${tT}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${A_}; border-top-color: ${e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${f("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${f(A_,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${f(d,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${e}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${z("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${z("success-text","inherit")}; }

.oc-sdk-text a { color: ${rT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${f(A_,60)}; }
`,y=`
${WT}
${cS}
${GS}`;var XS=[{id:"linuxdo",name:"linux.do",channels:[{id:"latest",name:"最新"}]},{id:"v2ex",name:"V2EX",channels:[{id:"hot",name:"最热"},{id:"latest",name:"最新"},{id:"programmer",name:"程序员"},{id:"share",name:"分享发现"},{id:"qna",name:"问与答"}]},{id:"toutiao",name:"今日头条",channels:[{id:"hot",name:"热榜"}]},{id:"juejin",name:"掘金",channels:[{id:"hot",name:"热门"}]},{id:"ithome",name:"IT之家",channels:[{id:"hot",name:"资讯"}]},{id:"oschina",name:"开源中国",channels:[{id:"hot",name:"资讯"}]},{id:"solidot",name:"Solidot",channels:[{id:"hot",name:"资讯"}]},{id:"infoq",name:"InfoQ",channels:[{id:"hot",name:"推荐"}]},{id:"news",name:"国内新闻",channels:[{id:"hot",name:"要闻"}]},{id:"tech",name:"科技",channels:[{id:"hot",name:"热榜"}]},{id:"fin",name:"财经",channels:[{id:"hot",name:"热榜"}]},{id:"ent",name:"娱乐",channels:[{id:"hot",name:"热榜"}]},{id:"community",name:"社区",channels:[{id:"hot",name:"热帖"}]},{id:"dev",name:"开发",channels:[{id:"hot",name:"热榜"}]},{id:"shopping",name:"购物",channels:[{id:"hot",name:"热榜"}]},{id:"weibo",name:"微博",channels:[{id:"hot",name:"热搜"}]},{id:"douyin",name:"抖音",channels:[{id:"hot",name:"热点"}]}];var IT=[],WS=()=>{let _=document.querySelector("#msg2");if(_&&IT.length>0)_.innerHTML=`<div class="err">${IT.map((E)=>E).join("<br>")}</div>`};window.addEventListener("error",(_)=>{IT.push("页面错误："+String(_.message??_)),WS()});window.addEventListener("unhandledrejection",(_)=>{let E=_.reason,O=E?.code;IT.push("未处理异常"+(O?` [${O}]`:"")+"："+String(E?.message??E)),WS()});var lS=["toutiao","weibo","douyin"],aS=["news"],AT=["AI科技","数码","互联网","财经","时政","社会","娱乐","体育","汽车","房产","教育","健康","科学","游戏","其他"],oS=180000,nS=12,CS=30,iS=3,q=aT(),LS=document.querySelector("#app");if(!LS)throw Error("Missing #app");LS.innerHTML=`
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
</div>`;var p=(_)=>document.querySelector(`#${_}`),rS=p("cname"),RT=p("topics"),MT=p("catchips"),sS="v0.12.1-allboards";rS.textContent="阅读";document.querySelector("#build").textContent=sS;var Y_="",w=[],E_=[],O_=0,OE=!1,n=0,r=new Map,j_=!1,U_="",x_=0,IE=0,w_=!1,QS=(_)=>{let E=document.querySelector("#msg2");if(E)E.innerHTML=_?`<div class="err">${_}</div>`:""},RE=(_)=>_.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),B_=async(_)=>{try{return await q.storage.get(_)}catch{return}},GT=async(_,E)=>{try{await q.storage.set(_,E)}catch{}},YS="moyu:feed",UE=48000,tS=async()=>{try{let _=w.map((U)=>[U.community,U.id,U.title,U.author,U.channel,U.replies,U.time,U.url,U.excerpt??""]),E=JSON.stringify({at:O_,failed:E_,rows:_}),O=Math.max(1,Math.ceil(E.length/UE));await q.storage.set(YS,{at:O_,failed:E_,parts:O});let R=[];for(let U=0;U<O;U++)R.push(E.slice(U*UE,(U+1)*UE));await Promise.all(R.map((U,V)=>q.storage.set(`moyu:feed:p${V}`,U)));for(let U=O;U<O+4;U++)try{await q.storage.delete(`moyu:feed:p${U}`)}catch{}}catch{}},eS=async()=>{try{let _=await B_(YS);if(!_||typeof _.at!=="number"||typeof _.parts!=="number")return!1;let E=_.parts;if(E<1||E>40)return!1;let O=[];for(let U=0;U<E;U++){let V=await B_(`moyu:feed:p${U}`);if(typeof V!=="string")return!1;O.push(V)}let R=JSON.parse(O.join(""));if(typeof R.at!=="number"||!Array.isArray(R.rows)||R.rows.length===0)return!1;return O_=R.at,E_=Array.isArray(R.failed)?R.failed:[],w=R.rows.map((U)=>({community:U[0],id:String(U[1]??""),title:String(U[2]??""),author:String(U[3]??""),avatar:null,channel:typeof U[4]==="string"?U[4]:null,replies:typeof U[5]==="number"?U[5]:null,time:typeof U[6]==="number"?U[6]:null,url:String(U[7]??""),excerpt:typeof U[8]==="string"&&U[8]?U[8]:null})).filter((U)=>U.title&&U.id),w.length>0}catch{return!1}},ME=async(_,E,O)=>{let R=E;if(Y_&&_==="GET"&&R.startsWith("/"))R+=(R.includes("?")?"&":"?")+`proxy=${encodeURIComponent(Y_)}`;return q.serviceRequest({method:_,path:R,body:O})};var _O=(_)=>{if(MT.innerHTML="",_.length===0)return;let E=document.createElement("button");E.textContent="全部",E.className=U_===""?"on":"",E.onclick=()=>{U_="",S_()},MT.appendChild(E);for(let O of _){let R=document.createElement("button"),U=w.filter((V)=>r.get(M_(V))===O).length;R.textContent=`${O} ${U}`,R.className=U_===O?"on":"",R.onclick=()=>{U_=U_===O?"":O,S_()},MT.appendChild(R)}},M_=(_)=>`moyu:cat:${_.community}:${_.id}:${_.title.slice(0,30)}`,BS="moyu:read",DS=800,Q_=new Set,L_=[],AE=null,TO=(_)=>{let E=0;for(let O of _)E=E*31+O.codePointAt(0)>>>0;return E.toString(36)},KS=(_)=>`${_.community}:${TO(_.title)}`,EO=(_)=>{let E=KS(_);if(Q_.has(E))return;if(Q_.add(E),L_.push(E),L_.length>DS){let O=L_.splice(0,L_.length-DS);for(let R of O)Q_.delete(R)}if(!AE)AE=setTimeout(()=>{AE=null,GT(BS,L_)},1000)},SO=(_)=>_.toLowerCase().replace(/^[\s\d]+[.、)）]/,"").replace(/[#【】\[\]()（）《》「」…·。，,!！?？:：;；'"“”‘’\-—_/\\|~`\s]+/g,""),OO=(_)=>{let E=new Set;for(let O=0;O+1<_.length;O++)E.add(_.slice(O,O+2));return E},UO=(_,E)=>{if(_.size===0||E.size===0)return 0;let O=0;for(let R of _)if(E.has(R))O++;return O/(_.size+E.size-O)},VS=(_)=>(_.excerpt?.length??0)+(_.replies??0)*2+(_.time?1:0),AO=(_)=>{let E=_.map((C)=>SO(C.title)),O=E.map((C)=>OO(C)),R=[],U=[],V=new Set;for(let C=0;C<_.length;C++){let I=E[C];if(I.length<4||V.has(I))continue;let W=_[C],Z=-1;for(let L=0;L<R.length;L++){let J=R[L];if(W.url&&J.url===W.url){Z=L;break}let x=E[U[L]];if(I.length>=8&&Math.abs(x.length-I.length)<=12&&(x.includes(I)||I.includes(x))){Z=L;break}if(UO(O[C],O[U[L]])>=0.78){Z=L;break}}if(Z>=0){if(VS(W)>VS(R[Z]))R[Z]=W,U[Z]=C;continue}V.add(I),R.push(W),U.push(C)}return R},S_=()=>{let _=[...new Set(w.map((C)=>r.get(M_(C))).filter((C)=>!!C))],E=AT.filter((C)=>_.includes(C));_O(E);let O=O_>0?(()=>{let C=new Date(O_);return`${C.getHours()}:${String(C.getMinutes()).padStart(2,"0")}`})():"",R=w_?` · 分类 ${x_}/${IE}`:"";p("tcount").textContent=w.length>0?`${w.length}${O?` · 更新 ${O}`:""}${R}`:O?`更新 ${O}`:"";let U=document.querySelector("#srcerr");if(U)U.textContent=E_.length>0?`暂不可用：${E_.join("、")}（多为对侧限流，过一会儿点↻再试）`:"";RT.innerHTML="";let V=U_?[U_]:E.length>0?E:[""];for(let C of V){if(!U_&&C){let I=document.createElement("div");I.className="cathead",I.textContent=C,RT.appendChild(I)}for(let I of w){if(C&&r.get(M_(I))!==C)continue;let W=document.createElement("div");W.className="nrow"+(Q_.has(KS(I))?" read":"");let Z=I.excerpt?`<br><span class="xp">${RE(I.excerpt)}</span>`:"";W.innerHTML=`<span class="tt">${RE(I.title)}${Z}</span>`,W.onmouseenter=()=>{EO(I),W.classList.add("read")};let L=document.createElement("button");L.className="aibtn",L.title="AI 总结这篇",L.textContent="✦",L.onclick=()=>void RO(I,W,L),W.appendChild(L),RT.appendChild(W)}}},NS=()=>{let _=Object.fromEntries(r),E=Object.keys(_);if(E.length>1000)_=Object.fromEntries(E.slice(-1000).map((O)=>[O,_[O]]));GT("moyu:cats",_)},GE=async(_)=>{if(j_)return;let E=w.filter((U)=>!r.has(M_(U)));if(IE=E.length,x_=0,w_=E.length>0,S_(),E.length===0)return;let O=0,R=async()=>{while(!0){if(_!==n||j_)return;let U=O;if(O+=CS,U>=E.length)return;let V=E.slice(U,U+CS);try{let C=V.map((L,J)=>`${J}. ${L.title}`).join(`
`).slice(0,3500),I=await q.generate({system:`你是中文新闻分类器。把每条标题归入以下恰好一个分类：${AT.join("、")}。只输出每行“序号:分类”，无多余文字。`,prompt:C,maxOutputTokens:320});if(_!==n||j_)return;let W=[];for(let L of I.text.split(`
`)){let J=/^\s*(?:[-*•]\s*)?(?:\*\*|__)?\s*(\d+)\s*(?:\*\*|__)?\s*[.、:：)）]\s*(.+?)\s*$/.exec(L);if(!J)continue;let x=J[2].replace(/[*`]/g,"").trim(),i=AT.find((s)=>x.startsWith(s))??AT.find((s)=>x.includes(s));W[Number(J[1])]=i??"其他"}if(W.filter(Boolean).length<Math.ceil(V.length*0.6))for(let L of V)r.set(M_(L),"其他");else V.forEach((L,J)=>r.set(M_(L),W[J]??"其他"));NS()}catch(C){let I=C?.code;if(I==="NO_MODEL"||I==="MODEL_FAILED"){j_=!0,w_=!1,QS(RE(I==="NO_MODEL"?"无可用小模型，AI 分类关闭（列表照常）":"小模型出错，AI 分类暂停（列表照常）")),S_();return}for(let W of V)r.set(M_(W),"其他")}if(x_=Math.min(E.length,x_+V.length),_!==n)return;S_()}};if(await Promise.all(Array.from({length:Math.min(iS,E.length)},()=>R())),_===n)w_=!1,NS(),S_()},PS=(_)=>_.replace(/<br\s*\/?>/gi,`
`).replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/在浏览器中查看原文/g,"").split(`
`).map((E)=>E.trim()).filter(Boolean).join(`
`),RO=async(_,E,O)=>{let R=E.querySelector(".aisum");if(R){R.remove();return}let U=`moyu:csum:${_.community}:${_.id}`;O.disabled=!0;let V=O.textContent;O.textContent="…";try{let C=await B_(U),I=typeof C==="string"&&C?C:"";if(!I){let Z="";if(aS.includes(_.community)&&_.excerpt&&_.excerpt.length>=30)Z=_.excerpt.slice(0,2500);else{let L=await ME("GET",`/thread?community=${_.community}&id=${encodeURIComponent(_.id)}&page=1`),J=JSON.parse(L.body);if(!J.ok||!J.thread)throw Error(J.error??"正文失败");let x=J.thread;Z=[x.opening?PS(x.opening.html):"",...x.posts.map((i)=>PS(i.html))].filter(Boolean).join(`
`).slice(0,3500)}if(!Z){if(!lS.includes(_.community))throw Error("这篇没有可总结的正文");let L="";try{let J=await ME("GET",`/search?q=${encodeURIComponent(_.title)}`),x=JSON.parse(J.body);if(x.ok&&x.results&&x.results.length>0){let i=x.results.slice(0,5).map((l,K_)=>`${K_+1}. 「${l.title}」${l.snippet}${l.site?`（${l.site}）`:""}`).join(`
`).slice(0,2500);L=(await q.generate({system:"你是中文热点总结助手。根据多条搜索结果（标题+摘要），用2-4句话概括这件事的核心信息；只写多数来源一致的内容，不确定的加“据报道”；严禁编造；只输出总结。",prompt:`【${_.title}】
${i}`,maxOutputTokens:256})).text.trim().slice(0,500)}}catch{}if(L)I=L+"（联网版）";else{if(I=(await q.generate({system:"你是中文标题提炼助手。只根据帖子标题和版块信息，用一句话（不超过40字）概括它在讨论什么；严禁编造标题里没有的具体事实；只输出这一句话。",prompt:`【${_.title}】`,maxOutputTokens:64})).text.trim().slice(0,80),!I)throw Error("小模型没有返回总结");I+="（标题版）"}}else if(I=(await q.generate({system:"你是中文内容总结助手。根据给定的帖子内容，用2-4句话概括核心观点或结论；严禁编造原文没有的信息；只输出总结。",prompt:`【${_.title}】
${Z}`,maxOutputTokens:256})).text.trim().slice(0,500),!I)throw Error("小模型没有返回总结");await GT(U,I)}let W=document.createElement("div");W.className="aisum",W.textContent=`✦ ${I}`,E.appendChild(W)}catch(C){let I=C?.code,W=I==="NO_MODEL"?"无可用小模型":I==="MODEL_FAILED"?"小模型出错":C instanceof Error?C.message:"未知错误",Z=document.createElement("div");Z.className="aisum",Z.textContent=`总结失败：${W}`,E.appendChild(Z)}finally{O.disabled=!1,O.textContent=V}},XT=async(_=!1)=>{if(OE||document.hidden)return;if(!_&&Date.now()-O_<oS&&w.length>0)return;OE=!0;let E=++n;try{let O=XS.flatMap((R)=>R.channels.map((U)=>({c:R,ch:U})));if(w=[],E_=[],p("tcount").textContent=`加载中 0/${O.length}`,RT.innerHTML="",MT.innerHTML="",await Promise.all(O.map(async({c:R,ch:U})=>{try{let V=_?"&force=1":"",C=await ME("GET",`/list?community=${R.id}&channel=${encodeURIComponent(U.id)}${V}`),I=JSON.parse(C.body);if(!I.ok)throw Error(I.error??"列表失败");if(E!==n)return;let W=(I.topics??[]).slice(0,nS);if(w.push(...W),E!==n)return;p("tcount").textContent=`加载中 ${w.length} · 已回 ${O.length-E_.length}/${O.length}`,S_()}catch{if(E!==n)return;if(!E_.includes(R.name))E_.push(R.name)}})),E!==n)return;O_=Date.now(),w=AO(w),tS(),QS(""),S_(),GE(E)}finally{OE=!1}};p("b-refresh").onclick=()=>{O_=0,XT(!0)};p("b-clearcache").onclick=async()=>{let _=p("cfg-out");_.textContent="正在清空 AI 缓存…";try{let O=(await q.storage.keys()).filter((R)=>/^moyu:(cat|csum|cats)(:|$)/.test(R));await Promise.all(O.map((R)=>q.storage.delete(R).catch(()=>{return}))),r.clear(),j_=!1,x_=0,IE=0,w_=!1,_.textContent=`已清 ${O.length} 条，正在用当前模型重算分类…`,GE(++n),await q.toast({kind:"success",message:`已清空 AI 缓存（${O.length} 条）`})}catch(E){_.textContent=`清空失败：${E instanceof Error?E.message:"未知错误"}`}};p("b-save").onclick=async()=>{let _=document.querySelector("#cfg-proxy").value.trim();if(_&&!/^https?:\/\/.+/.test(_)){p("cfg-out").textContent="格式不对，要 http(s)://host:port";return}Y_=_,await GT("moyu:proxy",Y_),p("cfg-out").textContent="已保存，正在测试…",O_=0,await XT(!0),p("cfg-out").textContent=w.length>0?`连通（${w.length} 条）`:"仍失败，看列表上方红字（可能是代理地址不对或要认证）"};document.addEventListener("keydown",(_)=>{let E=_.target?.tagName;if(E==="TEXTAREA"||E==="INPUT"||E==="SELECT")return;if(_.altKey||_.ctrlKey||_.metaKey)return;if(_.key==="r")XT(!0);else if(_.key==="q")q.close()});var UT=0;document.addEventListener("keydown",(_)=>{if(_.key==="Escape"){if(UT++,UT>=2)UT=0,q.close();setTimeout(()=>UT=0,500)}});var MO=async()=>{Y_=await B_("moyu:proxy")??"",document.querySelector("#cfg-proxy").value=Y_};q.onReady((_)=>{oT(_,document.documentElement)});(async()=>{await MO();try{let _=await B_(BS);if(Array.isArray(_))for(let R of _){if(typeof R!=="string"||Q_.has(R))continue;Q_.add(R),L_.push(R)}let E=await B_("moyu:cats");if(E&&typeof E==="object"){for(let[R,U]of Object.entries(E))if(typeof U==="string")r.set(R,U)}if(await eS()){S_(),GE(++n);return}}catch{}XT(!1)})();})();
