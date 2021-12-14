import CollectIcon from '../../assets/sidarIcon/CollectIcon';
import MockIcon from '../../assets/sidarIcon/MockIcon';

export interface TabProps {
  text: string;
  route: string;
  renderIcon: ({ active: boolean }: { active: boolean }) => JSX.Element;
  active?: boolean;
}

export const tabItems: TabProps[] = [
  {
    text: '数据获取',
    route: '/collect',
    renderIcon: CollectIcon
  },
  {
    text: 'Mock服务',
    route: '/mock',
    renderIcon: MockIcon
  },

  {
    text: '每日排行',
    route: '/push',
    renderIcon: CollectIcon
  },
  {
    text: '敬请期待',
    route: '/ok',
    renderIcon: CollectIcon
  }
];
