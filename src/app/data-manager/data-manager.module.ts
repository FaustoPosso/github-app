import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DataManagerRoutingModule } from './data-manager-routing.module';
import { DataManagerPage } from './data-manager.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataManagerRoutingModule
  ],
  declarations: [DataManagerPage]
})
export class DataManagerPageModule {}
