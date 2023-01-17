import bcrypt from 'bcryptjs'


const utilisateurs=[
    {
        nom:'admin',
        email:'admin@gmail.com',
        mdp:bcrypt.hashSync('12345',10),
        isAdmin:true
    },
    {
        nom:'johndoe',
        email:'john@gmail.com',
        mdp:bcrypt.hashSync('12345',10),
        
    },
    {
        nom:'marystue',
        email:'mary@gmail.com',
        mdp:bcrypt.hashSync('12345',10),
        
    }
]
export default utilisateurs