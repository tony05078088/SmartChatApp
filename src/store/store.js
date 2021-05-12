import { firebaseAuth, firebaseDb } from "boot/firebase";
import { Object } from "core-js";
import Vue from "vue";
let messageRef;
const state = {
  userDetails: {},
  users: {},
  messages: {}
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          name: payload.name,
          email: payload.email,
          online: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // user is logged in
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setUserDetail", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          });
        });
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: {
            online: true
          }
        });
        dispatch("firebaseGetUsers");
        this.$router.push("/");
      } else {
        // user is logged out
        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });
        commit("setUserDetail", {});
        this.$router.replace("/auth");
      }
    });
  },
  firebaseUpdateUser({}, payload) {
    firebaseDb.ref("users/" + payload.userId).update(payload.updates);
  },
  firebaseGetUsers({ commit }) {
    firebaseDb.ref("users").on("child_added", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("addUser", {
        userId,
        userDetails
      });
    });
    firebaseDb.ref("users").on("child_changed", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("updateUser", {
        userId,
        userDetails
      });
    });
  },
  firebaseGetMessage({ state, commit }, otherId) {
    let userId = state.userDetails.userId;
    messageRef = firebaseDb.ref("chats/" + userId + "/" + otherId);
    messageRef.on("child_added", snapshot => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("addMessage", {
        messageId,
        messageDetails
      });
    });
  },
  firebaseStopGettingMessages({ commit }) {
    if (messageRef) {
      messageRef.off("child_added");
      commit("clearMessages");
    }
  },
  firebaseSendMessage({ state }, payload) {
    firebaseDb
      .ref("chats/" + state.userDetails.userId + "/" + payload.otherId)
      .push(payload.message);

    payload.message.from = "them";
    firebaseDb
      .ref("chats/" + payload.otherId + "/" + state.userDetails.userId)
      .push(payload.message);
  }
};

const mutations = {
  setUserDetail(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails);
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails);
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails);
  },
  clearMessages(state) {
    state.messages = {};
  }
};

const getters = {
  users: state => {
    let usersFilter = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFilter[key] = state.users[key];
      }
    });
    return usersFilter;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
