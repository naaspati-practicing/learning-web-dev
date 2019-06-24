import { OnInit, OnDestroy, Component } from '@angular/core';

/**
 * Parent interacts with child via local variable
 * A parent component cannot use data binding to read child properties or invoke child methods. You can do both by creating a template reference variable for the child element and then reference that variable within the parent template as seen in the following example.
 * 
 * The following is a child CountdownTimerComponent that repeatedly counts down to zero and launches a rocket. It has start and stop methods that control the clock and it displays a countdown status message in its own template.
 */

@Component({
    selector: 'app-countdown-timer',
    template: '<p>{{message}}</p>'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
    intervalId = 0;
    message = '';
    seconds = 11;

    clearTimer() {
        window.clearInterval(this.intervalId);
    }
    start() { this.countDown(); }
    stop() {
        this.clearTimer();
        this.message = `Holding at T-${this.seconds} seconds`;
    }

    ngOnInit(): void {
        this.start();
    }
    ngOnDestroy(): void {
        this.clearTimer();
    }

    private countDown() {
        this.clearTimer();

        this.intervalId = window.setInterval(() => {
            this.seconds--;
            if (this.seconds === 0)
                this.message = 'Blast Off';
            else {
                if (this.seconds < 0)
                    this.seconds = 10; //reset
                this.message = `T-${this.seconds} seconds and counting`;
            }
        }, 1000);
    }
}