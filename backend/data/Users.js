import bcrypt from "bcryptjs";

const Users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("78484687", 10),
    phone: 9774848493,
    isAdmin: true,
  },
  {
    name: "Ujjwal",
    email: "tiwariujjwal@gmail.com",
    password: bcrypt.hashSync("78484687", 10),
    phone: 9774848497,
    isAdmin: false,
  },
  {
    name: "Ritesh",
    email: "riteshyadav@gmail.com",
    password: bcrypt.hashSync("78484687", 10),
    phone: 9774848495,
    isAdmin: false,
  },
];

export default Users;
