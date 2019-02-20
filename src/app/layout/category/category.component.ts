import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '@services/category.service';
import { ICategory } from '@interfaces/category';
import { PostService } from '@services/post.service';
import { IPost } from '@interfaces/post';

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
    pageSize: 10,
  };

  constructor(
    private _postSrv: PostService,
    private _categorySrv: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      /* switchMap(id => {
        return this.getCategories();
      }),
      map((data: any) => {
        data.rows.forEach(category => {
          console.log(category)
          if (category.id == paramsId) this.currentCategory = category;
        });
      }),
      map(() => {
        this.getPosts(this.currentCategory.id);
      }), */
    ).subscribe(id => {
      if (id) {
        this.getCategories().pipe(
          map((data: any) => {
            data.rows.forEach(category => {
              if (category.id == id) this.currentCategory = category;
            });
          }),
          map(() => this.getPosts(this.currentCategory.id)),
        ).subscribe();
      } else {
        this.getCategories().subscribe(data => {
          if (!this.currentCategory) this.currentCategory = this.categories[0];
          this.getPosts(this.currentCategory.id);
        })
      }
    });
  }

  getPageData() {
    this.getPosts(this.currentCategory.id);
  }

  getCategories() {
    return this._categorySrv.getList().pipe(map(data => {
      this.categoriesCount = data.count;
      this.categories = data.rows;
      return data;
    }));
  }

  getPosts(categoryId) {
    return this._postSrv.getListForCategory(this.pageConfig.currentPage, this.pageConfig.pageSize, categoryId).subscribe(data => {
      this.posts = data.rows;
      this.pageConfig.totalNum = data.count;
      this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
    });
  }

  setCurrentCategory(category: ICategory) {
    this.pageConfig.currentPage = 1;
    this.router.navigate(['/category', category.id]);
  }
}
