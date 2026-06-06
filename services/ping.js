function ping(url,id){
  try{
    const res = await fetch(url);
    const result = await res.json();
  } catch(err){
    err
  }
}