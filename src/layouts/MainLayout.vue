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
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm "
          flat
          dense
          no-caps
          icon="account_circle"
          label="Login "
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm "
          flat
          dense
          no-caps
          icon="account_circle"
        >
          Logout<br />
          {{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "../mixins/mixin-other-user-details";
export default {
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("store", ["userDetails"]),
    titles() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") {
        return "SmartChatApp";
      } else if (currentPath.includes("/chat")) {
        return this.otherUserDetails.name;
      } else if (currentPath.includes("/auth")) {
        return "Auth";
      } else return "";
    }
  },
  methods: {
    ...mapActions("store", ["logoutUser"])
  }
};
</script>

<style lang="stylus">
.q-toolbar
 .q-btn
    line-height: 1.2
</style>
