import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { object } from "yup";
import client from "../api/client";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import ForgotPassword from "./ForgotPassword";

const LoginForm = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Мэдээлэл оруулаагүй байна!", setError);
    if (!email.trim() || email.length)
      if (!password.trim() || password.length < 8)
        return updateError("Нууц үг 8-аас дээш байх", setError);
    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post("/sign-in", { ...userInfo });
        if (res.data.success) {
          setUserInfo({ email: "", password: "" });
        }
        if (res.data.success) {
          alert("Амжилттай нэвтэрсэн");
          navigation.navigate("InventoryText");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "email")}
        value={email}
        label="email"
        title="email"
        placeholder="email орууулах"
        autoCapitalize="none"
      />
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "password")}
        value={password}
        label="Нууц үг"
        title="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title="Нэвтрэх" />
      <Text style={{ fontSize: 12, textAlign: "center", padding: 15 }}>
        {/* Нууц үг мартсан?{" "} */}
        {/* <Text
          style={{ color: "darkred", fontWeight: "bold" }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Нууц үг сэргээх
        </Text> */}
      </Text>
    </FormContainer>
  );
};

export default LoginForm;
