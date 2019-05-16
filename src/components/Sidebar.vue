<template>
    <!--
    <div class="w-56 bg-grey-darkest text-white border-r border-blackblack fixed min-h-screen pt-8">
    -->
    <div :class="$style.sidebar">

        <div class="search-container text-center p-4 relative">
            <input type="text" placeholder="Search" class="bg-gray-600 text-gray-400 text-xs w-full p-2 pl-8 border border-gray-600 rounded">
            <div class="absolute top-0 py-5 px-2 text-gray-400">
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="18" height="18"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
            </div>
        </div>

        <div class="sidebar-icons">
            <router-link to="/" class="sidebar-icon flex items-center px-4 py-2 text-gray-500 no-underline cursor-pointer hover:bg-gray-600">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792">
                    <path d="M1664 224v1120q0 50-34 89t-86 60.5-103.5 32-96.5 10.5-96.5-10.5-103.5-32-86-60.5-34-89 34-89 86-60.5 103.5-32 96.5-10.5q105 0 192 39v-537l-768 237v709q0 50-34 89t-86 60.5-103.5 32-96.5 10.5-96.5-10.5-103.5-32-86-60.5-34-89 34-89 86-60.5 103.5-32 96.5-10.5q105 0 192 39v-967q0-31 19-56.5t49-35.5l832-256q12-4 28-4 40 0 68 28t28 68z"></path>
                </svg>
                <div class="text-white">Radio</div>
            </router-link> <!-- end sidebar-icon -->

            <router-link to ="/youtube" class="sidebar-icon flex items-center px-4 py-2 text-gray-500 no-underline cursor-pointer hover:bg-gray-600">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792"><path d="M711 1128l484-250-484-253v503zm185-862q168 0 324.5 4.5t229.5 9.5l73 4q1 0 17 1.5t23 3 23.5 4.5 28.5 8 28 13 31 19.5 29 26.5q6 6 15.5 18.5t29 58.5 26.5 101q8 64 12.5 136.5t5.5 113.5v176q1 145-18 290-7 55-25 99.5t-32 61.5l-14 17q-14 15-29 26.5t-31 19-28 12.5-28.5 8-24 4.5-23 3-16.5 1.5q-251 19-627 19-207-2-359.5-6.5t-200.5-7.5l-49-4-36-4q-36-5-54.5-10t-51-21-56.5-41q-6-6-15.5-18.5t-29-58.5-26.5-101q-8-64-12.5-136.5t-5.5-113.5v-176q-1-145 18-290 7-55 25-99.5t32-61.5l14-17q14-15 29-26.5t31-19.5 28-13 28.5-8 23.5-4.5 23-3 17-1.5q251-18 627-18z"/></svg>
                <div class="text-white">Youtube</div>
            </router-link> <!-- end sidebar-icon -->
        </div>

    </div>
</template>

<script>
    import {TweenMax, Power4} from 'gsap'

    export default {
        name: 'sidebar',
        mounted () {
            TweenMax.set(this.$el, {
                x: this.$el.offsetWidth
            })
        },
        computed: {
            open () {
                return this.$store.state.ui.sidebarOpen
            }
        },
        watch: {
            open: function (open) {
                const dX = open ? 0 : this.$el.offsetWidth
                TweenMax.to(this.$el, 0.6, {
                    x: dX,
                    ease: Power4.easeOut
                })
            }
        }
    }
</script>

<style module>
    .sidebar{
        position: fixed;
        right: 0;
        top: 0;
        width: 300px;
        height: 100vh;
        max-width: 90vw;
        background-color: var(--accent-color);
    }
</style>
