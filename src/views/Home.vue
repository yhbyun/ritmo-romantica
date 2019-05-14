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
        </grid-item>
    </grid-layout>

</template>

<script>
/* global __static */

import VueGridLayout from 'vue-grid-layout';
import { remote, ipcRenderer } from 'electron'
const { Menu, MenuItem } = remote

const layout = [
    {"x":0,"y":0,"w":6,"h":18,"i":"0"},
    {"x":6,"y":0,"w":6,"h":9,"i":"1"},
    {"x":6,"y":9,"w":6,"h":9,"i":"2"},
];

// @ is an alias to /src
export default {
    name: 'home',
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem
    },
    data: function () {
        return {
            layout: layout,
            preloadRadio: `file:${require('path').resolve(__static, './radio-inject.js')}`,
            preloadGoogle: `file:${require('path').resolve(__static, './google-translate-inject.js')}`,
            song: '', // singer + ' - ' + song
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
        })

        ipcRenderer.on('translate', (event, message) => {
            webviewGoogle.executeJavaScript('translate("' + message.replace('"', '\\"') + '")')
        })
    },
}
</script>
