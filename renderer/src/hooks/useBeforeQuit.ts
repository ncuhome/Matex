import { useEffect } from 'react';

export const useBeforeQuit = () => {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);
};
