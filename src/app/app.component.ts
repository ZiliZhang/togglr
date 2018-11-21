import { Component } from '@angular/core';

import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private taskService: TaskService) { }

    addTask(){
        this.taskService.appendTask();
    }
}
