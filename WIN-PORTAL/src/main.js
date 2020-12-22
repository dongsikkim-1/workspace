import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import './registerServiceWorker'
import {BootstrapVue, ModalPlugin} from 'bootstrap-vue'
 import {IconsPlugin} from 'bootstrap-vue'
// import { ModalPlugin } from 'bootstrap-vue' /* bootstrap Modal은 따로 선언을 한다 */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal' // Modal


//import './assets/less/Main.less'
/*eslint-disable no-unused-vars, no-empty*/
require('./assets/css/Screen.less') // Screen 반응형 사이즈 Css 구성 파일
require('./assets/css/Style.less') // Style Css 구성 파일
require('tui-chart/dist/tui-chart.css');  //Chart css구성 파일.\
require('@toast-ui/vue-chart');  

Vue.config.productionTip = false
Vue.use(VModal, { dynamic: true })
window.$ = window.jQuery = require('jquery');
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)



//  // TODO: 아래에 서비스워커 등록
//  if ('serviceWorker' in navigator) {
//   // navigator.serviceWorker.register('./service-worker.js').then(regist => {
//     debugger;
//   navigator.serviceWorker.register('src/registerServiceWorker.js').then(regist => {
//     debugger;
//     var swRegist = regist;
//     console.log('Service Worker Registered');

//     if ('pushManager' in regist) {
//       // The service worker supports push
//       console.log('The service worker supports push');
//     } else {
//       // The service worker doesn't support push
//       console.log('The service worker doesnt support push');
//     }

//     // TODO: Push 기능 초기화
//     //initPush();

//     regist.addEventListener('updatefound', () => {
//       const newWorker = regist.installing;
//       console.log('Service Worker update found!');

//       newWorker.addEventListener('statechange', function () {
//         console.log('Service Worker state changed:', this.state);
//       });
//     });
//   }).catch(err => {
//     console.log('navi', err);
//   });

//   navigator.serviceWorker.addEventListener('controllerchange', () => {
//     console.log('Controller changed');
//   });
// }




  

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
