export default {
  namespaced: true,
  state : () => ({
    cart: []
  }),
  mutations: {
    addCart(state,payload) {
      console.log(payload)
      console.log('vuexcart')
      state.cart.push(payload)
      console.log(state.cart)
      console.log('state.cart')
    },
    delCart(state,payload) {
      // state.cart = state.cart.filter(item => {
      //   return item.a != 1
      // })
      const idx = state.cart.indexOf(payload)
      state.cart.splice(idx,1)
      console.log('del')
      console.log(state.cart)
    }
  }
  
}