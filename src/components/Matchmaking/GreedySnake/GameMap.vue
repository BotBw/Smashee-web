<template>
  <div ref="div">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import GameMap from '@/assets/scripts/GreedySnake/GameMap';

export default {
  name: "GameMap",

  setup: () => {
    let div = ref(null);
    let canvas = ref(null);

    onMounted(() => {
      new GameMap(canvas.value.getContext('2d'), div.value, "default");
    });

    return {
      div,
      canvas
    }
  }
}
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