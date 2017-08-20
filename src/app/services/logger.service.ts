import { environment } from './../../environments/environment';

export class Logger {
  static log = (value?: any) => {
    if(!environment.enableLogs){
      return;
    }
    console.log(value);
  }
  static warn = (value?: any) => {
    if(!environment.enableLogs){
      return;
    }
    console.warn(value);
  }
  static error = (value?: any) => {
    if(!environment.enableLogs){
      return;
    }
    console.error(value);
  }
  static info = (value?: any) => {
    if(!environment.enableLogs){
      return;
    }
    console.info(value);
  }
}

/**
 * @description Logger Service
 *
 * @author  Erastus Nathingo <contact@erassy.com>
 * @copyright (c) 2017 TechSurge Invectments CC
 * All rights reserved
 */

