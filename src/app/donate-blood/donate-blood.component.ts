import { APIFunctionsService } from './../services/api-functions.service';
import { UserService } from "./../services/user.service";
import { Declarations } from "@angular/language-service/src/types";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";

import { DonationApplication } from "../models/application.model";
import { Logger } from "../services/logger.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";
import { User } from "../login/user";

@Component({
  selector: "donate-blood",
  templateUrl: "donate-blood.component.html",
  providers: [UserService]
})
export class DonateBloodComponent implements OnInit, AfterViewInit {
  // use formbuilder to simplify syntax
  constructor(
    private _fb: FormBuilder,
    private pnotify: Pnotify,
    private userService: UserService,
    private apiFunctions: APIFunctionsService
  ) {
    this.createForm();

  }

  public donorForm: FormGroup; // form Model
  public submitted: boolean;
  public events: any[] = []; // use to display form change events

  User: User;



  ngAfterViewInit() {
    //this.User = this.userService.getUser;

    $(".fixed.menu").transition("show");
  }

  ngOnInit(): void {
    // Initiating Calendar Functions
    this.initSemanticFunctions();
    $(".menu .step").tab();
    //this.validateForm();
  }

  private createForm = (data?: any): void => {
    Logger.info("Creating form");
    this.donorForm = this._fb.group({
      personalInfo: this.personalInfo(),
      healthInfo: this.healthInfo(),
      riskInfo: this.riskInfo()
    });
    this.observeForm();
  };

  private initSemanticFunctions = (): void => {
    $("#dateOfBirth").calendar({
      startMode: "year",
      type: "date"
    });
    $("#injectionDate").calendar({
      startMode: "year",
      type: "date"
    });
    $(".ui.dropdown").dropdown();
    $(".ui.radio.checkbox").checkbox();
    $(".ui.checkbox").checkbox();
  };

  private submitForm = (model: DonationApplication, valid: boolean): void => {
    this.submitted = true;
    this.apiFunctions.register(`/donate`, model).subscribe(data=>{
      console.log(data);
    }, error=>{
      console.log(error);
    })
    console.log("Donor Application: ", model);
  };

  private observeForm = (data?: any): void => {
    /** @todo Remove this function */
    this.donorForm.valueChanges.subscribe(value => {
      Logger.info(value);
    });
  };


  private validateForm = (): void => {
    $(".ui.form").form({
      fields: {
        firstName: {
          identifier: "firstName",
          rules: [
            {
              type: "required",
              prompt: "Please enter a First Name"
            }
          ]
        },
        lastName: {
          identifier: "lastName",
          rules: [
            {
              type: "lastName",
              prompt: "Please enter a Last Name"
            }
          ]
        }
      },
      inline: true,
      on: "blur"
    });
  };

  private changePage = (currentPage: string): void => {
    $(currentPage).transition("shake");
  };

  private revealSubForm = (): void => {
    let check = $(".ui.checkbox.subFormToggle").checkbox("is checked");
    check
      ? $("#subForm").transition("vertical flip")
      : $("#subForm").transition("vertical flip");
  };

