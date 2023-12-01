var message = 'CSC-317 startup template\n' + 'This template uses nodeJS, express, and express.static\n';

var port = 3000;
var path = require('path');
var express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var app = express();
const fs = require('fs');

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'userinfo',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var StaticDirectory = path.join(__dirname, 'Public');

app.use(express.static(StaticDirectory));

// Set up a route for the home page
app.get('/', (req, res) => {
  const currentDate = new Date().toLocaleString();

  fs.readFile(path.join(StaticDirectory, 'Home.html'), 'utf8', (err, data) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('404 Not found');
      return;
    }

    const updatedData = data.replace('{{currentDate}}', currentDate);

    res.set('Content-Type', 'text/html');
    res.status(200);
    res.end(updatedData);
  });
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 12);

  db.query(
    'INSERT INTO users (username, password, name) VALUES (?, ?, ?)',
    [username, hashedPassword, name],
    (err) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Registration failed');
      }

      console.log('Registration successful:', username, name);
      res.status(200).send('Registration successful');
    }
  );
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Fetch the user from the database based on the username
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Error checking login credentials:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const user = results[0];

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log('Login successful:', user.username, user.name);
      // Send the user data as JSON
      res.status(200).json({ message: 'Login successful', user });
    } else {
      console.log('Incorrect password for user:', user.username);
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  });
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

console.log(message);

