import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { Observable } from 'rxjs';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private API_URL = 'http://192.168.0.127/api/'

	constructor(private http: HTTP,
				private storage: NativeStorage) {}

	getHeaders() {
		return new Promise((resolve, reject) => {
			this.storage.getItem('token')
				.then(res => {
					let token = res

					let headers = {
						'Authorization' : 'Bearer ' + token,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}

					resolve(headers)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	meuPerfil() {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.get(this.API_URL + 'meu_perfil/', {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	feed() {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.get(this.API_URL + 'feed/', {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	verPerfil(id: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.get(this.API_URL + 'ver_perfil/' + id, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	seguir(id: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.post(this.API_URL + 'seguir/' + id, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	desseguir(id: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.post(this.API_URL + 'desseguir/' + id, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	buscar(texto: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.get(this.API_URL + 'buscar/' + texto, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	comentarios(postId: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.get(this.API_URL + 'comentarios/' + postId, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	comentar(postId: string, texto: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.post(this.API_URL + 'comentar/' + postId + '/' + texto, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	like(postId: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.post(this.API_URL + 'like/' + postId, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}

	deletePost(postId: string) {
		return new Promise((resolve, reject) => {
			this.getHeaders().then((res: any) => {
				this.http.post(this.API_URL + 'publicar/delete/' + postId, {}, res)
					.then((data: any) => {
						resolve(JSON.parse(data.data))
					})
					.catch(error => {
						reject(JSON.parse(error.error))
					})
			})
		})
	}
}
