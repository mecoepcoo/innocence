import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while(route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data))
      .subscribe((data) => {
        let title = data.title ? data.title + ' | 天真小海螺' : '天真小海螺';
        this.title.setTitle(title);
      })
  }
}
