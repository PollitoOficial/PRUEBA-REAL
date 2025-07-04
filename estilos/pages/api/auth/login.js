import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validación simple
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Verificar si el usuario existe (esto depende de cómo esté estructurada tu base de datos)
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Crear un token JWT
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

// Simulación de consulta de base de datos
async function getUserByEmail(email) {
  // Aquí deberías consultar tu base de datos para obtener al usuario
  return { id: 1, email: 'usuario@invermaas.com', password: '$2a$12$...' }; // Simulación
}
