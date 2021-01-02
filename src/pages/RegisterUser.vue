<template>
  <q-page class="flex flex-center">
    <!-- <q-card class="q-pa-lg register">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          outlined
          type="text"
          v-model="adminPassword"
          label="Role Name *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        /> -->

    <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

    <!-- <div class="row">
          <q-space></q-space>
          <q-btn label="Add new role" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card> -->
    <q-card class="q-pa-lg register">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          outlined
          type="text"
          v-model="name"
          label="Name *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

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

        <q-input
          outlined
          type="text"
          v-model="cnfPassword"
          label="Confirm Password *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            //val => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-select
          outlined
          v-model="role"
          :options="roles"
          class="capitalize"
          label="Role"
          :rules="[val => !!val || 'Field is required']"
        />
        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div class="row">
          <q-space></q-space>
          <q-btn label="Register" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import { firebaseApp, firebaseAuth, firestore } from '../boot/firebase';
import { QSpinnerHourglass, QSpinnerPie } from 'quasar';
export default {
  data() {
    return {
      email: null,
      password: null,
      cnfPassword: null,
      name: null,

      roles: ['Admin', 'Counsellor', 'Team Lead', 'Senior Manager', 'Auditor'],
      role: null,
      permissions: [],

      adminPassword: null,
    };
  },

  methods: {
    onSubmit() {
      this.$q.loading.show({
        delay: 400, // ms
        spinner: QSpinnerPie,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'cyan-1',
        message: `Registering ${this.name}...`,
        messageColor: 'black',
      });
      //   this.$auth.onAuthStateChanged(user => {
      //     if (user) {
      //       let currentUser = firebaseAuth.currentUser;
      //       // console.log('current user', currentUser.uid);
      //       this.$firestore
      //         .collection('users')
      //         .doc(currentUser.uid)
      //         .get()
      //         .then(doc => {
      //           if (doc.data().permissions.includes('admin')) {
      //             this.$authSecondary.signInWithEmailAndPassword(
      //               'admin',
      //               this.adminPassword,
      //             );
      //           }
      //         });
      //     }
      //   });
      if (this.role == 'admin') {
        this.permissions = ['admin', 'viewAll', 'edit', 'add'];
      } else {
        this.permissions = ['viewMy'];
      }
      console.log('selected role', this.role);
      if (this.password == this.cnfPassword) {
        this.$axios({
          url: `${process.env.API_URL}/addUser`,
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
          },
          headers: {
            authorization: `Bearer${localStorage.getItem('access-token')}`,
          },
        })
          .then(res => {
            console.log('create user res ', res);
            const uid = res.uid;

            //   this.$router.replace('/').then(res => console.log('route res', res));

            this.$q.loading.hide();

            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'User Added Successfully',
            });
          })
          .catch(err => {
            this.$q.loading.hide();

            console.error(err);
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: err.message,
            });
          });
        // this.$authSecondary.signOut();
      } else {
        this.$q.loading.hide();

        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Password does not match',
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
  },
  mounted() {
    this.roles = [];
    this.$axios({
      url: `${process.env.API_URL}/getRoles`,
      method: 'GET',
      headers: {
        authorization: `Bearer${localStorage.getItem('access-token')}`,
      },
    })
      .then(res => {
        console.log('response ', res);
        this.roles = res.data.roles;
        this.roles = this.roles.map(role => role.name);
        this.roles.sort();
      })
      .catch(err => {
        console.log('error ', err);
      });
  },
};
</script>

<style>
.register {
  width: 30%;
}

.q-item__section {
  text-transform: capitalize;
}
@media (max-width: 992px) {
  .register {
    width: 50%;
  }
}
</style>
