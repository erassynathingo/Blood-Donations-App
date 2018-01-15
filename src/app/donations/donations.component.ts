import { Pnotify } from '../services/pnotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
import { APIFunctionsService } from './../services/api-functions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'donations',
  templateUrl: 'donations.component.html'
})

export class DonationsComponent implements OnInit {

  Donations: Array<Object> = [];

  constructor(
    private apiFunctions: APIFunctionsService,
    private pnotify: Pnotify,
    private router: Router,
    private route: ActivatedRoute) {
    this.getAllDonations();
  }

  ngOnInit() {

  }

  public getAllDonations = (): void => {
    this.apiFunctions.getMany(`/donate`).subscribe(data => {
      console.log("DOnations: ", data);
      this.Donations = data;
      this.initSearch(this.Donations);
    }, error => {
      const resp = JSON.parse(error.body);
      this.pnotify.error(resp.message, 3000, "Fetch Error");
    });


  }

  public initSearch = (donations: Array<Object>): void => {
    console.log("Search Fields: ", donations);
    $('.ui.searchDonations').search({
      source: donations,
      searchFullText: false
    });
  }

}
