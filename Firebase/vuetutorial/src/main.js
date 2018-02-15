// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
let app;
let config = {
  apiKey: "AIzaSyDobmO0eV64E9SQmh-RcUW66L7kP5x_xXw",
  authDomain: "vue-firebase-tutorial-28dbb.firebaseapp.com",
  databaseURL: "https://vue-firebase-tutorial-28dbb.firebaseio.com",
  projectId: "vue-firebase-tutorial-28dbb",
  storageBucket: "vue-firebase-tutorial-28dbb.appspot.com",
  messagingSenderId: "369269293733"
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});

