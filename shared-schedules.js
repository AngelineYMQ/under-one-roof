window.SharedSchedules=(()=>{
 const key='roofSharedSchedulesV1';
 let loaded=false,loadPromise=null,memory=[];
 const local=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
 const save=a=>{memory=Array.isArray(a)?a:[];localStorage.setItem(key,JSON.stringify(memory));};
 const peek=()=>memory.length?memory.slice():local();
 async function load(seed=[],{force=false}={}){
  if(loaded&&!force)return peek();
  if(loadPromise&&!force)return loadPromise;
  loadPromise=(async()=>{
   try{
    const r=await fetch('/api/schedules',{cache:'no-store'});
    if(!r.ok)throw new Error('Schedule request failed');
    const d=await r.json();
    if(Array.isArray(d.schedules)){save(d.schedules);loaded=true;return peek();}
   }catch{}
   const cached=local();
   if(cached.length){save(cached);loaded=true;return peek();}
   save(seed);loaded=true;return peek();
  })();
  try{return await loadPromise;}finally{loadPromise=null;}
 }
 async function add(x){try{const r=await fetch('/api/schedules',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(x)});if(r.ok)return (await r.json()).schedule}catch{} const y={...x,id:'local-'+Date.now()};const a=local();a.unshift(y);save(a);return y}
 async function update(x){try{const r=await fetch('/api/schedules',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(x)});if(r.ok)return (await r.json()).schedule}catch{} const a=local().map(i=>String(i.id)===String(x.id)?x:i);save(a);return x}
 async function remove(id){try{const r=await fetch('/api/schedules?id='+encodeURIComponent(id),{method:'DELETE'});if(r.ok)return true}catch{} save(local().filter(i=>String(i.id)!==String(id)));return true}
 return{load,peek,add,update,remove};
})();
