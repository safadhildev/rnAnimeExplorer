import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { BLACK, GREY_DARK, RED, WHITE } from '../../components/common/colors';
import MyButton from '../../components/common/MyButton';
import MyChip from '../../components/common/MyChip';
import MyHeader, { HEADER_TYPE } from '../../components/common/MyHeader';
import MyText from '../../components/common/MyText';
import Space from '../../components/common/Space';
import { BUTTON_TYPE, UNKNOWN } from '../../components/constants';
import { AnimeContext } from '../../context/animeContext';
import tags from '../../components/constants/tags';
import { getTagColors } from '../../utils';
import SplashOverlay from '../../components/SplashOverlay';
import ParallaxImage from '../../components/ParallaxImage';

const StickyHeader = ({ data }) => {
  const theme = useTheme();

  return (
    <View style={styles.contentHeaderContainer(theme)}>
      <View style={styles.contenHeaderRowWrapper}>
        <MyHeader
          text={data?.title}
          containerStyle={styles.headerContainer}
          style={styles.headerText}
        />
        <MyChip
          text={data?.score}
          icon={'star'}
          accent={'#FFB300'}
          color={'#FFE082'}
        />
      </View>
      <MyText>{data?.title_japanese}</MyText>
    </View>
  );
};

const AnimeDetails = () => {
  const theme = useTheme();

  const { width: fullWidth, height: fullHeight } = useWindowDimensions();

  const navigation = useNavigation();

  const { params } = useRoute();

  const { getAnimeById, getIsAnimeFavourited, onFavouriteAnime } =
    useContext(AnimeContext);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(true);

  const _handleNavigateBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  const _handleToggleFavourite = async () => await onFavouriteAnime(data);

  const _handleShare = async () => {
    try {
      await Share.share({
        message: data?.url,
      });
    } catch (error) {
      console.error('[DEBUG] >> _handleShare >> ');
    }
  };

  const _getAnimeDetails = async () => {
    setIsLoading(true);
    const { animeId } = params;
    const result = await getAnimeById(animeId);
    setData(result?.data);
    // setError(result?.error);
    setIsLoading(false);
  };

  useEffect(() => {
    _getAnimeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Double tap!');
    });

  const _renderImage = () => {
    return (
      <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
        <View style={{ height: fullHeight + 50, backgroundColor: BLACK }}>
          <ParallaxImage
            layers={[
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 300,
                  left: 100,
                  right: 100,
                }}
              >
                <MyHeader
                  text={data?.title}
                  type={HEADER_TYPE.HEADING}
                  style={{ color: WHITE }}
                />
                <MyText style={{ color: WHITE }}>{data?.title_japanese}</MyText>
              </View>,
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  position: 'absolute',
                  top: -100,
                  bottom: -100,
                  left: -100,
                  right: -100,
                }}
              />,
              <Image
                source={{ uri: data?.images?.webp?.large_image_url }}
                style={styles.imageScreen}
              />,
            ]}
          />
          <MyText
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              justifyContent: 'flex-end',
              alignItems: 'center',
              textAlign: 'center',
              opacity: 0.5,
              color: WHITE,
            }}
          >
            Scroll Down To View Details
          </MyText>
        </View>
      </GestureDetector>
    );

    // return (
    //   <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
    //     <View style={{ height: fullHeight + 50, backgroundColor: BLACK }}>
    //       <Image
    //         source={{ uri: data?.images?.webp?.large_image_url }}
    //         style={styles.imageScreen}
    //       />
    //     </View>
    //   </GestureDetector>
    // );
  };

  const _renderShortInfo = (key, value) => {
    return (
      <MyText style={styles.shortInfo}>
        {key}
        {value}
      </MyText>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.contentContainer(theme, fullHeight)}>
        <ScrollView
          //   showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentWrapper}
          stickyHeaderIndices={[0, 2, 5]}
        >
          {/* HEADER - INDEX 0 */}
          {<StickyHeader data={data} />}
          {/* QUICKINFO - INDEX 1 */}
          <View style={styles.quickInfoContainer}>
            <View style={styles.quickInfoWrapper}>
              {_renderShortInfo('Type: ', data?.type ?? UNKNOWN)}
              {_renderShortInfo('Year: ', data?.year ?? UNKNOWN)}
              {_renderShortInfo('Episode(s): ', data?.episodes ?? UNKNOWN)}
              {_renderShortInfo('Year: ', data?.year ?? UNKNOWN)}
              {_renderShortInfo(
                'Status: ',
                (data?.airing ? 'Airing' : 'Ended') ?? UNKNOWN,
              )}
            </View>
            <View style={styles.line(theme)} />
            {data?.genres?.length > 0 && (
              <View style={styles.tagContainer}>
                {data?.genres?.map(tag => {
                  console.log('[DEBUG] >> tag >> ', { tag });

                  const tagColors = getTagColors(tag);

                  return (
                    <MyChip
                      text={tag?.name}
                      color={tagColors?.color}
                      accent={tagColors?.accent}
                    />
                  );
                })}
              </View>
            )}
          </View>
          {/* BACKGROUND - INDEX 2 & 3 */}
          <MyHeader
            text="Background"
            type={HEADER_TYPE.SECTION}
            containerStyle={styles.sectionHeaderContainer(theme)}
            style={styles.headerText}
          />
          <MyText>{data?.background || 'Not Available'}</MyText>
          <Space size={30} />
          {/* SYNOPSIS - INDEX 5 & 6 */}
          <MyHeader
            text="Synopsis"
            type={HEADER_TYPE.SECTION}
            containerStyle={styles.sectionHeaderContainer(theme)}
            style={styles.headerText}
          />
          <MyText>{data?.synopsis}</MyText>
          {/* CTA - BOTTOM */}
          <View style={styles.ctaContainer}>
            <MyButton
              containerStyle={{ flex: 1, height: 40, minWidth: 40 }}
              onPress={_handleShare}
              text="share"
              type={BUTTON_TYPE.POSITIVE}
              icon="share-variant"
            />
            <MyButton
              hideBorder
              hideBackground
              onPress={_handleToggleFavourite}
              icon={isFavourited ? 'heart' : 'heart-outline'}
              iconSize={30}
              iconColor={RED}
              containerStyle={{ width: 40 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const _renderBackButton = () => {
    return (
      <MyButton
        hideBorder
        circle
        onPress={_handleNavigateBack}
        icon="arrow-left"
        iconSize={30}
        iconColor={theme?.colors?.text}
        containerStyle={{ width: 40, height: 40 }}
      />
    );
  };

  if (isLoading) {
    return <SplashOverlay />;
  }

  const isFavourited = getIsAnimeFavourited(data?.mal_id);

  return (
    <>
      <View style={styles.headerCtaWrapper}>{_renderBackButton()}</View>
      <ScrollView
        snapToAlignment="end"
        snapToInterval={fullHeight + 25 - StatusBar.currentHeight}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {_renderImage()}
        {_renderContent()}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imageScreen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
    zIndex: 0,
  },
  imageScreenTopWraper: theme => ({
    backgroundColor: theme?.colors?.card,
    padding: 5,
  }),
  headerCtaWrapper: {
    position: 'absolute',
    top: StatusBar.currentHeight + 15,
    left: 15,
    right: 15,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: (theme, fullHeight) => ({
    height: fullHeight - StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + 30,
    backgroundColor: theme?.colors?.card,
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }),
  contentWrapper: {
    paddingBottom: 150,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: 'scroll',
  },
  line: theme => ({
    height: 1,
    width: '100%',
    backgroundColor: theme?.colors?.border,
    marginVertical: 10,
  }),
  quickInfoContainer: {
    marginVertical: 20,
  },
  quickInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  //   HEADER
  contentHeaderContainer: theme => ({
    backgroundColor: theme?.colors?.card,
    paddingBottom: 10,
  }),
  contenHeaderRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  headerText: { lineHeight: 24 },
  // Short Info
  shortInfo: {
    minWidth: '33%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: GREY_DARK,
    marginBottom: 10,
  },
  // TAG
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagWrapper: theme => ({
    backgroundColor: theme?.colors?.card,
    borderWidth: 1,
    borderColor: theme?.colors?.border,
    paddingHorizontal: 5,
    borderRadius: 5,
  }),
  tagText: {
    color: GREY_DARK,
  },
  // SUBHEADER
  sectionHeaderContainer: theme => ({
    backgroundColor: theme?.colors?.card,
    paddingHorizontal: 0,
  }),
  // CTA SECTION
  ctaContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default AnimeDetails;
