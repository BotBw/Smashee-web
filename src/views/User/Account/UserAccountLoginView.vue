<template>
    <ContentBar>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="login">
          <div class="mb-3">
            <input v-model="usrname" type="text" id="usrname" class="form-control" placeholder="Username">
          </div>
          <div class="mb-3">
            <input v-model="pwd" type="password" id="pwd" class="form-control" placeholder="Password">
          </div>

          <div class="msg">{{ MSG }}</div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </ContentBar>
</template>

<script>
import ContentBar from "@/components/ContentBar.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import router from "@/router";

export default {
  components: {
    ContentBar
  },
  setup() {
    const store = useStore();
    let usrname = ref(""), pwd = ref(""), MSG = ref("");

    const JWT = localStorage.getItem("JWT")
    if(JWT) {
      const store = useStore();
      store.commit("updateToken", JWT);
      store.dispatch("getinfo", {
        success() {
          router.push({name: "Home"})
        },
        error() {}
      })
    }

    const login = () => {
      store.dispatch("login", {
        usrname: usrname.value,
        pwd: pwd.value,
        success() {
          MSG.value = ""
          store.dispatch("getinfo", {
            success() {
              router.push({name: "Home"})
            }
          })
        },
        error() {
          MSG.value = "username or password is wrong"
        }
      })
    };

    return {
      usrname, 
      pwd,
      MSG,
      login
    }
  }
}
</script>

<style scoped>
button {
  width: 100%;
}
div.msg {
  color: red;
}
</style>