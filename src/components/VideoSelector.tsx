import { Trans } from '@lingui/macro';
import { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../colors';
import { LogoIcon } from '../icons/LogoIcon';
import { AdaptiveFormat, YoutubeResponse } from '../types';
import MusicPlayer from './MusicPlayer';
import VideoLoading from './VideoLoading';
import Constants from 'expo-constants';

export type YoutubeInfoThumbnail = {
	url: string;
	width: number;
	height: number;
};

export type YoutubeTrack = {
	cover: YoutubeInfoThumbnail;
	track: Track;
	id: string;
};

const VideoSelector: FC = () => {
	const [step, setStep] = useState(1);
	const [tracks, setTracks] = useState<YoutubeTrack[]>([]);

	const apiUrl: string = Constants.expoConfig?.extra?.youtubeApiUrl || '';

	const handleLoadVideo = (url: string) => {
		setStep(2);
		if (!tracks.length && url) {
			fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url }),
			})
				.then(response => response.json())
				.then((response: YoutubeResponse) => {
					const info = response.player_response;
					const format = info.streamingData.adaptiveFormats
						.filter(format => format.mimeType.match(/^audio/))
						.reduce((result: AdaptiveFormat, item: AdaptiveFormat) => {
							return result?.bitrate > item.bitrate ? result : item;
						});
					const thumbnail =
						info.videoDetails.thumbnail.thumbnails[
							info.videoDetails.thumbnail.thumbnails.length - 1
						];
					const track: YoutubeTrack = {
						track: {
							url: format.url,
							title: info.videoDetails.title,
							artist: info.videoDetails.author,
							artwork: thumbnail.url,
						},
						cover: thumbnail,
						id: info.videoDetails.videoId,
					};
					setTracks([track]);
					setStep(3);
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
						<Ionicons name="arrow-back-outline" size={24} color={colors.lightGray} />
						<Text style={styles.default}>
							<Trans>Select another song</Trans>
						</Text>
					</TouchableOpacity>
					<MusicPlayer podcasts={tracks} />
				</>
			)}
			{!tracks.length && <VideoLoading step={step} handleLoadVideo={handleLoadVideo} />}
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
