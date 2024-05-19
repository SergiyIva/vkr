import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarLogo = () => {
  return (
    <Wrapper to={'/admin'}>
      <Logo src={'/logo.jpg'} alt={'Logo'} />
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Logo = styled.img`
    width: 100%;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 0.5rem;
    object-fit: cover;
`;
export default SidebarLogo;
