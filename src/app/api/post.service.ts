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

	meuPerfil(id: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'meu_perfil/' + id, {}, this.headers)
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

	verPerfil(myId: string, id: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'ver_perfil/' + myId + '/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	seguir(myId: string, id: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'seguir/' + myId + '/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	desseguir(myId: string, id: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'desseguir/' + myId + '/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	buscar(texto: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'buscar/' + texto, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}
}
