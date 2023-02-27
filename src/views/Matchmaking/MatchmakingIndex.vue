<template>
    <PlayGround v-if="store.state.matchmaking.status === 'playing'"></PlayGround>
    <QueueGround v-if="store.state.matchmaking.status === 'queuing'"></QueueGround>
</template>

<script setup>
import PlayGround from "@/components/Matchmaking/PlayGround.vue";
import QueueGround from "@/components/Matchmaking/QueueGround.vue";
import { onMounted, onUnmounted } from "vue";
import {useStore} from 'vuex'

const store = useStore();
const socketUrl = `ws://localhost:12345/websocket/${store.state.user.JWT}`;
let socket = null;

onMounted(() => {
  socket = new WebSocket(socketUrl);
  
  socket.onopen = () => {
    store.commit('setSocket', socket);
    console.log("onopen");
  };

  socket.onclose = () => {
    console.log("onclose");
  };

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if(data.event === "GameStart") {
      store.commit("setOpponent", data.opponent);
      store.commit("setMap", data.map);
      
      setTimeout(() => {
        store.commit("setStatus", "playing");
      }, 3000);
    }
  }

  store.commit("setOpponent", {
    usrname: "searching...",
    avatar: "data:image/png;base64,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"
  })

});

onUnmounted(() => {
  socket.close();
  store.commit("setStatus", "queuing");

});

</script>

<style scoped>
</style>