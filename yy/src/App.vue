<script setup lang="ts">

</script>

<template>
  <div id="bg" >
    <img src="@/assets/waifu.png" />
  </div>
  <router-view></router-view>
</template>

<style scoped>
#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  opacity: .6;
}
#bg img {
  width: 100%;
  height: 100%;
}
</style>
