import { Component } from '@angular/core';

import { ToastController, LoadingController } from '@ionic/angular';

import { PostService } from './../api/post.service';

@Component({
	selector: 'app-tab5',
	templateUrl: 'tab5.page.html',
	styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

	private url = 'http://192.168.0.127/'
	private data: any

	constructor(private loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				private postService: PostService) {
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
						this.data = result.responseData
					})
					.catch((error: any) => {
						console.log(error.error)
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