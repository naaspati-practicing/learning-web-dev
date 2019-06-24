import { Order } from "./order.module";
import { Injectable } from '@angular/core';
import { StaticDataSource } from './static.datasource';
import { Observable } from 'rxjs';


@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    constructor(private dataSource: StaticDataSource) { }

    getOrders(): Order[] {
        return this.orders;
    }
    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

}

