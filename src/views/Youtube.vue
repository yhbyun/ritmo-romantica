<template>
    <div class="p-2 w-full h-full">

        <div id="controls" class="absolute pin-x pin-t w-full text-center pt-4">
            <button id="pause" title="Pause Video" class="btn btn-blue">||</button>
            <button id="play" title="Start Video" class="btn btn-blue">&#9658;</button>
            <button id="pauseNstart" title="Pause N Start" class="btn btn-blue">||&#9658;</button>
        </div>

        <webview src="https://www.youtube.com/watch?v=1osdnKzj-1k"
            class="w-full h-full"
            :preload="preload"
            allowpopups
            ></webview>
    </div>
</template>

<script>
export default {
    name: 'youtube',
    data: function () {
        return {
            preload: `file:${require('path').resolve(__static, './youtube-inject.js')}`
        }
    },
    mounted () {
        const webview = document.querySelector('webview')
        /*
        webview.addEventListener("ipc-message", (event) => {
            console.log("channel: " + event.channel)
        })
        */

        webview.addEventListener('dom-ready', () => {
            webview.openDevTools()
            // webview.send("ping")

            webview.executeJavaScript('__myYoutubeTools.pauseVideo()')
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