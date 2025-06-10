import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import router from './router/index'
import App from './App.vue'
import pinia from './store'
import './styles/index.css'
import './main.css'
import globalComponents from './components'

const app = createApp(App)
app.use(globalComponents)
app.use(pinia)
app.use(router)
app.mount('#app')
