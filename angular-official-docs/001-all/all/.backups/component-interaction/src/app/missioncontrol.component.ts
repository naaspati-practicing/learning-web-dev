import { Component } from '@angular/core';
import { MissionService } from './mission.service';

/*

h2 Mission Control
button((click)='announce()') Announce mission
app-astronaut(*ngFor='let astronaut of astronauts', [astronaut]='astronaut')
h3 history
ul
  li(*ngFor='let event of history') {{event}}

 */

@Component({
    selector: 'app-mission-control',
    template: `
<h2>Mission Control</h2>
<button (click)="announce()">Announce mission</button>
<app-astronaut *ngFor="let astronaut of astronauts" [astronaut]="astronaut"></app-astronaut>
<h3>history</h3>
<ul>
    <li *ngFor="let event of history">{{event}}</li>
</ul>
    `,
    providers: [MissionService]
})
export class MissionControlComponent {
    astronauts = ['Lovell', 'Swigert', 'Haise'];
    history: string[] = [];
    missions = [
        'Fly to the moon!',
        'Fly to mars!',
        'Fly to Vegas!'
    ]
    nextMission = 0;

    constructor(
        private missionService: MissionService
    ) {
        missionService.missionConfirmed$.subscribe(astronaut => this.history.push(`${astronaut} confirmed the mission`));
    }

    announce() {
        let mission = this.missions[this.nextMission++];
        this.missionService.announceMission(mission);
        this.history.push(`Mission "${mission}" announced`);
        
        if (this.nextMission >= this.missions.length)
            this.nextMission = 0;
    }
}

