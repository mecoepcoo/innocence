import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { PostlistComponent } from './postlist/postlist.component';
import { PostComponent } from './post/post.component';
import { ArchiveComponent } from './archive/archive.component';

const COMPONENTS = [
  HeaderComponent,
  AboutComponent,
  FooterComponent,
  SidebarComponent,
  CategoryComponent,
  TagComponent,
  PostlistComponent,
  PostComponent,
  ArchiveComponent,
]

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
