import React, { useEffect, useRef } from 'react';
import { createMenu } from '/@/hooks/useContextMenu';

interface DropDownItem {
  label?: string;
  value: string;
}

export interface DropDownOptions {
  options: DropDownItem[];
}

type OnselectItem = (index: number, text: string) => void;

interface DropDownProps {
  options: DropDownOptions;
  onSelect: OnselectItem;
}

export function createDropdown<T>(ops: DropDownOptions, onSelect: OnselectItem): HTMLUListElement {
  const ul = document.createElement('ul');
  ul.classList.add('custom-context-menu');
  ul.style.display = 'none';
  const { options } = ops;
  if (options && options.length > 0) {
    options.forEach((menu, index) => {
      const li = document.createElement('li');
      li.textContent = menu.value;
      li.onclick = (e) => {
        onSelect(index, menu.value);
      };
      ul.appendChild(li);
    });
  }
  const body = document.querySelector('body');
  body!.appendChild(ul);
  return ul;
}

export function showMenu(e: MouseEvent, instance: HTMLUListElement) {
  console.log(instance.style);
  instance.style.top = `${e.clientY}px`;
  instance.style.left = `${e.clientX}px`;
  instance.style.display = 'block';
}

export function hideMenu(e: MouseEvent, instance: HTMLUListElement) {
  instance.style.display = 'none';
}

export const useDropdown = ({ options, onSelect }: DropDownProps) => {
  const menuRef = useRef<HTMLUListElement>();

  const hidden = (e: MouseEvent) => {
    console.log(menuRef.current!.style.display);
    hideMenu(e, menuRef.current!);
  };

  useEffect(() => {
    menuRef.current = createDropdown(options, onSelect);
    document.addEventListener('click', hidden);
    return () => {
      document.removeEventListener('click', hidden);
    };
  }, []);

  const show = (e: MouseEvent) => {
    showMenu(e, menuRef.current!);
  };
  return {
    showDropdown: show
  };
};
