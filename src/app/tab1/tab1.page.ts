import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
	slideOpts = {
		initialSlide: 0,
		freeMode: true,
		freeModeSticky: true,
		speed: 400,

		slidesPerView: 5.2,
			centeredSlides: false,
	};

	public feed = [];
	private url = 'http://127.0.0.1:8000/';

	private	userId: string;

	constructor(public router: Router,
				public toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) {}

	ngOnInit(){

		this.loadPage('data');

	}

	doRefresh(event) {
    	setTimeout(() => {
    		this.loadPage('data');
      		event.target.complete();
    	}, 1000);
  	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}

  	async loadPage(name: string){
		this.storage.getItem(name)
			.then(data => {
				this.userId = data.id;

				this.postService.feed(this.userId)
					.then((result: any) => {
						this.feed = result.responseData['data'];
					})
					.catch((error: any) => {
						console.log(error.error);
						this.showToast('Erro ao carregar o feed. Erro:' + error.error);
					})
			});
  	}
}