import {observable, action} from 'mobx';

class AuthStore {
  @observable isLogin: boolean = false;
  @observable isLoading = false;
  @observable values = {
    username: 'haha',
    password: '123',
  };

  @action setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }
  @action setUsername(username: string) {
    this.values.username = username;
  }
  @action setPassword(passWord: string) {
    this.values.password = passWord;
  }
  @action login() {
    console.log('登录中...');
    this.isLoading = true;
    setTimeout(() => {
      console.log('登录成功');
      this.isLogin = true;
      this.isLoading = false;
    }, 1000);
  }
  @action regiser() {
    console.log('注册中...');
    this.isLoading = true;
    setTimeout(() => {
      console.log('注册成功');
      this.isLogin = false;
      this.isLoading = false;
    }, 1000);
  }
  @action logout() {
    console.log('已注销');
  }
}

export {AuthStore};
