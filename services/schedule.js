const redis = require("redis");
const client = redis.createClient();
await client.connect();

const timer = 600;

function sleep(ms){
  return new Promise(resolve =>
    setTimeout(resolve, ms));
}

function deleteJob(id):
  const key = 'monitor:${id}';
  const data = await redis.hGetAll(key);
  if(!data){
    return None
  }else{
    redis.expire(key, 0.05);
  }
 
function deleteAllUserJobs(id_file):
  for (id in id_file){
    const key = 'monitor:${id}';
    const data = await redis.hGetAll(key);
    if(!data){
      return None
    }else{
      redis.expire(key, 0.05);
    } 
  }

async function updateJob(url,active,id){
  await checker();
  const key = 'monitor:${id}';
  const data = await redis.hGetAll(key);
  if(!data){
    return {"key doesn't exist"}
  }else{
    link: url,
    active:active
  }
  return {'update successful'}
}

function createJob(id,url,active){
  await client.hSet(
    `monitor:${id}`,
    {
      link:url,
      active:active
    }
  );
  await client.zAdd(
    'schedule',
    [{
      score: Math.floor(Date.now(/1000 + timer)),
      value: id
    }]
  );
}

async function checker(){
  const now = Math.floor(Date.now() / 1000);
  const dueIds = await client.zRangeByScore(
    'schedule',
    0,
    now
  );
  if(!dueIds.length){
    return;
  }
  const tasks = dueIds.map(id => processMonitor(id, now));
  await Promise.all(tasks);
}

async function processMonitor(id, now){
  try{
    const monitor = await client.hGetAll(
      `monitor:${id}`
    );
    if(!monitor.link && !monitor.active){
      return;
    }
    await ping(url=monitor.link, id=monitor.id);
    const nextRun = now + monitor.timer;
    await client.zAdd(
      'schedule',
      [{
        score: nextRun'
        value: id
      }]
    );
  } catch(err){
    console.error(
      `Monitor ${id} failed`,
      err
    );
  }
}

async function scheduler(){
  while (true){
    try{
      await checker();
    } catch(err){
      console.error(
      `Scheduler Error`,
      err
    ); 
    }
    await sleep(2000);
  }
}
scheduler():



