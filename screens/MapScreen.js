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
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../env";
import { Color, FontFamily, Border } from "../GlobalStyles";

import Header from "../components/Header";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import PrimaryButton from "../components/PrimaryButton";

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
  const [isModalVisible, setModalVisible] = useState(false);
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
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const snapPoints = [40];
  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: 120,
    left: edgePaddingValue,
  };

  const handleClearOrigin = () => {
    originRef.current.clear();
    setOrigin(null);
    setOriginText("");
  };

  const handleClearDestination = () => {
    destinationRef.current.clear();
    setDestination(null);
    setDestinationText("");
  };

  const renderRow = (data) => {
    return data.isPredefinedPlace ? (
      <View style={styles.modalRow}>
        <Ionicons
          name="location-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <View style={styles.modalTextContainer}>
          <Text style={styles.mainText}>{data.description}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.modalRow}>
        <Ionicons
          name="location-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <View style={styles.modalTextContainer}>
          <Text style={styles.mainText}>
            {data.structured_formatting?.main_text}
          </Text>
          <Text style={styles.subText}>
            {data.structured_formatting?.secondary_text}
          </Text>
        </View>
      </View>
    );
  };

  const openSelectLocationModal = () => {
    setModalVisible(true);
  };

  // Close Modal and Save the Values
  const handleConfirm = () => {
    if (origin && destination) {
      setModalVisible(false);
      traceRoute();
    }
  };

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
    moveTo(currentPos);
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

  useEffect(() => {
    if (originText) originRef.current?.setAddressText(originText);
    if (destinationText)
      destinationRef.current?.setAddressText(destinationText);
  }, [isModalVisible]);

  return (
    <SafeAreaView style={styles.mapScreen}>
      <StatusBar hidden={true} />
      <Header title={"MAP"} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={currentLocation || INITIAL_POSITION}
          showsUserLocation={true}
          showsTraffic={true}
        >
          {origin && <Marker coordinate={origin} />}
          {destination && <Marker coordinate={destination} />}
          {showDirections && origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeColor="#6644ff"
              strokeWidth={6}
              onReady={traceRouteOnReady}
              timePrecision={"now"}
            />
          )}
        </MapView>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Select Location</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                  ref={originRef}
                  placeholder="Origin"
                  query={{
                    key: GOOGLE_API_KEY,
                    language: "en-PH",
                    components: "country:ph",
                  }}
                  onPress={(data, details = null) => {
                    setOriginText(data.description);
                    setOrigin({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    });
                  }}
                  minLength={3}
                  isRowScrollable={true}
                  enablePoweredByContainer={false}
                  fetchDetails={true}
                  renderRow={renderRow}
                  renderRightButton={() => (
                    <TouchableOpacity
                      onPress={handleClearOrigin}
                      style={styles.clearButton}
                    >
                      <Ionicons name="close-circle" size={24} color="gray" />
                    </TouchableOpacity>
                  )}
                  listLoaderComponent={
                    <ActivityIndicator
                      size="large"
                      color={Color.colorPrimary}
                    />
                  }
                  styles={{
                    loader: { justifyContent: "center" },
                    listView: {
                      position: "absolute",
                      top: 180,
                      zIndex: 1,
                      width: "100%",
                    },
                    container: { flex: 0 },
                    textInputContainer: {
                      alignItems: "center",
                      borderColor: "#888",
                      borderWidth: 1,
                      borderRadius: 4,
                      overflow: "hidden",
                    },
                    textInput: { fontFamily: FontFamily.montserratRegular },
                  }}
                  predefinedPlaces={[
                    currentLocation && {
                      description: "Current Location",
                      geometry: {
                        location: {
                          lat: currentLocation.latitude,
                          lng: currentLocation.longitude,
                        },
                      },
                    },
                  ]}
                />
              </View>

              <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                  ref={destinationRef}
                  placeholder="Destination"
                  query={{
                    key: GOOGLE_API_KEY,
                    language: "en-PH",
                    components: "country:ph",
                  }}
                  listLoaderComponent={
                    <ActivityIndicator
                      size="large"
                      color={Color.colorPrimary}
                    />
                  }
                  minLength={3}
                  onPress={(data, details = null) => {
                    setDestinationText(data.description);
                    setDestination({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    });
                  }}
                  fetchDetails={true}
                  renderRow={renderRow}
                  enablePoweredByContainer={false}
                  renderRightButton={() => (
                    <TouchableOpacity
                      onPress={handleClearDestination}
                      style={styles.clearButton}
                    >
                      <Ionicons name="close-circle" size={24} color="gray" />
                    </TouchableOpacity>
                  )}
                  styles={{
                    loader: { justifyContent: "center" },
                    listView: {
                      position: "absolute",
                      top: 120,
                      zIndex: 1,
                      width: "100%",
                    },
                    container: { flex: 0 },
                    textInputContainer: {
                      alignItems: "center",
                      borderColor: "#888",
                      borderWidth: 1,
                      borderRadius: 4,
                      overflow: "hidden",
                    },
                    textInput: { fontFamily: FontFamily.montserratRegular },
                  }}
                />
              </View>

              <PrimaryButton onPress={handleConfirm} text={"CONFIRM"} />
            </View>
          </View>
        </Modal>
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
                <MaterialIcons
                  name="location-pin"
                  size={24}
                  color={Color.colorPrimary}
                />
              )}
            </View>

            {/* Column 2: TextInput for origin */}
            <View style={styles.inputColumn}>
              <TouchableOpacity onPress={openSelectLocationModal}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter origin"
                  value={originText}
                  editable={false}
                />
              </TouchableOpacity>

              {destination && (
                <TouchableOpacity onPress={openSelectLocationModal}>
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
  inputWrapper: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontFamily: FontFamily.montserratBlack,
    color: Color.colorPrimary,
    fontSize: 20,
  },
  closeButton: {
    padding: 8,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 16,
  },
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
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    flex: 1,
    justifyContent: "flex-start",
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
    paddingTop: 10,
    paddingBottom: 20,
    zIndex: 2,
  },
  modalRow: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
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
    color: "black",
    height: 40,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
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
    backgroundColor: "gray",
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
  icon: {
    marginRight: 10,
  },
  modalTextContainer: {
    flex: 1,
  },
  mainText: {
    fontFamily: FontFamily.montserratRegular,
  },
  subText: {
    fontFamily: FontFamily.montserratRegular,
    color: "grey",
  },
  textContainer: {
    flexDirection: "column",
  },
  clearButton: {
    position: "absolute",
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  durationText: {
    fontFamily: FontFamily.interBlack,
    color: "black",
    fontSize: 18,
  },
  distanceText: {
    fontSize: 16,
    color: "gray",
    fontFamily: FontFamily.montserratRegular,
  },
});

export default MapScreen;
