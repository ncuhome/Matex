import create from 'zustand';
import { CollapseOptions } from '../type/ui.type';

export const useCollapse = create<CollapseOptions>((set) => ({
  collapse: false,
  openCollapse: () => set(() => ({ collapse: true })),
  closeCollapse: () => set(() => ({ collapse: false }))
}));
