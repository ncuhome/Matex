import { useApiTestFormData } from '/@/store/apiTestStore';
import { Button, Icon, Table } from 'semantic-ui-react';
import React, { Fragment, useEffect } from 'react';
import styles from './index.module.scss';

export const BodyFormData = () => {
  const { formData, updateFormDataKey, updateFormDataValue, addFormData, deleteFormData } =
    useApiTestFormData();

  const [isFile, setFile] = React.useState(false);

  useEffect(() => {
    const len = formData.length;
    if (len === 0 || (formData[len - 1].key.trim() && formData[len - 1].value)) {
      addFormData('', '');
    }
  }, [formData]);

  const handleFileInputClick = (index: number) => {
    !formData[index].value && document.getElementById(`file-${index}`)?.click();
  };

  const onFileInputChange = (index: number, file: File) => {
    console.log(file);
    file && updateFormDataValue(index, file);
  };

  const deleteFile = (index: number) => {
    (document.getElementById(`file-${index}`) as HTMLInputElement)!.value = '';
    deleteFormData(index);
  };

  const renderFileInput = (index: number) => {
    return (
      <div className={styles.fileInput}>
        <div className={styles.fileText} onClick={() => handleFileInputClick(index)}>
          {(formData[index].value as File).name || '选择文件'}
          {formData[index].value && (
            <div className={styles.delete} onClick={() => deleteFile(index)}>
              <Icon style={{ marginLeft: 10, marginTop: 2 }} name={'delete'} />
            </div>
          )}
        </div>
        <input
          className={styles.file}
          type={'file'}
          id={`file-${index}`}
          onChange={(e) => onFileInputChange(index, e.target?.files?.[0] as File)}
        />
      </div>
    );
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
                  <div className={styles.bodyCell}>
                    {isFile ? (
                      renderFileInput(index)
                    ) : (
                      <input
                        className={styles.input}
                        value={item.value as string}
                        type={'text'}
                        onChange={(e) => {
                          updateFormDataValue(index, e.target.value);
                        }}
                      />
                    )}
                    <Button.Group basic size="mini">
                      <Button icon="eye" disabled={!isFile} />
                      <Button icon onClick={() => setFile(!isFile)} disabled={!!item.value}>
                        <Icon
                          name={isFile ? 'file' : 'file outline'}
                          style={{ color: isFile ? '#2CB5AD' : '#A5A6A5' }}
                        />
                      </Button>
                    </Button.Group>
                  </div>
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
