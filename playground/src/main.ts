import { createApp } from 'vue'
import App from './App.vue'
import { HeartUI } from 'heart-ui'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(HeartUI)
app.mount('#app')
