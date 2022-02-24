const express = require('express');

const app = express();
app.use(express.json());

const database = {
  users: [{
    id: '123',
    name: 'Daniel',
    email: 'daniel@email.com', 
    password: 'cookies', 
    entries: 0,
    joined: new Date()
  },
  {
    id: '124',
    name: 'Monica',
    email: 'monica@email.com', 
    password: 'banana', 
    entries: 0,
    joined: new Date()
  }]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if ( req.body.email === database.users[0].email && 
      req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('Error logging in');
  }
  res.json('signing in');
})

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email, 
    password: password, 
    entries: 0,
    joined: new Date()
  })

  res.json(database.users[database.users.length - 1]);
})

app.get('profile/:id', (req, res) => {
  const {id} = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      res.json(user);
    } else {
      res.status(404).json('No such user');
    } 
  })
}) 

app.listen(3000, () => {
  console.log('App is running on port 3000');
})


// --> res = this is working
// --> /sign in --> POST = success / fail
// --> /register --> POST = returns new user object
// --> /profile/:userId --> GET = user
// --> /image --> PUT --> updated object