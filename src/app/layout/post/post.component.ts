import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import * as marked from 'marked';
import { PostService } from '@services/post.service';
import { IPost } from '@interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  post: IPost;

  constructor(
    private _postSrv: PostService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.getPost(params.get('id')))
    ).subscribe();
    console.log(marked)
  }

  getPost(id) {
    return this._postSrv.getPost(id).pipe(map((data) => {
      console.log(data);
      let post = data;
      console.log(marked(post.post_content));
      this.post = post;
    }));
  }
}
