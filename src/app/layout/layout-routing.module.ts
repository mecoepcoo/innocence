import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { PostlistComponent } from './postlist/postlist.component';
import { PostComponent } from './post/post.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  { path: 'index', component: PostlistComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'post', component: PostComponent },
  { path: 'category/:id', component: CategoryComponent, data: {title: '分类'} },
  { path: 'category', component: CategoryComponent, data: {title: '分类'} },
  { path: 'archive', component: ArchiveComponent, data: {title: '归档'} },
  { path: 'tag', component: TagComponent, data: {title: '标签'} },
  { path: 'about', component: AboutComponent, data: {title: '关于'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
