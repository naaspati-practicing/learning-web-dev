import { Component, Input } from '@angular/core';

 // Intercept input property changes with a setter

 @Component({
     selector: 'app-name-child',
     template: '<h3>{{name}}</h3>'
 })
 export class NameChildComponent {
     private _name = '';

     @Input()
     set name(name: string) {
         this._name = (name && name.trim()) || '<No Name Specified>';
     }
     get name(): string {
         return this._name;
     }
 }