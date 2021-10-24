import AV, {User} from 'leancloud-storage';

AV.init({
  appId: 'Ad46YKbNw2plrBhsEIeGHoqP-gzGzoHsz',
  appKey: 'vXDbKIsxXI3B3q9DNL6dS5uk',
  serverURL: 'https://ad46ykbn.lc-cn-n1-shared.com',
});

console.log('models: start....');

const AuthModels = {
  signUp(username: string, password: string) {
    const user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(
        loginedUser => {
          console.log('sign up success...');
          resolve(loginedUser);
        },
        error => {
          console.log('sign up error......');
          reject(JSON.stringify(error));
        }
      );
    });
  },
  signIn(username: string, password: string) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        loginedUser => {
          console.log('sign in success...');
          resolve(loginedUser);
        },
        error => {
          console.log('sign up error......');
          reject(JSON.stringify(error));
        }
      );
    });
  },
  // signIn: User.logIn,
  logOut: () => {
    User.logOut();
  },
  getCurrentUser: () => {
    return User.current();
  },
};

export {AuthModels};
