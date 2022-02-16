export interface TabProps {
  text: string;
  route: string;
  active?: boolean;
}

export const sidebarModel: TabProps[] = [
  {
    text: '接口测试',
    route: '/apiTest'
  },
  {
    text: 'websocket',
    route: '/websocket'
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
