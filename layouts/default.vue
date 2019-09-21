<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
  components: { Navbar }
};
</script>

<style>
@import url("~/assets/general.css");
@import url("~/assets/icons.css");
</style>
