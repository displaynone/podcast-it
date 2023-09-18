import { FC, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput } from 'react-native';
import { colors } from '../colors';
import { YoutubeInfoThumbnail } from '../types';

type VideoLoadingProps = {
  step: number;
  handleLoadVideo: (url: string) => void;
};

const VideoLoading: FC<VideoLoadingProps> = ({ step, handleLoadVideo }) => {
  const [url, setUrl] = useState<string>('');

  return (
    <>
      {step === 1 && (
        <>
          <Text style={styles.label}>YouTube URL</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={text => setUrl(text)}
          />
          <Button
            title="Load video"
            color={colors.orange}
            onPress={() => handleLoadVideo(url)}
          />
        </>
      )}
      {step === 2 && <Text style={styles.default}>Loading video data...</Text>}
      {/* {step === 3 && (
        <>
          {cover && (
            <Image
              source={cover.url}
              contentFit="contain"
              style={{
                ...styles.image,
                height:
                  ((Dimensions.get('window').width - 48) * cover.height) /
                  cover.width,
              }}
            />
          )}
          <View style={styles.info}>
            <Text style={styles.title}>{tracks[0].title}</Text>
            <Text style={styles.artist}>by {tracks[0].artist}</Text>
          </View>
          <View style={styles.warning}>
            <WarningIcon />
            <Text style={styles.default}>
              Please be patient as the YouTube audio is being downloaded for
              later playback; this process may take a while...
            </Text>
          </View>
          {!progress && (
            <Text style={styles.default}>
              Waiting for stream to download...
            </Text>
          )}
          {!!progress && (
            <View style={styles.info}>
              <Text style={styles.default}>Downloading...</Text>
              <Progress percent={progress} />
            </View>
          )}
        </>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.lightGray,
    fontWeight: '500',
    fontFamily: 'Roboto_500Medium',
  },
  input: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    padding: 8,
    color: colors.lightGray,
  },
  default: {
    color: colors.lightGray,
    fontFamily: 'Roboto_400Medium',
    fontWeight: '400',
    flexShrink: 1,
  },
  // info: {
  //   gap: 8,
  // },
  // title: {
  //   fontSize: 16,
  //   color: colors.white,
  //   fontWeight: '500',
  //   fontFamily: 'Roboto_500Medium',
  // },
  // artist: {
  //   fontSize: 14,
  //   color: colors.lightGray,
  //   fontWeight: '400',
  //   fontFamily: 'Roboto_$00Medium',
  // },
  // image: {
  //   width: Dimensions.get('screen').width - 48,
  //   borderRadius: 10,
  // },
  // warning: {
  //   flexDirection: 'row',
  //   gap: 8,
  //   alignItems: 'center',
  // },
});

export default VideoLoading;
