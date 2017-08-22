import { Declarations } from '@angular/language-service/src/types';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { APIFunctionsService } from '../services/api-functions.service';

import { DonationApplication } from '../models/application.model';
import { Logger } from '../services/logger.service';
import { Pnotify } from '../services/pnotify.service';

@Component({
  selector: 'donate-blood',
  templateUrl: 'donate-blood.component.html'
})

export class DonateBloodComponent implements OnInit, AfterViewInit {

  public donorForm: FormGroup; // form Model
  public submitted: boolean;
  public events: any[] = []; // use to display form change events

  // use formbuilder to simplify syntax
  constructor(private _fb: FormBuilder, private pnotify: Pnotify) {


  }

  ngAfterViewInit() {
  }


  ngOnInit(): void {
<<<<<<< HEAD
    this.createForm();
    // Initiating Calendar Functions
    this.initSemanticFunctions();

=======
    
    $('.menu .step').tab();
>>>>>>> 35c87e18960d42a630e143636fe4d04e776dbc10
  }

  private createForm = (data?: any): void => {
    this.donorForm = this._fb.group({
      personalInfo: this.personalInfo()
    })
    this.observeForm();
  }

  private initSemanticFunctions = () : void=>{
    $('#dateOfBirth').calendar({
      startMode: 'year',
      type: 'date'
    });
    $('.ui.dropdown').dropdown();
    $('.ui.radio.checkbox').checkbox();
    $('.ui.checkbox').checkbox();
  }

  private submitForm = (model: DonationApplication, valid: boolean): void => {
    this.submitted = true;
    console.log("Donor Application: ", model);
  }

  private observeForm = (data?: any): void => {       /** @todo Remove this function */
    this.donorForm.valueChanges.subscribe(value => {
      Logger.info(value);
    })
  }

<<<<<<< HEAD
=======
  private notify = (): void=>{
    this.pnotify.error("Yes", 4,"This mofoe Works");
  }

  private changePage = (nextPage: string, currentPage:string): void =>{
    $(currentPage).transition('bounce');
   /// $(nextPage).transition('slide left');
  }

>>>>>>> 35c87e18960d42a630e143636fe4d04e776dbc10
  personalInfo() {
    return this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(5)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      maidenName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      language: ['', [Validators.required]],
      country: ['', [Validators.required]],
      populationGroup: ['', [Validators.required]],
      postalAddress: ['', [Validators.required]],
      homeAddress: ['', [Validators.required]],
      workAddress: ['', [Validators.required]],
      homeNumber: this._fb.group(this.numberFormat()),
      workNumber: this._fb.group(this.numberFormat()),
      cellNumber: this._fb.group(this.numberFormat()),
      email: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      familyDoctor: this._fb.group(this.otherPerson()),
      emergencyContact: this._fb.group(this.otherPerson()),
      lastDonationInNamibia: {
        namibia: ['', [Validators.required]],
        previousLocationDetails: {
          location: ['', [Validators.required]],
          date: ['', [Validators.required]],
          previousAddress: ['', [Validators.required]],
          howManyDonationGiven: ['', [Validators.required]],
        }
      }
    })
  }

  numberFormat() {
    return {
      code: ['+264', [Validators.required, Validators.maxLength(3)]],
      number: ['', [Validators.required, Validators.maxLength(7)]]
    }
  }

  otherPerson() {
    return {
      firstName: ['', [Validators.required, Validators.maxLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(3)]],
      contactNumber: this._fb.group(this.numberFormat())
    }
  }
}
