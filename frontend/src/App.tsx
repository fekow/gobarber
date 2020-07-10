import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';
import { store, persistor } from 'store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* usado pra manter os states do reducer, somente renderiza depois de buscar as info do storage */}
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
