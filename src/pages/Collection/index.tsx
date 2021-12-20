import React, { useState } from 'react';
import styles from './index.module.scss';
import { myEmitter } from '../../utils/EventEmiter';
import { Window } from '../../type';
import MonacoEditor from '../../components/MonacoEditor';
import CollectSide from './Side';
import { ListBox } from 'primereact/listbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Collection = () => {
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  const [city, setCity] = useState('');

  const handleClick = async () => {
    const res = await Window.Mixos.get('http://localhost:9000/test');
    myEmitter.emit<string>('monacoEditor-collect', JSON.stringify(res));
  };

  const [products, setProducts] = useState([]);

  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <div className={styles.url}></div>
        <div className={styles.config}>
          <div className={styles.leftBtns}>
            <ListBox optionLabel="name" value={city} options={cities} onChange={(e) => setCity(e.value)} />
          </div>
          <div className={styles.table}>
            <DataTable value={[]} scrollable scrollHeight="400px">
              <Column field="name" header="Name" style={{ minWidth: '200px' }}></Column>
              <Column field="country.name" header="Country" style={{ minWidth: '200px' }}></Column>
              <Column
                field="representative.name"
                header="Representative"
                style={{ minWidth: '200px' }}
              ></Column>
              <Column field="status" header="Status" style={{ minWidth: '200px' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.editor}>
          <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={250} width={'100%'} />
        </div>
      </div>
      <div className={styles.side}>
        <CollectSide />
      </div>
    </div>
  );
};

export default Collection;
