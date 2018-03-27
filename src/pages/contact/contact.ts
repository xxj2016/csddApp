import { AppGlobal, AppService } from "./../../app/app.service";
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('scroll') scrollElement: any;
  @ViewChild('spinner') spinnerElement: any;

  index = 0;
  categories: Array<any> = [];
  selectedMenuTarget: any;
  products: Array<any> = [];
  radios: Array<any> = [];
  hasmore = true;

  islock = false;

  params = {
    favoritesId: 0,
    pageNo: 1
  }

  paramsRadio = {
    cid: 1339,
    pagesize: 20,
    pagenum: 1,
    rtype: 20000,
    sorttype: 'HOT_RANK_DESC',
    callback: 'JSONP_CALLBACK'
  }

  constructor(public navCtrl: NavController, public appService: AppService) {

  }

  ionViewDidLoad() {
    this.getRadioCategoryList();
    // this.getRadioByCategoryId();
    // this.getCategories();
    this.addScrollEventListener();
  }

  addScrollEventListener() {
    this.scrollElement._scrollContent.nativeElement.onscroll = event => {
      if(this.spinnerElement) {
        // 元素顶端到可见区域顶端的距离
        var top = this.spinnerElement.nativeElement.getBoundingClientRect().top;
        // 可见区域高度
        var clientHeight = document.documentElement.clientHeight;
        if(top <= clientHeight) {
          console.log("ready loadmore...");
          this.doInfinite();
        }
      }
    }
  }

  // 获取左侧菜单
  getCategories() {
    this.appService.httpGet(AppGlobal.domain, AppGlobal.API.getCategories, {appTag: 'dress'}, rs => {
      console.log(rs);
      this.categories = rs.data;
      // 默认获取第一个分类的商品列表
      this.params.favoritesId = this.categories[0].FavoritesId;
      this.getProducts();
    })
  }

  // 选中左侧菜单
  itemClick(c, event) {
    var initSelected: any = document.getElementsByClassName('menuItem');
    if(initSelected[0].classList.contains("active")) {
      initSelected[0].classList.remove("active");
    }

    // 移除上次选中菜单的样式
    if(this.selectedMenuTarget) {
      this.selectedMenuTarget.classList.remove("active");
    }

    // 修改本次选中菜单的样式
    event.currentTarget.classList.add("active");

    // 将本次选中的菜单记录
    this.selectedMenuTarget = event.currentTarget;
    
    this.hasmore = true;

    // 衣服商品的数据
    // this.params.favoritesId = c.FavoritesId;
    // this.params.pageNo = 1;

    // this.getProducts();

    // 电台数据
    this.paramsRadio.cid = c.categoryId;
    this.paramsRadio.pagenum = 1;

    this.getRadioByCategoryId();
  }

  // 加载衣服数据
  getProducts() {
    this.appService.httpGet(AppGlobal.domain, AppGlobal.API.getProducts, this.params, rs => {
      this.products = rs.data;
      this.params.pageNo += 1;
    })
  }

  // 加载电台分类
  getRadioCategoryList() {
    this.appService.httpGetJsonp(AppGlobal.domainRadio, AppGlobal.API.getRadioCategoryList, {callback: 'JSONP_CALLBACK'}, rs => {
      console.log(rs);
      if (rs.message === 'success') {
        this.categories = rs.result.dataList;
      }
      this.categories.shift();
      this.paramsRadio.cid = this.categories[0].categoryId;
      console.log(this.categories);

      this.getRadioByCategoryId();
    })
  }

  // 加载电台指定分类数据
  getRadioByCategoryId() {
    this.appService.httpGetJsonp(AppGlobal.domainRadio,AppGlobal.API.getRadioByCategoryId, this.paramsRadio, rs => {
      console.log(rs);
      this.radios = rs.result.dataList;
      this.paramsRadio.pagenum += 1;
      console.log(this.radios);
      
    })
  }

  // 滑动加载
  doInfinite() {
    if (this.islock) {
      return;
    }
    if(this.hasmore == false) {
      return;
    }

    this.islock = true;
    this.appService.httpGetJsonp(AppGlobal.domainRadio,AppGlobal.API.getRadioByCategoryId, this.paramsRadio, d => {
      this.islock = false;
      if(d.result.dataList.length > 0) {
        this.radios = this.radios.concat(d.result.dataList);
        this.paramsRadio.pagenum += 1;
      }else{
        this.hasmore = false;
        console.log("没有数据了");
        
      }
    });
  }

  getDetail(item) {
    this.navCtrl.push('ProductDetailsPage', { item: item});
  }

}
