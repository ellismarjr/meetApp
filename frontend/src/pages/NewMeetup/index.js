import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';

import { toast } from 'react-toastify';

import AvatarInput from './AvatarInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function NewMeetup() {
  async function handleSubmit(data) {
    try {
      console.tron.log(data);
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
        <AvatarInput name="banner" />
        <Input name="title" placeholder="Título do meetup" />

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
