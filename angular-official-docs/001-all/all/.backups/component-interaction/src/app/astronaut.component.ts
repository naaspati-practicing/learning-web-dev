import { OnDestroy, Input, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MissionService } from './mission.service';

/*
p
  | {{astronaut}}: 
  strong {{mission}} 
  button((click)='confirm()', [disabled]='!announced || confirmed') Confirm
  
 */

@Component({
    selector:'app-astronaut',
    template: `
<p>{{astronaut}}: <strong>{{mission}} </strong>
<button (click)="confirm()" [disabled]="!announced || confirmed">Confirm</button>
</p>
    `
})
export class AstronautComponent  implements OnDestroy {
    @Input() astronaut: string;
    mission = 'no mission announced';
    confirmed = false;
    announced = false;
    subscription: Subscription; 

    constructor(private missionService: MissionService) {
        this.subscription = missionService.missionAnnounced$.subscribe(
          mission => {
            this.mission = mission;
            this.announced = true;
            this.confirmed = false;
        });
      }

      confirm() {
          this.confirmed = true;
          this.missionService.confirmMission(this.astronaut);
      }
    
    ngOnDestroy(): void {
         // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}