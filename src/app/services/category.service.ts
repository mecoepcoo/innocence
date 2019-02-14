import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = this.config.apiUrl + 'api/home/v1/';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  getList() {
    return this.http.get(`${this.api}categories`).pipe(
      map((data: any) => data.data),
    );
  }

  count() {
    return this.http.get(`${this.api}categories/count`).pipe(
      map((data: any) => data.data),
    );
  }

}
