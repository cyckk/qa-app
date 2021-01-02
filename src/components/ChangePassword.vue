<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg register">
      <q-form @submit="updatePassword" class="q-gutter-md">
        <!-- <q-input
          outlined
          type="text"
          v-model="oldPass"
          label="Old Password*"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        /> -->

        <q-input
          outlined
          type="password"
          v-model="newPass"
          label="New Password*"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-input
          outlined
          type="password"
          v-model="cnfPass"
          label="Confirm Password*"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div class="row">
          <q-space></q-space>
          <q-btn label="Change Password " type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { QSpinnerHourglass, QSpinnerPie } from 'quasar';

export default {
  data() {
    return {
      oldPass: null,
      newPass: null,
      cnfPass: null,
    };
  },
  methods: {
    updatePassword() {
      this.$q.loading.show({
        delay: 400, // ms
        spinner: QSpinnerPie,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'cyan-1',
        message: `Updating password...`,
        messageColor: 'black',
      });

      this.$auth.onAuthStateChanged(user => {
        if (user) {
          let currentUser = this.$auth.currentUser;

          if (this.newPass == this.cnfPass) {
            currentUser
              .updatePassword(this.newPass)
              .then(res => {
                console.log('update password running');
                this.$q.loading.hide();

                this.$q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  icon: 'cloud_done',
                  message: 'Password updated',
                });
              })
              .catch(err => {
                this.$q.loading.hide();
                this.$q.notify({
                  color: 'red-4',
                  textColor: 'white',
                  icon: 'warning',
                  message: err.message,
                });
              });
          } else {
            this.$q.loading.hide();
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: 'Password does not match',
            });
          }
        }
      });
    },
  },
};
</script>

<style></style>
