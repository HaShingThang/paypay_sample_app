<template>
  <div class="footer">
    <p class="footer-text">{{ $t("cake_shop.footer") }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppFooter",
};
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.footer {
  background-color: $lightyellow;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  .footer-text {
    font-size: 16px;
    color: $ash;
  }
}
</style>
