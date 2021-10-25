import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../stores';
import InfiniteScroll from 'react-infinite-scroll-component';
import {List, Spin} from 'antd';
import styled from 'styled-components';

const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const Component = observer(() => {
  const {HistoryStore} = useStores();

  const loadMore = () => {
    HistoryStore.find();
  };

  useEffect(() => {
    console.log('进入组件');
    HistoryStore.find();
    return () => {
      console.log('卸载');
      HistoryStore.reset();
    };
  }, [HistoryStore]);

  return (
    <div id="">
      <InfiniteScroll
        dataLength={HistoryStore.list.length}
        loader={
          <div style={{margin: '0 auto', width: '50px'}}>
            {HistoryStore.isLoading && HistoryStore.hasMore && <Spin tip="加载中" />}
          </div>
        }
        next={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <div>
                <Img src={item.url} />
              </div>
              {/* <div>
                <h4>{item.fileId}</h4>
              </div> */}
              <div>
                <h4>{item.filename}</h4>
              </div>
              <div>
                <a target="_blank" rel="noreferrer" href={item.url}>
                  {item.url}
                </a>
              </div>
            </List.Item>
          )}
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div style={{margin: '0 auto', width: '50px'}}>
              <Spin tip="加载中" />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
});

export default Component;
