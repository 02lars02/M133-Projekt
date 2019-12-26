export class Product {
    id: string;
    productName: string;
    specialOffer?: number;
    normalPrice: number;
    imageName: string;
    description: string;

    get price(): number {
        if(this.hasSpecialOffer) {
            return this.specialOffer;
        } else {
            return this.normalPrice
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