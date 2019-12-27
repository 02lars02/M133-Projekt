import { Product } from './Product';

export class Cart {
    products: Product[] = [];

    total(): number {
        let sum: number = 0;
        this.products.forEach(product => {
            sum += product.price;
        });
        return sum;
    }

    add(product: Product) {
        const productFromArray: Product[] = this.getProduct(product.id);
        console.log(productFromArray); //TODO: remove
        if(productFromArray.length > 0) {
            productFromArray[0].amount += 1.0;
            this.products = this.products.filter(x => x.id != productFromArray[0].id);
            this.products.push(productFromArray[0])
        } else {
            this.products.push(product);
        }
    }

    //not working
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
}