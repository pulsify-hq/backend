const supabase = require('./db');

async function createMonitor(userId,name,url){ 
  const {data,err} = await supabase
  .from('monitors')
  .insert([
    {userId:userId, server_name:name url:url}
  ]);
  createJob(id=data.id, active=active, url=url)
  if(err){
    console.error(err)
  }
}

async function updateMonitorById(blob){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .update({'name', blob['name'],
    'url', blob['url'], 'active', blob['active']})
  .eq('id', blob['id']);
  return data
}

async function updateMonitorStatusById(blob){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .update({'statusCode', blob['statusCode'],'lastPingCheck', blob['lastCheck'], 'report', blob['report']})
  .eq('id', blob['Id']);
  return data
}

async function getAllUserMonitorById(blob){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .eq('userId', blob['userId']);
  return data
}

async function deleteMonitorById(blob){
  const {data,err} = await supabase
  .from('monitors')
  .delete()
  .eq('id', blob['id']);
}


module.exports = {createMonitor, updateMonitorById, deleteMonitorById, updateMonitorStatusById};