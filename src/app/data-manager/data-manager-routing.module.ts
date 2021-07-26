import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagerPage } from './data-manager.page';

const routes: Routes = [
  {
    path: '',
    component: DataManagerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagerRoutingModule {}
