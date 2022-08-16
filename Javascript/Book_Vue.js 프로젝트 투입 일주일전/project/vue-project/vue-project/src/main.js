import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import mixins from "./mixins";
import store from "./store";

createApp(App)
    .use(router)
    .use(store)
    .mixin(mixins)
    .mount('#app')

window.Kakao.init("7caa0aee6fa89478be0cf1110a018dff"); //발급 받은 앱키