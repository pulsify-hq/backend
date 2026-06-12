const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(url=process.env.PROJECTURL, key=process.env.KEY)
module.exports = supabase