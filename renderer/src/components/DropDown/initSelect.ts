import { DropDownProps } from '/@cmp/DropDown/index';

export const initSelect = (
  selectEle: HTMLSelectElement,
  { menus: menuOptions, id, onSelect }: Pick<DropDownProps, 'menus' | 'onSelect' | 'id'>
) => {
  let options = selectEle.options;
  let menu = document.createElement('div');
  let button = document.createElement('div');
  let list = document.createElement('ul');
  let arrow = document.createElement('em');
  button.prepend(arrow);
  menu.classList.add('select-menu');
  menu.setAttribute('id', id);
  button.classList.add('button');
  for (const option of options) {
    const li = document.createElement('li');
    li.innerText = option.text;
    list.append(li);
  }
  menu.style.setProperty('--t', selectEle.selectedIndex * -41 + 'px');
  selectEle.parentNode?.replaceChildren(menu, selectEle);
  menu.appendChild(selectEle);
  button.append(list);
  const cloneList = list.cloneNode(true) as HTMLUListElement;
  menu.appendChild(button);
  menu.appendChild(cloneList);

  menu.addEventListener('click', (e: MouseEvent) => {
    if (!menu.classList.contains('open')) {
      menu.classList.add('open');
    }
  });

  for (let index = 0; index < cloneList.children.length; index++) {
    const li = cloneList.children[index];
    li.addEventListener('click', () => {
      const activeEle = selectEle.options[selectEle.selectedIndex];
      menu.style.setProperty('--t', index * -41 + 'px');
      onSelect && onSelect(index, menuOptions[index]);
      activeEle.selected = false;
      options[index].selected = true;
      menu.classList.add(index > selectEle.selectedIndex ? 'tilt-down' : 'tilt-up');
      setTimeout(() => {
        menu.classList.remove('open', 'tilt-up', 'tilt-down');
      }, 500);
    });
  }

  document.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation();
    const { left, right, top, bottom } = menu.getBoundingClientRect();
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
      menu.classList.remove('open');
    }
  });
};
