window.SharedSchedules=(()=>{
 const key='roofSharedSchedulesV1';
 const local=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
 const save=a=>localStorage.setItem(key,JSON.stringify(a));
 async function load(seed=[]){try{const r=await fetch('/api/schedules',{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();if(d.schedules?.length){save(d.schedules);return d.schedules}}catch{} const a=local();if(a.length)return a;save(seed);return seed}
 async function add(x){try{const r=await fetch('/api/schedules',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(x)});if(r.ok)return (await r.json()).schedule}catch{} const y={...x,id:'local-'+Date.now()};const a=local();a.unshift(y);save(a);return y}
 async function update(x){try{const r=await fetch('/api/schedules',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(x)});if(r.ok)return (await r.json()).schedule}catch{} const a=local().map(i=>String(i.id)===String(x.id)?x:i);save(a);return x}
 async function remove(id){try{const r=await fetch('/api/schedules?id='+encodeURIComponent(id),{method:'DELETE'});if(r.ok)return true}catch{} save(local().filter(i=>String(i.id)!==String(id)));return true}
 return{load,add,update,remove};
})();
