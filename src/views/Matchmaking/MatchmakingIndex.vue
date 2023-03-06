<template>
    <PlayGround v-if="store.state.matchmaking.status === 'playing'"></PlayGround>
    <QueueGround v-if="store.state.matchmaking.status === 'queuing'"></QueueGround>
    <ScoreBoard v-if="store.state.matchmaking.result != null"></ScoreBoard>
</template>

<script setup>
import { Snake } from "@/assets/scripts/GreedySnake/Snake";
import PlayGround from "@/components/Matchmaking/PlayGround.vue";
import QueueGround from "@/components/Matchmaking/QueueGround.vue";
import ScoreBoard from "@/components/Matchmaking/ScoreBoard.vue";
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

    console.log(data);

    if(data.event === "START") {
      store.commit("setOpponent", data.opponent);
      store.commit("setGameInfo", data.gameInfo);
      setTimeout(() => {
        store.commit("setStatus", "playing");
      }, 3000);
    } else if(data.event === "MOVE") {
      const game = store.state.matchmaking.greedySnake;
      const [snake1, snake2] = game.snakes;
      snake1.set_dir_string(data.player1);
      snake2.set_dir_string(data.player2);
    } else if(data.event === "END") {
      const game = store.state.matchmaking.greedySnake;
      const [snake1, snake2] = game.snakes;

      if(data.status === "DRAW" || data.status === "SNAKE1_WIN") {
        snake2.state = Snake.StateEnum.died;
      }

      if(data.status === "DRAW" || data.status === "SNAKE2_WIN") {
        snake1.state = Snake.StateEnum.died;
      }

      store.commit("setResult", data.status);
    }
  }

  store.commit("resetOpponent");
});

onUnmounted(() => {
  socket.close();
  store.commit("setStatus", "queuing");
});

</script>

<style scoped>
</style>