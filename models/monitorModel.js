const supabase = require('../utils/db');
const updateJob = require('../services/schedule');
const createJob = require('../services/schedule');
const deleteJob = require('../services/schedule');
const deleteAllUserJobs = require('../services/schedule');

async function createMonitor(userId,name,url){ 
  const {data,error} = await supabase
  .from('monitors')
  .insert([
    {userid:userId, name:name, url:url}
  ])
  .select()
  .single();
  if(error){
    console.error(error);
  }
  createJob(data.id, active=active, url=url);
  return data;
}

async function updateMonitor(id, name, url, active){
  const {data,error} = await supabase
  .from('monitors')
  .update({name, url, active})
  .eq('id', id)
  .sellect();
  if(error){
    console.error(error);
  }
  updateJob(url=url, active=active, id=id);
  return data;
}

async function updateMonitorStatusById(blob){
  const {data,error} = await supabase
  .from('monitors')
  .update({'statusCode': blob['statusCode'],'lastPingCheck': blob['lastPingCheck'], 'report': blob['report']})
  .eq('id', blob['id'])
  .select();
  if(error){
    console.error(error);
  }
}

async function getAllMonitors(userId){
  const {data,error} = await supabase
  .from('monitors')
  .select('*')
  .eq('userId', userId);
  if(error){
    console.error(error);
  }
  return data;
}

async function getSingleMonitor(id){
  const {data,error} = await supabase
  .from('monitors')
  .select('*')
  .eq('id', id);
  if(error){
    console.error(error);
  }
  return data;
}

async function deleteMonitor(id){
  const {data,error} = await supabase
  .from('monitors')
  .delete()
  .eq('id', id);
  deleteJob(id);
}

async function deleteAllUserMonitor(userId){
  const {data:monitors,error:fetchError} = await supabase
  .from('monitors')
  .select('id')
  .eq('userId', userId);
  if(fetchError){
    console.error("Error fetching monitors:", fetchError);
    return;
  }
  const monitorids = monitors.map(m=> m.id);
  const {data: blob,error: deleteError} = await supabase
  .from('monitors')
  .delete()
  .eq('userId', userId);
  if(deleteError){
    console.log("Error deleting monitors:", deleteError);
    return;
  }
  deleteAllUserJobs(monitorids);
}

async function getUserEmailFromMonitor(id){
  const {data, error} = await supabase
  .from('monitors')
  .select(`
    *,
    users(email)`)
  .eq('id', id);
  if(error){
    console.error(error)
  }
}


module.exports = {createMonitor, updateMonitor, getAllMonitors, deleteMonitor, deleteAllUserMonitor, updateMonitorStatusById, getSingleMonitor, getUserEmailFromMonitor};