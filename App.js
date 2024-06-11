import React, { useEffect } from 'react';
// import { Provider } from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './App/Redux/Reducers/index';
import AppNavigator from './App/Router/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  // const clientStore = configureStore({
  //   reducer: rootReducer
  // })

  useEffect(() => {
    SplashScreen.hide(); // Hide the splash screen when the app is ready
  }, []);

  return (
    // <Provider store={clientStore}>
    //   <AppNavigator />
    // </Provider>
    <AppNavigator />
  );
};

export default App;
