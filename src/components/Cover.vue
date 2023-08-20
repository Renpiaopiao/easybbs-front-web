<template>
  <div class="cover" :style="{
    width: width + 'px',
    height: width + 'px',
    borderRadius: radius + 'px'
  }">
    <el-image :style="{
      width: width + 'px',
      height: width + 'px',
      borderRadius: radius + 'px'
    }" :src="proxy.globalInfo.imageUrl + cover" fit="scale-down" :lazy="true">
      <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
    </el-image>

  </div>
</template>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref, reactive, getCurrentInstance } from "vue"
const { proxy } = getCurrentInstance();
const props = defineProps({
  cover: {
    type: String
  },
  width: {
    type: Number,
    default: 60,
  },
  radius: {
    type:Number,
    default:5
  }
})

</script>

<style lang="scss" scoped>
.cover {
  background: #ddd;
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .el-icon {
      font-size: 20px;
    }
  }
}

</style>
