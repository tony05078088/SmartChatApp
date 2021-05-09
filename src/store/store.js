import { firebaseAuth, firebaseDb } from "boot/firebase";

const state = {
  userDetails: {}
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
    console.log(payload);
    firebaseDb.ref("users/" + payload.userId).update(payload.updates);
  }
};

const mutations = {
  setUserDetail(state, payload) {
    state.userDetails = payload;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
