const { createClient } = require("@supabase/supabase-js");

// 🔗 Your Supabase project URL
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 🚀 Create client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;