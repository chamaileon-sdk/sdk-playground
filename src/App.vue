<template>
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
export default {};
</script>

<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;

  font-family: Roboto, sans-serif;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
