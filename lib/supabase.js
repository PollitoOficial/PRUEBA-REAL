import { createClient } from '@supabase/supabase-js';

// Aquí debes colocar la URL de tu Supabase y la clave de la API
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
