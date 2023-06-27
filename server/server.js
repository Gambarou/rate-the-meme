const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userController = require('../server/controllers/userController');
const cookieController = require('../server/controllers/cookieController');
const sessionController = require('../server/controllers/sessionController');

require('dotenv').config();

const PORT = '3000';

const app = express();


mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'solo-project'
  })
   .then(() => console.log("Connected to Mongo DB"))
   .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(cookieParser())

if (process.env.NODE_ENV === undefined) {
    app.use('/build', express.static(path.resolve(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
    })
}

app.post('/api/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    if (res.locals.isVerified) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
})

app.post('/api/register', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    res.status(200).json(res.locals.newUser);
})

app.get('/api/check-session', sessionController.isLoggedIn, (req, res) => {
    if (res.locals.isLoggedIn) {
        console.log("Logged in")
        res.sendStatus(200);
    } else res.sendStatus(401);
});

app.use('*', (req, res) => {
    res.status(404).send('Page not found');
});


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
