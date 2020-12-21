import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	tasks;

	constructor() {
		this.tasks = ['Task-A', 'Task-B']
	}

	list() {
		return this.tasks;
	}

	register(newTask) {
		this.tasks.push(newTask);
	}

	delete(index) {
		this.tasks.splice(index, 1);
	}
}
