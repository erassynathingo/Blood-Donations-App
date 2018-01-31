import { Logger } from "../services/logger.service";
import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgModule,
  VERSION
} from "@angular/core";

@Component({
  selector: "camps",
  templateUrl: "camps.component.html",
  styleUrls: ["./camps.component.css"]
})
export class CampsComponent implements OnInit {
  title: string = "Fixed Blood Donation Camps";
  lat: number = -22.5609;
  lng: number = 17.0658;
  zoom: number = 8;
  locationLabel: string = "";

  markers: marker[] = [
    {
      lat: -22.572806,
      lng: 17.083481,
      label: 'NamBTS Donation Center & Head Office',
      draggable: false
    },
    {
      lat: -22.562615,
      lng: 17.084105,
      label: 'NamBTS United House Center',
      draggable: true
    },
    {
      lat: -22.646743,
      lng: 14.600491,
      label: 'Swakopmund Donation Center',
      draggable: false
    },
    {
      lat: -22.958853,
      lng: 14.509828,
      label: 'Walvis Bay Donation Center',
      draggable: false
    }
  ]

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void { }

  private clickedMarker = (label: string): void => {
    Logger.log(`Location Selected: ${label}`);
    this.locationLabel = label;
  };
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
