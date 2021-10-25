import {message} from 'antd';
import {makeAutoObservable, runInAction} from 'mobx';
import {AuthModels} from 'models';
import {ImageStore} from './image';
import {UserStore} from './user';

// class Store {
//   isSignIn = false;
//   isLoading = false;
//   values = {
//     username: '',
//     password: '123',
//   };
//   constructor() {
//     makeAutoObservable(this);
//   }

//   setIsSignIn(isSignIn: boolean) {
//     this.isSignIn = isSignIn;
//   }
//   setUsername(username: string) {
//     this.values.username = username;
//   }
//   setPassword(passWord: string) {
//     this.values.password = passWord;
//   }
//   signIn() {
//     console.log('登录中...');
//     this.isLoading = true;
//     setTimeout(() => {
//       console.log('登录成功');
//       this.isSignIn = true;
//       this.isLoading = false;
//     }, 1000);
//   }
//   register() {
//     console.log('注册中...');
//     this.isLoading = true;
//     setTimeout(() => {
//       console.log('注册成功');
//       runInAction(() => {
//         this.isSignIn = false;
//         this.isLoading = false;
//       });
//     }, 1000);
//   }
//   logout() {
//     console.log('已注销');
//   }
// }
// const AuthStore = new Store();

const store = {
  isSignIn: false,
  isLoading: false,
  values: {
    username: '',
    password: '',
  },

  setIsSignIn(isSignIn: boolean) {
    this.isSignIn = isSignIn;
  },
  setUsername(username: string) {
    this.values.username = username;
  },
  setPassword(passWord: string) {
    this.values.password = passWord;
  },
  signIn() {
    console.log('authStore: 登录中...');
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      AuthModels.signIn(this.values.username, this.values.password)
        .then(user => {
          console.log('authStore: 登录成功', user);
          runInAction(() => {
            UserStore.setCurrentUser();
            console.log('authStore:', UserStore.currentUser);
            console.log('authStore: sign in runInAction');
            this.isSignIn = true;
            this.isLoading = false;
          });
          resolve(user);
        })
        .catch(err => {
          message.error(`登录失败: ${err.message}`);
          reject(err);
        });
    });
  },
  signUp() {
    console.log('authStore: 注册中...');
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      AuthModels.signUp(this.values.username, this.values.password).then(
        user => {
          console.log('authStore: 注册成功', user);
          runInAction(() => {
            UserStore.setCurrentUser();
            console.log('authStore:', UserStore.currentUser);
            console.log('authStore: sign up runInAction');
            this.isSignIn = false;
            this.isLoading = false;
          });
          resolve(user);
        },
        err => {
          message.error(`注册失败: ${err.message}`);
          reject(err);
        }
      );
    });
  },
  logOut() {
    AuthModels.logOut();
    UserStore.setCurrentUser();
    ImageStore.serverFile = null;
  },
};
const AuthStore = makeAutoObservable(store);
export {AuthStore};
