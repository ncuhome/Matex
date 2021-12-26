import React, { Fragment, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { TabsItem } from '../../../../Model/collection.model';
import { myEmitter } from '../../../../utils/EventEmiter';
import { TabItems } from '../../../../type/collection';

const Tabs = () => {
  const [activeItem, setActiveItem] = useState<TabItems>('Params');

  const handleItemClick = (item: TabItems) => {
    myEmitter.emit<TabItems>('collection-config', item);
    setActiveItem(item);
  };

  return (
    <Button.Group vertical>
      {TabsItem.map((item) => {
        return (
          <Fragment key={item}>
            <Button basic={!(activeItem === item)} onClick={() => handleItemClick(item)}>
              {item}
            </Button>
          </Fragment>
        );
      })}
    </Button.Group>
  );
};

export default Tabs;
