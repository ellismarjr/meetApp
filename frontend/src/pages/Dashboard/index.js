import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, MeetupList, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => ({
        ...meetup,
        formattedDate: format(
          parseISO(meetup.date),
          "d 'de' MMMM', às' HH:mm",
          {
            locale: pt,
          }
        ),
      }));

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleMeetupDetails(id) {
    history.push('/meetupDetails', { id });
    console.tron.log(id);
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <button type="button">
          <MdAddCircleOutline size={20} color="#fff" />
          <p>Novo meetup</p>
        </button>
      </header>

      <MeetupList>
        {meetups.map(meetup => (
          <Meetup onClick={() => handleMeetupDetails(meetup.id)}>
            <strong>{meetup.title}</strong>
            <div>
              <p>{meetup.formattedDate}</p>

              <Link to="/meetupDetails">
                <MdChevronRight size={20} color="#fff" />
              </Link>
            </div>
          </Meetup>
        ))}
      </MeetupList>
    </Container>
  );
}
