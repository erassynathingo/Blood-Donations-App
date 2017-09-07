import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Logger } from "./../services/logger.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";

@Component({
	selector: 'user-manager',
	templateUrl: 'user-manager.component.html'
})

export class UserManagerComponent implements OnInit {

  Users: Array<Object> = [];
  User: Object;

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService
  ){

  }

  ngOnInit() {
    this.getAllUsers();
  }

  private getAllUsers = (data?: any): void=>{
    Logger.log(`Getting All Users`);
    this.apiFunctions.getMany('/users').subscribe(users=>{
      console.log(`Returned Array:`, users)
      this.Users = users;
      console.log(`Users Array:`, this.Users)
    })
  }

  private getOneUser = (idNumber:number): void=>{
    Logger.log(`Getting ${idNumber}`);

    this.apiFunctions.getOne(`/${idNumber}`).subscribe(user=>this.User=user, error=>{
      Logger.log(`${JSON.stringify(error)}`)
      console.log(error);
    })
  }
}
