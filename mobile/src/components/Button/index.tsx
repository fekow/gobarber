import React, { FC } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Container, Text } from './styles';

interface ButtomProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

const Button: FC<ButtomProps> = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

export default Button;
