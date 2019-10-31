import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeadingsComponent } from '../components/headings/headings.component';
import { NumberSlotterComponent } from '../components/number-slotter/number-slotter.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule
    ],
    declarations: [
        HeadingsComponent,
        NumberSlotterComponent
    ],
    exports: [
        HeadingsComponent,
        NumberSlotterComponent
    ]
})

export class SharedModule {}
