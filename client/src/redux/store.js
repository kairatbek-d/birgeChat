import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
    // Ignore these action types
    ignoredActions: ['socket/setSocket'],
    // Or you can ignore checking for specific paths in the state
    ignoredPaths: ['socket.socket'],
  },}).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;