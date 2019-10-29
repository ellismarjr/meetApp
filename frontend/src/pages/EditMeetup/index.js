import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';

import { toast } from 'react-toastify';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function EditMeetup({ location }) {
  const meetup = history.location.state.Meetup;
  console.tron.log(meetup);
  const bannerMeetup = history.location.state.Meetup.File.url;

  const { title, description, location: place, formattedDate } = meetup;

  async function handleSubmit(data) {
    try {
      const response = await api.post('meetups', data);
      const meetup = response.data;
      toast.success('Meetup salvo com sucesso');
      history.push('/dashboard', { meetup });
    } catch (err) {
      toast.error('Erro ao salvar meetup');
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <BannerInput name="banner" />
        <Input name="title" placeholder="Título do meetup" text={title} />

        <Input
          name="description"
          className="description-textarea"
          placeholder="Descrição completa"
        />
        <DatePicker name="date" />
        <Input name="location" placeholder="Localização" />

        <button id="newMeetup" type="submit">
          <MdSave size={20} color="#fff" />
          <span>Salvar</span>
        </button>
      </Form>
    </Container>
  );
}
