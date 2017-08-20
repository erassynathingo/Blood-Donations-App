import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';


@Injectable()


export class APIFunctionsService{
    constructor(
        private http: HttpModule
    ){}
}