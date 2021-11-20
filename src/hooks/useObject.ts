import { useState } from 'react';

const useObject = <T>(init?: T): [Partial<T>, (data: Partial<T>) => void] => {
  const [state, setState] = useState<Partial<T> | undefined>(init);

  const setObjectState = (data: Partial<T>) => {
    for (const key in data) {
      setState((state) => {
        return { ...state, ...data } as Partial<T>;
      });
    }
  };

  return [state ?? {}, setObjectState];
};

export default useObject;
