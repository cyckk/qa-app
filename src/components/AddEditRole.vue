<template>
  <q-page class="flex row q-pa-xl q-mt-xl justify-center q-col-gutter-lg">
    <div class=" col-12 col-md-5">
      <q-card class=" q-pa-lg register">
        <q-card-section class="q-pl-none">
          <span class="text-h6">Add a new Role </span>
        </q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            outlined
            type="text"
            v-model="role"
            label="Role Name *"
            lazy-rules
            :rules="[
              val =>
                (val !== null && val !== '') || 'Please type your password',
              //val => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />

          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

          <div class="row">
            <q-space></q-space>
            <q-btn label="Add Role" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card>
    </div>

    <div class="col-12 col-md-5">
      <q-toolbar class="bg-accent text-white shadow-2">
        <q-toolbar-title>All Roles</q-toolbar-title>
      </q-toolbar>

      <q-list bordered>
        <q-item
          v-for="(role, index) in roles"
          :key="index"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar style="text-transform: capitalize">
            <q-avatar color="green-9" text-color="white">
              {{ role.name[0] }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label style="text-transform: capitalize">{{
              role.name
            }}</q-item-label>
            <!-- <q-item-label caption lines="1">{{}}</q-item-label> -->
          </q-item-section>

          <!-- <q-item-section side>
            <q-icon name="chat_bubble" color="green" />
          </q-item-section> -->
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { QSpinnerHourglass, QSpinnerPie } from 'quasar';

export default {
  data() {
    return {
      role: '',
      roles: [],
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
        message: `Adding ${this.role}...`,
        messageColor: 'black',
      });
      this.$axios({
        url: `${process.env.API_URL}/addRole`,
        method: 'POST',
        data: {
          role: this.role.toLowerCase(),
        },
        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          console.log('role added ', res);
          this.$q.loading.hide();
          // console.log(doc);
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Role Added Successfully',
          });
          this.getRoles();
        })
        .catch(err => {
          console.log(err);
          this.$q.loading.hide();
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: err.message,
          });
        });
    },

    getRoles() {
      this.$axios({
        url: `${process.env.API_URL}/getRoles`,
        method: 'GET',

        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      })
        .then(res => {
          this.roles = res.data.roles;
          console.log('roles', this.roles);
        })
        .catch(err => {
          console.log('error ', err);
        });
    },
  },
  mounted() {
    this.getRoles();
  },
};
</script>

<style></style>
