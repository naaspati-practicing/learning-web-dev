import {Component, OnInit, Input} from '@angular/core';
import {StockInterface} from 'src/app/services/stocks.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  @Input() stock: StockInterface;

  constructor() {}

  isNegative() {
    return this.stock && this.stock.change < 0;
  }
  isPositive() {
    return this.stock && this.stock.change > 0;
  }
}
