import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Logger } from "./../services/logger.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";

@Component({
  selector: "user-manager",
  styleUrls: ['./user-manager.component.css'],
  templateUrl: "user-manager.component.html"
})
export class UserManagerComponent implements OnInit {
  Users: Array<Object> = [];
  User: Object;
  registrationForm: FormGroup;
  resetForm: FormGroup;

  loggedInUser: Object;
  currentUser: Object = {
    _id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    permissions: []
  };
  focusedId: number;

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService,
    private router: Router

  ) {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')) == null
      ? { firstName: '', lastName: '' }
      : JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllUsers();
      console.log("Logged in User: ", this.loggedInUser);
    this.createRegisterForm();
    this.createResetForm();
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

  public deleteUser = (id: any): void => {
    this.apiFunctions.deleteOne(`/users/${id}`).subscribe(data => {
      console.log(data);
      this.getAllUsers();
      $(`.ui.icon.button.${id}`).popup('hide');
      this.pnotify.success('', 3000, 'Delete Success');
    },
      error => {
        Logger.log(`${JSON.stringify(error)}`);
        console.log(error);
        const resp = JSON.parse(error.body);
        this.pnotify.error(resp.message, 3000, 'Delete Error');
      });
  }

  public deletePopUp = (data: number): void => {
    console.log(data);
    this.focusedId = data;
    $(`.ui.icon.button.${data}`).popup({
      transition: 'fade',
      on: 'click',
      popup: $('.ui.custom.popup'),
      color: 'red'
    }).popup('show');
  }

  public hidePopUp = (data?: any): void => {
    console.log(this.focusedId);
    $(`.ui.icon.button.${this.focusedId}`).popup('hide');
  }

  public viewOne = (data?: any): void => {
    console.log(`User Passed: `, data);
    this.currentUser = data;
    $('.ui.page.viewer').dimmer('show');
  }

  public closeDimmer = (element: string): void => {
    $(element).dimmer('hide');
  }

  public addUser = (): void => {
    $('.ui.page.addUserForm').dimmer('show');
    $('.ui .dropdown').dropdown();

  }

  public resetPasswordDimmer = (): void => {
    console.log("Password Reset Modal")
    $('.ui.page.resetPasswordModal').dimmer('show');
  }

  public submitForm = (model: any): void => {
    model.permissions = $('#permissions').dropdown('get value');
    console.log("FORM: ", model);
    this.closeDimmer('.ui.page.addUserForm');
    $('.ui.inverted.dimmer.page.userSubmit').dimmer('show', {
      duration: {
        show: 1000,
        hide: 500
      }
    });

    this.apiFunctions.register(`/users`, model).subscribe(data => {
      console.log(data);
      setTimeout(() => {
        this.closeDimmer('.ui.inverted.dimmer.page.userSubmit');
        this.pnotify.success('User Successfully Added', 2000, 'Success');
        this.closeDimmer('.ui.inverted.dimmer.page.userSubmit');
        this.getAllUsers();
        this.router.navigate(['/user-manager']);
      }, 1000);
      this.closeDimmer('.ui.inverted.dimmer.page.userSubmit');
    }, error => {
      console.log(error);
      setTimeout(() => {
        const resp = JSON.parse(error.body);
        this.pnotify.error(resp.message, 3000, 'User Creation Error');
        this.router.navigate(['/user-manager']);
        this.closeDimmer('.ui.page.addUserForm');
        this.closeDimmer('.ui.inverted.dimmer.page.userSubmit');
      }, 500);
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
  };

  public createResetForm = (data?: any): void => {
    this.resetForm = this._fb.group({
      password: ["", [Validators.required]],
    });
  };

}
