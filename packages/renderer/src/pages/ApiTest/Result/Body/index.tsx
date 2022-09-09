import React from 'react';
import { useAtomValue } from 'jotai';
import { ResDisplayTypeAtom } from '/@/store/ApiTest/result.store';
import PrettyView from '/@/pages/ApiTest/Result/Body/Pretty';
import Preview from '/@/pages/ApiTest/Result/Body/Preview';
import Visualize from '/@/pages/ApiTest/Result/Body/Visualize';

const ResultBodyView = () => {
  const resDisplayType = useAtomValue(ResDisplayTypeAtom);
  if (resDisplayType === 'Visual') {
    return <Visualize />;
  } else if (resDisplayType === 'Preview') {
    return <Preview />;
  } else {
    return <PrettyView />;
  }
};

export default ResultBodyView;
