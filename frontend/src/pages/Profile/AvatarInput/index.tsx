import React, { ChangeEvent, useRef, useEffect, useState } from 'react';
import api from 'services/api';

import { useField } from '@unform/core';
import { Container } from './styles';

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const AvatarInput: React.FC<InputProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // default value vem do initialstate do form, que vem do meu state redux user
  const { registerField, defaultValue } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const data = new FormData();
    // sempre vem um array do file, escolhe o 1
    const file = e.target.files?.[0];
    // nome do campo esperado pelo backend(file)
    if (file) {
      data.append('file', file);
    }
    const response = await api.post('/files', data);

    const { id, url } = response.data;
    setPreview(url);
    setFile(id);
  }

  useEffect(() => {
    if (inputRef.current) {
      // cadastra filed pro unfform reconhecer ele
      // name é como vai aparecer no formData pro update profile
      //tem que usar esse dataset.file quando usa data-file
      registerField({
        name: 'avatar_id',
        ref: inputRef.current,
        path: 'dataset.file',
      });
    }
  }, [inputRef, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        <span>+</span>
        <img
          src={
            preview || 'https://api.adorable.io/avatars/120/mari%20korman.png'
          }
          alt="avatar"
        />
        <input
          type="file"
          ref={inputRef}
          id="avatar"
          // passa o id pro unform????
          data-file={file}
          onChange={handleChange}
          accept="image/*"
        />
      </label>
    </Container>
  );
};

export default AvatarInput;
