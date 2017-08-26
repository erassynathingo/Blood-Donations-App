import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Credentials } from "./credentials";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { Logger } from "../services/logger.service";
import { User } from "./user";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from 'rxjs';

@Component({
  selector: "login-template",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, AfterViewInit {
  User: User;
  errorMessage: string;

  loginForm: FormGroup; // Login form Model
  public submitted: boolean;
  public events: any[] = []; // use to display form change events

  constructor(private _fb: FormBuilder, private pnotify: Pnotify, private apiFunctions: APIFunctionsService) {
    this.createForm();
  }

  private createForm = (data?: any): void => {
    this.loginForm = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]]
    });
  };

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();
  }

  ngAfterViewInit(): void {
  }
  private login = (model: Object): void=>{
    Logger.log(model);
    this.apiFunctions.login('/auth', model).subscribe(user=>this.User = user, error=>{
      this.errorMessage = <any>error;
      Logger.error(this.errorMessage);
      this.pnotify.error("Error", 5 ,this.errorMessage);
    })
  }
}
