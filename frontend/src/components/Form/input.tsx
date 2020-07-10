import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { MdError } from 'react-icons/md';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  /* o uncontrolledform pega o value do input pelo dom, controlando por la e nao
  pelo value pelo onChange, assim nao renderizando a pagina toda vez que digita */

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <span
          style={{
            color: '#fb6f91 ',
            display: 'flex',
            margin: '0 0 10px',
          }}
        >
          <MdError
            size={18}
            color="#fb6f91"
            style={{ alignSelf: 'center', marginRight: '5px' }}
          />
          {error}
        </span>
      )}
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Input;
