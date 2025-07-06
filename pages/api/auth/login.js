import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Verificar si el usuario existe
    const { data: user, error } = await supabase
      .from('users')  // Asegúrate de que esta tabla exista en tu Supabase
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Crear un JWT para la autenticación
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
