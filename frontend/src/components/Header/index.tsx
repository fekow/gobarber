import React from 'react';
import { Container, Content, Profile } from './styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules/rootReducer';
import Notifications from 'components/Notifications';
import logo from 'assets/logo-purple.svg';
const Header: React.FC = () => {
  const { name, avatar } = useSelector(
    (state: RootState) => state.user.profile
  );
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="goBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        {/* // parte mais para o lado onde fica perfil e notificações */}
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                avatar?.url ||
                'https://api.adorable.io/avatars/50/mari%20korman.png'
              }
              alt="Provider's Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
};

export default Header;
