import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//引入cookies
import VueCookies from 'vue-cookies'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//我们使用sass 所以这里将base.css 改成base.scss
import './assets/base.scss'
//图标 图标在附件中
import '@/assets/icon/iconfont.css'
const app = createApp(App)

//全局方法
import Verify from '@/utils/Verify'
import Message from './utils/Message'
import request from  './utils/Request'

//全局组件
import Dialog from '@/components/Dialog.vue'

app.use(router)
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo = {
  bodywidth:1100
}
app.config.globalProperties.Verify = Verify
app.config.globalProperties.Message = Message
app.config.globalProperties.request = request
app.component("Dialog",Dialog)
app.mount('#app')
