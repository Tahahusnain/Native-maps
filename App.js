import React, { useEffect, useRef, useState } from 'react';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  console.log("1")
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.085,
    longitudeDelta: 0.0421,
  });
 
  const refLocation = useRef(false)

  useEffect(() => {
    console.log("Ref location", currentLocation);

    async function fetchLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }
      console.log("try to fetch location")
      try {
        console.log("In local mode")
        const location = await Location.getCurrentPositionAsync({});
        console.log("location: " + JSON.stringify(location));
        // setRegion(location)
          setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
      });
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
    fetchLocation(); // Call the async function immediatel
    console.log("funtion called")
    // 
  }, []);

  useEffect(() => {
    console.log("current =>",currentLocation)
    refLocation.current.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.00321,
    });

  }, [currentLocation])
  

  // console.log("2")
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={currentLocation}
        provider={PROVIDER_GOOGLE}
        ref={refLocation}
        // followsUserLocation={fa}
        showsTraffic={true}
        moveOnMarkerPress={true}
        showsMyLocationButton={true}
      >
      
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            draggable={true}
            onDragStart={(e)=>{
              console.log(e.nativeEvent.coordinate)
            }}
            onDragEnd={(e)=>{
              console.log(e.nativeEvent.coordinate)
            }}
          />
          
          
         
          <Circle
            center={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            radius={500}
            fillColor="rgba(173, 216, 230, 0.3)" 
          />
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
