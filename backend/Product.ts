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

    get hasSpecialOffer(): boolean {
        if(this.specialOffer) {
            return true
        } else {
            return false;
        }
    }
}