# Vue + Firebase

## Prerequisite

* npm
* vue-cli
* firebase-tools

### Installation

1. npm

```bash
$ sudo dnf install npm
```

2. vue-cli

```bash
$ sudo npm install -g vue-cli
```

3. firebase-tools

```bash
$ sudo npm install -g firebase-tools
```

## Email - Password Login System

### 1) Make Project with Vue-cli & Firebase

* Vue Init
```bash
$ vue init webpack vuetutorial

? Project name vuetutorial
? Project description A Vue.js project
? Author Axect <edeftg@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recom
mended) npm
```

* Install Firebase
```bash
$ npm install --save firebase
```

* Connect [Firebase Console](https://console.firebase.google.com/)
	* New Project
	* Add Firebase at Web app
	* Copy Code and paste to `src/main.js`

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase

let config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SEND_ID"
};

firebase.initializeApp(config);

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
```

* Project Structure
```bash
README.md
build
config
index.html
node_modules
package-lock.json
package.json
src
static
```

	* We only focused on `src` directory

* `src` Structure
```bash
App.vue
assets
components
main.js
router
```

* `src/components` Structure (Want to make)
```bash
HelloWorld.vue
Login.vue
SignUp.vue
```

### 2) Create Login.vue

* Setting Router (Edit `src/router/index.js`)
```javascript
import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '*',
			redirect: '/login'
		},
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUp
		},
		{
			path: '/hello',
			name: 'HelloWorld',
			component: HelloWorld,
			meta: {
				requiresAuth: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) next('login')
	else if (!requiresAuth && currentUser) next('hello')
	else next()
})
```

> **Explain index.js**
> * `path`: Directory (e.g localhost:8080/#/login)
> * `redirect`: redirect path
> * `component`: Elements of `src/component`
> * `requiresAuth`: require Authority
> * `to`: parameter is the target Route object being navigated to
> * `from`: parameter is the current route being navigated away from
> * `next`: paramter is a function that must be called to resolve the hook, and can take argument to redirect

> **TODO**
> I don't understand `!requiresAuth`

* In `src/component/`, create `Login.vue`
```vue
<template>
	<div class="login">
		<h3>Sign In</h3>
		<input type="text" v-model="email" placeholder="Email"><br>
		<input type="password" v-model="password" placeholder="Password"><br>
		<button v-on:click="signIn">Connection</button>
		<p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
	</div>
</template>

<script>
	import firebase from 'firebase'

	export default {
		name: 'login',
		data: function() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			signIn: function() {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
					(user) => {
						this.$router.replace('hello')
					},
					(err) => {
						alert('Oops. ' + err.message)
					}
				);
			}
		}
	}
</script>

<style scoped> /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
```

> **Explain Login.vue**
> * `v-model`: Vue's Model
> * `placeholder`: Default grey character in place
> * `v-on:click="signIn"`: If click, then execute `signIn` function
> * `router-link to="/sign-up"`: If click, then move to sign-up page
> * `this.$router.replace('hello')`: Move to `hello` page
> * `stype scoped`: Only use this style to this component

