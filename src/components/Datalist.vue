<template>
  <div v-if="!loading && dataSource.list && dataSource.list.length===0">
    <NoData :msg="noDataMsg"></NoData>
  </div>
  <div class="skeleton" v-if="loading">
    <el-skeleton :rows="5" animated />
  </div>
  <div v-for="item in dataSource.list">
    <slot :data="item"></slot>
  </div>
  <div class="pagination">
    <el-pagination
    v-if="dataSource.pageTotal > 1"
    :total="dataSource.totalCount"
    :current-page.sync="dataSource.pageNo"
    background
    page-size="15" 
    layout="prev, pager, next"
    @current-change="handlePageNoChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  dataSource: {
    type: Object
  },
  loading: {
    type:Boolean,
  },
  noDataMsg:{
    type:String,
    default:'暂时没有数据~发一个贴吧'
  }
})

const emit = defineEmits(["loadData"])

const handlePageNoChange = (pageNo) => {
  props.dataSource.pageNo = pageNo;
  emit("loadData")
}

</script>

<style lang="scss" scoped>
.pagination {
  margin: 5px;
  display: flex;
  justify-content: center;
}
</style>
