import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  api = this.config.apiUrl + 'api/home/v1/';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  getList() {
    return this.http.get(`${this.api}tags`).pipe(
      map((data: any) => data.data),
    );
  }

  count() {
    return this.http.get(`${this.api}tags/count`).pipe(
      map((data: any) => data.data),
    );
  }

}
