<template>
  <div id="page-container">
    <Header />
    <div id="content-wrap">
      <slot />
    </div>
    <Footer id="footer" />
  </div>
</template>

<script lang="ts">
import Header from "../components/dashboard/Header.vue";
import Footer from "../components/dashboard/Footer.vue";
export default {
  components: { Header, Footer },
};
</script>

<style lang="scss">
#page-container {
  position: relative;
  min-height: 100vh;

  #content-wrap {
    padding-bottom: 2.5rem;
  }

  #footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
  }
}
</style>
