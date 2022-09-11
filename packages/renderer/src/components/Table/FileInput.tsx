import React from 'react';
import FileIcon from '/@cmp/svg/FileIcon';
import styles from './index.module.scss';
import CloseIcon from '/@cmp/svg/CloseIcon';
import clsx from 'clsx';
import { KVConfig } from '/@/Model/ApiTest.model';
import { ChangeCellFunc, valueType } from '/@cmp/Table/index';

interface FileInput {
  rowIndex: number;
  valueKey: valueType;
  value: KVConfig['value'];
  onChange?: ChangeCellFunc;
}

const FileInput: React.FC<FileInput> = ({ rowIndex, valueKey, value = '', onChange = () => {} }) => {
  const [file, setFile] = React.useState(false);

  const handleChange = (e) => {
    if (file) {
      onChange(rowIndex, valueKey, e.target.files?.[0] || '');
    } else {
      onChange(rowIndex, valueKey, e.target.value);
    }
  };

  const handleFileInput = () => {
    const inputEle = document.querySelector(`#fileInput${rowIndex}`);
    inputEle && (inputEle as HTMLInputElement).click();
  };

  const onDeleteFile = () => {
    const inputEle = document.querySelector(`#fileInput${rowIndex}`);
    if (inputEle) {
      // @ts-ignore
      (inputEle as HTMLInputElement).value = null;
    }
    onChange(rowIndex, valueKey, '');
  };

  return (
    <div className={styles.fileInput}>
      {file && (
        <div className={styles.fileContent}>
          <div onClick={handleFileInput} className={styles.selectBtn}>
            {(value as File).name || '选择文件'}
          </div>
          {value && (value as File).name && (
            <CloseIcon onClick={onDeleteFile} fill={'#EB5298'} className={clsx(['svgIcon', 'hover'])} />
          )}
        </div>
      )}
      <input
        id={'fileInput' + rowIndex}
        className={styles.input}
        type={file ? 'file' : 'text'}
        onChange={handleChange}
      />
      <div onClick={() => setFile(!file)} className={styles.icon}>
        <FileIcon
          fill={!file ? 'var(--dark-color2)' : 'var(--light-text1)'}
          className={clsx(['svgIcon', 'hover'])}
        />
      </div>
    </div>
  );
};

export default FileInput;
