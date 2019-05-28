<template>
    <grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >
        <grid-item v-for="item in layout" v-bind:key="item.i"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i">
            <div class="w-full h-full" v-if="item.i === '0'">
                <webview id="wv-radio" src="https://ritmoromantica.pe/radioenvivo"
                    class="w-full h-full"
                    :preload="preloadRadio"
                    allowpopups
                    ></webview>
            </div>
            <div class="w-full h-full" v-else-if="item.i === '1'">
                <webview id="wv-google-translate" src="https://translate.google.com/"
                    class="w-full h-full"
                    :preload="preloadGoogle"
                    allowpopups
                    ></webview>
            </div>
            <div class="w-full h-full" v-else-if="item.i === '2'">
                <webview src="https://dict.naver.com/eskodict/"
                    class="w-full h-full"
                    useragent="Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/73.0.3683.103 Mobile/13B143 Safari/601.1.46"
                    allowpopups
                    ></webview>
            </div>
            <div class="lyric-wrapper w-full h-full bg-white p-4 overflow-auto" v-else-if="item.i === '3'">
                <loading :active.sync="isLoading"
                    :can-cancel="false"
                    :is-full-page="false"
                    color="#820263"></loading>
                <div v-html="lyric"></div>
            </div>
        </grid-item>
    </grid-layout>

</template>

<script>
/* global __static */

import VueGridLayout from 'vue-grid-layout'
import request from 'request-promise'
import cheerio from 'cheerio'
import { remote, ipcRenderer } from 'electron'
const { Menu, MenuItem } = remote
import { config } from '../config.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const layout = [
    {"x":0,"y":0,"w":6,"h":13,"i":"0"},
    {"x":6,"y":0,"w":6,"h":9,"i":"1"},
    {"x":6,"y":9,"w":6,"h":9,"i":"2"},
    {"x":0,"y":13,"w":6,"h":5,"i":"3"},
];

// @ is an alias to /src
export default {
    name: 'home',
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        Loading,
    },
    data: function () {
        return {
            layout: layout,
            preloadRadio: `file:${require('path').resolve(__static, './radio-inject.js')}`,
            preloadGoogle: `file:${require('path').resolve(__static, './google-translate-inject.js')}`,
            song: '', // singer + ' - ' + song,
            lyric: '',
            showLyric: config.get('showLyric', true),
            isLoading: false,
        }
    },
    mounted () {
        const webviewRadio = document.querySelector('#wv-radio')
        const webviewGoogle = document.querySelector('#wv-google-translate')

        webviewRadio.addEventListener('dom-ready', () => {
            if (remote.process.env.NODE_ENV && remote.process.env.NODE_ENV !== 'production') {
                webviewRadio.openDevTools()
            }
        })

        webviewGoogle.addEventListener('dom-ready', () => {
            if (remote.process.env.NODE_ENV && remote.process.env.NODE_ENV !== 'production') {
                webviewGoogle.openDevTools()
                webviewGoogle.executeJavaScript('translate("hola")')
            }
        })

        // IPC
        remote.ipcMain.on('radio-contextmenu', () => {
            const menu = new Menu()
            menu.append(new MenuItem({
                label: 'Search this song in YouTube',
                click: () => this.$router.push({ path: '/youtube', query: { search_query: this.song }}),
            }))
            menu.append(new MenuItem({
                label: 'Search lyric',
                click: () => this.displayLyric(),
            }))
            menu.popup(remote.getCurrentWindow())
        })

        ipcRenderer.on('play-control', (event, message) => {
            if (message === 'play') {
                webviewRadio.executeJavaScript('playControl.playSong()')
            } else if (message === 'pause') {
                webviewRadio.executeJavaScript('playControl.pauseSong()')
            }
        })

        ipcRenderer.on('song-updated', (event, message) => {
            this.song = message
            webviewGoogle.executeJavaScript('translateSong("' + message.replace('"', '\\"') + '")')
            this.displayLyric()
        })

        ipcRenderer.on('showlyric-changed', (event, show) => {
            this.showLyric = show
        })
    },
    methods: {
        displayLyric() {
            if (!this.showLyric || this.song.indexOf('Radio Ritmo Romántica') >= 0) return;

            this.isLoading = true;

            this.getLyric(this.song).then(lyric => {
                this.lyric = lyric
                document.querySelector('.lyric-wrapper').scrollTop = 0
            })
            .catch(error => {
                this.lyric = `<div class="text-red-500">${error}</div>`
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
        getLyric: async song => {
            console.log('getLyrics', song)
            let query = song + ' site:https://www.letras.com'
            let url = "https://www.google.com/search?q=" + encodeURIComponent(query)
            let lyricUrl;

            // Cannot parse google search result page using cheerio. Don't know why???
            let response = await request(url)
            let start = response.indexOf('<a href="/url?q=')
            if (start > 0) {
                let end = response.indexOf('&amp;', start + 9)
                lyricUrl = response.substring(start + 16, end - 1)
                console.log('lyric ur', lyricUrl)
            }

            if (!lyricUrl) {
                throw Error('Lyrics not found')
            }

            response = await request(lyricUrl)
            let $ = cheerio.load(response)
            const data = $('.cnt-letra')
            let html = data.html()
            if (!html) {
                throw Error('Lyrics div not found')
            }
            html = `<div class="text-blue-500 font-bold mb-4">${song}</div>${html}`
            return html
        },
    },
}
</script>
