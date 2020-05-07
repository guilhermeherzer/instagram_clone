import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Platform } from '@ionic/angular';

import { DomSanitizer } from '@angular/platform-browser';

import {WebView} from '@ionic-native/ionic-webview/ngx';

@Component({
	selector: 'app-tab3',
	templateUrl: './tab3.page.html',
	styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit  {

	list = []
	imageSelect = []

	constructor(private router: Router,
				private photoLibrary: PhotoLibrary,
				private camera: Camera,
				private sanitizer: DomSanitizer,
				public platform: Platform,
				private webview: WebView) { }

	ngOnInit() {
		this.library()
	}

	library(){
		this.platform.ready().then(() => {
			this.photoLibrary.requestAuthorization()
				.then(() => {
					this.photoLibrary.getLibrary().subscribe({
						next: library => {
							library['library'].forEach(libraryItem => {
						        let url: string[] = [
						        	libraryItem.id.split(";", 2)[0],
						        	this.webview.convertFileSrc(libraryItem.id.split(";", 2)[1])
						        ]
						        this.list.push(url)
								this.imageSelect = this.list[0]
						    });
						},
						error: err => { 
							console.log('could not get photos') 
						},
						complete: () => { 
							console.log('done getting photos') 
						}
					})
				})
				.catch(err => console.log('permissions weren\'t granted'))
		})
	}

	takePhoto() {
		const options: CameraOptions = {
			quality: 100,
			sourceType: this.camera.PictureSourceType.CAMERA,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
		}

		this.camera.getPicture(options)
		.then((imageData) => {
			let photo = this.webview.convertFileSrc(imageData)
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
}