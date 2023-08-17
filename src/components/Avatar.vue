<template>
  <div
    class="avatar"
    :style="{
      width: width + 'px',
      height: width + 'px',
      'border-radius': width / 2 + 'px',
    }"
  >
    <el-image
      v-if="userId"
      :style="{
        width: width + 'px',
        height: width + 'px',
        'border-radius': width / 2 + 'px',
      }"
      :src="proxy.globalInfo.avatarUrl + userId" 
      fit="scale-down"
      :lazy="true"
      :room-rate="1.2"
      @click="gotoUserCenter"
    ></el-image>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  userId: {
    type: String,
  },
  width: {
    type: Number,
    default: 60,
  },
  addLink: {
    type: Boolean,
    default: true,
  },
})

const gotoUserCenter = () => {
  if (props.addLink) {
    router.push('/user/' + proxy.userId)
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;
}
</style>
