import React from 'react';

import { Container, Holder, Navigator } from './styles';
import fastfeet from '~/assets/img/logo.svg';
import history from '~/services/history';

export default function Header() {
  const handleLogOut = () => {
    localStorage.removeItem('persist:fastfeet');
  };

  const [, path] = history.location.pathname.split('/');

  return (
    <Container>
      <nav>
        <img alt="fastfeet" src={fastfeet} />
        <Navigator to="/deliveries" path={path === 'deliveries'}>
          DELIVERIES
        </Navigator>
        <Navigator to="/providers" path={path === 'providers'}>
          PROVIDERS
        </Navigator>
        <Navigator to="/recipients" path={path === 'recipients'}>
          RECIPIENTS
        </Navigator>
        <Navigator to="/problems" path={path === 'problems'}>
          PROBLEMS
        </Navigator>
      </nav>
      <aside>
        <Holder>
          <div>
            <strong>Fastfeet Admin</strong>
            <a href="/" onClick={handleLogOut}>
              log out
            </a>
          </div>
        </Holder>
      </aside>
    </Container>
  );
}
