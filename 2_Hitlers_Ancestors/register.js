const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1qw2',
    database: 'register'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('MySQL connected');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Route for serving index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for serving registration form
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'register', 'register.html'));
});

// Route for serving login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login', 'index.html'));
});

// Route for serving dashboard page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'Dashboard', 'dashboard.html'));
});

// Route for serving blog page
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'blog', 'index.html'));
});

// Route for serving features page
app.get('/features', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'features', 'index.html'));
});

// Route for serving donation page
app.get('/donation', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'donation', 'index.html'));
});

// Route for serving rescue page
app.get('/rescue', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'rescue', 'index.html'));
});

// Route for serving images directly
app.get('/images/:imageName', (req, res) => {
    const { imageName } = req.params;
    res.sendFile(path.join(__dirname, 'src', 'images', imageName));
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/donate', (req, res) => {
    const { frequency, amount } = req.body;
    
    res.sendFile(path.join(__dirname, 'src', 'donation', 'thank.html'));
});


// Route for handling login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check the database for the user credentials
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).send('Error logging in');
            return;
        }

        // If user found, redirect to /dashboard
        if (results.length > 0) {
            res.redirect('/dashboard');
        } else {
            // If user not found, redirect to /register
            res.redirect('/register');
        }
    });
});

// Route for handling registration form submission
app.post('/register', (req, res) => {
    const { email, password, username } = req.body;

    // Insert into database
    const sql = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
    db.query(sql, [email, password, username], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
            return;
        }
        console.log('User registered successfully');
        res.redirect('/login');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
