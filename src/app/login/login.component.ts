import { Logger } from "./../services/logger.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Credentials } from "./credentials";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { User } from "./user";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";

@Component({
  selector: "login-template",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, AfterViewInit {
  User: User;
  errorMessage: string;

  loginForm: FormGroup; // Login form Model
  registrationForm: FormGroup;
  public submitted: boolean;
  public events: any[] = []; // use to display form change events

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService
  ) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  private createLoginForm = (data?: any): void => {
    this.loginForm = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]]
    });
  };

  private createRegisterForm = (data?: any): void => {
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

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();
    $(".ui.modal").modal();
  }

  ngAfterViewInit(): void {}
  private login = (model: Object): void => {
    Logger.log(model);
    this.apiFunctions.login("/auth", model).subscribe(
      user => (this.User = user),
      error => {
        this.errorMessage = <any>error;
        Logger.error(this.errorMessage);
        this.pnotify.error("Error", 5, this.errorMessage);
      }
    );
  };

  private register = (model: Object): void => {
    console.log("Registering: ", model)
    this.apiFunctions.register("/users", model).subscribe(
      data => {
        Logger.log(`User Creation Successfull ${data}`);
        console.log(data);
      },
      error => {
        this.errorMessage = <any>error;
        console.log("Login ",this.errorMessage);
        this.pnotify.error("Error", 5, this.errorMessage);
      }
    );
  };

  public registerForm = (): void => $(".ui.modal").modal("show");

  public closeModal = (): void => $(".ui.modal").modal("hide");
}
