import * as React from "react";

import { StyleSheet, Text, View,Image } from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const OperatorContainer = ({ kobeBryant, pASIGQUIAPO }) => {
  return (
    <View style={styles.operatorContainer}>
      <Image
        style={styles.n1Icon}
        contentFit="cover"
        source={require("../assets/images/316829511-452324147049410-8148061752966919156-n-1.png")}
      />
      <View style={styles.textInformation}>
        <View style={styles.operatorInformation}>
          <Text style={styles.kobeBryant}>{kobeBryant}</Text>
          <View style={styles.viewButtonFlexBox}>
            <Image
              style={styles.routeIcon}
              contentFit="cover"
              source={require("../assets/images/route-icon.png")}
            />
            <Text style={[styles.pasigQuiapo, styles.cr08201981Typo]}>
              {pASIGQUIAPO}
            </Text>
          </View>
          <Text style={[styles.cr08201981, styles.viewTypo]}>CR: 08201981</Text>
        </View>
        <View style={[styles.viewButton, styles.viewButtonFlexBox]}>
          <Text style={[styles.view, styles.viewTypo]}>view</Text>
          <Image
            style={styles.viewIcon}
            contentFit="cover"
            source={require("../assets/images/view-icon.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cr08201981Typo: {
    letterSpacing: 3,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: "left",
  },
  viewTypo: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorPrimary,
    lineHeight: 20,
  },
  viewButtonFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "hidden",
  },
  n1Icon: {
    borderRadius: Border.br_9xs,
    width: 102,
    height: 98,
  },
  kobeBryant: {
    fontSize: FontSize.m3BodyLarge_size,
    fontWeight: "900",
    fontFamily: FontFamily.montserratBlack,
    textAlign: "left",
    color: Color.colorPrimary,
    lineHeight: 20,
    letterSpacing: 1,
    alignSelf: "stretch",
  },
  routeIcon: {
    width: 14,
    height: 14,
    overflow: "hidden",
  },
  pasigQuiapo: {
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    marginLeft: 3,
    color: Color.colorPrimary,
    lineHeight: 20,
    fontSize: FontSize.m3BodySmall_size,
  },
  cr08201981: {
    letterSpacing: 3,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: "left",
    alignSelf: "stretch",
  },
  operatorInformation: {
    alignSelf: "stretch",
    overflow: "hidden",
  },
  view: {
    fontSize: FontSize.size_3xs,
    textAlign: "right",
    width: 27,
    height: 22,
    letterSpacing: 1,
    fontFamily: FontFamily.montserratRegular,
  },
  viewIcon: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  viewButton: {
    justifyContent: "flex-end",
  },
  textInformation: {
    justifyContent: "space-between",
    marginLeft: 15,
    alignSelf: "stretch",
    overflow: "hidden",
    flex: 1,
  },
  operatorContainer: {
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
    flex: 1,
  },
});

export default OperatorContainer;
