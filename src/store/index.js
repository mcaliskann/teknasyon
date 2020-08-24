import Vue from 'vue'
import Vuex from 'vuex'
import step from './modules/step'
import stepone from './modules/stepone'
import steptwo from './modules/steptwo'
import stepthree from './modules/stepthree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    step,
    stepone,
    steptwo,
    stepthree
  }
})
