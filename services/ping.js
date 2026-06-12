import {createLog} from ./models/monitorLogModel.js;

function ping(url,id){
  try{
    let start = Date.now()
    const res = await fetch(url);
    const result = await res.json();
    let stop = date.now()
    let responseTime = stop - start
    if (result['res'].toLower() === 'True'){
      let report =  'server active'
    }else if(responseTime > 2000){
      let report =  'server slept'
    }else{
      let report =  'server inactive'
    }
    createLog(monitorId=id, responseTime=responseTime, report=report, statusCode=result['statusCode'])
  } catch(err){
    err
  }
}