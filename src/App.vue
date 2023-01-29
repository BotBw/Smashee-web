<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
// import $ from "jquery"

export default {
  components: {
    NavBar
  },
  // setup() {
  //   $.ajax({
  //     url: "http://localhost:12345/user/account/getToken",
  //     type: "POST",
  //     data: {
  //       usrname: "admin",
  //       pwd: "1019"
  //     },
  //     success(resp) {
  //       console.log(resp);
  //     },
  //     error(resp) {
  //       console.log(resp)
  //     }
  //   })
  // }
}
</script>

<style>
body {
  background-image: url("https://cdn.acwing.com/media/article/image/2022/07/07/1_59b8f162fd-background.png");
  background-size: cover;
}
</style>
