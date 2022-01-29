import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Header, Icon, Menu, Modal, Popup } from 'semantic-ui-react';
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
      console.log(item, index);
      str += `${item.key}=${item.value}&`;
    });
    console.log(str);
    return str.endsWith('&') ? str.slice(0, -1) : str;
  }, [urlencodedList]);

  const renderPreview = () => {
    console.log(open);
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Icon name="eye" className={styles.preview} />}
      >
        <Modal.Header>x-www-form-urlencoded</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <span style={{ color: '#2CB5AD' }}>{urlencodedStr()}</span>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  };

  switch (activeBody) {
    case 'raw':
      return (
        <Menu.Item style={{ marginLeft: -5 }}>
          <Button.Group size={'small'}>
            <Button>{activeRawType}</Button>
            <Dropdown
              className="button icon"
              onChange={handleChangeRawType}
              options={rawOptions}
              trigger={<></>}
            />
          </Button.Group>
        </Menu.Item>
      );
    case 'urlencoded':
      return <Menu.Item style={{ marginLeft: -5 }}>{renderPreview()}</Menu.Item>;
    default:
      return <></>;
  }
};

export default useAction;
