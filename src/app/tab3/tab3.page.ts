import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	public meusPosts = [];
	private url = 'http://127.0.0.1:8000/';

	private	userId: string;
	private userName: string;
	private userImg: string;

	constructor(public router: Router,
				public toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) { }

	ngOnInit(){

		this.loadPage('data');

	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}

  	async loadPage(name: string){
		this.storage.getItem(name)
			.then(data => {
				this.userId = data.id;
				this.userName = data.name;
				this.userImg = data.img;

				this.postService.meusPosts(this.userId)
					.then((result: any) => {
						this.meusPosts = result.responseData['data'];
					})
					.catch((error: any) => {
						console.log(error.error);
						this.showToast('Erro ao carregar os posts. Erro:' + error.error);
					})
			});
  	}
}