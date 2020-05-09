import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { PostService } from './../api/post.service';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
	selector: 'app-novo-post',
	templateUrl: './novo-post.page.html',
	styleUrls: ['./novo-post.page.scss'],
})
export class NovoPostPage implements OnInit {

	private url: string
	private photo: any
	private img: string
	private legenda: string

	constructor(private route: ActivatedRoute,
		private toastCtrl: ToastController,
		private postService: PostService,
		private transfer: FileTransfer, private file: File) {
		this.legenda = "";
	}

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.photo = params.get('photo')
		})
	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
	}

	/*share(img) {
		this.postService.publicar(this.myId, img, this.legenda)
		.then((result: any) => {
			console.log(result)
		})
		.catch((error: any) => {
			console.log(error.error)
		})
	}*/

	share(){
		//create file transfer FileTransferObject
		const fileTransfer: FileTransferObject = this.transfer.create();

		var options: FileUploadOptions = {
			fileKey: 'photo',
			headers: {
				'Authorization' : 'Bearer ' + window.localStorage['token']
			}
		}

		this.img = encodeURI('data:image/jpeg;base64,' + this.photo)

		this.file.resolveLocalFilesystemUrl(this.img)
			.then(entry => {
	    		console.log('cdvfile URI: ' + entry.toInternalURL());

			})
			.catch(err => {
	    		console.log('Error: ' + err);
			})

		this.url = encodeURI('http://192.168.0.127/api/publicar')

		fileTransfer.upload(this.img, this.url, options)
		.then((data) => {
			console.log(data)
		}, (err) => {
			console.log(err)
		})
	}

}
