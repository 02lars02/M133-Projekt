import * as express from "express";
import { DataReader } from './DataReader';
import * as fs from 'fs';
import { Product } from "./Product";
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import { Cart } from "./Cart";

const app = express();
app.use(cookieParser());
app.use(expressSession({
    secret: 'super-safa-secret',
    resave: false,
    saveUninitialized: true
}));
const port = 8080;
let carts = {};

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

app.get('/api/product/:id', (req, res) => {
    let searchedProduct: Product = DataReader.getProductById(req.params.id);
    if(searchedProduct) {
        res.header({'Content-Type': 'application/json', 'status': 200});
        res.send(searchedProduct);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/cart', (req, res) => {
    const cart = getCart(req);
    res.header({'Content-Type': 'application/json', 'status': 200});
    res.send(cart);
});

app.get('/api/cart/add/:id', (req, res) => {
    const product = DataReader.getProductById(req.params.id);
    const cart = getCart(req);
    if(product) {
        cart.add(product);
        res.header({'Content-Type': 'application/json', 'status': 200});
        res.send(cart);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/cart/remove/:id', (req, res) => {
    const product = DataReader.getProductById(req.params.id);
    const cart = getCart(req);
    if(product) {
        cart.remove(product);
        res.header({'Content-Type': 'application/json', 'status': 200});
        res.send(cart);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/cart/removeAll', (req, res) => {
    const cart = getCart(req);
    console.log(cart);
    cart.removeAll();
    console.log(cart);
    res.header({'Content-Type': 'application/json', 'status': 200});
    res.send(cart);
});

app.listen(port, () => console.log(`server started and is listening on port ${port}`));

function getCart(req) : Cart {
    if(!carts[req.session.cart]) {
        carts[req.session.cart] = new Cart();
    }
    return carts[req.session.cart] as Cart;
}