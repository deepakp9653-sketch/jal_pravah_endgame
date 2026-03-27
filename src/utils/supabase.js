import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knzautmcexbpcgvqmjvw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuemF1dG1jZXhicGNndnFtanZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MjAzMDgsImV4cCI6MjA4OTk5NjMwOH0.GYgw2oWDhoe8I58WkDcdfpKuaVe8HUx-sT3jxlGl6jc';

export const supabase = createClient(supabaseUrl, supabaseKey);
