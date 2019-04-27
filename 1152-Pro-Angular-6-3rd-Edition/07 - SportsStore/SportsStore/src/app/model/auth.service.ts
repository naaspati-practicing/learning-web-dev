import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private datasource: RestDataSource) { }
    authenticate(username?: string, password?: string): Observable<boolean> {
        return this.datasource.authenticate(username, password);
    }

    get authenticated(): boolean {
        if (this.datasource.auth_token)
            return true;
        else
            return false;
    }
    clear() {
        this.datasource.auth_token = null;
    }
}