import { Injectable } from "@angular/core";

import { User } from "../login/user";

@Injectable()
export class UserService {

  User: User;

  getUser(){
    return Promise.resolve(this.User);
  }

  setUser(user: User):void{
    this.User = user;
    localStorage.setItem('currentUser', JSON.stringify(this.User));
  }
}
