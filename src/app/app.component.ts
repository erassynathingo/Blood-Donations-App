import { Pnotify } from "./services/pnotify.service";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { APIFunctionsService } from "./services/api-functions.service";
import { Component, OnInit } from "@angular/core";
import { User } from "./login/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = "Blood Donations Admin";
  currentRole: any;

  constructor(
    private apiFunctions: APIFunctionsService,
    private router: Router,
    private userService: UserService,
    private pnotify: Pnotify
  ) {

  }

  User: any;
  currentUser: any;

  /** Permissions */

  adminPermissions: Array<String> = ['Admin'];
  doctorPermissions: Array<String> = ['Doctor'];
  superAdminPermissions: Array<String> = ['Super_Admin'];

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();
    this.User = JSON.parse(localStorage.getItem("currentUser")) == null
        ? { firstName: "Guest", lastName: "Donor" }
        : JSON.parse(localStorage.getItem("currentUser"));
        // tslint:disable-next-line:max-line-length
        console.log("current Role INIT: ", localStorage.getItem("role"));
        console.log('User: ', this.User);

  }

  public logout = (data?: any): void => {
    this.router.navigate(['/login']);
    this.apiFunctions.logout("/auth").subscribe(
      resp => {
        console.log(resp);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("role");
        this.User.firstName = "Guest";
        this.User.lastName = "Donor";
        this.router.navigate(['/login']);
        this.pnotify.success("Successfully Logged Out", 4000, "Success");
      },
      error => {
        console.log(error);
        this.pnotify.error(error, 2000, "Error");
      }
    );
  }

  public activateUser = (): void => {
    this.User =
      JSON.parse(localStorage.getItem("currentUser")) == null
        ? { firstName: "", lastName: "" }
        : JSON.parse(localStorage.getItem("currentUser"));


    console.log("User: ", this.User);

  }

  public viewOne = (data?: any): void => {
    console.log(`User Passed: `, data);
    this.currentUser = this.User;
    $('.ui.page.viewer').dimmer('show');
  }

  public closeDimmer = (element: string): void => {
    console.log("Cloding Dimmer: ", element);
    $(element).dimmer('hide');
  }



  /*public hideView = (view): Boolean => {
    console.log(channelArray.includes("three"));
    switch(view){
      case: 'Doctor': {
        return this.doctorPermissions.includes(this.User.role);
        break;
      }
      case: 'Admin': {
        return this.doctorPermissions.includes(this.User.role);
        break;
      }
      case: 'Super_Admin': {
        return this.doctorPermissions.includes(this.User.role);
        break;
      }
      case: 'Donor': {
        return this.doctorPermissions.includes(this.User.role);
        break;
      }
    }
    return true;
  }*/
}
