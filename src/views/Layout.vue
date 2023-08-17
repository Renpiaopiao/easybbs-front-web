<template>
  <div>
    <div class="header" v-if="showHeader">
      <div
        class="header-content"
        :style="{ width: proxy.globalInfo.bodywidth + 'px' }"
      >
        <router-link to="/" class="logo">
          <span v-for="item in logoInfo" :style="{color:item.color}">{{ item.letter }}</span>
        </router-link>
        <div class="menu-panel"></div>
        <div class="user-info-panel">
          <el-button type="primary" size="default" class="opt-btn" @click="">
            发帖<span class="iconfont icon-add"></span>
          </el-button>
          <el-button type="primary" size="default" class="opt-btn" @click="">
            搜索<span class="iconfont icon-search"></span>
          </el-button>
          <el-button-group :style="{'margin-left':'10px'}">
          <el-button type="primary" size="default" plain @click="LoginAndRegistered(1)">登录</el-button>
          <el-button type="primary" size="default" plain @click="LoginAndRegistered(0)">注册</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from './LoginAndRegister.vue'
import { ref, reactive, getCurrentInstance } from 'vue'
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
//标题字母数组
const logoInfo = ref([
  {
    letter:'L',
    color:"#3285FF"
  },
  {
    letter:'e',
    color:"#FB3624"
  },
  {
    letter:'m',
    color:"#FFBA02"
  },
  {
    letter:'o',
    color:"#3285FF"
  },
  {
    letter:'n',
    color:"#25B24E"
  },
  {
    letter:'T',
    color:"#FD3224"
  },
  {
    letter:'r',
    color:"#FFBA02"
  },
  {
    letter:'e',
    color:"#3285FF"
  },
  {
    letter:'e',
    color:"#FB3624"
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
  //1表上往下滚动，0表示往上滚动
  window.addEventListener('scroll',()=>{
    let currentScollTop = getScrollTop()
    let scrollType = 0
    if(currentScollTop > initScrollTop){
      scrollType = 1
    }else {
      scrollType = 0
    }
    initScrollTop = currentScollTop
    if(scrollType===1 && currentScollTop > 100){
      showHeader.value = false
    }else {
      showHeader.value = true
    }
  })
} 
onMounted(()=>{
  initScroll()
})

</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 6px 0 #ddd;
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
    }

    .user-info-panel {
      width: 300px;
      display: flex;
      .opt-btn {
        margin-left: 5px;
        .iconfont {
          margin-left: 5px;
        }
      }
    }

  }
}
</style>
