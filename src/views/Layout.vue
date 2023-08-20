<template>
  <div>
    <div class="header" v-if="showHeader">
      <div class="header-content" :style="{ width: proxy.globalInfo.bodywidth + 'px' }">
        <!-- logo -->
        <router-link to="/" class="logo">
          <span v-for="item in logoInfo" :style="{ color: item.color }">{{ item.letter }}</span>
        </router-link>
        <!-- 板块信息 -->
        <div class="menu-panel">
          <span class="menu-item" to="/">首页</span>
          <template v-for="board in boardList">
            <el-popover
            placement="bottom-start"
            :width="200"
            trigger="hover"
            v-if="board.children.length > 0"
          >
            <template #reference>
              <span class="menu-item" @click="boardClickHandler(board)">{{ board.boardName }}</span>
            </template>
            <div class="sub-board-list">
              <span class="sub-board" v-for="subBoard in board.children" @click="subBoardClickHandler(subBoard)">{{ subBoard.boardName }}</span>
            </div>
          </el-popover>
          <span class="menu-item" v-else  @click="boardClickHandler(board)">{{ board.boardName }}</span>
        </template>
        </div>
        <!-- 右侧按钮模块：登录、注册、搜索 -->
        <div class="user-info-panel">
          <el-button type="primary" size="default" class="opt-btn" @click="">
            发帖<span class="iconfont icon-add"></span>
          </el-button>
          <el-button type="primary" size="default" class="opt-btn" @click="">
            搜索<span class="iconfont icon-search"></span>
          </el-button>
          <template v-if="userInfo.userId">
            <div class="message-info">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-badge :value="12">
                    <div class="iconfont icon-message"></div>
                  </el-badge>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>回复我的</el-dropdown-item>
                    <el-dropdown-item>赞了我的文章</el-dropdown-item>
                    <el-dropdown-item>下载了我的附件</el-dropdown-item>
                    <el-dropdown-item>赞了我的评论</el-dropdown-item>
                    <el-dropdown-item>系统消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="user-info">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <avatar :userId="7693441284" :width="40"></avatar>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>我的主页</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template> 
          <template v-else>
            <el-button-group :style="{ 'margin-left': '10px' }">
            <el-button type="primary" size="default" plain @click="LoginAndRegistered(1)">登录</el-button>
            <el-button type="primary" size="default" plain @click="LoginAndRegistered(0)">注册</el-button>
            </el-button-group>
          </template>
        </div>
      </div>
    </div>
    <div class="body-content">
      <router-view></router-view>
    </div>
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from './LoginAndRegister.vue'
import { ref, reactive, getCurrentInstance } from 'vue'
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const api = {
  getUserInfo: "/getUserInfo",
  loadBoard: "/board/loadBoard"
}
//标题字母数组
const logoInfo = ref([
  {
    letter: 'L',
    color: "#3285FF"
  },
  {
    letter: 'e',
    color: "#FB3624"
  },
  {
    letter: 'm',
    color: "#FFBA02"
  },
  {
    letter: 'o',
    color: "#3285FF"
  },
  {
    letter: 'n',
    color: "#25B24E"
  },
  {
    letter: 'T',
    color: "#FD3224"
  },
  {
    letter: 'r',
    color: "#FFBA02"
  },
  {
    letter: 'e',
    color: "#3285FF"
  },
  {
    letter: 'e',
    color: "#FB3624"
  }
])
//登录注册
const loginRegisterRef = ref()
const LoginAndRegistered = (type) => {
  loginRegisterRef.value.showPanel(type)
}
const showHeader = ref(true)

const getScrollTop = () => {
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  return scrollTop
}
const initScroll = () => {
  let initScrollTop = getScrollTop()
  //1表上往下滚动，0表示往上滚动, 滑动100px后，header消失
  window.addEventListener('scroll', () => {
    let currentScollTop = getScrollTop()
    let scrollType = 0
    if (currentScollTop > initScrollTop) {
      scrollType = 1
    } else {
      scrollType = 0
    }
    initScrollTop = currentScollTop
    if (scrollType === 1 && currentScollTop > 100) {
      showHeader.value = false
    } else {
      showHeader.value = true
    }
  })
}
onMounted(() => {
  initScroll();
  getUserInfo()
})

// 获取用户信息
const getUserInfo = async () => {
  let result = await proxy.request({
     url:api.getUserInfo
  })
  if(!result){
    return;
  }
  store.commit("updateLoginUserInfo",result.data);
}

// 监听用户的信息变化
const userInfo = ref({})
watch(() => store.state.loginUserInfo, 
(newVal, oldVal) => { 
  if(newVal !== undefined && newVal !== null){
    userInfo.value = newVal;
  }else {
    userInfo.value = {};
  }
}, { immediate: true, deep: true });

// 获取板块信息
const boardList = ref([]);
const loadBoard = async () => {
  let result = await proxy.request({
     url:api.loadBoard
  })
  if(!result){
    return;
  }
  boardList.value = result.data
}
loadBoard()

// 监听登录框
watch(() =>store.state.showLogin, (newVal, oldVal) => {
  if(newVal){
    LoginAndRegistered(1)
  }
}, { immediate: true, deep: true });

//一级板块点击
const boardClickHandler = (board) => {
  router.push(`/forum/${board.boardId}`)
}

//二级板块点击
const subBoardClickHandler =  (subBoard) => {
  router.push(`/forum/${subBoard.pBoardId}/${subBoard.boardId}`)
}

</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 6px 0 #ddd;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  background: #fff;
  .header-content {
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;

    .logo {
      text-decoration: none;
      display: block;
      margin: 5px;

      span {
        font-size: 35px;
      }
    }

    .menu-panel {
      flex: 1;
      .menu-item {
        margin-left: 20px;
        cursor: pointer;
      }
    }

    .user-info-panel {
      width: 300px;
      display: flex;
      align-items: center;

      .opt-btn {
        margin-left: 5px;

        .iconfont {
          margin-left: 5px;
        }
      }

      .message-info {
        .icon-message {
          font-size: 25px;
          color: #878585;
        }

        margin-left: 5px;
        margin-right: 25px;
        cursor: pointer;
      }

      .user-info {}
    }

  }
}

.sub-board-list {
  display: flex;
  flex-wrap: wrap;
  .sub-board {
    padding: 0px 10px;
    border-radius: 20px;
    margin-right: 10px;
    background: #ddd;
    border: 1px solid #ddd;
    color: rgb(135, 134, 134);
    margin-top: 10px;
    cursor: pointer;
  }
  .sub-board:hover {
    color: var(--link);
  }
}

.body-content {
  margin-top: 60px;
  position: relative;
}
</style>
