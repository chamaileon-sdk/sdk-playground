<template>
  <div id="logo" v-chamaileonLogo></div>
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');

export default {
  directives: {
    chamaileonLogo: {
      inserted: function(el) {
        el.appendChild(chamaileonLogo({ withText: true }));
      },
    },
  },
};
</script>

<style></style>
