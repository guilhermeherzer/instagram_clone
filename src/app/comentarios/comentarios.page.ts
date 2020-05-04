import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ToastController, LoadingController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
  	selector: 'app-comentarios',
  	templateUrl: './comentarios.page.html',
  	styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

	private loading: any;

	private url = 'http://192.168.0.127/';

	private	myId: string;
	private	postId: string;

	private	userAuthImg: string;
	private	userPostImg: string;
	private	userPostUser: string;
	private	userPostLeg: string;
	private	comentarios: [];

	private	texto: string;

  	constructor(private route: ActivatedRoute,
  				private router: Router,
				private loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) {
  		this.texto = '';
  	}


	ngOnInit(){
		this.loadPage();
	}

	doRefresh(event) {
    	setTimeout(() => {
    		this.loadPage();
      		event.target.complete();
    	}, 1000);
  	}

  	comentar(){
  		console.log(this.texto);
		this.postService.comentar(this.postId, this.myId, this.texto)
			.then((result: any) => {
				if(result.responseData['success'] == '1'){
					this.texto = '';
					this.loadPage();
				}else if(result.responseData['success'] == '0'){
					console.log(result.responseData['success']);
				}
			})
			.catch((error: any) => {
				console.log(error.error);
				this.showToast('Erro ao carregar os posts. Erro:' + error.error);
			})
  	}

	async loadPage(){
		this.loadingCtrl.create({
			message:"",
			showBackdrop:false,
		}).then((loadingElement) => {
			loadingElement.present();
			this.loadData('data');
		})
  	}


  	async loadData(name: string){
  		try{
			this.storage.getItem(name)
				.then(data => {
					this.myId = data.id;

		  			this.route.paramMap.subscribe(params => {
		    				this.postId = params.get('postId');
		  			});

					this.postService.comentarios(this.myId, this.postId)
						.then((result: any) => {
							this.userAuthImg = result.responseData['user_auth']['user_img'];
							this.userPostImg = result.responseData['post']['user']['user_img'];
							this.userPostUser = result.responseData['post']['user']['user'];
							this.userPostLeg = result.responseData['post']['legenda'];

							this.comentarios = result.responseData['comentarios'];
						})
						.catch((error: any) => {
							console.log(error.error);
							this.showToast('Erro ao carregar os posts. Erro:' + error.error);
						})
				});
  		}catch(error){
			console.error(error);
  		}finally{
	    	this.loadingCtrl.dismiss();
  		}
  	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}

  	verPerfil(id: string){
  		if(id == this.myId){
  			this.router.navigate(['/tabs/tab5']);
  		}else{
  			this.router.navigate(['/tabs/perfil', id]);
  		}
  	}
}
