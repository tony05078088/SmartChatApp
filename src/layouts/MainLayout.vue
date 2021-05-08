<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          flat
          dense
          icon="arrow_back"
          label="Back "
        />
        <q-toolbar-title class="absolute-center">
          {{ titles }}
        </q-toolbar-title>

        <q-btn
          to="/auth"
          class="absolute-right q-pr-sm "
          flat
          dense
          no-caps
          icon="account_circle"
          label="Login "
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  computed: {
    titles() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") {
        return "SmartChatApp";
      } else if (currentPath == "/chat") {
        return "Chat";
      } else if (currentPath == "/auth") {
        return "Auth";
      } else return false;
    }
  }
};
</script>
