import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Camera from './components/dayFiveTask/Camera.vue';
// import CameraIbrahim from './components/dayFiveTask/CameraIbrahim.vue';
import { registerSW } from 'virtual:pwa-register'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


// const intervalMS = 60 * 60 * 1000
const intervalMS = 3

const updateSW = registerSW({
  onRegistered(r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  }
})
registerSW({ immediate: true })

createApp(Camera).use(vuetify).mount('#app')
