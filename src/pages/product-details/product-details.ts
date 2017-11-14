import { ThemeableBrowser } from 'ionic-native';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  selectedItem: any;
  imgs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = this.navParams.get("item");
    if (this.selectedItem.SmallImages) {
      this.imgs = this.selectedItem.SmallImages;
    }
    console.log(this.selectedItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  goBuy() {
    let options = {
      statusbar: {
        color: '#f8285c'
      },
      toolbar: {
        height: 44,
        color: '#f8285c'
      },
      title: {
        color: '#ffffff',
        showPageTitle: true
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      backButtonCanClose: true
    };
    new ThemeableBrowser(this.selectedItem.ClickUrl, '_blank', options);
  }

}
