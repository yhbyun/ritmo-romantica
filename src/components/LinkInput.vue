<template>
    <div>
        <div class="absolute right-0 pr-4 text-center text-xs pt-16">
            <button class="btn btn-blue" @click="startDownload">Download as MP3</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'link-input',
        props: ['url'],
        methods: {
            getIdFromUrl(url) {
                let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
                let match = url.match(regExp);

                if (match && match[2].length == 11) {
                    return match[2];
                } else {
                    return null;
                }
            },
            startDownload() {
                let id = this.getIdFromUrl(this.url)
                if (id === null) {
                    console.eror('can\'t find id from url')
                } else {
                    this.$emit('startDownload', id)
                }
            }
        },
    }
</script>

