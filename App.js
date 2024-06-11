import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './App/Redux/Reducers/index.js';
import AppNavigator from './App/Router/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import { loadFavorites } from './App/Redux/Reducers/Favorites.js';

const App = () => {

  useEffect(() => {
    store.dispatch(loadFavorites());
  }, []);

  const customizedMiddleware = (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  });
  LogBox.ignoreAllLogs(true);

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => customizedMiddleware(getDefaultMiddleware),
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
