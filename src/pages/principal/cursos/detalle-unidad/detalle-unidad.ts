import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalle-unidad',
  templateUrl: 'detalle-unidad.html',
})
export class DetalleUnidadPage implements OnInit {

  public datosUnidad: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.datosUnidad = this.navParams.get('detalleUnidad');
  }

}
