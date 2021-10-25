import AV, {User} from 'leancloud-storage';
AV.init({
  appId: 'Ad46YKbNw2plrBhsEIeGHoqP-gzGzoHsz',
  appKey: 'vXDbKIsxXI3B3q9DNL6dS5uk',
  serverURL: 'https://uqbaasqm.lc-cn-n1-shared.com',
});

console.log('models: start....');

const AuthModels = {
  signUp(username: string, password: string) {
    const user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(
        signInUser => {
          console.log('sign up success...');
          resolve(signInUser);
        },
        error => {
          console.log('sign up error......');
          reject(error);
        }
      );
    });
  },
  signIn(username: string, password: string) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        signInUser => {
          console.log('sign in success...');
          resolve(signInUser);
        },
        error => {
          console.log('sign up error......');
          reject(error);
        }
      );
    });
  },
  logOut: () => {
    User.logOut();
  },
  getCurrentUser: () => {
    return User.current();
  },
};

const UploadModels = {
  add(file: File | null, filename: string) {
    const item = new AV.Object('Image');
    const avFile = new AV.File(filename, file);
    item.set('filename', filename);
    item.set('owner', AV.User.current());
    item.set('url', avFile);
    return item.save().then(
      serverFile => {
        console.log('保存成功');
        return Promise.resolve(serverFile);
      },
      e => {
        console.log('保存失败');
        return Promise.reject(e);
      }
    );
  },
  find({page = 0, limit = 10}): Promise<AV.Queriable[]> {
    const query = new AV.Query('Image');
    query.include('owner');
    query.limit(limit);
    query.skip(page * limit);
    query.descending('createdAt');
    query.equalTo('owner', AV.User.current());
    return new Promise((resolve, reject) => {
      query
        .find()
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  },
};

export {AuthModels, UploadModels};
