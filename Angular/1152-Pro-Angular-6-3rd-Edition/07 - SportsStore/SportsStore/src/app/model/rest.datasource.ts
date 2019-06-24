import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Order } from './order.module';
import { Product } from './product.model';

const PROTOCOL = 'http';
const PORT = 8585;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string;

    constructor(private client: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`
    }
    getProducts(): Observable<Product[]> {
        return this.client.get<Product[]>(this.baseUrl.concat('products'));
    }
    saveOrder(order: Order): Observable<Order> {
        return this.client.post<Order>(this.baseUrl.concat("orders"), order);
    }
    saveProduct(product:Product) {
        return this.client.post<Product>(this.baseUrl.concat('products'), product, this.getOptions());
    }
    updateProduct(product:Product) {
        return this.client.put<Product>(this.baseUrl+ 'products/' +product.id, product, this.getOptions());
    }
    deleteProduct(product_id:number) {
        return this.client.delete<Product>(this.baseUrl+ 'products/' +product_id, this.getOptions());
    }

    authenticate(username?: string, password?: string): Observable<boolean> {
        return this.client.post<any>(this.baseUrl.concat('login'), {name:username, password})
        .pipe(map(res => {
            this.auth_token = res.success ? res.token : null;
            return res.success;
        }));

    }
    getOrders(): Observable<Order[]> {
        return this.client.get<Order[]>(this.baseUrl + "orders", this.getOptions());
    }

    deleteOrder(id: number): Observable<Order> {
        return this.client.delete<Order>(`${this.baseUrl}orders/${id}`,
            this.getOptions());
    }

    updateOrder(order: Order): Observable<Order> {
        return this.client.put<Order>(`${this.baseUrl}orders/${order.id}`,
            this.getOptions());
    }

    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            })
        }
    }

}