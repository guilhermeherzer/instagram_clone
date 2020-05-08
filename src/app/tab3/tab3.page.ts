import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
	selector: 'app-tab3',
	templateUrl: './tab3.page.html',
	styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit  {

	private list = []
	private imageSelect = []

	constructor(private router: Router,
				private loadingCtrl: LoadingController,
				private photoLibrary: PhotoLibrary,
				private camera: Camera,
				private sanitizer: DomSanitizer,
				private platform: Platform,
				private webview: WebView) {}

	ngOnInit() {
		this.loadPage()
	}

	async loadPage(){
		this.loadingCtrl.create({
		}).then((loadingElement) => {
			loadingElement.present()
			
	  		try{
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
								}
							})
						})
						.catch(err => console.log('permissions weren\'t granted'))
				})
	  		}catch(error){
	  			console.log(error.error)
	  		}finally{
				this.loadingCtrl.dismiss()
	  		}
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