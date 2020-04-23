import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class UserService {
	private API_URL = 'http://127.0.0.1:8000/api/';

	private headers = {
		'Content-Type': 'application/json',
		'Accept': 'text/javascript'
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
				    console.log(data.status);
    				console.log(data.data); // data received by server
    				console.log(data.headers);
    				console.log('data');
				    resolve(JSON.parse(data.data));
				  })
				.catch(error => {
					console.log(error.status);
				    console.log(error.error); // error message as string
				    console.log(error.headers);
				    console.log('error');
				  	reject(error.error);
				});
		});
	}
}
