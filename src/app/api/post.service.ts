import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private API_URL = 'http://127.0.0.1:8000/api/';

	private headers = {
		'Authorization' : 'Bearer ' + window.localStorage['token'],
		'Content-Type': 'application/json',
		'Accept': 'text/javascript'
	};

	constructor(private http: HTTP) { }

	meusPosts(id: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'meus_posts/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	feed(id: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'feed/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}
}
