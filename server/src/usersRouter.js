const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Used for hashing passwords!


const users = [
  // These are just some test users with passwords.
  { username: 'anonymous', password: '123' },
  { username: 'secret', password: 'hiddenPassword' }
];

// Create the routes and export the router
module.exports = (secret, postsDB) => {
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
    postsDB.getUser(username).then( user  =>
    {
      // if no users in the db, use test data
      if (user === null) {
        const user = users.find((user) => user.username === username);
        if (user) { // If the user is found
          console.log('User found');
            const payload = { username: username };
            const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
    
            res.json({
              msg: `User '${username}' authenticated successfully`,
              username: username,
              token: token
            });
          } else {
            res.status(404).json({ msg: 'User not found!' });
          }
      } else {
      if (user) { // If the user is found
        console.log('User found');
          const payload = { username: username };
          const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
  
          res.json({
            msg: `User '${username}' authenticated successfully`,
            username: username,
            token: token
          });
        } else {
          res.status(404).json({ msg: 'User not found!' });
        }
      }
      });
  });

  return router;
}