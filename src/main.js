import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        // Prevent blank screen in Electron builds
        this.$router.push('/')
    }
}).$mount('#app')
