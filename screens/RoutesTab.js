import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  TextInput
} from "react-native";
import { BlurView } from "expo-blur"; // Import BlurView from expo-blur
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import RoutesCard from "../components/RoutesCard";
import { Border, Padding, Color, FontFamily } from "../GlobalStyles";

const RoutesTab = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalAnim] = useState(new Animated.Value(0)); // To control the modal's animation
  const [backgroundAnim] = useState(new Animated.Value(0)); // To control the background's opacity
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(
          "http://pasigtrms.great-site.net/mobile/get_routes.php"
        );
        const result = await response.json();

        if (result.success) {
          setRoutes(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch routes");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const handleRoutePress = (route) => {
    setSelectedRoute(route);
    setModalVisible(true);
    openModal();
  };

  const closeModal = () => {
    closeModalAnimation();
  };

  const openModal = () => {
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

  const closeModalAnimation = () => {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.colorPrimary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const filteredRoutes = routes.filter((route) =>
    route.route_line.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Slide from below
  });

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

  return (
    <SafeAreaView style={[styles.routesTab, styles.bodyFlexBox]}>
      <StatusBar hidden={true} />
      <Header title={"ROUTES"} />
      <View style={[styles.body, styles.containerFlexBox]}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Terminals"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => console.log("Search pressed")}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ rowGap: 20 }}
        >
          {filteredRoutes.map((route) => (
            <TouchableOpacity
              key={route.id}
              onPress={() => handleRoutePress(route)}
            >
              <RoutesCard
                routeLine={route.route_line}
                routeStructure={route.route_struct}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal for Route Details */}
      <Modal
        animationType="none" // Disable default animation
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <BlurView
            intensity={30}
            style={styles.absolute}
            tint="systemChromeMaterialDark"
          />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalTranslateY }] },
            ]}
          >
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={closeModal}
            >
              <Ionicons name="close" size={24} color={Color.colorPrimary} />
            </TouchableOpacity>
            {selectedRoute && (
              <>
                <Text style={styles.modalTitle}>Route Information</Text>
                <Text style={styles.modalText}>
                  Route Line: {selectedRoute.route_line}
                </Text>
                <Text style={styles.modalText}>Route Structure:</Text>
                {renderRouteStructure(selectedRoute.route_struct)}
                {selectedRoute.route_modify !== "" && selectedRoute.route_modify && (
                  <Text style={styles.modalText}>Route Modify: {selectedRoute.route_modify}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.schemesOnPrimary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.schemesOnPrimary,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  bodyFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  containerFlexBox: {
    alignSelf: "stretch",
    overflow: "hidden",
  },
  body: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  routesTab: {
    backgroundColor: Color.colorPrimary,
    width: "100%",
    height: 800,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    fontFamily: FontFamily.montserratRegular,
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: Color.colorPrimary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchButtonText: {
    fontFamily: FontFamily.montserratBold,
    color: "white",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Align to the bottom
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white", // Solid background color for modal content
    borderTopLeftRadius: Border.br_21xl, // Rounded top corners
    borderTopRightRadius: Border.br_21xl, // Rounded top corners
    padding: Padding.p_5xl,
    alignItems: "flex-start",
    zIndex: 2,
  },
  closeIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalTitle: {
    color: Color.colorPrimary,
    fontFamily: FontFamily.montserratBlack,
    fontSize: 24,
  },
  modalText: {
    fontFamily: FontFamily.interRegular,
    fontSize: 16,
    marginVertical: 10,
  },
  stopsContainer: {
    marginTop: 10,
  },
  stopContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.colorPrimary,
    marginRight: 10,
  },
  outlineBullet: {
    borderWidth: 2,
    borderColor: Color.colorPrimary,
    backgroundColor: "white",
  },
  stop: {
    fontFamily: FontFamily.interMedium,
    fontSize: 14,
  },
  line: {
    width: 2,
    height: "100%",
    backgroundColor: Color.colorPrimary,
    position: "absolute",
    left: 5,
    top: 0,
  },
});


export default RoutesTab;