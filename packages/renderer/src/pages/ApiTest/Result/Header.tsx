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
import { ResDataTypeAtom, ResDisplayTypeAtom, ResFormatTypeAtom } from '/@/store/ApiTest/config.store';
import SpeedDial from '/@cmp/SpeedDial';
import CopyIcon from '/@cmp/svg/CopyIcon';
import SearchIcon from '/@cmp/svg/SearchIcon';
import SaveIcon from '/@cmp/svg/SaveIcon';
import {StatusCard} from "/@/pages/ApiTest/Result/StatusCard";

const icons = [
  <CopyIcon fill={'var(--light-text1)'} />,
  <SearchIcon fill={'var(--light-text1)'} />,
  <SaveIcon fill={'var(--light-text1)'} />
];

const ResultHeader = () => {
  const [resDataType, setResDataType] = useAtom(ResDataTypeAtom);
  const [resDisplayType, setResDisplayType] = useAtom(ResDisplayTypeAtom);
  const [resFormatType, setResFormatType] = useAtom(ResFormatTypeAtom);
  return (
    <>
      <div style={{ marginRight: 10 }}>
        <MyDropDown
          fontSize={13}
          width={100}
          menus={ResDataTypeList}
          selectedKey={resDataType}
          onSelectionChange={(_, sel) => setResDataType(sel as ResDataType)}
        />
      </div>
      <div style={{ marginRight: 10 }}>
        <Tabs
          width={5.4}
          menus={ResDisplayTypeList}
          selectedKey={resDisplayType}
          onSelect={(_, sel) => setResDisplayType(sel)}
        />
      </div>
      <div style={{ border: '1px solid var(--dark-color1)', borderRadius: 7 }}>
        <MyDropDown
          fontSize={13}
          width={102}
          large
          menus={ResFormatTypeList}
          selectedKey={resFormatType}
          onSelectionChange={(_, sel) => setResFormatType(sel as ResFormatType)}
        />
      </div>
      <div style={{ marginLeft: 15 }}>
        <SpeedDial icons={icons} />
      </div>
      <div style={{ marginLeft: 45 }}>
        <StatusCard/>
      </div>
    </>
  );
};

export default ResultHeader;
