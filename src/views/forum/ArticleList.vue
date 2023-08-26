<template>
  <div 
  :style="{ width: proxy.globalInfo.bodywidth + 'px' }"
  class="content-body article-list-body"
  > 
    <!-- 二级板块信息 -->
    <div class="sub-board" v-if="pBoardId">
      <span class="board-item" :class="boardId==0?'active':''">
        <router-link :to="`/forum/${pBoardId}`">全部</router-link>
      </span>
      <span  class="board-item" v-for="item in subBoardList" :class="item.boardId == boardId?'active':''">
        <router-link :to="`/forum/${item.pBoardId}/${item.boardId}`">{{ item.boardName }}</router-link>
      </span>
    </div>
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
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance();
const route = useRoute()
const store = useStore()

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

//二级板块展示
const subBoardList = ref([])
const setSubBoard = () => {
  subBoardList.value = store.getters.getSubBoardList(pBoardId.value)
}

//监听路由变化
watch(() =>route.params, (newVal, oldVal) => {
  pBoardId.value = newVal.pBoardId;
  boardId.value = newVal.boardId || 0;
  loadArticle();
  setSubBoard();
}, { immediate: true, deep: true });

// 监听板块变化
watch(() =>store.state.boardList, (newVal, oldVal) => {
  setSubBoard();
}, { immediate: true, deep: true });

</script>

<style lang="scss" scoped>
.article-list-body {
  .sub-board {
    padding: 10px 0px 10px 0px;
    .board-item {
      background: #fff;
      border-radius: 15px;
      padding: 2px 10px;
      margin-right: 10px;
      color: #909090;
      cursor: pointer;
      font-size: 14px;
      a {
        text-decoration: none;
        color: #909090;
      }
    }
    .active {
        background: var(--link);

        a {
          color: #fff;
        }
      }
  }
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
