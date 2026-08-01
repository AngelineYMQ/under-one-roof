window.EpisodeCore=(()=>{
 const STAGES=['development','writing','production','post','publishing'];
 const SUBSTATUSES={
  development:['idea','screening','story_development'],
  writing:['script_writing','review_changes','script_locked'],
  production:['shoot_preparation','shooting','assets_pending'],
  post:['ready_to_edit','rough_cut','revision','final_cut'],
  publishing:['ready_to_publish','published','reviewed']
 };
 const LABELS={
  zh:{
   stages:{development:'开发',writing:'写作',production:'制作',post:'后期',publishing:'发布'},
   sub:{idea:'灵感',screening:'待筛选',story_development:'故事开发',script_writing:'剧本编写',
    review_changes:'审核修改',script_locked:'剧本锁定',shoot_preparation:'拍摄准备',
    shooting:'拍摄中',assets_pending:'素材待整理',ready_to_edit:'待剪辑',rough_cut:'初剪',
    revision:'修改中',final_cut:'成片',ready_to_publish:'待发布',published:'已发布',reviewed:'已复盘'}
  },
  en:{
   stages:{development:'Development',writing:'Writing',production:'Production',post:'Post',publishing:'Publishing'},
   sub:{idea:'Idea',screening:'Screening',story_development:'Story Development',script_writing:'Script Writing',
    review_changes:'Review Changes',script_locked:'Script Locked',shoot_preparation:'Shoot Preparation',
    shooting:'Shooting',assets_pending:'Assets Pending',ready_to_edit:'Ready to Edit',rough_cut:'Rough Cut',
    revision:'Revision',final_cut:'Final Cut',ready_to_publish:'Ready to Publish',published:'Published',reviewed:'Reviewed'}
  }
 };
 function normalize(x={}){
  return {
   ...x,
   currentStage:x.currentStage||'development',
   currentSubstatus:x.currentSubstatus||'story_development',
   blocker:x.blocker??x.openIssues??'',
   nextAction:x.nextAction||'',
   targetDate:x.targetDate||'',
   updatedBy:x.updatedBy||''
  };
 }
 function stats(source=[]){
  const rows=source.map(normalize);
  const current=Object.fromEntries(STAGES.map(k=>[k,rows.filter(x=>x.currentStage===k).length]));
  const cumulative={
   outline:rows.filter(x=>Boolean(x.outlineCompletedAt)||STAGES.indexOf(x.currentStage)>=0).length,
   writing:rows.filter(x=>Boolean(x.writingStartedAt)||STAGES.indexOf(x.currentStage)>=1).length,
   locked:rows.filter(x=>Boolean(x.scriptLockedAt)||STAGES.indexOf(x.currentStage)>=2).length,
   shoot:rows.filter(x=>Boolean(x.shootStartedAt)||STAGES.indexOf(x.currentStage)>=3).length,
   edit:rows.filter(x=>Boolean(x.editCompletedAt)||STAGES.indexOf(x.currentStage)>=4).length,
   published:rows.filter(x=>Boolean(x.publishedAt)||['published','reviewed'].includes(x.currentSubstatus)).length
  };
  return {total:rows.length,current,cumulative,blocked:rows.filter(x=>x.blocker).length};
 }
 return {STAGES,SUBSTATUSES,LABELS,normalize,stats};
})();
