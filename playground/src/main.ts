import { createApp } from 'vue'
import App from './App.vue'
import { heartCss } from './utils'
import 'virtual:uno.css'

import { HeartUI } from 'heart-ui'

const app = createApp(App)
app.use(HeartUI, { css: heartCss })
app.mount('#app')
