import { Injectable } from "@angular/core";

import { User } from "../login/user";

@Injectable()
export class UserService {

  User: User = null;

  getUser():Promise<User>{
    return this.User == null ? Promise.reject("No User"): Promise.resolve(this.User)
  }

  setUser(user: any):void{
    this.User = user;
    console.log("User Set: ", this.getUser);
  }
}
