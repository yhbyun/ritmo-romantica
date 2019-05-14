<template>
    <!--
    <div class="w-56 bg-grey-darkest text-white border-r border-blackblack fixed min-h-screen pt-8">
    -->
    <div :class="$style.sidebar">

        <div class="search-container text-center p-4 relative">
            <input type="text" placeholder="Search" class="bg-grey-darker text-grey-light text-xs w-full p-2 pl-8 border border-grey-dark rounded">
            <div class="absolute pin-t py-5 px-2 text-grey-light">
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="18" height="18"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
            </div>
        </div>

        <div class="sidebar-icons">
            <router-link to="/" class="sidebar-icon flex items-center px-4 py-2 text-grey no-underline cursor-pointer hover:bg-grey-darker">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 1792 1792">
                    <path d="M1664 224v1120q0 50-34 89t-86 60.5-103.5 32-96.5 10.5-96.5-10.5-103.5-32-86-60.5-34-89 34-89 86-60.5 103.5-32 96.5-10.5q105 0 192 39v-537l-768 237v709q0 50-34 89t-86 60.5-103.5 32-96.5 10.5-96.5-10.5-103.5-32-86-60.5-34-89 34-89 86-60.5 103.5-32 96.5-10.5q105 0 192 39v-967q0-31 19-56.5t49-35.5l832-256q12-4 28-4 40 0 68 28t28 68z"></path> 
                </svg>
                <div class="text-white">Radio</div>
            </router-link> <!-- end sidebar-icon -->

            <!--
            <router-link to="/create" class="sidebar-icon flex items-center px-4 py-2 text-grey no-underline cursor-pointer hover:bg-grey-darker">
                <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 24 24">
                    <path d="M21.6536313,0 C22.2793296,0 22.8268156,0.207589286 23.2960894,0.622767857 C23.7653631,1.03794643 24,1.55803571 24,2.18303571 C24,2.74553571 23.7988827,3.41964286 23.396648,4.20535714 C20.4290503,9.82142857 18.350838,13.1785714 17.1620112,14.2767857 C16.2949721,15.0892857 15.3206704,15.4955357 14.2391061,15.4955357 C13.1128492,15.4955357 12.1452514,15.0825893 11.3363128,14.2566964 C10.5273743,13.4308036 10.122905,12.4508929 10.122905,11.3169643 C10.122905,10.1741071 10.5340782,9.22767857 11.3564246,8.47767857 L19.9106145,0.723214286 C20.4379888,0.241071429 21.0189944,0 21.6536313,0 Z M9.46592179,13.8482143 C9.81452514,14.5267857 10.2905028,15.1071429 10.8938547,15.5892857 C11.4972067,16.0714286 12.1698324,16.4107143 12.9117318,16.6071429 L12.9251397,17.5580357 C12.9608939,19.4598214 12.3821229,21.0089286 11.1888268,22.2053571 C9.99553073,23.4017857 8.43798883,24 6.51620112,24 C5.41675978,24 4.4424581,23.7924107 3.59329609,23.3772321 C2.74413408,22.9620536 2.06256983,22.3928571 1.54860335,21.6696429 C1.03463687,20.9464286 0.648044693,20.1294643 0.388826816,19.21875 C0.129608939,18.3080357 0,17.3258929 0,16.2723214 C0.0625698324,16.3169643 0.245810056,16.4508929 0.54972067,16.6741071 C0.853631285,16.8973214 1.13072626,17.0959821 1.38100559,17.2700893 C1.63128492,17.4441964 1.89497207,17.6071429 2.17206704,17.7589286 C2.44916201,17.9107143 2.6547486,17.9866071 2.78882682,17.9866071 C3.15530726,17.9866071 3.40111732,17.8214286 3.52625698,17.4910714 C3.74972067,16.9017857 4.00670391,16.3995536 4.2972067,15.984375 C4.5877095,15.5691964 4.89832402,15.2299107 5.22905028,14.9665179 C5.55977654,14.703125 5.95307263,14.4910714 6.40893855,14.3303571 C6.86480447,14.1696429 7.32513966,14.0558036 7.78994413,13.9888393 C8.2547486,13.921875 8.81340782,13.875 9.46592179,13.8482143 Z"></path>
                </svg>
                <div class="text-white">Create</div>
            </router-link>--> <!-- end sidebar-icon -->

            <router-link to ="/youtube" class="sidebar-icon flex items-center px-4 py-2 text-grey no-underline cursor-pointer hover:bg-grey-darker">
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
