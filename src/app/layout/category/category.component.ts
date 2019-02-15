import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '@services/category.service';
import { ICategory } from '@interfaces/category';
import { PostService } from '@services/post.service';
import { IPost } from '@interfaces/post';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  categories: ICategory[];
  posts: IPost[];
  categoriesCount = 0;
  currentCategory: ICategory;

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 2,
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _postSrv: PostService,
    private _categorySrv: CategoryService,
  ) { }

  ngOnInit() {
    this.getCategories().subscribe(data => {
      this.categoriesCount = data.count;
      this.categories = data.rows;
      if (!this.currentCategory) this.currentCategory = this.categories[0];
      let params$ = this.activatedRoute.params;
      let queries$ = this.activatedRoute.queryParams;
      params$.subscribe(param => {
          param.id ? this.pageConfig.currentPage = +param.id : this.pageConfig.currentPage = 1;
          queries$.subscribe(query => {
            let categoryId = query.cid;
            for (let i = 0, len = this.categories.length; i < len; i++) {
              if (this.categories[i].id == categoryId) {
                this.currentCategory = this.categories[i];
                break;
              }
            }
            this.getPosts(this.currentCategory.id);
          })
        });
    })
  }

  getPageData(currentPage) {
    this.router.navigate(
      ['/category', currentPage],
      {
        queryParams: {cid: this.currentCategory.id},
        skipLocationChange: true,
      }
    );
    this.getPosts(this.currentCategory.id);
  }

  getCategories() {
    return this._categorySrv.getList();
  }

  getPosts(categoryId) {
    return this._postSrv.getListForCategory(this.pageConfig.currentPage, this.pageConfig.pageSize, categoryId).subscribe(data => {
      this.posts = data.rows;
      this.pageConfig.totalNum = data.count;
      this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
      console.log(this.pageConfig)
    });
  }

  setCurrentCategory(category: ICategory) {
    this.currentCategory = category;
    this.getPosts(category.id);
  }
}
