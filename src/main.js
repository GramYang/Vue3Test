import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import bag from '@/net/bag.js'

const app=createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

app.config.globalProperties.bag=bag