const express = require('express');
const path = require('path');
const PORT = '3000';

const app = express();

if (process.env.NODE_ENV === undefined) {
    app.use('/build', express.static(path.resolve(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
    })
}
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
