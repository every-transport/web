/* Service worker: menampilkan notifikasi jadwal di Android dan membuka detail jadwal saat diketuk */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const id=(e.notification.data&&e.notification.data.bookingId)||'';
  e.waitUntil((async()=>{
    const list=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const c of list){
      if('focus' in c){await c.focus();if(id)c.postMessage({type:'open-booking',id:id});return;}
    }
    const url=id?'./admin.html?booking='+encodeURIComponent(id):'./admin.html';
    if(self.clients.openWindow)await self.clients.openWindow(url);
  })());
});
