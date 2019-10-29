import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { MdCameraAlt } from 'react-icons/md';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('banner');

  const [image, setImage] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); //eslint-disable-line

  async function handleBanner(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);
      console.tron.log(data);
      const response = await api.post('files', data);
      console.log(response.data);

      const { id, url } = response.data;

      setFile(id);
      setImage(url);
    } catch (err) {
      toast.error('Erro ao subir arquivo');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <label htmlFor="banner">
        {image ? (
          <img src={image} alt="Banner" />
        ) : (
          <div>
            <MdCameraAlt size={54} color="#fff" />
            <h2>Selecionar uma imagem</h2>
          </div>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleBanner}
          data-file={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
