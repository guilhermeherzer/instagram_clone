import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastController, LoadingController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
	selector: 'app-tab5',
	templateUrl: 'tab5.page.html',
	styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

	private loading: any;

	private url = 'http://127.0.0.1:8000/';

	private	myId: string;

	private user = [];
	private meusPosts = [];
	private numPosts: string;
	private numSeguidores: string;
	private numSeguidos: string;

	constructor(private router: Router,
				private loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) { }

	ngOnInit(){
		this.loadPage();
	}

	doRefresh(event) {
    	setTimeout(() => {
    		this.loadPage();
      		event.target.complete();
    	}, 1000);
  	}

	async loadPage(){
		const loading = await this.loadingCtrl.create({
			showBackdrop: false,
			message: "Aguarde..."
		});

		await loading.present();

		this.loadData('data');
	}

  	async loadData(name: string){
  		try{
			this.storage.getItem(name)
				.then(data => {
					this.myId = data.id;

					this.postService.meuPerfil(this.myId)
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
  		}catch(error){
			console.error(error);
  		}finally{
	    	setTimeout(() => {
	    		this.loadingCtrl.dismiss();
	    	}, 1000);
  		}
  	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}
}