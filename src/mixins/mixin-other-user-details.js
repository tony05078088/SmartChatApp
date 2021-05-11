export default {
  computed: {
    otherUserDetails() {
      if (this.$store.state.store.users[this.$route.params.otherId]) {
        return this.$store.state.store.users[this.$route.params.otherId];
      }
      return {};
    }
  }
};
