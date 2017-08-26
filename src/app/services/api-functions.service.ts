import { Credentials } from '../login/credentials';
import { Logger } from './logger.service';
import {Injectable} from '@angular/core';
import { Http,Response,Headers,RequestOptions,URLSearchParams,} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class APIFunctionsService {
  headers: Headers;
  options: RequestOptions;
  baseUrl = environment.baseUrl;

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  login(url: string, param: Object): Observable<any> {
    let body = JSON.stringify(param);
    let path = this.baseUrl +''+ url;
    Logger.log(path);
    return this.http
      .post(path, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    Logger.error(errMsg);
    return Observable.throw(errMsg);
  }
}

interface loginResponse {
  user: Object;
}
