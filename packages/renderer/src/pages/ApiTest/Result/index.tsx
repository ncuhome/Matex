import React,{Suspense} from 'react';
import styles from './index.module.scss';
import {useEditorAction} from "/@cmp/MonacoEditor/editorAction";
import Loading from "/@cmp/Loading";

const MonacoEditor = React.lazy(()=>import('/@/components/MonacoEditor'))

const ReqResult = () => {
	const { setValue, changeLanguage } = useEditorAction({ id: 'reqResult', readOnly: false });

	const onCreated = (editor) => {
    console.log(editor.getValue());
		if (editor){
			setValue({
				language:'json',
				editor,
				value:''
			})
		}
  };

  return (
    <div className={styles.result}>
			<Suspense fallback={<Loading/>}>
				<MonacoEditor
						onChange={(changes, value) => {
							console.log(value);
						}}
						onCreated={onCreated}
						// onDestroyed={onDestroyed}
						shadow={true}
						readOnly={false}
						// border={'#E0E1E2 1px solid'}
						language={'json'}
						defaultVal={'123'}
						height={220}
						width={'100%'}
				/>
			</Suspense>
    </div>
  );
};

export default ReqResult;
