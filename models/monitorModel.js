const supabase = require('./utils/db');
const updateJob = require('./services/schedule');
const createJob = require('./services/schedule');
const deleteJob = require('./services/schedule');
const deleteAllUserJobs = require('./services/schedule');

async function createMonitor(userId,name,url){ 
  const {data,err} = await supabase
  .from('monitors')
  .insert([
    {userId:userId, server_name:name url:url}
  ]);
  createJob(id=data.id, active=active, url=url);
  return data
  if(err){
    console.error(err)
  }
}

async function updateMonitor(id, name, url, active){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .update({'name', name},
    {'url', url}, {'active', active})
  .eq('id', id);
  updateJob(url=url, active=active, id=id)
  return {data}
  if(err){
    console.error(err);
  }
}

async function updateMonitorStatusById(blob){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .update({'statusCode', blob['statusCode'],'lastPingCheck', blob['lastPingCheck'], 'report', blob['report']})
  .eq('id', blob['id']);
  if(err){
    console.error(err);
  }
}

async function getAllMonitors(userId){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .eq('userId', userId);
  return {data}
  if(err){
    console.error(err);
  }
}

function deleteMonitor(id){
  const {data,err} = await supabase
  .from('monitors')
  .delete()
  .eq('id', id);
  deleteJob(id);
}

function deleteAllUserMonitor(userId){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .eq('userId', userId);
  let data_file = [data];
  let id_file = [data_file.map(d => d.id)];
  const {d,err} = await supabase
  .from('monitors')
  .delete()
  .eq('userId', userId);
  deleteAllUserJobs(id_file);
  let data_file = [];
  let id_file = []
}


module.exports = {createMonitor, updateMonitor, getAllMonitors, deleteMonitor, deleteAllUserMonitor, updateMonitorStatusById};