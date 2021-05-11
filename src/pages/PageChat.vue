<template>
  <q-page class="flex column">
    <q-banner v-if="!otherUserDetails.online" class="bg-grey-4 text-center">
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="white"
            outlined
            rounded
            bottom-slots
            label="Message"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                type="submit"
                @click="sendMessage"
                color="white"
                icon="send"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";
export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    ...mapActions("store", [
      "firebaseGetMessage",
      "firebaseStopGettingMessages",
      "firebaseSendMessage"
    ]),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me"
        },
        otherId: this.$route.params.otherId
      });
    }
  },
  mounted() {
    this.firebaseGetMessage(this.$route.params.otherId);
  },
  computed: {
    ...mapState("store", ["messages", "userDetails"])
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  }
};
</script>
