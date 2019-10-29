import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';

import api from '~/services/api';

import { MdCameraAlt } from 'react-icons/md';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [image, setImage] = useState(defaultValue && defaultValue.url);

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
    const data = new FormData();

    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);

    const { url, id } = response.data;

    setFile(id);
    setImage(url);
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
