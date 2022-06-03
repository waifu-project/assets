<template>
  <div style="margin: 10vh auto 0;width: 20vw;">
    <form style="background: #f1f1f1;padding: 24px;border-radius: 12px;margin-bottom: 24px;">
      <div class="input_label">
        <span>图标</span>
        <input type="text" v-model="obj.logo" />
      </div>
      <div class="input_label">
        <span>名称</span>
        <input type="text" v-model="obj.name" />
      </div>
      <div class="input_label">
        <span>API</span>
        <input type="text" v-model="obj.api" />
      </div>
      <div class="input_label">
        <span>NSFW</span>
        <input type="checkbox" v-model="obj.nsfw" />
      </div>
    </form>
    <div v-if="isNext" style="display: flex; justify-content: center; align-items: center;">
      <button @click="handleGen">生成</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { exportFile } from '@/utils'
const obj = ref({
  logo: '',
  name: '',
  api: '',
  nsfw: false,
})
const isNext = computed(()=> {
  const value = obj.value
  return !!value.logo && !!value.name && !!value.api
})
function handleGen() {
  const value = JSON.stringify(obj.value)
  exportFile("yy.json", value)
}
</script>

<style scoped>
span {
  display: inline-block;
  width: 40px;
  text-align: right;
  margin-right: 12px;
}
.input_label {
  margin: 12px 0;
}
</style>