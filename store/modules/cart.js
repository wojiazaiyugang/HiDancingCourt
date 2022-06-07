export default {
  namespaced: true,
  state : {
    cart: []
  },
  mutations: {
    addCart(state,payload) {
      state.cart.push(payload)
    },
    delCart(state,payload) {
      const idx = state.cart.indexOf(payload)
      state.cart.splice(idx,1)
    }
  }
  
}