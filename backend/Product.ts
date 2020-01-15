export class Product {
    id: string;
    productName: string;
    specialOffer?: number;
    normalPrice: number;
    imageName: string;
    description: string;
    amount: number;

    get price(): number {
        if(this.specialOffer) {
            return this.specialOffer;
        } else {
            return this.normalPrice;
        }
    }

    get total(): number {
        if(this.specialOffer) {
            return this.specialOffer * this.amount;
        } else {
            return this.normalPrice * this.amount;
        }
    }

    get hasSpecialOffer(): boolean {
        if(this.specialOffer) {
            return true
        } else {
            return false;
        }
    }
}