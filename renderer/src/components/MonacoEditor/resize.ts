export const resizeAble = () => {
  const box = document.querySelector('#monacoEditor') as HTMLDivElement;
  let isDown = false;
  let xResize = '';
  let mes: { w: any; x: any; h: any; y: any; l: any; r: any; t: any; b: any } | null = null;
  box.onmousedown = function (ev) {
    const pos = getPos(box);

    isDown = true;

    mes = {
      x: ev.clientX,
      y: ev.clientY,
      w: box.offsetWidth,
      h: box.offsetHeight,
      t: pos.top,
      l: pos.left,
      r: pos.right,
      b: pos.bottom
    };
  };

  document.onmouseup = function () {
    document.onmousemove = null;
    isDown = false;
  };

  box.onmousemove = function (ev) {
    ev.preventDefault();

    // 鼠标未按下
    if (!isDown) {
      xResize = '';

      if (ev.clientY < getPos(box).top + 10) {
        xResize = 'n';
      }

      if (ev.clientY > getPos(box).bottom - 10) {
        xResize = 's';
      }

      if (ev.clientX < getPos(box).left + 10) {
        xResize += 'w';
      }

      if (ev.clientX > getPos(box).right - 10) {
        xResize += 'e';
      }

      if (xResize) {
        box.style.cursor = xResize + '-resize';
      } else {
        box.style.cursor = 'auto';
      }

      // 鼠标已经按下，改变 .box 的大小和位置。
    } else {
      document.onmousemove = function (ev) {
        let h, t;

        // // 向右拖动
        // if (xResize.indexOf('e') !== -1) {
        //   w = mes?.w + (ev.clientX - mes?.x);
        //
        //   if (w < 100) {
        //     w = 100;
        //   }
        //
        //   // box.style.width = w + 'px';
        // }

        // 向下拖动
        if (xResize.indexOf('s') !== -1) {
          h = mes?.h + (ev.clientY - mes?.y);

          if (h < 100) {
            h = 100;
          }
          if (h < 290) {
            box.style.height = h + 'px';
          }
        }

        // // 向左拖动
        // if (xResize.indexOf('w') !== -1) {
        //   w = mes?.w + (mes?.x - ev.clientX);
        //   l = mes?.l - (mes?.x - ev.clientX);
        //
        //   if (w < 100) {
        //     w = 100;
        //     l = mes?.r - 100;
        //   }
        //
        //   // box.style.width = w + 'px';
        //   // box.style.left = l + 'px';
        // }

        // // 向上拖动
        // if (xResize.indexOf('n') !== -1) {
        //   h = mes?.h + (mes?.y - ev.clientY);
        //   t = mes?.t - (mes?.y - ev.clientY);
        //
        //   if (h < 100) {
        //     h = 100;
        //     t = mes?.b - 100;
        //   }
        //   box.style.height = h + 'px';
        //   box.style.top = t + 'px';
        //   console.log(h);
        // }
      };
    }
  };

  function getPos(target: HTMLDivElement) {
    return target.getBoundingClientRect();
  }
};
