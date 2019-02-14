import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _postSrv: PostService,
    private _categorySrv: CategoryService,
  ) { }

  ngOnInit() {
    this.getCategories().subscribe(data => {
      console.log(data);
      this.categoriesCount = data.count;
      this.categories = data.rows;
      this.currentCategory = this.categories[0];
      this.getPosts(this.currentCategory.id).subscribe(data => {
        this.posts = data.rows;
      });
    })
  }

  getPageData(currentPage) {
    this.router.navigate(['/category', currentPage]);
    // this.getPosts(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }

  getCategories() {
    return this._categorySrv.getList();
  }

  getPosts(categoryId) {
    return this._postSrv.getListForCategory(this.pageConfig.currentPage, this.pageConfig.pageSize, categoryId);
  }
}
