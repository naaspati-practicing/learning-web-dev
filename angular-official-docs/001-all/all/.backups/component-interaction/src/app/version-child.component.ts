import { OnChanges, SimpleChanges, Input, Component } from '@angular/core';

/**
 
h3 Version {{major}}.{{minor}}
h4 Change log: 
ul
  li(*ngFor='let change of changeLog') {{change}}

 */

@Component({
    selector: 'app-version-child',
    template: `
    <h3>Version {{major}}.{{minor}}</h3>
<h4>Change log: </h4>
<ul>
    <li *ngFor="let change of changeLog">{{change}}</li>
</ul>
    `
})
export class VersionChildComponent implements OnChanges {
    @Input() major: number;
    @Input() minor: number;
    changeLog: string[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        let log: string[] = [];
        for (const key in changes) {
            const c = changes[key];
            let to = JSON.stringify(c.currentValue);
            if (c.isFirstChange())
                log.push(`Initial value of ${key} set to ${to}`);
            else {
                let from = JSON.stringify(c.previousValue);
                log.push(`${key}: ${from} -> ${to}`);
            }
        }
        this.changeLog.push(log.join(', '));
    }

}