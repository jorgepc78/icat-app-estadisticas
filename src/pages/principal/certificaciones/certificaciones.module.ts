import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificacionesPage } from './certificaciones';

import { ControlEscolarService } from '../../../providers/control-escolar.service';

@NgModule({
  declarations: [
    CertificacionesPage,
  ],
  providers: [ControlEscolarService],
  imports: [
    IonicPageModule.forChild(CertificacionesPage),
  ],
})
export class CertificacionesPageModule {}
