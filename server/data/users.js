import bcrypt from 'bcrypt';

const users = [
  {
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=442286253714102&height=50&width=50&ext=1620380525&hash=AeQwF0_nTdMNx1Q0ePM',
    isAdmin: true,
    firstName: 'Hasib',
    email: 'hasibmolla28@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14Gi2Qt36bHYpjLVulmcZd7yWmBhZFhI1_hwAXDNv=s96-c',
    isAdmin: false,
    firstName: 'Hasib',
    lastName: 'Molla',
    email: 'hasibmuttakin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
