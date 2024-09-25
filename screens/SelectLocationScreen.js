import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../env";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { FontFamily } from "../GlobalStyles";

navigator.geolocation = require('react-native-geolocation-service');

const SelectLocationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    if (route.params) {
      if(route.params.currentLocation) {
        const loc = route.params.currentLocation
        setCurrentLocation({
          description: 'Current Location',
          geometry: { location: { lat: loc.latitude, lng: loc.longitude } },
        })
      }
    } 
  }, []);

  const handleClearOrigin = () => {
    originRef.current.clear();
    setOrigin(null);
    setOriginName("");
  };

  const handleClearDestination = () => {
    destinationRef.current.clear();
    setDestination(null);
    setDestinationName("");
  };

  const handleConfirm = () => {
    if (origin && destination) {
      navigation.push("MapScreen", {
        origin,
        destination,
        originName,
        destinationName,
      });
    }
  };

  const handleBack = () => {
    if (origin && destination) {
      // Pass selected locations back to MapScreen
      navigation.push("MapScreen", {
        origin,
        destination,
        originName,
        destinationName,
      });
    } else {
      navigation.push("MapScreen");
    }
  };

  const renderRow = (data) => {
    return data.isPredefinedPlace ? 
    (
      <View style={styles.row}>
        <Ionicons
          name="location-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            {data.description}
          </Text>
        </View>
      </View>
    ): (
      <View style={styles.row}>
        <Ionicons
          name="location-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
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

  const renderLoader = () => {
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="small" color="gray" />
    </View>
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Header title={"SELECT LOCATION"} onBack={handleBack} />
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
        {currentLocation ? 
          <GooglePlacesAutocomplete
            ref={originRef}
            placeholder="Origin"
            query={{
              key: GOOGLE_API_KEY,
              language: "en-PH",
              components: "country:ph",
            }}
            onPress={(data, details = null) => {
              setOriginName(data.description);
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
            listLoaderComponent={renderLoader}
            styles={{
              listView: { position: "absolute", top: 180, zIndex: 1 },
              container: { flex: 0 },
              textInputContainer: {
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              },
              textInput: { fontFamily: FontFamily.montserratRegular },
            }}
            predefinedPlaces={[currentLocation]}
          />  
        :
        <GooglePlacesAutocomplete
            ref={originRef}
            placeholder="Origin"
            query={{
              key: GOOGLE_API_KEY,
              language: "en-PH",
              components: "country:ph",
            }}
            onPress={(data, details = null) => {
              setOriginName(data.description);
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
            listLoaderComponent={renderLoader}
            styles={{
              listView: { position: "absolute", top: 180, zIndex: 1 },
              container: { flex: 0 },
              textInputContainer: {
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              },
              textInput: { fontFamily: FontFamily.montserratRegular },
            }}
          /> 
          }           
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
            listLoaderComponent={renderLoader}
            minLength={3}
            onPress={(data, details = null) => {
              setDestinationName(data.description);
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            fetchDetails={true}
            renderRow={renderRow}
            renderRightButton={() => (
              <TouchableOpacity
                onPress={handleClearDestination}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={24} color="gray" />
              </TouchableOpacity>
            )}
            styles={{
              listView: { position: "absolute", top: 120, zIndex: 1 }, // Position the suggestions below input
              container: { flex: 0 }, // Ensure it does not occupy space in layout
              textInputContainer: { alignItems: "center" },
              textInput: { fontFamily: FontFamily.montserratRegular },
            }}
          />
        </View>
        <PrimaryButton onPress={handleConfirm} text={"CONFIRM"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 16,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 16,
  },
  row: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontFamily: FontFamily.montserratRegular,
  },
  subText: {
    fontFamily: FontFamily.montserratRegular,
    color: "grey",
  },
  clearButton: {
    position: "absolute",
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectLocationScreen;
