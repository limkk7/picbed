import {observer} from 'mobx-react';
import {useStores} from 'stores';

const Login: React.FC = observer(() => {
  const {AuthStore} = useStores();
  return <>Login: {AuthStore.values.username}</>;
});

export default Login;
