export interface TabProps {
  icon: string;
  route: string;
  active?: boolean;
}

export const sidebarModel: TabProps[] = [
  {
    icon: 'world',
    route: '/api'
  },
  {
    icon: 'linkify',
    route: '/websocket'
  },
  {
    icon: 'rocket',
    route: '/benchmark'
  },
  {
    icon: 'find',
    route: '/ok'
  }
];
