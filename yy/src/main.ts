import { createApp } from 'vue'
import router from "@/router"
import App from './App.vue'

const appRun = createApp(App)

appRun.use(router)

appRun.mount('#app')
