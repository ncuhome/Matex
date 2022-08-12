import { LegacyRef, useEffect, useRef } from 'react';

export type Menus = { key: string }[];

export interface UseContextMenuProps<T extends HTMLElement> {
  ref: LegacyRef<T> | undefined;
  menus: Menus;
  onSelect: (index: number, key: string) => void;
}
export interface CreateMenuProps<T extends HTMLElement> extends Omit<UseContextMenuProps<T>, 'ref'> {
  e: MouseEvent;
}

export function createMenu<T extends HTMLElement>({
  e,
  menus,
  onSelect
}: CreateMenuProps<T>): HTMLUListElement {
  let ul: HTMLUListElement;
  const existEle = document.querySelector('#customContextMenu');
  if (existEle === null) {
    ul = document.createElement('ul');
    ul.id = 'customContextMenu';
    ul.classList.add('custom-context-menu');
    ul.style.top = `${e.clientY}px`;
    ul.style.left = `${e.clientX}px`;
    if (menus && menus.length > 0) {
      menus.forEach((menu, index) => {
        const li = document.createElement('li');
        li.classList.add('custom-context-menu-item');
        li.textContent = menu.key;
        li.onclick = (e) => {
          onSelect(index, menu.key);
        };
        ul.appendChild(li);
      });
    }
    const body = document.querySelector('body');
    body!.appendChild(ul);
    return ul;
  } else {
    return existEle as HTMLUListElement;
  }
}

const hiddenMenu = (ele: HTMLUListElement) => {
  const body = document.querySelector('body');
  body?.removeChild(ele);
};

export const useContextMenu = <T extends HTMLElement>({ ref, menus, onSelect }: UseContextMenuProps<T>) => {
  const contextMenuRef = useRef<HTMLUListElement | null>(null);

  const hidden = () => {
    contextMenuRef.current && hiddenMenu(contextMenuRef.current);
		contextMenuRef.current = null;
  };

  useEffect(() => {
    const ele = (ref as { current: T }).current;
    ele.oncontextmenu = (e) => {
      if (!contextMenuRef.current) {
        contextMenuRef.current = createMenu({ e, menus, onSelect });
      } else {
        hidden();
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', hidden);
    return () => {
      document.removeEventListener('click', hidden);
    };
  });
};
