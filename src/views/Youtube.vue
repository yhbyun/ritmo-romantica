<template>
    <div class="p-2 w-full h-full">

        <div id="controls" class="hidden absolute pin-x pin-t w-full text-center pt-4">
            <button id="pause" title="Pause Video" class="btn btn-blue">||</button>
            <button id="play" title="Start Video" class="btn btn-blue">&#9658;</button>
            <button id="pauseNstart" title="Pause N Start" class="btn btn-blue">||&#9658;</button>
        </div>

        <webview :src="url"
            class="w-full h-full"
            :preload="preload"
            allowpopups
            ></webview>
    </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron'

export default {
    name: 'youtube',
    data: function () {
        return {
            preload: `file:${require('path').resolve(__static, './youtube-inject.js')}`,
        }
    },
    computed: {
        url () {
            if (this.$route.query.search_query) {
                return `https://www.youtube.com/results?search_query=${this.$route.query.search_query}`
            } else {
                return 'https://www.youtube.com/'
            }
        },
    },
    mounted () {
        const webview = document.querySelector('webview')

        webview.addEventListener('dom-ready', () => {
            if (remote.process.env.NODE_ENV && remote.process.env.NODE_ENV !== 'production') {
                webview.openDevTools()
            }
        })

        ipcRenderer.on('play-control', (event, message) => {
            if (message === 'play') {
                webview.executeJavaScript('__myYoutubeTools.playVideo()')
            } else if (message === 'pause') {
                webview.executeJavaScript('__myYoutubeTools.pauseVideo()')
            }
        })

        document.querySelector('#pause').onclick = function() {
            webview.executeJavaScript('__myYoutubeTools.pauseVideo()')
        }

        document.querySelector('#play').onclick = function() {
            webview.executeJavaScript('__myYoutubeTools.playVideo()')
        }

        document.querySelector('#pauseNstart').onclick = function() {
            webview.executeJavaScript('__myYoutubeTools.playNpauseVideo()')
        }
    }
}
</script>

<style scoped>
    .btn {
        @apply font-bold py-2 px-4 m-1 rounded;
    }
    .btn-blue {
        @apply bg-blue text-white;
    }
    .btn-blue:hover {
        @apply bg-blue-dark;
    }
</style>