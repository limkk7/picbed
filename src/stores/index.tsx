import {createContext, useContext} from 'react';
import {AuthStore} from './auth';

const context = createContext({
  // AuthStore: new AuthStore(),
  AuthStore: AuthStore(),
});

export const useStores = () => useContext(context);
