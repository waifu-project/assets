<template>
  <div style="margin-top: 6vh">
    <div v-html="_html" class="markdown-body"></div>
  </div>
</template>

<script lang="ts" setup>
import cacheMap from '@/shared';
import { onMounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';

const markdownBody = ref<string>('')

const _html = ref<string>('')

function addGithubStyle() {
  const ID = 'markdown-github'
  const ele = document.getElementById(ID)
  if (!ele) {
    const link = document.createElement('link')
    link.id = ID
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
    
    var heads = document.getElementsByTagName("head"); 
    if(heads.length) {
      heads[0].appendChild(link); 
    } else {
      document.documentElement.appendChild(link);  
    }
  }
}

onMounted(()=> {
  ;(async ()=> {
    const textBody = await cacheMap.getAboutData()
    markdownBody.value = textBody
    addGithubStyle()
    const md = new MarkdownIt()
    const text = md.render(textBody)
    _html.value = text
  })()
})
</script>