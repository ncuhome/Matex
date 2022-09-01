import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import type { KVConfig } from '/@/Model/ApiTest.model';
import Checkbox from '/@cmp/Checkbox';

const columnHelper = createColumnHelper<KVConfig>();
export const columns = [
  columnHelper.accessor('selected', {
    header: (info) => {},
    cell: (info) => <Checkbox checked={info.getValue()} />
  }),
  columnHelper.accessor('key', {
    // cell: (info) => info.getValue(),
    header: () => <span>键</span>
  }),
  columnHelper.accessor('value', {
    // cell: (info) => info.getValue(),
    header: () => <span>值</span>
  }),
  columnHelper.accessor('opt', {
    header: () => <span>操作</span>
    // cell: () => {}
  })
];
