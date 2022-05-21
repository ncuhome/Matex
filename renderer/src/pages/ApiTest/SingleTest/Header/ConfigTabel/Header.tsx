import React, { useEffect } from 'react';
import { apiTestHeadersAtom, useApiTestConfig } from '/@/store/apiTestStore';
import KVTable from '/@cmp/KVTable';

const HeadersTable = () => {
  const [headerList, updateHeaderKey, updateHeaderValue, addHeader, deleteHeader] =
    useApiTestConfig(apiTestHeadersAtom);

  useEffect(() => {
    const len = headerList.length;
    if (len) {
      if (headerList[len - 1].key && headerList[len - 1].value) {
        addHeader({ key: '', value: '' });
      }
    }
  }, [headerList]);

  return (
    <KVTable
      data={headerList}
      onChangeValue={updateHeaderValue}
      onChangeKey={updateHeaderKey}
      onDeleteLine={deleteHeader}
    />
  );
};
export default HeadersTable;
