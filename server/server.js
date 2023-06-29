const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config();
require('./db')

const PORT = '3000';

const app = express();
const apiRouter = require('./routes/api');
const memeRouter = require('./routes/memes');

app.use(cors());
app.use(express.json());
app.use(cookieParser())

if (process.env.NODE_ENV === undefined) {
    app.use('/build', express.static(path.resolve(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
    })
}
app.use('/api/memes', memeRouter);
app.use('/api', apiRouter);

app.use('*', (req, res) => {
    res.status(404).send('Page not found my MAN!');
});


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
