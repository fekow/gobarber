import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputProps, TextInput } from 'react-native';
// import PropTypes from 'prop-types';
import { Container, TInput } from './styles';

interface InputProps extends TextInputProps {
  // name: string;
  icon?: string;
}

// interface InputValueReference {
//   value: string;
// }

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { icon, style, ...rest },
  ref,
) => {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,0.5)" />}
      <TInput
        placeholderTextColor="rgba(255,255,255,0.8)"
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

// Input.propTypes = {
//   icon: PropTypes.string,
//   style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// };

// Input.defaultProps = {
//   icon: null,
//   style: {},
// };

export default forwardRef(Input);
