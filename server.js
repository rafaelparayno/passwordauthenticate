const express = require('express');
const app = express();
const bcrpyt = require('bcryptjs');

app.use(express.json());

const users = [];
app.get('/users', (req, res) => {
    res.json(users);

});

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrpyt.genSalt();
        const hashedPasswored = await bcrpyt.hash(req.body.password, 10)

        const user = {
            name: req.body.name,
            password: hashedPasswored
        }

        users.push(user)
        res.status(201).send()

    } catch{
        res.status(500).send()
    }
})


app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null)
        return res.status(400).send('cannot find user');

    try {
        if (await bcrpyt.compare(req.body.password, user.password)) {
            res.send('success');
        } else {
            res.send('not allowed');
        }
    } catch{
        res.status.send(500).send();
    }
})

app.listen(3000);