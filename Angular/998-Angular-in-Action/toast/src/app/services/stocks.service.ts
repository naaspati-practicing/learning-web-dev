import {Injectable} from '@angular/core';
import {isEmpty} from '../Utils';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

const stocks = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
const service = 'https://angular2-in-action-api.herokuapp.com/';

@Injectable()
export class StocksService {
  constructor(private readonly _http: HttpClient) {}

  get(): string[] {
    return Array.from(stocks);
  }
  add(stock: string) {
    this._validateStock(stock);
    stocks.push(stock);
    return this.get();
  }

  private _validateStock(stock) {
    if (!stock || isEmpty(stock)) {
      throw new Error('invalid value of stock');
    }
  }

  remove(stock: string): boolean {
    this._validateStock(stock);
    const index = stocks.indexOf(stock);
    if (index < 0) {
      return false;
    }
    stocks.splice(index, 1);
    return true;
  }

  load(symbols: any[]): Observable<StockInterface[]> {
    if (symbols && symbols.length !== 0) {
      return this._http.get<StockInterface[]>(service + 'stocks/snapshot?symbols=' + symbols.join());
    } else {
      throw new Error('invalid value for: symbols');
    }
  }
}
