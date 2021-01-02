<template>
  <q-page class="flex row q-pa-lg justify-center q-col-gutter-lg">
    <div class="audit-report col-12 col-md-5">
      <q-card class="my-card q-mt-md q-pa-lg" flat bordered>
        <div class="row q-pa-md q-pl-xl q-pr-xl justify-between items-center">
          <div class="text-h6  border q-mt-md">
            User details
          </div>
          <!-- <div>
            <q-btn
              class="q-ml-xs"
              size="md"
              padding="xs md"
              color="orange"
              icon="edit"
              label="Edit"
              :to="{ name: 'EditUser', params: { id: user.id } }"
            ></q-btn>
            <q-btn
              v-if="user.active"
              class="q-ml-xs"
              padding="xs md"
              color="deep-orange"
              icon="block"
              label="Disable"
              @click="toggleUserState({ id: user.id, active: user.active })"
              ><q-tooltip content-class="bg-accent"
                >Disable {{ user.name }}</q-tooltip
              ></q-btn
            >
            <q-btn
              v-else
              class="q-ml-xs"
              padding="xs md"
              color="green-5"
              icon="block"
              label="Enable"
              @click="toggleUserState({ id: user.id, active: user.active })"
              ><q-tooltip content-class="bg-accent"
                >Activate {{ user.name }}</q-tooltip
              ></q-btn
            >
          </div> -->
        </div>
        <table class="table table-bordered table-striped table-hover">
          <!-- <thead>
            <tr class="text-subtitle6 text-left">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead> -->
          <tbody class="">
            <tr class="">
              <th class="">Name:</th>
              <td class="text-subtitle4">
                {{ user.name }}
              </td>
            </tr>
            <tr>
              <th class="" scope="row">Email:</th>
              <td class="">
                {{ user.email }}
              </td>
            </tr>
            <tr scope="row">
              <th>Role:</th>
              <td>
                {{ user.role ? user.role.toUpperCase() : '' }}
              </td>
            </tr>
            <!-- <tr scope="row">
              <th>Clock In time:</th>
              <td>
                {{ user.clockInTime }}
              </td>
            </tr> -->
            <tr v-if="user.todaysTarget" scope="row">
              <th>Today's Target:</th>
              <td>
                {{ user.todaysTarget }}
              </td>
            </tr>
            <tr scope="row">
              <th>Permissions:</th>
              <td>
                <span
                  v-for="(perm, index) in user.permissions"
                  :key="index"
                  class="q-pa-xs"
                >
                  <q-badge color="orange">{{ perm }}</q-badge></span
                >
              </td>
            </tr>

            <!-- <tr scope="row">
              <th>Dashboard:</th>
              <td>
                <span
                  v-for="(component, index) in user.dashboardView"
                  :key="index"
                  class="q-pa-xs"
                >
                  <q-badge color="green">{{ component }}</q-badge></span
                >
                <q-btn :to="{ name: 'DashboardConfig', params: { id: id } }"
                  >Configure</q-btn
                >
              </td>
            </tr> -->
          </tbody>
        </table>
      </q-card>
    </div>

    <div
      v-if="permissions.includes('editUser')"
      class="audit-report col-12 col-md-5 "
    >
      <q-card class="my-card q-mt-md q-pa-lg" flat bordered>
        <div class="row q-pa-md q-pl-xl q-pr-xl justify-between items-center">
          <div class="text-h6  border q-mt-md">
            User Settings
          </div>
          <div>
            <q-btn
              class="q-ml-xs"
              size="md"
              padding="xs md"
              color="orange"
              icon="edit"
              label="Edit"
              :to="{ name: 'EditUser', params: { id: user.id } }"
            ></q-btn>
            <q-btn
              v-if="user.active"
              class="q-ml-xs"
              padding="xs md"
              color="deep-orange"
              icon="block"
              label="Disable"
              @click="toggleUserState({ id: user.id, active: user.active })"
              ><q-tooltip content-class="bg-accent"
                >Disable {{ user.name }}</q-tooltip
              ></q-btn
            >
            <q-btn
              v-else
              class="q-ml-xs"
              padding="xs md"
              color="green-5"
              icon="block"
              label="Enable"
              @click="toggleUserState({ id: user.id, active: user.active })"
              ><q-tooltip content-class="bg-accent"
                >Activate {{ user.name }}</q-tooltip
              ></q-btn
            >
          </div>
        </div>
        <table class="table table-bordered table-striped table-hover">
          <tbody class="">
            <tr scope="row">
              <th>Daily Auditing Target:</th>
              <td class="">
                <q-input
                  class=""
                  v-model="todaysTarget"
                  outlined
                  dense
                  type="number"
                  style="width: 80%"
                >
                  <template v-slot:after>
                    <q-btn @click="updateUser">Set</q-btn>
                  </template>
                </q-input>
              </td>
            </tr>
            <tr scope="row">
              <th>Dashboard:</th>
              <td>
                <!-- <span
                  v-for="(component, index) in user.dashboardView"
                  :key="index"
                  class="q-pa-xs"
                >
                  <q-badge color="green">{{ component }}</q-badge></span
                > -->
                <q-btn :to="{ name: 'DashboardConfig', params: { id: id } }"
                  >Configure</q-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import { QSpinnerPie } from 'quasar';
