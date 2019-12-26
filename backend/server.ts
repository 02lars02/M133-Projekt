import * as express from "express";
import { DataReader } from './DataReader';
import * as fs from 'fs';

const app = express();
const port = 8080;

app.get('/api/products', (req, res) => {
    res.header({'Content-Type': 'application/json', 'status': 200});
    res.send(DataReader.readAllProducts());
});

app.get('/api/img/:name', (req, res) => {
    fs.readFile(`data/${req.params.name}`, (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.header({ 'Content-Type': 'image/jpeg', 'status': 200 });
            res.send(data);
        }
    });
});

app.listen(port, () => console.log(`server started and is listening on port ${port}`));