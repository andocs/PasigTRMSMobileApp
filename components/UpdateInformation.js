import * as React from "react";

import { StyleSheet, Text, View,Image } from "react-native";
import { FontFamily, Color, FontSize, Padding, Border } from "../GlobalStyles";

const UpdateInformation = () => {
  return (
    <View style={[styles.updateInformation, styles.updateInformationFlexBox]}>
      <Image
        style={styles.infoIcon}
        contentFit="cover"
        source={require("../assets/images/info-icon.png")}
      />
      <View style={[styles.decriptionContainer, styles.emailAddressSpaceBlock]}>
        <Text style={styles.ifYouNeed}>
          If you need to update your information, kindly contact or visit us at
          F. Manalo St, Pasig, Metro Manila.
        </Text>
        <View style={styles.updateInformationFlexBox}>
          <View style={styles.phoneNumber}>
            <Image
              style={styles.frameIcon}
              contentFit="cover"
              source={require("../assets/images/phone.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>(8) 643-1111</Text>
          </View>
          <View style={[styles.emailAddress, styles.emailAddressSpaceBlock]}>
            <Image
              style={styles.frameIcon}
              contentFit="cover"
              source={require("../assets/images/email.png")}
            />
            <Text style={[styles.trmspasigcitygovph, styles.textTypo]}>
              TRMS@pasigcity.gov.ph
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  updateInformationFlexBox: {
    marginTop: 10,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  emailAddressSpaceBlock: {
    marginLeft: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  textTypo: {
    fontFamily: FontFamily.montserratRegular,
    textAlign: "left",
    color: Color.schemesOnPrimary,
    lineHeight: 10,
    letterSpacing: 1,
    fontSize: FontSize.size_3xs,
  },
  infoIcon: {
    width: 36,
    height: 36,
    overflow: "hidden",
  },
  ifYouNeed: {
    fontFamily: FontFamily.montserratSemiBold,
    textAlign: "left",
    color: Color.schemesOnPrimary,
    lineHeight: 10,
    letterSpacing: 1,
    fontSize: FontSize.size_3xs,
    alignSelf: "stretch",
  },
  frameIcon: {
    width: 12,
    height: 12,
    overflow: "hidden",
  },
  text: {
    marginLeft: 4,
  },
  phoneNumber: {
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  trmspasigcitygovph: {
    marginLeft: 5,
  },
  emailAddress: {
    flexDirection: "row",
    marginLeft: 10,
  },
  decriptionContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
  },
  updateInformation: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorPrimary,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_7xs,
  },
});

export default UpdateInformation;
