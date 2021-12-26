import React, { Fragment, useMemo } from 'react';
import { Button } from 'semantic-ui-react';
import { TabsItem } from '../../../../Model/collection.model';
import { TabItems } from '../../../../type/collection';
import { useUrlConfig } from '../../../../zustand/store/collection.store';
import { useNavigate } from 'react-router-dom';

const Tabs = () => {
  const { activeTab, setActiveTab } = useUrlConfig((state) => state);
  const navigate = useNavigate();

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/collect/${item.toLowerCase()}`;
    console.log(path);
    navigate(path);
  };

  return useMemo(() => {
    return (
      <Button.Group vertical>
        {TabsItem.map((item) => {
          return (
            <Fragment key={item}>
              <Button basic={!(activeTab === item)} onClick={() => handleItemClick(item)}>
                {item}
              </Button>
            </Fragment>
          );
        })}
      </Button.Group>
    );
  }, [activeTab]);
};

export default Tabs;
