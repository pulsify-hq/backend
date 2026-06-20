const deleteAllUserMonitor = require('/monitorModel');
const supabase = require('./utils/db');

async function create(userName,email,hashPassword){
  const {data,err} = await supabase
  .from('users')
  .insert([
    {name:userName, email:email, password:hashPassword}
  ]);
  return {data}
  if(err){
    console.error(err)
  }
}

async function findByEmail(email){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .eq('email', email);
  return {data}
  if(err){
    console.error(err);
  }
}

async function getUserById(id){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .eq('id', id);
  return {data}
  if(err){
    console.error(err);
  }
}

async function updateUserById(id, name, email){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .update({'email', email}, {'name', name})
  .eq('id', id);
  return {data}
  if(err){
    console.error(err);
  }
}

async function resetPassword(email, hashPassword){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .update('password', hashPassword)
  .eq('email', email);
  return {data}
  if(err){
    console.error(err);
  }
}

async function deleteUserById(id){
  const {data,err} = await supabase
  .from('users')
  .delete()
  .eq('id', id);
  deleteAllUserMonitor(userId);
  if(err){
    console.error(err);
  }
}

module.exports = {create, findByEmail, updateUserById, getUserById, resetPassword, deleteUserById};