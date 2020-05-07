import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoPostPage } from './novo-post.page';

const routes: Routes = [
  {
    path: '',
    component: NovoPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoPostPageRoutingModule {}
