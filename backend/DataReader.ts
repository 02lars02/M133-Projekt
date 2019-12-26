import * as fs from 'fs';
import { Product } from './Product';

export class DataReader {
    static readAllProducts(): Product[] {
        return JSON.parse(fs.readFileSync('data/products.json', 'utf8')) as Product[];
    }

    static getProductById(id): Product {
        let result: Product;
        DataReader.readAllProducts().forEach(product => {
            if(product.id == id) {
                result = product;
            }
        });
        return result;
    }
}