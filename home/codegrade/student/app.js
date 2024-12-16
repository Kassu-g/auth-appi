const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const auth = express();
auth.use(bodyParser.json());
const p = 3000;
const kayt = [];
const fs = require('fs');

auth.post('/api/user/register', async (req, res) => {
    const { email, password } = req.body;

    if (kayt.find(user => user.email === email)) {
        return res.status(403).json({ error: 'Email already in use' });
    }

    const salattu = await bcrypt.hash(password, 6);

    const uusi = { email, password: salattu };
    kayt.push(uusi);
    fs.writeFileSync('./results.txt', JSON.stringify(kayt, null, 2));

    res.status(201).json(uusi);
});
auth.get('/api/user/list', (req, res) => {
    
    res.status(200).json(kayt);
});

auth.listen(p, () => {
    console.log(`toimii: http://localhost:${p}`);
});