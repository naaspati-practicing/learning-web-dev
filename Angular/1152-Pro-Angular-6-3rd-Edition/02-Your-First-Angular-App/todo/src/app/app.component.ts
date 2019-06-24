import { Component } from '@angular/core';
import { Model, TodoItem } from './model';

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model = new Model();

  getName() {
    return this.model.user;
  }
  getTodoItems() {
    return this.model.items.filter(t => !t.done);
  }
  addItem(name: string) {
    if(name)  
      this.model.items.push(new TodoItem(name, false));
  }
}
