import { createClient } from '@supabase/supabase-js'
import { create } from 'zustand'

const supabaseUrl = "https://owdfsdtlxgjnkzsneaax.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZGZzZHRseGdqbmt6c25lYWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMTM3MjgsImV4cCI6MjAyNzY4OTcyOH0.PJhDeHRJYDJnx5T6sYDKGhyy9MGPuagF3-gtwetLGPs"

const supabase = createClient(supabaseUrl, supabaseKey)


