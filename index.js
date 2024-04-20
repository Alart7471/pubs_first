import express from 'express';
const app = express();
const port = 8080;

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(import.meta.url.replace('index.js', 'client/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});


