import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    this.getCategories().subscribe(data => {
      this.categoriesCount = data.count;
      this.categories = data.rows;
      if (!this.currentCategory) this.currentCategory = this.categories[0];
      this.getPosts(this.currentCategory.id);
    })
  }

  getPageData() {
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
    });
  }

  setCurrentCategory(category: ICategory) {
    this.currentCategory = category;
    this.pageConfig.currentPage = 1;
    this.getPosts(category.id);
  }
}
