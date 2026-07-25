const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});

const DEFAULT_MEMBERS = [
  {
    name:'James',
    role_zh:'房东／房地产从业者／演员',
    role_en:'Landlord / Property Professional / Actor',
    responsibilities_zh:'负责房东与房产相关角色、场地协调、房产题材，以及新加坡本地生活信息核实。',
    responsibilities_en:'Plays the landlord and property-related role, coordinates the main location, develops property storylines, and checks Singapore local-life details.',
    contact:'', member_type:'permanent', status:'active', is_core:1, permissions:'admin', sort_order:1, joined_at:''
  },
  {
    name:'Angeline',
    role_zh:'演员／项目策划',
    role_en:'Actor / Project Lead',
    responsibilities_zh:'饰演刚到新加坡的中国富二代留学生，负责项目方向、剧情框架、市场定位与中国观众视角。',
    responsibilities_en:'Plays a newly arrived wealthy Chinese international student and leads project direction, story structure, market positioning, and the China-audience perspective.',
    contact:'', member_type:'permanent', status:'active', is_core:1, permissions:'admin', sort_order:2, joined_at:''
  },
  {
    name:'Joseph',
    role_zh:'租客／社交媒体营销／演员',
    role_en:'Tenant / Social Media Marketer / Actor',
    responsibilities_zh:'负责社交媒体、内容创作、广告投放题材，以及项目后续内容传播与营销视角。',
    responsibilities_en:'Covers social media, content creation, paid advertising storylines, and the project’s ongoing distribution and marketing perspective.',
    contact:'', member_type:'permanent', status:'active', is_core:1, permissions:'admin', sort_order:3, joined_at:''
  }
];

async function seedDefaults(env){
  const statements = DEFAULT_MEMBERS.map(m => env.DB.prepare(`INSERT INTO team_members (name,role_zh,role_en,responsibilities_zh,responsibilities_en,contact,member_type,status,is_core,permissions,sort_order,joined_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
    m.name,m.role_zh,m.role_en,m.responsibilities_zh,m.responsibilities_en,m.contact,m.member_type,m.status,m.is_core,m.permissions,m.sort_order,m.joined_at
  ));
  await env.DB.batch(statements);
}

export async function onRequestGet({env}){
  try{
    let {results}=await env.DB.prepare('SELECT * FROM team_members ORDER BY is_core DESC, sort_order ASC, id ASC').all();
    if(!results || results.length===0){
      await seedDefaults(env);
      ({results}=await env.DB.prepare('SELECT * FROM team_members ORDER BY is_core DESC, sort_order ASC, id ASC').all());
    }
    return json({members:results||[]});
  }catch(e){return json({error:e.message},500)}
}
export async function onRequestPost({request,env}){try{const b=await request.json();const r=await env.DB.prepare(`INSERT INTO team_members (name,role_zh,role_en,responsibilities_zh,responsibilities_en,contact,member_type,status,is_core,permissions,sort_order,joined_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`).bind(b.name||'',b.role_zh||'',b.role_en||'',b.responsibilities_zh||'',b.responsibilities_en||'',b.contact||'',b.member_type||'permanent',b.status||'active',b.is_core?1:0,b.permissions||'view',Number(b.sort_order||0),b.joined_at||'').first();return json({member:r},201);}catch(e){return json({error:e.message},500)}}
export async function onRequestPut({request,env}){try{const b=await request.json();if(!b.id)return json({error:'id required'},400);const r=await env.DB.prepare(`UPDATE team_members SET name=?,role_zh=?,role_en=?,responsibilities_zh=?,responsibilities_en=?,contact=?,member_type=?,status=?,is_core=?,permissions=?,sort_order=?,joined_at=?,updated_at=CURRENT_TIMESTAMP WHERE id=? RETURNING *`).bind(b.name||'',b.role_zh||'',b.role_en||'',b.responsibilities_zh||'',b.responsibilities_en||'',b.contact||'',b.member_type||'permanent',b.status||'active',b.is_core?1:0,b.permissions||'view',Number(b.sort_order||0),b.joined_at||'',b.id).first();return json({member:r});}catch(e){return json({error:e.message},500)}}
export async function onRequestDelete({request,env}){try{const u=new URL(request.url);const id=Number(u.searchParams.get('id'));if(!id)return json({error:'id required'},400);await env.DB.prepare('DELETE FROM team_members WHERE id=?').bind(id).run();return json({ok:true});}catch(e){return json({error:e.message},500)}}
