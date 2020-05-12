import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';

import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
	providedIn: 'root'
})
export class UserService {
	public auth: User

	private API_URL = 'http://192.168.0.127/api/'

	private headers = {
		'Authorization' : 'Bearer ' + window.localStorage['token'],
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	constructor(private http: HTTP,
				private storage: NativeStorage) { }

	login(email: string, password: string){
		return new Promise((resolve, reject) => {
			var user = {
				email: email,
				password: password
			}

			this.http.post(this.API_URL + 'login', user, {})
				.then((data: any) => {
				    resolve(JSON.parse(data.data))
				  })
				.catch(error => {
				  	reject(error.error)
				})
		})
	}

	cadastrar(name: string, sobrenome: string, email: string, password: string) {
		return new Promise((resolve, reject) => {
			var data = {
				name: name,
				sobrenome: sobrenome,
				email: email,
				password: password
			}

			this.http.post(this.API_URL + 'cadastrar', data, {})
				.then((data: any) => {
				    resolve(JSON.parse(data.data))
				  })
				.catch(error => {
				  	reject(JSON.parse(error.error))
				})
		})
	}

	logout() {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'logout', {}, this.headers)
				.then((data: any) => {
				    resolve(JSON.parse(data.data))
				  })
				.catch(error => {
				  	reject(JSON.parse(error.error))
				})
		})
	}

	getAuth() {
		return new Promise((resolve, reject) => {
			this.storage.getItem('user')
				.then(
					data => {
						this.auth = new User()
						this.auth.id = data.id
						this.auth.name = data.name
						this.auth.username = data.user
						this.auth.profilePicUrl = data.user_img
						this.auth.email = data.email

						resolve(this.auth)
					}
				)
		})
	}
}

export class User {
	id: string
   	name: string
   	username: string
   	profilePicUrl: string
   	email: string
}