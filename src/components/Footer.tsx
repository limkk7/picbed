import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 10px 100px;
  text-align: center;
  margin: 0 auto;
`;

const Footer: React.FC = () => {
  return <FooterWrapper>--我是底线--</FooterWrapper>;
};

export {Footer};
