import * as fs from 'fs';
import { Product } from './Product';

export class DataReader {
    static readAllProducts() : Product[] {
        return JSON.parse(fs.readFileSync('data/products.json', 'utf8')) as Product[];
    }
}