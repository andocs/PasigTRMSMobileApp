import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Dimensions,  // Import Dimensions
} from "react-native";
import {
  useCameraDevice,
  Camera,
  useCodeScanner,
} from "react-native-vision-camera";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { RNHoleView } from "react-native-hole-view"; // Import the Hole View
import { BlurView } from "expo-blur"; 
import Ionicons from "react-native-vector-icons/Ionicons"; 
import { Color, FontFamily, Padding, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

// Get window height and width
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const QRTab = ({ user }) => {
  const navigation = useNavigation();
  const [permission, setPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // New state for user data
  const [modalAnim] = useState(new Animated.Value(0)); // To control the modal's animation
  const [backgroundAnim] = useState(new Animated.Value(0)); 
  const device = useCameraDevice("back");

  useEffect(() => {
    const requestPermission = async () => {
      let cameraPermission;

      if (Platform.OS === "android") {
        cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
      } else {
        cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
      }

      if (cameraPermission === RESULTS.GRANTED) {
        setPermission(true);
      } else {
        Alert.alert("Camera permission is required.");
      }
    };

    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (code) => {
      const data = code[0]?.value.split("\n").reduce((acc, line) => {
        const [key, value] = line.split(": ").map((item) => item.trim());
        acc[key] = value;
        return acc;
      }, {});

      if (data["Control No."]) {
        setSelectedRoute(data); // Assign route-related data
      } else {
        // If "Control No." is not found, assign user-related data
        console.log(code)
        setSelectedUser(JSON.parse(code[0]?.value));
      }
      openModal();
    },
  });

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(modalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(backgroundAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(modalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(backgroundAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setSelectedRoute(null); 
    });
  };

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Slide from below
  });

  // Handle QR code generation
  const handleGenerateQR = () => {
    const value = user.info ? user.info : user
    navigation.navigate("QRGenerator", { qrValue: value });
  };

  const renderRouteStructure = (routeStructure) => {
    const stops = routeStructure.split(" - ");
    return (
      <View style={styles.stopsContainer}>
        {stops.map((stop, index) => (
          <View key={index} style={styles.stopContainer}>
            <View style={[styles.bullet, index % 2 && styles.outlineBullet]} />
            <Text style={styles.stop}>{stop}</Text>
            {index < stops.length - 1 && <View style={styles.line} />}
          </View>
        ))}
      </View>
    );
  };

  if (device == null) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />
      <Header title={"SCAN QR"} />
      {permission ? (
        <>
          <Camera
            style={styles.fullScreenCamera}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            frameProcessorFps={5}
          />
          {/* Overlay with a hole for the scanner */}
          <RNHoleView
            holes={[
              {
                x: windowWidth * 0.1,
                y: windowHeight * 0.1,
                width: windowWidth * 0.8,
                height: windowHeight * 0.4,
                borderRadius: 10,
              },
            ]}
            style={[styles.rnholeView, styles.fullScreenCamera]}
          >
          <Text style={styles.instruction}>Scan a QR Code</Text>
          {/* Generate QR Button */}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateQR}
          >
            <Text style={styles.generateButtonText}>Generate QR Code</Text>
          </TouchableOpacity>
          </RNHoleView>         
        </>
      ) : (
        <Text>Camera permission not granted</Text>
      )}

      <View style={styles.overlay}>
        <Text style={styles.instruction}>Scan a QR Code</Text>
      </View>

      {/* Modal for QR Code Details */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={30} style={styles.absolute} tint="systemChromeMaterialDark" />
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}>
            <TouchableOpacity style={styles.closeIconContainer} onPress={closeModal}>
              <Ionicons name="close" size={24} color={Color.colorPrimary} />
            </TouchableOpacity>
            {selectedRoute && (
              <>
                <Text style={styles.modalTitle}>Route Information</Text>
                <Text style={styles.modalText}>Control No.: {selectedRoute["Control No."]}</Text>
                <Text style={styles.modalText}>Operator's Name: {selectedRoute["Operator's Name"]}</Text>
                <Text style={styles.modalText}>Case No.: {selectedRoute["Case No."]}</Text>
                <Text style={styles.modalText}>Plate No.: {selectedRoute["Plate No."]}</Text>
                <Text style={styles.modalText}>Engine No.: {selectedRoute["Engine No."]}</Text>
                <Text style={styles.modalText}>Chassis No.: {selectedRoute["Chassis No."]}</Text>
                <Text style={styles.modalText}>Route Name: {selectedRoute["Route Name"]}</Text>
                <Text style={styles.modalText}>Route Structure:</Text>
                {renderRouteStructure(selectedRoute["Route Struct."])}                
              </>
            )}
            {selectedUser && (
              <>
                <Text style={styles.modalTitle}>User Information</Text>
                {selectedUser.role === "Driver" || selectedUser.role === "Operator" ? (
                  <>
                    <Text style={styles.modalText}>{selectedUser.role} ID: {selectedUser.id}</Text>
                    <Text style={styles.modalText}>Name: {selectedUser.name}</Text>
                    <Text style={styles.modalText}>Address: {selectedUser.address}</Text>
                    <Text style={styles.modalText}>Contact: {selectedUser.contact}</Text>
                    <Text style={styles.modalText}>Residency Code: {selectedUser.resi_code}</Text>
                    <Text style={styles.modalText}>Role: {selectedUser.role}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalText}>User ID: {selectedUser.userid}</Text>
                    <Text style={styles.modalText}>Role: {selectedUser.role}</Text>
                    <Text style={styles.modalText}>Email: {selectedUser.email}</Text>
                    <Text style={styles.modalText}>Name: {selectedUser.name}</Text>
                  </>
                )}
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 'max-content',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullScreenCamera: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 100,
  },
  rnholeView: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  instruction: {
    color: "white",
    fontSize: 18,
    fontFamily: FontFamily.montserratMedium,
    textAlign: "center",
    zIndex: 101,
    position: "absolute",
    top: windowHeight * 0.1,
    left: "50%",
    transform: [{ translateX: -100 }],
  },
  generateButton: {
    position: "absolute",
    bottom: windowHeight * 0.25,
    left: "50%",
    transform: [{ translateX: -100 }],
    width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    opacity: .8,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: FontFamily.montserratMedium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    padding: Padding.p_5xl,
    alignItems: "flex-start",
  },
  closeIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalTitle: {
    color: Color.colorPrimary,
    fontFamily: FontFamily.montserratBlack,
    fontSize: 20,
    marginBottom: 10,
  },
  modalText: {
    color: Color.colorPrimary,
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    marginVertical: 5,
  },
  stopsContainer: {
    marginVertical: 7,
    paddingLeft: 10,
  },
  stopContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Increased gap between stops
    position: "relative",
  },
  bullet: {
    width: 12, // Increased bullet size
    height: 12, // Increased bullet size
    borderRadius: 6,
    backgroundColor: Color.colorPrimary,
    marginRight: 15, // Increased gap between bullet and stop text
  },
  outlineBullet: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Color.colorPrimary,
  },
  stop: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 14,
    color: "#555",
  },
  line: {
    position: "absolute",
    left: 5.5,
    top: 14,
    width: 2,
    height: 26,
    borderLeftWidth: 2,
    borderColor: Color.colorPrimary,
    borderStyle: "dashed",
    borderDashGap: 4,
    borderDashWidth: 8,
  },
});

export default QRTab;