<template>
  <div 
  :style="{ width: proxy.globalInfo.bodywidth + 'px' }"
  class="content-body article-list-body"
  > 
     <div class="article-panel">
        <div class="top-tab">
          <div>热榜</div>
          <el-divider direction="vertical"></el-divider>
          <div>发布时间</div>
          <el-divider direction="vertical"></el-divider>
          <div>最新</div>
        </div>
        <div class="article-list">
          <div v-for="item in articleInfo.list">
            <ArticleListItem :data="item"></ArticleListItem>
          </div>
        </div>
     </div>
  </div>
</template>

<script setup>
import ArticleListItem from "./ArticleListItem.vue"
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();

const api =  {
  loadArticle:'/forum/loadArticle'
}

const articleInfo = ref({});

const loadArticle =  async () => {
  let result = await proxy.request({
     url: api.loadArticle,
     params:{
     }
  })
  if(!result){
    return;
  }
  articleInfo.value = result.data
}
loadArticle()

</script>

<style lang="scss" scoped>
.article-list-body {
  .article-panel {
    background: #fff;
    .top-tab {
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 15px;
      border-bottom: 1px solid #ddd;

    }
  }
}
</style>
