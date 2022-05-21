import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Icon, Input, Menu, Modal } from 'semantic-ui-react';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyRawAtom,
  apiTestBodyUrlencodedAtom
} from '/@/store/apiTestStore';
import { useAtom } from 'jotai';
import { BodyRawType } from '/@/type/apiTest';
import { RawOptions } from '/@/model/apiTest.model';
import dropDownStyle from '/@/style/apitest/index.module.scss';
import clsx from 'clsx';
import Swal from 'sweetalert2';

const useAction = () => {
  const urlencodedList = useAtomValue(apiTestBodyUrlencodedAtom);
  const activeBody = useAtomValue(apiTestActiveBodyTypeAtom);
  const [activeRawType, setActiveRawType] = useAtom(apiTestBodyRawAtom);
  const [open, setOpen] = useState(false);

  const rawOptions = RawOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChangeRawType = (e: React.SyntheticEvent, { value }: any) => {
    setActiveRawType(value as BodyRawType);
  };

  const urlencodedStr = useCallback(() => {
    let str = '';
    const len = urlencodedList.length - 1;
    urlencodedList.slice(0, len).forEach((item, index) => {
      str += `${item.key}=${item.value}&`;
    });
    return str.endsWith('&') ? str.slice(0, -1) : str;
  }, [urlencodedList]);

  const handlePreview = (e) => {
    Swal.fire({
      html: '<div id="2"></div>',
      confirmButtonText: '关闭'
    });
    document.getElementById('2')!.innerText = urlencodedStr();
  };

  const renderPreview = () => {
    return (
      <div onClick={handlePreview}>
        <Icon name="eye" className={styles.preview} />
      </div>
      // <Modal
      //   open={open}
      //   dimmer={'blurring'}
      //   onClose={() => setOpen(false)}
      //   onOpen={() => setOpen(true)}
      //   trigger={}
      // >
      //   <Modal.Header>x-www-form-urlencoded</Modal.Header>
      //   <Modal.Content>
      //     <Modal.Description>
      //       <Input fluid value={urlencodedStr()} readOnly />
      //     </Modal.Description>
      //   </Modal.Content>
      //   <Modal.Actions>
      //     <Button onClick={() => setOpen(false)}>OK</Button>
      //   </Modal.Actions>
      // </Modal>
    );
  };

  switch (activeBody) {
    case 'raw':
      return (
        <Menu.Item style={{ marginLeft: -5 }}>
          <Button.Group className={dropDownStyle.dropDown} size={'small'}>
            <Button className={dropDownStyle.btn}>{activeRawType}</Button>
            <Dropdown
              className={clsx([dropDownStyle.select, 'button', 'icon'])}
              onChange={handleChangeRawType}
              options={rawOptions}
              trigger={<></>}
            />
          </Button.Group>
        </Menu.Item>
      );
    case 'urlencoded':
      return <></>;
    // return <Menu.Item style={{ marginLeft: -5 }}>{renderPreview()}</Menu.Item>;
    default:
      return <></>;
  }
};

export default useAction;
