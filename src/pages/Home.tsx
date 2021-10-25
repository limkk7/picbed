import {Uploader} from 'components/Uploader';
import {observer} from 'mobx-react';
import {useStores} from 'stores';
import styled from 'styled-components';

const Home: React.FC = observer(() => {
  const {UserStore} = useStores();
  const Tips = styled.div`
    background-color: orange;
    padding: 10px;
    margin: 30px 0;
    color: #fff;
    border-radius: 4px;
  `;
  return (
    <>
      {UserStore.currentUser ? (
        <>
          <h1>{UserStore.currentUser.getUsername()}</h1>
          <Uploader />
        </>
      ) : (
        <Tips>请先登录再上传！！！</Tips>
      )}
    </>
  );
});

export default Home;
