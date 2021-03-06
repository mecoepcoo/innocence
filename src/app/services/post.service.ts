import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api = this.config.apiUrl + 'api/home/v1/';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  getList(page = 1, size = 10) {
    return this.http.get(`${this.api}posts?page=${page}&size=${size}`).pipe(
      map((data: any) => data.data),
    );
  }

  getPost(id) {
    return this.http.get(`${this.api}posts/${id}`).pipe(
      map((data:any) => data.data),
    );
  }

  getListForCategory(page = 1, size = 10, categoryId) {
    return this.http.get(`${this.api}posts?page=${page}&size=${size}&type=category&id=${categoryId}`).pipe(
      map((data: any) => data.data),
    );
  }

  getListForTag(page = 1, size = 10, tagId) {
    return this.http.get(`${this.api}posts?page=${page}&size=${size}&type=tag&id=${tagId}`).pipe(
      map((data: any) => data.data),
    );
  }

  getListForArchive(page = 1, size = 20) {
    return this.http.get(`${this.api}posts?page=${page}&size=${size}&type=time`).pipe(
      map((data: any) => data.data),
    );
  }

  count() {
    return this.http.get(`${this.api}posts/count`).pipe(
      map((data: any) => data.data),
    );
  }

}
