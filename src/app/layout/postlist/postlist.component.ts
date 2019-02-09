import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '@services/post.service';
import { IPost } from '@interfaces/post';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.less']
})
export class PostlistComponent implements OnInit {
  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 5,
  };

  posts: IPost[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _postSrv: PostService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((param) => {
        param.id ? this.pageConfig.currentPage = +param.id : this.pageConfig.currentPage = 1;
        this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);
      });
  }

  getPosts(currentPage, pageSize) {
    this._postSrv.getList(currentPage, pageSize).subscribe(data => {
      let posts = data.rows;
      this.pageConfig.totalNum = data.count;
      this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);

      // posts = posts.map(post => {
        // post.date = {
          // day: 
        // }
      // });
      this.posts = posts;
    });
  }

  getPageData(currentPage) {
    this.router.navigate(['/index', currentPage]);
    this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }
}
