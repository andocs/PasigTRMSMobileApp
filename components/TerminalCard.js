import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const TerminalCard = ({
  terminalName,
  terminalAddress,
  routeLine,
  groupName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          source={require("../assets/images/terminal.png")}
          style={styles.icon}
        />
        <Text style={styles.terminalName}>{terminalName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address</Text>
        <View style={styles.detailsContainer}>
          <Image
            source={require("../assets/images/terminal-address.png")}
            style={styles.detailsIcon}
          />
          <Text style={styles.terminalAddress}>{terminalAddress}</Text>
        </View>
        <Text style={styles.label}>Route Line</Text>
        <View style={styles.detailsContainer}>
          <Image
            source={require("../assets/images/route.png")}
            style={styles.detailsIcon}
          />
          <Text style={styles.routeLine}>{routeLine}</Text>
        </View>
        <Text style={styles.label}>Group</Text>
        <View style={styles.detailsContainer}>
          <Image
            source={require("../assets/images/group.png")}
            style={styles.detailsIcon}
          />
          <Text style={styles.groupName}>{groupName}</Text>
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
  detailsIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
  infoContainer: {
    flex: 1,
    gap: 10
  },
  terminalName: {
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
  terminalAddress: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    color: "#555",
  },
  routeLine: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    color: "#555",
  },
  groupName: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    color: "#555",
  },
});

export default TerminalCard;
