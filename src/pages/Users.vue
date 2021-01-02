<template>
  <q-page class="flex row q-pa-lg justify-center">
    <div class="audit-report col-12 col-lg-8">
      <q-card class="my-card q-mt-md" flat bordered>
        <!-- <div class="text-h6 text-center border q-mt-md">
          Application Users
        </div> -->

        <div
          class="row q-pa-sm q-pl-lg q-pr-lg justify-between items-center q-mt-md q-mb-sm"
        >
          <div class="text-h6">
            Applicaton Users
          </div>
          <div class="">
            <q-btn
              v-if="permissions.includes('admin')"
              class="q-ml-xs"
              padding="xs md"
              color="green-5"
              icon="person_add"
              label="New User"
              @click="pushRoute('/addUser')"
            ></q-btn>
          </div>
        </div>
        <q-input
          class="q-ml-xs q-mr-xs"
          v-model="searchTerm"
          debounce="500"
          outlined
          dense
          placeholder="Search"
          hint="Search users with their Name"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr class="text-subtitle6 text-left">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <!-- <th>Permissions</th> -->
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="index"
              :class="!user.active ? 'bg-deep-orange-1' : ''"
            >
              <th scope="row" class="col-1">{{ index + 1 }}</th>
              <td class="text-subtitle4">
                {{ user.name }}
              </td>
              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.role ? user.role.toUpperCase() : '' }}
              </td>
              <!-- <td>
                <span
                  v-for="(perm, index) in user.permissions"
                  :key="index"
                  class="q-pa-xs"
                >
                  <q-badge color="orange">{{ perm }}</q-badge></span
                >
              </td> -->

              <td class="text-center">
                <!-- <q-btn
                  size="sm"
                  padding="xs md"
                  color="primary"
                  icon="visibility"
                  :to="{ name: 'User', params: { id: user.id } }"
                ></q-btn> -->

                <q-btn
                  v-if="permissions.includes('editUser')"
                  class="q-ml-xs"
                  size="sm"
                  padding="xs md"
                  color="orange"
                  icon="edit"
                  :to="{ name: 'EditUser', params: { id: user.id } }"
                ></q-btn>

                <q-btn
                  v-if="user.active && permissions.includes('editUser')"
                  class="q-ml-xs"
                  size="sm"
                  padding="xs md"
                  color="deep-orange"
                  icon="block"
                  tooltip="Disable User"
                  @click="toggleUserState({ id: user.id, active: user.active })"
                  ><q-tooltip content-class="bg-accent"
                    >Disable {{ user.name }}</q-tooltip
                  ></q-btn
                >
                <q-btn
                  v-if="!user.active && permissions.includes('editUser')"
                  class="q-ml-xs"
                  size="sm"
                  padding="xs md"
                  color="green-5"
                  icon="check_circle"
                  tooltip="Disable User"
                  @click="toggleUserState({ id: user.id, active: user.active })"
                  ><q-tooltip content-class="bg-accent"
                    >Activate {{ user.name }}</q-tooltip
                  ></q-btn
                >

                <q-btn
                  class="q-ml-xs"
                  size="sm"
                  padding="xs md"
                  flat
                  color=""
                  icon="settings"
                  tooltip="Settings"
                  :to="{ name: 'User', params: { id: user.id } }"
                >
                  <!-- <q-tooltip content-class="bg-accent"
                    >Activate {{ user.name }}</q-tooltip
                  > -->
                </q-btn>
              </td>
              <!-- <td>
                <q-badge
                  :color="report.result == 'F' ? 'deep-orange-5' : 'green-4'"
                >
                  {{ report.result }}
                </q-badge>
              </td>
              <td>
                <q-btn
                  size="sm"
                  padding="xs md"
                  color="primary"
                  icon="visibility"
                  label="View"
                  :to="{ name: 'Report', params: { id: report.id } }"
                ></q-btn>
              </td>
              <td>
                <q-btn
                  :disable="!permissions.includes('edit')"
                  size="sm"
                  padding="xs md"
                  color="deep-orange"
                  icon="edit"
                  label="Edit"
                  :to="{ name: 'Form', params: { id: report.id } }"
                ></q-btn>
              </td>
              <td>
                <q-btn
                  size="sm"
                  padding="xs md"
                  color="secondary"
                  icon="save_alt"
                  label="Download"
                  :to="{ name: 'Pdf', params: { id: report.id } }"
                ></q-btn>
              </td> -->
              <!-- <td class="text-center">
                <q-badge
                  :color="
                    report. != 'YES' ? 'deep-orange-6' : 'green-5'
                  "
                  text-color="grey-3"
                >
                  {{ question.answer }}</q-badge
                >
              </td>
              <td class="text-center">
                <q-badge color="yellow-6" text-color="grey-9">
                  {{ question.marks }}
                </q-badge>
              </td> -->
              <!-- </tr> -->
              <!-- <tr>
              <th class="text-left" colspan="3">Total Score</th>
              <td class="text-center">
                <q-badge
                  v-if="report.result != 'F'"
                  class=" q-pl-sm q-pr-sm text-subtitle2"
                  color="yellow-9"
                  text-color="grey-9"
                >
                  {{ grades.score }}
                </q-badge>
                <q-badge v-else color="deep-orange" label="NA"></q-badge>
              </td>
            </tr> -->
            </tr>
          </tbody>
        </table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      allUsers: [],
      users: [],
      role: [],
      permissions: [],
      searchTerm: null,
    };
  },

  methods: {
    // ...mapActions('user', ['toggleUserState']),\

    populateData() {
      this.users = [];
      this.allUsers = [];

      const user = localStorage.getItem('access-token');
      if (user) {
        const userDetails = jwt_decode(user);
        this.permissions = userDetails.permissions;

        if (this.permissions.includes('admin')) {
          this.$axios({
            url: `${process.env.API_URL}/allUser`,
            method: 'GET',

            headers: {
              authorization: `Bearer${localStorage.getItem('access-token')}`,
            },
          })
            .then(res => {
              console.log('response ', res);
              const data = res.data.data;
              this.allUsers = data;
              this.users = this.allUsers;
            })
            .catch(err => {
              console.log('error whle loading users ', err);
            });
        }
      }
    },

    toggleUserState(payload) {
      if (this.permissions.includes('admin')) {
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
            this.allUsers = this.allUsers.map(user => {
              if (user.id == payload.id) {
                user = res.data.user;
              }
              return user;
            });
            this.users = this.allUsers;
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

    pushRoute(route) {
      console.log('pushing to ', { name: route });
      this.$router
        .replace(route)
        .then(res => console.log('route pushed ', res));
    },

    search() {
      this.users = this.allUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },

  watch: {
    searchTerm() {
      this.users = this.allUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },

  async created() {
    this.populateData();
  },
};
</script>

<style scoped>
tr {
  padding: 5px;
  border-bottom: 1px solid rgba(216, 214, 214, 0.836);
}

th,
td {
  padding: 5px;
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
