import { createApp } from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { HeartUI } from 'heart-ui'

const app = createApp(App)
app.use(HeartUI)
app.mount('#app')
