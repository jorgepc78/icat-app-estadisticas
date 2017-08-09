import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalle-cert-unidad',
  templateUrl: 'detalle-cert-unidad.html',
})
export class DetalleCertUnidadPage implements OnInit {

  public unidad: string;
  public datoCertsUnidad: any;
  public total: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.unidad = this.navParams.get('unidad');
    this.datoCertsUnidad = this.navParams.get('datoCertsUnidad');
    this.total = this.datoCertsUnidad.reduce((suma, elemento) => suma + elemento.valor, 0);
  }

}
