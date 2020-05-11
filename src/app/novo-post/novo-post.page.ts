import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { PostService } from './../api/post.service';

import { WebView } from '@ionic-native/ionic-webview/ngx';

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

	constructor(private router: Router,
				private route: ActivatedRoute,
				private toastCtrl: ToastController,
				private postService: PostService,
				private transfer: FileTransfer, private file: File, private webview: WebView) {
		this.route.paramMap.subscribe(params => {
			this.photo = params.get('photo')
		})
		this.legenda = "";
	}

	ngOnInit() {
		this.img = this.pathForImage(this.photo)
	}

	async showToast(message: string) {
		const toast = await this.toastCtrl.create({message, duration: 2000, position: 'bottom' });
		toast.present();
	}

	share(){
		const fileTransfer: FileTransferObject = this.transfer.create();

		var options: FileUploadOptions = {
			fileKey: 'photo',
			chunkedMode: false,
			headers: {
				'Authorization' : 'Bearer ' + window.localStorage['token']
			}
		}

		this.url = encodeURI('http://192.168.0.127/api/publicar/' + this.legenda)

		fileTransfer.upload(this.photo, this.url, options)
			.then((result: any) => {
				let data = JSON.parse(result.response)
				if(data.responseData.success === '1'){
					this.router.navigate(['/tabs/tab1'])
				}
			}, (err) => {
				this.showToast('Http Status: ' + err.http_status + ' Code: ' + err.code + ' Source: ' + err.source + ' Body: ' + err.body)
			})
	}

  	pathForImage(img){
  		if(img === null) {
  			return ';'
  		} else {
  			let converted = this.webview.convertFileSrc(img)
  			return converted
  		}
  	}
}
