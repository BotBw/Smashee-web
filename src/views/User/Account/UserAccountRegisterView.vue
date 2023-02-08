<template>
  <ContentBar>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <input v-model="usrname" type="text" id="usrname" class="form-control" placeholder="Username">
          </div>
          <div class="mb-3">
            <input v-model="pwd" type="password" id="pwd" class="form-control" placeholder="Password">
          </div>
          <div class="mb-3">
            <input v-model="confirmedPwd" type="password" id="confirmedPwd" class="form-control" placeholder="Confirm password">
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="termCheck">
              <label class="form-check-label" for="termCheck">
                By clicking this box I agree to any term of use (if any).
              </label>
            </div>
          </div>

          <div class="msg">{{ MSG }}</div>
          <button class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </ContentBar>
</template>

<script setup>
import ContentBar from "@/components/ContentBar.vue";
import { ref } from "vue"
import router from "@/router";
import $ from "jquery"

const usrname = ref("")
const pwd = ref("")
const confirmedPwd = ref("")
const MSG = ref("")

const register = () => {
  $.ajax({
        url: "http://localhost:12345/user/account/register",
        type: "POST",
        data: {
          usrname: usrname.value,
          pwd: pwd.value,
          confirmedPwd: confirmedPwd.value
        },
        success(resp) {
          if (resp.MSG === "succeed") {
            router.push({name: "Login"})
          } else {
            MSG.value = resp.MSG
          }
        },
        error(resp) {
          MSG.value = resp.MSG
        }
      })
}
</script>

<style scoped>
button {
  width: 100%
}

div.msg {
  color: red;
}
</style>