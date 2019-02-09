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
  { path: 'post', component: PostComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'tag', component: TagComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
