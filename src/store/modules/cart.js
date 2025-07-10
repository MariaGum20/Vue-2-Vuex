import shop from "@/api/shop"

export default {
  namespaced: true,

  state: {
    items: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts (state, getters, rootState) {
      return state.items
        .map(cartItem => {
          const product = rootState.products.items.find(p => p.id === cartItem.id)
          if (!product) return null
          return {
            title: product.title,
            price: product.price,
            quantity: cartItem.quantity
          }
        })
        .filter(product => product !== null)
    },

    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  },

  mutations: {
    pushProductToCart(state, product) {
      state.items.push({
        id: product.id,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      const index = state.items.findIndex(item => item.id === cartItem.id)
      if (index !== -1) {
        state.items.splice(index, 1, {
          ...state.items[index],
          quantity: state.items[index].quantity + 1
        })
      }
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.items = []
    }
  },

  actions: {
    addProductToCart ({ state, commit, rootGetters }, product) {
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('products/decrementProductInventory', product, { root: true })
      }
    },

    checkout ({ state, commit }) {
      shop.buyProducts(
        state.items,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'успех')
        },
        () => {
          commit('setCheckoutStatus', 'неудача')
        }
      )
    }
  }
}
