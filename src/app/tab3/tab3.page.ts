import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { File } from '@ionic-native/file/ngx';

@Component({
	selector: 'app-tab3',
	templateUrl: './tab3.page.html',
	styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page  {

	private list = []
	private imageSelect: any

	constructor(private router: Router,
				private photoLibrary: PhotoLibrary,
				private camera: Camera,
				private sanitizer: DomSanitizer,
				private platform: Platform,
				private webview: WebView,
				private file: File) {
		this.loadPage()
	}

	async loadPage(){
		this.platform.ready()
			.then(() => {
				this.photoLibrary.requestAuthorization()
					.then(() => {
						this.photoLibrary.getLibrary().subscribe({
							next: library => {
								library['library'].forEach(libraryItem => {
									let url: string = libraryItem.id.split(";", 2)[1]

									let photo = {
										path: this.pathForImage(url),
										realPath: url
									}

									this.list.push(photo)

									this.imageSelect = this.list[0]
							    })
							},
							error: err => console.log('could not get photos'),
							complete: () => console.log('complete get photos')
						})
					})
					.catch(err => console.log('permissions weren\'t granted'))
			})
	}

	takePhoto() {
		const options: CameraOptions = {
			quality: 50,
			sourceType: this.camera.PictureSourceType.CAMERA,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true
		}

		this.camera.getPicture(options)
		.then((imageData) => {
			let photo = imageData
			this.router.navigate(['/novo-post', photo])
		}, (err) => {
			console.log(err)
		});

	}

	next(img) {
		this.router.navigate(['/novo-post', img])
	}

	select(img) {
		this.imageSelect = img
	}

	segmentChanged(ev: any) {
		if(ev.detail.value == "foto"){
			this.takePhoto()
		}
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