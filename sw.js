/* RITUAIS service worker: push + notification click; no sensitive browser data cached. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
 let data={};try{data=event.data?.json()||{};}catch{data={body:event.data?.text()||''};}
 const activity=['work','train','food','sleep'].includes(data.activity)?data.activity:'work';
 const title=String(data.title||'RITUAIS — Lembrete').slice(0,100);
 const body=String(data.body||'Você programou um ritual preparatório.').slice(0,350);
 event.waitUntil(self.registration.showNotification(title,{body,icon:'./icon-192.png',badge:'./icon-192.png',tag:'rituais-'+String(data.id||Date.now()),data:{activity,strategy:String(data.strategy||'')},renotify:false}));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const activity=event.notification.data?.activity||'work';
 const target=new URL('./?briefing=1&activity='+encodeURIComponent(activity)+'&strategy='+encodeURIComponent(String(event.notification.data?.strategy||'')),self.registration.scope).href;
 event.waitUntil((async()=>{
  const all=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of all){if(client.url.startsWith(self.registration.scope)){await client.navigate(target);return client.focus();}}
  return self.clients.openWindow(target);
 })());
});
