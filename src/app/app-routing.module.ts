import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: './layout/layout.module#LayoutModule' },
      // { path: 'index', component: CategoryComponent },
      // { path: 'category', loadChildren: './layout/layout.module#LayoutModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
