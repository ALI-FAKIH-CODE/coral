const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'membershipDB';
let db, membersCollection;

// Connect to MongoDB
MongoClient.connect(url)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        membersCollection = db.collection('members');
    })
    .catch(error => console.error(error));

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <form action="/register" method="post">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <input type="email" name="email" placeholder="Email" required><br>
            <button type="submit">Become a Member</button>
        </form>
    `);
});

// Handle form submission
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Insert the form data into the MongoDB collection
    membersCollection.insertOne({ username, password, email, date_joined: new Date() })
        .then(result => {
            res.send('Registration successful! <a href="/">Go back</a>');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred. Please try again later.');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
