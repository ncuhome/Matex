import create from 'zustand';
import { CollapseOptions } from '../type/ui.type';

export const useCollapse = create<CollapseOptions>((set) => ({
  collapse: true,
  openCollapse: () => set(() => ({ collapse: true })),
  closeCollapse: () => set(() => ({ collapse: false }))
}));
