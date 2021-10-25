import {makeAutoObservable} from 'mobx';
import AV from 'leancloud-storage';
import {UploadModels} from 'models';
import {message} from 'antd';

type UploadFile = {
  id: number;
  fileId: string | undefined;
  filename: string;
  url: string;
};

type History = {
  list: UploadFile[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  limit: number;
  append: (Y: AV.Queriable[]) => void;
  find: () => void;
  reset: () => void;
};

const historyStore: History = {
  list: [],
  isLoading: false,
  hasMore: true,
  page: 0,
  limit: 6,

  append(newList) {
    this.list = this.list.concat(
      newList.map((x, idx) => ({
        id: idx,
        fileId: x.id,
        filename: x.get('filename'),
        url: `https://upload.verionlin7.com/${x.id}`,
      }))
    );
  },

  find() {
    this.isLoading = true;
    UploadModels.find({page: this.page, limit: this.limit})
      .then(newList => {
        console.log(newList);
        this.append(newList);
        this.page++;
        if (newList.length < this.limit) {
          this.hasMore = false;
        }
      })
      .catch(error => {
        message.error('加载数据失败');
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  reset() {
    this.list = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
  },
};

const HistoryStore = makeAutoObservable(historyStore);
export {HistoryStore};
