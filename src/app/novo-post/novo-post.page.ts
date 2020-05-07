import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  	selector: 'app-novo-post',
  	templateUrl: './novo-post.page.html',
  	styleUrls: ['./novo-post.page.scss'],
})
export class NovoPostPage implements OnInit {

	private photo: any

  	constructor(private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.route.paramMap.subscribe(params => {
		    this.photo = params.get('photo')
		})
  	}

}
