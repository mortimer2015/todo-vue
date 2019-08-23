import Vue from 'vue'
import ElementUI, {Message} from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
axios.defaults.baseURL = "http://127.0.0.1:5000"

axios.interceptors.request.use(
  config => {
      if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = `token ${store.state.token}`;
      }
      // else{
      //   config.headers.Authorization = `token 2333`;
      // }
      return config;
      
  },
  err => {
      return Promise.reject(err);
  });

function handle401(error) {
  Message({
    showClose: true,
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  });
  router.replace({
    path: '/',
    query: {redirect: router.currentRoute.fullPath}
  });
}

axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response;
  },
  (error) => {
    // Vue.$message("23333333333");
    // console.log(error)
    
    if(error.response) {
      switch (error.response.status) {
        case 401:
          handle401(error);
        // case 700:
        //   router.replace({path:'/', query: {redirect:router.currentRoute.fullPath}});
      }
    }
    return Promise.reject(error.response.data);
  }
);

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'mini'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
