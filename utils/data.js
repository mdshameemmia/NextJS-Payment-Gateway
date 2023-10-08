import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      username: 'superadmin',
      email: 'superadmin@example.com',
      password: bcrypt.hashSync('superadmin'),
      role_id: '6411a9d2cc3e457787be0eb1',
      is_verified:true
    }
  ],
  roles:[
    {
        role:'superadmin'
    },
    {
        role:'admin'
    },
    {
        role:'user'
    },
  ]

}

  export default data;
