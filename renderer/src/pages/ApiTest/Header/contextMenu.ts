import React from 'react';
import { MenuItemEvent } from '/@/hooks/useContextMenu';

export const menuOptions = {
  menus: [
    {
      name: '复制',
      onClick: function (e: MenuItemEvent) {
        console.log('menu1 clicked');
      }
    },
    {
      name: '剪切',
      onClick: function (e: MenuItemEvent) {
        console.log('menu2 clicked');
      }
    },
    {
      name: '粘贴',
      onClick: function (e: MenuItemEvent) {
        console.log('menu3 clicked');
      }
    },
    {
      name: '清除',
      onClick: function (e: MenuItemEvent) {
        console.log('menu3 clicked');
      }
    }
  ]
};