export default {
  data() {
    return {
      user: {},
      clockInTime: '',
      role: [],
      permissions: [],
      dashboardView: [],
      id: null,

      todaysTarget: null,
    };
  },
  methods: {
    // ...mapActions('user', ['toggleUserState']),

    toggleUserState(payload) {
      if (this.permissions.includes('editUser')) {
        this.$axios({
          url: `${process.env.API_URL}/toggleStatus`,
          method: 'PUT',
          data: {
            payload,
          },
          headers: {
            authorization: `Bearer${localStorage.getItem('access-token')}`,
          },
        })
          .then(res => {
            console.log('user after changing status ', res.data);
            this.user = res.data.user;
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
    },

    updateUser() {
      this.$q.loading.show({
        delay: 400, // ms
        spinner: QSpinnerPie,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'cyan-1',
        message: `Setting today's target for ${this.name}...`,
        messageColor: 'black',
      });
      this.$axios({
        url: `${process.env.API_URL}/updateUser`,
        method: 'PUT',
        data: {
          user: {
            id: this.id,
            todaysTarget: this.todaysTarget,
          },
        },
        headers: {
          authorization: `Bearer${localStorage.getItem('access-token')}`,
        },
      }).then(res => {
        console.log('response ', res.data);

        this.user = res.data.update;
        this.$q.loading.hide();
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Setting target done',
        });
      });
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    console.log('this ', this.id);
    // this.user = ;
    const user = localStorage.getItem('access-token');
    if (user) {
      const userDetails = jwt_decode(user);
      this.permissions = userDetails.permissions;

      if (this.permissions.includes('admin')) {
        this.$axios({
          url: `${process.env.API_URL}/getUser/${this.id}`,
          method: 'GET',

          headers: {
            authorization: `Bearer${localStorage.getItem('access-token')}`,
          },
        })
          .then(res => {
            console.log('users ', res);
            this.user = res.data.user;
            console.log('user ', this.user);
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
  },
};
</script>

<style scoped>
tr {
  padding: 10px;
  /* padding-left: 0; */
  border-bottom: 1px solid rgba(216, 214, 214, 0.836);
}

th,
td {
  padding: 10px;
  /* padding-left: 0; */
  width: 50%;
}

td {
  padding-left: 70px;
}

th {
  padding-right: 100px;
  text-align: right;
}
.no-border {
  border-bottom: none;
}

table {
  /* border: 1px solid rgb(214, 214, 214);
   border-radius: 10px; */
  border-collapse: collapse;
  width: 100%;
  padding: 5px;
}

tr:nth-child(even) {
  background-color: #fafafa;
}
</style>
