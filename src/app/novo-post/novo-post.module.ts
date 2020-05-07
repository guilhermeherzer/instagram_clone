import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoPostPageRoutingModule } from './novo-post-routing.module';

import { NovoPostPage } from './novo-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoPostPageRoutingModule
  ],
  declarations: [NovoPostPage]
})
export class NovoPostPageModule {}
