<template>
    <div class="relative h-full">
        <div class="relative w-5/6 bg-gray-300 rounded h-12 m-auto mt-10">
            <div class="h-full ihnline-block rounded" :style="{ width: progress + '%', 'background-color': '#fa7fc3', transition: 'width 0.4s ease-in-out' }" />
            <div class="absolute text-right w-20" :style="{ color: progress > 90 ? 'white' : '#747373', transition: 'color 0.4s ease-in-out', top: '1rem', left: 'calc(50% + 165px)' }">
                {{ progress + '%' }}
            </div>
        </div>
        <div class="w-full h-12 pt-4 text-center">
            <span class="text-gray-500">{{ messageText }}</span>
        </div>

        <div v-if="progress === 100" class="absolute text-center w-full bottom-0 mb-12">
            <button class="btn btn-blue text-sm" @click="showInFinder">Show in finder</button>
            <button class="btn btn-blue text-sm" @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script>
    import { shell } from 'electron'

    export default {
        name: 'progress-bar',
        props: ['progress', 'messageText', 'path'],
        methods: {
            showInFinder() {
                shell.showItemInFolder(this.path)
            },
            closeModal() {
                this.$emit('close-modal')
            },
        }
    }
</script>
