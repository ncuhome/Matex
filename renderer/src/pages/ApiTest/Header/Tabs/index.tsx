import React, { Fragment, useMemo } from 'react';
import { Button, Dropdown, Label, Menu } from 'semantic-ui-react';
import { BodyItemType, TabItems } from '/@/type/apiTest';
import { useNavigate } from 'react-router-dom';
import { BodyTypes, TabsItem } from '/@/model/apiTest.model';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyUrlencodedAtom,
  apiTestMethodAtom,
  apiTestTabAtom
} from '/@/store/apiTestStore';
import { useAtom } from 'jotai';
import useAction from '/@/pages/ApiTest/Header/Tabs/useAction';

const style = {
  background: '#2CB5AD',
  color: '#FFF'
};

const Tabs = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const urlencodedList = useAtomValue(apiTestBodyUrlencodedAtom);
  const [activeTab, setActiveTab] = useAtom(apiTestTabAtom);
  const [activeBody, setActiveBody] = useAtom(apiTestActiveBodyTypeAtom);
  const navigate = useNavigate();
  const Action = useAction();

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/apiTest/${item.toLowerCase()}`;
    navigate(path);
  };

  const bodyTypeOptions = BodyTypes.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChangeBodyType = (e: React.SyntheticEvent, { value }: any) => {
    setActiveBody(value as BodyItemType);
  };

  return useMemo(() => {
    return (
      <>
        <Label ribbon as="a" color={'orange'} style={{ marginTop: 5 }}>
          请求选项
        </Label>
        <Menu size={'small'} secondary style={{ marginLeft: -10 }}>
          {TabsItem.map((item) => {
            const active = activeTab === item;
            return (
              <Fragment key={item}>
                <Menu.Item
                  key={item}
                  name={item}
                  style={active ? style : {}}
                  active={active}
                  onClick={() => handleItemClick(item)}
                />
              </Fragment>
            );
          })}
          {activeTab === 'Body' && method === 'Post' && (
            <Menu.Menu position="right" style={{ marginRight: 15 }}>
              <Menu.Item>
                <Button.Group size={'small'}>
                  <Button>{activeBody}</Button>
                  <Dropdown
                    className="button icon"
                    onChange={handleChangeBodyType}
                    options={bodyTypeOptions}
                    trigger={<></>}
                  />
                </Button.Group>
              </Menu.Item>
              {Action}
            </Menu.Menu>
          )}
        </Menu>
      </>
    );
  }, [activeTab, activeBody, method, urlencodedList, Action]);
};

export default Tabs;
