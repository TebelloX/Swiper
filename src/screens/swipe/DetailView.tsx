import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import { AppendType, TmdbService } from "../../services/TmdbService";
import {
  ImagePosterSize,
  ImageProfileSize,
  MovieResponse,
} from "../../contracts/TmdbTypes";
// import Image from "react-native-scalable-image";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { SCREEN_WIDTH } from "../../utils/Utils";
import { getHexColorWithAlpha, globalVariables } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

interface DetailViewProps {
  // movie?: MovieResponse & AppendType;
  buttonBarHeight?: number;
  movie: (MovieResponse & AppendType) | null | undefined;
}

const DetailView = ({ movie, ...props }: DetailViewProps): JSX.Element => {
  const [playing, setPlaying] = useState(false);

  const youtubePlayerRef = useRef<YoutubeIframeRef>(null);

  const animatables = {
    generalInfo: useRef<Animatable.View & View>(null),
    cast: useRef<Animatable.View & View>(null),
    crew: useRef<Animatable.View & View>(null),
    rest: useRef<Animatable.View & View>(null),
  };

  // const [movie, setMovie] = useState<(MovieResponse & AppendType) | null>(null);

  useEffect(() => {
    // console.log(movie);
    // for (const key in animatables) {
    //   if (Object.prototype.hasOwnProperty.call(animatables, key)) {
    //     const element: React.MutableRefObject<Animatable.View & View> =
    //       animatables[key];
    //     // console.log("Current", element.current);
    //     element?.current?.slideInUp(2000);
    //   }
    // }
  }, [movie]);

  const onStateChange = useCallback(state => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const Description = (props: {
    alignMode: "center" | "left";
    marginLeft: number;
  }): JSX.Element => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 5,
      }}>
      <Text
        style={{
          fontSize: 15,
          fontFamily: globalVariables.montserrat300Light,
          color: getHexColorWithAlpha(globalVariables.light, 60),
          textAlign: props.alignMode,
          marginLeft: props.marginLeft,
          marginRight: props.marginLeft,
        }}>
        {movie?.overview}
      </Text>
    </View>
  );

  const Line = (props: { color: string; borderWidth: number }) => (
    <View
      style={{
        zIndex: 200,
        borderBottomColor: props.color,
        borderBottomWidth: props.borderWidth,
      }}
    />
  );

  const PersonCard = ({
    size = 65,
    imageSize = size - 10,
    borderRadius = 10,
    fontSize = 13,
    marginTopBottom = 10,
    marginLeft = 7,
    ...props
  }: {
    borderRadius?: number;
    name: string;
    role: string;
    profile_path: string;
    size?: number;
    imageSize?: number;
    containerStyle?: StyleProp<ViewStyle>;
    fontSize?: number;
    marginTopBottom?: number;
    marginLeft?: number;
  }): JSX.Element => (
    <View
      style={[
        {
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          marginLeft: marginLeft,

          marginTop: marginTopBottom,
          marginBottom: marginTopBottom,
        },
        props.containerStyle,
      ]}>
      {props.profile_path ? (
        <Image
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: borderRadius,
            resizeMode: "cover",
          }}
          source={TmdbService.getImageSource<ImageProfileSize>(
            props.profile_path,
            "w185"
          )}></Image>
      ) : (
        <></>
      )}
      {!props.profile_path ? (
        <View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: borderRadius,
            backgroundColor: globalVariables.grey,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: globalVariables.montserrat500Medium,
              color: getHexColorWithAlpha(globalVariables.light, 30),
            }}>
            {props.name
              .split(" ")
              .map(w => w[0])
              .join("")}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          width: size,
        }}>
        <Text
          style={{
            fontSize: fontSize,
            color: getHexColorWithAlpha(globalVariables.light, 60),
            fontFamily: globalVariables.montserrat400Regular,
            textAlign: "center",
          }}>
          {props.name}
        </Text>
        <Text
          style={{
            fontSize: fontSize - 2,
            color: getHexColorWithAlpha(globalVariables.light, 45),
            fontFamily: globalVariables.montserrat300Light,
            textAlign: "center",
          }}>
          {props.role}
        </Text>
      </View>
    </View>
  );

  const PersonList = ({
    height = 200,
    border = "top",
    borderWidth = 1,
    ...props
  }: {
    marginTop?: number;
    title: string;
    children: JSX.Element;
    borderWidth?: number;
    height?: number;
    border?: "bottom" | "top" | "none";
    containerStyle?: StyleProp<ViewStyle>;
  }): JSX.Element => (
    <Animatable.View
      ref={animatables.cast}
      animation={"slideInUp"}
      duration={1000}
      style={[
        {
          position: "relative",
          padding: 20,
          width: "100%",
          height: height,
          alignItems: "center",
          justifyContent: "center",
          // borderWidth: 3,
        },
        border === "bottom" && {
          // paddingBottom: 10,
          borderTopColor: getHexColorWithAlpha(globalVariables.light, 20),
          borderWidth,
        },
        border === "top"
          ? {
              // paddingTop: 10,
              borderTopColor: getHexColorWithAlpha(globalVariables.light, 100),
              borderWidth,
            }
          : {},
        props.containerStyle,
      ]}>
      <View style={{ position: "absolute", left: 0, top: 0 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: globalVariables.montserrat400Regular,
            color: getHexColorWithAlpha(globalVariables.light, 20),
            marginLeft: globalVariables.textMarginLeft,
          }}>
          {props.title}
        </Text>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="normal"
          snapToOffsets={[0]}
          snapToStart={false}
          snapToEnd={false}
          horizontal={true}
          indicatorStyle={"black"}>
          {props.children}
        </ScrollView>
      </View>
    </Animatable.View>
  );

  const GeneralInfo = ({
    height,
    border = false,
    borderColor = globalVariables.grey,
    alignMode = "left",
    includeDescription = true,
    ...props
  }: {
    height: 200 | 250;
    imagePadding?: number;
    border?: boolean;
    borderColor?: string;
    includeDescription?: boolean;
    alignMode?: "left" | "center";
    style?: StyleProp<ViewStyle>;
  }): JSX.Element => (
    <Animatable.View
      style={[props.style]}
      ref={animatables.generalInfo}
      animation={"slideInUp"}
      duration={1000}>
      <View style={[styles.info_wrapper, { height: height, borderRadius: 2 }]}>
        <View
          style={[
            styles.infos,
            border && {
              borderColor: borderColor,
              borderWidth: 2,
              padding: 15,
              borderRadius: 4,
            },
            { borderRadius: 4 },
          ]}>
          <Text
            style={{
              fontSize: 30 - Math.max((movie?.title?.length ?? 15) - 15, 0) / 3,
              //fontSize calculation algorithm, so long titles get scaled down, 15 characters is the threshold for scaling
              fontFamily: globalVariables.montserrat600SemiBold,
              color: globalVariables.light,
              textAlign: alignMode,
            }}>
            {movie?.title}
          </Text>

          <View style={alignMode === "center" && { alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: globalVariables.light,
                fontFamily: globalVariables.montserrat300Light,
              }}>
              Directed By
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: globalVariables.light,
                fontFamily: globalVariables.montserrat500Medium,
              }}>
              {movie?.credits?.crew?.find(c => c.job == "Director")?.name ??
                movie?.credits?.crew?.find(c => c.job.includes("Director"))
                  ?.name}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontSize: 20,
                color: globalVariables.light,
                fontFamily: globalVariables.montserrat200ExtraLight,
              }}>
              {new Date(movie?.release_date)?.getFullYear()?.toString()}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: globalVariables.light,
                fontFamily: globalVariables.montserrat200ExtraLight,
                marginRight: 10,
              }}>
              {`${movie?.runtime?.toString()}m`}
            </Text>
          </View>
        </View>

        <Image
          style={{
            padding: height === 250 ? 20 : 0,
            margin: height === 250 ? 10 : 0,
            // marginRight: height === 200 ? 10 : 0,

            flex: 1,
            borderRadius: 2,
            resizeMode: "contain",

            width: TmdbService.getBackdropDimensions({
              height: height,
            }).width,
            height: height,
          }}
          source={TmdbService.getImageSource<ImagePosterSize>(
            movie?.poster_path,
            "w185"
          )}></Image>
      </View>
      {includeDescription && (
        <Description
          alignMode={alignMode}
          marginLeft={globalVariables.textMarginLeft}></Description>
      )}
    </Animatable.View>
  );

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40, //To correct the inconsisten screenHeight shit
        }}>
        <GeneralInfo
          height={200}
          alignMode={"left"}
          includeDescription={true}></GeneralInfo>
        <Line color={globalVariables.grey} borderWidth={2}></Line>
        <PersonList
          title={"Cast"}
          containerStyle={{ marginTop: 15 }}
          border={"none"}>
          <>
            {movie?.credits?.cast.slice(0, 15).map(c => (
              <PersonCard
                name={c.name}
                role={c.character}
                profile_path={c.profile_path}
                key={c.credit_id}
                size={70}
                marginTopBottom={15}
                marginLeft={5}
                borderRadius={10}></PersonCard>
            ))}
          </>
        </PersonList>

        <PersonList title={"Crew"} border={"none"} height={220}>
          <>
            {TmdbService.getOrderedCrewWithGroupedJobs(
              movie?.credits?.crew,
              15
            ).map(c => (
              <PersonCard
                name={c.name}
                role={c.job}
                profile_path={c.profile_path}
                key={c.credit_id}
                size={70}
                marginTopBottom={15}
                marginLeft={5}
                borderRadius={10}></PersonCard>
            ))}
          </>
        </PersonList>

        {/* <BackdropImage></BackdropImage> */}
        <View>
          <YoutubePlayer
            ref={youtubePlayerRef}
            initialPlayerParams={{}}
            webViewStyle={{}}
            height={250}
            width={400}
            play={playing}
            videoId={TmdbService.extractYoutubeTrailerKey(movie)}
            onChangeState={onStateChange}
          />
        </View>
        <View style={{ height: props.buttonBarHeight ?? 80 }}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop_image: {},
  info_wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    // flexShrink: 2,
  },
  infos: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: globalVariables.textMarginLeft,
  },
  poster_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingLeft: 10,
    // paddingBottom: 10,
    // borderColor: "green",
    // borderBottomWidth: 2,
    // borderColor: globalVariables.grey,
    width: SCREEN_WIDTH,
    zIndex: -3,
  },
  scrollContent: {
    paddingRight: 30,
  },
});

export default DetailView;
