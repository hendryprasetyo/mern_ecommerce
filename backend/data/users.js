import bcrypt from 'bcryptjs'

const users = [
  {
    username: 'hendry',
    email: 'hendryprras@gmail.com',
    password: bcrypt.hashSync('hendry313', 10),
    isAdmin: true,
  },
]

export default users
