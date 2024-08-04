import * as React from "react";
import { Text, StyleSheet, View,Image } from "react-native";

import { FontSize, Color, FontFamily, Border, Padding } from "../GlobalStyles";

const DetailsModal = ({ driverInformation, dRIVER, antipoloRizal }) => {
  return (
    <View style={[styles.detailsModal, styles.informationFlexBox]}>
      <View style={styles.operatorInformation}>
        <View style={[styles.headerInformation, styles.informationFlexBox]}>
          <Text style={styles.driverInformation}>{driverInformation}</Text>
          <Image
            style={styles.frameIcon}
            contentFit="cover"
            source={require("../assets/images/frame.png")}
          />
        </View>
        <View
          style={[styles.userAccountInformation, styles.informationFlexBox]}
        >
          <Text style={[styles.driver, styles.driverTypo]}>{dRIVER}</Text>
          <Text style={[styles.michaelJordan, styles.driverTypo]}>
            Michael Jordan
          </Text>
        </View>
        <View
          style={[styles.userAccountInformation, styles.informationFlexBox]}
        >
          <Text style={[styles.driver, styles.driverTypo]}>ADDRESS:</Text>
          <Text style={[styles.michaelJordan, styles.driverTypo]}>
            {antipoloRizal}
          </Text>
        </View>
        <View
          style={[styles.userAccountInformation, styles.informationFlexBox]}
        >
          <Text style={[styles.driver, styles.driverTypo]}>CONTACT:</Text>
          <Text style={[styles.michaelJordan, styles.driverTypo]}>
            09123456789
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  informationFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  driverTypo: {
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    color: Color.colorPrimary,
    lineHeight: 20,
  },
  driverInformation: {
    fontSize: FontSize.size_xl,
    fontWeight: "900",
    fontFamily: FontFamily.montserratBlack,
    textAlign: "left",
    color: Color.colorPrimary,
    lineHeight: 20,
  },
  frameIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  headerInformation: {
    justifyContent: "space-between",
  },
  driver: {
    letterSpacing: 3,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
  },
  michaelJordan: {
    letterSpacing: 1,
    fontWeight: "500",
    fontFamily: FontFamily.montserratMedium,
    marginLeft: 10,
  },
  userAccountInformation: {
    marginTop: 10,
  },
  operatorInformation: {
    flex: 1,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  detailsModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    backgroundColor: Color.schemesOnPrimary,
    height: 202,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    zIndex: 1,
  },
});

export default DetailsModal;
