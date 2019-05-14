<template>
    <div id="app" style="-webkit-app-region: drag" class="font-sans flex min-h-screen">
        <div :class="$style.container">
            <router-view/>
        </div>
        <sidebar/>
        <sidebar-toggle/>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import SidebarToggle from '@/components/SidebarToggle.vue'

export default {
    components: {
        Sidebar, SidebarToggle
    },
    watch: {
        '$route' () {
            this.$store.dispatch('close')
        }
    }
}
</script>

<style src="./assets/main.css" />

<style>
    :root{
        --accent-color: #FFCB08;
        --primary-color: #820263;
        --dark-color: #2E294E;
    }

    *{
        box-sizing: border-box;
    }
</style>

<style module>
    .container{
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-color: var(--primary-color);
    }
</style>
