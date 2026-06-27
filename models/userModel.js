const deleteAllUserMonitor = require('./monitorModel');
const supabase = require('../utils/db');

async function create(userName,email,hashPassword){
  const {data,error} = await supabase
  .from('users')
  .insert([
    {name:userName, email:email, password:hashPassword}
  ])
  .select();
  if(error){
    console.error(error);
    throw error;
  }
  return data;
}

async function findByEmail(email){
  const {data,error} = await supabase
  .from('users')
  .select('*')
  .eq('email', email);
  if(error){
    console.error(error);
    throw error;
  }
  return data;
}

async function getUserById(id){
  const {data,error} = await supabase
  .from('users')
  .select('*')
  .eq('id', id);
  if(error){
    console.log("No id found")
    console.error(error);
    throw error;
  }
  return data;
}

async function updateUserById(id, name, email){
  const {data,error} = await supabase
  .from('users')
  .update({email, name})
  .eq('id', id)
  .select();
  if(error){
    console.error(error);
  }
  return data;
}

async function resetPassword(email, hashPassword){
  const {data,error} = await supabase
  .from('users')
  .update({password: hashPassword})
  .eq('email', email)
  .select();
  if(error){
    console.error(error);
    throw error;
  }
  return data;
}

async function deleteUserById(id){
  const {data,error} = await supabase
  .from('users')
  .delete()
  .eq('id', id);
  deleteAllUserMonitor(userId);
  if(error){
    console.error(error);
  }
}

module.exports = {create, findByEmail, updateUserById, getUserById, resetPassword, deleteUserById};