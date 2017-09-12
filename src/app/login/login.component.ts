import { Logger } from "./../services/logger.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Credentials } from "./credentials";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { User } from "./user";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-root",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
  providers: [UserService]
})
export class LoginComponent implements OnInit, AfterViewInit {
  User: any;
  errorMessage: string;

  loginForm: FormGroup; // Login form Model
  registrationForm: FormGroup;
  public submitted: boolean;
  public events: any[] = []; // use to display form change events

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService,
    private router: Router,
    private userService: UserService
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

  ngAfterViewInit(): void {
    $(".fixed.menu").transition("vertical flip");
  }

  private login = (model: Object): void => {
    Logger.log(model);
    $(".login").dimmer("show");
    this.apiFunctions.login("/auth", model).subscribe(
      user => {
        setTimeout(() => {
          $(".login").dimmer("hide");
          this.userService.setUser(user);
          console.log(this.userService.getUser);
          this.User = this.userService.getUser;
          this.router.navigateByUrl("/dashboard");
          $(".fixed.menu").transition("horizontal flip");
        }, 3000);
      },
      error => {
        setTimeout(() => {
          this.errorMessage = <any>error;
          $(".login").dimmer("hide");
          $(".ui.card").transition("shake");
          let resp = JSON.parse(error.body);
          this.pnotify.error(resp.message, 3000, "Login Error");
        }, 3000);
      }
    );
  };

  private register = (model: Object): void => {
    console.log("Registering: ", model);
    this.apiFunctions.register("/users", model).subscribe(
      data => {
        Logger.log(`User Creation Successfull ${data}`);
        console.log(data);
      },
      error => {
        this.errorMessage = <any>error;
        console.log("Login ", this.errorMessage);
        this.pnotify.error("Error", 5, this.errorMessage);
      }
    );
  };

  public registerForm = (): void => $(".ui.modal").modal("show");

  public closeModal = (): void => $(".ui.modal").modal("hide");
}
