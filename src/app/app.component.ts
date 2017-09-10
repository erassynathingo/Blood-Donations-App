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
    private userService: UserService
  ) {}

  currentUser: any;

  ngOnInit(): void {
    $(".ui.dropdown").dropdown();

    this.currentUser = this.userService.getUser();

    this.setsetUser(this.currentUser);
  }

  private logout = (data?: any): void => {
    this.apiFunctions.logout("/auth").subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("/login");
      },
      error => {
        console.log(error);
      }
    );
  };

  public setsetUser = (User: any): void=>{
    let user: any = User;
    console.log("App Comp: ", user)
  }
}
