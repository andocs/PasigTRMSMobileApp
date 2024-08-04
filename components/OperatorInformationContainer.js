import * as React from "react";

import { StyleSheet, Text, View, Pressable,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const OperatorInformationContainer = ({ onOperatorInformationContaiPress }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.operatorInformationContainer, styles.containerFlexBox]}
      onPress={onOperatorInformationContaiPress}
    >
      <View style={[styles.operatorContainer, styles.textInformationFlexBox]}>
        <Image
          style={styles.n1Icon}
          contentFit="cover"
          source={require("../assets/images/316829511-452324147049410-8148061752966919156-n-1.png")}
        />
        <View style={[styles.textInformation, styles.textInformationFlexBox]}>
          <View style={styles.operatorInformation}>
            <Text style={styles.michaelJordan}>Michael Jordan</Text>
            <View style={styles.containerFlexBox}>
              <Image
                style={styles.routeIcon}
                contentFit="cover"
                source={require("../assets/images/route-icon.png")}
              />
              <Text style={[styles.pasigUgong, styles.pasigUgongTypo]}>
                PASIG - UGONG
              </Text>
            </View>
            <Text style={[styles.cr08201981, styles.viewTypo]}>
              CR: 08201981
            </Text>
          </View>
          <View style={[styles.viewButton, styles.containerFlexBox]}>
            <Text style={[styles.view, styles.viewTypo]}>view</Text>
            <Image
              style={styles.viewIcon}
              contentFit="cover"
              source={require("../assets/images/view-icon.png")}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  textInformationFlexBox: {
    flex: 1,
    overflow: "hidden",
  },
  pasigUgongTypo: {
    letterSpacing: 3,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: "left",
  },
  viewTypo: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorPrimary,
    lineHeight: 20,
  },
  n1Icon: {
    borderRadius: Border.br_9xs,
    width: 102,
    height: 98,
  },
  michaelJordan: {
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
  pasigUgong: {
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    marginLeft: 3,
    color: Color.colorPrimary,
    lineHeight: 20,
    letterSpacing: 3,
    fontSize: FontSize.m3BodySmall_size,
  },
  cr08201981: {
    letterSpacing: 3,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: "left",
    alignSelf: "stretch",
  },
  operatorInformation: {
    overflow: "hidden",
    alignSelf: "stretch",
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
  },
  operatorContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  operatorInformationContainer: {
    borderRadius: Border.br_8xs,
    padding: Padding.p_8xs,
  },
});

export default OperatorInformationContainer;
