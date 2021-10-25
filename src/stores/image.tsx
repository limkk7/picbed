import {message} from 'antd';
import {makeAutoObservable} from 'mobx';
import {UploadModels} from 'models';
import config from 'config';

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
  upload: () => Promise<UploadFile> | Promise<void>;
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
    if (!this.file) return Promise.resolve();
    this.isUploading = true;
    this.serverFile = null;
    return UploadModels.add(this.file, this.filename)
      .then(
        (serverFile: any) => {
          console.log(serverFile);
          this.serverFile = {
            fileId: serverFile.id,
            url: `${config.imageUrl}${serverFile.id}.png`,
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
