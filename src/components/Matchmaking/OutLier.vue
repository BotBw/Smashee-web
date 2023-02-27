<template>
  <div class="pg">
    <div class="card-body">
    <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
div.pg {
  height: 80vh;
  width: 80vw;
  margin: 40px auto;
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 5%;
}

div.card-body {
  height: 100%;
  width: 100%;
}
</style>