<template>
  <q-header v-if="this.$route.name != 'ReportView'" elevated class="header">
    <q-toolbar>
      <q-btn
        v-if="permissions.includes('admin')"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
      <q-btn
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
      ></q-btn>
      <q-btn
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
      ></q-btn>

      <q-toolbar-title class="text-center">
        QA
      </q-toolbar-title>
      <div v-if="signedIn">
        <q-icon class="q-pr-none" name="person" size="24px" />
        <span>{{ name }}</span>
        <q-btn
          flat
          icon="logout"
          class="primary q-ml-xs"
          @click="signout"
        ></q-btn>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-if="permissions.includes('admin') && this.$route.name != 'ReportView'"
    v-model="leftDrawerOpen"
    show-if-above
    overlay
    content-class="bg-grey-1"
    :breakpoint="500"
  >
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :permissions="permissions"
        /> -->
        <q-item
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
        </q-item>
      </q-list></q-scroll-area
    >
  </q-drawer>
</template>

<script>
export default {};
</script>

<style></style>
