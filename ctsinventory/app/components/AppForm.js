import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import FormHeader from "./FormHeader";
import FormSelectorBtn from "./FormSelectorBtn";
import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";

const { width } = Dimensions.get("window");

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });
  const rightHeaderTransletaY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,1)", "rgba(27,27,51,0.4)"],
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,0.4)", "rgba(27,27,51,1)"],
  });

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingTop: 120 }}>
        {/* <View style={styles.imageContainer}>
          <Image
            source={require("./assets/2007-2018.png")}
            style={styles.imageStyles}
          />
        </View> */}
        <View style={{ height: 80 }}>
          <FormHeader
            leftHeading="Тавтай морил"
            rightHeading="но уу?"
            subHeading="Бараа материал бүртгэх"
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX={leftHeaderTranslateX}
            rightHeaderTransletaY={rightHeaderTransletaY}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {/* <FormSelectorBtn
            style={styles.borderLeft}
            backgroundColor={loginColorInterpolate}
            title="....."
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          /> */}
          {/* <FormSelectorBtn
            style={styles.borderRight}
            backgroundColor={signupColorInterpolate}
            title="Бүртгүүлэх"
            onPress={() => scrollView.current.scrollTo({ x: width })}
          /> */}
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false }
          )}
        >
          <LoginForm navigation={navigation} />
          {/* <ScrollView>
            <SignupForm navigation={navigation} />
          </ScrollView> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRadius: 8,
  },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 },
});
