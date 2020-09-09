import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import Map from './components/Map';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <Map />
      </View>
    </>
  );
};

export default App;
