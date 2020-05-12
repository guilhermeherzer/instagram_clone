import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Platform, ToastController, LoadingController, AlertController  } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

import { UserService } from './../api/user.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

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
	private stories = []
	private posts = []
	private heartType: any[] = []

	constructor(private router: Router,
				private platform: Platform,
				private toastCtrl: ToastController,
				private loadingCtrl: LoadingController,
				private storage: NativeStorage,
				private postService: PostService,
				private user: UserService,
				public alertController: AlertController) {
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

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' })
		toast.present()
  	}

  	async loadPage(){
		this.loadingCtrl.create({
		}).then((loadingElement) => {
			loadingElement.present()
			
	  		try{
	  			this.platform.ready().then(() => {
					this.postService.feed()
						.then((result: any) => {
							this.stories = result.responseData['data']['stories']
							this.posts = result.responseData['data']['posts']

							for(let i = 0; i < result.responseData['data']['posts'].length; i++){
								this.heartType[i] = this.posts[i].is_liked
							}
						})
						.catch((error: any) => {
							this.showToast('Erro ao carregar o feed. Erro:' + error.error)
						})
				})
	  		}catch(error){
	  			console.log(error.error)
	  		}finally{
				this.loadingCtrl.dismiss()
	  		}
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