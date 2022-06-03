<template>
  <div style="display: flex; width: 100%;overflow: hidden;">
    <div style="display: flex; flex: 1; min-width: 180px; margin-right: 24px;">
      <ul style="width: 100%;">
        <li class="mirror_li" :class="{ active: currentMenu == index }" @click="currentMenu = index" v-for="(item, index) in data" :key="index">
          <strong style="margin-right:12px" v-show="currentMenu == index">></strong>
          <strong>{{ item.title }}</strong>
        </li>
      </ul>
    </div>
    <div style="display: flex; flex-basis: auto; flex: 4; width: 0; flex-direction: column;">
      <div v-if="currentMenu != -1" style="display: flex;flex: 0 1 auto;width: 100%; height: 42px; overflow: scroll hidden;border: 1px solid #333;margin-top: 12px;border-radius: 12px;">
        <ul style="white-space: nowrap;">
          <li @click="currentDataIndex = index" class="module_nav_li" v-for="(item, index) in wrapperData" :key="index">
            {{ (item as any).name }}
          </li>
        </ul>
      </div>
      <div  style="display: flex;flex: 1 1 auto; flex-direction: column; justify-content: center; justify-items: center; align-items: center;" v-if="currentMirrorData != null">
        <img v-if="!!currentMirrorData.logo" :src="currentMirrorData.logo" alt="图标" />
        <h2 style="font-size: 24px">{{ currentMirrorData.name }}</h2>
        <p>{{ currentMirrorData.desc }}</p>
        <p>
          <a style="color: #333" :href="currentMirrorData.api">{{ currentMirrorData.api }}</a>
        </p>
        <p style="  background: pink;
  color: #fff;
  border-radius: 4px;
  padding: 6px 12px;
  margin-top: 12px;
" v-if="currentMirrorData.nsfw">
          NSFW 资源
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import fetch from 'unfetch'
import cacheMap from '@/shared';
import isObject from '@/utils';

interface MirrorMenuItemModel {
  msg: string,
  title: string,
  url: string
}

interface MirrorItem {
  logo: string,
  name: string,
  desc: string,
  api: any,
  group: any,
  api_path: string,
  root_url: string,
  nsfw: boolean,
  id: string,
  status: boolean,
}

const data = ref<MirrorMenuItemModel[]>([])

async function getMirrorList() {
  const _data = await (await fetch('/s.json')).json() as MirrorMenuItemModel[]
  data.value = _data 
}

enum mirrorDataVoStatus {
  array,
  object,
}

type unknowMirrorData = MirrorItem | MirrorItem[]

interface mirrorDataVo {
  status: mirrorDataVoStatus,
  data: unknowMirrorData
}

async function getMirrorDdata(item: MirrorMenuItemModel) {
  const _data = await (await fetch(item.url)).json() as unknowMirrorData
  return <mirrorDataVo>{
    status: Array.isArray(_data) ? mirrorDataVoStatus.array : mirrorDataVoStatus.object,
    data: _data
  }
}

async function updateMirrorDdataAsIndex(index: number) {
  const item = data.value[index]
  const keyID = item.url
  const hasValue = cacheMap.has(keyID)
  let result: MirrorItem[] = []
  if (hasValue) {
    result = cacheMap.get(keyID) as any
  } else {
    const _data = await getMirrorDdata(item)
    if (_data.status == mirrorDataVoStatus.object) {
      result.push(_data.data as MirrorItem)
    } else {
      result = _data.data as MirrorItem[]
    }
    cacheMap.push(keyID, result)
  }
  wrapperData.value = result
}

const wrapperData = ref<MirrorItem[]>([]);

// const wrapperCurrentData = computed(() => {
//   return wrapperData.value[current.value]
// })

const currentDataIndex = ref<number>(-1)

const currentMirrorData = computed(() => {
  const value = wrapperData.value[currentDataIndex.value]
  if (!value) return null
  let api = value.api
  let nsfw = value.nsfw
  if (isObject(api)) {
    api = api.root + api.path
  }
  if (!nsfw) {
    const group = value['group']
    if (!!group) {
      nsfw = group == '18禁'
    }
  }
  return Object.assign({}, value, { api, nsfw })
})

const _currentMenu = ref<number>(-1)

const currentMenu = computed<number>({
  set(newVal: number) {
    _currentMenu.value = newVal
    currentDataIndex.value = -1
    updateMirrorDdataAsIndex(newVal)
  },
  get() {
    return _currentMenu.value
  }
})

onMounted(()=> {
  getMirrorList()
})
</script> 

<style scoped>
.mirror_li {
  margin: 24px 0;
  cursor: pointer;
  font-size: 12px;
  padding: 6px 12px;
  user-select: none;
  text-align: center;
  box-sizing: content-box;
  font-weight: 100;
  transition: all .2s;
}
.mirror_li.active {
  background-color: #f5f5f5;
  border-radius: 12px;
}
.module_nav_li {
  display: inline-block;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all .3s;
  line-height: 42px;
  font-size: 12px;
}
.module_nav_li:hover {
  background-color: #f5f5f5;
  border-radius: 12px;
}
</style>