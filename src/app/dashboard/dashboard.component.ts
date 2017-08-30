import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'FusionCharts';



@Component({
    selector: 'dashboard-template',
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.css"],
})


export class DashboardComponent implements OnInit {
    ngOnInit(): void {

    }
}

FusionCharts.ready(function () {
    var fuelVolume = 100,
        fuelWidget = new FusionCharts({
            type: 'cylinder',
            dataFormat: 'json',
            id: 'fuelMeter',
            renderAt: 'chart-container',
            width: '120',
            height: '350',
            dataSource: {
                "chart": {
                    "theme": "fint",
                    "caption": "Diesel Level in Generator",
                    "subcaption": "Bakersfield Central",
                    "lowerLimit": "0",
                    "upperLimit": "120",
                    "lowerLimitDisplay": "Empty",
                    "upperLimitDisplay": "Full",
                    "numberSuffix": " ltrs",
                    "showValue": "1",
                    "chartBottomMargin": "25"
                },
                "value": "110"
            },
            "events": {
                "rendered": function (evtObj, argObj) {
                    setInterval(function () {
                        (fuelVolume < 10) ? (fuelVolume = 110) : "";
                        var consVolume = fuelVolume - (Math.floor(Math.random() * 3));
                        FusionCharts("fuelMeter").feedData("&value=" + consVolume);
                        fuelVolume = consVolume;
                    }, 1000);
                }
            }
        }).render();
});

