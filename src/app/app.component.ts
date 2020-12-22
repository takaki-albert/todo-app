import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
  FormFieldTypes
} from '@aws-amplify/ui-components';

import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {
  tasks;
  taskForm;

  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes = [
    {
      type: "email",
      label: "email",
      placeholder: "your email",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      placeholder: "your password",
      required: true,
    }
  ]

  constructor(
    private service: TaskService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
  ) {
    this.taskForm = this.formBuilder.group({name: ''});
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })

    this.tasks = this.service.list(this.user);
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  onSubmit(newTask) {
    console.log(newTask);
    this.service.register(Math.floor(Math.random() * Math.floor(10000)), newTask.name, this.user);
    this.tasks = this.service.list(this.user);
    this.taskForm.reset();
    this.ref.detectChanges();
  }

  onCompleteTask(index) {
    this.service.delete(this.user, index);
    this.tasks = this.service.list(this.user);
  }
}
