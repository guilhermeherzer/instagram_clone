import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private API_URL = 'http://192.168.0.127/api/';

	private headers = {
		'Authorization' : 'Bearer ' + window.localStorage['token'],
		'Content-Type': 'application/json',
		'Accept': 'application/json'
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

	feed(myId: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'feed/' + myId, {}, this.headers)
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

	comentarios(myId: string, postId: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'comentarios/' + myId + '/' + postId, {}, this.headers)
			.then((data: any) => {
				//console.log(data.data);
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				//console.log(error.error);
				reject(JSON.parse(error.error));
			});
		});
	}

	comentar(postId: string, myId: string, texto: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'comentar/' + postId + '/' + myId + '/' + texto, {}, this.headers)
			.then((data: any) => {
				console.log(data.data);
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				console.log(error.error);
				reject(JSON.parse(error.error));
			});
		});
	}
}
