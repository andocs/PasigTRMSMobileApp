import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";

const HeadContainer = ({ user }) => {
  return (
    <View style={[styles.headContainer, styles.containerFlexBox]}>
      <Text style={styles.welcomeBack}>Welcome Back!</Text>
      <View
        style={[styles.profileInformationContainer, styles.containerFlexBox]}
      >
        <Image
          style={styles.pfpContainerIcon}
          contentFit="cover"
          source={require("../assets/images/pfp-container.png")}
        />
        <View
          style={[styles.userInformationContainer, styles.containerFlexBox]}
        >
          <Text style={[styles.juanDelaCruz, styles.operatorLayout]}>
            {user ? user.name : "JUAN DELA CRUZ"}
          </Text>
          <Text style={[styles.operator, styles.operatorLayout]}>
            {user.info ? user.info.role : "User"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    alignSelf: "stretch",
    overflow: "hidden",
  },
  operatorLayout: {
    width: 180,
    color: Color.schemesOnPrimary,
    textAlign: "left",
    lineHeight: 20,
  },
  welcomeBack: {
    fontSize: FontSize.size_xl,
    color: Color.colorPrimary,
    textAlign: "left",
    lineHeight: 20,
    fontFamily: FontFamily.montserratBold,
    letterSpacing: 1,
    alignSelf: "stretch",
  },
  pfpContainerIcon: {
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  juanDelaCruz: {
    fontSize: FontSize.m3BodySmall_size,
    letterSpacing: 2,
    fontFamily: FontFamily.montserratBold,
    color: Color.schemesOnPrimary,
  },
  operator: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.montserratMedium,
    color: Color.schemesOnPrimary,
    letterSpacing: 1,
  },
  userInformationContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    overflow: "hidden",
  },
  profileInformationContainer: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorPrimary,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    padding: Padding.p_8xs,
    marginTop: 13,
    overflow: "hidden",
  },
  headContainer: {
    justifyContent: "center",
    padding: Padding.p_6xs,
    overflow: "hidden",
  },
});

export default HeadContainer;
