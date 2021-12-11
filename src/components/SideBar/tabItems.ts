export interface TabProps {
  text: string;
  route: string;
  active?: boolean;
}

export const tabItems: TabProps[] = [
  {
    text: 'Mock服务',
    route: '/mock'
  },
  {
    text: '每日排行',
    route: '/push'
  },
  {
    text: '数据获取',
    route: '/pull'
  },
  {
    text: '敬请期待',
    route: '/ok'
  }
];
