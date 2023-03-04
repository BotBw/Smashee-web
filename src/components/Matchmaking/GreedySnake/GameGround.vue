<template>
  <div ref="div">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import GreedySnake from '@/assets/scripts/GreedySnake/GreedySnake';

const store = useStore();
let div = ref(null);
let canvas = ref(null);

onMounted(() => {
  store.commit("setGreedySnake",
    new GreedySnake(canvas.value.getContext('2d'), div.value, store.state.matchmaking.socket,store.state.matchmaking.gameInfo.map)
  )
});
</script>


<style scoped>
div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  background-color: rgb(151, 255, 140);
}
</style>