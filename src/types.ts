import { Locale as ExpoLocale } from 'expo-localization';
import { ReactNode } from 'react';

export type IconProps = {
	size?: number;
	color?: string;
};

export const Locales = [
	'en',
	'es',
	'fr',
	'it',
	'de',
	'zh',
	'ar',
	'ko',
	'ja',
	'ur',
	'pl',
	'ca',
	'gl',
	'eu',
	'pt',
	'hi',
] as const;
export type Locale = (typeof Locales)[number];
export type LocaleData = {
	plurals: (n: number | string, ord?: boolean) => string;
};

export type TextDirection = ExpoLocale['textDirection'];

export type ComponentWithChildren = {
	children: ReactNode;
};

export type YoutubeData = {
	responseContext: any;
	playabilityStatus: PlayabilityStatus;
	streamingData: StreamingData;
	captions: Captions;
	videoDetails: VideoDetails;
	playerConfig: PlayerConfig;
};

export type PlayabilityStatus = {
	status: string;
	playableInEmbed: boolean;
	miniplayer: {
		miniplayerRenderer: {
			playbackMode: string;
		};
	};
	contextParams: string;
};

export type StreamingData = {
	expiresInSeconds: string;
	formats: Format[];
	adaptiveFormats: AdaptiveFormat[];
	serverAbrStreamingUrl: string;
};

export type Format = {
	itag: number;
	url: string;
	mimeType: string;
	bitrate: number;
	width: number;
	height: number;
	lastModified: string;
	contentLength: string;
	quality: string;
	fps: number;
	qualityLabel: string;
	projectionType: string;
	averageBitrate: number;
	audioQuality: string;
	approxDurationMs: string;
	audioSampleRate: string;
	audioChannels: number;
	signatureCipher?: string;
};

export type AdaptiveFormat = {
	itag: number;
	url: string;
	mimeType: string;
	bitrate: number;
	width: number;
	height: number;
	initRange: Range;
	indexRange: Range;
	lastModified: string;
	contentLength: string;
	quality: string;
	fps: number;
	qualityLabel: string;
	projectionType: string;
	averageBitrate: number;
	approxDurationMs: string;
	signatureCipher?: string;
};

export type Range = {
	start: string;
	end: string;
};

export type Captions = {
	playerCaptionsTracklistRenderer: {
		captionTracks: CaptionTrack[];
		audioTracks: AudioTrack[];
		translationLanguages: TranslationLanguage[];
		defaultAudioTrackIndex: number;
	};
};

export type CaptionTrack = {
	baseUrl: string;
	name: {
		simpleText: string;
	};
	vssId: string;
	languageCode: string;
	kind: string;
	isTranslatable: boolean;
	trackName: string;
};

export type AudioTrack = {
	captionTrackIndices: number[];
};

export type TranslationLanguage = {
	languageCode: string;
	languageName: {
		simpleText: string;
	};
};

export type VideoDetails = {
	videoId: string;
	title: string;
	lengthSeconds: string;
	keywords: string[];
	channelId: string;
	isOwnerViewing: boolean;
	shortDescription: string;
	isCrawlable: boolean;
	thumbnail: {
		thumbnails: Thumbnail[];
	};
	allowRatings: boolean;
	viewCount: string;
	author: string;
	isPrivate: boolean;
	isUnpluggedCorpus: boolean;
	isLiveContent: boolean;
};

export type Thumbnail = {
	url: string;
	width: number;
	height: number;
};

export type PlayerConfig = {
	audioConfig: {
		loudnessDb: number;
		perceptualLoudnessDb: number;
		enablePerFormatLoudness: boolean;
	};
	streamSelectionConfig: {
		maxBitrate: string;
	};
	mediaCommonConfig: {
		dynamicReadaheadConfig: {
			maxReadAheadMediaTimeMs: number;
			minReadAheadMediaTimeMs: number;
			readAheadGrowthRateMs: number;
		};
		mediaUstreamerRequestConfig: {
			videoPlaybackUstreamerConfig: string;
		};
		serverPlaybackStartConfig: {
			enable: boolean;
			playbackStartPolicy: {
				startMinReadaheadPolicy: [
					{
						minReadaheadMs: number;
					},
				];
			};
		};
	};
	webPlayerConfig: {
		useCobaltTvosDash: boolean;
		webPlayerActionsPorting: {
			getSharePanelCommand: PanelCommand & {
				webPlayerShareEntityServiceEndpoint: {
					serializedShareEntity: string;
				};
			};
			subscribeCommand: PanelCommand & {
				subscribeEndpoint: SubscriptionEndpoint;
			};
			unsubscribeCommand: PanelCommand & {
				unsubscribeEndpoint: SubscriptionEndpoint;
			};
			addToWatchLaterCommand: PanelCommand & {
				playlistEditEndpoint: {
					playlistId: string;
					actions: [
						{
							addedVideoId: string;
							action: string;
						},
					];
				};
			};
			removeFromWatchLaterCommand: PanelCommand & {
				playlistEditEndpoint: {
					playlistId: string;
					actions: [
						{
							action: string;
							removedVideoId: string;
						},
					];
				};
			};
		};
	};
};

export type PanelCommand = {
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: boolean;
			apiUrl: string;
		};
	};
};

export type SubscriptionEndpoint = {
	channelIds: string[];
	params: string;
};

export type YoutubeResponse = {
	page: string;
	rootVe: string;
	player_response: YoutubeData;
};
