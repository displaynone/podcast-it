import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import React, { FC, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../colors';
import { timeConversion } from '../utils/timeConversion';
import { YoutuveTrack } from './VideoSelector';

type MusicPlayerProps = {
  podcasts: YoutuveTrack[];
};

const MusicPlayer: FC<MusicPlayerProps> = ({ podcasts }) => {
  const podcastsCount = podcasts.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState<Track['title']>();
  const [trackArtist, setTrackArtist] = useState<Track['artist']>();
  const [trackArtwork, setTrackArtwork] = useState<Track['artwork']>();

  const playBackState = usePlaybackState();
  const progress = useProgress();

  const setupPlayer = async () => {
    try {
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add(podcasts.map(podcast => podcast.track));
      await gettrackdata();
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      if (!track) return;
      const { title, artwork, artist } = track;
      setTrackIndex(event.nextTrack);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const gettrackdata = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    if (!trackIndex) return;
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    setTrackIndex(trackIndex);
    setTrackTitle(trackObject?.title);
    setTrackArtist(trackObject?.artist);
    setTrackArtwork(trackObject?.artwork);
  };

  const togglePlayBack = async (playBackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playBackState === State.Paused || playBackState === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const nexttrack = async () => {
    if (trackIndex < podcastsCount - 1) {
      await TrackPlayer.skipToNext();
      gettrackdata();
    }
  };

  const previoustrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      gettrackdata();
    }
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          {trackArtwork && (
            <Image
              source={trackArtwork as ImageSourcePropType}
              contentFit="contain"
              style={{
                ...styles.image,
                height:
                  ((Dimensions.get('window').width - 48) *
                    podcasts[trackIndex].cover.height) /
                  podcasts[trackIndex].cover.width,
              }}
            />
          )}
        </View>
        <View style={styles.songText}>
          <Text
            style={[styles.songContent, styles.songTitle]}
            numberOfLines={3}
          >
            {trackTitle}
          </Text>
          <Text
            style={[styles.songContent, styles.songArtist]}
            numberOfLines={2}
          >
            {trackArtist}
          </Text>
        </View>
        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor={colors.yellow}
            minimumTrackTintColor={colors.yellow}
            maximumTrackTintColor={colors.white}
            onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
          />
          <View style={styles.progressLevelDuraiton}>
            <Text style={styles.progressLabelText}>
              {timeConversion(progress.position * 1000)}
            </Text>
            <Text style={styles.progressLabelText}>
              {timeConversion((progress.duration - progress.position) * 1000)}
            </Text>
          </View>
        </View>
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={colors.yellow}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : playBackState === State.Connecting
                  ? 'ios-caret-down-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color={colors.yellow}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={colors.yellow}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  mainContainer: {
    // flex: 1,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // imageWrapper: {
  //   alignSelf: 'center',
  //   width: '90%',
  //   height: '50%',
  //   borderRadius: 15,
  // },
  songText: {
    marginTop: 2,
    height: 70,
  },
  songContent: {
    // textAlign: 'center',
    color: colors.lightGray,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Roboto_500Medium',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Roboto_300Light',
  },
  progressBar: {
    alignSelf: 'stretch',
    // marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  progressLevelDuraiton: {
    width: width,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: colors.white,
  },
  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 20,
    // marginBottom: 20,
    width: '60%',
  },
  image: {
    width: Dimensions.get('screen').width - 48,
    borderRadius: 10,
  },
});
