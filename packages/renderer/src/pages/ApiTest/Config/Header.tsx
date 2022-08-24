import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { useAtom, useAtomValue } from 'jotai';
import { ReqConfigType, ReqUrl, SelReqType } from '/@/store/ApiTest/config.store';
import { InputContextMenus, ReqMethods } from '/@/Model/ApiTest.model';
import ClearIcon from '/@cmp/svg/ClearIcon';
import MyDropDown from '/@cmp/DropDown';
import { useContextMenu } from '/@/Hooks/useContextMenu';
import clsx from 'clsx';

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

  return (
    <div className={styles.header}>
      <MyDropDown menus={ReqMethods} width={98} selectedKey={reqType} onSelectionChange={changeReqType} />
      <div className={styles.url}>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder={'请输入测试接口地址'}
          value={reqUrl}
          onChange={changeUrl}
        />
        <div className={styles.clearIcon} onClick={() => setReqUrl('')}>
          <ClearIcon fill={'var(--light-text1)'} className={clsx(['svgIcon', 'hover'])} />
        </div>
      </div>
    </div>
  );
};

export default Header;
