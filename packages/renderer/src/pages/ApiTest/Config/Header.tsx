import React, { useRef } from 'react';
import styles from './index.module.scss';
import { useAtom } from 'jotai';
import { ReqConfigType, ReqUrl, SelReqType } from '/@/store/ApiTest/config.store';
import { InputContextMenus, ReqMethods } from '/@/Model/ApiTest.model';
import MyDropDown from '/@cmp/DropDown';
import { useContextMenu } from '/@/Hooks/useContextMenu';
import clsx from 'clsx';
import CloseIcon from '/@cmp/svg/CloseIcon';
import { emittery } from '/@/utils/instance';

const Header = () => {
  const [reqType, setReqType] = useAtom(SelReqType);
  const [reqUrl, setReqUrl] = useAtom(ReqUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [reqConfigType, setReqConfigType] = useAtom(ReqConfigType);

  const onSelect = (index, key) => {
    console.log(index, key);
  };

  useContextMenu<HTMLInputElement>({ ref: inputRef, menus: InputContextMenus, onSelect });

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReqUrl(e.target.value.trim());
  };

  const changeReqType = (_, sel) => {
    if (sel === 'get' && reqConfigType === 'body') {
      setReqConfigType('params');
    } else if ((sel === 'post' || sel === 'put') && reqConfigType === 'params') {
      setReqConfigType('body');
    }
    setReqType(sel);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      emittery.emit('keyDown:sendReq', '');
    }
  };

  return (
    <div className={styles.header}>
      <MyDropDown menus={ReqMethods} width={98} selectedKey={reqType} onSelectionChange={changeReqType} />
      <div className={styles.url}>
        <input
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className={styles.input}
          placeholder={'请输入测试接口地址'}
          value={reqUrl}
          onChange={changeUrl}
        />
        <div className={styles.clearIcon} onClick={() => setReqUrl('')}>
          <CloseIcon fill={'var(--light-text1)'} className={clsx(['svgIcon', 'hover'])} />
        </div>
      </div>
    </div>
  );
};

export default Header;
