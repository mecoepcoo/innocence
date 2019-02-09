import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from '@services/config.service';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  api = this.config.apiUrl + 'api/home/v1/';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  getVisit() {
    return this.http.get(`${this.api}visit`).pipe(
      map((data: any) => data.data),
    );
  }

}
