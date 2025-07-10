<template>
  <div>
      <h1>Список книг по запросу Java</h1>
        <li v-for="product in items">
          {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
          <button
            :disabled="!productIsInStock(product)"
            @click="addProductToCart(product)"
          >Добавить в корзину</button>
        </li>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      loading: false,
      productIndex: 1
    }
  },

  computed: {
    ...mapState('products', ['items']),

    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    }),
  },

  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    })
  },

  created () {
    this.loading = true
    this.fetchProducts()
      .then(() => this.loading = false)
  }
}
</script>

<link rel="stylesheet" href="./src/assets/cart.css"></link>
