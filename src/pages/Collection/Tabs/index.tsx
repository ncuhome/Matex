import React, { Fragment, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { TabsItem } from '../../../Model/collection.model';

const Tabs = () => {
  const [activeItem, setActiveItem] = useState('Params');

  const handleItemClick = (item: string) => {
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
