<template>
  <div 
  :style="{ width: proxy.globalInfo.bodywidth + 'px' }"
  class="content-body article-list-body"
  > 
     <div class="article-panel">
        <div class="top-tab">
          <div :class="['tab', orderType === 0?'active':'']" @click=changeOrderType(0)>热榜</div>
          <el-divider direction="vertical"></el-divider>
          <div :class="['tab', orderType === 1?'active':'']" @click=changeOrderType(1)>发布时间</div>
          <el-divider direction="vertical"></el-divider>
          <div :class="['tab', orderType === 2?'active':'']" @click=changeOrderType(2)>最新</div>
        </div>
        <div class="article-list">
          <Datalist :dataSource="articleInfo" @loadData="loadArticle" :loading="loading">
            <template #default="{ data }">
              <ArticleListItem :data="data"></ArticleListItem>
            </template>
          </Datalist>
        </div> 
     </div>
  </div>
</template>

<script setup>
import ArticleListItem from "./ArticleListItem.vue"
import { ref, getCurrentInstance } from "vue"
import { useRoute } from 'vue-router';
import { onMounted,watch } from 'vue'
const { proxy } = getCurrentInstance();
const route = useRoute()

const api =  {
  loadArticle:'/forum/loadArticle'
}

onMounted(() => {
  loadArticle()
})

// 0:热门1:发布时间2:最新发布 
const orderType = ref(0)
const changeOrderType = (type) => {
  orderType.value = type;
  loadArticle()
}

//一级板块
const pBoardId =  ref(0);
//二级板块
const boardId = ref(0);

//文章列表
const loading = ref(false);
const articleInfo = ref({});
const loadArticle =  async () => {
  loading.value = true
  let params = {
    pageNo: articleInfo.value.pageNo,
    pBoardId: pBoardId.value,
    boardId: boardId.value,
    orderType: orderType.value
  }
  let result = await proxy.request({
     url: api.loadArticle,
     params: params,
     showLoading: false
  })
  loading.value = false
  if(!result){
    return;
  }
  articleInfo.value = result.data
}

//监听路由变化
watch(() =>route.params, (newVal, oldVal) => {
  pBoardId.value = newVal.pBoardId;
  boardId.value = newVal.boardId;
  loadArticle();
}, { immediate: true, deep: true });

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
      .tab {
        cursor: pointer;
      }
      .active {
        color: var(--link);
      }
    }
  }

  .article-list {
    padding-bottom: 20px;
  }
}
</style>
