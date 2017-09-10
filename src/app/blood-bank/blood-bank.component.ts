import { APIFunctionsService } from './../services/api-functions.service';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Logger } from "../services/logger.service";
import { Pnotify } from "../services/pnotify.service";
import { Observable } from "rxjs";
import { User } from "../login/user";

@Component({
  selector: "blood-bank",
  templateUrl: "blood-bank.component.html"
})
export class BloodBankComponent implements OnInit {

  type: string;

  public one: number = 0;
  public two: number = 0;
  public three: number = 0;
  public four: number = 0;
  public five: number = 0;
  public six: number = 0;
  public seven: number = 0;
  public eight: number = 0;

  constructor(private pnotify: Pnotify, private apiFunctions: APIFunctionsService) {}

  ngOnInit() {
  }

  public addValue1 = ():void=>{
    this.one +=1;
  }
  public subtractValue1 = ():void=>{
    this.one -=1;
  }
  public addValue2 = ():void=>{
    this.two +=1;
  }
  public subtractValue2 = ():void=>{
    this.two -=1;
  }

  public subtractValue3 = ():void=>{
    this.three -=1;
  }
  public addValue3 = ():void=>{
    this.three +=1;
  }
  public subtractValue4 = ():void=>{
    this.four -=1;
  }
  public addValue4 = ():void=>{
    this.four +=1;
  }
  public subtractValue5 = ():void=>{
    this.five -=1;
  }
  public addValue5 = ():void=>{
    this.five +=1;
  }
  public subtractValue6 = ():void=>{
    this.six -=1;
  }
  public addValue6 = ():void=>{
    this.six +=1;
  }
  public subtractValue7 = ():void=>{
    this.seven -=1;
  }
  public addValue7 = ():void=>{
    this.seven +=1;
  }
  public subtractValue8 = ():void=>{
    this.eight -=1;
  }
  public addValue8= ():void=>{
    this.eight +=1;
  }

  private updateCount = (type: string, count: number): void=>{
    let countData = {
      blood_type: type,
      value: count
    }
    console.log("Registering Count: ", countData);
    this.apiFunctions.updateData('/blood_count',countData).subscribe(data=>{
      console.log(data);
    }, error=>{
      console.log(error);
    })
  }

  public getOneCount = (type: string): any=>{
    return this.apiFunctions.getOne(`/blood_count/${type}`).subscribe(data=>data.count)
  }
}



