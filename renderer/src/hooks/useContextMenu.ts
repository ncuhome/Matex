import React, { useEffect, useRef } from 'react';

interface MenuItem<T> {
  name: string;
}

export interface MenuOptions<T = HTMLElement> {
  menus: MenuItem<T>[];
}

interface ContextMenuProps<T = HTMLElement> {
  options: MenuOptions<T>;
  onSelect: OnselectType;
}
export type MenuItemEvent<T = HTMLElement> = React.MouseEvent<T, MouseEvent> | MouseEvent;
type OnselectType = (index: number, text: string) => void;

function createMenu<T>(options: MenuOptions<T>, onSelect: OnselectType): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.classList.add('custom-context-menu');
  ul.style.display = 'none';
  const { menus } = options;
  if (menus && menus.length > 0) {
    menus.forEach((menu, index) => {
      const li = document.createElement('li');
      li.textContent = menu.name;
      li.onclick = (e) => {
        onSelect(index, menu.name);
      };
      ul.appendChild(li);
    });
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

export const useContextMenu = <T>({ options, onSelect }: ContextMenuProps<T>) => {
  const menuRef = useRef<HTMLUListElement>(createMenu<T>(options, onSelect));

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
