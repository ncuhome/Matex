export interface TabProps {
  text: string;
  route: string;
  active?: boolean;
}

export const tabItems: TabProps[] = [
  {
    text: '接口测试',
    route: '/apiTest'
  },
  {
    text: '虚拟接口',
    route: '/mock'
  },

  {
    text: '压力测试',
    route: '/benchmark'
  },
  {
    text: '敬请期待',
    route: '/ok'
  }
];
