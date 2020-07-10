import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
// pego o arquivo com os reducers q quero manter
import persistReducers from './persistReducers';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
// TEM QUE ESTAR EM CHAVES POR ALGUM MOTIVO
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];
// encapsulo nos root reducer
const store: any = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
