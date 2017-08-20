import { Injectable} from '@angular/core';
import { HttpModule, BaseRequestOptions, RequestOptions} from '@angular/http';


@Injectable()


export class DefaultRequestOptions extends BaseRequestOptions {
  constructor(){
    super();
    this.headers.set('Content-Type', 'application/json');
    this.withCredentials = true;
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions}

/**
 * @description Default Request options Service
 *
 * @author  Erastus Nathingo <contact@erassy.com>
 * @copyright (c) 2017 TechSurge Invectments CC
 * All rights reserved
 */

