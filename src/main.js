/**
 * main.js - Application entry point.
 * Initializes Vue app with Pinia state management,
 * Vue Router and global CSS variables.
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import global CSS variables and reset styles
import '@/assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
