import React, { useMemo } from 'react';
import { Label, Menu } from 'semantic-ui-react';
import { TabItems } from '../../../../type/collection';
import { useUrlConfig } from '../../../../zustand/store/collection.store';
import { useNavigate } from 'react-router-dom';

const Tabs = () => {
  const { activeTab, setActiveTab } = useUrlConfig((state) => state);
  const navigate = useNavigate();

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/collect/${item.toLowerCase()}`;
    navigate(path);
  };

  return useMemo(() => {
    return (
      <>
        <Label ribbon as="a" color={'orange'}>
          选项
        </Label>
        <Menu color={'teal'} secondary style={{ marginBottom: 10 }}>
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
          <Menu.Item name="Body" active={activeTab === 'Body'} onClick={() => handleItemClick('Body')} />
        </Menu>
      </>
    );
  }, [activeTab]);
};

export default Tabs;
