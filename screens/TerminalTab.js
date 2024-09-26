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
import TerminalCard from "../components/TerminalCard";
import { Border, Padding, Color, FontFamily } from "../GlobalStyles";

const TerminalTab = () => {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [modalAnim] = useState(new Animated.Value(0)); // To control the modal's animation
  const [backgroundAnim] = useState(new Animated.Value(0)); // To control the background's opacity
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const response = await fetch(
          "http://pasigtrms.great-site.net/mobile/get_terminals.php"
        );
        const result = await response.json();

        if (result.success) {
          setTerminals(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTerminals();
  }, []);

  const handleTerminalPress = (terminal) => {
    setSelectedTerminal(terminal);
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
      setSelectedTerminal(null);
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

  const filteredTerminals = terminals.filter((terminal) =>
    terminal.terminal_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Slide from below
  });

  return (
    <SafeAreaView style={[styles.operatorsTab, styles.bodyFlexBox]}>
      <StatusBar hidden={true} />
      <Header title={"TERMINALS"} />
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
          {filteredTerminals.map((terminal) => (
            <TouchableOpacity
              key={terminal.id}
              onPress={() => handleTerminalPress(terminal)}
            >
              <TerminalCard
                terminalName={terminal.terminal_name}
                terminalAddress={terminal.terminal_add}
                routeLine={terminal.route_line}
                groupName={terminal.group_name}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal for Terminal Details */}
      <Modal
        animationType="none"
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
            {selectedTerminal && (
              <>
                <Text style={styles.modalTitle}>Terminal Information</Text>
                <Text style={styles.modalText}>
                  Terminal Name: {selectedTerminal.terminal_name}
                </Text>
                <Text style={styles.modalText}>
                  Address: {selectedTerminal.terminal_add}
                </Text>
                <Text style={styles.modalText}>
                  Route: {selectedTerminal.route_line}
                </Text>
                <Text style={styles.modalText}>
                  Group: {selectedTerminal.group_name}
                </Text>
                <Text style={styles.modalText}>
                  Business Permit: {selectedTerminal.busi_permit}
                </Text>
                <Text style={styles.modalText}>
                  Business Start: {selectedTerminal.busi_date}
                </Text>
                <Text style={styles.modalText}>
                  Business Expire: {selectedTerminal.busi_expire}
                </Text>
                {/* Add more terminal details as needed */}
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
  operatorsTab: {
    backgroundColor: Color.colorPrimary,
    width: "100%",
    height: 800,
    overflow: "hidden",
    justifyContent: "space-between",
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
    fontSize: 20,
    marginBottom: 10,
  },
  modalText: {
    color: Color.colorPrimary,
    fontFamily: FontFamily.montserratMedium,
    textAlign: "left",
    fontSize: 14,
    marginVertical: 2,
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
});

export default TerminalTab;