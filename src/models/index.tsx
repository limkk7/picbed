import AV, {User} from 'leancloud-storage';
import config from 'config';

AV.init({
  ...config.leancloud,
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
  add(file: File, filename: string, username: string | undefined) {
    const item = new AV.Object('Image');
    const avFile = new AV.File(filename, file);
    item.set('filename', filename);
    item.set('owner', AV.User.current());
    item.set('url', avFile);
    return new Promise((resolve, reject) => {
      item.save().then(
        serverFile => {
          console.log('保存成功');
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const str = reader.result;
            if (typeof str === 'string') {
              const baseStr = str?.slice(str.indexOf(',') + 1, str.length);
              console.log(baseStr);
              uploadGithub(serverFile.id, baseStr, username);
              resolve(serverFile);
            }
          };
        },
        e => {
          console.log('保存失败');
          reject(e);
        }
      );
    });
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
function uploadGithub(name: string | undefined, dataImage: string, username: string | undefined) {
  const data = JSON.stringify({
    message: `${username}：${name}`,
    content: dataImage,
  });
  fetch(`https://solitary-union-ab10.limkk.workers.dev/upload-image?fileId=${name}`, {
    body: data,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
}

export {AuthModels, UploadModels};
