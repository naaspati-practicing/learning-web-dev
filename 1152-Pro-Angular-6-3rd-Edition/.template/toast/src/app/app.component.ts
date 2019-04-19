import { Component } from '@angular/core';
import { dummyModel } from './model';

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   model = dummyModel();

   getName() {
     return this.model.user;
   }
  
}
