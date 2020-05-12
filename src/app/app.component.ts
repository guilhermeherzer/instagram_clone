import { Component, OnDestroy } from '@angular/core';

import { Platform, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { UserService } from './api/user.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	rootPage: any;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private storage: NativeStorage,
		private userService: UserService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {

			this.storage.getItem('token')
				.then(data => {
					let token = data

					if(token){
						this.rootPage = this.navCtrl.navigateRoot('/tabs/tab1');
					}
				})
				.catch(() => {
						this.rootPage = this.navCtrl.navigateRoot('/login');
				})

			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	logout(){
		this.userService.logout()
			.then((result: any) => {
				if(result.responseData['success'] === '1'){
					this.storage.remove('token')
					this.storage.remove('user')
					this.initializeApp();
					this.showToast('Deslogado com sucesso.')
				}
			})
			.catch((error: any) => {
				console.log(error.error)
				this.showToast('Erro ao deslogar. Erro:' + error.error)
			})
	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
  	}
}
