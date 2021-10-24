import {observer} from 'mobx-react';
import {NavLink} from 'react-router-dom';
import {useStores} from 'stores';
import styled from 'styled-components';
import logo from './logo.svg';

const HeaderWrapper = styled.header`
  background-color: #2f3133;
  display: flex;
  align-items: center;
  padding: 10px 100px;
  justify-content: space-between;
  > div {
    color: #ffffff;
    > button,
    a {
      margin-left: 10px;
      border: 1px solid #ffffff;
      padding: 10px;
      cursor: pointer;
      background-color: transparent;
    }
  }
  @media (max-width: 700px) {
    padding: 10px 30px;
  }
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  > a {
    color: #ffffff;
    margin-left: 30px;
    &.selected {
      border-bottom: 1px solid #ffffff;
    }
  }
`;
const Logo = styled.img`
  height: 50px;
`;

const Header: React.FC = observer(() => {
  const {UserStore, AuthStore} = useStores();
  const handleLogOut = () => {
    AuthStore.logOut();
  };
  console.log(UserStore.currentUser?.attributes);
  return (
    <HeaderWrapper>
      <Nav>
        <Logo src={logo} />
        <NavLink to="/" activeClassName="selected" exact>
          首页
        </NavLink>
        <NavLink to="/history" activeClassName="selected">
          上传历史
        </NavLink>
        <NavLink to="/about" activeClassName="selected">
          关于
        </NavLink>
      </Nav>
      {UserStore.currentUser ? (
        <div>
          <span>{UserStore.currentUser.attributes.username}</span>
          <button onClick={handleLogOut}>注销</button>
        </div>
      ) : (
        <div>
          <NavLink to="/signIn">登录</NavLink>
          <NavLink to="/signUp">注册</NavLink>
        </div>
      )}
    </HeaderWrapper>
  );
});

export {Header};
