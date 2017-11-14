import { ComponentsModule } from "./../../components/components.module";
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ProductListPage),
  ],
})
export class ProductListPageModule {}
