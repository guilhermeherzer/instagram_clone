import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private API_URL = 'http://192.168.0.127/api/'

	private token: string = ''

	private headers: any

	constructor(private http: HTTP,
				private storage: NativeStorage) {
		this.storage.getItem('token')
			.then(data => {
				this.token = data

				this.headers = {
					'Authorization' : 'Bearer ' + this.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				};
			})
	}

	meuPerfil() {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'meu_perfil/', {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	feed() {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'feed/', {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
				console.log(data)
			})
			.catch(error => {
				reject(JSON.parse(error.error));
				console.log(error)
			});
		});
	}

	verPerfil(id: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'ver_perfil/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	seguir(id: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'seguir/' + id, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	desseguir(id: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'desseguir/' + id, {}, this.headers)
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

	comentarios(postId: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_URL + 'comentarios/' + postId, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	comentar(postId: string, texto: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'comentar/' + postId + '/' + texto, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	like(postId: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'like/' + postId, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}

	deletePost(postId: string) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_URL + 'publicar/delete/' + postId, {}, this.headers)
			.then((data: any) => {
				resolve(JSON.parse(data.data));
			})
			.catch(error => {
				reject(JSON.parse(error.error));
			});
		});
	}
}
