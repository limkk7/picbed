import {observer} from 'mobx-react';
import {useStores} from 'stores';

const Home: React.FC = observer(() => {
  const {UserStore} = useStores();

  return <h1>{UserStore.currentUser?.attributes.username}</h1>;
});

export default Home;
