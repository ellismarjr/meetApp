import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdSave } from 'react-icons/md';

import { toast } from 'react-toastify';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  banner: Yup.number(),
  title: Yup.string().required('O titulo é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória.'),
  date: Yup.date().required('Você precisa preencher uma data.'),
  location: Yup.string().required('A localização do seu meetup é obrigatória.'),
});

export default function NewMeetup({ location }) {
  async function handleSubmit(data) {
    try {
      if (history.location.state) {
        const id = history.location.state.meetup.id;
        await api.put(`meetups/${id}`, data);
      } else {
        console.tron.log('create');
        console.tron.log(data);
        await api.post('meetups', data);
      }

      toast.success('Meetup salvo com sucesso');

      history.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao salvar meetup');
    }
  }

  return (
    <Container>
      <Form
        initialData={
          history.location.state ? history.location.state.meetup : null
        }
        onSubmit={handleSubmit}
        schema={schema}
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
