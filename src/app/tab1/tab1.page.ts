import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Platform, ToastController, AlertController  } from '@ionic/angular';

import { PostService } from './../api/post.service';

import { UserService } from './../api/user.service';

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

	private url = 'http://192.168.0.127/'
	private auth: any
	private data: any
	private heartType: any[] = []

	constructor(private router: Router,
				private platform: Platform,
				private toastCtrl: ToastController,
				private postService: PostService,
				private user: UserService,
				public alertController: AlertController) {
		this.user.getAuth()
			.then(result => { 
				this.auth = result 
			})
		this.loadPage()
	}

	doRefresh(event) {
    	this.loadPage()
      	event.target.complete()
  	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' })
		toast.present()
  	}

  	async loadPage(){
		this.platform.ready().then(() => {
			this.postService.feed()
				.then((result: any) => {
					this.data = result.responseData

					for(let i = 0; i < this.data.posts.length; i++){
						this.heartType[i] = this.data.posts[i].node.is_liked
					}
				})
				.catch((error: any) => {
					this.showToast('Erro ao carregar o feed. Erro:' + error.error)
				})
		})
  	}

  	verPerfil(id: string){
  		if(id == this.auth.id){
  			this.router.navigate(['/tabs/tab5'])
  		}else{
  			this.router.navigate(['/tabs/perfil', id])
  		}
  	}


	like(postId, i){
		this.postService.like(postId)
			.then((result: any) => {
				this.heartType[i] = result.responseData['is_liked']
			})
			.catch((error: any) => {
				this.showToast('Erro ao curtir a postagem. Erro:' + error.error)
			})
	}

	async options(id) {
    	const alert = await this.alertController.create({
    		header: 'Opções',
      		buttons: [
		        {
		          	text: 'Copiar link',
		          	cssClass: 'button-alert',
		          	handler: () => {
		            	console.log('Confirm Copiar link');
		          	}
		        },
		        {
		          	text: 'Arquivar',
		          	cssClass: 'button-alert',
		          	handler: () => {
		            	console.log('Confirm Arquivar');
		          	}
		        },
		        {
		          	text: 'Editar',
		          	cssClass: 'button-alert',
		          	handler: () => {
		            	console.log('Confirm Editar');
		          	}
		        },
		        {
		          	text: 'Excluir',
		          	cssClass: 'button-alert',
		          	handler: () => {
						this.postService.deletePost(id)
							.then((result: any) => {
								if(result.responseData['success'] === '1'){
									this.loadPage()
								}
							})
							.catch((error: any) => {
								this.showToast('Erro ao excluir a postagem. Erro:' + error.error)
							})
		          	}
		        },
		        {
		          	text: 'Desativar comentários',
		          	cssClass: 'button-alert',
		          	handler: () => {
		            	console.log('Confirm Desativar comentários');
		          	}
		        },
		    ]
    	});

    	await alert.present();
  	}
}