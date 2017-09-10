import { Injectable } from "@angular/core";

import { User } from "../login/user";

@Injectable()
export class UserService {

  User: User;

  getUser():User{
    return this.User;
  }

  setUser(user: any):void{
    this.getUser = user;
  }
}
