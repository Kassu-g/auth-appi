const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const auth = express();
auth.use(bodyParser.json());
const port = 3000;
const users = [];

auth.post('/api/user/register', async (req, res) => {
    const { email, password } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(403).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json(newUser);
});

auth.get('/api/user/list', (req, res) => {
    res.status(200).json(users);
});

auth.listen(port, () => {
    console.log(`toimii: http://localhost:${port}`);
});
