import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faShirt, faBottleWater, faBottleDroplet, faNewspaper, faBox, faBucket, faBook, faUtensils, faEnvelope, faRectangleList,faReplyAll,faKitchenSet,faHand,faIcons} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faShirt, faBottleWater,faBottleDroplet, faNewspaper, faBox, faBucket, faBook, faUtensils, faEnvelope,faRectangleList,faReplyAll,faKitchenSet,faHand,faIcons)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
app.use(ElementPlus).use(router).use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
