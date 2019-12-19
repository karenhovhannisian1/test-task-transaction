import React from 'react';
import Routes from '../src/routes';
import { StateProvider } from './context';
import { initialState, reducer } from './context/reducer';

// Add axios interceptor
import './api/interceptor';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Routes />
    </StateProvider>
  );
}

export default App;
