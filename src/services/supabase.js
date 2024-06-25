import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zpreajejbgjxbcjluoqp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcmVhamVqYmdqeGJjamx1b3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MzU4NzEsImV4cCI6MjAyODUxMTg3MX0.ppp2FSuXHpmB1eyJzsYECkxG9ttohWmN6uxu1ih9UsE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
