const{v4:uuidv4} = require('uuid');
const supabase = require('./db');

async function createMonitor(userId,name,url){
  code = uuidv4();  
  const {data,err} = await supabase
  .from('monitors')
  .insert([
    {id:code, userId:userId, server_name:name url:url}
  ]);
  createJob(id=code, url=url)
  if(err){
    console.error(err)
  }
}

async function updateMonitorById(blob){
  const {data,err} = await supabase
  .from('monitors')
  .select('*')
  .update({'name', blob['email'],
    'url', blob['url']})
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
  .eq('id', blob);
}


module.exports = {createMonitor,updateMonitorById,deleteMonitorById};