import { API, Auth } from 'aws-amplify';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
  apiName = 'task';
  path = '/tasks/'

  async list(user) {
    let myInit = {
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
        response: true,
    }

    API.get(this.apiName, `${this.path}/${user.username}`, myInit).then(response => {
        console.log(response)
        return response;
    }).catch(error => {
        console.log(error.response)
        return error;
    });
  }

  async register(priority, newTaskName, user) {
    let myInit = {
      headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
      response: true,
      body: {priority: priority, name: newTaskName, owner: user.username}
    }

    API.post(this.apiName, this.path, myInit).then(response => {
      console.log(response)
      return response;
    }).catch(error => {
      console.log(error.response)
      return error;
    });
  }

  async delete(user, id) {
    let myInit = {
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
        response: true
    }

    API.del(this.apiName, `${this.path}/object/${user.username}/${id}`, myInit).then(response => {
        console.log(response)
        return response;
    }).catch(error => {
        console.log(error.response)
        return error;
    });
  }
}
