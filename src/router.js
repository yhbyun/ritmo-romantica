import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/youtube",
            name: "youtube",
            // route level code-splitting
            // this generates a separate chunk (create.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "youtube" */ "./views/Youtube.vue")
        },
        {
            path: "/browser",
            name: "browser",
            component: () => import(/* webpackChunkName: "browser" */ "./views/Browser.vue")
        }
    ]
});
