import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ControlEscolarService } from '../../../providers/control-escolar.service';

@IonicPage()
@Component({
  selector: 'page-certificaciones',
  templateUrl: 'certificaciones.html',
})
export class CertificacionesPage {

  public listaValidacionesDetalle: any[] = [];
  public listaValidacionesUnidad: any[] = [];
  public fecha: string = "";
  public loadingWindow: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private controlEscolarService: ControlEscolarService
  ) { }

  ionViewDidLoad() {
    this.loadingWindow = this.loadingCtrl.create({
      content: 'Cargando datos...',
      spinner: 'crescent'
    });
    this.loadingWindow.present();
    this.getValidaciones();
  }


  getValidaciones(): void {

    this.controlEscolarService
      .getUltimasValidaciones()
      .subscribe(
      data => {

        this.listaValidacionesDetalle = data.json();
        let resumenValidaciones: any = [];
        let totalEdo: any;
        let meses: any = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let fechaCorte = new Date(this.listaValidacionesDetalle[0].fechaCorte);
        let mes: string;

        mes = meses[(fechaCorte.getMonth() + 1)];

        this.fecha = fechaCorte.getDate().toString() + '/' + mes + '/' + fechaCorte.getFullYear();

        let roco: number = 0;
        let masaje: number = 0;
        let estandar: number = 0;

        let idUnidadAdmtva: number = 0;
        let nombre_unidad: string = '';

        idUnidadAdmtva = this.listaValidacionesDetalle[0].estadistica_validaciones[0].idUnidadAdmtva;
        nombre_unidad = this.listaValidacionesDetalle[0].estadistica_validaciones[0].unidad_pertenece.nombre;

        totalEdo = {
          unidad: 'Estatal',
          idUnidadAdmtva: 0,
          roco: 0,
          masaje: 0,
          estandar: 0
        }


        this.listaValidacionesDetalle[0].estadistica_validaciones.map(elemento => {

            if (idUnidadAdmtva != elemento.idUnidadAdmtva)
            {
              resumenValidaciones.push({
                idUnidadAdmtva: idUnidadAdmtva,
                unidad: nombre_unidad,
                roco: roco,
                masaje: masaje,
                estandar: estandar
              });

              totalEdo.roco += roco;
              totalEdo.masaje += masaje;
              totalEdo.estandar += estandar;

              roco = 0;
              masaje = 0;
              estandar = 0;
              idUnidadAdmtva = elemento.idUnidadAdmtva;
              nombre_unidad = elemento.unidad_pertenece.nombre;
            }

            roco = roco + elemento.roco;
            masaje = masaje + elemento.masaje;
            estandar = estandar + elemento.estandar;

        });

        resumenValidaciones.push({
          idUnidadAdmtva: idUnidadAdmtva,
          unidad: nombre_unidad,
          roco: roco,
          masaje: masaje,
          estandar: estandar
        });

        totalEdo.roco += roco;
        totalEdo.masaje += masaje;
        totalEdo.estandar += estandar;

        resumenValidaciones.unshift(totalEdo);
        this.listaValidacionesUnidad = resumenValidaciones;
        this.loadingWindow.dismiss();

      },
      err => {
        if (err.json().error == undefined)
          console.log("Error de conexion");
        else {
          let error = err.json().error;
          if (error.status == 401)
            console.log("error de autorizacion");
        }
      });

  }
  

  verDetalle(detalleUnidad: any): void {

    let datoCertsUnidad: any = [];
    let valor: number = 0;
    let tipo: string = '';

    this.listaValidacionesDetalle[0].estadistica_validaciones.map(elemento => {
      if (elemento.idUnidadAdmtva == detalleUnidad.idUnidadAdmtva)
      {
        if (elemento.roco > 0) {
          valor = elemento.roco;
          tipo = 'ROCO';
        }
        else if (elemento.masaje > 0) {
          valor = elemento.masaje;
          tipo = 'Masaje';
        }
        else if (elemento.estandar > 0) {
          valor = elemento.estandar;
          tipo = 'Estándar';
        }
        datoCertsUnidad.push({
          id: elemento.id,
          proceso: elemento.proceso,
          valor: valor,
          tipo: tipo
        });
      }
    });

    this.navCtrl.push('DetalleCertUnidadPage', {
      unidad: detalleUnidad.unidad,
      datoCertsUnidad: datoCertsUnidad
    });
  }

}
