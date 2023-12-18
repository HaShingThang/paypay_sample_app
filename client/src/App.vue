<template>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "./layout/AppLayout.vue";

export default {
  components: { AppLayout },
};
</script>