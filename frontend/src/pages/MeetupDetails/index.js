import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import { Container, Content, Footer } from './styles';
import api from '~/services/api';

import history from '~/services/history';

import image from '~/assets/image.jpg';

export default function MeetupDetails({ location }) {
  const Meetup = history.location.state.meetup;
  const bannerMeetup = history.location.state.meetup.File.url;

  const { title, description, location: place, formattedDate, banner } = Meetup;

  useEffect(() => {
    async function loadMeetup() {}

    loadMeetup();
  });

  return (
    <Container>
      <header>
        <h1>{title}</h1>
        <div>
          <button type="button" id="edit">
            <MdEdit size={20} color="#fff" />
            <p>Editar</p>
          </button>
          <button type="button" id="delete">
            <MdDeleteForever size={20} color="#fff" />
            <p>Cancelar</p>
          </button>
        </div>
      </header>
      <Content>
        <img src={Meetup.File.url} alt="Banner meetup" />
        <p>{description}</p>
      </Content>

      <Footer>
        <time>
          <MdEvent size={20} color="#fff" />
          <p>{formattedDate}</p>
        </time>
        <p>
          <MdPlace size={20} color="#fff" />
          <span>{place}</span>
        </p>
      </Footer>
    </Container>
  );
}
