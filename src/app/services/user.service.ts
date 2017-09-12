import { Injectable } from "@angular/core";

import { User } from "../login/user";

@Injectable()
export class UserService {

  User: User = null;

  getUser(){
    return this.User;
  }

  setUser(user: any):void{
    this.User = user;
  }
}
