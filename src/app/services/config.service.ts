import { Injectable } from '@angular/core';
import { IContact } from '@interfaces/contact';
import { ISiteInfo } from '@interfaces/siteInfo';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get contact(): IContact[] {
    return [
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
  }

  get siteInfo(): ISiteInfo {
    return
  }

  
}
