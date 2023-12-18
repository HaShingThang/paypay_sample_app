<template>
  <div class="header">
    <div class="header-contents">
      <router-link to="/">
        <div class="header-logo">
          <img src="@/assets/images/Logo.png" alt="logo" />
        </div>
      </router-link>
      <nav class="nav-items">
        <router-link class="nav-item" to="/">HOME</router-link>
        <router-link class="nav-item" to="/orders">ORDER</router-link>
        <router-link class="nav-item" to="/payment-transition"
          >Payment Transition</router-link
        >
      </nav>
      <router-link to="/orderreview">
        <div class="header-cart">
          <img src="@/assets/images/cart.png" alt="cart" />
          <div class="cart-item">{{ cartItems.length }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: mapGetters("cart", ["cartItems"]),
};
</script>

<style lang="scss">
@import "@/styles/variables";
.header {
  position: fixed;
  top: 0;
  min-width: 100vw;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 5px -5px #333;
  z-index: 999;
  .header-contents {
    display: flex;
    justify-content: space-between;
    padding: 26px 7%;
    .header-logo {
      cursor: pointer;
    }
    .nav-items {
      display: flex;
      flex-direction: row;
      gap: 20px;
      .nav-item {
        color: $black;
        text-decoration: none;
        transition: 0.8s ease;
        &:hover {
          color: $red;
          transition: 0.8s ease;
          text-decoration: underline;
        }
      }
    }
    .header-cart {
      position: relative;
      padding-top: 19px;
      cursor: pointer;
      .cart-item {
        position: absolute;
        top: 12px;
        left: 18px;
        background-color: $red;
        text-align: center;
        border-radius: 50%;

        padding: 1px 6px;
        color: $white;
        font-weight: bold;
      }
    }
  }
}
</style>
