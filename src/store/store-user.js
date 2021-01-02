import { firebaseAuth, firestore } from '../boot/firebase';
import firebase from 'firebase';
import Vue from 'vue';
import router from '../router/index';
const state = {};

const mutations = {};

const actions = {
  registerUser: ({ commit }, payload) => {
    console.log('registerUser action ', payload);
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
        let userId = firebaseAuth.currentUser.uid;
        firestore
          .collection('users')
          .doc(userId)
          .set({
            name: payload.name,
            email: payload.email,
            online: true,
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  loginUser: ({ commit }, payload) => {
    console.log('payload', payload);
    this.$auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.$auth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
      })
      .then(res => {
        console.log(res);
        this.$router.replace('/').then(res => console.log('route res', res));
      })
      .catch(err => console.error(err));
  },

  toggleUserState({}, payload) {
    firestore
      .collection('users')
      .doc(payload.id)
      .set(
        {
          active: !payload.active,
        },
        { merge: true }
      )
      .then(() => {
        console.log('User is disabled ');
      });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
