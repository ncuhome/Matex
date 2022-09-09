import React from 'react';
import MyDropDown from '/@cmp/DropDown';
import {
  ResDataType,
  ResDataTypeList,
  ResDisplayTypeList,
  ResFormatType,
  ResFormatTypeList
} from '/@/Model/ApiTest.model';
import Tabs from '/@cmp/Tabs';
import { useAtom } from 'jotai';
import { ResDataTypeAtom, ResDisplayTypeAtom, ResFormatTypeAtom } from '/@/store/ApiTest/result.store';
import SpeedDial from '/@cmp/SpeedDial';
import CopyIcon from '/@cmp/svg/CopyIcon';
import SearchIcon from '/@cmp/svg/SearchIcon';
import SaveIcon from '/@cmp/svg/SaveIcon';
import { StatusCard } from '/@/pages/ApiTest/Result/Header/StatusCard';
import { emittery } from '/@/utils/instance';
import styles from './index.module.scss';
import clsx from 'clsx';

const icons = [
  <CopyIcon fill={'var(--light-text1)'} />,
  <SearchIcon fill={'var(--light-text1)'} />,
  <SaveIcon fill={'var(--light-text1)'} />
];

const ResultHeader = () => {
  const [resDataType, setResDataType] = useAtom(ResDataTypeAtom);
  const [resDisplayType, setResDisplayType] = useAtom(ResDisplayTypeAtom);
  const [resFormatType, setResFormatType] = useAtom(ResFormatTypeAtom);

  const changeDataType = (type: ResDataType) => {
    if (resDisplayType !== 'Pretty') {
      setResDisplayType('Pretty');
    }
    setResDataType(type);
  };

  const changeFormat = (type: ResFormatType) => {
    setResFormatType(type);
    emittery.emit('formatType:changeLanguage', type);
  };

  return (
    <>
      <div style={{ marginRight: 10 }}>
        <MyDropDown
          fontSize={13}
          width={100}
          menus={ResDataTypeList}
          selectedKey={resDataType}
          onSelectionChange={(_, sel) => changeDataType(sel as ResDataType)}
        />
      </div>
      <div className={clsx([styles.displayFormat, resDataType !== '响应数据' && styles.hidden])}>
        <div style={{ marginRight: 10 }}>
          <Tabs
            width={6}
            menus={ResDisplayTypeList}
            selectedKey={resDisplayType}
            onSelect={(_, sel) => setResDisplayType(sel)}
          />
        </div>
        <div style={{ border: '1px solid var(--dark-color1)', borderRadius: 7 }}>
          <MyDropDown
            textTransform={'none'}
            fontSize={13}
            width={102}
            large
            menus={ResFormatTypeList}
            selectedKey={resFormatType}
            onSelectionChange={(_, sel) => changeFormat(sel as ResFormatType)}
          />
        </div>
      </div>
      <div style={{ marginLeft: 15, marginRight: 10 }}>
        <SpeedDial icons={icons} />
      </div>
      <div>
        <StatusCard />
      </div>
    </>
  );
};

export default ResultHeader;
