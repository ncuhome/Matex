import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { HerderConfig } from '/@/Model/ApiTest.model';
import styles from '/@/pages/ApiTest/Config/index.module.scss';
import { ReqConfigType, useConfigList } from '/@/store/ApiTest/config.store';
import MyTable from '/@cmp/Table';
import { useAtomValue } from 'jotai';

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
    cell: () => {}
  })
];

const ConfigTable = () => {
  const selConfig = useAtomValue(ReqConfigType);
  console.log(selConfig)
  const { configList: headerConfigs, updateConfig: updateHeaderConfig } = useConfigList(selConfig);
  console.log(headerConfigs);

  const table = useReactTable<HerderConfig>({
    data: headerConfigs as HerderConfig[],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const onChangeCell = (rowIndex, colIndex, value) => {
    const prop: 'key' | 'value' = colIndex === 0 ? 'key' : 'value';
    updateHeaderConfig(rowIndex, prop, value);
  };

  return (
    <div className={styles.tableCon}>
      <MyTable table={table} onChangeCell={onChangeCell} />
    </div>
  );
};

export default ConfigTable;
