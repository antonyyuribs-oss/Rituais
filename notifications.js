/* RITUAIS Web Push client. Only reminders + technical subscription go to Supabase;
   records, moods, notes, and full backup remain in the browser. */
(()=>{
 'use strict';
 const KEY='rituais_push_session_v13';
 const ACTIVE='rituais_push_enabled_v13';
 const conf=()=>window.RITUAIS_PUSH_CONFIG||{};
 const isReady=()=>{const c=conf();return /^https:\/\/[\w-]+\.supabase\.co\/?$/.test(c.supabaseUrl)&&!!c.publishableKey&&!!c.vapidPublicKey;};
 const url=()=>conf().supabaseUrl.replace(/\/$/,'');
 const j=async(r)=>{const data=await r.json().catch(()=>({}));if(!r.ok)throw Error(data.msg||data.message||data.error_description||data.error||`HTTP ${r.status}`);return data;};
 const headers=(token)=>({'apikey':conf().publishableKey,...(token?{'Authorization':`Bearer ${token}`}:{ }),'Content-Type':'application/json'});
 let syncing=null,pending=null;
 const readSession=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch{return null;}};
 const saveSession=s=>{localStorage.setItem(KEY,JSON.stringify(s));return s;};
 async function session(){
   if(!isReady())throw Error('Configure push-config.js e o Supabase antes de ativar.');
   let s=readSession();const now=Math.floor(Date.now()/1000);
   if(s?.access_token&&(s.expires_at||0)>now+90)return s;
   if(s?.refresh_token){
     try{const r=await fetch(url()+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:headers(),body:JSON.stringify({refresh_token:s.refresh_token})});s=saveSession(await j(r));return s;}
     catch(e){localStorage.removeItem(KEY);}
   }
   // Anonymous sign-ins must be enabled in Supabase Auth settings.
   const r=await fetch(url()+'/auth/v1/signup',{method:'POST',headers:headers(),body:JSON.stringify({data:{}})});
   s=await j(r);if(!s.access_token||!s.user?.id)throw Error('Não foi criada uma sessão anônima. Ative o login anônimo no Supabase.');
   return saveSession(s);
 }
 async function rest(path,method='GET',body=null){
  const s=await session();const r=await fetch(url()+'/rest/v1/'+path,{method,headers:{...headers(s.access_token),'Prefer':'resolution=merge-duplicates,return=minimal'},body:body===null?undefined:JSON.stringify(body)});
  if(!r.ok){const d=await r.json().catch(()=>({}));throw Error(d.message||`Banco HTTP ${r.status}`);}
  return r;
 }
 function rawKey(base64){const text=atob(base64.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-base64.length%4)%4));return Uint8Array.from(text,c=>c.charCodeAt(0));}
 function subscriptionSupported(){return 'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window&&window.isSecureContext;}
 async function subscribe(){
   const worker=await navigator.serviceWorker.register('./sw.js',{scope:'./'});
   const ready=await navigator.serviceWorker.ready;
   let sub=await ready.pushManager.getSubscription();
   if(!sub)sub=await ready.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:rawKey(conf().vapidPublicKey)});
   return sub;
 }
 async function enable(briefings){
  // MUST request permission during the actual button gesture (before awaiting anything).
  if(!isReady())throw Error('Notificações aguardam configuração do Supabase. Consulte o README.');
  if(!subscriptionSupported())throw Error('Este navegador não oferece Web Push. No iPhone, adicione o site à Tela de Início (iOS 16.4+).');
  const permission=Notification.permission==='granted'?'granted':await Notification.requestPermission();
  if(permission!=='granted')throw Error('Permissão negada. Verifique Ajustes > Notificações.');
  const sub=await subscribe();
  await rest('push_subscriptions?on_conflict=user_id%2Cendpoint','POST',[{user_id:(await session()).user.id,endpoint:sub.endpoint,subscription:sub.toJSON()}]);
  localStorage.setItem(ACTIVE,'1');
  await sync(briefings);
  return true;
 }
 function upcoming(briefings){
  const now=Date.now(),out=[],datePattern=/^\d{4}-\d\d-\d\d$/;
  for(const b of briefings||[]){
   if(!datePattern.test(b.date))continue;
   for(const [aid,sec] of Object.entries(b.activities||{})){
    if(!['work','train','food','sleep'].includes(aid))continue;
    for(const st of sec.strategies||[]){
     if(!st.notify||st.done||!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(st.time||''))continue;
     const dt=new Date(b.date+'T'+st.time+':00');
     if(!Number.isFinite(dt.getTime())||dt.getTime()<now+25000)continue;
     out.push({scheduled_at:dt.toISOString(),activity_id:aid,strategy_text:String(st.text||'').slice(0,300),client_strategy_id:st.id});
    }
   }
  }
  return out.slice(0,150);
 }
 async function sync(briefings){
  if(localStorage.getItem(ACTIVE)!=='1'||!isReady())return false;
  if(syncing){pending=briefings;return syncing;}
  syncing=(async()=>{
   const worker=await navigator.serviceWorker.ready,sub=await worker.pushManager.getSubscription();
   if(!sub)throw Error('Inscrição push não encontrada neste dispositivo. Ative novamente.');
   const s=await session();
   await rest('push_subscriptions?on_conflict=user_id%2Cendpoint','POST',[{user_id:s.user.id,endpoint:sub.endpoint,subscription:sub.toJSON()}]);
   // Cancel pending reminders only for this specific user/device.
   await rest('push_reminders?device_endpoint=eq.'+encodeURIComponent(sub.endpoint)+'&status=eq.pending','DELETE');
   const entries=upcoming(briefings).map(x=>({user_id:s.user.id,device_endpoint:sub.endpoint,...x,status:'pending'}));
   if(entries.length)await rest('push_reminders','POST',entries);
   return true;
  })();
  try{return await syncing;}finally{syncing=null;if(pending){const latest=pending;pending=null;queueSync(latest);}}
 }
 let timer;
 function queueSync(briefings){if(localStorage.getItem(ACTIVE)!=='1')return;clearTimeout(timer);timer=setTimeout(()=>sync(briefings).catch(e=>{window.dispatchEvent(new CustomEvent('rituais-push-error',{detail:e.message}));}),900);}
 async function disable(){
  const worker=await navigator.serviceWorker.ready;const sub=await worker.pushManager.getSubscription();
  if(sub){await rest('push_reminders?device_endpoint=eq.'+encodeURIComponent(sub.endpoint)+'&status=eq.pending','DELETE');await rest('push_subscriptions?endpoint=eq.'+encodeURIComponent(sub.endpoint),'DELETE');await sub.unsubscribe();}
  localStorage.removeItem(ACTIVE);
 }
 window.RituaisPush={enable,disable,sync,queueSync,enabled:()=>localStorage.getItem(ACTIVE)==='1',ready:isReady,upcoming};
})();
