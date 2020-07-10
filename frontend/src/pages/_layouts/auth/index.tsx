import React from 'react';
import { Wrapper, Content } from './styles';
import PropTypes from 'prop-types';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
