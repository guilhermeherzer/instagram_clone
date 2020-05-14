import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { UserService } from './../api/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	model: User;

	constructor(
		public navCtrl: NavController,
		private toastCtrl: ToastController,
		private storage: NativeStorage,
		private userService: UserService
	) { 
		this.model = new User();
		this.model.email = 'guilherme.mr@live.com';
		//this.model.email = 'agatha.herzer@hotmail.com';
		//this.model.email = 'romullo.herzer@hotmail.com';
		//this.model.email = 'alexandre@hotmail.com';
		//this.model.email = 'pamella@hotmail.com';
		//this.model.email = 'hinah@hotmail.com';
		this.model.password = '12345678';
	}

	ngOnInit() {
	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom'});
		toast.present();
	}

	login(){
		this.userService.login(this.model.email, this.model.password)
			.then((result: any) => {
				if(result.responseData['success'] == '1'){

					this.storage.setItem('token', result.responseData['token']);

					this.storage.setItem('user', result.responseData['user']);

					this.navCtrl.navigateRoot('/tabs/tab1');

					this.showToast(result.responseData['message']);

				}else if(result.responseData['success'] == '0'){

					this.showToast(result.responseData['message']);

				}
			})
			.catch(error => {
				this.showToast('Erro ao efetuar login. Erro:' + error);
			})
	}

}

export class User {
	email: string;
	password: string;
}
