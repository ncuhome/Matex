import React, { useEffect, useState } from 'react';
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/zh-cn';
import JSONInput from 'react-json-editor-ajrm';

interface JsonEditProps {
  onChange: (value: any) => void;
}

const JsonEdit: React.FC<JsonEditProps> = ({ onChange }) => {
  const [error, setError] = useState(false);
  const style: any = {
    contentBox: {
      // borderLeft: '1px #C4C4C4 solid'
    },
    container: {
      fontSize: 16,
      flex: 1,
      border: '1px solid #EDEFF4',
      borderTop: 'none',
      position: 'relative'
    },
    body: {
      fontSize: 16
    },
    warningBox: {
      background: '#FED531',
      color: '#000',
      position: 'absolute',
      transform: 'scale(0.5)',
      bottom: '-10px',
      left: '-100px',
      width: '600px'
    },
    errorMessage: {
      color: '#F73C3C',
      position: 'absolute',
      top: '0px',
      fontSize: '23px',
      ['--err--']: true
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

  useEffect(() => {
    const labelEle = document.getElementById('jsonEdit-labels') as HTMLDivElement;
    const children = labelEle.children;
    const errorLabel: HTMLElement[] = [];
    for (let i = 0; i < children.length; i++) {
      if ((children[i] as HTMLElement).style.color === 'red') {
        console.log(i);
        errorLabel?.push(children[i] as HTMLElement);
      }
    }
    if (errorLabel.length > 0) {
      for (let i = 0; i < errorLabel.length; i++) {
        errorLabel[i].innerText = '×';
      }
    } else {
      for (let i = 0; i < children.length; i++) {
        (children[i] as HTMLElement).innerText = String(i + 1);
      }
      console.log('没有错误');
    }
  }, [error]);

  const handleErr = (err: string) => {
    console.log(err);
    setError(true);
    return err;
  };

  const handleChange = (e: any) => {
    console.log(e);
    setError(false);
    const labelEle = document.getElementById('jsonEdit-labels') as HTMLDivElement;
    const children = labelEle.children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLElement).style.setProperty('--err--', 'false');
    }
  };

  return (
    <JSONInput
      id="jsonEdit"
      locale={locale}
      colors={colors}
      style={style}
      waitAfterKeyPress={500}
      height="200px"
      width={'100%'}
      onChange={handleChange}
      modifyErrorText={handleErr}
    />
  );
};

export default JsonEdit;
