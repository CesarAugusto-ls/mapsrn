import React from 'react';
import MapView from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service'
import { SafeAreaView, Text, PermissionsAndroid, Platform } from 'react-native';

const Map = () => {
    const [hasLocationPermission, setHasLocationPermission] = React.useState(false)
    const [userPosition, setUserPosition] = React.useState(null)

    async function verifyLocationPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permissao Concedida')
                    setHasLocationPermission(true);
                } else {
                    console.log('Permissao negada')
                    setHasLocationPermission(false);
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }

    React.useEffect(() => {
        verifyLocationPermission();

        if (hasLocationPermission || Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    })
                },
                error => {
                    console.log(error.code, error.message)
                })
        }
    }, [hasLocationPermission])



    return (
        <>
            <MapView
                style={{ flex: 1 }}
                region={userPosition}
                loadingEnabled
                showsUserLocation
            />
        </>
    );
};

export default Map;
