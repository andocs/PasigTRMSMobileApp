import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Color, Border, Padding, FontFamily } from "../GlobalStyles";

import Header from "../components/Header";

const QRGenerator = ({ route }) => {
  const { qrValue } = route.params  

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"QR CODE"} />
      {qrValue ? (
        <View style={styles.body}>
          <QRCode value={JSON.stringify(qrValue)} size={200} />
          <Text style={styles.scanMeText}>Scan Me</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorPrimary,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  body: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_46xl,
    zIndex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
    overflow: "hidden"
  },
  scanMeText: {
    marginTop: Padding.p_base,
    color: Color.colorBlack,
    fontSize: 16,
    fontFamily: FontFamily.montserratMedium,
  },
});

export default QRGenerator;