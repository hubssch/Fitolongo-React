import { createClient } from '@supabase/supabase-js';

// Wstaw swoje dane z Supabase
const supabaseUrl = 'https://sgjwqdbghcsgwtkbpmxt.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnandxZGJnaGNzZ3d0a2JwbXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNDM5ODQsImV4cCI6MjA0NjgxOTk4NH0.Vo7mEJbZYa9tj-AHI5bTqAT1ndbBMHqIbdabQjwMvwM";

if (!supabaseKey) {
    throw new Error("Supabase Key is missing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
