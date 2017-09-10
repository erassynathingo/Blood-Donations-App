import { APIFunctionsService } from '../services/api-functions.service';
import { Component, OnInit } from '@angular/core';
import {ChartsModule} from 'ng2-charts';



@Component({
    selector: 'dashboard-template',
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.css"],
})

export class DashboardComponent implements OnInit{
 public barChartOptions:any = {
   scaleShowVerticalLines: false,
   responsive: true
 };
 public barChartLabels:string[] = ['0-', '2007', '2008', '2009', '2010', '2011', '2012','2013'];
 public bar:string = 'bar';
 public line:string = 'line';
 public pie:string = 'pie';
 public doughnut:string = 'radar';
 public barChartLegend:boolean = true;

 blood_counts: Array<Object>=[];
 constructor(private apiFunction: APIFunctionsService){

 }
   ngOnInit(): void {
     this.getAllBloodCounts()
   }

   private getAllBloodCounts = (data?:any):void=>{
      this.apiFunction.getMany("/blood_count").subscribe(data=>{
        this.blood_counts = data;
        console.log(this.blood_counts)
     })
   }

 public barChartData:any[] = [
   {data: [65, 59, 80, 81, 56, 55, 40, 30], label: 'Series -'}
 ];

 // events
 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }

}
