import React, { useMemo } from 'react';
import { Button, Dropdown, Label, Menu } from 'semantic-ui-react';
import { TabItems } from '../../../../type/collection';
import { useUrlConfig } from '../../../../zustand/store/collection.store';
import { useNavigate } from 'react-router-dom';
import { MethodsOptions } from '../../../../Model/collection.model';

const Tabs = () => {
  const { activeTab, setActiveTab } = useUrlConfig((state) => state);
  const navigate = useNavigate();

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/collect/${item.toLowerCase()}`;
    navigate(path);
  };
  const countryOptions = MethodsOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  return useMemo(() => {
    return (
      <>
        <Label ribbon as="a" color={'orange'}>
          选项
        </Label>
        <Menu color={'teal'} secondary fluid>
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
          {activeTab === 'Body' && (
            <Menu.Menu position="right" style={{ marginRight: 15 }}>
              <Menu.Item>
                <Button.Group color={'blue'}>
                  <Button>数据类型</Button>
                  <Dropdown className="button icon" options={countryOptions} trigger={<></>} />
                </Button.Group>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </>
    );
  }, [activeTab]);
};

export default Tabs;
