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
import useAction from '/@/pages/ApiTest/SingleTest/Header/Tabs/useAction';
import dropDownStyle from '/@/style/apitest/index.module.scss';
import clsx from 'clsx';
import styles from './index.module.scss';
import DropDown from '/@cmp/DropDown';

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

  const handleTabChange = (index: number, item: any) => {
    setActiveTab(item);
    console.log(item);
    const path = `/api/single/${item.toLowerCase()}`;
    navigate(path);
  };

  const onChangeBodyType = (index: number, item: any) => {};

  const bodyTypeOptions = BodyTypes.map((item) => {
    return { key: item, value: item, text: item };
  });

  const handleChangeBodyType = (e: React.SyntheticEvent, { value }: any) => {
    setActiveBody(value as BodyItemType);
  };

  const showBodyType = activeTab === 'Body' && (method === 'Post' || method === 'Put');

  return (
    <>
      <DropDown id={'tabMenu'} menus={TabsItem} onSelect={handleTabChange} />
      {showBodyType && <DropDown id={'bodyMenu'} menus={BodyTypes} onSelect={onChangeBodyType} />}
      {/*<Menu vertical size={'small'} secondary style={{ marginLeft: -10 }}>*/}
      {/*  {showBodyType && (*/}
      {/*    <Menu.Menu position="right" style={{ marginRight: 15 }}>*/}
      {/*      <Menu.Item>*/}
      {/*        <Button.Group className={dropDownStyle.dropDown} size={'small'}>*/}
      {/*          <Button className={dropDownStyle.btn}>{activeBody}</Button>*/}
      {/*          <Dropdown*/}
      {/*            className={clsx(['button', 'icon', dropDownStyle.select])}*/}
      {/*            onChange={handleChangeBodyType}*/}
      {/*            options={bodyTypeOptions}*/}
      {/*            trigger={<></>}*/}
      {/*          />*/}
      {/*        </Button.Group>*/}
      {/*      </Menu.Item>*/}
      {/*      {Action}*/}
      {/*    </Menu.Menu>*/}
      {/*  )}*/}
      {/*</Menu>*/}
    </>
  );
};

export default Tabs;
