window.SharedAvailability=(()=>{
 const key='roofSharedAvailabilityV1';
 const local=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
 const save=a=>localStorage.setItem(key,JSON.stringify(a));
 async function load(seed=[]){try{const r=await fetch('/api/availability',{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();if(d.availability?.length){save(d.availability);return d.availability}}catch{}const a=local();if(a.length)return a;save(seed);return seed}
 async function add(x){try{const r=await fetch('/api/availability',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(x)});if(r.ok)return (await r.json()).availability}catch{}const y={...x,id:'local-'+Date.now()};const a=local();a.push(y);save(a);return y}
 async function update(x){try{const r=await fetch('/api/availability',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(x)});if(r.ok)return (await r.json()).availability}catch{}const a=local().map(i=>String(i.id)===String(x.id)?x:i);save(a);return x}
 async function remove(id){try{const r=await fetch('/api/availability?id='+encodeURIComponent(id),{method:'DELETE'});if(r.ok)return true}catch{}save(local().filter(i=>String(i.id)!==String(id)));return true}
 return{load,add,update,remove};
})();
