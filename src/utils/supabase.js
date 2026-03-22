import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmfpjssvxshypyudaibv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZnBqc3N2eHNoeXB5dWRhaWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjA4MDMsImV4cCI6MjA4OTM5NjgwM30.7h7tVk68u-xHCiaBrtFreV17WSkBSoAJE_fp0TO2lpM';

export const supabase = createClient(supabaseUrl, supabaseKey);
