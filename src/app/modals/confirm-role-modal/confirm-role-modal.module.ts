import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmRoleModalPage } from './confirm-role-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRoleModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmRoleModalPage],
  entryComponents: [ConfirmRoleModalPage]
})
export class ConfirmRoleModalPageModule {}
