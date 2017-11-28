import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the IonRadiosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-radios',
  templateUrl: 'ion-radios.html'
})
export class IonRadiosComponent {
  @Input() radios: Array<any>;
  text: string;

  constructor(
    public navCtrl: NavController
  ) {
    console.log('Hello IonRadiosComponent Component');
    this.text = 'Hello World';
  }

  goDetails(item) {
    console.log(item);
    // this.navCtrl.push("RadioDetailsPage", { item: item });
  }

}
