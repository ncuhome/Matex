import React from 'react';
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/zh-cn';
import JSONInput from 'react-json-editor-ajrm';

interface JsonEditProps {
  onChange: (value: any) => void;
}

const JsonEdit: React.FC<JsonEditProps> = ({ onChange }) => {
  const style: any = {
    contentBox: {
      borderLeft: '1px #C4C4C4 solid'
    },
    container: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      border: '1px #C4C4C4 solid',
      borderTop: 'none',
      fontSize: 16
    },
    body: {
      fontSize: 16
    },
    warningBox: {
      background: '#F8B408',
      color: '#FFF'
    },
    errorMessage: {
      color: '#FFF'
    },
    labels: {
      background: '#D2E6FD',
      textAlign: 'center',
      borderRadius: '50%'
    }
  };
  const colors: any = {
    default: '#3537ED',
    background: '#FFF',
    keys: '#F95F26',
    colon: '#1D9CFC',
    number: '#1D9CFC',
    string: '#3CDD6C',
    keys_whiteSpace: '#3537ED'
  };

  return (
    <JSONInput
      id="a_unique_id"
      locale={locale}
      colors={colors}
      style={style}
      waitAfterKeyPress={500}
      height="200px"
      width={'100%'}
      onChange={onChange}
    />
  );
};

export default JsonEdit;
