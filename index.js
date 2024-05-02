import express from 'express';
import { db_getDataFromTableModule, db_createConnection } from './modules/db.js';
import { get_getPubs, post_getPubs } from './modules/api.js';

const app = express();
const port = 8080;

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(import.meta.url.replace('index.js', 'client/index.html'));
});

db_createConnection()

db_getDataFromTableModule('pubs_srb_bg')


app.get('/api/getPubs', get_getPubs)
app.post('/api/getPubs', post_getPubs)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});


