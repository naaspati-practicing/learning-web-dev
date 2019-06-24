import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer.component';

//// Local variable, #timer, version
@Component({
    selector: 'app-countdown-parent-lv',
    template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <app-countdown-timer #timer></app-countdown-timer>
  `
})
export class CountdownLocalVarParentComponent {

}

//// View Child version
@Component({
    selector: 'app-countdown-parent-vc',
    template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{seconds()}}</div>
  <app-countdown-timer></app-countdown-timer>
  `
})
export class CountdownViewChildParentComponent implements AfterViewInit {
    @ViewChild(CountdownTimerComponent)
    private timer: CountdownTimerComponent;

    seconds() { return 0; }

    ngAfterViewInit(): void {
        // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
        // but wait a tick first to avoid one-time devMode
        // unidirectional-data-flow-violation error
        setTimeout(() => this.seconds = () => this.timer.seconds, 0);
    }
    start() { this.timer.start(); }
    stop() { this.timer.stop(); }
}

