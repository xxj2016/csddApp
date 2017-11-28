import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonProductsComponent } from './ion-products/ion-products';
import { IonRadiosComponent } from './ion-radios/ion-radios';
@NgModule({
	declarations: [IonProductsComponent,
    IonRadiosComponent],
	imports: [
		IonicModule
	],
	exports: [IonProductsComponent,
    IonRadiosComponent]
})
export class ComponentsModule {}
