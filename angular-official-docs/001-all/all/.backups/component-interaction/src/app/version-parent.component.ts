import { Component } from '@angular/core';

/**
h2 Source code version
button((click)='newMinor()') New Minor version
button((click)='newMajor()') New Major version
app-version-child([major]='major' [minor]='minor')

 */

@Component({
    selector:'app-version-parent',
    template:`
    <h2>Source code version</h2>
    <button (click)="newMinor()">New Minor version</button>
    <button (click)="newMajor()">New Major version</button>
    <app-version-child [major]="major" [minor]="minor"></app-version-child>
    `
})
export class VersionParentComponent {
    major = 1;
    minor = 23;

    newMinor() { this.minor++; }
    newMajor() { 
        this.major++; 
        this.minor = 0;
    }
}