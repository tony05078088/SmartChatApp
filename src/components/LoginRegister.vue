<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab === 'register'"
      class="q-mb-md"
      outlined
      v-model="formData.name"
      label="Name"
    />
    <q-input
      outlined
      class="q-mb-md"
      type="email"
      v-model="formData.email"
      label="Email"
    />
    <q-input
      class="q-mb-md"
      outlined
      type="password"
      v-model="formData.password"
      label="Password"
    />
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    }
  }
};
</script>

<style></style>
