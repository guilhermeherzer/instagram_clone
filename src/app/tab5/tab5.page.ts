import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastController, LoadingController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

import { UserService } from './../api/user.service';

@Component({
	selector: 'app-tab5',
	templateUrl: 'tab5.page.html',
	styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

	private url = 'http://192.168.0.127/'
	private	auth: any
	private meusPosts = []
	private numPosts: string
	private numSeguidores: string
	private numSeguidos: string

	constructor(private router: Router,
				private loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService,
				private user: UserService) {
		this.user.getAuth()
			.then(result => { 
				this.auth = result 
			})
	}

	ngOnInit(){
		this.loadPage()
	}

	doRefresh(event) {
    	this.loadPage()
      	event.target.complete()
  	}

  	async loadPage(){
		this.loadingCtrl.create({
			showBackdrop:false,
		}).then((loadingElement) => {
			loadingElement.present()
			
	  		try{
				this.postService.meuPerfil()
					.then((result: any) => {
						this.numPosts = result.responseData['num_posts']
						this.numSeguidores = result.responseData['num_seguidores']
						this.numSeguidos = result.responseData['num_seguidos']
						this.meusPosts = result.responseData['posts']
					})
					.catch((error: any) => {
						console.log(error.error)
						this.showToast('Erro ao carregar os posts. Erro:' + error.error)
					})
	  		}catch(error){
				console.error(error)
	  		}finally{
		    	this.loadingCtrl.dismiss()
	  		}
		})
  	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' })
		toast.present()
  	}
}