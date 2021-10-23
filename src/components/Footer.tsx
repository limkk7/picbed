import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 10px 100px;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <p>Footer</p>
    </FooterWrapper>
  );
};

export {Footer};
