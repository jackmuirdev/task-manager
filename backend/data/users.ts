import bcrypt from 'bcryptjs';

export const users = [
  {
    username: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('!Jm12345', 10),
    isAdmin: true,
  },
];