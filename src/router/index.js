import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import { firebaseAuth, firestore } from '../boot/firebase';

import jwt_decode from 'jwt-decode';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach(async (to, from, next) => {
    console.log('route ', to.path);
    let permissions = [];
    let response = null;
    const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
    const authorize = to.meta.authorize ? to.meta.authorize : [];

    // console.log('on auth state change');
    // await new Promise(async (resolve, reject) => {
    //   console.log('on auth state change');

    //   if (user) {
    //     let currentUser = firebaseAuth.currentUser;

    //     const doc = await firestore
    //       .collection('users')
    //       .doc(currentUser.uid)
    //       .get();

    //     permissions = doc.data().permissions;

    //     console.log('user exists ', currentUser.uid);
    //     resolve();
    //   } else resolve();
    // });
    let user = localStorage.getItem('access-token');
    if (user) {
      try {
        permissions = jwt_decode(user).permissions;
        response = await axios({
          url: 'http://localhost:3000/checkAuth',
          method: 'POST',

          headers: {
            authorization: `Bearer${user}`,
          },
        });
        console.log('response', response);
      } catch (err) {
        console.log('error', err);
        localStorage.removeItem('access-token');

        user = null;
      }
    }

    if (response && response.status != 200) {
      localStorage.removeItem('access-token');
      user = null;
    }

    console.log('user ', user);
    console.log('permissions ', permissions);

    console.log('requireAuth', requiresAuth);
    //   console.log('user ', user);
    if (requiresAuth && !user) {
      next('/login');
      //   } else if (!requiresAuth && user) {
      //     next('/');
    } else {
      console.log('to ', to.path);
      console.log('admin route ', authorize);
      if (to.path == '/login' && user) {
        return next('/');
      }
      if (authorize.length && !authorize.some(r => permissions.includes(r))) {
        console.log('admin route inner ', authorize);
        console.log('permissions ', permissions);

        return next('/');
      }
      next();
    }
  });
  return Router;
}
