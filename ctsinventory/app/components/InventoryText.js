import React, { useState } from "react";
import { StyleSheet, Image, ScrollView, Text, TextInput } from "react-native";
import { isValidObjField, updateError, isValidName } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";
import inventory from "./inventory";
import FormInput from "./FormInput";
import { Formik } from "formik";
import * as Yup from "yup";

import client from "../api/client";

const validationSchema = Yup.object({
  name: Yup.string().trim().min(0, "Буруу байна!").required("Нэр оруулна уу?"),
  code: Yup.string().trim().min(0, "Буруу байна!").required("Код оруулна уу?"),
  quantity: Yup.string()
    .trim()
    .min(0, "Буруу байна!")
    .required("Тоо ширхэг оруулна уу?"),
  price: Yup.string().trim().min(0, "Буруу байна!").required("Үнэ оруулна уу?"),
  date: Yup.string()
    .trim()
    .min(0, "Буруу байна!")
    .required("Он сар оруулна уу?"),
  register: Yup.string()
    .trim()
    .min(0, "Буруу байна!")
    .required("Регистр оруулна уу?"),
  account: Yup.string()
    .trim()
    .min(0, "Буруу байна!")
    .required("Данс оруулна уу?"),
  owner: Yup.string()
    .trim()
    .min(0, "Буруу байна!")
    .required("Эзэмшигч оруулна уу?"),
});

const InventoryText = ({ navigation }) => {
  const productInfo = {
    name: "",
    code: "",
    quantity: "",
    price: "",
    date: "",
    register: "",
    account: "",
    owner: "",
  };

  const [error, setError] = useState("");
  // const { placeholder, label, error } = props;
  const { name, code, quantity, price, date, register, account, owner } =
    productInfo;

  const handleOnChangeText = (value, fieldProduct) => {
    setProductInfo({ ...productInfo, [fieldProduct]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(productInfo))
      return updateError("Required all fields!", setError);
    if (!name.trim() || name.length < 0)
      return updateError("Invalid name!", setError);

    if (!code.trim() || code.length < 0)
      return updateError("Invalid code!", setError);

    if (!quantity.trim() || quantity.length < 0)
      return updateError("Invalid quantity!", setError);

    if (!price.trim() || price.length < 0)
      return updateError("Invalid price!", setError);

    if (!date.trim() || date.length < 0)
      return updateError("Invalid date!", setError);

    if (!register.trim() || register.length < 0)
      return updateError("Invalid register!", setError);

    if (!account.trim() || account.length < 0)
      return updateError("Invalid account!", setError);

    if (!owner.trim() || owner.length < 0)
      return updateError("Invalid owner!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(productInfo);
    }
  };

  const Product = async (values, formikActions) => {
    const res = await client.post("/create-product", {
      ...values,
    });
    if (res.data.success) {
      const productRes = await client.post("/create-product", {
        name: values.name,
        code: values.code,
        quantity: values.quantity,
        price: values.price,
        date: values.date,
        register: values.register,
        account: values.account,
        owner: values.owner,
      });
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <ScrollView>
        <Formik
          initialValues={productInfo}
          validationSchema={validationSchema}
          onSubmit={Product}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const {
              name,
              code,
              quantity,
              price,
              date,
              register,
              account,
              owner,
            } = values;

            return (
              <>
                <Text style={{ textAlign: "center", fontSize: 20, margin: 15 }}>
                  Бараа материал бүртгэх
                </Text>
                <FormInput
                  style={styles.input}
                  value={name}
                  error={touched.name && errors.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  label="Бараа материалын нэр"
                  placeholder="бараа материалын нэр оруулах"
                />
                <FormInput
                  style={styles.input}
                  value={code}
                  error={touched.code && errors.code}
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  label="Бараа материалын код"
                  placeholder="Бараа материалын код оруулах"
                  keyboardType="numeric"
                />
                <FormInput
                  style={styles.input}
                  value={quantity}
                  error={touched.quantity && errors.quantity}
                  onChangeText={handleChange("quantity")}
                  onBlur={handleBlur("quantity")}
                  label="Бараа материалын тоо ширхэг"
                  placeholder="Бараа материалын тоо ширхэг оруулах"
                  keyboardType="numeric"
                />
                <FormInput
                  style={styles.input}
                  value={price}
                  error={touched.price && errors.price}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  label="Бараа материалын үнэ"
                  placeholder="Бараа материалын үнэ оруулах"
                  keyboardType="numeric"
                />
                <FormInput
                  style={styles.input}
                  value={date}
                  error={touched.date && errors.date}
                  onChangeText={handleChange("date")}
                  onBlur={handleBlur("date")}
                  label="Бараа материалын бүртгэсэн он сар"
                  placeholder="Бараа материалын он сар оруулах"
                />
                <FormInput
                  style={styles.input}
                  value={register}
                  error={touched.register && errors.register}
                  onChangeText={handleChange("register")}
                  onBlur={handleBlur("register")}
                  label="Бараа материалын регистр"
                  placeholder="Бараа материалын регистр оруулах"
                  keyboardType="numeric"
                />

                <FormInput
                  style={styles.input}
                  value={account}
                  error={touched.account && errors.account}
                  onChangeText={handleChange("account")}
                  onBlur={handleBlur("account")}
                  label="Бараа материалын данс"
                  placeholder="Бараа материалын данс оруулах"
                  keyboardType="numeric"
                />
                <FormInput
                  style={styles.input}
                  value={owner}
                  error={touched.owner && errors.owner}
                  onChangeText={handleChange("owner")}
                  onBlur={handleBlur("owner")}
                  label="Бараа материалын эзэмшигч"
                  placeholder="Бараа материалын эзэмшигч нэр оруулах"
                />
                <FormSubmitButton
                  isSubmitting={isSubmitting}
                  onPress={handleSubmit}
                  title="Бараа материал бүртгэх"
                />
              </>
            );
          }}
        </Formik>
        <Text style={{ fontSize: 15, textAlign: "center", padding: 15 }}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("inventory")}
          >
            QR бүртгэх
          </Text>
        </Text>
      </ScrollView>
    </FormContainer>
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

export default InventoryText;
