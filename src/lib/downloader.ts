import ytdl from 'ytdl-core';
import fs from 'fs';

/**
 * Download mp3 audio from an YouTube URL.
 *
 * @param {String} youtubeUrl YouTube video URL.
 * @param {String} filePath Absolute filepath where audio file should be saved.
 */
export const downloadAsAudio = (youtubeUrl: string, filePath: string) => {
  return new Promise(async resolve => {
    ytdl(youtubeUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
    })
      .pipe(fs.createWriteStream(filePath))
      .on('finish', () => resolve(1));
  });
};
