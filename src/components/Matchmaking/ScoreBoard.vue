<template>
  <div class="score-board">
      <div class="score-board-text" v-if="$store.state.matchmaking.result === 'DRAW'">
          DRAW
      </div>
      <div class="score-board-text" v-else-if="$store.state.matchmaking.result === 'SNAKE1_WIN' && $store.state.matchmaking.gameInfo.player1.uid == $store.state.user.id">
          YOU WIN!
      </div>
      <div class="score-board-text" v-else-if="$store.state.matchmaking.result === 'SNAKE2_WIN' && $store.state.matchmaking.gameInfo.player2.uid == $store.state.user.id">
          YOU WIN!
      </div>
      <div class="score-board-text" v-else>
          YOU LOSE!
      </div>
      <div class="score-board-btn">
          <button @click="restart" type="button" class="btn btn-warning btn-lg">
            CONFIRM
          </button>
      </div>
  </div>    
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const restart = () => {
    store.commit("setStatus", "queuing");
    store.commit("setResult", null);
    store.commit("resetOpponent");
}
</script>

<style scoped>
div.score-board {
  height: 30vh;
  width: 30vw;
  background-color: rgba(50, 50, 50, 0.5);
  position: absolute;
  top: 30vh;
  left: 35vw;
}
div.score-board-text {
  text-align: center;
  color: white;
  font-size: 50px;
  font-weight: 600;
  font-style: italic;
  padding-top: 5vh;
}

div.score-board-btn {
  padding-top: 7vh;
  text-align: center;
}
</style>
