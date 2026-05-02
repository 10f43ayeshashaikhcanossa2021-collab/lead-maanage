const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Read credentials from .env file (NEVER hardcode keys)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Safety check (helps debug missing env vars)
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables in .env file");
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;