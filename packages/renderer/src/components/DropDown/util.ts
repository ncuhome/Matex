import { DropDownProps } from '/@cmp/DropDown/index';

interface CreatDropDownProps extends DropDownProps {
  event: any;
  large?:boolean;
}

export const creatDropDown = ({ event, menus,large, selectedKey,onSelectionChange }: CreatDropDownProps) => {
  let DropDownEle: HTMLDivElement | null;
  const body = document.querySelector('body');
  DropDownEle = document.querySelector('#dropDown');
  if (DropDownEle) {
    hidden(event, DropDownEle);
  } else {
    const tar = event.target as HTMLDivElement;
    const pos = tar.getBoundingClientRect();
    DropDownEle = document.createElement('div');
    DropDownEle.id = 'dropDown';
    DropDownEle.classList.add('dropDownBox');
    large&&DropDownEle.classList.add('large');
    const top = pos.y + pos.height + 10;
    const left = pos.x;
    DropDownEle.style.top = `${top}px`;
    DropDownEle.style.left = `${left}px`;

    const ul = document.createElement('ul');
    ul.classList.add('dropDownList');
    menus.forEach((item,index) => {
      const li = document.createElement('li');
      li.classList.add('dropDownItem');
      li.classList.add('dropDownItem-'+(index+1));
      li.textContent = item;
      li.onclick=()=>{
        onSelectionChange?.(index,item);
      }
      if (item === selectedKey) {
        li.classList.add('activeItem');
      }
      ul.appendChild(li);
    });
    DropDownEle.appendChild(ul);
    body?.appendChild(DropDownEle);
  }
  return DropDownEle;
};

export const hidden = (e: any, dropDownEle: HTMLDivElement) => {
  const tar = e.target as HTMLElement;

  if (tar.id !== 'dropDown') {
    const body = document.querySelector('body');
    dropDownEle.style.animationName = 'scaleDown';
    dropDownEle.addEventListener('animationend', () => {
      body?.removeChild(dropDownEle as any);
    });
  }
};
