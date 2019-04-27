import {Injectable} from  '@angular/core';
import {Product} from './product.model'
import {Observable, from} from 'rxjs';
import * as range from "range";
import { Order } from './order.module';

@Injectable()
export class StaticDataSource {
    private products: Product[] = range.range(1, 16).map(i => new Product(1, 'Product '+i, 'Category '+i, `Product ${i} (Category ${i})`, 100));

    getProducts(): Observable<Product[]> {
        return from([this.products]);
    }
    saveOrder(order: Order):Observable<Order> {
        console.log(JSON.stringify(order));
        return from([order]);
    }

}
