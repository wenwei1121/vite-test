import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"
import App from "./App.vue"
import VueSweetAlert2 from "vue-sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import "./style.css"
import "flowbite"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueSweetAlert2)
app.mount("#app")
