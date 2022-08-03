<template>
  <div class="pg">
    <GameMap></GameMap>
  </div>
</template>

<script>
import GameMap from "./GreedySnake/GameMap.vue"

export default {
    components: {
      GameMap
    }
}
</script>

<style scoped>
div.pg {
  height: 80vh;
  width: 80vw;
  margin: 40px auto;
  background-color: bisque;
}
</style>