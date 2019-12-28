import { Product } from './Product';

export class Cart {
    products: Product[] = [];

    get total() {
        let sum: number = 0.0;
        this.products.forEach(product => sum += product.total);
        return sum;
    }

    add(product: Product) {
        const productFromArray: Product[] = this.getProduct(product.id);
        if(productFromArray.length > 0) {
            productFromArray[0].amount += 1.0;
            this.products = this.products.filter(x => x.id != productFromArray[0].id);
            this.products.push(productFromArray[0])
        } else {
            this.products.push(product);
        }
    }

    remove(product: Product) {
        const productFromArray: Product[] = this.getProduct(product.id);
        if(productFromArray[0].amount == 1.0) {
            this.products = this.products.filter(x => x.id != product.id);
        } else {
            productFromArray[0].amount -= 1.0;
            this.products = this.products.filter(x => x.id != product.id);
            this.products.push(productFromArray[0]);
        }
    }

    getProduct(id) {
        return this.products.filter(x => x.id == id);
    }

    removeAll() {
        this.products = [];
    }
}