import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class Cart {
    public lines: Map<number, CartLine> = new Map();
    public itemCount: number = 0;
    public cartPrice: number = 0;

    addLine(product: Product, quantity: any = 1) {
        let line = this.lines.get(product.id);
        if (line)
            line.quantity += parseInt(quantity);
        else
            this.lines.set(product.id, new CartLine(product, quantity));

        this.recalculate();
    }

    setQuantity(product?: Product, quantity?: any) {
        let line = this.lines.get(product.id);
        if (line) {
            line.quantity = parseInt(quantity);
            this.recalculate();
        }
    }
    removeLine(id: number) {
        if (this.lines.delete(id))
            this.recalculate();
    }
    clear() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.clear();
    }
    recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;

        for (let [key, line] of this.lines) {
            this.itemCount += line.quantity;
            this.cartPrice += line.lineTotal;
        }
    }
}

export class CartLine {
    constructor(
        public product: Product,
        public quantity: number
    ) { }

    get lineTotal(): number {
        return this.quantity * this.product.price;
    }
}