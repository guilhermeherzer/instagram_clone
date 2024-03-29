import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'tab1',
				loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
			},
			{
				path: 'tab2',
				loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
			},
			{
				path: 'tab4',
				loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
			},
			{
				path: 'tab5',
				loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
			},
			{
				path: 'perfil/:userId',
				loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
			},
			{
				path: '',
				redirectTo: '/tabs/tab1',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/tab1',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule {}
