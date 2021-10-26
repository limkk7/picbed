import {observer} from 'mobx-react';
// import {useRef} from 'react';
import {useStores} from 'stores';
import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const {Dragger} = Upload;
const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
  > h2 {
    margin: 20px 0;
    text-align: center;
  }
  > img {
    max-width: 300px;
  }
`;

const Uploader: React.FC = observer(() => {
  const {ImageStore, UserStore} = useStores();
  // const ref = useRef<HTMLInputElement>(null);
  const props = {
    showUploadList: false,
    beforeUpload: (file: File | null) => {
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！');
        return false;
      }

      if (file) {
        if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/gi.test(file.type)) {
          message.error('只能上传png/svg/jpg/gif格式的图片');
          return false;
        }
        if (file.size > 1024 * 1024) {
          message.error('图片最大1M');
          return false;
        }
        ImageStore.setFile(file);
        ImageStore.setFilename(file.name);
        ImageStore.upload()
          .then(() => {
            console.log('upload success');
          })
          .catch(e => {
            message.error('上传失败');
            console.log('upload error', e);
          });
      } else {
        message.warning('请上传文件');
      }

      return false;
    },
  };
  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽上传图片</p>
        <p className="ant-upload-hint">仅支持.png/.gif/.jpg/.svg格式的图片，图片最大1M </p>
      </Dragger>
      {ImageStore.serverFile ? (
        <Result>
          <h2>上传结果</h2>
          <dl>
            <dt>文件名</dt>
            <dd>{ImageStore.filename}</dd>
            <dt>链接</dt>
            <dd>
              <a target="_blank" rel="noreferrer" href={ImageStore.serverFile.url}>
                {ImageStore.serverFile.url}
              </a>
            </dd>
            {/* <dt>预览</dt>
            <dd>
              <img src={ImageStore.serverFile.url} alt="" />
            </dd> */}
            {/* <dt>更多尺寸</dt>
            <dd>
              <input placeholder="最大宽度" />
            </dd> */}
          </dl>
        </Result>
      ) : null}
    </>
  );
});

export {Uploader};
