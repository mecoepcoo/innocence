import { Component, OnInit } from '@angular/core';
import { TagService } from '@services/tag.service';
import { ITag } from '@interfaces/tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less']
})
export class TagComponent implements OnInit {
  tagCloud: ITag[];
  tagCloudCount: number;

  constructor(
    private _tagSrv: TagService,
  ) { }

  ngOnInit() {
    this.getTags().subscribe();
  }

  getTags() {
    return this._tagSrv.getList().pipe(map(data => {
      this.tagCloudCount = data.count;
      let tags = data.rows;
      let currentH = 0;
      let currentFontSize = 12;
      tags.map(tag => {
        tag.style = {};
        let fontSize = this.genFontSize(currentFontSize);
        currentFontSize = fontSize;
        tag.style.fontSize = fontSize + 'px';
        let h = this.genColorH(currentH);
        currentH = h;
        let s = Math.random() * 50 + 50;
        let l = Math.random() * 20 + 40;
        tag.style.color = `hsl(${h}, ${s}%, ${l}%)`;
        return tag;
      });
      this.tagCloud = tags;
    }));
  }

  genColorH(currentH) {
    let h = Math.random() * 360;
    return Math.abs(h - currentH) < 30 ? this.genColorH(currentH) : h;
  }

  genFontSize(currentFontSize) {
    let size = Math.floor(Math.random() * 30 + 12);
    return Math.abs(size - currentFontSize) < 5 ? this.genFontSize(currentFontSize) : size;
  }
}
