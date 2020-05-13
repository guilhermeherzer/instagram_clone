import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ToastController, LoadingController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { UserService } from './../api/user.service';

import { PostService } from './../api/post.service';

@Component({
  	selector: 'app-comentarios',
  	templateUrl: './comentarios.page.html',
  	styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage {

	private url = 'http://192.168.0.127/'
	private auth: any
	private	data: any
	private texto: string

  	constructor(private route: ActivatedRoute,
  				private router: Router,
				private loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				private storage: NativeStorage,
				private user: UserService,
				private postService: PostService) {
		this.user.getAuth()
			.then(result => { 
				this.auth = result 
			})
  		this.texto = ''
		this.loadPage()
  	}

	async loadPage(){
		this.loadingCtrl.create({
			showBackdrop:false,
		}).then((loadingElement) => {
			loadingElement.present();
	  		try{
	  			this.route.paramMap.subscribe(params => {
	    				let id = params.get('postId')
						this.postService.comentarios(id)
							.then((result: any) => {
								this.data = result.responseData
							})
							.catch((error: any) => {
								console.log(error)
							})
	  			});
	  		}catch(error){
				console.error(error)
	  		}finally{
		    	this.loadingCtrl.dismiss()
	  		}
		})
  	}

  	comentar(){
		this.postService.comentar(this.data.id, this.texto)
			.then((result: any) => {
				this.texto = ''
				this.data = result.responseData
			})
			.catch((error: any) => {
				console.log(error.error)
				this.showToast('Erro ao carregar os posts. Erro:' + error.error)
			})
  	}

  	verPerfil(id: string){
  		if(id == this.auth.id){
  			this.router.navigate(['/tabs/tab5'])
  		}else{
  			this.router.navigate(['/tabs/perfil', id])
  		}
  	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' })
		toast.present()
  	}

	doRefresh(event) {
    	setTimeout(() => {
    		this.loadPage()
      		event.target.complete()
    	}, 1000)
  	}
}
