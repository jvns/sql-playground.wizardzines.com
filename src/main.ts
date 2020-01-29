import Vue from 'vue';
import Main from './Main.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Main),
}).$mount('#app');
