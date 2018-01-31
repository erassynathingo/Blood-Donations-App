import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Logger } from "../services/logger.service";

@Component({
  selector: 'remote',
  templateUrl: 'remote.component.html',
  styleUrls: ["./remote.component.css"]
})

export class RemoteComponent implements OnInit, AfterViewInit {

  title: string = "Remote Blood Donation Camps";
  lat: number = -22.5609;
  lng: number = 17.0658;
  zoom: number = 12;
  locationLabel: string = "";

  markers: marker[] = [
    {
      lat: -22.5670,
      lng: 17.0808,
      label: 'Wernhill Park Windhoek',
      draggable: false
    },
    {
      lat: -22.6122,
      lng: 17.0584,
      label: 'University of Namibia',
      draggable: false
    }
  ];

  constructor() { }

  private clickedMarker = (label: string): void => {
    Logger.log(`Location Selected: ${label}`);
    this.locationLabel = label;
  }



  ngOnInit() { }

  ngAfterViewInit(): void { }
}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
