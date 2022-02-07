import React from 'react';

const ContextMenu = function (options: any) {
  // 唯一实例
  let instance: HTMLUListElement;

  // 创建实例方法
  function createMenu(): HTMLUListElement {
    const ul = document.createElement('ul');
    ul.classList.add('custom-context-menu');
    const { menus } = options;
    if (menus && menus.length > 0) {
      for (let menu of menus) {
        const li = document.createElement('li');
        li.textContent = menu.name;
        li.onclick = menu.onClick;
        ul.appendChild(li);
      }
    }
    const body = document.querySelector('body');
    body!.appendChild(ul);
    return ul;
  }

  return {
    // 获取实例的唯一方式
    getInstance: function () {
      if (!instance) {
        instance = createMenu();
      }
      return instance;
    }
  };
};

type MenuItemEvent<T = HTMLElement> = React.MouseEvent<T, MouseEvent>;

const menuInse = ContextMenu({
  menus: [
    {
      name: '复制',
      onClick: function (e: MenuItemEvent<HTMLLIElement>) {
        console.log('menu1 clicked');
      }
    },
    {
      name: '剪切',
      onClick: function (e: MenuItemEvent<HTMLLIElement>) {
        console.log('menu2 clicked');
      }
    },
    {
      name: '粘贴',
      onClick: function (e: MenuItemEvent<HTMLLIElement>) {
        console.log('menu3 clicked');
      }
    },
    {
      name: '清除',
      onClick: function (e: MenuItemEvent<HTMLLIElement>) {
        console.log('menu3 clicked');
      }
    }
  ]
});

export function showMenu(e: MenuItemEvent<HTMLInputElement>) {
  const menus = menuInse.getInstance();
  menus.style.top = `${e.clientY}px`;
  menus.style.left = `${e.clientX}px`;
  menus.style.display = 'block';
}

export function hideMenu(e: MouseEvent) {
  const menus = menuInse.getInstance();
  menus.style.display = 'none';
}

document.addEventListener('click', hideMenu);
