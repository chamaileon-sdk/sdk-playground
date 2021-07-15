<template>
  <v-btn
    depressed
    color="red white--text"
    width="100%"
    min-width="0"
    @click="() => this.$emit('click')"
  >
    <v-icon left>
      mdi-close
    </v-icon>
    delete
  </v-btn>
</template>

<script>
export default {};
</script>

<style></style>
