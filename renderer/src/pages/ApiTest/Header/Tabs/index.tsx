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
import dropDownStyle from '/@/style/apitest/index.module.scss';
import clsx from 'clsx';

const activeStyle = {
  background: 'var(--active-bg)',
  color: 'var(--text-color)'
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

  const showBodyType = activeTab === 'Body' && (method === 'Post' || method === 'Put');

  return useMemo(() => {
    return (
      <>
        {/*<span className={styles.title}>请求选项</span>*/}
        {/*<Label size={'small'} as="a" color={'orange'} style={{ marginTop: 16, marginRight: 10 }}>*/}
        {/*  */}
        {/*</Label>*/}
        <Menu size={'small'} secondary style={{ marginLeft: -10 }}>
          {TabsItem.map((item) => {
            const active = activeTab === item;
            return (
              <Fragment key={item}>
                <Menu.Item
                  key={item}
                  name={item}
                  style={active ? activeStyle : { color: 'var(--text-color)' }}
                  active={active}
                  onClick={() => handleItemClick(item)}
                />
              </Fragment>
            );
          })}
          {showBodyType && (
            <Menu.Menu position="right" style={{ marginRight: 15 }}>
              <Menu.Item>
                <Button.Group className={dropDownStyle.dropDown} size={'small'}>
                  <Button className={dropDownStyle.btn}>{activeBody}</Button>
                  <Dropdown
                    className={clsx(['button', 'icon', dropDownStyle.select])}
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
