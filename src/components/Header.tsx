import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.svg';

const HeaderWrapper = styled.header`
  background-color: #2f3133;
  display: flex;
  align-items: center;
  padding: 10px 100px;
  justify-content: space-between;
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
const ButtonWrapper = styled.div`
  a {
    margin-left: 10px;
    border: 1px solid #ffffff;
    padding: 10px;
    > button {
      cursor: pointer;
      background-color: transparent;
      border: 0;
      color: #ffffff;
    }
  }
`;

const Header: React.FC = () => {
  const [isSignIn, setSignUp] = useState(false);
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
      <ButtonWrapper>
        {isSignIn ? (
          <>
            haha1
            <NavLink to="/">
              <button>注销</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signin">
              <button>登录</button>
            </NavLink>
            <NavLink to="/signup">
              <button>注册</button>
            </NavLink>
          </>
        )}
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

export {Header};
