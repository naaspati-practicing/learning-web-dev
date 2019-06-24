import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroChildComponent } from './hero-child.component';
import { HeroParentComponent } from './hero-parent.component';
import { NameChildComponent } from './name-child.component';
import { NameParentComponent } from './name-parent.component';
import { VersionChildComponent } from './version-child.component';
import { VersionParentComponent } from './version-parent.component';
import { VoterComponent } from './voter.component';
import { VoteTakerComponent } from './votetaker.component';
import { CountdownLocalVarParentComponent, CountdownViewChildParentComponent } from './countdown-parent.component';
import { CountdownTimerComponent } from './countdown-timer.component';
import { MissionControlComponent } from './missioncontrol.component';
import { AstronautComponent } from './astronaut.component';

const directives = [
  AppComponent,
  HeroChildComponent,
  HeroParentComponent,

  NameChildComponent,
  NameParentComponent,
  
  VersionChildComponent,
  VersionParentComponent,

  VoterComponent,
  VoteTakerComponent,

  CountdownLocalVarParentComponent,
  CountdownTimerComponent,
  CountdownViewChildParentComponent,

  MissionControlComponent,
  AstronautComponent
];

@NgModule({
  declarations: directives,
  imports: [ BrowserModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
