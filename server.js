// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory storage for demonstration
const members = [];

// Handle membership form submissions
app.post('/api/members', (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if the email is already in use
    if (members.find(member => member.email === email)) {
        return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }

    // Add new member to the list
    members.push({ name, email, password });
    res.status(201).json({ success: true, message: 'Membership successful!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
