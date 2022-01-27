import React, { useMemo } from 'react';
import { Button, Dropdown, Label, Menu } from 'semantic-ui-react';
import { BodyItemType, TabItems } from '/@/type/apiTest';
import { useBodyList } from '/@/zustand/store/apiTest.store';
import { useNavigate } from 'react-router-dom';
import { BodyTypes } from '/@/model/apiTest.model';
import { useAtomValue } from 'jotai/utils';
import { apiTestMethodAtom, apiTestTabAtom } from '/@/store/apiTestStore';
import { useAtom } from 'jotai';

const Tabs = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const [activeTab, setActiveTab] = useAtom(apiTestTabAtom);
  const navigate = useNavigate();
  const { type, setType } = useBodyList((state) => state);

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/apiTest/${item.toLowerCase()}`;
    navigate(path);
  };
  const options = BodyTypes.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChange = (e: React.SyntheticEvent, { value }: any) => {
    setType(value as BodyItemType);
  };

  return useMemo(() => {
    return (
      <>
        <Label ribbon as="a" color={'orange'}>
          请求选项
        </Label>
        <Menu color={'teal'} secondary>
          <Menu.Item
            name="Params"
            active={activeTab === 'Params'}
            onClick={() => handleItemClick('Params')}
          />
          <Menu.Item
            name="Headers"
            active={activeTab === 'Headers'}
            onClick={() => handleItemClick('Headers')}
          />
          <Menu.Item name={'Body'} active={activeTab === 'Body'} onClick={() => handleItemClick('Body')} />
          {activeTab === 'Body' && method === 'Post' && (
            <Menu.Menu position="right" style={{ marginRight: 15 }}>
              <Menu.Item>
                <Button.Group color={'teal'} size={'small'}>
                  <Button>{type}</Button>
                  <Dropdown
                    className="button icon"
                    onChange={handleChange}
                    options={options}
                    trigger={<></>}
                  />
                </Button.Group>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </>
    );
  }, [activeTab, type, method]);
};

export default Tabs;
