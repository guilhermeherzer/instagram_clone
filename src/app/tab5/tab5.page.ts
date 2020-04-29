import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
	selector: 'app-tab5',
	templateUrl: 'tab5.page.html',
	styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

	public user = [];
	public meusPosts = [];

	private url = 'http://127.0.0.1:8000/';

	private	userId: string;

	private numPosts: string;
	private numSeguidores: string;
	private numSeguidos: string;

	constructor(public router: Router,
				public toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) { }

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

				this.postService.meuPerfil(this.userId)
					.then((result: any) => {
						this.user = result.responseData['user'];
						this.numPosts = result.responseData['num_posts'];
						this.numSeguidores = result.responseData['num_seguidores'];
						this.numSeguidos = result.responseData['num_seguidos'];
						this.meusPosts = result.responseData['posts'];
					})
					.catch((error: any) => {
						console.log(error.error);
						this.showToast('Erro ao carregar os posts. Erro:' + error.error);
					})
			});
  	}
}