const updateMonitorStatusById = require('./models/monitorModel');

function ping(url,id){
  try{
    let start = Date.now()
    const res = await fetch(url);
    const result = await res.json();
    let stop = date.now();
    let responseTime = stop - start;
    if (result['active'].toLower() === 'True'){
      let report =  'server active';
    }if(responseTime > 2000){
      let report =  'server slept';
    }if(result['active'].toLower() === 'True'){
      let report =  'server inactive';
    }
    blob = {
      'id':id,
      'report':report,
      'statusCode':result['statusCode'],
      'lastPingCheck':Date.now()
    };
    updateMonitorStatusById(blob)
  } catch(err){
    err
  }
}