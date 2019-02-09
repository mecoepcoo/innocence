import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { PostlistComponent } from './postlist/postlist.component';
import { PostComponent } from './post/post.component';
import { ArchiveComponent } from './archive/archive.component';
import { PageComponent } from './page/page.component';

const COMPONENTS = [
  AboutComponent,
  CategoryComponent,
  TagComponent,
  PostlistComponent,
  PostComponent,
  ArchiveComponent,
  PageComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
