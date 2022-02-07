import React, { useEffect, useRef } from 'react';

interface MenuItem {
  name: string;
  onClick: (e: MenuItemEvent<HTMLLIElement>) => void;
}

interface MenuOptions {
  menus: MenuItem[];
}

interface ContextMenuProps {
  options: MenuOptions;
}
export type MenuItemEvent<T = HTMLElement> = React.MouseEvent<T, MouseEvent> | MouseEvent;

function createMenu(options: MenuOptions): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.classList.add('custom-context-menu');
  ul.style.display = 'none';
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

export function showMenu(e: MenuItemEvent<HTMLInputElement>, instance: HTMLUListElement) {
  instance.style.top = `${e.clientY}px`;
  instance.style.left = `${e.clientX}px`;
  instance.style.display = 'block';
}

export function hideMenu(e: MouseEvent, instance: HTMLUListElement) {
  instance.style.display = 'none';
}

export const useContextMenu = ({ options }: ContextMenuProps) => {
  const menuRef = useRef<HTMLUListElement>(createMenu(options));

  const hidden = (e: MouseEvent) => {
    hideMenu(e, menuRef.current);
  };

  useEffect(() => {
    document.addEventListener('click', hidden);
    return () => {
      document.removeEventListener('click', hidden);
    };
  }, []);

  const show = (e: MenuItemEvent<HTMLInputElement>) => {
    showMenu(e, menuRef.current);
  };
  return {
    showMenu: show
  };
};
