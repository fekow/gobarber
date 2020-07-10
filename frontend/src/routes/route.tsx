import React, { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthLayout from 'pages/_layouts/auth';
import DefaultLayout from 'pages/_layouts/default';
import { store } from 'store';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
  isPrivate: boolean;
}

const RouteWrapper = ({
  component: Component,
  isPrivate,
  ...rest
}: Props): ReactElement => {
  // o .getstate pega o state do store inteiro pelo index.
  //vejo se ta logado
  const { signed }: { signed: boolean } = store.getState().auth;
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  // se esta logado e tenta acessar login por exemplo, é redirecionado pro dashboard
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  // layout depende se esta logado ou nao
  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          {/* renderiza o componente pedido na rota com o layout q pega a children */}
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
