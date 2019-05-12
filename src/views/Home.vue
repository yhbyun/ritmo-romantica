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
                <iframe src="https://ritmoromantica.pe/radioenvivo" class="w-full h-full"></iframe>
            </div>
            <div class="w-full h-full" v-else-if="item.i === '1'">
                <iframe src="https://translate.google.com/" class="w-full h-full"></iframe>
            </div>
            <div class="w-full h-full" v-else-if="item.i === '2'">
                <iframe src="https://dict.naver.com/eskodict/" class="w-full h-full"></iframe>
            </div>
        </grid-item>
    </grid-layout>

</template>

<script>
import VueGridLayout from 'vue-grid-layout';

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
        }
    },
}
</script>
