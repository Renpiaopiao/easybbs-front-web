import { ElMessage } from 'element-plus'

const message = {
  error: (msg,callback) => {
    ElMessage({
      message: msg,
      type: 'error',
      duration: 2000,
      onClose:()=>{
        if(callback){
          callback()
        }
      }
    })
  },
  success: (msg,callback) => {
    ElMessage({
      message: msg,
      type: 'success',
      duration: 2000,
      onClose:()=>{
        if(callback){
          callback()
        }
      }
    })
  },
  warning: (msg,callback) => {
    ElMessage({
      message: msg,
      type: 'warning',
      duration: 2000,
      onClose:()=>{
        if(callback){
          callback()
        }
      }
    })
  }
}

export default message