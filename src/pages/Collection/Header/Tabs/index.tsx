import React, { Fragment, useMemo } from 'react';
import { Button } from 'semantic-ui-react';
import { TabsItem } from '../../../../Model/collection.model';
import { TabItems } from '../../../../type/collection';
import { useUrlConfig } from '../../../../zustand/store/collection.store';

const Tabs = () => {
  const { activeTab, setActiveTab } = useUrlConfig((state) => state);
  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
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
