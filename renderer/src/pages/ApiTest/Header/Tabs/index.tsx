import React, { Fragment, useMemo } from 'react';
import { Button, Dropdown, Label, Menu } from 'semantic-ui-react';
import { BodyItemType, BodyRawType, TabItems } from '/@/type/apiTest';
import { useNavigate } from 'react-router-dom';
import { BodyTypes, RawOptions, TabsItem } from '/@/model/apiTest.model';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyRawAtom,
  apiTestMethodAtom,
  apiTestTabAtom
} from '/@/store/apiTestStore';
import { useAtom } from 'jotai';

const Tabs = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const [activeTab, setActiveTab] = useAtom(apiTestTabAtom);
  const [activeBody, setActiveBody] = useAtom(apiTestActiveBodyTypeAtom);
  const [activeRawType, setActiveRawType] = useAtom(apiTestBodyRawAtom);
  const navigate = useNavigate();

  const handleItemClick = (item: TabItems) => {
    setActiveTab(item);
    const path = `/apiTest/${item.toLowerCase()}`;
    navigate(path);
  };

  const bodyTypeOptions = BodyTypes.map((item) => {
    return { key: item, value: item, text: item };
  });

  const rawOptions = RawOptions.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChangeBodyType = (e: React.SyntheticEvent, { value }: any) => {
    setActiveBody(value as BodyItemType);
  };
  const handleChangeRawType = (e: React.SyntheticEvent, { value }: any) => {
    setActiveRawType(value as BodyRawType);
  };
  const style = {
    background: '#2CB5AD',
    color: '#FFF'
  };

  return useMemo(() => {
    return (
      <>
        <Label ribbon as="a" color={'orange'}>
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
              {activeBody === 'raw' && (
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
              )}
            </Menu.Menu>
          )}
        </Menu>
      </>
    );
  }, [activeTab, activeBody, method]);
};

export default Tabs;
