import { useApiTestFormData } from '/@/store/apiTestStore';
import { Button, Icon, Table } from 'semantic-ui-react';
import React, { Fragment, useEffect } from 'react';
import styles from './index.module.scss';
import FormDataInput from '/@cmp/FormDataInput';

export const BodyFormData = () => {
  const { formData, updateFormDataKey, updateFormDataValue, addFormData, deleteFormData } =
    useApiTestFormData();

  useEffect(() => {
    const len = formData.length;
    if (len === 0 || (formData[len - 1].key.trim() && formData[len - 1].value)) {
      addFormData('', '');
    }
  }, [formData]);

  const handleFileInputClick = (index: number) => {
    !formData[index].value && document.getElementById(`file-${index}`)?.click();
  };

  const onFileInputChange = (index: number, file: File | string) => {
    console.log(file);
    file && updateFormDataValue(index, file);
  };

  const deleteFile = (index: number) => {
    (document.getElementById(`file-${index}`) as HTMLInputElement)!.value = '';
    deleteFormData(index);
  };

  return (
    <Table celled compact size={'small'}>
      <Table.Header>
        <Table.Row style={{ background: '#FFF' }}>
          <Table.HeaderCell width={3}>键</Table.HeaderCell>
          <Table.HeaderCell>值</Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign={'center'}>
            操作
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {formData.map((item, index) => {
          return (
            <Fragment key={item.index}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      updateFormDataKey(index, e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <FormDataInput
                    onClick={handleFileInputClick}
                    onChange={onFileInputChange}
                    data={item}
                    index={index}
                    deleteFile={deleteFile}
                    updateStrData={updateFormDataValue}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact onClick={() => deleteFormData(item.index)}>
                      <Icon name="delete" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};
