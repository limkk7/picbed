import {User} from 'leancloud-storage';
import {makeAutoObservable} from 'mobx';
import {AuthModels} from 'models';

type Store = {
  currentUser: User | null;
  setCurrentUser: () => void;
};

const store: Store = {
  currentUser: AuthModels.getCurrentUser(),
  setCurrentUser() {
    this.currentUser = AuthModels.getCurrentUser();
  },
};

const UserStore = makeAutoObservable(store);
export {UserStore};
