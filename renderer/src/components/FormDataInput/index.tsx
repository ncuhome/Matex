import React from 'react';
import styles from './index.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import type { ApiTestFormData } from '/@/store/apiTestStore/type';

interface FormDataInputProps {
  index: number;
  data: ApiTestFormData;
  onClick: (index: number) => void;
  deleteFile: (index: number) => void;
  onChange: (index: number, data: ApiTestFormData['value']) => void;
  updateStrData: (index: number, data: string | File) => void;
}

const FormDataInput: React.FC<FormDataInputProps> = ({
  index,
  data,
  onClick,
  deleteFile,
  onChange,
  updateStrData
}) => {
  const [isFile, setFile] = React.useState(false);

  const renderFileInput = (index: number, data: ApiTestFormData) => {
    return (
      <div className={styles.fileInput}>
        <div className={styles.fileText} onClick={() => onClick(index)}>
          {(data.value as File).name || '选择文件'}
          {data.value && (
            <div className={styles.delete} onClick={() => deleteFile(index)}>
              <Icon style={{ marginLeft: 10, marginTop: 2 }} name={'delete'} />
            </div>
          )}
        </div>
        <input
          className={styles.file}
          type={'file'}
          id={`file-${index}`}
          onChange={(e) => onChange(index, e.target?.files?.[0] as File)}
        />
      </div>
    );
  };

  return (
    <div className={styles.bodyCell}>
      {isFile ? (
        renderFileInput(index, data)
      ) : (
        <input
          className={styles.input}
          value={data.value as string}
          type={'text'}
          onChange={(e) => {
            updateStrData(index, e.target.value);
          }}
        />
      )}
      <Button.Group basic size="mini">
        <Button icon="eye" disabled={!isFile} />
        <Button icon onClick={() => setFile(!isFile)} disabled={!!data.value}>
          <Icon name={isFile ? 'file' : 'file outline'} style={{ color: isFile ? '#2CB5AD' : '#A5A6A5' }} />
        </Button>
      </Button.Group>
    </div>
  );
};

export default FormDataInput;
