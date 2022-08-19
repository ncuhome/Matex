import React, {useRef} from 'react';
import styles from './index.module.scss';
import { useAtom } from 'jotai';
import { ReqUrl, SelReq } from '/@/store/ApiTest/config.store';
import {InputContextMenus, ReqMethods} from '/@/Model/ApiTest.model';
import ClearIcon from '/@cmp/svg/ClearIcon';
import MyDropDown from '/@cmp/DropDown';
import {useContextMenu} from "/@/Hooks/useContextMenu";
import clsx from "clsx";

const Header = () => {
  const [selReq, setSelReq] = useAtom(SelReq);
  const [reqUrl, setReqUrl] = useAtom(ReqUrl);
  const inputRef = useRef<HTMLInputElement|null>(null)

  const onSelect = (index,key)=>{
    console.log(index,key)
  }

  useContextMenu<HTMLInputElement>({ref:inputRef,menus:InputContextMenus,onSelect})
  const changeSelReq = (index, sel: any) => setSelReq(sel);

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReqUrl(e.target.value.trim());
  };

  return (
    <div className={styles.header}>
      <MyDropDown menus={ReqMethods}  width={98} selectedKey={selReq} onSelectionChange={changeSelReq} />
      <div className={styles.url}>
        <input ref={inputRef} className={styles.input} placeholder={'请输入测试接口地址'} value={reqUrl} onChange={changeUrl} />
        <div className={styles.clearIcon} onClick={() => setReqUrl('')}>
          <ClearIcon fill={'var(--light-text1)'} className={clsx(['svgIcon','hover'])}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
