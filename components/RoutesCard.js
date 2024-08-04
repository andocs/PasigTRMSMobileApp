import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const RoutesCard = ({ routeLine, routeStructure }) => {
  // Convert the routeStructure string into an array of stops
  const stops = routeStructure.split(" - ");

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          source={require("../assets/images/route.svg")}
          style={styles.icon}
        />
        <Text style={styles.routeLine}>{routeLine}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Route Structure</Text>
        <View style={styles.stopsContainer}>
          {stops.map((stop, index) => (
            <View key={index} style={styles.stopContainer}>
              <View
                style={[
                  styles.bullet,
                  index % 2 && styles.outlineBullet,
                ]}
              />
              <Text style={styles.stop}>{stop}</Text>
              {index < stops.length - 1 && <View style={styles.line} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    gap: 10,
  },
  routeLine: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorPrimary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  label: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  stopsContainer: {
    paddingLeft: 10,
  },
  stopContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Increased gap between stops
    position: 'relative',
  },
  bullet: {
    width: 12, // Increased bullet size
    height: 12, // Increased bullet size
    borderRadius: 6,
    backgroundColor: Color.colorPrimary,
    marginRight: 15, // Increased gap between bullet and stop text
  },
  outlineBullet: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Color.colorPrimary,
  },
  stop: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    color: "#555",
  },
  line: {
    position: 'absolute',
    left: 5.5,
    top: 14,
    width: 2,
    height: 26,
    borderLeftWidth: 2,
    borderColor: Color.colorPrimary,
    borderStyle: 'dashed',
    borderDashGap: 4,
    borderDashWidth: 8,
  },
});

export default RoutesCard;
