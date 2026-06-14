const redi = require("redis");
const client = redis.createClient();
await client.connect();

const timer = 600;

function sleep(ms){
  return new Promise(resolve =>
    setTimeout(resolve, ms));
}

function createJob(Id,url,active){
  await client.hSet(
    `monitor:${Id}`,
    {
      link:url,
      active:active
    }
  );
  await client.zAdd(
    'schedule',
    [{
      score: Math.floor(Date.now(/1000 + timer,)),
      value: Id
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
    const nextRun = now + timer;
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



