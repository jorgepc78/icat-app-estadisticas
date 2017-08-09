import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  tab1Principal = 'CursosPage';
  tab2Principal = 'CertificacionesPage';

  constructor() {

  }
}
