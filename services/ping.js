const updateMonitorStatusById = require('../models/monitorModel');
const getUserEmailFromMonitor = require('../models/monitorModel');
const pingFailureTemplate = require('./templates/pingFailureTemplate');
const sendMail = require('.sendMail');

function ping(url,id){
  try{
    let start = performance.now()
    const res = await fetch(url);
    const result = await res.json();
    let stop = performance.now();
    let responseTime = stop - start;
    if(responseTime > 1000){
      let report =  'inactive';
      let userEmail = getUserEmailFromMonitor(id);
    html = pingFailureTemplate(url);
    await sendMail(to=userEmail , subjecthtml=html);
    }else{
      let report =  'active';
    }
    
    blob = {
      'id':id,
      'report':report,
      'statusCode':result['statusCode'],
      'lastPingCheck':Date.now()
    };
    updateMonitorStatusById(blob)
  } catch(err){
    console.error(err);
  }
}