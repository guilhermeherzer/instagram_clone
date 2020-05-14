import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
	},
	{
		path: 'cadastro',
		loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
	},
  	{
    	path: 'tab3',
    	loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  	},
  	{
    	path: 'comentarios/:postId',
    	loadChildren: () => import('./comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  	},
  	{
    	path: 'novo-post/:photo',
    	loadChildren: () => import('./novo-post/novo-post.module').then( m => m.NovoPostPageModule)
  	}
];
@NgModule({
	imports: [
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
