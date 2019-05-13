<template>
    <div class="p-2 w-full h-full">
        <webview src="https://quizlet.com/"
            class="w-full h-full"
            allowpopups
            ></webview>
    </div>
</template>

<script>
import { remote } from 'electron'

export default {
    name: 'create',
    mounted () {
        const webview = document.querySelector('webview')

        webview.addEventListener('dom-ready', () => {
            if (remote.process.env.NODE_ENV && remote.process.env.NODE_ENV !== 'production') {
                webview.openDevTools()
            }
        })
    }
}
</script>
