import React from 'react';
import renderParamsTable from './renderParams';
import renderHeadersTable from './renderHeader';
import { useUrlConfig } from '../../../../zustand/store/collection.store';
import renderBodyTable from './renderBody';

const ConfigTable = () => {
  const activeTab = useUrlConfig((state) => state.activeTab);

  switch (activeTab) {
    case 'Params':
      return renderParamsTable();
    case 'Body':
      return renderBodyTable();
    case 'Headers':
      return renderHeadersTable();
    case 'Auth':
      return renderParamsTable();
    default:
      return renderParamsTable();
  }
};

export default ConfigTable;
