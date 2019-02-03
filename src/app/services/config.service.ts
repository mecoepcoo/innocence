import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IContact } from '@interfaces/contact';
import { ISiteInfo } from '@interfaces/siteInfo';
import { INav } from '@interfaces/nav';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get contact(): Observable<IContact[]> {
    let contact: IContact[] = [
      {
        title: 'GitHub',
        type: 'url',
        value: 'https://github.com/mecoepcoo',
      },
      {
        title: 'WeChat',
        type: 'icon',
        value: '',
      },
      {
        title: 'Steam',
        type: 'url',
        value: 'https://steamcommunity.com/id/mecoepcoo',
      },
      {
        title: 'Mail',
        type: 'email',
        value: 'mecoepcoo@vip.qq.com',
      },
      {
        title: '知乎',
        type: 'url',
        value: 'https://zhuanlan.zhihu.com/tianzhen',
      },
      {
        title: '简书',
        type: 'url',
        value: 'https://www.jianshu.com/u/c0d59133d5e3',
      }
    ];
    return of(contact);
  }

  get siteInfo(): Observable<ISiteInfo> {
    let siteInfo: ISiteInfo = {
      title: 'tz小海螺',
      user: {
        name: 'Tianzhen',
        signature: '心者，栖神之舍；神者，知识之本；思者，神识之妙用也。',
        icon: ''
      }
    };
    return of(siteInfo);
  }
  
  get nav(): Observable<INav[]> {
    let nav: INav[] = [
      {
        title: '首页',
        type: 'inside',
        link: ''
      },
      {
        title: '分类',
        type: 'inside',
        link: ''
      },
      {
        title: '归档',
        type: 'inside',
        link: ''
      },
      {
        title: '标签',
        type: 'inside',
        link: ''
      },
      {
        title: '关于',
        type: 'inside',
        link: ''
      },
    ];
    return of(nav);
  }
}
