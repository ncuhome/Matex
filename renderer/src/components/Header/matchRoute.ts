export interface UnderlineRouteItem {
  icon: string;
  text: string;
  route: string;
}

export const UnderlineRouteMaps: Map<string, UnderlineRouteItem[]> = new Map([
  [
    '/api',
    [
      { icon: 'wrench', text: '接口测试', route: 'single' },
      { icon: 'fighter jet', text: '自动测试', route: 'auto' }
    ]
  ],
  [
    '/websocket',
    [
      { icon: 'home', text: 'native', route: 'native' },
      { icon: 'home', text: 'socketIo', route: 'native' }
    ]
  ]
]);

export const getRoutes = (path: string): UnderlineRouteItem[] => {
  for (const key of UnderlineRouteMaps.keys()) {
    if (path.includes(key)) {
      return UnderlineRouteMaps.get(key) ?? [];
    }
  }

  return [];
};
