import React from 'react';
import MapView from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service'
import { SafeAreaView, Text, PermissionsAndroid, Platform, View } from 'react-native';

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
            Geolocation.watchPosition(
                position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed * 3.6,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        altitude: position.coords.altitude,
                    })
                    console.log(position)
                },
                error => {
                    console.log(`ERRO geolocation: ${error.code}, ${error.message}`)
                })
        }
    }, [hasLocationPermission])



    return (
        <>
            <SafeAreaView />
            <View style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
            }}>
                <View style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: '#2D59A9',
                    marginTop: 32,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Text style={{
                        color: '#FFF',
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: "bold"
                    }}>
                        {userPosition ?
                            userPosition.speed > 0 ?
                                parseInt(userPosition.speed)
                                : 0
                            : 0
                        }

                    </Text>
                    <Text style={{
                        color: '#FFF',
                        fontSize: 12
                    }}>
                        km/h
                    </Text>
                </View>
                <View style={{ marginTop: 32, }}>
                    <Text>Latitude: {userPosition ? userPosition.latitude : ''}</Text>
                    <Text>Longitude: {userPosition ? userPosition.longitude : ''}</Text>
                </View>
            </View>
            <MapView
                style={{ flex: 6 }}
                region={userPosition}
                loadingEnabled
                showsUserLocation
                showsCompass
            />
        </>
    );
};

export default Map;
