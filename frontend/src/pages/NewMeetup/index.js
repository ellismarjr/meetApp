import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';

import { toast } from 'react-toastify';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function NewMeetup({ location }) {
  async function handleSubmit(data) {
    let response = null;
    try {
      if (history.location.state) {
        const id = history.location.state.meetup.id;
        response = await api.put(`meetups/${id}`, data);
      } else {
        response = await api.post('meetups', data);
      }
      const meetup = {
        ...response.data,
        formatedDate: format(
          parseISO(response.data.date),
          "d 'de' MMMM', às' HH:mm",
          {
            locale: pt,
          }
        ),
      };

      toast.success('Meetup salvo com sucesso');

      history.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao salvar meetup');
    }
  }
  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={
          history.location.state ? history.location.state.meetup : null
        }
      >
        <BannerInput name="banner" />
        <Input name="title" placeholder="Título do meetup" />

        <Input
          name="description"
          className="description-textarea"
          placeholder="Descrição completa"
        />
        <DatePicker
          name="date"
          selectedDate={
            history.location.state && history.location.state.meetup.date
          }
        />
        <Input name="location" placeholder="Localização" />

        <button id="newMeetup" type="submit">
          <MdSave size={20} color="#fff" />
          <span>Salvar</span>
        </button>
      </Form>
    </Container>
  );
}
