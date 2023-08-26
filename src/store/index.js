import {createStore} from "vuex";

export default createStore({
  state: {
    //用户信息
    loginUserInfo: null,
    //登录框是否显示
    showLogin:false,
    //板块信息
    boardList:[],
    //当前一级板块
    activePBoardId:0,
    //当前二级板块
    activeBoardId:0
  },
  getters: {
    getLoginUserInfo: (state) => {
      return state.loginUserInfo
    },
    getBoardList:(state) => {
      return state.boardList
    },
    getSubBoardList:(state)=> (boardId) => {
      let board = state.boardList.find(item => {
        return item.boardId == boardId
      })
      return board?board.children:[]
    },
    // getActivePBoardId()
  },
  mutations: {
    updateLoginUserInfo(state,value){
      state.loginUserInfo = value
    },
    showLogin(state,value){
      state.showLogin = value
    },
    saveBoardList(state,value){
      state.boardList = value
    }
  }, 
  actions: {

  },
  modules: {

  }
})