import React, {Suspense} from "react";
import {useAtom} from "jotai";
import {RawConfigValue, RawTypeValue} from "/@/store/ApiTest/config.store";
import {useEditorAction} from "/@cmp/MonacoEditor/editorAction";
import {Editor} from "/@cmp/MonacoEditor/type";
import {LanguageMapper} from "/@cmp/MonacoEditor/utils";
import CircleDotLoading from "/@cmp/Loading/CircleDotLoading";

const MonacoEditor = React.lazy(()=>import('/@/components/MonacoEditor'))

const ResultBodyEditor = () => {
	const [rawConfigValue, setRawConfigValue] = useAtom(RawConfigValue);
	const [rawTypeValue, setRawTypeValue] = useAtom(RawTypeValue);

	const { setValue, changeLanguage } = useEditorAction({ id: 'reqRawConfig', readOnly: false });
	const editorRef = React.useRef<Editor | null>(null);

	const language = LanguageMapper.get(rawTypeValue) ?? 'text/plain';

	const onCreated = (editor) => {
		editorRef.current = editor;
		if (editor) {
			setValue({
				language: language,
				editor,
				value: rawConfigValue
			});
		}
	};

	const onChangeRawType = (changes, value) => {
		setRawTypeValue(value);
		editorRef.current && changeLanguage(editorRef.current, LanguageMapper.get(value) ?? 'text/plain');
	};

	return (
			<Suspense fallback={<CircleDotLoading />}>
				<MonacoEditor
						onChange={(changes, value) => {
							setRawConfigValue(value ?? '');
						}}
						onCreated={onCreated}
						onDestroyed={() => (editorRef.current = null)}
						shadow={true}
						border={'1px solid var(--dark-color2)'}
						readOnly={false}
						language={language}
						defaultVal={''}
						height={250}
						width={'100%'}
				/>
			</Suspense>
	)
}

export default ResultBodyEditor;
