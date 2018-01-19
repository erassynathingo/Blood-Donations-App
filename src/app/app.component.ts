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

  constructor(
    private apiFunctions: APIFunctionsService,
    private router: Router,
    private userService: UserService,
    private pnotify: Pnotify
  ) {
    console.log(JSON.parse(localStorage.getItem("currentUser")) == null);
    this.hideElements();

  }

  User: any;

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();
    this.User =
      JSON.parse(localStorage.getItem("currentUser")) == null
        ? { firstName: "Guest", lastName: "Donor" }
        : JSON.parse(localStorage.getItem("currentUser"));

        localStorage.setItem('role', 'Admin');
  }

  public logout = (data?: any): void => {
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

  public hideElements = (): void => {
    if ((JSON.parse(localStorage.getItem("currentUser")) == null) === true) {
      $('.doctor, .admin').hide();
    }else {
      console.log("Role: ", localStorage.getItem('role'));
      if (localStorage.getItem('role') !== 'Admin') {
        console.log("Not Admin");
        $('.administrator').hide();
      }else {
        console.log("Doctor");
      }
    }
  }
}
