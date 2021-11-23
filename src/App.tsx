import React from 'react';
import { RouterAuth } from './router';
import Loading from './components/Loading';

function App() {
  const rootEle = document.getElementById('root');
  console.log(rootEle);
  console.log(rootEle?.classList);
  // @ts-ignore
  const isMain = rootEle.classList > 0;
  console.log(new Date().getTime(), isMain);
  return isMain ? <RouterAuth /> : <Loading />;
}

export default App;
