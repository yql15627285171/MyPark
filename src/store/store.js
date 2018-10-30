import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    currState:{},
    LastRecord:{},
  },
  getters:{
    geturrState(state){
      return state.currState
    },
    getLastRecord(state){
      return state.LastRecord
    }
  },
  mutations:{

    setCurrState(state,value){

      state.currState = value
    },

    setLastRecord(state,value){
      state.LastRecord = value
    }
  },
  actions:{
    setCurrState(context,value){
      context.commit('setCurrState',value)
    },
    setLastRecord(context,value){
      context.commit('setLastRecord',value)
    }

  }
})
