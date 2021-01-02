<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg login">
      <q-form @submit="onSubmit" @reset="onReset" class=" q-gutter-md">
        <q-input
          outlined
          v-model="email"
          type="email"
          label="Email *"
          hint="Email address"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type email']"
        />

        <q-input
          outlined
          type="password"
          v-model="password"
          label="Password *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div class="row">
          <q-space></q-space>
          <q-btn label="Login" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import { firebaseApp, firebaseAuth } from '../boot/firebase';
import { mapActions } from 'vuex';

import { QSpinnerHourglass, QSpinnerPie } from 'quasar';
export default {
  data() {
    return {
      email: null,
      password: null,

      accept: false,
    };
  },

  methods: {
    ...mapActions('user', ['loginUser']),
    onSubmit() {
      this.$q.loading.show({
        delay: 400, // ms
        spinner: QSpinnerPie,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'cyan-1',
        message: 'Logging you in. Hang on...',
        messageColor: 'black',
      });
      console.log('process.env.API_URL', process.env.API_URL);
      //   if (this.accept !== true) {
      //     this.$q.notify({
      //       color: 'red-5',
      //       textColor: 'white',
      //       icon: 'warning',
      //       message: 'You need to accept the license and terms first',
      //     });
      //   } else {
      //     this.$q.notify({
      //       color: 'green-4',
      //       textColor: 'white',
      //       icon: 'cloud_done',
      //       message: 'Submitted',
      //     });
      //   }
      //   this.loginUser({ email: this.email, password: this.password });
      this.$axios({
        url: `${process.env.API_URL}/login`,
        method: 'POST',
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(async res => {
          //   const user = '';
          console.log('login response ', res.data);
          const data = res.data;

          if (res.data.err) {
            this.$q.loading.hide();
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: res.data.msg,
            });
            return;
          }

          if (!data.user.active) {
            this.$q.loading.hide();
            localStorage.removeItem('access-token');

            this.$router.replace('/login');
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message:
                'Seems like your account is locked! Contact your system admin..',
            });
            return;
          }
          this.$q.loading.hide();
          localStorage.setItem('access-token', data.token);
          this.$router.push('/').then(res => console.log('route res', res));
          window.location.reload();
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Now logged in',
          });
        })
        .catch(err => {
          console.error(err);
          this.$q.loading.hide();
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: err.message,
          });
        });
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
  },
};
</script>

<style>
.login {
  width: 30%;
}

@media (max-width: 992px) {
  .login {
    width: 50%;
  }
}
</style>
