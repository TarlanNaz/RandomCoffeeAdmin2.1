// здесь определяем клиент для взаимодействия с Supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjbdexjlwhtqsdjdzcij.supabase.co'; // Project URL
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqYmRleGpsd2h0cXNkamR6Y2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDkxNDAsImV4cCI6MjA0ODEyNTE0MH0.4KyEz9_s1bjHKp30n_sOO-syVi4efhSSn2ZzV3shNsg'; // API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
