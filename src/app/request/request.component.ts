import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { APIFunctionsService } from "../services/api-functions.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'request',
	templateUrl: 'request.component.html'
})

export class RequestComponent implements OnInit {


  loggedInUser: any;
  requestForm: FormGroup; // Login form Model

  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}
  ngOnInit() {
    // Initiating Calendar Functions
    this.initSemanticFunctions();
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')) == null
      ? { firstName: '', lastName: '' }
      : JSON.parse(localStorage.getItem('currentUser'));
      this.createForm();
  }

  private initSemanticFunctions = (): void => {
    $(".ui.dropdown").dropdown();
    $(".ui.radio.checkbox").checkbox();
    $(".ui.checkbox").checkbox();
  }

  public request = (model): void => {
      $(".request").dimmer("show");
    model.requester = this.loggedInUser.id_number;
    model.blood_type = $('#blood_type').dropdown('get value');
    console.log("Model: ", model);

    this.apiFunctions.postData("/users/request", model).subscribe(
      data => {
        setTimeout(() => {
          $(".request").dimmer("hide");
          console.log("Req resp: ", data);
          this.pnotify.success(data.message, 15000, "Request Received");
        }, 3000);
      },
      error => {
        setTimeout(() => {
          $(".request").dimmer("hide");
          const resp = JSON.parse(error.body);
          this.pnotify.error(resp.message, 3000, "Request Error");
        }, 3000);
      }
    );
  }

  public createForm = () => {
    this.requestForm = this._fb.group({
      requester: ["", [Validators.required]],
      blood_type: ["", [Validators.required]],
      amount: ["", [Validators.required]]
    });
  }
}
