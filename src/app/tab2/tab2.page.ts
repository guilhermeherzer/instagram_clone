import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { PostService } from './../api/post.service';

@Component({
  	selector: 'app-tab2',
  	templateUrl: 'tab2.page.html',
  	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	private url = 'http://192.168.0.127/';

	private	myId: string;

	private users = [];

	private texto: string;

  	constructor(public router: Router,
				public toastCtrl: ToastController,
				private storage: NativeStorage,
				private postService: PostService) {
  		this.texto = '';
  	}

	ngOnInit(){
  		this.loadData('data');
	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}

  	buscarPerfil(){
		this.postService.buscar(this.texto)
			.then((result: any) => {
				this.users = result.responseData['users'];
			})
			.catch((error: any) => {
				this.showToast('Erro ao carregar o feed. Erro:' + error.error);
			})
  	}

  	verPerfil(id: string){
  		if(id == this.myId){
  			this.router.navigate(['/tabs/tab5']);
  		}else{
  			this.router.navigate(['/tabs/perfil', id]);
  		}
  	}

  	async loadData(name: string){
		this.storage.getItem(name)
			.then(data => {
				this.myId = data.id;
			})
			.catch(error => {
				this.showToast('Erro ao carregar o feed. Erro:' + error.error);
			});
  	}
}
