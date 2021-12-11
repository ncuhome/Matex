export interface TabProps {
  text: string;
  route: string;
  active?: boolean;
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
    text: '数据获取',
    route: '/gedan'
  },
  {
    text: 'Mock服务',
    route: '/love'
  }
];
