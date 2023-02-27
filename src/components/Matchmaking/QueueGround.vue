<template>
  <OutLier>
    <div class="row">
      <div class="col-6">
        <div class="avatar">
          <img :src="$store.state.user.avatar" alt="">
        </div>
        <div class="usrname">
          {{ $store.state.user.usrname }}
        </div>
      </div>
      <div class="col-6">
        <div class="avatar">
          <img :src="$store.state.matchmaking.opponent.avatar" alt="">
        </div>
        <div class="usrname">
          {{ $store.state.matchmaking.opponent.usrname }}
        </div>
      </div>
      <div id="btn" class="col-12">
        <button class="btn btn-success btn-lg" @click="switchBtn">{{btnMsg}}</button>
      </div>
    </div>
  </OutLier>
</template>

<script setup>
import OutLier from './OutLier.vue';
import { ref } from 'vue';
import store from '@/store';

const btnMsg = ref("start");

const switchBtn = () => {
  console.log(store.state.matchmaking);
  if(btnMsg.value === "start") {
    btnMsg.value = "cancel";
    store.state.matchmaking.socket.send(JSON.stringify({
      event: "start"
    }));
  } else {
    btnMsg.value = "start"
    store.state.matchmaking.socket.send(JSON.stringify({
      event: "cancel"
    }));
  }
}

</script>

<style scoped>
div.avatar {
  text-align: center;
  padding-top: 75px;

}
div.avatar > img {
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
div.usrname {
  text-align: center;
  font-size: 40px;
  font-weight: 1000;
  color: aliceblue;
}

#btn {
  text-align: center;
  padding: 100px;
}
</style>