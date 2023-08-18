<template>
  <div class="article-item">
    <div class="article-item-inner">
      <div class="article-body">
        <div class="user-info">
          <Avatar :userId="data.userId" :width="30"></Avatar>
          <router-link :to='"/user/" + data.userId' class="link-info">{{ data.nickName }}</router-link>
          <el-divider direction="vertical"></el-divider>
          <div class="post-time">{{ data.postTime }}</div>
          <div class="address">&nbsp;·&nbsp;{{ data.userIpAddress }}</div>
          <el-divider direction="vertical"></el-divider>
          <router-link :to="'/'" class="link-info">{{ data.pBoardName }}</router-link>
          <template v-if="data.boardName">
            <span>&nbsp;/&nbsp;</span>
            <router-link :to="'/'" class="link-info">{{ data.boardName }}</router-link>
          </template>
        </div>
        <router-link :to="'/'" class="title">{{ data.title }}</router-link>
        <div class="summary">{{ data.summary }}</div>
        <div class="article-info">
          <span class="iconfont icon-eye-solid">
            {{ data.readCount === 0 ? "阅读" : data.readCount }}
          </span>
          <span class="iconfont icon-good">
            {{ data.goodCount === 0 ? "点赞" : data.goodCount }}
          </span>
          <span class="iconfont icon-comment">
            {{ data.commentCount === 0 ? "评论" : data.commentCount }}
          </span>
        </div>
      </div>
      <div class="cover">
        <img :src="'/api/file/getImage/' + data.cover" alt="">
      </div>
    </div>
  </div>
</template> 

<script setup>
import { RouterLink } from 'vue-router';


const props = defineProps({
  data: {
    type: Object,
  },

})


</script>

<style lang="scss" scoped>
.article-item {
  padding: 5px 10px 0px 10px;

  .article-item-inner {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    display: flex;
    .article-body {
      .user-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #4e5969;

        .link-info {
          margin-left: 4px;
          color: #494949;
          text-decoration: none;
        }

        .link-info:hover {
          color: var(--link);
        }

        .post-time {
          font-size: 13px;
          color: #494949;
        }
      }

      .title {
        font-weight: bold;
        text-decoration: none;
        color: #4a4a4a;
        font-size: 16px;
        margin: 10px 0px 0px 0px;
        display: inline-block;
      }

      .summary {
        margin-top: 10px;
        font-size: 14px;
        color: #86909c;
      }

      .article-info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 13px;
        .iconfont {
          color: #86909c;
          margin-right: 25px;
          font-size: 14px
        }
        .iconfont:before {
          padding-right: 3px;
        }
      }
    }

    .cover {
      
    }
  }
}

.article-item:hover {
  background: #f6f6f689;
}</style>
