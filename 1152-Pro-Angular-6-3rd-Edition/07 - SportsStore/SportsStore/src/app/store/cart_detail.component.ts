import {Component} from '@angular/core';
import {Cart} from '../model/cart.model';

@Component({
    selector:'cart-detail',
    templateUrl:'cart_detail.component.html'
})
export class CartDetailComponent {
    constructor(public cart: Cart) {}
}