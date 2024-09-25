import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"; // For icons;
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../env";
import { Color, FontFamily } from "../GlobalStyles";

import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/core";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
  latitude: 14.5764,
  longitude: 121.0851,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const snapPoints = [30];
  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: 120,
    left: edgePaddingValue,
  };

  useEffect(() => {
    if (route.params) {
      const { origin, destination, originName, destinationName } = route.params;
      if (originName) setOriginText(originName);
      if (destinationName) setDestinationText(destinationName);
      if (origin) setOrigin(origin)
      if (destination) setDestination(destination);      
    }
  }, [route.params]);

  useEffect(() => {
    if (origin && destination) {
      traceRoute();
    }
  }, [origin, destination]);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const currentPos = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setCurrentLocation(currentPos);
    if(!route.params) {
      moveTo(currentPos)
    } else {
      setShowDirections(true);
      bottomSheetRef.current.expand();
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });      
    }
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      bottomSheetRef.current.expand();
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours ? hours + " hr " : ""}${minutes} min`;
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={styles.mapScreen}>
      <StatusBar hidden={true} />
      <Header title={"MAP"} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_POSITION}
          showsUserLocation={true}
          showsTraffic={true}   
        >
          {origin && (
            <Marker
              coordinate={origin}
            />
          )}
          {destination && (
            <Marker
              coordinate={destination}
            />
          )}
          {showDirections && origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeColor="#6644ff"
              strokeWidth={6}
              onReady={traceRouteOnReady}
              timePrecision={'now'}
            />
          )}
        </MapView>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        topInset={10}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView style={styles.autocompleteContainer}>
          <View style={styles.row}>
            {/* Column 1: Icons */}
            <View style={styles.iconColumn}>
              {origin ? (
                <>
                  {/* Two circles with a vertical line when origin exists */}
                  <View style={styles.circleSolid} />
                  <View style={styles.verticalLine} />
                  <View style={styles.circleOutline} />
                </>
              ) : (
                <MaterialIcons name="location-pin" size={24} color={Color.colorPrimary} />
              )}
            </View>

            {/* Column 2: TextInput for origin */}
            <View style={styles.inputColumn}>
              <TouchableOpacity
                onPress={() =>
                  !origin
                    ? currentLocation ? navigation.push("SelectLocationScreen", { currentLocation }) : navigation.push("SelectLocationScreen")
                    : navigation.goBack()
                }
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter origin"
                  value={originText}
                  editable={false}
                />
              </TouchableOpacity>

              {destination && (
                <TouchableOpacity
                  onPress={() =>
                    !destination
                      ? currentLocation ? navigation.push("SelectLocationScreen", { currentLocation }) : navigation.push("SelectLocationScreen")
                      : navigation.goBack()
                  }
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter destination"
                    value={destinationText}
                    editable={false}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* Distance and Duration */}
          {distance && duration ? (
            <>
              <View style={styles.horizontalLine} />
              <View style={styles.detailsContainer}>
                <Ionicons
                  name="car-outline"
                  size={24}
                  color={Color.colorPrimary}
                  style={styles.carIcon}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.durationText}>
                    {formatDuration(duration)}
                  </Text>
                  <Text style={styles.distanceText}>
                    {distance.toFixed(2)} km
                  </Text>
                </View>
              </View>
            </>
          ) : null}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mapScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    position: "relative",
  },
  container: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  autocompleteContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 2,
  },
  row: {
    gap: 7,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  iconColumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputColumn: {
    gap: 10,
    flex: 4,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontFamily: FontFamily.montserratRegular,
  },
  circleSolid: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: Color.colorPrimary,
  },
  circleOutline: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.schemesPrimary,
  },
  verticalLine: {
    width: 2,
    height: 38,
    backgroundColor: 'gray',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  carIcon: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  durationText: {
    fontFamily: FontFamily.interBlack,
    color: 'black',
    fontSize: 18,
  },
  distanceText: {
    fontSize: 16,
    color: "gray",
    fontFamily: FontFamily.montserratRegular,
  },
});

export default MapScreen;
