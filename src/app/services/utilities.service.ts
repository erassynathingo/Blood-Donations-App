import { Logger } from './logger.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor(private logger: Logger) { }

  public init = () => {
    this.hideElements();
  }

  public hideElements = (): void => {
    if ((JSON.parse(localStorage.getItem("currentUser")) == null) === true) {
      $('.doctor, .admin').hide();
    }else {
      if (localStorage.getItem('role') !== 'Admin') {
        $('.admin').hide();
      }else {
        Logger.log("Role: Doctor");
      }
    }
  }

}
