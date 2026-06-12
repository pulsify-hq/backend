const{v4:uuidv4} = require('uuid');
const supabase = require('./db');

async function createUser(name,email,password){
  code = uuidv4();
  const {data,err} = await supabase
  .from('users')
  .insert([
    {id:code, name:name, email:email, password:password}
  ]);
  if(err){
    console.error(err)
  }
}

async function getUserByEmail(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .eq('email', blob);
  return data
}

async function getUserById(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .eq('id', blob);
  return data
}

async function updateUserById(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .update('email', blob['email'])
  .eq('id', blob['Id']);
  return data
}

async function deleteUserById(blob){
  const {data,err} = await supabase
  .from('users')
  .delete()
  .eq('email', blob);
}

module.exports = {createUser, getUserByEmail,getUserById,updateUserById,deleteUserById};