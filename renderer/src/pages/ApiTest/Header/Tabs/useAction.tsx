import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Icon, Input, Menu, Modal } from 'semantic-ui-react';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyFormsIsFileAtom,
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
  const [isFile, setIsFile] = useAtom(apiTestBodyFormsIsFileAtom);
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
        dimmer={'blurring'}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Icon name="eye" className={styles.preview} />}
      >
        <Modal.Header>x-www-form-urlencoded</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Input fluid value={urlencodedStr()} readOnly />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  };

  const renderFormDataAction = () => {
    return (
      <>
        <Menu.Item>
          <Button.Group basic size="mini" style={{ marginLeft: -15 }}>
            <Button icon>
              <Icon name={'eye'} />
            </Button>
            <Button icon onClick={() => setIsFile(false)}>
              <Icon name={'pencil alternate'} style={{ color: !isFile ? '#2CB5AD' : '#C1C1C1' }} />
            </Button>
            <Button icon onClick={() => setIsFile(true)}>
              <Icon name={'file'} style={{ color: isFile ? '#2CB5AD' : '#C1C1C1' }} />
            </Button>
          </Button.Group>
        </Menu.Item>
        {isFile && (
          <Menu.Item>
            <Input placeholder="key" size={'small'} style={{ width: 100, marginLeft: -20 }} />
          </Menu.Item>
        )}
      </>
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
    case 'form-data':
      return renderFormDataAction();
    default:
      return <></>;
  }
};

export default useAction;
