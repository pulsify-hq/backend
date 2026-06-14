const supabase = require('./db');

async function createUser(name,email,password){
  const {data,err} = await supabase
  .from('users')
  .insert([
    {name:name, email:email, password:password}
  ]);
  return {data.id}
  if(err){
    console.error(err)
  }
}

async function getUserByEmail(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .eq('email', blob);
  return {data}
}

async function getUserById(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .eq('id', blob['id']);
  return {data}
}

async function updateUserById(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .update({'email', blob['email'], 'name', blob['name']})
  .eq('id', blob['Id']);
  return data
}

async function updateUserPasswordById(blob){
  const {data,err} = await supabase
  .from('users')
  .select('*')
  .update('password', blob['password'])
  .eq('id', blob['Id']);
  return {data}
}

async function deleteUserById(blob){
  const {data,err} = await supabase
  .from('users')
  .delete()
  .eq('email', blob);
}

module.exports = {createUser, getUserByEmail, updateUserById, getUserById, updateUserPasswordById, deleteUserById};