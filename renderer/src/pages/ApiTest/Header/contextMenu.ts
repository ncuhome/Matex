import { MenuItemEvent, MenuOptions } from '/@/hooks/useContextMenu';

export const menuOptions: MenuOptions<HTMLInputElement> = {
  menus: [
    {
      name: '复制'
    },
    {
      name: '剪切'
    },
    {
      name: '粘贴'
    },
    {
      name: '清除'
    }
  ]
};
