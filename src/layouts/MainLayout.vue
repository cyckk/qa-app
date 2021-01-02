<template>
  <q-layout view="hHh lpr fFf" class=" rounded-borders">
    <q-header v-if="this.$route.name != 'ReportView'" elevated class="header">
      <q-toolbar>
        <q-btn
          v-if="this.$route.name != 'Login'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click.prevent="leftDrawerOpen = !leftDrawerOpen"
        />
        <!-- <q-btn
          v-if="
            this.$route.name == 'Home' &&
              permissions.includes('edit') &&
              !permissions.includes('admin')
          "
          dense
          flat
          label="New Audit"
          icon="edit"
          @click="pushRoute('/form')"
        ></q-btn> -->
        <!-- <q-btn
          v-if="
            this.$route.name != 'Home' &&
              this.$route.name != 'Login' &&
              !permissions.includes('admin')
          "
          dense
          flat
          label=""
          icon="home"
          @click="pushRoute('/')"
        ></q-btn> -->

        <q-toolbar-title class="text-center">
          Datatrained
        </q-toolbar-title>
        <div v-if="signedIn">
          <!-- <q-icon class="q-pr-none" name="person" size="24px" />
          <span>{{ name }}</span>
          <q-btn
            flat
            icon="logout"
            class="primary q-ml-xs"
            @click="signout"
          ></q-btn> -->

          <q-btn
            flat
            color=""
            class="text-capitalize"
            icon="person"
            :label="name"
          >
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <!-- <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>

                  <q-btn
                    flat
                    size=""
                    color=""
                    label="Change password"
                    class="bg-grey-4 text-capitalize q-ml-xs"
                    @click="pushRoute('/settings')"
                  ></q-btn>
                </div> -->

                <!-- <q-separator vertical inset class="q-mx-lg" /> -->

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ name }}</div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    v-close-popup
                    @click="signout"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="this.$route.name != 'ReportView' && this.$route.name != 'Login'"
      v-model="leftDrawerOpen"
      :show-if-above="true"
      class="text-black"
      elevated
      content-class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item-label header class="text-grey-8">
            Navigation
          </q-item-label>
          <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :permissions="permissions"
        /> -->

          <q-item clickable to="/">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
              <q-item-label caption> </q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item expand-separator icon="assignment" label="QA">
            <q-list class="q-pl-lg">
              <q-item clickable to="/reports">
                <q-item-section avatar>
                  <q-icon name="content_copy" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>View Audit Reports</q-item-label>
                  <q-item-label caption>
                    View all reports
                  </q-item-label>
                </q-item-section>
              </q-item>
              <!-- <q-item>
                <q-item-section avatar>
                  <q-icon name="note_add" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>New Audit</q-item-label>
                  <q-item-label caption>
                    View all reports
                  </q-item-label>
                </q-item-section>
              </q-item> -->
            </q-list>
          </q-expansion-item>

          <q-expansion-item
            v-if="permissions.includes('editUser')"
            expand-separator
            icon="people_alt"
            label="Employees"
          >
            <q-list class="q-pl-lg">
              <q-item clickable to="/users">
                <q-item-section avatar>
                  <q-icon name="people_alt" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>View All Employees</q-item-label>
                  <q-item-label caption> </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable to="/addRole">
                <q-item-section avatar>
                  <q-icon name="note_add" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Add new Role</q-item-label>
                  <q-item-label caption> </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <!-- <q-item
            v-for="(link, index) in essentialLinks"
            :key="index"
            clickable
            tag="a"
            target=""
            @click="pushRoute(link.link)"
          >
            <q-item-section v-if="link.icon" avatar>
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>
                {{ link.caption }}
              </q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list></q-scroll-area
      >
    </q-drawer>

    <q-page-container>
      <!-- <div class="text-h4 q-mt-sm">Logged in as: {{ name }}</div> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import jwt_decode from 'jwt-decode';
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'New Audit',
    caption: 'File a new audit report',
    icon: 'edit',
    link: '/form',
  },
  {
    title: 'Register User',
    caption: 'add a new user',
    icon: 'add',
    link: '/addUser',
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      signedIn: false,
      role: null,
      permissions: [],
      name: null,
    };
  },
  methods: {
    signout() {
      // this.$auth.signOut().then(res => console.log('signout ', res));
      localStorage.removeItem('access-token');
      this.signedIn = false;
      this.$router.replace('/login');
      //   this.$forceUpdate();
      //   window.location.reload();
      //   this.checkSignedIn();
    },
    async checkSignedIn() {
      const user = localStorage.getItem('access-token');
      if (user) {
        const userDetails = await jwt_decode(user);
        this.permissions = userDetails.permissions;
        this.name = userDetails.name;

        this.signedIn = true;

        return;
      }
      this.signedIn = false;
    },

    pushRoute(route) {
      console.log('pushing to ', { name: route });
      this.$router
        .replace(route)
        .then(res => console.log('route pushed ', res));
    },
  },
  computed: {
    isSignedIn() {
      return this.signedIn;
    },
    switchToOverlay() {
      return window.innerWidth < 1000;
    },
    alwaysShow() {
      return window.innerWidth > 1000;
    },
  },
  mounted() {
    this.checkSignedIn();
  },
  updated() {
    if (!this.permissions) this.checkSignedIn();
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: linear-gradient(145deg, #1976d2 11%, #0f477e 75%);
}
</style>
