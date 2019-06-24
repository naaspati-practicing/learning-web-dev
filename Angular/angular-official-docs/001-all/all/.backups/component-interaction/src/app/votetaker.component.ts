import { Component } from '@angular/core';

@Component({
    selector: 'app-vote-taker',
    template: `
      <h2>Should mankind colonize the Universe</h2>
      <h3>Agree: {{agreed}}, Diragree: {{disagreed}}</h3>
      <app-voter *ngFor="let voter of voters" [name]='name' (voted)='onVoted($event)' ></app-voter>
    `
})
export class VoteTakerComponent {
    agreed = 0;
    disagreed = 0;
    voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

    onVoted(agreed: boolean) {
        if (agreed)
            this.agreed++;
        else
            this.disagreed++;
    }
}