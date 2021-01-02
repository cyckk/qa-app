<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg custom-width">
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
          disable
          outlined
          v-model="email"
          type="email"
          label="Email *"
          hint="Email address"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type email']"
        />

        <q-select
          outlined
          v-model="role"
          :options="roles"
          label="Role"
          :rules="[val => !!val || 'Field is required']"
        />

        <!-- <q-checkbox
          keep-color
          v-model="chngePassword"
          label="Change Password"
          :val="chngePassword"
          color="red"
        /> -->

        <div v-if="chngePassword">
          <q-input
            outlined
            type="password"
            v-model="password"
            label="Password *"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your password',
              //val => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />
          <q-input
            outlined
            type="password"
            v-model="cnfPassword"
            label="ReEnter Password *"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your password',
              //val => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />
        </div>
        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
        <div class="text-subtitle2 q-pl-xs">Permissions</div>
        <div class="q-gutter-sm">
          <q-checkbox
            v-for="(perm, index) in allPermissions"
            :key="index"
            keep-color
            v-model="permissions"
            :label="perm"
            :val="perm"
            :color="perm == 'admin' ? 'red' : 'green'"
          />
          <!-- <q-checkbox
            keep-color
            v-model="permissions"
            label="Orange"
            val="Orange"
            color="orange"
          />
          <q-checkbox
            keep-color
            v-model="permissions"
            label="Red"
            val="Red"
            color="red"
          />
          <q-checkbox
            keep-color
            v-model="permissions"
            label="Cyan"
            val="Cyan"
            color="cyan"
          /> -->
        </div>
        <div class="row">
          <q-space></q-space>
          <q-btn label="Update" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase';
import { firebaseApp, firebaseAuth, firestore } from '../boot/firebase';

import { QSpinnerPie } from 'quasar';
import jwt_decode from 'jwt-decode';
export default {
  data() {
    return {
      email: null,
      password: null,
      cnfPassword: null,
      name: null,

      roles: ['counsellor', 'team lead', 'senior manager', 'auditor'],
      role: null,
      id: null,
      permissions: ['teal', 'orange', 'red', 'cyan'],
      allPermissions: [],
      chngePassword: false,
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

      // check is password change is selected and verify password
      if (this.password != this.cnfPassword) {
        this.$q.loading.hide();
        return this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: "password doesn't match",
        });
      }
      if (this.permissions.includes('admin')) {
        this.permissions = ['admin', 'viewAll', 'edit', 'add'];
      }
      this.$axios({
        url: 'http://localhost:3000/updateUser',
        method: 'PUT',
        data: {
          user: {
            id: this.id,
            name: this.name,
            email: this.email,
            // password: this.password,
            role: this.role,
            permissions: this.permissions,
          },
        },
        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          console.log('User updated ', res);
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
          this.$q.loading.hide();
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'User details updated',
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

    populateData() {
      const user = localStorage.getItem('access-token');
      if (user) {
        const userDetails = jwt_decode(user);
        // this.permissions = userDetails.permissions;

        if (userDetails.permissions.includes('admin')) {
          this.$axios({
            url: `${process.env.API_URL}/getUser/${this.id}`,
            method: 'GET',

            headers: {
              authorization: `Bearer${localStorage.getItem('access-token')}`,
            },
          })
            .then(res => {
              console.log('users ', res);
              const data = res.data.user;

              this.name = data.name;
              this.email = data.email;
              this.role = data.role;
              this.permissions = data.permissions;
              // this.user.id = doc.id;
              // if (doc.data().clockInTime) {
              //   this.user.clockInTime = doc
              //     .data()
              //     .clockInTime.toDate()
              //     .toLocaleTimeString();
              // }
            })
            .catch(err => {
              console.log('error ', err);
            });
        }
      }

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

      this.$axios({
        url: `${process.env.API_URL}/permissions`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        this.allPermissions = [];
        res.data.permissions.forEach(permision => {
          this.allPermissions.push(permision.name);
        });
        this.allPermissions.sort();
      });
    },
  },
  mounted() {
    (this.allPermissions = []), (this.id = this.$route.params.id);

    this.populateData();
  },
};
</script>

<style>
.custom-width {
  width: 60%;
}
</style>
