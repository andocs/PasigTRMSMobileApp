import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const CustomInput = ({ placeholder, iconName, value, onChangeText, secureTextEntry }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={24} color={Color.colorPrimary} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Color.colorPrimary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordVisible}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={Color.colorPrimary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Color.colorPrimary,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: Color.colorPrimary,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratRegular,
  },
});

export default CustomInput;
