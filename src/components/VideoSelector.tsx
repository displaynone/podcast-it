import { Trans } from '@lingui/macro';
import { FC, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../colors';
import { LogoIcon } from '../icons/LogoIcon';
import { getInfo } from '../lib/YouTubeStreamUrl';
import { YoutubeInfoThumbnail } from '../types';
import MusicPlayer from './MusicPlayer';
import VideoLoading from './VideoLoading';

export type YoutubeTrack = {
  cover: YoutubeInfoThumbnail;
  track: Track;
  id: string;
};

const VideoSelector: FC = () => {
  const [step, setStep] = useState(1);
  const [tracks, setTracks] = useState<YoutubeTrack[]>([]);

  const handleLoadVideo = (url: string) => {
    setStep(2);
    if (!tracks.length && url) {
      getInfo({ url }).then(async video => {
        if (video) {
          const thumbnail = video.videoDetails.thumbnail.thumbnails.reduce(
            (prev, curr) => (prev.width > curr.width ? prev : curr),
          );
          const audios = video.formats
            .filter(format => format.mimeType?.match(/audio/))
            .map(
              audio =>
                ({
                  track: {
                    url: audio.url,
                    title: video.videoDetails.title,
                    artist: video.videoDetails.author,
                    artwork: thumbnail.url,
                  },
                  cover: thumbnail,
                  id: video.videoDetails.videoId,
                }) as YoutubeTrack,
            );
          setTracks(audios);
          setStep(3);
          // FileSystem.createDownloadResumable(
          //   audios[0].url as string,
          //   FileSystem.documentDirectory + 'small.mp4',
          //   { 'User-Agent': 'Mozilla/5.0', 'accept-language': 'en-US,en', 'Range': 'bytes=0-99999999999' },
          //   currentProgress =>
          //     setProgress(
          //       (currentProgress.totalBytesWritten * 100) /
          //         currentProgress.totalBytesExpectedToWrite,
          //     ),
          // )
          //   .downloadAsync()
          //   .then(res => {
          //     setProgress(100);
          //     if (res?.uri) {
          //       audios[0].url = res.uri;
          //       setPodcasts(audios);
          //     }
          //   });
        }
      });
    }
  };

  const reset = () => {
    TrackPlayer.clearNowPlayingMetadata().then(() => {
      TrackPlayer.reset().then(() => {
        setTracks([]);
        setStep(1);
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon size={60} />
        <Text style={styles.heading}>
          <Trans>Podcast It</Trans>
        </Text>
      </View>
      {!!tracks.length && (
        <>
          <TouchableOpacity style={styles.backButton} onPress={() => reset()}>
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={colors.lightGray}
            />
            <Text style={styles.default}>
              <Trans>Select another song</Trans>
            </Text>
          </TouchableOpacity>
          <MusicPlayer podcasts={tracks} />
        </>
      )}
      {!tracks.length && (
        <VideoLoading step={step} handleLoadVideo={handleLoadVideo} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    padding: 24,
    gap: 24,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.orange,
    fontFamily: 'Roboto_900Black',
  },
  default: {
    color: colors.lightGray,
    fontFamily: 'Roboto_400Medium',
    fontWeight: '400',
    flexShrink: 1,
  },
  backButton: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});

export default VideoSelector;
