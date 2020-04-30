import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class UserService {
	private API_URL = 'http://192.168.0.127/api/';

	private headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	constructor(private http: HTTP) {}

	cadastrar(name: string, sobrenome: string, email: string, password: string) {
		return new Promise((resolve, reject) => {
			var data = {
				name: name,
				sobrenome: sobrenome,
				email: email,
				password: password
			};

			this.http.post(this.API_URL + 'cadastrar', data, {})
				.then((data: any) => {
				    resolve(JSON.parse(data.data));
				  })
				.catch(error => {
				  	reject(JSON.parse(error.error));
				});
		});
	}

	login(email: string, password: string){
		return new Promise((resolve, reject) => {
			var user = {
				email: email,
				password: password
			};

			this.http.post(this.API_URL + 'login', user, {})
				.then((data: any) => {
				    resolve(JSON.parse(data.data));
				  })
				.catch(error => {
				  	reject(error.error);
				});
		});
	}
}
