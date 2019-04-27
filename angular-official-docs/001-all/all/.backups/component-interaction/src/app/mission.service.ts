import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 *  Parent and children communicate via a service
 *  A parent component and its children share a service whose interface enables bi-directional communication within the family.
 *  
 *  The scope of the service instance is the parent component and its children. Components outside this component subtree have no access to the service or their communications.
 *  
 *  This MissionService connects the MissionControlComponent to multiple AstronautComponent children.
 */

 @Injectable()
 export class MissionService {

     // Observable string sources
     private missionAnnouncedSource = new Subject<string>();
     private missionConfirmedSource = new Subject<string>();

     missionAnnounced$ = this.missionAnnouncedSource.asObservable();
     missionConfirmed$ = this.missionConfirmedSource.asObservable();
     
     announceMission(mission: string) {
         this.missionAnnouncedSource.next(mission);
     }
     confirmMission(astronaut: string) {
        this.missionConfirmedSource.next(astronaut);
    }
 }