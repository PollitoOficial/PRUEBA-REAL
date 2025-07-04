import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    // Validación simple (puedes mejorar esto)
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe (esto depende de cómo esté estructurada tu base de datos)
    // Suponiendo que tienes una función llamada `getUserByEmail` que consulta tu DB.
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear un nuevo usuario en la base de datos (aquí va la lógica de inserción a tu DB)
    const newUser = await createUser({ name, email, password: hashedPassword });

    // Crear un token JWT
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

// Simulación de funciones de base de datos (esto lo reemplazas por tu lógica real)
async function getUserByEmail(email) {
  // Aquí deberías consultar tu base de datos
  return null; // Usuario no encontrado
}

async function createUser(user) {
  // Aquí deberías insertar el nuevo usuario en tu base de datos
  return { id: 1, ...user }; // Simulación de un usuario creado
}
