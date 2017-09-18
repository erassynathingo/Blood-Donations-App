import { APIFunctionsService } from "../services/api-functions.service";
import { Component, OnInit } from "@angular/core";
import { ChartsModule } from "ng2-charts";

@Component({
  selector: "dashboard-template",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    animations: {
      easing: "linear"
    },
    layout: {
      padding: {
        left: 60,
        right: 60,
        top: 0,
        bottom: 0
      }
    },
    title: {
      display: true,
      text: "Bar Chart"
    }
  };
  public pieChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    animations: {
      easing: "linear"
    },
    layout: {
      padding: {
        left: 60,
        right: 60,
        top: 0,
        bottom: 0
      }
    },
    title: {
      display: true,
      text: "Pie Chart"
    }
  };

  public doughnutChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    animations: {
      easing: "linear"
    },
    layout: {
      padding: {
        left: 60,
        right: 60,
        top: 0,
        bottom: 0
      }
    },
    label: "Doughnut Chart",
    type: "doughtnut"
  };

  public lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    animations: {
      easing: "linear"
    },
    layout: {
      padding: {
        left: 60,
        right: 60,
        top: 0,
        bottom: 0
      }
    },
    label: "Pie Chart"
  };

  public bar: string = "bar";
  public line: string = "line";
  public pie: string = "pie";
  public doughnut: string = "doughnut";
  public barChartLegend: boolean = true;

  blood_counts: Array<Object> = [];
  data: Array<Object> = [];
  labels: Array<String> = [];

  public barChartLabels: Array<String> = JSON.parse(localStorage.getItem("labels")) == null ? [
    "O-",
    "O+",
    "A+",
    "B+",
    "AB+",
    "AB-",
    "A-",
    "B-"
  ]: JSON.parse(localStorage.getItem("labels"));

  public barChartData: any[] = [
    /*{
      data: [50, 15, 120, 23, 73, 8, 45, 60],
      label: "Counts"
    },*/

    {
      data:
        JSON.parse(localStorage.getItem("data")) == null
          ? [50, 15, 120, 23, 73, 8, 45, 60]
          : JSON.parse(localStorage.getItem("data")),
          label: "Counts"
    }
  ];

  constructor(private apiFunction: APIFunctionsService) {}
  ngOnInit(): void {
    this.getAllBloodCounts();
  }

  public getAllBloodCounts = (data?: any): void => {
    this.apiFunction.getMany("/blood_count").subscribe(data => {
      this.blood_counts = data;
      this.populateData(this.blood_counts);
      this.populateLabels(this.blood_counts);
      console.log(this.blood_counts);
    });
  };

  public populateLabels = (Dataset: Array<any>): Array<any> => {
    Dataset.forEach(element => {
      this.labels.push(element.blood_type);
    });

    localStorage.setItem("labels", JSON.stringify(this.labels));
    console.log("Labels: ", this.labels);
    return this.labels;
  };

  public populateData = (Dataset: Array<any>): Array<any> => {
    Dataset.forEach(element => {
      this.data.push(element.count);
    });
    localStorage.setItem("data", JSON.stringify(this.data));
    console.log("Data: ", this.data);
    return this.data;
  };
}
