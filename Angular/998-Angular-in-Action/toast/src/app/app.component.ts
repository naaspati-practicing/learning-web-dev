import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockInterface, StocksService } from './services/stocks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  stocks: StockInterface[] = [];
  private _loadSubscription: Subscription;

  constructor(private readonly _stockService: StocksService) {
  }

  ngOnInit(): void {
    this._loadSubscription = this._stockService.load(['AAPL']).subscribe(stocks => {
      this.stocks = stocks;
    });
  }
  ngOnDestroy(): void {
    this._loadSubscription.unsubscribe();
  }
}
