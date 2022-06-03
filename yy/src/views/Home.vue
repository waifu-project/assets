<template>
  <div class="nav">
    <div class="nav" style="margin: 0 auto; width: 900px;padding: 0;">
      <div>
      <div class="logo_dex"></div>
      <img width="42" alt="Vue logo" src="@/assets/logo.png" />
    </div>
    <ul class="nav_item">
      <li class="active_line" :style="{
        opacity: hoverInit ? 1 : 0,
        left: postion.x + 'px',
        width: hoverWidth + 'px',
        transition: `all ${hoverInit ? '.2s' : ''}`
      }"></li>
      <li
        @mouseenter="handleMouseEnterNavItem($event, index)"
        @mouseleave="handleMouseLeave"
        v-for="(item, index) in menus" :key="index"
      >
        <router-link :to="{ path: item.path, replace: true,}">
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
    </div>
  </div>
  <div style="margin: 0 auto; width: 900px;padding: 0;">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';

const menus = [
  {
    "name": "资源",
    "path": "/assets"
  },
  {
    "name": "生成",
    "path": "/generate"
  },
  {
    "name": "关于",
    "path": "/about"
  }
]
interface postionType {
  x: number,
  y: number
}
const postion = ref<postionType>({
  x: 0,
  y: 0
})

const hoverInit = ref(false)
const hoverWidth = ref<number>(0)
function handleMouseEnterNavItem(event: MouseEvent, index: number) {
  const target = event.target as HTMLElement
  hoverWidth.value = target.clientWidth
  const left = target.offsetLeft
  hoverInit.value = true
  postion.value = {
    x: left,
    y: 0,
  }
}

onMounted(() => {
  nextTick(() => {
    const vNode = Array.from(document.querySelectorAll(".nav_item li"))[1]
    postion.value.x = (vNode as any).offsetLeft
  })
})

function handleMouseLeave() {
  hoverInit.value = false
}
</script>

<style scoped>
.nav {
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 80px;
  padding-left: 42px;
  padding-right: 42px;
  padding-bottom: 12px;
  background-color: #000;
  color: #fff;
}

.nav_item li {
  display: inline-block;
  cursor: pointer;
  padding: 0 24px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  transition: all .2s;
}

.nav_item li a {
  text-decoration: none;
color: #fff;
}

.active_line {
  pointer-events: none;
  display: inline-block;
  cursor: pointer;
  padding: 0;
  margin: unset;
  position: absolute;
  background: #fff;
  background: rgba(255, 255, 255, .2);
  border-radius: 6px;
  height: 50px;
}

.logo_dex {
  display: inline-block;
  width: 80px;
  height: 50px;
  cursor: default;
  padding: 0;
  margin: unset;
  position: absolute;
  background: #fff;
  background: rgba(255, 255, 255, .2);
  border-radius: 6px;
  height: 50px;
  transition: all .2s;
}
</style>