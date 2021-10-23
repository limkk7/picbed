import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.svg';

const HeaderWrapper = styled.header`
  background-color: #2f3133;
  display: flex;
  align-items: center;
  padding: 10px 100px;
`;
const Logo = styled.img`
  height: 50px;
`;
const StyledLink = styled(NavLink)`
  color: #ffffff;
  margin-left: 30px;
  &.selected {
    border-bottom: 1px solid #ffffff;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo src={logo} />
      <nav>
        <StyledLink to="/" activeClassName="selected" exact>
          首页
        </StyledLink>
        <StyledLink to="/history" activeClassName="selected">
          上传历史
        </StyledLink>
        <StyledLink to="/about" activeClassName="selected">
          关于
        </StyledLink>
      </nav>
    </HeaderWrapper>
  );
};

export {Header};
