import { DashboardComponent } from "./../dashboard/dashboard.component";
import { APIFunctionsService } from "./../services/api-functions.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Logger } from "../services/logger.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";
import { User } from "../login/user";

@Component({
  selector: "blood-bank",
  templateUrl: "blood-bank.component.html",
  providers: [DashboardComponent]
})
export class BloodBankComponent implements OnInit {
  type: string;
  blood_counts: any;

  public one: number = 0;
  public two: number = 0;
  public three: number = 0;
  public four: number = 0;
  public five: number = 0;
  public six: number = 0;
  public seven: number = 0;
  public eight: number = 0;

  constructor(
    private pnotify: Pnotify,
    private apiFunctions: APIFunctionsService,
    public dashboard: DashboardComponent
  ) {
    $('.doctor, .admin').show();
  }

  ngOnInit() {
    this.populateCounts();
  }

  public addValue1 = (): void => {
    this.one += 1;
  };
  public subtractValue1 = (): void => {
    this.one -= 1;
  };
  public addValue2 = (): void => {
    this.two += 1;
  };
  public subtractValue2 = (): void => {
    this.two -= 1;
  };

  public subtractValue3 = (): void => {
    this.three -= 1;
  };
  public addValue3 = (): void => {
    this.three += 1;
  };
  public subtractValue4 = (): void => {
    this.four -= 1;
  };
  public addValue4 = (): void => {
    this.four += 1;
  };
  public subtractValue5 = (): void => {
    this.five -= 1;
  };
  public addValue5 = (): void => {
    this.five += 1;
  };
  public subtractValue6 = (): void => {
    this.six -= 1;
  };
  public addValue6 = (): void => {
    this.six += 1;
  };
  public subtractValue7 = (): void => {
    this.seven -= 1;
  };
  public addValue7 = (): void => {
    this.seven += 1;
  };
  public subtractValue8 = (): void => {
    this.eight -= 1;
  };
  public addValue8 = (): void => {
    this.eight += 1;
  };

  private updateCount = (type: string, count: number): void => {
    let countData = {
      blood_type: type,
      value: count
    };
    console.log("Registering Count: ", countData);
    this.apiFunctions.updateData("/blood_count", countData).subscribe(
      data => {
        console.log(data);
        this.dashboard.getAllBloodCounts();
        this.populateCounts();
        this.pnotify.success(`${countData.blood_type} Blood Type Updated `, 3000, "Bank Update Success");
      },
      error => {
        console.log(error);
        let resp = JSON.parse(error.body);
        this.pnotify.error(resp.message, 3000, "Bank Update Error");
      }
    );
  };

  public populateCounts = (): void=>{
    this.blood_counts = JSON.parse(localStorage.getItem("data")) == null ? [0,0,0,0,0,0,0,0,]: JSON.parse(localStorage.getItem("data"));
    console.log("COUNTS: ",this.blood_counts);
  }
}
