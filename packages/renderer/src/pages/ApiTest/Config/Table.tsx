import {createColumnHelper, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import React from 'react';
import { HerderConfig } from '/@/Model/ApiTest.model';
import styles from '/@/pages/ApiTest/Config/index.module.scss';
import {useAtomValue} from "jotai";
import {HeaderConfigs} from "/@/store/ApiTest/config.store";
import MyTable from "/@cmp/Table";
import AmplifyIcon from "/@cmp/svg/AmplifyIcon";
import DeleteIcon from "/@cmp/svg/DeleteIcon";

const columnHelper = createColumnHelper<HerderConfig>();

const columns = [
  columnHelper.accessor('key', {
    cell: (info) => info.getValue(),
    header: () => <span>键</span>
  }),
  columnHelper.accessor('value', {
    cell: (info) => info.getValue(),
    header: () => <span>值</span>
  }),
  columnHelper.accessor('opt', {
    header: () => <span>操作</span>,
    cell: () => (
        <div className={styles.opt}>
          <AmplifyIcon fill={'var(--light-text1)'}/>
          <div style={{width:40}}></div>
          <DeleteIcon fill={'var(--light-text1)'} transform={'scale(1.3)'}></DeleteIcon>
        </div>
    )
  })
];

const ConfigTable = () => {

  const headerConfigs = useAtomValue(HeaderConfigs);

  const table = useReactTable<HerderConfig>({
    data:headerConfigs,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={styles.tableCon}>
      <MyTable table={table}/>
    </div>
  );
};

export default ConfigTable;
