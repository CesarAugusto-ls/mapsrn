import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import MapView from 'react-native-maps';

const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled
        />
      </View>
    </>
  );
};

export default App;
