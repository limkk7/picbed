import {createContext, useContext} from 'react';
import {AuthStore} from './auth';
import {HistoryStore} from './history';
import {ImageStore} from './image';
import {UserStore} from './user';

const defaultValue = {
  AuthStore,
  UserStore,
  ImageStore,
  HistoryStore,
};

const Context = createContext(defaultValue);

const useStores = () => useContext(Context);

export {useStores};
