import { createClient } from '@supabase/supabase-js'

export const supabasePayment = createClient(import.meta.env.VITE_SUPABASE_PAYMENT_URL, import.meta.env.VITE_ANON_PAYMENT_KEY)
