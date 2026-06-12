const{v4:uuidv4} = require('uuid');
const supabase = require('./db');

async function createLog(monitorId,responseTime,report,statusCode){
code = uuidv4()  
  const {data,err} = await supabase
  .from('logs')
  .insert([
    {id:code, monitorId:monitorId, responseTime:responseTime, report:report, statusCode:statusCode}
  ]);
  if(err){
    console.error(err)
  }
}

async function getLogsByMonitorId(blob){
  const {data,err} = await supabase
  .from('logs')
  .select('*')
  .eq('monitorId', blob['monitorId'])
  .order('createdAt', {ascending:True});
  return data
}

module.exports = {createLog,getLogsByMonitorId}