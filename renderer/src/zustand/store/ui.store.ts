import create from 'zustand';
import { CollapseOptions, PreRouterTypes } from '../type/ui.type';

export const useCollapse = create<CollapseOptions>((set) => ({
  collapse: false,
  openCollapse: () => set(() => ({ collapse: true })),
  closeCollapse: () => set(() => ({ collapse: false }))
}));

export const usePreRoute = create<PreRouterTypes>((set) => ({
  preRoute: '',
  setPreRoute: (preRoute) => set({ preRoute })
}));
