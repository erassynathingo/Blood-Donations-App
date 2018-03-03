import { DashboardComponent } from './../dashboard/dashboard.component';
import { AppComponent } from './../app.component';
import { Logger } from "./../services/logger.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Credentials } from "./credentials";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { User } from "./user";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-root",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
  providers: [UserService, DashboardComponent]
})
export class LoginComponent implements OnInit, AfterViewInit {
  User: any;
  errorMessage: string;
  returnUrl: string;

  loginForm: FormGroup; // Login form Model
  registrationForm: FormGroup;
  public submitted: boolean;
  public events: any[] = []; // use to display form change events

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    public dashboard: DashboardComponent
  ) {
    this.createLoginForm();
    this.createRegisterForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem('role', 'Admin');
  }

  public createLoginForm = (data?: any): void => {
    this.loginForm = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]]
    });
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
  }

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();
    $(".ui.modal").modal();
    $('.no').hide();
  }

  ngAfterViewInit(): void {
    $(".fixed.menu").transition("vertical flip");
  }

  public login = (model: any): void => {
    Logger.log(model);          /**@todo remove */
    $(".login").dimmer("show");
    this.apiFunctions.login("/auth", model).subscribe(
      user => {

        setTimeout(() => {
          $(".login").dimmer("hide");
          this.userService.setUser(user);
          this.appComponent.activateUser();
          this.userService.getUser().then(data => this.User = data);
          this.router.navigate(['/dashboard']);
          //location.reload();
          localStorage.setItem('role', user.role);
          $(".fixed.menu").transition("horizontal flip");
        }, 3000);
      },
      error => {
        setTimeout(() => {
          $(".login").dimmer("hide");
          $(".ui.card").transition("shake");
          const resp = JSON.parse(error.body);
          this.pnotify.error(resp.message, 3000, "Login Error");
        }, 3000);
      }
    );
  }

  public prepareDash = (): void => {
    this.dashboard.getAllBloodCounts();
  }

  public register = (model: Object): void => {
    console.log("Registering: ", model);          /**@todo remove */
    this.apiFunctions.register("/users", model).subscribe(
      data => {
        Logger.log(`User Creation Successfull ${data}`);          /**@todo remove */
        console.log(data);          /**@todo remove */
        this.pnotify.success("User Creation Successfull", 3000, "Success");
        this.router.navigate(['/login']);
      },
      error => {
        console.log("Login ", this.errorMessage);          /**@todo remove */
        let resp = JSON.parse(error.body);
        this.pnotify.error(resp.message, 3000, "Registration Error");
      }
    )
  }

  public registerForm = (): void => $(".ui.registerModal.modal").modal("show");

  public closeModal = (): void => $(".ui.modal").modal("hide");

  public hideElements = (): void => {
    $('.no').hide();
  }
}
