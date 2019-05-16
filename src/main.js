import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VModal)

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        // Prevent blank screen in Electron builds
        this.$router.push('/')
    }
}).$mount('#app')
