import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import MuseUI from 'muse-ui';
import Mock from './mock'
import Message from 'muse-ui-message'
import Toast from 'muse-ui-toast';
import 'muse-ui/dist/muse-ui.css';


import vUploader from 'v-uploader';

// v-uploader plugin global config
const uploaderConfig = {
    // file uploader service url
    uploadFileUrl: 'http://xxx/upload/publicFileUpload',
    // file delete service url
    deleteFileUrl: 'http://xxx/upload/deleteUploadFile',
    itemLimit:4,
    // set the way to show upload message(upload fail message)
    showMessage: (vue, message) => {
        console.log(message)
        Message.alert('aaaa','Alert')
    }
};

// install plugin with options
Vue.use(vUploader, uploaderConfig);

Mock();

Vue.use(MuseUI)

Vue.use(Toast);

Vue.use(Message)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
