import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  	slideOpts = {
    	initialSlide: 0,
    	freeMode: true,
    	freeModeSticky: true,
    	speed: 400,

    	slidesPerView: 5.2,
      	centeredSlides: false,
  	};

  constructor() {}

}
