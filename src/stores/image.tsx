import {message} from 'antd';
// import {Object} from 'leancloud-storage';
import {makeAutoObservable} from 'mobx';
import {UploadModels} from 'models';

type UploadFile = {
  fileId: string | undefined;
  filename: string;
  url: string;
};

type Store = {
  filename: string;
  file: File | null;
  isUploading: boolean;
  serverFile: null | UploadFile;
  setFilename: (x: string) => void;
  setFile: (x: File | null) => void;
  upload: () => Promise<UploadFile>;
  // find: () => void;
};

const store: Store = {
  filename: '',
  file: null,
  isUploading: false,
  serverFile: null,

  setFilename(newFilename) {
    this.filename = newFilename;
  },
  setFile(newFile) {
    this.file = newFile;
  },
  upload() {
    this.isUploading = true;
    this.serverFile = null;
    return UploadModels.add(this.file, this.filename)
      .then(
        serverFile => {
          console.log(serverFile);
          this.serverFile = {
            fileId: serverFile.id,
            url: `//upload.versionlin7.xyz/${serverFile.id}`,
            filename: serverFile.get('filename'),
          };
          return this.serverFile;
        },
        e => {
          message.error('上传失败');
          return Promise.reject(e);
        }
      )
      .finally(() => (this.isUploading = false));
  },
};

const ImageStore = makeAutoObservable(store);
export {ImageStore};
