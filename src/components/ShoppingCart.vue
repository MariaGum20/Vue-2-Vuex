<template>
  <div>
    <h1>Корзина покупок</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Сумма: {{ total | currency }}</p>
    <button @click="checkout">Очистить</button>
    <p v-if="checkoutStatus">{{ $store.state.cart.checkoutStatus }}</p>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters('cart', {
        products: 'cartProducts',
        total: 'cartTotal'
      }),

      ...mapState('cart', {
        checkoutStatus: state => state.checkoutStatus
      })
    },

    methods: {
      ...mapActions('cart', ['checkout'])
    }
  }
</script>
