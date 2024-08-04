import { useEffect } from "react";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Header from "../components/Header";
import { Padding, Border, Color } from "../GlobalStyles";

const QRTab = () => {
  useEffect(() => {
    // Request camera permission
    const requestCameraPermission = async () => {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);
      if (result !== RESULTS.GRANTED) {
        await request(PERMISSIONS.ANDROID.CAMERA);
      }
    };

    requestCameraPermission();
  }, []);

  const onSuccess = (e) => {
    // Handle the scanned QR code data here
    Alert.alert("QR Code Scanned!", e.data);
    // You can also navigate to another screen or perform actions based on the scanned data
  };

  return (
    <View style={styles.qrTab}>
      <Header title={"QR CODE"} />
      <View style={[styles.body, styles.bodyFlexBox]}>
        <View style={[styles.qrContainer, styles.bodyFlexBox]}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.FlashMode.auto}
            cameraStyle={styles.cameraStyle}
            topContent={<Text style={styles.centerText}>Scan a QR Code</Text>}
            bottomContent={
              <View style={styles.qrButtonFlexBox}>
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require("../assets/images/qr-placeholder.png")}
                />
                <Text style={styles.instructionText}>Place the QR code inside the viewfinder</Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
  qrButtonFlexBox: {
    padding: Padding.p_8xs,
    flexDirection: "column",
    borderRadius: Border.br_8xs,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  vectorIcon: {
    width: 232,
    height: 232,
  },
  instructionText: {
    marginTop: 10,
    fontSize: 16,
    color: Color.colorPrimary,
    textAlign: "center",
  },
  cameraStyle: {
    height: 300, // Adjust the height as needed
    width: "100%",
  },
  qrContainer: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
  },
  body: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    zIndex: 1,
  },
  qrTab: {
    backgroundColor: Color.colorPrimary,
    width: "100%",
    height: "100%", // Set to 100% to fill the screen
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default QRTab;
