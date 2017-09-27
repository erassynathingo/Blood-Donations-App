/**
 * @author Erastus Nathingo <contact@erassy.com>
 * Extending the BrowserXhr to support CORS
 */
import {Injectable} from "@angular/core";
import {BrowserXhr} from "@angular/http";
@Injectable()
export class CORSService extends BrowserXhr {
  constructor() {
      super();
  }
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}
