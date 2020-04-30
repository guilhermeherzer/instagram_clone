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

	public user = [];
	public posts = [];

	private url = 'http://192.168.0.127/';

	private	myId: string;
	private	userId: string;

	private numPosts: string;
	private numSeguidores: string;
	private numSeguidos: string;

	public statusSeguir = [];

  	constructor(public route: ActivatedRoute,
  				public router: Router,
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
  		this.route.paramMap.subscribe(params => {
    		this.userId = params.get('userId');
  		});

		this.storage.getItem(name)
			.then(data => {
				this.myId = data.id;

				this.postService.verPerfil(this.myId, this.userId)
					.then((result: any) => {
						this.user = result.responseData['user'];
						this.posts = result.responseData['posts'];
						this.numPosts = result.responseData['num_posts'];
						this.numSeguidores = result.responseData['num_seguidores'];
						this.numSeguidos = result.responseData['num_seguidos'];
						this.statusSeguir = result.responseData['status_seguir'];
					})
					.catch((error: any) => {
						console.log(error.error);
						this.showToast('Erro ao carregar os posts. Erro:' + error.error);
					});
			});
  	}

  	seguir(){
  		if(this.statusSeguir['id'] == '0' || this.statusSeguir['id'] == '2'){
			this.postService.seguir(this.myId, this.userId)
				.then((result: any) => {
					if(result.responseData['success'] == '1'){
						this.loadPage('data');
					}else if(result.responseData['success'] == '0'){
						console.log(result.responseData['success']);
					}
				})
				.catch((error: any) => {
					console.log(error.error);
					this.showToast('Erro ao tentar seguir. Erro:' + error.error);
				});
  		}
  		else if(this.statusSeguir['id'] == '1'){
			this.postService.desseguir(this.myId, this.userId)
				.then((result: any) => {
					if(result.responseData['success'] == '1'){
						this.loadPage('data');
					}else if(result.responseData['success'] == '0'){
						console.log(result.responseData['success']);
					}
				})
				.catch((error: any) => {
					console.log(error.error);
					this.showToast('Erro ao tentar desseguir. Erro:' + error.error);
				});
  		}
  	}
};
