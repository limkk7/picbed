import {createContext, useContext} from 'react';
import {AuthStore} from './auth';
import {UserStore} from './user';

const defaultValue = {
  AuthStore,
  UserStore,
};

const Context = createContext(defaultValue);

const useStores = () => useContext(Context);

export {useStores};
