import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gssxjbznbwsgssntpjdh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzc3hqYnpuYndzZ3NzbnRwamRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MDA4MTcsImV4cCI6MjA3MzM3NjgxN30.n0nVke4qTrcd5U9Dw-pKTtT1WDeyDTL493GPdvXN0Uw'
export const supabase = createClient(supabaseUrl, supabaseKey)