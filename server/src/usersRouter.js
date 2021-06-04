const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Used for hashing passwords!

// Create the routes and export the router
module.exports = (secret, postDB) => {

//   router.post('/', (req, res) => {
    // postsDB.createUser(req.body.username, req.body.password);
    // users.forEach(async user => {
//   const hashedPassword = await new Promise((resolve, reject) => {
//     bcrypt.hash(user.password, 10, function (err, hash) {
//       if (err) reject(err); else resolve(hash);
//     });
//   });

//   user.hash = hashedPassword; // Storing the hash+salt on the user object.
//   delete user.password; // Let's remove the clear text password as well
//   console.log(`Hash generated for ${user.username}:`, user); // Logging for debugging purposes
// });
//   });

  // This route takes a username and a password and creates an auth token
  router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      let msg = 'Username or password missing!';
      console.error(msg);
      res.status(401).json({ msg: msg });
      return;
    }
    
    // get users from MongoDB
    postDB.getUser(username).then( user  =>
    {
      if (user) { // If the user is found
        console.log('User found');
        // if (bcrypt.compareSync(password, user.hash)) {
          const payload = { username: username };
          const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
  
          res.json({
            msg: `User '${username}' authenticated successfully`,
            username: username,
            token: token
          });
        // } else {
        //   res.status(401).json({ msg: "Password mismatch!" })
        // }
        } else {
          res.status(404).json({ msg: "User not found!" });
        }
      } 
    );
  });

  return router;
}