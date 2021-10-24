import {makeAutoObservable, runInAction} from 'mobx';

// class Store {
//   isLogin = false;
//   isLoading = false;
//   values = {
//     username: 'haha',
//     password: '123',
//   };
//   constructor() {
//     makeAutoObservable(this);
//   }

//   setIsLogin(isLogin: boolean) {
//     this.isLogin = isLogin;
//   }
//   setUsername(username: string) {
//     this.values.username = username;
//   }
//   setPassword(passWord: string) {
//     this.values.password = passWord;
//   }
//   login() {
//     console.log('登录中...');
//     this.isLoading = true;
//     setTimeout(() => {
//       console.log('登录成功');
//       this.isLogin = true;
//       this.isLoading = false;
//     }, 1000);
//   }
//   regiser() {
//     console.log('注册中...');
//     this.isLoading = true;
//     setTimeout(() => {
//       console.log('注册成功');
//       runInAction(() => {
//         this.isLogin = false;
//         this.isLoading = false;
//       });
//     }, 1000);
//   }
//   logout() {
//     console.log('已注销');
//   }
// }
// const AuthStore = Store;

const store = {
  isLogin: false,
  isLoading: false,
  values: {
    username: 'haha',
    password: '123',
  },

  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  },
  setUsername(username: string) {
    this.values.username = username;
  },
  setPassword(passWord: string) {
    this.values.password = passWord;
  },
  login() {
    console.log('登录中...');
    this.isLoading = true;
    setTimeout(() => {
      console.log('登录成功');
      this.isLogin = true;
      this.isLoading = false;
    }, 1000);
  },
  async regiser() {
    console.log('注册中...');
    this.isLoading = true;
    await new Promise(() => {
      setTimeout(() => {
        console.log('注册成功');
        runInAction(() => {
          this.isLogin = false;
          this.isLoading = false;
        });
      }, 1000);
    });
  },
  logout() {
    console.log('已注销');
  },
};
const AuthStore = () => makeAutoObservable(store);
export {AuthStore};
