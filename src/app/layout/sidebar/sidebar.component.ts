import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ConfigService } from '@services/config.service';
import { ISiteInfo } from '@interfaces/siteInfo';
import { IBlogroll } from '@interfaces/blogroll';
import { BlogrollService } from '@services/blogroll.service';
import { CategoryService } from '@services/category.service';
import { PostService } from '@services/post.service';
import { TagService } from '@services/tag.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  siteInfo: ISiteInfo;
  blogrolls: IBlogroll;
  countData = [0, 0, 0];

  constructor(
    private config: ConfigService,
    private _blogrollSrv: BlogrollService,
    private _categorySrv: CategoryService,
    private _postSrv: PostService,
    private _tagSrv: TagService,
  ) { }

  ngOnInit() {
    this.config.siteInfo.subscribe(data => this.siteInfo = data);
    this.getBlogrolls();
    this.count();
  }

  getBlogrolls() {
    this._blogrollSrv.getBlogrolls().subscribe(data => {
      this.blogrolls = data;
    });
  }

  count() {
    let categoryCount$ = this._categorySrv.count();
    let tagCount$ = this._tagSrv.count();
    let postCount$ = this._postSrv.count();
    forkJoin(categoryCount$, tagCount$, postCount$).subscribe(data => {
      this.countData = data;
    });
  }
}
