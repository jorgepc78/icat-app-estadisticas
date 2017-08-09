import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ControlEscolarService } from '../../../providers/control-escolar.service';

@IonicPage()
@Component({
  selector: 'page-cursos',
  templateUrl: 'cursos.html',
})
export class CursosPage {

  public listaMatriculaUnidad: any[] = [];
  public fecha: string = "";
  public loadingWindow: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private controlEscolarService: ControlEscolarService
  ) {}

  ionViewDidLoad() {
    this.loadingWindow = this.loadingCtrl.create({
      content: 'Cargando datos...',
      spinner: 'crescent'
    });
    this.loadingWindow.present();
    this.getUltimaMatricula();
  }

  getUltimaMatricula(): void {

    this.controlEscolarService
      .getUltimaMatricula()
      .subscribe(
      data => {

        let datos = data.json();
        let datosCursos: any = [];
        let totalEdo: any;
        let meses: any = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let fechaCorte = new Date(datos[0].fechaCorte);
        let mes: string;

        /*if ((fechaCorte.getMonth() + 1) < 10)
          mes = '0' + (fechaCorte.getMonth() + 1).toString();
        else
          mes = (fechaCorte.getMonth() + 1).toString();*/

        mes = meses[(fechaCorte.getMonth() + 1)];

        this.fecha = fechaCorte.getDate().toString() + '/' + mes + '/' + fechaCorte.getFullYear();


        totalEdo = {
          unidad: 'Estatal',
          gruposRegular: 0,
          inscritosRegular: 0,
          metaAcumRegular: 0,
          gruposExtension: 0,
          inscritosExtension: 0,
          metaAcumExtension: 0,
          gruposCae: 0,
          inscritosCae: 0,
          metaAcumCae: 0,
          inscritosRoco: 0,
          metaAcumRoco: 0,
          inscritosEstandares: 0,
          metaAcumEstandares: 0,
          gruposTotal: 0,
          inscritosTotal: 0,
          metaAcumTotal: 0
        }

        datos[0].estadistica_matricula.map(elemento => {

          let metaAcumRegular: number = 0;
          let metaAcumExtension: number = 0;
          let metaAcumCae: number = 0;
          let metaAcumRoco: number = 0;
          let metaAcumEstandares: number = 0;

            if (elemento.idUnidadAdmtva != 1) {
              if ((fechaCorte.getMonth() >= 0) && (fechaCorte.getMonth() <= 2)) {
                metaAcumRegular = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim;
                metaAcumExtension = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim;
                metaAcumCae = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim;
                metaAcumRoco = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim;
                metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim;
              }
              else if ((fechaCorte.getMonth() >= 3) && (fechaCorte.getMonth() <= 5)) {
                metaAcumRegular = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim + elemento.unidad_pertenece.metas_asignadas[0].reg2Trim;
                metaAcumExtension = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim + elemento.unidad_pertenece.metas_asignadas[0].ext2Trim;
                metaAcumCae = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim + elemento.unidad_pertenece.metas_asignadas[0].cae2Trim;
                metaAcumRoco = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim + elemento.unidad_pertenece.metas_asignadas[0].roco2Trim;
                metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim + elemento.unidad_pertenece.metas_asignadas[0].ecl2Trim;
              }
              else if ((fechaCorte.getMonth() >= 6) && (fechaCorte.getMonth() <= 8)) {
                metaAcumRegular = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim + elemento.unidad_pertenece.metas_asignadas[0].reg2Trim + elemento.unidad_pertenece.metas_asignadas[0].reg3Trim;
                metaAcumExtension = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim + elemento.unidad_pertenece.metas_asignadas[0].ext2Trim + elemento.unidad_pertenece.metas_asignadas[0].ext3Trim;
                metaAcumCae = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim + elemento.unidad_pertenece.metas_asignadas[0].cae2Trim + elemento.unidad_pertenece.metas_asignadas[0].cae3Trim;
                metaAcumRoco = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim + elemento.unidad_pertenece.metas_asignadas[0].roco2Trim + elemento.unidad_pertenece.metas_asignadas[0].roco3Trim;
                metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim + elemento.unidad_pertenece.metas_asignadas[0].ecl2Trim + elemento.unidad_pertenece.metas_asignadas[0].ecl3Trim;
              }
              else {
                metaAcumRegular = elemento.unidad_pertenece.metas_asignadas[0].reg1Trim + elemento.unidad_pertenece.metas_asignadas[0].reg2Trim + elemento.unidad_pertenece.metas_asignadas[0].reg3Trim + elemento.unidad_pertenece.metas_asignadas[0].reg4Trim;
                metaAcumExtension = elemento.unidad_pertenece.metas_asignadas[0].ext1Trim + elemento.unidad_pertenece.metas_asignadas[0].ext2Trim + elemento.unidad_pertenece.metas_asignadas[0].ext3Trim + elemento.unidad_pertenece.metas_asignadas[0].ext4Trim;
                metaAcumCae = elemento.unidad_pertenece.metas_asignadas[0].cae1Trim + elemento.unidad_pertenece.metas_asignadas[0].cae2Trim + elemento.unidad_pertenece.metas_asignadas[0].cae3Trim + elemento.unidad_pertenece.metas_asignadas[0].cae4Trim;
                metaAcumRoco = elemento.unidad_pertenece.metas_asignadas[0].roco1Trim + elemento.unidad_pertenece.metas_asignadas[0].roco2Trim + elemento.unidad_pertenece.metas_asignadas[0].roco3Trim + elemento.unidad_pertenece.metas_asignadas[0].roco4Trim;
                metaAcumEstandares = elemento.unidad_pertenece.metas_asignadas[0].ecl1Trim + elemento.unidad_pertenece.metas_asignadas[0].ecl2Trim + elemento.unidad_pertenece.metas_asignadas[0].ecl3Trim + elemento.unidad_pertenece.metas_asignadas[0].ecl4Trim;
              }
            }

            datosCursos.push({
              unidad: (elemento.idUnidadAdmtva == 1 ? 'Cursos en línea' : elemento.unidad_pertenece.nombre),
              gruposRegular: elemento.gruposRegular,
              inscritosRegular: elemento.inscritosRegular,
              metaAcumRegular: metaAcumRegular,
              gruposExtension: elemento.gruposExtension,
              inscritosExtension: elemento.inscritosExtension,
              metaAcumExtension: metaAcumExtension,
              gruposCae: elemento.gruposCae,
              inscritosCae: elemento.inscritosCae,
              metaAcumCae: metaAcumCae,
              inscritosRoco: elemento.inscritosRoco,
              metaAcumRoco: metaAcumRoco,
              inscritosEstandares: elemento.inscritosEstandares,
              metaAcumEstandares: metaAcumEstandares,
              gruposTotal: elemento.gruposTotal,
              inscritosTotal: elemento.inscritosTotal,
              metaAcumTotal: (metaAcumRegular + metaAcumExtension + metaAcumCae + metaAcumRoco + metaAcumEstandares)
            });


            totalEdo.gruposRegular += elemento.gruposRegular;
            totalEdo.inscritosRegular += elemento.inscritosRegular;
            totalEdo.metaAcumRegular += metaAcumRegular;
            totalEdo.gruposExtension += elemento.gruposExtension;
            totalEdo.inscritosExtension += elemento.inscritosExtension;
            totalEdo.metaAcumExtension += metaAcumExtension;
            totalEdo.gruposCae += elemento.gruposCae;
            totalEdo.inscritosCae += elemento.inscritosCae;
            totalEdo.metaAcumCae += metaAcumCae;
            totalEdo.inscritosRoco += elemento.inscritosRoco;
            totalEdo.metaAcumRoco += metaAcumRoco;
            totalEdo.inscritosEstandares += elemento.inscritosEstandares;
            totalEdo.metaAcumEstandares += metaAcumEstandares;
            totalEdo.gruposTotal += elemento.gruposTotal;
            totalEdo.inscritosTotal += elemento.inscritosTotal;
            totalEdo.metaAcumTotal += (metaAcumRegular + metaAcumExtension + metaAcumCae + metaAcumRoco + metaAcumEstandares);

        })

        datosCursos.unshift(totalEdo);

        this.listaMatriculaUnidad = datosCursos;
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
    this.navCtrl.push('DetalleUnidadPage', {
      detalleUnidad: detalleUnidad
    });
  }



}
