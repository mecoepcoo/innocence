import { Component, OnInit } from '@angular/core';
import { PostService } from '@services/post.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.less']
})
export class ArchiveComponent implements OnInit {
  postsList = [];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 10,
  };

  constructor(
    private _postSrv: PostService,
  ) { }

  ngOnInit() {
    this.getPosts().subscribe();
  }

  getPosts() {
    return this._postSrv.getListForArchive(this.pageConfig.currentPage, this.pageConfig.pageSize).pipe(map(data => {
      let posts = data.rows;
      this.pageConfig.totalNum = data.count;
      this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
      let currentYear: number;
      let index = -1;
      posts.sort((a, b) => {
        return new Date(b.created_at).getFullYear() - new Date(a.created_at).getFullYear();
      });
      let postsList = [];
      posts.forEach(post => {
        let createdYear = new Date(post.created_at).getFullYear();
        if (createdYear != currentYear) {
          index++;
          currentYear = createdYear;
          let item = {
            year: createdYear,
            posts: [post],
          };
          postsList.push(item);
        } else {
          postsList[index].posts.push(post);
        }
      });
      this.postsList = postsList;
    }));
  }

  getPageData() {
    this.getPosts().subscribe();
  }

}
