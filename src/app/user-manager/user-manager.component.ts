import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Logger } from "./../services/logger.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";

@Component({
  selector: "user-manager",
  templateUrl: "user-manager.component.html"
})
export class UserManagerComponent implements OnInit {
  Users: Array<Object> = [];
  User: Object;
  registrationForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService

  ) {
    this.createRegisterForm();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers = (data?: any): void => {
    Logger.log(`Getting All Users`);
    this.apiFunctions.getMany("/users").subscribe(
      users => {
        this.Users = users;
        console.log(`Users Array:`, this.Users);
      },
      error => {
        let resp = JSON.parse(error.body);
        this.pnotify.error(resp.message, 3000, "Fetch Error");
      }
    );
  };

  public getOneUser = (idNumber: number): void => {
    Logger.log(`Getting ${idNumber}`);
    this.apiFunctions.getOne(`/${idNumber}`).subscribe(
      user => (this.User = user),
      error => {
        Logger.log(`${JSON.stringify(error)}`);
        console.log(error);
        let resp = JSON.parse(error.body);
        this.pnotify.error(resp.message, 3000, "Single Fetch Error");
      }
    );
  };

  public openModal = (url: any): void => $(url).modal("show");

  public deleteUser = (id: any): void=>{
    this.apiFunctions.deleteOne(`/users/${id}`).subscribe(data=>{
      this.pnotify.success(`User Deleted`, 3000, "Success")
    },
    error => {
      Logger.log(`${JSON.stringify(error)}`);
      console.log(error);
      let resp = JSON.parse(error.body);
      this.pnotify.error(resp.message, 3000, "Delete Error");
    })
  }

  public createRegisterForm = (data?: any): void => {
    this.registrationForm = this._fb.group({
      id_number: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      username: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required]],
      role: ["Donor", [Validators.required]]
    });
  };

  public registerForm = (): void => $(".ui.addUser.modal").modal("show");

}
