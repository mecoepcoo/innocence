import { Component, OnInit } from '@angular/core';
import { VisitService } from '@services/visit.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  visit = {
    uv: 0,
    pv: 0,
  };

  constructor(
    private _visitSrv: VisitService,
  ) { }

  ngOnInit() {
    this.getVisit();
  }

  getVisit() {
    this._visitSrv.getVisit().subscribe(data => {
      this.visit = data;
    });
  }
}
