import bcrypt from 'bcryptjs';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    // Validación básica
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')  // Asegúrate de que esta tabla exista en tu Supabase
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insertar nuevo usuario en la tabla
    const { data: newUser, error: insertError } = await supabase
      .from('users')  // Asegúrate de que esta tabla exista en tu Supabase
      .insert([
        {
          name: name,
          email: email,
          password: hashedPassword
        }
      ])
      .single();

    if (insertError) {
      return res.status(500).json({ error: 'Error al registrar el usuario', details: insertError });
    }

    // Crear un JWT para la autenticación
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Usuario creado exitosamente', token });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
