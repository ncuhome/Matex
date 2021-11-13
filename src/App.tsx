import React, { useState } from 'react';
import styles from './app.module.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React11!</p>
        <p>
          <button type="button" className={styles.button} onClick={() => setCount((count) => count + 1)}>
            count is1: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx1111</code> and save to test HMR updates.
        </p>
      </header>
    </div>
  );
}

export default App;
