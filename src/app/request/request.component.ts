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
  date: string;



  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.createForm();
    this.observeForm();
    $(".ui.calendar.date").calendar({
      onChange: function (date, text) {
        console.log("changed: ", date, "\ntext: ", text);
        this.date = text;
      }
    });

    this.hideElements();
  }
  ngOnInit() {
    // Initiating Calendar Functions
    this.initSemanticFunctions();
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')) == null
      ? { firstName: '', lastName: '' }
      : JSON.parse(localStorage.getItem('currentUser'));

  }



  private observeForm = (data?: any): void => {
    /** @todo Remove this function */
    this.requestForm.valueChanges.subscribe(value => {
      console.log("form: ", value);
    });
  }

  private initSemanticFunctions = (): void => {
    $(".ui.dropdown").dropdown();
    $(".ui.radio.checkbox").checkbox();
    $(".ui.checkbox").checkbox();
    $("#date").calendar({
      onChange: function (date, text) {
        console.log("changed: ", date, "\ntext: ", text);
        this.date = text;
      }
    });
  }

  public request = (model): void => {
    $(".request").dimmer("show");
    model.requester = this.loggedInUser.id_number;
    model.blood_type = $('#blood_type').dropdown('get value');
    model.date = $('#dateValue').val();

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
      amount: ["", [Validators.required]],
      date: ["", [Validators.required]]
    });
  }

  public hideElements = (): void => {
    if ((JSON.parse(localStorage.getItem("currentUser")) == null) === true) {
      $('.doctor, .admin').hide();
    } else {
      console.log("Role: ", localStorage.getItem('role'));
      if (localStorage.getItem('role') !== 'Admin') {
        console.log("Not Admin");
        $('.admin').hide();
      } else {
        console.log("Doctor");
      }
    }
  }
}
