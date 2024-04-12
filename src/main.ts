import './assets/styles/main.css'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)
app.use(MotionPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
