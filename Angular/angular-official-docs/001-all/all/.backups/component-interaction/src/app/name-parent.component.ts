import { Component } from '@angular/core';
import { template } from '@angular/core/src/render3';

@Component({
    selector:'app-name-parent',
    template:`
      <h2>Master controls {{names.length}} names</h2>
      <app-name-child *ngFor="let name of names;" [name]="name"></app-name-child>
    `
})
export class NameParentComponent {
    names = ['Mr. IQ', '   ', '  Bombasto  '];
}