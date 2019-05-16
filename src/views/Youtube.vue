<template>
    <div class="p-2 w-full h-full">

        <modal name="download-modal" :clickToClose="false" height="200">
            <progress-bar
                :progress="progress"
                :messageText="progressMessage"
                :completed="downloadCompleted"
                :path="mp3Path"
                @close-modal="$modal.hide('download-modal')"
                />
        </modal>

        <link-input v-if="!showProgressBar && downloadable" @startDownload="startDownload" :url="url"/>

        <!-- for testing
        <button @click="$modal.show('download-modal')">Modal</button>
        -->

        <webview :src="url"
            class="w-full h-full"
            :preload="preload"
            allowpopups
            ></webview>
    </div>
</template>

<script>
/* global __static */

import LinkInput from '@/components/LinkInput.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { remote, ipcRenderer } from 'electron'
import * as path from 'path'
import sanitize from 'sanitize-filename'
import ytdl from 'ytdl-core'
import fs from 'fs-extra'

export default {
    name: 'youtube',
    components: {
        LinkInput, ProgressBar
    },
    data() {
        return {
            preload: `file:${require('path').resolve(__static, './youtube-inject.js')}`,
            showProgressBar: false,
            progress: 0,
            progressMessage: '',
            userDownloadsFolder: localStorage.getItem('userSelectedFolder')
                ? localStorage.getItem('userSelectedFolder')
                : remote.app.getPath('downloads'),
            rateLimitTriggered: false,
            url: this.$route.query.search_query ? `https://www.youtube.com/results?search_query=${this.$route.query.search_query}` : 'https://www.youtube.com/',
            mp3Path: '',
        }
    },
    computed: {
        downloadable() {
            let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
            let match = this.url.match(regExp);

            return match && match[2].length == 11
        },
        downloadCompleted() {
            return this.progrss === 100
        },
    },
    mounted() {
        const webview = document.querySelector('webview')

        webview.addEventListener('dom-ready', () => {
            if (remote.process.env.NODE_ENV && remote.process.env.NODE_ENV !== 'production') {
                webview.openDevTools()
            }
        })

        webview.addEventListener('did-navigate-in-page', (event) => {
            this.url = event.url
        })

        ipcRenderer.on('play-control', (event, message) => {
            if (message === 'play') {
                webview.executeJavaScript('__myYoutubeTools.playVideo()')
            } else if (message === 'pause') {
                webview.executeJavaScript('__myYoutubeTools.pauseVideo()')
            }
        })

        // Signal from main process to show prompt to change the download to folder.
        ipcRenderer.on('promptForChangeDownloadFolder', () => {
            // Changing the folder in renderer because we need access to both state and local storage.
            this.changeOutputFolder();
        });

        // This property will be used to control the rate at which the progress bar is updated to prevent UI lag.
        this.rateLimitTriggered = false;
    },
    methods: {
        getVideoAsMp4(urlLink, userProvidedPath, title) {
            title = sanitize(title)
            // Tell the user we are starting to get the video.
            this.progressMessage = `Downloading ${title}.mp3 ...`
            return new Promise((resolve, reject) => {
                // let fullPath = path.join(userProvidedPath, `tmp_${title}.mp4`)
                let fullPath = path.join(userProvidedPath, `${title}.mp3`)

                // Create a reference to the stream of the video being downloaded.
                let videoObject = ytdl(urlLink, {filter: 'audioonly'})

                videoObject.on('progress', (chunkLength, downloaded, total) => {
                    // When the stream emits a progress event, we capture the currently downloaded amount and the total
                    // to download, we then divided the downloaded by the total and multiply the result to get a float of
                    // the percent complete, which is then passed through the Math.floor function to drop the decimals.
                    if (!this.rateLimitTriggered) {
                        let newVal = Math.floor((downloaded / total) * 100)
                        this.progress = newVal

                        // Set the rate limit trigger to true and set a timeout to set it back to false. This will prevent the UI
                        // from updating every few milliseconds and creating visual lag.
                        this.rateLimitTriggered = true
                        setTimeout(() => {
                            this.rateLimitTriggered = false
                        }, 800)
                    }
                })

                // Create write-able stream for the temp file and pipe the video stream into it.
                videoObject.pipe(fs.createWriteStream(fullPath)).on('finish', () => {
                    // all of the video stream has finished piping, set the progress bar to 100% and give user pause to see the
                    // completion of step. Then we return the path to the temp file, the output path, and the desired filename.
                    this.progress = 100
                    setTimeout(() => {
                        resolve({filePath: fullPath, folderPath: userProvidedPath, fileTitle: `${title}.mp3`})
                    }, 1000)
                })
            })
        },
        async startDownload(id) {
            // Reset state for each download/conversion
            this.progress = 0
            this.showProgressBar = true
            this.progressMessage = '...'

            const webview = document.querySelector('webview')
            webview.executeJavaScript('__myYoutubeTools.pauseVideo()')
            this.$modal.show('download-modal')

            try {
                // Tell the user we are getting the video info, and call the function to do so.
                this.progressMessage = 'Fetching video info...'
                let info = await ytdl.getInfo(id)

                // Given the id of the video, the path in which to store the output, and the video title
                // download the video as an audio only mp4 and write it to a temp file then return
                // the full path for the tmp file, the path in which its stored, and the title of the desired output.
                let paths = await this.getVideoAsMp4(id, this.userDownloadsFolder, info.title)
                this.mp3Path = paths.filePath

                // Set the bar to 100% and give the OS about one second to get rid of the temp file.
                await (() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            this.progress = 100
                            resolve()
                        }, 900)
                    })
                })

                // Signal that the download and conversion have completed and we need to tell the user about it and then reset.
                this.downloadFinished()
            } catch (e) {
                console.error(e)
            }
        },
        downloadFinished() {
            // Make sure progress bar is at 100% and tell the user we have completed the task successfully.
            this.progress = 100
            this.progressMessage = 'Download Complete!'

            // Reset the progress bar to the LinkInput
            setTimeout(() => {
                this.showProgressBar = false
                // this.$modal.hide('download-modal')
            }, 2000)
        },
        changeOutputFolder() {
            // Create an electron open dialog for selecting folders, this will take into account platform.
            let fileSelector = remote.dialog.showOpenDialog({
                defaultPath: `${this.userDownloadsFolder}`,
                properties: ['openDirectory'],
                title: 'Select folder to store files.'
            })

            // If a folder was selected and not just closed, set the localStorage value to that path and adjust the state.
            if (fileSelector) {
                let pathToStore = fileSelector[0]
                localStorage.setItem('userSelectedFolder', pathToStore)
                this.userDownloadsFolder = pathToStore
            }
        },
    },
}
</script>
