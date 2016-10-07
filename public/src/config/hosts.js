const hosts = [
  {
    name: '百度',
    id: 'baidu',
    default: false,
    urls: {
      suggesters: ['http://suggestion.baidu.com/su?ie=utf-8&json=1&p=3&wd='],
      href: 'https://www.baidu.com/s?ie=UTF-8&wd=',
    },
    jsonpCallback: 'cb',
    process: data => data.s,
  },

  {
    name: '优酷',
    id: 'youku',
    default: true,
    urls: {
      // first: initial suggester
      // second: search by word
      suggesters: ['http://tip.soku.com/search_yun?site=2', 'http://tip.soku.com/search_keys?site=2&query='],
      href: 'http://www.soku.com/v?keyword=',
    },
    jsonpCallback: 'jsoncallback',
    process: data => data.r.map(d => d.c),
  },
];

export default hosts;
