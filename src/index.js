/* eslint-disable array-callback-return */
import Vue from 'vue';
import Index from './Index.vue';
// import Vuex from 'vuex';
import 'vue2-animate/dist/vue2-animate.min.css';

// 标识生产环境变量
const isProduction = process.env.NODE_ENV === 'production';


global.Index = new Vue({
  // el: '#app',
  // template: '<App/>',
  // router,
  // store,
  // components: { App }
  render: h => h(Index),
}).$mount('#app');

