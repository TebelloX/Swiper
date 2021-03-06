import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { globalVariables } from "../../GlobalStyles";
import { scaleFontsize, SCREEN_WIDTH, WINDOW_HEIGHT } from "../../utils/Utils";

interface ImageCardProps {
  source: ImageSourcePropType;
  title: string;
  description?: string;
  withShadow?: boolean;
  withDarkGradient?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function ImageCard({
  withShadow = true,
  withDarkGradient = true,
  ...props
}: ImageCardProps): JSX.Element {
  const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  };

  return (
    <View style={[styles.container, props.style]}>
      <ImageBackground
        source={props.source}
        imageStyle={styles.image}
        style={[withShadow ? shadowStyle : null, styles.imageBackground]}>
        {withDarkGradient && (
          <LinearGradient
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 0.5, y: 1.0 }}
            colors={[
              "rgba(112, 112, 112, 0.2)",
              "rgba(34, 35, 37, 0.2)",
              "rgba(34, 35, 37, 0.5)",
              "rgba(34, 35, 37, 0.88)",
            ]}
            style={styles.darkGradient}></LinearGradient>
        )}
        <View style={styles.galleryControl}></View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                fontSize: scaleFontsize(props.title, 30, 15, 2),
              },
            ]}>
            {props.title}
          </Text>
          {props.description ? (
            <Text
              style={[
                styles.desc,
                {
                  fontSize: 18,
                  // fontSize: scaleFontsize(props.description, 18, 25),
                },
              ]}>
              {props.description}
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#C1C1C1",
    borderRadius: 10,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 10,
    position: "relative",
    zIndex: -1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 10,
  },
  title: {
    color: globalVariables.light,
    fontFamily: globalVariables.montserrat600SemiBold,
    maxWidth: "100%",
  },
  desc: {
    color: globalVariables.light,
    fontFamily: globalVariables.montserrat400Regular,
    maxWidth: "100%",
  },
  textContainer: {
    // height: 100,
    marginLeft: 15,
    marginBottom: 15,
    zIndex: 100,
    width: "95%",
  },
  galleryControl: {},
  darkGradient: {
    height: "100%",
    zIndex: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
    borderRadius: 10,
  },
});
