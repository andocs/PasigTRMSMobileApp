// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Alert,
//   Platform,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";
// import {
//   useCameraDevice,
//   Camera,
//   useCodeScanner,
// } from "react-native-vision-camera";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import { BlurView } from "expo-blur"; // Ensure you have expo-blur installed
// import Ionicons from "react-native-vector-icons/Ionicons"; // Ensure you have this installed
// import { Color, FontFamily, Padding, Border } from "../GlobalStyles";

// const QRTab = () => {
//   const [permission, setPermission] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedRoute, setSelectedRoute] = useState(null);
//   const device = useCameraDevice("back");

//   useEffect(() => {
//     const requestPermission = async () => {
//       let cameraPermission;

//       if (Platform.OS === "android") {
//         cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
//       } else {
//         cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
//       }

//       if (cameraPermission === RESULTS.GRANTED) {
//         setPermission(true);
//       } else {
//         Alert.alert("Camera permission is required.");
//       }
//     };

//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ["qr"],
//     onCodeScanned: (code) => {
//       // Parse QR code content (assuming it's in the format you provided)
//       const data = code[0]?.value.split("\n").reduce((acc, line) => {
//         const [key, value] = line.split(": ").map((item) => item.trim());
//         acc[key] = value;
//         return acc;
//       }, {});

//       setSelectedRoute(data);
//       setModalVisible(true);
//     },
//   });

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedRoute(null); // Reset selectedRoute when closing
//   };

//   if (device == null) return <Text>Loading...</Text>;

//   return (
//     <SafeAreaView style={styles.qrTab}>
//       <StatusBar hidden={true} />
//       {permission ? (
//         <Camera
//           style={styles.camera}
//           device={device}
//           isActive={true}
//           codeScanner={codeScanner}
//           frameProcessorFps={5}
//         />
//       ) : (
//         <Text>Camera permission not granted</Text>
//       )}
//       <View style={styles.overlay}>
//         <Text style={styles.instruction}>Scan a QR Code</Text>
//       </View>

//       {/* Modal for Route Details */}
//       <Modal
//         animationType="none" // Disable default animation
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <BlurView
//             intensity={30}
//             style={styles.absolute}
//             tint="systemChromeMaterialDark"
//           />
//             <TouchableOpacity
//               style={styles.closeIconContainer}
//               onPress={closeModal}
//             >
//               <Ionicons name="close" size={24} color={Color.colorPrimary} />
//             </TouchableOpacity>
//             {selectedRoute && (
//               <>
//                 <Text style={styles.modalTitle}>Route Information</Text>
//                 <Text style={styles.modalText}>
//                   Operator's Name: {selectedRoute["Operator's Name"]}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Address: {selectedRoute["Address"]}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Case No.: {selectedRoute["Case No."]}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Plate No. & Engine No.:{" "}
//                   {selectedRoute["Plate No. & Engine No."]}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Chassis No.: {selectedRoute["Chassis No."]}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Route Name: {selectedRoute["Route Name"]}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Control No.: {selectedRoute["Control No."]}
//                 </Text>
//               </>
//             )}
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   qrTab: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     flex: 1,
//     width: "100%",
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   instruction: {
//     color: "white",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   absolute: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end", // Align to the bottom
//   },
//   absolute: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   modalContent: {
//     width: "100%",
//     backgroundColor: "white", // Solid background color for modal content
//     borderTopLeftRadius: Border.br_21xl, // Rounded top corners
//     borderTopRightRadius: Border.br_21xl, // Rounded top corners
//     padding: Padding.p_5xl,
//     alignItems: "flex-start",
//     zIndex: 2,
//   },
//   closeIconContainer: {
//     position: "absolute",
//     top: 20,
//     right: 20,
//   },
//   modalTitle: {
//     color: Color.colorPrimary,
//     fontFamily: FontFamily.montserratBlack,
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalText: {
//     color: Color.colorPrimary,
//     fontFamily: FontFamily.montserratMedium,
//     textAlign: "left",
//     fontSize: 14,
//     marginVertical: 5,
//   },
// });

// export default QRTab;
