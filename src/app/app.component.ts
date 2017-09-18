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
  ) {}

  User: any;

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();
    this.User =
      JSON.parse(localStorage.getItem("currentUser")) == null
        ? { firstName: "", lastName: "" }
        : JSON.parse(localStorage.getItem("currentUser"));
  }

  private logout = (data?: any): void => {
    this.apiFunctions.logout("/auth").subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("/login");
        localStorage.removeItem("currentUser");
        this.pnotify.success("Successfully Logged Out", 4000, "Success");
      },
      error => {
        console.log(error);
        this.pnotify.error(error, 2000, "Error");
      }
    );
  };

  public activateUser = (): void => {
    this.User =
      JSON.parse(localStorage.getItem("currentUser")) == null
        ? { firstName: "", lastName: "" }
        : JSON.parse(localStorage.getItem("currentUser"));


    console.log("User: ", this.User);

  };
}
