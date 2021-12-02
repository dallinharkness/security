const users = []
const bcrypt = require('bcryptjs')


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)


      const { username, password } = req.body//destructuring the username and password to be able to easily get that info
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) { //make sure the username exists in the database, if it does,      compare the password being passed in to the hashed password in the database
         const authorize = bcrypt.compareSync(password,users[i].passwordHash)//If the password is correct, send a copy of the user object back to the front-end.
         if(authorize) {
           let userToReturn = {...users[i]}//spread operator mkaes a new object
           delete userToReturn.passwordHash //deleting info if new password is made
           res.status(200).send(userToReturn)
           return
        } 
        
        }
       
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const{ username, email, firstName, lastName, password} = req.body//destructuring the register box in front end to make things easier
      const salt = bcrypt.genSaltSync(5)//hashing boilerplate
      const passwordHash = bcrypt.hashSync(password,salt)//hashing boilerplate
      console.log(passwordHash)

      let user = {//object made to store users information 
        username,
        email,
        firstName,
        lastName,
        passwordHash//needs to be passwordHash because the real password should not be stored in the users information
      }
        console.log('Registering User')
        console.log(req.body)
        

        users.push(user)
        let userToReturn = {...user}//pushing user info to a new object if password is the same
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    }
}
