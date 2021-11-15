export interface TabProps {
  text: string;
  route?: string;
}

export const tabItems: TabProps[] = [
  {
    text: '今日推荐',
    route: '/todayIntr'
  },
  {
    text: '每日排行',
    route: '/todayTop'
  },
  {
    text: '优选歌单',
    route: '/gedan'
  },
  {
    text: '喜欢的歌',
    route: '/love'
  },
  {
    text: '自建歌单',
    route: '/selfGedan'
  }
];
