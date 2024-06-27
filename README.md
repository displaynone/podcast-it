# Podcast It

<img src="./assets/icon.png" width="150" />

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)

## Overview

"Podcast It" is an Android app that allows users to convert YouTube video URLs into podcasts. Simply input a YouTube URL, and the app will play only the audio track, allowing you to listen to it like a podcast.

This project is inspired by [this tutorial](https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-2-android-8987e374f965).

<table>
<tr>
<td>
<img src="./assets/img/screenshot_01.png" />
</td>
<td>
<img src="./assets/img/screenshot_02.png" />
</td>
</tr>
</table>

## Features

- Convert YouTube URLs to audio tracks
- Play audio in the background
- Control audio playback via lock screen controls

## Installation

Clone the repository:

```bash
git clone https://github.com/displaynone/podcast-it.git
cd podcast-it
```

Install the dependencies:

```bash
npm install
# or
yarn install
```

Run the app:

```bash
npm run android
```

## Usage

- Open the app
- Input a YouTube URL into the input field
- Press the "Load video" button
- Enjoy your podcast

## Versión 2.0.0

En esta versión, tuve que cambiar la forma en que se recuperaban los datos de los videos. Desde 2024, he tenido problemas con las URLs, y no sé por qué, pero si el proyecto estaba expulsado (`ejected`), las firmas de las URLs eran incorrectas. El mismo código funcionaba bien con Expo, pero al expulsar el proyecto, fallaba. Y necesitaba estar expulsado para poder usar `TrackPlayer`.

Después de varias semanas intentando solucionar el problema, decidí implementar un servidor que proporcione la información necesaria. Utilicé el siguiente script para ello:

```javascript
const ytdl = require("ytdl-core");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.post("/", (req, res) => {
    console.log(req.body);
    const videoId = ytdl.getURLVideoID(req.body.url);
    console.log(videoId);
    ytdl.getInfo(videoId).then((info) => {
        let format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
        res.json(info);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
```

Solo necesitas configurar el servidor en la variable de entorno llamada `YOUTUBE_EXTERNAL_API`.