import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
  	selector: 'app-perfil',
  	templateUrl: './perfil.page.html',
  	styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

	private data: any
	private url = 'http://192.168.0.127/'
	/*public user = [];
	public posts = [];


	private	myId: string;
	private	userId: string;

	private numPosts: string;
	private numSeguidores: string;
	private numSeguidos: string;

	public statusSeguir = [];*/

  	constructor(public route: ActivatedRoute,
  				public router: Router,
				public toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) {
		this.loadPage('data');
  	}

	ngOnInit(){}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}

  	async loadPage(name: string){
  		this.route.paramMap.subscribe(params => {
    		let id = params.get('userId');

			this.postService.verPerfil(id)
				.then((res: any) => {
					this.data = res.responseData
				})
				.catch((error: any) => {
					console.log(error);
				});
  		});
  	}

  	seguir(followStatus){
  		if(followStatus === false){
			this.postService.seguir(this.data.user.id)
				.then((result: any) => {
					if(result.responseData['success'] == '1'){
						this.loadPage('data');
					}else if(result.responseData['success'] == '0'){
						console.log(result);
					}
				})
				.catch((error: any) => {
					console.log(error);
				});
  		}
  		else if(followStatus === true){
			this.postService.desseguir(this.data.user.id)
				.then((result: any) => {
					if(result.responseData['success'] == '1'){
						this.loadPage('data');
					}else if(result.responseData['success'] == '0'){
						console.log(result);
					}
				})
				.catch((error: any) => {
					console.log(error)
				});
  		}
  	}
};
