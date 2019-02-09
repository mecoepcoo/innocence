import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  title: string;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.config.siteInfo.subscribe(data => {
      this.title = data.title;
    });
  }

}
