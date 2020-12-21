import { API, Auth } from 'aws-amplify';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
  apiName = 'api75881524';
  path = '/tasks/'

	async list() {
      let myInit = {
          headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
          response: true,
      }

      API.get(this.apiName, this.path, myInit).then(response => {
          console.log(response)
          return response;
      }).catch(error => {
          console.log(error.response)
          return error;
      });
	}

  async register(newTaskName, user) {
    let myInit = {
      headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
      response: true,
      body: {id: newTaskName + user.username, name: newTaskName, owner: user.username}
    }

    API.post(this.apiName, this.path, myInit).then(response => {
      console.log(response)
      return response;
    }).catch(error => {
      console.log(error.response)
      return error;
    });
	}

	async delete(id) {
      let myInit = {
          headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`},
          response: true
      }

      API.del(this.apiName, `${this.path}${id}`, myInit).then(response => {
          console.log(response)
          return response;
      }).catch(error => {
          console.log(error.response)
          return error;
      });
	}
}