  personalInfo() {
    return this._fb.group({
      title: ["", [Validators.required, Validators.maxLength(5)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      maidenName: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      language: ["", [Validators.required]],
      town: ["", [Validators.required]],
      populationGroup: ["", [Validators.required]],
      postalAddress: ["", [Validators.required]],
      homeAddress: ["", [Validators.required]],
      workAddress: ["", [Validators.required]],
      homeNumber: this._fb.group(this.numberFormat()),
      workNumber: this._fb.group(this.numberFormat()),
      cellNumber: this._fb.group(this.numberFormat()),
      email: ["", [Validators.required]],
      occupation: ["", [Validators.required]],
      familyDoctor: this._fb.group(this.otherPerson()),
      emergencyContact: this._fb.group(this.otherPerson()),
      lastDonationInNamibia: this._fb.group({
        location: ["", [Validators.required]],
        date: ["", [Validators.required]],
        previousAddress: ["", [Validators.required]],
        howManyDonationGiven: ["", [Validators.required]]
      })
    });
  }

  numberFormat() {
    return {
      code: ["+264", [Validators.required, Validators.maxLength(3)]],
      number: ["", [Validators.required, Validators.maxLength(7)]]
    };
  }

  otherPerson() {
    return {
      firstName: ["", [Validators.required, Validators.maxLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(3)]],
      contactNumber: this._fb.group(this.numberFormat())
    };
  }

  healthInfo() {
    return this._fb.group({
      feelingWellandInGooHealth: ["", [Validators.required]],
      eatenInLastFourHours: ["", [Validators.required]],
      everBeenRefusedAsBloodDonor: ["", [Validators.required]],
      involdedInLifeEndageringActivity: this._fb.group({
        drivingPublicTransport: ["", [Validators.required]],
        pilotingAircraft: ["", [Validators.required]]
      }),
      duringLastSevenDays: this._fb.group({
        takenMedication: ["", [Validators.required]],
        beenToTheDentist: ["", [Validators.required]]
      }),
      inPastSixMonths: this._fb.group({
        hadVaccination: ["", [Validators.required]],
        exposedToInductrialChemicals: ["", [Validators.required]],
        receivedTreatment: ["", [Validators.required]],
        undergoneSurgery: ["", [Validators.required]],
        exposedToBlood: ["", [Validators.required]],
        hadPiercing: ["", [Validators.required]]
      }),
      operationInNextTwoMonths: ["", [Validators.required]],
      participatedInDrugTrial: ["", [Validators.required]],
      takenTigasonOrNeotigason: ["", [Validators.required]],

      femaleDonors: this._fb.group({
        breastFeeding: ["", [Validators.required]],
        pregnant: ["", [Validators.required]]
      }),
      hadHepatitisBefore: ["", [Validators.required]],
      givenHepatitisBinlast6Months: ["", [Validators.required]],
      hadMalariaInPast36Months: ["", [Validators.required]],
      visitedMalariaAreainPast3Weeks: ["", [Validators.required]],

      hadHeartDiseaseBefore: ["", [Validators.required]],
      hadLungDiseaseBefore: ["", [Validators.required]],
      hadBloodDiseaseBefore: ["", [Validators.required]],
      hadThyroidDiseaseBefore: ["", [Validators.required]],
      hadSkinDiseaseBefore: ["", [Validators.required]],
      hadChagasDiseaseBefore: ["", [Validators.required]],
      hadChronicMedicalConditionBefore: ["", [Validators.required]],

      CJD: this._fb.group({
        hadTissueTransplantBefore: ["", [Validators.required]],
        hadFertilityMedicineBefore: ["", [Validators.required]],
        hadRelativeWithCJD: ["", [Validators.required]],
        timeInUK12months: ["", [Validators.required]]
      }),
      youOrSexualPartner: this._fb.group({
        sufferedFromDiarrhoeaPast12Months: ["", [Validators.required]],
        receivedBloodTransInLast6Months: ["", [Validators.required]]
      })
    });
  }

  riskInfo() {
    return this._fb.group({
      HIVorARVSwithPartner: ["", [Validators.required]],
      donateReasonForHIVTest: ["", [Validators.required]],
      inPast6Months: this._fb.group({
        uncertainSexualActivity: ["", [Validators.required]],
        sexualAssaultVictim: ["", [Validators.required]],
        sexWithProstitute: ["", [Validators.required]]
      }),
      sufferedFromSTI12months: ["", [Validators.required]],
      injectedWithDrugs: ["", [Validators.required]],
      uncertainOfPartnerSexualPast: ["", [Validators.required]],
      bloodSafeForTransfusion: ["", [Validators.required]]
    });
  }
}
