/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const checkJwt = require('express-jwt'); // Validates access tokens automatically

/**** Configuration ****/
const app = express(); 

async function createServer() {
  // Connect db
  const url = `mongodb+srv://dbUserTest:passwordTest@clustercms.5huzy.mongodb.net/awpExam?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

  // Create data
  const postsDB = require('./postsDB')(mongoose);
  
  // Require routes
  const routes = require('./routes')(postsDB); // Inject mongoose into routes module

    // Add middleware
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 

  const openPaths = [
    // Open '/api/users/authenticate' for POST requests
    { url: '/api/users/authenticate', methods: ['POST'] },
    { url: '/api/posts', methods: ['POST'] },
    { url: '/api/votes', methods: ['POST'] },
    { url: '/api/comments', methods: ['POST'] },
  
    // Open everything that doesn't begin with '/api'
    /^(?!\/api).*/gim,
  
    // Open all GET requests on the form '/api/posts/*' using a regular expression
    { url: /\/api\/posts\.*/gim, methods: ['GET'] },
    { url: /\/api\/comments\.*/gim, methods: ['GET'] },
    { url: /\/api\/votes\.*/gim, methods: ['GET'] },
    { url: /\/api\/users\.*/gim, methods: ['GET'] }
  ];

// The secret value. Defaults to 'secter access to the usersRouter'.
const secret = process.env.SECRET || 'secret access to the usersRouter';

// Validate the user token using checkJwt middleware.
app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }));

// This middleware checks the result of checkJwt above
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
    res.status(401).json({ error: err.message }); // Return 401 with error message.
  } else {
    next(); // If no errors, forward request to next middleware or route handler
  }
});

  const usersRouter = require('./usersRouter')(secret, postsDB);
  
  /**** Add routes ****/
  app.use('/api', routes);
  app.use('/api/users', usersRouter);

  // 'Redirect' all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  return app;
}

module.exports = createServer;