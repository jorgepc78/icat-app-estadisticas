import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {AppConstants} from '../app/app-constants';

@Injectable()
export class ControlEscolarService {

  constructor(
    private http: Http
  ) {}

  getUltimaMatricula() {
    let fechaHoy = new Date();
    return this.http
      .get(AppConstants.apiUrl + 'MatriculaCortes?filter={"limit":1,"order":"fechaCorte DESC","include":[{"relation":"estadistica_matricula","scope":{"include":[{"relation":"unidad_pertenece","scope":{"fields":["nombre"],"include":[{"relation":"metas_asignadas","scope":{"where":{"anio":'+fechaHoy.getFullYear()+'}}}]}}]}}]}')
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }





  getUltimasValidaciones() {
    return this.http
      .get(AppConstants.apiUrl + 'MatriculaCortes?filter={"limit":1,"order":"fechaCorte DESC","include":[{"relation":"estadistica_validaciones","scope":{"order":["idUnidadAdmtva ASC","proceso ASC"],"include":[{"relation":"unidad_pertenece","scope":{"fields":["nombre"]}}]}}]}')
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }


}
