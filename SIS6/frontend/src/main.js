import { createApp } from 'vue'; 

import App from './App.vue'; 

import router from './router'; 
 

import { createApp } from 'vue'; 

import App from './App.vue'; 

import router from './router'; 

import store from './store'; 

import { createVuetify } from 'vuetify'; 

import 'vuetify/styles'; 

 

const vuetify = createVuetify(); 

 

createApp(App).use(router).use(store).use(vuetify).mount('#app'); 

 

// createApp(App).use(router).mount('#app'); 