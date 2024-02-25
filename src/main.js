import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaRegularUser, BiHeart, BiCart3, FaUser, IoMail, MdPassword, BiTelephoneFill, FaMapMarkedAlt, HiUpload } from 'oh-vue-icons/icons'

addIcons(FaRegularUser, BiHeart, BiCart3, FaUser, IoMail, MdPassword, BiTelephoneFill, FaMapMarkedAlt, HiUpload)

const app = createApp(App)
const pinia = createPinia()

app.component('v-icon', OhVueIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
