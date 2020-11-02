import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ButtonProps,
  Text,
  TouchableWithoutFeedback,
  Button,
  ViewStyle,
  StyleProp,
} from "react-native";
import { globalVariables } from "../GlobalStyles";

interface SwiperButtonProps {
  title: string;
  width?: number;
  height?: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function SwiperButton({
  title,
  width = 260,
  height = 50,
  ...props
}: SwiperButtonProps): JSX.Element {
  return (
    <TouchableWithoutFeedback style={props.style} onPress={props.onPress}>
      <LinearGradient
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        colors={[globalVariables.primaryOne, globalVariables.primaryTwo]}
        style={{ width, height, borderRadius: 50, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: height / 2.5,
            fontFamily: "Montserrat_600SemiBold",
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "transparent",
          }}>
          {title.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}