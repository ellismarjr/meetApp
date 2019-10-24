import React from 'react';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';
import logo from '~/assets/logoheader.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="MeetApp" />
          </Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>Administrador</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <button type="button">Sair</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
