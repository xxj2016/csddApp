import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the IonProductsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-products',
  templateUrl: 'ion-products.html'
})
export class IonProductsComponent {
  @Input() products: Array<any>;
  text: string;

  constructor(
    public navCtrl: NavController
  ) {
    console.log('Hello IonProductsComponent Component');
    this.text = 'Hello World';
  }

  goDetails(item) {
    // console.log('go details ...');
    this.navCtrl.push("ProductDetailsPage", { item: item });
  }

}
