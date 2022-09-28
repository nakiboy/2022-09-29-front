import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const FormInput = (props) => {
  const { placeholder, label, error } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 14 }}>{label}</Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 15 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#1b1b33",
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default FormInput;
