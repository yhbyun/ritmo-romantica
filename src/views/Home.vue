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
            <div class="w-full h-full bg-white p-4" v-else-if="item.i === '3'">
                <scroll class="lyric-wrapper w-full h-full overflow-auto" ref="lyricList" :data="currentLyric && currentLyric.lines">
                    <div>
                        <div v-if="currentLyric">
                            <p v-for="(line, index) in currentLyric.lines" ref="lyricLine" :key="index"
                                :class="{ 'current': currentLineNum === index }"
                                class="text" v-html="line.txt"></p>
                        </div>
                    </div>
                </scroll>
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
import Scroll from '@/components/Scroll.vue'
import Lyric from './Lyric.js'
import { config } from '../config.js'

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
        Scroll,
    },
    data: function () {
        return {
            layout: layout,
            preloadRadio: `file:${require('path').resolve(__static, './radio-inject.js')}`,
            preloadGoogle: `file:${require('path').resolve(__static, './google-translate-inject.js')}`,
            song: '', // singer + ' - ' + song,
            currentLyric: null,
            currentLineNum: 0,
            showLyric: config.get('showLyric', true),
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

            try {
                this.getLyric(this.song).then(lyric => {
                    console.log(lyric)
                    this.currentLyric = new Lyric(lyric)

                    /*
                    // auto scroll
                    setInterval(() => {
                        const lineEl = this.$refs.lyricLine[this.currentLineNum]
                        this.$refs.lyricList[0].scrollToElement(lineEl, 1000)
                        this.currentLineNum++
                    }, 1000)
                    */
                })
            } catch (error) {
                const lyric = `<span class="text-red-500">${error}</span>`
                this.currentLyric = new Lyric(lyric)
            }
        },
        getLyric: async song => {
            console.log('getLyrics', song)
            let query = song + ' site:https://www.letras.com'
            let url = "https://www.google.com/search?q=" + encodeURIComponent(query)
            let lyricUrl

            let response = await request(url)
            let $ = cheerio.load(response)
            //Now Scrap the first google link
            //$('.r','a').children[0].href
            const links = $('a','.r') //Get All Links
            $(links).each(function (i, link) {
                const text = $(link).text()
                console.log(text)
                if (text.search("LETRAS.COM") !== -1) {
                    console.log($(link).attr('href'))
                    //lyricUrl = $(link).attr('href').substring(7)
                    lyricUrl = 'https://www.google.com' + $(link).attr('href')
                    console.log(lyricUrl)
                    return false //break the loop each
                }
            })

            if (!lyricUrl) {
                console.error('Lyrics not found')
                throw Error('Lyrics not found')
            }

            response = await request(lyricUrl)
            $ = cheerio.load(response)
            const data = $('.cnt-letra')
            let html = data.html()
            if (!html) {
                console.error('Lyrics div not found')
                throw Error('Lyrics div not found')
            }
            html = html.replace(/<p>(.*)<\/p>/g, "$1<br>")
            html = `<span class="text-blue-500 font-bold">${song}</span><br>${html}`
            return html.replace(/<br>/g, '\n')
        },
    },
}
</script>
