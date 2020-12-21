import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  tasks;
  taskForm;

  constructor(private service: TaskService, private formBuilder: FormBuilder) {
	  this.taskForm = this.formBuilder.group({name: ''});
  }

  ngOnInit() {
	  this.tasks = this.service.list();
  }

  onSubmit(newTask) {
	  this.service.register(newTask.name);
	  this.tasks = this.service.list();
	  this.taskForm.reset();
  }

  onCompleteTask(index) {
	  this.service.delete(index);
	  this.tasks = this.service.list();
  }
}
