import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursosPage } from './cursos';

import { ControlEscolarService } from '../../../providers/control-escolar.service';

@NgModule({
  declarations: [
    CursosPage,
  ],
  providers: [ControlEscolarService],
  imports: [
    IonicPageModule.forChild(CursosPage),
  ],
})
export class CursosPageModule {}