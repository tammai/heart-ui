import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

import { HeartUI, globalCss } from 'heart-ui'

const app = createApp(App)
app.use(HeartUI, { css: globalCss.value })
app.mount('#app')
